// 静态内容数据模块（双语：英文 / 中文）
// ---------------------------------------------------------------
// 该文件是网站的"单一数据源"，所有内容均在此处维护。
// 替代原先的 Prisma + SQLite 方案，因为 SQLite 的本地文件数据库
// 无法在 Vercel 等无服务器（serverless）平台上持久化运行。
//
// 通过构建时静态生成（nuxt generate），这些数据会被直接打包进
// 预渲染的 HTML，无需任何运行时数据库连接。
// 中文内容源自 template-chengdu.html / template-xian.html / template-home.html
// ---------------------------------------------------------------

// ===== 类型定义 =====

// 本地化文本：同时包含英文与中文
export interface L {
  en: string
  zh: string
}

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
    region: { en: 'Southwest China', zh: 'Southwest China' },
    tagline: {
      en: 'The city you will never want to leave',
      zh: '一座来了就不想走的城市',
    },
    tags: {
      en: 'Panda Paradise,Food Capital,Ancient Alleys,Slow Living',
      zh: '熊猫故乡,美食天堂,古巷茶馆,慢享生活',
    },
    heroImage: 'https://images.unsplash.com/photo-1590103513924-6be5415868c7?w=1600',
    description: {
      en: 'Hometown of giant pandas and the fiery Sichuan hot pot, Chengdu is a relaxed city famed for its teahouses, spicy cuisine, and laid-back lifestyle.',
      zh: '国宝大熊猫的故乡，也是麻辣鲜香的川菜与火锅的味觉名片。成都是一座慢节奏的城市，茶馆、古巷与悠闲的生活态度是它最动人的底色。',
    },
    intro: {
      en: 'Chengdu, the birthplace of ancient Shu civilization, has long been celebrated as the "Land of Abundance". Here, the millennia-old cultural heritage of Wuhou Shrine and Du Fu Thatched Cottage coexists with the bustling street life of Kuanzhai Alley and Jinli. You can meet adorable giant pandas at the breeding base, or sip tea in a street-side teahouse to experience the leisure woven into the soul of every local.',
      zh: '成都，古蜀文明的发祥地，素有"天府之国"的美誉。这里既有武侯祠、杜甫草堂的千年文脉，也有宽窄巷子、锦里的市井烟火；既能在熊猫基地与国宝萌宠相遇，也能在街头巷尾的茶馆里，体验刻在成都人骨子里的悠闲。',
    },
    history: {
      en: 'Over 2,300 years of history',
      zh: '2300+年建城历史',
    },
    bestSeason: {
      en: 'March to June, September to November',
      zh: '3-6月、9-11月',
    },
    duration: {
      en: '4 days recommended',
      zh: '建议4天',
    },
  },
  {
    slug: 'xian',
    name: { en: 'Xi\'an', zh: '西安' },
    region: { en: 'Northwest China', zh: 'Northwest China' },
    tagline: {
      en: 'Ancient capital of thirteen dynasties',
      zh: '十三朝古都 · 盛世长安',
    },
    tags: {
      en: 'Ancient Capital,Terracotta Warriors,City Wall,Tang Dynasty',
      zh: '历史古都,兵马俑,古城墙,盛唐文化',
    },
    heroImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600',
    description: {
      en: 'The ancient capital of thirteen dynasties and home of the Terracotta Army. Xi\'an is where half of Chinese history was written.',
      zh: '十三朝古都，兵马俑的磅礴气势与回民街的烟火人间交相辉映。一座西安城，半部中华史。',
    },
    intro: {
      en: 'Once known as Chang\'an, Xi\'an served as the capital for thirteen dynasties including the Qin, Han, and Tang. It is the starting point of the Silk Road and home to the world-famous Terracotta Warriors. Walk or cycle along the best-preserved ancient city wall in China, marvel at the Big Wild Goose Pagoda, and lose yourself in the bustling flavors of the Muslim Quarter. One city, half of Chinese history.',
      zh: '西安，古称长安，先后有秦、汉、唐等十三朝在此建都，是丝绸之路的起点，也是举世闻名的兵马俑的故乡。可以在中国现存最完整的古城墙上骑行漫步，仰望大雁塔的风姿，迷失在回民街的市井美味中。一座城，半部中华史。',
    },
    history: {
      en: 'Capital of thirteen dynasties, over 3,100 years',
      zh: '十三朝古都，3100年历史',
    },
    bestSeason: {
      en: 'March to May, September to November',
      zh: '3-5月、9-11月',
    },
    duration: {
      en: '3-4 days recommended',
      zh: '建议3-4天',
    },
  },
  {
    slug: 'beijing',
    name: { en: 'Beijing', zh: '北京' },
    region: { en: 'North China', zh: 'North China' },
    tagline: {
      en: 'The imperial heart of China',
      zh: '首都风范 · 皇城帝都',
    },
    tags: {
      en: 'Imperial Capital,Great Wall,Forbidden City,Hutong Culture',
      zh: '首都,长城,故宫,胡同文化',
    },
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600',
    description: {
      en: 'China\'s capital city, home to the Forbidden City, the Great Wall, the Temple of Heaven, and centuries of imperial history.',
      zh: '中国的首都，故宫、长城、天坛所在地，承载着数百年的皇家气象与厚重历史。',
    },
    intro: {
      en: 'Beijing, the capital of China, is a city where ancient imperial grandeur meets modern dynamism. From the majestic Forbidden City and the awe-inspiring Great Wall to the intimate hutong alleys and the Temple of Heaven, every corner tells a story spanning over 3,000 years. Beyond the famous landmarks, discover hidden museums, local food streets, and the authentic flavor of old Beijing.',
      zh: '北京，中国的首都，是一座皇家气度与现代活力并存的城市。从雄伟的故宫、震撼人心的长城，到烟火气十足的胡同与天坛，每一个角落都在讲述三千年的故事。除了著名地标，还有小众博物馆、本地美食街区与地道的老北京风情等你发现。',
    },
    history: {
      en: 'Over 3,000 years of history, capital for over 800 years',
      zh: '3000余年历史，800余年建都史',
    },
    bestSeason: {
      en: 'April to May, September to October',
      zh: '4-5月、9-10月',
    },
    duration: {
      en: '4-5 days recommended',
      zh: '建议4-5天',
    },
  },
] as const

