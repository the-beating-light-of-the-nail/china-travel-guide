// 一次性补丁：向 hub-data.ts 插入贵州 Vlog / 照片 / 外部攻略数据
// 用法：node scripts/coldstart/patch-guizhou.mjs（重复执行会检测到已有 BV 号并退出）
// Vlog 封面已下载至 /public/images/vlogs/；播放量为 2026-09-05 快照
import fs from 'node:fs'

const FILE = 'data/hub-data.ts'
let src = fs.readFileSync(FILE, 'utf-8')

if (src.includes('BV1fXnXzJETg')) {
  console.error('已插入过（检测到贵州 BV 号），跳过')
  process.exit(1)
}

// ---------- 1) Vlog 条目（按发布时间升序，锚点插入） ----------
// anchor: 'START' = 数组开头；BV 号 = 该条目末尾之后
const guizhouVlogs = [
  {
    anchor: 'START',
    body: `  {
    title: { en: 'Anshun Food Tour: Duqiao Qingjiao Fish by Huangguoshu', zh: '贵州安顺断桥青椒鱼，鲜美黄辣丁，阿星逛黄果树瀑布' },
    vloggerName: '阿星探店',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1fB4y1b7so',
    thumbnail: '/images/vlogs/BV1fB4y1b7so.jpg',
    duration: '22:12',
    views: { en: '453K views', zh: '45万播放' },
    review: {
      en: 'A food vlogger eats his way around Anshun — the gateway city to Huangguoshu — from qingjiao fish to street-side stewed tofu. Watch it the night before your own waterfall day.',
      zh: '美食博主在黄果树的门户城市安顺一路吃过去：青椒鱼、黄辣丁、街头炖豆腐。去黄果树前一晚看，第二天照着找馆子。',
    },
    tags: { en: '#Guizhou #Anshun #Food', zh: '#贵州 #安顺 #美食' },
    citySlug: 'guizhou',
    topic: 'food',
    featured: false,
    publishedAt: { en: 'Aug 2022', zh: '2022年8月' },
  },`,
  },
  {
    anchor: 'BV1fB4y1b7so',
    body: `  {
    title: { en: 'Libo Food Street: Beanflower Grilled Fish & Night Market', zh: '贵州荔波美食街，香辣豆花烤鱼，夜市牛肉小串' },
    vloggerName: '阿星探店',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1y24y117Yo',
    thumbnail: '/images/vlogs/BV1y24y117Yo.jpg',
    duration: '19:04',
    views: { en: '396K views', zh: '40万播放' },
    review: {
      en: 'The evening companion piece for a Libo/Xiaoqikong trip: beanflower grilled fish, beef skewers and fresh bayberry juice, all within a few hundred meters of the county town riverside.',
      zh: '荔波/小七孔行程的晚间指南：豆花烤鱼、牛肉小串、鲜榨杨梅汤，都在县城河边几百米内。',
    },
    tags: { en: '#Guizhou #Libo #StreetFood', zh: '#贵州 #荔波 #街头美食' },
    citySlug: 'guizhou',
    topic: 'food',
    featured: false,
    publishedAt: { en: 'Nov 2022', zh: '2022年11月' },
  },`,
  },
  {
    anchor: 'BV1y24y117Yo',
    body: `  {
    title: { en: 'Come to Xiaoqikong — You Can Swim Here', zh: '来荔波小七孔吧，能下水！' },
    vloggerName: '深山远方兽',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1oM411a7P8',
    thumbnail: '/images/vlogs/BV1oM411a7P8.jpg',
    duration: '4:51',
    views: { en: '166K views', zh: '17万播放' },
    review: {
      en: 'Short and convincing: the glass-green pools of Xiaoqikong in summer, with actual swimming. Five minutes of pure persuasion to add Libo to your itinerary.',
      zh: '短片但极有说服力：夏天的小七孔翡翠色水潭，还能下水。五分钟让你把荔波加进行程。',
    },
    tags: { en: '#Guizhou #Libo #Nature', zh: '#贵州 #荔波 #自然' },
    citySlug: 'guizhou',
    topic: 'nature',
    featured: false,
    publishedAt: { en: 'Jan 2023', zh: '2023年1月' },
  },`,
  },
  {
    anchor: 'BV1Mg4y1e74E',
    body: `  {
    title: { en: 'First Time Climbing Fanjingshan — The Route Explained', zh: '第一次爬梵净山该咋爬' },
    vloggerName: '崂山Bro',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1UF4m1K7dL',
    thumbnail: '/images/vlogs/BV1UF4m1K7dL.jpg',
    duration: '12:09',
    views: { en: '684K views', zh: '68万播放' },
    review: {
      en: 'Exactly what first-timers need: East Gate vs West Gate, cable car vs the 8,888 steps, and how the Golden Summit climb actually feels. Watch before booking your ticket day.',
      zh: '首爬者刚需：东门西门怎么选、索道与8888级台阶怎么取舍、金顶最后一段真实体感。订票前先看这期。',
    },
    tags: { en: '#Guizhou #Fanjingshan #Hiking', zh: '#贵州 #梵净山 #徒步' },
    citySlug: 'guizhou',
    topic: 'nature',
    featured: false,
    publishedAt: { en: 'Apr 2024', zh: '2024年4月' },
  },`,
  },
  {
    anchor: 'BV1UF4m1K7dL',
    body: `  {
    title: { en: 'The Real-Life Castle in the Sky: Fanjingshan', zh: '现实版的天空之城，此生必爬的一座山，这里就是贵州的梵净山' },
    vloggerName: '青云迹',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV12b421e7Lu',
    thumbnail: '/images/vlogs/BV12b421e7Lu.jpg',
    duration: '37:09',
    views: { en: '1.96M views', zh: '196万播放' },
    review: {
      en: 'The definitive Fanjingshan film: 37 minutes of cloud seas, the split-summit temples and the Mushroom Stone through four seasons. If you watch one video before Guizhou, make it this one.',
      zh: '梵净山的定档影片：37分钟云海、劈开的双顶佛寺与四季蘑菇石。来贵州前如果只看一支视频，看这支出。',
    },
    tags: { en: '#Guizhou #Fanjingshan #UNESCO', zh: '#贵州 #梵净山 #世界遗产' },
    citySlug: 'guizhou',
    topic: 'nature',
    featured: false,
    publishedAt: { en: 'Jun 2024', zh: '2024年6月' },
  },`,
  },
  {
    anchor: 'BV1F1421b7vU',
    body: `  {
    title: { en: 'Guizhou 6 Days 5 Nights on Your Own: Small Seven Holes, Huangguoshu, Xijiang', zh: '贵州VLOG丨6天5夜旅游自由行攻略行程丨小七孔丨黄果树瀑布丨千户苗寨' },
    vloggerName: '逢坂鱼鱼',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1n6421f7ei',
    thumbnail: '/images/vlogs/BV1n6421f7ei.jpg',
    duration: '10:17',
    views: { en: '258K views', zh: '26万播放' },
    review: {
      en: 'A real solo itinerary, all buses and trains, baseed in Guiyang the whole way — proof you can do Guizhou without a tour. Great reference for logistics and what each stop actually costs.',
      zh: '真实的自由行记录：全程公共交通、以贵阳为基地——证明贵州不跟团完全可行。交通接驳与各站花费参考价值极高。',
    },
    tags: { en: '#Guizhou #Itinerary #IndependentTravel', zh: '#贵州 #行程 #自由行' },
    citySlug: 'guizhou',
    topic: 'culture',
    featured: false,
    publishedAt: { en: 'Jul 2024', zh: '2024年7月' },
  },`,
  },
  {
    anchor: 'BV1n6421f7ei',
    body: `  {
    title: { en: 'Was Huangguoshu Overrated? An Honest Look', zh: '家人们，被语文书骗了，黄果树就这？？' },
    vloggerName: '-欣小萌-',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1pf421q7Eq',
    thumbnail: '/images/vlogs/BV1pf421q7Eq.jpg',
    duration: '17:40',
    views: { en: '1.77M views', zh: '177万播放' },
    review: {
      en: 'The contrarian take every traveler should hear before going: crowds, spray, and how expectations from the textbook photo collide with reality. Useful for timing (and for deciding between peak and off-season).',
      zh: '去之前值得听的反方观点：人潮、水雾，以及课本照片与现实的落差。对选择旺季还是淡季、几点入园非常有用。',
    },
    tags: { en: '#Guizhou #Huangguoshu #HonestReview', zh: '#贵州 #黄果树 #真实体验' },
    citySlug: 'guizhou',
    topic: 'nature',
    featured: false,
    publishedAt: { en: 'Jul 2024', zh: '2024年7月' },
  },`,
  },
  {
    anchor: 'BV1q4fWYUE1X',
    body: `  {
    title: { en: 'Eight Meals a Day: Eating All of Guiyang in One Day', zh: '一天吃八顿！极限特种兵带你一天吃遍贵阳！' },
    vloggerName: '干饭三健客',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1YqBjYTEzn',
    thumbnail: '/images/vlogs/BV1YqBjYTEzn.jpg',
    duration: '16:22',
    views: { en: '5.6M views', zh: '560万播放' },
    review: {
      en: '5.6M plays for a reason: eight stops from siwawa wraps to sour soup, all cheap, all walkable from downtown Guiyang. Freeze-frame the addresses — this doubles as your Guiyang food map.',
      zh: '560万播放不无道理：从丝娃娃到酸汤鱼连吃八顿，全都便宜、全都从市中心步行可达。暂停抄地址——这就是你的贵阳美食地图。',
    },
    tags: { en: '#Guizhou #Guiyang #FoodTour', zh: '#贵州 #贵阳 #美食' },
    citySlug: 'guizhou',
    topic: 'food',
    featured: true,
    publishedAt: { en: 'Dec 2024', zh: '2024年12月' },
  },`,
  },
  {
    anchor: 'BV1jahmzdE6X',
    body: `  {
    title: { en: 'British Vlogger in Xijiang: Is This Really China\\'s Poorest Place?', zh: '英国博主：这真的是中国最穷的地方吗？' },
    vloggerName: 'Mr有意思',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1u4grzGEcB',
    thumbnail: '/images/vlogs/BV1u4grzGEcB.jpg',
    duration: '13:03',
    views: { en: '3M views', zh: '301万播放' },
    review: {
      en: 'A British creator revisits Xijiang Miao Village after years away and finds光纤与快递到村的现实 — 3M plays of country-comparison culture shock, the exact "eyes on China" angle this site exists for.',
      zh: '英国博主多年后重访西江千户苗寨，见证光纤与快递进村的现实——301万播放的国别对比文化冲击，正是本站"借你的眼睛看中国"的选题。',
    },
    tags: { en: '#Guizhou #Xijiang #Miao #Culture', zh: '#贵州 #西江 #苗寨 #文化' },
    citySlug: 'guizhou',
    topic: 'culture',
    featured: true,
    publishedAt: { en: 'Jul 2025', zh: '2025年7月' },
  },`,
  },
  {
    anchor: 'BV1GbcMz8En9',
    body: `  {
    title: { en: 'Only China Builds Bridges Here — The Huajiang Canyon Bridge Story', zh: '只有中国，才会在这种地方造桥 【新天工开物】' },
    vloggerName: '星球研究所',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1fXnXzJETg',
    thumbnail: '/images/vlogs/BV1fXnXzJETg.jpg',
    duration: '10:07',
    views: { en: '9.76M views', zh: '976万播放' },
    review: {
      en: 'Published the day the world\\'s highest bridge opened (Sep 28, 2025), this is the definitive visual explainer of why Guizhou has half of the planet\\'s 100 tallest bridges. 9.76M plays — the anchor video for any "bridge museum" trip.',
      zh: '与世界第一高桥通车同日（2025年9月28日）发布，是"贵州为何坐拥全球百座最高桥近半数"的定档视觉解说。976万播放——桥梁主题行程的锚点视频。',
    },
    tags: { en: '#Guizhou #Bridge #Engineering', zh: '#贵州 #桥梁 #工程' },
    citySlug: 'guizhou',
    topic: 'transport',
    featured: true,
    publishedAt: { en: 'Sep 2025', zh: '2025年9月' },
  },`,
  },
  {
    anchor: 'BV1fXnXzJETg',
    body: `  {
    title: { en: 'Drop a Stone, Count 11 Seconds: Building a Bridge Over the "Crack of the Earth"', zh: '丢下一块石头，11秒才落地！在地球裂缝上修桥有多难?' },
    vloggerName: '差评君',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1hakfB9ET5',
    thumbnail: '/images/vlogs/BV1hakfB9ET5.jpg',
    duration: '13:47',
    views: { en: '717K views', zh: '72万播放' },
    review: {
      en: 'The engineering story behind the 625-meter Huajiang Canyon Bridge, told with the stone-drop demo you\'ll want to recreate at the viewpoint. Pairs perfectly with the星球研究所 film above.',
      zh: '625米花江峡谷大桥的工程故事，开头"丢石头数11秒"的演示你在观景台也能复刻。与上面星球研究所那期对照着看。',
    },
    tags: { en: '#Guizhou #Bridge #Engineering', zh: '#贵州 #桥梁 #工程' },
    citySlug: 'guizhou',
    topic: 'transport',
    featured: false,
    publishedAt: { en: 'Nov 2025', zh: '2025年11月' },
  },`,
  },
  {
    anchor: 'BV1Y2Tg6TE85',
    body: `  {
    title: { en: '92.5% Mountains: A 6-Day Guizhou Route With Zero Wasted Steps', zh: '贵州92.5%都是山！6天行程这样走，少踩90%人的坑！' },
    vloggerName: '烩饭在路上',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1h5dYB7E7o',
    thumbnail: '/images/vlogs/BV1h5dYB7E7o.jpg',
    duration: '11:16',
    views: { en: '756K views', zh: '76万播放' },
    review: {
      en: 'Route, pacing and budget in one video — the 2026 up-to-date version of "how many days do you actually need". The mistakes-to-avoid list alone saves most first-timers a full day.',
      zh: '路线、节奏、预算一次讲透——2026年最新的"贵州到底要玩几天"答案。光是避坑清单就能帮首刷者省出一整天。',
    },
    tags: { en: '#Guizhou #Itinerary #Budget', zh: '#贵州 #行程 #预算' },
    citySlug: 'guizhou',
    topic: 'culture',
    featured: false,
    publishedAt: { en: 'Apr 2026', zh: '2026年4月' },
  },`,
  },
  {
    anchor: 'LAST',
    body: `  {
    title: { en: 'Foreigners Keep Piling Into Guizhou — Here\\'s Why', zh: '老外扎堆来 贵州你有这么好玩的地方怎么不早说' },
    vloggerName: '泡芙喵-PuFF',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV11ubk6ME1d',
    thumbnail: '/images/vlogs/BV11ubk6ME1d.jpg',
    duration: '14:44',
    views: { en: '555K views', zh: '56万播放' },
    review: {
      en: 'Shot in the summer of 2026: visa-free tour groups at Huangguoshu, foreign hikers on Fanjingshan, and the Guizhou that inbound travelers are discovering right now. A snapshot of the moment this province went mainstream.',
      zh: '2026年夏天实地拍摄：免签团在黄果树、外国徒步者在梵净山——记录入境游客正在发现的贵州，也是这个省份"出圈"时刻的快照。',
    },
    tags: { en: '#Guizhou #Foreigners #Trend', zh: '#贵州 #外国人 #热点' },
    citySlug: 'guizhou',
    topic: 'culture',
    featured: false,
    publishedAt: { en: 'Aug 2026', zh: '2026年8月' },
  },`,
  },
  {
    anchor: 'BV11ubk6ME1d',
    body: `  {
    title: { en: 'A Finnish Family\\'s First Huangguoshu (and Sour Soup Obsession)', zh: '芬兰表妹一家第一次来贵州看黄果树大瀑布震撼人心！沦陷酸汤牛肉火锅！' },
    vloggerName: '雨琪在芬兰',
    platform: 'bilibili',
    externalUrl: 'https://www.bilibili.com/video/BV1XgtJ6LEsT',
    thumbnail: '/images/vlogs/BV1XgtJ6LEsT.jpg',
    duration: '33:16',
    views: { en: '750K views', zh: '75万播放' },
    review: {
      en: 'The same creator behind the famous Finnish-family Chengdu food tour brings her family to Guizhou: first reactions to the waterfall, a cave adventure, and a full surrender to sour soup. The best "first foreign visit" reference for what Guizhou feels like.',
      zh: '拍出芬兰一家成都干饭名场面的博主，这次带家人来贵州：瀑布第一反应、溶洞漂流初体验，以及彻底沦陷的酸汤牛肉火锅。外国人首次访黔的最佳参考片。',
    },
    tags: { en: '#Guizhou #Huangguoshu #Family #SourSoup', zh: '#贵州 #黄果树 #家庭 #酸汤' },
    citySlug: 'guizhou',
    topic: 'culture',
    featured: true,
    publishedAt: { en: 'Sep 2026', zh: '2026年9月' },
  },`,
  },
]

