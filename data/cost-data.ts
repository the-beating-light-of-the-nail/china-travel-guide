// 中国旅行物价对比数据（/tools/china-trip-cost-calculator/ 页面数据源）
// ---------------------------------------------------------------
// 来源纪律（同 B站播放量快照规则，快照日期必须随数据一起更新）：
// - 物价：Numbeo 众包城市页快照（displayCurrency=USD），抓取于 2026-11-16，页面数据周期 Nov 2026
//   刷新方式：node scripts/coldstart/numbeo-fetch.mjs（数据为低频波动，半年重跑一次）
// - 汇率：ECB 参考汇率 via api.frankfurter.dev，2026-11-13 快照
// - 单位归一化：Numbeo USD 显示模式给英制，此处已折算为公制——
//   苹果 $/lb ÷ 0.45359 → $/kg；出租车 $/mile ÷ 1.60934 → $/km；
//   taxi10km = 起步价 + 10 × 每公里价（估算值，页面注明）
// - 沪/京个别条目数值相同系 Numbeo 低样本条目按国别回填的源数据特性，如实保留
// - 西安：Numbeo 无该城市页面（2026-11-16 实测 Cannot find city id），故不含
// ---------------------------------------------------------------

import type { L } from './localize'
import { fillLocaleFallbacks } from './localize'

export const COST_SNAPSHOT = {
  fetchedAt: '2026-11-16',
  pageMonth: 'Nov 2026',
  source: 'Numbeo (crowd-sourced) city pages',
  refresher: 'node scripts/coldstart/numbeo-fetch.mjs',
}

export const FX_SNAPSHOT = {
  date: '2026-11-13',
  source: 'ECB reference rates via api.frankfurter.dev',
  rates: { USD: 1, EUR: 0.90481, GBP: 0.75605, JPY: 160.0, KRW: 1337.13, CNY: 6.6719, THB: 33.915 },
} as const

/** 展示币种（符号与小数位按旅行者习惯；JPY/CNY 同为 ¥，下拉里带代码区分） */
export const COST_CURRENCIES = [
  { code: 'USD', symbol: '$', decimals: 2 },
  { code: 'EUR', symbol: '€', decimals: 2 },
  { code: 'GBP', symbol: '£', decimals: 2 },
  { code: 'JPY', symbol: '¥', decimals: 0 },
  { code: 'CNY', symbol: '¥', decimals: 1 },
  { code: 'KRW', symbol: '₩', decimals: 0 },
  { code: 'THB', symbol: '฿', decimals: 0 },
] as const

export type CostCurrencyCode = (typeof COST_CURRENCIES)[number]['code']

export interface CostItem {
  id: string
  category: 'food' | 'transport' | 'leisure' | 'shopping'
  icon: string
  name: L
  note?: L
}