// 景点数据 - 每座城市 6 个
const rawAttractions: Record<string, Omit<Attraction, 'id' | 'sortOrder'>[]> = {
  chengdu: [
    {
      name: { en: 'Giant Panda Breeding Research Base', zh: '成都大熊猫繁育研究基地' },
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800',
      location: { en: 'Chenghua District', zh: '成华区外北熊猫大道' },
      duration: { en: '3-4 hours', zh: '游玩3-4小时' },
      ticket: { en: '¥55', zh: '¥55' },
      highlight: { en: 'No.1 must-visit in Chengdu', zh: '成都必打卡TOP1' },
      description: {
        en: 'Get up close with adorable giant pandas as they eat bamboo, roll around, and nap. The Moon Chamber lets you see super-cute panda cubs. Arrive early in the morning for the most active pandas.',
        zh: '近距离观看国宝大熊猫吃竹子、打滚、睡觉，月亮产房可看超萌熊猫幼崽，建议上午尽早前往。',
      },
    },
    {
      name: { en: 'Kuanzhai Alley (Wide and Narrow Alleys)', zh: '宽窄巷子' },
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
      location: { en: 'Qingyang District', zh: '青羊区长顺上街' },
      duration: { en: '2-3 hours', zh: '游玩2-3小时' },
      ticket: { en: 'Free', zh: '免费' },
      highlight: { en: 'Microcosm of old Chengdu', zh: '老成都缩影' },
      description: {
        en: 'A Qing Dynasty historical district made up of Wide Alley, Narrow Alley, and Well Alley. Brimming with Sichuan food, teahouses, opera stages, and creative boutiques. Even more atmospheric at night.',
        zh: '由宽巷子、窄巷子、井巷子组成的清代古街，汇集川蜀美食、茶馆戏楼与特色文创，夜游更有氛围。',
      },
    },
    {
      name: { en: 'Jinli Ancient Street', zh: '锦里古街' },
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      location: { en: 'Wuhou District', zh: '武侯区武侯祠大街' },
      duration: { en: '2 hours', zh: '游玩2小时' },
      ticket: { en: 'Free', zh: '免费' },
      highlight: { en: 'Three Kingdoms era old street', zh: '武侯祠旁的三国古街' },
      description: {
        en: 'Known as the first street of Western Shu, right next to Wuhou Shrine. Red lanterns and stone-paved paths create a stunning scene, especially at night when the lanterns glow and food stalls line the way.',
        zh: '西蜀第一街，紧邻武侯祠，红灯笼与青石板相映成趣，夜晚灯火璀璨，小吃与手作摊位云集。',
      },
    },
    {
      name: { en: 'Wuhou Shrine', zh: '武侯祠' },
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800',
      location: { en: 'Wuhou District', zh: '武侯区武侯祠大街' },
      duration: { en: '1.5 hours', zh: '游玩1.5小时' },
      ticket: { en: '¥50', zh: '¥50' },
      highlight: { en: 'Three Kingdoms sacred site', zh: '三国圣地 · 君臣合庙' },
      description: {
        en: 'China\'s only memorial shrine jointly dedicated to a ruler and his minister, honoring Zhuge Liang and the heroes of Shu Han. The red walls and bamboo shadows make for iconic photos.',
        zh: '中国唯一的君臣合祀祠庙，纪念诸葛亮与蜀汉英雄，红墙竹影是超火的古风拍照打卡点。',
      },
    },
    {
      name: { en: 'Du Fu Thatched Cottage', zh: '杜甫草堂' },
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800',
      location: { en: 'Qingyang District', zh: '青羊区青华路' },
      duration: { en: '1.5 hours', zh: '游玩1.5小时' },
      ticket: { en: '¥50', zh: '¥50' },
      highlight: { en: 'Home of the Poetry Sage', zh: '诗圣故居 · 园林清幽' },
      description: {
        en: 'The former residence of the great Tang Dynasty poet Du Fu during his time in Chengdu. A serene, elegant garden shaded by bamboo, full of literary spirit and poetic charm.',
        zh: '唐代大诗人杜甫流寓成都时的故居，古朴雅致的江南园林，竹林掩映，充满文人气息与诗意。',
      },
    },
    {
      name: { en: 'Dujiangyan Irrigation System', zh: '都江堰水利工程' },
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      location: { en: 'Dujiangyan City', zh: '都江堰市城西' },
      duration: { en: 'Full day trip', zh: '建议一日游' },
      ticket: { en: '¥80', zh: '¥80' },
      highlight: { en: 'UNESCO World Heritage Site', zh: '世界文化遗产' },
      description: {
        en: 'A remarkable 2,000-year-old water conservation project that still functions today. Combine with nearby Mount Qingcheng to experience "the most serene place under heaven".',
        zh: '两千多年前的伟大水利工程，至今仍在发挥作用，可顺路游览青城山，感受"青城天下幽"。',
      },
    },
  ],
  xian: [
    {
      name: { en: 'Terracotta Warriors Museum', zh: '秦始皇兵马俑' },
      image: 'https://picsum.photos/id/1074/800/600',
      location: { en: 'Lintong District', zh: '临潼区' },
      duration: { en: '3-4 hours', zh: '3-4小时' },
      ticket: { en: '¥120', zh: '¥120' },
      highlight: { en: 'Eighth Wonder of the World', zh: '5A景区 · 世界第八大奇迹' },
      description: {
        en: 'The "Eighth Wonder of the World" and the burial pits of Emperor Qin Shi Huang. Thousands of life-sized terracotta warriors, each with a unique facial expression, stand in breathtaking formation.',
        zh: '世界第八大奇迹，秦始皇陵的陪葬坑，出土了数以千计的真人大小陶俑。每一尊兵马俑面容各异，栩栩如生，震撼人心。',
      },
    },
    {
      name: { en: 'Xi\'an Ancient City Wall', zh: '西安古城墙' },
      image: 'https://picsum.photos/id/1040/800/600',
      location: { en: 'City Center', zh: '市中心' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: '¥54', zh: '¥54' },
      highlight: { en: 'Best-preserved city wall in China', zh: '地标 · 中国现存最完整城垣' },
      description: {
        en: 'The largest and best-preserved ancient city wall in China. Rent a bicycle and ride along the 13.7 km perimeter for sweeping views of the old town. Sunset is especially beautiful.',
        zh: '中国现存规模最大、保存最完整的古代城垣。可以租一辆自行车骑行城墙之上，俯瞰西安老城风光，傍晚景色尤佳。',
      },
    },
    {
      name: { en: 'Big Wild Goose Pagoda & Da Ci\'en Temple', zh: '大雁塔·大慈恩寺' },
      image: 'https://picsum.photos/id/1041/800/600',
      location: { en: 'Yanta District', zh: '雁塔区' },
      duration: { en: '2 hours', zh: '2小时' },
      ticket: { en: '¥40', zh: '¥40' },
      highlight: { en: 'Tang Dynasty landmark', zh: '佛教圣地 · 唐代地标' },
      description: {
        en: 'Built under the direction of the monk Xuanzang, this is the iconic landmark of Tang Dynasty Chang\'an. The North Square features the largest musical fountain in Asia, spectacular at night.',
        zh: '玄奘法师主持修建，唐代长安的标志性建筑。北广场有亚洲最大的音乐喷泉，夜晚灯光璀璨，是西安必看夜景之一。',
      },
    },
    {
      name: { en: 'Huaqing Palace', zh: '华清宫' },
      image: 'https://picsum.photos/id/1039/800/600',
      location: { en: 'Lintong District', zh: '临潼区' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: '¥120', zh: '¥120' },
      highlight: { en: 'Imperial hot spring palace', zh: '皇家园林 · 唐代温泉行宫' },
      description: {
        en: 'The legendary romance site of Emperor Xuanzong and Lady Yang Guifei, famous for its hot springs on Mount Li. The live show "The Song of Everlasting Sorrow" is breathtaking.',
        zh: '唐玄宗与杨贵妃的爱情圣地，因骊山温泉而闻名。《长恨歌》实景演出震撼人心，以骊山为幕，光影演绎千年绝恋。',
      },
    },
    {
      name: { en: 'Muslim Quarter (Huimin Jie)', zh: '回民街' },
      image: 'https://picsum.photos/id/1080/800/600',
      location: { en: 'Lianhu District', zh: '莲湖区' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: 'Free', zh: '免费' },
      highlight: { en: 'Food lover\'s paradise', zh: '美食天堂 · 烟火人间' },
      description: {
        en: 'Xi\'an\'s most famous food street, paved with stone and shaded by trees. Lined with halal snack stalls selling roujiamo, mutton paomo, and zenggao. Bursting with authentic local flavor.',
        zh: '西安最著名的美食街区，青石铺路，绿树成荫。两旁遍布清真小吃店，肉夹馍、羊肉泡馍、甑糕应有尽有，烟火气十足。',
      },
    },
    {
      name: { en: 'Shaanxi History Museum', zh: '陕西历史博物馆' },
      image: 'https://picsum.photos/id/1068/800/600',
      location: { en: 'Yanta District', zh: '雁塔区' },
      duration: { en: '3-4 hours', zh: '3-4小时' },
      ticket: { en: 'Free (reservation required)', zh: '免费（需预约）' },
      highlight: { en: 'Treasure house of Chinese civilization', zh: '文博 · 中华文明宝库' },
      description: {
        en: '"Give me one day, and I will give you ten thousand years." Housing over 370,000 artifacts spanning more than one million years, from prehistoric humans to the Opium Wars. Reservation required.',
        zh: '"给我一天，还你万年"。馆藏文物37万余件，从远古人类到鸦片战争，时间跨度长达一百多万年，需提前预约。',
      },
    },
  ],
  beijing: [
    {
      name: { en: 'The Forbidden City', zh: '故宫博物院' },
      image: 'https://images.unsplash.com/photo-1584432810607-4b9c2e6d8c4c?w=800',
      location: { en: 'Dongcheng District', zh: '东城区' },
      duration: { en: '4-5 hours', zh: '4-5小时' },
      ticket: { en: '¥60', zh: '¥60' },
      highlight: { en: 'World\'s largest imperial palace', zh: '世界最大皇家宫殿' },
      description: {
        en: 'The Forbidden City is the world\'s largest and best-preserved wooden palace complex. Home to 24 Ming and Qing emperors, its golden roofs and crimson walls are the very image of imperial China.',
        zh: '故宫是世界上现存规模最大、保存最完整的木质结构古建筑群。曾居住过明清两代24位皇帝，金瓦红墙是皇家中国最经典的意象。',
      },
    },
    {
      name: { en: 'The Great Wall (Badaling Section)', zh: '长城（八达岭段）' },
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
      location: { en: 'Yanqing District', zh: '延庆区' },
      duration: { en: 'Full day trip', zh: '建议一日游' },
      ticket: { en: '¥40', zh: '¥40' },
      highlight: { en: 'Wonder of the World', zh: '世界七大奇迹之一' },
      description: {
        en: 'One of the New Seven Wonders of the World, the Badaling section is the most iconic and accessible part of the Great Wall. Climb to the highest beacon tower for spectacular mountain views.',
        zh: '世界新七大奇迹之一，八达岭段是长城最具代表性、最易到达的部分。登顶最高烽火台可俯瞰壮丽山景。',
      },
    },
    {
      name: { en: 'Temple of Heaven', zh: '天坛' },
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      location: { en: 'Dongcheng District', zh: '东城区' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: '¥34', zh: '¥34' },
      highlight: { en: 'Ming Dynasty sacrificial altar', zh: '明清皇家祭天圣地' },
      description: {
        en: 'Where Ming and Qing emperors prayed for good harvests. The Hall of Prayer for Good Harvests is an architectural masterpiece built entirely without nails. Locals gather here each morning for tai chi.',
        zh: '明清两代皇帝祭天祈谷之所。祈年殿是一座不用一根铁钉的建筑杰作。每天清晨，本地人聚此晨练、打太极。',
      },
    },
    {
      name: { en: 'Summer Palace', zh: '颐和园' },
      image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800',
      location: { en: 'Haidian District', zh: '海淀区' },
      duration: { en: '3-4 hours', zh: '3-4小时' },
      ticket: { en: '¥30', zh: '¥30' },
      highlight: { en: 'Imperial garden masterpiece', zh: '皇家园林杰作' },
      description: {
        en: 'The largest and best-preserved imperial garden in China. Stroll along the Long Corridor, take a boat on Kunming Lake, and admire the Tower of Buddhist Incense atop Longevity Hill.',
        zh: '中国现存最大、保存最完整的皇家园林。漫步长廊，泛舟昆明湖，登万寿山远眺佛香阁。',
      },
    },
    {
      name: { en: 'Tiananmen Square', zh: '天安门广场' },
      image: 'https://images.unsplash.com/photo-1538382336400-77c8df42c4ed?w=800',
      location: { en: 'Dongcheng District', zh: '东城区' },
      duration: { en: '1-2 hours', zh: '1-2小时' },
      ticket: { en: 'Free', zh: '免费' },
      highlight: { en: 'Heart of the nation', zh: '祖国心脏' },
      description: {
        en: 'The world\'s largest public square, surrounded by monumental buildings including the National Museum of China and the Great Hall of the People. Witness the daily flag-raising ceremony at dawn.',
        zh: '世界上最大的城市广场，四周环绕着中国国家博物馆、人民大会堂等标志性建筑。清晨可观看升旗仪式。',
      },
    },
    {
      name: { en: 'Hutong Alleys of Nanluoguxiang', zh: '南锣鼓巷胡同' },
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
      location: { en: 'Dongcheng District', zh: '东城区' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: 'Free', zh: '免费' },
      highlight: { en: 'Authentic old Beijing', zh: '地道老北京' },
      description: {
        en: 'Wander through centuries-old hutong alleyways to experience authentic old Beijing. Visit courtyard homes, browse boutique shops, and taste traditional snacks in this charming historic neighborhood.',
        zh: '漫步在百年胡同里，感受地道的老北京风情。探访四合院、逛文创小店、品尝传统小吃，韵味十足。',
      },
    },
  ],
}

