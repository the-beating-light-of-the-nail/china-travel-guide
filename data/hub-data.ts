// ChinaTravelHub 聚合内容数据（双语：英文 / 中文）
// ---------------------------------------------------------------
// 与 travel-data.ts（原创城市/攻略内容）互补，存放四类"策展聚合"内容：
//   1. Vlog         —— 精选旅行视频（外链 Bilibili / YouTube）
//   2. ExternalGuide —— 外部攻略导航（博客 / 论坛 / 官方指南）
//   3. Photo        —— 图片瀑布流（站内图库资源）
//   4. PartnerService —— 本地服务商目录（司机 / 向导 / 摄影 / 旅行社）
//
// ⚠️ 占位说明：externalUrl 目前指向平台的搜索结果页（可正常访问），
//    上线前请逐条替换为你人工挑选的真实视频/文章链接；
//    PartnerService.contactEmail 为占位邮箱，需替换为真实联系方式。
// ---------------------------------------------------------------

import type { L } from './travel-data'

// ===== 类型定义 =====

export type VlogPlatform = 'youtube' | 'bilibili'
export type VlogTopic = 'food' | 'transport' | 'culture' | 'nature'

export interface Vlog {
  id: number
  title: L
  vloggerName: string
  platform: VlogPlatform
  externalUrl: string
  thumbnail: string
  duration: string
  views: L
  review: L
  tags: L
  citySlug: string
  topic: VlogTopic
  featured: boolean
  publishedAt: L
}

export type GuideCategory =
  | 'visa'
  | 'transport'
  | 'food'
  | 'accommodation'
  | 'itinerary'
  | 'budget'
  | 'safety'
  | 'apps'

export interface ExternalGuide {
  id: number
  title: L
  sourceName: string
  externalUrl: string
  summary: L
  category: GuideCategory
  language: 'en' | 'cn'
  readTime: L
  tags: L
  citySlug?: string
}

export type PhotoCategory = 'landscape' | 'city' | 'food' | 'people' | 'transport' | 'hiddenGems'

export interface Photo {
  id: number
  image: string
  location: L
  photographer: string
  description: L
  tags: L
  category: PhotoCategory
  citySlug: string
  sourceUrl?: string
}

export type ServiceType = 'driver' | 'guide' | 'photographer' | 'agency'

export interface PartnerService {
  id: number
  name: string
  type: ServiceType
  cities: string[]
  languages: string[]
  rating: number
  reviewCount: number
  intro: L
  services: L
  tags: L
  priceRange: L
  isVerified: boolean
  contactEmail: string
}

// ===== Vlog 数据 =====