/** 条目清单（13 项游客高频消费；note 说明口径，是表格诚实性的关键） */
const rawItems: CostItem[] = [
  {
    id: 'mealCheap',
    category: 'food',
    icon: '🍜',
    name: {
      en: 'Meal at an inexpensive local restaurant',
      zh: '简餐（面馆 / 苍蝇馆子）',
      ja: '安い現地レストランでの食事',
    },
    note: {
      en: 'A bowl of noodles, dumplings or a rice set',
      zh: '一碗面、一份饺子或盖饭',
      ja: '麺類・餃子・定食など',
    },
  },
  {
    id: 'mealMid',
    category: 'food',
    icon: '🍽️',
    name: {
      en: 'Meal for two, mid-range restaurant',
      zh: '两人正餐（中档餐厅）',
      ja: '中級レストランで2人分の食事',
    },
    note: {
      en: 'Three courses, no alcohol',
      zh: '三道式，不含酒水',
      ja: '3コース、アルコールなし',
    },
  },
  {
    id: 'mcd',
    category: 'food',
    icon: '🍔',
    name: {
      en: "McDonald's combo meal",
      zh: '麦当劳套餐',
      ja: 'マクドナルドのセット',
    },
    note: {
      en: 'The same global benchmark everywhere',
      zh: '全球统一的价格锚点',
      ja: 'どこでも同じ世界共通の基準',
    },
  },
  {
    id: 'cappuccino',
    category: 'food',
    icon: '☕',
    name: { en: 'Regular cappuccino', zh: '普通杯卡布奇诺', ja: 'カプチーノ（レギュラー）' },
    note: {
      en: 'Average of chains and local cafés',
      zh: '连锁与本地咖啡馆均值',
      ja: 'チェーンと地場カフェの平均',
    },
  },
  {
    id: 'beer',
    category: 'food',
    icon: '🍺',
    name: { en: 'Domestic draft beer (1 pint)', zh: '国产生啤（1 品脱）', ja: '地ビール（1パイント）' },
  },
  {
    id: 'water',
    category: 'food',
    icon: '💧',
    name: { en: 'Bottled water (small bottle)', zh: '瓶装水（小瓶）', ja: 'ペットボトル水（小）' },
  },
  {
    id: 'metro',
    category: 'transport',
    icon: '🚇',
    name: { en: 'One-way metro / bus ticket', zh: '地铁 / 公交单程票', ja: '地下鉄・バスの片道切符' },
    note: {
      en: 'Tap in with Alipay / WeChat — no ticket machine needed',
      zh: '支付宝 / 微信扫码进站，无需购票',
      ja: 'Alipay／WeChat でタップ入場',
    },
  },
  {
    id: 'taxi10km',
    category: 'transport',
    icon: '🚕',
    name: { en: 'Taxi / DiDi ride, 10 km (est.)', zh: '打车 / 滴滴 10 公里（估算）', ja: 'タクシー・DiDi 10km（推定）' },
    note: {
      en: 'Flag-down fare + 10 × per-km rate, converted from mile tariff',
      zh: '起步价 + 10 × 每公里价，由英里费率折算',
      ja: '初乗り運賃＋10km 分（マイル料金から換算）',
    },
  },
  {
    id: 'cinema',
    category: 'leisure',
    icon: '🎬',
    name: { en: 'Cinema ticket (international release)', zh: '电影票（国际影片）', ja: '映画チケット（洋画）' },
    note: {
      en: 'Book via Maoyan / Taopiaopiao for discounts',
      zh: '猫眼 / 淘票票购票常有折扣',
      ja: 'Maoyan／Taopiaopiao で割引あり',
    },
  },
  {
    id: 'milk',
    category: 'leisure',
    icon: '🥛',
    name: { en: 'Milk (1 L)', zh: '牛奶（1 升）', ja: '牛乳（1L）' },
  },
  {
    id: 'apples',
    category: 'leisure',
    icon: '🍎',
    name: { en: 'Apples (1 kg)', zh: '苹果（1 公斤）', ja: 'りんご（1kg）' },
    note: {
      en: 'Converted from per-pound price',
      zh: '由每磅价格折算',
      ja: '1ポンド単価から換算',
    },
  },
  {
    id: 'nike',
    category: 'shopping',
    icon: '👟',
    name: { en: 'Nike running shoes (mid-range)', zh: '耐克跑鞋（中档）', ja: 'ナイキのランニングシューズ（中級）' },
    note: {
      en: 'Global brands are NOT the bargain — the gap is in local spending',
      zh: '国际大牌并不是中国的省钱点，价差在本地消费',
      ja: 'グローバルブランドは割安ではない。差がつくのはローカル消費',
    },
  },
  {
    id: 'jeans',
    category: 'shopping',
    icon: '👖',
    name: { en: "Levi's 501 or similar jeans", zh: '李维斯 501 或同类牛仔裤', ja: "リーバイス 501 または類似ジーンズ" },
  },
]

export interface CostCity {
  key: string
  flag: string
  isChina: boolean
  name: L
  /** 条目 id → USD 价（Numbeo 快照，见文件头） */
  usd: Record<string, number>
}

