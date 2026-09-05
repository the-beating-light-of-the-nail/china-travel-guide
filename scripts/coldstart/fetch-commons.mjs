// Wikimedia Commons 图片抓取（Guizhou 目的地页冷启动）
// 用法：node scripts/coldstart/fetch-commons.mjs
// 按主题搜索 Commons，下载横版 JPEG 到 public/images/cities/guizhou/，
// 出处与许可写入 scripts/coldstart/out/commons-credits.json（图片自托管，仍需保留署名信息）

import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR = path.resolve('public/images/cities/guizhou')
const CREDITS_FILE = path.resolve('scripts/coldstart/out/commons-credits.json')
const UA = { 'User-Agent': 'chinatravel-world/1.0 (cold-start image fetch; contact via site)' }

// [搜索词, 文件名前缀, 下载数]
const SUBJECTS = [
  ['Huangguoshu Waterfall', 'huangguoshu', 2],
  ['Fanjingshan', 'fanjingshan', 2],
  ['Xijiang Miao Village', 'xijiang', 1],
  ['Xiaoqikong', 'xiaoqikong', 1],
  ['Huajiang Canyon Bridge', 'huajiang_bridge', 1],
  ['Baling River Bridge', 'baling_bridge', 1],
  ['Jiaxiu Tower', 'jiaxiu', 1],
  ['Qingyan Ancient Town', 'qingyan', 1],
  ['Guiyang cityscape', 'guiyang', 1],
  ['Wanfenglin', 'wanfenglin', 1],
  ['sour soup fish Guizhou', 'suantangyu', 1],
  ['Chang Wang noodles', 'changwang', 1],
]

async function api(params) {
  const url = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams(params)
  const res = await fetch(url, { headers: UA })
  return res.json()
}

function pick(pages) {
  // 只收横版、边长>=700 的 JPEG，按搜索相关度（index）排序
  return pages
    .filter(p => {
      const ii = p.imageinfo?.[0]
      if (!ii || ii.mime !== 'image/jpeg') return false
      return (ii.width >= 700 && ii.width > ii.height) || Math.min(ii.width, ii.height) >= 700
    })
    .sort((a, b) => (a.index ?? 99) - (b.index ?? 99))
}

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(path.dirname(CREDITS_FILE), { recursive: true })
const credits = {}

for (const [query, name, want] of SUBJECTS) {
  try {
    const d = await api({
      action: 'query', generator: 'search', gsrsearch: query, gsrnamespace: 6,
      gsrlimit: 10, prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata',
      iiurlwidth: 1400, format: 'json',
    })
    const pages = Object.values(d?.query?.pages ?? {})
    const good = pick(pages)
    let got = 0
    for (const p of good) {
      if (got >= want) break
      const ii = p.imageinfo[0]
      const fn = `${name}${want > 1 ? `_${got + 1}` : ''}.jpg`
      const img = await fetch(ii.thumburl || ii.url, { headers: UA })
      if (!img.ok) continue
      const buf = Buffer.from(await img.arrayBuffer())
      fs.writeFileSync(path.join(OUT_DIR, fn), buf)
      const meta = ii.extmetadata ?? {}
      credits[fn] = {
        title: p.title,
        source: ii.descriptionurl || ii.url,
        license: meta.LicenseShortName?.value || '',
        author: (meta.Artist?.value || '').replace(/<[^>]+>/g, '').slice(0, 120),
      }
      got++
    }
    console.log(`${name}: ${got}/${want} ← "${query}"`)
  } catch (e) {
    console.log(`${name}: FAIL ${e.message}`)
  }
  await new Promise(r => setTimeout(r, 400))
}

fs.writeFileSync(CREDITS_FILE, JSON.stringify(credits, null, 2), 'utf-8')
console.log(`credits → ${CREDITS_FILE}`)
