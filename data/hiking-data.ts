// 徒步专栏数据 - 面向欧美徒步爱好者的中国经典徒步路线库
// ---------------------------------------------------------------
// 路线按四级阶梯组织（beginner → classic → challenging → expedition），
// 灵感来自国内流行的「徒步进阶路线」难度阶梯图，按外国徒步者
// 的搜索与决策习惯重新筛选：合法开放、可到达、有成熟攻略与视频支撑。
// 视频全部为 B 站精选长视频（封面存于 /images/vlogs/<bvid>.jpg）。
// 结构与 shopping-data.ts 同构：L 字段 en/zh 必填，
// 其余 7 语由 data/translations/ 翻译包构建时合并，缺失回退英文。
// 注意：数组顺序即翻译包索引对齐顺序，勿随意调换。
// ---------------------------------------------------------------
import { mergeLanguagePack, fillLocaleFallbacks } from './localize'
import type { L } from './localize'
import { contentPacks } from './translations'

/** 难度阶梯（筛选与角标使用，i18n key: hiking.tiers.*） */
export type HikingTier = 'beginner' | 'classic' | 'challenging' | 'expedition'

/** 路线视频（B 站外链卡片行） */
export interface HikingVideo {
  bvid: string
  title: L
  vloggerName: string
  duration: string
  viewsText: L
  publishedAt: L
  /** 一句话推荐语：为什么值得看 */
  note: L
  featured: boolean
}

/** 单条徒步路线 */
export interface HikingRoute {
  id: number
  slug: string
  name: L
  region: L
  tier: HikingTier
  tagline: L
  description: L
  days: L
  distance: L
  maxAltitude: L
  season: L
  /** 证件/门票/向导提示 */
  permit: L
  highlights: L
  image: string
  videos: HikingVideo[]
  featured: boolean
}

// 封面与外链由 bvid 推导（与 /vlogs 目录约定一致）
export function hikingVideoUrl(bvid: string): string {
  return `https://www.bilibili.com/video/${bvid}`
}
export function hikingVideoThumb(bvid: string): string {
  return `/images/vlogs/${bvid}.jpg`
}

// ===== 原始数据（顺序即翻译包索引对齐顺序，勿随意调换） =====