const rawVlogs: Omit<Vlog, 'id'>[] = [
  // —— 成都 ——
  {
    title: { en: 'I Ate Everything in Chengdu\'s Hidden Food Alleys', zh: '吃遍成都隐藏美食巷子：8 家本地苍蝇馆子' },
    vloggerName: 'TasteTrekkers',
    platform: 'youtube',
    externalUrl: 'https://www.youtube.com/results?search_query=chengdu+street+food+vlog',
    thumbnail: '/images/cities/chengdu/chengdu_p05_19.jpeg',
    duration: '18:42',
    views: { en: '1.2M views', zh: '120万播放' },
    review: {
      en: 'Best food vlog for Chengdu — covers 8 local restaurants tourists never find.',
      zh: '成都最佳美食视频：探访 8 家游客找不到的本地馆子。',
    },
    tags: { en: '#Chengdu #StreetFood', zh: '#成都 #街头美食' },
    citySlug: 'chengdu',
    topic: 'food',
    featured: true,
    publishedAt: { en: '3 weeks ago', zh: '3周前' },
  },
  {
    title: { en: '24 Hours with Giant Pandas: Chengdu Panda Base Guide', zh: '与熊猫的 24 小时：成都基地全攻略' },
    vloggerName: 'WildWithMaya',
    platform: 'bilibili',
    externalUrl: 'https://search.bilibili.com/all?keyword=%E6%88%90%E9%83%BD%E7%86%8A%E7%8C%AB%E5%9F%BA%E5%9C%B0%20%E6%94%BB%E7%95%A5',
    thumbnail: '/images/cities/chengdu/chengdu_p03_11.jpeg',
    duration: '12:05',
    views: { en: '860K views', zh: '86万播放' },
    review: {
      en: 'Cute overload, plus practical ticketing and best-viewing-time tips.',
      zh: '萌出血，还附购票与最佳观赏时间实操贴士。',
    },
    tags: { en: '#Chengdu #Pandas', zh: '#成都 #大熊猫' },
    citySlug: 'chengdu',
    topic: 'nature',
    featured: true,
    publishedAt: { en: '1 month ago', zh: '1个月前' },
  },
  {
    title: { en: 'Chengdu to Leshan: The World\'s Tallest Buddha by Bullet Train', zh: '成都出发高铁直达乐山：看世界最大坐佛' },
    vloggerName: 'RailRoamer',
    platform: 'youtube',
    externalUrl: 'https://www.youtube.com/results?search_query=chengdu+leshan+buddha+day+trip',
    thumbnail: '/images/cities/chengdu/chengdu_p04_16.jpeg',
    duration: '15:30',
    views: { en: '640K views', zh: '64万播放' },
    review: {
      en: 'Perfect day-trip blueprint — train times and ferry tickets included.',
      zh: '一日游完美模板：车次与游船票信息齐全。',
    },
    tags: { en: '#Chengdu #HighSpeedRail', zh: '#成都 #高铁' },
    citySlug: 'chengdu',
    topic: 'transport',
    featured: false,
    publishedAt: { en: '2 months ago', zh: '2个月前' },
  },
  {
    title: { en: 'Teahouse Afternoon: How Locals Slow Down in Chengdu', zh: '成都人的下午：人民公园竹椅茶馆一日' },
    vloggerName: 'SlowChinaDiaries',
    platform: 'bilibili',
    externalUrl: 'https://search.bilibili.com/all?keyword=%E6%88%90%E9%83%BD%E8%8C%B6%E9%A6%86%20vlog',
    thumbnail: '/images/cities/chengdu/chengdu_p02_05.jpeg',
    duration: '09:58',
    views: { en: '320K views', zh: '32万播放' },
    review: {
      en: 'Meditative look at bamboo-chair tea culture — great pre-trip mood setter.',
      zh: '沉浸式竹椅茶馆日常，出发前找感觉必看。',
    },
    tags: { en: '#Chengdu #Teahouse', zh: '#成都 #茶馆' },
    citySlug: 'chengdu',
    topic: 'culture',
    featured: false,
    publishedAt: { en: '2 months ago', zh: '2个月前' },
  },
  // —— 西安 ——
  {
    title: { en: 'Terracotta Warriors: What Guides Won\'t Tell You', zh: '兵马俑：导游不会告诉你的 10 个细节' },
    vloggerName: 'DeepDiveChina',
    platform: 'youtube',
    externalUrl: 'https://www.youtube.com/results?search_query=terracotta+warriors+guide',
    thumbnail: '/images/cities/xian/xian_p15_50.jpeg',
    duration: '21:14',
    views: { en: '2.1M views', zh: '210万播放' },
    review: {
      en: 'Fact-checked history plus how to dodge the crowds at Pit 1.',
      zh: '史料考据扎实，附一号坑避人流路线。',
    },
    tags: { en: '#Xian #TerracottaWarriors', zh: '#西安 #兵马俑' },
    citySlug: 'xian',
    topic: 'culture',
    featured: true,
    publishedAt: { en: '1 month ago', zh: '1个月前' },
  },
  {
    title: { en: 'Eating Through Xi\'an Muslim Quarter: 10 Street Foods Under $10', zh: '西安回民街 10 种小吃挑战：10 美元吃到扶墙' },
    vloggerName: 'NomadBites',
    platform: 'youtube',
    externalUrl: 'https://www.youtube.com/results?search_query=xian+muslim+quarter+street+food',
    thumbnail: '/images/cities/xian/xian_p05_18.jpeg',
    duration: '16:20',
    views: { en: '1.5M views', zh: '150万播放' },
    review: {
      en: 'The definitive roujiamo & paomo crawl — Google Maps list in description.',
      zh: '肉夹馍与泡馍天花板，简介里附地图清单。',
    },
    tags: { en: '#Xian #StreetFood', zh: '#西安 #街头美食' },
    citySlug: 'xian',
    topic: 'food',
    featured: true,
    publishedAt: { en: '3 weeks ago', zh: '3周前' },
  },
  {
    title: { en: 'Beijing to Xi\'an by Bullet Train: Full Journey Guide', zh: '北京—西安高铁全流程：购票、进站、选座' },
    vloggerName: 'RailRoamer',
    platform: 'youtube',
    externalUrl: 'https://www.youtube.com/results?search_query=beijing+xian+bullet+train+guide',
    thumbnail: '/images/cities/xian/xian_p02_05.jpeg',
    duration: '14:03',
    views: { en: '780K views', zh: '78万播放' },
    review: {
      en: 'Booking hacks for foreigners without a Chinese bank card.',
      zh: '没有中国银行卡也能买票的实操演示。',
    },
    tags: { en: '#Xian #HighSpeedRail', zh: '#西安 #高铁' },
    citySlug: 'xian',
    topic: 'transport',
    featured: false,
    publishedAt: { en: '2 months ago', zh: '2个月前' },
  },
  {
    title: { en: 'Climbing Mount Hua: China\'s Most Thrilling Hike', zh: '夜爬华山：长空栈道到底吓不吓人' },
    vloggerName: 'PeakChaser',
    platform: 'bilibili',
    externalUrl: 'https://search.bilibili.com/all?keyword=%E5%8D%8E%E5%B1%B1%E6%94%BB%E7%95%A5%20%E6%97%85%E8%A1%8C',
    thumbnail: '/images/cities/xian/xian_p12_44.jpeg',
    duration: '19:45',
    views: { en: '1.9M views', zh: '190万播放' },
    review: {
      en: 'Thrilling plank-walk footage with honest fear-factor notes.',
      zh: '长空栈道实拍+真实恐吓指数评估。',
    },
    tags: { en: '#Xian #MountHua', zh: '#西安 #华山' },
    citySlug: 'xian',
    topic: 'nature',
    featured: false,
    publishedAt: { en: '1 month ago', zh: '1个月前' },
  },
  // —— 北京 ——
  {
    title: { en: 'Great Wall Sections Ranked: Which One Should You Climb?', zh: '长城段位大比拼：慕田峪、金山岭、司马台怎么选' },
    vloggerName: 'WallToWallTravel',
    platform: 'youtube',
    externalUrl: 'https://www.youtube.com/results?search_query=great+wall+sections+compared',
    thumbnail: '/images/cities/beijing/beijing_p20_38.jpeg',
    duration: '22:10',
    views: { en: '1.8M views', zh: '180万播放' },
    review: {
      en: 'Compares Mutianyu, Jinshanling & Simatai with crowd timings.',
      zh: '三段长城横向对比，含错峰时间表。',
    },
    tags: { en: '#Beijing #GreatWall', zh: '#北京 #长城' },
    citySlug: 'beijing',
    topic: 'nature',
    featured: true,
    publishedAt: { en: '2 weeks ago', zh: '2周前' },
  },
  {
    title: { en: 'Beijing Hutong Breakfast Tour: 6 Stops Before 9 AM', zh: '胡同早餐地图：早 9 点前的 6 个据点' },
    vloggerName: 'NomadBites',
    platform: 'bilibili',
    externalUrl: 'https://search.bilibili.com/all?keyword=%E5%8C%97%E4%BA%AC%E6%97%A9%E9%A4%90%20%E8%83%A1%E5%90%8C',
    thumbnail: '/images/cities/beijing/beijing_p07_21.jpeg',
    duration: '13:27',
    views: { en: '920K views', zh: '92万播放' },
    review: {
      en: 'Jianbing, douzhi & baozi crawl — printable map in description.',
      zh: '煎饼、豆汁、包子一条龙，简介附可打印地图。',
    },
    tags: { en: '#Beijing #Breakfast', zh: '#北京 #早餐' },
    citySlug: 'beijing',
    topic: 'food',
    featured: false,
    publishedAt: { en: '1 month ago', zh: '1个月前' },
  },
  {
    title: { en: 'How to Ride the Beijing Subway & Pay as a Foreigner', zh: '外国人在北京坐地铁：购票与扫码全流程' },
    vloggerName: 'TransitTom',
    platform: 'youtube',
    externalUrl: 'https://www.youtube.com/results?search_query=beijing+subway+foreigner+guide',
    thumbnail: '/images/cities/beijing/beijing_p08_24.jpeg',
    duration: '10:12',
    views: { en: '450K views', zh: '45万播放' },
    review: {
      en: 'Alipay/WeChat transit setup shown step by step — a lifesaver.',
      zh: '支付宝/微信乘车码逐步演示，落地救命视频。',
    },
    tags: { en: '#Beijing #Subway', zh: '#北京 #地铁' },
    citySlug: 'beijing',
    topic: 'transport',
    featured: false,
    publishedAt: { en: '3 weeks ago', zh: '3周前' },
  },
  {
    title: { en: 'Forbidden City Deep Dive: 600 Years in 20 Minutes', zh: '故宫 600 年：20 分钟看懂紫禁城' },
    vloggerName: 'DeepDiveChina',
    platform: 'bilibili',
    externalUrl: 'https://search.bilibili.com/all?keyword=%E6%95%85%E5%AE%AB%20%E5%8E%86%E5%8F%B2',
    thumbnail: '/images/cities/beijing/beijing_p04_17.jpeg',
    duration: '20:00',
    views: { en: '1.4M views', zh: '140万播放' },
    review: {
      en: 'History told like a doc series — watch before you go.',
      zh: '纪录片级叙事，逛故宫前必做功课。',
    },
    tags: { en: '#Beijing #ForbiddenCity', zh: '#北京 #故宫' },
    citySlug: 'beijing',
    topic: 'culture',
    featured: false,
    publishedAt: { en: '2 months ago', zh: '2个月前' },
  },
]