/** 城市清单：3 中国 + 9 国际对照（2026-11-16 快照） */
const rawCities: CostCity[] = [
  {
    key: 'shanghai',
    flag: '🇨🇳',
    isChina: true,
    name: { en: 'Shanghai', zh: '上海', ja: '上海' },
    usd: { mealCheap: 4.5, mealMid: 29.98, mcd: 5.25, cappuccino: 3.34, beer: 1.2, water: 0.36, metro: 0.45, taxi10km: 6.64, cinema: 8.99, milk: 1.81, apples: 2.27, nike: 75.86, jeans: 56.09 },
  },
  {
    key: 'beijing',
    flag: '🇨🇳',
    isChina: true,
    name: { en: 'Beijing', zh: '北京', ja: '北京' },
    usd: { mealCheap: 4.5, mealMid: 29.98, mcd: 5.25, cappuccino: 3.57, beer: 1.2, water: 0.27, metro: 0.6, taxi10km: 5.37, cinema: 7.49, milk: 1.68, apples: 2.07, nike: 87.41, jeans: 70.89 },
  },
  {
    key: 'chengdu',
    flag: '🇨🇳',
    isChina: true,
    name: { en: 'Chengdu', zh: '成都', ja: '成都' },
    usd: { mealCheap: 2.85, mealMid: 22.48, mcd: 4.8, cappuccino: 2.82, beer: 1.5, water: 0.26, metro: 0.3, taxi10km: 4.33, cinema: 6, milk: 1.87, apples: 1.85, nike: 57.14, jeans: 24.9 },
  },
  {
    key: 'new-york',
    flag: '🇺🇸',
    isChina: false,
    name: { en: 'New York', zh: '纽约', ja: 'ニューヨーク' },
    usd: { mealCheap: 28, mealMid: 120, mcd: 15, cappuccino: 6.55, beer: 8, water: 2.99, metro: 3, taxi10km: 24.75, cinema: 23.5, milk: 1.34, apples: 7.03, nike: 121.54, jeans: 79.77 },
  },
  {
    key: 'london',
    flag: '🇬🇧',
    isChina: false,
    name: { en: 'London', zh: '伦敦', ja: 'ロンドン' },
    usd: { mealCheap: 26.43, mealMid: 105.73, mcd: 11.89, cappuccino: 5.57, beer: 9.25, water: 2.27, metro: 3.96, taxi10km: 39.74, cinema: 18.5, milk: 1.84, apples: 3.15, nike: 121.03, jeans: 110.13 },
  },
  {
    key: 'paris',
    flag: '🇫🇷',
    isChina: false,
    name: { en: 'Paris', zh: '巴黎', ja: 'パリ' },
    usd: { mealCheap: 18.74, mealMid: 77.18, mcd: 13.23, cappuccino: 5.11, beer: 7.72, water: 2.6, metro: 2.81, taxi10km: 20.69, cinema: 15.44, milk: 1.54, apples: 3.35, nike: 115.78, jeans: 110.09 },
  },
  {
    key: 'tokyo',
    flag: '🇯🇵',
    isChina: false,
    name: { en: 'Tokyo', zh: '东京', ja: '東京' },
    usd: { mealCheap: 7.51, mealMid: 37.57, mcd: 5.01, cappuccino: 3.61, beer: 3.76, water: 0.86, metro: 1.25, taxi10km: 34.45, cinema: 13.15, milk: 1.5, apples: 4.61, nike: 64.38, jeans: 52.08 },
  },
  {
    key: 'seoul',
    flag: '🇰🇷',
    isChina: false,
    name: { en: 'Seoul', zh: '首尔', ja: 'ソウル' },
    usd: { mealCheap: 8.98, mealMid: 69.26, mcd: 7.49, cappuccino: 4.05, beer: 3.74, water: 0.76, metro: 1.16, taxi10km: 9.56, cinema: 11.23, milk: 2.11, apples: 7.54, nike: 69.06, jeans: 62.09 },
  },
  {
    key: 'berlin',
    flag: '🇩🇪',
    isChina: false,
    name: { en: 'Berlin', zh: '柏林', ja: 'ベルリン' },
    usd: { mealCheap: 16.54, mealMid: 77.18, mcd: 14.05, cappuccino: 4.23, beer: 5.51, water: 3.09, metro: 4.41, taxi10km: 35.62, cinema: 15.44, milk: 1.26, apples: 3.2, nike: 105.36, jeans: 101.11 },
  },
  {
    key: 'madrid',
    flag: '🇪🇸',
    isChina: false,
    name: { en: 'Madrid', zh: '马德里', ja: 'マドリード' },
    usd: { mealCheap: 17.64, mealMid: 67.26, mcd: 12.13, cappuccino: 3.15, beer: 3.86, water: 2.26, metro: 1.65, taxi10km: 18.66, cinema: 11.03, milk: 1.3, apples: 2.51, nike: 107.5, jeans: 86.25 },
  },
  {
    key: 'rome',
    flag: '🇮🇹',
    isChina: false,
    name: { en: 'Rome', zh: '罗马', ja: 'ローマ' },
    usd: { mealCheap: 19.85, mealMid: 68.91, mcd: 13.23, cappuccino: 2.05, beer: 6.06, water: 1.44, metro: 1.65, taxi10km: 20.92, cinema: 11.03, milk: 1.78, apples: 2.65, nike: 94.11, jeans: 73.29 },
  },
  {
    key: 'bangkok',
    flag: '🇹🇭',
    isChina: false,
    name: { en: 'Bangkok', zh: '曼谷', ja: 'バンコク' },
    usd: { mealCheap: 2.95, mealMid: 35.38, mcd: 7.37, cappuccino: 2.75, beer: 2.8, water: 0.33, metro: 1.12, taxi10km: 12.84, cinema: 8.25, milk: 1.7, apples: 3.77, nike: 97.65, jeans: 70.98 },
  },
]

