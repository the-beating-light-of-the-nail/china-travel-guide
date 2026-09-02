// 静态内容数据模块（多语言：en / zh 随内容维护，其余语言由 data/translations/ 翻译包提供）
// ---------------------------------------------------------------
// 该文件是网站的"单一数据源"，所有内容均在此处维护。
// 替代原先的 Prisma + SQLite 方案，因为 SQLite 的本地文件数据库
// 无法在 Vercel 等无服务器（serverless）平台上持久化运行。
//
// 通过构建时静态生成（nuxt generate），这些数据会被直接打包进
// 预渲染的 HTML，无需任何运行时数据库连接。
// 中文内容源自 template-chengdu.html / template-xian.html / template-home.html
// ---------------------------------------------------------------

import { mergeLanguagePack, fillLocaleFallbacks } from './localize'
import type { L } from './localize'
import { contentPacks } from './translations'

// 向后兼容：hub-data.ts 等仍从此处导入 L 类型
export type { L } from './localize'

// ===== 类型定义 =====

export interface Attraction {
  id: number
  name: L
  image: string
  location: L
  duration: L
  ticket: L
  highlight: L
  description: L
  sortOrder: number
}

export interface Food {
  id: number
  name: L
  image: string
  highlight: L
  description: L
  sortOrder: number
}

export interface ItineraryItem {
  id: number
  timeSlot: L
  content: L
  sortOrder: number
}

export interface Itinerary {
  id: number
  dayNumber: number
  title: L
  items: ItineraryItem[]
}

export interface Tip {
  id: number
  icon: string
  title: L
  items: L
  sortOrder: number
}

// 城市完整详情（详情页使用）
export interface City {
  id: number
  name: L
  slug: string
  description: L
  heroImage: string
  tagline: L
  tags: L
  region: L
  intro: L
  history: L
  bestSeason: L
  duration: L
  gallery: string[]
  attractions: Attraction[]
  foods: Food[]
  itineraries: Itinerary[]
  tips: Tip[]
}

// 城市摘要（首页列表卡片使用）
export interface CitySummary {
  id: number
  name: L
  slug: string
  description: L
  heroImage: string
  tagline: L
  tags: L
  region: L
}

export interface Guide {
  id: number
  title: L
  slug: string
  excerpt: L
  content: L
  image: string
  label: L
  readTime: L
  views: L
  publishedAt: L
  featured: boolean
}

// ===== 原始数据 =====

// 城市基础信息
const rawCities = [
  {
    slug: 'chengdu',
    name: { en: 'Chengdu', zh: '成都' },
    region: { en: 'Southwest China', zh: '中国西南' },
    tagline: { en: 'Where the pace slows down and life tastes better', zh: '一座来了就不想走的城市' },
    tags: { en: 'Pandas,Spicy Food,Teahouse Culture,Slow Pace', zh: '熊猫故乡,美食天堂,古巷茶馆,慢享生活' },
    heroImage: '/images/cities/chengdu/chengdu_p01_03.png',
    description: {
      en: 'Capital of Sichuan and the cradle of the ancient Shu civilization, Chengdu has been called the \'Land of Abundance\' for over 2,000 years — the only Chinese city whose site and name have stayed unchanged since it was founded. Locals call a good life \'bashi\' (巴适) — comfortable, easy, just right — and you\'ll feel it the moment you sink into a bamboo chair with a cup of jasmine tea. Beyond giant pandas and the numbing fire of Sichuan hot pot, Chengdu is the gateway to the snow peaks of Tibet and the fairy-tale waters of Jiuzhaigou.',
      zh: '四川省省会，古蜀文明发祥地，自古被誉为“天府之国”，是中国唯一一座自建城以来城址与名称从未更改的城市。成都人爱说“巴适”——舒服、合适，这正是这座慢节奏之城的灵魂。茶馆、川菜、火锅、熊猫，以及作为九寨沟、稻城亚丁的最佳中转地，构成了成都最迷人的底色。',
    },
    intro: {
      en: 'Chengdu sits at the center of the Sichuan Basin, nurtured for two millennia by the Dujiangyan irrigation works. It\'s a city where life moves slowly — locals pass afternoons over gaiwan tea and clattering mahjong, then chase hot pot and bar-hopping at Jiuyan Bridge after dark. UNESCO named it a City of Gastronomy, and from the panda breeding base to the old alleys of Kuanzhai, every corner rewards a slower pace. Come for the pandas, stay for the tea.',
      zh: '成都地处四川盆地中心，两千多年来都江堰润泽着这片沃土。这里的生活节奏舒缓——街边茶馆、麻将声声、麻辣火锅与九眼桥的夜色，构成了成都人独有的“慢享”日常。作为联合国教科文组织评定的“美食之都”，成都不仅有大熊猫，更是一种让人不舍得离开的生活方式。',
    },
    history: {
      en: 'More than 2,600 years old — the only Chinese city whose site and name have been unchanged since founding. Named from the Zhou phrase "in three years it became a city," and nicknamed "Hibiscus City" (Rongcheng) after a 10th-century emperor had hibiscus planted along the city walls.',
      zh: '建城2600余年，中国唯一建城以来城址与名称从未更改的城市。取名于周王迁岐“一年成聚，二年成邑，三年成都”之典；五代后蜀皇帝孟昶命百姓在城墙遍植芙蓉，花开四十里为锦绣，故别称“蓉城”。',
    },
    bestSeason: {
      en: 'March–June and September–November (spring and autumn are mildest; annual average 16°C / 61°F)',
      zh: '3-6月、9-11月（春秋两季气候最舒适，年均气温16℃）',
    },
    duration: {
      en: '3–4 days recommended (add 1–2 days for Dujiangyan & Mount Qingcheng)',
      zh: '建议3-4天（都江堰、青城山可再加1-2天）',
    },
  },
  {
    slug: 'xian',
    name: { en: 'Xi\'an', zh: '西安' },
    region: { en: 'Northwest China', zh: '中国西北' },
    tagline: { en: 'Walk 3,000 years of history in one city', zh: '十三朝古都 · 盛世长安' },
    tags: { en: 'Terracotta Warriors,Ancient City Wall,Tang Dynasty,Silk Road', zh: '历史古都,兵马俑,古城墙,盛唐文化' },
    heroImage: '/images/cities/xian/xian_p01_03.png',
    description: {
      en: 'Xi\'an — anciently known as Chang\'an — was the imperial capital of 13 dynasties and the eastern starting point of the Silk Road. Home to the Terracotta Army, a massive intact Ming-era city wall, and the bustling Muslim Quarter, it\'s a city where 3,000 years of history still feels vividly alive.',
      zh: '滚滚红尘帝王都，悠悠岁月百姓城。西安，古称长安，先后有十三朝在此建都，是丝绸之路的起点，也是举世闻名的秦始皇兵马俑的故乡。一座西安城，半部中华史。',
    },
    intro: {
      en: 'Long known as Chang\'an, \'City of Eternal Peace\', Xi\'an sits at the heart of ancient Chinese history. Thirteen dynasties built their capital here, from the Qin who first unified China to the Tang Dynasty whose golden age still defines the country\'s cultural identity. It was the eastern terminus of the Silk Road, the trade route that linked East and West for centuries. Today you can bike the 13.7 km ancient city wall (the largest and best-preserved in China), stand before thousands of life-sized terracotta warriors, and eat your way through the vibrant Muslim Quarter. Few cities make 3,000 years of history feel so present.',
      zh: '西安，古称长安，是中华文明的发祥地之一，先后有周、秦、汉、隋、唐等十三朝在此建都，是古丝绸之路的起点。巍峨的明代城墙、屹立千年的大雁塔、震撼世界的兵马俑，与回民街的烟火美味、德福巷的酒吧灯火交织碰撞，古老与现代在这里相映成辉。',
    },
    history: {
      en: 'Capital of 13 dynasties (Zhou to Tang) for nearly 1,100 years; over 3,100 years of city history',
      zh: '十三朝古都（周至唐），建都史近1100年，建城史逾3100年',
    },
    bestSeason: {
      en: 'March to May, September to November (spring and fall are ideal)',
      zh: '3-5月、9-11月（春秋最佳）',
    },
    duration: { en: '3-5 days recommended', zh: '建议3-5天' },
  },
  {
    slug: 'beijing',
    name: { en: 'Beijing', zh: '北京' },
    region: { en: 'North China', zh: '中国北方' },
    tagline: { en: 'Where emperors once ruled and the Great Wall meets the sky', zh: '首都风范 · 皇城帝都' },
    tags: { en: 'Forbidden City,Great Wall,Hutongs,Peking Duck,Imperial Capital', zh: '故宫,长城,胡同,烤鸭,皇城根' },
    heroImage: '/images/cities/beijing/beijing_p01_04.png',
    description: {
      en: 'China\'s capital — a city of imperial palaces, the Great Wall, centuries-old hutongs, and a food scene that goes far beyond Peking duck. Three thousand years of history and six dynasties have left their mark on every corner.',
      zh: '北京，中国的首都。三千年的建城史，六朝古都，荟萃了自元明清以来的中华文化。故宫的红墙、长城的雄关、胡同的烟火气，共同构成了一座包容万象、海纳百川的城市。',
    },
    intro: {
      en: 'Beijing is China\'s capital and its political, cultural, and historical heart, with over 3,000 years of city history and 850-plus years as an imperial capital. Layer Jin, Yuan, Ming, and Qing grandeur with hutong alleyways, the Great Wall, and a food scene once voted mainland China\'s best. However long you stay, the city always has one more secret to reveal.',
      zh: '北京是中国的首都，三千年的建城史与八百五十余年的建都史在此交汇，荟萃了自元明清以来的中华文化。这里有故宫、长城、天坛的皇家气象，也有胡同、798、簋街的市井与先锋。每个人心中，都有一个属于自己的北京。',
    },
    history: {
      en: 'Over 3,000 years of history, capital for over 850 years, capital of six dynasties',
      zh: '3000余年建城史，859余年建都史，六朝古都',
    },
    bestSeason: {
      en: 'Autumn (Sep-Nov) — crisp air and red leaves at Fragrant Hills; winter temple fairs run Dec-Feb',
      zh: '首选秋季（9-11月），秋高气爽、香山红叶层林尽染；12月至次年2月可逛庙会',
    },
    duration: { en: '5 days recommended', zh: '建议5天' },
  },
] as const