// 美食数据 - 每座城市 4-6 种
const rawFoods: Record<string, Omit<Food, 'id' | 'sortOrder'>[]> = {
  chengdu: [
    {
      name: { en: 'Sichuan Hot Pot', zh: '牛油火锅' },
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      highlight: { en: 'Soul of Chengdu cuisine', zh: '成都美食灵魂' },
      description: {
        en: 'Rich beef tallow broth, numbing and spicy. Beef tripe, duck intestine, and yellow throat are the three must-order treasures, dipped in sesame oil and garlic for irresistible flavor.',
        zh: '醇厚牛油锅底，麻辣鲜香，毛肚、鸭肠、黄喉是必点三宝，蘸上香油蒜泥，越煮越有滋味。',
      },
    },
    {
      name: { en: 'Skewers in Cold Pot (Chuanchuan Xiang)', zh: '冷锅串串' },
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      highlight: { en: 'Street food icon', zh: '市井烟火代表' },
      description: {
        en: 'A variety of ingredients threaded on bamboo skewers, cooked in a secret red broth and served ready to eat. Paired with icy jelly drink, it\'s a classic Chengdu street delicacy.',
        zh: '各种食材穿成串，在秘制红汤里煮好上桌，搭配冰粉和解暑饮料，是成都街头的经典美味。',
      },
    },
    {
      name: { en: 'Dan Dan Noodles', zh: '担担面' },
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
      highlight: { en: 'Centuries-old classic', zh: '百年经典小吃' },
      description: {
        en: 'Thin noodles topped with savory minced meat sauce, sprinkled with Sichuan pepper and scallions. Numbing, spicy, and silky smooth, it\'s a quintessential Chengdu breakfast.',
        zh: '细面条配肉末卤汁，撒上花椒面与葱花，麻辣鲜香、入口爽滑，是成都早餐的经典选择。',
      },
    },
    {
      name: { en: 'Handmade Ice Jelly', zh: '手工冰粉' },
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
      highlight: { en: 'Spice quencher', zh: '解辣神器' },
      description: {
        en: 'Hand-rubbed ice jelly topped with brown sugar syrup, sticky rice cakes, hawthorn flakes, and crushed peanuts. Cool, sweet, and refreshing, the perfect partner for hot pot.',
        zh: '手搓冰粉配上红糖、糍粑、山楂碎、花生碎，口感Q弹清甜，是吃火锅串串的绝佳搭档。',
      },
    },
    {
      name: { en: 'Zhong Dumplings', zh: '钟水饺' },
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      highlight: { en: 'Time-honored brand', zh: '成都老字号' },
      description: {
        en: 'Thin-skinned, tender dumplings bathed in a signature chili oil sauce. Slightly sweet, garlicky, and rich, they are a beloved representative of traditional Chengdu snacks.',
        zh: '皮薄馅嫩的红油水饺，淋上特制红油酱汁，微甜带辣、蒜香浓郁，是成都传统小吃的代表。',
      },
    },
    {
      name: { en: 'Spicy Rabbit Head', zh: '麻辣兔头' },
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      highlight: { en: 'A local favorite', zh: '本地人的最爱' },
      description: {
        en: 'Available in five-spice or numbing-spicy flavors, the firm and flavorful meat gets tastier with every bite. A staple late-night snack and drinking companion for Chengdu locals.',
        zh: '五香、麻辣两种口味，肉质紧实入味，越啃越香，是成都人夜宵、下酒的标配美食。',
      },
    },
  ],
  xian: [
    {
      name: { en: 'Mutton Paomo (Pita Soaked in Mutton Soup)', zh: '羊肉泡馍' },
      image: 'https://picsum.photos/id/1080/800/600',
      highlight: { en: 'The signature Xi\'an dish', zh: '西安美食代表 · 羊羹' },
      description: {
        en: 'The crown jewel of Xi\'an cuisine. Tear a flatbread into pea-sized pieces, then simmer in a rich mutton broth with glass noodles and scallions. Served with pickled garlic and chili sauce.',
        zh: '西安美食的代表之作，古称"羊羹"。将烙饼掰成黄豆大小，配以浓郁的羊肉汤煮制，加入粉丝、葱花、糖蒜。汤浓肉烂，馍筋道入味。',
      },
    },
    {
      name: { en: 'Roujiamo (Chinese Hamburger)', zh: '腊汁肉夹馍' },
      image: 'https://picsum.photos/id/1069/800/600',
      highlight: { en: 'The original Chinese burger', zh: '"中式汉堡"鼻祖' },
      description: {
        en: 'Crispy-on-the-outside, soft-on-the-inside flatbread stuffed with tender, slow-stewed pork. The authentic version uses only braised meat, no peppers or herbs. A daily Xi\'an favorite.',
        zh: '"中式汉堡"的鼻祖，白吉馍外酥里嫩，腊汁肉肥而不腻。馍香肉酥，回味无穷。正宗肉夹馍只用腊汁肉，不加青椒香菜。',
      },
    },
    {
      name: { en: 'Biangbiang Noodles', zh: 'biangbiang面' },
      image: 'https://picsum.photos/id/1059/800/600',
      highlight: { en: 'Belt-wide noodles', zh: '宽如裤带 · 油泼辣子香' },
      description: {
        en: 'Hand-pulled noodles as wide as a belt, smothered in sizzling chili oil. Chewy, fragrant, and satisfying, they are the bold, hearty pride of Shaanxi noodle culture.',
        zh: '手工扯面宽如裤带，泼上滚烫的油泼辣子。筋道鲜香、过瘾实在，是陕西面食文化的豪迈担当。',
      },
    },
    {
      name: { en: 'Zenggao (Steamed Glutinous Rice Cake)', zh: '甑糕' },
      image: 'https://picsum.photos/id/1073/800/600',
      highlight: { en: 'Sweet traditional treat', zh: '糯米红枣 · 香甜软糯' },
      description: {
        en: 'Layers of glutinous rice, red dates, and honey steamed in a traditional iron pot. Sweet, sticky, and comforting, it\'s a beloved Xi\'an street dessert.',
        zh: '糯米、红枣与蜂蜜在传统铁甑中层层蒸制。香甜软糯、温润养胃，是西安街头备受喜爱的甜品。',
      },
    },
    {
      name: { en: 'Liangpi (Cold Rice Noodles)', zh: '凉皮' },
      image: 'https://picsum.photos/id/1067/800/600',
      highlight: { en: 'Refreshing classic', zh: '秦镇米皮 · 酸辣开胃' },
      description: {
        en: 'Qinzhen rice noodles served cold with vinegar, chili oil, and cucumber. Tangy, spicy, and appetizing, the perfect refreshing snack on a warm day.',
        zh: '秦镇米皮凉拌，调入醋、油泼辣子与黄瓜丝。酸辣爽口、开胃解馋，夏日里的一抹清凉。',
      },
    },
    {
      name: { en: 'Persimmon Cake', zh: '柿子饼' },
      image: 'https://picsum.photos/id/1068/800/600',
      highlight: { en: 'Crispy autumn delight', zh: '黄桂柿子 · 外酥里甜' },
      description: {
        en: 'Made from Lintong osmanthus persimmons, these golden fried cakes are crispy outside and sweetly soft inside. A seasonal specialty best enjoyed fresh in autumn.',
        zh: '选用临潼黄桂柿子制成，金黄的炸饼外酥内软、香甜可口。秋季现做现吃风味最佳，是应季的特色美味。',
      },
    },
  ],
  beijing: [
    {
      name: { en: 'Peking Roast Duck', zh: '北京烤鸭' },
      image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
      highlight: { en: 'The dish that defines Beijing', zh: '京味代表菜' },
      description: {
        en: 'The most famous of all Beijing dishes. Crispy, lacquered skin and tender duck meat, wrapped in a thin pancake with scallion, cucumber, and sweet bean sauce. A must-try culinary icon.',
        zh: '北京最负盛名的名菜。皮脆肉嫩、色泽红亮，用薄饼卷着葱丝、黄瓜条与甜面酱一起吃，是来京必尝的美味。',
      },
    },
    {
      name: { en: 'Zhajiangmian (Fried Sauce Noodles)', zh: '炸酱面' },
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      highlight: { en: 'Beijing comfort food', zh: '老北京家常味' },
      description: {
        en: 'Hearty hand-pulled noodles topped with a rich sauce of ground pork and fermented yellow soybean paste, mixed with fresh shredded vegetables. A beloved everyday meal of old Beijing.',
        zh: '劲道的手擀面浇上肉末与黄酱熬制的浓香炸酱，配上各色菜码拌匀。是老北京人日常最爱的家常美味。',
      },
    },
    {
      name: { en: 'Jiaozi (Boiled Dumplings)', zh: '饺子' },
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      highlight: { en: 'Northern staple', zh: '北方主食' },
      description: {
        en: 'Plump dumplings stuffed with pork and cabbage or pork and shrimp, boiled and served with black vinegar and chili oil. A comforting classic of northern Chinese home cooking.',
        zh: '皮薄馅大的饺子，猪肉白菜、猪肉大虾馅料丰富，水煮后蘸着陈醋与辣椒油食用。北方家常经典。',
      },
    },
    {
      name: { en: 'Tanghulu (Candied Hawthorn Sticks)', zh: '糖葫芦' },
      image: 'https://images.unsplash.com/photo-1606788075953-b2284bc6e6c1?w=800',
      highlight: { en: 'Sweet street snack', zh: '街头甜蜜小吃' },
      description: {
        en: 'Skewered hawthorn berries dipped in glossy, rock-hard sugar syrup. The perfect balance of tart and sweet, this traditional Beijing snack is a favorite for all ages.',
        zh: '山楂串裹上晶莹脆硬的糖衣，酸甜适口、嘎嘣脆。是男女老少都爱的传统北京街头小吃。',
      },
    },
    {
      name: { en: 'Luzhu Huoshao (Stewed Pork Offal Bread)', zh: '卤煮火烧' },
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      highlight: { en: 'Old Beijing classic', zh: '老北京市井味' },
      description: {
        en: 'A traditional working-class dish of pork offal, tofu, and wheat bread wheels simmered in a rich, fragrant broth. Bold, savory, and deeply satisfying for the adventurous eater.',
        zh: '传统市井美食，将猪肠、猪肺、豆腐与火烧在浓香老汤中炖煮。口味浓郁厚实，是老北京人钟爱的硬核美味。',
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
      title: { en: 'Old Town Culture Route', zh: '市区古巷人文线' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Explore Wuhou Shrine and photograph the iconic red walls and bamboo', zh: '武侯祠逛三国古迹，打卡红墙竹影' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Stroll through Jinli Ancient Street and sample local snacks', zh: '锦里古街品尝成都特色小吃' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Visit Du Fu Thatched Cottage and enjoy its serene gardens', zh: '杜甫草堂感受诗圣故居的清幽' } },
        { timeSlot: { en: 'Evening', zh: '傍晚' }, content: { en: 'Wander Kuanzhai Alley and experience old Chengdu street life', zh: '宽窄巷子漫步，体验老成都市井风情' } },
        { timeSlot: { en: 'Night', zh: '晚上' }, content: { en: 'Enjoy an authentic Sichuan beef tallow hot pot dinner', zh: '附近火锅店享用正宗牛油火锅' } },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Panda & Leisure Route', zh: '熊猫萌宠休闲线' },
      items: [
        { timeSlot: { en: 'Early Morning', zh: '清晨' }, content: { en: 'Head to the Giant Panda Breeding Base early to see active pandas', zh: '早起前往大熊猫繁育研究基地看熊猫' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Lunch near the base, then return to the city for a short rest', zh: '基地附近用餐，返回市区稍作休息' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Sip gaiwan tea at Heming Teahouse in People\'s Park, try ear cleaning', zh: '人民公园鹤鸣茶社喝盖碗茶、掏耳朵' } },
        { timeSlot: { en: 'Evening', zh: '傍晚' }, content: { en: 'Shop at Chunxi Road and Taikoo Li, snap the IFS climbing panda', zh: '春熙路、太古里逛街打卡IFS爬墙熊猫' } },
        { timeSlot: { en: 'Night', zh: '晚上' }, content: { en: 'Experience Chengdu nightlife at a Yulin Road music bar', zh: '玉林路小酒馆体验成都夜生活' } },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'Dujiangyan Day Trip', zh: '都江堰山水一日游' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Take the intercity train to Dujiangyan and tour the ancient water project', zh: '城际列车前往都江堰，参观千年水利工程' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Try local cold-water fish and handmade ice jelly in Dujiangyan town', zh: '都江堰市区品尝当地冷水鱼、老奶冰粉' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Hike the front mountain of Mount Qingcheng, the most serene place under heaven', zh: '游览青城山前山，感受青城天下幽' } },
        { timeSlot: { en: 'Evening', zh: '傍晚' }, content: { en: 'Return to Chengdu by high-speed train to conclude your trip', zh: '乘高铁返回成都市区，行程结束' } },
      ],
    },
  ],
  xian: [
    {
      dayNumber: 1,
      title: { en: 'Downtown East Route', zh: '市区东线' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Shaanxi History Museum (book 3 days ahead) for Zhou, Qin, Han, and Tang treasures', zh: '陕西历史博物馆（提前3天预约），感受周秦汉唐盛世风华' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Big Wild Goose Pagoda area, climb Da Ci\'en Temple, watch the musical fountain', zh: '大雁塔周边，大慈恩寺登塔，北广场音乐喷泉' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Rent a bike and cycle the 13.7 km Ancient City Wall from Yongning Gate', zh: '古城墙骑行，永宁门登城，骑行一圈约13.7公里' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Bell and Drum Towers at night, then dinner in the Muslim Quarter', zh: '钟鼓楼夜景绝美，回民街品尝西安特色小吃' } },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Lintong Imperial Route', zh: '临潼线' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Terracotta Warriors Museum: Pits 1, 2, 3 and the Bronze Chariot Hall (hire a guide)', zh: '秦始皇兵马俑：1、2、3号坑 + 铜车马展厅，建议请讲解' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Lunch in Lintong, try the local da pan ji and youpo noodles', zh: '临潼午餐，品尝临潼大盘鸡、油泼面' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Huaqing Palace, the imperial hot springs and the Boulders of Mt Li', zh: '华清宫，唐代皇家温泉，骊山兵谏亭' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Watch "The Song of Everlasting Sorrow" live show (center A zone recommended)', zh: '《长恨歌》实景演出，强烈推荐中A区' } },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'Culture & Leisure Route', zh: '人文休闲' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Beilin Museum (Forest of Steles), a treasure trove of Chinese calligraphy', zh: '碑林博物馆，书法艺术宝库，颜柳欧赵俱全' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Yongxingfang food court, featuring delicacies from all over Shaanxi', zh: '永兴坊，陕西各地美食汇聚，摔碗酒体验' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Small Wild Goose Pagoda and Jianfu Temple, quiet and crowd-free', zh: '小雁塔 + 荐福寺，西安博物院，清幽人少体验佳' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Tang Dynasty Grand Tang Mall, a brilliant Tang-style pedestrian street', zh: '大唐不夜城，盛唐天街，不倒翁小姐姐表演' } },
      ],
    },
  ],
  beijing: [
    {
      dayNumber: 1,
      title: { en: 'Imperial Heart Route', zh: '皇城中轴线' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Tiananmen Square flag-raising, then enter the Forbidden City from the Meridian Gate', zh: '天安门广场观看升旗，经午门进入故宫' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Lunch near the Forbidden City, rest your feet', zh: '故宫周边午餐，稍作休整' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Climb Jingshan Park for a panoramic view of the golden palace roofs', zh: '登景山公园俯瞰故宫金黄琉璃瓦顶' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Stroll the hutongs of Nanluoguxiang and try old Beijing snacks', zh: '南锣鼓巷胡同漫步，品尝老北京小吃' } },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Great Wall Adventure', zh: '长城雄关行' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Depart early for the Badaling Great Wall, climb to the highest beacon tower', zh: '早出发前往八达岭长城，登顶最高烽火台' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Lunch at the foot of the Great Wall', zh: '长城脚下午餐' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Visit the Ming Tombs, the imperial burial site of 13 Ming emperors', zh: '参观明十三陵，明代13位皇帝的陵寝' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Return to the city for a traditional Peking Roast Duck dinner', zh: '返回市区，享用正宗北京烤鸭晚餐' } },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'Temples & Gardens Route', zh: '坛庙园林线' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Temple of Heaven, watch locals practice tai chi, admire the Hall of Prayer', zh: '天坛，看本地人打太极，欣赏祈年殿' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Try zhajiangmian (fried sauce noodles) at a nearby old Beijing eatery', zh: '附近老北京馆子品尝炸酱面' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Summer Palace, walk the Long Corridor and boat on Kunming Lake', zh: '颐和园，漫步长廊，泛舟昆明湖' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Watch a Peking Opera or acrobatics show to end your Beijing journey', zh: '观看京剧或杂技演出，为北京之旅画上句号' } },
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
        en: 'Both Shuangliu and Tianfu airports have direct metro lines to the city center|Metro covers all major attractions, get a Tianfu Transport Card|Downtown attractions are dense, taxis and shared bikes are convenient|Take the intercity train to Dujiangyan, transfer at Xipu Station',
        zh: '双流机场/天府机场均有地铁直达市区|地铁覆盖主要景点，建议办理天府通|市区景点密集，打车、共享单车都方便|去都江堰可乘城际列车，犀浦站换乘',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿建议' },
      items: {
        en: 'First choice: Chunxi Road / Taikoo Li area for transit and shopping|For quiet: Kuanzhai Alley or Qingyang Palace area|Yulin neighborhood is full of local life and great food|Book 1-2 weeks ahead during peak season',
        zh: '首选春熙路/太古里周边，交通购物便利|喜欢安静可选宽窄巷子、青羊宫附近|玉林片区充满生活气息，美食云集|旺季建议提前1-2周预订酒店',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Friendly Tips', zh: '温馨提示' },
      items: {
        en: 'Visit pandas in the morning, they mostly sleep in the afternoon|Ask for mild spice when ordering hot pot, local heat is intense|Summer is humid and muggy, winter is damp and cold, pack accordingly|Teahouses are affordable, a must for experiencing local life',
        zh: '看熊猫务必上午去，下午熊猫多在睡觉|吃火锅可提前说微辣，本地辣度偏高|夏季潮湿闷热，冬季阴冷，备好衣物|茶馆消费亲民，体验本地生活必去',
      },
    },
  ],
  xian: [
    {
      icon: 'transport',
      title: { en: 'Getting Around', zh: '交通指南' },
      items: {
        en: 'Xi\'an Xianyang International Airport is 47 km from downtown, use metro line 14 or airport bus|Xi\'an North Station is the main high-speed rail hub, metro lines 2 and 4 connect downtown|8 metro lines cover major sights, use Alipay or WeChat transit codes|To reach the Terracotta Warriors, take tourist bus 5 (306) from the railway station',
        zh: '西安咸阳国际机场距市区约47公里，可乘机场大巴、地铁14号线|西安北站是主要高铁站，地铁2号线、4号线直达市区|已开通8条地铁线路，可使用支付宝/微信乘车码|去兵马俑可在火车站乘游5（306路）',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Important Notes', zh: '注意事项' },
      items: {
        en: 'Book Shaanxi History Museum 3 days in advance via official WeChat, free but in high demand|Hire a guide at the Terracotta Warriors, otherwise you only see "clay figures"|Xi\'an food is salty and spicy, request less salt and chili if you prefer mild|Beware of unofficial taxis and touts near the railway station',
        zh: '陕西历史博物馆需提前3天在官方公众号预约，免费但一票难求|兵马俑建议请讲解员，否则只能看到"泥人"|西安饮食偏咸辣，口味清淡可提前告知少盐少辣|火车站周边黑车黑导较多，务必乘坐正规交通工具',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿推荐' },
      items: {
        en: 'Bell Tower / Muslim Quarter area: convenient and full of food, great for first-timers|Big Wild Goose Pagoda area: pleasant and great for night views, mid to high-end hotels|Yongning Gate area: at the foot of the city wall, metro interchange, easy access|Xiaozhai shopping district: youthful hub, great value for money',
        zh: '钟鼓楼/回民街附近：交通便利，美食众多，适合首次来西安|大雁塔附近：环境较好，夜景优美，中高档酒店集中|永宁门附近：城墙脚下，地铁交汇，出行方便|小寨商圈：年轻人聚集地，购物餐饮丰富，性价比高',
      },
    },
  ],
  beijing: [
    {
      icon: 'transport',
      title: { en: 'Getting Around', zh: '交通指南' },
      items: {
        en: 'Beijing has two airports: Capital International and Daxing International, both connected by express metro|Beijing has multiple major railway stations, check your ticket carefully|The metro is the fastest way around, covering all major attractions|Book Forbidden City and Great Wall tickets online in advance',
        zh: '北京有首都国际机场和大兴国际机场两座机场，机场快轨直达市区|北京有多个主要火车站，请仔细核对车票站点|地铁是市内最便捷的交通方式，覆盖主要景点|故宫、长城等热门景点需提前线上预约门票',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Important Notes', zh: '注意事项' },
      items: {
        en: 'Forbidden City entry requires advance online reservation, often sold out|Great Wall visits demand lots of walking, wear comfortable shoes|Beijing winters are cold and dry, summers hot and humid, spring and autumn are best|Have translation apps ready, English is not widely spoken off the tourist trail',
        zh: '故宫需提前网上实名预约，旺季常约满|游览长城步行较多，请穿舒适的鞋子|北京冬季寒冷干燥，夏季炎热多雨，春秋最佳|非热门景区英语普及度较低，建议备好翻译软件',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿推荐' },
      items: {
        en: 'Wangfujing / Dongdan area: central, walk to the Forbidden City|Houhai / Nanluoguxiang area: hutong charm, perfect for culture lovers|Sanlitun / CBD area: modern, international dining and nightlife|Book early for peak seasons and national holidays',
        zh: '王府井/东单周边：市中心，步行可达故宫|后海/南锣鼓巷周边：胡同风情，文化爱好者首选|三里屯/CBD周边：现代时尚，国际餐饮与夜生活丰富|旺季及法定假日建议提前预订',
      },
    },
  ],
}

// 攻略文章数据
const rawGuides: Omit<Guide, 'id'>[] = [
  {
    slug: 'xian-3-day-classic-route',
    title: {
      en: '3-Day Xi\'an Classic Route: Terracotta Warriors, City Wall & Muslim Quarter',
      zh: '西安三日经典路线：兵马俑+城墙+回民街全攻略',
    },
    label: { en: '3 Days 2 Nights', zh: '3天2晚' },
    excerpt: {
      en: 'First time in Xi\'an? This route covers all the must-see attractions, authentic food, and transport tips. Beginners can follow it step by step.',
      zh: '第一次去西安怎么玩？这条路线涵盖必去景点、地道美食和交通避坑指南，新手直接照着走就行。',
    },
    content: {
      en: '<p>Xi\'an, the ancient capital of thirteen dynasties, is a city where history breathes. This 3-day itinerary covers the absolute essentials for first-time visitors.</p><h2>Day 1: The Heart of the Ancient City</h2><p>Start your morning at the Shaanxi History Museum, where over 370,000 artifacts span more than a million years of history. Be sure to book your free ticket three days in advance. Afterward, head to the Big Wild Goose Pagoda and watch the musical fountain at the North Square.</p><p>In the afternoon, rent a bicycle and ride along the 13.7-kilometer Ancient City Wall. The view of the old town at sunset is unforgettable. End your day at the Bell and Drum Towers, then dive into the Muslim Quarter for roujiamo, mutton paomo, and candied persimmon cake.</p><h2>Day 2: The Terracotta Army</h2><p>Take a bus to Lintong to witness the Eighth Wonder of the World. The Terracotta Warriors Museum features three main pits and a bronze chariot hall. Hiring a licensed guide is highly recommended, as the stories behind each warrior bring the experience to life.</p><p>In the afternoon, visit nearby Huaqing Palace, the imperial hot spring estate of Emperor Xuanzong and Lady Yang. If time permits, book tickets for the spectacular live show "The Song of Everlasting Sorrow" in the evening.</p><h2>Day 3: Calligraphy, Food, and the Tang Dynasty</h2><p>Begin at the Beilin Museum (Forest of Steles), a treasure house of Chinese calligraphy featuring the work of master calligraphers across centuries. For lunch, head to Yongxingfang, a food street gathering delicacies from every corner of Shaanxi province.</p><p>In the afternoon, visit the Small Wild Goose Pagoda and Jianfu Temple, a quiet and crowd-free alternative to its larger sibling. End your Xi\'an journey at the Grand Tang Mall, a brilliant Tang Dynasty-themed pedestrian street that comes alive after dark.</p>',
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
      en: 'Beijing In-Depth: Off-the-Beaten-Path Guide to Avoid the Crowds',
      zh: '北京深度游：避开人潮的小众玩法清单',
    },
    label: { en: '5 Days 4 Nights', zh: '5天4晚' },
    excerpt: {
      en: 'Beyond the Forbidden City and Great Wall, this guide takes you into the old Beijing hutongs, hidden museums, and the food streets where locals actually eat.',
      zh: '不止故宫长城，带你走进老北京胡同、小众博物馆和本地人常去的美食街区。',
    },
    content: {
      en: '<p>Beijing is far more than its headline attractions. This 5-day itinerary blends the iconic with the intimate.</p><h2>The Imperial Essentials</h2><p>No first visit is complete without the Forbidden City and the Great Wall. Arrive at Tiananmen Square at dawn to watch the flag-raising ceremony, then enter the palace through the Meridian Gate. Afterward, climb Jingshan Hill for the classic panorama of golden rooftops.</p><p>For the Great Wall, skip the busiest sections and consider Mutianyu for a quieter, restored experience with cable car access. Hire a driver for a stress-free day trip.</p><h2>Hutong Life</h2><p>The hutongs are the soul of old Beijing. Rent a bicycle and explore the alleys around Nanluoguxiang, Drum and Bell Towers, and Houhai. Stop at a courtyard cafe for a slow coffee, and visit a local family for a home-cooked lunch.</p><h2>Hidden Museums and Local Food</h2><p>Beijing is full of small, fascinating museums. Try the Capital Museum, the Beijing Planning Exhibition Hall, or the quirky Beijing Watermelon Museum. For food, skip tourist traps and head to Gui Jie (Ghost Street) for late-night crayfish, or find a tiny zhajiangmian shop tucked in a hutong. End your trip with Peking Roast Duck at a heritage restaurant and a Peking Opera performance.</p>',
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
      en: 'Chengdu Food Guide: From Street Stalls to Time-Honored Brands',
      zh: '成都美食全指南：从街边摊到老字号一网打尽',
    },
    label: { en: 'Food Map', zh: '美食地图' },
    excerpt: {
      en: 'Hot pot, skewers, dan dan noodles, spicy rabbit head... 20 hidden gem eateries cherished by locals. Follow this guide and you will never go wrong.',
      zh: '火锅、串串、担担面、兔头……本地人私藏的20家宝藏店铺，照着吃不踩雷。',
    },
    content: {
      en: '<p>Chengdu is China\'s first city designated as a UNESCO City of Gastronomy. This guide takes you from sizzling hot pot to humble street snacks.</p><h2>The Soul of Chengdu: Sichuan Hot Pot</h2><p>Beef tallow broth is the hallmark of authentic Chengdu hot pot. Order the holy trinity of beef tripe, duck intestine, and yellow throat. Dip them in sesame oil with raw garlic to temper the heat. Locals favor veterans like Shu Daxia and Long Chao Shou for consistent quality.</p><h2>Street Food Treasures</h2><p>Beyond hot pot, Chengdu shines in its snacks. Try chuanchuan (cold pot skewers) in a smoky alley shop, dan dan noodles from a shoulder-pole vendor tradition, and handmade ice jelly to soothe the spice. For the adventurous, spicy rabbit head is a local obsession.</p><h2>Time-Honored Brands</h2><p>Chengdu is home to century-old eateries. Visit Long Chao Shao for wontons, Zhong Dumplings for chili oil dumplings, and Fu Qi Fei Pian for sliced beef offal. Pair your meals with gaiwan tea at Heming Teahouse for the full Chengdu experience. Remember: locals ask for mild spice, so follow their lead if you cannot handle the heat.</p>',
      zh: '<p>成都是中国首座被联合国教科文组织授予"美食之都"称号的城市。本指南从热气腾腾的火锅到市井小吃一网打尽。</p><h2>成都之魂：川味火锅</h2><p>牛油锅底是正宗成都火锅的灵魂。必点"三宝"——毛肚、鸭肠、黄喉，蘸香油蒜泥碟既解辣又提香。本地老饕偏爱蜀大侠、龙抄手等品质稳定的老店。</p><h2>街头美味</h2><p>除了火锅，成都的小吃同样精彩。去烟火巷子里的串串店、传承百年的担担面担子，再来一碗手搓冰粉解辣。敢于挑战的话，麻辣兔头是本地人的心头好。</p><h2>老字号</h2><p>成都藏着不少百年老字号：龙抄手吃馄饨、钟水饺吃红油水饺、夫妻肺片吃凉拌牛杂。配一壶鹤鸣茶社的盖碗茶，才是完整的成都体验。记住：本地人都点微辣，怕辣就跟着他们点准没错。</p>',
    },
    image: 'https://images.unsplash.com/photo-1555217851-6141535bd773?w=800',
    readTime: { en: '7 min read', zh: '阅读 7 分钟' },
    views: { en: '31k reads', zh: '阅读 3.1w' },
    publishedAt: { en: '5 days ago', zh: '5天前' },
    featured: true,
  },
  {
    slug: 'first-trip-to-china-guide',
    title: {
      en: 'How to Plan Your First Trip to China: A Complete Beginner\'s Guide',
      zh: '第一次去中国怎么玩：新手超完全攻略',
    },
    label: { en: 'Beginner Guide', zh: '新手指南' },
    excerpt: {
      en: 'Visas, payments, apps, SIM cards, and transport. Everything you need to know before your first trip to China, all in one place.',
      zh: '签证、支付、APP、电话卡、交通……第一次去中国前你必须知道的一切，一篇文章全搞定。',
    },
    content: {
      en: '<p>Planning your first trip to China can feel overwhelming. This guide simplifies the essentials.</p><h2>Visas and Entry</h2><p>Most travelers need a tourist visa (L visa). Apply at a Chinese embassy or consulate with your passport, photo, itinerary, and hotel bookings. China now offers 144-hour visa-free transit in several major cities, including Beijing and Shanghai.</p><h2>Payments and Apps</h2><p>Cash is rarely used. Set up Alipay and WeChat Pay before arrival, both now accept foreign credit cards. Download WeChat for communication and Baidu Maps for navigation, since Google services require a VPN.</p><h2>Getting Around</h2><p>China\'s high-speed rail network is the world\'s largest and a joy to use. Book tickets via Trip.com or the 12306 app. Within cities, metros are clean, cheap, and extensive. Ride-hailing with DiDi is convenient and affordable.</p>',
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
      en: 'Best Time to Visit China: Season-by-Season Travel Guide',
      zh: '什么时候去中国最好：四季旅行指南',
    },
    label: { en: 'Planning', zh: '行程规划' },
    excerpt: {
      en: 'Spring flowers, summer mountains, autumn leaves, and winter wonderlands. Find out when to visit each region of China for the best experience.',
      zh: '春花、夏山、秋叶、冬雪……带你找到中国每个地区最佳旅行时间。',
    },
    content: {
      en: '<p>China is vast, and the best time to visit depends on where you are going.</p><h2>Spring (March to May)</h2><p>Spring is ideal for most of China. Temperatures are mild, flowers bloom, and crowds are thinner. Beijing, Xi\'an, and the Yangtze River are at their best.</p><h2>Autumn (September to November)</h2><p>Autumn rivals spring as the best season. Crisp air, blue skies, and golden foliage make it perfect for hiking the Great Wall or exploring Beijing\'s hutongs.</p><h2>Summer and Winter</h2><p>Summer is hot and humid, but great for the mountains of Yunnan and Tibet. Winter is cold in the north but magical for the Harbin Ice Festival and fewer crowds at major sites.</p>',
      zh: '<p>中国幅员辽阔，最佳旅行时间取决于你要去哪里。</p><h2>春季（3-5月）</h2><p>春季适合中国大部分地区。气温宜人、百花盛开、游客较少。北京、西安、长江流域都处于最佳状态。</p><h2>秋季（9-11月）</h2><p>秋季与春季并列最佳。天高气爽、蓝天白云、金色落叶，登长城、逛北京胡同再合适不过。</p><h2>夏冬两季</h2><p>夏季炎热潮湿，但适合去云南、西藏的山地避暑。冬季北方寒冷，但哈尔滨冰雪大世界如梦如幻，热门景点也少有人挤。</p>',
    },
    image: 'https://images.unsplash.com/photo-1525874684015-4d3e4b3a3e0a?w=800',
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