/** 各语种默认城市对（SSG 首屏静态渲染的组合，爬虫直接可抓） */
export const DEFAULT_PAIR: Record<string, { cn: string; home: string }> = {
  en: { cn: 'shanghai', home: 'new-york' },
  zh: { cn: 'shanghai', home: 'new-york' },
  ko: { cn: 'shanghai', home: 'seoul' },
  ja: { cn: 'shanghai', home: 'tokyo' },
  th: { cn: 'chengdu', home: 'bangkok' },
  de: { cn: 'shanghai', home: 'berlin' },
  fr: { cn: 'shanghai', home: 'paris' },
  es: { cn: 'shanghai', home: 'madrid' },
  it: { cn: 'shanghai', home: 'rome' },
}

/** 各语种默认展示币种 */
export const DEFAULT_CURRENCY: Record<string, string> = {
  en: 'USD', zh: 'CNY', ko: 'KRW', ja: 'JPY', th: 'THB', de: 'EUR', fr: 'EUR', es: 'EUR', it: 'EUR',
}

// ---------------------------------------------------------------
// 页面与组件文案（en/zh 必填；ja 为当前下注语种，其余语言构建时回退英文）
// ---------------------------------------------------------------

/** 计算器 UI 文案 */
export const calculatorUi = fillLocaleFallbacks({
  cnCity: { en: 'City in China', zh: '中国城市', ja: '中国の都市' },
  homeCity: { en: 'Compare with (home city)', zh: '对照城市（你的家乡）', ja: '比較する都市（お住まい）' },
  currency: { en: 'Display currency', zh: '显示币种', ja: '表示通貨' },
  avgCheaper: { en: 'cheaper on average', zh: '平均更便宜', ja: '平均して安い' },
  avgPricier: { en: 'pricier on average', zh: '平均更贵', ja: '平均して高い' },
  basketTitle: { en: 'Daily travel basket', zh: '每日旅行消费篮子', ja: '1日の旅行バスケット' },
  basketNote: {
    en: '2 local meals + 1 water + 2 metro rides + 1 ten-km taxi',
    zh: '2 顿简餐 + 1 瓶水 + 2 次地铁 + 1 次 10 公里打车',
    ja: '現地食事2回＋水1本＋地下鉄2回＋タクシー10km×1',
  },
  bargainTitle: { en: 'Biggest bargain', zh: '价差最大的项', ja: '一番の割安項目' },
  bargainLess: { en: 'About {v} less than at home', zh: '比家乡便宜约 {v}', ja: '地元より約 {v} 安い' },
  itemCol: { en: 'Everyday item / service', zh: '日常消费项目', ja: '日常の項目・サービス' },
  diffCol: { en: 'Difference', zh: '价差', ja: '差額' },
  cheaper: { en: 'cheaper', zh: '更便宜', ja: '安い' },
  pricier: { en: 'pricier', zh: '更贵', ja: '高い' },
  similar: { en: 'About the same', zh: '基本持平', ja: 'ほぼ同じ' },
})

