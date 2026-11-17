// 优衣库跨区价格对比数据（/tools/uniqlo-price-comparison/ 页面数据源）
// ---------------------------------------------------------------
// 来源纪律（同 Numbeo/B站播放量快照规则，快照日期必须随数据一起更新）：
// - 价格：优衣库各区域官网在售价。中国大陆/香港走 hmall 搜索 API（端点发现自开源项目
//   lthinktime/uniqlo-price，致谢），美/英/德/法/意/西/日/韩走商品详情页初始 state JSON。
//   抓取于北京时间 2026-11-17（UTC 2026-11-16T18:00Z），当日各区在售价，促销价如实记录。
//   刷新方式：node scripts/coldstart/uniqlo-fetch.mjs（服饰价格季度级稳定，建议每季度重跑）
// - 汇率：open.er-api.com 日更参考汇率，2026-11-16 快照，单位为 1 CNY 兑各币
// - 选样：6 款全球同 6 位品番码的常青款（跨区同款是比价成立的前提，选码坑位见脚本头注释）；
//   US 不售 482522、HK 无 482522 精确匹配，如实留空；478965 国际站为女装版型（CN 未分），已注明
// - 亚麻衬衫系夏季款、冬季各区下架，不入表格（Level 2 口径的「亚麻便宜约 40%」轶事引用自购物页）
// ---------------------------------------------------------------

import type { L } from './localize'
import { fillLocaleFallbacks } from './localize'

export const UNIQLO_SNAPSHOT = {
  fetchedAt: '2026-11-17',
  source: 'uniqlo.cn / uniqlo.com.hk (hmall API) + uniqlo.com 8 regions (product pages)',
  refresher: 'node scripts/coldstart/uniqlo-fetch.mjs',
}

export const UNIQLO_FX = {
  date: '2026-11-16',
  source: 'open.er-api.com daily reference rates',
  /** 1 CNY 兑各币（CNY 恒为 1，折算函数直接除以本键） */
  perCny: { CNY: 1, USD: 0.149737, EUR: 0.13585, GBP: 0.113351, JPY: 23.940724, KRW: 199.920032, HKD: 1.175013 },
} as const

export type UniqloRegionId = 'cn' | 'hk' | 'us' | 'uk' | 'de' | 'fr' | 'it' | 'es' | 'jp' | 'kr'

export interface UniqloRegionMeta {
  id: UniqloRegionId
  flag: string
  isChina: boolean
  name: L
  store: string
  currency: string
}

/** 区域清单（cn 恒为对照基准；其余为游客本国市场下拉项） */
export const UNIQLO_REGIONS: UniqloRegionMeta[] = [
  { id: 'cn', flag: '🇨🇳', isChina: true, name: { en: 'Mainland China', zh: '中国大陆', ja: '中国本土' }, store: 'uniqlo.cn', currency: 'CNY' },
  { id: 'hk', flag: '🇭🇰', isChina: false, name: { en: 'Hong Kong', zh: '中国香港', ja: '香港' }, store: 'uniqlo.com.hk', currency: 'HKD' },
  { id: 'us', flag: '🇺🇸', isChina: false, name: { en: 'United States', zh: '美国', ja: 'アメリカ' }, store: 'uniqlo.com/us', currency: 'USD' },
  { id: 'uk', flag: '🇬🇧', isChina: false, name: { en: 'United Kingdom', zh: '英国', ja: 'イギリス' }, store: 'uniqlo.com/uk', currency: 'GBP' },
  { id: 'de', flag: '🇩🇪', isChina: false, name: { en: 'Germany', zh: '德国', ja: 'ドイツ' }, store: 'uniqlo.com/de', currency: 'EUR' },
  { id: 'fr', flag: '🇫🇷', isChina: false, name: { en: 'France', zh: '法国', ja: 'フランス' }, store: 'uniqlo.com/fr', currency: 'EUR' },
  { id: 'it', flag: '🇮🇹', isChina: false, name: { en: 'Italy', zh: '意大利', ja: 'イタリア' }, store: 'uniqlo.com/it', currency: 'EUR' },
  { id: 'es', flag: '🇪🇸', isChina: false, name: { en: 'Spain', zh: '西班牙', ja: 'スペイン' }, store: 'uniqlo.com/es', currency: 'EUR' },
  { id: 'jp', flag: '🇯🇵', isChina: false, name: { en: 'Japan', zh: '日本', ja: '日本' }, store: 'uniqlo.com/jp', currency: 'JPY' },
  { id: 'kr', flag: '🇰🇷', isChina: false, name: { en: 'South Korea', zh: '韩国', ja: '韓国' }, store: 'uniqlo.com/kr', currency: 'KRW' },
]

