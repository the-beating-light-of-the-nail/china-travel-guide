// 徒步路线头图抓取 - Wikimedia Commons 自由许可图片
// ---------------------------------------------------------------
// 用法：node scripts/fetch-hiking-route-images.mjs [slug ...] [--force]
//   不带 slug = 全量；带 slug = 只抓指定路线（文件已存在时仍重抓，等于 --force 局部化）
// 仅接受 CC0 / Public domain / CC BY / CC BY-SA；署名写入 public/images/hiking/CREDITS.md，
// 并维护 manifest scripts/out/hiking-images.json（CREDITS.md 由 manifest 全量重建）。
// ---------------------------------------------------------------
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'public/images/hiking')
const CREDITS = path.join(OUT_DIR, 'CREDITS.md')
const MANIFEST = path.join(ROOT, 'scripts/out/hiking-images.json')
const ONLY = process.argv.slice(2).filter(a => !a.startsWith('--'))
const FORCE = process.argv.includes('--force') || ONLY.length > 0
const UA = { 'User-Agent': 'china-travel-guide-site-builder/1.0 (https://chinatravel.world)' }

// slug → Commons 搜索词（按顺序尝试，取第一个可用结果）
const SLUGS = [
  ['mount-hua', ['Huashan cliff', 'Mount Hua plank walk', 'Huashan South Peak', 'Mount Hua summit']],
  ['zhagana', ['Zhagana', 'Zhagana mountains landscape']],
  ['yubeng', ['Yubeng village', 'Yubeng Meili snow mountain']],
  ['siguniang-traverse', ['Siguniangshan four girls', 'Mount Siguniang snow', 'Balang mountain pass Siguniang']],
  ['gongga-loop', ['Gongga Shan', 'Hailuogou glacier Minya Konka', 'Minya Konka peak']],
  ['tengger-desert', ['Shapotou dunes', 'Tengger desert dunes', 'Shapotou tourist area']],
  ['wusun-trail', ['Kalajun grassland', 'Kalajun', 'Sayram Lake shore']],
  ['wugongshan', ['Wugongshan alpine meadow', 'Wugong Mountain']],
  ['daocheng-yading', ['Yading nature reserve', 'Daocheng Yading']],
  ['kanas-hemu', ['Hemu village Xinjiang', 'Kanas Lake Xinjiang']],
  ['genie-pasture', ['Litang grassland', 'Litang Sichuan']],
  ['meili-north-slope', ['Meili Xueshan', 'Meili snow mountain range']],
  ['kailash-kora', ['Mount Kailash', 'Kailash kora Tibet']],
]

const OK_LICENSES = /cc0|public domain|cc by(-sa)? [1-9]|cc by(-sa)?$/i

// 人工核对后指定的文件（优先于搜索词；来自 scripts/_candidates.mjs 的候选清单）
const OVERRIDES = {
  'mount-hua': 'File:Huashan Mountain (140917819).jpeg',
  'zhagana': 'File:202609 Zhagana Scenic Area 49.jpg',
  'yubeng': 'File:Deqen, Yunnan, China - panoramio (3).jpg',
  'siguniang-traverse': 'File:四姑娘山景区 Mount Siguniang Scenic Area 44.jpg',
  'gongga-loop': 'File:Mount Gongga (Gonggashan Nature Reserve with WDPA ID 315667).jpg',
  'tengger-desert': 'File:Tengger Desert.JPG',
}

async function byTitle(title) {
  const params = new URLSearchParams({
    action: 'query', format: 'json', titles: title,
    prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '1600',
  })
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: UA })
  const json = await res.json()
  const page = Object.values(json.query?.pages || {})[0]
  const ii = page?.imageinfo?.[0]
  if (!ii) return null
  return { term: 'override', title: page.title || title, ii }
}

function cleanMeta(v) {
  return (v || '').replace(/<[^>]+>/g, '').trim()
}

async function search(slug, terms) {
  for (const term of terms) {
    const params = new URLSearchParams({
      action: 'query', format: 'json', generator: 'search',
      gsrsearch: `filetype:bitmap ${term}`, gsrnamespace: '6', gsrlimit: '12',
      prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '1600',
    })
    const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: UA })
    const json = await res.json()
    const pages = Object.values(json.query?.pages || {})
    const good = pages
      .map(p => ({ title: p.title || '', ii: p.imageinfo?.[0] }))
      .filter(({ ii }) => ii
        && ii.mime === 'image/jpeg'
        && ii.width >= 1200 && ii.width > ii.height
        && OK_LICENSES.test(ii.extmetadata?.LicenseShortName?.value || ''))
      .sort((a, b) => b.ii.width - a.ii.width)
    if (good[0]) return { term, ...good[0] }
  }
  return null
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(path.dirname(MANIFEST), { recursive: true })
  let manifest = {}
  try { manifest = JSON.parse(await readFile(MANIFEST, 'utf8')) } catch {}

  for (const [slug, terms] of SLUGS) {
    if (ONLY.length && !ONLY.includes(slug)) continue
    const file = path.join(OUT_DIR, `${slug}.jpg`)
    if (existsSync(file) && !FORCE) {
      console.log(`skip ${slug} (exists)`)
      continue
    }
    let hit = null
    if (OVERRIDES[slug]) hit = await byTitle(OVERRIDES[slug])
    if (!hit) hit = await search(slug, terms)
    if (!hit) {
      console.log(`MISS ${slug} (${terms.join(' | ')})`)
      continue
    }
    const { ii, title, term } = hit
    const bin = Buffer.from(await (await fetch(ii.thumburl || ii.url, { headers: UA })).arrayBuffer())
    await writeFile(file, bin)
    manifest[slug] = {
      file: `${slug}.jpg`,
      title,
      artist: cleanMeta(ii.extmetadata?.Artist?.value) || 'Unknown',
      license: ii.extmetadata?.LicenseShortName?.value || 'Unknown',
      source: ii.descriptionurl || ii.url,
      search: term,
      width: ii.width,
      height: ii.height,
    }
    console.log(`ok ${slug} ← ${title} [${manifest[slug].license}] ${(bin.length / 1024).toFixed(0)}KB`)
  }

  // CREDITS.md 由 manifest 全量重建（幂等）
  const lines = Object.keys(manifest).length
    ? Object.values(manifest).map(m =>
      `- **${m.file}** — ${m.title.replace(/_/g, ' ')} by ${m.artist}, ${m.license}, ${m.source} (search: ${m.search})\n`)
    : []
  await writeFile(CREDITS,
    '# Hiking Route Cover Image Credits\n\n'
    + 'All images from Wikimedia Commons, fetched by scripts/fetch-hiking-route-images.mjs.\n'
    + 'CC BY / CC BY-SA images require attribution — keep this file reachable from the site.\n\n'
    + lines.join(''))
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2))
  console.log(`credits rebuilt: ${lines.length} entries`)
}

main().catch(e => { console.error(e); process.exit(1) })