/** 页面文案 */
export const costPageCopy = fillLocaleFallbacks({
  title: {
    en: 'China Trip Cost Calculator: Prices vs. Your City (2026)',
    zh: '中国旅行物价对比器：上海 / 北京 / 成都 vs 你的城市（2026）',
    ja: '中国旅行費用計算ツール：上海・北京・成都 vs あなたの都市（2026）',
  },
  description: {
    en: 'Interactive China trip cost calculator: compare meals, taxis, metro, coffee and shopping prices in Shanghai, Beijing and Chengdu against New York, Tokyo, London, Paris and more.',
    zh: '中国旅行物价对比工具：上海、北京、成都的餐食、打车、地铁、咖啡与购物价格，对比纽约、东京、伦敦、巴黎等九城，一键换算币种。',
    ja: '中国旅行費用の対話型計算ツール。上海・北京・成都の食事・タクシー・地下鉄・カフェ・買い物の価格を、ニューヨーク・東京・ロンドン・パリなどと比較できます。',
  },
  h1: {
    en: 'How Much Does a Trip to China Cost?',
    zh: '去中国旅行，到底要花多少钱？',
    ja: '中国旅行にはいくらかかる？',
  },
  intro: {
    en: 'Not the brochure answer — the honest one. China is the world\'s factory, but that does not make everything cheap: a bowl of noodles can cost less than a New York coffee, while a pair of Nikes costs about the same as at home. Pick your cities below and see, item by item, where your money stretches in China and where it doesn\'t.',
    zh: '不是宣传册的答案，是诚实的答案。中国是世界工厂，但不等于什么都便宜：一碗面的价格可能抵不上纽约一杯咖啡，而一双耐克和国内家乡差不多。选好城市逐项对比，看你的钱在中国哪里经花、哪里不经花。',
    ja: 'パンフレットの答えではなく、正直な答えを。中国は「世界の工場」ですが、何でも安いわけではありません。ニューヨークのコーヒー1杯より安い麺類がある一方、ナイキのスニーカーは日本とほぼ同じ価格。下の都市を選んで、何が安くて何が安くないかを項目ごとに確認できます。',
  },
  faqTitle: { en: 'China Trip Cost — Quick Answers', zh: '中国旅行花费速答', ja: '中国旅行費用Q&A' },
  sourceNote: {
    en: `Reference prices: crowd-sourced Numbeo city data, ${COST_SNAPSHOT.pageMonth} snapshot (fetched ${COST_SNAPSHOT.fetchedAt}). Exchange rates: ECB reference rates of ${FX_SNAPSHOT.date}. Good for planning, not receipts — a street stall can still be cheaper than any average.`,
    zh: `参考价：Numbeo 众包城市数据，${COST_SNAPSHOT.pageMonth} 快照（抓取于 ${COST_SNAPSHOT.fetchedAt}）。汇率：${FX_SNAPSHOT.date} 欧洲央行参考汇率。适合做预算参考，不等于发票价——街边摊完全可能比任何均值都便宜。`,
    ja: `参考価格：Numbeo のクラウドソーシング都市データ（${COST_SNAPSHOT.pageMonth} スナップショット、${COST_SNAPSHOT.fetchedAt} 取得）。為替：${FX_SNAPSHOT.date} のECB参照レート。予算の目安であり、領収書の金額ではありません。屋台は平均よりさらに安いこともあります。`,
  },
  relatedTitle: { en: 'Keep planning', zh: '继续规划', ja: '計画を続ける' },
})

