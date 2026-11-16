#!/usr/bin/env node
// Uniqlo 跨区价格快照抓取 —— 承接 GSC 德语查询 "ist uniqlo in china günstiger" 的工具页数据源
// 参考 github.com/lthinktime/uniqlo-price 的端点发现（CN/HK hmall 搜索 API），
// 但本站用户是「来中国的外国游客」，比价维度是 CN vs 读者本国，故改为：
//   固定常青商品篮子（全球同 6 位码）× 各国官网商品页（uniqlo.com 系 SPA 初始 state JSON 含 prices.base.value）
// 用法：node scripts/coldstart/uniqlo-fetch.mjs
// 输出：scripts/coldstart/out/uniqlo/snapshot.json（人工精选 7 款后整理进 data/uniqlo-data.ts）
// 刷新节奏：服饰价格季度级稳定，汇率波动才敏感；建议每季度重跑一次，页面头部同步快照日期。
// 坑位备忘（2026-11-17 实测）：
//   - uniqlo.com 系（us/uk/de/fr/it/es/jp/kr）商品页可用普通 fetch 跟随 302 拿到（Akamai 间歇拦截，需串行+重试）
//   - 商品存在判据：最终页 200 且含 "prices":{"base" ；302 本身无条件发生，不能当存在性判据
//   - 商品编号分区域 SKU 不同，但全球 6 位品番码一致：URL 形如 /products/E{code}-000
//   - frankfurter.app 本机被墙，汇率改用 open.er-api.com（免密钥，日更）
//   - TH 站 uniqlo.co.th 本机完全不可达（DNS/TCP 均超时），放弃 TH 列
// 快照纪律：capturedAt 写进输出；data/uniqlo-data.ts 头注释同步标注快照日期（同 Numbeo/B站播放量规则）。

import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, 'out/uniqlo')

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

// 终选商品篮子：6 款全球同码常青款（2026-11-17 全区域验证通过；US 不售 482522，属正常缺口）
// 选码坑位：同款商品 CN 与国际站品番可能不同（如高级轻型羽绒 CN 478273 在欧美无此码），
// 必须选「CN 与国际站同码」的款；亚麻衬衫为季节款冬季全球下架，不入篮子（只在页面文案里引用）；
// 另有「同码不同客群」陷阱：490468 摇粒绒 CN 为成人款、国际站是 KIDS 款——比价前必须核对各区 og:title 客群。
const CANDIDATES = [
  { code: '482522', cnName: 'AIRism棉混纺圆领T恤/短袖' },
  { code: '478965', cnName: 'HEATTECH ULTRA WARM圆领T恤/长袖' },
  { code: '486600', cnName: '法兰绒衬衫/长袖' },
  { code: '486116', cnName: '防风摇粒绒拉链连帽外套/长袖' },
  { code: '488684', cnName: '赤耳牛仔裤/直筒水洗' },
  { code: '486176', cnName: '无缝羽绒连帽外套' },
]

// uniqlo.com 系国际站（同平台，商品页 state JSON 同构）
const PAGE_REGIONS = [
  { id: 'us', label: 'United States', currency: 'USD', base: 'https://www.uniqlo.com/us/en/products/', lang: 'en-US' },
  { id: 'uk', label: 'United Kingdom', currency: 'GBP', base: 'https://www.uniqlo.com/uk/en/products/', lang: 'en-GB' },
  { id: 'de', label: 'Germany', currency: 'EUR', base: 'https://www.uniqlo.com/de/de/products/', lang: 'de-DE' },
  { id: 'fr', label: 'France', currency: 'EUR', base: 'https://www.uniqlo.com/fr/fr/products/', lang: 'fr-FR' },
  { id: 'it', label: 'Italy', currency: 'EUR', base: 'https://www.uniqlo.com/it/it/products/', lang: 'it-IT' },
  { id: 'es', label: 'Spain', currency: 'EUR', base: 'https://www.uniqlo.com/es/es/products/', lang: 'es-ES' },
  { id: 'jp', label: 'Japan', currency: 'JPY', base: 'https://www.uniqlo.com/jp/ja/products/', lang: 'ja-JP' },
  { id: 'kr', label: 'South Korea', currency: 'KRW', base: 'https://www.uniqlo.com/kr/ko/products/', lang: 'ko-KR' },
]

const CN_API = 'https://d.uniqlo.cn/p/hmall-sc-service/search/searchWithDescriptionAndConditions/zh_CN'
const HK_API = 'https://d.uniqlo.com.hk/p/search/products/by-description'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ---------- CN / HK：hmall 搜索 API（按全球码精确匹配） ----------
// 坑位：CN 响应 resp=[facets, products]；HK 响应 resp[0]={conditionList, productList, ...}（2026-11-17 实测）
async function fetchHmall(api, origin, payloadBuilder, code) {
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      origin,
      referer: origin + '/search.html',
      'user-agent': UA,
    },
    body: JSON.stringify(payloadBuilder(code)),
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`hmall HTTP ${res.status}`)
  const j = await res.json()
  if (j && j.success === false) throw new Error(`hmall ${j.msgCode || j.msg}`)
  let products = []
  if (Array.isArray(j.resp) && Array.isArray(j.resp[1])) products = j.resp[1] // CN
  else if (j.resp && j.resp[0] && Array.isArray(j.resp[0].productList)) products = j.resp[0].productList // HK
  return products.find((p) => p.code === code) || null
}

