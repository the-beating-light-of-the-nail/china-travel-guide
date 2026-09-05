// 一次性脚本：重抓主题不符的图片（第二轮）
// 用法：node scripts/coldstart/fetch-shopping-images-fix.mjs
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const UA = 'china-travel-guide-site-build/1.0 (https://chinatravel.world; contact: site@chinatravel.world)'

const targets = [
  { slug: 'xiaomi-luggage', queries: ['Samsonite suitcase', 'Rimowa suitcase', 'spinner luggage', 'luggage set hotel'] },
]

async function searchCommons(query) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: '6',
    gsrlimit: '12',
    prop: 'imageinfo',
    iiprop: 'url|size|mime',
    iiurlwidth: '800',
  })
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`API ${res.status}`)
  const data = await res.json()
  const pages = Object.values(data.query?.pages || {})
  for (const p of pages) {
    const info = p.imageinfo?.[0]
    if (!info || info.mime !== 'image/jpeg') continue
    if (info.width < 700 || info.height < 450) continue
    const ratio = info.width / info.height
    if (ratio < 0.75 || ratio > 2.1) continue
    if (/map|logo|icon|diagram|chart/i.test(p.title)) continue
    return { title: p.title, thumb: info.thumburl, width: info.width, height: info.height }
  }
  return null
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`download ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 15_000) throw new Error('file too small')
  writeFileSync(dest, buf)
}

for (const t of targets) {
  const dest = resolve(root, `public/images/shopping/${t.slug}.jpg`)
  for (const q of t.queries) {
    try {
      const hit = await searchCommons(q)
      if (!hit) { console.log(`[miss] ${t.slug} :: "${q}"`); continue }
      await download(hit.thumb, dest)
      console.log(`[ok] ${t.slug} <- "${q}" :: ${hit.title} (${hit.width}x${hit.height})`)
      break
    } catch (e) {
      console.log(`[err] ${t.slug} :: "${q}" :: ${e.message}`)
    }
  }
}
console.log('done')