// 找到锚点条目结尾并在其后插入
function insertAfterEntry(src, anchor, body) {
  let idx
  if (anchor === 'START') {
    const marker = "const rawVlogs: Omit<Vlog, 'id'>[] = [\n"
    idx = src.indexOf(marker)
    if (idx < 0) throw new Error('rawVlogs array start not found')
    const at = idx + marker.length
    return src.slice(0, at) + body + '\n' + src.slice(at)
  }
  if (anchor === 'LAST') {
    // rawVlogs 数组的结尾 "\n]"
    const start = src.indexOf("const rawVlogs: Omit<Vlog, 'id'>[] = [")
    const close = src.indexOf('\n]', start)
    if (close < 0) throw new Error('rawVlogs array close not found')
    return src.slice(0, close) + ',\n' + body + src.slice(close)
  }
  idx = src.indexOf(`video/${anchor}`)
  if (idx < 0) throw new Error(`anchor ${anchor} not found`)
  const end = src.indexOf('\n  },', idx)
  if (end < 0) throw new Error(`anchor ${anchor} entry end not found`)
  const at = end + '\n  },'.length
  return src.slice(0, at) + '\n' + body + src.slice(at)
}

// 同一锚点的多条新内容需按倒序逐条插入（后插的紧贴锚点 → 最终保持升序）
for (const { anchor, body } of guizhouVlogs) {
  src = insertAfterEntry(src, anchor, body)
  console.log(`vlog inserted after ${anchor}`)
}