// ===== 外部攻略数据 =====

const rawExternalGuides: Omit<ExternalGuide, 'id'>[] = [
  {
    title: { en: 'China Visa Policy: The Complete Overview', zh: '中国签证政策全景解读' },
    sourceName: 'Wikipedia',
    externalUrl: 'https://en.wikipedia.org/wiki/Visa_policy_of_China',
    summary: {
      en: 'Most up-to-date source on visa-free transit, unilateral entries and every visa type.',
      zh: '过境免签、单方面免签与各类签证的最新汇总，更新最勤。',
    },
    category: 'visa',
    language: 'en',
    readTime: { en: '15 min', zh: '15 分钟' },
    tags: { en: '#Visa #AlwaysUpdated', zh: '#签证 #持续更新' },
  },
  {
    title: { en: 'How to Apply for a China Tourist Visa (L Visa)', zh: '中国旅游签证（L 签）申请指南' },
    sourceName: 'Travel China Guide',
    externalUrl: 'https://www.travelchinaguide.com/embassy/visa.htm',
    summary: {
      en: 'Embassy-by-embassy requirements, forms and fees — the practical how-to.',
      zh: '分领事馆列出材料、表格与费用，实操性强。',
    },
    category: 'visa',
    language: 'en',
    readTime: { en: '10 min', zh: '10 分钟' },
    tags: { en: '#Visa #Application', zh: '#签证 #申请流程' },
  },
  {
    title: { en: 'Essential Chinese Apps for Travelers (2026)', zh: '2026 旅行者必备中国 App 清单' },
    sourceName: 'Reddit r/TravelChina',
    externalUrl: 'https://www.reddit.com/r/TravelChina/',
    summary: {
      en: 'Community-vetted Alipay/WeChat/Didi/Maps setup guides — answers within hours.',
      zh: '社区实测的支付宝/微信/滴滴/地图教程，提问回复极快。',
    },
    category: 'apps',
    language: 'en',
    readTime: { en: '8 min', zh: '8 分钟' },
    tags: { en: '#Apps #Payments', zh: '#App #支付' },
  },
  {
    title: { en: 'Foreigner\'s Guide to Alipay & WeChat Pay', zh: '外籍来华支付指南：支付宝与微信' },
    sourceName: 'Alipay Global',
    externalUrl: 'https://global.alipay.com/',
    summary: {
      en: 'Official step-by-step for linking foreign cards and paying with QR codes.',
      zh: '绑卡与扫码支付的官方分步说明。',
    },
    category: 'apps',
    language: 'en',
    readTime: { en: '6 min', zh: '6 分钟' },
    tags: { en: '#Payments #2026Updated', zh: '#支付 #2026更新' },
  },
  {
    title: { en: 'Booking China High-Speed Trains as a Foreigner', zh: '外国人如何购买中国高铁票' },
    sourceName: 'Travel China Guide',
    externalUrl: 'https://www.travelchinaguide.com/china-trains/',
    summary: {
      en: 'Route maps, seat classes, 12306 vs Trip.com booking paths compared.',
      zh: '线路图、坐席说明，12306 与 Trip.com 购票路径对比。',
    },
    category: 'transport',
    language: 'en',
    readTime: { en: '12 min', zh: '12 分钟' },
    tags: { en: '#Transport #HighSpeedRail', zh: '#交通 #高铁' },
  },
  {
    title: { en: 'Trains, Hotels & Flights Bookable in English', zh: '可英文预订的火车票、酒店与机票' },
    sourceName: 'Trip.com',
    externalUrl: 'https://www.trip.com/',
    summary: {
      en: 'The fallback most foreigners end up using — English support, foreign cards OK.',
      zh: '多数外国游客的最终选择：英文界面、支持外卡。',
    },
    category: 'transport',
    language: 'en',
    readTime: { en: '5 min', zh: '5 分钟' },
    tags: { en: '#Transport #Booking', zh: '#交通 #预订' },
  },
  {
    title: { en: 'What (and Where) to Eat in Beijing', zh: '在北京吃什么、去哪吃' },
    sourceName: 'The Beijinger',
    externalUrl: 'https://www.thebeijinger.com/',
    summary: {
      en: 'Long-running English city magazine — restaurant listings written by locals.',
      zh: '老牌英文城市媒体，餐厅推荐全由本地编辑产出。',
    },
    category: 'food',
    language: 'en',
    readTime: { en: '10 min', zh: '10 分钟' },
    tags: { en: '#Food #Beijing', zh: '#美食 #北京' },
    citySlug: 'beijing',
  },
  {
    title: { en: 'Chengdu Food Scene: An English Database', zh: '成都美食英文数据库' },
    sourceName: 'Chengdu-Expat',
    externalUrl: 'https://www.chengdu-expat.com/',
    summary: {
      en: 'Expat-run listings of hotpot, skewers and everything spicy — search by dish.',
      zh: '老外运营的火锅/串串/川菜索引，可按菜名检索。',
    },
    category: 'food',
    language: 'en',
    readTime: { en: '8 min', zh: '8 分钟' },
    tags: { en: '#Food #Chengdu', zh: '#美食 #成都' },
    citySlug: 'chengdu',
  },
  {
    title: { en: 'Chengdu in 3 Days: Pandas, Hotpot & Old Alleys', zh: '成都 3 日行程：熊猫、火锅与老巷' },
    sourceName: 'China Highlights',
    externalUrl: 'https://www.chinahighlights.com/chengdu/',
    summary: {
      en: 'Solid day-by-day template with distances and opening hours accounted for.',
      zh: '逐日行程模板，里程与开放时间都算好了。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '9 min', zh: '9 分钟' },
    tags: { en: '#Itinerary #Chengdu', zh: '#行程 #成都' },
    citySlug: 'chengdu',
  },
  {
    title: { en: 'Xi\'an Essentials: Terracotta Army to City Wall', zh: '西安要点速览：从兵马俑到城墙' },
    sourceName: 'China Highlights',
    externalUrl: 'https://www.chinahighlights.com/xian/',
    summary: {
      en: 'Clear priorities if you only have 48 hours in the old capital.',
      zh: '只有 48 小时时的取舍建议，直接可抄。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '7 min', zh: '7 分钟' },
    tags: { en: '#Itinerary #Xian', zh: '#行程 #西安' },
    citySlug: 'xian',
  },
  {
    title: { en: 'Two Weeks in China: The Classic First-Timer Route', zh: '首次来华两周经典路线' },
    sourceName: 'Nomadic Matt',
    externalUrl: 'https://www.nomadicmatt.com/',
    summary: {
      en: 'Beijing → Xi\'an → Chengdu/Shanghai loop with budget breakdowns.',
      zh: '北京—西安—成都/上海环线，附预算拆解。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '15 min', zh: '15 分钟' },
    tags: { en: '#Itinerary #FirstTrip', zh: '#行程 #首次来华' },
  },
  {
    title: { en: 'China on $50 a Day: Real Budget Breakdown', zh: '每天 50 美元玩中国：真实账单' },
    sourceName: 'Reddit r/TravelChina',
    externalUrl: 'https://www.reddit.com/r/TravelChina/',
    summary: {
      en: 'Real receipts from backpackers — hostels, trains, street food, entry fees.',
      zh: '背包客晒真实账单：青旅、火车、小吃、门票全含。',
    },
    category: 'budget',
    language: 'en',
    readTime: { en: '10 min', zh: '10 分钟' },
    tags: { en: '#Budget #Backpacking', zh: '#穷游 #背包' },
  },
]

// ===== 图片瀑布流数据 =====
// 图片复用站内城市图库（public/images/cities/...）。
// category/location 目前为按城市语境的合理默认值，可随时精修。

const rawPhotos: Omit<Photo, 'id'>[] = [
  // —— 成都 ——
  {
    image: '/images/cities/chengdu/chengdu_p02_05.jpeg',
    location: { en: 'Chengdu, Sichuan', zh: '四川 · 成都' },
    photographer: '',
    description: { en: 'Bamboo chairs, gaiwan tea and a slow afternoon.', zh: '竹椅盖碗茶，慢下来的下午。' },
    tags: { en: '#Chengdu #Teahouse', zh: '#成都 #茶馆' },
    category: 'people',
    citySlug: 'chengdu',
  },
  {
    image: '/images/cities/chengdu/chengdu_p03_11.jpeg',
    location: { en: 'Panda Base, Chengdu', zh: '成都 · 熊猫基地' },
    photographer: '',
    description: { en: 'Breakfast bamboo session at the panda base.', zh: '熊猫基地的早餐竹子时间。' },
    tags: { en: '#Chengdu #Pandas', zh: '#成都 #大熊猫' },
    category: 'nature',
    citySlug: 'chengdu',
  },
  {
    image: '/images/cities/chengdu/chengdu_p03_12.jpeg',
    location: { en: 'Chengdu, Sichuan', zh: '四川 · 成都' },
    photographer: '',
    description: { en: 'Snack alley after dark.', zh: '入夜后的小吃巷。' },
    tags: { en: '#Chengdu #StreetFood', zh: '#成都 #街头美食' },
    category: 'food',
    citySlug: 'chengdu',
  },
  {
    image: '/images/cities/chengdu/chengdu_p04_16.jpeg',
    location: { en: 'Sichuan Basin', zh: '四川盆地' },
    photographer: '',
    description: { en: 'Green beyond the city grid.', zh: '城市之外的绿意。' },
    tags: { en: '#Chengdu #Nature', zh: '#成都 #自然' },
    category: 'landscape',
    citySlug: 'chengdu',
  },
  {
    image: '/images/cities/chengdu/chengdu_p05_19.jpeg',
    location: { en: 'Kuanzhai Alleys, Chengdu', zh: '成都 · 宽窄巷子' },
    photographer: '',
    description: { en: 'Qing-era alleys, best early morning.', zh: '清代老巷，清晨最出片。' },
    tags: { en: '#Chengdu #OldTown', zh: '#成都 #老街' },
    category: 'city',
    citySlug: 'chengdu',
  },
  {
    image: '/images/cities/chengdu/chengdu_p16_38.jpeg',
    location: { en: 'Chengdu, Sichuan', zh: '四川 · 成都' },
    photographer: '',
    description: { en: 'Chili oil meets everything.', zh: '红油浇一切。' },
    tags: { en: '#Chengdu #SichuanFood', zh: '#成都 #川菜' },
    category: 'food',
    citySlug: 'chengdu',
  },
  // —— 西安 ——
  {
    image: '/images/cities/xian/xian_p02_05.jpeg',
    location: { en: 'Xi\'an, Shaanxi', zh: '陕西 · 西安' },
    photographer: '',
    description: { en: 'Ancient capital, evening light.', zh: '古都暮色。' },
    tags: { en: '#Xian #OldCity', zh: '#西安 #古城' },
    category: 'city',
    citySlug: 'xian',
  },
  {
    image: '/images/cities/xian/xian_p02_07.jpeg',
    location: { en: 'Muslim Quarter, Xi\'an', zh: '西安 · 回民街' },
    photographer: '',
    description: { en: 'Night market crowd waves.', zh: '夜市人潮。' },
    tags: { en: '#Xian #NightMarket', zh: '#西安 #夜市' },
    category: 'people',
    citySlug: 'xian',
  },
  {
    image: '/images/cities/xian/xian_p03_13.jpeg',
    location: { en: 'City Wall, Xi\'an', zh: '西安 · 城墙' },
    photographer: '',
    description: { en: '13.7 km of Ming dynasty brick.', zh: '13.7 公里的明代城砖。' },
    tags: { en: '#Xian #CityWall', zh: '#西安 #城墙' },
    category: 'city',
    citySlug: 'xian',
  },
  {
    image: '/images/cities/xian/xian_p05_18.jpeg',
    location: { en: 'Muslim Quarter, Xi\'an', zh: '西安 · 回民街' },
    photographer: '',
    description: { en: 'Roujiamo, straight off the griddle.', zh: '刚出炉的肉夹馍。' },
    tags: { en: '#Xian #StreetFood', zh: '#西安 #街头美食' },
    category: 'food',
    citySlug: 'xian',
  },
  {
    image: '/images/cities/xian/xian_p12_44.jpeg',
    location: { en: 'Mount Hua, Shaanxi', zh: '陕西 · 华山' },
    photographer: '',
    description: { en: 'Granite spine above the clouds.', zh: '云海之上的花岗岩山脊。' },
    tags: { en: '#MountHua #Sunrise', zh: '#华山 #日出' },
    category: 'landscape',
    citySlug: 'xian',
  },
  {
    image: '/images/cities/xian/xian_p15_50.jpeg',
    location: { en: 'Terracotta Army, Xi\'an', zh: '西安 · 兵马俑' },
    photographer: '',
    description: { en: 'Two thousand years, still standing.', zh: '站了两千年，还在站。' },
    tags: { en: '#Xian #TerracottaWarriors', zh: '#西安 #兵马俑' },
    category: 'hiddenGems',
    citySlug: 'xian',
  },
  // —— 北京 ——
  {
    image: '/images/cities/beijing/beijing_p04_17.jpeg',
    location: { en: 'Forbidden City, Beijing', zh: '北京 · 故宫' },
    photographer: '',
    description: { en: 'Meridian Gate at first light.', zh: '晨光里的午门。' },
    tags: { en: '#Beijing #ForbiddenCity', zh: '#北京 #故宫' },
    category: 'city',
    citySlug: 'beijing',
  },
  {
    image: '/images/cities/beijing/beijing_p07_21.jpeg',
    location: { en: 'Hutongs, Beijing', zh: '北京 · 胡同' },
    photographer: '',
    description: { en: 'Breakfast steam between grey walls.', zh: '灰墙之间的早餐蒸汽。' },
    tags: { en: '#Beijing #Hutong #Breakfast', zh: '#北京 #胡同 #早餐' },
    category: 'food',
    citySlug: 'beijing',
  },
  {
    image: '/images/cities/beijing/beijing_p07_23.jpeg',
    location: { en: 'Hutongs, Beijing', zh: '北京 · 胡同' },
    photographer: '',
    description: { en: 'Local pace, no filter needed.', zh: '本地节奏，无需滤镜。' },
    tags: { en: '#Beijing #People', zh: '#北京 #人文' },
    category: 'people',
    citySlug: 'beijing',
  },
  {
    image: '/images/cities/beijing/beijing_p08_24.jpeg',
    location: { en: 'Subway Line 2, Beijing', zh: '北京 · 地铁 2 号线' },
    photographer: '',
    description: { en: 'The cheapest city tour there is.', zh: '最便宜的城市观光线。' },
    tags: { en: '#Beijing #Subway', zh: '#北京 #地铁' },
    category: 'transport',
    citySlug: 'beijing',
  },
  {
    image: '/images/cities/beijing/beijing_p08_25.jpeg',
    location: { en: 'Beijing', zh: '北京' },
    photographer: '',
    description: { en: 'Getting somewhere fast.', zh: '疾驰。' },
    tags: { en: '#Beijing #Transport', zh: '#北京 #交通' },
    category: 'transport',
    citySlug: 'beijing',
  },
  {
    image: '/images/cities/beijing/beijing_p13_29.jpeg',
    location: { en: 'Outskirts, Beijing', zh: '北京 · 郊野' },
    photographer: '',
    description: { en: 'Where the city thins out.', zh: '城市变薄的地方。' },
    tags: { en: '#Beijing #Outskirts', zh: '#北京 #郊野' },
    category: 'landscape',
    citySlug: 'beijing',
  },
  {
    image: '/images/cities/beijing/beijing_p20_38.jpeg',
    location: { en: 'Great Wall, Beijing', zh: '北京 · 长城' },
    photographer: '',
    description: { en: 'Watchtowers into the distance.', zh: '烽火台连向远方。' },
    tags: { en: '#GreatWall #Hiking', zh: '#长城 #徒步' },
    category: 'landscape',
    citySlug: 'beijing',
  },
  {
    image: '/images/cities/beijing/beijing_p20_39.jpeg',
    location: { en: 'Great Wall, Beijing', zh: '北京 · 长城' },
    photographer: '',
    description: { en: 'The stretch everyone photographs — go at dawn instead.', zh: '人人都拍的那段——改成清晨去。' },
    tags: { en: '#GreatWall #Sunrise', zh: '#长城 #日出' },
    category: 'hiddenGems',
    citySlug: 'beijing',
  },
]

// ===== 本地服务商数据 =====
// ⚠️ contactEmail 为占位邮箱，上线前替换为真实联系方式。

const rawServices: Omit<PartnerService, 'id'>[] = [
  {
    name: 'Wang Qiang — Chengdu Private Driver',
    type: 'driver',
    cities: ['chengdu'],
    languages: ['English', 'Chinese'],
    rating: 4.9,
    reviewCount: 127,
    intro: {
      en: '10 years driving expat families around Sichuan. Panda base, Leshan, and 3–5 day western Sichuan loops.',
      zh: '10 年外籍家庭包车经验，熟悉熊猫基地、乐山及川西 3–5 日环线。',
    },
    services: {
      en: 'Airport pickup|Panda Base day trip|Leshan Buddha day trip|Western Sichuan 3–5 day loop',
      zh: '机场接机|熊猫基地一日游|乐山大佛一日游|川西 3–5 日环线',
    },
    tags: { en: '#EnglishSpeaking #FamilyFriendly #FoodTour', zh: '#英文服务 #亲子友好 #美食路线' },
    priceRange: { en: '$60–90 / day', zh: '¥420–650 / 天' },
    isVerified: true,
    contactEmail: 'partner@example.com',
  },
  {
    name: 'Li Na — Xi\'an Licensed Tour Guide',
    type: 'guide',
    cities: ['xian'],
    languages: ['English', 'Chinese'],
    rating: 4.8,
    reviewCount: 96,
    intro: {
      en: 'Licensed national guide. Terracotta Army deep dives and Muslim Quarter food walks with real history.',
      zh: '持证导游，兵马俑深度讲解 + 回民街美食行走，历史功底扎实。',
    },
    services: {
      en: 'Terracotta Army guided tour|Muslim Quarter food walk|City wall & bell tower walk|Airport/train station pickup coordination',
      zh: '兵马俑讲解|回民街美食行|城墙钟鼓楼徒步|接站协调',
    },
    tags: { en: '#Licensed #HistoryDeepDive #FoodWalk', zh: '#持证 #历史深度 #美食行' },
    priceRange: { en: '$45 / half day', zh: '¥320 / 半天' },
    isVerified: true,
    contactEmail: 'partner@example.com',
  },
  {
    name: 'Zhang Wei — Great Wall Photographer',
    type: 'photographer',
    cities: ['beijing'],
    languages: ['English', 'Chinese'],
    rating: 5.0,
    reviewCount: 58,
    intro: {
      en: 'Sunrise shoots at uncrowded Mutianyu watchtowers. 40 edited photos delivered within 48 hours.',
      zh: '慕田峪人少烽火台日出跟拍，48 小时交付 40 张精修。',
    },
    services: {
      en: 'Great Wall sunrise session|Hutong portrait walk|Forbidden City couple shoot|Family group session',
      zh: '长城日出跟拍|胡同人像|故宫双人写真|全家福',
    },
    tags: { en: '#SunriseShoot #Mutianyu #48hDelivery', zh: '#日出跟拍 #慕田峪 #48小时交付' },
    priceRange: { en: '$120 / session', zh: '¥850 / 次' },
    isVerified: true,
    contactEmail: 'partner@example.com',
  },
  {
    name: 'Sichuan Discovery — Boutique Agency',
    type: 'agency',
    cities: ['chengdu'],
    languages: ['English', 'Chinese'],
    rating: 4.7,
    reviewCount: 210,
    intro: {
      en: 'Small-team custom itineraries: Chengdu + Jiuzhaigou, Leshan, Emei and Tibet connections.',
      zh: '小团定制：成都 + 九寨沟、乐山、峨眉及进藏衔接。',
    },
    services: {
      en: 'Custom itinerary design|Hotel & train booking|Guide & driver dispatch|24/7 trip support',
      zh: '行程定制|酒店火车预订|向导司机调度|全程 24 小时支持',
    },
    tags: { en: '#CustomTrips #Jiuzhaigou #SmallGroups', zh: '#定制 #九寨沟 #小团' },
    priceRange: { en: 'from $150 / day per group', zh: '团体 ¥1050 / 天起' },
    isVerified: false,
    contactEmail: 'partner@example.com',
  },
  {
    name: 'Chen Hao — Beijing City & Airport Driver',
    type: 'driver',
    cities: ['beijing'],
    languages: ['English', 'Chinese'],
    rating: 4.6,
    reviewCount: 143,
    intro: {
      en: 'Buick GL8, child seats on request. Airport runs, Great Wall transfers, hutong-area hotels.',
      zh: '别克 GL8，可配儿童安全座椅。机场接送、长城往返、胡同片区酒店直达。',
    },
    services: {
      en: 'Airport transfers|Great Wall round trip|City day hire|Disney-style flexible stops',
      zh: '机场接送|长城往返|市内包日|沿途灵活停靠',
    },
    tags: { en: '#EnglishSpeaking #AirportRuns #ChildSeats', zh: '#英文服务 #机场接送 #儿童座椅' },
    priceRange: { en: '$40–70 / day', zh: '¥280–500 / 天' },
    isVerified: true,
    contactEmail: 'partner@example.com',
  },
  {
    name: 'Silk Road Explorers — Xi\'an Agency',
    type: 'agency',
    cities: ['xian'],
    languages: ['English'],
    rating: 4.5,
    reviewCount: 78,
    intro: {
      en: 'Xi\'an classics plus Huashan sunrise and Luoyang Longmen Grottoes extensions.',
      zh: '西安经典线路 + 华山日出、洛阳龙门石窟延伸。',
    },
    services: {
      en: 'Xi\'an 2–3 day packages|Huashan sunrise tour|Luoyang day trip|Train ticket assistance',
      zh: '西安 2–3 日套餐|华山日出|洛阳一日|火车票协助',
    },
    tags: { en: '#Huashan #SunriseHike #Packages', zh: '#华山 #日出徒步 #套餐' },
    priceRange: { en: 'from $90 / day', zh: '¥630 / 天起' },
    isVerified: false,
    contactEmail: 'partner@example.com',
  },
]

// ===== 组装与访问函数 =====

let _vlogId = 0
let _guideId = 0
let _photoId = 0
let _serviceId = 0

const vlogs: Vlog[] = rawVlogs.map(v => ({ ...v, id: ++_vlogId }))
const externalGuides: ExternalGuide[] = rawExternalGuides.map(g => ({ ...g, id: ++_guideId }))
const photos: Photo[] = rawPhotos.map(p => ({ ...p, id: ++_photoId }))
const services: PartnerService[] = rawServices.map(s => ({ ...s, id: ++_serviceId }))

// 全部 Vlog
export function getVlogs(): Vlog[] {
  return vlogs
}

// 精选 Vlog（首页横向滚动区）
export function getFeaturedVlogs(): Vlog[] {
  return vlogs.filter(v => v.featured)
}

// 按城市筛选 Vlog
export function getVlogsByCity(citySlug: string): Vlog[] {
  return vlogs.filter(v => v.citySlug === citySlug)
}

// 某城市 Vlog 数量（目的地卡片角标）
export function getVlogCountByCity(citySlug: string): number {
  return vlogs.filter(v => v.citySlug === citySlug).length
}

// 全部外部攻略
export function getExternalGuides(): ExternalGuide[] {
  return externalGuides
}

// 按城市筛选外部攻略（含未关联城市的通用攻略可另行取全量）
export function getExternalGuidesByCity(citySlug: string): ExternalGuide[] {
  return externalGuides.filter(g => g.citySlug === citySlug)
}

// 全部图片
export function getPhotos(): Photo[] {
  return photos
}

// 按城市筛选图片
export function getPhotosByCity(citySlug: string): Photo[] {
  return photos.filter(p => p.citySlug === citySlug)
}

// 全部服务商
export function getServices(): PartnerService[] {
  return services
}

// 按城市筛选服务商
export function getServicesByCity(citySlug: string): PartnerService[] {
  return services.filter(s => s.cities.includes(citySlug))
}