const rawHikingRoutes: Omit<HikingRoute, 'id'>[] = [
  // ---- Beginner 入门 ----
  {
    slug: 'tiger-leaping-gorge',
    name: { en: 'Tiger Leaping Gorge High Trail', zh: '虎跳峡高路' },
    region: { en: 'Yunnan, near Lijiang', zh: '云南 · 丽江周边' },
    tier: 'beginner',
    tagline: { en: 'China\'s #1 foreigner-famous trek — guesthouses, no camping', zh: '外国人心中的中国徒步第一名——住客栈，无需露营' },
    description: {
      en: 'The one Chinese trek every Western backpacker knows: two days along the deepest gorge of the Yangtze, facing the jade wall of Jade Dragon Snow Mountain. Sleep in Naxi guesthouses (Tea Horse, Halfway, Tina\'s), finish with the thundering Middle Gorge rapids. No permit, no camping gear, no guide needed — this is the best gateway trek in China.',
      zh: '欧美背包客无人不晓的中国徒步线：两天沿金沙江最深切的峡谷行走，正对玉龙雪山刀劈斧削的岩壁。宿纳西客栈（茶马、Halfway、Tina\'s），最后下到中虎跳听江水咆哮。无需许可、无需露营装备、无需向导——这是中国最好的徒步入门线。',
    },
    days: { en: '2 days', zh: '2 天' },
    distance: { en: '~22 km high trail', zh: '高路约 22 公里' },
    maxAltitude: { en: '~2,700 m', zh: '约 2700 米' },
    season: { en: 'Oct–Apr (dry season)', zh: '10 月–次年 4 月（旱季）' },
    permit: { en: 'No permit; small trailhead fee at Qiaotou. Start early — the 28 Bends have no shade.', zh: '无需许可证；桥头入口有小额门票。早点出发——28 道拐全程无遮荫。' },
    highlights: { en: 'Jade Dragon Snow Mountain views, 28 Bends, Halfway Guesthouse "Toilet of the World", Middle Gorge rapids', zh: '玉龙雪山对望,28 道拐,Halfway 客栈天下第一厕,中虎跳江涛' },
    image: hikingVideoThumb('BV1RovaBTEE4'),
    videos: [
      {
        bvid: 'BV1RovaBTEE4',
        title: { en: 'Tiger Leaping Gorge: Our First 20 km Mountain Trek', zh: '跟风去雪山徒步20公里，下场就是……【云南-虎跳峡】' },
        vloggerName: '期末77',
        duration: '44:09',
        viewsText: { en: '4.6M views', zh: '459万播放' },
        publishedAt: { en: 'Dec 2025', zh: '2025年12月' },
        note: { en: 'A comedy duo\'s first long trek — the gorge, the guesthouses and every honest mistake, all useful for first-timers.', zh: '旅行 UP 主的首次长距离徒步：峡谷、客栈和所有真实的翻车现场，新手避坑必看。' },
        featured: true,
      },
      {
        bvid: 'BV1H84y1y7Qm',
        title: { en: 'Tiger Leaping Gorge 4K — a World Top-10 Trek', zh: '【虎跳峡徒步4K】全球十大徒步路线 在国外比国内还知名' },
        vloggerName: '徒步的LeoWang',
        duration: '16:25',
        viewsText: { en: '324k views', zh: '32.4万播放' },
        publishedAt: { en: 'Nov 2022', zh: '2022年11月' },
        note: { en: 'Calm, cinematic 4K walk-through of the whole high trail by a dedicated trekking channel — the best preview of what you\'ll see.', zh: '专注徒步的频道带来的 4K 沉浸式全程走线，出发前最好的预习材料。' },
        featured: false,
      },
      {
        bvid: 'BV1pFkdYzEYR',
        title: { en: 'How to Hike the High Trail — 2 Days on China\'s Coziest Trek', zh: '虎跳峡高路怎么走？两天徒步体验国内最小资的户外线路！' },
        vloggerName: 'captainmeng',
        duration: '21:53',
        viewsText: { en: '127k views', zh: '12.7万播放' },
        publishedAt: { en: 'Dec 2024', zh: '2024年12月' },
        note: { en: 'The most practical route breakdown: Lijiang transport, where to sleep, and the guesthouse culture that makes this trek famous.', zh: '最实用的攻略拆解：丽江交通、住宿选择，以及让这条线闻名的客栈文化。' },
        featured: false,
      },
    ],
    featured: true,
  },
  {
    slug: 'wugongshan',
    name: { en: 'Wugongshan Alpine Meadow Traverse', zh: '武功山穿越' },
    region: { en: 'Jiangxi, near Pingxiang', zh: '江西 · 萍乡' },
    tier: 'beginner',
    tagline: { en: '10,000-hectare grass sea above the clouds — China\'s easiest sunrise trek', zh: '云上十万亩高山草甸——中国最容易的日出徒步' },
    description: {
      en: 'An endless rolling meadow at 1,600–1,900 m where Chinese students go for their first "real" trek. One or two days of gentle ridge walking, tents or guesthouses on the summit, and a sea of clouds at dawn. High-speed rail access from Shanghai, Changsha or Nanchang makes it the easiest weekend mountain in China.',
      zh: '海拔 1600–1900 米的绵延草甸，中国大学生的第一座"正经山"。一到两天的平缓山脊行走，山顶可露营可住店，清晨看云海翻涌。上海、长沙、南昌高铁直达，是全中国最轻松的周末徒步山。',
    },
    days: { en: '1–2 days', zh: '1–2 天' },
    distance: { en: '18–30 km depending on start', zh: '18–30 公里（视起点）' },
    maxAltitude: { en: '1,918 m (Baihe Peak)', zh: '1918 米（白鹤峰）' },
    season: { en: 'May–Oct; Sep golden grass', zh: '5–10 月；9 月金草最美' },
    permit: { en: 'Scenic-area entry ticket only; "reverse crossing" (萍乡侧上山) avoids most stairs and crowds.', zh: '仅需景区门票；"反穿"（萍乡一侧上山）可避开大部分台阶与人流。' },
    highlights: { en: 'Summit grass sea, sunrise cloud ocean, reverse crossing route, ridge camping', zh: '高山草甸,日出云海,反穿路线,山脊露营' },
    image: hikingVideoThumb('BV13U411o7AC'),
    videos: [
      {
        bvid: 'BV13U411o7AC',
        title: { en: 'Wugongshan: The Mountain Where "the Wilderness Is Full of Students"', zh: '妈妈，人生是武功山，旷野上全是大学生……【互联网脚替07】' },
        vloggerName: '超Carry的柴西',
        duration: '10:39',
        viewsText: { en: '2.1M views', zh: '208万播放' },
        publishedAt: { en: 'May 2024', zh: '2024年5月' },
        note: { en: 'The viral video that put Wugongshan on every young hiker\'s list — funny, honest, and a perfect feel for the mountain\'s atmosphere.', zh: '让武功山刷爆全网的那条视频——好笑又真实，最能感受这座山的氛围。' },
        featured: true,
      },
      {
        bvid: 'BV1fu4m1F7YM',
        title: { en: 'First Time on Wugongshan: Routes, Costs & Tips', zh: '第一次爬武功山该咋爬' },
        vloggerName: '崂山Bro',
        duration: '15:15',
        viewsText: { en: '1.1M views', zh: '109万播放' },
        publishedAt: { en: 'Apr 2024', zh: '2024年4月' },
        note: { en: 'Classic "first time" guide — cable car versus hiking up, where to camp, what it costs.', zh: '经典新手攻略：缆车还是走上山、山顶怎么住、花多少钱，一目了然。' },
        featured: false,
      },
      {
        bvid: 'BV12a411V7VU',
        title: { en: 'Wugongshan Complete Route Guide in 9 Minutes', zh: '武功山攻略（全集），9分钟带你玩转武功山' },
        vloggerName: '独行客卡卡',
        duration: '9:06',
        viewsText: { en: '768k views', zh: '76.8万播放' },
        publishedAt: { en: 'Aug 2022', zh: '2022年8月' },
        note: { en: 'Dense animated map guide covering every approach — the one locals bookmark for the full trail picture.', zh: '信息密度极高的地图动画攻略，覆盖所有上山路线，本地人也收藏的全程讲解。' },
        featured: false,
      },
    ],
    featured: true,
  },
  {
    slug: 'mount-hua',
    name: { en: 'Mount Hua Night Climb', zh: '华山夜爬' },
    region: { en: 'Shaanxi, near Xi\'an', zh: '陕西 · 华阴' },
    tier: 'beginner',
    tagline: { en: 'Staircase via ferrata at 2,100 m — climb by night, sunrise above the clouds', zh: '2100 米的阶梯"飞拉达"——夜里上山，云上日出' },
    description: {
      en: 'One of China\'s Five Great Mountains and its most dramatic: granite spires above a cliff wall, chained walkways cut into rock, and the famous cliff-side plank walk. The classic move is the night climb — start at 10 PM from the East Gate, summit for the 5 AM sunrise, then descend past the five peaks by cable car or leg power. A serious stair workout, but zero technique required.',
      zh: '五岳中最险的一座：花岗岩峰林、崖壁栈道、长空栈道。经典玩法是夜爬——晚十点玉泉院出发，凌晨五点东峰顶看日出，再五峰连穿。爬升很虐但不需要任何技术。',
    },
    days: { en: '1 day (+1 night)', zh: '1 天（含 1 晚）' },
    distance: { en: '10–15 km across 5 peaks', zh: '五峰连穿 10–15 公里' },
    maxAltitude: { en: '2,155 m (South Peak)', zh: '2155 米（南峰）' },
    season: { en: 'Apr–Oct (summer for night climb)', zh: '4–10 月（夏季夜爬最舒服）' },
    permit: { en: 'Entry ticket + optional cable cars; the plank walk (长空栈道) is a separate small ticket. Gloves strongly recommended.', zh: '门票+可选缆车；长空栈道另收小额门票。强烈建议带手套。' },
    highlights: { en: 'Sunrise at East Peak, cliff plank walk, 5-peak ridge traverse, high-speed rail from Xi\'an (30 min)', zh: '东峰日出,长空栈道,五峰连穿,西安高铁 30 分钟直达' },
    image: hikingVideoThumb('BV1uEQhBAEVr'),
    videos: [
      {
        bvid: 'BV1uEQhBAEVr',
        title: { en: 'Mount Hua: The Entire Trail in One Take (28 min)', zh: '一镜到底带您全程徒步【华山】' },
        vloggerName: '问题不太大-',
        duration: '28:16',
        viewsText: { en: '348k views', zh: '34.8万播放' },
        publishedAt: { en: 'Apr 2026', zh: '2026年4月' },
        note: { en: 'One continuous shot of the whole climb — the closest thing to previewing every stair and chain before you go.', zh: '一镜到底拍完全程——出发前把每一级台阶、每一条铁链都提前看一遍。' },
        featured: true,
      },
      {
        bvid: 'BV1kG4y1e7va',
        title: { en: '12-Hour Night Climb of Mount Hua — Full Guide', zh: '历时12小时夜爬华山的保姆级攻略来了！' },
        vloggerName: '乔梓Zoey',
        duration: '8:15',
        viewsText: { en: '74k views', zh: '7.4万播放' },
        publishedAt: { en: 'Jul 2022', zh: '2022年7月' },
        note: { en: 'Timing, gear and pacing for the night climb — exactly the logistics first-timers worry about.', zh: '夜爬的时间安排、装备与配速——新手最担心的后勤问题全讲清。' },
        featured: false,
      },
      {
        bvid: 'BV1Pe4y197fQ',
        title: { en: 'You Have to Night-Climb Hua Shan Once — for the 5 AM Sunrise', zh: '总要夜爬一次华山，看凌晨五点的日出吧！' },
        vloggerName: '乔梓Zoey',
        duration: '9:51',
        viewsText: { en: '67k views', zh: '6.7万播放' },
        publishedAt: { en: 'Jul 2022', zh: '2022年7月' },
        note: { en: 'The mood piece: headlamp lines snaking up the cliff and the payoff at dawn.', zh: '氛围担当：头灯长龙攀崖而上，以及黎明时分的回报。' },
        featured: false,
      },
    ],
    featured: false,
  },
  {
    slug: 'zhagana',
    name: { en: 'Zhagana Stone-Mountain Trails', zh: '扎尕那徒步' },
    region: { en: 'Gannan (Tibetan Amdo), Gansu', zh: '甘肃 · 甘南藏区' },
    tier: 'beginner',
    tagline: { en: 'A Tibetan stone fortress village beneath 4,000 m rock pyramids', zh: '藏地石城，四千米岩锥下的村落' },
    description: {
      en: 'Zhagana is a cluster of Tibetan villages walled in by jagged rock pyramids on the edge of the Tibetan Plateau. Choose your dose: half-day walks between villages and rooftop cafes, a 1-day ridge loop above the valley, or the full multi-day traverse across the Dieshan range. Wild, quiet and still under-visited compared with Sichuan\'s famous parks.',
      zh: '扎尕那是被嶙峋岩锥围合的藏族村寨群，地处青藏高原边缘。强度任选：村间半日漫步与屋顶咖啡馆、一日山脊环线，或多天翻越迭山的完整穿越。与川西热门景区相比，这里依旧荒凉安静。',
    },
    days: { en: '1–3 days', zh: '1–3 天' },
    distance: { en: '10 km village loop to 51 km traverse', zh: '10 公里环线至 51 公里穿越' },
    maxAltitude: { en: '3,300 m village, 4,000 m+ passes', zh: '村寨 3300 米，垭口 4000 米+' },
    season: { en: 'Jun–Oct', zh: '6–10 月' },
    permit: { en: 'Scenic-area entry; for the 51 km Dieshan traverse hire a local guide — trails are faint and unmarked.', zh: '需景区门票；51 公里迭山穿越建议请当地向导——路迹细且无标记。' },
    highlights: { en: 'Tibetan villages & barley terraces, stone peak amphitheatre, marmots, almost no foreign tourists', zh: '藏寨与青稞梯田,石峰环抱,旱獭,几乎零外国游客' },
    image: hikingVideoThumb('BV178qGYaEp9'),
    videos: [
      {
        bvid: 'BV178qGYaEp9',
        title: { en: 'Zhagana Reverse Traverse: 51 km Through the Dieshan Secret Range', zh: '反穿扎尕那！51km徒步穿越迭山秘境，我竟然被土拨鼠偷家了！' },
        vloggerName: 'captainmeng',
        duration: '34:28',
        viewsText: { en: '384k views', zh: '38.4万播放' },
        publishedAt: { en: 'Dec 2024', zh: '2024年12月' },
        note: { en: 'The definitive long-form record of the full traverse — terrain, camps, river crossings and a thieving marmask... marmot.', zh: '全程穿越的完整长片：地形、营地、过河，以及一只偷家的旱獭。' },
        featured: true,
      },
      {
        bvid: 'BV14W4y1o7dM',
        title: { en: 'Solo Trekking Zhagana — Rain, Scree and a Victory Moment', zh: '甘南扎尕那｜一个人徒步走完忍不住哭出来' },
        vloggerName: '妙玉Mavis',
        duration: '5:14',
        viewsText: { en: '115k views', zh: '11.5万播放' },
        publishedAt: { en: 'Jul 2023', zh: '2023年7月' },
        note: { en: 'A moving solo short about fear and self-reliance on the ridge loop — why this place gets under your skin.', zh: '一个人在山脊环线上与恐惧和孤独相处的动人短片——这就是扎尕那让人上瘾的原因。' },
        featured: false,
      },
    ],
    featured: false,
  },
  // ---- Classic 经典 ----
  {
    slug: 'yubeng',
    name: { en: 'Yubeng Village & the Meili Kora', zh: '雨崩 · 梅里转山' },
    region: { en: 'Deqin, Yunnan', zh: '云南 · 德钦' },
    tier: 'classic',
    tagline: { en: 'A roadless village under Meili Snow Mountain — China\'s sacred-valley trek', zh: '梅里雪山下的不通公路村庄——中国的神圣山谷徒步' },
    description: {
      en: 'Yubeng sits at 3,200 m in a glacial valley beneath Kawagarbo (6,740 m), the holiest mountain of Tibetan Kham. Until recently no road reached it — everything came in on horseback. Base yourself in the village and day-hike to the Sacred Waterfall (pilgrims circle it 13 times), the Milk Lake–like Ice Lake, and the Ninong gorge exit. Pilgrimage atmosphere, guesthouse comfort, real mountain seriousness.',
      zh: '雨崩村坐落在卡瓦格博（6740 米）冰川谷地中，海拔 3200 米，是康区藏民心中最神圣的雪山——梅里雪山脚下的秘境。直到近年仍不通公路，一切物资靠马驮。以村子为大本营，日徒步神瀑（转山人绕瀑十三圈）、冰湖与尼农峡谷。有转山的神性，也有客栈的舒适。',
    },
    days: { en: '4–5 days from Shangri-La', zh: '香格里拉出发 4–5 天' },
    distance: { en: '60–66 km total', zh: '全程 60–66 公里' },
    maxAltitude: { en: '3,200 m village; 3,800 m+ day hikes', zh: '村寨 3200 米；日徒步至 3800 米+' },
    season: { en: 'Apr–Jun & Sep–Nov', zh: '4–6 月、9–11 月' },
    permit: { en: 'Meili scenic-area entry; access trails change with roadworks (enter via Ninong in recent years) — check before booking. Acclimatize in Shangri-La (3,300 m) first.', zh: '需梅里景区门票；进村路线随修路调整（近年走尼农）——预订前先确认。建议先在香格里拉（3300 米）适应海拔。' },
    highlights: { en: 'Sacred Waterfall kora, Ice Lake, sunrise "golden mountain" on Kawagarbo, Tibetan pilgrimage culture', zh: '神瀑转经,冰湖,梅里日照金山,藏地转山文化' },
    image: hikingVideoThumb('BV1pMaDepEyS'),
    videos: [
      {
        bvid: 'BV1pMaDepEyS',
        title: { en: 'Yubeng 4K: the Epic 66 km Trek Through Meili Snow Mountain', zh: '【4K】雨崩——此生必徒的史诗级路线 | 雨崩66KM徒步全纪录' },
        vloggerName: '小V的奇幻旅程',
        duration: '44:00',
        viewsText: { en: '3.3M views', zh: '331万播放' },
        publishedAt: { en: 'Aug 2024', zh: '2024年8月' },
        note: { en: 'The benchmark Yubeng documentary: every trail (Waterfall, Ice Lake, Ninong) in 4K with honest logistics. Start here.', zh: '雨崩的标杆纪录片：神瀑、冰湖、尼农全线 4K 呈现，后勤信息诚实可靠。从这里开始看。' },
        featured: true,
      },
      {
        bvid: 'BV1aasBzGEaR',
        title: { en: 'Rainy 12 km to Yubeng — Meili\'s Hidden Village', zh: '和好友冒雨徒步雨崩12km，藏在梅里雪山里的秘境……【互联网脚替17】' },
        vloggerName: '超Carry的柴西',
        duration: '16:18',
        viewsText: { en: '2.4M views', zh: '236万播放' },
        publishedAt: { en: 'Oct 2025', zh: '2025年10月' },
        note: { en: 'Rain-soaked entry day with friends — the mud, the laughter, the "are we there yet" of the Ninong approach.', zh: '冒雨进村的真实一天：泥泞、欢笑，以及尼农进山路上的"到底还有多远"。' },
        featured: false,
      },
      {
        bvid: 'BV1Wj411o7Dg',
        title: { en: 'Yubeng Ultimate Guide: Trails, Transport & Seasons', zh: '雨崩保姆级攻略，徒步/自驾/神湖/虫草线' },
        vloggerName: '独行客卡卡',
        duration: '11:50',
        viewsText: { en: '288k views', zh: '28.8万播放' },
        publishedAt: { en: 'Jul 2023', zh: '2023年7月' },
        note: { en: 'Two months of map-making condensed — every variant line including the tough Sacred Lake trail.', zh: '两个月地图制作浓缩而成——包括硬核神湖线在内的所有支线讲解。' },
        featured: false,
      },
    ],
    featured: true,
  },
  {
    slug: 'daocheng-yading',
    name: { en: 'Daocheng Yading Sky Lakes', zh: '稻城亚丁' },
    region: { en: 'Garzê (Sichuan Kham)', zh: '四川 · 甘孜' },
    tier: 'classic',
    tagline: { en: 'Three 6,000 m snow gods over turquoise lakes at 4,600 m', zh: '三座六千米雪峰下的 4600 米牛奶海' },
    description: {
      en: 'The park that inspired "Lost Horizon"\'s Shangri-La legend: Chenresig (6,032 m), Jambeyang and Chanadorje rise over forest valleys, and the trail climbs past monasteries to the Milk Lake and Five-Color Lake at 4,600–4,700 m. Most visitors day-hike; trekkers add the 2-day kora around Chenresig for solitude and the park\'s wildest faces.',
      zh: '《消失的地平线》里香格里拉传说的原型地：央迈勇、仙乃日、夏诺多吉三座神峰守护着森林谷地，徒步道经寺庙爬升到 4600–4700 米的牛奶海与五色海。多数游客只走一日线；徒步者会加两天转山，独享园区最野的一面。',
    },
    days: { en: '2–4 days', zh: '2–4 天' },
    distance: { en: 'Day hikes 15 km; kora +25 km', zh: '一日线 15 公里；转山再加 25 公里' },
    maxAltitude: { en: '4,700 m (Five-Color Lake)', zh: '4700 米（五色海）' },
    season: { en: 'Sep–Nov autumn colours', zh: '9–11 月秋色最佳' },
    permit: { en: 'Park entry + shuttle; altitude is the real barrier — sleep low in Daocheng (3,750 m) the night before. Oxygen cans sold at the trailhead.', zh: '门票+观光车；真正的门槛是海拔——前一晚先住稻城县城（3750 米）适应。景区门口有氧气罐出售。' },
    highlights: { en: 'Milk Lake & Five-Color Lake, Chenresig kora, autumn larch gold, Tibetan monastery at the trailhead', zh: '牛奶海与五色海,央迈勇转山,秋日落叶松,冲古寺' },
    image: hikingVideoThumb('BV1LSzHY4EsH'),
    videos: [
      {
        bvid: 'BV1LSzHY4EsH',
        title: { en: 'Yading North Loop 4K — a Side of the Park Almost Nobody Sees', zh: '徒步稻城亚丁，我发现了一个无人知晓的秘境｜亚丁北线4K' },
        vloggerName: '秘密仙人掌',
        duration: '8:45',
        viewsText: { en: '382k views', zh: '38.2万播放' },
        publishedAt: { en: 'Dec 2024', zh: '2024年12月' },
        note: { en: 'Beyond the crowds: the quiet northern trail with empty valleys and the same 6,000 m walls.', zh: '避开人潮的北线：空谷无人，同样的六千米岩壁。' },
        featured: true,
      },
      {
        bvid: 'BV1Bx14BJEsc',
        title: { en: '6 Days Offline: the Yading Kora — China\'s Middle-earth', zh: '与世界断联，寻找现实版中土大陆 | 亚丁徒步 4K' },
        vloggerName: '夜空中最亮的喵',
        duration: '36:52',
        viewsText: { en: '310k views', zh: '31万播放' },
        publishedAt: { en: 'Nov 2025', zh: '2025年11月' },
        note: { en: 'Full-pack kora documentary with gear lists — the serious trekker\'s version of Yading, straight out of Tolkien.', zh: '重装转山纪录片附装备清单——硬核玩家版本的亚丁，宛如托尔金笔下的中土。' },
        featured: false,
      },
      {
        bvid: 'BV1TdadzNEYF',
        title: { en: 'First Time in Daocheng Yading: How to Do It', zh: '第一次来稻城亚丁该咋玩' },
        vloggerName: '崂山Bro',
        duration: '12:38',
        viewsText: { en: '204k views', zh: '20.4万播放' },
        publishedAt: { en: 'Sep 2025', zh: '2025年9月' },
        note: { en: 'Ticketing, shuttles, short-versus-long loop, and how to survive the altitude as a first-timer.', zh: '购票、观光车、长短线怎么选，以及新手如何扛住海拔。' },
        featured: false,
      },
    ],
    featured: false,
  },
  {
    slug: 'kanas-hemu',
    name: { en: 'Kanas–Hemu Forest Traverse', zh: '喀纳斯 · 禾木穿越' },
    region: { en: 'Altay, Xinjiang', zh: '新疆 · 阿勒泰' },
    tier: 'classic',
    tagline: { en: 'Siberian forest and Kazakh grassland under the Altai peaks', zh: '阿尔泰山下的西伯利亚泰加林与哈萨克草原' },
    description: {
      en: 'China\'s only Siberian landscape: the trail from Jiadengyu over a birch-and-larch pass to the Tuva village of Hemu, then beside the milky-blue Kanas river to the lake. Mid-September turns the whole valley gold. Ride horses with Kazakh herders, sleep in log cabins, and finish with the fish-watch tower over the lake. Low altitude but real remoteness — this is the trek for people who think China is all crowds.',
      zh: '中国唯一的西伯利亚式景观：从贾登峪翻越白桦与落叶松垭口到图瓦人村落禾木，再沿乳蓝色喀纳斯河走到湖边。九月中旬整条山谷一片金黄。可与哈萨克牧民同骑、宿木屋，最后登观鱼台俯瞰湖面。海拔不高却足够荒远——适合以为中国全是人山人海的你。',
    },
    days: { en: '3–4 days (or day hikes from bases)', zh: '3–4 天（也可村庄大本营日徒步）' },
    distance: { en: '42–103 km options', zh: '42–103 公里多档可选' },
    maxAltitude: { en: '2,500 m pass', zh: '垭口约 2500 米' },
    season: { en: 'Jun–Sep; mid-Sep gold', zh: '6–9 月；9 月中旬金秋' },
    permit: { en: 'Scenic-area tickets for Hemu/Kanas; for Baihaba (border village) check current foreigner rules with your guesthouse. Bring your passport everywhere in Xinjiang.', zh: '禾木/喀纳斯需景区门票；白哈巴为边境村，外国人政策随时调整，请与客栈确认。在新疆请随身携带护照。' },
    highlights: { en: 'Hemu sunrise mist, Kanas river bends, Tuva log villages, mid-September larch gold', zh: '禾木晨雾,喀纳斯河湾,图瓦木屋,九月中旬落叶松金黄' },
    image: hikingVideoThumb('BV1tV26YJEVU'),
    videos: [
      {
        bvid: 'BV1tV26YJEVU',
        title: { en: 'Kanas River 4K HDR — China\'s Most Beautiful Riverside Walk (POV)', zh: '新疆阿勒泰喀纳斯河 4K HDR - 在中国最美的河滨步行道漫步' },
        vloggerName: '行走中国WalkChina',
        duration: '53:45',
        viewsText: { en: '416k views', zh: '41.6万播放' },
        publishedAt: { en: 'Oct 2024', zh: '2024年10月' },
        note: { en: 'A 54-minute first-person walk along the river path — Western viewers love this slow-TV format; run it on your treadmill.', zh: '54 分钟第一视角河滨漫步——欧美观众最爱的慢电视格式，跑步机上放它正合适。' },
        featured: true,
      },
      {
        bvid: 'BV1dP41157hv',
        title: { en: '103 km Across Hemu, Kanas & Baihaba — Into the Untouched Zone', zh: '徒步103公里穿越禾木、喀纳斯、白哈巴，进入未开发区域' },
        vloggerName: 'lucky卡卡',
        duration: '13:10',
        viewsText: { en: '158k views', zh: '15.8万播放' },
        publishedAt: { en: 'Aug 2022', zh: '2022年8月' },
        note: { en: 'The full 4-day village-to-village crossing including sections most tourists never enter.', zh: '四天村村穿越全程，包含多数游客永远不会踏足的未开发段。' },
        featured: false,
      },
      {
        bvid: 'BV1kV411M7rU',
        title: { en: 'Hemu to Kanas: 42 km Through Forest, Steppe & Snow Peaks', zh: '新疆禾木-喀纳斯42km登山徒步' },
        vloggerName: '金鱼派力西',
        duration: '14:56',
        viewsText: { en: '108k views', zh: '10.8万播放' },
        publishedAt: { en: 'Jul 2023', zh: '2023年7月' },
        note: { en: 'Day-by-day 42 km with elevation notes — the practical planning version.', zh: '42 公里逐日记录附爬升数据——规划行程时最好用的版本。' },
        featured: false,
      },
    ],
    featured: false,
  },
  {
    slug: 'siguniang-traverse',
    name: { en: 'Mt. Siguniang Traverse (Changping→Bipeng)', zh: '四姑娘山 · 长穿毕' },
    region: { en: 'Xiaojin, Sichuan', zh: '四川 · 小金' },
    tier: 'classic',
    tagline: { en: 'The "Queen of Sichuan\'s" 6,250 m wall, walked end to end', zh: '从终端到终端走过"蜀山之后"6250 米的岩壁' },
    description: {
      en: 'Mt. Siguniang ("Four Sisters") is the closest 6,000 m wall to Chengdu, and its 3-day Changping-to-Bipeng traverse is China\'s classic hutless-but-gentle alpine trek: 32 km through pine forest and shepherd valleys, crossing a 4,600 m-plus pass between the Changping and Bipeng valleys with the Sisters\' granite pyramid in view nearly the whole way. No technical skills; acclimatize in Rilong town (3,200 m) first.',
      zh: '四姑娘山是离成都最近的六千米岩壁，长坪沟—毕棚沟三天穿越是中国最经典的"无客栈但平缓"的高原徒步：32 公里穿过松林与牧谷，翻越 4600 米+垭口，幺妹峰花岗岩金字塔几乎全程可见。无需技术；先在日隆镇（3200 米）适应海拔。',
    },
    days: { en: '3 days, 2 nights', zh: '3 天 2 晚' },
    distance: { en: '32 km, +1,600 m gain', zh: '32 公里，爬升 1600 米' },
    maxAltitude: { en: '~4,680 m pass', zh: '垭口约 4680 米' },
    season: { en: 'May–Oct; late Sep larch gold', zh: '5–10 月；9 月下旬秋色' },
    permit: { en: 'Valley entry tickets both ends; horse support bookable from Changping. Chengdu→Rilong is 3.5 h by bus — an easy add-on to a Sichuan trip.', zh: '两端均需沟内门票；长坪沟可雇马匹。成都→日隆班车 3.5 小时，川西行程轻松串联。' },
    highlights: { en: 'Mt. Siguniang (Yaomei) pyramid views, shepherd valleys, 4,680 m pass, autumn larch forest', zh: '幺妹峰金字塔,牧人山谷,4680 米垭口,秋日落叶松林' },
    image: hikingVideoThumb('BV1qkHDzGE6b'),
    videos: [
      {
        bvid: 'BV1qkHDzGE6b',
        title: { en: 'Changping→Bipeng Traverse: 32 km Heavy-Pack Under the Four Sisters', zh: '长坪沟穿越毕棚沟32km重装徒步，四姑娘山的夏天在川西没有对手！' },
        vloggerName: 'captainmeng',
        duration: '33:46',
        viewsText: { en: '398k views', zh: '39.8万播放' },
        publishedAt: { en: 'Sep 2025', zh: '2025年9月' },
        note: { en: 'Three cloudless days on the traverse with all the named peaks identified — the definitive route film.', zh: '连续三个晴天走完全线，逐座点名雪山——本路线的权威影像。' },
        featured: true,
      },
      {
        bvid: 'BV18nTj6JE4N',
        title: { en: 'Siguniang With My Little Brother — a Western Sichuan Farewell Trip', zh: '和弟弟的四姑娘山川西毕业旅行，终不似少年游' },
        vloggerName: '超Carry的柴西',
        duration: '22:34',
        viewsText: { en: '1.7M views', zh: '168万播放' },
        publishedAt: { en: 'Jul 2026', zh: '2026年7月' },
        note: { en: 'The most-watched Siguniang video of the year — sibling chemistry, valley bases, and why this range steals hearts.', zh: '年度最火的四姑娘山视频：兄弟档的化学反应、沟内大本营玩法，以及这片山为何让人念念不忘。' },
        featured: false,
      },
      {
        bvid: 'BV1iH4y1R7pp',
        title: { en: 'Autumn on the Siguniang Traverse — a Golden Oil Painting in 4K', zh: '[4K]四姑娘山徒步 | 长穿毕｜走在金色油画般的秋日川西' },
        vloggerName: '娅呀呀呀呀',
        duration: '19:28',
        viewsText: { en: '128k views', zh: '12.8万播放' },
        publishedAt: { en: 'Oct 2023', zh: '2023年10月' },
        note: { en: 'Immersive fall-colour version — if you can only watch one minute, watch this in 4K.', zh: '沉浸式秋色版——如果只看一分钟，就看这条的 4K。' },
        featured: false,
      },
    ],
    featured: false,
  },
  // ---- Challenging 进阶 ----
  {
    slug: 'gongga-loop',
    name: { en: 'Gongga (Minya Konka) Grand Loop', zh: '贡嘎大环线' },
    region: { en: 'Kangding, Sichuan', zh: '四川 · 康定' },
    tier: 'challenging',
    tagline: { en: 'Circle the 7,556 m "King of Sichuan" — glaciers, cols and hot-spring valleys', zh: '环穿 7556 米"蜀山之王"——冰川、垭口与温泉河谷' },
    description: {
      en: 'The grand tour around Minya Konka (7,556 m), the highest peak east of the Himalaya: 6–8 days and 70–100 km crossing 4,900 m passes, with the whole range\'s ice faces appearing one by one — including the classic reflection of the summit over the Cosha Haizi lake and the Ledorman Yin glacier camp. Wild-camping the whole way; go with a guide or a very experienced group.',
      zh: '环绕蜀山之王贡嘎（7556 米）——喜马拉雅以东最高峰——的大环线：6–8 天 70–100 公里，翻越 4900 米级垭口，山系各面冰墙依次登场：子梅垭口的正对日照金山、勒多曼因冰川营地与冷噶措倒影。全程野营；请向导或跟随非常有经验的队伍。',
    },
    days: { en: '6–8 days', zh: '6–8 天' },
    distance: { en: '70–100 km', zh: '70–100 公里' },
    maxAltitude: { en: '~4,900 m passes', zh: '垭口约 4900 米' },
    season: { en: 'May–Jun & Sep–Oct windows', zh: '5–6 月与 9–10 月窗口期' },
    permit: { en: 'No permit, but true wilderness: carry tents, stove and 5+ days of food, or hire horses from Laoyulin. Weather kills the views half the time — build in a spare day for the Zimei Pass viewpoint.', zh: '无需许可证，但属于真正的荒野：帐篷炉具与 5 天以上食物，或在老榆林雇马。一半概率云雾锁山——为子梅垭口留一天机动。' },
    highlights: { en: 'Kangding hot springs, Zimei Pass sunrise on the summit, Cosha Haiku reflection, Ledorman Yin glacier', zh: '康定温泉,子梅垭口日照金山,冷噶措倒影,勒多曼因冰川' },
    image: hikingVideoThumb('BV1Rm4y1s7qy'),
    videos: [
      {
        bvid: 'BV1Rm4y1s7qy',
        title: { en: 'Solo Heavy-Pack Gongga Loop + Ledorman Yin Glacier (4K)', zh: '【4K】Solo重装徒步贡嘎大环线+勒多曼因' },
        vloggerName: 'okianyumi',
        duration: '12:23',
        viewsText: { en: '92k views', zh: '9.2万播放' },
        publishedAt: { en: 'Jul 2023', zh: '2023年7月' },
        note: { en: 'A first-timer\'s honest solo account — 25 kg pack, first ever camp, and how it actually feels day by day.', zh: '新手的诚实 solo 记录：25 公斤背包、人生第一次露营，以及每天的真实感受。' },
        featured: true,
      },
      {
        bvid: 'BV1AHt7zgEw7',
        title: { en: 'Gongga Loop: 80 km Solo Crossing, 6 Days 5 Nights', zh: '贡嘎大环线-勒多曼因80km单人穿越，6天5夜攻略vlog' },
        vloggerName: '山仲有阳',
        duration: '48:22',
        viewsText: { en: '72k views', zh: '7.2万播放' },
        publishedAt: { en: 'Aug 2025', zh: '2025年8月' },
        note: { en: 'Long-form daily vlog of the whole loop — the best "what each day looks like" reference before committing.', zh: '整条环线的逐日长片——出发前最好的"每天到底长什么样"参考。' },
        featured: false,
      },
      {
        bvid: 'BV17m411U7Ry',
        title: { en: 'Every Gongga-area Trek Route Explained in 7 Minutes', zh: '一个视频讲清楚贡嘎山域所有的徒步路线（硬核攻略）' },
        vloggerName: '户外小祝',
        duration: '6:58',
        viewsText: { en: '45k views', zh: '4.5万播放' },
        publishedAt: { en: 'Apr 2024', zh: '2024年4月' },
        note: { en: 'Map-based explainer of every variant (grand loop, north loop, Cosha day trip) to pick your dose.', zh: '地图讲解全部变体（大环、北环、冷噶措一日线），帮你选强度。' },
        featured: false,
      },
    ],
    featured: false,
  },
  {
    slug: 'genie-pasture',
    name: { en: 'Genie (Gongna) Pasture Line', zh: '格聂牧场线' },
    region: { en: 'Litang, Sichuan', zh: '四川 · 理塘' },
    tier: 'challenging',
    tagline: { en: 'Wildflower plateaus under a 6,204 m unclimbed giant', zh: '6204 米未登峰下的高原花海牧场' },
    description: {
      en: 'Litang (4,000 m, "the world\'s highest town") is the trailhead for Mt. Genie, a 6,204 m peak that repelled even American climbers in the 1930s. The pasture line is its gentle greatest-hit: 2–3 days and 30 km across flower meadows, past the "Eye of Genie" spring and hot springs, camping beside herder huts. In July the plateau is a knee-high flower sea — the single best week of trekking in all of Kham.',
      zh: '理塘（4000 米"世界高城"）是格聂山（6204 米，上世纪 30 年代连美国登山家也未能登顶）的门户。牧场线是它的精华慢速版：2–3 天 30 公里穿过花海草甸，路过"格聂之眼"泉眼与温泉，在牧民小屋旁扎营。七月高原花海齐膝深——整个康区最好的徒步一周。',
    },
    days: { en: '2–3 days', zh: '2–3 天' },
    distance: { en: '30 km (65 km with V-line)', zh: '30 公里（加 V 线 65 公里）' },
    maxAltitude: { en: '4,200 m camps', zh: '营地约 4200 米' },
    season: { en: 'Jun–Oct; Jul flowers', zh: '6–10 月；7 月花季' },
    permit: { en: 'No permit; start from Litang with a driver to the trailhead. Bring camping gear or book the local herder-camp setups.', zh: '无需许可证；从理塘包车到徒步起点。自带露营装备或预订当地牧民营地。' },
    highlights: { en: '"Eye of Genie" spring, July flower sea, Litang horse festival (Aug), 6,204 m summit wall', zh: '格聂之眼,七月花海,理塘八月赛马节,6204 米主峰岩壁' },
    image: hikingVideoThumb('BV1EsW3zuERd'),
    videos: [
      {
        bvid: 'BV1EsW3zuERd',
        title: { en: 'Genie Pasture Line, 3-Day Full-Pack Trek — Hiking 101 S4E1', zh: '对不起B友们，我们把峰哥活着带出来了｜《徒步101》格聂牧场线3天2夜' },
        vloggerName: '阅路山',
        duration: '36:14',
        viewsText: { en: '885k views', zh: '88.5万播放' },
        publishedAt: { en: 'Sep 2025', zh: '2025年9月' },
        note: { en: 'From the channel that\'s filming China\'s 101 classic treks — entertainment plus genuinely useful route intel.', zh: '来自正在拍摄中国 101 条经典徒步线的频道——好看之外路线信息也真实有用。' },
        featured: true,
      },
      {
        bvid: 'BV1RDbXzFEeu',
        title: { en: 'Genie in Its Divine Season — 30 km Pasture Line in 2 Days', zh: '川西格聂徒步路线，已经来到了封神季节' },
        vloggerName: '安文龙-无限挑战',
        duration: '27:27',
        viewsText: { en: '118k views', zh: '11.8万播放' },
        publishedAt: { en: 'Jul 2025', zh: '2025年7月' },
        note: { en: 'Peak wildflower footage plus the V-line extension — the route at its absolute best.', zh: '花季巅峰画面外加 V 线延伸——这条路线最好看的样子。' },
        featured: false,
      },
      {
        bvid: 'BV1xfNT6yEH6',
        title: { en: '65 km Solo Around the Genie Pastures', zh: '独自在四川甘孜格聂牧场徒步65km' },
        vloggerName: '游山浪人',
        duration: '22:14',
        viewsText: { en: '51k views', zh: '5.1万播放' },
        publishedAt: { en: 'Jul 2026', zh: '2026年7月' },
        note: { en: 'Fresh 2026 solo account including campsites and the extended loop.', zh: '2026 年最新 solo 记录，含营地与延长环线。' },
        featured: false,
      },
    ],
    featured: false,
  },
  {
    slug: 'meili-north-slope',
    name: { en: 'Meili North Slope Traverse', zh: '梅里北坡' },
    region: { en: 'Deqin, Yunnan', zh: '云南 · 德钦' },
    tier: 'challenging',
    tagline: { en: 'Face-to-face with hanging glaciers on Meili\'s wild north side', zh: '与梅里北壁悬冰川面对面' },
    description: {
      en: 'The serious sibling of the Yubeng trek: 4 days and 42 km up the valley from Yagong village, camping directly beneath the Nairidongka glacier as it pours between 6,000 m walls, then crossing the 5,200 m Yunnan–Tibet border pass with one leg in each province. Guided small groups with horse support are the norm; you will meet far more yaks than people.',
      zh: '雨崩的硬核姊妹线：从亚贡村进山，4 天 42 公里，直接扎营在奶日顶卡冰川之下——冰瀑从两座六千米岩壁间倾泻而下——随后翻越 5200 米滇藏垭口，一脚踏云南一脚踏西藏。常规玩法是小团+向导+马帮；一路上牦牛远比人多。',
    },
    days: { en: '4 days, 3 nights', zh: '4 天 3 晚' },
    distance: { en: '42 km', zh: '42 公里' },
    maxAltitude: { en: '5,200 m pass', zh: '垭口 5200 米' },
    season: { en: 'May–Oct', zh: '5–10 月' },
    permit: { en: 'No permit currently, but go guided: horses carry gear, camps are established, and river fords need local judgement. Combine with Yubeng for the full Meili fortnight.', zh: '目前无需许可证，但务必跟队：马匹驮装备、营地成熟、过河需要当地判断。可与雨崩串成完整梅里徒步季。' },
    highlights: { en: 'Nairidongka glacier camp, 5,200 m border pass, frozen twin lakes, zero crowds', zh: '奶日顶卡冰川营地,5200 米滇藏垭口,双湖,无人打扰' },
    image: hikingVideoThumb('BV1UDMXzqEaK'),
    videos: [
      {
        bvid: 'BV1UDMXzqEaK',
        title: { en: 'Meili North Slope — the Full Traverse, Day by Day', zh: '户外就是一场成年人的过家家｜徒步梅里北坡全程记录' },
        vloggerName: '山肆十四',
        duration: '13:47',
        viewsText: { en: '59k views', zh: '5.9万播放' },
        publishedAt: { en: 'Jul 2025', zh: '2025年7月' },
        note: { en: 'Warm, human daily record of the traverse — "outdoor playtime for adults", exactly the right spirit.', zh: '温暖的逐日全记录——"成年人的过家家"，说出了徒步的正确心态。' },
        featured: true,
      },
      {
        bvid: 'BV1JTDnY4EDF',
        title: { en: 'Meili North Slope Guide: 4 Days, 42 km, 5,200 m Pass', zh: '梅里北坡 四天三夜 42公里 徒步攻略' },
        vloggerName: '艾伦趣发现',
        duration: '11:07',
        viewsText: { en: '57k views', zh: '5.7万播放' },
        publishedAt: { en: 'Nov 2024', zh: '2024年11月' },
        note: { en: 'The most complete English-able route guide: trail conditions, food, gear, every camp.', zh: '最完整的路线攻略：路况、补给、装备与每一处营地。' },
        featured: false,
      },
    ],
    featured: false,
  },
  {
    slug: 'tengger-desert',
    name: { en: 'Tengger Desert Lake-Chain Crossing', zh: '腾格里沙漠五湖连穿' },
    region: { en: 'Alxa, Inner Mongolia', zh: '内蒙古 · 阿拉善' },
    tier: 'challenging',
    tagline: { en: 'Three days of dunes, salt lakes and the loudest stars you\'ll ever hear', zh: '三天沙丘、盐湖与这辈子听过最响的星空' },
    description: {
      en: 'China\'s classic desert trek: 30–50 km across the Tengger\'s singing dunes from lake to lake — Swan Lake, the solar-salt "Mirror of the Sky" and Moon Lake — camping on sand with a bonfire and a galaxy overhead. It\'s hot, it\'s sandy, it\'s the easiest "expedition" you\'ll ever do: local operators handle water, tents and camels from Zhongwei (a high-speed rail stop near Ningxia\'s Shapotou).',
      zh: '中国的经典沙漠徒步：从中卫出发，湖连湖横穿腾格里的鸣沙 30–50 公里——天鹅湖、"天空之镜"盐湖与月亮湖——沙地扎营、篝火加头顶银河。又热又沙，却是你能完成的最轻松的"远征"：当地俱乐部从中卫（宁夏沙坡头旁的高铁站）安排水、帐篷与骆驼。',
    },
    days: { en: '2–3 days', zh: '2–3 天' },
    distance: { en: '30–50 km', zh: '30–50 公里' },
    maxAltitude: { en: '1,300–1,500 m dunes', zh: '沙丘 1300–1500 米' },
    season: { en: 'Apr–May & Sep–Oct', zh: '4–5 月与 9–10 月' },
    permit: { en: 'No permit; do not go independent — navigation and water make an operator essential. Gaiters or rented sand boots save your socks.', zh: '无需许可证；切勿独行——找水与导航决定了必须跟队。绑腿或租沙靴能救你的袜子。' },
    highlights: { en: 'Milky Way from a dune crest, salt-lake mirror, Moon Lake oasis, camel trains', zh: '沙脊银河,盐湖天空之镜,月亮湖绿洲,驼队' },
    image: hikingVideoThumb('BV1Ux421k7We'),
    videos: [
      {
        bvid: 'BV1Ux421k7We',
        title: { en: 'Whatever You Do, Don\'t Go Watch the Galaxy in the Desert', zh: '千 万 别 去 沙 漠 看 银 河 ！【内蒙古-腾格里沙漠】' },
        vloggerName: '期末77',
        duration: '16:40',
        viewsText: { en: '1M views', zh: '103万播放' },
        publishedAt: { en: 'Mar 2024', zh: '2024年3月' },
        note: { en: 'The viral Tengger film — dune camping and astro footage that sells the whole idea in one screenshot.', zh: '爆款的腾格里视频：沙丘露营与星空摄影，一张截图就能种草。' },
        featured: true,
      },
      {
        bvid: 'BV1Gc7K6UEgz',
        title: { en: '32 km to the Heart of the Desert — Tengger Trek & Camp', zh: '徒步32km，我来到了沙漠之心！' },
        vloggerName: '呆呆不吃喵',
        duration: '31:08',
        viewsText: { en: '144k views', zh: '14.4万播放' },
        publishedAt: { en: 'Jun 2026', zh: '2026年6月' },
        note: { en: 'Two nights and 32 km in the sand sea with cinematic pacing — what a desert day actually feels like.', zh: '沙海两天两夜 32 公里的电影感记录——沙漠里的一天到底是什么体感。' },
        featured: false,
      },
    ],
    featured: false,
  },
  // ---- Expedition 探险 ----
  {
    slug: 'kailash-kora',
    name: { en: 'Mt. Kailash Kora', zh: '冈仁波齐转山' },
    region: { en: 'Ngari, Tibet', zh: '西藏 · 阿里' },
    tier: 'expedition',
    tagline: { en: '52 km around the holiest mountain on Earth — Buddhism, Hinduism, Jainism, Bon', zh: '绕行地球最神圣的山峰 52 公里——佛教、印度教、耆那教、苯教共同的神山' },
    description: {
      en: 'The pilgrimage four religions have walked for thousands of years: 52 km around the perfect pyramid of Kailash (6,638 m), starting at Darchen (4,600 m), sleeping at Drirapuk monastery, and crossing the 5,630 m Dolma La with prayer flags and pilgrims chanting om. Foreigners need a Tibet Travel Permit and must join an organised tour — but no other trek on Earth puts you in a stream of pilgrims from around the world.',
      zh: '四种宗教走了千年的朝圣路：围绕冈仁波齐（6638 米）完美的金字塔山体 52 公里，塔钦（4600 米）出发，宿止热寺，随经幡与诵经声翻越 5630 米卓玛拉山口。外国游客需入藏函并参加组团——但地球上没有第二条徒步线，能让你汇入世界各地的朝圣者人流。',
    },
    days: { en: '2–3 days (1 for heroes)', zh: '2–3 天（大神可一天）' },
    distance: { en: '52 km', zh: '52 公里' },
    maxAltitude: { en: '5,630 m Dolma La', zh: '卓玛拉山口 5630 米' },
    season: { en: 'May–Oct; Saga Dawa festival (May/Jun)', zh: '5–10 月；萨嘎达瓦节（5/6 月）' },
    permit: { en: 'Tibet Travel Permit + Alien\'s Travel Permit + border permits, arranged by a licensed Tibet tour operator with guide and driver — foreigners cannot travel Tibet independently. Acclimatize 2–3 days in Lhasa first.', zh: '入藏函+外国人旅行证+边防证，由持牌西藏旅行社代办，配导游与司机——外国人在西藏不可自由行。请先在拉萨适应 2–3 天。' },
    highlights: { en: 'Dolma La pass with prayer flags, Drirapuk monastery face-on view, pilgrims from four faiths, Lake Manasarovar extension', zh: '卓玛拉经幡垭口,止热寺正面山容,四教朝圣者同路,可延伸玛旁雍错' },
    image: hikingVideoThumb('BV1YyCCBWEa3'),
    videos: [
      {
        bvid: 'BV1YyCCBWEa3',
        title: { en: 'Links: 52 km Around Kailash — Why Pilgrims Walk', zh: 'Links｜终于来到"世界中心"！徒步52公里，我找到了冈仁波齐转山的意义' },
        vloggerName: 'Linksphotograph',
        duration: '22:37',
        viewsText: { en: '4M views', zh: '395万播放' },
        publishedAt: { en: 'Nov 2025', zh: '2025年11月' },
        note: { en: 'A top Chinese photographer\'s kora essay — the most beautifully shot and most thoughtful Kailash film on Bilibili.', zh: '知名摄影 UP 主的转山随笔——B 站画面最美、也最有思考的冈仁波齐影像。' },
        featured: true,
      },
      {
        bvid: 'BV1szZJB6Ebv',
        title: { en: '5,000 km to the King of Sacred Mountains', zh: '跨越5000公里，到神山之王！冈仁波齐还愿！' },
        vloggerName: '东尼ookii',
        duration: '22:41',
        viewsText: { en: '1.7M views', zh: '168万播放' },
        publishedAt: { en: 'Feb 2026', zh: '2026年2月' },
        note: { en: 'The road-trip-plus-kora epic — why Chinese travelers cross the country for this mountain, and the emotional payoff at the top.', zh: '自驾+转山的史诗：中国人为何跨越五千公里来见这座山，以及垭口之上的情绪释放。' },
        featured: false,
      },
      {
        bvid: 'BV16r4y1R7zy',
        title: { en: 'Circling Kailash With a Cat — 54 km in 2 Days', zh: '带小猫咪转山冈仁波齐，54公里，耗时两天' },
        vloggerName: '山肆十四',
        duration: '31:58',
        viewsText: { en: '132k views', zh: '13.2万播放' },
        publishedAt: { en: 'Aug 2023', zh: '2023年8月' },
        note: { en: 'Yes, a cat completes the kora — plus a stray-dog escort and night hiking between monasteries.', zh: '真的有猫完成了转山——还有流浪狗护送与寺间夜路。' },
        featured: false,
      },
    ],
    featured: true,
  },
  {
    slug: 'wusun-trail',
    name: { en: 'Wusun Ancient Trail', zh: '乌孙古道' },
    region: { en: 'Ili–Aksu, Xinjiang', zh: '新疆 · 伊犁至阿克苏' },
    tier: 'expedition',
    tagline: { en: 'The 2,000-year-old Silk Road crossing of the Tianshan, ending at Heaven Lake', zh: '两千年丝路穿越天山，终点天堂湖' },
    description: {
      en: 'One of China\'s "top ten" treks and its most cinematic: 6 days and ~110 km from Qiongkushitai grassland village south over the 3,900 m Qiong Daban, through gorges and dozens of glacier-river fords, to the Black-English-Hill exit in Aksu — with the bucket-list moment at Heaven Lake, a turquoise cirque you earn with your feet. Commercial teams with horses are standard; early-season meltwater makes fords serious.',
      zh: '中国"十大"徒步线之一，也是最具电影感的一条：从琼库什台草原村庄出发，6 天约 110 公里向南翻越 3900 米琼达坂，穿峡谷、数十次蹚过冰川融水，抵阿克苏黑英山出口——而全程的高光时刻，是用双脚换来的绿松石冰斗天堂湖。标配是带马帮的商业队；早季融水期过河相当严肃。',
    },
    days: { en: '6 days, 5 nights', zh: '6 天 5 晚' },
    distance: { en: '~110 km', zh: '约 110 公里' },
    maxAltitude: { en: '~3,900 m passes', zh: '垭口约 3900 米' },
    season: { en: 'Jun–Sep window only', zh: '仅 6–9 月窗口期' },
    permit: { en: 'No special permit, but join an organised team: river fords, weather and logistics are genuine expedition scale. Horse support is normal and worth it. Carry passport at all times in Xinjiang.', zh: '无特殊许可证，但务必跟队：过河、天气与后勤都是真正的远征级。雇马很常见也值得。在新疆请全程携带护照。' },
    highlights: { en: 'Heaven Lake, glacier-river fords, Tianshan gorge systems, Silk Road history', zh: '天堂湖,冰川河过河,天山峡谷群,丝路古道史' },
    image: hikingVideoThumb('BV1xtNw68Euz'),
    videos: [
      {
        bvid: 'BV1xtNw68Euz',
        title: { en: '"This Is My Wusun Trail." — the Cinematic Cut', zh: '"这是我的乌孙古道。"' },
        vloggerName: '我名字ahua被人用了',
        duration: '6:41',
        viewsText: { en: '3.2M views', zh: '321万播放' },
        publishedAt: { en: 'Jul 2026', zh: '2026年7月' },
        note: { en: 'Six minutes that made half of Bilibili want to trek — the definitive Wusun mood piece.', zh: '让半个 B 站都想徒步的六分钟——乌孙的定调之作。' },
        featured: true,
      },
      {
        bvid: 'BV1t7s4eCEGA',
        title: { en: 'Wusun Trail Guide: 6 Days, 120 km, Independent Heavy-Pack', zh: '新疆 乌孙古道 6天5夜 自主重装 120KM 正穿 保姆级徒步攻略' },
        vloggerName: '艾伦趣发现',
        duration: '16:40',
        viewsText: { en: '521k views', zh: '52.1万播放' },
        publishedAt: { en: 'Sep 2024', zh: '2024年9月' },
        note: { en: 'The most complete independent guide: fords, camps, daban crossings, and how to hire horses without a commercial group.', zh: '最完整的自主攻略：过河点、营地、达坂翻越，以及如何脱离商业队雇马。' },
        featured: false,
      },
      {
        bvid: 'BV1FhbDzKEDU',
        title: { en: 'Wusun Trail 4K: Xinjiang\'s Cathedral of Treks', zh: '【4K】新疆殿堂级徒步路线 一眼便是天堂人间 | 乌孙古道徒步全纪录' },
        vloggerName: '小V的奇幻旅程',
        duration: '47:14',
        viewsText: { en: '413k views', zh: '41.3万播放' },
        publishedAt: { en: 'Jul 2025', zh: '2025年7月' },
        note: { en: 'Same channel as the Yubeng 4K — the full 6-day film including Heaven Lake in every light.', zh: '与雨崩 4K 同一频道——完整六天全片，天堂湖的每种光线都在。' },
        featured: false,
      },
    ],
    featured: false,
  },
]

