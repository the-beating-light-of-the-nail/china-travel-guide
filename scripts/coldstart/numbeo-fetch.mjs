#!/usr/bin/env node
// Numbeo 城市物价快照抓取 —— 网页版 displayCurrency=USD，替代 $260/月 的付费 API
// 用法：node scripts/coldstart/numbeo-fetch.mjs
// 输出：scripts/coldstart/out/numbeo/prices.json + 每城市原始 HTML 快照（供追溯）
// 数据用途：data/cost-data.ts（/tools/china-trip-cost-calculator/ 物价对比页）
// 刷新节奏：数据为低频波动（物价半年变动 <5%），每半年重跑一次即可。
// 坑位备忘：Numbeo/Cloudflare 对并发敏感（并行 7 连抓实测 ECONNRESET），必须串行 + 间隔；
//           USD 显示模式下页面自动转英制（lb/mile/pint），此处统一归一化为公制存 JSON。
// 快照纪律：fetchedAt 写进输出；data/cost-data.ts 头注释同步标注快照日期（同 B站播放量快照规则）。

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, 'out/numbeo')

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

// 城市清单：4 中国 + 9 对照（纽约/伦敦/巴黎/东京/首尔/柏林/马德里/罗马/曼谷）
const CITIES = [
  { key: 'shanghai', slugs: ['Shanghai'] },
  { key: 'beijing', slugs: ['Beijing'] },
  { key: 'chengdu', slugs: ['Chengdu'] },
  { key: 'xian', slugs: ['Xian', 'Xi%27An', 'Xi-An'] },
  { key: 'new-york', slugs: ['New-York'] },
  { key: 'tokyo', slugs: ['Tokyo'] },
  { key: 'seoul', slugs: ['Seoul'] },
  { key: 'paris', slugs: ['Paris'] },
  { key: 'london', slugs: ['London'] },
  { key: 'berlin', slugs: ['Berlin'] },
  { key: 'madrid', slugs: ['Madrid'] },
  { key: 'rome', slugs: ['Rome'] },
  { key: 'bangkok', slugs: ['Bangkok'] },
]

// 抓取条目（label 为页面 <td> 内唯一子串；USD 模式下部分条目为英制单位）
const ITEMS = [
  { id: 'mealCheap', label: 'Meal at an Inexpensive Restaurant' },
  { id: 'mealMid', label: 'Meal for Two at a Mid-Range Restaurant' },
  { id: 'mcd', label: 'Combo Meal at McDonald' },
  { id: 'cappuccino', label: 'Cappuccino (Regular Size)' },
  { id: 'beer', label: 'Domestic Draft Beer (1 Pint)' },
  { id: 'water', label: 'Bottled Water (12 oz)' },
  { id: 'metro', label: 'Ticket (Local Transport)' },
  { id: 'taxiStart', label: 'Taxi Start (Standard Tariff)' },
  { id: 'taxiMile', label: 'Taxi 1 mile (Standard Tariff)' },
  { id: 'cinema', label: 'Cinema Ticket (International' },
  { id: 'milk', label: 'Milk (Regular, 1 Liter)' },
  { id: 'applesLb', label: 'Apples (1 lb)' },
  { id: 'nike', label: 'Nike Running Shoes (Mid-Range)' },
  { id: 'jeans', label: 'Jeans (Levi' },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchWithRetry(url, tries = 3) {
  const backoff = [3000, 8000, 15000]
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'user-agent': UA,
          accept: 'text/html,application/xhtml+xml',
          'accept-language': 'en-US,en;q=0.9',
        },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const html = await res.text()
      if (!html.includes('first_currency')) throw new Error('page has no price table (challenge page?)')
      return html
    } catch (err) {
      console.error(`    attempt ${i + 1} failed: ${err.message}`)
      if (i < tries - 1) await sleep(backoff[i])
    }
  }
  return null
}

function extractItem(html, label) {
  // 结构：<td ...>LABEL...</td> ... <span class="first_currency">&#36;2.82</span>
  const re = new RegExp(
    label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
      "[\\s\\S]{0,200}?first_currency[^>]*>(?:&#36;|\\$)([0-9.]+)",
  )
  const m = html.match(re)
  return m ? Number.parseFloat(m[1]) : null
}

function normalize(usd) {
  const out = { ...usd }
  // 英制 → 公制：1 mile = 1.609344 km；1 lb = 0.45359237 kg
  if (usd.taxiMile != null) out.taxiPerKm = +(usd.taxiMile / 1.609344).toFixed(3)
  if (usd.taxiStart != null && out.taxiPerKm != null)
    out.taxi10km = +(usd.taxiStart + 10 * out.taxiPerKm).toFixed(2)
  if (usd.applesLb != null) out.applesKg = +(usd.applesLb / 0.45359237).toFixed(2)
  delete out.taxiMile
  delete out.applesLb
  return out
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  const result = {
    fetchedAt: new Date().toISOString().slice(0, 10),
    source: 'https://www.numbeo.com/cost-of-living/in/<City>?displayCurrency=USD',
    method: 'crowd-sourced page snapshot (Numbeo web, USD display)',
    cities: {},
  }

  for (const city of CITIES) {
    let html = null
    let usedSlug = null
    for (const slug of city.slugs) {
      // 已有同日快照直接复用，避免重复抓取触发限流
      const cachePath = resolve(OUT_DIR, `${city.key}.html`)
      if (existsSync(cachePath)) {
        const cached = readFileSync(cachePath, 'utf8')
        if (cached.includes('first_currency')) {
          html = cached
          usedSlug = slug + ' (cached)'
          break
        }
      }
      console.log(`→ ${city.key} (${slug})`)
      html = await fetchWithRetry(
        `https://www.numbeo.com/cost-of-living/in/${slug}?displayCurrency=USD`,
      )
      if (html) {
        writeFileSync(cachePath, html)
        usedSlug = slug
        break
      }
    }
    if (!html) {
      console.error(`✗ ${city.key}: all slugs failed`)
      continue
    }

    const usd = {}
    const missing = []
    for (const item of ITEMS) {
      const v = extractItem(html, item.label)
      if (v == null) missing.push(item.id)
      usd[item.id] = v
    }
    const entries = html.match(/based on ([\d,]+) entries/)?.[1]
    const contributors = html.match(/by ([\d,]+) contributors/)?.[1]
    const pageMonth = html.match(/<title>Cost of Living in [^.]+\. ([A-Z][a-z]{2} \d{4})\./)?.[1]

    result.cities[city.key] = {
      slug: usedSlug,
      pageMonth,
      entries: entries ? Number(entries.replace(/,/g, '')) : null,
      contributors: contributors ? Number(contributors.replace(/,/g, '')) : null,
      usd: normalize(usd),
      missing,
    }
    console.log(
      `  ✓ ${city.key}: ${pageMonth}, ${entries ?? '?'} entries` +
        (missing.length ? ` — MISSING: ${missing.join(',')}` : ''),
    )
    await sleep(2500)
  }

  const outPath = resolve(OUT_DIR, 'prices.json')
  writeFileSync(outPath, JSON.stringify(result, null, 2))
  console.log(`\nwrote ${outPath}`)
  const failed = Object.entries(result.cities).filter(([, c]) => c.missing.length)
  if (failed.length) {
    console.log('items missing per city:')
    for (const [k, c] of failed) console.log(`  ${k}: ${c.missing.join(',')}`)
  }
}

main()