const cnPayload = (code) => ({
  url: `/search.html?description=${code}&searchType=1`,
  pageInfo: { page: 1, pageSize: 20, withSideBar: 'Y' },
  belongTo: 'pc',
  rank: 'overall',
  priceRange: { low: 0, high: 0 },
  color: [], size: [], season: [], material: [], sex: [],
  categoryFilter: {}, identity: [], insiteDescription: '', exist: [],
  searchFlag: true, description: code,
})

const hkPayload = (code) => ({
  pageInfo: { page: 1, pageSize: 24 },
  belongTo: 'pc',
  rank: 'overall',
  priceRange: { low: 0, high: 0 },
  color: [], size: [], identity: [], exist: [],
  searchFlag: true, description: code, stockFilter: 'warehouse',
})

// ---------- uniqlo.com 系：商品页初始 state JSON ----------
async function fetchPageRegion(region, code) {
  const url = region.base + 'E' + code + '-000'
  let html = null
  let finalUrl = null
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: {
          'user-agent': UA,
          accept: 'text/html,application/xhtml+xml',
          'accept-language': region.lang + ',en;q=0.8',
        },
        signal: AbortSignal.timeout(25000),
      })
      if (res.status === 404) return null // 明确不存在，不重试
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      html = await res.text()
      finalUrl = res.url
      break
    } catch (err) {
      if (attempt === 3) throw err
      await sleep(4000 * attempt)
    }
  }
  if (!html || !html.includes('"prices":{"base"')) return null
  const ogTitle = (html.match(/property="og:title" content="([^"]*)"/) || [])[1] || ''
  const m = html.match(
    /"prices":\{"base":\{"currency":\{"code":"([A-Z]{3})","symbol":"[^"]*"\},"value":([\d.]+)\},"promo":(null|\{[^{]*?"value":([\d.]+)[^}]*\})/
  )
  if (!m) throw new Error('price JSON not matched')
  return {
    title: ogTitle.replace(/\s*\|\s*UNIQLO.*$/, ''),
    price: Number(m[2]),
    promo: m[3] === 'null' ? null : Number(m[4]),
    currency: m[1],
    url: finalUrl,
  }
}

// ---------- 汇率（1 CNY = rates[CUR]，open.er-api.com 日更） ----------
async function fetchFx() {
  const res = await fetch('https://open.er-api.com/v6/latest/CNY', { signal: AbortSignal.timeout(15000) })
  const j = await res.json()
  if (j.result !== 'success') throw new Error('fx failed')
  return { rates: j.rates, asOf: j.time_last_update_utc }
}

// ---------- 主流程 ----------
async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  const capturedAt = new Date().toISOString()
  console.log(`[uniqlo-fetch] ${capturedAt} 开始：${CANDIDATES.length} 款 × (CN+HK API + ${PAGE_REGIONS.length} 商品页) + FX`)

  const fx = await fetchFx()
  console.log(`[fx] ${fx.asOf}`)

  const rows = []
  for (const item of CANDIDATES) {
    const row = { code: item.code, cnName: item.cnName, regions: {} }
    // CN
    try {
      const p = await fetchHmall(CN_API, 'https://www.uniqlo.cn', cnPayload, item.code)
      row.regions.cn = p
        ? {
            title: p.name,
            price: p.minPrice,
            originPrice: p.originPrice,
            currency: 'CNY',
            url: `https://www.uniqlo.cn/product-detail.html?productCode=${encodeURIComponent(p.productCode)}`,
          }
        : null
    } catch (e) {
      row.regions.cn = { error: e.message }
    }
    await sleep(800)
    // HK
    try {
      const p = await fetchHmall(HK_API, 'https://www.uniqlo.com.hk', hkPayload, item.code)
      row.regions.hk = p
        ? {
            title: p.name,
            price: p.minPrice,
            originPrice: p.originPrice,
            currency: 'HKD',
            url: `https://www.uniqlo.com.hk/zh_HK/product-detail.html?productCode=${encodeURIComponent(p.productCode)}`,
          }
        : null
    } catch (e) {
      row.regions.hk = { error: e.message }
    }
    await sleep(800)
    // 国际站
    for (const region of PAGE_REGIONS) {
      try {
        const r = await fetchPageRegion(region, item.code)
        row.regions[region.id] = r
        process.stdout.write(`  ${item.code}/${region.id}:${r ? r.price : '-'} `)
      } catch (e) {
        row.regions[region.id] = { error: e.message }
      }
      await sleep(700)
    }
    console.log('')
    rows.push(row)
  }

  const snapshot = { capturedAt, fxAsOf: fx.asOf, fxPerCny: fx.rates, rows }
  const outPath = resolve(OUT_DIR, 'snapshot.json')
  writeFileSync(outPath, JSON.stringify(snapshot, null, 2), 'utf8')
  console.log(`[uniqlo-fetch] 完成 → ${outPath}`)

  // 控制台速览：每款各区折 CNY
  const toCny = (v, cur) => (fx.rates[cur] ? (v / fx.rates[cur]).toFixed(0) : '?')
  console.log('\ncode | ' + ['cn','hk','us','uk','de','fr','it','es','jp','kr'].map(r => r.padEnd(6)).join(' '))
  for (const row of rows) {
    const cells = ['cn','hk','us','uk','de','fr','it','es','jp','kr'].map((r) => {
      const v = row.regions[r]
      if (!v) return '·'
      if (v.error) return 'ERR'
      return toCny(v.price, v.currency).padEnd(6)
    })
    console.log(row.code + ' | ' + cells.join(' '))
  }
}

main().catch((e) => {
  console.error('[uniqlo-fetch] FATAL', e)
  process.exit(1)
})