// 景点数据 - 每座城市 6 个
const rawAttractions: Record<string, Omit<Attraction, 'id' | 'sortOrder'>[]> = {
  chengdu: [
    {
      name: { en: 'Chengdu Research Base of Giant Panda Breeding', zh: '成都大熊猫繁育研究基地' },
      image: '/images/cities/chengdu/chengdu_p03_11.jpeg',
      location: { en: 'Chenghua District (No. 1375 Panda Avenue)', zh: '成华区外北熊猫大道1375号' },
      duration: { en: '3–4 hours', zh: '游玩3-4小时' },
      ticket: { en: '¥58 (about $8)', zh: '¥58' },
      highlight: { en: 'Chengdu\'s #1 attraction', zh: '成都必打卡TOP1' },
      description: {
        en: 'The world\'s best place to see giant pandas up close. The base recreates the bears\' wild habitat with bamboo groves and shady gardens, home to more than 20 giant pandas plus red pandas, black-necked cranes, and swans. Watch them tumble, munch bamboo, and nap in the trees — the Moon Nursery holds the tiniest cubs. Arrive before 9 AM; pandas are most active in the morning and doze through the afternoon heat.',
        zh: '川西竹林深处是国宝大熊猫的故乡，基地以造园手法模拟大熊猫野外生态环境，常年圈养着20余只大熊猫以及小熊猫、黑颈鹤、白鹤等珍稀动物。翠竹葱茏、绿树成荫，大熊猫或卧或坐，或饮或嬉，憨态可掬。月亮产房可看到超萌熊猫幼崽，建议上午尽早前往，下午熊猫多在睡觉。',
      },
    },
    {
      name: { en: 'Kuanzhai Alleys', zh: '宽窄巷子' },
      image: '/images/cities/chengdu/chengdu_p05_19.jpeg',
      location: { en: 'Qingyang District (between Tongren Road and Changshun Street)', zh: '青羊区同仁路以东长顺街以西' },
      duration: { en: '3–4 hours', zh: '游玩3-4小时' },
      ticket: { en: 'Free', zh: '免费开放' },
      highlight: { en: 'Old Chengdu in a nutshell', zh: '老成都的遗存' },
      description: {
        en: 'Three parallel Qing-era alleys — Wide (Kuan), Narrow (Zhai), and Well (Jing) — form the last surviving slice of Chengdu\'s "lesser walled city." The relaxed life of Kuan Alley, the slow life of Zhai, and the new life of Jing blend old teahouses, Sichuan snacks, folk art, and boutique shops. Go early for clean photos, or on a sunny afternoon to drink gaiwan tea, watch locals play cards, and have your ears cleaned — the most Chengdu thing you can do.',
        zh: '宽巷子、窄巷子、井巷子三条平行的清代古街道及其间的四合院落群，是成都“千年少城”城市格局的最后遗存，与大慈寺、文殊院并称成都三大历史文化名城保护街区。宽巷子的“闲生活”、窄巷子的“慢生活”、井巷子的“新生活”融汇老成都茶馆、川蜀小吃与文创小店。清晨拍照最佳，下午出太阳时来喝茶、掏耳朵最有味道。',
      },
    },
    {
      name: { en: 'Jinli Ancient Street', zh: '锦里古街' },
      image: '/images/cities/chengdu/chengdu_p05_17.jpeg',
      location: { en: 'Wuhou District (beside Wuhou Shrine)', zh: '武侯祠大街231号附1号' },
      duration: { en: '2 hours', zh: '游玩2小时' },
      ticket: { en: 'Free', zh: '免费' },
      highlight: { en: 'The \'First Street of Western Shu\'', zh: '西蜀第一街' },
      description: {
        en: 'Known as the "First Street of Western Shu" and called Chengdu\'s version of a Qingming Festival riverside scroll, this 400-meter lane is packed with folk architecture, snack stalls, bars, and craft shops as part of Wuhou Shrine Museum. Come at dusk when the red lanterns light up and the street turns magical — the night view is the real event. Grab a bowl of spicy tofu pudding or a candied hawthorn skewer while you browse.',
        zh: '号称“西蜀第一街”，被誉为“成都版清明上河图”，不足400米的老街上传统小吃、饮食、客栈遍布，如今是武侯祠博物馆的一部分。以明末清初川西民居为外衣，三国文化与成都民俗为内涵，酒吧娱乐区、餐饮小吃区、府第客栈区错落有致。黄昏开始亮灯，游人熙攘，夜景最美，是最适合游玩的时段。',
      },
    },
    {
      name: { en: 'Wuhou Shrine', zh: '武侯祠' },
      image: '/images/cities/chengdu/chengdu_p17_44.jpeg',
      location: { en: 'Wuhou District (No. 231 Wuhouci Street)', zh: '武侯区武侯祠大街231号' },
      duration: { en: '2 hours', zh: '游玩2小时' },
      ticket: { en: '¥60 (about $8), students half price', zh: '¥60（学生半价）' },
      highlight: { en: 'Sacred site of the Three Kingdoms', zh: '三国圣地 · 君臣合祀' },
      description: {
        en: 'First built in 223 AD alongside the tomb of Liu Bei, this is China\'s only temple honoring both a ruler and his minister — Emperor Liu Bei and his legendary strategist Zhuge Liang of the Shu Kingdom, plus the heroes of the Three Kingdoms era. The complex centers on Huiling (Liu Bei\'s tomb), Han Zhaolie Temple, and Wuhou Shrine itself, set among ancient cypresses and grand halls. Don\'t miss the famous red wall lined with bamboo (hongqiang zhuying), one of the most photographed spots in Chengdu.',
        zh: '始建于公元223年，是中国唯一一座君臣合祀的祠庙，也是全世界影响最大的三国遗迹博物馆，最负盛名的诸葛亮、刘备及蜀汉英雄纪念地。主要由惠陵、汉昭烈庙和武侯祠三大部分组成，古柏森森，殿宇宏伟。“红墙竹影”是成都最经典的古风拍照点，不要错过。',
      },
    },
    {
      name: { en: 'Du Fu Thatched Cottage', zh: '杜甫草堂' },
      image: '/images/cities/chengdu/chengdu_p03_13.jpeg',
      location: { en: 'Qingyang District (No. 37 Qinghua Road)', zh: '青羊区青华路37号' },
      duration: { en: '2 hours', zh: '游玩2小时' },
      ticket: { en: '¥60 (about $8), students half price', zh: '¥60（学生半价）' },
      highlight: { en: 'Home of China\'s "Poet Sage"', zh: '诗圣故居 · 园林清幽' },
      description: {
        en: 'On the bank of Huanhua Creek, this is the former home of Du Fu, the Tang Dynasty poet who fled the An Lushan Rebellion and arrived here in the winter of 759 AD. He lived in this thatched cottage for nearly four years and wrote more than 240 surviving poems. The original hut is long gone — the poet Wei Zhuang rediscovered its site during the Five Dynasties — but the walled garden of bamboo groves, lotus ponds, and calligraphy halls is one of the most peaceful spots in Chengdu.',
        zh: '坐落于浣花溪畔，是中国唐代伟大现实主义诗人杜甫流寓成都时的故居。公元759年冬天，杜甫为避“安史之乱”携家入蜀，在此营建茅屋而居，称“成都草堂”，先后居住近四年，留下240余首传世诗篇。杜甫离开成都后草堂不存，五代前蜀时诗人韦庄寻得遗址重结茅屋，使之得以保存。如今园林清幽，竹木掩映，是成都著名文化圣地。',
      },
    },
    {
      name: { en: 'Dujiangyan Irrigation System', zh: '都江堰水利工程' },
      image: '/images/cities/chengdu/chengdu_p13_33.jpeg',
      location: { en: 'Dujiangyan City (about 76 km / 47 mi from downtown)', zh: '都江堰市灌口镇（距成都市区约76公里）' },
      duration: { en: '3–4 hours', zh: '游玩3-4小时' },
      ticket: { en: '¥90 (about $12), students ¥45', zh: '¥90（学生半价）' },
      highlight: { en: '2,200-year-old UNESCO site, still in use', zh: '世界文化遗产 · 两千年仍在使用' },
      description: {
        en: 'The world\'s oldest dam-free irrigation system still operating — built around 256 BC by Li Bing and his son to tame the flood-prone Min River and turn Sichuan into the fertile "Land of Abundance." Walk the classic route: Lidui Park → Yango Path → Fulong Temple → Flying Sand Weir → Fish Mouth divider → Anlan Suspension Bridge → Erwang Temple. Pair it with Mount Qingcheng next door for a full day trip. A high-speed train from Chengdu gets you here in about 30 minutes.',
        zh: '中国建设于古代并使用至今的大型水利工程，是全世界迄今为止年代最久、唯一留存、以无坝引水为特征的宏大水利工程，被誉为“世界水利文化的鼻祖”。公元前256年由李冰父子率众修建，消除岷江水患，造就了“天府之国”。推荐路线：离堆古园入口→堰功道→伏龙观→飞沙堰→鱼嘴→安澜索桥→二王庙→步云廊大扶梯→玉垒阁。从成都乘高铁约30分钟可达，可与青城山一同安排。',
      },
    },
    {
      name: { en: 'Mount Qingcheng', zh: '青城山' },
      image: '/images/cities/chengdu/chengdu_p14_36.jpeg',
      location: { en: 'Dujiangyan City (about 83 km / 52 mi from downtown)', zh: '都江堰市西南青城山镇（距成都市区约83公里）' },
      duration: { en: '1 day', zh: '建议1天' },
      ticket: { en: 'Front mountain ¥90 / Back mountain ¥20', zh: '前山90元，后山20元' },
      highlight: { en: '\'The most serene mountain under heaven\'', zh: '青城天下幽 · 道教名山' },
      description: {
        en: 'One of the birthplaces of Chinese Taoism, listed with Dujiangyan as a UNESCO World Heritage site. The front mountain is famous for its Taoist temples — Shangqing Palace, Tianshi Cave, Jianfu Palace — set in deep, quiet forest that earned the saying "Qingcheng, the most serene under heaven." The back mountain is all waterfalls, ravines, and scenery. Hike or take the cable car up to Laojun Pavilion on the first peak for the classic route.',
        zh: '中国道教发源地之一，位于都江堰市西南，古称“丈人山”，与剑门之险、峨嵋之秀、夔门之雄齐名，有“青城天下幽”之美誉。2000年与都江堰共同作为一项世界文化遗产被列入世界遗产名录。前山重人文，以建福宫、天师洞、上清宫、老君阁（青城第一峰）等道观闻名；后山重景观，五龙沟、飞泉坊山水秀丽。可步行或乘索道游览。',
      },
    },
    {
      name: { en: 'Chunxi Road', zh: '春熙路' },
      image: '/images/cities/chengdu/chengdu_p03_14.jpeg',
      location: { en: 'Jinjiang District', zh: '锦江区春熙路' },
      duration: { en: '3 hours', zh: '游玩3小时' },
      ticket: { en: 'Free', zh: '免费' },
      highlight: { en: 'Chengdu\'s busiest shopping street', zh: '百年金街 · 美女如云' },
      description: {
        en: 'Chengdu\'s most famous shopping street, ranked the third-best commercial street in China — a century-old avenue of flagship stores, time-honored snack shops, and endless neon. Locals say it\'s where you go to "find gold, chase fashion, and admire the beauties." Don\'t miss the giant panda sculpture climbing the side of the IFS tower, one of Chengdu\'s signature photo spots, and the cluster of old Sichuan snack shops down the side alleys.',
        zh: '成都最繁华、最具代表性的商业步行街，号称“百年金街”，在“中国商业街排行榜”上名列第三。汇集众多品牌专卖店、中华老字号商场，也是“打望”成都美女的时尚圣地——“城市掘金哪里去，春熙路；品味时尚哪里去，春熙路；打望美女哪里去，春熙路。”别忘了抬头看IFS国际金融中心那只爬墙的大熊猫，是成都最火的城市地标之一。',
      },
    },
  ],
  xian: [
    {
      name: { en: 'Terracotta Army Museum', zh: '秦始皇兵马俑博物馆' },
      image: '/images/cities/xian/xian_p06_20.jpeg',
      location: { en: 'Lintong District (about 1-1.5 hrs from downtown)', zh: '临潼区秦陵路（距市区约1-1.5小时车程）' },
      duration: { en: '3-4 hours', zh: '3-4小时' },
      ticket: {
        en: '¥150 peak season (Mar 16-Nov 4) / ¥120 off-season; includes Qin Shi Huang Mausoleum',
        zh: '旺季¥150（3月16日-11月4日），淡季¥120，含秦始皇陵',
      },
      highlight: { en: 'The \'Eighth Wonder of the World\'', zh: '世界第八大奇迹' },
      description: {
        en: 'The \'Eighth Wonder of the World\' — three huge burial pits covering some 20,000 sq m hold thousands of life-sized clay soldiers, horses, and chariots buried with China\'s first emperor, Qin Shi Huang, over 2,200 years ago. The mausoleum took 700,000 workers 38 years to build. Pit 1 is the main hall, its tight formation of infantry and war chariots still radiating the military might of a unified China. Each warrior has a unique face. Hire a guide on site — the stories behind the pits transform the experience.',
        zh: '世界第八大奇迹，世界人类文化遗产。三个俑坑共约2万多平方米，是世上无与伦比的地下军阵，象征着秦始皇生前守卫陵园的宿卫军，按兵法布阵。一号坑为主陈列室，前锋、步兵、战车布局严密，再现当年金戈铁马、横扫六合的声威。每一尊兵马俑面容各异、栩栩如生。皇陵由70万工匠历时38年建成，建议请一位讲解员，背后的故事会让体验生动十倍。',
      },
    },
    {
      name: { en: 'Xi\'an Ancient City Wall', zh: '西安古城墙' },
      image: '/images/cities/xian/xian_p03_11.jpeg',
      location: { en: 'City center (19 access points; South Gate is best)', zh: '市中心，共19个登城点，以南门（永宁门）为最佳' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: '¥54 (¥27 students)', zh: '¥54，学生票¥27' },
      highlight: { en: 'Largest and best-preserved ancient city wall in China', zh: '中国现存最完整的古代城垣建筑' },
      description: {
        en: 'The most complete ancient city wall in China, built between 1374 and 1378 during the Ming Dynasty and now over 600 years old. The full loop runs about 13.7 km, wide enough on top for a six-lane road. Rent a bicycle at South Gate (¥40/100 min for a single bike, ¥80 for a tandem) and ride the entire circuit — about 80 minutes if you keep moving. South Gate (Yongning Gate) is the most dramatic entrance, with a daily gate-opening ceremony at 9:30 AM, soldier drills at 10:30 AM, and acrobatics shows at 11:00 AM. Sunset is the most beautiful time to ride.',
        zh: '中国现存最完整的一座古代城垣建筑，始建于明洪武七年至十一年（1374-1378），距今已有600多年历史。城墙环城约13.7公里，有19个登城点，最佳选择是从南门（永宁门）登城。南门可租赁自行车：单人车40元/100分钟、双人车80元/100分钟，骑行一周约需80分钟。南门外每天上午9:30有开城门仪式，瓮城内10:30有士兵操练表演，11:00有百戏表演。傍晚登城，夕阳下的老城景色最是迷人。',
      },
    },
    {
      name: { en: 'Big Wild Goose Pagoda & Da Ci\'en Temple', zh: '大雁塔·大慈恩寺' },
      image: '/images/cities/xian/xian_p06_22.jpeg',
      location: { en: 'Yanta District (south of downtown)', zh: '雁塔区雁引路西端' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: 'Da Ci\'en Temple ¥50; pagoda climb another ¥50', zh: '大慈恩寺¥50，登塔另收¥50' },
      highlight: { en: 'Tang Dynasty landmark built by monk Xuanzang', zh: '唐代地标 · 玄奘译经藏经之地' },
      description: {
        en: 'A Tang Dynasty masterpiece of Buddhist architecture and one of Xi\'an\'s signature sights. The seven-story pagoda was built in the 7th century by the monk Xuanzang — the real-life monk who journeyed to India and inspired the classic novel Journey to the West — to store the scriptures he brought back. Climb to the top for a sweeping view of the city. The surrounding plazas are free to wander; the North Square features Asia\'s largest musical fountain, with nightly illuminated shows that draw big crowds.',
        zh: '又名大慈恩寺塔，是中国唐朝佛教建筑艺术杰作，西安市的标志性建筑之一。大雁塔已耸立千年，原是玄奘西行归来后藏经、讲经、译经之地，登塔可俯瞰长安风貌。整个大雁塔区域除核心的大慈恩寺和其中的大雁塔外均免门票，北广场上的灯光音乐喷泉堪称西安新景，夜晚灯光璀璨，是西安必看夜景之一。',
      },
    },
    {
      name: { en: 'Huaqing Palace (Huaqing Pool)', zh: '华清宫（华清池）' },
      image: '/images/cities/xian/xian_p07_24.jpeg',
      location: {
        en: 'Lintong District, at the foot of Mount Li (near the Terracotta Army)',
        zh: '临潼区骊山脚下北麓',
      },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: '¥110 peak season (Mar-Nov) / ¥80 off-season', zh: '旺季¥110（3月-11月），淡季¥80' },
      highlight: { en: 'Imperial hot spring palace of Yang Guifei', zh: '皇家温泉行宫 · 杨贵妃赐浴之地' },
      description: {
        en: 'Also called Huaqing Palace, this imperial hot-spring resort at the foot of Mount Li was beloved by emperors from the Zhou to the Tang. It is most famous as the favorite bathing retreat of Yang Guifei, consort of Emperor Xuanzang, and the tragic love story between them is the stuff of legend. The Tang Dynasty bathhouse ruins are still visible. From April to October, don\'t miss the open-air spectacle \'The Song of Everlasting Sorrow\' (Changhen\'ge), a lavish light-and-dance show staged right on the mountain (¥268-988).',
        zh: '华清池，亦名华清宫。自然造化的山地温泉，让周、秦、汉、隋、唐历代帝王皆在此营建离宫别苑，享受天然旖旎风情，唐朝时这里便是杨贵妃最喜爱的沐浴修养之处，唐明皇与杨贵妃的爱情故事就发生于此。当年唐代浴池遗址至今仍清晰可辨。每年4月起，晚上约8点会上演大型实景歌舞《长恨歌》，再现杨贵妃与唐明皇的浪漫爱情（票价268-988元不等），强烈推荐。',
      },
    },
    {
      name: { en: 'Muslim Quarter (Huimin Jie)', zh: '回民街' },
      image: '/images/cities/xian/xian_p03_14.jpeg',
      location: { en: 'Lianhu District, behind the Drum Tower', zh: '莲湖区西大街1号钟鼓楼广场（鼓楼北侧）' },
      duration: { en: '2-3 hours (best in the evening)', zh: '2-3小时（傍晚最佳）' },
      ticket: { en: 'Free to wander', zh: '免费' },
      highlight: { en: 'Xi\'an\'s #1 food street and Hui Muslim hub', zh: '西安美食第一街 · 千年回族坊上' },
      description: {
        en: 'Xi\'an\'s most famous food street — about 500 m long, paved in flagstone and lined with green trees and faux Ming-Qing shopfronts. The Hui Muslim community has lived here for over 1,000 years, and the whole quarter is packed with halal eateries. Beiyuanmen is the main street, but the best eats are tucked in the side alleys: Xiyangshi, Dapiyuan, Xiaopiyuan, Guangming Alley, and Bei Guangji Street. Try roujiamo (the original Chinese hamburger), mutton paomo, persimmon cakes, and grilled skewers as you graze. Please respect Hui customs — most restaurants ban alcohol and do not serve pork.',
        zh: '西安最著名的小吃街，街长约500米，南北走向，青石板铺路，两旁绿树成荫，多为仿明清建筑的商铺食肆，具有浓郁的清真特色。回民街通常所指的是北院门一条街，其实在其西侧的西羊市、大皮院、小皮院、光明巷、北广济街、大学习巷、小学习巷一带的各条小街上都有好吃的店铺，吃货们一定要深入探索。肉夹馍、羊肉泡馍、柿子饼、烤串应有尽有。请尊重回族风俗，清真店基本不允许饮酒，不经营血类与猪肉食品。',
      },
    },
    {
      name: { en: 'Shaanxi History Museum', zh: '陕西历史博物馆' },
      image: '/images/cities/xian/xian_p03_12.jpeg',
      location: { en: 'Yanta District, 91 Xiaozhai East Road', zh: '雁塔区小寨东路91号' },
      duration: { en: '3-4 hours (half a day ideal)', zh: '3-4小时（建议半天）' },
      ticket: {
        en: 'Free but ticketed (4,000/day); Treasure Gallery ¥20 lets you skip the queue',
        zh: '免费不免票（每日限发4000张），珍宝馆¥20可免排队',
      },
      highlight: { en: '\'Pearl of the Ancient Capital, Treasure House of Huaxia\'', zh: '古都明珠 · 华夏宝库' },
      description: {
        en: '\'Give me one day, and I\'ll give you 10,000 years.\' Hailed as the \'pearl of the ancient capital, treasure house of Huaxia\', this museum holds over 370,000 artifacts spanning more than a million years — from Stone Age tools to Tang Dynasty gold. Its greatest strengths are the Shang and Zhou bronzes, the vivid pottery figures of every dynasty, the unrivaled Han and Tang gold and silver, and the world-class Tang tomb murals. Entry is free but only 4,000 tickets are issued daily (2,500 before 2 PM, 1,500 after). The smart move is to buy the ¥20 Treasure Gallery ticket at the bag-check and skip the queue. Hire a guide or rent an audio guide — the context is essential.',
        zh: '被誉为\'古都明珠，华夏宝库\'，\'给我一天，还你万年\'。馆藏文物多达37万余件，时间跨度长达一百多万年，收藏有周、秦、汉、唐四个朝代的重要文物。其中商周青铜器精美绝伦，历代陶俑千姿百态，汉唐金银器独步全国，唐墓壁画举世无双，是展示中国古代文明和陕西历史文化的艺术殿堂。免费不免票，每天限量限时发放免费参观券4000张（每日14:00前限2500张，14:00后限1500张），发完为止。最聪明的做法是在大门右边存包处买20元的珍宝馆门票进馆，可省去大排长龙。强烈建议请讲解员或租用语音导览。',
      },
    },
    {
      name: { en: 'Bell Tower & Drum Tower', zh: '钟楼、鼓楼' },
      image: '/images/cities/xian/xian_p13_46.jpeg',
      location: { en: 'City center, at the junction of the four main avenues', zh: '市中心，东西南北四条大街交汇处' },
      duration: { en: '1-1.5 hours', zh: '1-1.5小时' },
      ticket: { en: '¥35 each, or ¥50 combo ticket', zh: '钟楼/鼓楼各¥35，联票¥50' },
      highlight: {
        en: 'The twin symbols of ancient Xi\'an — \'morning bell, evening drum\'',
        zh: '古城地标 · 晨钟暮鼓',
      },
      description: {
        en: 'The \'sister towers\' of Xi\'an, both over 620 years old. The Bell Tower, built in the 17th year of the Hongwu reign (1384), is the largest and best-preserved of its kind left from ancient China, sitting at the very intersection of the city\'s four main avenues. The Drum Tower, about 300 m to its west at the south end of the Muslim Quarter, is the largest ancient drum tower in China. Both host regular performances — bell chimes and court music at the Bell Tower (six shows daily) and drumming at the Drum Tower. Climb the Bell Tower on a clear day to see four city gates in four directions; at night, the towers glow against the traffic — a view that feels suspended between centuries.',
        zh: '钟楼、鼓楼被称为\'姊妹楼\'、\'文武楼\'。钟楼始建于明洪武十七年（1384年），是中国古代遗留下来形制最大、保存最完整的一座，位于城内东西南北四条干道的交汇处，天气晴好时登楼可从四个方向分别望到四座城门。鼓楼位于钟楼西侧约300米处、西大街上、回民街南口，是中国古代存留下来的最大鼓楼，迄今已有620多年历史。钟楼每天有编钟表演（每日六场：9:00、10:30、11:30、15:00、16:00、17:00），鼓楼每天有鼓乐表演。在晨曦暮光之中遥望二者，恍若隔世。',
      },
    },
    {
      name: { en: 'Forest of Steles Museum', zh: '碑林博物馆' },
      image: 'https://picsum.photos/seed/xian-a7/800/600',
      location: {
        en: 'Beilin District, 15 Sanxue Street near Wenchang Gate (next to Shuyuanmen)',
        zh: '碑林区文昌门内三学街15号（近书院门）',
      },
      duration: { en: '1-2 hours', zh: '1-2小时' },
      ticket: { en: '¥75 (¥37 students)', zh: '¥75，学生票¥37' },
      highlight: { en: 'China\'s greatest treasury of ancient calligraphy', zh: '中国书法艺术宝库 · 名碑荟萃之地' },
      description: {
        en: 'Founded in 1087, the Forest of Steles is the oldest and largest collection of ancient stone tablets in China — a library of Chinese calligraphy carved in stone. It holds more than 2,300 steles and 230,000+ rubbings, including masterworks by Yan Zhenqing, Liu Gongquan, Ouyang Xun, Chu Suiliang, and the wild-cursive monk Huaisu, as well as the Nestorian Stele, a key record of early Christianity in China. Even non-readers can feel the artistry of the brushwork. Hire a guide or join a group (¥100 for 1-6 people) — the stones come alive with stories. Pair the visit with a stroll through Shuyuanmen, the calligraphy-and-antiques street just outside.',
        zh: '西安碑林创建于公元1087年，是收藏中国古代碑石时间最早、数目最大的一座艺术宝库，收藏了汉、魏、唐、宋、元、明、清诸朝代碑碣共2300余件，是中国书法名碑的荟萃之地。西安碑石拓片包括颜真卿的《唐多宝塔感应碑》、柳公权的《唐玄秘塔碑》，还有欧阳询、褚遂良、怀素等大书法家的作品拓本，以及记录早期基督教入华的《大秦景教流行中国碑》。爱好书法和历史的游客不可错过。建议请讲解员（1-6人100元，可拼团），否则很难看出门道。逛完可顺便转转院外的书院门文化街。',
      },
    },
  ],
  beijing: [
    {
      name: { en: 'The Forbidden City', zh: '故宫博物院' },
      image: '/images/cities/beijing/beijing_p03_15.jpeg',
      location: { en: 'Dongcheng District, No.4 Jingshan Front Street', zh: '东城区景山前街4号' },
      duration: { en: '3-4 hours (central axis)', zh: '走中轴线约3小时' },
      ticket: { en: 'Peak ¥60 / off-peak ¥40 (students ¥20)', zh: '旺季60元，淡季40元，学生票20元' },
      highlight: { en: 'World\'s largest imperial palace', zh: '世界最大皇家宫殿' },
      description: {
        en: 'The legendary Forbidden City — palace of 24 Ming and Qing emperors and the world\'s largest surviving wooden palace complex. Four gates enclose a sea of crimson-walled, yellow-tiled halls where centuries of court intrigue played out. Walk the central axis (about 3 hours), entering through the Meridian Gate (south) and exiting via the Gate of Divine Might (north). Open 8:30-16:10 peak season, 8:30-15:40 off-peak. Book e-tickets in advance and bring snacks — food inside is limited.',
        zh: '传说中的紫禁城，明清两代24位皇帝的皇宫，世界上现存规模最大的木质宫殿建筑群。故宫有四门——正门午门、东华门、西华门、北门神武门。红墙之内，多少明争暗斗、宫闱秘事轮番上演。建议走中轴线（约3小时），南门进北门出。旺季8:30-16:10，淡季8:30-15:40，可提前购买电子票。故宫内餐饮有限，建议自带干粮。',
      },
    },
    {
      name: { en: 'Great Wall at Badaling', zh: '八达岭长城' },
      image: '/images/cities/beijing/beijing_p03_14.jpeg',
      location: { en: 'Yanqing District (1.5 hrs north)', zh: '延庆区' },
      duration: { en: 'Full-day trip', zh: '建议一日游' },
      ticket: { en: '¥45', zh: '45元' },
      highlight: { en: 'Best-preserved section of the Ming Wall', zh: '明长城中保存最完整的一段' },
      description: {
        en: 'The best-preserved section of the Ming Great Wall — and the one Chairman Mao meant when he said \'you are no hero until you\'ve climbed the Great Wall.\' Its early fame means big crowds (\'everywhere you look: people, people, people\'), so arrive early. Take bus 877 from Deshengmen (¥12 air-con, ¥7 regular; 6:00-17:00, every 5 minutes). For a quieter, steeper alternative, head to Mutianyu in Huairou — the PDF\'s pick for the multi-day deep tour.',
        zh: '明长城中保存得最完整的一段，毛主席「不到长城非好汉」的名句就出自八达岭。因成名太早、维修得太好，放眼望去看到的是人人人人人人人人，建议早出发。德胜门乘877路直达（空调车12元，普通车7元，6:00-17:00，5分钟一趟）。想避开人潮，可选择怀柔的慕田峪长城——挺拔险要，是万里长城的精华之处。',
      },
    },
    {
      name: { en: 'Temple of Heaven', zh: '天坛' },
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      location: { en: 'Chongwen District, No.7 Tiantan Inner East', zh: '崇文区天坛内东里7号' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: 'Peak ¥15 (combo ¥35) / off-peak ¥10 (combo ¥30)', zh: '旺季15元（联票35元），淡季10元（联票30元）' },
      highlight: { en: 'Ming-Qing imperial altar of heaven', zh: '明清皇家祭天圣地' },
      description: {
        en: 'The altar of heaven where Ming and Qing emperors came on the winter solstice to pray to the heavenly god — four times the size of the Forbidden City. Its \'回\'-shaped layout symbolizes \'round heaven, square earth.\' Don\'t miss the Echo Wall: two people standing against the eastern and western halls can whisper and be heard 100 meters away, the sound rippling along the wall. Gates open 6:00-22:00, inner sights from 8:00. Come at dawn to watch locals do tai chi.',
        zh: '明清两代帝王冬至日祭皇天上帝、正月上辛日祈谷的祭天神庙，比故宫还要大4倍。建筑布局呈「回」字形，由两道坛墙分成内坛、外坛两大部分，最南的围墙呈方型象征地，最北的围墙呈半圆型象征天，寓意「天圆地方」。不可错过回音壁——两人分立东西配殿后贴墙而立，一个人靠墙向北说话，声波就会沿着墙壁连续折射前进，传到一二百米的另一端，声音悠长，堪称奇趣。大门6:00-22:00，内部景点8:00开放，清晨可见本地人晨练打太极。',
      },
    },
    {
      name: { en: 'Summer Palace', zh: '颐和园' },
      image: '/images/cities/beijing/beijing_p05_18.jpeg',
      location: { en: 'Haidian District, No.19 Xinjian Gongmen Road', zh: '海淀区新建宫门路19号' },
      duration: { en: '3-4 hours', zh: '3-4小时' },
      ticket: { en: 'Peak ¥30 (combo ¥60) / off-peak ¥20 (combo ¥50)', zh: '旺季30元（联票60元），淡季20元（联票50元）' },
      highlight: { en: 'China\'s largest surviving royal garden', zh: '中国现存最大皇家园林' },
      description: {
        en: 'China\'s largest and best-preserved imperial garden, centered on the 41-meter Tower of Buddhist Incense atop Longevity Hill. The 728-meter Long Corridor — a painted gallery linking pavilions, halls, and towers — stitches the buildings, green hills, and blue Kunming Lake into a composition rare in the history of world garden art. Open 6:30-18:00 peak season, 7:00-17:00 off-peak. Metro Line 4 to Beigongmen; pair it with the Old Summer Palace ruins next door.',
        zh: '我国现存规模最大、保存最完整的皇家园林。全园以万寿山上高达41米的佛香阁为中心，根据不同地点和地形配置了殿、堂、楼、阁、廊、亭等精致建筑。山脚下一条长达728米的长廊犹如一道彩虹，把多种多样的建筑物以及青山、碧波连缀在一起，构思巧妙，在世界园林艺术史上堪称罕见。旺季6:30-18:00，淡季7:00-17:00。地铁4号线北宫门站，可与东侧的圆明园顺路游览。',
      },
    },
    {
      name: { en: 'Tiananmen Square', zh: '天安门广场' },
      image: 'https://images.unsplash.com/photo-1538382336400-77c8df42c4ed?w=800',
      location: { en: 'Dongcheng District (city center)', zh: '东城区' },
      duration: { en: '1-2 hours; flag-raising at dawn', zh: '1-2小时；清晨观升旗' },
      ticket: { en: 'Free', zh: '免费' },
      highlight: { en: 'The world\'s largest urban square', zh: '世界上最大的城市中心广场' },
      description: {
        en: 'The world\'s largest city-center square, flanked by the Monument to the People\'s Heroes, the Great Hall of the People, and Chairman Mao Memorial Hall. The daily flag-raising at dawn is unforgettable — 36 honor guards march out of Tiananmen\'s central arch to \'Ode to the Motherland\' and raise the flag under the eyes of the crowd. Flag-raising time shifts with the sunrise every day, so check the schedule the night before and arrive early.',
        zh: '世界上最大的城市中心广场，四周环绕着人民英雄纪念碑、人民大会堂、毛主席纪念堂等标志性建筑。每天清晨的升旗仪式庄严而神圣——36名国旗护卫队战士从天安门中心拱形城门整齐走出，在豪迈响亮的《歌唱祖国》乐曲中穿过金水桥和长安街，在万众瞩目下升起国旗。升旗时间根据当时日出的时间每天变动，建议提前查好升旗时间，早点动身。',
      },
    },
    {
      name: { en: 'Nanluoguxiang Hutongs', zh: '南锣鼓巷' },
      image: '/images/cities/beijing/beijing_p03_12.jpeg',
      location: { en: 'Dongcheng District', zh: '东城区' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: 'Free to wander', zh: '免费' },
      highlight: { en: 'The heartbeat of old Beijing', zh: '老北京的脉搏' },
      description: {
        en: 'Beijing\'s most famous hutong street, flanked by eight symmetric alleyways hiding surprises like the Central Academy of Drama, the childhood home of the last Empress Wan Rong, and writer Mao Dun\'s former residence. The lanes are packed with boutique shops, creative cafés, and bars that are quieter and more domestic than Sanlitun or Houhai — \'in the city but away from its noise.\' Duck into the side alleys for a glimpse of real hutong life.',
        zh: '北京现今最出名的胡同景点之一。南锣鼓巷两侧有八条对称的胡同，游走其间，你会惊喜地发现中央戏剧学院、末代皇后郭布罗·婉容的娘家故居、茅盾故居等意想不到的建筑。巷中开满了各色小店，其中不乏特色咖啡馆、创意店铺。这里的酒吧大多比较安静，和谐、自然，身居闹市却远离喧嚣，更贴近生活。钻进侧面的胡同，更能看到地道的老北京生活。',
      },
    },
    {
      name: { en: 'Lama Temple (Yonghe Gong)', zh: '雍和宫' },
      image: 'https://picsum.photos/seed/beijing-a6/800/600',
      location: { en: 'Dongcheng District, Yonghe Gong Street, Beixinqiao', zh: '东城区北新桥雍和宫大街' },
      duration: { en: '1.5-2 hours', zh: '1.5-2小时' },
      ticket: { en: '¥25 (students half price)', zh: '25元，学生凭证半价' },
      highlight: { en: 'Tibetan Buddhist temple, once an imperial prince\'s mansion', zh: '藏传佛教皇家寺院 · 雍正旧府' },
      description: {
        en: 'The former residence of the Yongzheng Emperor before he took the throne — his \'Prince Yong mansion.\' After his death it was converted into an imperial traveling palace, and in 1744 his son Emperor Qianlong turned it into a Tibetan Buddhist lamasery. The entrance is lined with a ginkgo avenue that turns brilliant gold in autumn, leaves drifting down as you walk — romantic and grand at once. Open 8:00-17:00. Metro Lines 2 and 5 to Yonghegong.',
        zh: '「四爷」雍正登基前的住所雍亲王府。雍正之后便不曾有其他王爷入住，雍正三年（1725年）改王府为行宫，称雍和宫；乾隆九年（1744年）改为藏传佛教的喇嘛庙。雍和宫入口处有一条银杏大道，秋季满眼的金黄，银杏叶在你的行走间片片飘落，既浪漫又壮观。开放时间08:00-17:00。地铁2号线、5号线雍和宫站下，公交13、116、117路等至雍和宫站下。',
      },
    },
    {
      name: { en: '798 Art District', zh: '798艺术区' },
      image: '/images/cities/beijing/beijing_p03_11.jpeg',
      location: { en: 'Chaoyang District, No.4 Jiuxianqiao Road', zh: '朝阳区酒仙桥路4号' },
      duration: { en: '3-4 hours', zh: '3-4小时' },
      ticket: { en: 'Free entry (some exhibitions extra)', zh: '免费（部分展览另收费）' },
      highlight: { en: 'Beijing\'s contemporary art landmark', zh: '北京当代艺术地标' },
      description: {
        en: 'China\'s most famous and mature art district, born from the decommissioned 798 electronics factory. Over a hundred cultural institutions — galleries, architecture and fashion studios, music and film spaces — now fill the Bauhaus-style halls, with names like publisher Hung Huang and sculptor Li Xiangqun in residence. Exhibitions, talks, and pop-ups run year-round, and some factories still operate, so you drift between art and industry, refinement and grit. No metro on site: take Line 2 to Dongzhimen or Line 13 to Wangjing West, then a short bus ride (401, 420, 405, 909, 955, 991, 988) to Dashanzi Lukou South.',
        zh: '国内名声最大也最成熟的艺术区。原是798厂等电子工业的老厂区，后来一些艺术家集聚于此，充分利用原有厂房的风格稍作装修修饰，成为富有特色的艺术展示与创作空间。目前园内有100多家文化机构，涵盖出版、建筑设计、服装设计、室内家居设计、音乐演出、影视播放、艺术家工作室等，大名鼎鼎的洪晃、李象群等均已进驻。无论何时去，都有很多展览或讲座等待你；仍有工厂在生产，精致与粗犷并存。附近无地铁，可坐地铁2号线到东直门或13号线到望京西，再换公交401、420、405、909、955、991、988路到大山子路口南下。',
      },
    },
  ],
}

