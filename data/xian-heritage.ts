// 西安文脉层数据（hub /cities/xian 的 heritage section：朝代时间轴 + 文脉地图）
// ---------------------------------------------------------------
// 坐标出处：Mako800/xian-cultural-map（MIT 协议）js/data.js 的 WGS-84 坐标，
// 2026-11-17 快照核对，部分点位（丰镐/未央宫/青龙寺/化觉巷等）为手工补充与校正。
// 时间轴与景点文案为本站自写（Level 1 事实，浓缩自 data/travel-data.ts 景点描述
// 与公开史实），仅借鉴 DeanChensj/jiangshan-map（GPL-3.0）的交互形式，
// 未使用其任何代码与文案。
// 其余 7 语种暂以英文兜底（fillLocaleFallbacks），后续可在翻译包补齐。
// ---------------------------------------------------------------
import type { L } from './localize'
import { fillLocaleFallbacks } from './localize'

/** 地图标记可用的朝代键（时间轴还含 sui/song/qing 三个无标记时期） */
export type HeritageEra = 'zhou' | 'qin' | 'han' | 'tang' | 'ming' | 'modern' | 'scenic'

/** 文脉地图景点（WGS-84 坐标，可直接用于 OSM/CARTO 瓦片） */
export interface XianHeritageSpot {
  id: string
  era: HeritageEra
  name: L
  coords: [number, number]
  /** 弹窗一句话钩子 */
  hook: L
  /** 弹窗第二段：1-2 句深度补充（素材浓缩自 xian-cultural-map 详情页，MIT） */
  more?: L
  /** true = 远郊点（华山/太白等），「全部」视野 fitBounds 时排除，避免地图被拉远 */
  far?: boolean
  /** true = 本页「城市印象」区有对应景点卡片，弹窗给页内锚点 */
  detail?: boolean
}

/** 朝代时间轴卡片 */
export interface XianDynastyPeriod {
  key: string
  title: L
  years: L
  /** 当时城名 */
  cityName: L
  /** 2-3 句游客向事实（Level 1） */
  fact: L
  /** 大事记一行（3-5 个年份锚点，史实参考 jiangshan-map 事件年表整理） */
  events: L
  /** 卡片与地图标记的强调色 */
  accent: string
}

/** 地图筛选 chips 的朝代短标签（按 zhou→scenic 固定顺序展示） */
export const HERITAGE_ERA_SHORT: Record<string, L> = {
  zhou: { en: 'Zhou', zh: '周' },
  qin: { en: 'Qin', zh: '秦' },
  han: { en: 'Han', zh: '汉' },
  tang: { en: 'Tang', zh: '唐' },
  ming: { en: 'Ming', zh: '明' },
  modern: { en: 'Today', zh: '今' },
  scenic: { en: '8 Views', zh: '八景' },
}

/** 朝代色板（标记着色与时间轴卡片同源） */
export const HERITAGE_ERA_COLORS: Record<string, string> = {
  zhou: '#a8a29e', // 石灰（周）
  qin: '#44403c', // 玄黑（秦）
  han: '#b91c1c', // 赤（汉）
  sui: '#ea580c', // 橙（隋）
  tang: '#b45309', // 金（唐）
  song: '#9a3412', // 褐（五代宋元）
  ming: '#1d4ed8', // 青（明）
  qing: '#0f766e', // 黛（清）
  modern: '#047857', // 绿（今）
  scenic: '#b8860b', // 金（关中八景）
}

