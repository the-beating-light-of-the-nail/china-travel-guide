// 饺子图鉴配图抓取 - Wikimedia Commons 自由许可图片
// ---------------------------------------------------------------
// 用法：node scripts/fetch-dumpling-images.mjs
// 按下方清单从 Commons 搜索并下载 900px 宽缩略图到 public/images/dumplings/，
// 仅接受 CC0 / Public domain / CC BY / CC BY-SA（Fair use 等一律跳过），
// 署名信息追加到 public/images/dumplings/CREDITS.md（CC BY / CC BY-SA 需保留署名）。
// 重跑安全：已存在的文件跳过；--force 覆盖重选。
// ---------------------------------------------------------------

import { mkdir, writeFile, appendFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const OUT_DIR = path.resolve('public/images/dumplings')
const CREDITS = path.join(OUT_DIR, 'CREDITS.md')
const UA = 'china-travel-guide-site-builder/1.0 (https://chinatravel.world)'

// 精选文件（人工核对过内容的），优先于搜索
const FIXED = {
  'jiaozi': 'File:Chinese dumplings (Jiaozi) (2196005904).jpg',
  'zhong-dumplings': 'File:Chengdu Zhong Dumpling(Zhong Jiaozi).jpg',
  'chaoshou': 'File:Dumplings in chili oil (20180218142633).jpg',
  'guotie': 'File:15 pan fried dumplings of Bafang Yunji 20150305.jpg',
  'suantang-shuijiao': 'File:Suantang Shuijiao at Shan Wei Shi Zu, Sanyuanqiao (20211214173457).jpg',
  'shengjianbao': 'File:Shengjian Mantou on a Pan.jpg',
  'xiaolongbao': 'File:Crab xiaolongbao in shanghai.jpg',
  'guide-cover': 'File:Three dim sum in steamer basket.jpg',
}

// slug → Commons 搜索词（按顺序尝试，取第一个可用的）
const WANTED = [
  ['jiaozi', ['Zhong dumplings', 'jiaozi plate chinese dumplings', 'jiaozi']],
  ['zhong-dumplings', ['Zhong dumpling', '钟水饺', 'sichuan dumplings chili oil']],
  ['chaoshou', ['chili oil wonton', 'hong you chao shou', 'chaoshou']],
  ['guotie', ['guotie', 'potsticker dumplings fried']],
  ['suantang-shuijiao', ['dumplings soup bowl chinese', '酸汤水饺', 'jiaozi soup']],
  ['shengjianbao', ['shengjian mantou', 'shengjianbao']],
  ['xiaolongbao', ['xiaolongbao', 'xiaolongbao steamer']],
  ['baozi', ['baozi', 'steamed buns basket china']],
  ['har-gow', ['har gow', 'ha gao shrimp dumpling']],
  ['shumai', ['shumai', 'siu mai dim sum']],
  ['crystal-dumplings', ['crystal dumpling', 'chieu chow fun guo', 'chaozhou dumpling']],
  ['wonton-noodles', ['wonton noodles', 'wonton soup cantonese']],
  ['tangyuan', ['tangyuan sesame', 'tangyuan']],
  ['zongzi', ['zongzi', 'rice dumplings bamboo leaf']],
  ['guide-cover', ['dim sum assortment', 'dim sum table', 'yum cha']],
]

const OK_LICENSE_RE = /^(cc0|public domain|pd|cc by( [- ]?sa)?)/i
const SUFFIX_OK = s => /\.(jpe?g|png)$/i.test(new URL(s).pathname)

async function api(params) {
  const url = new URL('https://commons.wikimedia.org/w/api.php')
  Object.entries({ format: 'json', origin: '*', ...params }).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

function stripHtml(s) {
  return (s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

// 从一批搜索结果中挑一张：自由许可 + 宽≥700 + 横构图优先
function pick(pages) {
  const list = Object.values(pages || {})
    .map(p => p.imageinfo?.[0] && { title: p.title, ...p.imageinfo[0] })
    .filter(i => i && SUFFIX_OK(i.thumburl || i.url))
    .filter(i => (i.width || 0) >= 700)
  const withLicense = list.map(i => {
    const meta = i.extmetadata || {}
    const lic = stripHtml(meta.LicenseShortName?.value) || ''
    return { ...i, lic, artist: stripHtml(meta.Artist?.value) || '', ok: OK_LICENSE_RE.test(lic) }
  })
  const ok = withLicense.filter(i => i.ok)
  const landscape = ok.filter(i => i.width >= i.height)
  return landscape[0] || ok[0] || null
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const force = process.argv.includes('--force')
  if (force && existsSync(CREDITS)) await writeFile(CREDITS, '# Image credits (Wikimedia Commons)\n\n')
  else if (!existsSync(CREDITS)) await writeFile(CREDITS, '# Image credits (Wikimedia Commons)\n\n')

  const report = []
  for (const [slug, queries] of WANTED) {
    const file = path.join(OUT_DIR, `${slug}.jpg`)
    if (existsSync(file) && !force) {
      report.push(`${slug}: EXISTS, skip`)
      continue
    }
    let chosen = null
    if (FIXED[slug]) {
      const data = await api({
        action: 'query',
        titles: FIXED[slug],
        prop: 'imageinfo',
        iiprop: 'url|size|extmetadata',
        iiurlwidth: 900,
      })
      const page = Object.values(data.query?.pages || {})[0]
      chosen = page?.imageinfo?.[0]
        ? pick({ [page.pageid]: page })
        : null
      if (!chosen) report.push(`${slug}: FIXED file not found: ${FIXED[slug]}`)
    }
    for (const q of queries) {
      if (chosen) break
      try {
        const data = await api({
          action: 'query',
          generator: 'search',
          gsrsearch: `filetype:bitmap ${q}`,
          gsrnamespace: 6,
          gsrlimit: 12,
          prop: 'imageinfo',
          iiprop: 'url|size|extmetadata',
          iiurlwidth: 900,
        })
        chosen = pick(data.query?.pages)
        if (chosen) break
      } catch (e) {
        console.error(`  search "${q}" failed: ${e.message}`)
      }
    }
    if (!chosen) {
      report.push(`${slug}: NO MATCH`)
      continue
    }
    const img = await fetch(chosen.thumburl || chosen.url, { headers: { 'User-Agent': UA } })
    if (!img.ok) {
      report.push(`${slug}: download ${img.status}`)
      continue
    }
    const buf = Buffer.from(await img.arrayBuffer())
    await writeFile(file, buf)
    const credit = `- ${slug}.jpg — [${chosen.title.replace(/^File:/, '')}](https://commons.wikimedia.org/wiki/${encodeURIComponent(chosen.title)}) — ${chosen.lic}${chosen.artist ? ` — ${chosen.artist}` : ''}`
    await appendFile(CREDITS, credit + '\n')
    report.push(`${slug}: ${chosen.title} [${chosen.lic}] ${chosen.width}x${chosen.height}`)
  }
  console.log(report.join('\n'))
}

main()
