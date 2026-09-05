// 一次性脚本：从 Wikimedia Commons 下载购物栏目图片（商品卡片 + 指南封面）
// 按关键词搜索 Commons，过滤 jpeg/尺寸/长宽比后取缩略图存入 public/images/。
// 用法：node scripts/coldstart/fetch-shopping-images.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const UA = 'china-travel-guide-site-build/1.0 (https://chinatravel.world; contact: site@chinatravel.world)'

// 目标清单：slug → 目标目录 + 备选搜索词（依次尝试）
const targets = [
  // 购物商品卡片
  { slug: 'powerbank-chargers', dir: 'shopping', queries: ['power bank', 'USB charger cable', 'USB cables'] },
  { slug: 'xiaomi-luggage', dir: 'shopping', queries: ['suitcase luggage', 'trolley suitcase', 'luggage suitcase shop'] },
  { slug: 'huawei-freeclip', dir: 'shopping', queries: ['Huawei store', 'Huawei shop China', 'Huawei earbuds'] },
  { slug: 'ssd-storage', dir: 'shopping', queries: ['solid-state drive', 'SSD drive', 'NVMe SSD'] },
  { slug: 'e-reader', dir: 'shopping', queries: ['e-book reader', 'Kindle e-reader', 'ebook reader device'] },
  { slug: 'huaqiangbei-tech', dir: 'shopping', queries: ['Huaqiangbei', 'Huaqiangbei Shenzhen', 'SEG Electronics Market'] },
  { slug: 'prescription-glasses', dir: 'shopping', queries: ['eyeglasses shop', 'optician shop', 'eyeglass store'] },
  { slug: 'uniqlo-linen', dir: 'shopping', queries: ['Uniqlo store', 'Uniqlo shop', 'Uniqlo Shanghai'] },
  { slug: 'down-jacket', dir: 'shopping', queries: ['down jacket', 'winter jacket person', 'puffer jacket'] },
  { slug: 'suzhou-silk', dir: 'shopping', queries: ['Suzhou silk', 'silk fabric China', 'silk weaving'] },
  { slug: 'hanfu-souvenirs', dir: 'shopping', queries: ['hanfu', 'hanfu woman', 'Han Chinese clothing'] },
  { slug: 'chinese-tea', dir: 'shopping', queries: ['Longjing tea', 'Chinese tea leaves', 'tea shop China'] },
  { slug: 'regional-food-gifts', dir: 'shopping', queries: ['Chinese pastries', 'mooncake gift box', 'Chinese bakery'] },
  { slug: 'acg-acrylic-stands', dir: 'shopping', queries: ['acrylic standee', 'anime merchandise shop', 'itasha goods'] },
  { slug: 'chinese-figures', dir: 'shopping', queries: ['anime figure collection', 'garage kit figure', 'scale figure collection'] },
  { slug: 'fountain-pens', dir: 'shopping', queries: ['fountain pen', 'fountain pens collection', ' fountain pen writing'] },
  { slug: 'xuan-paper-calligraphy', dir: 'shopping', queries: ['Xuan paper', 'Chinese calligraphy brush', 'inkstone calligraphy'] },
  { slug: 'museum-gifts', dir: 'shopping', queries: ['National Museum of China', 'museum gift shop', 'museum shop'] },
  // 指南封面
  { slug: 'what-to-buy-in-china', dir: 'guides', queries: ['Nanjing Road Shanghai', 'shopping street China', 'Beijing shopping street'] },
  { slug: 'china-tax-refund-guide', dir: 'guides', queries: ['Renminbi banknotes', 'Chinese yuan banknotes', 'RMB money'] },
  { slug: 'taobao-jd-for-tourists', dir: 'guides', queries: ['courier delivery China', 'parcel delivery courier', 'express delivery China'] },
]

// Commons 搜索：返回符合过滤条件的第一个文件
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
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': UA },
  })
  if (!res.ok) throw new Error(`API ${res.status}`)
  const data = await res.json()
  const pages = Object.values(data.query?.pages || {})
  for (const p of pages) {
    const info = p.imageinfo?.[0]
    if (!info) continue
    if (info.mime !== 'image/jpeg') continue
    if (info.width < 700 || info.height < 450) continue
    const ratio = info.width / info.height
    if (ratio < 0.75 || ratio > 2.1) continue
    // 排除明显的地图/Logo/文件名含 map 的结果
    if (/map|logo|icon|diagram|chart/i.test(p.title)) continue
    return { title: p.title, thumb: info.thumburl, width: info.width, height: info.height }
  }
  return null
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`download ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 15_000) throw new Error('file too small (<15KB), likely placeholder')
  writeFileSync(dest, buf)
}

for (const t of targets) {
  const dir = resolve(root, `public/images/${t.dir}`)
  mkdirSync(dir, { recursive: true })
  const dest = resolve(dir, `${t.slug}.jpg`)
  let done = false
  for (const q of t.queries) {
    try {
      const hit = await searchCommons(q)
      if (!hit) { console.log(`[miss] ${t.slug} :: "${q}"`); continue }
      await download(hit.thumb, dest)
      console.log(`[ok] ${t.slug} <- "${q}" :: ${hit.title} (${hit.width}x${hit.height})`)
      done = true
      break
    } catch (e) {
      console.log(`[err] ${t.slug} :: "${q}" :: ${e.message}`)
    }
  }
  if (!done) console.log(`[FAIL] ${t.slug} — no query produced a usable image`)
}
console.log('done')