// 美食数据 - 每座城市 4-6 种
const rawFoods: Record<string, Omit<Food, 'id' | 'sortOrder'>[]> = {
  chengdu: [
    {
      name: { en: 'Sichuan Beef Tallow Hot Pot', zh: '牛油火锅' },
      image: '/images/cities/chengdu/chengdu_p07_23.jpeg',
      highlight: { en: 'The soul of Chengdu food', zh: '成都美食灵魂' },
      description: {
        en: 'The signature numbing-spicy "mala" flavor of Sichuan, simmering with beef tallow, Sichuan peppercorns, and dried chilies — the most famous dish to come out of this UNESCO City of Gastronomy. Try the classic "nine-grid" red pot (jiugongge) so each ingredient has its own compartment, and dip everything in a sesame oil and garlic bowl to cool the heat. Order the trio of beef tripe, duck intestine, and yellow throat. Not a spice fan? Go for the yuanyang half-and-half pot. Local favorites: Shu Jiuxiang, Huangcheng Laoma, Pang Ma Lan Huoguo.',
        zh: '麻辣鲜香的川式火锅，醇厚牛油锅底加花椒、干辣椒，是“美食之都”成都最响亮的招牌。试试“九宫格”红汤锅，毛肚、鸭肠、黄喉是必点三宝，蘸香油蒜泥碟最地道，怕辣可选鸳鸯锅。本地人气老店推荐蜀九香、皇城老妈、胖妈烂火锅。',
      },
    },
    {
      name: { en: 'Skewer Hot Pot (Chuanchuan Xiang)', zh: '串串香' },
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      highlight: { en: 'The most grassroots Chengdu snack', zh: '成都最草根的美食' },
      description: {
        en: 'Chengdu\'s most grassroots street food — meat, veggies, and tofu skewered on bamboo sticks and cooked in a spicy red broth, then served ready to eat. It\'s hot pot in another form: faster, cheaper, and just as addictive. Count your empty sticks at the end — that\'s how you\'re billed. Pair with an icy bowl of bingfen (ice jelly) to put out the fire.',
        zh: '成都最草根的美食，是火锅的另一种形式。各种食材穿在竹签上，于秘制红汤中烫煮后上桌，方便快捷、麻辣爽口。吃完按签计价，搭配一碗冰粉最解辣。',
      },
    },
    {
      name: { en: 'Dan Dan Noodles', zh: '担担面' },
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
      highlight: { en: 'A century-old Sichuan classic', zh: '百年经典小吃' },
      description: {
        en: 'Thin wheat noodles topped with savory fried ground pork, chili oil, and Sichuan peppercorn — named for the shoulder-pole (dan) baskets the old street vendors once carried. The noodles are thin, the sauce crisply savory, numbing and spicy, with a fragrant aroma that hits before the first bite. The old-school peddlers cooked noodles in one side of a divided copper pot and braised chicken or trotters in the other.',
        zh: '细薄面条配上炒制猪肉末、红油与花椒面，咸鲜微辣、香气扑鼻，入口爽滑入味。过去成都走街串巷的担担面挑子用一中铜锅隔两格——一格煮面、一格炖鸡或炖蹄膀，是百年经典小吃。',
      },
    },
    {
      name: { en: 'Hand-Rubbed Ice Jelly (Bing Fen)', zh: '手工冰粉' },
      image: '/images/cities/chengdu/chengdu_p03_15.jpeg',
      highlight: { en: 'The spicy-food antidote', zh: '解辣神器' },
      description: {
        en: 'A jiggly, translucent jelly made from the seeds of a type of fig, hand-rubbed for texture. Topped with brown sugar syrup, glutinous rice cakes, hawthorn flakes, and crushed peanuts. Sweet, cool, and absolutely essential after a hot pot or chuanchuan meal — the classic Chengdu way to cool the mala fire.',
        zh: '手搓冰粉配上红糖、糍粑、山楂碎、花生碎，口感Q弹清甜，是吃火锅串串的绝佳搭档，也是成都人最爱的解辣甜品。',
      },
    },
    {
      name: { en: 'Zhong Dumplings', zh: '钟水饺' },
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      highlight: { en: 'A time-honored Chengdu classic since 1893', zh: '始于光绪年间的成都老字号' },
      description: {
        en: 'All-pork dumplings bathed in a glossy sweet-spicy chili oil sauce — the signature dish of a shop founded in 1893 by Zhong Shaobai. The skins are thin, the filling juicy, and the sauce sweet-salty with a heavy garlic kick. The original branch sits on Tidu Street, with convenient outposts near Wuhou Shrine and Wenshu Monastery serving other classic Chengdu snacks alongside.',
        zh: '全肉馅儿的水饺淋上微甜带咸的红油酱料，是始于光绪年间（1893年）的成都名小吃。皮薄馅嫩、蒜香浓郁、辣中带甜，声名远播。原店位于提督街口，武侯祠、文殊院等地都有分店，还能顺便品尝其他成都小吃。',
      },
    },
    {
      name: { en: 'Spicy Rabbit Head', zh: '麻辣兔头' },
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      highlight: { en: 'A local obsession', zh: '本地人的最爱' },
      description: {
        en: 'A late-night Chengdu obsession: rabbit heads braised in five-spice or numbing-spicy broth until the meat falls off the bone. Locals drive all the way out to Shuangliu for the most authentic version at "Lao Ma Tu Tou." It takes practice to eat — you nibble the meat from the cheeks and palate — but those who love it, love it, and it\'s the city\'s ultimate drinking snack.',
        zh: '成都人的夜宵与下酒标配，五香、麻辣两种口味，肉质酥烂入味，越啃越香。最正宗的要数双流县清泰路的“双流老妈兔头”，本地人甚至大老远驱车专程去吃一口地道的兔头。',
      },
    },
    {
      name: { en: 'Long Wontons (Long Chaoshou)', zh: '龙抄手' },
      image: 'https://picsum.photos/seed/chengdu-f6/800/600',
      highlight: { en: 'Chengdu\'s most famous wontons', zh: '成都老字号 · 皮薄馅嫩' },
      description: {
        en: 'Chengdu\'s most famous wontons, founded in the 1940s on Chunxi Road — the name "Long" (dragon) is a pun on "nong" (rich abundance). The wrappers are rolled paper-thin and semi-translucent, the pork filling silky and tender, and the broth simmered from chicken, duck, and pork until it\'s white, rich, and fragrant. The flagship on Chunxi Road serves dozens of other Sichuan snacks alongside, though it\'s popular with tourists.',
        zh: '创始于上世纪40年代的成都老字号，店名谐“浓”字音，又取“龙凤呈祥”之意，定名“龙抄手”。三大特色：皮薄、馅嫩、汤鲜——抄手皮用特级面粉擀成“薄如纸、细如绸”的半透明状，肉馅细嫩滑爽，原汤用鸡、鸭和猪身上几个部位猛炖慢煨而成，又白又浓又香。总店位于春熙路南段，几乎汇集了成都各种小吃。',
      },
    },
    {
      name: { en: 'Intestine Glass Noodles (Feichang Fen)', zh: '肥肠粉' },
      image: '/images/cities/chengdu/chengdu_p08_27.jpeg',
      highlight: { en: 'The line from a Chengdu movie: don\'t leave without a bowl', zh: '“没吃过肥肠粉，就不算到过成都”' },
      description: {
        en: 'Sweet-potato glass noodles in a rich broth of pork intestines and bones, topped with tender braised intestines, chili oil, and Sichuan peppercorn — the dish the movie A Good Rain Knows called essential: "if you haven\'t eaten intestine noodles, you haven\'t been to Chengdu." The noodles are springy, the broth deeply savory, and the recipe morphs easily into sour-spicy noodles or beef noodles. Try Gan Ji or Bai Jia Feichang Fen for the classic bowl, or follow locals to a hole-in-the-wall "fly restaurant."',
        zh: '成都“重口味”小吃的代表：上等红薯粉下到用肥肠、猪骨头及多种佐料熬制的高汤里，配上软烂入味的肥肠、干红辣椒和花椒，粉丝细腻弹滑、锅汤浓香。电影《好雨时节》里有句台词——“如果你没吃过肥肠粉，就不算到过成都”。推荐甘记肥肠粉、白家肥肠粉，或去菜市场边的“苍蝇馆子”寻味。',
      },
    },
    {
      name: { en: 'Bobo Chicken (Cold Skewers)', zh: '钵钵鸡' },
      image: '/images/cities/chengdu/chengdu_p07_24.jpeg',
      highlight: { en: 'Leshan-born spicy cold skewers', zh: '乐山名吃 · 麻辣冷吃串串' },
      description: {
        en: 'Cold skewers steeped in a fragrant, numbing chili-and-sesame oil broth and served from a clay bowl (boban) — a Leshan-born Sichuan classic. Tender boneless chicken and vegetables on sticks, intensely aromatic and refreshing cold.',
        zh: '以陶钵盛装、麻辣红油与藤椒浸泡的冷吃串串，去骨鸡块与各式食材串签入味，麻香浓郁、冷吃更爽，是源自乐山的川味名吃。',
      },
    },
    {
      name: { en: 'San Da Pao (Three Cannons)', zh: '三大炮' },
      image: '/images/cities/chengdu/chengdu_p08_25.jpeg',
      highlight: { en: 'A theatrical sticky-rice dessert', zh: '摔出来的甜糯小吃' },
      description: {
        en: 'A theatrical Chengdu dessert — sticky-rice balls slammed onto a brass plate (three loud \'bangs\') so they bounce into roasted soybean-and-sesame powder, then bathed in brown-sugar syrup. Chewy, sweet, and half the fun is watching it made.',
        zh: '糯米团摔向铜盘发出\'砰砰砰\'三声而得名，裹上黄豆粉与芝麻、淋上红糖浆，软糯香甜，制作过程极具观赏性。',
      },
    },
    {
      name: { en: 'Tangyou Guozi (Syrup Fritters)', zh: '糖油果子' },
      image: '/images/cities/chengdu/chengdu_p08_26.jpeg',
      highlight: { en: 'Glossy caramel-glazed fritters', zh: '金红油亮的街头甜串' },
      description: {
        en: 'Skewered glutinous-rice fritters glazed in caramelized brown sugar and rolled in sesame seeds — glossy red-gold, shatteringly crisp outside and pleasantly chewy within. A beloved Chengdu street sweet.',
        zh: '糯米粉团油炸后裹上红糖熬制的糖稀、撒上白芝麻，色泽金红、外脆内糯，是成都街头经典的甜口小吃。',
      },
    },
  ],
  xian: [
    {
      name: { en: 'Mutton Paomo', zh: '牛羊肉泡馍' },
      image: '/images/cities/xian/xian_p09_27.jpeg',
      highlight: { en: 'The signature Xi\'an dish — a Shaanxi icon', zh: '西安美食总代表 · 陕西名食' },
      description: {
        en: 'Xi\'an\'s most iconic dish, and arguably the \'grand representative\' of all Shaanxi food. A hearty soup of tender lamb and glass noodles, served with a flatbread (mo) that you tear into tiny pieces yourself — the smaller the pieces, the better the flavor. Once you\'ve torn the bread, hand the bowl back to be cooked with the meat and broth. Eat it with pickled garlic and chili sauce on the side, then sip a small bowl of rich stock to finish. Visitors love Lao Sun Jia; locals swear by Lao Mi Jia Da Yu Paomo.',
        zh: '陕西风味美馔，尤以西安最享牛羊肉泡馍盛名，被誉为陕西名食的\'总代表\'。烹制精细，料重味醇，肉烂汤浓，肥而不腻，营养丰富，香气四溢。吃时佐以糖蒜、辣子酱、香菜，食后再饮一小碗高汤，更觉余香满口。最好自己掰馍，掰得越小越好，这样做出来的味道才最佳。游客喜欢老孙家泡馍，本地人气最旺的是老米家大雨泡馍。',
      },
    },
    {
      name: { en: 'Roujiamo (Chinese Hamburger)', zh: '腊汁肉夹馍' },
      image: '/images/cities/xian/xian_p10_37.jpeg',
      highlight: { en: 'The \'world\'s first hamburger\'', zh: '起源于战国 · \'中式汉堡\'鼻祖' },
      description: {
        en: 'Often called \'the world\'s first hamburger\', roujiamo dates back to the Warring States period — the real deal is just two things: lazhi (slow-braised spiced pork) and baiji mo (a crisp, chewy baked flatbread). The pork is fatty and lean together, stewed until it melts in the mouth, with plenty of savory juices. No lettuce, no sauce, no additions — just bread and meat, each bringing out the best in the other. The classic Xi\'an spot is Fan Ji on Zhuba Shi Street (around ¥12 a piece).',
        zh: '肉夹馍是源于古城西安的著名小吃，起源于战国，有\'中式汉堡\'美誉。实际它是两种食物的绝妙组合：腊汁肉，白吉馍。肉夹馍合腊汁肉、白吉馍为一体，互为烘托，将各自滋味发挥到极致。食者有\'肥肉吃了不腻口，瘦肉无渣满口油，不用牙咬肉自烂，食后余香久不散\'之赞誉。正宗肉夹馍只用腊汁肉，不加青椒香菜。樊记腊汁肉夹馍（竹笆市街53号）一个约12元，外皮烤得脆脆的，肥瘦搭配，入口即化。',
      },
    },
    {
      name: { en: 'Biangbiang Noodles', zh: 'biáng biáng面' },
      image: '/images/cities/xian/xian_p10_39.jpeg',
      highlight: { en: 'Belt-wide hand-pulled noodles doused in chili oil', zh: '陕西十大怪之一 · 面条像裤带' },
      description: {
        en: 'The signature noodle of Shaanxi — hand-pulled wheat noodles as wide and thick as a belt (one of the \'Ten Shaanxi Quirks\' — \'noodles like a trouser belt\'). The dough is slapped against the board with a \'biang biang\' sound, giving the dish its name. Topped with chili powder, garlic, and scallions, then drenched in sizzling hot oil until the bowl glows red. Hearty, spicy, slippery, and chewy. The character \'biáng\' itself is so complex it has its own folk rhyme to remember how to write it.',
        zh: '陕西关中人最基本最普通的面食，陕西十大怪中\'面条像裤带\'指的就是这种面。手工擀制又粗又宽的面条，在开水中煮熟后捞在碗里，配上葱花、肉丝、花椒粉、盐面等，再撒上一层厚厚的辣椒面，最后浇上滚烫的热油——顿时满碗红光。陕西民间还流传着一段幽默风趣的\'biáng\'字歌谣，概括了它的产地特性、食者感受与制作工艺。筋道鲜香、过瘾实在，是陕西面食文化的豪迈担当。',
      },
    },
    {
      name: { en: 'Zenggao (Steamed Glutinous Rice Cake)', zh: '甑糕' },
      image: '/images/cities/xian/xian_p09_28.jpeg',
      highlight: {
        en: 'Soft, sticky rice-and-red-date cake, a Xi\'an breakfast staple',
        zh: '糯米红枣 · 软糯香甜的街头早餐',
      },
      description: {
        en: 'A Xi\'an breakfast classic. Layers of glutinous rice, red dates, and kidney beans steamed together in a traditional iron steamer called a \'zeng\' until soft, sticky, and fragrant. Served piping hot from street carts, sweet without being cloying, with a deep date flavor and a texture that somehow doesn\'t stick to the teeth. The most famous stall is Dongnanya Zenggao at Majia Shizi intersection. A warm, comforting way to start a Xi\'an morning.',
        zh: '西安的特色小吃。主料是糯米和枣，还有一些其他的甜料。在传统铁甑中层层蒸制，蒸熟后香味四溢，热气腾腾。吃起来软糯香甜，枣味儿很重，不是很甜，而且是糯食却丝毫不粘牙。陶罐小推车出现在街头巷尾，是西安街头一道风景，也是西安人喜爱的暖胃早餐。名气最大的当属麻家什字东北角的东南亚甑糕。',
      },
    },
    {
      name: { en: 'Liangpi (Cold Rice Noodles)', zh: '西安凉皮' },
      image: '/images/cities/xian/xian_p09_30.jpeg',
      highlight: { en: 'Cool, tangy, spicy — the heart of a \'Guanzhong Combo\'', zh: '酸辣爽口 · \'关中套餐\'主角' },
      description: {
        en: 'One of Shaanxi\'s most famous snacks. Thin sheets of cold rice noodles dressed with vinegar, chili oil, cucumber, and bean sprouts — tangy, spicy, and refreshing. There are three main styles: Qinzhen rice liangpi, Hanzhong hot liangpi, and Qishan hand-rolled liangpi. The halal sesame-paste version (majiang liangpi) is a Muslim-Quarter specialty, slicked with rich sesame sauce and chili. The classic \'Guanzhong Combo\' is a bowl of liangpi, a roujiamo, and a bottle of Bingfeng soda or a bowl of eight-treasure porridge — the perfect summer lunch.',
        zh: '陕西著名小吃，西安现在市面上的凉皮大概分三种：秦镇米面凉皮、汉中热面皮和岐山擀面皮。一般属于非清真，而麻酱凉皮属于清真。清真麻酱凉皮在回民街许多店铺都有出售，用味道浓郁的芝麻酱和辣椒酱拌食，口感细滑；非清真的凉皮店则在西安的大街小巷随处可见。所谓\'关中套餐\'即是一碗凉皮、一个肉夹馍再加一瓶冰封或者一碗八宝稀饭，是夏日里最惬意的搭配。',
      },
    },
    {
      name: { en: 'Persimmon Cakes (Huanggui Shimbing)', zh: '黄桂柿子饼' },
      image: 'https://picsum.photos/id/1068/800/600',
      highlight: {
        en: 'Fried golden cakes of sweet Lintong persimmon — a seasonal treat',
        zh: '黄桂柿子饼 · 秋冬时令佳品',
      },
      description: {
        en: 'A seasonal Xi\'an pastry made from Lintong\'s famous fire-crystal persimmons — small, flat, deep-red fruits with thin skins, no pits, and honey-sweet flesh. The pulp is mixed with flour and osmanthus honey, stuffed with sweet fillings, and pan-fried into golden, crispy cakes — crunchy outside, soft and sweet within. Best eaten fresh and hot in autumn and winter when persimmons are at their peak. Lao Xu Jia on Bei Guangji Street is a beloved old stall, and you\'ll find them sizzling on griddles all over the Muslim Quarter.',
        zh: '一种点心，是秋冬季节时令佳品。选用临潼火晶柿子制成——临潼火晶柿子果实扁圆、个小色红，晶莹光亮、皮薄无核，肉丰蜜甜，吃起来凉甜爽口，甜而不腻，且果皮极易剥离。柿肉与面粉混合，加入黄桂、馅料，油煎成金黄的炸饼，外酥里软、香甜可口。秋季现做现吃风味最佳。北广济街的老徐家柿子饼是老字号，回民街上也随处可见。',
      },
    },
    {
      name: { en: 'Meatball Hulatang (Spicy Soup)', zh: '肉丸胡辣汤' },
      image: '/images/cities/xian/xian_p10_34.jpeg',
      highlight: { en: 'Xi\'an locals\' #1 breakfast — a halal spicy soup', zh: '西安人早餐的第一选择 · 清真' },
      description: {
        en: 'The quintessential Xi\'an breakfast — a thick, peppery halal soup of beef meatballs, potato, cabbage, and carrot, finished with sesame oil and chili oil. Locals crumble a tuotuo mo (flatbread) into the broth and eat it spoonful by spoonful, the warm five-spice beef flavor waking them up better than any coffee. Every morning, lane-side shops fill with early risers slurping down a bowl with a mo to start the day. It\'s the most authentic taste of everyday Xi\'an.',
        zh: '西安的胡辣汤是回民的肉丸胡辣汤，是西安本地人早餐的第一选择。汤里有牛肉丸子、土豆块、卷心菜、胡萝卜，吃前浇上香油、油泼辣子，再搭配一个陀陀馍，掰碎泡在汤里，五香牛肉味。每天清晨，街巷的小餐馆里，起早的客人们都会先来上一碗胡辣汤，再就着一个馍，吃得肚子热乎了，再开始一天的工作。这是最地道的西安市井味道。',
      },
    },
    {
      name: { en: 'Hulutou (Pork Intestine Paomo)', zh: '葫芦头泡馍' },
      image: '/images/cities/xian/xian_p09_32.jpeg',
      highlight: { en: 'A famous Xi\'an snack with a Tang-dynasty origin story', zh: '陕西省著名风味小吃 · 非清真' },
      description: {
        en: 'A celebrated Xi\'an street snack (non-halal) dating back to the Song dynasty. The curious name \'hulutou\' — \'gourd head\' — comes from a Tang-dynasty legend: the physician Sun Simiao left a medicinal gourd at a pork-intestine shop to season the offal, transforming its flavor; the grateful owner hung the gourd above the door and named the dish after it. Like paomo, you tear a flatbread into the rich, milky-white broth, but here it\'s served with tender, clean-tasting pork intestine. Chun Fa Sheng on Nan Yuan Men is the most famous old shop — silky, fatty, fragrant, with no off-flavor at all.',
        zh: '陕西省著名风味小吃，来源于宋代街市食品中的\'煎白肠\'。据传唐时医药学家孙思邈在长安一家专卖猪大肠的小店里吃\'杂碎\'，留药葫芦供店家调味，此后\'杂碎\'一改旧味，香气四溢，每天顾客盈门。店家感激孙思邈，特将药葫芦高悬门首，\'葫芦头\'由此得名。和泡馍类似，将坨坨馍掰碎泡入浓郁的白汤里，配以洗净异味的猪大肠。南院门的春发生饭店最有名，大肠洗得很干净，吃口滑嫩、肥香。',
      },
    },
  ],
  beijing: [
    {
      name: { en: 'Peking Roast Duck', zh: '北京烤鸭' },
      image: '/images/cities/beijing/beijing_p03_13.jpeg',
      highlight: { en: 'Beijing\'s world-famous signature dish', zh: '具有世界声誉的北京名菜' },
      description: {
        en: 'Beijing\'s most famous dish — a top-grade Beijing duck roasted over fruit-wood charcoal until the skin is glossy red and the meat rich but never greasy. The name brands are Quanjude (hanging-oven style, since 1864), Bianyifang (the older roasting-oven style), and Dadong, the modern favorite. Carved by a master tableside and served with thin pancakes, scallion, cucumber, and sweet bean sauce.',
        zh: '具有世界声誉的北京著名菜式，用料为优质肉食鸭北京鸭，果木炭火烤制，色泽红润、肉质肥而不腻。最著名的当属全聚德挂炉烤鸭，还有便宜坊等老字号，如今较受欢迎的是大董烤鸭。刚出炉的烤鸭在师傅精湛的刀法下越发诱人，配上葱丝、黄瓜条与甜面酱，用薄饼一卷，值得一尝。',
      },
    },
    {
      name: { en: 'Old Beijing Instant-Boiled Mutton', zh: '老北京涮羊肉' },
      image: 'https://picsum.photos/seed/beijing-f1/800/600',
      highlight: { en: 'Charcoal copper-pot hot pot, winter in a bowl', zh: '炭火铜锅里的京城冬味' },
      description: {
        en: 'Old Beijing\'s answer to hot pot — paper-thin slices of mutton swished seven-up-eight-down in a charcoal-heated copper pot. The authentic broth is plain water with scallion, garlic, ginger, jujube, and shiitake — no seasoning — paired with a sesame-paste dip. Order matters: tripe first, then meat, then vegetables, finally mixed noodles. Tourists love Donglaishun; locals head to Nanmen Shuanrou or Jubaoyuan.',
        zh: '老北京火锅也称「涮羊肉」，选阉过的羊，将鲜肉切成纸般的薄片，放入炭火铜锅中涮个七上八下。最正宗的吃法为清汤（白水放入葱蒜姜片红枣香菇，不加调味料）配芝麻酱小料。吃的顺序很有讲究：先涮毛肚再涮肉，三下菜，最后煮杂面。游客喜欢东来顺，本地人气是南门涮肉，特别推荐聚宝源。',
      },
    },
    {
      name: { en: 'Zhajiangmian (Fried Sauce Noodles)', zh: '炸酱面' },
      image: '/images/cities/beijing/beijing_p09_26.jpeg',
      highlight: { en: 'Beijing\'s signature noodle dish', zh: '北京富有特色的家常面食' },
      description: {
        en: 'Beijing\'s signature noodle dish. The sauce is pork cubes and scallion ginger simmered in yellow soybean paste (huangjiang) or sweet bean paste until deeply savory. Piled high with shredded cucumber, toon leaves, bean sprouts, green and yellow soybeans for crunch. Mix it all together and eat hot — or order the \'crossed-water\' cold version for summer. Head to Haiwanju, Jingweizhai, or Siwei Minfu for a proper bowl.',
        zh: '北京富有特色的食物。将黄瓜、香椿、豆芽、青豆、黄豆切好或煮好做成菜码备用；然后做炸酱——将肉丁及葱姜放在油里炒，再加入黄酱或甜面酱炸炒即成。面条煮熟后捞出，浇上炸酱、拌以菜码即成炸酱面。也有面条捞出后用凉水浸洗再加炸酱、菜码的，称「过水面」或「凉面」。游客喜欢海碗居，本地人气是京味斋，特别推荐四季民福。',
      },
    },
    {
      name: { en: 'Luzhu Huoshao (Pork Offal Stew)', zh: '卤煮火烧' },
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      highlight: { en: 'Old Beijing street food at its most authentic', zh: '老北京市井的硬核美味' },
      description: {
        en: 'A hearty working-class classic — fire-baked wheat cakes (huoshao) simmered with pork intestines and pork lungs in a spiced soy broth, so a single bowl covers starch, meat, and soup. Born in the old city\'s south alleys and still the most authentic taste of street Beijing. Try the legendary Xiaochang Chen on Deshengmen Inner Street (No. 253) for the canonical version.',
        zh: '在北京尽人皆知的食品，将火烧和炖好的猪肠、猪肺放在一起煮，买一碗主食副食和热汤都有了。源于南城老巷的市井美味，是老北京人钟爱的硬核味道。特别推荐小肠陈卤煮火烧（西城区德胜门内大街253号），是品尝正宗卤煮的不二之选。',
      },
    },
    {
      name: { en: 'Baodu (Crisp Tripe)', zh: '爆肚' },
      image: '/images/cities/beijing/beijing_p11_27.jpeg',
      highlight: { en: 'Crisp, fresh, never greasy — pairs with baijiu', zh: '又脆又鲜的京城名小吃' },
      description: {
        en: 'A beloved Beijing snack of paper-thin beef or sheep tripe dunked for seconds in boiling water until crisp and fresh, never oily — locals even swear it soothes the stomach. Always pair it with a couple of ounces of baijiu and two sesame flatbreads fresh from the oven, a small feast in itself. For the real thing, head to Baodu Feng on Qianmen\'s Menkuang Hutong (Langfang Er-tiao No. 56).',
        zh: '北京风味小吃中的名吃，爆肚又脆又鲜，不油不腻，据说还可治胃病。吃爆肚的人如会喝酒，总要喝二两，喝完酒再吃两个刚出炉的烧饼，确实是一大快事。特别推荐爆肚冯（西城区前门大街门框胡同廊坊二条56号），是品尝正宗爆肚的老字号。',
      },
    },
    {
      name: { en: 'Chaogan (Beijing Liver Stew)', zh: '炒肝' },
      image: 'https://picsum.photos/seed/beijing-f5/800/600',
      highlight: { en: 'Named \'stir-fried\' but really slow-simmered', zh: '名为炒肝实为熬煮的京城早点' },
      description: {
        en: 'Don\'t let the name fool you — \'stir-fried liver\' is in fact slowly simmered pork liver and intestines, thickened with starch into a glossy, savory gravy you scoop up from a bowl without chopsticks. A classic Beijing breakfast at hole-in-the-wall shops, with Tianxing Ju in the south city as the most famous name. Yaoji Chaogan at Dongzhimennei (Beixinqiao crossing) is the modern pilgrim\'s choice.',
        zh: '北京特色风味小吃，但跟「炒」、「肝」关系都不太大，炒肝事实上是「熬心熬肺」。如今的炒肝多是熬煮肥肠肝尖后勾芡。目前很多小餐馆作为早餐都有提供，不过最有名的还是位于南城的天兴居。特别推荐姚记炒肝店（东城区东直门内大街，北新桥路口），是当下食客的朝圣之地。',
      },
    },
    {
      name: { en: 'Lvda Gun (Bean-Flour Rolls)', zh: '驴打滚' },
      image: 'https://picsum.photos/seed/beijing-f6/800/600',
      highlight: { en: 'A playful old Beijing dessert', zh: '沾满黄豆面的软糯甜品' },
      description: {
        en: 'A playful old Beijing dessert: glutinous yellow-millet dough rolled around red-bean paste, then tumbled in roasted soybean flour so it won\'t dry or crack. The name \'donkey rolling in the dirt\' comes from that last tumble. Soft, chewy, never sticky to the teeth — beloved by generations of Beijingers, and a specialty of time-honored shops like Huguosi Snacks and imperial-style Fangshan.',
        zh: '驴打滚是黄米面团卷豆沙，卷好后将其在黄豆面上翻滚，让表面沾上一层黄豆面，以避免水分蒸发导致干裂从而影响口感。可能就是因为最后这个动作，被幽默的北京人起名为「驴打滚」。驴打滚口感软糯、不黏牙，深受老北京的欢迎，护国寺小吃店、仿膳等老字号都能尝到正宗味道。',
      },
    },
    {
      name: { en: 'Tanghulu (Candied Hawthorn)', zh: '糖葫芦' },
      image: '/images/cities/beijing/beijing_p13_31.jpeg',
      highlight: { en: 'The iconic Beijing street snack', zh: '男女老少都爱的传统小吃' },
      description: {
        en: 'Skewers of hawthorn berries dipped in molten rock sugar that cools into a glossy, crackling shell — the perfect sweet-tart crunch. The classic Beijing street snack, sold from roadside stalls year-round but best in winter when the sugar sets crisp and the haws are at their tart peak. The traditional hawthorn version remains the classic.',
        zh: '冰糖葫芦被列为京味小吃的代表。山楂串裹上晶莹脆硬的糖衣，酸甜适口、嘎嘣脆，是男女老少都爱的传统北京街头小吃。一年四季都能在街边见到售卖的小摊，但冬季糖衣最脆、山楂最酸，风味最佳。最经典的永远是传统的山楂口味。',
      },
    },
  ],
}

