// 一次性修正：替换 3 个不理想图位 + 新增酸菜饺子图（Wikimedia Commons）
// 用法：node scripts/fix-fermented-images.mjs
import { writeFile, readFile } from 'node:fs/promises'
import { rm } from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = path.resolve('public/images/guides')
const CREDITS = path.resolve('public/images/guides/CREDITS.md')
const UA = 'china-travel-guide-site-builder/1.0 (https://chinatravel.world)'

const OK_RE = /^(cc0|public domain|pd|cc by( [- ]?sa)?)/i

// [输出文件名, 精确 Commons 文件名候选[]（按优先级）]
const SLOTS = [
  ['fermented-suancai.jpg', ['File:Suan cai, pork, and Chinese blood sausage stew.jpg', 'File:Suan cai pork stew.jpg']],
  ['fermented-suantang.jpg', ['File:Food 酸湯魚, 駱師父醬味川客菜, 台北 (22438764872).jpg']],
  ['fermented-suancaiyu.jpg', [
    'File:20230315 Tai Er Chinese Sauerkraut Fish at Grand Emporium.jpg',
    'File:酸菜魚.jpg',
    'File:酸菜鱼 Preserved Mustard Green with Fish - Charming Spice AUD24.80 (4104355401).jpg',
    'File:Suancaiyu rice value-set at Hehegu, Dongzhimen (20211220172415).jpg',
  ]],
  ['fermented-suancai-jiaozi.jpg', ['File:A Jiaozi with suan cai.JPG']],
]

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

// 重写 CREDITS：去掉被替换图位的旧行
let credits = await readFile(CREDITS, 'utf-8')
for (const [name] of SLOTS) {
  credits = credits.split('\n').filter(l => !l.startsWith(`- ${name}:`)).join('\n')
}

for (const [name, candidates] of SLOTS) {
  let hit = null
  for (const t of candidates) { hit = await pickFile(t); if (hit) break }
  if (!hit) { console.error(`${name}: NO USABLE IMAGE`); continue }

  const res = await fetch(hit.url, { headers: { 'User-Agent': UA } })
  if (!res.ok) { console.error(`${name}: download ${res.status}`); continue }
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 5000) { console.error(`${name}: too small`); continue }
  await rm(path.join(OUT_DIR, name), { force: true })
  await writeFile(path.join(OUT_DIR, name), buf)
  credits += `- ${name}: ${hit.title} by ${hit.artist} (${hit.license}), via Wikimedia Commons\n`
  console.log(`${name}: ${hit.title} | ${hit.license} | ${hit.artist} | ${(buf.length / 1024).toFixed(0)}KB`)
  await new Promise(r => setTimeout(r, 300))
}
await writeFile(CREDITS, credits)
console.log('CREDITS.md updated')