export interface UniqloRegionEntry {
  /** 当日在售价（本币） */
  price: number
  /** 划线原价（本币），促销时与 price 不同 */
  originPrice?: number
  currency: string
  /** 官网商品页（每格价格可溯源） */
  url: string
  /** 该区官网商品名（og:title，供核对同款） */
  title: string
}

export interface UniqloItem {
  id: string
  /** 全球 6 位品番码 */
  code: string
  icon: string
  name: L
  note?: L
  regions: Partial<Record<UniqloRegionId, UniqloRegionEntry>>
}

/** 商品篮子（2026-11-17 快照；价格为当日官网在售价，含各区促销） */
const rawItems: UniqloItem[] = [
  {
    id: 'airism-tee',
    code: '482522',
    icon: '👕',
    name: { en: 'AIRism Cotton Crew-Neck T-Shirt', zh: 'AIRism 棉混纺圆领T恤（短袖）', ja: 'エアリズムコットンクルーネックT' },
    note: {
      en: 'Not sold in the US under this code; China price is for the regular fit',
      zh: '美国官网无此码；中国为常规版型',
      ja: '米国ではこの品番なし',
    },
    regions: {
      cn: { price: 79, originPrice: 79, currency: 'CNY', url: 'https://www.uniqlo.cn/product-detail.html?productCode=u0000000069452', title: 'AIRism棉混纺圆领T恤/短袖' },
      uk: { price: 14.9, currency: 'GBP', url: 'https://www.uniqlo.com/uk/en/products/E482522-000/00', title: 'Mens AIRism Cotton T-Shirt' },
      de: { price: 14.9, currency: 'EUR', url: 'https://www.uniqlo.com/de/de/products/E482522-000/00', title: 'AIRism Baumwolle T-Shirt (Rundhals)' },
      fr: { price: 14.9, currency: 'EUR', url: 'https://www.uniqlo.com/fr/fr/products/E482522-000/00', title: 'T-shirt AIRism en coton' },
      it: { price: 14.9, currency: 'EUR', url: 'https://www.uniqlo.com/it/it/products/E482522-000/00', title: 'T-shirt AIRism Cotone' },
      es: { price: 14.9, currency: 'EUR', url: 'https://www.uniqlo.com/es/es/products/E482522-000/00', title: 'AIRism Camiseta algodón' },
      jp: { price: 1290, currency: 'JPY', url: 'https://www.uniqlo.com/jp/ja/products/E482522-000/00', title: 'エアリズムコットンクルーネックT' },
      kr: { price: 14900, currency: 'KRW', url: 'https://www.uniqlo.com/kr/ko/products/E482522-000/00', title: 'AIRism코튼크루넥T' },
    },
  },
  {
    id: 'heattech-ultra',
    code: '478965',
    icon: '♨️',
    name: { en: 'HEATTECH Ultra Warm Crew-Neck LS Tee', zh: 'HEATTECH 超温暖圆领T恤（长袖）', ja: '超極暖ヒートテッククルーネックT' },
    note: {
      en: "Women's cut on international sites; China/HK prices are promo prices of the day",
      zh: '国际站为女装版型；中港价格为当日促销价',
      ja: '海外サイトはレディース裁断',
    },
    regions: {
      cn: { price: 149, originPrice: 199, currency: 'CNY', url: 'https://www.uniqlo.cn/product-detail.html?productCode=u0000000066376', title: 'HEATTECH ULTRA WARM圆领T恤/长袖' },
      hk: { price: 149, originPrice: 199, currency: 'HKD', url: 'https://www.uniqlo.com.hk/zh_HK/product-detail.html?productCode=u0000000054207', title: 'HEATTECH 超極暖圓領 T 恤 [長袖]' },
      us: { price: 34.9, currency: 'USD', url: 'https://www.uniqlo.com/us/en/products/E478965-000/00', title: 'Womens HEATTECH Ultra Warm T-Shirt' },
      uk: { price: 24.9, currency: 'GBP', url: 'https://www.uniqlo.com/uk/en/products/E478965-000/00', title: 'Womens HEATTECH Ultra Warm Crew Neck T-Shirt' },
      de: { price: 29.9, currency: 'EUR', url: 'https://www.uniqlo.com/de/de/products/E478965-000/00', title: 'HEATTECH Ultra Warm Thermo Langarmshirt' },
      fr: { price: 29.9, currency: 'EUR', url: 'https://www.uniqlo.com/fr/fr/products/E478965-000/00', title: 'T-shirt HEATTECH Ultra Chaud' },
      it: { price: 29.9, currency: 'EUR', url: 'https://www.uniqlo.com/it/it/products/E478965-000/00', title: 'Maglia Termica HEATTECH Ultra Caldo' },
      es: { price: 29.9, currency: 'EUR', url: 'https://www.uniqlo.com/es/es/products/E478965-000/00', title: 'HEATTECH Ultracálido Camiseta térmica' },
      jp: { price: 2990, currency: 'JPY', url: 'https://www.uniqlo.com/jp/ja/products/E478965-000/00', title: '超極暖ヒートテッククルーネックT' },
      kr: { price: 34900, currency: 'KRW', url: 'https://www.uniqlo.com/kr/ko/products/E478965-000/00', title: '히트텍울트라웜크루넥T' },
    },
  },
  {
    id: 'flannel-shirt',
    code: '486600',
    icon: '👔',
    name: { en: 'Flannel Shirt (Long Sleeve, heather)', zh: '法兰绒衬衫（长袖）', ja: 'フランネルシャツ' },
    regions: {
      cn: { price: 199, originPrice: 199, currency: 'CNY', url: 'https://www.uniqlo.cn/product-detail.html?productCode=u0000000074518', title: '法兰绒衬衫/长袖' },
      hk: { price: 199, originPrice: 199, currency: 'HKD', url: 'https://www.uniqlo.com.hk/zh_HK/product-detail.html?productCode=u0000000056577', title: '法蘭絨恤衫 [長袖]' },
      us: { price: 49.9, currency: 'USD', url: 'https://www.uniqlo.com/us/en/products/E486600-000/00', title: 'Unisex Flannel Shirt' },
      uk: { price: 34.9, currency: 'GBP', url: 'https://www.uniqlo.com/uk/en/products/E486600-000/00', title: 'Unisex Flannel Shirt (Regular Collar)' },
      de: { price: 39.9, currency: 'EUR', url: 'https://www.uniqlo.com/de/de/products/E486600-000/00', title: 'Flanellhemd (Kent-Kragen, meliert)' },
      fr: { price: 39.9, currency: 'EUR', url: 'https://www.uniqlo.com/fr/fr/products/E486600-000/00', title: 'Chemise en flanelle (Chinée)' },
      it: { price: 39.9, currency: 'EUR', url: 'https://www.uniqlo.com/it/it/products/E486600-000/00', title: 'Camicia Flanella' },
      es: { price: 39.9, currency: 'EUR', url: 'https://www.uniqlo.com/es/es/products/E486600-000/00', title: 'Camisa franela' },
      jp: { price: 3990, currency: 'JPY', url: 'https://www.uniqlo.com/jp/ja/products/E486600-000/00', title: 'フランネルシャツ/ヘザー' },
      kr: { price: 49900, currency: 'KRW', url: 'https://www.uniqlo.com/kr/ko/products/E486600-000/00', title: '플란넬셔츠' },
    },
  },
  {
    id: 'fleece-hoodie',
    code: '486116',
    icon: '🧥',
    name: { en: 'Windproof Fleece Full-Zip Hoodie', zh: '防风摇粒绒拉链连帽外套', ja: '撥水フリースフルジップパーカー' },
    regions: {
      cn: { price: 249, originPrice: 299, currency: 'CNY', url: 'https://www.uniqlo.cn/product-detail.html?productCode=u0000000074897', title: '防风摇粒绒拉链连帽外套/长袖' },
      hk: { price: 199, originPrice: 299, currency: 'HKD', url: 'https://www.uniqlo.com.hk/zh_HK/product-detail.html?productCode=u0000000056684', title: '防風搖粒絨拉鏈連帽外套' },
      us: { price: 69.9, currency: 'USD', url: 'https://www.uniqlo.com/us/en/products/E486116-000/00', title: 'Mens Windproof Fleece Full-Zip Hoodie' },
      uk: { price: 49.9, currency: 'GBP', url: 'https://www.uniqlo.com/uk/en/products/E486116-000/00', title: 'Windproof Fleece Full-Zip Hoodie' },
      de: { price: 59.9, currency: 'EUR', url: 'https://www.uniqlo.com/de/de/products/E486116-000/00', title: 'Winddichter Fleece Parka' },
      fr: { price: 59.9, currency: 'EUR', url: 'https://www.uniqlo.com/fr/fr/products/E486116-000/00', title: 'Sweat coupe-vent zippé à capuche (Polaire)' },
      it: { price: 59.9, currency: 'EUR', url: 'https://www.uniqlo.com/it/it/products/E486116-000/00', title: 'Pile Antivento con Zip' },
      es: { price: 59.9, currency: 'EUR', url: 'https://www.uniqlo.com/es/es/products/E486116-000/00', title: 'Sudadera polar cortavientos capucha' },
      jp: { price: 5990, currency: 'JPY', url: 'https://www.uniqlo.com/jp/ja/products/E486116-000/00', title: '撥水フリースフルジップパーカー' },
      kr: { price: 79900, currency: 'KRW', url: 'https://www.uniqlo.com/kr/ko/products/E486116-000/00', title: '바람막이후리스풀집후드' },
    },
  },
  {
    id: 'selvedge-jeans',
    code: '488684',
    icon: '👖',
    name: { en: 'Selvedge Straight-Fit Jeans', zh: '赤耳面料直筒牛仔裤', ja: 'ストレートジーンズ/セルビッジ' },
    regions: {
      cn: { price: 299, originPrice: 299, currency: 'CNY', url: 'https://www.uniqlo.cn/product-detail.html?productCode=u0000000074696', title: '直筒牛仔裤/水洗产品' },
      hk: { price: 299, originPrice: 299, currency: 'HKD', url: 'https://www.uniqlo.com.hk/zh_HK/product-detail.html?productCode=u0000000057302', title: '直腳牛仔褲' },
      us: { price: 49.9, currency: 'USD', url: 'https://www.uniqlo.com/us/en/products/E488684-000/00', title: 'Mens Straight Jeans' },
      uk: { price: 39.9, currency: 'GBP', url: 'https://www.uniqlo.com/uk/en/products/E488684-000/00', title: 'Mens Selvedge Straight Jeans' },
      de: { price: 49.9, currency: 'EUR', url: 'https://www.uniqlo.com/de/de/products/E488684-000/00', title: 'Selvedge Jeans (Straight Fit)' },
      fr: { price: 49.9, currency: 'EUR', url: 'https://www.uniqlo.com/fr/fr/products/E488684-000/00', title: 'Jean Selvedge droit' },
      it: { price: 49.9, currency: 'EUR', url: 'https://www.uniqlo.com/it/it/products/E488684-000/00', title: 'Jeans Cimosa Taglio Dritto' },
      es: { price: 49.9, currency: 'EUR', url: 'https://www.uniqlo.com/es/es/products/E488684-000/00', title: 'Vaquero Selvedge recto' },
      jp: { price: 4990, currency: 'JPY', url: 'https://www.uniqlo.com/jp/ja/products/E488684-000/00', title: 'ストレートジーンズ/セルビッジ' },
      kr: { price: 59900, currency: 'KRW', url: 'https://www.uniqlo.com/kr/ko/products/E488684-000/00', title: '젠더리스 스트레이트진(셀비지)' },
    },
  },
  {
    id: 'seamless-down',
    code: '486176',
    icon: '🪶',
    name: { en: 'Seamless Down Parka', zh: '无缝羽绒连帽外套', ja: 'シームレスダウンパーカ' },
    regions: {
      cn: { price: 899, originPrice: 899, currency: 'CNY', url: 'https://www.uniqlo.cn/product-detail.html?productCode=u0000000075716', title: '无缝羽绒连帽外套' },
      hk: { price: 799, originPrice: 799, currency: 'HKD', url: 'https://www.uniqlo.com.hk/zh_HK/product-detail.html?productCode=u0000000056854', title: '無縫羽絨連帽外套' },
      us: { price: 179.9, currency: 'USD', url: 'https://www.uniqlo.com/us/en/products/E486176-000/00', title: 'Mens Seamless Down Parka' },
      uk: { price: 129.9, currency: 'GBP', url: 'https://www.uniqlo.com/uk/en/products/E486176-000/00', title: 'Mens Seamless Down Parka' },
      de: { price: 149.9, currency: 'EUR', url: 'https://www.uniqlo.com/de/de/products/E486176-000/00', title: 'Seamless Down Daunenparka' },
      fr: { price: 149.9, currency: 'EUR', url: 'https://www.uniqlo.com/fr/fr/products/E486176-000/00', title: 'Doudoune sans coutures' },
      it: { price: 149.9, currency: 'EUR', url: 'https://www.uniqlo.com/it/it/products/E486176-000/00', title: 'Piumino Senza Cuciture con Cappuccio' },
      es: { price: 149.9, currency: 'EUR', url: 'https://www.uniqlo.com/es/es/products/E486176-000/00', title: 'Parka plumas sin costuras' },
      jp: { price: 14900, currency: 'JPY', url: 'https://www.uniqlo.com/jp/ja/products/E486176-000/00', title: 'シームレスダウンパーカ' },
      kr: { price: 169000, currency: 'KRW', url: 'https://www.uniqlo.com/kr/ko/products/E486176-000/00', title: '심리스다운파카' },
    },
  },
]

