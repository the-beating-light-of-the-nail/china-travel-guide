// 带上我的眼睛（With My Eyes）聚合内容数据（双语：英文 / 中文）
// ---------------------------------------------------------------
// 与 travel-data.ts（原创城市/攻略内容）互补，存放四类"策展聚合"内容：
//   1. Vlog         —— 精选旅行视频（外链 Bilibili / YouTube）
//   2. ExternalGuide —— 外部攻略导航（博客 / 论坛 / 官方指南）
//   3. Photo        —— 图片瀑布流（站内图库资源）
//   4. PartnerService —— 本地服务商目录（司机 / 向导 / 摄影 / 旅行社）
//
// ✅ 冷启动数据（2026-09-02 采集）：
//    Vlog —— 全部为真实视频。B站数据经公开 API 抓取（scripts/coldstart/bili-search.mjs），
//            播放量/时长/日期为抓取当日快照，会随时间漂移，可重跑脚本刷新；
//            review 为基于视频标题与简介的初稿推荐语，建议人工逐条复核。
//    ExternalGuide —— 均为真实可访问的文章/页面（独立博客 / Wikivoyage / 社区 / 官方资源）。
//    ⚠️ PartnerService.contactEmail 仍为占位邮箱（partner@example.com），需人工接洽后替换。
// ---------------------------------------------------------------

import type { L } from './travel-data'
import { mergeLanguagePack, fillLocaleFallbacks } from './localize'
import { contentPacks } from './translations'

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

// ===== Vlog 数据 =====
// 2026-09-02 冷启动采集：B站 wbi 签名搜索 + 视频详情 API，封面下载至 /public/images/vlogs/
// 条目按发布时间升序排列（页面 latest 排序 = 数组倒序）；views 为采集日快照

