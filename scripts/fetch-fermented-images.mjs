// 一次性抓取：《发酵白菜宇宙》guide 正文配图（Wikimedia Commons 自由许可）
// 7 个图位，优先精确文件名，失败则按搜索词兜底；许可证只收 CC0/PD/CC BY(-SA)
// 用法：node scripts/fetch-fermented-images.mjs [--force]
import { writeFile, appendFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const OUT_DIR = path.resolve('public/images/guides')
const CREDITS = path.resolve('public/images/guides/CREDITS.md')
const UA = 'china-travel-guide-site-builder/1.0 (https://chinatravel.world)'

// [输出文件名, 精确 Commons 文件名候选[], 搜索词候选[]]
const SLOTS = [
  ['fermented-kimchi.jpg', ['File:Kimchi.jpg'], ['kimchi banchan', 'kimchi cabbage bowl']],
  ['fermented-sauerkraut.jpg', ['File:Sauerkraut.jpg'], ['sauerkraut jar', 'sauerkraut bowl']],
  ['fermented-suancai.jpg', ['File:Suancai (pickle).jpg'], ['suancai chinese cabbage', 'suancai northeast']],
  ['fermented-paocai.jpg', ['File:Paocai.jpg'], ['paocai', 'sichuan pickled vegetables jar']],
  ['fermented-suantang.jpg', ['File:Kaili suantang fish.jpg'], ['guizhou sour soup fish', 'kaili suantang']],
  ['fermented-suancaiyu.jpg', ['File:Suancaiyu.jpg'], ['suancaiyu', 'fish with pickled mustard greens']],
  ['fermented-zhacai.jpg', ['File:Zhacai.jpg'], ['zhacai', 'pickled mustard tuber', 'fuling zhacai']],
]

const OK_RE = /^(cc0|public domain|pd|cc by( [- ]?sa)?)/i
const FORCE = process.argv.includes('--force')

async function api(params) {
  const url = new URL('https://commons.wikimedia.org/w/api.php')
  Object.entries({ format: 'json', origin: '*', ...params }).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

async function pickFile(title) {
  const j = await api({
    action: 'query', titles: title, prop: 'imageinfo',
    iiprop: 'url|extmetadata', iiurlwidth: 1200,
  })
  const page = Object.values(j.query.pages)[0]
  if (!page?.imageinfo) return null
  const info = page.imageinfo[0]
  const lic = info.extmetadata?.LicenseShortName?.value || ''
  if (!OK_RE.test(lic)) { console.log(`  skip ${title}: license "${lic}"`); return null }
  return {
    title: page.title.replace(/^File:/, ''),
    license: lic,
    artist: (info.extmetadata?.Artist?.value || '').replace(/<[^>]+>/g, '').trim() || 'unknown',
    url: info.thumburl || info.url,
  }
}

async function fromSearch(term) {
  const j = await api({ action: 'query', list: 'search', srsearch: term, srnamespace: 6, srlimit: 6 })
  for (const r of j.query?.search || []) {
    const hit = await pickFile(r.title)
    if (hit) return hit
  }
  return null
}

let ok = 0, miss = 0
for (const [name, fixed, searches] of SLOTS) {
  const out = path.join(OUT_DIR, name)
  if (existsSync(out) && !FORCE) { console.log(`${name}: exists, skip`); ok++; continue }

  let hit = null
  for (const t of fixed) { hit = await pickFile(t); if (hit) break }
  if (!hit) for (const s of searches) { hit = await fromSearch(s); if (hit) break }

  if (!hit) { console.error(`${name}: NO USABLE IMAGE`); miss++; continue }

  const res = await fetch(hit.url, { headers: { 'User-Agent': UA } })
  if (!res.ok) { console.error(`${name}: download ${res.status}`); miss++; continue }
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(out, buf)
  await appendFile(CREDITS, `- ${name}: ${hit.title} by ${hit.artist} (${hit.license}), via Wikimedia Commons\n`)
  console.log(`${name}: ${hit.title} | ${hit.license} | ${hit.artist} | ${(buf.length / 1024).toFixed(0)}KB`)
  await new Promise(r => setTimeout(r, 300))
}
console.log(`\n完成：成功 ${ok + (FORCE ? 0 : 0)}，本次新抓 ${SLOTS.length - miss}，失败 ${miss}`)