/** 各语种默认对照市场（SSG 首屏静态渲染，爬虫直接可抓；zh 用户出境购物最关心日本价） */
export const UNIQLO_DEFAULT_HOME: Record<string, UniqloRegionId> = {
  en: 'us', zh: 'jp', ja: 'jp', ko: 'kr', de: 'de', fr: 'fr', es: 'es', it: 'it', th: 'us',
}

/** 各语种默认展示币种（同物价对比器） */
export const UNIQLO_DEFAULT_CURRENCY: Record<string, string> = {
  en: 'USD', zh: 'CNY', ko: 'KRW', ja: 'JPY', th: 'THB', de: 'EUR', fr: 'EUR', es: 'EUR', it: 'EUR',
}

/** 展示币种（同物价对比器的币种表；THB 供泰语用户换算，泰站数据不可达未入表） */
export const UNIQLO_CURRENCIES = [
  { code: 'USD', symbol: '$', decimals: 2 },
  { code: 'EUR', symbol: '€', decimals: 2 },
  { code: 'GBP', symbol: '£', decimals: 2 },
  { code: 'JPY', symbol: '¥', decimals: 0 },
  { code: 'CNY', symbol: '¥', decimals: 1 },
  { code: 'KRW', symbol: '₩', decimals: 0 },
  { code: 'THB', symbol: '฿', decimals: 0 },
] as const

