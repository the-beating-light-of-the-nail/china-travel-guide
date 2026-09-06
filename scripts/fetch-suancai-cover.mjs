// 一次性抓取：酸菜 vs 德国酸菜指南头图（Wikimedia Commons 自由许可）
// 用法：node scripts/fetch-suancai-cover.mjs [--force]
import { writeFile, appendFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const OUT = path.resolve('public/images/guides/suancai-vs-sauerkraut.jpg')
const CREDITS = path.resolve('public/images/guides/CREDITS.md')
const UA = 'china-travel-guide-site-builder/1.0 (https://chinatravel.world)'

const FIXED = [
  'File:Suancaiyu.jpg',
  'File:Suancai (pickle).jpg',
  'File:Kaili suantang fish.jpg',
]
const SEARCH = ['suancaiyu suancai fish', 'suancai chinese cabbage pickle', 'sauerkraut bowl', 'sauerkraut jar']

const OK_RE = /^(cc0|public domain|pd|cc by( [- ]?sa)?)/i

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
    iiprop: 'url|extmetadata', iiurlwidth: 1400,
  })
  const page = Object.values(j.query.pages)[0]
  if (!page?.imageinfo) return null
  const info = page.imageinfo[0]
  const lic = info.extmetadata?.LicenseShortName?.value || ''
  if (!OK_RE.test(lic)) { console.log(`skip ${title}: license "${lic}"`); return null }
  return {
    title: page.title.replace(/^File:/, ''),
    license: lic,
    artist: (info.extmetadata?.Artist?.value || '').replace(/<[^>]+>/g, '').trim() || 'unknown',
    url: info.thumburl || info.url,
  }
}

async function fromSearch(term) {
  const j = await api({ action: 'query', list: 'search', srsearch: term, srnamespace: 6, srlimit: 5 })
  for (const r of j.query?.search || []) {
    const hit = await pickFile(r.title)
    if (hit) return hit
  }
  return null
}

if (existsSync(OUT) && !process.argv.includes('--force')) {
  console.log('exists, skip'); process.exit(0)
}

let hit = null
for (const t of FIXED) { hit = await pickFile(t); if (hit) break }
if (!hit) for (const s of SEARCH) { hit = await fromSearch(s); if (hit) break }
if (!hit) { console.error('no usable image found'); process.exit(1) }

console.log('picked:', hit.title, '|', hit.license, '|', hit.artist)
const res = await fetch(hit.url, { headers: { 'User-Agent': UA } })
if (!res.ok) throw new Error(`download ${res.status}`)
const buf = Buffer.from(await res.arrayBuffer())
await writeFile(OUT, buf)
await appendFile(CREDITS, `- suancai-vs-sauerkraut.jpg: ${hit.title} by ${hit.artist} (${hit.license}), via Wikimedia Commons\n`)
console.log('saved ->', OUT, buf.length, 'bytes')