// ---------- 2) 照片（插入 rawPhotos 数组开头） ----------
const guizhouPhotos = `  {
    image: '/images/cities/guizhou/huangguoshu_2.jpg',
    location: { en: 'Huangguoshu Waterfall, Anshun', zh: '安顺 · 黄果树瀑布' },
    photographer: '',
    description: { en: 'Night light show over the great falls, summer season.', zh: '夏季夜场，灯光打在大瀑布上。' },
    tags: { en: '#Guizhou #Waterfall #NightShow', zh: '#贵州 #瀑布 #夜游' },
    category: 'landscape',
    citySlug: 'guizhou',
  },
  {
    image: '/images/cities/guizhou/baling_bridge.jpg',
    location: { en: 'Baling River Bridge, Anshun', zh: '安顺 · 坝陵河大桥' },
    photographer: '',
    description: { en: 'One of Guizhou\\'s giant suspension bridges strung across karst cones.', zh: '贵州巨型悬索桥之一，横跨喀斯特峰丛。' },
    tags: { en: '#Guizhou #Bridge #Karst', zh: '#贵州 #桥梁 #喀斯特' },
    category: 'transport',
    citySlug: 'guizhou',
  },
  {
    image: '/images/cities/guizhou/guiyang.jpg',
    location: { en: 'Guiyang', zh: '贵阳' },
    photographer: '',
    description: { en: 'The capital under its grey-soft mountain light, hills breaking through the skyline.', zh: '山地之光下的省会，青山从天际线中冒出头。' },
    tags: { en: '#Guizhou #Guiyang #City', zh: '#贵州 #贵阳 #城市' },
    category: 'city',
    citySlug: 'guizhou',
  },
  {
    image: '/images/cities/guizhou/wanfenglin.jpg',
    location: { en: 'Wanfenglin, Xingyi', zh: '兴义 · 万峰林' },
    photographer: '',
    description: { en: 'Golden rice fields under the forest of ten thousand peaks, September.', zh: '九月，万峰林下的稻田金黄。' },
    tags: { en: '#Guizhou #Wanfenglin #Karst', zh: '#贵州 #万峰林 #喀斯特' },
    category: 'landscape',
    citySlug: 'guizhou',
  },
`

