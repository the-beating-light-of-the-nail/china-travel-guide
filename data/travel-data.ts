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
import { fermentedVideoGroups } from './fermented-videos'
import type { FermentedVideoGroup } from './fermented-videos'
import { airportVideoGroups, halalVideoGroups, versusVideoGroups, realVoicesVideoGroups, streetFoodVideoGroups, hotPotVideoGroups, foodTourVideoGroups } from './chengdu-food-videos'
import { railVideoGroups } from './beijing-xian-videos'

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

/** guide 内嵌 FAQ：折叠面板渲染 + FAQPage JSON-LD */
export interface GuideFaq {
  q: L
  a: L
}

/** guide 尾部互链（localePath 路由 chip） */
export interface GuideRelatedLink {
  to: string
  label: L
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
  /** 可选：正文后的分组视频架（B 站封面卡片 + 外链，见 data/fermented-videos.ts） */
  videos?: FermentedVideoGroup[]
  /** 可选：FAQ 折叠面板（同时注入 FAQPage 结构化数据） */
  faq?: GuideFaq[]
  /** 可选：尾部互链 chips */
  relatedLinks?: GuideRelatedLink[]
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
  {
    slug: 'guizhou',
    name: { en: 'Guizhou', zh: '贵州' },
    region: { en: 'Southwest China', zh: '中国西南' },
    tagline: { en: 'Waterfalls, karst peaks and the world\'s highest bridges', zh: '山地公园省 · 瀑布与桥梁博物馆' },
    tags: { en: 'Huangguoshu Waterfall,Fanjingshan,Miao & Dong Villages,World\'s Highest Bridges,Cool Summers', zh: '黄果树瀑布,梵净山,苗侗村寨,世界第一高桥,清凉避暑' },
    heroImage: '/images/cities/guizhou/fanjingshan_2.jpg',
    description: {
      en: 'A mountain province in China\'s southwest that foreign travelers are only now discovering: Asia\'s biggest waterfall (Huangguoshu), a UNESCO "Castle in the Sky" peak (Fanjingshan), the largest Miao village on earth, and — since September 2025 — the world\'s highest bridge. Half of the world\'s 100 tallest bridges span its karst gorges, summer stays a cool 23°C, and prices remain among the friendliest in China.',
      zh: '中国西南正在被世界发现的"山地公园省"：亚洲最大瀑布黄果树、UNESCO 世界自然遗产"天空之城"梵净山、全球最大的苗寨，以及 2025 年 9 月通车的世界第一高桥。全球前 100 座高桥近半数横跨其喀斯特峡谷，夏季均温 23℃ 的凉爽与全国前列的旅行性价比，让贵州成为入境游的新晋顶流。',
    },
    intro: {
      en: 'Guizhou is the China travel brochures forgot — until recently. Ninety-two percent of the province is mountains and the old saying went "no three flat li of land, no three days without rain," which kept mass tourism away and left the karst scenery, the terraced valleys and the Miao, Dong and Buyi villages beautifully intact. Guiyang, the laid-back capital, is your gateway: from here high-speed rail radiates to Anshun for the thundering Huangguoshu Waterfall, to Libo for the emerald pools of Xiaoqikong, and to Kaili for the thousand stilted houses of Xijiang Miao Village. Since September 2025 the Huajiang Canyon Bridge — 625 meters above the Beipan River, the highest bridge on earth — has become a destination in its own right. Come for the scenery, stay for the sour soup, the bridge views and prices that feel a decade behind Shanghai.',
      zh: '贵州曾是旅行册子遗忘的角落——全省 92.5% 是山地，"地无三里平、天无三日晴"的老话挡住了大众旅游，却完好保存了喀斯特山水、梯田河谷与苗、侗、布依族的村寨。省会贵阳是最佳门户：高铁向四周辐射，西去安顺看黄果树瀑布，南到荔波小七孔的翡翠水潭，东南进西江千户苗寨的千栋吊脚楼。2025 年 9 月，距北盘江面 625 米的世界第一高桥——花江峡谷大桥通车，本身即成目的地。为风景而来，为酸汤、大桥与"落后上海十年"的物价而留下。',
    },
    history: {
      en: 'Made a province in 1413 under the Ming dynasty; for centuries China\'s most isolated heartland, which allowed 17 minority cultures to survive intact. The same mountains that once kept Guizhou poor and unknown now draw travelers chasing what the rest of China has paved over.',
      zh: '明永乐十一年（1413 年）建省。因群山阻隔长期是中国最孤立的腹地，却也让 17 个世居少数民族的文化完整存续至今。曾经让贵州贫困闭塞的大山，如今正是旅行者追逐的"未被铺平的中国"。',
    },
    bestSeason: {
      en: 'May–October; July–August is cool 23°C high season (book Fanjingshan days ahead), September–October brings fewer crowds and golden rice terraces at Wanfenglin',
      zh: '5-10月最佳；7-8月均温约23℃是避暑旺季（梵净山需提前数日预约），9-10月人少且万峰林稻田金黄',
    },
    duration: {
      en: '5–7 days recommended (Guiyang + Anshun + Qiandongnan; add Tongren for Fanjingshan)',
      zh: '建议5-7天（贵阳+安顺+黔东南；梵净山再加铜仁1-2天）',
    },
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
  guizhou: [
    {
      name: { en: 'Huangguoshu Waterfall', zh: '黄果树瀑布' },
      image: '/images/cities/guizhou/huangguoshu_1.jpg',
      location: { en: 'Zhenning, Anshun (about 45 min from Anshun West station)', zh: '安顺市镇宁布依族苗族自治县（距安顺西站约45分钟车程）' },
      duration: { en: '1 full day (three scenic areas)', zh: '建议1天（含三大景区）' },
      ticket: { en: '¥160 peak / ¥150 off-season, includes Doupotang & Tianxingqiao', zh: '旺季¥160 / 淡季¥150，含陡坡塘与天星桥' },
      highlight: { en: 'Asia\'s largest waterfall', zh: '亚洲第一大瀑布' },
      description: {
        en: 'At 77.8 meters high and 101 meters wide, Huangguoshu is the biggest waterfall in Asia and the reason most first-time visitors come to Guizhou. The circuit links three areas — Doupotang\'s broad curtain (of Journey to the West fame), the main falls where you can walk 134 meters behind the water in the Water Curtain Cave, and the stone forests and pools of Tianxingqiao. Flow peaks June–August; in summer there\'s also a night light show. Come at opening time, do the main falls first, and expect to get misted.',
        zh: '高77.8米、宽101米的黄果树是亚洲第一大瀑布，也是多数初次来贵州的理由。景区由三部分组成：《西游记》片尾取景的陡坡塘、可在 134 米长水帘洞中从瀑布背后穿行的主瀑，以及石林与水潭交错的天星桥。6-8 月水量最盛，夏季另有夜间灯光秀。建议开门即入、先看主瀑，做好被水雾打湿的准备。',
      },
    },
    {
      name: { en: 'Fanjingshan (Mount Fanjing)', zh: '梵净山' },
      image: '/images/cities/guizhou/fanjingshan_1.jpg',
      location: { en: 'Tongren, East Gate (Jiangkou) is the main entrance', zh: '铜仁市江口县（东门为主要入口）' },
      duration: { en: '1 full day', zh: '建议1天' },
      ticket: { en: '¥100 entry + ¥20 shuttle; cable car extra — book days ahead, daily cap sells out', zh: '门票¥100 + 观光车¥20；索道另计——需提前数日预约，每日限售' },
      highlight: { en: 'UNESCO "Castle in the Sky", 2,572 m', zh: 'UNESCO世界自然遗产 · 2572米"天空之城"' },
      description: {
        en: 'The main peak of the Wuling Mountains and a UNESCO World Heritage site, Fanjingshan is the single most dramatic summit in China: the Red Clouds Golden Summit is a 100-meter spire split in two, the two mini-temples on top joined by a stone bridge above the clouds. The Mushroom Stone balancing rock is the other icon. Most visitors take the cable car and climb stairs for the final push; hardcore hikers can tackle the ~8,888-step pilgrim route. Go early for the sea of clouds — and book the daily-capped tickets well in advance.',
        zh: '武陵山脉主峰、世界自然遗产，中国最险峻壮观的山顶：红云金顶是一座百米孤峰，山体一分为二，峰顶两座小庙由石桥凌空相连，云海之上恍若"天空之城"；平衡矗立的蘑菇石是另一标志。多数人乘索道上山后徒步登顶，硬核徒步者可挑战约 8888 级台阶的朝圣古道。想看云海务必赶早，且务必提前预约每日限售门票。',
      },
    },
    {
      name: { en: 'Xijiang Qianhu Miao Village', zh: '西江千户苗寨' },
      image: '/images/cities/guizhou/xijiang.jpg',
      location: { en: 'Leishan County, Qiandongnan (about 2.5 hrs from Guiyang)', zh: '黔东南州雷山县（距贵阳约2.5小时车程）' },
      duration: { en: 'Half a day + one night for the lights', zh: '建议半天+住一晚看夜景' },
      ticket: { en: '¥90 + sightseeing bus ¥20', zh: '门票¥90 + 观光车¥20' },
      highlight: { en: 'The largest Miao village on earth', zh: '全球最大苗寨 · 千栋吊脚楼' },
      description: {
        en: 'More than 1,200 stilted wooden houses spill down both sides of a river valley — the biggest Miao settlement in the world and the best place to experience Miao culture: long-table feasts, silver headdresses, rice wine toasts and a hillside viewpoint where the village lights up like a constellation after dark. It gets touristic by day; stay overnight and the village returns to its residents (and the smoke of their kitchen fires) in the evening.',
        zh: '1200 余栋吊脚楼沿河谷两侧铺满山坡——全球最大的苗族聚居村寨，也是体验苗文化的最佳现场：长桌宴、银饰盛装、拦门米酒，入夜后山坡观景台上看万家灯火如星河铺开。白天游客较多，住上一晚，傍晚后的村寨才回到炊烟与本地人的生活里。',
      },
    },
    {
      name: { en: 'Libo Xiaoqikong', zh: '荔波小七孔' },
      image: '/images/cities/guizhou/xiaoqikong.jpg',
      location: { en: 'Libo County, Qiannan (HSR from Guiyang about 1 hr to Libo)', zh: '黔南州荔波县（贵阳高铁约1小时达荔波）' },
      duration: { en: '1 full day', zh: '建议1天' },
      ticket: { en: '¥130 + shuttle bus ¥40', zh: '门票¥130 + 景区观光车¥40' },
      highlight: { en: 'Emerald pools and a 68-step waterfall chain', zh: '翡翠色水潭 · 68级跌水瀑布' },
      description: {
        en: 'Named after a little seven-arch stone bridge from the Daoguang era, Xiaoqikong is a 7 km valley of impossibly green water: the 68-step waterfall chain, the Water Forest where you wade between trees, and the Mandarin Duck Lakes where you can kayak in glass-clear water. Part of the South China Karst UNESCO site, Libo is the swim-stop of any Guizhou trip — bring a change of clothes in summer.',
        zh: '小七孔因道光年间的七孔石桥得名，是一条 7 公里长的"绿到不真实"的峡谷水景：68 级跌水瀑布、可在树间涉水的上森林、能划皮划艇的翡翠色鸳鸯湖。作为"中国南方喀斯特"世界自然遗产的一部分，荔波是贵州行程里的亲水站——夏天记得带替换衣物。',
      },
    },
    {
      name: { en: 'Huajiang Canyon Bridge', zh: '花江峡谷大桥' },
      image: '/images/cities/guizhou/huajiang_bridge.jpg',
      location: { en: 'Anshun–Qiannan border, on the G65 highway (about 1.5 hrs from Guiyang)', zh: '安顺与黔南交界处，G65高速上（距贵阳约1.5小时）' },
      duration: { en: '1 hour viewing stop', zh: '建议1小时观景' },
      ticket: { en: 'Free to cross; canyon viewing area ticketed', zh: '过桥免费；峡谷观景区域另收费' },
      highlight: { en: 'The world\'s highest bridge — 625 m above the river', zh: '世界第一高桥 · 距江面625米' },
      description: {
        en: 'Opened on September 28, 2025, the Huajiang Canyon Bridge took the world\'s-highest title at 625 meters above the Beipan River, with a 1,420-meter main span — cutting a two-hour mountain detour to a two-minute crossing. Guizhou is sometimes called the world\'s bridge museum: nearly half of the planet\'s 100 highest bridges are here, built across canyon after canyon. Drop a stone off the viewing area and count eleven seconds before it lands.',
        zh: '2025 年 9 月 28 日通车，花江峡谷大桥以距北盘江面 625 米、主跨 1420 米拿下"世界第一高桥"，把两小时的山路绕行变成两分钟跨越。贵州被称为"世界桥梁博物馆"——全球最高的 100 座桥里近一半在这里。站在观景平台丢一块石头，数到 11 秒才会落地。',
      },
    },
    {
      name: { en: 'Qingyan Ancient Town', zh: '青岩古镇' },
      image: '/images/cities/guizhou/qingyan.jpg',
      location: { en: 'Huaxi District, Guiyang (about 29 km south of downtown)', zh: '贵阳市花溪区（市区以南约29公里）' },
      duration: { en: 'Half a day', zh: '建议半天' },
      ticket: { en: 'Free to wander; ¥60 combo ticket for temples & city wall', zh: '进镇免费；寺庙城墙联票¥60' },
      highlight: { en: 'Ming-era stone garrison town', zh: '明代军屯石城 · 600年古镇' },
      description: {
        en: 'Built in 1378 as a Ming military garrison, Qingyan is a compact town of stone walls, stone lanes and stone houses an easy half-day trip from Guiyang. Climb the city wall for rooftop views, then snack your way through the lanes: rose candy (guiyang\'s favorite souvenir), zhuanti pig trotters, chicken-chili and tofu fruit. Quietest in the morning before tour buses arrive.',
        zh: '明洪武十一年（1378 年）建屯，青岩是一座石墙、石巷、石屋的明代军屯古镇，从贵阳出发半天即可往返。登城墙看层层屋瓦，然后沿街一路吃过去：玫瑰糖、状元蹄、鸡辣角、恋爱豆腐果。趁旅行团到达前的上午最清净。',
      },
    },
    {
      name: { en: 'Jiaxiu Tower', zh: '甲秀楼' },
      image: '/images/cities/guizhou/jiaxiu.jpg',
      location: { en: 'Nanming River, downtown Guiyang', zh: '贵阳市中心 · 南明河上' },
      duration: { en: '1 hour, best at dusk', zh: '建议1小时，傍晚最佳' },
      ticket: { en: 'Free', zh: '免费' },
      highlight: { en: 'Guiyang\'s 400-year-old symbol', zh: '贵阳城市地标 · 400年名楼' },
      description: {
        en: 'Built in 1598 on a giant rock in the middle of the Nanming River, the three-tiered Jiaxiu Tower ("First Scholar\'s Tower") is the symbol of Guiyang — and a free one. Come at dusk when the pavilion lights up against the skyline of glass towers behind it, then walk along the riverside promenade into the city\'s night-food streets. It anchors an easy evening: tower, riverside walk, then late-night sour soup and barbecue nearby.',
        zh: '始建于明万历二十六年（1598 年），三层飞楼建于南明河鳌矶石上，"甲秀"取科甲挺秀之意，是贵阳的城市象征，且免费开放。傍晚亮灯时来，古楼背后即是玻璃幕墙天际线，拍完沿河步行道走进夜宵街区：甲秀楼—河边散步—深夜酸汤与烧烤，一晚刚好。',
      },
    },
    {
      name: { en: 'Wanfenglin (Forest of Ten Thousand Peaks)', zh: '万峰林' },
      image: '/images/cities/guizhou/wanfenglin.jpg',
      location: { en: 'Xingyi, Qianxinan (about 1 hr HSR from Guiyang)', zh: '黔西南州兴义市（贵阳高铁约1小时）' },
      duration: { en: 'Half a day', zh: '建议半天' },
      ticket: { en: 'About ¥80 with sightseeing bus', zh: '约¥80（含观光车）' },
      highlight: { en: 'A "forest" of thousands of karst cones', zh: '万座锥状喀斯特峰林' },
      description: {
        en: 'Ming-era traveler Xu Xiake wrote: "Of all the peaks under heaven, only here do they form a forest." Wanfenglin is exactly that — thousands of green karst cones marching to the horizon, ringed by villages and rice fields you can cycle between. September–October turns the valley floor gold. It\'s the most relaxed sight in Guizhou: rent a bike or take the sightseeing bus, eat egg-fried rice cooked with local rice in a village, and watch the cones drift by.',
        zh: '明代徐霞客写下"天下山峰何其多，唯有此处峰成林"。万峰林正是如此——数千座绿色锥状峰林绵延到天际，村庄与稻田散落其间，可骑行穿梭。9-10 月谷底稻田一片金黄，是贵州最松弛的景区：租一辆自行车或坐观光车，在村里吃一碗蛋炒饭，看峰林缓缓后退。',
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
    {
      name: { en: 'Sour-Soup Dumplings (Suan Tang Shui Jiao)', zh: '酸汤水饺' },
      image: '/images/dumplings/suantang-shuijiao.jpg',
      highlight: { en: 'The Muslim Quarter\'s after-midnight warmer', zh: '回民街的深夜暖身神器' },
      description: {
        en: 'Beef or lamb dumplings floating in a broth sharpened with black vinegar, white pepper and chili — halal Xi\'an\'s answer to a cold night, ladled in the Muslim Quarter until 2 AM. The soup is half the order: sour first, peppery second, beefy last. Add table vinegar and chili like the locals, and pay dumpling prices, not restaurant ones.',
        zh: '牛羊肉馅水饺泡在香醋、白胡椒和辣子调出的酸汤里——这是西安对寒夜的回答，回民街的店会舀到凌晨两点。汤占一半：先酸、再胡椒香、最后是肉味。学本地人加桌上的醋和辣子，价格还是饺子的价格。',
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
    {
      name: { en: 'Baozi & Jiaozi (Qingfeng Breakfast)', zh: '庆丰包子与胡同水饺' },
      image: '/images/dumplings/baozi.jpg',
      highlight: { en: '¥2 steam-tower breakfasts and midnight dumplings', zh: '两块钱的蒸笼早餐与深夜饺子馆' },
      description: {
        en: 'Beijing\'s wrapper-food credentials: breakfast baozi sold from bamboo steamers stacked a meter high (Qingfeng is the famous chain), usually ¥2–3 a piece with a vegetarian pumpkin option hiding on the menu; and hutong jiaozi shops boiling pork-and-cabbage plates at midnight for ¥15. Dip in black vinegar with raw garlic, and you are eating like a local without trying.',
        zh: '北京的「带馅」底气：早餐窗口把竹蒸笼摞到一人高（庆丰就是那家名店），包子两三块一个，菜单里常藏着南瓜素包；胡同饺子馆的猪肉白菜水饺 ¥15 一盘开到半夜。黑醋加生蒜泥一蘸，不费力地像本地人一样吃饭。',
      },
    },
  ],
  guizhou: [
    {
      name: { en: 'Sour Soup Fish (Suantangyu)', zh: '酸汤鱼' },
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
      highlight: { en: 'The soul of Guizhou cooking — sour, not spicy', zh: '贵州味道的灵魂 · 酸鲜不辣' },
      description: {
        en: 'Guizhou\'s signature dish: whole fish poached in a bubbling red-orange broth fermented from local tomatoes and rice. The sourness is natural, bright and addictive — locals say "three days without sour soup and even the best meal feels bland." Dip the fish in chili-soy, drink the broth straight, and finish by dumping rice noodles into the pot. Miao-style (white sour, from rice) and Kaili-style (red sour, from tomato) are the two schools to try.',
        zh: '贵州的招牌菜：整鱼入锅，煮在由本地番茄与大米自然发酵的红酸汤里。酸味天然、明亮、越喝越上瘾——本地人说"三天不吃酸，走路打蹿蹿"。鱼肉蘸辣椒水，先喝汤，最后下米粉收尾。苗家白酸（米汤发酵）与凯里红酸（番茄发酵）是两大流派，都值得试。',
      },
    },
    {
      name: { en: 'Huaxi Beef Rice Noodles', zh: '花溪牛肉粉' },
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      highlight: { en: 'Guiyang\'s proudest breakfast', zh: '贵阳人最骄傲的一碗早餐' },
      description: {
        en: 'Rice noodles in a clear beef broth simmered for hours, topped with braised beef slices, pickled mustard greens, coriander and a spoon of chili — this is the dish Guiyang people argue about which stall does best (the Huaxi district originals win most debates). Order "jia fen" (add noodles) if you\'re hungry; locals add a fried egg and an extra scoop of beef tallow. Breakfast-only ritual: queues peak before 9 AM.',
        zh: '大骨牛肉汤底熬数小时，米粉烫熟后铺上酱黄牛肉片、酸菜、香菜，再加一勺糊辣椒——这是贵阳人为"哪家最正宗"能吵起来的菜（花溪本地的老店赢面最大）。饿了就说"加粉"，本地人标配再加一个煎蛋、一勺牛油。这是只在早餐时段的仪式感：9 点前排队最长。',
      },
    },
    {
      name: { en: 'Bayberry Juice & Bingjiang', zh: '杨梅汤与冰浆' },
      image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800',
      highlight: { en: 'The iced antidote to a bridge-view summer', zh: '夏天看桥爬山的解暑标配' },
      description: {
        en: 'Two cold drinks you\'ll find everywhere in Guizhou. Bayberry (yangmei) juice is dark red, sweet-sour and served over ice — Xingyi and Qingyan versions are famous. Bingjiang ("ice paste") is Guiyang\'s slushie: fruit, ice and glutinous rice blended into a drinkable snack, best known in peach and watermelon flavors. After a Fanjingshan climb or a Huajiang bridge stop in 30-degree heat, these two are worth planning a route around.',
        zh: '在贵州随处可见的两款冷饮：杨梅汤红得发紫、酸甜透心，兴义和青岩的最有名；冰浆是贵阳特供"可以喝的水果"——水果、冰与糯米一起打成浆，桃子和西瓜味最经典。爬完梵净山、看完花江大桥的 30℃ 盛夏，这两样值得专门绕路去喝。',
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
  guizhou: [
    {
      dayNumber: 1,
      title: { en: 'Guiyang: Gateway City & First Sour Soup', zh: '贵阳：门户城市与第一口酸汤' },
      items: [
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Arrive at Guiyang Longdongbao airport or Guiyang North HSR station; check in near Qingyun Shi (青云市集) for the night-market street-food block',
            zh: '抵达贵阳龙洞堡机场或贵阳北站，住在青云市集附近，晚上夜市步行可达',
          },
        },
        {
          timeSlot: { en: 'Dusk', zh: '傍晚' },
          content: {
            en: 'Jiaxiu Tower at lighting-up time — the 400-year-old pavilion against the glass-tower skyline, then walk the Nanming riverfront',
            zh: '亮灯时分看甲秀楼——400年古楼对望玻璃幕墙天际线，沿南明河散步',
          },
        },
        {
          timeSlot: { en: 'Dinner', zh: '晚上' },
          content: {
            en: 'First sour soup fish of the trip, plus a bowl of huaxi beef noodles if you\'re still hungry — Guiyang food streets run past midnight',
            zh: '旅程第一顿酸汤鱼，没吃饱再来一碗花溪牛肉粉——贵阳的美食街开到凌晨',
          },
        },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Qingyan Ancient Town & the World\'s Highest Bridge', zh: '青岩古镇与世界第一高桥' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Bus or taxi to Qingyan Ancient Town (45 min) — walk the Ming stone walls before the tour buses arrive, snack on rose candy and zhuanti trotters',
            zh: '乘车前往青岩古镇（约45分钟），趁旅行团未到登明代石城墙，路上玫瑰糖、状元蹄边走边吃',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Drive 1.5 hrs to the Huajiang Canyon Bridge viewpoint — stand under the 625-meter world\'s highest bridge, watch trucks cross the abyss in two minutes',
            zh: '驱车1.5小时到花江峡谷大桥观景处——在625米高的世界第一高桥下仰望，看货车两分钟跨越深渊',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '傍晚' },
          content: {
            en: 'Return to Guiyang or overnight in Anshun (closer to tomorrow\'s waterfall); Anshun\'s laneway barbecue is a local secret',
            zh: '返回贵阳或宿安顺（离明天的瀑布更近）；安顺巷子里的烙锅烧烤是本地人的秘密',
          },
        },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'Huangguoshu Waterfall, Full Circuit', zh: '黄果树瀑布全天大环线' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Enter at opening time, do the main falls first and walk the 134-meter Water Curtain Cave behind the water; flow is loudest June–August',
            zh: '开园即入，先看主瀑布，再从134米长的水帘洞从瀑布背后穿行；6-8月水量最震撼',
          },
        },
        {
          timeSlot: { en: 'Midday', zh: '中午' },
          content: {
            en: 'Shuttle to Doupotang, the wide curtain from the Journey to the West credits, then Tianxingqiao\'s stone-forest boardwalks',
            zh: '摆渡车去陡坡塘——《西游记》片尾的宽幅水帘，再走天星桥的石林栈道',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '傍晚' },
          content: {
            en: 'In summer, stay for the night light show over the falls; otherwise take the HSR back to Guiyang (about 40 min from Anshun West)',
            zh: '夏季可留下看瀑布灯光秀；否则从安顺西站高铁返回贵阳（约40分钟）',
          },
        },
      ],
    },
    {
      dayNumber: 4,
      title: { en: 'Libo Xiaoqikong: The Emerald Valley', zh: '荔波小七孔：翡翠峡谷' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'HSR from Guiyang to Libo (about 1 hr), then shuttle to Xiaoqikong\'s West Gate; work downstream along the 68-step waterfall chain',
            zh: '贵阳高铁至荔波（约1小时），转车到小七孔西门，沿68级跌水瀑布顺流而下',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Wade the Water Forest, kayak the glass-green Mandarin Duck Lakes, and end at the little seven-arch bridge that gives the valley its name',
            zh: '在水上森林涉水前行，鸳鸯湖划皮划艇，最后到达给峡谷命名的七孔古石桥',
          },
        },
        {
          timeSlot: { en: 'Evening', zh: '傍晚' },
          content: {
            en: 'Overnight in Libo county town — riverside night market with yangmei juice and grilled fish',
            zh: '宿荔波县城——河滨夜市喝杨梅汤、吃烤鱼',
          },
        },
      ],
    },
    {
      dayNumber: 5,
      title: { en: 'Xijiang Miao Village & the Night of a Thousand Lights', zh: '西江千户苗寨：万家灯火之夜' },
      items: [
        {
          timeSlot: { en: 'Morning', zh: '上午' },
          content: {
            en: 'Bus or car from Libo to Xijiang Qianhu Miao Village (about 3 hrs; tours run Guiyang→Xijiang in 2.5)',
            zh: '从荔波乘车前往西江千户苗寨（约3小时；贵阳出发约2.5小时）',
          },
        },
        {
          timeSlot: { en: 'Afternoon', zh: '下午' },
          content: {
            en: 'Cross the wind-rain bridge, watch the free Miao song-and-dance show, try a long-table feast with rice-wine toasts',
            zh: '过风雨桥，看苗族歌舞表演，体验敬米酒的长桌宴',
          },
        },
        {
          timeSlot: { en: 'Night', zh: '夜晚' },
          content: {
            en: 'Ride the sightseeing bus to the hillside viewpoint: 1,200 stilted houses lighting up like a constellation. Stay overnight — the village belongs to locals after the day trippers leave',
            zh: '乘观光车上山坡观景台：1200栋吊脚楼的灯火如星河亮起。务必住一晚——一日游客离开后，村寨才是本地人的',
          },
        },
        {
          timeSlot: { en: 'Extension', zh: '延伸' },
          content: {
            en: 'With 2 more days, go north to Tongren for Fanjingshan (cable car + Golden Summit) and the 8,888-step pilgrim route',
            zh: '若还有2天，北上铜仁登梵净山（索道+红云金顶），挑战8888级朝圣台阶',
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
  guizhou: [
    {
      icon: 'transport',
      title: { en: 'Getting Around', zh: '交通指南' },
      items: {
        en: 'Guiyang Longdongbao airport (KWE) links to most Chinese hub cities; the HSR station is Guiyang North or Guiyang East|High-speed rail is the backbone: Anshun West 40 min, Libo 1 hr, Xingyi (Wanfenglin) 1 hr, Kaili 40 min — buy on Trip.com or 12306 with a passport|Huangguoshu has no train station access from Anshun West: tourist buses and Didi are the way; a day tour van costs ¥100–150 per seat|Distances are deceiving in a mountain province — always plan by rail time, not map distance; renting a car gives the most bridge-and-canyon freedom|Taxis in Guiyang start around ¥10; Didi works everywhere with international cards',
        zh: '贵阳龙洞堡机场（KWE）通国内主要枢纽城市；高铁站为贵阳北站/贵阳东站|高铁是交通骨干：安顺西40分钟、荔波1小时、兴义（万峰林）1小时、凯里40分钟——护照可在Trip.com或12306购票|安顺西站到黄果树无铁路接驳：乘景区直通车或网约车；一日游车位约100-150元/座|山区地图距离与实际耗时差距大，务必按铁路时间规划；自驾看桥看峡谷最自由|贵阳市内出租车起步约10元，滴滴国际卡可用',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿建议' },
      items: {
        en: 'Guiyang: near Qingyun Shi or Jiaxiu Tower for food streets and riverfront walks; Future Square area for business hotels|Anshun city: one night makes Huangguoshu day 1 stress-free; book near the bus station|Libo county town: riverside guesthouses, walkable night market|Xijiang Miao Village: stay INSIDE the village for the after-dark hours — hillside guesthouses with balconies over the valley are the pick|Fanjingshan: stay at Jiangkou East Gate village for the 7 AM entry queue',
        zh: '贵阳：住青云市集或甲秀楼附近，夜市与河滨步行可达；商务酒店可选未来方舟一带|安顺市区：住一晚让黄果树行程从容；汽车站周边最方便|荔波县城：临河民宿，夜市步行可达|西江苗寨：务必住寨内才看得到夜晚——带山谷阳台的山坡民宿最佳|梵净山：宿江口东门村口，方便一早排队进山',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Good to Know', zh: '温馨提示' },
      items: {
        en: 'Fanjingshan caps daily visitors — book 3–7 days ahead on the official WeChat mini-program or via your hotel; East Gate (Jiangkou) is the scenic entrance|Rain is a feature, not a bug: bring a light rain jacket; waterfalls are fullest June–August|Guizhou food is sour-first, spicy-second — say "wei la" (mildly spicy) if you\'re cautious; vegetarian options are limited in villages|Alipay/WeChat Pay work almost everywhere, but village homestays sometimes prefer cash or scan-to-pay to their personal code|Foreigner-friendly infrastructure is thinner than Beijing/Chengdu: download offline maps, and let hotel staff write destination names in Chinese for drivers',
        zh: '梵净山每日限流——提前3-7天在官方小程序或请民宿代订；江口东门是景观入口|下雨是常态而非意外：带轻便雨衣；6-8月瀑布水量最足|贵州菜以酸为先、辣为次——怕辣说"微辣"；村寨里素食选择有限|支付宝/微信支付几乎通用，但村寨民宿有时更愿意收现金或扫个人码|外国人友好设施比北京/成都少：下载离线地图，让酒店把目的地写成中文给司机',
      },
    },
    {
      icon: 'budget',
      title: { en: 'Budget & Costs', zh: '消费预算' },
      items: {
        en: 'Guizhou is one of China\'s best-value provinces: ¥1,500–2,500 per person covers 5 comfortable days (mid-range hotels + HSR + tickets)|Big tickets: Huangguoshu ¥160, Fanjingshan ¥100 + shuttle + cable car (about ¥260 all-in), Xiaoqikong ¥130 + ¥40 shuttle, Xijiang ¥90|Meals are cheap: beef noodles ¥12–15, sour soup fish ¥80–120 per pot for two, night-market dinners ¥30–50|Village homestays in Xijiang or Libo run ¥120–300 for a double with valley views|Guided day tours (Huangguoshu or bridges) cost ¥200–400 per person including transport — worth it where buses are sparse',
        zh: '贵州是全国性价比最高的省份之一：人均1500-2500元即可舒适玩5天（中档酒店+高铁+门票）|主要门票：黄果树¥160、梵净山¥100+观光车+索道（全套约¥260）、小七孔¥130+观光车¥40、西江¥90|餐饮便宜：牛肉粉12-15元、两人份酸汤鱼80-120元、夜市晚餐30-50元|西江或荔波的村寨民宿120-300元/晚即可住到带山景的双人间|黄果树或桥梁一日游（含车）约200-400元/人——交通不便的线路值得报',
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
  guizhou: [
    '/images/cities/guizhou/huangguoshu_2.jpg',
    '/images/cities/guizhou/baling_bridge.jpg',
    '/images/cities/guizhou/guiyang.jpg',
  ],
}

// 攻略文章数据
const rawGuides: Omit<Guide, 'id'>[] = [
  {
    slug: 'xian-3-day-classic-route',
    title: {
      en: 'Xi\'an 3-Day Itinerary: Terracotta Warriors, City Walls & Street Food (+ 2 & 4-Day Variants)',
      zh: '西安三日经典路线：兵马俑+城墙+回民街全攻略',
    },
    label: { en: '3 Days / 2 Nights', zh: '3天2晚' },
    excerpt: {
      en: 'First time in Xi\'an? The classic 3-day itinerary — Terracotta Warriors, the City Wall by bike, Muslim Quarter street food — plus a 2-day speed-run version and a 4-day extension for when you have more time. Follow it step by step.',
      zh: '第一次去西安怎么玩？这条路线涵盖必去景点、地道美食和交通避坑指南，新手直接照着走就行。',
    },
    content: {
      en: '<p>Xi\'an is one of those rare cities where 3,000 years of history doesn\'t just exist in museums — it\'s in the walls you walk on, the food you eat, and the streets you wander. This 3-day itinerary covers everything first-time visitors come for, plus a few local favorites most tourists miss.</p><h2>Day 1: Old Town East Side</h2><p>Kick off your morning at the Shaanxi History Museum, home to 370,000 artifacts spanning over a million years of human history. The free general admission tickets go fast — book them on WeChat three days ahead. The Tang Dynasty gold and silver collection (extra ticket) is absolutely worth the splurge.</p><p>From there, head to the Big Wild Goose Pagoda. Climb the pagoda for views over the city, then stick around the North Square for the musical fountain show — it\'s Asia\'s largest, and the nighttime version with lights is genuinely impressive.</p><p>Spend the afternoon on the Ancient City Wall. Rent a bike at Yongning Gate (the most dramatic entrance) and ride the full 13.7 km (8.5 mile) loop if you\'re up for it. Go an hour or two before sunset for golden light over the old town rooftops.</p><p>Finish your day with dinner in the Muslim Quarter. Try roujiamo (the original Chinese hamburger), mutton paomo (you tear the bread yourself — smaller pieces = better flavor), and a sweet persimmon cake for dessert.</p><h2>Day 2: Terracotta Army & Huaqing Palace</h2><p>Take the tourist bus (Route 5 / 306) from the train station to Lintong, about an hour outside the city. The Terracotta Army is the main event — three massive pits filled with thousands of life-sized clay soldiers, each with a unique face. Do yourself a favor and hire a guide at the entrance. The stories behind the warriors make the experience ten times more interesting.</p><p>Grab lunch in Lintong — try the local big plate chicken (da pan ji) or a bowl of youpo noodles. Afternoon is for Huaqing Palace, the imperial hot spring resort where Emperor Xuanzong and his consort Yang Guifei spent their winters. The Tang Dynasty bathhouse ruins are surprisingly well-preserved.</p><p>If you\'re visiting between April and October, book tickets for "The Song of Everlasting Sorrow" outdoor show in the evening. It\'s a massive light and dance production staged right on Mount Li — totally over the top and absolutely worth it. Spring for the center A-section seats if your budget allows.</p><h2>Day 3: Calligraphy, Food, & Tang Dynasty Glow</h2><p>Start at the Forest of Steles Museum, a collection of ancient stone tablets that\'s basically a library of Chinese calligraphy. Even if you can\'t read Chinese characters, the artistry of the brushwork is remarkable. It\'s also much quieter than the more popular sights.</p><p>For lunch, head to Yongxingfang, a food street dedicated to dishes from all over Shaanxi province. It\'s touristy but well done — you pay with a preloaded card and graze your way through dozens of stalls. Don\'t miss the bowl-smashing wine ritual for the full experience.</p><p>Spend the afternoon at the Small Wild Goose Pagoda and Jianfu Temple — a quieter, less crowded alternative to its bigger sibling. The grounds are peaceful and the Xi\'an Museum on site has a solid collection of local artifacts.</p><p>End your Xi\'an trip at the Grand Tang Mall, a pedestrian street done up in full Tang Dynasty style. It comes alive after dark with lights, performances, and costumed performers. It\'s kitschy, it\'s crowded, and it\'s the perfect way to say goodbye to this ancient city.</p><h2>Only Have 2 Days? The Speed-Run Version</h2><p>Condense: Day 1 becomes City Wall (morning bike) → Muslim Quarter lunch → Shaanxi History Museum (afternoon, if tickets align) → Grand Tang Mall after dark. Day 2 goes full Lintong: Terracotta Army in the morning with a guide, Huaqing Palace in the afternoon, back in time for a final roujiamo. You\'ll sacrifice the Small Wild Goose Pagoda, the Forest of Steles, and any pretense of leisure — but you\'ll have seen the three things Xi\'an is for.</p><h2>Have a 4th Day? Three Add-Ons Worth the Ticket</h2><p><strong>Mount Hua (华山):</strong> the sacred western peak, about an hour away by high-speed rail, with the plank-walk-in-the-sky for the brave — leave at dawn, return by night. <strong>Famen Temple & Qianling:</strong> the Tang-dynasty pagoda that holds a finger bone of the Buddha, pairable with the tomb of China\'s only female emperor — a quiet western loop. <strong>Hancheng:</strong> a preserved old town of Confucian courtyards three hours east, for travelers who\'ve had their fill of Tang-dynasty neon.</p><h2>5+ Days: Pair Xi\'an with Beijing or Chengdu</h2><p>Xi\'an sits in the middle of China\'s high-speed rail web. The classic pairing is Beijing → Xi\'an (or the reverse) on the 4.5–6 hour G-class trains or the overnight Z20 sleeper — our Beijing-to-Xi\'an train guide covers every option, station, class and price. To the southwest, 3–4 hours reaches Chengdu for the food-city second act. Ten days, three capitals, zero domestic flights.</p><h2>First-Timer Logistics</h2><p><strong>Terracotta Warriors:</strong> book timed entry on the official museum WeChat account or through your hotel; go early or late, never 11 AM. Guides at the gate cost a few hundred yuan and earn it. <strong>Shaanxi History Museum:</strong> free tickets are released days ahead on WeChat — set an alarm. <strong>City Wall:</strong> bikes rent by the hour at several gates; the full loop is 13.7 km, so start two hours before sunset. <strong>Muslim Quarter:</strong> arrive hungry, order small, and apply the universal Chinese street-food rule — the longest local queue is the best review.</p>',
      zh: '<p>西安，十三朝古都，是一座历史在呼吸的城市。这条三日行程涵盖了初次到访者的必游精华。</p><h2>第一天：古城之心</h2><p>早晨从陕西历史博物馆开始，馆藏37万余件文物，跨越上百万年历史。免费门票务必提前3天预约。随后前往大雁塔，欣赏北广场音乐喷泉。</p><p>下午租一辆自行车，沿13.7公里的古城墙骑行。夕阳下的老城景色令人难忘。傍晚到钟鼓楼，然后钻进回民街，品尝肉夹馍、羊肉泡馍和柿子饼。</p><h2>第二天：兵马俑</h2><p>乘车前往临潼，亲眼见证世界第八大奇迹。兵马俑博物馆有三个主坑和铜车马展厅。强烈建议请一位持证讲解，每一个兵马俑背后的故事会让体验生动起来。</p><p>下午参观附近的华清宫，唐玄宗与杨贵妃的皇家温泉行宫。时间允许的话，晚上可以看震撼的《长恨歌》实景演出。</p><h2>第三天：书法、美食与盛唐</h2><p>从碑林博物馆开始，这是中国书法的宝库，汇集历代名家真迹。午餐去永兴坊，一条汇聚陕西各地美味的美食街。</p><p>下午参观小雁塔和荐福寺，比大雁塔更清幽、人更少。最后在大唐不夜城结束西安之旅，这条盛唐风情的步行街入夜后尤为璀璨。</p><h2>只有两天？速通版</h2><p>压缩方案：第一天城墙（清晨骑行）→ 回民街午餐 → 陕西历史博物馆（约得上票的话）→ 夜游大唐不夜城；第二天全天临潼：上午兵马俑（请讲解），下午华清宫，回城再补一个肉夹馍。小雁塔、碑林和"从容"会牺牲掉，但西安最核心的三样都在。</p><h2>有第四天？三个值得加的选项</h2><p><strong>华山：</strong>高铁约一小时直达，长空栈道留给勇者，凌晨出发夜里回。<strong>法门寺+乾陵：</strong>藏有佛指舍利的唐代宝塔，配上中国唯一女皇的陵寝——安静西线。<strong>韩城：</strong>三小时外的明清古城与文庙院落，适合看够了盛唐霓虹的人。</p><h2>五天以上：西安 × 北京 / 成都双城联游</h2><p>西安在中国高铁网的正中间。经典组合是北京 ↔ 西安：高铁 4.5–6 小时，或 Z20 夕发朝至卧铺；往西南 3–4 小时到成都，接一场美食第二幕。十天三城，全程不用坐飞机。</p><h2>新手实用信息</h2><p><strong>兵马俑：</strong>官方公众号或酒店代约分时段票，赶早或赶晚、别赶上午十一点；门口讲解几百元，值得。<strong>陕历博：</strong>免费票提前几天微信放号，定好闹钟。<strong>城墙：</strong>多门可按小时租自行车，全程 13.7 公里，日落前两小时上车。<strong>回民街：</strong>饿着去、少量多点，并套用全中国通用的街头法则——本地人排的队就是最好的测评。</p>',
    },
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
    readTime: { en: '8 min read', zh: '阅读 8 分钟' },
    views: { en: '23k reads', zh: '阅读 2.3w' },
    publishedAt: { en: '3 days ago', zh: '3天前' },
    featured: true,
    faq: [
      {
        q: { en: 'How many days do I need in Xi\'an?', zh: '西安需要玩几天？' },
        a: {
          en: 'Three days is the sweet spot: Day 1 old town (museum, pagoda, city wall, Muslim Quarter), Day 2 Terracotta Warriors and Huaqing Palace, Day 3 calligraphy, food streets and Grand Tang Mall. Two days covers a speed-run of the essentials; a fourth day unlocks Mount Hua, Famen Temple or Hancheng.',
          zh: '三天最合适：第一天老城（博物馆、大雁塔、城墙、回民街），第二天兵马俑和华清宫，第三天碑林、美食街和大唐不夜城。两天可速通核心；第四天可解锁华山、法门寺或韩城。',
        },
      },
      {
        q: { en: 'Can you do Xi\'an in 2 days?', zh: '两天能玩完西安吗？' },
        a: {
          en: 'Yes — combine the city wall, Muslim Quarter and Grand Tang Mall into one day, and give the second day entirely to the Terracotta Warriors and Huaqing Palace in Lintong. You\'ll move fast and skip the smaller museums, but you\'ll leave having seen what Xi\'an is famous for.',
          zh: '能——城墙、回民街、大唐不夜城合并为一天，第二天全天给临潼的兵马俑和华清宫。节奏会很快、小博物馆要舍弃，但西安的招牌都能见到。',
        },
      },
      {
        q: { en: 'What is the best time of year to visit Xi\'an?', zh: '几月去西安最好？' },
        a: {
          en: 'March–May and September–November: mild weather for the city wall bike ride and Mount Hua. Summers are hot (35°C+) and winters cold but uncrowded, with the museums as reliable indoor anchors. The Song of Everlasting Sorrow outdoor show at Huaqing runs roughly April–October.',
          zh: '3–5 月和 9–11 月：城墙骑行和华山都舒适。夏季炎热（35℃+），冬季冷但人少，博物馆是可靠的室内锚点。华清宫《长恨歌》实景演出大约 4–10 月运行。',
        },
      },
      {
        q: { en: 'Should I combine Xi\'an with Beijing or Chengdu?', zh: '西安适合和北京还是成都连玩？' },
        a: {
          en: 'Both pair well by rail. Beijing–Xi\'an takes 4.5–6 hours by high-speed train (or the overnight Z20 sleeper), stitching two ancient capitals together; Chengdu is 3–4 hours southwest for a total change of pace and a food-city second act. With 8–10 days, some travelers do all three.',
          zh: '都能连。北京—西安高铁 4.5–6 小时（或 Z20 夕发朝至卧铺），两座古都一线牵；成都向西南 3–4 小时，节奏和味觉完全换幕。有 8–10 天的话，三城连走也常见。',
        },
      },
    ],
    relatedLinks: [
      { to: '/guides/beijing-to-xian-train-guide', label: { en: 'Beijing to Xi\'an by Train', zh: '北京到西安火车全攻略' } },
      { to: '/guides/beijing-off-the-beaten-path', label: { en: 'Beijing Off the Beaten Path', zh: '北京小众路线' } },
      { to: '/guides/chengdu-food-guide', label: { en: 'The Chengdu Food Guide', zh: '成都美食全指南' } },
      { to: '/guides/first-trip-to-china-guide', label: { en: 'First Trip to China', zh: '首次来华全指南' } },
    ],
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
    relatedLinks: [
      { to: '/guides/beijing-to-xian-train-guide', label: { en: 'Beijing to Xi\'an by Train', zh: '北京到西安火车全攻略' } },
      { to: '/guides/xian-3-day-classic-route', label: { en: 'Xi\'an 3-Day Itinerary', zh: '西安三日经典路线' } },
      { to: '/guides/chengdu-food-guide', label: { en: 'The Chengdu Food Guide', zh: '成都美食全指南' } },
      { to: '/guides/first-trip-to-china-guide', label: { en: 'First Trip to China', zh: '首次来华全指南' } },
    ],
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
      en: '<p>Chengdu was named a UNESCO City of Gastronomy for a reason. The capital of Sichuan is basically one giant, delicious, mouth-numbingly spicy restaurant. This guide takes you from sizzling hot pot to humble street snacks, with everything in between.</p><h2>The Main Event: Sichuan Hot Pot</h2><p>Beef tallow hot pot is the soul of Chengdu food. Rich, deep-red broth simmering with Sichuan peppercorns and dried chilies — that signature "mala" numbing-spicy flavor that makes Sichuan cuisine famous. Order the holy trinity: beef tripe, duck intestine, and yellow throat. Dip everything in a sesame oil and raw garlic bowl to cool the heat and amp up the flavor.</p><p>For classic hot pot, locals swear by Shu Daxia and Hai Di Lao (yes, the famous one — it\'s popular for a reason). For something a little more off the beaten path, try a smaller neighborhood spot — the ones with no English sign and a line out the door are usually the best.</p>[[videos:rv-firsttimers]]<h2>Street Food & Snacks</h2><p>Hot pot gets all the hype, but Chengdu\'s real magic is in its street food. Start with chuanchuan — cold pot skewers where you grab sticks of meat, veggies, and tofu from a spicy broth and pay by the skewer. It\'s like hot pot but faster, cheaper, and perfect for solo travelers.</p><p>Dan dan noodles are the classic Chengdu breakfast — thin wheat noodles tossed in a ground pork and chili oil sauce, named for the street vendors who once carried them on shoulder poles. And after all that spice, cool down with a bowl of bing fen — hand-rubbed ice jelly topped with brown sugar, glutinous rice cakes, and peanuts.</p><p>For the adventurous: spicy rabbit head. It\'s a Chengdu late-night staple, braised in five-spice or mala flavor. Yes, it\'s a rabbit head. Yes, locals love it. No, it\'s not for everyone. But if you\'re going to try it, Chengdu is the place.</p><h2>Time-Honored Classics</h2><p>Chengdu has no shortage of century-old eateries. Head to Long Chao Shou for wontons in spicy red oil, Zhong Dumplings for their signature sweet-spicy chili oil dumplings, and Fu Qi Fei Pian for sliced beef and offal in chili sauce. The portions are small, so order a few dishes and share — that\'s the Chengdu way.</p><p>No food tour of Chengdu is complete without a trip to a teahouse. Head to Heming Teahouse in People\'s Park for gaiwan (lidded bowl) tea, people-watching, and maybe even an ear-cleaning (it\'s exactly what it sounds like, and it\'s weirdly relaxing). Pair your tea with a bowl of sweet bean curd dessert and you\'ve got the perfect Chengdu afternoon.</p><p>One pro tip: when in doubt, order "wei la" (mild spicy). The local spice level is no joke.</p><p>Want to go deeper on wrappers? Our dumpling directory covers 15 styles — from Chengdu\'s chili-oil classics to soup dumplings, potstickers and sticky-rice zongzi — each with real prices and exactly where to eat it.</p><h2>Real Voices: What Bilibili Viewers Actually Say</h2><p>Guide articles (this one included) are written by someone who ate here and left. The comment sections under Chengdu food vlogs are written by people who live here and stayed. We pulled the highest-liked comments from the most-watched Chengdu food videos — this is the closest thing to a Reddit thread the Chinese internet has, and it doubles as a local\'s guide:</p><blockquote><p>"Chengdu native here — my regular rotation: Wang Daye BBQ (Beisen branch), Xiao You shaomai (Guanghua Village), Weizhijue frog &amp; fish-head hotpot, Guanxian Laoma clay-pot skewers (Ruinan Street), Hongshe malatang (Gaopan branch)."</p><footer>— Bilibili comment under a "first time in Chengdu" video, 2.1K likes (translated from Chinese)</footer></blockquote><blockquote><p>"I went to Chengdu and genuinely fell in love with tihua soup — honestly more than hotpot or bobo chicken! It melts the second your lips touch it. Please, everyone, try it."</p><footer>— Bilibili comment, 1K likes (translated from Chinese)</footer></blockquote><blockquote><p>"As someone from Hunan I\'ll say it: good chili doesn\'t win by being hot, it wins by being fragrant. We\'re not masochists — hot-but-not-fragrant doesn\'t please us either."</p><footer>— Bilibili comment, 1.4K likes (translated from Chinese)</footer></blockquote><p>The single most useful comment we found organizes an entire 15-meal foreign-family food crawl stop by stop, with street addresses — the internet doing our job for us:</p><blockquote><p>"1. Zhangji Maojiezi: 28 Niusha Road, Jinjiang District… 2. Gangyiqu Wumei Roast Duck: 76 Desheng Shang Street… 3. Wuliguan Hotpot (Niushi-kou branch)…"</p><footer>— Top comment (1.9K likes) under a Finnish family\'s 15-meal Chengdu video, listing every stop with addresses (translated from Chinese)</footer></blockquote><h2>The One Tourist Trap Worth Naming: The ¥8 Orange</h2><p>Chengdu\'s food streets are refreshingly scam-light, but locals keep one warning on repeat: the shoulder-pole and pushcart fruit vendors near tourist streets selling bagan citrus. The scales run light, the change runs short, and the price per orange lands in comedy territory. Three separate high-liked comments, three separate videos, same advice:</p><blockquote><p>"Four years of college in Chengdu taught me: never buy the bagan oranges from shoulder-pole or cart vendors. Pricier than most supermarkets, and they short-change you on the rounding."</p><footer>— Bilibili comment, 959 likes (translated from Chinese)</footer></blockquote><blockquote><p>"The banquet\'s dish prices were fine, portions big, taste good — but ¥8 for one orange? However humble the cart looks, never again."</p><footer>— Bilibili comment on a village banquet video (translated from Chinese)</footer></blockquote><p>The rule that falls out of it: buy fruit from shops and supermarkets, meals from anywhere with a line of locals.</p>[[videos:rv-beyond]]<h2>The ¥15 Buffet Chengdu Keeps for Itself</h2><p>For every banquet pot, Chengdu also runs a workers\' counter: a street-side buffet, ¥15, twenty dishes, free for anyone over 85. The most-liked comment under that video (26K likes) is a local office worker discovering the place is an 11-minute walk from their desk: "Well, guess we have a canteen now." That sentence is Chengdu\'s food scene in miniature — world-class on paper, canteen-priced on the street.</p>',
      zh: '<p>成都是中国首座被联合国教科文组织授予"美食之都"称号的城市。本指南从热气腾腾的火锅到市井小吃一网打尽。</p><h2>成都之魂：川味火锅</h2><p>牛油锅底是正宗成都火锅的灵魂。必点"三宝"——毛肚、鸭肠、黄喉，蘸香油蒜泥碟既解辣又提香。本地老饕偏爱蜀大侠、龙抄手等品质稳定的老店。</p>[[videos:rv-firsttimers]]<h2>街头美味</h2><p>除了火锅，成都的小吃同样精彩。去烟火巷子里的串串店、传承百年的担担面担子，再来一碗手搓冰粉解辣。敢于挑战的话，麻辣兔头是本地人的心头好。</p><h2>老字号</h2><p>成都藏着不少百年老字号：龙抄手吃馄饨、钟水饺吃红油水饺、夫妻肺片吃凉拌牛杂。配一壶鹤鸣茶社的盖碗茶，才是完整的成都体验。记住：本地人都点微辣，怕辣就跟着他们点准没错。</p><p>想把「带馅的」吃明白？我们的饺子图鉴收录了 15 种——从成都的红油系到汤包、锅贴、粽子，每种都有真实价格和去哪吃。</p><h2>真实声音：B 站观众到底在说什么</h2><p>指南文章（包括这篇）是"来过又走了的人"写的；成都美食视频的评论区，是"住下来没走的人"写的。我们把播放量最高的几条成都美食视频的热评捞了出来——这是中文互联网上最接近 Reddit 帖子的东西，而且是本地人版的：</p><blockquote><p>"本成都土著推荐一些常吃的好吃的：王大爷烧烤（贝森店）、晓友烧卖（光华村店）、味之绝美蛙鱼头、灌县老妈砂锅串串（瑞南街）、鸿社麻辣烫（高攀店）。"</p><footer>— "第一次来成都吃点啥"视频下的 B 站评论，2187 赞</footer></blockquote><blockquote><p>"我去成都真的爱上了蹄花汤，真的好好吃啊！我甚至觉得火锅和钵钵鸡都没有蹄花汤好吃！一抿就化，大家去了一定要试试！"</p><footer>— B 站评论，1034 赞</footer></blockquote><blockquote><p>"作为湖南人，只能说好的辣椒真的不是靠辣，而是靠香吸引人的，毕竟我们也不是受虐狂，光辣不香咱也不喜欢。"</p><footer>— B 站评论，1447 赞</footer></blockquote><p>最有用的一条，把外国一家三口 15 顿的成都觅食之旅逐站整理成了带地址的清单——网友替我们把活儿干了：</p><blockquote><p>"1.张记冒节子：成都市锦江区牛沙路3号附28号 2.钢一区伍妹烤鸭：成都市锦江区得胜上街76号附7号 3.五里关火锅(牛市口店)……"</p><footer>— 芬兰家庭 15 顿川菜视频的置顶热评（1921 赞），全片店铺带地址逐条列出</footer></blockquote><h2>唯一值得点名的游客陷阱：8 块钱的橘子</h2><p>成都的美食街难得地几乎没有宰客，但本地人有一条反复念叨的提醒：游客街附近挑扁担、推小车卖耙耙柑的水果贩子——秤不准、抹零反向、单价离谱。三条不同视频的高赞评论，同一个建议：</p><blockquote><p>"根据我在成都上了四年大学得出的结论：千万不要买那些挑着担子和推车的耙耙柑，不仅比大多数超市贵，而且经常反向抹零。"</p><footer>— B 站评论，959 赞</footer></blockquote><blockquote><p>"菜价格还可以，菜量大味道应该也不错，一个橘子八块属实是惊了，以后这种推车车的、挑扁担的，穿得再破也不会买。"</p><footer>— 坝坝宴视频下的 B 站评论</footer></blockquote><p>由此得出规则：水果去店里和超市买，饭去任何有本地人排队的地方吃。</p>[[videos:rv-beyond]]<h2>成都留给自己的 15 元自助</h2><p>有宴席的一端，就有打工人的一端：街边自助，15 元，20 道菜，85 岁以上老人免单。这条视频点赞最高的评论（2.6 万赞）是一位本地上班族发现自己公司离它只有步行 11 分钟："好了，以后中午有食堂了。"这句话就是成都美食的缩影——纸面上是世界级，街头是食堂价。</p>',
    },
    image: '/images/cities/chengdu/chengdu_p03_13.jpeg',
    readTime: { en: '10 min read', zh: '阅读 10 分钟' },
    views: { en: '33k reads', zh: '阅读 3.3w' },
    publishedAt: { en: 'Updated today', zh: '今日更新' },
    featured: true,
    videos: realVoicesVideoGroups,
    faq: [
      {
        q: { en: 'Is Chengdu food too spicy for beginners?', zh: '成都美食对新手来说太辣吗？' },
        a: {
          en: 'No — it is negotiable. Order "wei la" (微辣， mild) and every kitchen scales down; the sesame-oil-and-garlic dip cools hotpot bites further. Non-spine-tingling options are everywhere too: tihua pork-trotter soup, zhong dumplings\' sweeter chili oil, and bingfen ice jelly for dessert. Even a Hunan commenter on a Chengdu video put it: "good chili wins by being fragrant, not by being hot."',
          zh: '不，辣度是可以商量的。点"微辣"后厨就会降档；香油蒜泥碟还能给火锅降温。不辣的选择也遍地都是：蹄花汤、甜口的钟水饺、饭后冰粉。连湖南网友在成都视频下都说："好的辣椒不是靠辣，是靠香。"',
        },
      },
      {
        q: { en: 'What should first-time visitors eat in Chengdu?', zh: '第一次来成都该吃什么？' },
        a: {
          en: 'The classic seven: beef-tallow hotpot, chuanchuan (pay-per-skewer), dan dan noodles, Zhong dumplings in sweet-spicy oil, tihua (slow-stewed pork trotter) soup for late nights, bingfen jelly to cool down — and spicy rabbit head if you want the story. Videos of foreign families doing exactly this crawl (15 meals in 3 days, 8.4M views) are linked below.',
          zh: '经典七件套：牛油火锅、串串、担担面、红油钟水饺、深夜蹄花汤、解辣冰粉，想要谈资就加麻辣兔头。外国家庭照这个清单 3 天吃 15 顿的视频（846 万播放）就挂在下方。',
        },
      },
      {
        q: { en: 'Which street or area has the best food in Chengdu?', zh: '成都哪条街/哪个区域美食最好？' },
        a: {
          en: 'There is no single "food street" that wins — Kuanzhai Alleys is the scenic stroll, but the dishes locals defend sit in unnamed backstreets. The reliable heuristic: any doorway with a queue of locals and parked delivery scooters. For named picks, the Bilibili comment section quoted above has a Chengdu native\'s full rotation with branches.',
          zh: '成都没有一条通吃的"美食街"——宽窄巷子适合散步拍照，本地人捍卫的菜都在无名小巷里。可靠的判断法：门口排着本地人、停着外卖电驴的店。想要具体店名，上文引用的 B 站评论里有一位成都土著带分店的完整常吃清单。',
        },
      },
      {
        q: { en: 'How do I avoid tourist traps when eating in Chengdu?', zh: '在成都吃饭怎么避开游客陷阱？' },
        a: {
          en: 'Chengdu is famously scam-light, but locals repeat one rule: skip the shoulder-pole and pushcart fruit vendors near tourist streets (rigged scales, ¥8 oranges). Buy fruit in shops; eat where queues of locals and delivery riders are. Beyond that, the biggest "trap" is over-ordering spice — "wei la" exists for a reason.',
          zh: '成都几乎不宰客，本地人只反复提醒一条：别买游客街边挑担/推车小贩的水果（秤不准、8 块一个的橘子）。水果进店买；吃饭跟着本地人和外卖骑手的队伍走。除此之外最大的"坑"是高估自己的吃辣能力——"微辣"这个选项存在是有原因的。',
        },
      },
      {
        q: { en: 'Is Chengdu worth visiting just for the food?', zh: '只为了吃，成都值得一去吗？' },
        a: {
          en: 'Yes — Chengdu was named a UNESCO City of Gastronomy in 2010, the first in Asia, and the street prices have not heard the news. Between the hotpot, the ¥15 worker buffets, the teahouse afternoons and the 2 AM tihua soup, it is one of the few cities that justifies the flight by the table alone.',
          zh: '值——成都是 2010 年联合国教科文组织的"美食之都"，亚洲首个，而街头价格对此毫不知情。火锅、15 元的打工人自助、茶馆下午和凌晨两点的蹄花汤，少数几个光凭餐桌就值回机票的城市之一。',
        },
      },
      {
        q: { en: 'What does spicy rabbit head actually taste like?', zh: '麻辣兔头到底什么味？' },
        a: {
          en: 'Like the best-spiced, most concentrated braised meat you have had — five-spice or mala broth soaked deep into the cheek and tongue meat, eaten glove-on, disassembled by hand. Texture is closer to duck than chicken. Locals adore it; nobody will think less of you for ordering bingfen instead.',
          zh: '像你吃过香料最浓、最浓缩的卤味——五香或麻辣卤汁浸透脸颊肉和舌肉，戴手套徒手拆着吃。口感更接近鸭肉而非鸡肉。本地人爱得不行；但你不点它改点冰粉，也没人会看不起你。',
        },
      },
    ],
    relatedLinks: [
      { to: '/guides/chengdu-street-food', label: { en: 'Chengdu Street Food Guide', zh: '成都街头小吃攻略' } },
      { to: '/guides/chengdu-vs-chongqing-food', label: { en: 'Chengdu vs Chongqing Food', zh: '成都vs重庆美食对比' } },
      { to: '/guides/halal-food-in-chengdu', label: { en: 'Halal Food in Chengdu', zh: '成都清真美食指南' } },
      { to: '/guides/chengdu-airport-food-guide', label: { en: 'Chengdu Airport Food Guide', zh: '天府机场美食指南' } },
      { to: '/guides/kimchi-sauerkraut-suancai', label: { en: 'The Fermented Cabbage Atlas', zh: '发酵白菜版图' } },
    ],
  },
  {
    slug: 'china-dumpling-guide',
    title: {
      en: 'The Dumpling Lover\'s Guide to China: 15 Wrappers, Five Families, One Long Lunch',
      zh: '中国饺子全指南：15 张皮、五大流派、一场漫长的午宴',
    },
    label: { en: 'Food Guide', zh: '美食指南' },
    excerpt: {
      en: 'Boiled, steamed, pan-fried, in soup or sweet — how to tell every Chinese dumpling apart, what to pay, how to order without a word of Chinese, and where each style is best.',
      zh: '水煮、蒸笼、煎烙、带汤、甜口——一篇分清中国所有饺子：该付多少钱、不会中文怎么点单、每种流派去哪儿吃最正。',
    },
    content: {
      en: '<p>Ask ten travelers what they ate first in China and at least five will say some kind of dumpling. The category is enormous — a jiaozi and a har gow share about as much DNA as a baguette and a croissant — and it is the single best-value food in the country: dinner from ¥8, breakfast from ¥2. This guide sorts the whole family into five easy groups so you can order with confidence anywhere.</p><h2>The Five Families</h2><p><strong>Boiled (shui jiao):</strong> the northern archetype — wheat wrappers boiled and served dry with black vinegar and raw garlic. Think pork-and-cabbage jiaozi, and Chengdu\'s sweet-spicy Zhong dumplings.</p><p><strong>Steamed (zheng):</strong> the southern powerhouse. Xiaolongbao with soup inside, fluffy baozi breakfast buns, and the whole dim sum canon — har gow, shu mai, crystal-skinned fun guo, and Xi\'an\'s beef-and-lamb tang bao.</p><p><strong>Pan-fried (jian):</strong> crispy-bottomed guo tie potstickers and Shanghai\'s shengjianbao, whose blistered soles hide scalding soup.</p><p><strong>In soup (tang):</strong> Sichuan\'s red-oil chao shou, Xi\'an\'s sour-soup suan tang shui jiao, and Cantonese wonton noodles.</p><p><strong>Sweet (tian):</strong> black-sesame tangyuan for the Lantern Festival and bamboo-leaf zongzi for the Dragon Boat Festival.</p><h2>How to Order Without Chinese</h2><p>Pointing works, but four phrases cover ninety percent of situations. “Zhe ge” (this one) while pointing at the next table\'s dish. “Yi fen” (one portion) or “yi long” (one steamer basket). “Bu yao la” (no spice) — crucial for Sichuan and Xi\'an soups. And “You su de ma?” (do you have a vegetarian one?) — most jiaozi, baozi and guo tie shops keep a cabbage, chive-egg or mushroom version. Menus on the wall with photos are the norm at dumpling shops; so is walking in and watching what regulars get.</p><h2>Protocol at the Table</h2><p>The vinegar dish is not optional — it is the whole condiment architecture: black vinegar, optionally a shred of ginger or a dab of raw garlic and chili oil. For soup-filled styles (xiaolongbao, shengjianbao, tang bao), the universal safe move is: chopsticks to spoon, nibble a hole, sip the broth, then eat. Skipping the sip is how tourists wear their lunch. Baozi are hand-food; jiaozi are chopstick-food; wontons are spoon-food. Nobody will judge either way, but now you know why the table has all three tools.</p><h2>What Things Should Cost</h2><p>Breakfast baozi ¥2–3 each; a plate of 15 jiaozi ¥12–25; a basket of xiaolongbao ¥10–30; dim sum steamers ¥15–40; a bowl of wontons or sour-soup dumplings ¥8–18; tangyuan ¥6–15. If a no-frills shop charges much beyond these bands, it is priced for the tour-bus crowd — walk one street over.</p><h2>City Cheat Sheet</h2><p><strong>Beijing:</strong> hutong jiaozi dinners and ¥2 baozi mornings; Qingfeng is the famous chain. <strong>Xi\'an:</strong> the Muslim Quarter owns dumplings after dark — sour-soup lamb jiaozi past midnight, Jia San\'s beef tang bao at dinner. <strong>Chengdu:</strong> chili-oil everything; Zhong dumplings and Long Chaoshou are the century-old names. <strong>Anywhere south:</strong> weekend yum cha trolleys stack your table with steamers for the price of a coffee each.</p><h2>The Dumpling Calendar</h2><p>If your trip happens to align with a festival, eat accordingly: Lunar New Year means midnight jiaozi in the north; the Lantern Festival two weeks later means tangyuan; the Dragon Boat Festival means zongzi; and the winter solstice — the biggest dumpling night of the year in much of the country — means jiaozi again. Restaurants will be packed with families doing exactly this. Join them.</p><p>Every style above, with photos, prices and shop names, lives in our dumpling directory — start with the featured six and work outward from there.</p>',
      zh: '<p>问十个旅行者到中国吃的第一顿是什么，至少五个会回答某种饺子。这个家族极其庞大——水饺和虾饺的共同点，大概和法棍与可颂差不多——而且它是全中国性价比最高的食物：晚餐 ¥8 起，早餐 ¥2 起。本指南把整个家族分成五大流派，让你在任何地方都能自信点单。</p><h2>五大流派</h2><p><strong>水煮：</strong>北方正统——小麦面皮煮熟装盘，蘸黑醋就生蒜。代表是猪肉白菜水饺，以及成都的甜辣钟水饺。</p><p><strong>蒸笼：</strong>南方主力。内有汤汁的小笼包、暄软的早餐包子、整部点心谱系——虾饺、烧卖、水晶皮的粉果，以及西安的牛羊肉灌汤包。</p><p><strong>煎烙：</strong>脆底锅贴，和上海底面起壳、内藏滚烫汤汁的生煎包。</p><p><strong>带汤：</strong>四川的红油抄手、西安的酸汤水饺、广式云吞面。</p><p><strong>甜口：</strong>元宵节的黑芝麻汤圆，端午节的竹叶粽。</p><h2>不会中文怎么点单</h2><p>指指点点当然可行，但四句话能覆盖九成场景：“这个”（指着邻桌那盘）、“一份”或“一笼”、“不要辣”——在四川和西安的汤里这条能救命；以及“有素的吗？”——多数饺子、包子、锅贴店都备着白菜、韭菜鸡蛋或香菇的素版。饺子馆墙上带图的菜单是标配；走进去先看本地人吃什么也是标配。</p><h2>餐桌礼仪</h2><p>醋碟不是可选项——它是整套调味架构：黑醋，可加姜丝、生蒜泥或辣油。凡是带汤的品类（小笼、生煎、灌汤包），万能安全动作是：筷子夹到勺上、咬个小口、先嘬汤、再入口。不嘬汤的下场是把午饭穿在身上。包子用手拿，饺子用筷子，馄饨用勺——没人会因为你用错而评判你，但你现在知道桌上为什么三样都摆着了。</p><h2>价格标尺</h2><p>早餐包子每个 ¥2–3；一盘 15 只水饺 ¥12–25；一笼小笼 ¥10–30；点心蒸笼 ¥15–40；一碗馄饨或酸汤水饺 ¥8–18；汤圆 ¥6–15。如果一家毫无装修的店收得远超这些区间，那就是做旅游大巴生意的——隔一条街再找。</p><h2>城市速查</h2><p><strong>北京：</strong>胡同晚餐水饺和 ¥2 包子早晨；庆丰是名店。<strong>西安：</strong>入夜后回民街就是饺子的天下——午夜后的酸汤羊肉水饺，饭点的贾三牛肉灌汤包。<strong>成都：</strong>红油蘸一切；钟水饺和龙抄手是百年招牌。<strong>南方任意城市：</strong>周末早茶的推车会把蒸笼一摞摞堆上你的桌子，每笼不过一杯咖啡的价钱。</p><h2>饺子日历</h2><p>如果行程碰上节日，请按节日吃：除夕夜北方半夜吃饺子；两周后元宵节吃汤圆；端午吃粽子；而冬至——全国大部分地区一年中最大的饺子夜——还是吃饺子。届时餐馆里全是照做的家庭。加入他们。</p><p>上述每一种的图片、价格和店名都在饺子图鉴里——先看精选六种，再往外扩展。</p>',
    },
    image: '/images/dumplings/guide-cover.jpg',
    readTime: { en: '9 min read', zh: '阅读 9 分钟' },
    views: { en: '1.2k reads', zh: '阅读 1200' },
    publishedAt: { en: 'today', zh: '今天' },
    featured: false,
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
  {
    slug: 'what-to-buy-in-china',
    title: {
      en: 'What to Buy in China: What\'s Actually Cheaper (and What\'s Not)',
      zh: '在中国买什么最值：真实价差清单与避坑指南',
    },
    label: { en: 'Shopping Guide', zh: '购物指南' },
    excerpt: {
      en: 'Power banks, prescription glasses, Uniqlo linen, silk, ACG goods, tea — built from what hundreds of travelers actually report, with real prices and the DJI myth busted.',
      zh: '充电配件、配眼镜、优衣库亚麻、丝绸、谷子、茶叶……基于数百位旅行者的真实反馈整理，附真实价差与大疆辟谣。',
    },
    content: {
      en: '<p>"What should I buy in China?" is one of the most-asked questions from first-time visitors — a single recent thread on it drew over a hundred replies in two days. The short answer: China is the world\'s factory, but not everything is a bargain. This guide maps what experienced visitors consistently say is genuinely cheaper or impossible to get at home — and what to skip.</p><h2>Small Electronics & Accessories</h2><p>This is the sweet spot. Power banks, GaN chargers, USB-C cables and MagSafe battery packs from Chinese brands (Anker, Ugreen, Baseus) often cost 30–50% less than in Europe or North America — a visitor from Italy recently found MagSafe power banks and even DJI spare batteries clearly cheaper in Shanghai than at home. Huawei\'s FreeClip open-ear earbuds run about ¥1,200–1,400 (roughly $170–190) and simply cannot be bought in the US at all. A name-brand 2TB NVMe SSD goes for around ¥600–900, noticeably less than in most Western countries; e-readers start near ¥500.</p><p>Buy at brand stores in malls (Xiaomi, Huawei) or from JD self-operated listings for guaranteed authenticity. A trick that works in Shenzhen\'s Xiaomi stores: buy several items and politely ask for an extra discount.</p><h2>The DJI & Insta360 Myth</h2><p>Here\'s the surprise. DJI prices are essentially unified worldwide — a former DJI Shenzhen employee says staff used to chase international promotions, because overseas sales are often better than Chinese retail. Insta360 is similar. The honest math on a drone: same price as home, minus the ~11% departure tax refund you can claim when flying out. That refund is real money on a ¥5,000 camera — our tax refund guide walks you through it step by step.</p><h2>Prescription Glasses, Ready in 20 Minutes</h2><p>If you wear glasses, this may be the single best deal in China. At Beijing Glasses City — an entire mall of nothing but eyewear shops — complete pairs (frames plus lenses) start around ¥150–400 and are often ready in 20 minutes while you wait. Comparable pairs in the US or Europe cost five to ten times more. Bring your prescription or get tested on the spot, and go before late afternoon: the market closes around 5 PM.</p><h2>Uniqlo, Down Jackets & Silk</h2><p>Uniqlo is measurably cheaper in China than in Europe — one shopper fresh off a Europe trip reported about 40% off linen items and 20% on everything else, and visitors stock up on linen every summer. Down jackets from Anta, 361° or Uniqlo are excellent value if you come from anywhere without brutal winters. For something uniquely Chinese: silk. In Suzhou, the family-run brand Xiuniang on Pingjiang Road sells mulberry silk that locals vouch for — with no online store anywhere, it\'s the kind of find you can only get in person.</p><h2>Tea, Food & Museum Gifts</h2><p>Genuinely good tea is dramatically cheaper in China than almost anywhere else. Buy at tea markets or brand stores where you can taste before committing, and skip the over-packaged tourist tins. For edible souvenirs, regional specialties — crab-roe noodle gift boxes, spice kits, pastries from time-honored brands — beat airport junk every time. And don\'t sleep on museum gift shops: the National Museum of China\'s store is famously good, with faithful replicas and original designs you genuinely cannot get elsewhere.</p><h2>ACG Goods: The Insider\'s Pick</h2><p>If you\'re into anime, comics or games, China is quietly the world\'s best market. Acrylic stands for Genshin Impact, Honkai: Star Rail, Zenless Zone Zero and similar titles cost about a third to half the Japanese price — and are often better made, with prints embedded inside the acrylic and layered, light-reactive designs. Chinese figure brands (Hasuki, Snail Shell, Animester, Apex) and model kit makers are officially exported to Japan at roughly double the Chinese price. Stationery lovers should look at fountain pens and art supplies like Xuan paper from Jingxian, Anhui — souvenirs people actually use.</p><h2>What NOT to Buy</h2><p>Adidas and Nike cost about the same as at home. Luxury goods are, if anything, pricier. Purple clay teapots sold at tourist streets are wildly inflated — nice as decoration, terrible as an investment. The 1688.com "wholesale price" dream requires reading Chinese and sorting through factory-quality lotteries; skip it on a short trip. And you already knew to skip the fake-bag markets.</p><h2>Where to Shop, City by City</h2><p>Shenzhen for tech — Huaqiangbei is the densest electronics market on earth. Beijing for glasses and museum gifts. Shanghai for flagship stores and big malls. Suzhou for silk. Tight schedule? Taobao and JD deliver to your hotel — sometimes within the hour — and our online shopping guide shows you exactly how. For every pick with reference prices in one place, see our shopping directory.</p>',
      zh: '<p>「在中国买什么值得？」是初访者问得最多的问题之一——最近一个帖子两天内就收到上百条回复。简短的答案：中国是世界工厂，但不是什么都便宜。本指南根据大量旅行者的真实反馈，整理出真正便宜或国内买不到的东西，以及应该跳过的坑。</p><h2>小型电子配件</h2><p>这是最值得买的品类。Anker、绿联、倍思等品牌的充电宝、氮化镓充电器、数据线和 MagSafe 磁吸电池，通常比欧美便宜 30–50%。华为 FreeClip 耳夹耳机约 ¥1200–1400，而且在美国根本买不到。品牌 2TB NVMe 固态硬盘约 ¥600–900，明显低于多数西方国家；电纸书 ¥500 起步。</p><p>认准商场的品牌门店（小米、华为）或京东自营，保证正品。深圳小米之家的小技巧：多买几件，礼貌地问问能不能再优惠一点。</p><h2>大疆与 Insta360 的迷思</h2><p>意外的是：大疆全球基本统一价——一位前大疆深圳员工说，员工反而会去追海外的促销，因为海外折扣常常比国内更狠。Insta360 也类似。买无人机的真实账本是：价格与国内一样，再减去离境时约 11% 的退税。一台 ¥5000 的相机，退税是实实在在的钱——退税指南里有完整步骤。</p><h2>20 分钟配好一副处方眼镜</h2><p>如果你戴眼镜，这可能是全中国性价比最高的购物。北京眼镜城——一整栋楼都是眼镜店——配好一副（镜框+镜片）¥150–400 起，通常等 20 分钟就能取。同样的眼镜在欧美要贵五到十倍。带上验光单，或现场验光；注意下午 5 点左右就关门，别去太晚。</p><h2>优衣库、羽绒服与丝绸</h2><p>中国的优衣库比欧洲明显便宜——有游客实测亚麻制品便宜约 40%，其他商品约 20%，很多人每年夏天来扫亚麻。安踏、361°、优衣库的羽绒服如果你来自不怎么冷的地方也非常划算。更有中国特色的是丝绸：苏州平江路的绣娘（Xiuniang）是本地人认可的家庭品牌，没有任何线上店铺，只有亲自去才买得到。</p><h2>茶叶、美食与博物馆文创</h2><p>好茶在中国的价格远低于世界其他地方。去茶叶市场或品牌门店，先试喝再买，避开过度包装的游客款。伴手礼选各地特产——蟹黄面礼盒、调料礼盒、老字号点心，都好过机场货。另外别忽视博物馆文创：中国国家博物馆的文创店口碑极佳，有海外买不到的复刻品和原创设计。</p><h2>谷子与手办：懂行人的选择</h2><p>如果你喜欢二次元，中国悄悄地成了全球最好的市场。《原神》《崩坏：星穹铁道》《绝区零》等游戏的亚克力立牌价格约为日本的 1/3 到 1/2，而且做工常常更好——印刷夹在亚克力内部、多层结构、透光还有隐藏设计。国产手办品牌（Hasuki、蜗牛壳、Animester、Apex）和模型厂商出口到日本大约要翻倍。文具爱好者可以看钢笔和安徽泾县宣纸——真正会被用掉的伴手礼。</p><h2>不建议买的</h2><p>阿迪达斯、耐克和国内价格差不多；奢侈品甚至更贵；旅游街的紫砂壶价格严重虚高——当摆设可以，当投资不行。1688 的「批发价」需要会中文并承担品控抽奖，短期旅行别碰。假货市场嘛，你本来也没打算去。</p><h2>按城市逛</h2><p>买电子去深圳——华强北是全球最密集的电子市场；配眼镜、买文创去北京；逛旗舰店和大商场去上海；买丝绸去苏州。行程太紧？淘宝和京东能送货到酒店——有时一小时内到——线上购物指南有完整方法。所有推荐和参考价，都在购物清单页。</p>',
    },
    image: '/images/guides/what-to-buy-in-china.jpg',
    readTime: { en: '11 min read', zh: '阅读 11 分钟' },
    views: { en: '12k reads', zh: '阅读 1.2w' },
    publishedAt: { en: '2 days ago', zh: '2天前' },
    featured: true,
  },
  {
    slug: 'china-tax-refund-guide',
    title: {
      en: 'China Departure Tax Refund: The Step-by-Step Guide',
      zh: '中国离境退税全攻略：步骤、易错点与即买即退',
    },
    label: { en: 'Tax Refund', zh: '退税攻略' },
    excerpt: {
      en: 'Spend ¥200, get ~11% back at the airport — or instantly in the store. Who qualifies, the exact counter sequence at departure, and the mistakes that cost travelers real money.',
      zh: '同店同日满 ¥200 即可退税约 11%——机场退或店内即买即退。资格条件、离港柜台顺序、以及让游客真金白银打水漂的易错点。',
    },
    content: {
      en: '<p>A traveler bought the brand-new Insta360 X6 in Shanghai, filled out every tax refund form correctly — then ran out of time at the airport, missed the right counter, and very nearly forfeited an 11% refund on a ¥4,000 camera. China\'s departure tax refund (离境退税) is genuinely generous, especially since the April 2025 overhaul — but the process has sharp edges. Here is the whole system in five minutes.</p><h2>Who Qualifies</h2><p>Foreign passport holders and residents of Hong Kong, Macao and Taiwan who have stayed in mainland China no more than 183 days continuously. Your purchases must come from licensed tax-refund stores, stay unused, and leave the country with you — carried on or checked in — within 90 days of purchase.</p><h2>The Numbers That Matter</h2><p>Minimum spend: ¥200 at the same refund store on the same day, down from ¥500 before April 2025. Refund amount: roughly 11% of the item price (8% on some categories) after agent fees. Cash refunds cap at ¥20,000 per person; instant in-store refunds now go up to ¥220,000 — enough to cover almost every tourist purchase.</p><h2>Step 1 — Buy at Tax-Refund Stores</h2><p>Look for the official "离境退税 TAX REFUND" logo at the entrance or checkout. Big mall anchor stores and brand boutiques (Huawei, DJI, Insta360, major silk and tea brands) are usually registered; market stalls are not. At payment, present your passport and ask for the Refund Application Form (离境退税申请单) together with the itemized invoice (发票). No passport with you means no form — carry it when you plan a big purchase. Note that online purchases from Taobao or JD do not qualify; refunds apply to offline tax-refund stores only.</p><h2>Step 2 — Pack Smart</h2><p>Goods must be unused and available for inspection. Anything flying in your checked luggage must be inspected by customs before you check it in — so decide what goes in the suitcase versus the cabin bag the night before, and keep forms, invoices and purchases together in one folder.</p><h2>Step 3 — At the Airport</h2><p>Budget an extra 30–45 minutes. The sequence: first customs verification (they check the goods and stamp your form — for checked items this happens at the landside customs counter before check-in, for carry-on items after immigration), then the refund counter of the agent agency or a self-service kiosk. Take the refund in RMB cash or back to your card. Since 2026, purchases under ¥10,000 are typically spot-checked rather than fully inspected — faster, but you still need to be able to produce the goods.</p><h2>"即买即退" — Instant Refund in the Store</h2><p>Since 2025, participating stores can refund you on the spot: you sign an agreement, leave a credit-card pre-authorization as guarantee, and receive the refund immediately while shopping. If the goods then fail to leave the country with you, your card is charged back. Many department stores and brand stores in major cities offer it — just ask "Do you support ji-mai-ji-tui?" (即买即退).</p><h2>Mistakes That Cost Travelers Money</h2><p>The classics: losing the application form (no form, no refund); checking refund purchases through before customs has seen them; arriving at the airport too late to complete both counters; assuming every store refunds because "it\'s China"; and letting a purchase slip past the 90-day window on a long trip. The Insta360 buyer at the top did the paperwork perfectly and still almost lost the money to a missed counter and a tight clock. Leave margin.</p><h2>Quick Checklist</h2><p>Passport in hand when shopping ✓ · "TAX REFUND" logo on the store ✓ · Application form plus invoice in one folder ✓ · Goods unused and reachable ✓ · Extra 45 minutes at the airport ✓ · Customs first, refund counter second ✓. Combine this with knowing what\'s actually worth buying, and smart shopping in China can pay for your farewell dinner.</p>',
      zh: '<p>一位旅行者在上海买了全新的 Insta360 X6，退税单据填得一丝不苟——结果在机场时间不够，没找到正确的柜台，差点损失一台 ¥4000 相机 11% 的退税。中国的离境退税政策自 2025 年 4 月大改之后相当慷慨，但流程有不少「锐角」。五分钟讲清整套规则。</p><h2>谁可以退</h2><p>外国护照持有人及港澳台居民，在内地连续停留不超过 183 天。商品须在挂牌退税商店购买、未使用，并在购买之日起 90 天内由本人随身或托运带离境。</p><h2>关键数字</h2><p>起退点：同一退税商店同日消费满 ¥200（2025 年 4 月前是 ¥500）。退税额：约为商品价格的 11%（部分品类 8%），已扣除代理手续费。现金退税每人上限 ¥20,000；即买即退上限已提高至 ¥220,000，覆盖几乎所有游客消费。</p><h2>第一步：在退税商店购物</h2><p>认准门口或收银台的「离境退税 TAX REFUND」蓝色标识。大型商场主力店和品牌专卖店（华为、大疆、Insta360、知名丝绸茶叶品牌）通常都已备案；市场摊位基本没有。付款时出示护照，索要《离境退税申请单》和增值税发票。不带护照就开不了单——大采购那天记得随身带。注意：淘宝、京东等线上购物不参与退税，只限线下退税商店。</p><h2>第二步：打包有讲究</h2><p>商品必须未使用、可备查。要托运的退税物品必须在值机前先过海关查验——前一晚就想好哪些进托运、哪些随身，单据、发票和商品集中放一个文件袋。</p><h2>第三步：在机场</h2><p>多留 30–45 分钟。顺序是：先海关验核（查验物品、在申请单上盖章——托运物品在值机前的海关柜台办，随身物品在过移民后的禁区办），再到退税代理机构柜台或自助机退税。可退人民币现金或退回银行卡。2026 年起，¥10,000 以下商品普遍改为抽查验放，速度更快，但物品仍然要拿得出来。</p><h2>「即买即退」：店内当场退</h2><p>2025 年起，参与门店可以当场退税：签一份协议、信用卡预授权作担保，购物时立刻拿到退税款。如果商品最终没有随你出境，会从信用卡扣回。各大城市的很多百货和品牌店都支持，结账时直接问一句「支持即买即退吗？」</p><h2>让游客亏钱的错误</h2><p>经典翻车：弄丢申请单（没单不退）；退税物品没过海关就先托运走；到机场太晚两个柜台排不完；以为「在中国到处都能退」结果买在未备案的摊位；长途旅行拖过 90 天时限。开头那位买 Insta360 的游客单据全对，还是差点栽在「找不到柜台+时间不够」上——一定要留足余量。</p><h2>速查清单</h2><p>购物当天带护照 ✓ · 认准「TAX REFUND」标识 ✓ · 申请单+发票放同一文件袋 ✓ · 商品未使用、可出示 ✓ · 机场多留 45 分钟 ✓ · 先海关、后退税柜台 ✓。配合「买什么最值」的清单一起用，聪明的购物足够赚回一顿告别晚餐。</p>',
    },
    image: '/images/guides/china-tax-refund-guide.jpg',
    readTime: { en: '7 min read', zh: '阅读 7 分钟' },
    views: { en: '6.4k reads', zh: '阅读 6.4k' },
    publishedAt: { en: '1 day ago', zh: '1天前' },
    featured: false,
  },
  {
    slug: 'taobao-jd-for-tourists',
    title: {
      en: 'Taobao & JD for Tourists: Shop Online in China Like a Local',
      zh: '淘宝京东游客购物指南：注册、验货、退货一次讲清',
    },
    label: { en: 'Online Shopping', zh: '线上购物' },
    excerpt: {
      en: 'The real shopping sweet spot in China is online: cheaper, delivered to your hotel within hours. How to set up payment, spot fake reviews, return anything — and the hotel-reception trick that needs no account.',
      zh: '中国购物的真正甜区在线上：更便宜、几小时送到酒店。支付设置、辨别刷单、无忧退货，还有不需要账号的酒店前台代购法。',
    },
    content: {
      en: '<p>Ask experienced visitors where the real shopping sweet spot in China is, and the answer is nearly unanimous: online. Prices are lower, delivery is absurdly fast — under an hour in big cities in some cases — and return policies are ruthless in the customer\'s favor. The catch is that the apps are built for locals. This is the complete tourist playbook, including one trick that needs no account at all.</p><h2>JD vs Taobao vs 1688</h2><p>JD.com is closest to Amazon\'s first-party retail: items badged 自营 (self-operated) are authentic and shockingly fast — one traveler reported JD delivery in under an hour in Chongqing. Taobao is a giant marketplace where quality runs the full range, but brand flagship stores (旗舰店) — Xiaomi, Huawei, even boutique labels like Songmont — are official and usually a bit cheaper than the physical store. 1688.com is the wholesale source behind it all; it requires reading Chinese and gambling on factory quality, so it is not worth it on a two-week trip.</p><h2>Setting Up (10 Minutes)</h2><p>Install Alipay and link your international Visa or Mastercard — it pays on Taobao and JD alike. The Taobao app has an English interface: set language in Me → Settings, and if pages stay stubbornly Chinese, point your phone camera\'s translator at them. The JD website (jd.com) works fine with your browser\'s auto-translate. For the delivery address, ask your hotel reception to write out the Chinese address and paste it into the app — courier delivery to hotels is completely normal in China.</p><h2>Judging Quality Like a Local</h2><p>Chinese shoppers read reviews differently: open the negative reviews (差评) tab and the latest (最新) tab first, because sellers cannot easily fake recency. Scan for machine-generated tone versus genuine detail — real buyers mention specifics — and treat photo reviews as gold. Prefer listings marked 运费险 (return shipping insurance). If something disappoints, submit a return in the app; a courier picks it up at your hotel and the refund lands within days. That safety net is exactly why locals order so fearlessly.</p><h2>The Hotel Reception Trick</h2><p>No account, no problem — with a move hotel staff are completely used to: show the front desk exactly what you want (a photo or link) and ask them to order it to the hotel. Settle up in cash or via a WeChat or Alipay transfer. Delivery typically takes three to four days, so do this in your first days in a city, not your last.</p><h2>What\'s Worth Ordering</h2><p>Classic hauls: a Xiaomi 20-inch suitcase (around ¥315 on Taobao) or the 90go equivalent (around ¥254) — online usually beats the physical store; cables, GaN chargers and phone stands for a few dozen yuan each; regional snack gift boxes. Our shopping directory lists every pick with reference prices, so you can screenshot and hand your phone to the reception desk.</p><h2>Watch-Outs</h2><p>Stick to flagship stores or JD self-operated for anything where authenticity matters. Clothing sizes run small — always check the centimeter chart rather than your usual letter. Electronics warranties are usually China-only, fine for accessories, think twice for laptops. And remember that online purchases do not qualify for the departure tax refund — for big-ticket items like cameras, buy at a physical tax-refund store and follow our tax refund guide instead.</p>',
      zh: '<p>问资深游客中国购物的真正甜区在哪，答案几乎一致：线上。价格更低、快得离谱——大城市有时一小时内送达——退货规则更是无条件偏向买家。唯一的门槛是这些 App 都为本地人设计。这篇是给游客的完整攻略，包括一个完全不需要账号的方法。</p><h2>京东、淘宝与 1688</h2><p>京东最接近亚马逊自营：「自营」标的商品保真且快得惊人——有游客在重庆一小时内收货。淘宝是巨型集市，质量全谱系，但品牌旗舰店（小米、华为，甚至 Songmont 这类设计师品牌）都是官方直营，通常比线下店还便宜一点。1688 是这一切背后的批发源头，需要会中文并承担品控抽奖，两周的行程不值得折腾。</p><h2>十分钟完成设置</h2><p>装支付宝，绑一张国际 Visa/万事达——淘宝京东都能付。淘宝 App 有英文界面：在「我的-设置」里切换语言；页面仍是中文时，直接用相机翻译扫。京东网站 jd.com 配合浏览器自动翻译完全可用。收货地址请酒店前台写出中文地址再粘贴进去——快递送酒店在中国再正常不过。</p><h2>像本地人一样验货</h2><p>中国买家看评论的方式不一样：先开「差评」和「最新」两个标签——商家很难伪造「最新」。分辨机器味和人味：真实买家会写具体细节；带图评价最可信。优先选带「运费险」的商品。不满意就在 App 里提交退货，快递员上门取件，退款几天内到账。这张安全网正是本地人敢疯狂下单的原因。</p><h2>酒店前台代购法</h2><p>没有账号也没关系——酒店前台对此司空见惯：把想要的商品（照片或链接）给前台看，请他们下单寄到酒店，现金或微信/支付宝转账结账即可。配送通常要 3–4 天，所以在每个城市的前几天就做，别拖到最后一天。</p><h2>值得下单什么</h2><p>经典清单：小米 20 寸行李箱（淘宝约 ¥315）或 90go 同款（约 ¥254）——线上通常比实体店便宜；几十块的数据线、氮化镓充电器、手机支架；各地特产零食礼盒。购物清单页有全部推荐和参考价，截图递给前台就行。</p><h2>注意事项</h2><p>凡是看重正品的东西，只认旗舰店或京东自营。衣服尺码偏小——别看字母码，看厘米数。电子产品的保修通常仅限中国大陆：配件无所谓，笔记本要想清楚。另外线上购物不参与离境退税——相机这类大件，请去线下退税商店购买，并配合退税指南操作。</p>',
    },
    image: '/images/guides/taobao-jd-for-tourists.jpg',
    readTime: { en: '8 min read', zh: '阅读 8 分钟' },
    views: { en: '7.8k reads', zh: '阅读 7800' },
    publishedAt: { en: '2 days ago', zh: '2天前' },
    featured: false,
  },
  {
    slug: 'tiger-leaping-gorge-trek-guide',
    title: {
      en: 'Tiger Leaping Gorge High Trail: The Complete 2-Day Trek Guide',
      zh: '虎跳峡高路徒步完全攻略：两天走完世界十大经典线路',
    },
    label: { en: '2-Day Trek', zh: '2天徒步' },
    excerpt: {
      en: 'The trek every foreign visitor to Yunnan should do: transport from Lijiang or Shangri-La, guesthouse picks, the 28 Bends, and how to finish at the Middle Gorge rapids — no permit, no camping, no guide needed.',
      zh: '去云南的外国游客都该走一次的徒步：丽江/香格里拉交通、客栈怎么选、28 道拐攻略与中虎跳收尾——无需许可、无需露营、无需向导。',
    },
    content: {
      en: '<p>Tiger Leaping Gorge is where the Yangtze saws through a 3,900 m-deep gap between Jade Dragon (5,596 m) and Haba Snow Mountain (5,396 m) — quite possibly the deepest river canyon on Earth. The high trail (高路) along its northern wall is China\'s most famous trek among foreigners: 2 days, roughly 22 km, guesthouses with hot showers and cold beer, and a wall of 5,000 m peaks in your face the whole way. Here is everything you need.</p><h2>Getting There</h2><p>Most trekkers start from Lijiang (2,400 m — perfect for a first altitude night). Buses and shared vans leave from Lijiang客运站 toward Qiaotou (桥头), the trailhead, in 1.5–2 hours; through-tickets to Shangri-La can drop you at Qiaotou as well. Starting from Shangri-La (3,300 m) also works in reverse. Buy your ticket in cash or scan-pay on arrival — no advance booking needed.</p><h2>Day 1: Qiaotou → Halfway Guesthouse (4–5 h)</h2><p>Register and pay the small gorge entry fee at the checkpoint, then follow the marked path uphill through terraced fields to the Naxi Family Guesthouse area. The serious climb is the famous "28 Bends" — about an hour of switchbacks with zero shade, so start before noon. The trail then levels into the most spectacular balcony path in China, contouring at 2,400–2,600 m with Jade Dragon\'s 13 peaks across the gorge. Sleep at Halfway Guesthouse ( halfway 客栈): hot showers, a fireplace dining room full of hikers from everywhere, and the proudly advertised "Toilet with the Best View in the World".</p><h2>Day 2: Halfway → Tina\'s → Middle Gorge (4–6 h)</h2><p>A gentle morning along the cliff to Tina\'s Guesthouse (Tina\'s 客栈), where the road meets the trail — this is where most day-trippers arrive from Lijiang, so start early to have the path to yourself. From Tina\'s descend the steep side trail to the Middle Gorge rapids (中虎跳), where the entire river squeezes through a 30 m-wide gap. The "sky ladder" (天梯) bamboo-and-steel ladder is the fun way back up. Reward: lunch on Tina\'s terrace above the roar.</p><h2>Where to Sleep</h2><p>The classic three: Naxi Family (quieter, first night option), Tea Horse Guesthouse (茶马客栈, mid-route lunch stop with a cliff-edge terrace), and Halfway (best atmosphere and views). Private rooms with ensuites run roughly ¥120–250 in high season; dorm beds ¥50–80. Book ahead in October and during Chinese holidays, walk in otherwise. Food is simple Chinese comfort food plus — famously — fresh flatbreads and beer at every stop.</p><h2>When to Go</h2><p>October to April: dry, clear, and cool. Summer (July–August) is rainy season — the trail turns to mud, views vanish into cloud, and the gorge ferry closes. Winter days are crisp and near-empty; carry layers because guesthouse corridors are unheated.</p><h2>What to Bring</h2><p>Trail runners or light hikers (no boots needed), 1.5 L water per person per day (buy more at guesthouses), sun protection — the UV at this latitude and altitude is savage — a layer for wind on the ridge, and offline maps (MAPS.ME/OsmAnd have the trail; guesthouses also hand out sketch maps). Cash is barely needed anymore: set up Alipay or WeChat Pay with your foreign card and every guesthouse takes it.</p><h2>Good to Know</h2><p>No permit, no guide, no reservation for the trail itself — this is one of the last genuinely free-form treks in China. Altitude tops out around 2,700 m: a headache is possible on day 1, altitude sickness is rare. The trail is waymarked with red/yellow paint and arrows painted by guesthouses (biased toward their own door, naturally). Continue to Haba village for a 5,396 m warm-up peak, or bus on to Shangri-La for the Yubeng trek — the two combine into the perfect Yunnan fortnight. Watch the full route on video in our Tiger Leaping Gorge route card before you go.</p>',
      zh: '<p>虎跳峡是金沙江在玉龙雪山（5596 米）与哈巴雪山（5396 米）之间切出的近 3900 米深谷——很可能是地球上最深的河流峡谷。沿北壁修建的高路是中国在外国背包客中最有名的徒步线：两天约 22 公里，客栈有热水澡和冰啤酒，全程正对五千米的岩壁。这篇讲清楚所有细节。</p><h2>如何到达</h2><p>多数人从丽江（2400 米，完美的海拔适应第一晚）出发。丽江客运站到徒步起点桥头（Qiaotou）的班车/拼车约 1.5–2 小时；去香格里拉的过路车也可在桥头下车。从香格里拉（3300 米）反向走亦可。现场购票即可，无需提前预订。</p><h2>第一天：桥头 → Halfway 客栈（4–5 小时）</h2><p>在检查站登记并购买峡谷门票，沿标记路线上坡穿过梯田到纳西客栈一带。真正的爬升是著名的"28 道拐"——约一小时无遮荫之字形陡坡，务必中午前出发。之后步道放缓，进入中国最壮观的"阳台路"：在 2400–2600 米等高线横切，玉龙十三峰隔江正对。夜宿 Halfway 客栈：热水澡、来自各地的徒步者围炉吃饭，以及自豪挂出"天下第一厕"招牌的观景厕所。</p><h2>第二天：Halfway → Tina\'s → 中虎跳（4–6 小时）</h2><p>清晨沿崖壁平缓走到公路汇合处 Tina\'s 客栈——多数丽江一日游客在此到达，想清静就早点出发。从 Tina\'s 沿陡峭支线下到中虎跳：整条金沙江从约 30 米宽的缝隙中挤过。返程走"天梯"竹钢梯最有趣。奖励：在 Tina\'s 露台对着涛声吃午饭。</p><h2>住宿怎么选</h2><p>经典三家：纳西客栈（更清静，可作首夜选择）、茶马客栈（中途午餐点，悬崖露台）、Halfway（氛围与景观最佳）。旺季标间约 ¥120–250，床位 ¥50–80。十月与国内节假日建议提前订，平时可直接上门。食物是简单的中式家常菜，外加每个落脚点都有的现烤饼与啤酒。</p><h2>最佳季节</h2><p>10 月至次年 4 月：干燥、晴朗、凉爽。7–8 月雨季——泥泞、云雾锁景、峡谷渡船停开。冬日晴冷人少；客栈走廊无暖气，注意保暖分层。</p><h2>装备清单</h2><p>越野跑鞋或轻徒步鞋（无需重装靴）、每人每天 1.5 升水（客栈可补）、防晒——这个纬度加海拔的紫外线非常凶、防风外套、离线地图（MAPS.ME/OsmAnd 都有轨迹，客栈也发手绘地图）。现金几乎用不上：绑好国际卡的支付宝/微信，每家客栈都能扫码。</p><h2>实用提示</h2><p>无需许可证、无需向导、步道本身无需预约——这是中国最后几条真正自由自在的徒步线之一。最高海拔约 2700 米：第一天可能轻微头疼，真正的高反罕见。路线上有客栈画的红黄箭头标记（自然会"偏向"自家门口）。结束后可去哈巴村尝试 5396 米的入门雪山，或坐车去香格里拉衔接雨崩徒步——两者串起来就是完美的云南两周。出发前先在我们的虎跳峡路线卡里看一遍视频全程。</p>',
    },
    image: '/images/guides/tiger-leaping-gorge-trek-guide.jpg',
    readTime: { en: '9 min read', zh: '阅读 9 分钟' },
    views: { en: '6.2k reads', zh: '阅读 6200' },
    publishedAt: { en: '1 day ago', zh: '1天前' },
    featured: true,
  },
  {
    slug: 'china-trekking-permits-guide',
    title: {
      en: 'Trekking Permits & Rules in China: What Foreigners Can and Cannot Hike',
      zh: '外国人在中国徒步的许可与规则：能走什么、不能走什么',
    },
    label: { en: 'Permits & Rules', zh: '许可与规则' },
    excerpt: {
      en: 'Which treks need nothing but shoes (most of Yunnan and Sichuan), which need permits arranged through operators (all of Tibet), and which are banned outright — plus border-zone rules, insurance and rescue basics.',
      zh: '哪些路线只需一双鞋（云南四川大部分），哪些必须通过旅行社办证（全西藏），哪些被明令禁止——外加边境地区规定、保险与救援常识。',
    },
    content: {
      en: '<p>China has world-class trekking and, contrary to backpacker mythology, most of it requires zero paperwork. But the rules that do exist are hard rules, and a few famous routes are closed. Here is the honest map of what foreigners can hike freely, what needs permits, and what to avoid entirely.</p><h2>No Permit Needed — Just Tickets and Shoes</h2><p>The classics of Yunnan and Sichuan are fully open to foreigners hiking independently: Tiger Leaping Gorge (small gorge entry fee), Wugongshan, Zhagana, Yubeng (Meili scenic entry), the Siguniang Changping–Bipeng traverse, the Gongga loop, the Genie pasture line, and the Kanas–Hemu trails in Xinjiang. What you need is your passport for real-name park tickets, payment via Alipay/WeChat, and common sense. Scenic areas sell tickets on arrival or via WeChat mini-programs — your passport number is the ID.</p><h2>Tibet: Organized Travel Only</h2><p>Foreigners cannot travel independently in the Tibet Autonomous Region, full stop. You need a Tibet Travel Permit (入藏函) plus additional Alien\'s Travel and military-area permits for Ngari and Everest regions — including for the Kailash kora. These are only obtainable through a licensed Tibet tour operator who will arrange a guide, driver and vehicle. Book 4–8 weeks ahead; permits pause around sensitive anniversaries. This is bureaucratic, but the operators handle everything, and groups can be as small as two. Note: Ganzi and Aba prefectures in Sichuan (Yading, Siguniang, Gongga, Genie) are historically Tibetan Kham but are NOT the TAR — no such restrictions apply there.</p><h2>Banned or Restricted Routes</h2><p>The Aotai traverse (鳌太线) in the Qinling — featured on Chinese "difficulty ladder" charts — is officially closed and actively fined; it kills experienced hikers most years. Do not go, however fit you are. The Everest east-slope (Kangshung) trek in Tibet has been suspended to unauthorized parties in recent years — Tibet operators know the current status. Unrestored "wild" Great Wall sections such as Jiankou are officially off-limits (falling rock, rescues, and fines are all real); hikers who want that raw wall feeling should use licensed local guides on legal sections or stick to restored Mutianyu and Jinshanling with their wild views. The Motuo county area requires a border permit that foreigners generally cannot obtain individually.</p><h2>Border Zones</h2><p>Wide areas of Xinjiang, Tibet, Yunnan and northeastern provinces are border-management zones. As a foreigner you rarely notice — until you try to enter some border villages or military-adjacent areas (parts of Baihaba near Kanas, certain Karakoram highway stretches). Rules shift; check with your guesthouse or a local operator a day ahead, and carry your passport at all times in these regions. Drones: assume no-fly near any border, airport or military installation — confiscation is a real outcome.</p><h2>Holidays, Crowds and Reservations</h2><p>Chinese national holidays (especially Oct 1–7 Golden Week and May 1–5) turn popular mountains into conga lines; parks also switch to mandatory advance reservation systems with daily caps. If you must trek in holiday week, pick the obscure routes (Genie, Meili North Slope) over the famous ones (Yading, Siguniang).</p><h2>Insurance and Rescue</h2><p>Buy travel insurance that explicitly covers trekking to your maximum altitude and, ideally, helicopter evacuation — standard policies often exclude mountains above 3,000–4,000 m. In emergencies call 110 (police) or 120 (medical); many canyons and high passes have no signal, so trekking with a partner or joining local groups matters. Chinese rescue is generally free or cheap for genuine emergencies, but helicopter and recovery costs will land on your insurer, not the state. Register where guesthouses keep hiker logs, tell someone your route, and carry a basic first-aid kit — then enjoy the fact that most Chinese trails are far better fed and better signed than the internet myth suggests.</p>',
      zh: '<p>中国有一流的徒步资源，而且与背包客传说相反——大部分根本不需要任何手续。但存在的规则都是硬规则，且有少数著名线路已被封闭。这篇讲清楚外国人能自由走什么、需要办证什么、以及完全不该碰什么。</p><h2>无需许可证——只需门票和鞋</h2><p>云南与四川的经典线路对外国人完全开放、可独立徒步：虎跳峡（小额峡谷门票）、武功山、扎尕那、雨崩（梅里景区门票）、四姑娘山长穿毕、贡嘎环线、格聂牧场线，以及新疆喀纳斯—禾木。你需要的是实名购票的护照、支付宝/微信支付和常识。景区现场售票或微信小程序购票——证件号就是护照号。</p><h2>西藏：只能组团</h2><p>外国人不能在西藏自治区自由行，没有例外。需要入藏函，前往阿里、珠峰等区域（包括冈仁波齐转山）还需外国人旅行证与军区许可——这些只能通过持牌西藏旅行社办理，并配导游、司机与车辆。提前 4–8 周预订；敏感时期办证会暂停。流程繁琐，但旅行社全包，小团两人即可成行。注意：四川甘孜、阿坝（亚丁、四姑娘、贡嘎、格聂）虽是藏地康区，但不是西藏自治区——不受此限制。</p><h2>禁入与受限线路</h2><p>秦岭鳌太线——常出现在国内"难度阶梯图"上——官方明令禁止穿越并处罚金；几乎每年都有经验丰富的徒步者遇难。无论体能多好都不要去。西藏珠峰东坡近年对无许可队伍封闭——西藏旅行社了解最新状态。箭扣等未修缮"野长城"官方禁止攀爬（落石、救援与罚款都是真的）；想要野长城的感觉，请走持证向导带领的合法段，或选择视野同样野性的慕田峪、金山岭。墨脱一带需要外国人通常无法单独办理的边境证。</p><h2>边境地区</h2><p>新疆、西藏、云南与东北的广大区域属于边境管理区。平时几乎察觉不到——直到你想进入某些边境村或军事毗邻区（喀纳斯附近白哈巴部分区域、喀喇昆仑公路部分路段）。规定会变动，提前一天问客栈或当地俱乐部，并在这些地区全程携带护照。无人机：靠近边境、机场、军事设施一律视为禁飞——被没收是真实结局。</p><h2>节假日与人潮</h2><p>中国法定节假日（尤其 10 月 1–7 黄金周与 5 月 1–5）会让热门山头变成排队现场；景区还会切换为限额预约制。假期非走不可，就选冷门线（格聂、梅里北坡），避开大热门（亚丁、四姑娘）。</p><h2>保险与救援</h2><p>买明确覆盖徒步最高海拔、最好含直升机救援的旅行保险——普通保单常把 3000–4000 米以上山地列为除外。紧急情况打 110（公安）或 120（急救）；许多峡谷与高垭口没有信号，结伴或加入本地队伍很重要。中国对真正的险情救援通常免费或低费，但直升机与善后费用落在你的保险公司头上。在客栈的徒步者登记本上留信息，把行程告诉某人，带基础急救包——然后放心去享受：绝大多数中国徒步线的补给与路标，都比网络传言好得多。</p>',
    },
    image: '/images/guides/china-trekking-permits-guide.jpg',
    readTime: { en: '10 min read', zh: '阅读 10 分钟' },
    views: { en: '4.9k reads', zh: '阅读 4900' },
    publishedAt: { en: '1 day ago', zh: '1天前' },
    featured: false,
  },
  {
    slug: 'altitude-sickness-trekking-china',
    title: {
      en: 'Altitude Sickness on China Treks: The Plain-English Guide',
      zh: '在中国徒步如何应对高反：说人话的完整指南',
    },
    label: { en: 'Altitude Guide', zh: '高反指南' },
    excerpt: {
      en: 'Which routes on our ladder can give you AMS, the golden rules of acclimatizing, warning symptoms that mean "descend now", and how to plan a trekking trip that climbs gradually instead of flying straight to 4,400 m.',
      zh: '阶梯上哪些路线可能高反、适应海拔的黄金法则、什么症状意味着"立刻下撤"，以及如何规划一次循序渐进而不是直飞 4400 米的徒步旅程。',
    },
    content: {
      en: '<p>Half of the treks in our China ladder go above 3,000 m, four of them above 4,600 m. That is the difference between a vacation and an emergency, and it has nothing to do with fitness — marathon runners get acute mountain sickness (AMS) while chain smokers stroll around fine. Here is what actually matters.</p><h2>Which Routes, How Much Risk</h2><p>Below 2,500 m — Wugongshan, Huashan, the Tengger desert, the Kanas trails — AMS is essentially impossible; ignore this section. Tiger Leaping Gorge tops out near 2,700 m: mild headache on night one is common, real AMS rare. Zhagana villages (3,300 m) and Yubeng (3,200 m, day hikes to 3,800 m) are where you must start caring. Yading (sleeping low but hiking to 4,700 m), the Siguniang traverse (4,680 m pass), Gongga (4,900 m passes) and Meili North Slope (5,200 m) are genuine altitude, and the Kailash kora crosses 5,630 m — approach those with respect and a plan.</p><h2>The Golden Rules</h2><p>1) Above 3,000 m, do not gain more than ~500 m of sleeping altitude per day — day hikes higher are fine, sleep lower ("climb high, sleep low"). 2) Spend 2–3 nights at moderate altitude first: Lijiang (2,400 m) or Shangri-La (3,300 m) before Yubeng; Kangding or Tagong (3,700 m) before the Gongga loop; Lhasa (3,650 m) for several nights before Kailash. 3) Drink absurd amounts of water, go laughably slow on climbs — "walk at a pace where you could sing" — and skip alcohol for the first 48 hours at altitude. 4) Sleep with the window cracked; stuffy rooms worsen headaches.</p><h2>Flying Versus Driving</h2><p>Arriving overland beats flying: your body acclimatizes on the way. Flying into Daocheng Yading airport (4,411 m — one of the world\'s highest civil airports) drops you onto the plateau with zero warning; the classic fly-then-drive route via Chengdu → Kangding → Litang gives you a graded ramp. For Tibet, the Chengdu–Lhasa train is scenic legend but does not acclimatize you much better than flying once you\'re above 3,000 m for the whole ride — budget real days in Lhasa either way.</p><h2>Normal Versus "Descend Now"</h2><p>Normal the first 1–2 nights: headache, poor sleep, breathless on stairs, reduced appetite. These pass with water, rest and ibuprofen. Descend immediately (300–500 m minimum, even at night) if: headache stops responding to painkillers; you vomit repeatedly; you feel drunk or unsteady — the heel-to-toe straight-line test is the classic check, fail it and you go down; you hear fluid in your breathing or cough pink froth; or confusion sets in. Those are HAPE/HACE, the two killers, and the only cure is descent — oxygen bottles and hyperbaric bags at guesthouses buy time, they do not treat.</p><h2>Medication, Honestly</h2><p>Acetazolamide (Diamox) genuinely helps acclimatization and many travel doctors recommend it for sleeping above 3,500 m; it is prescription-only in most countries, so sort it with your travel clinic before departure, not via a Taobao search. Dexamethasone is for emergencies carried by guided expeditions, not self-medication. Ibuprofen handles the altitude headache well. Ginger candy and Coca-Cola (widely available) are surprisingly effective for altitude nausea — ask any Tibetan truck driver.</p><h2>Build a Sensible Trip</h2><p>The ladder in our hiking hub is roughly an acclimatization ladder too: start with Tiger Leaping Gorge or Zhagana, add Yubeng or Siguniang for your first 3,200 m+ week, then graduate to Gongga, Yading\'s lakes or Meili North Slope, and only then think about Kailash or the Wusun trail. Two weeks climbing that staircase is one of the great trekking trips on Earth — and you will spend it well, not white-lipped in a guesthouse.</p>',
      zh: '<p>我们徒步阶梯里一半路线超过 3000 米，四条超过 4600 米。这是"度假"与"急救"的区别，而且与体能无关——马拉松跑者会得急性高山病（AMS），老烟枪却可能没事。以下才是真正重要的。</p><h2>哪些路线、风险多大</h2><p>2500 米以下——武功山、华山、腾格里沙漠、喀纳斯线路——基本不可能 AMS，本节可跳过。虎跳峡最高约 2700 米：首夜轻微头疼常见，真正高反罕见。扎尕那村寨（3300 米）与雨崩（3200 米，日徒步至 3800 米）开始需要认真对待。亚丁（住宿低但徒步至 4700 米）、四姑娘长穿毕（4680 米垭口）、贡嘎（4900 米级垭口）与梅里北坡（5200 米）是真正的高海拔；冈仁波齐转山翻 5630 米——带着敬畏和计划去。</p><h2>黄金法则</h2><p>1）3000 米以上，每日睡眠海拔爬升不超过约 500 米——白天爬高没关系，睡得低（"爬高处、睡低处"）。2）先在中等海拔住 2–3 晚：去雨崩前住丽江（2400 米）或香格里拉（3300 米）；走贡嘎前住康定或塔公（3700 米）；去冈仁波齐前在拉萨（3650 米）住几晚。3）拼命喝水、爬坡慢到可笑——"走到能唱歌的速度"——上高原头 48 小时别喝酒。4）睡觉开条窗缝；闷热的房间会加重头痛。</p><h2>飞机还是陆路</h2><p>陆路进高原优于飞机：身体在路上就开始适应。直飞稻城亚丁机场（4411 米，世界最高民用机场之一）等于毫无预警空降高原；经典的成都→康定→理塘自驾则是坡度平缓的进场。去西藏，成都—拉萨火车是风景传奇，但全程高于 3000 米后适应效果未必好过飞机——无论哪种方式，都请在拉萨安排真正的适应日。</p><h2>正常反应 vs 立刻下撤</h2><p>头 1–2 晚的正常现象：头疼、睡不好、上楼喘、没胃口——多喝水、休息、布洛芬可缓解。以下情况立即下撤（至少 300–500 米，夜里也要走）：头疼对止痛药无反应；反复呕吐；感觉像喝醉、走路不稳——脚跟接脚尖走直线是经典测试，走不直就下撤；呼吸带水声或咳粉红色泡沫；意识混乱。这些是 HAPE/HACE 两大杀手，唯一的解药是下撤——客栈的氧气瓶和高压袋只能争取时间，不能治疗。</p><h2>关于药物的实话</h2><p>乙酰唑胺（Diamox）确实帮助适应，许多旅行医生建议在 3500 米以上过夜时使用；多数国家为处方药，出发前找旅行门诊解决，别在淘宝碰运气。地塞米松是被向导队伍携带的应急药，不是自学自用的对象。布洛芬对高原头痛效果好。姜糖与可乐（到处有卖）对高原恶心出奇有效——问任何一位藏族司机。</p><h2>规划一次聪明的行程</h2><p>徒步专区的阶梯同时也是适应海拔的阶梯：先走虎跳峡或扎尕那，用雨崩或四姑娘完成第一个 3200 米+的 week，再毕业到贡嘎、亚丁或梅里北坡，最后才考虑冈仁波齐与乌孙古道。用两周爬完这道阶梯，是地球上最棒的徒步旅行之一——而且你会一直状态在线，而不是脸色惨白地躺在客栈里。</p>',
    },
    image: '/images/guides/altitude-sickness-trekking-china.jpg',
    readTime: { en: '9 min read', zh: '阅读 9 分钟' },
    views: { en: '3.8k reads', zh: '阅读 3800' },
    publishedAt: { en: '1 day ago', zh: '1天前' },
    featured: false,
  },
  {
    slug: 'kimchi-sauerkraut-suancai',
    title: {
      en: 'Kimchi vs Sauerkraut vs Suancai: The Fermented Cabbage Atlas of China',
      zh: '韩国泡菜、德国酸菜、中国酸菜：一颗白菜的发酵版图',
    },
    label: { en: 'Food Culture', zh: '美食文化' },
    excerpt: {
      en: 'Kimchi and sauerkraut are each one dish. China is a whole map: Northeast crock suancai, Sichuan\'s living pickle jars, Guizhou\'s hot-sour soup, Chongqing\'s suancaiyu, Fuling zhacai — what each one is, how they differ, where to eat them, and what the health claims actually say.',
      zh: '韩国泡菜与德国酸菜各是一道单菜；中国是一整张地图：东北大缸酸菜、四川的老坛泡菜、贵州的酸汤、重庆的酸菜鱼、涪陵榨菜——它们各是什么、彼此差在哪、去哪吃，以及健康传言的真相。',
    },
    content: {
      en: '<p>In early 2026, fermented cabbage had a genuinely strange moment: a sauerkraut-centered diet reportedly favored in the White House turned into American talk-show material, and searches for sauerkraut spiked. The fad has already faded. The question it left behind has not: when a cabbage ferments, whose tradition are you tasting? Most of the world can name exactly two — Germany\'s sauerkraut and Korea\'s kimchi. China has neither one dish nor one word for it. It has a family, spread across a continent-sized country: crock-fermented suancai in the Northeast, Sichuan\'s living pickle jars, Guizhou\'s hot-sour soup, Chongqing\'s suancaiyu, Fuling\'s zhacai. This is that map — what each one is, how they differ, where to eat them, and what the health claims actually say.</p><h2>The Two You Already Know</h2><p>Sauerkraut is the spare northern European branch: shredded white cabbage, about two percent salt, pressed under its own juice and left to lactic acid bacteria for one to four weeks. The result is one clean sour note. It traveled with migrants everywhere — an Eastern European winter staple, and in Pennsylvania Dutch country, pork with sauerkraut on New Year\'s Day for luck.</p><img src="/images/guides/fermented-sauerkraut.jpg" alt="A bowl of European sauerkraut, finely shredded fermented white cabbage"><p>Kimchi is the seasoned branch: napa cabbage salted overnight, rubbed with a paste of gochugaru chili, garlic, ginger and fermented seafood, and aged — traditionally in an onggi crock, in the old days partly buried to hold a cool, steady temperature. Korea keeps dozens of documented varieties, and kimjang, the collective autumn kimchi-making, joined UNESCO\'s intangible heritage list in 2013. In global search interest kimchi sits far above every other fermented cabbage on Earth — which is exactly why this article keeps it in the comparison.</p><img src="/images/guides/fermented-kimchi.jpg" alt="A bowl of Korean kimchi, napa cabbage fermented with chili paste"><h2>Suancai: The Northeast Crock</h2><p>In China\'s Northeast — Heilongjiang, Jilin, Liaoning — suancai (酸菜, "sour vegetable") means one specific thing: whole or halved napa cabbage packed into a waist-high ceramic crock with a light salt brine, weighed down with a stone, and left on a cold balcony or stairwell for a month or more as winter arrives. Technically it is sauerkraut\'s closest Chinese cousin — cabbage, salt, time, no spice. The format differs: whole leaves rather than shreds, a pressing stone rather than a lid-weight, and near-freezing outdoor air doing the job a European cellar does.</p><p>Unlike both sauerkraut and kimchi, Northeast suancai is almost never eaten raw. It goes into the pot: suancai stewed with pork belly and blood sausage (酸菜白肉血肠) is the region\'s signature winter dish; there are suancai-pork dumplings, iron-pot stews, hotpot. To eat it properly, plan a winter trip — Harbin or Shenyang, a restaurant with fogged windows, and a pot that arrives still boiling.</p><img src="/images/guides/fermented-suancai.jpg" alt="Northeast Chinese suancai stew with pork belly and blood sausage">[[videos:northeast-suancai]]<h2>Paocai: Sichuan\'s Living Jar</h2><p>Paocai is less a dish than an institution: a dedicated pickle jar (泡菜坛) with a water-sealed rim, holding a living spiced brine that a household keeps going for years — in the stories restaurants proudly tell, sometimes for generations. Vegetables cycle through at two speeds. Old-jar pickles (老坛泡菜) sit for weeks until properly sour; they are cooking ingredients — pickled chilies and ginger anchor yuxiang and countless other Sichuan flavors. "Bath pickles" (洗澡泡菜) dip in for a day and come out crisp and bright — the complimentary little dish that lands on every Chengdu table before you have ordered.</p><p>The brine itself is the point: a managed microbiome, fed with new vegetables, occasionally treated with a splash of baijiu, feared and loved like a family pet. When a Sichuan chef says the restaurant makes its own pickles, that is the claim — not a recipe, an ecosystem.</p><img src="/images/guides/fermented-paocai.jpg" alt="Sichuan paocai, pickled vegetables from a traditional water-sealed pickle jar">[[videos:sichuan-paocai]]<h2>Suantang: Guizhou\'s Sour That Isn\'t Cabbage</h2><p>Guizhou, in China\'s mountainous southwest, pushes the idea one step further: the sour is not the vegetable, it is the soup. Red sour soup (红酸汤) ferments small tomatoes — traditionally the wild kind locals call maolajiao — with chili into a paste, then builds a broth on it. White sour soup (白酸汤) ferments rice water instead. The tradition belongs above all to the Miao and Dong peoples of a highland that historically saw little salt; sour did salt\'s job of making rice go down. The local proverb is blunt: "Three days without sour, and your legs wobble when you walk" (三天不吃酸，走路打蹿蹿).</p><p>The flagship is Kaili sour soup fish (凯里酸汤鱼): river fish poached in bubbling red sour broth, with a personal dipping bowl of chopped chili and fermented tomato. Kaili, a small city in Qiandongnan prefecture, is the dish\'s home; the nearby Xijiang Thousand-Household Miao Village serves it with the full mountain-stage experience. Guiyang runs excellent versions, and sour beef hotpot is the winter alternative.</p><img src="/images/guides/fermented-suantang.jpg" alt="Guizhou sour soup fish, Kaili suantangyu in red fermented tomato broth">[[videos:guizhou-sour-soup]]<h2>Suancaiyu: A Sichuan Classic Built on Northern Cabbage</h2><p>Here is the twist that shows how Chinese food actually moves. Suancaiyu (酸菜鱼, "sour cabbage fish") — silky fish fillets poached in a broth loaded with pickled mustard greens — reads as pure Sichuan-Chongqing cooking, and most origin stories trace it to 1990s Chongqing. But the sour cabbage in the pot is Northeast-style suancai. A northern preservation technique, shipped south and rebuilt inside a southern flavor profile, became one of the most-ordered dishes in the country and spawned nationwide chains. Food mobility, in one pot.</p><img src="/images/guides/fermented-suancaiyu.jpg" alt="Suancaiyu, fish fillets with pickled cabbage in broth, at a Tai Er restaurant">[[videos:suancaiyu]]<h2>Beyond Cabbage: Zhacai and the Wider Pickle Map</h2><p>The family extends past cabbage entirely. Fuling zhacai (涪陵榨菜) — the packet pickle in every Chinese supermarket and a real export product — is the pressed, salted, spiced knobby stem of a mustard plant, harvested in a narrow window before spring around Chongqing\'s Fuling district; the traditional process walks the tuber through drying, salting and pressing over many weeks (one much-watched video maker spent thirty days making ten crocks, then waited two more years to eat them). Tianjin\'s dongcai (冬菜) ferments napa with garlic into an umami finisher for soup and congee. Hakka cooks in Guangdong and Fujian keep their own suancai and the related meicai for braised pork belly. Dali, in Yunnan, folds local suancai into rice-noodle bowls. One country, one preservation idea, a dozen regional dialects of it.</p><img src="/images/guides/fermented-zhacai.jpg" alt="Fuling zhacai, the pressed and salted pickled mustard tuber">[[videos:fuling-zhacai]]<h2>The Comparison Matrix</h2><table><thead><tr><th>Style</th><th>Main ingredient</th><th>Brine / medium</th><th>Time</th><th>Sour profile</th><th>Classic pairing</th><th>Live cultures</th></tr></thead><tbody><tr><td>Suancai (NE China)</td><td>Napa cabbage</td><td>Plain salt brine, stone-pressed crock</td><td>~30–45 days, near-freezing</td><td>Clean lactic sour, no spice</td><td>Pork belly &amp; blood sausage stew</td><td>No — always cooked</td></tr><tr><td>Paocai (Sichuan)</td><td>Cabbage, radish, chili, ginger…</td><td>Living spiced brine, water-sealed jar</td><td>1 day ("bath") to months</td><td>Bright, spiced, crunchy</td><td>Free table pickle; cooked into dishes</td><td>Yes, when raw</td></tr><tr><td>Red suantang (Guizhou)</td><td>Wild tomato + chili (or rice water)</td><td>Fermented paste → broth</td><td>Weeks to months</td><td>Hot, fruity fermented sour</td><td>Sour soup fish hotpot</td><td>Yes, in the broth</td></tr><tr><td>Kimchi (Korea)</td><td>Napa + radish</td><td>Gochugaru, garlic, ginger, fish sauce</td><td>1–3 weeks, cool</td><td>Spicy, umami-deep sour</td><td>Banchan, stews</td><td>Yes</td></tr><tr><td>Sauerkraut (Germany/Europe)</td><td>White cabbage</td><td>~2% salt, no spice</td><td>1–4 weeks</td><td>Sharp, simple lactic sour</td><td>Sausage, pork</td><td>Yes, when raw</td></tr></tbody></table><h2>Where to Eat What: The Travel Map</h2><table><thead><tr><th>You want</th><th>Go to</th><th>Order</th><th>Budget</th></tr></thead><tbody><tr><td>True crock suancai</td><td>Harbin or Shenyang, in winter</td><td>酸菜白肉血肠 — pointing at the menu works</td><td>¥40–80 a head</td></tr><tr><td>The living jar</td><td>Chengdu, any proper Sichuan restaurant</td><td>The free bath-paocai plate, then a pickled-chili dish</td><td>Free with your meal</td></tr><tr><td>Sour soup fish</td><td>Kaili, or Guiyang</td><td>凯里酸汤鱼 with the dipping bowl; sour beef hotpot in winter</td><td>¥60–120 a head</td></tr><tr><td>Suancaiyu at the source</td><td>Chongqing — or any Tai Er branch nationwide</td><td>One pot, rice on the side</td><td>¥50–90 a head</td></tr><tr><td>Zhacai tourism</td><td>Fuling (Chongqing), or any supermarket</td><td>A ¥3 packet; check the export shelves</td><td>¥3–10</td></tr></tbody></table><h2>The Health Truth, Without the Fad</h2><p>Fermented vegetables are legitimately good food: low in calories, high in fiber, and — when eaten raw — full of live lactic acid bacteria. Two honest footnotes. First, sodium: pickles are salt-delivery systems, and a generous serving can carry a meaningful share of a day\'s limit, which is exactly why Chinese tables treat them as condiments, not courses. Second, the 2026 sauerkraut-diet headlines: no vegetable burns fat, and a "White House diet" does not change chemistry. What fermented cabbage actually offers is flavor, and a window into how food stayed safe before refrigeration. That is a better story anyway.</p><h2>One Last Stop: The Dumpling</h2><p>The fermented cabbage universe ends where much of Chinese food ends: inside a dumpling. Northeast suancai, chopped and wrung dry with pork mince, fills one of the North\'s great dumplings — and in Xi\'an you will meet suantang shuijiao, dumplings served swimming in sour soup. Our dumpling atlas covers both, dumpling by dumpling, city by city.</p><img src="/images/guides/fermented-suancai-jiaozi.jpg" alt="A suancai pork dumpling (jiaozi)">',
      zh: '<p>2026 年初，发酵白菜经历了一段真正魔幻的时刻：一则"白宫偏爱的酸菜饮食法"传闻成了美国脱口秀的素材，Google 上 sauerkraut 的搜索量随之飙升。热潮很快退去，它留下的问题却没退：一颗白菜发酵之后，你尝到的是谁的传统？全世界大多数人只能说出两个——德国酸菜（sauerkraut）和韩国泡菜（kimchi）。而中国既不止一道菜，也不止一个词，而是散布在这片大陆级国土上的一个家族：东北大缸里的酸菜、四川的老坛泡菜、贵州的酸汤、重庆的酸菜鱼、涪陵的榨菜。这就是那张版图——它们各是什么、彼此差在哪、去哪吃，以及健康传言的真相。</p><h2>你已经认识的那两位</h2><p>Sauerkraut（德国酸菜）是北欧的极简分支：圆白菜切丝，约 2% 的盐，靠自身析出的菜汁压住，交给乳酸菌一到四周。结果是一个干净的酸味。它随移民走遍世界——东欧的越冬主食；在宾州荷兰人地区，新年第一天的猪肉配酸菜寓意好运。</p><img src="/images/guides/fermented-sauerkraut.jpg" alt="一碗德式酸菜（sauerkraut），切细丝发酵的白圆白菜"><p>Kimchi（韩国泡菜）是调味分支：大白菜先盐腌过夜，再抹上辣椒粉、蒜、姜与发酵海鲜调成的酱料，装坛熟成——传统用陶缸（onggi），过去常半埋入土以保持低温稳定。韩国有据可查的泡菜品类数以十计，集体秋腌泡菜的 kimjang（越冬泡菜文化）2013 年列入 UNESCO 人类非物质文化遗产。在全球搜索热度上，kimchi 远高于其他任何发酵白菜——这正是本文必须把它放进对比的原因。</p><img src="/images/guides/fermented-kimchi.jpg" alt="一碗韩国泡菜（kimchi），辣椒酱发酵的大白菜"><h2>东北酸菜：大缸与压缸石</h2><p>在中国东北——黑龙江、吉林、辽宁——"酸菜"特指一件事：整棵或对半切的大白菜，装进齐腰高的陶缸，只放淡盐水，压上一块石头，搁在冷阳台或楼道里，交给渐渐到来的冬天，一个月以上。论工艺，它是 sauerkraut 在中国最近的亲戚——白菜、盐、时间，不加香料。形态不同：整叶而非切丝、压缸石而非盖重物、接近冰点的户外空气替欧洲的地窖完成了工作。</p><p>与 sauerkraut 和 kimchi 都不同的是，东北酸菜几乎从不生吃。它下锅：酸菜白肉血肠是这里的招牌炖菜；还有酸菜猪肉饺子、铁锅炖、火锅。想吃到位，请把行程放在冬天——哈尔滨或沈阳，找一家玻璃上凝着雾气的馆子，等一锅端上来还在沸腾的。</p><img src="/images/guides/fermented-suancai.jpg" alt="东北酸菜炖白肉血肠">[[videos:northeast-suancai]]<h2>四川泡菜：活着的老坛</h2><p>泡菜与其说是一道菜，不如说是一套制度：专用泡菜坛带水封沿口，坛里是养了多年的活性卤水——按餐馆爱讲的说法，有的传了几代人。蔬菜以两种速度进出：老坛泡菜泡到足周才算正酸，是烹饪原料——泡椒、泡姜撑起鱼香味型和无数川菜味；"洗澡泡菜"只泡一天，出来又脆又亮——就是在成都任意一家馆子落座后、还没点菜就先上桌的那碟免费小菜。</p><p>卤水本身才是主角：一个被管理着的微生物群落——添新菜"养坛"，偶尔倒一点白酒"救坛"，像家里的宠物一样被敬畏和疼爱。四川厨师说"泡菜我们自己泡"，说的就是这个：不是一份配方，是一个生态系统。</p><img src="/images/guides/fermented-paocai.jpg" alt="四川泡菜，传统水封泡菜坛里的泡菜">[[videos:sichuan-paocai]]<h2>贵州酸汤：酸的尽头不是白菜</h2><p>贵州把这个想法再推一步：酸的不是菜，是汤。红酸汤用小番茄——传统上当地人叫"毛辣角"的野番茄——与辣椒发酵成酱再兑成汤底；白酸汤则发酵米汤。这套传统主要属于苗、侗等民族，属于这片历史上见盐不易的高地——酸替盐完成了"把饭送下去"的任务。俗话说得直白："三天不吃酸，走路打蹿蹿。"</p><p>头牌是凯里酸汤鱼：河鱼在翻滚的红酸汤里烫熟，配一碗辣椒面加酸番茄的个人蘸水。黔东南的凯里是这道菜的老家；附近的西江千户苗寨能给你完整的山地舞台版。贵阳也有出色版本，冬天的替代项是酸汤牛肉火锅。</p><img src="/images/guides/fermented-suantang.jpg" alt="贵州凯里酸汤鱼，红酸汤里的河鱼">[[videos:guizhou-sour-soup]]<h2>重庆酸菜鱼：用东北酸菜做的川菜</h2><p>最能说明中国食物如何流动的一锅。酸菜鱼——滑嫩鱼片烫在铺满酸菜的汤里——从味型看是彻头彻尾的川渝菜，主流起源说法都指向 1990 年代的重庆。但锅里那把酸菜，正是东北做法的酸菜。一种北方保存技艺南下，被装进南方味型的框架，最终成为全国点单率最高的菜式之一，长出全国连锁。食物流动性，一锅见尽。</p><img src="/images/guides/fermented-suancaiyu.jpg" alt="太二酸菜鱼门店的酸菜鱼一锅">[[videos:suancaiyu]]<h2>不止白菜：榨菜与更大的腌菜版图</h2><p>这个家族还越过了白菜本身。涪陵榨菜——每家中国超市都有、也真正出口海外的袋装腌菜——是芥菜的茎瘤（青菜头）经晾晒、盐腌、压榨、拌料制成，重庆涪陵周边在开春前的短暂窗口里收获；传统工艺要让菜头走完数周的流程（一位博主照本地做法花三十天做了十坛，然后又等了两年才开吃）。天津冬菜用白菜加大蒜发酵，是汤和粥的鲜味收尾。广东、福建的客家人有自己的酸菜和近亲梅干菜，专为梅菜扣肉而生。云南大理把本地酸菜折进米线碗。一个国家，同一种保存的智慧，十几种方言式的表达。</p><img src="/images/guides/fermented-zhacai.jpg" alt="涪陵榨菜，压榨盐腌的青菜头">[[videos:fuling-zhacai]]<h2>对比矩阵</h2><table><thead><tr><th>品类</th><th>主料</th><th>介质</th><th>时长</th><th>酸型</th><th>经典搭配</th><th>入口活菌</th></tr></thead><tbody><tr><td>东北酸菜</td><td>大白菜</td><td>淡盐水、压缸石陶缸</td><td>约 30–45 天，近冰点</td><td>干净的乳酸酸，无香料</td><td>酸菜白肉血肠</td><td>无——必熟吃</td></tr><tr><td>四川泡菜</td><td>白菜、萝卜、辣椒、姜等</td><td>活性香料卤水、水封坛</td><td>1 天（洗澡）至数月</td><td>明亮的香料酸、脆</td><td>免费佐餐小菜；入菜</td><td>生吃时有</td></tr><tr><td>贵州红酸汤</td><td>毛辣角番茄 + 辣椒（或米汤）</td><td>发酵酱 → 汤底</td><td>数周至数月</td><td>热果味发酵酸</td><td>酸汤鱼火锅</td><td>汤里有</td></tr><tr><td>韩国泡菜</td><td>大白菜 + 萝卜</td><td>辣椒粉、蒜、姜、鱼露</td><td>1–3 周，低温</td><td>辣而鲜的深酸</td><td>小菜、汤锅</td><td>有</td></tr><tr><td>德国酸菜</td><td>圆白菜</td><td>约 2% 盐，无香料</td><td>1–4 周</td><td>锐利的单纯乳酸酸</td><td>香肠、猪肉</td><td>生吃时有</td></tr></tbody></table><h2>旅行吃图：去哪吃什么</h2><table><thead><tr><th>想吃</th><th>去哪</th><th>点什么</th><th>预算</th></tr></thead><tbody><tr><td>正宗大缸酸菜</td><td>哈尔滨或沈阳，冬天</td><td>酸菜白肉血肠（指着菜单点也行）</td><td>人均 ¥40–80</td></tr><tr><td>活着的老坛</td><td>成都，任意正经川菜馆</td><td>免费的洗澡泡菜，再点一道泡椒系菜</td><td>随餐免费</td></tr><tr><td>酸汤鱼</td><td>凯里，或贵阳</td><td>凯里酸汤鱼配蘸水；冬天换酸汤牛肉</td><td>人均 ¥60–120</td></tr><tr><td>源头的酸菜鱼</td><td>重庆——或全国任意太二门店</td><td>一锅，配米饭</td><td>人均 ¥50–90</td></tr><tr><td>榨菜巡礼</td><td>涪陵（重庆），或任意超市</td><td>一包 ¥3 的榨菜；看看出口货架</td><td>¥3–10</td></tr></tbody></table><h2>健康真相：不聊玄学</h2><p>发酵蔬菜是货真价实的好食物：低卡、高纤维，生吃时富含活性乳酸菌。两句诚实的补充。其一，钠：腌菜本质上是盐的载体，一份下饭的量可能就占掉一天限量的可观份额——这正是中国餐桌把它当佐餐小菜而非主菜的原因。其二，2026 年那波"酸菜减肥法"头条：没有任何蔬菜能燃烧脂肪，"白宫同款"也改变不了化学。发酵白菜真正给你的是风味，以及一段"冰箱发明之前食物如何保持安全"的历史。这本来就是个更好的故事。</p><h2>最后一站：饺子</h2><p>发酵白菜宇宙的终点，和许多中国食物一样，落在饺子里。东北酸菜切碎挤干拌上猪肉，是北方伟大饺子之一的心；在西安，你会遇到酸汤水饺——饺子泡在酸汤里上桌。我们的饺子图鉴讲过它们，一颗一颗、一城一城。</p><img src="/images/guides/fermented-suancai-jiaozi.jpg" alt="一颗酸菜猪肉饺子">',
    },
    image: '/images/guides/suancai-vs-sauerkraut.jpg',
    readTime: { en: '12 min read', zh: '阅读 12 分钟' },
    views: { en: '1.2k reads', zh: '阅读 1200' },
    publishedAt: { en: 'Just published', zh: '刚刚发布' },
    featured: false,
    videos: fermentedVideoGroups,
    faq: [
      {
        q: { en: 'Is Chinese suancai the same thing as kimchi?', zh: '中国酸菜和韩国泡菜是一回事吗？' },
        a: {
          en: 'They are relatives, not the same dish. All are lactic-acid ferments of vegetables, but Northeast suancai uses only a plain salt brine and whole leaves and is cooked before eating, while kimchi is seasoned with a chili-garlic-fish-sauce paste and eaten raw. China\'s closer cousin to kimchi in spirit is Sichuan paocai — also a spiced, living brine — though it is its own tradition too. This article deliberately introduces them side by side, without ranking them.',
          zh: '是亲戚，不是同一道菜。它们都是蔬菜的乳酸发酵，但东北酸菜只用淡盐水泡整叶、吃前必烹，而 kimchi 用辣椒蒜酱与鱼露调味、生吃。气质上更接近 kimchi 的中国亲戚是四川泡菜——同样是调味的活性卤水——但它也是自成一派的传统。本文有意平行介绍，不排座次。',
        },
      },
      {
        q: { en: 'Is fermented cabbage actually healthy?', zh: '发酵白菜真的健康吗？' },
        a: {
          en: 'Low in calories, high in fiber, and raw versions carry live cultures — those virtues are real. The catch is sodium: pickles are salty by design, so they work as condiments rather than courses. And no fermented food burns fat; the 2026 sauerkraut-diet headlines were a fad, not chemistry.',
          zh: '低卡、高纤维，生吃的版本含活菌——这些优点是真的。要注意的是钠：腌菜天生就是咸的，适合当佐餐小菜而非主菜。另外没有任何发酵食品能燃脂；2026 年那波"酸菜减肥法"头条是热潮，不是化学。',
        },
      },
      {
        q: { en: 'Where should I go to try Guizhou sour soup fish?', zh: '去哪里吃贵州酸汤鱼？' },
        a: {
          en: 'Kaili, in Qiandongnan prefecture, is the dish\'s home — a well-reviewed meal there runs about ¥100 a head. Guiyang has excellent versions with easier transport, and Xijiang Thousand-Household Miao Village adds the full mountain setting. Our Guizhou city page covers all of them.',
          zh: '黔东南的凯里是这道菜的老家——当地一顿口碑店的酸汤鱼约人均百元。贵阳版本出色、交通更方便；西江千户苗寨胜在完整的山地场景。这些在贵州城市页里都有展开。',
        },
      },
      {
        q: { en: 'I\'m vegetarian — what can I eat from this list?', zh: '我是素食者，这份清单里能吃什么？' },
        a: {
          en: 'Plenty: bath paocai, zhacai, dongcai and most table pickles are plant-based. Suancai dumplings are usually pork-filled (ask first), and sour-soup broths are often built on fish or meat stock — check before ordering, or head to a Buddhist vegetarian restaurant (素菜馆), where fermented vegetables get whole menus of their own.',
          zh: '不少：洗澡泡菜、榨菜、冬菜和大多数佐餐小菜都是素的。酸菜饺子多为猪肉馅（先问一句）；酸汤常以鱼汤或肉汤打底——点菜前确认，或直接去素菜馆，发酵蔬菜在那里有整页整页的菜单。',
        },
      },
      {
        q: { en: 'Can I buy any of this outside China?', zh: '在中国以外能买到这些吗？' },
        a: {
          en: 'Yes. Fuling zhacai is exported worldwide — look for "pickled mustard" or 榨菜 on Chinese supermarket shelves — and vacuum-packed suancai and paocai jars travel well. But the fresh-crock experience, you have to come for.',
          zh: '能。涪陵榨菜远销全球——在中超货架找"pickled mustard"或榨菜字样；真空包装的酸菜、泡菜也耐储运。但大缸现捞的体验，只能亲自来。',
        },
      },
    ],
    relatedLinks: [
      { to: '/dumplings', label: { en: 'The Dumpling Atlas', zh: '饺子图鉴' } },
      { to: '/cities/guizhou', label: { en: 'Guizhou: Sour Soup Heartland', zh: '贵州：酸汤之乡' } },
      { to: '/cities/chengdu', label: { en: 'Chengdu: Home of the Living Jar', zh: '成都：老坛泡菜之城' } },
      { to: '/guides/chengdu-food-guide', label: { en: 'Chengdu Food Guide', zh: '成都美食攻略' } },
      { to: '/guides/china-dumpling-guide', label: { en: 'China Dumpling Guide', zh: '中国饺子指南' } },
    ],
  },
  {
    slug: 'chengdu-airport-food-guide',
    title: {
      en: 'Food at Chengdu Tianfu Airport (TFU): What to Eat, Real Prices & Layover Survival',
      zh: '成都天府机场美食指南：吃什么、真实价格与转机过夜攻略',
    },
    label: { en: 'Airport Survival', zh: '机场美食指南' },
    excerpt: {
      en: 'Stuck at Chengdu\'s giant new airport? What\'s actually inside Tianfu (and Shuangliu) — terminal restaurants, the ¥10 convenience-store trick, where flight crews eat, overnight pod prices, and when it\'s worth riding Metro Line 18 into town for the real thing.',
      zh: '在天府机场转机吃什么？航站楼里有什么、10 元吃饱的便利店技巧、机组人员去哪吃、太空舱过夜什么价，以及什么时候值得坐 18 号线进城吃顿正宗的。',
    },
    content: {
      en: '<p>Chengdu Tianfu International Airport (TFU) is one of the largest airports on Earth, opened in 2021 about 50 km (31 miles) south of downtown. That distance defines your entire food strategy, and Chinese travelers have already distilled it into a running joke:</p><blockquote><p>"Tianfu Airport is actually pretty fair — from here, almost every city in China is two hours away. Including Chengdu itself."</p><footer>— Bilibili comment, 1.2K likes (translated from Chinese)</footer></blockquote><p>This guide covers what you\'ll actually find: the restaurants inside both terminals, the budget tricks locals use, where flight crews and ground staff eat, overnight layover options at real prices — and the math on when to just take the metro into town.</p><h2>Eating Inside the Terminal</h2><p>Yes, TFU has real Sichuan food, not just burger chains. The most common local advice is surprisingly direct: skip the trek outside and eat at the Chen Mapo Tofu counter inside the terminal — mapo tofu is the city\'s signature dish, and the airport branch spares you a taxi.</p><blockquote><p>"Honestly, just eat the Chen Mapo Tofu inside Tianfu. Don\'t bother coming out here — from TFU, the taxi ride will probably cost more than your meal."</p><footer>— Bilibili comment on a near-airport food vlog (translated from Chinese)</footer></blockquote><p>One warning from a 560K-view vlog by one of China\'s most famous food vloggers, who filmed a full sit-down Sichuan meal at TFU and nearly missed her flight when the gate changed mid-meal: the terminal is enormous, gates involve serious walking distances, and screens update fast. Budget 20–30 minutes between finishing your meal and reaching a distant gate.</p><h3>The ¥10 Trick (Locals\' Favorite)</h3><p>Airport restaurants everywhere charge a premium. Convenience stores don\'t — because they can\'t. At chains like Lawson and FamilyMart, packaged bentos, rice balls and sandwiches carry the price printed by the manufacturer, so airport branches sell at city prices. Ground crew and airport staff buy their lunches there for exactly this reason.</p><blockquote><p>"Convenience-store food like Lawson\'s and FamilyMart\'s packaged bentos and rice balls costs the same as outside — the price is printed on the package, so even the airport location can\'t mark it up."</p><footer>— Bilibili comment, 161 likes (translated from Chinese)</footer></blockquote><p>Another frequent-flyer move: skip food counters entirely and use an airport lounge. Many credit cards and membership programs bundle free lounge access, and lounges usually include noodles, snacks and drinks.</p>[[videos:tfu-inside]]<h2>Where the Airport Workers Eat</h2><p>Leave the terminal with 4+ hours to spare and another Chengdu opens up: the <em>cangying guanzi</em> ("fly restaurants") — bare-bones, family-run holes-in-the-wall where the food is spectacular and the decor is an afterthought. The small towns around TFU are full of them, and the people who know best are the ones who work there. Under a vlog about a near-airport fly restaurant, a self-described seven-year airport veteran left the definitive list:</p><blockquote><p>"Caochi\'s Li Erjie, Shibandeng\'s Wang Family mutton soup, and Dong Tihua at the China Eastern center inside the airport. Seven years at Tianfu Airport — that\'s all I have to say."</p><footer>— Bilibili comment by an airport worker, 73 likes (translated from Chinese)</footer></blockquote><p>Caochi (草池) and Shibandeng (石板凳) are small towns a short taxi ride from the terminals. Order like the regulars: mutton soup at Wang\'s, braised pork trotter (tihua) at Dong\'s. Expect ¥20–40 a head — and remember the warning above: the round-trip taxi may outcost the meal.</p>[[videos:tfu-nearby]]<h2>Overnight Layovers: Pods, Corners, or a Shuttle Hotel?</h2><p>TFU sells sleep pods/nap capsules at roughly ¥200+ per night. The verdict from travelers who have tried them is mixed — great for a horizontal hour, less great for a whole night.</p><blockquote><p>"The pods are ¥200-something… honestly just buy the direct flight next time. Sleeping in one is suffering — they feel like coffins and the soundproofing is terrible."</p><footer>— Bilibili comment on a TFU overnight guide (translated from Chinese)</footer></blockquote><blockquote><p>"I booked a hotel near Tianfu with a free airport shuttle — just over ¥100 a night. Better value than a pod, and you can actually shower."</p><footer>— Bilibili comment, 73 likes (translated from Chinese)</footer></blockquote><p>For solo female travelers arriving late, several commenters lean the other way: the pod area\'s security and camera coverage inside the terminal feels safer than a midnight shuttle to an unfamiliar hotel. If you do leave, note that the last metro to the city runs before midnight — check the schedule for your date.</p>[[videos:tfu-layover]]<h2>When to Skip the Airport Entirely</h2><p>Metro Line 18 links TFU to downtown Chengdu in roughly 40–50 minutes on the express. The math only works with a generous layover: two metro legs plus security re-entry plus Chengdu\'s portion sizes means you want 6+ hours before your next flight. With that kind of time — and the right passport — it is absolutely worth it. China\'s visa-free transit policy now covers many nationalities for up to 240 hours (check the current list before you fly), and a bowl of dan dan noodles in the actual city beats anything in any terminal. Our full <a href="/guides/chengdu-food-guide">Chengdu food guide</a> has the shortlist.</p><h2>Flying Through Shuangliu (CTU) Instead</h2><p>Chengdu\'s older airport, Shuangliu (CTU), sits much closer to the city — but do not sleep on its food. A 169K-view vlog toured CTU\'s terminal snack street, where crayfish are sold by weight at about ¥18 per 500g, alongside noodle stalls and a luosifen counter so popular that one regular went six days in a row without catching it open.</p><p>The bigger insider play near CTU is the staff canteen where uniformed airline crews actually eat:</p><blockquote><p>"Nongjia Family Restaurant, Jichang East 2nd Road, Shuanglu District: tofu-and-beef pot ¥48, rice ¥2. It\'s genuinely good — it\'s where tons of airport staff eat. Avoid the lunch rush, portions are huge, and the fried-skewer place next door is decent too."</p><footer>— Bilibili comment, 208 likes (address and prices as posted; translated from Chinese)</footer></blockquote><p>Thirty-odd yuan to eat like a flight attendant, five minutes from the terminal — that is the Chengdu way.</p>[[videos:ctu-street]]<h2>Quick Decision Table</h2><table><thead><tr><th>Your situation</th><th>Best move</th><th>Budget</th></tr></thead><tbody><tr><td>Short layover (&lt;2h free time)</td><td>Chen Mapo Tofu or noodle counter inside TFU</td><td>¥35–70</td></tr><tr><td>Budget tight</td><td>Convenience-store bento + drink (city-priced)</td><td>¥10–25</td></tr><tr><td>4+ hours, adventurous</td><td>Taxi to Caochi/Shibandeng fly restaurants</td><td>¥20–40 + taxi</td></tr><tr><td>Overnight</td><td>Shuttle hotel (~¥100) or sleep pod (¥200+)</td><td>¥100–250</td></tr><tr><td>6+ hours, right passport</td><td>Metro Line 18 → downtown Chengdu</td><td>¥10 each way + meal</td></tr></tbody></table>',
      zh: '<p>成都天府国际机场（TFU）是全球最大的机场之一，2021 年投运，距市中心以南约 50 公里。这段距离决定了你的整个觅食策略，中国网友已经把它总结成一个段子：</p><blockquote><p>"天府机场还是挺公平的。去国内大多数地方都是两小时，当然，也包括去成都。"</p><footer>— B 站评论，1177 赞</footer></blockquote><p>这篇指南讲清楚：两个航站楼里到底有什么、本地人的省钱技巧、机组和地勤去哪吃、过夜转机的真实价格——以及什么时候该直接坐地铁进城。</p><h2>航站楼里怎么吃</h2><p>天府机场有正经川菜，不只是汉堡连锁。本地人最常见的建议非常直接：别折腾出机场，就在航站楼里的陈麻婆豆腐吃——麻婆豆腐是成都的招牌，机场店省你一趟打车钱。</p><blockquote><p>"有一说一，直接天府机场里面吃陈麻婆豆腐就行了，不要跑出来了，你从天府机场跑这儿吃饭，车费很有可能贵得爆。"</p><footer>— 机场周边探店视频下的 B 站评论</footer></blockquote><p>一条 56 万播放的视频里，中国头部吃播在天府机场正儿八经吃了顿川菜，结果中途换登机口差点误机——教训：航站楼巨大，登机口走起来很远，屏幕信息变得很快。吃完饭去远端登机口，请预留 20–30 分钟。</p><h3>10 元吃饱的技巧（本地人最爱）</h3><p>机场餐厅到处都溢价，便利店不溢价——因为它没法溢价。罗森、全家这类连锁的盒饭、饭团、三明治，价格是厂家印在包装上的，机场店也只能按市区价卖。地勤和机场员工自己就在那里解决午饭：</p><blockquote><p>"机场的罗森、全家这种便利店的自制食品（盒饭、饭团之类的）价格和外边都是一样的，因为这些产品的价格都是标在包装上的。"</p><footer>— B 站评论，161 赞</footer></blockquote><p>另一个常旅客操作：直接进休息室。很多信用卡和会员权益都送机场休息室，里面通常有面、小吃和饮料。</p>[[videos:tfu-inside]]<h2>机场工作人员去哪吃</h2><p>转机时间 4 小时以上，可以出航站楼探索另一番成都：苍蝇馆子——装修将就、味道惊人、家庭经营的路边小店。天府机场周边的小镇上到处都是，最懂行的人就是在那里上班的人。在一条机场周边苍蝇馆子探店视频下面，一位自称在机场干了 7 年的老员工留下了权威清单：</p><blockquote><p>"草池李二姐，石板凳汪氏羊肉汤，机场里面东航中心董蹄花，7 年天府机场人言尽于此。"</p><footer>— 机场员工的 B 站评论，73 赞</footer></blockquote><p>草池、石板凳是距航站楼不远的两个小镇，打车几分钟。照着老客点：汪氏羊肉汤、董蹄花（炖猪肘），人均 20–40 元——但记住上面的警告：来回打车费可能比饭钱还贵。</p>[[videos:tfu-nearby]]<h2>过夜转机：太空舱、角落，还是接送机酒店？</h2><p>天府机场的太空舱/睡眠舱约 200 元一晚起。试过的人评价两极——躺一小时很香，睡一整晚遭罪：</p><blockquote><p>"太空舱两百多……还不如一开始就买直飞的，简直受罪。太空舱总感觉像棺材，隔音很差。"</p><footer>— 天府机场过夜攻略视频下的 B 站评论</footer></blockquote><blockquote><p>"我是在天府附近定了酒店，免费接送机，一百出头一晚，比太空舱合适，还能洗漱。"</p><footer>— B 站评论，73 赞</footer></blockquote><p>深夜落地的独行女生，评论区的意见相反：航站楼里太空舱区域有安保和监控，比半夜坐摆渡车去陌生酒店更安心。另外，末班地铁在午夜前就收车，出行前查好当天的时刻表。</p>[[videos:tfu-layover]]<h2>什么时候干脆别在机场吃</h2><p>地铁 18 号线快车从天府机场到市中心约 40–50 分钟。账要这么算：两程地铁 + 二次安检 + 成都的菜量，转机时间 6 小时以上才值得。有这个时间、护照又合适的话，绝对值得——中国的过境免签政策目前对许多国家护照开放最长 240 小时（出行前查最新名单），在市区吃一碗真正的担担面，胜过任何航站楼。完整的店铺清单看我们的<a href="/guides/chengdu-food-guide">成都美食全指南</a>。</p><h2>飞双流（CTU）的看这里</h2><p>成都的老机场双流离市区近得多，但伙食不容小觑。一条 16.9 万播放的视频逛了双流航站楼里的小吃街：小龙虾按斤卖约 18 元/斤，还有面档和一家让常客连去六天都扑空的螺蛳粉档口。</p><p>双流周边更大的宝藏是空乘制服小姐姐们真正去吃的员工食堂：</p><blockquote><p>"农家菜馆，成都市双流区机场东二路：豆花牛肉 48，米饭 2。这家真的好吃，很多机场员工的食堂，要去要避开正饭点，菜量也大，另外旁边那家油炸串串也还可以。"</p><footer>— B 站评论，208 赞（地址与价格为评论原文）</footer></blockquote><p>离航站楼五分钟，三十来块吃得像机组一样好——这就是成都的规矩。</p>[[videos:ctu-street]]<h2>快速决策表</h2><table><thead><tr><th>你的情况</th><th>最优解</th><th>预算</th></tr></thead><tbody><tr><td>转机时间紧（空闲 &lt;2 小时）</td><td>航站楼内陈麻婆豆腐或面档</td><td>¥35–70</td></tr><tr><td>预算有限</td><td>便利店盒饭 + 饮料（市区同价）</td><td>¥10–25</td></tr><tr><td>4 小时以上，想探险</td><td>打车去草池/石板凳苍蝇馆子</td><td>¥20–40 + 打车</td></tr><tr><td>过夜</td><td>接送机酒店（约 ¥100）或太空舱（¥200+）</td><td>¥100–250</td></tr><tr><td>6 小时以上，护照合适</td><td>地铁 18 号线 → 市区</td><td>¥10/程 + 餐费</td></tr></tbody></table>',
    },
    image: '/images/dumplings/guide-cover.jpg',
    readTime: { en: '9 min read', zh: '阅读 9 分钟' },
    views: { en: '2.4k reads', zh: '阅读 2400' },
    publishedAt: { en: 'Just published', zh: '刚刚发布' },
    featured: false,
    videos: airportVideoGroups,
    faq: [
      {
        q: { en: 'Is food expensive at Chengdu Tianfu Airport?', zh: '成都天府机场吃饭贵吗？' },
        a: {
          en: 'Airport restaurants carry a premium — expect ¥35–70 for a noodle or rice dish. The escape hatch is convenience stores: Lawson and FamilyMart bentos and rice balls sell at city prices because the price is printed on the package, so a full meal for ¥10–20 is genuinely possible.',
          zh: '机场餐厅有溢价——一碗面或一份饭约 ¥35–70。逃生通道是便利店：罗森、全家的盒饭饭团按市区价卖（价格印在包装上），10–20 元吃一顿完全可行。',
        },
      },
      {
        q: { en: 'Are there halal food options at Chengdu airports?', zh: '成都机场有清真餐吗？' },
        a: {
          en: 'Lanzhou beef noodle shops — typically Muslim-run and pork-free — are the standard halal-friendly option in Chinese airports; look for the 清真 (halal) sign. If you have a long layover and the right passport, the city has a proper halal food scene; our halal Chengdu guide covers it in detail.',
          zh: '兰州拉面店——通常是穆斯林经营、无猪肉——是中国机场里标准的清真友好选项，认准"清真"标识。如果转机时间长、护照合适，市区有真正的清真美食圈，详见我们的成都清真美食指南。',
        },
      },
      {
        q: { en: 'Can I leave Tianfu Airport during a layover?', zh: '转机时能出天府机场吗？' },
        a: {
          en: 'Yes, with a valid visa or visa-free transit eligibility — China\'s transit policy now covers many nationalities for up to 240 hours; check the current list. Practically you want 6+ hours: Metro Line 18 takes about 40–50 minutes each way, plus security re-entry. With less time, eat inside the terminal or taxi to the fly restaurants near Caochi or Shibandeng.',
          zh: '可以，需要有效签证或符合过境免签——目前政策覆盖多国护照、最长 240 小时，出行前查最新名单。实际操作建议 6 小起：地铁 18 号线单程约 40–50 分钟，还要算上二次安检。时间不够就在航站楼里吃，或打车去草池、石板凳的苍蝇馆子。',
        },
      },
      {
        q: { en: 'Where can I eat or sleep late at night at TFU?', zh: '天府机场深夜能吃饭/睡觉吗？' },
        a: {
          en: 'Convenience stores in the terminal keep long hours for snacks and boxed meals. For sleeping, TFU sells nap pods from around ¥200, while nearby hotels with free airport shuttles start just over ¥100 a night — solo travelers often prefer the monitored pod area inside the terminal for safety. The last metro to the city leaves before midnight.',
          zh: '航站楼便利店营业到很晚，能买到小吃和盒饭。睡觉方面，太空舱约 ¥200 起，机场周边带免费接送的酒店一百出头一晚——独行旅客出于安全考虑常选航站楼内有监控的太空舱区域。末班地铁在午夜前发车。',
        },
      },
      {
        q: { en: 'Which Chengdu airport has better food, Tianfu (TFU) or Shuangliu (CTU)?', zh: '天府和双流哪个机场伙食好？' },
        a: {
          en: 'Both eat surprisingly well by airport standards. CTU is compact with a terminal snack street — crayfish by weight at ~¥18/500g and a famous luosifen stall. TFU is newer and vast, with real sit-down Sichuan including Chen Mapo Tofu. Near either one, staff-canteen restaurants serve airline-crew meals from ¥30.',
          zh: '按机场标准两家都吃得意外地好。双流紧凑，航站楼里有小吃街——按斤卖的小龙虾（约 18 元/斤）和网红螺蛳粉档口；天府更新更大，有陈麻婆豆腐这样的正经堂食川菜。两场周边都有员工食堂系餐馆，30 元起吃得像机组。',
        },
      },
      {
        q: { en: 'How far is Tianfu Airport from downtown Chengdu?', zh: '天府机场离成都市区多远？' },
        a: {
          en: 'About 50 km (31 miles). Metro Line 18 covers it in roughly 40–50 minutes; a taxi or DiDi runs ¥100+ and 60–90 minutes depending on traffic. The distance is why locals joke that "from Tianfu, even Chengdu is two hours away" — build it into any city-during-layover plan.',
          zh: '约 50 公里。地铁 18 号线约 40–50 分钟；打车或网约车 ¥100 起，视路况 60–90 分钟。所以本地人才开玩笑"从天府出发，连成都都是两小时以外"——规划进城觅食时务必算进去。',
        },
      },
    ],
    relatedLinks: [
      { to: '/guides/chengdu-food-guide', label: { en: 'The Chengdu Food Guide', zh: '成都美食全指南' } },
      { to: '/guides/halal-food-in-chengdu', label: { en: 'Halal Food in Chengdu', zh: '成都清真美食指南' } },
      { to: '/cities/chengdu', label: { en: 'Chengdu City Guide', zh: '成都城市页' } },
      { to: '/guides/first-trip-to-china-guide', label: { en: 'First Trip to China', zh: '第一次来中国' } },
    ],
  },
  {
    slug: 'halal-food-in-chengdu',
    title: {
      en: 'Halal Food in Chengdu, China: A Practical Guide for Muslim Travelers (+ Phrase Card)',
      zh: '成都清真美食指南：穆斯林游客实用攻略（含点餐短语卡）',
    },
    label: { en: 'Halal Guide', zh: '清真美食指南' },
    excerpt: {
      en: 'Yes, halal eating in China\'s pork-loving capital of gastronomy works — if you know the system: Sichuan-style all-beef halal kitchens, the Hui history around Tianfu Square, Lanzhou noodle shops as the everyday safety net, the lard-and-cooking-wine traps, and a phrase card that does the talking.',
      zh: '在这座以美食闻名的"猪肉之都"吃清真完全可行——只要懂规则：川味全牛清真馆子、天府广场旁的回民街区史、作为日常安全网的兰州拉面、猪油与料酒的隐形陷阱，外加一张能替你说话的短语卡。',
    },
    content: {
      en: '<p>Chengdu\'s most famous dishes read like a halal traveler\'s obstacle course: mapo tofu traditionally carries minced pork, twice-cooked pork is — pork, and lard quietly shows up in pastries and snacks. And yet the UNESCO City of Gastronomy has a real, living halal food scene, because the city has been home to a Hui Muslim community for centuries. The trick is knowing the system: where the halal kitchens are, what the hidden traps are, and how to say the one sentence that changes everything.</p><h2>Sichuan-Style Halal: The All-Beef Kitchen</h2><p>The most pleasant surprise for most Muslim visitors is <em>chuan-wei qingzhen cai</em> (川味清真菜) — halal cooking done with full Sichuan technique. These restaurants go all-in on beef: stir-fried beef brain, braised marrow, sliced tongue and tripe in bright chili oil, all over free-flowing rice. The style was built by Chengdu\'s Hui cooks who took the city\'s flavor playbook and ran it entirely on beef and lamb.</p><p>The most-watched recent window into this world is a video by Sichuan-born actor Wang Xun — a Chengdu local — touring the Hui-run restaurant he has eaten at for years (227K views). A popular food vlog meanwhile documented Huangchengba Beef Restaurant in the Xiaojiaghe residential quarter, where the all-beef menu runs brain-to-tail and the owner hands you a basin because the rice bowls are too small.</p><blockquote><p>"What Chengdu truly does well is fragrant, not just spicy. These past few years some influencers have skewed it, chasing oily-and-hot."</p><footer>— Bilibili comment on a Chengdu halal food vlog (translated from Chinese)</footer></blockquote><blockquote><p>"Chengdu no longer allows live slaughter inside the city, so the freshest ingredients are out in the suburbs — Xindu district has the cattle and sheep abattoirs."</p><footer>— Bilibili comment, 12 likes (translated from Chinese)</footer></blockquote><p>That second comment matters more than it looks: halal and freshness run on the same logic. Beef restaurants that need same-day meat buy from the suburban slaughter belt, which is one reason the city\'s halal beef tastes notably better than the frozen import.</p>[[videos:halal-chengdu]]<h2>A Short History: The Old Hui Quarter</h2><p>Chengdu\'s Hui community historically centered on <em>Huangchengba</em> (皇城坝， "the palace grounds") — the streets around today\'s Tianfu Square and Xiyu Street, where the city\'s historic mosques still stand, including the Qing-era Huangcheng Mosque. Beef shops, mutton stalls and halal butchers clustered there for generations, and the "Huangchengba beef" name still marks Hui-run beef restaurants across the city. When locals point you to "the old halal block," this is what they mean — and as one Bilibili commenter put it after a visit, "several of the halal restaurants around here are solid."</p><h2>The Everyday Safety Net: Lanzhou Noodle Shops</h2><p>Your default option in any Chinese city is the Lanzhou beef noodle shop (兰州拉面) — look for the Arabic 清真 halal sign and hand-pulled noodles. These shops are typically run by Hui or Dongxiang families from Gansu and Qinghai; pork, lard and cooking wine simply do not enter the kitchen. The standard order — a bowl of beef noodle soup with an egg, or a plate of stir-fried noodles with beef — costs ¥12–20 and is on every street corner of Chengdu. Watch a bowl being made properly at the source in Lanzhou and you\'ll know what the benchmark tastes like.</p><h2>Winter Bonus: Sichuan\'s Mutton Soup Culture</h2><p>From late autumn through winter, Sichuan runs on mutton soup. The most famous version comes from Jianyang on Chengdu\'s eastern edge: a milk-white, long-boiled broth served with fire-blasted lamb liver and kidney, considered one of China\'s four great mutton soups. Many shops in this tradition are Hui-run — but not all, so do what locals do and check for the 清真 crescent sign before sitting down.</p>[[videos:halal-staples]]<h2>The Traps: What \'No Pork\' Does Not Mean</h2><p>This is the part that matters most. In Sichuan, a dish can contain zero pork and still not be halal:</p><table><thead><tr><th>Hidden ingredient</th><th>Where it hides</th><th>The question to ask</th></tr></thead><tbody><tr><td>Lard (猪油)</td><td>Pastries, fried snacks, some fried rice and noodle dishes</td><td>里面有猪油吗？ (Does it contain lard?)</td></tr><tr><td>Cooking wine (料酒)</td><td>Marinades, braises, fried rice — almost everywhere pork is cooked</td><td>有料酒吗？ (Is there cooking wine?)</td></tr><tr><td>Shared woks</td><td>Ordinary restaurants cook pork in the same wok</td><td>Stick to 清真 restaurants and skip the worry</td></tr></tbody></table><p>Two more specifics: mapo tofu\'s classic version uses minced pork — at halal restaurants it comes with beef instead and loses nothing. And hot pot: the classic Chengdu broth is beef-tallow based, but sourcing varies, so the safe play is one of the city\'s halal hot pot restaurants rather than guessing at a regular one.</p><h2>The Phrase Card</h2><p>Screenshot this. In Chengdu it does more work than any app:</p><table><thead><tr><th>Chinese</th><th>Pinyin</th><th>English</th></tr></thead><tbody><tr><td>我吃清真</td><td>Wǒ chī qīngzhēn</td><td>I eat halal</td></tr><tr><td>我不吃猪肉</td><td>Wǒ bù chī zhūròu</td><td>I don\'t eat pork</td></tr><tr><td>里面有猪油吗？</td><td>Lǐmiàn yǒu zhūyóu ma?</td><td>Does it contain lard?</td></tr><tr><td>有料酒吗？</td><td>Yǒu liàojiǔ ma?</td><td>Is there cooking wine in it?</td></tr><tr><td>哪里有清真餐厅？</td><td>Nǎlǐ yǒu qīngzhēn cāntīng?</td><td>Where is a halal restaurant?</td></tr><tr><td>牛肉面，微辣</td><td>Niúròu miàn, wēi là</td><td>Beef noodles, mild spice</td></tr></tbody></table><h2>How to Find Halal Food in Chengdu, Fast</h2><p>The green-and-white 清真 crescent logo is the universal marker — on shopfronts, packaging and restaurant licenses. In the Dianping app (China\'s Yelp), search 清真 filtered to Chengdu and sort by rating. Around both mosques and university areas, halal options cluster. Airports and train stations reliably host a Lanzhou noodle shop. And if your trip continues northwest, Xi\'an\'s Muslim Quarter — a 3-hour high-speed rail away — is the halal food capital of the region; our Xi\'an guide covers it street by street.</p>',
      zh: '<p>成都最有名的菜式清单，在穆斯林游客眼里像闯关：麻婆豆腐传统做法放猪肉末、回锅肉就是猪肉，猪油还会悄无声息地出现在点心小吃里。但这座联合国"美食之都"有一个真实活着的清真饮食圈——因为这座城市数百年来一直有回族社区。诀窍在于懂规则：清真厨房在哪、隐形陷阱是什么、以及那句能改变一切的话怎么说。</p><h2>川味清真：全牛馆子</h2><p>大多数穆斯林游客最惊喜的发现是"川味清真菜"——用完整川菜技法做的清真菜。这类馆子全线做牛：炒牛脑花、烧牛骨髓、红油牛舌牛肚，配管够的米饭。这套味型由成都的回族厨师建立：拿过城市的川菜 playbook，全部换成牛肉和羊肉来跑。</p><p>观察这个世界最近的一扇高播放量窗口，是川籍演员王迅（成都本地人）探店他吃了多年的回民餐馆（22.7 万播放）。另一位人气美食博主则记录了肖家河居民区的皇城坝牛肉馆：全牛菜单从脑花到牛尾，老板直接递盆来盛饭，因为碗太小。</p><blockquote><p>"成都真正做得好的就是香而不辣。这几年被一些网红带偏了，切追求又油又辣。"</p><footer>— 清真探店视频下的 B 站评论</footer></blockquote><blockquote><p>"因为成都不允许市区鲜活宰杀，所以最新鲜的食材都在郊区了。新都那边有牛羊屠宰场。"</p><footer>— B 站评论，12 赞</footer></blockquote><p>第二条评论比看上去重要：清真与新鲜走的是同一套逻辑。需要当日鲜肉的牛肉馆子从郊区屠宰带进货，这也是城市里的清真牛肉明显好吃过冷冻货的原因之一。</p>[[videos:halal-chengdu]]<h2>一小段历史：老回民街区</h2><p>成都回族社区历史上以"皇城坝"为中心——今天天府广场、西御街一带，城市的古老清真寺至今仍立在那里，包括清代建的皇城清真寺。牛肉铺、羊肉摊、清真牛屠户在此聚集了数代人，"皇城坝牛肉"的名字至今标注着全城的回民牛肉馆。本地人说"老清真那一块"，指的就是这里——正如一位 B 站网友探店后的评价："这儿几家清真馆子和拌菜都可以。"</p><h2>日常安全网：兰州拉面</h2><p>在任何中国城市，你的默认选项都是兰州牛肉拉面店——认准阿拉伯文与"清真"标识、现拉的面。这些店通常由甘肃、青海的回族或东乡族家庭经营，猪肉、猪油、料酒根本进不了厨房。标准点法——一碗牛肉汤面加蛋，或一盘牛肉炒面——12–20 元，成都每条街角都有。看一碗在兰州原产地被认真做出来的面，你就知道基准线是什么味道。</p><h2>冬季加菜：四川的羊肉汤文化</h2><p>从深秋到冬天，四川靠羊肉汤运转。最有名的版本来自成都东郊的简阳：奶白色久熬汤底，配火爆羊肝羊腰，号称四大羊肉汤之一。这个传统里的许多店家是回民经营——但不是全部，所以照本地人的做法：坐下之前先看清真新月标识。</p>[[videos:halal-staples]]<h2>陷阱：「没有猪肉」不等于清真</h2><p>这是最重要的部分。在四川，一道菜可以一点猪肉都不含、但仍然不清真：</p><table><thead><tr><th>隐形食材</th><th>藏在哪</th><th>要问的话</th></tr></thead><tbody><tr><td>猪油</td><td>酥点、炸物、部分炒饭炒面</td><td>里面有猪油吗？</td></tr><tr><td>料酒</td><td>腌制、红烧、炒饭——凡做猪肉的地方几乎都有</td><td>有料酒吗？</td></tr><tr><td>共用炒锅</td><td>普通餐馆同一口锅炒猪肉</td><td>只进清真餐馆，无需担心</td></tr></tbody></table><p>再补两个具体点：麻婆豆腐经典版用猪肉末——清真餐馆换成牛肉末，风味毫不逊色。火锅：成都经典锅底是牛油锅底，但货源不一，稳妥做法是选城里的清真火锅店，而不是在普通店里猜。</p><h2>短语卡</h2><p>截这张图。在成都，它比任何 App 都好用：</p><table><thead><tr><th>中文</th><th>拼音</th><th>English</th></tr></thead><tbody><tr><td>我吃清真</td><td>Wǒ chī qīngzhēn</td><td>I eat halal</td></tr><tr><td>我不吃猪肉</td><td>Wǒ bù chī zhūròu</td><td>I don\'t eat pork</td></tr><tr><td>里面有猪油吗？</td><td>Lǐmiàn yǒu zhūyóu ma?</td><td>Does it contain lard?</td></tr><tr><td>有料酒吗？</td><td>Yǒu liàojiǔ ma?</td><td>Is there cooking wine in it?</td></tr><tr><td>哪里有清真餐厅？</td><td>Nǎlǐ yǒu qīngzhēn cāntīng?</td><td>Where is a halal restaurant?</td></tr><tr><td>牛肉面，微辣</td><td>Niúròu miàn, wēi là</td><td>Beef noodles, mild spice</td></tr></tbody></table><h2>在成都快速找到清真美食</h2><p>绿白配色的"清真"新月标识是通用标记——门头、包装、经营许可证上都有。在大众点评搜"清真"并按评分排序。清真寺和大学周边，清真选项天然成簇。机场和火车站必有兰州拉面。如果你的行程继续往西北走，3 小时高铁外的西安回民街是整个西北的清真美食之都——我们的西安指南逐街讲过它。</p>',
    },
    image: '/images/dumplings/baozi.jpg',
    readTime: { en: '8 min read', zh: '阅读 8 分钟' },
    views: { en: '1.9k reads', zh: '阅读 1900' },
    publishedAt: { en: 'Just published', zh: '刚刚发布' },
    featured: false,
    videos: halalVideoGroups,
    faq: [
      {
        q: { en: 'Is Chengdu halal-friendly for Muslim travelers?', zh: '成都对穆斯林游客友好吗？' },
        a: {
          en: 'Yes, with know-how. Chengdu has a centuries-old Hui community, all-beef Sichuan-style halal restaurants, Lanzhou noodle shops on every corner (¥12–20 a bowl), and halal options at airports and stations. The traps are lard and cooking wine in ordinary restaurants — the phrase card in this guide handles that.',
          zh: '友好，但要懂方法。成都回族社区有数百年历史，有全牛系的川味清真馆子、每条街角的兰州拉面（12–20 元一碗），机场车站也有清真选项。陷阱是普通餐馆里的猪油和料酒——用本文的短语卡就能应对。',
        },
      },
      {
        q: { en: 'Does mapo tofu contain pork?', zh: '麻婆豆腐里有猪肉吗？' },
        a: {
          en: 'The classic version does — minced pork is traditional. At halal restaurants it is made with minced beef instead and is every bit as good. Otherwise, ask for a vegetarian version or skip it at non-halal kitchens.',
          zh: '经典版本有——猪肉末是传统做法。清真餐馆会换成牛肉末，风味不输。其他情况下可以要素版，或在非清真厨房直接跳过它。',
        },
      },
      {
        q: { en: 'Are there halal hot pot restaurants in Chengdu?', zh: '成都有清真火锅吗？' },
        a: {
          en: 'Yes — halal hot pot exists in Chengdu, running on beef and lamb with certified broths. Since ordinary Chengdu hot pot uses beef tallow of varying sourcing and shared wok traffic, booking a halal hot pot restaurant is the stress-free choice.',
          zh: '有——成都清真火锅做牛羊肉、锅底有资质认证。普通成都火锅的牛油货源不一、锅具混用，想吃火锅，订清真火锅店是最省心的选择。',
        },
      },
      {
        q: { en: 'How do I recognize a halal restaurant in China?', zh: '在中国怎么认出清真餐厅？' },
        a: {
          en: 'Look for the green-and-white 清真 crescent logo on the shopfront or license, often alongside Arabic script. Lanzhou beef noodle shops displaying it are the most reliable quick meal nationwide. When in doubt, ask: 我吃清真 (wǒ chī qīngzhēn) — "I eat halal."',
          zh: '看门头或执照上绿白配色的"清真"新月标识，常伴阿拉伯文。带此标识的兰州拉面店是全国最可靠的快餐。拿不准就问：我吃清真——英文即 "I eat halal"。',
        },
      },
      {
        q: { en: 'Where do locals eat halal food in Chengdu?', zh: '本地人在成都哪里吃清真？' },
        a: {
          en: 'The historic cluster is the old Huangchengba Hui quarter near Tianfu Square and its mosques; Hui-run beef restaurants like the Huangchengba Beef Restaurant in Xiaojiaghe appear across the city, and commenters under local food vlogs regularly swap more picks in the same blocks.',
          zh: '历史上以天府广场周边清真寺所在的老皇城坝回民街区为核心；像肖家河皇城坝牛肉馆这样的回民牛肉馆遍布全城，本地探店视频评论区常接力补充同街段的更多选择。',
        },
      },
    ],
    relatedLinks: [
      { to: '/guides/chengdu-food-guide', label: { en: 'The Chengdu Food Guide', zh: '成都美食全指南' } },
      { to: '/guides/chengdu-airport-food-guide', label: { en: 'Chengdu Airport Food Guide', zh: '天府机场美食指南' } },
      { to: '/cities/xian', label: { en: 'Xi\'an: Muslim Quarter & More', zh: '西安：回民街之城' } },
      { to: '/cities/chengdu', label: { en: 'Chengdu City Guide', zh: '成都城市页' } },
    ],
  },
  {
    slug: 'chengdu-vs-chongqing-food',
    title: {
      en: 'Chengdu vs Chongqing Food: The Real Differences (Broth, Spice, Scene & Which City to Pick)',
      zh: '成都 vs 重庆美食终极对比：锅底、辣度、场景与选城指南',
    },
    label: { en: 'Rivalry Guide', zh: '双城对比' },
    excerpt: {
      en: 'Same cuisine family, two completely different eaters\' cities. The beef-tallow vs clear-oil hotpot divide, jianghu plates vs teahouse snacks, cave restaurants vs alley stalls — plus the honest answer to which city belongs on your trip.',
      zh: '同一个菜系家族，两座完全不同的吃货城市。牛油vs清油的锅底之争、江湖大菜vs茶馆小吃、防空洞火锅vs巷巷苍蝇馆——以及你的行程到底该选哪座城的诚实答案。',
    },
    content: {
      en: '<p>Ask any local which city eats better, Chengdu or Chongqing, and you have started a war that has no ending. The two rivals sit 300 km apart in the Sichuan basin, cook under the same "Sichuan cuisine" flag, and disagree about nearly everything that matters: what oil goes in the pot, how loud the chili should shout, whether food belongs in a teahouse or a bomb shelter. Here is the honest breakdown, with no winner declared — because the real answer is the high-speed rail that connects them in about an hour.</p><h2>The Broth Divide: Tallow vs Clear Oil</h2><p>Hotpot is where the rivalry shows its teeth. Chongqing hotpot runs on beef tallow (牛油) — a dense, scarlet, uncompromising fat that holds chili and Sichuan peppercorn like a fist. The flavor hits immediately and does not leave. It grew out of dockworkers\' cooking: cheap offal, brutal fuel, maximum flavor.</p><p>Chengdu hotpot leans on clear oil (清油) — rapeseed or seed oil infused with aromatics — layered, fragrant, and easier on a first-timer. Chengdu also civilized the ritual: think dipped-in-sesame-oil-and-garlic sauce culture, restaurant dining rooms, tables of small snacks around the pot. The shorthand locals use: Chongqing hotpot is fire; Chengdu hotpot is perfume.</p><table><thead><tr><th></th><th>Chongqing</th><th>Chengdu</th></tr></thead><tbody><tr><td>Base fat</td><td>Beef tallow (牛油), thick and intense</td><td>Clear/seed oil (清油), fragrant and layered</td></tr><tr><td>Chili character</td><td>Direct, aggressive heat</td><td>Layered mala, numbing balanced with fragrance</td></tr><tr><td>Signature items</td><td>Offal tripe, duck intestine, 毛肚</td><td>Tripe family + creative platters, dipping sauces</td></tr><tr><td>Setting</td><td>Cave hotpot, stilt-house streets, 九宫格 nine-grid pots</td><td>Dining-room hotpot, plus chuanchuan and maocai offshoots</td></tr><tr><td>Temperament</td><td>Jianghu — bold, loud, generous</td><td>Refined, playful, snack-minded</td></tr></tbody></table><h2>The Dishes: Jianghu Plates vs Teahouse Snacks</h2><p>Chongqing feeds you in bistro-sized shouting portions of jianghu cuisine — "rivers-and-lakes" home cooking served like a dare: lazi chicken buried in a mountain of fried chilies, Maoxuewang (blood curd and tripe stew in red oil), whole grilled fish under pepper avalanches. Breakfast is non-negotiable: xiaomian, the ¥10–15 bowl of springy noodles with chili oil and peas (wanza) that the whole city queues for before 9 AM.</p><p>Chengdu counters with a cabinet of small, precise pleasures: mapo tofu, twice-cooked pork, dan dan noodles, Zhong dumplings in sweet-spicy chili oil, sweet ice jelly for dessert, rabbit head for the brave. The portion logic is "order many, taste all." And the whole thing runs at teahouse speed — a gaiwan of tea in People\'s Park can legally occupy an afternoon.</p><blockquote><p>"After all the mountain-and-sea delicacies, you come home to a big bowl of wanza noodles — there\'s a beauty in washing off the glamour and returning to plainness."</p><footer>— Bilibili comment on a Chongqing noodle video, 3.6K likes (translated from Chinese)</footer></blockquote>[[videos:versus-chongqing]]<h2>The Scene: Where You Eat It</h2><p>Chongqing eats inside geography: WWII air-raid shelters turned hotpot dining halls, restaurants stacked up the cliff faces of the "8D city," noodle shops under the light rail. The most famous visitor\'s introduction to the cave hotpot is a 2.8M-view vlog by a long-term foreign resident, who eats his way through the shelter and explains why the cave — steam, tallow, history — is the city\'s soul.</p><p>Chengdu eats inside time: the slow teahouse afternoon, the back-alley maocai stall with no signboard that opens four hours a day while neighbors arrive carrying their own pots (a 5M-view cult classic of the genre), the late-night tihua trotter soup after the bars close. For the classic Chengdu pot, locals still route to decades-old counters — under one such video a commenter pinned the exact route: "The Huafeng branch on East Street — Exit C of Dongmen Bridge station, toward Niuwangmiao, first lane opposite Jiaochangba. The Xinhua Park and Erxianqiao branches taste the same."</p>[[videos:versus-chengdu]]<h2>Spice: Which City Burns More?</h2><p>Chongqing, and it is not close. Chengdu cooking aims at <em>mala</em> balance — numbing and aromatic in equal measure, with heat you can negotiate with ("wei la," mild, is a fully respectable order). Chongqing cooking treats heat as a feature, not a variable. First-timers with low chili tolerance usually last longer in Chengdu; heat-seekers get their ceiling in Chongqing, where even the breakfast noodles arrive pre-armed.</p><h2>So Which City Should You Pick?</h2><table><thead><tr><th>Choose Chengdu if…</th><th>Choose Chongqing if…</th></tr></thead><tbody><tr><td>You want variety — snacks, sweets, teahouses, plus the panda base</td><td>You want intensity — one unforgettable pot in a cave beats eight nice dishes</td></tr><tr><td>Your chili tolerance is negotiable</td><td>Your chili tolerance is a point of pride</td></tr><tr><td>You prefer a slow, walkable flat city</td><td>You want the vertical, neon, cinematic mountain city</td></tr><tr><td>You have 3+ days and want museums + food</td><td>You have 1–2 days and want maximum food per hour</td></tr></tbody></table><h2>The Real Answer: Do Both</h2><p>The Chengdu–Chongqing high-speed rail covers the 300 km in roughly 1–2 hours, with trains every few minutes at peak. The classic food crawl: two days of Chengdu (dumplings and dan dan noodles, a clear-oil pot, teahouse afternoon, rabbit head if you dare), then the train east, a Chongqing xiaomian breakfast off the station, jianghu plates for lunch, and a tallow nine-grid inside a bomb shelter for dinner — with the night skyline across the river for dessert. Five days, two food identities, zero regrets, and both cities get to believe they won.</p>',
      zh: '<p>问任何一个本地人"成都和重庆哪座城市更好吃"，你就发动了一场没有终点的战争。这对冤家相距 300 公里，同在四川盆地、同挂"川菜"门旗，却在所有要紧的事上各执一词：锅里放什么油、辣椒该喊多大声、食物该待在茶馆还是防空洞。这是一份诚实的拆解，不判胜负——因为真正的答案，是那趟一小时出头就把两座城连起来的高铁。</p><h2>锅底之争：牛油 vs 清油</h2><p>火锅是战争的正面试战场。重庆火锅以牛油为魂——浓稠、猩红、不由分说，把辣椒和花椒攥在拳头里，味道一上来就不打算走。它长自码头工人的吃法：便宜下水、猛火重油、最大化风味。</p><p>成都火锅偏清油——菜籽油或色拉油熬香料——有层次、重香气，对新手友好。成都还把仪式"文明化"了：香油蒜泥碟的蘸料文化、正式的堂食环境、锅边摆一桌小吃。本地人的速记：重庆火锅是火，成都火锅是香。</p><table><thead><tr><th></th><th>重庆</th><th>成都</th></tr></thead><tbody><tr><td>锅底用油</td><td>牛油，厚且猛</td><td>清油，香且有层次</td></tr><tr><td>辣的性格</td><td>直接、暴烈</td><td>麻辣分层，麻与香平衡</td></tr><tr><td>代表菜</td><td>毛肚、鸭肠等下水系</td><td>毛肚系 + 创意拼盘、蘸料文化</td></tr><tr><td>场景</td><td>防空洞火锅、吊脚楼街区、九宫格</td><td>堂食火锅 + 串串、冒菜分支</td></tr><tr><td>气质</td><td>江湖——豪爽、大声、量大</td><td>精致——俏皮、小吃思维</td></tr></tbody></table><h2>菜式：江湖大菜 vs 茶馆小吃</h2><p>重庆用脸盆分量的江湖菜喂你——"江湖"即豪迈家常，上桌像下战书：埋在辣椒山里的辣子鸡、红油毛血旺、辣椒雪崩下的整条烤鱼。早餐没有商量余地：小面，全城上午九点前排队的那碗 10–15 元辣油豌杂面。</p><p>成都的反击是一柜子精准的小品：麻婆豆腐、回锅肉、担担面、甜辣红油的钟水饺、饭后冰粉、勇者的兔头。分量逻辑是"多点几样，每样都尝"。而整套系统以茶馆速度运转——人民公园一盏盖碗茶，就能合法地占掉一个下午。</p><blockquote><p>"山珍海味吃完归来仍是大碗豌杂面，有种洗尽铅华返璞归真的美。"</p><footer>— 重庆小面视频下的 B 站评论，3631 赞</footer></blockquote>[[videos:versus-chongqing]]<h2>场景：你在哪里吃</h2><p>重庆吃的是地理：二战防空洞改的火锅堂、沿"8D 城市"崖壁层层堆叠的馆子、轻轨楼下的面摊。外国访客了解洞子火锅最出名的一扇窗，是长居中国的外国博主的 285 万播放 vlog——他在防空洞里边吃边讲：蒸汽、牛油、历史，为什么这个洞是这座城市的灵魂。</p><p>成都吃的是时间：慢悠悠的茶馆下午、无招牌一天只开四小时、街坊端着锅来打的冒菜摊（该类型的 500 万播放邪典经典）、酒吧散场后的深夜蹄花汤。想吃经典成都锅，本地人依然认几十年的老店——一条探店视频下有观众钉死了路线："东大街那家华丰，东门大桥 C 口出来往牛王庙方向走，较场坝对到那个巷巷儿头头上，新华公园和二仙桥两家分店味道菜品都差不多。"</p>[[videos:versus-chengdu]]<h2>辣度：哪座城更烧？</h2><p>重庆，而且没有悬念。成都菜追求麻辣平衡——麻与香对半分，辣度可以商量（点"微辣"完全体面）。重庆菜把辣当主菜不当变量。辣度存疑的初学者在成都活得更久；嗜辣者的天花板在重庆，连早餐面都是预装弹药。</p><h2>那么你该选哪座城？</h2><table><thead><tr><th>选成都，如果……</th><th>选重庆，如果……</th></tr></thead><tbody><tr><td>你要多样性——小吃、甜饮、茶馆，外加熊猫基地</td><td>你要冲击力——洞子里一锅难忘胜过八道好菜</td></tr><tr><td>你的辣度还有商量余地</td><td>你的吃辣能力是骄傲的资本</td></tr><tr><td>偏好慢节奏、平地好走的城</td><td>想要垂直、霓虹、电影感的山城</td></tr><tr><td>有 3 天以上，想博物馆与美食兼得</td><td>只有 1–2 天，要每小时的食物密度</td></tr></tbody></table><h2>真正的答案：都去</h2><p>成渝高铁 1–2 小时跑完 300 公里，高峰期几乎分钟级发车。经典吃法：成都两天（水饺与担担面、一锅清油、茶馆下午、敢的话加兔头），然后一路向东，出站先来一碗重庆小面，中午江湖菜，晚上钻进防空洞吃牛油九宫格——江对岸的夜景当甜点。五天，两种食物人格，零后悔，两座城市都觉得自己赢了。</p>',
    },
    image: '/images/dumplings/chaoshou.jpg',
    readTime: { en: '8 min read', zh: '阅读 8 分钟' },
    views: { en: '3.1k reads', zh: '阅读 3100' },
    publishedAt: { en: 'Just published', zh: '刚刚发布' },
    featured: false,
    videos: versusVideoGroups,
    faq: [
      {
        q: { en: 'Which is spicier, Chengdu or Chongqing food?', zh: '成都和重庆哪个更辣？' },
        a: {
          en: 'Chongqing, clearly. Chongqing cooking treats heat as a feature — even breakfast noodles arrive armed — while Chengdu aims at mala balance between numbing spice and fragrance, and "mild" (微辣) is a fully respectable order there.',
          zh: '重庆，而且很明显。重庆菜把辣当主菜——连早餐面都是带弹药的；成都追求麻与香的平衡，点"微辣"完全体面。',
        },
      },
      {
        q: { en: 'What\'s the difference between Chengdu and Chongqing hotpot?', zh: '成都火锅和重庆火锅有什么区别？' },
        a: {
          en: 'The base: Chongqing uses beef tallow — thick, intense, immediate; Chengdu favors clear (seed) oil infused with aromatics — layered and gentler. Chongqing eats it in cave shelters with nine-grid pots and offal focus; Chengdu in dining rooms with dipping-sauce culture and offshoots like chuanchuan skewers and maocai.',
          zh: '锅底：重庆用牛油——厚、猛、直给；成都偏香料清油——有层次、更温柔。重庆在防空洞里配九宫格吃下水；成都在堂食里配蘸料文化，还有串串、冒菜这些分支。',
        },
      },
      {
        q: { en: 'Can I visit both Chengdu and Chongqing on one trip?', zh: '一次旅行能同时去成都和重庆吗？' },
        a: {
          en: 'Easily — high-speed trains connect them in 1–2 hours with near-constant departures. The classic crawl: two days of Chengdu snacks and clear-oil hotpot, then a Chongqing day of xiaomian breakfast, jianghu lunch, and tallow nine-grid hotpot in a cave at night.',
          zh: '轻松——高铁 1–2 小时直达，班次密集。经典走法：成都两天吃小吃和清油火锅，然后去重庆，早餐小面、中午江湖菜、晚上防空洞牛油九宫格。',
        },
      },
      {
        q: { en: 'Which city is better for foreign tourists?', zh: '对外国游客哪座城市更友好？' },
        a: {
          en: 'Chengdu is the gentler landing: flatter and walkable, slower pace, more snack variety, the panda base, and lower default spice levels. Chongqing rewards the adventurous with cinematic geography and stronger flavors. Many long-term foreign residents vlog their Chongqing cave-hotpot conversions on Bilibili.',
          zh: '成都是更柔和的落地：平坦好走、节奏慢、小吃多样、有熊猫基地、默认辣度更低。重庆奖励冒险者——电影级的城市地形和更猛的味觉。B 站上不少长居中国的外国博主记录过自己被重庆洞子火锅"收编"的过程。',
        },
      },
      {
        q: { en: 'What are jianghu dishes in Chongqing?', zh: '重庆的"江湖菜"是什么？' },
        a: {
          en: 'Big, loud, generous home-style cooking served like a dare: lazi chicken buried in fried chilies, Maoxuewang blood-curd and tripe stew, pepper-covered grilled fish. The name — "rivers and lakes" — says it: food from the streets and docks, not the banquet hall.',
          zh: '分量大、嗓门大、给得足的家常猛菜：辣椒山里的辣子鸡、毛血旺、辣椒覆盖的烤鱼。"江湖"二字说明出身：街头与码头，不是宴席厅。',
        },
      },
    ],
    relatedLinks: [
      { to: '/guides/chengdu-food-guide', label: { en: 'The Chengdu Food Guide', zh: '成都美食全指南' } },
      { to: '/guides/halal-food-in-chengdu', label: { en: 'Halal Food in Chengdu', zh: '成都清真美食指南' } },
      { to: '/cities/chengdu', label: { en: 'Chengdu City Guide', zh: '成都城市页' } },
      { to: '/guides/best-time-to-visit-china', label: { en: 'Best Time to Visit China', zh: '中国最佳旅行时间' } },
    ],
  },
  {
    slug: 'chengdu-street-food',
    title: {
      en: 'Chengdu Street Food Guide: Stalls, Fly Restaurants & Night Markets (What Locals Actually Eat)',
      zh: '成都街头小吃攻略：路边摊、苍蝇馆子与夜市，本地人真正在吃什么',
    },
    label: { en: 'Street Food', zh: '街头小吃' },
    excerpt: {
      en: 'The street tier of China\'s City of Gastronomy: ¥1 skewers from a chili-oil tub, ¥16 lunch mixed in a basin, three-dish hole-in-the-walls — with real Bilibili eaters as your guides, plus which night market locals actually pick.',
      zh: '美食之都的街头层：红油钵里 1 元一签的冷串、大盆拌的 16 元盒饭、20 年只卖三样菜的苍蝇馆子——以 B 站真实食客为向导，附本地人真正会去的夜市选择。',
    },
    content: {
      en: '<p>Every food city runs on two menus: the one printed for visitors, and the one that exists only at street level — no signboard, no English, paid by QR code, often eaten standing up. In Chengdu the gap between those two menus is wider than almost anywhere in China, because the street tier of this UNESCO City of Gastronomy is where the city actually feeds itself: skewers at a yuan each from a tub of chili oil, office-worker lunch mixed in a basin for ¥16, family counters that have cooked the same three dishes for twenty years. This guide covers the street tier, and it is built the way we build everything: from what Chengdu\'s eaters actually film, review and argue about on Bilibili, not from a press-trip script. (For hot pot palaces and century-old banquet names, start with the main Chengdu Food Guide — the two tiers are complementary, not competing.)</p><h2>The Snack Glossary: Ten Things Worth Pointing At</h2><p>Street food vocabulary first — once you can name these, ordering becomes a game of pointing and holding up fingers:</p><table><thead><tr><th>Snack</th><th>What it actually is</th><th>Street price</th></tr></thead><tbody><tr><td>Dan hong gao (蛋烘糕)</td><td>A small griddled egg cake, folded like a taco around fillings from strawberry jam to pork floss to pickled radish</td><td>¥3–6</td></tr><tr><td>Bobo chicken (钵钵鸡)</td><td>Cold skewers pulled from a tub of chili oil or clear broth — chicken, lotus root, tofu skin, ¥1–2 a stick at street carts</td><td>¥1–2/skewer</td></tr><tr><td>Mao cai (冒菜)</td><td>"Personal hot pot": pick your ingredients, they boil them in spicy broth and hand you one bowl. Rice included</td><td>¥12–18</td></tr><tr><td>Tang you guozi (糖油果子)</td><td>Deep-fried glutinous-rice balls glazed in brown-sugar syrup and sesame — chewy, caramel, dangerous</td><td>¥5 for a skewer</td></tr><tr><td>Bing fen (冰粉)</td><td>Hand-rubbed ice jelly under brown sugar, fermented rice, peanuts and fruit — the standard spice antidote</td><td>¥5–8</td></tr><tr><td>Hong you chao shou (红油抄手)</td><td>Wontons swimming in red chili oil with a sweet edge — Chengdu\'s answer to breakfast</td><td>¥8–12</td></tr><tr><td>Fei chang fen (肥肠粉)</td><td>Slippery sweet-potato noodles in pork-intestine broth, topped with more intestine. A Shuangliu original</td><td>¥10–14</td></tr><tr><td>Mao kaoya (冒烤鸭)</td><td>Roast duck reborn in mala broth — half hot pot, half roast house, wholly Chengdu</td><td>¥20–30/half</td></tr><tr><td>San da pao (三大炮)</td><td>Three rice balls slammed onto a board so they bounce into sesame — a performance you eat</td><td>¥10</td></tr><tr><td>Tihua (蹄花)</td><td>Braised pig-trotter soup, white-pepper broth, midnight food that locals rank above hot pot more often than they admit</td><td>¥15–25</td></tr></tbody></table><p>On price sanity, the crowd has already voted. Under a review of a famous granny\'s dan hong gao stand, the second-most-liked comment sets the ceiling the whole city agrees on:</p><blockquote><p>"Any dan hong gao over five yuan is a scam dan hong gao."</p><footer>— Bilibili comment under a dan hong gao review video, 1.4K likes (translated from Chinese)</footer></blockquote><p>The same thread is a small masterclass in honest reviewing — the reviewer\'s verdict of "比较难吃" ("somewhat bad") became a running joke for sounding like carefully negotiated diplomacy. That is exactly the energy you want from street-food coverage: affectionate, unromantic, specific.</p>[[videos:snack-icons]]<h2>The Street-Stall Lunch Economy</h2><p>Chengdu\'s street tier has a flagship format: the workers\' lunch stall. The anatomy is always the same — one wok or one tub, one auntie or uncle, prices last revised sometime last decade, and a queue of hi-vis vests at noon. The ¥1 bobo-chicken cart is the purest example: cold skewers straight from the chili-oil tub, eaten standing around the cart with your bowl in hand, exactly the format that later got gentrified into ¥3-a-skewer chains. The boxed-lunch auntie mixes rice and meat in a wash-basin-sized bowl and has done so for over a decade — ¥16, no ambiance, pure fuel. And a 30-year-old counter still sells ¥7 pork-over-rice while the owner tops up your bowl mid-meal: the old street contract of nobody leaves hungry.</p><p>None of these will appear on a "Top 10 Chengdu Restaurants" list, which is precisely the point — they\'re the reason those lists exist at all.</p>[[videos:street-stalls]]<h2>Fly Restaurants: The Real "Local Recommendation"</h2><p>The word you actually need in Chengdu is <em>cangying guanzi</em> (苍蝇馆子) — literally "fly restaurant," meaning a hole-in-the-wall so humble the flies found it first: family-run, six tables, decades old, and a menu short enough to memorize. This is where "where do locals actually eat" gets its real answer. When China\'s most-watched professional chef reviewed one that has sold exactly three dishes for twenty years, he explained — in cook\'s terms — why its wok control beats restaurants at ten times the price.</p><p>But the local rating system is stricter than any review score, and the comment section will tell you what it is. Under that chef\'s video, the most-liked comment (3.7K likes) translated his recommendation into the city\'s real currency:</p><blockquote><p>"High-EQ version: he\'s recommending it to people who live within 500 meters."</p><footer>— Top Bilibili comment under a fly-restaurant review, 3.7K likes (translated from Chinese)</footer></blockquote><p>Locals measure a fly restaurant by the distance it is worth traveling. Great one? Worth a cross-city trip. Good one? Go if you\'re within a few kilometers. Tourist-trap one? The tell is in the queue itself — as one honest reviewer noticed at a viral spot, "everyone lining up seems to be a tourist." A fly restaurant full of locals is a recommendation; a fly restaurant full of visitors is a location. Foreigners convert fast here — a classically trained French chef working in Chengdu filmed his own full conversion over skewers, and a Korean first-timer\'s mao-kaoya debut doubles as a beginner\'s FAQ.</p>[[videos:fly-restaurants]]<h2>Night Markets: Which One, and What to Order</h2><p>Chengdu\'s night markets sort cleanly by who eats there:</p><table><thead><tr><th>Market</th><th>Crowd</th><th>Order this</th></tr></thead><tbody><tr><td>Jianshe Road (建设路)</td><td>The famous one — students, tourists, weekend crowds</td><td>Griddled shaopi (烤苕皮), iron-plate tofu, dan hong gao</td></tr><tr><td>Yulin (玉林)</td><td>The folk-song neighborhood — locals, bar-hoppers, few cameras</td><td>Whatever\'s smoking; a few yuan per snack</td></tr><tr><td>Dayuan (大源)</td><td>Southside mega-market — office workers and families</td><td>Skewers, red-oil intestine douhua</td></tr><tr><td>University gates (柳浪湾 / 川农)</td><td>Students only — cheapest tier in the city</td><td>Jumbo meat skewers, braised everything</td></tr></tbody></table><p>Hours run roughly 6 PM to midnight; the practical advice is boring and true: go before 8 PM to beat the worst queues, and treat a full crawl as dinner, not dessert. The 11-stall marathon in the video below is the correct mental model — one market, one evening, eleven different snacks, and still cheaper than a single hot pot meal.</p>[[videos:night-markets]]<h2>Practical Notes for Eating at Street Level</h2><p><strong>Spice:</strong> "wei la" (微辣, mild) is a fully respectable order at every stall, and cold formats like bobo chicken have a green-Sichuan-pepper option that numbs more than it burns. <strong>Payment:</strong> every stall — literally every one — takes mobile QR payment; international cards linked into Alipay or WeChat Pay work fine, and vendors are used to helping. <strong>Safety:</strong> the queue rule does the work — a stall with fast turnover is serving food fresher than any buffet; avoid only the pre-cut fruit carts near tourist streets (the ¥8 orange rule from our main guide still applies). <strong>Vegetarians:</strong> dan hong gao with veggie fillings, bing fen, tang you guozi and veggie mao cai keep you fed; ask about lard in stir-fried items. <strong>Timing:</strong> lunch stalls start selling out by 1 PM; night markets start at 6. <strong>Kids:</strong> the street tier is genuinely family-scale — one of our videos is a family with a toddler crawling the same stalls, breakfast to dinner.</p><h2>The Honest Summary</h2><p>If you eat one street-tier meal in Chengdu, make it a fly restaurant within walking distance of wherever you are — that is the locals\' own rule, distance before fame. If you have an evening, pick the night market that matches your crowd tolerance (Yulin for calm, Jianshe Road for the full carnival). And if you pass a cart with a chili-oil tub and a queue at noon, the correct move is to join the queue and point. The worst case in this city\'s street tier is a meal that costs four dollars and is merely good.</p>',
      zh: '<p>每座美食城市都运行着两份菜单：一份印给游客，另一份只存在于街头——没有招牌、没有英文、扫码付款、经常站着吃。成都是这两份菜单落差最大的城市之一，因为这座"美食之都"的街头层，就是这座城市真正喂养自己的地方：红油钵里 1 元一签的冷串、大盆拌出来的 16 元打工午餐、20 年只卖三样菜的家庭饭摊。本攻略只写街头层，而且和我们所有内容一样，是从 B 站上成都食客真实拍摄、测评、吵架的内容里长出来的，不是通稿。（火锅殿堂和百年老字号，请从《成都美食全指南》入手——两层是互补，不是竞争。）</p><h2>小吃字典：值得指一指的十样东西</h2><p>先解决词汇问题——会念下面这些名字，点单就变成了"指认 + 比数字"的游戏：</p><table><thead><tr><th>小吃</th><th>到底是什么</th><th>街头价</th></tr></thead><tbody><tr><td>蛋烘糕</td><td>小铜锅烙的蛋饼，像塔可一样对折，夹草莓酱、肉松、酸萝卜等甜咸馅</td><td>¥3–6</td></tr><tr><td>钵钵鸡</td><td>从红油钵或清汤钵里现抽的冷串——鸡皮、藕片、豆皮，街边摊 1–2 元一签</td><td>¥1–2/签</td></tr><tr><td>冒菜</td><td>"一个人的火锅"：自选菜在辣汤里烫好端一碗，米饭管够</td><td>¥12–18</td></tr><tr><td>糖油果子</td><td>红糖浆裹芝麻的炸糯米团——焦糖、绵糯、危险</td><td>¥5/串</td></tr><tr><td>冰粉</td><td>手搓冰晶浇红糖、醪糟、花生碎——标准解辣装置</td><td>¥5–8</td></tr><tr><td>红油抄手</td><td>泡在带甜口的红油里的馄饨——成都的早餐答案</td><td>¥8–12</td></tr><tr><td>肥肠粉</td><td>猪骨肥肠汤里的红薯粉，顶上再铺肥肠。双流原产</td><td>¥10–14</td></tr><tr><td>冒烤鸭</td><td>烤鸭二次出生在麻辣汤底里——一半火锅一半烤鸭，全成都</td><td>¥20–30/半只</td></tr><tr><td>三大炮</td><td>三团糯米摔在案板上弹进芝麻里——一场能吃的表演</td><td>¥10</td></tr><tr><td>蹄花</td><td>白胡椒汤底的炖猪蹄，本地人嘴上不说、心里排在火锅前面的深夜食物</td><td>¥15–25</td></tr></tbody></table><p>价格 sanity check，评论区早投过票了。某位"蛋烘糕婆婆"的测评视频下，第二热评给全市公认的价限定了个顶：</p><blockquote><p>"超过五块的蛋烘糕都是哈皮蛋烘糕。"</p><footer>— 蛋烘糕测评视频下的 B 站评论，1424 赞</footer></blockquote><p>同一条评论区还是一场小型"诚实测评"公开课——博主斟酌半天的"比较难吃"三个字，被网友笑称"像谈判出来的委婉措辞"。这正是街头小吃内容该有的气质：有感情，但不浪漫化，非常具体。</p>[[videos:snack-icons]]<h2>路边摊的午餐经济学</h2><p>成都街头层有一个旗舰形态：打工午餐摊。解剖结构永远一致——一口锅或一个钵、一位阿姨或大叔、上次改价还是几年前的事、中午十二点准时出现的反光背心队伍。1 元钵钵鸡摊是最纯的样本：冷串从红油钵里现抽，端着碗围着摊站着吃——后来被连锁店"精致化"成 3 元一串之前，它就长这样。盒饭大姐用洗脸盆大小的盆拌饭，一拌十几年——16 元，毫无环境，全是热量。还有开了 30 多年的饭摊，7 元肉扣饭，老板看你吃得差不多就过来补一勺：没人饿着走的街头老合同。</p><p>这些地方都不会出现在"成都十大餐厅"名单上——而这恰恰是那些名单存在的理由。</p>[[videos:street-stalls]]<h2>苍蝇馆子：真正的"本地人推荐"</h2><p>在成都你真正需要会的词是"苍蝇馆子"——简陋到苍蝇都先找到的馆子：家庭经营、六张桌子、一开几十年、菜单短到能背下来。"本地人到底去哪吃"这个问题，答案在这里。当中国观看量最高的专业厨师博主探了一家 20 年只卖三样菜的苍蝇馆子，他用厨师的语言解释了：为什么它的火候胜过十倍价格的馆子。</p><p>但本地人的评分体系比任何测评都严格，评论区会直接告诉你答案。那条探店视频的置顶热评（3764 赞），把博主的推荐翻译成了这座城市真正的流通货币：</p><blockquote><p>"高情商：推荐 500 米内的来吃。"</p><footer>— 苍蝇馆子探店视频的置顶热评，3764 赞</footer></blockquote><p>本地人用"值得为此跑多远"来衡量一家苍蝇馆子：神级？值得跨城。不错？方圆几公里内可以去。游客陷阱？队形本身就是答案——一位以毒舌著称的测评者在某网红店门口发现"排队的好像都是游客"。坐满本地人的苍蝇馆子是推荐；坐满外地人的苍蝇馆子只是一个坐标。外国人在这里倒戈得很快——一位在成都工作的法餐主厨拍下了自己被串串彻底"收编"的全过程，一位韩国博主的冒烤鸭初体验顺便就是新手 FAQ。</p>[[videos:fly-restaurants]]<h2>夜市：选哪家，点什么</h2><p>成都的夜市按"谁在吃"分类，非常干净：</p><table><thead><tr><th>夜市</th><th>人群</th><th>点这些</th></tr></thead><tbody><tr><td>建设路</td><td>最出名的一家——学生、游客、周末人潮</td><td>烤苕皮、铁板豆腐、蛋烘糕</td></tr><tr><td>玉林</td><td>民谣里唱的那片——本地人、酒吧客、镜头很少</td><td>哪个摊冒烟吃哪个；几块钱一样</td></tr><tr><td>大源</td><td>城南巨型夜市——上班族和家庭</td><td>串串、红油肥肠豆花</td></tr><tr><td>大学门口（柳浪湾 / 川农）</td><td>纯学生——全市最便宜的一层</td><td>巨无霸肉串、卤一切</td></tr></tbody></table><p>营业时间大约晚 6 点到午夜；实用建议朴素但正确：8 点前到能避开最凶的队，并把逛吃当正餐而不是饭后甜点。下面视频里的 11 摊连吃就是正确的心智模型——一个夜市、一个晚上、十一样小吃，总价还不到一顿火锅。</p>[[videos:night-markets]]<h2>街头吃喝实用手册</h2><p><strong>辣度：</strong>所有摊位喊一声"微辣"都体面，钵钵鸡这类冷食还有藤椒选项——麻大于辣。<strong>支付：</strong>每个摊——真的是每个——都收扫码；国际卡绑进支付宝或微信支付都能用，摊主也习惯帮忙。<strong>卫生：</strong>排队规则包办一切——翻台快的摊子，食材比任何自助都新鲜；真正要避开的只有游客街边切好的水果车（主指南里"8 块钱橘子"的规则依然生效）。<strong>素食：</strong>素馅蛋烘糕、冰粉、糖油果子、素冒菜能吃饱；炒菜类问一句是否猪油。<strong>时间：</strong>午餐摊下午 1 点前开始售罄；夜市 6 点开张。<strong>带娃：</strong>街头层是真的亲子友好——我们收录的视频里就有一家三口推着娃从早餐吃到晚餐。</p><h2>诚实的总结</h2><p>如果在成都只吃一顿街头层的饭，选一家离你步行可达的苍蝇馆子——这是本地人自己的规则，距离优先于名气。如果有一个晚上，按人群耐受度选夜市（要松弛去玉林，要嘉年华去建设路）。路过一个红油钵+中午排队的推车，正确动作就是排队、指、吃。这座城市街头层的最差结局，是一顿四美元、只是还不错的一餐。</p>',
    },
    image: '/images/dumplings/zhong-dumplings.jpg',
    readTime: { en: '9 min read', zh: '阅读 9 分钟' },
    views: { en: '2.1k reads', zh: '阅读 2100' },
    publishedAt: { en: 'Just published', zh: '刚刚发布' },
    featured: false,
    videos: streetFoodVideoGroups,
    faq: [
      {
        q: { en: 'Is Chengdu street food safe for foreign visitors?', zh: '成都街头小吃对外国游客安全吗？' },
        a: {
          en: 'Yes, with one rule: eat where locals queue. High turnover means fresh ingredients — a stall with a noon line of hi-vis vests is serving food fresher than most restaurants. Boiled, fried and griddled items are all safe; the main caution is pre-cut fruit sold from carts near tourist streets, where both scales and prices run unreliable.',
          zh: '安全，只需一条规则：本地人排队的地方就是安全的。翻台快意味着食材新鲜——中午有民工队伍的摊子，食材比多数餐厅都新鲜。烫、炸、烙都安全；真正要小心的是游客街边推车卖的切好水果，秤和价格都不太可靠。',
        },
      },
      {
        q: { en: 'What is bobo chicken and how much should it cost?', zh: '钵钵鸡是什么，多少钱合理？' },
        a: {
          en: 'Bobo chicken (钵钵鸡) is cold skewers — chicken, lotus root, tofu skin — pulled from a tub of chili oil or clear broth and eaten on the spot. At old-school street carts it runs ¥1–2 per skewer; chain storefronts charge ¥3+. Both are good; only the price differs.',
          zh: '钵钵鸡就是冷串：鸡皮、藕片、豆皮等从红油钵或清汤钵里现抽现吃。老式街边摊 1–2 元一签，连锁店面 3 元起。都好吃，只是价格不同。',
        },
      },
      {
        q: { en: 'Which Chengdu night market should I choose?', zh: '成都夜市选哪家？' },
        a: {
          en: 'Match the market to your tolerance: Jianshe Road is the famous, tourist-heavy carnival; Yulin is the locals\' folk-song neighborhood at lower prices; Dayuan is the big southside family market; university-gate markets (Liulang Wan, Chuan Nong) are the cheapest tier in the city. All run roughly 6 PM to midnight.',
          zh: '按耐受度选：建设路最出名、游客多、嘉年华气氛；玉林是本地人的民谣街区、价格更低；大源是城南的大型家庭夜市；大学门口夜市（柳浪湾、川农）是全市最便宜的一层。营业时间大约都是晚 6 点到午夜。',
        },
      },
      {
        q: { en: 'What exactly is a "fly restaurant" (cangying guanzi)?', zh: '"苍蝇馆子"到底是什么？' },
        a: {
          en: 'Literally "fly restaurant" — a family-run hole-in-the-wall so humble the flies found it first: a handful of tables, decades of history, and a menu of just a few dishes. It is the real answer to "where do locals eat." The local rating system is distance-based: the best are worth a cross-city trip, good ones serve their own neighborhood, and one full of tourists queueing is just a photo location.',
          zh: '字面意思"苍蝇都先找到的馆子"：家庭经营的小破店，几张桌子、一开几十年、菜单只有几样菜。它是"本地人去哪吃"的真实答案。本地人的评分体系按距离算：最好的值得跨城去吃，不错的服务街坊，而排队的全是游客的那种，只是个打卡坐标。',
        },
      },
      {
        q: { en: 'Can I survive Chengdu street food as a vegetarian?', zh: '素食者能在成都街头吃什么？' },
        a: {
          en: 'Yes: dan hong gao with vegetable fillings, bing fen (ice jelly dessert), tang you guozi (fried glutinous rice balls), veggie mao cai and tofu-family skewers will keep you very well fed. One check: ask whether stir-fried items use lard, and note that many broths are pork-bone based.',
          zh: '能：素馅蛋烘糕、冰粉、糖油果子、素冒菜、豆制品串串都能把你喂得很好。注意两点：炒菜问一句是否用猪油，多数汤底是猪骨熬的。',
        },
      },
    ],
    relatedLinks: [
      { to: '/guides/chengdu-hot-pot-guide', label: { en: 'Chengdu Hot Pot Guide', zh: '成都火锅指南' } },
      { to: '/guides/chengdu-food-tour', label: { en: 'Chengdu Food Tour Routes', zh: '成都美食一日游' } },
      { to: '/guides/chengdu-food-guide', label: { en: 'The Chengdu Food Guide', zh: '成都美食全指南' } },
      { to: '/guides/chengdu-vs-chongqing-food', label: { en: 'Chengdu vs Chongqing Food', zh: '成都vs重庆美食对比' } },
      { to: '/guides/halal-food-in-chengdu', label: { en: 'Halal Food in Chengdu', zh: '成都清真美食指南' } },
      { to: '/cities/chengdu', label: { en: 'Chengdu City Guide', zh: '成都城市页' } },
    ],
  },
  {
    slug: 'chengdu-hot-pot-guide',
    title: {
      en: 'Chengdu Hot Pot Guide: Clear Oil vs Beef Tallow, Queue Culture & Your First Pot',
      zh: '成都火锅指南：清油vs牛油、排队文化与第一锅生存手册',
    },
    label: { en: 'Hot Pot', zh: '火锅' },
    excerpt: {
      en: 'Everything you need before your first Chengdu pot: why this city\'s clear-oil broth is the gentler gateway, what to order (tripe, duck intestine, brain for the brave), how locals judge a 3-hour queue, and the dipping-sauce ritual that keeps the fire survivable.',
      zh: '第一锅之前的全部知识：为什么成都清油锅底是更友好的入口、该点什么（毛肚、鸭肠、勇者的脑花）、本地人怎么看待 3 小时的队、以及让你在火里活下来的蘸碟仪式。',
    },
    content: {
      en: '<p>Every first-timer in Sichuan meets the same fork in the road: the pot. And almost every first-timer is pointed toward the wrong city\'s version. Chongqing hot pot — beef tallow, offal, aggression — gets the mythology, but Chengdu\'s clear-oil pot is the one that lets you actually enjoy your first meal: rapeseed oil infused with aromatics, layered heat, a dipping-sauce culture that manages the burn, and a scene that runs from three-hour-queue institutions to neighborhood pots where the fried rice outshines the broth. This is the complete first-pot guide, built from how Chengdu\'s eaters actually review, queue and argue on Bilibili.</p><h2>Clear Oil vs Beef Tallow: The Local Shorthand</h2><p>The shorthand locals use: Chongqing hot pot is fire, Chengdu hot pot is perfume. Chongqing\'s base is beef tallow (牛油) — dense, scarlet, uncompromising, dockworker heritage. Chengdu leans on clear oil (清油) — seed oil slow-infused with spices, so the chili arrives in layers and the Sichuan peppercorn numbs without punishing. For a first pot, clear oil is the correct door. For spice veterans, the yuanyang (鸳鸯) split pot is not a tourist compromise here — plenty of local tables run one side mild, and "wei la" (微辣) is a fully respectable order.</p><h2>The Dipping Ritual: Your Survival Kit</h2><p>Chengdu civilized the pot around the dish: sesame oil (香油) plus minced garlic, optionally with oyster sauce, cilantro or a spoon of the pot\'s own broth. The oil cools each bite and the garlic rounds the numbing edge — it is not optional, it is the safety system. Vinegar and dry-cayenne dishes exist for heat-seekers; your first time, run the standard oil-and-garlic and thank the city later.</p><h2>What to Order: The Canonical List</h2><table><thead><tr><th>Order</th><th>What it is</th><th>First-pot verdict</th></tr></thead><tbody><tr><td>Mao du (毛肚)</td><td>Beef tripe, the grid-patterned classic</td><td>Mandatory; "seven up eight down" — swish 10–15 seconds, no longer</td></tr><tr><td>Ya chang (鸭肠)</td><td>Duck intestine, crunchy ribbons</td><td>Mandatory; swish until it curls</td></tr><tr><td>Huang hou (黄喉)</td><td>Aorta — sounds wrong, snaps right</td><td>Order it; texture converts skeptics</td></tr><tr><td>Qian ceng du (千层肚)</td><td>Layered omasum, the connoisseur\'s tripe</td><td>The item locals judge a shop by</td></tr><tr><td>Nao hua (脑花)</td><td>Pig brain — custard in chili broth</td><td>For the brave; order late in the meal</td></tr><tr><td>Hao er yu (耗儿鱼)</td><td>Mini frozen fish, a Sichuan oddity</td><td>Worth one round</td></tr><tr><td>Vegetables & staples</td><td>Lettuce, potato slices, frozen tofu, sweet potato noodles</td><td>Non-negotiable; you need the landing pad</td></tr></tbody></table><p>Order in rounds, not all at once — tripe has a 15-second window and everything else waits for no one. Per-person damage at a neighborhood pot runs ¥70–120; the famous queue institutions land ¥120–200 with drinks.</p><h2>Queue Culture: The 3-Hour Question</h2><p>Chengdu\'s famous pots come with famous lines, and the local internet has strong opinions about which waits are earned. When the city\'s most trusted no-drama reviewer joined a nearly three-hour queue, his audit-style verdict — wait mechanics, turnover speed, and whether the broth itself justifies the clock — drew a comment section that doubles as a citywide referendum. The practical tourist translation: a long queue at 6 PM on a weekend is a local signal worth respecting; a long queue of fellow visitors holding guidebooks is a location, not a recommendation. When a long-term foreign resident tested the pot his Chengdu friends unanimously ranked No.1, the takeaway was the same in reverse — the strongest curation signal in this city is locals agreeing with each other.</p>[[videos:hotpot-queues]]<h2>The Neighborhood Tier: Where Regulars Actually Go</h2><p>Below the famous names sits the tier locals actually live on: community hot pots with no marketing, handwritten menus and regulars who\'ve eaten the same table twenty-plus times — repeat-visit content is the highest trust tier on the Chinese food internet, and Chengdu\'s south gate has its documented champion. Even the comment-section nomination pipeline works: one neighborhood pot was requested by subscribers so many times the vlogger finally went, and left with a cold-menu fried-rice trick that regulars consider a deep cut. Use these as your template: any pot within walking distance of your hotel, full of local accents and paper bibs, will outperform a two-hour pilgrimage to a name.</p>[[videos:hotpot-neighborhood]]<h2>Practical Notes</h2><p><strong>Hours:</strong> pots peak 6–9 PM; the deepest queues form 7–8 PM on weekends — go at 5:30 or after 9 and walk straight in. <strong>Spice:</strong> order mild with confidence; the broth\'s fragrance, not its violence, is what Chengdu is defending. <strong>Drinks:</strong> the classic pairing is ice jelly (冰粉) or soy milk to bank the fire; beer is legal and common. <strong>Etiquette:</strong> use communal chopsticks (公筷) for the raw platters, your own for eating, and never fish with your hands. <strong>After:</strong> a midnight tihua soup is the traditional landing — see our street food guide for that tier. <strong>Halal note:</strong> classic pots are not halal; our Chengdu halal guide covers the city\'s excellent beef hot pot alternatives.</p>',
      zh: '<p>每个初到四川的人都会在同一个路口下车：锅。而几乎每个初学者都被指向了错误的城市版本。重庆火锅——牛油、下水、凶猛——拿走了神话，但成都的清油锅才是让你真正享受第一顿的那一口：香料浸出的菜籽油、有层次的辣、管理火候的蘸料文化，以及从排队三小时的名店到炒饭比锅底还出彩的社区小店的全谱系。这是一份完整的第一锅指南，素材来自成都食客在 B 站上真实的测评、排队和吵架。</p><h2>清油 vs 牛油：本地速记</h2><p>本地人的速记：重庆火锅是火，成都火锅是香。重庆锅底是牛油——厚、猩红、不容商量，码头工人血统。成都偏清油——香料慢浸的植物油，辣是分层的，花椒麻而不罚。第一锅，清油是正确的门。鸳鸯锅在这里不是游客妥协——不少本地桌就是一半微辣；"微辣"也完全是体面的下单方式。</p><h2>蘸碟仪式：你的生存装备</h2><p>成都把火锅"文明化"的核心就是这碟：香油加蒜泥，可加蚝油、香菜或一勺原汤。油给每一口降温，蒜把麻的锐角磨圆——它不是可选项，是安全系统。醋碟和干碟留给嗜辣者；第一锅，请老老实实用香油蒜泥，然后感谢这座城市。</p><h2>点什么：标准清单</h2><table><thead><tr><th>菜品</th><th>是什么</th><th>第一锅建议</th></tr></thead><tbody><tr><td>毛肚</td><td>网格状牛肚，永恒经典</td><td>必点；"七上八下"烫 10–15 秒，多一秒都不要</td></tr><tr><td>鸭肠</td><td>脆 ribbon 状鸭肠</td><td>必点；烫到打卷即出</td></tr><tr><td>黄喉</td><td>主动脉——听着不对，吃着脆对</td><td>点；口感能策反怀疑者</td></tr><tr><td>千层肚</td><td>层次分明的瓣胃，行家的毛肚</td><td>本地人用它给店打分</td></tr><tr><td>脑花</td><td>猪脑——辣椒汤里的蛋羹</td><td>勇者项目；留到后半程下锅</td></tr><tr><td>耗儿鱼</td><td>迷你冻鱼，四川限定奇观</td><td>值得来一轮</td></tr><tr><td>蔬菜主食</td><td>生菜、土豆片、冻豆腐、红苕粉</td><td>没得商量；你需要缓冲垫</td></tr></tbody></table><p>分轮下单，别一次全下——毛肚只有 15 秒窗口，其他菜不等人。社区店人均 ¥70–120；排队名店带酒水 ¥120–200。</p><h2>排队文化：3 小时问题</h2><p>成都的名锅配名队，而本地互联网对"哪些队值得"意见强烈。当全城最可信的毒舌测评博主加入一条近三小时的队伍，他审计式的结论——排队机制、翻台速度、锅底本身值不值——引来一场全市公投式的评论区。游客翻译成人话：周末晚六点本地人排的长队，是值得尊重的信号；全是拿着攻略书的游客的队，那是个坐标，不是推荐。反过来同理：当一位长居中国的外国博主去测评本地朋友们口径一致的"TOP1"，最强的筛选信号就是——本地人彼此达成了一致。</p>[[videos:hotpot-queues]]<h2>社区层：熟客们真正去的地方</h2><p>在名店之下，是本地人真正生活的层级：没有营销的社区火锅、手写菜单、吃了二十多次同一张桌的熟客——回访类内容是中文美食互联网的最高信任等级，而成都南门有它的记录保持者。连评论区的提名管道都在工作：一家社区锅被粉丝点名太多次，博主终于去了，还带回一个熟客才知道的"冷门炒饭吃法"。把它们当模板：任何一家离酒店步行可达、坐满本地口音和纸围裙的锅，都会胜过两小时的名店朝圣。</p>[[videos:hotpot-neighborhood]]<h2>实用信息</h2><p><strong>时段：</strong>火锅高峰 18–21 点，最深队伍出现在周末 19–20 点——17:30 前或 21 点后到，直接进。<strong>辣度：</strong>放心点微辣；成都锅捍卫的是香气，不是暴力。<strong>饮品：</strong>经典组合是冰粉或豆奶灭火，啤酒合法且常见。<strong>礼仪：</strong>生盘用公筷、入口用自己的，任何时候别下手捞。<strong>事后：</strong>传统落地方式是午夜蹄花汤——街头小吃指南里有这一层。<strong>清真提示：</strong>经典锅不清真，成都清真指南里有很好的牛肉火锅替代。</p>',
    },
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
    readTime: { en: '9 min read', zh: '阅读 9 分钟' },
    views: { en: '1.8k reads', zh: '阅读 1800' },
    publishedAt: { en: 'Just published', zh: '刚刚发布' },
    featured: false,
    videos: hotPotVideoGroups,
    faq: [
      {
        q: { en: 'What\'s the difference between Chengdu and Chongqing hot pot?', zh: '成都火锅和重庆火锅有什么区别？' },
        a: {
          en: 'The base oil. Chongqing uses beef tallow — thick, intense, immediate, with an offal-forward menu. Chengdu favors clear (seed) oil infused with aromatics — layered heat, gentler on first-timers — plus the sesame-oil-and-garlic dipping culture and offshoots like chuanchuan skewers and mao cai. Our Chengdu vs Chongqing guide breaks the whole rivalry down.',
          zh: '锅底用油。重庆用牛油——厚、猛、直给，菜单以下水为主。成都偏香料清油——辣有层次、对初学者友好——外加香油蒜泥的蘸碟文化和串串、冒菜这些分支。完整的恩怨见我们的成都vs重庆对比指南。',
        },
      },
      {
        q: { en: 'How spicy is Chengdu hot pot really?', zh: '成都火锅到底有多辣？' },
        a: {
          en: 'Manageable, because spice is a variable here, not a vow. Order "wei la" (mild) — it is a fully respectable request — use the sesame oil and garlic dish, bank the heat with bing fen or soy milk, and pace your tripe in rounds. Chengdu aims at mala balance: numbing and fragrant in equal measure, with heat you can negotiate.',
          zh: '可控，因为在成都辣度是变量不是誓言。点"微辣"完全体面，用好香油蒜泥碟，用冰粉或豆奶压火，毛肚分轮下。成都追求的是麻辣平衡：麻与香对半，辣度可以商量。',
        },
      },
      {
        q: { en: 'What should I order at my first Chengdu hot pot?', zh: '第一锅成都火锅该点什么？' },
        a: {
          en: 'The canonical four: beef tripe (swish 10–15 seconds), duck intestine (until it curls), yellow throat (aorta — crunchy), and layered omasum, the item locals judge a shop by. Add brain flower if you\'re brave, one round of frozen fish, and enough vegetables and sweet-potato noodles to land the plane. Order in rounds so nothing overcooks.',
          zh: '经典四样：毛肚（烫 10–15 秒）、鸭肠（打卷即出）、黄喉（脆）、千层肚（本地人用它给店打分）。勇者加脑花，来一轮冻鱼，蔬菜红苕粉管够兜底。分轮下单，别让任何东西煮过头。',
        },
      },
      {
        q: { en: 'Are the famous 3-hour queues in Chengdu worth it?', zh: '成都那些排 3 小时的名店值得吗？' },
        a: {
          en: 'Judge by who is queueing, not how many. A weekend line of locals at 6 PM is a real signal; a line of visitors holding guidebooks is a photo location. The honest local rule from Bilibili reviews: great pots are worth a trip across town, good ones serve their neighborhood, and hype is measurable in queue composition.',
          zh: '看排队的是谁，不看排多长。周末晚六点本地人排的队是真信号；拿着攻略书的游客排的队是打卡点。B 站测评给出的本地规则：神锅值得跨城，好锅服务街坊，而网红属性可以直接从队伍构成里量出来。',
        },
      },
      {
        q: { en: 'How much does hot pot cost in Chengdu?', zh: '成都火锅人均多少钱？' },
        a: {
          en: 'Neighborhood community pots run ¥70–120 per person including drinks; the famous queue-name institutions land ¥120–200. Chuanchuan (skewer) format — hot pot\'s cheaper sibling where you pay per stick — can feed you for ¥40–60.',
          zh: '社区店人均 ¥70–120 含酒水；排队名店 ¥120–200。串串——火锅的便宜兄弟，按签计费——¥40–60 就能吃饱。',
        },
      },
    ],
    relatedLinks: [
      { to: '/guides/chengdu-vs-chongqing-food', label: { en: 'Chengdu vs Chongqing Food', zh: '成都vs重庆美食对比' } },
      { to: '/guides/chengdu-food-guide', label: { en: 'The Chengdu Food Guide', zh: '成都美食全指南' } },
      { to: '/guides/chengdu-street-food', label: { en: 'Chengdu Street Food Guide', zh: '成都街头小吃攻略' } },
      { to: '/guides/halal-food-in-chengdu', label: { en: 'Halal Food in Chengdu', zh: '成都清真美食指南' } },
    ],
  },
  {
    slug: 'chengdu-food-tour',
    title: {
      en: 'Chengdu Food Tour: Three Self-Guided Routes (Yulin, Old Town & the Night Markets) — DIY or Booked?',
      zh: '成都美食一日游：玉林/老城/夜市三条自走路线，要不要报团？',
    },
    label: { en: 'Food Tour', zh: '美食一日游' },
    excerpt: {
      en: 'Three field-tested walking routes through China\'s City of Gastronomy — a slow Yulin day, an old-town classics loop and a night-market marathon — each built from local vloggers\' own crawls, plus the honest math on whether a guided tour is worth booking.',
      zh: '三条经过实战检验的觅食步行动线——玉林慢日、老城经典环线、夜市马拉松——全部改编自本地博主的真实逛吃，外加"要不要报团"的诚实算法。',
    },
    content: {
      en: '<p>"Chengdu food tour" gets typed into Google thousands of times a month, and almost every result sells you one. This page does the opposite first: three complete self-guided eating days, distilled from the crawls that Chengdu\'s own vloggers actually walk — a born-and-raised local\'s Yulin day, a 17-shop legacy index, a hand-holding reputation-only route — and only then the honest math on when a booked tour earns its fee.</p><h2>Route 1: The Yulin Slow Day (Southwest)</h2><p>Yulin is the neighborhood the folk song made famous, and it rewards exactly one pace: slow. Morning starts street-tier — dan hong gao and red-oil wontons at a counter with no English, then coffee in one of the district\'s many independents. Lunch is the neighborhood\'s own fly restaurants; teahouse afternoon optional but traditional. After dark, the Yulin night market: a few yuan per snack, locals-heavy, no queue theater — a full day lands comfortably under ¥150.</p><p>The definitive template is a born-and-raised vlogger\'s own one-day Yulin guide — his stop order is worth stealing wholesale. For calibration on pace, watch the speed-run format next: no plan, maximum stops, eating standing and walking, proof this city rewards grazing over scheduling.</p>[[videos:tour-yulin]]<h2>Route 2: The Old-Town Classics Loop (Center)</h2><p>A greatest-hits walk that pairs tourist icons with local eating logic: Kuanzhai Alleys early — before 9 AM, when the lanes still belong to residents — then People\'s Park for gaiwan tea at the Heming Teahouse and optional ear-cleaning. Lunch on Kuixinglou Street, the locals\' food street one block off the tourist track. Afternoon drifts through Chunxi Road and Taikoo Li for the contrast, and the day docks at Jiuyanqiao when the bars light up. The rule that keeps this loop honest: eat where you are, not where the itinerary says; the longest local queue is the best review.</p><h2>Route 3: The Night-Market Marathon (East)</h2><p>For maximum snacks per hour, the carnival route: Jianshe Road — the famous student-and-tourist night market — for griddled shaopi, iron-plate tofu and dan hong gao, pushed until you drop. Budget a full evening, treat it as dinner not dessert, arrive before 8 PM to beat the worst queues, and bank on ¥50–80 for a serious crawl. (Calmer alternatives and the full market-by-market breakdown live in our street food guide.)</p><h2>The Master Index Behind Any Route</h2><p>Two reference documents anchor all three routes. The first is a current 17-shop legacy index — time-tested eateries mapped in one 2026 sweep; pick the three nearest your day\'s path and ignore the rest with a clear conscience. The second is a reputation-only "nanny-level" guide that lists nothing without long-standing word of mouth — its pacing is the correct pacing: four to six stops per day, small orders everywhere, one proper sit-down meal.</p>[[videos:tour-classics]]<h2>DIY or Booked? The Honest Math</h2><table><thead><tr><th></th><th>Self-guided (this page)</th><th>Booked food tour</th></tr></thead><tbody><tr><td>Cost</td><td>¥100–150/day, food only</td><td>¥300–600+ per person typical for English-guided walks</td></tr><tr><td>Flexibility</td><td>Total — stay as long as the table is good</td><td>Fixed stops, fixed clock</td></tr><tr><td>Translation</td><td>Point, hold up fingers, QR pay (works fine)</td><td>Included — real value if you want the stories, not just the food</td></tr><tr><td>Hidden spots</td><td>Requires this page plus local-queue rule</td><td>Guides bring 1–2 genuinely off-map stops</td></tr><tr><td>Social</td><td>Your party only</td><td>Small-group energy with strangers</td></tr></tbody></table><p>The honest verdict: Chengdu is one of the easiest food cities in China to eat through independently — QR payment is universal, picture menus are standard, and the local-queue rule does the curation for you. A booked tour earns its fee when you want the cultural narration, want zero logistics on day one, or are traveling solo and want a table. If you book, the international platforms (GetYourGuide, Viator, Klook) and local operators all run Chengdu food walks — read the stop list against this page before you pay.</p><h2>Practical Notes for All Routes</h2><p><strong>Pacing:</strong> 4–6 stops per day is the realistic maximum; graze, don\'t feast. <strong>Spice:</strong> "wei la" (mild) everywhere; cold formats like bobo chicken offer the green-pepper option that numbs more than burns. <strong>Payment:</strong> every stall takes QR — Alipay/WeChat with a linked international card covers the whole city. <strong>Timing:</strong> street stalls sell out by early afternoon; night markets open ~6 PM. <strong>Backup:</strong> if a stop is closed or mobbed, apply the local rule — next-longest queue within 200 meters.</p>',
      zh: '<p>"成都美食一日游"每个月在 Google 被搜几千次，而几乎每个搜索结果都在卖团。这一页先做相反的事：三条完整的自走觅食日路线，全部改编自成都本地博主真实走过的动线——土生土长 up 主的玉林一天、17 家老店主索引、只认口碑的保姆级路线——最后才给"报团值不值"的诚实算法。</p><h2>路线一：玉林慢日（城南）</h2><p>玉林是民谣唱红的那片街区，它只奖励一种节奏：慢。早晨从街头层开始——没有英文的小店里吃蛋烘糕和红油抄手，然后去街区里的独立咖啡馆。中午是玉林自己的苍蝇馆子；下午茶馆可去可不去，但传统。入夜后的玉林夜市：几块钱一样小吃、本地人居多、没有排队表演——一整天舒服地控制在 ¥150 以内。</p><p>这条动线的权威模板，是一位土生土长博主的玉林一日攻略——他的停站顺序值得整段照抄。节奏校准请看旁边这条速通版：不做计划、停站最多、站着吃走着吃，证明这座城市奖励"放牧"而不是"排表"。</p>[[videos:tour-yulin]]<h2>路线二：老城经典环线（市中心）</h2><p>一条把游客图标和本地吃法缝在一起的大满贯动线：宽窄巷子赶早——九点前巷子还属于居民——然后人民公园鹤鸣茶社的盖碗茶和可选的采耳。午餐在奎星楼街，本地人的美食街、离游客动线只隔一个街区。下午穿过春熙路和太古里看反差，天黑时船靠九眼桥。让这条环线保持诚实的规则：在哪吃看你在哪，不看行程表；本地人排的队就是最好的测评。</p><h2>路线三：夜市马拉松（城东）</h2><p>要单位时间小吃密度的极致，选嘉年华路线：建设路——最出名的学生游客夜市——烤苕皮、铁板豆腐、蛋烘糕一路推到投降。预留一整晚，把它当正餐不是甜点，8 点前到避开最凶的队，认真逛一轮预算 ¥50–80。（更松弛的替代方案和逐市场拆解见街头小吃指南。）</p><h2>所有路线背后的主索引</h2><p>两条参考线索锚定全部三条路线。第一条是 2026 年新鲜输出的 17 家老店主索引——时间检验过的馆子一次盘完；挑你当天动线最近的 三家，其余放心略过。第二条是只认口碑的"保姆级"攻略——没有长期口碑的店一律不收——它的节奏就是正确节奏：一天 4–6 站、每站少量、一顿正经坐下来的正餐。</p>[[videos:tour-classics]]<h2>自走还是报团？诚实算法</h2><table><thead><tr><th></th><th>自走（本页）</th><th>报团美食游</th></tr></thead><tbody><tr><td>成本</td><td>¥100–150/天，纯吃</td><td>英文导览步行团常见 ¥300–600+/人</td></tr><tr><td>灵活度</td><td>完全——桌子好就多待</td><td>固定站点、固定时间</td></tr><tr><td>语言</td><td>指认 + 比数字 + 扫码（完全够用）</td><td>含翻译——想要故事而不只是食物的人，这是真价值</td></tr><tr><td>隐藏店</td><td>需要本页 + 本地排队规则</td><td>导游有 1–2 家真正不在地图上的</td></tr><tr><td>社交</td><td>只有你们的桌子</td><td>和陌生人拼出小团体气氛</td></tr></tbody></table><p>诚实结论：成都是全中国最容易自走觅食的城市之一——扫码支付全覆盖、图片菜单是标配、本地排队规则替你完成筛选。报团的价值在于文化讲解、落地第一天零操心、或者独行想拼个桌。要报的话，国际平台（GetYourGuide、Viator、Klook）和本地运营商都有成都美食步行团——付款前拿本页对一下它们的停站清单。</p><h2>通用实用信息</h2><p><strong>节奏：</strong>一天 4–6 站是现实上限；放牧，别宴席。<strong>辣度：</strong>处处"微辣"；钵钵鸡这类冷食有藤椒选项——麻大于辣。<strong>支付：</strong>所有摊位都扫码——绑了国际卡的支付宝/微信全城通行。<strong>时间：</strong>街头摊午后早早就卖完；夜市约 18 点开张。<strong>备选：</strong>某站关门或人爆了，套用本地规则——200 米内最长的队伍。</p>',
    },
    image: '/images/dumplings/guotie.jpg',
    readTime: { en: '8 min read', zh: '阅读 8 分钟' },
    views: { en: '1.5k reads', zh: '阅读 1500' },
    publishedAt: { en: 'Just published', zh: '刚刚发布' },
    featured: false,
    videos: foodTourVideoGroups,
    faq: [
      {
        q: { en: 'How much does a food tour in Chengdu cost?', zh: '成都美食团/美食一日游多少钱？' },
        a: {
          en: 'Self-guided using our three routes runs ¥100–150 per day on food alone. Booked English-guided food walks typically cost ¥300–600+ per person. The gap is what you pay for narration, logistics and company — not better food.',
          zh: '用本页三条路线自走，一天纯吃 ¥100–150。报英文导览的美食步行团常见 ¥300–600+/人。差价买的是讲解、省心和同行的人——不是更好的食物。',
        },
      },
      {
        q: { en: 'Can I food-tour Chengdu without speaking Chinese?', zh: '不会中文能在成都自走觅食吗？' },
        a: {
          en: 'Yes, comfortably. Every stall and restaurant takes QR payment (Alipay/WeChat with a linked international card), picture menus are standard, and pointing plus holding up fingers is a complete ordering language. The one phrase worth learning: "wei la" (微辣) — mild spice.',
          zh: '可以，而且很舒服。所有摊位和馆子都扫码（支付宝/微信绑国际卡），图片菜单是标配，指认加比数字就是完整的点单语言。值得学的唯一一个词："微辣"。',
        },
      },
      {
        q: { en: 'Which Chengdu neighborhood is best for food?', zh: '成都哪个街区最适合觅食？' },
        a: {
          en: 'Yulin for the slow local day (fly restaurants, coffee, night market); the old-town core for classics plus tourist icons; Jianshe Road for maximum night-market density. Our street food guide covers the full neighborhood-by-neighborhood breakdown.',
          zh: '玉林适合本地慢日（苍蝇馆子、咖啡、夜市）；老城核心区适合经典加游客图标；建设路夜市密度最高。完整的街区拆解见街头小吃指南。',
        },
      },
      {
        q: { en: 'Are guided food tours in Chengdu worth it?', zh: '成都的付费美食团值得吗？' },
        a: {
          en: 'Worth it if you want cultural narration, zero logistics on your first day, or a ready-made group as a solo traveler — good guides also bring one or two genuinely off-map stops. Skip them if food is the only goal: the local-queue rule finds you equal or better tables for a third of the price.',
          zh: '想要文化讲解、第一天零操心、或者独行者想要现成饭桌——值得，好导游还有一两家真不在地图上的店。如果目标只是吃：本地排队规则能以三分之一的价格找到同样好或更好的桌子。',
        },
      },
    ],
    relatedLinks: [
      { to: '/guides/chengdu-street-food', label: { en: 'Chengdu Street Food Guide', zh: '成都街头小吃攻略' } },
      { to: '/guides/chengdu-hot-pot-guide', label: { en: 'Chengdu Hot Pot Guide', zh: '成都火锅指南' } },
      { to: '/guides/chengdu-food-guide', label: { en: 'The Chengdu Food Guide', zh: '成都美食全指南' } },
      { to: '/cities/chengdu', label: { en: 'Chengdu City Guide', zh: '成都城市页' } },
    ],
  },
  {
    slug: 'beijing-to-xian-train-guide',
    title: {
      en: 'Beijing to Xi\'an by Train: High-Speed Rail vs the Overnight Sleeper (Times, Prices & How to Book)',
      zh: '北京到西安怎么走：高铁vs夕发朝至卧铺（时长、票价与购票全攻略）',
    },
    label: { en: 'Rail Guide', zh: '高铁串联' },
    excerpt: {
      en: 'The 1,100-km link between China\'s two greatest ancient capitals, decided: 4.5–6 hour high-speed trains vs the classic Z20 overnight sleeper, ticket classes and real prices, booking with a foreign passport, and how to stitch the two cities into one trip.',
      zh: '两座最伟大古都之间的 1100 公里，一次讲清：4.5–6 小时高铁 vs Z20 夕发朝至卧铺、坐席与真实票价、外国护照购票，以及怎么把两座城缝成一次旅行。',
    },
    content: {
      en: '<p>Beijing and Xi\'an are the two anchors of any history-first China trip — the Ming and Qing capital, and the Tang capital that came a thousand years before it. They sit roughly 1,100–1,200 km apart, and China\'s rail network connects them with almost insulting convenience: bullet trains every hour on the hour, an overnight flagship express, and a flight option you rarely need. This guide decides the question properly: which train, which class, what it costs, how to book it with a foreign passport, and how to bolt the two cities together without wasting a day in between.</p><h2>The Three Ways, Compared</h2><table><thead><tr><th></th><th>High-speed (G)</th><td>Overnight sleeper (Z20 / D)</th><th>Flight</th></tr></thead><tbody><tr><td>Time</td><td>4.5–6 h city center to center</td><td>Board ~19:30, arrive ~08:00</td><td>~2 h flying + airport both ends</td></tr><tr><td>Price (2nd / hard sleeper)</td><td>~¥515–580 second class, ~¥820–1,000 first</td><td>~¥250–450 by berth class</td><td>Variable; often beats 1st-class rail if booked early</td></tr><tr><td>Best for</td><td>Daytime sightseeing efficiency</td><td>Saving a hotel night; train nerds</td><td>Last-minute long weekends</td></tr><tr><td>Stations</td><td>Beijing West → Xi\'an North</td><td>Beijing West → Xi\'an</td><td>PEK/PKX → XIY</td></tr></tbody></table><p>The default answer for most travelers: take the G train. The 4.5–6 hours pass through the best rail geography in northern China — out of Beijing across the North China Plain, the Yellow River crossing, then the loess plateau sliding into the Guanzhong plain — and you arrive centered, not airport-exhausted.</p><h2>The Overnight Option: Z20, the Flagship</h2><p>Xi\'an Railway Bureau\'s Z20 is a minor legend: 1,200 km, departure in the evening, arrival in Beijing in the morning, and not a single intermediate stop. You trade an evening for a hotel night — the soft sleeper cabins are the ones to book — and you experience the older, slower China that rail enthusiasts still document lovingly. If your schedule has a spare night and no spare hotel budget, this is the romantic option; if you sleep badly on trains, it is a ¥400 mistake.</p>[[videos:rail-overnight]]<h2>Booking with a Foreign Passport</h2><p><strong>Official channel:</strong> the 12306 app and website accept foreign passports directly — register with your passport number, and the ticket checker at the gate scans the document. <strong>Stations:</strong> ticket windows accept passports; bring the physical document. <strong>Third parties:</strong> Trip.com and similar services book the same trains with an English interface for a service markup — worth it your first time, unnecessary once you\'ve done 12306 once. <strong>Timing:</strong> tickets open ~15 days ahead; Beijing–Xi\'an rarely sells out except national holidays (avoid Golden Week entirely). <strong>Seats:</strong> second class on G trains is genuinely fine; first class buys width and quiet; business class buys a recliner and free meals you can buy yourself for ¥30.</p><h2>Stations & Last Miles</h2><p>G trains use <strong>Beijing West (北京西)</strong> — reachable by Metro Line 9 or 7 — and arrive at <strong>Xi\'an North (西安北)</strong>, a vast terminal about 30–40 minutes from the old town via Metro Line 2 or 4 directly from the station. The Z20 uses central <strong>Xi\'an station</strong>, walking distance from the city wall. Both stations have English signage and staffed passport lanes; arrive 40 minutes early for security lines.</p><h2>The Classic Two-City Trip</h2><p>The proven skeleton: three days in Beijing (Great Wall day, Forbidden City and hutong day, one free day) → morning G train → three days in Xi\'an (Terracotta Warriors day, city wall and Muslim Quarter day, museum and Grand Tang Mall day) → return overnight or fly out. Six days, two ancient capitals, one train ride you\'ll remember. With 8–10 days, extend south by rail to Chengdu for the food-city finale — the Sichuan leg turns the trip into a three-capital sweep.</p>',
      zh: '<p>北京和西安是任何"历史优先"中国旅行的两个锚点——明清的都城，和比它早一千年的盛唐都城。两城相距约 1100–1200 公里，而中国铁路把它们连接得近乎傲慢地方便：整点级密度的高铁、一班夕发朝至的旗舰直达、和一个你几乎用不上的航班选项。这一页把问题彻底讲清：选哪班车、什么坐席、花多少钱、外国护照怎么买票，以及怎么把两座城缝在一起还不浪费中间的一天。</p><h2>三种走法对比</h2><table><thead><tr><th></th><th>高铁（G）</th><th>夜行卧铺（Z20 / D）</th><th>飞机</th></tr></thead><tbody><tr><td>时间</td><td>4.5–6 小时市中心到市中心</td><td>约 19:30 上车，约 08:00 到</td><td>飞行约 2 小时 + 两端机场时间</td></tr><tr><td>价格（二等/硬卧）</td><td>二等约 ¥515–580，一等约 ¥820–1000</td><td>按铺位约 ¥250–450</td><td>浮动；早订常低于高铁一等座</td></tr><tr><td>适合</td><td>白天观光效率</td><td>省一晚酒店；火车迷</td><td>临时起意的长周末</td></tr><tr><td>车站</td><td>北京西 → 西安北</td><td>北京西 → 西安</td><td>首都/大兴 → 咸阳机场</td></tr></tbody></table><p>多数人的默认答案：坐高铁。4.5–6 小时穿过华北最好的铁路地理——出京掠过华北平原、跨黄河、黄土台塬滑入关中平原——而且你抵达时是在市中心，不是在机场的疲惫里。</p><h2>夜行选项：旗舰 Z20</h2><p>西安局的 Z20 是个小传奇：1200 公里，傍晚发车、清晨抵京、中途一站不停。你用一个晚上换一晚酒店——软卧是首选铺位——并且体验火车迷仍在深情记录的、更老更慢的中国。如果你的行程恰好多一个晚上、少一晚预算，这是浪漫选项；如果你在火车上睡不好，这就是一笔 ¥400 的错误。</p>[[videos:rail-overnight]]<h2>外国护照购票</h2><p><strong>官方渠道：</strong>12306 App 和网站直接支持外国护照——用护照号注册，检票口扫证件进站。<strong>车站：</strong>售票窗口收护照，带好原件。<strong>第三方：</strong>Trip.com 等用英文界面卖同一批车、加收服务费——第一次值，用过一次 12306 之后就没必要了。<strong>时间：</strong>车票约提前 15 天发售；京西线除节假日外很少售罄（黄金周整体避开）。<strong>坐席：</strong>高铁二等座真的够好；一等座买宽度和安静；商务座买可躺椅和一份你自己 ¥30 也买得到的餐。</p><h2>车站与最后一公里</h2><p>高铁用<strong>北京西站</strong>（地铁 7/9 号线可达），抵达<strong>西安北站</strong>——一座巨大的枢纽，站内换乘地铁 2/4 号线约 30–40 分钟进老城。Z20 用市中心的<strong>西安站</strong>，下车步行可达城墙。两站都有英文标识和人工护照通道；安检排队预留 40 分钟。</p><h2>经典双城行程</h2><p>被验证过的骨架：北京三天（长城日、故宫胡同日、机动日）→ 早班高铁 → 西安三天（兵马俑日、城墙回民街日、博物馆大唐不夜城日）→ 卧铺或飞机返程。六天，两座古都，一趟你会记得的火车。有 8–10 天，就继续向南坐到成都，用美食收官——川西段把行程升级成三都巡礼。</p>',
    },
    image: '/images/cities/xian/xian_p09_27.jpeg',
    readTime: { en: '7 min read', zh: '阅读 7 分钟' },
    views: { en: '1.2k reads', zh: '阅读 1200' },
    publishedAt: { en: 'Just published', zh: '刚刚发布' },
    featured: false,
    videos: railVideoGroups,
    faq: [
      {
        q: { en: 'How long is the train from Beijing to Xi\'an?', zh: '北京到西安坐火车多久？' },
        a: {
          en: 'High-speed G trains cover the ~1,100–1,200 km in 4.5 to 6 hours, running from Beijing West to Xi\'an North roughly hourly through the day. The overnight Z20 express departs in the evening and arrives next morning, with no intermediate stops.',
          zh: '高铁 G 字头 4.5–6 小时跑完约 1100–1200 公里，白天约每小时一班，北京西到西安北。Z20 夕发朝至，傍晚发车次日清晨到，中途一站不停。',
        },
      },
      {
        q: { en: 'How do foreigners buy China train tickets?', zh: '外国人怎么买中国火车票？' },
        a: {
          en: 'Register on the official 12306 app or website with your passport number — it accepts foreign passports directly, and gates scan the document. Station ticket windows also accept passports (bring the original). Trip.com offers the same trains in English for a service fee — convenient your first time.',
          zh: '用护照号在官方 12306 App 或网站注册——它直接支持外国护照，闸机扫证件进站。车站窗口也收护照（带原件）。Trip.com 用英文界面卖同一批车、收服务费——第一次用最省心。',
        },
      },
      {
        q: { en: 'Is it better to fly from Beijing to Xi\'an?', zh: '北京到西安坐飞机更好吗？' },
        a: {
          en: 'Rarely. Flights take ~2 hours but add an hour-plus at each airport, and both cities\' rail stations are central while airports are not. The G train is city-center to city-center in 4.5–6 hours; flying only wins on last-minute price or red-eye scheduling.',
          zh: '很少。飞行约 2 小时，但两端机场各加一小时以上，而且两城的高铁站都在市中心、机场不在。高铁市中心到市中心 4.5–6 小时；飞机只在临期票价或深夜时段占优。',
        },
      },
      {
        q: { en: 'Is the overnight sleeper from Xi\'an to Beijing worth it?', zh: '西安到北京的夜行卧铺值得吗？' },
        a: {
          en: 'If you sleep decently on trains, yes — the Z20 saves a hotel night and delivers you downtown at 8 AM. Book the soft sleeper cabins, not hard sleeper, for the difference that matters. If you\'re a bad train-sleeper, take the daytime G train and keep your hotel.',
          zh: '如果你在火车上睡得还行——值得：Z20 省一晚酒店，早上 8 点把你放在市中心。买软卧，不要硬卧，差异是实质性的。火车睡眠很差的人，请坐白天的高铁、保住酒店。',
        },
      },
    ],
    relatedLinks: [
      { to: '/guides/xian-3-day-classic-route', label: { en: 'Xi\'an 3-Day Itinerary', zh: '西安三日经典路线' } },
      { to: '/guides/beijing-off-the-beaten-path', label: { en: 'Beijing Off the Beaten Path', zh: '北京小众路线' } },
      { to: '/guides/chengdu-food-guide', label: { en: 'The Chengdu Food Guide', zh: '成都美食全指南' } },
      { to: '/guides/first-trip-to-china-guide', label: { en: 'First Trip to China', zh: '首次来华全指南' } },
    ],
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
