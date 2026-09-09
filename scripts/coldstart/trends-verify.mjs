// Google Trends 关键词验证脚本（explore → widgetdata 流程，免登录）
// ---------------------------------------------------------------
// 用法：
//   node scripts/coldstart/trends-verify.mjs "chengdu food" "xian itinerary"
// 对每个关键词：
//   1. explore 拿 TIMESERIES / RELATED_QUERIES widget token
//   2. multiline 拉近 12 个月热度曲线 → 判断词是否存在（无数据点 = Trends 语料库中无搜索量）
//   3. relatedsearches 拉 top + rising 关联查询 → 长尾词验证
// 关键坑（2026-09 实测）：
//   - 必须先访问 /trends/ 拿 NID cookie，否则 API 一律 429
//   - token 必须作为独立 URL 参数（&token=...），塞进 req JSON 里会 400
// 输出：stdout JSON，另存 scripts/coldstart/out/trends/<slug>.json
// ---------------------------------------------------------------
import fs from 'node:fs'
import path from 'node:path'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function strip(json) {
  // Trends API 返回体带 )]}' 防 JSON 劫持前缀
  return JSON.parse(json.replace(/^\)\]\}',?\s*\n?/, ''))
}

// 先访问一次 Trends 首页拿 NID/CONSENT cookie，否则 API 一律 429
let _cookie = null
async function trendsCookie() {
  if (_cookie) return _cookie
  const res = await fetch('https://trends.google.com/trends/', {
    headers: { 'user-agent': UA, accept: 'text/html' },
  })
  const setCookies = res.headers.getSetCookie ? res.headers.getSetCookie() : []
  _cookie = setCookies.map((sc) => sc.split(';')[0]).join('; ')
  return _cookie
}

async function trendsGet(url, retry = 2) {
  const cookie = await trendsCookie()
  const res = await fetch(url, {
    headers: { 'user-agent': UA, accept: 'application/json', cookie },
  })
  if (res.status === 429 && retry > 0) {
    await sleep(3000)
    return trendsGet(url, retry - 1)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url.slice(0, 100)}`)
  return strip(await res.text())
}

async function explore(keyword, hl) {
  const req = {
    comparisonItem: [{ keyword, geo: '', time: 'today 12-m' }],
    category: 0,
    property: '',
  }
  const url =
    `https://trends.google.com/trends/api/explore?hl=${hl}&tz=0&req=` +
    encodeURIComponent(JSON.stringify(req))
  const j = await trendsGet(url)
  return j.widgets || []
}

function widgetUrl(kind, widget) {
  return (
    `https://trends.google.com/trends/api/widgetdata/${kind}?hl=en-US&tz=0&req=` +
    encodeURIComponent(JSON.stringify(widget.request)) +
    '&token=' +
    encodeURIComponent(widget.token)
  )
}

function slugify(kw) {
  return kw.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '') || 'kw'
}

async function verifyKeyword(keyword, hl) {
  const out = {
    keyword,
    exists: false,
    avgInterest: null,
    lastMonthInterest: null,
    relatedQueries: null,
    error: null,
  }
  try {
    const widgets = await explore(keyword, hl)
    const ts = widgets.find((w) => w.id === 'TIMESERIES')
    const rq = widgets.find((w) => w.id === 'RELATED_QUERIES')

    if (ts) {
      const data = await trendsGet(widgetUrl('multiline', ts))
      const points = data.default?.timelineData || []
      const values = points.map((d) => d.value[0] || 0)
      out.exists = values.some((v) => v > 0)
      if (out.exists) {
        out.avgInterest = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
        out.lastMonthInterest = Math.round(values.slice(-4).reduce((a, b) => a + b, 0) / 4)
      }
      await sleep(500)
    }

    if (rq) {
      const data = await trendsGet(widgetUrl('relatedsearches', rq))
      const rl = data.default?.rankedList || []
      const fmt = (list) =>
        (list?.rankedKeyword || []).slice(0, 12).map((k) => ({
          q: k.query,
          interest: k.value,
          growth: k.formattedValue,
        }))
      out.relatedQueries = { top: fmt(rl[0]), rising: fmt(rl[1]) }
    }
  } catch (e) {
    out.error = e.message
  }
  return out
}

const keywords = process.argv.slice(2)
if (!keywords.length) {
  console.error('用法: node scripts/coldstart/trends-verify.mjs "kw1" "kw2" ...')
  process.exit(1)
}

const outDir = path.resolve('scripts/coldstart/out/trends')
fs.mkdirSync(outDir, { recursive: true })

const results = []
for (const kw of keywords) {
  const hl = /[\u4e00-\u9fff]/.test(kw) ? 'zh-CN' : 'en-US'
  process.stderr.write(`→ ${kw} ... `)
  const r = await verifyKeyword(kw, hl)
  process.stderr.write(
    r.error
      ? `ERR ${r.error}\n`
      : `${r.exists ? `存在(均值${r.avgInterest}/近月${r.lastMonthInterest})` : '无搜索量'}\n`
  )
  results.push(r)
  fs.writeFileSync(path.join(outDir, `${slugify(kw)}.json`), JSON.stringify(r, null, 2))
  await sleep(800)
}
console.log(JSON.stringify(results, null, 2))