/** FAQ（问题式标题利于精选摘要；答案带具体数字锚点） */
export const costFaq = fillLocaleFallbacks([
  {
    q: { en: 'Is China expensive for tourists?', zh: '对中国游客来说中国贵吗？', ja: '中国は旅行者にとって高い？' },
    a: {
      en: 'No — for everyday spending, China is one of the cheapest major-trip destinations. In the table above, the daily travel basket (2 local meals, a water, 2 metro rides, a 10-km taxi) runs roughly $6–7 in Chengdu versus about $35 in New York and $47 in London. The expensive parts of a China trip are international flights, hotels and intercity high-speed rail — not food, transit or tickets.',
      zh: '不贵——就日常消费而言，中国是主流旅行目的地里最便宜的一档。按上表口径，成都的每日旅行篮子（2 顿简餐、1 瓶水、2 次地铁、1 次 10 公里打车）约 6–7 美元，纽约约 35 美元，伦敦约 47 美元。中国之行真正贵的是国际机票、酒店和城际高铁，而不是吃、行、门票。',
      ja: 'いいえ。日常の支出にかぎれば、中国は主要旅行先の中で最も安い部類です。上の表の1日の旅行バスケット（現地食事2回・水1本・地下鉄2回・タクシー10km）は成都で約6〜7ドル、ニューヨーク約35ドル、ロンドン約47ドル。中国旅行で高いのは国際線・ホテル・都市間高速鉄道で、食費や交通費・入場料ではありません。',
    },
  },
  {
    q: { en: 'How much is a meal in China?', zh: '在中国吃一顿饭多少钱？', ja: '中国での食事はいくら？' },
    a: {
      en: 'A filling local meal — noodles, dumplings or a rice set — runs about $2.9–4.5 (¥19–30) in Shanghai, Beijing or Chengdu. A three-course dinner for two at a mid-range restaurant is around $22–30. For context, a McDonald\'s combo is about $5 everywhere in China.',
      zh: '一顿管饱的本地餐——面、饺子或盖饭——在上海、北京、成都约为 2.9–4.5 美元（¥19–30）；中档餐厅两人三道式正餐约 22–30 美元。作参照，麦当劳套餐在全中国约 5 美元。',
      ja: '麺・餃子・定食などの現地の食事は、上海・北京・成都で約2.9〜4.5ドル（19〜30元）。中級レストランでの2人分ディナーは約22〜30ドルです。ちなみにマクドナルドのセットは中国どこでも約5ドルです。',
    },
  },
  {
    q: { en: 'How much is a taxi ride in China?', zh: '在中国打车多少钱？', ja: '中国のタクシーはいくら？' },
    a: {
      en: 'A 10-km ride costs about $4.3–6.6 (¥29–44) in Chengdu, Beijing or Shanghai. Hailing a DiDi in the app usually beats curbside taxis on price, and payment happens in-app — no cash, no haggling.',
      zh: '10 公里车程在成都、北京、上海约为 4.3–6.6 美元（¥29–44）。用滴滴 App 叫车通常比路边扬招更便宜，且在 App 内支付——不用现金，也不用讲价。',
      ja: '10km の乗車で成都・北京・上海なら約4.3〜6.6ドル（29〜44元）。DiDi アプリで呼ぶほうが流しのタクシーより安いことが多く、支払いもアプリ内で完結します。',
    },
  },
  {
    q: { en: 'How much money do I need per day in China?', zh: '在中国每天需要多少钱？', ja: '中国で1日いくら必要？' },
    a: {
      en: 'Excluding hotels, a mid-range traveler spends roughly $10–20 a day on food and local transport in Chengdu or Beijing (¥70–140). Add ¥200–600 for a comfortable hotel and ¥50–100 for attractions, and ¥300–500 per day is a realistic all-in budget outside the flight. Budget travelers street-eating can do it for less than half of that.',
      zh: '不含酒店，中档旅行者在成都或北京每天的餐饮加市内交通约 10–20 美元（¥70–140）；加上舒适型酒店 ¥200–600、门票 ¥50–100，机票之外每天 ¥300–500 是现实的全包预算。街头小吃为主的穷游者可以再砍一半。',
      ja: 'ホテル除き、中級の旅行者なら成都や北京で食事と市内交通に1日約10〜20ドル（70〜140元）。快適なホテル代200〜600元と入場料50〜100元を加えると、航空券を除く1日の総予算は300〜500元が現実的なラインです。屋台中心なら半分以下に抑えられます。',
    },
  },
  {
    q: { en: 'Are Nike, Adidas and Levi\'s cheaper in China?', zh: '耐克、阿迪、李维斯在中国更便宜吗？', ja: 'ナイキやアディダス、リーバイスは中国で安い？' },
    a: {
      en: 'Barely. Global brands cost roughly the same as at home — the table shows mid-range Nikes within a few percent across cities. The real bargains are categories where you buy local: small electronics and accessories, prescription glasses, silk, tea and anime goods. Our what-to-buy guide covers exactly what is worth it.',
      zh: '几乎不会。国际大牌和国内家乡价格基本持平——表里中档耐克各城只差几个百分点。真正的价差在「买本地」的品类：小数码配件、配眼镜、丝绸、茶叶、谷子。买什么值得，见我们的《在中国买什么最值》指南。',
      ja: 'ほとんど変わりません。グローバルブランドは日本とほぼ同価格で、表の中級ナイキも都市差は数ポイント程度。本当に割安なのは「ローカル品」——小型家電・アクセサリー、メガネ、シルク、茶、アニマグッズです。詳しくは「中国で買うべきもの」ガイドへ。',
    },
  },
  {
    q: { en: 'Is public transport cheap in China?', zh: '中国公共交通便宜吗？', ja: '中国の公共交通は安い？' },
    a: {
      en: 'Very. A metro ride is $0.30–0.60 (¥2–4) in Chengdu, Beijing and Shanghai, versus $3.00 in New York and $3.96 in London. Set up Alipay or WeChat Pay before you land and you can tap straight through the fare gates — no ticket machines, no transit card deposit.',
      zh: '非常便宜。成都、北京、上海地铁单程 ¥2–4（$0.30–0.60），纽约是 $3.00，伦敦 $3.96。落地前装好支付宝或微信支付，可以直接刷闸机——不用购票机，也不押交通卡工本费。',
      ja: '非常に安いです。成都・北京・上海の地下鉄は1乗車あたり2〜4元（0.3〜0.6ドル）。ニューヨークは3ドル、ロンドンは約4ドルです。Alipay か WeChat Pay を事前に設定すれば改札を直接タップで通れます。',
    },
  },
])

export const costItems: CostItem[] = fillLocaleFallbacks(rawItems)
export const costCities: CostCity[] = fillLocaleFallbacks(rawCities)

/** 每日旅行消费篮子：2 简餐 + 1 水 + 2 地铁 + 1 次 10km 打车（USD） */
export function dailyBasketUsd(city: CostCity): number {
  const u = city.usd
  return +(u.mealCheap * 2 + u.water + u.metro * 2 + u.taxi10km).toFixed(2)
}