// 行程条目类型（构建时使用）
interface RawItineraryItem {
  timeSlot: L
  content: L
}
interface RawItinerary {
  dayNumber: number
  title: L
  items: RawItineraryItem[]
}

// 行程数据 - 每座城市 3 天
const rawItineraries: Record<string, RawItinerary[]> = {
  chengdu: [
    {
      dayNumber: 1,
      title: { en: 'Three Kingdoms & Old Town Alleys', zh: '三国古迹与古巷漫步' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Wuhou Shrine — China\'s only joint ruler-minister temple; snap the famous red-wall bamboo photo',
            zh: '武侯祠——中国唯一的君臣合祀祠庙，红墙竹影是必拍古风机位',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: {
            en: 'Wander Jinli Ancient Street and graze through snacks — three-da-pao, bowl chicken, spicy tofu pudding',
            zh: '锦里古街解决午餐，一路品尝三大炮、钵钵鸡、担担面等成都小吃',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Kuanzhai Alleys — sit down for a cup of gaiwan tea, try the Sichuan ear-cleaning service, browse the folk-art shops',
            zh: '宽窄巷子喝茶、掏耳朵、逛文创小店，感受老成都市井与文艺气息',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '傍晚' },
          content: {
            en: 'Chunxi Road & IFS — shopping, street food, and a photo with the giant climbing panda',
            zh: '春熙路逛街购物，打卡IFS国际金融中心爬墙大熊猫',
          },
        },
        {
          timeSlot: { en: 'Dinner', zh: '晚上' },
          content: {
            en: 'Sit down for Sichuan beef-tallow hot pot — order the nine-grid pot with a sesame-oil dip',
            zh: '找一家本地火锅店，体验正宗牛油麻辣锅与香油蒜泥碟',
          },
        },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Poets, Temples & Teahouse Life', zh: '诗圣故居与茶馆慢生活' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Du Fu Thatched Cottage — stroll the bamboo garden where the Tang poet wrote 240+ poems',
            zh: '杜甫草堂漫步清幽园林，寻觅诗圣杜甫的成都踪迹',
          },
        },
        {
          timeSlot: { en: 'Late morning', zh: '上午' },
          content: {
            en: 'Qingyang Palace — Sichuan\'s top Taoist temple, holding the most complete Daoist scripture blocks in China; sip tea in the courtyard',
            zh: '青羊宫——川西第一道观，藏有清代《道藏辑要》经版，院内茶社可小坐',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Wangjiang River Pavilion Park — gaiwan tea by the Jinjiang, with more than 100 kinds of bamboo overhead',
            zh: '望江楼公园喝盖碗茶、摆龙门阵，看锦江两岸蓉城市景',
          },
        },
        {
          timeSlot: { en: 'Late afternoon', zh: '傍晚' },
          content: {
            en: 'Wenshu Monastery area — try sweet-water noodles, yellow bean jelly, and other old Chengdu snacks',
            zh: '文殊院及周边小吃街，品尝甜水面、黄凉粉、清汤抄手等本地小吃',
          },
        },
        {
          timeSlot: { en: 'Night', zh: '晚上' },
          content: {
            en: 'Jiuyan Bridge bars — Chengdu\'s liveliest nightlife strip along the Fu River',
            zh: '九眼桥酒吧街——府河两岸夜夜笙歌，感受成都火辣夜生活',
          },
        },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'Pandas & People\'s Park', zh: '熊猫萌宠与本地生活' },
      items: [
        {
          timeSlot: { en: 'Early morning', zh: '清晨' },
          content: {
            en: 'Giant Panda Breeding Base — arrive before 9 AM when pandas are most active; see the cubs at the Moon Nursery',
            zh: '大熊猫繁育研究基地——务必上午尽早到达，看熊猫吃竹打滚，月亮产房看超萌幼崽',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: { en: 'Lunch near the base or back downtown, then a short rest', zh: '基地附近或返回市区用餐，稍作休息' },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Heming Teahouse in People\'s Park — gaiwan tea in the bamboo chairs and the famous Chengdu ear-cleaning service',
            zh: '人民公园鹤鸣茶社喝盖碗茶、体验四川掏耳朵绝技，太阳晒起感觉不摆了',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '傍晚' },
          content: {
            en: 'Yulin neighborhood — small live-music bars on Yulin Road, the soul of Chengdu nightlife',
            zh: '玉林路一带小酒馆与 live house，体验成都文艺夜生活',
          },
        },
      ],
    },
    {
      dayNumber: 4,
      title: { en: 'Dujiangyan & Mount Qingcheng Day Trip', zh: '都江堰·青城山一日游' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'High-speed train from Chengdu North to Dujiangyan (about 30 min, ¥15) — tour the 2,200-year-old irrigation works',
            zh: '从成都乘高铁约30分钟到都江堰（票价约15元），参观两千年仍在使用的水利工程',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: {
            en: 'Lunch in Dujiangyan town — try local river fish, white-fruit stewed chicken, and snacks',
            zh: '都江堰市区午餐，品尝当地冷水鱼、白果炖鸡等青城四绝',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Mount Qingcheng front mountain — hike or cable car to Laojun Pavilion on the first peak',
            zh: '游览青城山前山，步行或乘索道登老君阁（青城第一峰），感受“青城天下幽”',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '傍晚' },
          content: { en: 'High-speed train back to Chengdu — end of day trip', zh: '乘高铁返回成都市区，一日游结束' },
        },
      ],
    },
  ],
  xian: [
    {
      dayNumber: 1,
      title: { en: 'Old City: Wall, Towers & the Muslim Quarter', zh: '古城一日：城墙、钟鼓楼、回民街、碑林' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Enter the City Wall at South Gate (Yongning Gate) — catch the 9:30 gate-opening ceremony, then rent a bike and ride the 13.7 km loop (about 80 min)',
            zh: '从南门（永宁门）登城墙，9:30可观开城门仪式，租自行车环城骑行一周（约13.7公里、80分钟）',
          },
        },
        {
          timeSlot: { en: 'Late morning', zh: '上午稍晚' },
          content: {
            en: 'Walk north to the Bell and Drum Towers — climb for views over the four great avenues, then watch a bell-chime or drum performance',
            zh: '向北步行至钟鼓楼，登楼俯瞰四条大街，欣赏编钟或鼓乐表演',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: {
            en: 'Lunch in the Muslim Quarter behind the Drum Tower — mutton paomo (tear the bread small!), roujiamo, and grilled skewers',
            zh: '鼓楼后回民街午餐——羊肉泡馍（馍要掰小！）、肉夹馍、烤串',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Stroll calligraphy-filled Shuyuanmen to the Forest of Steles Museum (hire a guide to appreciate the stone tablets), then the Small Wild Goose Pagoda and Xi\'an Museum',
            zh: '逛书院门文化街到碑林博物馆（建议请讲解），再去小雁塔与西安博物院',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '傍晚' },
          content: {
            en: 'Dinner back in the Muslim Quarter as the lanterns glow — try persimmon cakes and dates for dessert',
            zh: '返回回民街晚餐，华灯初上，来份黄桂柿子饼或甑糕作甜点',
          },
        },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Tang Splendor: Museum, Pagoda & Tang Paradise', zh: '盛唐一日：博物馆、大雁塔、大唐芙蓉园' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Arrive early at the Shaanxi History Museum — buy the ¥20 Treasure Gallery ticket to skip the free-ticket queue; half a day of Zhou-Qin-Han-Tang treasures',
            zh: '一早前往陕西历史博物馆排队，买20元珍宝馆票可免排队，细赏周秦汉唐文物，建议请讲解',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: {
            en: 'Lunch around the Big Wild Goose Pagoda — Cien Town, Datang Tongyi Fang, and Grand Tang Mall all have good food streets',
            zh: '大雁塔周边用午餐——慈恩镇、大唐通易坊、大唐不夜城都是觅食好去处',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Tour Da Ci\'en Temple and climb the seven-story Big Wild Goose Pagoda for city views; wander the free surrounding plazas',
            zh: '参观大慈恩寺，登七层大雁塔俯瞰西安，逛北广场与周边免费景区',
          },
        },
        {
          timeSlot: { en: 'Late afternoon', zh: '傍晚' },
          content: {
            en: 'Catch the musical fountain show at North Square (Asia\'s largest), then walk through Qujiang Pool Relic Park',
            zh: '北广场音乐灯光喷泉（亚洲最大）十分值得一看，再漫步曲江池遗址公园',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '晚上' },
          content: {
            en: 'Night at Tang Paradise (Datang Furong Garden) — illuminated pavilions, the \'Dream Back to Tang\' show (17:00), and the water-screen movie (19:45)',
            zh: '夜游大唐芙蓉园，流光溢彩，可看《梦回大唐》演出（17:00）与水幕电影（19:45）',
          },
        },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'East Line: Terracotta Army, Huaqing & Mount Li', zh: '东线一日：兵马俑、华清池、骊山' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Take tourist bus Route 5 (306) from the train station\'s East Square to the Terracotta Army (¥7, 1-1.5 hrs) — ignore touts, board only marked buses',
            zh: '火车站东广场乘游5（306）路前往兵马俑（全程7元，1-1.5小时），认准正规车辆，勿信拉客',
          },
        },
        {
          timeSlot: { en: 'Late morning', zh: '上午稍晚' },
          content: {
            en: 'Tour pits 1, 2, 3 plus the Bronze Chariot Hall at the Terracotta Army — hire a guide to bring the warriors to life',
            zh: '游览兵马俑1、2、3号坑及铜车马展厅，强烈建议请讲解员',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: {
            en: 'Lunch in Lintong — try youpo noodles or big-plate chicken, then take the free shuttle to Qin Shi Huang Mausoleum (Lishan Garden)',
            zh: '临潼午餐，品尝油泼面或大盘鸡，再乘景区车前往秦始皇陵（骊山园）',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Bus back toward Xi\'an and stop at Huaqing Palace — Tang hot-spring ruins and the Xi\'an Incident site — then climb Mount Li for \'sunset over Lishan\'',
            zh: '返程途中下车游华清宫——唐代温泉遗址与西安事变旧址——再登骊山赏\'骊山晚照\'',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '晚上' },
          content: {
            en: 'From April to October, book \'The Song of Everlasting Sorrow\' outdoor show at Huaqing (¥268-988); center A-section seats are worth it',
            zh: '4-10月可预订华清宫《长恨歌》实景演出（268-988元），强烈推荐中A区',
          },
        },
      ],
    },
    {
      dayNumber: 4,
      title: { en: 'Mount Hua Day Trip — The \'Most Perilous Mountain Under Heaven\'', zh: '华山一日游：奇险天下第一山' },
      items: [
        {
          timeSlot: { en: 'Early morning', zh: '清晨' },
          content: {
            en: 'Take the tourist bus from the train station\'s East Square to Mount Hua (¥28, about 2 hrs) — or the train to Huashan station (~1.5-2 hrs, ~¥20)',
            zh: '火车站东广场乘旅游专线车前往华山（28元，约2小时），或乘火车至华山站（1.5-2小时，硬座约20元）',
          },
        },
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Start at Yuquanyuan and climb \'the one and only road into Hua\' — the Three Perils of Qianchi Zhuang, Baichi Xia, and Laojun Ligou up to North Peak',
            zh: '玉泉院出发，走\'自古华山一条路\'，挑战\'华山三大险\'千尺幢、百尺峡、老君犁沟，登北峰',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: {
            en: 'Continue up Canglong Ridge (the \'Black Dragon Spine\') to Wuyun Peak and Jinsuo Guan (Golden Lock Pass), then to Central Peak',
            zh: '经苍龙岭、五云峰、金锁关至中峰，沿途绝壑千尺',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Hit East Peak (Chaoyang Tai — sunrise platform), South Peak (the highest, 2154.9 m), and West Peak (a sheer cliff of pure rock) — or take the cable car up West Peak to save energy',
            zh: '登东峰（朝阳台观日出）、南峰（最高峰，海拔2154.9米）、西峰（绝壁千仞），体力有限可乘西峰索道',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '傍晚' },
          content: {
            en: 'Descend by cable car and catch the last bus back to Xi\'an (departs around 17:00)',
            zh: '乘索道下山，赶上返程末班车（约17:00发车）回西安',
          },
        },
      ],
    },
  ],
  beijing: [
    {
      dayNumber: 1,
      title: { en: 'Imperial Central Axis', zh: '皇城中轴线' },
      items: [
        {
          timeSlot: { en: 'Dawn', zh: '黎明' },
          content: {
            en: 'Flag-raising at Tiananmen Square — 36 honor guards march out of the central arch; the time shifts daily with sunrise',
            zh: '天安门广场观看升旗——36名国旗护卫队战士从天安门中心拱形城门整齐走出，升旗时间随日出每日变动',
          },
        },
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'The Forbidden City — walk the central axis south to north, about 3 hours; feel the scale of Ming-Qing imperial power',
            zh: '故宫博物院——走中轴线，南门进北门出，约3小时，感受当年皇家王朝的文化与恢宏气势',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: {
            en: 'Lunch near Jingshan Park, then climb Jingshan for the classic bird\'s-eye view of golden palace rooftops',
            zh: '景山附近午餐，登景山公园俯瞰故宫金黄琉璃瓦顶',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Wander Nanluoguxiang hutongs — boutique shops, courtyard cafés, and the side alleys where real old Beijing lives',
            zh: '漫步南锣鼓巷胡同——逛特色小店、创意咖啡馆，钻进侧巷看地道的老北京生活',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '晚上' },
          content: {
            en: 'Houhai (Shichahai) — willow-lined lakes, live-music bars, and the scent of old courtyard Beijing',
            zh: '后海（什刹海）——有水而能观山、垂柳拂岸的闲散之地，风情酒吧与驻唱歌手云集',
          },
        },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Great Wall Hero', zh: '长城好汉行' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Mutianyu Great Wall in Huairou — steep, magnificent, and the essence of the Wall; fewer crowds than Badaling',
            zh: '怀柔慕田峪长城——挺拔险要，是万里长城的精华之处，比八达岭清净',
          },
        },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Lunch at the foot of the Great Wall', zh: '长城脚下午餐' } },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Return to the city and hit Wangfujing — the hundred-year \'Number One Street in China\' for shopping',
            zh: '返回市区，逛王府井大街扫货——百年金街，「中华第一街」',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '晚上' },
          content: {
            en: 'Sanlitun for dinner, drinks, and nightlife — the bars, the Village mall, the buzziest night in town',
            zh: '三里屯吃、购、喝、玩——酒吧街+Village商业区，北京夜生活的最前沿',
          },
        },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'Art & Ancient Temples', zh: '艺术与古刹' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: '798 Art District — galleries, cafés, and artist studios inside a converted factory complex',
            zh: '798艺术区——在老厂区里看画廊、艺术家工作室、各类展览',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: { en: 'Lunch in the 798 complex or a nearby Sanlitun restaurant', zh: '798园区内或三里屯附近用午餐' },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Lama Temple (Yonghe Gong) — Yongzheng\'s former mansion turned Tibetan Buddhist temple; don\'t miss the golden ginkgo avenue in autumn',
            zh: '雍和宫——雍正旧府改建的藏传佛教皇家寺院，秋季银杏大道金黄壮观',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '晚上' },
          content: {
            en: 'Crosstalk at Deyunshe, or a Peking Opera show at Liyuan Theater',
            zh: '德云社听相声，或到梨园剧场看一场地道京剧',
          },
        },
      ],
    },
    {
      dayNumber: 4,
      title: { en: 'Royal Gardens & Olympic Night', zh: '皇家园林与奥运之夜' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Summer Palace — the 728-meter Long Corridor, Kunming Lake, and the Tower of Buddhist Incense on Longevity Hill',
            zh: '颐和园——漫步728米长廊，泛舟昆明湖，登万寿山仰望佛香阁',
          },
        },
        {
          timeSlot: { en: 'Noon', zh: '中午' },
          content: {
            en: 'Exit via the North Palace Gate, take Metro Line 4 to Yuanmingyuan, lunch near the park',
            zh: '从颐和园北宫门出园，乘地铁4号线至圆明园站，园外午餐',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Old Summer Palace (Yuanmingyuan) ruins — see what the 1860 Anglo-French expedition left behind; then stroll the campus of Peking University or Tsinghua next door',
            zh: '圆明园凭吊八国联军留下的残垣断壁，顺路游览隔壁的清华园或北大未名湖',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '晚上' },
          content: {
            en: 'Olympic Park — the Bird\'s Nest and Water Cube lit up at night, an eternal Beijing classic',
            zh: '奥体中心看鸟巢、水立方的夜景，已成为北京永恒的经典',
          },
        },
      ],
    },
  ],
}