// ===== 聚光灯视频（页首引流位：外国人徒步中国名场面） =====

export const hikingSpotlight = fillLocaleFallbacks({
  bvid: 'BV1v1421t7ZS',
  title: {
    en: '37 km up Emei Shan With My Foreign Friend Kerry',
    zh: '带外国朋友37km爬峨眉山！kerry：中国的山再也不爬了',
  },
  vloggerName: '超Carry的柴西',
  duration: '11:00',
  viewsText: { en: '2.3M views', zh: '233万播放' },
  publishedAt: { en: 'Aug 2024', zh: '2024年8月' },
  note: {
    en: 'Kerry came for a casual hike. Eleven hours of stairs later he swore off Chinese mountains forever — 2.3 million viewers loved every step. The perfect taste of what trekking China feels like.',
    zh: 'Kerry 本来只是想随便爬个山。十一小时台阶之后，他发誓再也不爬中国的山了——233 万观众全程围观。徒步中国是什么体感，看这条就够了。',
  },
} as HikingVideo)

// ===== 组装与访问函数 =====

let _hikingId = 0

const hikingRoutes: HikingRoute[] = rawHikingRoutes.map(r => ({ ...r, id: ++_hikingId }))

// 合并各语言翻译包（数组按索引对齐），并为缺失语言填充英文兜底
for (const [lang, pack] of Object.entries(contentPacks)) {
  hikingRoutes.forEach((r, i) => mergeLanguagePack(r, pack.hikingRoutes?.[i], lang, `hikingRoutes[${i}]`))
}
fillLocaleFallbacks(hikingRoutes)

/** 阶梯顺序（页面筛选与排序使用） */
export const HIKING_TIER_ORDER: HikingTier[] = ['beginner', 'classic', 'challenging', 'expedition']

// 全部徒步路线（按阶梯排序，featured 优先）
export function getHikingRoutes(): HikingRoute[] {
  const tierRank = (t: HikingTier) => HIKING_TIER_ORDER.indexOf(t)
  return [...hikingRoutes].sort(
    (a, b) =>
      (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      || tierRank(a.tier) - tierRank(b.tier)
      || a.id - b.id,
  )
}

// 按难度阶梯筛选
export function getHikingRoutesByTier(tier: HikingTier): HikingRoute[] {
  return getHikingRoutes().filter(r => r.tier === tier)
}

// 编辑精选
export function getFeaturedHikingRoutes(): HikingRoute[] {
  return getHikingRoutes().filter(r => r.featured)
}

// 根据 slug 获取路线
export function getHikingRouteBySlug(slug: string): HikingRoute | null {
  return hikingRoutes.find(r => r.slug === slug) || null
}
