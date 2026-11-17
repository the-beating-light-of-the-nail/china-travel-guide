// 优衣库各区域官网实时取价（server 专用；与 scripts/coldstart/uniqlo-fetch.mjs 同源逻辑的运行时版）
// ---------------------------------------------------------------
// 通道（2026-11-17 实测定稿，坑位详见 fetch 脚本头注释）：
// - CN: d.uniqlo.cn hmall 搜索 API，商品列表在 resp[1]
// - HK: d.uniqlo.com.hk hmall 搜索 API，商品列表在 resp[0].productList
// - us/uk/de/fr/it/es/jp/kr: uniqlo.com 商品页 E{code}-000（跟 302 后 200 且含
//   "prices":{"base" 即存在；302 无条件发生不能当存在判据）
// ---------------------------------------------------------------

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

export interface UniqloLiveEntry {
  price: number
  originPrice?: number
  currency: string
  url: string
  title: string
}

export const UNIQLO_PAGE_REGIONS = [
  { id: 'us', base: 'https://www.uniqlo.com/us/en/products/', lang: 'en-US' },
  { id: 'uk', base: 'https://www.uniqlo.com/uk/en/products/', lang: 'en-GB' },
  { id: 'de', base: 'https://www.uniqlo.com/de/de/products/', lang: 'de-DE' },
  { id: 'fr', base: 'https://www.uniqlo.com/fr/fr/products/', lang: 'fr-FR' },
  { id: 'it', base: 'https://www.uniqlo.com/it/it/products/', lang: 'it-IT' },
  { id: 'es', base: 'https://www.uniqlo.com/es/es/products/', lang: 'es-ES' },
  { id: 'jp', base: 'https://www.uniqlo.com/jp/ja/products/', lang: 'ja-JP' },
  { id: 'kr', base: 'https://www.uniqlo.com/kr/ko/products/', lang: 'ko-KR' },
] as const

/** 从用户输入提取全球 6 位品番码（支持裸码 / 国际站商品链接 E123456-000） */
export function extractUniqloCode(input: string): string | null {
  const m = input.match(/\b[Ee]?(\d{6})\b/)
  return m ? m[1] : null
}

async function fetchHmall(api: string, origin: string, body: unknown) {
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      origin,
      referer: origin + '/search.html',
      'user-agent': UA,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(7000),
  })
  if (!res.ok) throw new Error(`hmall HTTP ${res.status}`)
  const j = await res.json()
  if (j && j.success === false) throw new Error(`hmall ${j.msgCode || j.msg}`)
  if (Array.isArray(j.resp) && Array.isArray(j.resp[1])) return j.resp[1] // CN
  if (j.resp?.[0]?.productList) return j.resp[0].productList // HK
  return []
}

async function fetchChina(code: string): Promise<UniqloLiveEntry | null> {
  const list = await fetchHmall('https://d.uniqlo.cn/p/hmall-sc-service/search/searchWithDescriptionAndConditions/zh_CN', 'https://www.uniqlo.cn', {
    url: `/search.html?description=${code}&searchType=1`,
    pageInfo: { page: 1, pageSize: 20, withSideBar: 'Y' },
    belongTo: 'pc',
    rank: 'overall',
    priceRange: { low: 0, high: 0 },
    color: [], size: [], season: [], material: [], sex: [],
    categoryFilter: {}, identity: [], insiteDescription: '', exist: [],
    searchFlag: true, description: code,
  })
  const p = list.find((x: any) => x.code === code)
  if (!p) return null
  return {
    price: p.minPrice,
    originPrice: p.originPrice,
    currency: 'CNY',
    url: `https://www.uniqlo.cn/product-detail.html?productCode=${encodeURIComponent(p.productCode)}`,
    title: p.name,
  }
}

async function fetchHongKong(code: string): Promise<UniqloLiveEntry | null> {
  const list = await fetchHmall('https://d.uniqlo.com.hk/p/search/products/by-description', 'https://www.uniqlo.com.hk', {
    pageInfo: { page: 1, pageSize: 24 },
    belongTo: 'pc',
    rank: 'overall',
    priceRange: { low: 0, high: 0 },
    color: [], size: [], identity: [], exist: [],
    searchFlag: true, description: code, stockFilter: 'warehouse',
  })
  const p = list.find((x: any) => x.code === code)
  if (!p) return null
  return {
    price: p.minPrice,
    originPrice: p.originPrice,
    currency: 'HKD',
    url: `https://www.uniqlo.com.hk/zh_HK/product-detail.html?productCode=${encodeURIComponent(p.productCode)}`,
    title: p.name,
  }
}

async function fetchPageRegion(region: (typeof UNIQLO_PAGE_REGIONS)[number], code: string): Promise<UniqloLiveEntry | null> {
  const res = await fetch(region.base + 'E' + code + '-000', {
    redirect: 'follow',
    headers: {
      'user-agent': UA,
      accept: 'text/html,application/xhtml+xml',
      'accept-language': region.lang + ',en;q=0.8',
    },
    signal: AbortSignal.timeout(7000),
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const html = await res.text()
  if (!html.includes('"prices":{"base"')) return null
  const ogTitle = (html.match(/property="og:title" content="([^"]*)"/) || [])[1] || ''
  const m = html.match(/"prices":\{"base":\{"currency":\{"code":"([A-Z]{3})","symbol":"[^"]*"\},"value":([\d.]+)\},"promo":(null|\{[^{]*?"value":([\d.]+)[^}]*\})/)
  if (!m) throw new Error('price JSON not matched')
  return {
    price: Number(m[2]),
    originPrice: m[3] === 'null' ? undefined : Number(m[4]),
    currency: m[1],
    url: res.url,
    title: ogTitle.replace(/\s*\|\s*UNIQLO.*$/, ''),
  }
}

/** 并行查全部 10 市场；单区失败不拖垮整体（记为 null），网络级异常记为 undefined */
export async function lookupAllRegions(code: string) {
  const jobs: Array<[string, Promise<UniqloLiveEntry | null>]> = [
    ['cn', fetchChina(code).catch(() => undefined as any)],
    ['hk', fetchHongKong(code).catch(() => undefined as any)],
    ...UNIQLO_PAGE_REGIONS.map(r => [r.id, fetchPageRegion(r, code).catch(() => undefined as any)] as [string, Promise<UniqloLiveEntry | null>]),
  ]
  const settled = await Promise.all(jobs.map(async ([id, p]) => [id, await p] as const))
  return Object.fromEntries(settled)
}
