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
      en: 'Where the pace slows down and life tastes better',
      zh: '一座来了就不想走的城市',
    },
    tags: {
      en: 'Pandas,Spicy Food,Teahouse Culture,Slow Pace',
      zh: '熊猫故乡,美食天堂,古巷茶馆,慢享生活',
    },
    heroImage: 'https://images.unsplash.com/photo-1590103513924-6be5415868c7?w=1600',
    description: {
      en: 'Chengdu is where China\'s cuddliest icons live and its spiciest cuisine was born. Think bamboo-munching pandas, mouth-numbing hot pot, and teahouses where time slows to the speed of a well-brewed cup.',
      zh: '国宝大熊猫的故乡，也是麻辣鲜香的川菜与火锅的味觉名片。成都是一座慢节奏的城市，茶馆、古巷与悠闲的生活态度是它最动人的底色。',
    },
    intro: {
      en: 'Chengdu is the capital of Sichuan province and the cradle of the ancient Shu civilization — a region so fertile it\'s been called the "Land of Abundance" for over two thousand years. History lives here in temples honoring Three Kingdoms heroes and the cottage of China\'s most beloved poet. But Chengdu isn\'t stuck in the past. Today it\'s a laid-back, food-obsessed city where locals while away afternoons in bamboo teahouses and chase the perfect bite of hot pot after dark. Don\'t miss the giant panda breeding base, the atmospheric alleys of old town, and the simple pleasure of sitting still with a cup of tea.',
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
      en: 'Walk 3,000 years of history in one city',
      zh: '十三朝古都 · 盛世长安',
    },
    tags: {
      en: 'Terracotta Warriors,Ancient City Wall,Tang Dynasty,Silk Road',
      zh: '历史古都,兵马俑,古城墙,盛唐文化',
    },
    heroImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600',
    description: {
      en: 'Xi\'an was China\'s imperial capital for 13 dynasties and the eastern end of the Silk Road. Home to the Terracotta Army and a massive intact city wall — it\'s living history you can walk through.',
      zh: '十三朝古都，兵马俑的磅礴气势与回民街的烟火人间交相辉映。一座西安城，半部中华史。',
    },
    intro: {
      en: 'Long known as Chang\'an — "City of Eternal Peace" — Xi\'an sits at the heart of ancient Chinese history. Thirteen dynasties made their capital here, from the Qin who first unified China to the Tang Dynasty whose golden age still defines the country\'s cultural identity. It was also the starting point of the Silk Road, the trade route that connected East and West for centuries. Today, you can bike the 14-kilometer ancient city wall (the largest and best-preserved in China), stand before thousands of life-sized terracotta soldiers, and eat your way through the vibrant Muslim Quarter. It\'s hard to think of another city where 3,000 years of history feel so present.',
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
      en: 'Where emperors once ruled and the Great Wall meets the sky',
      zh: '首都风范 · 皇城帝都',
    },
    tags: {
      en: 'Forbidden City,Great Wall,Hutong Alleys,Imperial History',
      zh: '首都,长城,故宫,胡同文化',
    },
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600',
    description: {
      en: 'China\'s sprawling capital — home to the Forbidden City, the Great Wall, centuries of imperial history, and a food scene that goes way beyond Peking duck.',
      zh: '中国的首都，故宫、长城、天坛所在地，承载着数百年的皇家气象与厚重历史。',
    },
    intro: {
      en: 'Beijing is more than China\'s capital — it\'s the country\'s political, cultural, and historical heart. For over 800 years, emperors of the Ming and Qing dynasties ruled from the Forbidden City, a sprawling palace complex of golden roofs and crimson walls at the city\'s core. An hour north, the Great Wall snakes across mountain ridges, one of humanity\'s most astonishing feats of engineering. But Beijing isn\'t all imperial grandeur. Step into the hutong — narrow alleyways lined with courtyard homes — and you\'ll find a quieter, older city where neighbors chat on doorsteps and street vendors fry up breakfast pastries. Add world-class museums, a thriving arts scene, and enough food to keep you eating for weeks, and you\'ve got a city that rewards every extra day you stay.',
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
      name: { en: 'Chengdu Research Base of Giant Panda Breeding', zh: '成都大熊猫繁育研究基地' },
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800',
      location: { en: 'Chenghua District', zh: '成华区外北熊猫大道' },
      duration: { en: '3-4 hours', zh: '游玩3-4小时' },
      ticket: { en: '¥55 (about $7.50)', zh: '¥55' },
      highlight: { en: 'Chengdu\'s #1 attraction', zh: '成都必打卡TOP1' },
      description: {
        en: 'The best place in the world to see giant pandas up close. Watch them munch bamboo, tumble down hills, and nap in trees. The Moon Nursery is where you\'ll find the tiniest cubs. Go before 9 AM — pandas are most active in the early morning and sleep through the afternoon heat.',
        zh: '近距离观看国宝大熊猫吃竹子、打滚、睡觉，月亮产房可看超萌熊猫幼崽，建议上午尽早前往。',
      },
    },
    {
      name: { en: 'Kuanzhai Alleys', zh: '宽窄巷子' },
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
      location: { en: 'Qingyang District', zh: '青羊区长顺上街' },
      duration: { en: '2-3 hours', zh: '游玩2-3小时' },
      ticket: { en: 'Free to enter', zh: '免费' },
      highlight: { en: 'Old Chengdu in a nutshell', zh: '老成都缩影' },
      description: {
        en: 'Three parallel Qing-era alleyways — Wide, Narrow, and Well — packed with teahouses, Sichuan street food, opera performances, and boutique shops. Come at night when the red lanterns glow and the crowds fill the streets for the full atmosphere.',
        zh: '由宽巷子、窄巷子、井巷子组成的清代古街，汇集川蜀美食、茶馆戏楼与特色文创，夜游更有氛围。',
      },
    },
    {
      name: { en: 'Jinli Ancient Street', zh: '锦里古街' },
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      location: { en: 'Wuhou District', zh: '武侯区武侯祠大街' },
      duration: { en: '2 hours', zh: '游玩2小时' },
      ticket: { en: 'Free to enter', zh: '免费' },
      highlight: { en: 'Three Kingdoms-themed old street', zh: '武侯祠旁的三国古街' },
      description: {
        en: 'A lively pedestrian street right next to Wuhou Shrine, done up in the style of the Three Kingdoms period (220–280 AD). Stone paths, hanging red lanterns, and endless snack stalls — especially pretty after dark. Grab a bowl of spicy tofu pudding or a candied hawthorn skewer while you browse.',
        zh: '西蜀第一街，紧邻武侯祠，红灯笼与青石板相映成趣，夜晚灯火璀璨，小吃与手作摊位云集。',
      },
    },
    {
      name: { en: 'Wuhou Shrine', zh: '武侯祠' },
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800',
      location: { en: 'Wuhou District', zh: '武侯区武侯祠大街' },
      duration: { en: '1.5 hours', zh: '游玩1.5小时' },
      ticket: { en: '¥50 (about $7)', zh: '¥50' },
      highlight: { en: 'Sacred site of the Three Kingdoms', zh: '三国圣地 · 君臣合庙' },
      description: {
        en: 'China\'s only temple built to honor both a ruler and his minister — Liu Bei, emperor of the Shu Kingdom, and Zhuge Liang, his legendary strategist from the Three Kingdoms era. Don\'t miss the famous red wall lined with bamboo, one of Chengdu\'s most photographed spots.',
        zh: '中国唯一的君臣合祀祠庙，纪念诸葛亮与蜀汉英雄，红墙竹影是超火的古风拍照打卡点。',
      },
    },
    {
      name: { en: 'Du Fu Thatched Cottage', zh: '杜甫草堂' },
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800',
      location: { en: 'Qingyang District', zh: '青羊区青华路' },
      duration: { en: '1.5 hours', zh: '游玩1.5小时' },
      ticket: { en: '¥50 (about $7)', zh: '¥50' },
      highlight: { en: 'Home of China\'s "Poet Sage"', zh: '诗圣故居 · 园林清幽' },
      description: {
        en: 'The former home of Du Fu, one of China\'s greatest classical poets, who lived here in the 8th century. The original thatched cottage is long gone, but the peaceful bamboo garden, reflecting ponds, and calligraphy-strewn halls make it one of the most beautiful spots in Chengdu. Perfect for a quiet escape from the city.',
        zh: '唐代大诗人杜甫流寓成都时的故居，古朴雅致的江南园林，竹林掩映，充满文人气息与诗意。',
      },
    },
    {
      name: { en: 'Dujiangyan Irrigation System', zh: '都江堰水利工程' },
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      location: { en: 'Dujiangyan City (1 hr from Chengdu)', zh: '都江堰市城西' },
      duration: { en: 'Day trip from Chengdu', zh: '建议一日游' },
      ticket: { en: '¥80 (about $11)', zh: '¥80' },
      highlight: { en: '2,200-year-old UNESCO site', zh: '世界文化遗产' },
      description: {
        en: 'An engineering marvel built in 256 BC that still controls the flow of the Min River today — no dam required. It turned flood-prone Sichuan into the fertile "Land of Abundance." Pair it with a hike up nearby Mount Qingcheng, a sacred Taoist mountain famous for its quiet forests and ancient temples.',
        zh: '两千多年前的伟大水利工程，至今仍在发挥作用，可顺路游览青城山，感受"青城天下幽"。',
      },
    },
  ],
  xian: [
    {
      name: { en: 'Terracotta Army Museum', zh: '秦始皇兵马俑' },
      image: 'https://picsum.photos/id/1074/800/600',
      location: { en: 'Lintong District (1.5 hrs from city center)', zh: '临潼区' },
      duration: { en: '3-4 hours', zh: '3-4小时' },
      ticket: { en: '¥120 (about $16.50)', zh: '¥120' },
      highlight: { en: '"Eighth Wonder of the World"', zh: '5A景区 · 世界第八大奇迹' },
      description: {
        en: 'Thousands of life-sized clay soldiers, horses, and chariots buried with China\'s first emperor over 2,200 years ago — accidentally discovered by farmers digging a well in 1974. Each warrior has unique facial features. Hire a guide on-site — the stories behind the pits make the experience unforgettable.',
        zh: '世界第八大奇迹，秦始皇陵的陪葬坑，出土了数以千计的真人大小陶俑。每一尊兵马俑面容各异，栩栩如生，震撼人心。',
      },
    },
    {
      name: { en: 'Xi\'an Ancient City Wall', zh: '西安古城墙' },
      image: 'https://picsum.photos/id/1040/800/600',
      location: { en: 'City center', zh: '市中心' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: '¥54 (about $7.50)', zh: '¥54' },
      highlight: { en: 'Largest intact city wall in China', zh: '地标 · 中国现存最完整城垣' },
      description: {
        en: 'The largest and best-preserved ancient city wall in China — 13.7 km (8.5 miles) around, wide enough for a six-lane road on top. Rent a bicycle (about $5 an hour) and ride the full loop, or walk a section at sunset for golden light over the old town rooftops. Enter from Yongning Gate for the most dramatic access.',
        zh: '中国现存规模最大、保存最完整的古代城垣。可以租一辆自行车骑行城墙之上，俯瞰西安老城风光，傍晚景色尤佳。',
      },
    },
    {
      name: { en: 'Big Wild Goose Pagoda & Da Ci\'en Temple', zh: '大雁塔·大慈恩寺' },
      image: 'https://picsum.photos/id/1041/800/600',
      location: { en: 'Yanta District', zh: '雁塔区' },
      duration: { en: '2 hours', zh: '2小时' },
      ticket: { en: '¥40 (about $5.50) + extra to climb', zh: '¥40' },
      highlight: { en: 'Tang Dynasty Buddhist landmark', zh: '佛教圣地 · 唐代地标' },
      description: {
        en: 'A 7th-century pagoda built by the monk Xuanzang — the real-life monk who traveled to India and inspired the classic novel Journey to the West. The North Square has Asia\'s largest musical fountain, with nightly shows that light up after dark.',
        zh: '玄奘法师主持修建，唐代长安的标志性建筑。北广场有亚洲最大的音乐喷泉，夜晚灯光璀璨，是西安必看夜景之一。',
      },
    },
    {
      name: { en: 'Huaqing Palace', zh: '华清宫' },
      image: 'https://picsum.photos/id/1039/800/600',
      location: { en: 'Lintong District (near Terracotta Army)', zh: '临潼区' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: '¥120 (about $16.50)', zh: '¥120' },
      highlight: { en: 'Imperial hot spring palace', zh: '皇家园林 · 唐代温泉行宫' },
      description: {
        en: 'An imperial hot spring resort at the foot of Mount Li, famous as the scene of one of China\'s most tragic love stories — Emperor Xuanzong and his consort Yang Guifei. The ruins of the Tang Dynasty bathhouses are still visible. Don\'t miss "The Song of Everlasting Sorrow" outdoor show in summer — spectacular light show projected onto the mountain.',
        zh: '唐玄宗与杨贵妃的爱情圣地，因骊山温泉而闻名。《长恨歌》实景演出震撼人心，以骊山为幕，光影演绎千年绝恋。',
      },
    },
    {
      name: { en: 'Muslim Quarter (Huimin Jie)', zh: '回民街' },
      image: 'https://picsum.photos/id/1080/800/600',
      location: { en: 'Lianhu District', zh: '莲湖区' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: 'Free to enter', zh: '免费' },
      highlight: { en: 'Food lover\'s paradise', zh: '美食天堂 · 烟火人间' },
      description: {
        en: 'Xi\'an\'s most famous food street, centered around the Great Mosque (one of the oldest and largest in China). The Hui Muslim community has lived here for over 1,000 years. Try roujiamo (the original Chinese hamburger), mutton paomo (bread soaked in lamb soup), and persimmon cakes as you wander the tree-lined stone streets.',
        zh: '西安最著名的美食街区，青石铺路，绿树成荫。两旁遍布清真小吃店，肉夹馍、羊肉泡馍、甑糕应有尽有，烟火气十足。',
      },
    },
    {
      name: { en: 'Shaanxi History Museum', zh: '陕西历史博物馆' },
      image: 'https://picsum.photos/id/1068/800/600',
      location: { en: 'Yanta District', zh: '雁塔区' },
      duration: { en: '3-4 hours', zh: '3-4小时' },
      ticket: { en: 'Free — book 3 days ahead', zh: '免费（需预约）' },
      highlight: { en: 'Treasure house of Chinese civilization', zh: '文博 · 中华文明宝库' },
      description: {
        en: '"Give me one day, and I\'ll give you 10,000 years." This museum holds over 370,000 artifacts covering a million years of history, from Stone Age tools to Tang Dynasty gold. Free entry but book on WeChat 3 days in advance — tickets go fast. The Tang Dynasty gold and silver hall is worth the extra ticket price.',
        zh: '"给我一天，还你万年"。馆藏文物37万余件，从远古人类到鸦片战争，时间跨度长达一百多万年，需提前预约。',
      },
    },
  ],
  beijing: [
    {
      name: { en: 'The Forbidden City', zh: '故宫博物院' },
      image: 'https://images.unsplash.com/photo-1584432810607-4b9c2e6d8c4c?w=800',
      location: { en: 'Dongcheng District (city center)', zh: '东城区' },
      duration: { en: '4-5 hours minimum', zh: '4-5小时' },
      ticket: { en: '¥60 (about $8.50)', zh: '¥60' },
      highlight: { en: 'World\'s largest imperial palace', zh: '世界最大皇家宫殿' },
      description: {
        en: 'The world\'s largest surviving palace complex — 980 buildings across 180 acres. Home to 24 emperors of the Ming and Qing dynasties for nearly 500 years. Book tickets online days ahead — same-day tickets sell out fast. Enter through the Meridian Gate (south) and exit at the Gate of Divine Might (north), then climb Jingshan Park across the street for the classic overhead view of golden rooftops.',
        zh: '故宫是世界上现存规模最大、保存最完整的木质结构古建筑群。曾居住过明清两代24位皇帝，金瓦红墙是皇家中国最经典的意象。',
      },
    },
    {
      name: { en: 'Great Wall at Badaling', zh: '长城（八达岭段）' },
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
      location: { en: 'Yanqing District (1.5 hrs north)', zh: '延庆区' },
      duration: { en: 'Full-day trip', zh: '建议一日游' },
      ticket: { en: '¥40 (about $5.50)', zh: '¥40' },
      highlight: { en: 'One of the New 7 Wonders of the World', zh: '世界七大奇迹之一' },
      description: {
        en: 'The most famous and accessible section of China\'s Great Wall, a 2,000-year-old defensive barrier that stretches over 13,000 miles. Badaling is restored and crowded — go early to beat the crowds. Climb to the highest beacon tower for sweeping mountain views. For a quieter experience, consider Mutianyu instead, with cable cars and a toboggan slide down.',
        zh: '世界新七大奇迹之一，八达岭段是长城最具代表性、最易到达的部分。登顶最高烽火台可俯瞰壮丽山景。',
      },
    },
    {
      name: { en: 'Temple of Heaven', zh: '天坛' },
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      location: { en: 'Dongcheng District', zh: '东城区' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: '¥34 (about $4.75)', zh: '¥34' },
      highlight: { en: 'Ming Dynasty imperial altar', zh: '明清皇家祭天圣地' },
      description: {
        en: 'A sprawling temple complex where Ming and Qing emperors prayed for good harvests. The iconic Hall of Prayer for Good Harvests — a circular wooden building with triple eaves and dark blue tiles — was built without a single nail. Come early morning to watch locals practice tai chi, play badminton, and sing opera in the surrounding park.',
        zh: '明清两代皇帝祭天祈谷之所。祈年殿是一座不用一根铁钉的建筑杰作。每天清晨，本地人聚此晨练、打太极。',
      },
    },
    {
      name: { en: 'Summer Palace', zh: '颐和园' },
      image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800',
      location: { en: 'Haidian District (northwest)', zh: '海淀区' },
      duration: { en: '3-4 hours', zh: '3-4小时' },
      ticket: { en: '¥30 (about $4.25)', zh: '¥30' },
      highlight: { en: 'Imperial garden masterpiece', zh: '皇家园林杰作' },
      description: {
        en: 'The largest and best-preserved royal garden in China, built as a summer retreat for the empress dowager Cixi. Wander the 728-meter Long Corridor painted with thousands of classical scenes, take a boat across Kunming Lake, and climb up to the Tower of Buddhist Incense for the best view. Go on a weekday for fewer crowds.',
        zh: '中国现存最大、保存最完整的皇家园林。漫步长廊，泛舟昆明湖，登万寿山远眺佛香阁。',
      },
    },
    {
      name: { en: 'Tiananmen Square', zh: '天安门广场' },
      image: 'https://images.unsplash.com/photo-1538382336400-77c8df42c4ed?w=800',
      location: { en: 'Dongcheng District (city center)', zh: '东城区' },
      duration: { en: '1-2 hours', zh: '1-2小时' },
      ticket: { en: 'Free to enter', zh: '免费' },
      highlight: { en: 'The symbolic heart of China', zh: '祖国心脏' },
      description: {
        en: 'The world\'s largest public square — large enough to hold a million people. Surrounded by the National Museum of China, the Great Hall of the People, and the mausoleum of Mao Zedong. The daily flag-raising at dawn draws big crowds — arrive well before sunrise if you want to see it up close. Note: security checks are thorough, so bring ID and allow extra time.',
        zh: '世界上最大的城市广场，四周环绕着中国国家博物馆、人民大会堂等标志性建筑。清晨可观看升旗仪式。',
      },
    },
    {
      name: { en: 'Nanluoguxiang Hutongs', zh: '南锣鼓巷胡同' },
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
      location: { en: 'Dongcheng District', zh: '东城区' },
      duration: { en: '2-3 hours', zh: '2-3小时' },
      ticket: { en: 'Free to wander', zh: '免费' },
      highlight: { en: 'Old Beijing at its most charming', zh: '地道老北京' },
      description: {
        en: 'Wander the web of narrow alleyways called hutongs — the traditional residential neighborhoods of old Beijing. Nanluoguxiang is the most famous one, with boutique shops, courtyard cafes, and street food, but don\'t stop there. Duck into the side alleys for a quieter glimpse of real hutong life: grandparents sitting on doorsteps, caged birds singing, and the smell of cooking from courtyard homes.',
        zh: '漫步在百年胡同里，感受地道的老北京风情。探访四合院、逛文创小店、品尝传统小吃，韵味十足。',
      },
    },
  ],
}

