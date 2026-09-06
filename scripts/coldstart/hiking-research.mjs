// 徒步专栏 B 站资源批量调研脚本（复用 bili-search.mjs 的 wbi 签名逻辑）
// 用法：node scripts/coldstart/hiking-research.mjs
// 输出：scripts/coldstart/out/hiking-research.json（含所有关键词的宽口径候选）

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; Win64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const TAB = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61,
  26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20,
  34, 44, 52,
]

const KEYWORDS = [
  '虎跳峡高路徒步',
  '雨崩徒步',
  '武功山徒步',
  '四姑娘山长坪沟徒步',
  '贡嘎环线徒步',
  '冈仁波齐转山',
  '珠峰东坡徒步',
  '华山夜爬',
  '箭扣长城徒步',
  '喀纳斯徒步',
  '腾格里沙漠徒步',
  '稻城亚丁徒步',
  '格聂徒步',
  '乌孙古道徒步',
  '扎尕那徒步',
  '梅里北坡徒步',
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getCookieJar() {
  const res = await fetch('https://www.bilibili.com/', { headers: { 'user-agent': UA } })
  const setCookies = res.headers.getSetCookie ? res.headers.getSetCookie() : []
  const jar = {}
  for (const sc of setCookies) {
    const kv = sc.split(';')[0]
    const i = kv.indexOf('=')
    jar[kv.slice(0, i)] = kv.slice(i + 1)
  }
  return jar
}

const cookieHeader = (jar) =>
  Object.entries(jar).map(([k, v]) => `${k}=${v}`).join('; ')

async function getWbiKey() {
  const res = await fetch('https://api.bilibili.com/x/web-interface/nav', {
    headers: { 'user-agent': UA, referer: 'https://www.bilibili.com/' },
  })
  const json = await res.json()
  const { img_url, sub_url } = json.data.wbi_img
  const imgKey = img_url.split('/').pop().split('.')[0]
  const subKey = sub_url.split('/').pop().split('.')[0]
  return TAB.map((i) => (imgKey + subKey)[i]).join('').slice(0, 32)
}

function wbiSign(params, mixinKey) {
  const wts = Math.floor(Date.now() / 1000)
  const all = { ...params, wts }
  const qs = Object.keys(all).sort().map((k) => {
    const v = String(all[k]).replace(/[!'()*]/g, '')
    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  }).join('&')
  const wRid = crypto.createHash('md5').update(qs + mixinKey).digest('hex')
  return `${qs}&w_rid=${wRid}`
}

async function searchVideo(jar, mixinKey, keyword, page) {
  const params = { search_type: 'video', keyword, page: String(page) }
  const qs = wbiSign(params, mixinKey)
  const res = await fetch(`https://api.bilibili.com/x/web-interface/wbi/search/type?${qs}`, {
    headers: {
      'user-agent': UA,
      referer: `https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword)}`,
      cookie: cookieHeader(jar),
      accept: 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9',
    },
  })
  return res.json()
}

const stripTags = (s) => String(s || '').replace(/<[^>]+>/g, '')

function parseDuration(d) {
  const parts = String(d || '').split(':').map(Number)
  if (parts.some(Number.isNaN)) return 0
  return parts.reduce((acc, p) => acc * 60 + p, 0)
}

function mapSearchItem(r, keyword) {
  return {
    keyword,
    bvid: r.bvid,
    title: stripTags(r.title),
    author: r.author,
    play: r.play,
    duration: r.duration,
    durationSec: parseDuration(r.duration),
    pubdateISO: new Date(r.pubdate * 1000).toISOString().slice(0, 10),
    pic: r.pic.replace(/^http:/, 'https:'),
    url: `https://www.bilibili.com/video/${r.bvid}`,
  }
}

const jar = await getCookieJar()
const mixinKey = await getWbiKey()
const report = []

for (const kw of KEYWORDS) {
  const items = []
  for (let p = 1; p <= 2; p++) {
    const json = await searchVideo(jar, mixinKey, kw, p)
    if (json.code !== 0) {
      console.error(`[${kw}] API code=${json.code} ${json.message}`)
      break
    }
    items.push(...(json.data.result || []).filter((r) => r.type === 'video').map((r) => mapSearchItem(r, kw)))
    await sleep(1100)
  }
  // 宽口径：≥4 分钟、播放 ≥8000、2021 年后
  const kept = items.filter(
    (r) => r.durationSec >= 240 && r.play >= 8000 && r.pubdateISO >= '2021-01-01'
  )
  kept.sort((a, b) => b.play - a.play)
  report.push({ keyword: kw, total: items.length, kept: kept.length, results: kept })
  console.log(`[${kw}] 原始 ${items.length} 条，宽口径 ${kept.length} 条`)
  for (const r of kept.slice(0, 8)) {
    console.log(`   ${r.play}\t${r.duration}\t${r.pubdateISO}\t${r.author}\t${r.title.slice(0, 42)}\t${r.bvid}`)
  }
  await sleep(1400)
}

const outDir = path.resolve('scripts/coldstart/out')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(
  path.join(outDir, 'hiking-research.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), report }, null, 2),
  'utf-8'
)
console.log(`\n已保存: ${outDir}/hiking-research.json`)