// ---------------------------------------------------------------
// 页面与组件文案（en/zh 必填；ja 为下注语种，其余语言构建时回退英文）
// ---------------------------------------------------------------

/** 对比器 UI 文案 */
export const uniqloUi = fillLocaleFallbacks({
  homeMarket: { en: 'Your home market', zh: '你的本国市场', ja: 'お住まいの市場' },
  currency: { en: 'Display currency', zh: '显示币种', ja: '表示通貨' },
  avgCheaper: { en: 'cheaper on average', zh: '平均更便宜', ja: '平均して安い' },
  avgPricier: { en: 'pricier on average', zh: '平均更贵', ja: '平均して高い' },
  biggestGap: { en: 'Biggest gap', zh: '价差最大', ja: '最大の差' },
  itemCol: { en: 'Item (same global code)', zh: '商品（全球同码同款）', ja: 'アイテム（世界共通品番）' },
  chinaCol: { en: 'China price', zh: '中国价格', ja: '中国価格' },
  localNote: { en: 'local currency · links to official store', zh: '本币价格 · 链接官网商品页', ja: '現地通貨・公式ストアにリンク' },
  notSold: { en: 'not listed', zh: '该区无售', ja: '取扱なし' },
  cheaper: { en: 'cheaper', zh: '更便宜', ja: '安い' },
  pricier: { en: 'pricier', zh: '更贵', ja: '高い' },
  similar: { en: 'About the same', zh: '基本持平', ja: 'ほぼ同じ' },
  refundHint: {
    en: 'Add the ~11% departure tax refund and the China price drops further',
    zh: '再算上约 11% 离境退税，中国实付价更低',
    ja: '出国税還付（約11%）を加えると中国の実質価格はさらに下がります',
  },
  // ---- 实时查价（/api/uniqlo-lookup 服务端代理）----
  lookupLabel: { en: 'Live price check — any item', zh: '实时查价——任意单品', ja: 'リアルタイム検索——任意アイテム' },
  lookupPlaceholder: {
    en: 'Item code from the tag (e.g. 486600) or official store link',
    zh: '吊牌上的商品番号（如 486600）或官网商品链接',
    ja: 'タグの品番（例: 486600）または公式ストアのリンク',
  },
  lookupBtn: { en: 'Check live prices', zh: '实时查价', ja: '検索' },
  looking: { en: 'Checking 10 official stores…', zh: '正在查询 10 地官网…', ja: '10市場の公式ストアを確認中…' },
  liveBadge: { en: 'Live', zh: '实时', ja: 'ライブ' },
  backToSnapshot: { en: '← Back to the classic picks', zh: '← 返回常青款快照', ja: '← 定番スナップショットに戻る' },
  regionCol: { en: 'Market', zh: '市场', ja: '市場' },
  vsChina: { en: 'China is…', zh: '中国价…', ja: '中国は…' },
  liveNote: {
    en: 'Fetched from official Uniqlo stores just now (cached 10 min). Unofficial tool, not affiliated with UNIQLO / Fast Retailing — click any price to verify on the official store.',
    zh: '价格取自各国优衣库官网实时查询（缓存 10 分钟）。非官方工具，与 UNIQLO / 迅销无关——点击任意价格可到官网核对。',
    ja: '各国ユニクロ公式ストアからリアルタイム取得（10分キャッシュ）。非公式ツールで、UNIQLO／ファーストリテイリングとは無関係です。価格クリックで公式ストアで確認できます。',
  },
  invalidCode: { en: 'Enter a 6-digit item code or an official store link.', zh: '请输入 6 位商品番号或官网商品链接。', ja: '6桁の品番または公式ストアのリンクを入力してください。' },
  noResults: {
    en: 'No official store carries this code — check the 6 digits on the item tag.',
    zh: '各官网均无此码——请核对吊牌上的 6 位商品番号。',
    ja: 'どの公式ストアにも見つかりません。タグの6桁品番を確認してください。',
  },
  rateLimited: { en: 'Too many lookups — wait a minute and try again.', zh: '查询太频繁，一分钟后再试。', ja: '検索が多すぎます。1分ほど待って再試行を。' },
  lookupFailed: { en: 'Live lookup failed — try again in a moment.', zh: '实时查询失败，稍后再试。', ja: '取得に失敗しました。しばらくしてから再試行してください。' },
})