// 美食数据 - 每座城市 4-6 种
const rawFoods: Record<string, Omit<Food, 'id' | 'sortOrder'>[]> = {
  chengdu: [
    {
      name: { en: 'Sichuan Beef Tallow Hot Pot', zh: '牛油火锅' },
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      highlight: { en: 'The soul of Chengdu food', zh: '成都美食灵魂' },
      description: {
        en: 'Rich, deep-red hot pot simmering with beef tallow, Sichuan peppercorns, and dried chilies — the signature numbing-spicy "mala" flavor Sichuan is famous for. Order the classic trio: beef tripe, duck intestine, and yellow throat. Dip everything in a sesame oil and garlic bowl to cool the heat.',
        zh: '醇厚牛油锅底，麻辣鲜香，毛肚、鸭肠、黄喉是必点三宝，蘸上香油蒜泥，越煮越有滋味。',
      },
    },
    {
      name: { en: 'Cold Pot Skewers (Chuanchuan Xiang)', zh: '冷锅串串' },
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      highlight: { en: 'The ultimate street food', zh: '市井烟火代表' },
      description: {
        en: 'Ingredients from meat to veggies to tofu — all skewered and cooked in a spicy Sichuan broth, served ready to eat. It\'s like hot pot but faster and cheaper. Pair with a bowl of icy rice jelly dessert (bingfen) to balance the heat.',
        zh: '各种食材穿成串，在秘制红汤里煮好上桌，搭配冰粉和解暑饮料，是成都街头的经典美味。',
      },
    },
    {
      name: { en: 'Dan Dan Noodles', zh: '担担面' },
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
      highlight: { en: 'A century-old Sichuan classic', zh: '百年经典小吃' },
      description: {
        en: 'Thin wheat noodles tossed in a savory sauce of ground pork, chili oil, and Sichuan peppercorn — named for the street vendors who once carried them in baskets on shoulder poles. Numbing, spicy, and deeply savory, it\'s the classic Chengdu breakfast.',
        zh: '细面条配肉末卤汁，撒上花椒面与葱花，麻辣鲜香、入口爽滑，是成都早餐的经典选择。',
      },
    },
    {
      name: { en: 'Hand-Rubbed Ice Jelly (Bing Fen)', zh: '手工冰粉' },
      image: 'https://images.unsplash.com/photo-1540420773420-336722f4999?w=800',
      highlight: { en: 'The spicy food antidote', zh: '解辣神器' },
      description: {
        en: 'A jiggly, translucent jelly made from a type of fig, hand-rubbed for texture. Topped with brown sugar syrup, glutinous rice cakes, hawthorn flakes, and crushed peanuts. Sweet, cool, and absolutely essential after a hot pot meal.',
        zh: '手搓冰粉配上红糖、糍粑、山楂碎、花生碎，口感Q弹清甜，是吃火锅串串的绝佳搭档。',
      },
    },
    {
      name: { en: 'Zhong Dumplings', zh: '钟水饺' },
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      highlight: { en: 'A time-honored Chengdu classic', zh: '成都老字号' },
      description: {
        en: 'Pork dumplings in a glossy, sweet-spicy chili oil sauce — the signature dish of a century-old shop founded by a man named Zhong Shaobai. Thin skins, juicy filling, and that addictive chili oil make them a Chengdu staple.',
        zh: '皮薄馅嫩的红油水饺，淋上特制红油酱汁，微甜带辣、蒜香浓郁，是成都传统小吃的代表。',
      },
    },
    {
      name: { en: 'Spicy Rabbit Head', zh: '麻辣兔头' },
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      highlight: { en: 'A local obsession', zh: '本地人的最爱' },
      description: {
        en: 'Braised rabbit heads in five-spice or numbing-spicy flavor — a Chengdu late-night staple and the ultimate drinking snack. It takes work to eat (you nibble the meat from the cheeks and palate), but locals swear by it. Not for the squeamish.',
        zh: '五香、麻辣两种口味，肉质紧实入味，越啃越香，是成都人夜宵、下酒的标配美食。',
      },
    },
  ],
  xian: [
    {
      name: { en: 'Mutton Paomo', zh: '羊肉泡馍' },
      image: 'https://picsum.photos/id/1080/800/600',
      highlight: { en: 'The signature Xi\'an dish', zh: '西安美食代表 · 羊羹' },
      description: {
        en: 'Xi\'an\'s most iconic dish — a hearty soup of tender lamb and glass noodles, served with a flatbread you tear into tiny pieces yourself. The smaller you tear the bread, the better the flavor. Eat it with pickled garlic and chili sauce on the side. Known in ancient times as "yanggeng" — lamb stew.',
        zh: '西安美食的代表之作，古称"羊羹"。将烙饼掰成黄豆大小，配以浓郁的羊肉汤煮制，加入粉丝、葱花、糖蒜。汤浓肉烂，馍筋道入味。',
      },
    },
    {
      name: { en: 'Roujiamo (Chinese Hamburger)', zh: '腊汁肉夹馍' },
      image: 'https://picsum.photos/id/1069/800/600',
      highlight: { en: 'The original Chinese burger', zh: '"中式汉堡"鼻祖' },
      description: {
        en: 'Often called "the world\'s first hamburger" — slow-braised pork belly stuffed into a crispy, baked flatbread. The authentic version has nothing but meat inside — no lettuce, no sauce, just tender, fatty, flavorful pork. The Laozhi (braised sauce) version from Xi\'an is the classic.',
        zh: '"中式汉堡"的鼻祖，白吉馍外酥里嫩，腊汁肉肥而不腻。馍香肉酥，回味无穷。正宗肉夹馍只用腊汁肉，不加青椒香菜。',
      },
    },
    {
      name: { en: 'Biangbiang Noodles', zh: 'biangbiang面' },
      image: 'https://picsum.photos/id/1059/800/600',
      highlight: { en: 'Wide belt noodles with hot oil', zh: '宽如裤带 · 油泼辣子香' },
      description: {
        en: 'Hand-pulled noodles as wide as a belt — the widest noodles in China. Topped with chili powder and garlic, then doused in sizzling hot oil. The name comes from the "biang biang" sound the noodle dough makes when slapped against the board. Hearty, spicy, and impossible to forget.',
        zh: '手工扯面宽如裤带，泼上滚烫的油泼辣子。筋道鲜香、过瘾实在，是陕西面食文化的豪迈担当。',
      },
    },
    {
      name: { en: 'Zenggao (Steamed Glutinous Rice Cake)', zh: '甑糕' },
      image: 'https://picsum.photos/id/1073/800/600',
      highlight: { en: 'A sweet, sticky breakfast treat', zh: '糯米红枣 · 香甜软糯' },
      description: {
        en: 'Layers of glutinous rice, red dates, and honey steamed together in a traditional iron steamer called a "zeng." Sweet, sticky, and warm — the classic Xi\'an street breakfast. Vendors sell it from carts early in the morning, often with a red bean paste filling.',
        zh: '糯米、红枣与蜂蜜在传统铁甑中层层蒸制。香甜软糯、温润养胃，是西安街头备受喜爱的甜品。',
      },
    },
    {
      name: { en: 'Liangpi (Cold Rice Noodles)', zh: '凉皮' },
      image: 'https://picsum.photos/id/1067/800/600',
      highlight: { en: 'Cool, tangy, and refreshing', zh: '秦镇米皮 · 酸辣开胃' },
      description: {
        en: 'Thin sheets of rice noodles served cold with vinegar, chili oil, cucumber, and bean sprouts. The Qinzhen style from the town of Qinzhen near Xi\'an is the most famous. Light, tangy, and spicy — perfect for a hot summer day.',
        zh: '秦镇米皮凉拌，调入醋、油泼辣子与黄瓜丝。酸辣爽口、开胃解馋，夏日里的一抹清凉。',
      },
    },
    {
      name: { en: 'Persimmon Cakes', zh: '柿子饼' },
      image: 'https://picsum.photos/id/1068/800/600',
      highlight: { en: 'Fried golden, sweet inside', zh: '黄桂柿子 · 外酥里甜' },
      description: {
        en: 'Small, golden fried cakes made from sweet Lintong persimmons mixed with flour and osmanthus honey. Crispy on the outside, soft and sweet within. A seasonal specialty — best eaten fresh in autumn when persimmons are at their peak.',
        zh: '选用临潼黄桂柿子制成，金黄的炸饼外酥内软、香甜可口。秋季现做现吃风味最佳，是应季的特色美味。',
      },
    },
  ],
  beijing: [
    {
      name: { en: 'Peking Roast Duck', zh: '北京烤鸭' },
      image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
      highlight: { en: 'The dish everyone comes for', zh: '京味代表菜' },
      description: {
        en: 'Beijing\'s most famous dish — whole duck glazed with malt sugar, roasted until the skin is shatteringly crisp and the meat is juicy. Wrap slices of duck skin and meat in thin pancakes with scallion, cucumber, and sweet bean sauce. Quanjude and Da Dong are the most famous spots, but many locals prefer smaller, less touristy restaurants.',
        zh: '北京最负盛名的名菜。皮脆肉嫩、色泽红亮，用薄饼卷着葱丝、黄瓜条与甜面酱一起吃，是来京必尝的美味。',
      },
    },
    {
      name: { en: 'Zhajiangmian (Fried Sauce Noodles)', zh: '炸酱面' },
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      highlight: { en: 'Old Beijing comfort food', zh: '老北京家常味' },
      description: {
        en: 'Thick hand-pulled noodles topped with a rich, salty sauce of ground pork simmered with fermented yellow soybean paste. Mix in fresh shredded vegetables — cucumber, radish, bean sprouts — and toss well. It\'s the ultimate Beijing home cooking dish, simple but deeply satisfying.',
        zh: '劲道的手擀面浇上肉末与黄酱熬制的浓香炸酱，配上各色菜码拌匀。是老北京人日常最爱的家常美味。',
      },
    },
    {
      name: { en: 'Jiaozi (Boiled Dumplings)', zh: '饺子' },
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      highlight: { en: 'The northern Chinese staple', zh: '北方主食' },
      description: {
        en: 'Plump, crescent-shaped dumplings stuffed with ground pork and cabbage, or pork and shrimp — boiled in water and served with black vinegar and chili oil. They\'re traditionally eaten during Chinese New Year, but in Beijing you\'ll find them everywhere, from hole-in-the-wall shops to fancy restaurants.',
        zh: '皮薄馅大的饺子，猪肉白菜、猪肉大虾馅料丰富，水煮后蘸着陈醋与辣椒油食用。北方家常经典。',
      },
    },
    {
      name: { en: 'Tanghulu (Candied Hawthorn)', zh: '糖葫芦' },
      image: 'https://images.unsplash.com/photo-1606788075953-b2284bc6e6c1?w=800',
      highlight: { en: 'The iconic street snack', zh: '街头甜蜜小吃' },
      description: {
        en: 'Skewers of hawthorn berries dipped in molten rock sugar and left to cool into a glossy, crackling shell. The perfect balance of sweet and tart — crunchy sugar outside, tangy fruit inside. You\'ll see vendors selling them on every tourist street, but the traditional hawthorn version is the classic.',
        zh: '山楂串裹上晶莹脆硬的糖衣，酸甜适口、嘎嘣脆。是男女老少都爱的传统北京街头小吃。',
      },
    },
    {
      name: { en: 'Luzhu Huoshao (Pork Offal Stew)', zh: '卤煮火烧' },
      image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      highlight: { en: 'Old Beijing street food at its most authentic', zh: '老北京市井味' },
      description: {
        en: 'A hearty working-class stew of pork intestines, pork lungs, tofu, and wheat bread cakes simmered in a spiced soy broth. It\'s rich, savory, and not for the faint of heart — but if you want to eat like a real Beijinger, this is it. Usually served with garlic paste and chili oil.',
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
      title: { en: 'Old Town & Cultural Sights', zh: '市区古巷人文线' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Wuhou Shrine — explore the Three Kingdoms temple and snap photos by the red wall with bamboo', zh: '武侯祠逛三国古迹，打卡红墙竹影' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Wander Jinli Ancient Street and graze your way through Sichuan snacks', zh: '锦里古街品尝成都特色小吃' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Du Fu Thatched Cottage — stroll the peaceful bamboo garden', zh: '杜甫草堂感受诗圣故居的清幽' } },
        { timeSlot: { en: 'Evening', zh: '傍晚' }, content: { en: 'Kuanzhai Alleys — feel the vibe of old Chengdu street life', zh: '宽窄巷子漫步，体验老成都市井风情' } },
        { timeSlot: { en: 'Dinner', zh: '晚上' }, content: { en: 'Sichuan beef tallow hot pot at a nearby restaurant', zh: '附近火锅店享用正宗牛油火锅' } },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Pandas & Local Life', zh: '熊猫萌宠休闲线' },
      items: [
        { timeSlot: { en: 'Early morning', zh: '清晨' }, content: { en: 'Giant Panda Breeding Base — go early for the most active pandas', zh: '早起前往大熊猫繁育研究基地看熊猫' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Lunch near the base, then head back downtown for a rest', zh: '基地附近用餐，返回市区稍作休息' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Gaiwan tea at Heming Teahouse in People\'s Park — try the ear-cleaning service for a true local experience', zh: '人民公园鹤鸣茶社喝盖碗茶、掏耳朵' } },
        { timeSlot: { en: 'Evening', zh: '傍晚' }, content: { en: 'Shopping on Chunxi Road and Taikoo Li — snap a photo with the climbing panda on the IFS building', zh: '春熙路、太古里逛街打卡IFS爬墙熊猫' } },
        { timeSlot: { en: 'Night', zh: '晚上' }, content: { en: 'Live music bar on Yulin Road for a taste of Chengdu nightlife', zh: '玉林路小酒馆体验成都夜生活' } },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'Dujiangyan Day Trip', zh: '都江堰山水一日游' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Intercity train to Dujiangyan to see the 2,200-year-old irrigation system', zh: '城际列车前往都江堰，参观千年水利工程' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Try local cold-water fish and hand-rubbed ice jelly in Dujiangyan town', zh: '都江堰市区品尝当地冷水鱼、老奶冰粉' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Hike the front mountain of Mount Qingcheng — famous for its quiet Taoist temples', zh: '游览青城山前山，感受青城天下幽' } },
        { timeSlot: { en: 'Evening', zh: '傍晚' }, content: { en: 'High-speed train back to Chengdu — end of day trip', zh: '乘高铁返回成都市区，行程结束' } },
      ],
    },
  ],
  xian: [
    {
      dayNumber: 1,
      title: { en: 'City Center & East Side', zh: '市区东线' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Shaanxi History Museum — book 3 days ahead, see relics from Zhou, Qin, Han, and Tang dynasties', zh: '陕西历史博物馆（提前3天预约），感受周秦汉唐盛世风华' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Big Wild Goose Pagoda area — climb the pagoda at Da Ci\'en Temple, catch the musical fountain', zh: '大雁塔周边，大慈恩寺登塔，北广场音乐喷泉' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Rent a bike and cycle the Ancient City Wall — enter at Yongning Gate, full loop is 13.7 km', zh: '古城墙骑行，永宁门登城，骑行一圈约13.7公里' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Bell and Drum Towers at night, then dinner in the Muslim Quarter', zh: '钟鼓楼夜景绝美，回民街品尝西安特色小吃' } },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Terracotta Army & Lintong', zh: '临潼线' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Terracotta Army Museum — Pits 1, 2, 3 plus the Bronze Chariot Hall. Hire a guide!', zh: '秦始皇兵马俑：1、2、3号坑 + 铜车马展厅，建议请讲解' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Lunch in Lintong — try the local big plate chicken and youpo noodles', zh: '临潼午餐，品尝临潼大盘鸡、油泼面' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Huaqing Palace — imperial hot springs and the site of the Xi\'an Incident', zh: '华清宫，唐代皇家温泉，骊山兵谏亭' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: '"The Song of Everlasting Sorrow" outdoor show — center section A seats are worth it', zh: '《长恨歌》实景演出，强烈推荐中A区' } },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'Culture & Local Flavors', zh: '人文休闲' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Forest of Steles Museum — a treasure trove of Chinese calligraphy', zh: '碑林博物馆，书法艺术宝库，颜柳欧赵俱全' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Yongxingfang food street — dishes from all over Shaanxi, plus the bowl-smashing wine ritual', zh: '永兴坊，陕西各地美食汇聚，摔碗酒体验' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Small Wild Goose Pagoda & Jianfu Temple — quieter and less crowded than the Big Goose', zh: '小雁塔 + 荐福寺，西安博物院，清幽人少体验佳' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Grand Tang Mall — a dazzling Tang Dynasty-themed pedestrian street', zh: '大唐不夜城，盛唐天街，不倒翁小姐姐表演' } },
      ],
    },
  ],
  beijing: [
    {
      dayNumber: 1,
      title: { en: 'Imperial Heartland & Central Axis', zh: '皇城中轴线' },
      items: [
        { timeSlot: { en: 'Dawn', zh: '上午' }, content: { en: 'Flag-raising at Tiananmen Square, then enter the Forbidden City through the Meridian Gate', zh: '天安门广场观看升旗，经午门进入故宫' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Lunch near the Forbidden City — give your feet a break', zh: '故宫周边午餐，稍作休整' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Climb Jingshan Park for the panoramic view of golden palace rooftops', zh: '登景山公园俯瞰故宫金黄琉璃瓦顶' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Stroll Nanluoguxiang hutongs and try old Beijing snacks', zh: '南锣鼓巷胡同漫步，品尝老北京小吃' } },
      ],
    },
    {
      dayNumber: 2,
      title: { en: 'Great Wall Adventure', zh: '长城雄关行' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Leave early for Badaling Great Wall, climb to the highest beacon tower', zh: '早出发前往八达岭长城，登顶最高烽火台' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Lunch at the foot of the Great Wall', zh: '长城脚下午餐' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Ming Tombs — the burial site of 13 Ming emperors', zh: '参观明十三陵，明代13位皇帝的陵寝' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Back to the city for a classic Peking Roast Duck dinner', zh: '返回市区，享用正宗北京烤鸭晚餐' } },
      ],
    },
    {
      dayNumber: 3,
      title: { en: 'Temples, Gardens & Culture', zh: '坛庙园林线' },
      items: [
        { timeSlot: { en: 'Morning', zh: '上午' }, content: { en: 'Temple of Heaven — watch locals do tai chi, admire the Hall of Prayer', zh: '天坛，看本地人打太极，欣赏祈年殿' } },
        { timeSlot: { en: 'Noon', zh: '中午' }, content: { en: 'Zhajiangmian (fried sauce noodles) at a nearby old Beijing eatery', zh: '附近老北京馆子品尝炸酱面' } },
        { timeSlot: { en: 'Afternoon', zh: '下午' }, content: { en: 'Summer Palace — walk the Long Corridor, boat on Kunming Lake', zh: '颐和园，漫步长廊，泛舟昆明湖' } },
        { timeSlot: { en: 'Evening', zh: '晚上' }, content: { en: 'Peking Opera or acrobatics show to cap off your Beijing trip', zh: '观看京剧或杂技演出，为北京之旅画上句号' } },
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
        en: 'Both Shuangliu and Tianfu airports have direct metro lines downtown|The metro reaches all major sights — pick up a Tianfu Transit Card or use Alipay|Downtown sights are close together — taxis and shared bikes are easy options|Take the intercity train to Dujiangyan, transfer at Xipu Station',
        zh: '双流机场/天府机场均有地铁直达市区|地铁覆盖主要景点，建议办理天府通|市区景点密集，打车、共享单车都方便|去都江堰可乘城际列车，犀浦站换乘',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿建议' },
      items: {
        en: 'Best area: Chunxi Road / Taikoo Li — central, great for shopping and transit|Quieter pick: near Kuanzhai Alleys or Qingyang Palace|Yulin neighborhood — super local, tons of great food|Book 1-2 weeks ahead during peak season (spring & fall)',
        zh: '首选春熙路/太古里周边，交通购物便利|喜欢安静可选宽窄巷子、青羊宫附近|玉林片区充满生活气息，美食云集|旺季建议提前1-2周预订酒店',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Good to Know', zh: '温馨提示' },
      items: {
        en: 'See pandas in the morning — they sleep most of the afternoon|Ask for "mild" (wei la) when ordering hot pot — local spice levels are intense|Summers are humid and hot, winters are damp and cold — pack accordingly|Teahouses are cheap and everywhere — don\'t miss the experience',
        zh: '看熊猫务必上午去，下午熊猫多在睡觉|吃火锅可提前说微辣，本地辣度偏高|夏季潮湿闷热，冬季阴冷，备好衣物|茶馆消费亲民，体验本地生活必去',
      },
    },
  ],
  xian: [
    {
      icon: 'transport',
      title: { en: 'Getting Around', zh: '交通指南' },
      items: {
        en: 'Xi\'an Xianyang Airport is 47 km (29 mi) from downtown — take metro line 14 or the airport bus|Xi\'an North Station is the main high-speed rail hub — metro lines 2 and 4 connect to downtown|8 metro lines cover all major sights — use Alipay or WeChat transit codes|To reach the Terracotta Army, take tourist bus 5 (306) from the train station',
        zh: '西安咸阳国际机场距市区约47公里，可乘机场大巴、地铁14号线|西安北站是主要高铁站，地铁2号线、4号线直达市区|已开通8条地铁线路，可使用支付宝/微信乘车码|去兵马俑可在火车站乘游5（306路）',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Important Tips', zh: '注意事项' },
      items: {
        en: 'Book Shaanxi History Museum 3 days in advance on WeChat — free but very popular|Hire a guide at the Terracotta Army — you\'ll get so much more out of it|Xi\'an food tends to be salty and spicy — ask for less salt and chili if you prefer|Watch out for unlicensed taxis and touts near the train station',
        zh: '陕西历史博物馆需提前3天在官方公众号预约，免费但一票难求|兵马俑建议请讲解员，否则只能看到"泥人"|西安饮食偏咸辣，口味清淡可提前告知少盐少辣|火车站周边黑车黑导较多，务必乘坐正规交通工具',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿推荐' },
      items: {
        en: 'Bell Tower / Muslim Quarter — central, tons of food, great for first-timers|Big Wild Goose Pagoda area — nicer neighborhood, great night views, mid-range to upscale|Yongning Gate area — right by the city wall, metro interchange, super convenient|Xiaozhai shopping district — youthful vibe, good value for money',
        zh: '钟鼓楼/回民街附近：交通便利，美食众多，适合首次来西安|大雁塔附近：环境较好，夜景优美，中高档酒店集中|永宁门附近：城墙脚下，地铁交汇，出行方便|小寨商圈：年轻人聚集地，购物餐饮丰富，性价比高',
      },
    },
  ],
  beijing: [
    {
      icon: 'transport',
      title: { en: 'Getting Around', zh: '交通指南' },
      items: {
        en: 'Two airports: Capital International and Daxing International — both have express metro links|Multiple major train stations — double-check which one your ticket is for|The metro is the fastest way around town and covers all major sights|Book Forbidden City and Great Wall tickets online in advance — they sell out',
        zh: '北京有首都国际机场和大兴国际机场两座机场，机场快轨直达市区|北京有多个主要火车站，请仔细核对车票站点|地铁是市内最便捷的交通方式，覆盖主要景点|故宫、长城等热门景点需提前线上预约门票',
      },
    },
    {
      icon: 'tips',
      title: { en: 'Good to Know', zh: '注意事项' },
      items: {
        en: 'The Forbidden City requires advance online booking — same-day tickets almost always sell out|The Great Wall involves a lot of walking — wear comfortable shoes|Winters are cold and dry, summers are hot and humid — spring and fall are best|Have a translation app ready — English isn\'t widely spoken outside tourist areas',
        zh: '故宫需提前网上实名预约，旺季常约满|游览长城步行较多，请穿舒适的鞋子|北京冬季寒冷干燥，夏季炎热多雨，春秋最佳|非热门景区英语普及度较低，建议备好翻译软件',
      },
    },
    {
      icon: 'hotel',
      title: { en: 'Where to Stay', zh: '住宿推荐' },
      items: {
        en: 'Wangfujing / Dongdan — central location, walkable to the Forbidden City|Houhai / Nanluoguxiang — hutong charm, perfect for culture lovers|Sanlitun / CBD — modern, international dining and nightlife|Book early for peak seasons and national holidays',
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
    image: 'https://images.unsplash.com/photo-1555217851-6141535bd773?w=800',
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