const rawVlogs: Omit<Vlog, 'id'>[] = [
  {
    title: { en: 'Beijing to Shanghai by Local Bus Only', zh: '挑战坐公交从北京到上海，路费令人泪目' },
    vloggerName: '庄子HD',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1kh411K77k',
    thumbnail: '/images/vlogs/BV1kh411K77k.jpg',
    duration: '12:04',
    views: { en: '11.7M views', zh: '1171万播放' },
    review: {
      en: 'The ultimate slow-travel challenge: crossing 1,000+ km using local buses only. Costs more than a flight, but the roadside China you see is priceless.',
      zh: '1171万播放的硬核挑战：全程只坐公交从北京到上海，总花费比机票还贵，但一路的国道中国是飞机上看不到的。慢旅行党必看。',
    },
    tags: { en: '#Beijing #SlowTravel', zh: '#北京 #公交旅行' },
    citySlug: 'beijing',
    topic: 'transport',
    featured: true,
    publishedAt: { en: 'Jun 2023', zh: '2023年6月' },
  },
  {
    title: { en: "Two Days of Non-Stop Noodles in China's Carb Capital", zh: '去西安狂吃两天碳水，不愧是碳水之都' },
    vloggerName: '神奇海挪',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV14u4y1R7fR',
    thumbnail: '/images/vlogs/BV14u4y1R7fR.jpg',
    duration: '7:38',
    views: { en: '4.8M views', zh: '482万播放' },
    review: {
      en: 'Biangbiang noodles, paomo, cold skins — a complete checklist of Xi’an carb classics compressed into 8 minutes. Just order what he orders.',
      zh: 'biangbiang面、羊肉泡馍、凉皮一站集齐，8分钟看完西安主食清单，照着点就行。482万播放。',
    },
    tags: { en: '#Xian #Noodles', zh: '#西安 #面食' },
    citySlug: 'xian',
    topic: 'food',
    featured: false,
    publishedAt: { en: 'Aug 2023', zh: '2023年8月' },
  },
  {
    title: { en: 'Riding the Chengdu-Chongqing-Guiyang HSR Loop in One Day', zh: '成贵渝环线高铁体验全记录' },
    vloggerName: '涡轮风扇鱼ViC',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1Np4y1N7u5',
    thumbnail: '/images/vlogs/BV1Np4y1N7u5.jpg',
    duration: '35:55',
    views: { en: '1.2M views', zh: '116万播放' },
    review: {
      en: 'A rail fan rides the new Sichuan-Guizhou-Chongqing loop line end to end — mountains, bridges and river gorges the whole way. Great reference for a HSR loop trip.',
      zh: '高铁迷全程实录成贵渝环线：一天跨三省，桥隧相连、河谷不断，想安排铁路环线游的先看这个。',
    },
    tags: { en: '#Chengdu #HighSpeedRail', zh: '#成都 #高铁' },
    citySlug: 'chengdu',
    topic: 'transport',
    featured: false,
    publishedAt: { en: 'Aug 2023', zh: '2023年8月' },
  },
  {
    title: { en: 'A Finnish Family Eats 15 Sichuan Meals in 3 Days', zh: '芬兰一家三天在成都狂炫15顿川菜' },
    vloggerName: '雨琪在芬兰',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1RH4y1Q71r',
    thumbnail: '/images/vlogs/BV1RH4y1Q71r.jpg',
    duration: '22:43',
    views: { en: '8.5M views', zh: '845万播放' },
    review: {
      en: 'A Finnish family returns after five years and eats everything: nine-grid beef-tallow hotpot, roast duck over rice, melting pig-trotter soup. Use it as your "what to order in Chengdu" list.',
      zh: '芬兰一家人五年后重返成都，九宫格牛油火锅、冒烤鸭、老妈蹄花轮番上阵。可以直接当"成都点菜清单"用，845万播放。',
    },
    tags: { en: '#Chengdu #Hotpot', zh: '#成都 #火锅' },
    citySlug: 'chengdu',
    topic: 'food',
    featured: true,
    publishedAt: { en: 'Sep 2023', zh: '2023年9月' },
  },
  {
    title: { en: "Xi'an Food Marathon with Two of China's Top Vloggers", zh: '小潮小傲去西安！西北美食吃翻天' },
    vloggerName: '小傲想睡觉',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1MN4y1D7JQ',
    thumbnail: '/images/vlogs/BV1MN4y1D7JQ.jpg',
    duration: '20:38',
    views: { en: '5.3M views', zh: '529万播放' },
    review: {
      en: "Two of Bilibili's biggest creators eat their way through the Muslim Quarter. 5.3M plays and constant jokes — the funniest possible intro to northwestern food.",
      zh: 'B站顶流组合的西安干饭之旅，529万播放。肉夹馍、泡馍、烤肉一路吃过去，笑着把西安美食入门看完。',
    },
    tags: { en: '#Xian #StreetFood', zh: '#西安 #街头美食' },
    citySlug: 'xian',
    topic: 'food',
    featured: true,
    publishedAt: { en: 'Nov 2023', zh: '2023年11月' },
  },
  {
    title: { en: 'A Kazakh Family Lands in Xi’an on the New Visa-Free Policy', zh: '第一批免签哈国游客落地西安' },
    vloggerName: '娜塔莎一家',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1MG411S7Mc',
    thumbnail: '/images/vlogs/BV1MG411S7Mc.jpg',
    duration: '15:28',
    views: { en: '634K views', zh: '63万播放' },
    review: {
      en: 'An extended Kazakh family crosses into China visa-free for the first time — a real sample of how overland entry and the first days in China feel now.',
      zh: '免签政策后第一批哈萨克斯坦家庭游客入境实录，陆路来华、通关、第一印象全记录。',
    },
    tags: { en: '#Xian #VisaFree', zh: '#西安 #免签' },
    citySlug: 'xian',
    topic: 'culture',
    featured: false,
    publishedAt: { en: 'Nov 2023', zh: '2023年11月' },
  },
  {
    title: { en: 'I Visited 3 Terracotta Warrior Museums — Only One Is the Real Pits', zh: '西安2天去了3个兵马俑馆，别买错票' },
    vloggerName: '超Carry的柴西',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV13N4y1i7Jy',
    thumbnail: '/images/vlogs/BV13N4y1i7Jy.jpg',
    duration: '8:32',
    views: { en: '1.3M views', zh: '128万播放' },
    review: {
      en: 'Several "terracotta warrior" venues compete for your ticket money in Xi’an. This compares the real pits with the imitators — watch before you book anything.',
      zh: '西安不止一个"兵马俑"展馆，游客常买错票。这条对比正版俑坑和仿展馆的区别，出发前必看的防坑指南。',
    },
    tags: { en: '#Xian #TerracottaWarriors', zh: '#西安 #兵马俑' },
    citySlug: 'xian',
    topic: 'culture',
    featured: false,
    publishedAt: { en: 'Jan 2024', zh: '2024年1月' },
  },
  {
    title: { en: 'A British Vlogger Survives Beijing Winter', zh: '英国小哥实测：北京都嫌冷，还去什么哈尔滨' },
    vloggerName: 'KerryDowdle',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV17Q4y1w7iS',
    thumbnail: '/images/vlogs/BV17Q4y1w7iS.jpg',
    duration: '8:03',
    views: { en: '1.1M views', zh: '105万播放' },
    review: {
      en: 'A British creator finds out how cold Beijing really gets — what to wear, what it costs, and whether Harbin is worth adding to a winter trip.',
      zh: '英国博主实测北京冬天有多冷、该怎么穿、花多少钱，顺带纠结要不要加哈尔滨行程。冬季来华行前参考。',
    },
    tags: { en: '#Beijing #Winter', zh: '#北京 #冬天' },
    citySlug: 'beijing',
    topic: 'culture',
    featured: false,
    publishedAt: { en: 'Jan 2024', zh: '2024年1月' },
  },
  {
    title: { en: 'The Best 2 Yuan You Can Spend Sightseeing in Beijing', zh: '在北京花得最值的2块钱' },
    vloggerName: '超Carry的柴西',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1Mg4y1e74E',
    thumbnail: '/images/vlogs/BV1Mg4y1e74E.jpg',
    duration: '11:46',
    views: { en: '1.1M views', zh: '108万播放' },
    review: {
      en: 'The "internet footsteps" series walks Beijing to find the best-spent ¥2 of the whole trip — the complete route is pinned in the comments.',
      zh: '"互联网脚替"系列：实测北京花得最值的2块钱，完整路线在评论区置顶，跟着走就行。',
    },
    tags: { en: '#Beijing #HiddenGems', zh: '#北京 #宝藏路线' },
    citySlug: 'beijing',
    topic: 'food',
    featured: false,
    publishedAt: { en: 'Jan 2024', zh: '2024年1月' },
  },
  {
    title: { en: 'Visiting the Chengdu Panda Base — Irish Couple Amazed', zh: '爱尔兰夫妇逛成都大熊猫基地' },
    vloggerName: 'Two Mad Explorers',
    platform: 'youtube',
    externalUrl: 'https://www.youtube.com/watch?v=Uh7Y_buHREI',
    thumbnail: '/images/vlogs/BV1Vz421z7u8.jpg',
    duration: '18:34',
    views: { en: '101K views', zh: '10万播放' },
    review: {
      en: 'The well-known Irish travel couple Two Mad Explorers at the Chengdu panda base — honest first-timer logistics plus genuine awe. Links to their original YouTube video.',
      zh: '爱尔兰知名旅行夫妇 Two Mad Explorers 实逛成都熊猫基地，游客视角路线+连连惊叹。链接为其 YouTube 官方原片。',
    },
    tags: { en: '#Chengdu #Pandas', zh: '#成都 #大熊猫' },
    citySlug: 'chengdu',
    topic: 'nature',
    featured: true,
    publishedAt: { en: 'Jun 2024', zh: '2024年6月' },
  },
  {
    title: { en: '"What Is Even Worth Seeing in Beijing?" — A Local Vlogger Asks', zh: '这"破"北京有什么可逛的？' },
    vloggerName: '小鹿Lawrence',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1F1421b7vU',
    thumbnail: '/images/vlogs/BV1F1421b7vU.jpg',
    duration: '12:56',
    views: { en: '1.4M views', zh: '141万播放' },
    review: {
      en: 'A Beijing-based travel vlogger treats his own city like a foreign destination and explores a 10-km radius. Fresh hutong angles even locals miss.',
      zh: '旅行博主把北京当陌生城市"原地旅行"：以工作室为圆心逛10公里，胡同与新店视角，本地人都能看出新意。141万播放。',
    },
    tags: { en: '#Beijing #LocalView', zh: '#北京 #胡同' },
    citySlug: 'beijing',
    topic: 'culture',
    featured: true,
    publishedAt: { en: 'Aug 2024', zh: '2024年8月' },
  },
  {
    title: { en: 'Mutianyu: The Great Wall Section Foreigners Love', zh: '慕田峪是你来北京一定不能错过的长城' },
    vloggerName: '博文的旅行日记',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1QJ4pekESL',
    thumbnail: '/images/vlogs/BV1QJ4pekESL.jpg',
    duration: '8:18',
    views: { en: '84K views', zh: '8万播放' },
    review: {
      en: 'A focused case for Mutianyu over crowded Badaling — restored wall, cable car, far fewer people. Matches what every expat recommends, with transport and ticket details.',
      zh: '讲透慕田峪为什么比八达岭值得：人少、墙好、有缆车，含交通门票信息，与老外圈口碑一致。',
    },
    tags: { en: '#Beijing #GreatWall', zh: '#北京 #长城' },
    citySlug: 'beijing',
    topic: 'nature',
    featured: false,
    publishedAt: { en: 'Sep 2024', zh: '2024年9月' },
  },
  {
    title: { en: 'Every Ride at Universal Beijing in One Spring Festival Day', zh: '春节挑战：一天刷完北京环球影城所有项目' },
    vloggerName: '李格Greg',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1q4fWYUE1X',
    thumbnail: '/images/vlogs/BV1q4fWYUE1X.jpg',
    duration: '4:03',
    views: { en: '2.3M views', zh: '225万播放' },
    review: {
      en: 'A dad and son attempt every ride at Universal Studios Beijing during Spring Festival peak — a realistic pacing plan for the busiest season.',
      zh: '春节档一天刷完环球影城全部项目的实战记录，排队策略与动线安排可直接抄，225万播放。',
    },
    tags: { en: '#Beijing #UniversalStudios', zh: '#北京 #环球影城' },
    citySlug: 'beijing',
    topic: 'culture',
    featured: false,
    publishedAt: { en: 'Jan 2025', zh: '2025年1月' },
  },
  {
    title: { en: 'Mount Hua Plank Walk: Complete First-Person POV', zh: '华山长空栈道第一视角' },
    vloggerName: '可尔必思哥哥',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1hoKHzLE65',
    thumbnail: '/images/vlogs/BV1hoKHzLE65.jpg',
    duration: '23:59',
    views: { en: '1.4M views', zh: '141万播放' },
    review: {
      en: 'Unbroken first-person POV of the famous cliff-side plank walk — you will know exactly what you are signing up for before you pay for the safety harness.',
      zh: '长空栈道全程第一视角，一镜到底。去华山前先看这个，判断自己敢不敢上、要不要花安全绳的钱。',
    },
    tags: { en: '#Xian #MountHua', zh: '#西安 #华山' },
    citySlug: 'xian',
    topic: 'nature',
    featured: true,
    publishedAt: { en: 'Jun 2025', zh: '2025年6月' },
  },
  {
    title: { en: 'A Day as a Tang Dynasty Girl in Xi’an', zh: '穿越千年：体验唐朝少女的一天' },
    vloggerName: '抖个姬灵',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1jahmzdE6X',
    thumbnail: '/images/vlogs/BV1jahmzdE6X.jpg',
    duration: '11:33',
    views: { en: '977K views', zh: '97万播放' },
    review: {
      en: 'Hanfu makeover plus a full Tang-costume day in the ancient capital — how to book the outfit, where to shoot, what it costs.',
      zh: '汉服妆造+唐装逛长安的完整流程：怎么约妆造、去哪取景、花多少钱，想拍唐风写真的照抄。',
    },
    tags: { en: '#Xian #Hanfu', zh: '#西安 #汉服' },
    citySlug: 'xian',
    topic: 'culture',
    featured: false,
    publishedAt: { en: 'Aug 2025', zh: '2025年8月' },
  },
  {
    title: { en: 'A Village "Baba Banquet" on the Edge of Chengdu', zh: '成都坝坝宴：村里吃席全靠抢' },
    vloggerName: '达哥在上海',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1GbcMz8En9',
    thumbnail: '/images/vlogs/BV1GbcMz8En9.jpg',
    duration: '10:10',
    views: { en: '5.1M views', zh: '507万播放' },
    review: {
      en: 'No menu, no ordering — you grab whatever dish comes off the wok. A joyful look at rural Sichuan banquet culture foreign visitors almost never stumble into.',
      zh: '川西坝坝宴实录：不点菜、端着碗抢菜，像回农村吃席。507万播放，外国游客几乎不可能自己撞见的成都另一面。',
    },
    tags: { en: '#Chengdu #LocalLife', zh: '#成都 #坝坝宴' },
    citySlug: 'chengdu',
    topic: 'culture',
    featured: false,
    publishedAt: { en: 'Feb 2026', zh: '2026年2月' },
  },
  {
    title: { en: 'Second Visit, Still Cannot Finish Eating Chengdu in 3 Days', zh: '特种兵旅游之二刷成都，三天两夜吃不完' },
    vloggerName: '神奇海挪',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1Y2Tg6TE85',
    thumbnail: '/images/vlogs/BV1Y2Tg6TE85.jpg',
    duration: '7:15',
    views: { en: '1.5M views', zh: '151万播放' },
    review: {
      en: 'Fresh mid-2026 vlog: a fast, dense 3-day eating route with zero filler — the most current Chengdu food crawl on the site.',
      zh: '2026年6月新片：三天两夜纯吃路线，节奏快、信息密，站内最新的成都逛吃参考。',
    },
    tags: { en: '#Chengdu #FoodTour', zh: '#成都 #美食' },
    citySlug: 'chengdu',
    topic: 'food',
    featured: false,
    publishedAt: { en: 'Jun 2026', zh: '2026年6月' },
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
    title: { en: 'Traveling to China? 50 Things to Know', zh: '去中国旅行前要知道的50件事' },
    sourceName: 'Rachel Meets China',
    externalUrl: 'https://rachelmeetschina.com/2024/03/10/traveling-to-china-50-things-to-know-in-2023/',
    summary: {
      en: 'A Beijing-based American expat compresses everything — visas, payments, VPNs, transport — into 50 tips, updated yearly since 2023.',
      zh: '常住北京的美国博主把签证、支付、VPN、交通压进 50 条 tips，2023 年起每年更新。',
    },
    category: 'visa',
    language: 'en',
    readTime: { en: '12 min', zh: '12 分钟' },
    tags: { en: '#FirstTrip #Checklist', zh: '#首次来华 #行前清单' },
  },
  {
    title: { en: 'How to Link Your Foreign Bank Card to Alipay & WeChat Pay', zh: '外国银行卡绑定支付宝与微信全教程' },
    sourceName: 'Rachel Meets China',
    externalUrl: 'https://rachelmeetschina.com/2024/10/29/traveling-to-china-how-to-connect-your-foreign-bank-card-to-the-alipay-and-wechat/',
    summary: {
      en: 'Screenshot-by-screenshot binding walkthrough for Visa/Mastercard — the single most important setup step before you land.',
      zh: '截图级教程：Visa/万事达绑定支付宝与微信支付，落地前最该做完的一件事。',
    },
    category: 'apps',
    language: 'en',
    readTime: { en: '8 min', zh: '8 分钟' },
    tags: { en: '#Payments #Setup', zh: '#支付 #设置' },
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
    title: { en: 'The Ultimate 3-Day Beijing Itinerary', zh: '北京3日终极行程' },
    sourceName: 'Rachel Meets China',
    externalUrl: 'https://rachelmeetschina.com/2024/03/27/the-ultimate-3-day-beijing-itinerary-for-2024/',
    summary: {
      en: 'Written by an expat who actually hosts visiting friends: Forbidden City day, Great Wall day, temples day — with booking links and timing.',
      zh: '真带朋友逛北京的博主写的行程：故宫日、长城日、寺庙日，附预约入口与时间安排。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '15 min', zh: '15 分钟' },
    tags: { en: '#Itinerary #FirstTrip', zh: '#行程 #首次来华' },
    citySlug: 'beijing',
  },
  {
    title: { en: 'Which Section of the Great Wall Should You Visit?', zh: '长城那么多段，到底去哪段？' },
    sourceName: 'Rachel Meets China',
    externalUrl: 'https://rachelmeetschina.com/2024/08/27/which-section-of-the-great-wall-should-you-visit/',
    summary: {
      en: 'Mutianyu vs Badaling vs camping on the wall — compared by cost, transport and crowds by someone who has done them all.',
      zh: '慕田峪、八达岭、长城露营横向对比：花费、交通、人流，作者每段都亲测。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '10 min', zh: '10 分钟' },
    tags: { en: '#GreatWall #Compare', zh: '#长城 #对比' },
    citySlug: 'beijing',
  },
  {
    title: { en: 'Wikivoyage: Chengdu', zh: '维基旅行：成都' },
    sourceName: 'Wikivoyage',
    externalUrl: 'https://en.wikivoyage.org/wiki/Chengdu',
    summary: {
      en: 'Community-maintained Chengdu guide — two airports, 11 metro lines, every museum with prices and hours. Openly licensed, constantly updated.',
      zh: '社区共建的成都指南：双机场、11 条地铁、博物馆票价与开放时间，开放内容持续更新。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '25 min', zh: '25 分钟' },
    tags: { en: '#OpenData #AlwaysUpdated', zh: '#开放数据 #持续更新' },
    citySlug: 'chengdu',
  },
  {
    title: { en: 'Wikivoyage: Xi’an', zh: '维基旅行：西安' },
    sourceName: 'Wikivoyage',
    externalUrl: 'https://en.wikivoyage.org/wiki/Xi%27an',
    summary: {
      en: 'The community guide to the ancient capital — city wall, warriors, Muslim Quarter, with honest food listings and transport detail.',
      zh: '古都的社区指南：城墙、兵马俑、回民街，配实在的美食清单与交通细节。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '20 min', zh: '20 分钟' },
    tags: { en: '#OpenData #AlwaysUpdated', zh: '#开放数据 #持续更新' },
    citySlug: 'xian',
  },
  {
    title: { en: 'Qinghai-Gansu Grand Loop: A Tested 9-Day Roadbook', zh: '青甘大环线：实测9天路书' },
    sourceName: 'GitHub · GanghaoSun',
    externalUrl: 'https://github.com/GanghaoSun/qinggan-grand-loop-roadbook',
    summary: {
      en: 'Open-source self-drive roadbook for the Qinghai-Gansu loop — daily routes, real costs and lodging from an actual trip, maintained on GitHub.',
      zh: '开源的青甘大环线自驾路书：逐日路线、真实花费与住宿，GitHub 持续维护。',
    },
    category: 'itinerary',
    language: 'cn',
    readTime: { en: '10 min', zh: '10 分钟' },
    tags: { en: '#RoadTrip #OpenSource', zh: '#自驾 #开源' },
  },
  {
    title: { en: 'Karakoram Highway (China Side): The Complete Guide', zh: '喀喇昆仑公路（中国段）完全指南' },
    sourceName: 'Far West China',
    externalUrl: 'https://www.farwestchina.com/travel/karakoram-highway-china-guide/',
    summary: {
      en: 'From the longest-running English blog on Xinjiang — logistics, permits and stops for driving the KKH out of Kashgar.',
      zh: '来自运营新疆内容十余年的英文博客 Far West China：喀什出发走喀喇昆仑公路的证件、补给与停靠点。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '15 min', zh: '15 分钟' },
    tags: { en: '#Xinjiang #RoadTrip', zh: '#新疆 #自驾' },
  },
  {
    title: { en: 'How to Stay in a Uyghur Homestay in Xinjiang', zh: '如何在新疆住进维吾尔族家庭民宿' },
    sourceName: 'Far West China',
    externalUrl: 'https://www.farwestchina.com/tips/how-to-uyghur-homestay-in-xinjiang/',
    summary: {
      en: 'How to find and book family homestays in southern Xinjiang, etiquette included. An accommodation experience no hotel matches.',
      zh: '南疆家庭民宿怎么找、怎么订、注意什么礼节。住一晚比任何酒店都更接近真实旅途。',
    },
    category: 'accommodation',
    language: 'en',
    readTime: { en: '8 min', zh: '8 分钟' },
    tags: { en: '#Xinjiang #Homestay', zh: '#新疆 #民宿' },
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
    title: { en: 'Best Bars in Beijing 2026', zh: '2026 北京最佳酒吧清单' },
    sourceName: 'Rachel Meets China',
    externalUrl: 'https://rachelmeetschina.com/2026/08/10/best-bars-in-beijing-2026-breweries-wine-bars-cocktails-rooftops-more/',
    summary: {
      en: 'Updated August 2026: craft breweries, natural-wine bars, hutong cocktail dens and rooftops — the city after dark, organized by type.',
      zh: '2026 年 8 月更新：精酿、自然酒、胡同鸡尾酒吧与天台，按类型整理的北京夜生活地图。',
    },
    category: 'food',
    language: 'en',
    readTime: { en: '10 min', zh: '10 分钟' },
    tags: { en: '#Nightlife #Beijing', zh: '#夜生活 #北京' },
    citySlug: 'beijing',
  },
  {
    title: { en: 'r/TravelChina: Ask Real Travelers in Real Time', zh: 'r/TravelChina：向真实旅行者实时提问' },
    sourceName: 'Reddit',
    externalUrl: 'https://www.reddit.com/r/TravelChina/',
    summary: {
      en: 'The most active English community for China travel — visa changes and app workarounds surface here days before anywhere else.',
      zh: '最活跃的英文中国旅行社区：签证变动与 App 变通方法往往最先出现在这里。',
    },
    category: 'safety',
    language: 'en',
    readTime: { en: '5 min', zh: '5 分钟' },
    tags: { en: '#Community #RealTime', zh: '#社区 #实时' },
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

// 合并各语言翻译包（数组按索引对齐），并为缺失语言填充英文兜底
for (const [lang, pack] of Object.entries(contentPacks)) {
  vlogs.forEach((v, i) => mergeLanguagePack(v, pack.vlogs?.[i], lang, `vlogs[${i}]`))
  externalGuides.forEach((g, i) => mergeLanguagePack(g, pack.externalGuides?.[i], lang, `externalGuides[${i}]`))
  photos.forEach((p, i) => mergeLanguagePack(p, pack.photos?.[i], lang, `photos[${i}]`))
  services.forEach((s, i) => mergeLanguagePack(s, pack.services?.[i], lang, `services[${i}]`))
}
fillLocaleFallbacks(vlogs)
fillLocaleFallbacks(externalGuides)
fillLocaleFallbacks(photos)
fillLocaleFallbacks(services)

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