/** 页面文案 */
export const uniqloPageCopy = fillLocaleFallbacks({
  title: {
    en: 'Is Uniqlo Cheaper in China? Official Prices vs US, UK, Germany, Japan (2026)',
    zh: '优衣库在中国更便宜吗？大陆 vs 日本/欧美官网价实测对比（2026）',
    ja: 'ユニクロは中国の方が安い？日本・欧米の公式価格と比較（2026）',
  },
  description: {
    en: 'Same item, same global product code, official store prices: compare Uniqlo China prices against the US, UK, Germany, France, Italy, Spain, Japan, Korea and Hong Kong. The honest answer, item by item.',
    zh: '同款同全球品番码、各国官网在售价逐项对比：中国大陆优衣库 vs 日本、美国、英国、德国、法国、意大利、西班牙、韩国、中国香港，附离境退税后的真实价差。',
    ja: '同じ品番・公式ストア価格で比較：中国本土のユニクロと日本・アメリカ・イギリス・ドイツなど9市場の価格をアイテムごとに対照。出国税還付の要点も併記。',
  },
  h1: {
    en: 'Is Uniqlo Cheaper in China?',
    zh: '优衣库在中国更便宜吗？',
    ja: 'ユニクロは中国で安い？',
  },
  intro: {
    en: 'Yes — if you are coming from Europe or North America. We pulled the official store price of the same six evergreen items (same global product code) in ten markets on the same day: Uniqlo Mainland China runs roughly 25–35% cheaper than the eurozone, the UK and the US. But honesty first: Japan is often cheaper than China, and Hong Kong beats the mainland on most items too. And it\'s a live tool: type any item code from the tag above for real-time prices from all ten official stores.',
    zh: '如果你从欧美来——是的，明显便宜。我们在同一天拉取了六款全球同品番常青款在十个市场的官网在售价：中国大陆比欧元区、英国、美国便宜约 25–35%。但也要诚实告诉你：不少款日本比中国更便宜，香港多数款也低于大陆。这也是个实时工具：在上方输入吊牌上的任意商品番号，即可查询十地官网实时价格。',
    ja: '欧米から来るなら——はい、明らかに安いです。同日に、世界共通品番の定番6アイテムの公式ストア価格を10市場で取得しました。中国本土はユーロ圏・英国・米国より約25〜35%安い。ただし正直に言うと、日本の方が安いアイテムも多く、香港も大半で本土より安い。さらにリアルタイムツールでもあります。上の欄にタグの品番を入力すると、10市場の公式ストア価格をその場で確認できます。',
  },
  faqTitle: { en: 'Uniqlo in China — Quick Answers', zh: '中国买优衣库速答', ja: '中国のユニクロQ&A' },
  sourceNote: {
    en: `Prices: official Uniqlo stores (uniqlo.cn via open search API; uniqlo.com.hk; uniqlo.com for US/UK/DE/FR/IT/ES/JP/KR), snapshot of ${UNIQLO_SNAPSHOT.fetchedAt}, promos of the day included and marked. Exchange rates: open.er-api.com daily reference of ${UNIQLO_FX.date}. Same six global product codes in every column — click any price to verify it on the official store.`,
    zh: `价格：优衣库各区域官网在售价（uniqlo.cn / uniqlo.com.hk 开放搜索接口；美英德法意西日韩官网商品页），${UNIQLO_SNAPSHOT.fetchedAt} 快照，当日促销价已如实标注。汇率：open.er-api.com ${UNIQLO_FX.date} 日更参考汇率。每列均为同一全球品番码同款商品——点击任意价格可跳转官网核对。`,
    ja: `価格：ユニクロ各域公式ストア（uniqlo.cn／uniqlo.com.hk の公開検索API、米英独仏伊西日韓は公式商品ページ）、${UNIQLO_SNAPSHOT.fetchedAt} のスナップショット。当日のセール価格もそのまま明記。為替：open.er-api.com（${UNIQLO_FX.date}）。すべての列が同じ世界共通品番——価格をクリックすると公式ストアで検証できます。`,
  },
  relatedTitle: { en: 'Keep planning', zh: '继续规划', ja: '計画を続ける' },
})

