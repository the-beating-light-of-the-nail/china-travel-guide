// 优衣库实时查询 API（/api/uniqlo-lookup）
// ---------------------------------------------------------------
// 浏览器直连各官网接口会被 CORS 拦死，本路由做服务端代理（同上游 uniqlo-price
// 的 server.js 角色）。输入 { q: 商品码或官网商品链接, locale }，输出 10 市场实时价。
// 防护与纪律（详见 data/uniqlo-data.ts 与页面免责声明）：
// - 每 IP 5 次/分钟；同码结果缓存 10 分钟（均为实例内存版，serverless 多实例
//   下是宽松限制——本页量级足够，避免引入外部状态）
// - 查询记录写 Supabase ctg_uniqlo_queries 供「用户关注什么商品」分析：
//   写入失败静默跳过（env 缺失/表不存在/网络异常都不影响主流程）
// - 各区 7s 超时并行；部分市场失败返回 null，全失败返回 404
// ---------------------------------------------------------------

import { createHash } from 'node:crypto'
import { extractUniqloCode, lookupAllRegions } from '../utils/uniqlo'

const RATE_LIMIT = 5 // 次
const RATE_WINDOW = 60_000 // ms
const CACHE_TTL = 10 * 60_000 // ms

const hits = new Map<string, number[]>() // ip -> timestamps
const cache = new Map<string, { expires: number, payload: any }>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW)
  if (arr.length >= RATE_LIMIT) {
    hits.set(ip, arr)
    return true
  }
  arr.push(now)
  hits.set(ip, arr)
  return false
}

function ipHash(ip: string): string {
  return createHash('sha256').update('ctg-uniqlo:' + ip).digest('hex').slice(0, 16)
}

/** 日志写入（PostgREST 插入；2.5s 超时，任何失败静默）。
 *  env 未配置时的兜底：打到 Vercel 函数日志（免费版短期保留），配置好后自动切换入库。 */
async function logQuery(params: Record<string, unknown>) {
  const { supabaseUrl, supabaseSecretKey } = useRuntimeConfig()
  if (!supabaseUrl || !supabaseSecretKey) {
    console.log(JSON.stringify({ t: 'uniqlo_lookup', ...params, results: undefined }))
    return
  }
  try {
    await fetch(`${supabaseUrl}/rest/v1/ctg_uniqlo_queries`, {
      method: 'POST',
      headers: {
        apikey: supabaseSecretKey,
        Authorization: `Bearer ${supabaseSecretKey}`,
        'content-type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(params),
      signal: AbortSignal.timeout(2500),
    })
  } catch {
    // 日志失败不影响主流程
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ q?: string, locale?: string }>(event).catch(() => ({}) as any)
  const raw = String(body?.q || '').trim()
  const locale = String(body?.locale || 'en').slice(0, 5)
  const code = extractUniqloCode(raw)

  if (!code) {
    throw createError({ statusCode: 400, statusMessage: 'invalid_code' })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  if (rateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'rate_limited' })
  }

  const cached = cache.get(code)
  if (cached && cached.expires > Date.now()) {
    // 缓存命中也记一笔（分析口径=用户真实查询量）；不阻塞响应
    logQuery({ code, locale, ip_hash: ipHash(ip), cached: true, found_count: cached.payload.foundCount, cn_title: cached.payload.regions?.cn?.title ?? null, cn_price: cached.payload.regions?.cn?.price ?? null, results: cached.payload.regions })
    return { ...cached.payload, cached: true }
  }

  const regions = await lookupAllRegions(code)
  const values = Object.values(regions)
  const found = values.filter(v => v).length
  const errored = values.filter(v => v === undefined).length

  if (found === 0) {
    // 全市场无此码也记录（负面信号同样有分析价值）
    logQuery({ code, locale, ip_hash: ipHash(ip), cached: false, found_count: 0, cn_title: null, cn_price: null, results: { errored } })
    throw createError({ statusCode: 404, statusMessage: 'not_found' })
  }

  const payload = {
    code,
    fetchedAt: new Date().toISOString(),
    foundCount: found,
    regions,
  }
  cache.set(code, { expires: Date.now() + CACHE_TTL, payload })

  logQuery({ code, locale, ip_hash: ipHash(ip), cached: false, found_count: found, cn_title: regions?.cn?.title ?? null, cn_price: regions?.cn?.price ?? null, results: regions })

  return { ...payload, cached: false }
})
