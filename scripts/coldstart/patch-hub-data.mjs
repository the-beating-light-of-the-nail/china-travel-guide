// 一次性补丁：把 hub-data.ts 的占位 Vlog / 外部攻略替换为冷启动真实数据
// 用法：node scripts/coldstart/patch-hub-data.mjs（重复执行会报错退出，防止二次覆盖）
import fs from 'node:fs'

const FILE = 'data/hub-data.ts'
let src = fs.readFileSync(FILE, 'utf-8')

if (src.includes('BV1kh411K77k')) {
  console.error('已替换过（检测到真实 BV 号），跳过')
  process.exit(1)
}

// ---------- 1) 头部占位说明 → 数据来源说明 ----------
const OLD_HEADER = `// ⚠️ 占位说明：externalUrl 目前指向平台的搜索结果页（可正常访问），
//    上线前请逐条替换为你人工挑选的真实视频/文章链接；
//    PartnerService.contactEmail 为占位邮箱，需替换为真实联系方式。`
const NEW_HEADER = `// ✅ 冷启动数据（2026-09-02 采集）：
//    Vlog —— 全部为真实视频。B站数据经公开 API 抓取（scripts/coldstart/bili-search.mjs），
//            播放量/时长/日期为抓取当日快照，会随时间漂移，可重跑脚本刷新；
//            review 为基于视频标题与简介的初稿推荐语，建议人工逐条复核。
//    ExternalGuide —— 均为真实可访问的文章/页面（独立博客 / Wikivoyage / 社区 / 官方资源）。
//    ⚠️ PartnerService.contactEmail 仍为占位邮箱（partner@example.com），需人工接洽后替换。`
if (!src.includes(OLD_HEADER)) throw new Error('header block not found')
src = src.replace(OLD_HEADER, NEW_HEADER)

// ---------- 2) rawVlogs 替换 ----------
const newVlogs = `// ===== Vlog 数据 =====
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
      en: 'Biangbiang noodles, paomo, cold skins — a complete checklist of Xi\u2019an carb classics compressed into 8 minutes. Just order what he orders.',
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
    title: { en: 'A Kazakh Family Lands in Xi\u2019an on the New Visa-Free Policy', zh: '第一批免签哈国游客落地西安' },
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
      en: 'Several "terracotta warrior" venues compete for your ticket money in Xi\u2019an. This compares the real pits with the imitators — watch before you book anything.',
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
    title: { en: 'A Day as a Tang Dynasty Girl in Xi\u2019an', zh: '穿越千年：体验唐朝少女的一天' },
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

`

const vlogsStart = src.indexOf('const rawVlogs')
const vlogsEnd = src.indexOf('// ===== 外部攻略数据 =====')
if (vlogsStart < 0 || vlogsEnd < 0 || vlogsStart > vlogsEnd) throw new Error('rawVlogs block not found')
src = src.slice(0, vlogsStart) + newVlogs + src.slice(vlogsEnd)

// ---------- 3) rawExternalGuides 替换 ----------
const newGuides = `const rawExternalGuides: Omit<ExternalGuide, 'id'>[] = [
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
    title: { en: 'Wikivoyage: Xi\u2019an', zh: '维基旅行：西安' },
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

`

const guidesStart = src.indexOf('const rawExternalGuides')
const guidesEnd = src.indexOf('// ===== 图片瀑布流数据 =====')
if (guidesStart < 0 || guidesEnd < 0 || guidesStart > guidesEnd) throw new Error('rawExternalGuides block not found')
src = src.slice(0, guidesStart) + newGuides + src.slice(guidesEnd)

fs.writeFileSync(FILE, src, 'utf-8')
console.log('patched OK')