/** FAQ（问题式标题利于精选摘要；答案带具体数字锚点，口径与快照一致） */
export const uniqloFaq = fillLocaleFallbacks([
  {
    q: { en: 'Is Uniqlo cheaper in China than in Europe?', zh: '优衣库中国比欧洲便宜吗？', ja: 'ユニクロは中国の方がヨーロッパより安い？' },
    a: {
      en: 'Clearly, yes. On our six-item basket of identical global codes, Mainland China averaged about 29% cheaper than Germany, France, Italy and Spain, and about 32% cheaper than the US. Example: the HEATTECH Ultra Warm long-sleeve tee is ¥149 in China versus €29.90 in Germany — and China was running a promo that day (list ¥199). Claim the ~11% departure tax refund at a tax-refund store and the effective gap widens further.',
      zh: '明显便宜。同全球品番六款实测，中国大陆均价比德国/法国/意大利/西班牙低约 29%，比美国低约 32%。例如 HEATTECH 超温暖长袖T恤中国 ¥149（当日促销，原价 ¥199）对德国 €29.90。若在退税门店再退约 11% 离境退税，实际差距还会拉大。',
      ja: '明らかに安いです。同一品番6点のバスケットで、中国本土は独・仏・伊・西より平均約29%、米国より約32%安く。例：超極暖ヒートテック長袖Tは中国149元（当日セール、通常199元）対ドイツ29.90ユーロ。出国税還付（約11%）を組み合わせると差はさらに広がります。',
    },
  },
  {
    q: { en: 'Is Uniqlo cheaper in China than in Japan?', zh: '优衣库中国比日本便宜吗？', ja: 'ユニクロは中国より日本の方が安い？' },
    a: {
      en: 'No — and this surprises people. In our basket, Japan was cheaper than Mainland China on five of six items: the AIRism cotton tee is ¥1,290 (~CNY 54) in Japan vs ¥79 in China, and the Seamless Down Parka is ¥14,900 (~CNY 623) vs ¥899. Only the windproof fleece hoodie was neck-and-neck. If you are flying Beijing/Shanghai ↔ Tokyo, Uniqlo is a better buy on the Japanese side; visitors from Japan or Hong Kong can skip the Uniqlo stop in China entirely.',
      zh: '不——这一点出乎很多人意料。实测六款里日本有五款比中国大陆便宜：AIRism 棉混纺圆领T日本 ¥1,290（约合人民币 54 元）对中国 ¥79；无缝羽绒连帽外套日本 ¥14,900（约合 623 元）对中国 ¥899。只有防风摇粒绒连帽外套两地几乎打平。如果你飞北京/上海↔东京，优衣库在日本侧买更划算；来自日本或香港的游客可以完全跳过中国的优衣库。',
      ja: 'いいえ——ここは意外な落とし穴です。実測6点中5点で日本が中国本土より安い。エアリズムコットンTは日本1,290円（約54元）对中国79元、シームレスダウンパーカは日本14,900円（約623元）对899元。撥水フリースパーカーのみほぼ同価。日本・香港からの旅行者は、中国でユニクロを買うメリットはほぼありません。',
    },
  },
  {
    q: { en: 'Can tourists claim a tax refund on Uniqlo purchases in China?', zh: '游客在中国买优衣库能退税吗？', ja: '中国のユニクロで税還付は受けられる？' },
    a: {
      en: 'Often, yes. Many Uniqlo stores in major Chinese cities are licensed departure-tax-refund stores — look for the blue "离境退税 TAX REFUND" logo at the entrance, and ask at checkout. Rules: same store, same day, minimum ¥200 (about one HEATTECH tee), refund roughly 11% after fees, goods unused and leaving the country with you within 90 days. Since 2025 many stores offer instant in-store refunds ("即买即退") via credit-card pre-authorization. Note: online orders (Taobao/JD) never qualify. Our tax refund guide has the full walkthrough.',
      zh: '很多时候可以。中国主要城市的不少优衣库门店已是离境退税备案商店——认准门口蓝色「离境退税 TAX REFUND」标识，结账时出示护照并询问。规则：同一门店同日满 ¥200（约一件 HEATTECH T恤）、退税约 11%（已扣手续费）、商品未使用并在 90 天内携带出境。2025 年起很多门店支持「即买即退」（信用卡预授权当场退）。注意：淘宝/京东线上订单不退税。完整流程见我们的退税攻略。',
      ja: '多くの場合、可能です。中国主要都市のユニクロの一部は出国税還付（離境退税）対象店です。青い「TAX REFUND」ロゴを確認し、精算時にパスポートを提示。同一店・同日・200元以上（HEATTECH Tシャツ1枚分）で約11%還付、90日以内に未使用で出国。2025年からは「即買即退」（店内即時還付）対応店も増えています。ネット注文は対象外。詳しくは税還付ガイドへ。',
    },
  },
  {
    q: { en: 'Are Uniqlo sizes in China the same as at home?', zh: '中国优衣库的尺码和本国一样吗？', ja: '中国のユニクロのサイズは日本と同じ？' },
    a: {
      en: 'Mainland China stores use the same Asian size ladder as Japan and Korea (S/M/L with cm-based charts), so if you normally buy Uniqlo in Asia, your size carries over. If you shop Uniqlo in the US or Europe, note those sites list UK/EU-flavored charts — always go by the centimeter measurements, not the letter. China stores also run wider plus-size and longer-length lines that many Western stores do not stock.',
      zh: '中国大陆门店与日韩同为亚洲尺码体系（S/M/L + 厘米尺码表），习惯在亚洲买优衣库的话尺码直接沿用。在美欧买惯的注意：欧美官网是本地化尺码表——看厘米数据，别看字母码。中国门店还有不少欧美不卖的加大码与加长版型。',
      ja: '中国本土の店舗は日本・韓国と同じアジアサイズ（S/M/L＋cm表記）。アジアで普段買うサイズがそのまま使えます。米国・欧州で買っている人は、現地サイトのサイズ表に合わせてある点に注意——アルファベットではなくcm実寸で選んでください。中国には欧米にない大きいサイズ・丈長も揃います。',
    },
  },
  {
    q: { en: 'Why are Uniqlo prices different across countries?', zh: '优衣库各国价格为什么不同？', ja: 'ユニクロの価格はなぜ国によって違う？' },
    a: {
      en: 'Local pricing strategy, not cost. Fast Retailing sets prices market by market based on competition, tariffs, VAT and what shoppers will pay — the same tee costs ¥79 in Shanghai, ~CNY 110 in the eurozone and ~CNY 54 in Japan. Quality is the same global supply chain. Also watch the promo calendar: China runs Double-11 and member-day discounts, Europe runs end-of-season sales, so a week of timing can swing a single item by 20%.',
      zh: '是本地定价策略，不是成本差异。迅销按市场竞争、关税、增值税和当地购买力逐市场定价——同一件T恤上海 ¥79、欧元区约合 ¥110、日本约合 ¥54。品质是同一条全球供应链。另外盯紧促销日历：中国有双11和会员日，欧洲有季末打折，差一周下单，单件可能差出 20%。',
      ja: '現地の価格戦略によるもので、コスト差ではありません。ファーストリテイリングは市場ごとに競争・関税・付加価値税・購買力で価格を決めています。同じTシャツが上海79元、ユーロ圏で約110元相当、日本で約54元相当。品質は同じグローバル供給網です。セール時期（中国のW11、欧州の期末セール）で1点20%前後変わることも。',
    },
  },
  {
    q: { en: 'What about the linen shirts Uniqlo China is famous for?', zh: '中国优衣库著名的亚麻衬衫呢？', ja: '中国ユニクロで有名なリネンシャツは？' },
    a: {
      en: 'They are the single most-cited Uniqlo bargain by visitors: European-based shoppers repeatedly report linen around 40% cheaper in China than at home, and visitors stock up every summer. We left linen out of the winter snapshot table because it is a seasonal item currently off-shelf in most markets — check it in summer, or treat the flannel shirt row (about 32% cheaper than the eurozone) as the closest winter proxy.',
      zh: '那是游客提及最多的优衣库捡漏项：常驻欧洲的买家反复实测中国亚麻比本国便宜约 40%，每年夏天都有人来扫货。亚麻是季节款、当前多数市场已下架，所以没进这份冬季快照表——夏天再来看，或把法兰绒衬衫一行（比欧元区便宜约 32%）当作最接近的冬季替身。',
      ja: '旅行者が最もよく挙げるユニクロのお買い得品です。欧州在住の買い手はリネンが中国で約40%安いと繰り返し報告しており、毎夏まとめ買いされます。リネンは季節商品で現在ほとんどの市場で店頭から消えているため、この冬のスナップショット表には入れていません。夏に確認するか、フランネルシャツ（ユーロ圏より約32%安）を冬の代用としてください。',
    },
  },
])

export const uniqloItems: UniqloItem[] = fillLocaleFallbacks(rawItems)