export const xianHeritageSpots: XianHeritageSpot[] = fillLocaleFallbacks([
  // ---- 西周 ----
  {
    id: 'fenghao',
    era: 'zhou',
    name: { en: 'Feng & Hao Capital Sites', zh: '丰镐遗址' },
    coords: [34.206, 108.867],
    hook: {
      en: 'The very first "Xi\'an": twin Western-Zhou capitals under quiet farmland, 3,000 years old — huge history, almost no visitors.',
      zh: '西安的原点：西周丰镐二京沉睡在沣河两岸的农田之下，距今3000余年——历史极大，游客极少。',
    },
  },
  // ---- 秦 ----
  {
    id: 'terracotta',
    era: 'qin',
    name: { en: 'Terracotta Army Museum', zh: '秦始皇兵马俑博物馆' },
    coords: [34.3842, 109.2785],
    detail: true,
    hook: {
      en: 'An estimated 8,000 life-sized terracotta soldiers, each face unique, guarding China\'s first emperor for 2,200 years.',
      zh: '约8000件真人大小的陶俑，面容各异，为秦始皇守陵2200年。',
    },
    more: {
      en: 'Pit 1 alone holds some 6,000 warriors in a \"wedge—main—flank—rear\" battle formation; the kneeling archer\'s shoe stitching survives. Every figure was originally painted in bright colors that flaked off within minutes of excavation.',
      zh: '仅一号坑就有约6000件陶俑，按「锋—本—翼—卫」军阵布列；跪射俑连鞋底针脚都清晰可见。陶俑原本通体彩绘，出土几分钟内便氧化剥落。',
    },
  },
  // ---- 汉 ----
  {
    id: 'weiyang',
    era: 'han',
    name: { en: 'Han Chang\'an City · Weiyang Palace Ruins', zh: '汉长安城·未央宫遗址' },
    coords: [34.2955, 108.8405],
    hook: {
      en: 'UNESCO-listed ruins of the Han palace; the walled Han city was about 3× today\'s Ming city and the start of the Silk Road.',
      zh: '世界遗产汉长安城未央宫遗址；汉城约为今天明城墙内的3倍，丝绸之路从这里出发。',
    },
    more: {
      en: 'Zhang Qian rode out from here in 138 BC to open the Silk Road; Sima Qian finished the Records of the Grand Historian at this court in 91 BC.',
      zh: '公元前138年张骞从这里出发凿空西域；公元前91年司马迁在此完成《史记》。',
    },
  },
  // ---- 唐 ----
  {
    id: 'dayanta',
    era: 'tang',
    name: { en: 'Big Wild Goose Pagoda', zh: '大雁塔' },
    coords: [34.2185, 108.964],
    detail: true,
    hook: {
      en: 'Built in 652 by monk Xuanzang — the real "Journey to the West" — to store scriptures brought back from India.',
      zh: '652年玄奘为保存从印度取回的经卷而建，现实版《西游记》的主角。',
    },
    more: {
      en: 'Xuanzang returned in 645 with 657 scrolls and translated scriptures here for 11 years. New Tang doctoral graduates inscribed their names on the tower — \"the youngest of seventeen\" was a 27-year-old Bai Juyi.',
      zh: '玄奘645年携657部经卷归来，在此译经11年。唐代新科进士登塔题名——白居易27岁中举时写下「慈恩塔下题名处，十七人中最少年」。',
    },
  },
  {
    id: 'xiaoyanta',
    era: 'tang',
    name: { en: 'Small Wild Goose Pagoda', zh: '小雁塔' },
    coords: [34.2413, 108.937],
    hook: {
      en: 'Slim Tang-era brick pagoda that famously cracked and re-joined through major earthquakes yet still stands.',
      zh: '唐代密檐砖塔，历史上「三裂三合」，历经地震仍屹立。',
    },
    more: {
      en: 'Its dome-shaped rammed-earth foundation works like a roly-poly toy — the tower sways in quakes and settles back, \"cracking and re-joining\" three times since 1487.',
      zh: '半球形夯土塔基像不倒翁：地震时塔身摆动后复位——自1487年起「三裂三合」三次。',
    },
  },
  {
    id: 'daminggong',
    era: 'tang',
    name: { en: 'Daming Palace Ruins Park', zh: '大明宫国家遗址公园' },
    coords: [34.2928, 108.96],
    hook: {
      en: 'The Tang main palace — about 4.5× the size of Beijing\'s Forbidden City — now a vast, mostly free park.',
      zh: '唐代宫城正殿所在，约为故宫4.5倍，今为巨大的遗址公园。',
    },
    more: {
      en: 'Hanyuan Hall stood on a 15.6 m platform with a 70 m \"dragon-tail\" ramp; 17 emperors ruled here for 240 years. After the 904 destruction it slept under loess for 1,100 years.',
      zh: '含元殿殿基高出地面15.6米，殿前70余米龙尾道；17位皇帝在此听政240年。904年毁于战火后，在黄土下沉睡1100年。',
    },
  },
  {
    id: 'huaqing',
    era: 'tang',
    name: { en: 'Huaqing Palace', zh: '华清宫' },
    coords: [34.361, 109.2115],
    detail: true,
    hook: {
      en: 'Imperial hot springs at Mount Li: a Tang love story (Yang Guifei) and 1936 history (the Xi\'an Incident) share one site.',
      zh: '骊山脚下的皇家温泉：唐代杨贵妃的爱情与1936年西安事变，一处遗址两段历史。',
    },
    more: {
      en: 'The Tang imperial bathtubs (Lotus Pool for the emperor, Crabapple Pool for Yang Guifei) survive in stone — and so do the 1936 bullet holes in the Five-Room Hall.',
      zh: '唐代皇家汤池（玄宗莲花汤、贵妃海棠汤）至今犹存——五间厅玻璃上的1936年弹孔也还在。',
    },
  },
  {
    id: 'beilin',
    era: 'tang',
    name: { en: 'Beilin Museum (Forest of Steles)', zh: '碑林博物馆' },
    coords: [34.2552, 108.9482],
    hook: {
      en: 'China\'s greatest stone library: steles from the Tang onward, including the Confucian classics carved in stone.',
      zh: '中国最大的石质书库：唐《开成石经》等历代碑石，书法爱好者的圣地。',
    },
    more: {
      en: 'The 114-stele Kaicheng Classics (837 AD, 650,000 characters) are \"the world\'s largest stone book\" — the Tang solution to typo-ridden hand copies. From Li Si\'s seal script to Yan Zhenqing: half of Chinese calligraphy history in one hall.',
      zh: '《开成石经》114方、65万字（837年刻成），被称为「世界最大的石质图书」——唐代对付手抄讹误的终极方案。从李斯小篆到颜筋柳骨，一座碑林就是半部书法史。',
    },
  },
  {
    id: 'qinglongsi',
    era: 'tang',
    name: { en: 'Qinglong Temple', zh: '青龙寺' },
    coords: [34.2332, 108.9827],
    hook: {
      en: 'Tang temple where Japanese monk Kūkai trained before founding the Shingon school — a pilgrimage site for Japanese visitors.',
      zh: '日本僧人空海留学的唐代寺院、真言宗祖庭，日本游客的朝圣地。',
    },
  },
  {
    id: 'qujiang',
    era: 'tang',
    name: { en: 'Qujiang Pool Ruins', zh: '曲江池遗址' },
    coords: [34.209, 108.975],
    hook: {
      en: 'Tang Chang\'an\'s pleasure lake, where new imperial-exam graduates celebrated with banquets and poetry.',
      zh: '唐人的游乐湖：新科进士曲江赐宴、雁塔题名之地。',
    },
    more: {
      en: 'Wine cups floated down winding canals — wherever yours stopped, you drank and composed. \"On spring wind\'s proud hooves, I see all Chang\'an\'s flowers in one day\" was written for exactly this party.',
      zh: '酒杯置于曲水随流而停——停在谁面前谁就饮酒赋诗。「春风得意马蹄疾，一日看尽长安花」写的就是这场庆功宴。',
    },
  },
  {
    id: 'baqiao',
    era: 'tang',
    name: { en: 'Ba Bridge (Willow Farewell Site)', zh: '灞桥·折柳送别地' },
    coords: [34.315, 109.07],
    hook: {
      en: 'The classic farewell spot: for a thousand years Chang\'an residents snapped a willow twig here to see friends off.',
      zh: '千年送别地：长安人折柳赠别，「灞柳风雪」由此得名。',
    },
    more: {
      en: '"Willow" (liu) puns with "stay" (liu) — break a twig, and you\'ve said \"don\'t go\". In 2004, eleven Sui-Tang stone bridge piers emerged from the riverbed.',
      zh: '「柳」谐音「留」——折一枝柳，就是一句「别走」。2004年河床下出土了11座隋唐石桥墩。',
    },
  },
  // ---- 明 ----
  {
    id: 'citywall',
    era: 'ming',
    name: { en: 'Ming City Wall (South Gate)', zh: '明城墙（永宁门）' },
    coords: [34.256, 108.9424],
    detail: true,
    hook: {
      en: '1370–1378, 13.7 km around — China\'s only fully intact ancient city wall; bike the loop in about 80 minutes.',
      zh: '1370–1378年筑，周长13.7公里，中国现存最完整古城垣，骑行一周约80分钟。',
    },
    more: {
      en: '12 m high with 98 watchtower platforms; the four gates — ChangLe, AnDing, YongNing, AnYuan — spell \"Chang\'an Yongding\", eternal peace.',
      zh: '城高12米、98座敌台；四门长乐、安定、永宁、安远，首字连读是「长安永定」。',
    },
  },
  {
    id: 'belltower',
    era: 'ming',
    name: { en: 'Bell Tower', zh: '钟楼' },
    coords: [34.261, 108.9424],
    hook: {
      en: '1384. The largest and best-preserved ancient bell tower in China, dead-center of the Ming city.',
      zh: '1384年建，中国形制最大、保存最完整的钟楼，明代西安城的几何中心。',
    },
    more: {
      en: 'In 1582 the whole tower was slid intact to the city center on earthen ramps. Its original Tang bell (711 AD, with an inscription by Emperor Ruizong) now lives in the Beilin.',
      zh: '1582年整座钟楼被沿土坡整体滑移到今址。原悬唐景云钟（711年铸，睿宗撰铭）现藏碑林。',
    },
  },
  {
    id: 'drumtower',
    era: 'ming',
    name: { en: 'Drum Tower', zh: '鼓楼' },
    coords: [34.2618, 108.939],
    hook: {
      en: '1380. Its evening drums closed the city gates — the other half of "morning bell, evening drum".',
      zh: '1380年建，暮鼓一响城门落锁——「晨钟暮鼓」的另一半。',
    },
  },
  {
    id: 'greatmosque',
    era: 'ming',
    name: { en: 'Great Mosque of Huajue Lane', zh: '化觉巷清真大寺' },
    coords: [34.262, 108.936],
    hook: {
      en: 'A mosque built like a Chinese courtyard: founded in the Tang, rebuilt in the Ming — heart of the 1,000-year Hui quarter.',
      zh: '中国庭院式布局的清真大寺，唐创明修，千年回坊的心脏。',
    },
  },
  {
    id: 'shuyuanmen',
    era: 'ming',
    name: { en: 'Shuyuanmen Street', zh: '书院门文化街' },
    coords: [34.2545, 108.9465],
    hook: {
      en: 'Street of the Ming-era Guanzhong Academy, now brush-and-ink shops and stele rubbings, steps from the Beilin.',
      zh: '明代关中书院所在地，今天是文房四宝与碑帖一条街，紧邻碑林。',
    },
  },
  {
    id: 'huifang',
    era: 'ming',
    name: { en: 'Muslim Quarter (Beiyuanmen)', zh: '回民街（北院门）' },
    coords: [34.2638, 108.9395],
    detail: true,
    hook: {
      en: 'The Hui Muslim quarter: a thousand years of halal kitchens in Ming-Qing lanes behind the Drum Tower.',
      zh: '鼓楼背后明清巷子里的千年清真食坊。',
    },
  },
  // ---- 近现代 ----
  {
    id: 'shaanxi-museum',
    era: 'modern',
    name: { en: 'Shaanxi History Museum', zh: '陕西历史博物馆' },
    coords: [34.224, 108.952],
    detail: true,
    hook: {
      en: '1.7 million artifacts; the Tang gold and tomb-mural galleries are why you book tickets weeks ahead.',
      zh: '藏品170余万件，唐代金银器与壁画馆是需要提前抢票的理由。',
    },
    more: {
      en: 'Stars among 18 national-treasure items: the agate cup with gold-bejeweled ram\'s head (Silk Road provenance) and the jade seal of an empress — quite possibly Lü herself.',
      zh: '18件国宝里的明星：镶金兽首玛瑙杯（丝路物证）、「皇后之玺」玉印——很可能就是吕后之印。',
    },
  },
  {
    id: 'xian-incident',
    era: 'modern',
    name: { en: 'Xi\'an Incident Memorial (Zhang Xueliang Residence)', zh: '西安事变纪念馆（张学良公馆）' },
    coords: [34.2665, 108.953],
    hook: {
      en: 'Residence of the young general who detained Chiang Kai-shek here in December 1936.',
      zh: '少帅张学良的公馆，1936年12月西安事变的策源地处。',
    },
    more: {
      en: 'Inside: Zhang\'s handwritten orders, Soong Mei-ling\'s letter to Chiang, and the original copies of the peace agreement negotiated by Zhou Enlai in these rooms.',
      zh: '馆藏：张学良手令、宋美龄致蒋介石亲笔信、周恩来在此谈判达成的和平协议原件。',
    },
  },
  {
    id: 'datangfurongyuan',
    era: 'modern',
    name: { en: 'Tang Paradise (Datang Furongyuan)', zh: '大唐芙蓉园' },
    coords: [34.214, 108.972],
    hook: {
      en: 'A 2005-built Tang-style royal-garden theme park on the old Qujiang site — a replica, not a relic. Go for the night show.',
      zh: '2005年在唐代芙蓉园遗址以北建成的仿唐主题公园——是复刻不是古迹，为夜景与水幕演出而去。',
    },
    more: {
      en: 'The 39 m Ziyun Tower holds a full sand-table model of Tang Chang\'an\'s chessboard grid; the evening water-screen show uses the tower as its backdrop. Exits straight into the Grand Tang Mall night strip.',
      zh: '39米高的紫云楼内有唐代长安「棋盘格局」全景沙盘；夜晚水幕电影以紫云楼为背景，出园即是大唐不夜城。',
    },
  },
  // ---- 关中八景（清人评定的八处山河胜景；远的四景默认视野外，选「八景」筛选查看） ----
  {
    id: 'huashan',
    era: 'scenic',
    name: { en: 'Celestial Palm of Mt. Hua', zh: '华岳仙掌' },
    coords: [34.481, 110.087],
    far: true,
    hook: {
      en: 'Head of the Eight Views: at sunrise, a granite wall on Mt. Hua\'s East Peak lights up like a giant palm — legend says a river god split the mountain to free the Yellow Sea.',
      zh: '八景之首：旭日映照华山东峰石壁，如巨人掌印——传说巨灵神掰开华山为黄河开路。',
    },
    more: {
      en: 'China\'s \"most precipitous\" sacred mountain, 120 km from Xi\'an and 30 min by high-speed rail. The plank walk is not for the faint-hearted.',
      zh: '西岳华山以险著称，距西安约120公里、高铁30分钟。长空栈道不适合恐高者。',
    },
  },
  {
    id: 'lishan',
    era: 'scenic',
    name: { en: 'Sunset Glow over Mount Li', zh: '骊山晚照' },
    coords: [34.356, 109.216],
    hook: {
      en: 'At dusk this horse-shaped ridge above Huaqing Palace turns gold and crimson — a thousand years of history lit from behind.',
      zh: '晴日傍晚，骊山整座山体金红一片——「骊山晚照」是八景中最具画面感的一景。',
    },
    more: {
      en: 'A \"layer cake\" of history: King You\'s beacon towers (771 BC) on top, the First Emperor\'s tomb at its foot, Tang spas and the 1936 Incident on its slopes.',
      zh: '一座「历史千层蛋糕」：山顶是周幽王烽火台，山脚是秦始皇陵，山腰串着唐代温泉与1936年兵谏亭。',
    },
  },
  {
    id: 'xianyang-ferry',
    era: 'scenic',
    name: { en: 'Xianyang Ancient Ferry', zh: '咸阳古渡' },
    coords: [34.331, 108.72],
    far: true,
    hook: {
      en: 'The \"first ferry of the Silk Road\": for 2,000 years everything leaving Chang\'an westward crossed the Wei River here.',
      zh: '「丝绸之路第一渡」：两千年来长安西行的商旅使节都在此渡渭河。',
    },
    more: {
      en: 'Wang Wei\'s farewell poem — \"one more cup of wine, my friend; west of Yang Pass there are no old friends\" — was written for send-offs at this crossing.',
      zh: '王维「劝君更尽一杯酒，西出阳关无故人」写的正是这里渡口的送别。',
    },
  },
  {
    id: 'caotangsi',
    era: 'scenic',
    name: { en: 'Mist of the Straw-Hut Temple', zh: '草堂烟雾' },
    coords: [34.01, 108.751],
    far: true,
    hook: {
      en: 'Where Kumarajiva — history\'s greatest Buddhist translator into Chinese — rendered the Diamond Sutra in 401 AD; a well here breathes mist year-round.',
      zh: '公元401年后秦为鸠摩罗什建草堂译经，《金刚经》等35部294卷出自此处；寺内古井常年升腾雾气。',
    },
    more: {
      en: 'His tongue relic supposedly survived cremation intact — his own proof, he vowed, that the translations carried no error. A pilgrimage site for Japanese Buddhists.',
      zh: '传说罗什发愿「若所译经文无谬，舌不焦烂」，火化后舌根果然完好。日本佛教徒的朝圣地。',
    },
  },
  {
    id: 'taibai',
    era: 'scenic',
    name: { en: 'Summer Snow on Mt. Taibai', zh: '太白积雪' },
    coords: [34.029, 107.789],
    far: true,
    hook: {
      en: 'The Qinling range\'s 3,767 m crown keeps snow even in June — \"Taibai\'s snow in midsummer\" — while the valley below bakes.',
      zh: '秦岭主峰拔仙台3767米，盛夏山顶仍积雪——「太白积雪六月天」，山下关中平原酷暑难耐。',
    },
    more: {
      en: 'China\'s north-south divide: one summit splits the Yellow and Yangtze basins. Four seasons of vegetation in a single day\'s climb; glacial lakes mirror the snow.',
      zh: '中国南北分界线：一山分黄河长江两大流域。一日登顶历四季，山巅冰川湖映雪峰。',
    },
  },
])