// 贴士数据 - 每座城市 3 类
const rawTips: Record<string, Omit<Tip, 'id' | 'sortOrder'>[]> = {
  chengdu: [
    {
      icon: 'transport',
      title: { en: 'Getting Around', zh: '交通指南' },
      items: {
        en: 'Shuangliu Airport (CTU) is 16 km from downtown — metro line 10 and airport bus 303 both run direct|Metro lines 1 and 2 cross at Tianfu Square and cover most major sights; get a Tianfu Tong card (¥20 deposit, 20% off) at any Hongqi supermarket, pharmacy, or metro station|Taxis start at ¥8 (¥9 for premium models) for 2 km, then ¥1.9/km; night surcharge applies 23:00–06:00 — always ask for the receipt|High-speed train to Dujiangyan or Mount Qingcheng takes about 30 min, ¥15; buses from Chadianzi or Xinnanmen stations also run',
        zh: '成都双流国际机场距市区16公里，地铁10号线、机场巴士303路直达市区|地铁1号线、2号线在天府广场交汇换乘，覆盖主要景点；可在红旗连锁、药房、地铁站办理天府通卡（押金20元，乘地铁公交8折，两小时内换乘免费）|出租车白天起步价8元（速腾2.0/1.4T为9元）含2公里，之后1.9元/公里，23-6点夜间加价，记得索要发票|去都江堰、青城山可乘高铁约30分钟，票价15元，茶店子、新南门汽车站也有直达班车',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿建议' },
      items: {
        en: 'Tianfu Square–Chunxi Road: most central, best for shopping, dining and transit — but pricier and louder|Kuanzhai Alleys area: courtyard-style boutique hotels and youth hostels, leafy and walkable, great nightlife|Wuhou Shrine–Jinli area: quiet Sichuan-style boutique hotels, surrounded by food|Wenshu Monastery area: low-key, good value, walking distance to snacks; book 1–2 weeks ahead in spring and autumn peak season',
        zh: '天府广场—春熙路商区：最市中心，购物餐饮与交通最佳，但房价偏高且较吵|宽窄巷子周边：宅院式精品酒店与青年旅舍集中，环境清幽步行方便，夜生活丰富|武侯祠—锦里一带：四川古民居风格特色酒店多，环境安静，美食众多|文殊院附近：清净且性价比高，步行可到地道小吃；春秋旺季建议提前1-2周预订',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Good to Know', zh: '温馨提示' },
      items: {
        en: 'See the pandas in the early morning — they sleep through the afternoon heat|Order hot pot "wei la" (mild) or go for the yuanyang half-and-half pot; dip in sesame oil and garlic to cool the heat|Chengdu sits in a basin — summers are humid and muggy, winters are damp and chilly around 5°C; pack accordingly|Sit down in any teahouse for a ¥20 cup of jasmine tea and stay as long as you like — that\'s the real Chengdu|Look for the free tourist shuttle buses between major sights (e.g. Wuhou Shrine to Mount Qingcheng, Dujiangyan, Panda Base) when you buy a ticket',
        zh: '看熊猫务必上午尽早前往，下午熊猫多在睡觉|吃火锅可点“微辣”或鸳鸯锅，蘸香油蒜泥碟更解辣，本地辣度偏高|成都属盆地气候，夏季闷热潮湿、冬季阴冷（均温5℃以上），注意备衣|茶馆消费亲民，一杯茉莉花茶约20元可坐一下午，是体验“巴适”生活的必修课|景区门口常有正规免费巴士直通其他景区（如武侯祠可乘车去青城山、都江堰、熊猫基地），购票即可乘坐',
      },
    },
    {
      icon: 'budget',
      title: { en: 'Budget & Costs', zh: '消费预算' },
      items: {
        en: 'Prices are moderate overall — a bowl of noodles costs ¥7–8 in a restaurant, ¥3–4 at a small street stall|Budget about ¥2,000 per person for 3 days (mid-range hotel + food + tickets)|Attractions cost more than food: Wuhou Shrine and Du Fu Cottage ¥60 each, Dujiangyan ¥90, Mount Qingcheng ¥90 (front) / ¥20 (back), Panda Base ¥58|Hot pot runs ¥60–80 per person at mid-range spots like Shu Jiuxiang; budget "fly restaurants" (cangying guanzi) like Ming Ting are ¥30–50|Pick up souvenirs at the Sichuan Specialty Mall on Yusha Road — broadest selection at fair prices',
        zh: '成都整体消费适中，餐厅一碗面约7-8元，小巷摊铺3-4元|3天行程人均预算约2000元（中档酒店+餐饮+门票）|景区消费偏高：武侯祠、杜甫草堂各60元，都江堰90元，青城山前山90元/后山20元，熊猫基地58元|中档火锅店如蜀九香人均约60-80元，苍蝇馆子如明婷饭店人均30-50元|伴手礼可到新华大道玉沙路的四川特产商城，种类最齐全、价格实惠',
      },
    },
  ],
  xian: [
    {
      icon: 'transport',
      title: { en: 'Getting Around', zh: '交通指南' },
      items: {
        en: 'Xi\'an Xianyang International Airport is about 25 km from downtown — airport bus costs ¥25+¥1 fuel surcharge across 6 lines; a taxi is about ¥120|Xi\'an Station handles regular trains; Xi\'an North Station is for high-speed rail and connects to downtown via Metro Line 2|Tourist bus Route 5 (306) from the East Square of the train station goes to the Terracotta Army (¥7, 1-1.5 hrs) — board only buses marked \'Shaanxi Tourism Bus\', ignore touts|Metro Line 2 runs north-south through the city (¥2-4); most buses are ¥1 (ordinary) or ¥2 (air-conditioned), exact change required',
        zh: '西安咸阳国际机场距市区约25公里，机场大巴25元/人（另加1元燃油费），共6条线路；出租车约120元|西安站为普通列车枢纽，西安北站为高铁动车专用站，地铁2号线直达市区|去兵马俑在火车站东广场乘游5（306）路，全程7元，车程1-1.5小时——只乘坐\'陕西旅游公交专线\'正规车，切勿轻信拉客人员|地铁2号线贯穿南北（票价2-4元）；普通公交1元、空调车2元，多数无人售票需自备零钱',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Important Tips', zh: '实用提示' },
      items: {
        en: 'Book Shaanxi History Museum free tickets ahead — only 4,000 issued daily (2,500 before 2 PM), or buy the ¥20 Treasure Gallery ticket to skip the queue|Hire a licensed guide at the Terracotta Army and the Forest of Steles — the stories bring the warriors and the calligraphy to life|In the Muslim Quarter, respect Hui Muslim customs: most halal restaurants ban alcohol and do not serve pork or blood products|For paomo, tear the flatbread into tiny pieces yourself — the smaller the pieces, the better the flavor|Beware \'antiques\' hawked as \'dug up from my own field\' — they are fakes; genuine finds should go to the cultural-relics bureau',
        zh: '陕西历史博物馆免费不免票，每日限发4000张（14:00前2500张、之后1500张），建议提前预约或买20元珍宝馆票免排队|兵马俑、碑林建议请持证讲解员，背后的故事让体验更生动|回民街请尊重回族穆斯林风俗：清真餐馆基本禁酒、不售猪肉与血类食品|吃泡馍时自己把馍掰得越小越好，做出来的味道才最佳|街上兜售的\'自家地里挖出的文物\'都是假货，切勿上当；真正的文物应报告文物部门',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿推荐' },
      items: {
        en: 'Bell Tower / Muslim Quarter (Beilin District) — most convenient for first-timers, walking distance to major sights and street food|Big Wild Goose Pagoda area (Yanta District) — quieter and nicer, great for night views, mid-range to upscale options|Budget travelers should try courtyard hostels like Xiangzimen and Qixian — Beilin and Yanta districts are the safest and best connected|Avoid unlicensed taxis around the train station when arriving with luggage; taxis change shift around 4-5 PM and are hard to hail',
        zh: '钟鼓楼/回民街附近（碑林区）：首次来西安首选，步行可达主要景点与美食|大雁塔附近（雁塔区）：环境较好、夜景优美，中高档酒店集中|湘子门、七贤等四合院青旅床位约50元起，富有古都韵味；碑林、雁塔两区治安好、出行方便|抵达时火车站周边黑车较多，请乘正规出租车；每天下午4-5点为出租车交班时间，较难打车',
      },
    },
    {
      icon: 'budget',
      title: { en: 'Budget & Climate', zh: '消费与气候' },
      items: {
        en: 'Xi\'an is affordable — budget about ¥2,000-3,000 for a 3-5 day trip; breakfast is around ¥10, mutton paomo ¥15-20, roujiamo ¥5-10|The Shaanxi Tourism Year Pass (¥98) covers nearly 100 sights including the City Wall, Tang Paradise, and Gao\'s Grand Courtyard — great value for longer stays|Temple and museum tickets can be pricey, and student discounts are often only 20-30% off rather than half price|The climate is dry with a big day-night temperature swing — bring moisturizer and sunscreen; spring (Mar-May) and fall (Sep-Nov) are the best seasons',
        zh: '西安消费适中，3-5天行程预算约2000-3000元；早餐约10元吃饱，羊肉泡馍15-20元一碗，肉夹馍5-10元一个|陕西旅游年票98元，可免费游览城墙、大唐芙蓉园、高家大院等近百个景点，长线游十分划算|部分景区门票较高，且学生证折扣多为7折、8折，未必是5折|气候干燥、早晚温差大，注意保湿防晒；春季（3-5月）与秋季（9-11月）是最佳旅游时间',
      },
    },
  ],
  beijing: [
    {
      icon: 'transport',
      title: { en: 'Getting Around', zh: '交通指南' },
      items: {
        en: 'Beijing has two civil airports — Capital International has three terminals (T1/T2/T3), so check which one your airline uses before you fly|Airport express train ¥25 to Dongzhimen; airport bus ¥16, about 1-1.5 hrs to downtown|Five major train stations (Beijing, West, South, North, East) — always double-check which one your ticket is for|The metro is the fastest way around and covers all major sights; get a transit card (¥20 deposit) for metro and bus',
        zh: '北京有两个民用机场——首都国际机场有T1、T2、T3三个航站楼，出发前务必核对所乘航班在哪个航站楼|机场快轨¥25直达东直门；机场巴士¥16，车程约1-1.5小时|北京有五个客运火车站（北京站、北京西、北京南、北京北、北京东），请仔细核对车票站点|地铁是市内最便捷的交通方式，覆盖主要景点；建议办一张公交一卡通（押金20元），地铁公交通用',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿推荐' },
      items: {
        en: 'Wangfujing / Dongdan — central, walkable to the Forbidden City and Tiananmen|Houhai / Nanluoguxiang — hutong courtyard hotels and youth hostels, perfect for culture lovers (try Beijing Guyun or Beiping Xiaoyuan)|Sanlitun / CBD — modern and international, great dining and nightlife|Book 1-2 weeks ahead for peak season (spring, autumn, and national holidays)',
        zh: '王府井/东单周边：市中心，步行可达故宫、天安门，北京饭店等老牌饭店云集|后海/南锣鼓巷周边：胡同四合院旅馆与青旅集中（如北京鼓韵青年旅舍、北平小院），文化爱好者首选|三里屯/CBD周边：现代时尚，国际餐饮与夜生活丰富|旺季（春秋两季、法定假日）建议提前1-2周预订',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Good to Know', zh: '温馨提示' },
      items: {
        en: 'Food inside the Forbidden City is limited to fast-food — bring snacks or eat after your visit|The daily flag-raising time at Tiananmen shifts with sunrise — check ahead and arrive early|Book Forbidden City and Great Wall tickets online in advance — they sell out fast|The Great Wall involves serious climbing and walking — wear comfortable shoes',
        zh: '故宫博物院内只有一些快餐店，建议自带干粮或游览完之后在外面找饭馆吃饭|天安门升旗时间随日出每日变动，建议提前查询升旗时间，早点动身|故宫、长城等热门景点需提前线上预约门票，旺季常约满|爬长城步行较多，请务必穿舒适的鞋子',
      },
    },
    {
      icon: 'budget',
      title: { en: 'Budget Reference', zh: '预算参考' },
      items: {
        en: 'Reference budget: about ¥2,000 per person for a comfortable 5-day trip|Beijing is reasonable for a capital — transport is cheap and attraction tickets are mostly ¥10-60|Peking duck at Quanjude is about ¥150/person; mid-range restaurants run ¥75-110|Snack streets like Gui Jie and Wangfujing offer meals from ¥50-80 per person',
        zh: '舒适5日游参考预算约2000元/人|相对首都而言北京物价并不算高，交通便宜，景点门票多在10-60元，没有天文数字|全聚德烤鸭人均约150元，中档餐厅人均75-110元|簋街、王府井小吃街人均50-80元就能吃饱吃好',
      },
    },
  ],
}

// 亮点图廊数据（每城若干张实景图，源自攻略 PDF）
const rawGalleries: Record<string, string[]> = {
  chengdu: [
    '/images/cities/chengdu/chengdu_p02_05.jpeg',
    '/images/cities/chengdu/chengdu_p03_12.jpeg',
    '/images/cities/chengdu/chengdu_p04_16.jpeg',
    '/images/cities/chengdu/chengdu_p07_22.jpeg',
    '/images/cities/chengdu/chengdu_p16_38.jpeg',
  ],
  xian: [
    '/images/cities/xian/xian_p15_50.jpeg',
    '/images/cities/xian/xian_p12_44.jpeg',
    '/images/cities/xian/xian_p02_05.jpeg',
    '/images/cities/xian/xian_p03_13.jpeg',
    '/images/cities/xian/xian_p05_18.jpeg',
  ],
  beijing: [
    '/images/cities/beijing/beijing_p04_17.jpeg',
    '/images/cities/beijing/beijing_p07_23.jpeg',
    '/images/cities/beijing/beijing_p08_24.jpeg',
    '/images/cities/beijing/beijing_p08_25.jpeg',
  ],
}

// 攻略文章数据
const rawGuides: Omit<Guide, 'id'>[] = [
  {
    slug: 'xian-3-day-classic-route',
    title: {
      en: '3 Days in Xi\'an: Terracotta Warriors, City Walls & Street Food',
      zh: '西安三日经典路线：兵马俑+城墙+回民街全攻略',
    },
    label: { en: '3 Days / 2 Nights', zh: '3天2晚' },
    excerpt: {
      en: 'First time in Xi\'an? This 3-day itinerary hits every must-see sight, takes you to the best street food spots, and includes practical transport tips. Follow it step by step.',
      zh: '第一次去西安怎么玩？这条路线涵盖必去景点、地道美食和交通避坑指南，新手直接照着走就行。',
    },
    content: {
      en: '<p>Xi\'an is one of those rare cities where 3,000 years of history doesn\'t just exist in museums — it\'s in the walls you walk on, the food you eat, and the streets you wander. This 3-day itinerary covers everything first-time visitors come for, plus a few local favorites most tourists miss.</p><h2>Day 1: Old Town East Side</h2><p>Kick off your morning at the Shaanxi History Museum, home to 370,000 artifacts spanning over a million years of human history. The free general admission tickets go fast — book them on WeChat three days ahead. The Tang Dynasty gold and silver collection (extra ticket) is absolutely worth the splurge.</p><p>From there, head to the Big Wild Goose Pagoda. Climb the pagoda for views over the city, then stick around the North Square for the musical fountain show — it\'s Asia\'s largest, and the nighttime version with lights is genuinely impressive.</p><p>Spend the afternoon on the Ancient City Wall. Rent a bike at Yongning Gate (the most dramatic entrance) and ride the full 13.7 km (8.5 mile) loop if you\'re up for it. Go an hour or two before sunset for golden light over the old town rooftops.</p><p>Finish your day with dinner in the Muslim Quarter. Try roujiamo (the original Chinese hamburger), mutton paomo (you tear the bread yourself — smaller pieces = better flavor), and a sweet persimmon cake for dessert.</p><h2>Day 2: Terracotta Army & Huaqing Palace</h2><p>Take the tourist bus (Route 5 / 306) from the train station to Lintong, about an hour outside the city. The Terracotta Army is the main event — three massive pits filled with thousands of life-sized clay soldiers, each with a unique face. Do yourself a favor and hire a guide at the entrance. The stories behind the warriors make the experience ten times more interesting.</p><p>Grab lunch in Lintong — try the local big plate chicken (da pan ji) or a bowl of youpo noodles. Afternoon is for Huaqing Palace, the imperial hot spring resort where Emperor Xuanzong and his consort Yang Guifei spent their winters. The Tang Dynasty bathhouse ruins are surprisingly well-preserved.</p><p>If you\'re visiting between April and October, book tickets for "The Song of Everlasting Sorrow" outdoor show in the evening. It\'s a massive light and dance production staged right on Mount Li — totally over the top and absolutely worth it. Spring for the center A-section seats if your budget allows.</p><h2>Day 3: Calligraphy, Food, & Tang Dynasty Glow</h2><p>Start at the Forest of Steles Museum, a collection of ancient stone tablets that\'s basically a library of Chinese calligraphy. Even if you can\'t read Chinese characters, the artistry of the brushwork is remarkable. It\'s also much quieter than the more popular sights.</p><p>For lunch, head to Yongxingfang, a food street dedicated to dishes from all over Shaanxi province. It\'s touristy but well done — you pay with a preloaded card and graze your way through dozens of stalls. Don\'t miss the bowl-smashing wine ritual for the full experience.</p><p>Spend the afternoon at the Small Wild Goose Pagoda and Jianfu Temple — a quieter, less crowded alternative to its bigger sibling. The grounds are peaceful and the Xi\'an Museum on site has a solid collection of local artifacts.</p><p>End your Xi\'an trip at the Grand Tang Mall, a pedestrian street done up in full Tang Dynasty style. It comes alive after dark with lights, performances, and costumed performers. It\'s kitschy, it\'s crowded, and it\'s the perfect way to say goodbye to this ancient city.</p>',
      zh: '<p>西安，十三朝古都，是一座历史在呼吸的城市。这条三日行程涵盖了初次到访者的必游精华。</p><h2>第一天：古城之心</h2><p>早晨从陕西历史博物馆开始，馆藏37万余件文物，跨越上百万年历史。免费门票务必提前3天预约。随后前往大雁塔，欣赏北广场音乐喷泉。</p><p>下午租一辆自行车，沿13.7公里的古城墙骑行。夕阳下的老城景色令人难忘。傍晚到钟鼓楼，然后钻进回民街，品尝肉夹馍、羊肉泡馍和柿子饼。</p><h2>第二天：兵马俑</h2><p>乘车前往临潼，亲眼见证世界第八大奇迹。兵马俑博物馆有三个主坑和铜车马展厅。强烈建议请一位持证讲解，每一个兵马俑背后的故事会让体验生动起来。</p><p>下午参观附近的华清宫，唐玄宗与杨贵妃的皇家温泉行宫。时间允许的话，晚上可以看震撼的《长恨歌》实景演出。</p><h2>第三天：书法、美食与盛唐</h2><p>从碑林博物馆开始，这是中国书法的宝库，汇集历代名家真迹。午餐去永兴坊，一条汇聚陕西各地美味的美食街。</p><p>下午参观小雁塔和荐福寺，比大雁塔更清幽、人更少。最后在大唐不夜城结束西安之旅，这条盛唐风情的步行街入夜后尤为璀璨。</p>',
    },
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
    readTime: { en: '8 min read', zh: '阅读 8 分钟' },
    views: { en: '23k reads', zh: '阅读 2.3w' },
    publishedAt: { en: '3 days ago', zh: '3天前' },
    featured: true,
  },
  {
    slug: 'beijing-off-the-beaten-path',
    title: {
      en: 'Beyond the Postcards: 5 Days of Real Beijing',
      zh: '北京深度游：避开人潮的小众玩法清单',
    },
    label: { en: '5 Days / 4 Nights', zh: '5天4晚' },
    excerpt: {
      en: 'There\'s way more to Beijing than the Forbidden City and the Great Wall. This guide takes you into the hutongs, hidden museums, and the food streets where locals actually eat.',
      zh: '不止故宫长城，带你走进老北京胡同、小众博物馆和本地人常去的美食街区。',
    },
    content: {
      en: '<p>Beijing gets a bad rap for being all crowds and pollution. Spend a little time digging past the surface, though, and you\'ll find a city of quiet hutongs, world-class museums, and a food scene that goes way beyond Peking duck. This 5-day itinerary mixes the classics with the off-the-beaten-path.</p><h2>The Icons — Done Right</h2><p>You can\'t skip the Forbidden City and the Great Wall — but you can do them smarter. For the Forbidden City, book your ticket online a week ahead, arrive when the doors open at 8:30 AM, and head straight to the back (the Imperial Garden) to work your way forward against the crowds. Climb Jingshan Park across the street afterward for the classic view over the golden rooftops.</p><p>For the Great Wall, skip Badaling (the most crowded section) and go to Mutianyu instead. It\'s restored, less crowded, and has a cable car up and a toboggan slide down (yes, really). Hire a driver for the day — it\'s not much more expensive than a group tour and you set your own schedule.</p><h2>Hutong Life</h2><p>The hutongs are where old Beijing still breathes. These narrow alleyways lined with courtyard homes were once the entire city — now they\'re a shrinking but vital part of what makes Beijing special. Rent a bicycle and spend a day getting lost around Nanluoguxiang, the Drum and Bell Towers, and Houhai lake. Stop at a courtyard cafe for a slow coffee, or better yet, book a home-cooked meal with a local family through a tour service.</p><p>Don\'t just stick to Nanluoguxiang itself — the real magic is in the side alleys where you\'ll find grandparents sitting on doorsteps, caged birds singing, and the smell of fried dough sticks from breakfast stalls.</p><h2>Hidden Museums & Local Food</h2><p>Beijing has some genuinely excellent museums that most tourists never visit. The Capital Museum has a beautifully curated collection of Beijing history and art, and it\'s free (book ahead). The Beijing Planning Exhibition Hall has a massive scale model of the entire city that\'s fascinating even if you don\'t read Chinese. And yes, the Beijing Watermelon Museum is real, and it\'s exactly as weird and wonderful as it sounds.</p><p>For food, skip the tourist restaurants around the major sights. Head to Gui Jie (Ghost Street) for late-night crayfish and hot pot, or find a tiny zhajiangmian shop tucked in a hutong — the ones with no English menu and a line of locals out the door are usually the best. End your trip with Peking Roast Duck at a heritage restaurant like Siji Minfu, and catch a Peking Opera or acrobatics show for a full-circle Beijing experience.</p>',
      zh: '<p>北京远不止那些明星景点。这条五日行程将经典与小众完美融合。</p><h2>皇家必游</h2><p>故宫和长城是必游项目。清晨到天安门广场看升旗，从午门进入故宫，然后登景山俯瞰金瓦红墙的经典全景。</p><p>长城可以避开人潮，选择慕田峪段，更清净、有缆车，包车一日游更省心。</p><h2>胡同生活</h2><p>胡同是老北京的灵魂。租一辆自行车，穿行南锣鼓巷、钟鼓楼、后海一带。在四合院咖啡馆小坐，到胡同人家吃一顿家常便饭。</p><h2>小众博物馆与本地美食</h2><p>北京藏着许多有趣的小博物馆：首都博物馆、北京市规划展览馆，乃至清奇的西瓜博物馆。美食方面避开游客店，去簋街吃夜宵小龙虾，或钻进胡同找一家小炸酱面馆。最后用一顿老字号烤鸭和一场京劇为旅程收尾。</p>',
    },
    image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800',
    readTime: { en: '10 min read', zh: '阅读 10 分钟' },
    views: { en: '18k reads', zh: '阅读 1.8w' },
    publishedAt: { en: '1 week ago', zh: '1周前' },
    featured: true,
  },
  {
    slug: 'chengdu-food-guide',
    title: {
      en: 'The Chengdu Food Guide: From Street Stalls to Time-Honored Classics',
      zh: '成都美食全指南：从街边摊到老字号一网打尽',
    },
    label: { en: 'Food Map', zh: '美食地图' },
    excerpt: {
      en: 'Hot pot, skewers, dan dan noodles, rabbit heads... 20 local-favorite spots from hole-in-the-wall stalls to century-old restaurants. Eat your way through Chengdu the right way.',
      zh: '火锅、串串、担担面、兔头……本地人私藏的20家宝藏店铺，照着吃不踩雷。',
    },
    content: {
      en: '<p>Chengdu was named a UNESCO City of Gastronomy for a reason. The capital of Sichuan is basically one giant, delicious, mouth-numbingly spicy restaurant. This guide takes you from sizzling hot pot to humble street snacks, with everything in between.</p><h2>The Main Event: Sichuan Hot Pot</h2><p>Beef tallow hot pot is the soul of Chengdu food. Rich, deep-red broth simmering with Sichuan peppercorns and dried chilies — that signature "mala" numbing-spicy flavor that makes Sichuan cuisine famous. Order the holy trinity: beef tripe, duck intestine, and yellow throat. Dip everything in a sesame oil and raw garlic bowl to cool the heat and amp up the flavor.</p><p>For classic hot pot, locals swear by Shu Daxia and Hai Di Lao (yes, the famous one — it\'s popular for a reason). For something a little more off the beaten path, try a smaller neighborhood spot — the ones with no English sign and a line out the door are usually the best.</p><h2>Street Food & Snacks</h2><p>Hot pot gets all the hype, but Chengdu\'s real magic is in its street food. Start with chuanchuan — cold pot skewers where you grab sticks of meat, veggies, and tofu from a spicy broth and pay by the skewer. It\'s like hot pot but faster, cheaper, and perfect for solo travelers.</p><p>Dan dan noodles are the classic Chengdu breakfast — thin wheat noodles tossed in a ground pork and chili oil sauce, named for the street vendors who once carried them on shoulder poles. And after all that spice, cool down with a bowl of bing fen — hand-rubbed ice jelly topped with brown sugar, glutinous rice cakes, and peanuts.</p><p>For the adventurous: spicy rabbit head. It\'s a Chengdu late-night staple, braised in five-spice or mala flavor. Yes, it\'s a rabbit head. Yes, locals love it. No, it\'s not for everyone. But if you\'re going to try it, Chengdu is the place.</p><h2>Time-Honored Classics</h2><p>Chengdu has no shortage of century-old eateries. Head to Long Chao Shou for wontons in spicy red oil, Zhong Dumplings for their signature sweet-spicy chili oil dumplings, and Fu Qi Fei Pian for sliced beef and offal in chili sauce. The portions are small, so order a few dishes and share — that\'s the Chengdu way.</p><p>No food tour of Chengdu is complete without a trip to a teahouse. Head to Heming Teahouse in People\'s Park for gaiwan (lidded bowl) tea, people-watching, and maybe even an ear-cleaning (it\'s exactly what it sounds like, and it\'s weirdly relaxing). Pair your tea with a bowl of sweet bean curd dessert and you\'ve got the perfect Chengdu afternoon.</p><p>One pro tip: when in doubt, order "wei la" (mild spicy). The local spice level is no joke.</p>',
      zh: '<p>成都是中国首座被联合国教科文组织授予"美食之都"称号的城市。本指南从热气腾腾的火锅到市井小吃一网打尽。</p><h2>成都之魂：川味火锅</h2><p>牛油锅底是正宗成都火锅的灵魂。必点"三宝"——毛肚、鸭肠、黄喉，蘸香油蒜泥碟既解辣又提香。本地老饕偏爱蜀大侠、龙抄手等品质稳定的老店。</p><h2>街头美味</h2><p>除了火锅，成都的小吃同样精彩。去烟火巷子里的串串店、传承百年的担担面担子，再来一碗手搓冰粉解辣。敢于挑战的话，麻辣兔头是本地人的心头好。</p><h2>老字号</h2><p>成都藏着不少百年老字号：龙抄手吃馄饨、钟水饺吃红油水饺、夫妻肺片吃凉拌牛杂。配一壶鹤鸣茶社的盖碗茶，才是完整的成都体验。记住：本地人都点微辣，怕辣就跟着他们点准没错。</p>',
    },
    image: '/images/cities/chengdu/chengdu_p03_13.jpeg',
    readTime: { en: '7 min read', zh: '阅读 7 分钟' },
    views: { en: '31k reads', zh: '阅读 3.1w' },
    publishedAt: { en: '5 days ago', zh: '5天前' },
    featured: true,
  },
  {
    slug: 'first-trip-to-china-guide',
    title: {
      en: 'First Trip to China: The Complete Planning Guide',
      zh: '第一次去中国怎么玩：新手超完全攻略',
    },
    label: { en: 'Beginner\'s Guide', zh: '新手指南' },
    excerpt: {
      en: 'Visas, payment apps, SIM cards, transport — everything you need to know before your first trip to China, all in one place.',
      zh: '签证、支付、APP、电话卡、交通……第一次去中国前你必须知道的一切，一篇文章全搞定。',
    },
    content: {
      en: '<p>Planning your first trip to China can feel daunting. The language barrier, the different payment systems, the sheer size of the country — it\'s a lot. This guide breaks down everything you need to know before you go, in plain English.</p><h2>Visas & Entry</h2><p>Most travelers need a tourist visa (L visa) to visit China. Apply at your nearest Chinese embassy or consulate with your passport, a passport photo, your itinerary, and hotel bookings. Processing usually takes about a week, but give yourself more time just in case.</p><p>Good news: China now offers 144-hour visa-free transit in several major cities including Beijing, Shanghai, Guangzhou, and Chengdu. If you\'re just passing through for a few days, you might not need a visa at all — check the latest rules before you book.</p><h2>Payment & Apps You\'ll Need</h2><p>Cash is basically obsolete in China. Almost everything is paid for with your phone — Alipay and WeChat Pay are the two big ones. The good news is both now let you link international credit cards, so you don\'t need a Chinese bank account. Set them up before you arrive and you\'ll be ready to go.</p><p>Download WeChat before your trip — it\'s not just for messaging, it\'s how you pay for things, book restaurants, and even navigate. For maps, use Baidu Maps or Amap (Gaode) — Google Maps doesn\'t work reliably in China. A VPN is useful if you want to access Google, Instagram, or other blocked sites.</p><h2>Getting Around</h2><p>China\'s high-speed rail network is the largest in the world and an absolute joy to ride. Fast, clean, comfortable, and surprisingly affordable. Book tickets through Trip.com or the 12306 app (the official one — it\'s in Chinese but reliable).</p><p>Within cities, the metro is your best bet. Clean, cheap, and extensive in all major cities. For getting around when the metro doesn\'t reach, use DiDi — it\'s basically the Chinese Uber and it\'s much cheaper than regular taxis.</p><p>One last thing: get a local SIM card or an eSIM at the airport when you arrive. Data is cheap and having a working phone makes everything so much easier.</p>',
      zh: '<p>第一次去中国旅行难免让人无从下手。本指南帮你理清最关键的事项。</p><h2>签证与入境</h2><p>大多数旅行者需要办理旅游签证（L签）。带上护照、照片、行程单和酒店预订单，到中国大使馆或领事馆办理。目前北京、上海等多个城市提供144小时过境免签政策。</p><h2>支付与APP</h2><p>中国几乎不用现金。出发前请注册好支付宝和微信支付，二者现已支持绑定国际信用卡。下载微信用于通讯，下载百度地图用于导航（Google服务需VPN）。</p><h2>交通出行</h2><p>中国高铁网络世界第一，乘坐体验极佳。可通过Trip.com或12306 App购票。城市内地铁干净、便宜、覆盖广。用滴滴打车也很方便实惠。</p>',
    },
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800',
    readTime: { en: '12 min read', zh: '阅读 12 分钟' },
    views: { en: '45k reads', zh: '阅读 4.5w' },
    publishedAt: { en: '2 weeks ago', zh: '2周前' },
    featured: false,
  },
  {
    slug: 'best-time-to-visit-china',
    title: {
      en: 'When to Visit China: A Season-by-Season Guide',
      zh: '什么时候去中国最好：四季旅行指南',
    },
    label: { en: 'Trip Planning', zh: '行程规划' },
    excerpt: {
      en: 'Spring flowers, summer mountains, autumn foliage, winter festivals. Here\'s when to visit every corner of China for the best weather and fewest crowds.',
      zh: '春花、夏山、秋叶、冬雪……带你找到中国每个地区最佳旅行时间。',
    },
    content: {
      en: '<p>China is huge — roughly the same size as the United States — so the best time to visit depends entirely on where you\'re going. The country stretches from tropical beaches in the south to Siberian-style winters in the north, and from coastal humidity to desert dryness in the west.</p><h2>Spring (March–May)</h2><p>Spring is probably the best overall time to visit most of China. Temperatures are mild, flowers are blooming, and crowds are thinner than peak summer or autumn. Beijing, Xi\'an, and the Yangtze River region are all at their best. The south is already warming up and the cherry blossoms in Wuhan and Shanghai are spectacular.</p><p>Watch out for Labor Day holiday in early May — it\'s one of China\'s biggest travel weeks, with crowds and price hikes everywhere. Book well ahead if you\'re traveling then.</p><h2>Autumn (September–November)</h2><p>Autumn ties with spring for the best season. Clear skies, crisp air, and golden foliage make it perfect for hiking the Great Wall, exploring Beijing\'s hutongs, or visiting the terraced rice fields of Guangxi. The weather in Xi\'an and Chengdu is also ideal this time of year.</p><p>The National Day holiday in early October is another peak travel period — the first week of October sees massive domestic travel. Avoid it if you can, or book everything months in advance.</p><h2>Summer & Winter</h2><p>Summer (June–August) is hot and humid across most of the country, especially in the south and the Yangtze River valley. It\'s also the rainy season in many areas. That said, it\'s a great time to head for the mountains — Yunnan, Tibet, and Qinghai are cooler and absolutely beautiful in summer.</p><p>Winter (December–February) is cold in the north — Beijing can drop well below freezing — but it has its advantages. The Harbin Ice Festival in the far northeast is genuinely spectacular, the major tourist sites are nearly empty, and prices are at their lowest. Head to the south (Yunnan, Hainan, Guangxi) if you want milder winter weather.</p>',
      zh: '<p>中国幅员辽阔，最佳旅行时间取决于你要去哪里。</p><h2>春季（3-5月）</h2><p>春季适合中国大部分地区。气温宜人、百花盛开、游客较少。北京、西安、长江流域都处于最佳状态。</p><h2>秋季（9-11月）</h2><p>秋季与春季并列最佳。天高气爽、蓝天白云、金色落叶，登长城、逛北京胡同再合适不过。</p><h2>夏冬两季</h2><p>夏季炎热潮湿，但适合去云南、西藏的山地避暑。冬季北方寒冷，但哈尔滨冰雪大世界如梦如幻，热门景点也少有人挤。</p>',
    },
    image: '/images/cities/beijing/beijing_p09_26.jpeg',
    readTime: { en: '6 min read', zh: '阅读 6 分钟' },
    views: { en: '15k reads', zh: '阅读 1.5w' },
    publishedAt: { en: '3 weeks ago', zh: '3周前' },
    featured: false,
  },
]

// ===== 构建函数：组装带 id / sortOrder 的最终数据 =====

let _cityId = 0
let _attractionId = 0
let _foodId = 0
let _itineraryId = 0
let _itemId = 0
let _tipId = 0
let _guideId = 0

// 组装完整数据（仅执行一次，作为模块级单例）
function buildCities(): City[] {
  return rawCities.map((raw) => {
    const slug = raw.slug

    // 组装景点
    const attractions: Attraction[] = (rawAttractions[slug] || []).map((a, i) => ({
      ...a,
      id: ++_attractionId,
      sortOrder: i,
    }))

    // 组装美食
    const foods: Food[] = (rawFoods[slug] || []).map((f, i) => ({
      ...f,
      id: ++_foodId,
      sortOrder: i,
    }))

    // 组装行程及行程条目
    const itineraries: Itinerary[] = (rawItineraries[slug] || []).map((it) => ({
      id: ++_itineraryId,
      dayNumber: it.dayNumber,
      title: it.title,
      items: it.items.map((itItem, j) => ({
        id: ++_itemId,
        timeSlot: itItem.timeSlot,
        content: itItem.content,
        sortOrder: j,
      })),
    }))

    // 组装贴士
    const tips: Tip[] = (rawTips[slug] || []).map((t, i) => ({
      ...t,
      id: ++_tipId,
      sortOrder: i,
    }))

    // 组装城市
    return {
      id: ++_cityId,
      name: raw.name,
      slug: raw.slug,
      description: raw.description,
      heroImage: raw.heroImage,
      tagline: raw.tagline,
      tags: raw.tags,
      region: raw.region,
      intro: raw.intro,
      history: raw.history,
      bestSeason: raw.bestSeason,
      duration: raw.duration,
      gallery: rawGalleries[slug] || [],
      attractions,
      foods,
      itineraries,
      tips,
    }
  })
}

// 组装攻略文章（分配 id）
function buildGuides(): Guide[] {
  return rawGuides.map(g => ({ ...g, id: ++_guideId }))
}

// 模块级单例数据
const cities: City[] = buildCities()
const guides: Guide[] = buildGuides()

// 合并各语言翻译包（ko/ja/th/de/fr/es/it...），再为缺失语言填充英文兜底，
// 保证页面代码 l[locale] 在任何语言下都有值
for (const [lang, pack] of Object.entries(contentPacks)) {
  for (const city of cities) {
    mergeLanguagePack(city, pack.cities?.[city.slug], lang, `cities.${city.slug}`)
  }
  for (const guide of guides) {
    mergeLanguagePack(guide, pack.guides?.[guide.slug], lang, `guides.${guide.slug}`)
  }
}
fillLocaleFallbacks(cities)
fillLocaleFallbacks(guides)

// ===== 访问函数（供页面在构建时直接调用） =====

// 城市摘要列表（首页卡片）
export function getCities(): CitySummary[] {
  return cities.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    heroImage: c.heroImage,
    tagline: c.tagline,
    tags: c.tags,
    region: c.region,
  }))
}

// 根据 slug 获取城市完整详情
export function getCityBySlug(slug: string): City | null {
  return cities.find(c => c.slug === slug) || null
}

// 全部攻略文章
export function getGuides(): Guide[] {
  return guides
}

// 精选攻略文章
export function getFeaturedGuides(): Guide[] {
  return guides.filter(g => g.featured)
}

// 根据 slug 获取攻略文章
export function getGuideBySlug(slug: string): Guide | null {
  return guides.find(g => g.slug === slug) || null
}