const photoMarker = "const rawPhotos: Omit<Photo, 'id'>[] = [\n"
if (!src.includes(photoMarker)) throw new Error('rawPhotos start not found')
src = src.replace(photoMarker, photoMarker + guizhouPhotos)
console.log('photos inserted')

// ---------- 3) 外部攻略（插入 rawExternalGuides 数组开头） ----------
const guizhouGuides = `  {
    title: { en: 'Guizhou — Wikivoyage', zh: '贵州 —— Wikivoyage 旅行指南' },
    sourceName: 'Wikivoyage',
    externalUrl: 'https://en.wikivoyage.org/wiki/Guizhou',
    summary: {
      en: 'Community-maintained overview of the province: cities, climate, transport and food — the best single reference map of how Guizhou fits together.',
      zh: '社区维护的全省概览：城市、气候、交通与饮食——理解贵州全貌的最佳单页参考。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '20 min', zh: '20 分钟' },
    tags: { en: '#Guizhou #Overview', zh: '#贵州 #总览' },
  },
  {
    title: { en: 'Official Guizhou Tips for Foreign Visitors', zh: '贵州官方入境游客实用信息' },
    sourceName: 'eguizhou.gov.cn',
    externalUrl: 'https://www.eguizhou.gov.cn/tipsandinfo.html',
    summary: {
      en: 'The province\\'s English-language official portal: practical info for foreign visitors on payments, accommodation registration and getting around.',
      zh: '贵州省英文官方门户：面向外国游客的支付、住宿登记与出行实用信息。',
    },
    category: 'safety',
    language: 'en',
    readTime: { en: '10 min', zh: '10 分钟' },
    tags: { en: '#Guizhou #Official #Practical', zh: '#贵州 #官方 #实用' },
  },
  {
    title: { en: 'Sample Route: 5 Days Guiyang, Fanjingshan & Huangguoshu by HSR', zh: '参考线路：贵阳+梵净山+黄果树5日高铁行程' },
    sourceName: 'China Discovery',
    externalUrl: 'https://www.chinadiscovery.com/guizhou-tours/5days-guiyang-fanjingshan-huangguoshu-waterfall-tour.html',
    summary: {
      en: 'The classic packaged 5-day route most first-timers copy — useful as a day-by-day skeleton even if you travel independently.',
      zh: '多数首刷者会参考的经典5日打包线路——即使自由行也可以拿它当天数骨架。',
    },
    category: 'itinerary',
    language: 'en',
    readTime: { en: '8 min', zh: '8 分钟' },
    tags: { en: '#Guizhou #Itinerary #5Days', zh: '#贵州 #行程 #5日' },
  },
`

const guideMarker = "const rawExternalGuides: Omit<ExternalGuide, 'id'>[] = [\n"
if (!src.includes(guideMarker)) throw new Error('rawExternalGuides start not found')
src = src.replace(guideMarker, guideMarker + guizhouGuides)
console.log('external guides inserted')

fs.writeFileSync(FILE, src, 'utf-8')
console.log('done →', FILE)