export const xianDynastyPeriods: XianDynastyPeriod[] = fillLocaleFallbacks([
  {
    key: 'zhou',
    title: { en: 'Western Zhou', zh: '西周' },
    years: { en: 'c. 1046–771 BC', zh: '约前1046–前771' },
    cityName: { en: 'Feng & Hao', zh: '丰镐' },
    fact: {
      en: 'Xi\'an\'s story starts here: King Wen built Feng and his son King Wu built Hao, twin capitals on the Feng River over 3,000 years ago. Today the site is farmland — the Terracotta Army was still 800 years in the future.',
      zh: '西安故事的原点：周文王作丰、武王作镐，沣河两岸的双子都城，距今3000余年。今天这里是农田——兵马俑还要再等800年。',
    },
    events: {
      en: '1046 BC King Wu conquers Shang · Kings Wen & Wu build the twin capitals · 771 BC Quanrong sack Hao, the court flees east',
      zh: '前1046 牧野克商建周 · 文王作丰、武王作镐 · 前771 犬戎破镐京，平王东迁',
    },
    accent: HERITAGE_ERA_COLORS.zhou,
  },
  {
    key: 'qin',
    title: { en: 'Qin', zh: '秦' },
    years: { en: '221–206 BC', zh: '前221–前206' },
    cityName: { en: 'Xianyang', zh: '咸阳' },
    fact: {
      en: 'Qin Shi Huang ruled a newly unified China from Xianyang and spent 38 years and 700,000 workers building his tomb. Found by farmers digging a well in 1974: an estimated 8,000 terracotta soldiers, every face unique.',
      zh: '秦始皇以咸阳为都统治刚统一的天下，用38年、70万工匠修建陵墓。1974年农民打井时重见天日：约8000件兵马俑，脸脸不同。',
    },
    events: {
      en: '350 BC capital moves to Xianyang · 221 BC unification, \"First Emperor\" · 213 BC book burning · 206 BC Qin falls to Liu Bang',
      zh: '前350 迁都咸阳 · 前221 一统天下称始皇帝 · 前213 焚书令 · 前206 秦亡，刘邦入关',
    },
    accent: HERITAGE_ERA_COLORS.qin,
  },
  {
    key: 'han',
    title: { en: 'Han', zh: '汉' },
    years: { en: '202 BC–AD 8', zh: '前202–公元8' },
    cityName: { en: 'Chang\'an', zh: '长安' },
    fact: {
      en: 'Liu Bang made Chang\'an his capital; the walled city covered 36 km² — about three times today\'s Ming city. From here Zhang Qian rode west in 138 BC, opening the Silk Road that began at these gates.',
      zh: '刘邦定都长安，城垣36平方公里，约为今天明城墙内的3倍。公元前138年张骞从这里出发凿空西域，丝绸之路由此启程。',
    },
    events: {
      en: '202 BC Chang\'an becomes capital · 138 BC Zhang Qian rides west · 91 BC Sima Qian finishes the Records · AD 8 Wang Mang usurps; Han moves to Luoyang',
      zh: '前202 定都长安 · 前138 张骞出使西域 · 前91 司马迁成《史记》· 公元8 王莽代汉，东汉迁都洛阳',
    },
    accent: HERITAGE_ERA_COLORS.han,
  },
  {
    key: 'sui',
    title: { en: 'Sui', zh: '隋' },
    years: { en: '581–618', zh: '581–618' },
    cityName: { en: 'Daxing', zh: '大兴' },
    fact: {
      en: 'A short dynasty with a long shadow: in 582, planner Yuwen Kai laid out a brand-new grid capital, Daxing, southeast of the Han ruins. The Tang inherited it almost unchanged — and renamed it Chang\'an.',
      zh: '国祚短、格局长：582年宇文恺在汉城东南规划出方格里坊的全新都城大兴城。唐朝几乎原样接手，更名长安。',
    },
    events: {
      en: '581 Sui founded, capital Daxing · 582 the grid city is planned · 617 Li Yuan marches in from Taiyuan',
      zh: '581 杨坚建隋定都大兴 · 582 宇文恺营建大兴城 · 617 李渊自太原起兵入关',
    },
    accent: HERITAGE_ERA_COLORS.sui,
  },
  {
    key: 'tang',
    title: { en: 'Tang', zh: '唐' },
    years: { en: '618–907', zh: '618–907' },
    cityName: { en: 'Chang\'an', zh: '长安' },
    fact: {
      en: 'The peak: Tang Chang\'an spanned about 84 km² — roughly seven times today\'s walled city — with a million residents in 108 walled wards, plus foreign quarters for Sogdian, Persian and Japanese traders and students. The Big and Small Wild Goose Pagodas, Daming Palace and Qinglong Temple all date from this era.',
      zh: '巅峰：唐长安约84平方公里，约为今天明城墙内的7倍；百万人口、108坊，还有粟特、波斯、日本商人学子的番坊。大小雁塔、大明宫、青龙寺都是这个时代的遗存。',
    },
    events: {
      en: '618 Tang founded · 626 Xuanwu Gate coup · 645 Xuanzang returns with scriptures · 763 An Lushan rebellion ends · 904 warlord Zhu Wen razes Chang\'an',
      zh: '618 建唐 · 626 玄武门之变 · 645 玄奘载经归 · 763 安史之乱平 · 904 朱温毁长安胁迫迁都',
    },
    accent: HERITAGE_ERA_COLORS.tang,
  },
  {
    key: 'song',
    title: { en: 'Five Dynasties · Song · Yuan', zh: '五代·宋·元' },
    years: { en: '907–1368', zh: '907–1368' },
    cityName: { en: 'Jingzhao → Fengyuan', zh: '京兆→奉元' },
    fact: {
      en: 'After the Tang fell, the giant city became ungovernable; warlord Han Jian cut it back to the old imperial city — roughly the line today\'s wall still follows. As Jingzhao, then Fengyuan, it was a regional capital, no longer the empire\'s.',
      zh: '唐亡后巨城难守，节度使韩建缩筑皇城——大体就是今天城墙沿用的边界。此后称京兆府、奉元城，从帝国首都降为区域重镇。',
    },
    events: {
      en: '904+ Han Jian shrinks the city inside the imperial walls · Song era: Jingzhao Prefecture · Yuan era: renamed Fengyuan',
      zh: '904后 韩建缩筑皇城新城 · 宋置京兆府 · 元改奉元路',
    },
    accent: HERITAGE_ERA_COLORS.song,
  },
  {
    key: 'ming',
    title: { en: 'Ming', zh: '明' },
    years: { en: '1368–1644', zh: '1368–1644' },
    cityName: { en: 'Xi\'an (name born 1369)', zh: '西安（1369年得名）' },
    fact: {
      en: 'The city you bike today is Ming: the wall went up 1370–1378 on the Tang imperial-city footprint, and the Bell Tower followed in 1384. In 1369 the city got the name it still carries — Xi\'an, "Western Peace".',
      zh: '你今天骑行的城是明城：1370–1378年在唐皇城基址上筑起城墙，1384年钟楼落成。1369年，这座城得到了沿用至今的名字——西安。',
    },
    events: {
      en: '1369 the name \"Xi\'an\" is born · 1370–78 the wall rises · 1584 Bell Tower (moved 1582) · 1643 Li Zicheng takes the city',
      zh: '1369 改奉元路为西安府，「西安」得名 · 1370–78 筑城墙 · 1582 钟楼整体迁至城中心 · 1643 李自成入西安',
    },
    accent: HERITAGE_ERA_COLORS.ming,
  },
  {
    key: 'qing',
    title: { en: 'Qing', zh: '清' },
    years: { en: '1644–1912', zh: '1644–1912' },
    cityName: { en: 'Xi\'an', zh: '西安' },
    fact: {
      en: 'A northwestern capital of commerce and exam halls. Qing-era literati distilled this landscape into the \"Eight Views of Guanzhong\" — Celestial Palm of Mt. Hua, Sunset over Mt. Li, Willows-and-snow at Ba Bridge, Winding wine at Qujiang, Dawn bell at the Wild Goose Pagoda, Xianyang Ferry, Straw-hut Mist, Summer Snow on Mt. Taibai; four of the eight still sit inside today\'s city. In 1900, after the Boxer catastrophe, Empress Dowager Cixi ran the empire from Xi\'an for nearly a year.',
      zh: '西北的商贸与科举重镇。清人把这片山河浓缩成「关中八景」——华岳仙掌、骊山晚照、灞柳风雪、曲江流饮、雁塔晨钟、咸阳古渡、草堂烟雾、太白积雪，八分之四今天仍在西安城区可寻。1900年庚子国变，慈禧太后与光绪皇帝西狩，在此主政近一年。',
    },
    events: {
      en: 'The Eight Views canonized by Qing scholars · 1900 Cixi and Guangxu rule from Xi\'an for a year',
      zh: '清人评定「关中八景」 · 1900 两宫西狩驻跸西安近一年',
    },
    accent: HERITAGE_ERA_COLORS.qing,
  },
  {
    key: 'modern',
    title: { en: 'Modern', zh: '近现代' },
    years: { en: '1912–present', zh: '1912–今' },
    cityName: { en: 'Xi\'an', zh: '西安' },
    fact: {
      en: 'December 12, 1936: Chiang Kai-shek was detained at Huaqing Pool in the Xi\'an Incident — the bullet holes are still visible in the Five-Room Hall. The Long-Hai railway had reached the city in 1935; today Xi\'an is a metropolis of about 13 million.',
      zh: '1936年12月12日，西安事变在华清池爆发，五间厅的弹痕至今可见。1935年陇海铁路通到西安；今天的西安是约1300万人口的国家中心城市。',
    },
    events: {
      en: '1935 Long-Hai railway arrives · 1936 the Xi\'an Incident reshapes the war · today: a 13-million metro, capital of Shaanxi',
      zh: '1935 陇海铁路通车 · 1936 西安事变改变抗战格局 · 今天：约1300万人口的陕西省会',
    },
    accent: HERITAGE_ERA_COLORS.modern,
  },
])
