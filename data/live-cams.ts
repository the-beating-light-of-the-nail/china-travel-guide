// china-live-cams 直播页(data/travel-data.ts 的 china-live-cams guide)直播流数据
// ---------------------------------------------------------------
// 两种卡:
//  ① YouTube 官方 24/7 流(videoId)——海外可看、嵌入合规、全球分发;
//  ② 官方页外链卡(externalUrl)——央视「直播中国」与景区官网入口。
//     直播中国页面全球可载入(2026-10-01 九国 check-host 验证),视频流由大陆
//     CDN 分发,海外播放可能受限;景区官网(泰山/峨眉山/九寨沟)海外实测
//     TLS 握手失败,仅大陆可访问(mainlandOnly 徽标)。泰山/峨眉山仅 http 可达。
// videoId 与封面为 2026-10-01 快照(oEmbed 存活验证通过)。YouTube 直播链接会
// 轮换失效,巡查规则(与投稿/状态巡查同节奏,记台账):
//   curl -s "https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D<id>&format=json"
// 返回 401/404 即流已停,去 @iPandaChannel / @cgtn 的 streams 页取最新直播 ID,
// 并同步重下封面:YouTube 用 img.youtube.com/vi/<id>/hqdefault.jpg 老图床域名
// (本机 i.ytimg.com 不通、img.youtube.com 通,2026-10-01 实测);央视卡封面用
// livechina 首页卡片 data-echo 图或 LIVE 页内 scene/live/pic 图(og:image 是
// 平台分类默认图,勿用);景区卡封面从官网取(下载后务必肉眼验图,泰山管委会
// 首页第一张竟是二维码广告图)。峨眉山官网是 SPA 无图可抓,封面待补。
// 大陆限定流的 LIVE 编号来自直播中国在列名单(2026-10-01),失效时去
// livechina.cctv.com 首页核对最新编号。
// ---------------------------------------------------------------
import type { L } from './localize'

export interface LiveCamEntry {
  /** YouTube 直播 videoId(官方频道,全球可看)——与 externalUrl 二选一 */
  videoId?: string
  /** 大陆限定流的官方页入口(mainlandOnly 时点击外链打开) */
  externalUrl?: string
  /** 景区自运营(区别于央视渠道;仍属大陆限定,渲染为第三组) */
  scenicArea?: boolean
  /** 本地封面快照 public/images/live-cams/<videoId>.jpg(无则样式占位) */
  cover?: string
  /** 大陆限定流:需大陆网络,海外 302 */
  mainlandOnly?: boolean
  title: L
  /** 归属频道/机构(含 official 标注) */
  source: L
  /** 一句话看点 + 最佳观看时段/旅行决策价值 */
  note: L
}

/** ① 全球可看:官方 YouTube 24/7 流 */
export const globalLiveCams: LiveCamEntry[] = [
  {
    videoId: 'gnEuhfyZPPQ',
    cover: '/images/live-cams/gnEuhfyZPPQ.jpg',
    title: { en: 'Panda 24/7 HD Live at Chengdu Panda Base', zh: '成都大熊猫繁育研究基地 24/7 高清直播' },
    source: { en: 'iPanda (CCTV\'s panda channel) · official', zh: '熊猫频道 iPanda(央视网)· 官方' },
    note: {
      en: 'The base\'s main outdoor enclosures, from iPanda\'s 28-camera network across five zones. Pandas are most active around the morning feed — roughly 08:30–10:30 Beijing time — and again in late afternoon; midday is nap o\'clock.',
      zh: '基地主要户外活动区,来自熊猫频道覆盖五大区域的 28 个机位。熊猫在清晨喂食前后(北京时间约 8:30–10:30)和傍晚前最活跃,正午基本在睡觉。',
    },
  },
  {
    videoId: 'GOhUbfoMZ5E',
    cover: '/images/live-cams/GOhUbfoMZ5E.jpg',
    title: { en: 'He Hua & Her Friends: Cub Enclosure Live', zh: '花花和朋友们:幼崽围栏直播' },
    source: { en: 'iPanda (CCTV\'s panda channel) · official', zh: '熊猫频道 iPanda(央视网)· 官方' },
    note: {
      en: 'The cub enclosure starring He Hua ("Hua Hua"), the base\'s superstar — famously round, unhurried, and endlessly photographed. On-site, expect a real queue at her enclosure; here the front row is free.',
      zh: '成都基地顶流「花花」所在的幼崽围栏——出了名的圆、慢、稳。现场看花花要排长队,这里的第一排免费。',
    },
  },
  {
    videoId: 'LJgXwC-AKu8',
    cover: '/images/live-cams/LJgXwC-AKu8.jpg',
    title: { en: 'The 24/7 China Travel Experience', zh: '24/7 中国旅行慢直播' },
    source: { en: 'CGTN · official', zh: 'CGTN(中国国际电视台)· 官方' },
    note: {
      en: 'CGTN\'s rolling slow-TV feed of scenic locations across China — mountains, old towns, rivers. A good default "window into China" to leave running in a background tab.',
      zh: 'CGTN 的轮播式景观慢直播:山川、古城、江河。适合挂在后台标签页,当一扇「中国之窗」。',
    },
  },
  {
    videoId: 'jFCx6E6PZGo',
    cover: '/images/live-cams/jFCx6E6PZGo.jpg',
    title: { en: 'Mount Siguniang Live', zh: '四姑娘山直播' },
    source: { en: 'CGTN · official', zh: 'CGTN(中国国际电视台)· 官方' },
    note: {
      en: 'The snow peaks of Siguniangshan National Park in western Sichuan — its highest, Yaomei, stands 6,248 m. Best light early morning; the range is also a serious trekking destination reachable from Chengdu.',
      zh: '川西四姑娘山国家公园的雪山实景,最高峰幺妹峰海拔 6,248 米。清晨光线最好;这里也是从成都出发的徒步胜地。',
    },
  },
  {
    videoId: 'lCdLh_n1cI0',
    cover: '/images/live-cams/lCdLh_n1cI0.jpg',
    title: { en: 'Zhangjiajie: Six Wonders Pavilion Live', zh: '张家界六奇阁直播' },
    source: { en: 'CGTN · official', zh: 'CGTN(中国国际电视台)· 官方' },
    note: {
      en: 'Live view from the Six Wonders Pavilion inside Zhangjiajie National Forest Park — the sandstone pillars that inspired Avatar\'s floating peaks. CGTN numbers these streams by "episode," so the link rotates: if it has ended, the current one sits on CGTN\'s live tab.',
      zh: '张家界国家森林公园六奇阁机位——《阿凡达》悬浮山原型的砂岩石柱群。CGTN 的这类流按「集」轮换,链接失效时去 CGTN 直播页取当前一路。',
    },
  },
]

/** ② 大陆限定:央视「直播中国」官方慢直播(海外 302,卡片为官方页外链) */
export const mainlandLiveCams: LiveCamEntry[] = [
  {
    externalUrl: 'https://livechina.cctv.com/live_zb/LIVE3181.html',
    cover: '/images/live-cams/livechina-LIVE3181.jpg',
    title: { en: 'Gubei Water Town (Beijing)', zh: '古北水镇(北京)' },
    source: { en: 'CCTV Live China · official', zh: '央视「直播中国」· 官方' },
    note: {
      en: 'A restored water town at the foot of the Simatai Great Wall, lit up at night — check whether the evening visit is worth the ticket before you go.',
      zh: '司马台长城脚下的水镇,夜景亮灯。出发前先看看夜游值不值票价。',
    },
  },
  {
    externalUrl: 'https://livechina.cctv.com/live_zb/LIVE2768.html',
    cover: '/images/live-cams/livechina-LIVE2768.jpg',
    title: { en: 'Huanghuacheng Water Great Wall (Beijing)', zh: '黄花城水长城(北京)' },
    source: { en: 'CCTV Live China · official', zh: '央视「直播中国」· 官方' },
    note: {
      en: 'The wall crumbling into a reservoir — a preview of a far quieter wall than Badaling or Mutianyu.',
      zh: '长城没入水库的画面——比八达岭、慕田峪安静得多的长城段的实地预览。',
    },
  },
  {
    externalUrl: 'https://livechina.cctv.com/live_zb/LIVE3193.html',
    cover: '/images/live-cams/livechina-LIVE3193.jpg',
    title: { en: 'Leshan "Sleeping Buddha" (Sichuan)', zh: '乐山「睡佛」(四川)' },
    source: { en: 'CCTV Live China · official', zh: '央视「直播中国」· 官方' },
    note: {
      en: 'The hill-ridge silhouette reclining across the river from the 71-m Giant Buddha — see the river perspective before you boat or climb.',
      zh: '隔江山体轮廓卧佛,对面即 71 米乐山大佛。坐船或登山前先看江面视角。',
    },
  },
  {
    externalUrl: 'https://livechina.cctv.com/live_zb/LIVE4228.html',
    cover: '/images/live-cams/livechina-LIVE4228.jpg',
    title: { en: 'Wuliangshan Cherry Valley (Yunnan)', zh: '无量山樱花谷(云南)' },
    source: { en: 'CCTV Live China · official', zh: '央视「直播中国」· 官方' },
    note: {
      en: 'Winter cherry blossom in the tea hills, blooming late November into December — time a winter Yunnan loop around it.',
      zh: '茶山间的冬樱花,11 月底至 12 月盛开——冬季云南环线可卡着花期安排。',
    },
  },
  {
    externalUrl: 'https://livechina.cctv.com/live_zb/LIVE3402.html',
    cover: '/images/live-cams/livechina-LIVE3402.jpg',
    title: { en: 'Jianshui Old Town (Yunnan)', zh: '建水古城(云南)' },
    source: { en: 'CCTV Live China · official', zh: '央视「直播中国」· 官方' },
    note: {
      en: 'Ming-era town and the seventeen-arch Double Dragon Bridge — an atmosphere check for the Kunming–Jianshui detour.',
      zh: '明代古城与十七孔双龙桥——昆明—建水绕行前的氛围预览。',
    },
  },
  {
    externalUrl: 'https://livechina.cctv.com/live_zb/LIVE3170.html',
    cover: '/images/live-cams/livechina-LIVE3170.jpg',
    title: { en: 'Jiqiao Bridge (Harbin)', zh: '霁虹桥(哈尔滨)' },
    source: { en: 'CCTV Live China · official', zh: '央视「直播中国」· 官方' },
    note: {
      en: 'A century-old rail bridge in China\'s snow city — check the snow before ice-festival day trips.',
      zh: '冰雪之城的百年铁路桥——冰雪大世界行程前先看雪况。',
    },
  },
  {
    externalUrl: 'https://livechina.cctv.com/live_zb/LIVE4261.html',
    cover: '/images/live-cams/livechina-LIVE4261.jpg',
    title: { en: 'Dai Village (Xishuangbanna)', zh: '傣族古寨(西双版纳)' },
    source: { en: 'CCTV Live China · official', zh: '央视「直播中国」· 官方' },
    note: {
      en: 'Daily life in a thousand-year Dai village — real village texture before the staged Dai-garden shows.',
      zh: '千年傣寨的日常——在傣族园表演之外,看看真实村寨的样子。',
    },
  },
  {
    externalUrl: 'https://livechina.cctv.com/live_zb/LIVE5048.html',
    cover: '/images/live-cams/livechina-LIVE5048.jpg',
    title: { en: 'Futian Mangroves (Shenzhen)', zh: '福田红树林(深圳)' },
    source: { en: 'CCTV Live China · official', zh: '央视「直播中国」· 官方' },
    note: {
      en: 'Protected wetland on the Shenzhen–Hong Kong border; birders, migrants pass through roughly October to April.',
      zh: '深港边界湿地保护区。观鸟人注意:候鸟约 10 月至次年 4 月经过。',
    },
  },
]

/** ③ 景区自运营:官网/公众号入口(景区官方自己的直播,非央视渠道) */
export const scenicLiveCams: LiveCamEntry[] = [
  {
    mainlandOnly: true,
    scenicArea: true,
    externalUrl: 'https://tsgw.taian.gov.cn/',
    cover: '/images/live-cams/scenic-taishan.jpg',
    title: { en: 'Mount Tai Slow-TV ("Smart Taishan")', zh: '泰山「智慧泰山」慢直播' },
    source: { en: 'Mount Tai administrative committee · official', zh: '泰山风景名胜区管委会 · 官方' },
    note: {
      en: 'Eight HD points run by the mountain itself — sunrise, sea of clouds, rime ice, sunset. The summit sunrise is a weather bet; check before the pre-dawn climb. Entrance: the committee\'s official site and the scenic area\'s WeChat account.',
      zh: '景区自建的 8 处高清点位:日出、云海、雾凇、落日。山顶日出是一场天气赌局,凌晨登山前先看一眼。入口:管委会官网 tsgw.taian.gov.cn 与景区公众号。',
    },
  },
  {
    mainlandOnly: true,
    scenicArea: true,
    externalUrl: 'https://www.jiuzhai.com/',
    cover: '/images/live-cams/scenic-jiuzhai.jpg',
    title: { en: 'Cloud Jiuzhaigou', zh: '九寨沟「云游九寨」' },
    source: { en: 'Jiuzhaigou administration · self-run', zh: '九寨沟管理局 · 自运营' },
    note: {
      en: 'Live views plus real-time temperatures from inside the valley — the difference between picking the right and wrong of your permitted days. WeChat account 九寨沟管理局 → menu 云游九寨, or the official site.',
      zh: '谷内实时画面与实时气温——在仅有的两个入园日里挑对那一天最直接的依据。微信公众号「九寨沟管理局」→ 菜单「云游九寨」,或官网入口。',
    },
  },
  {
    mainlandOnly: true,
    scenicArea: true,
    externalUrl: 'http://www.ems517.com/',
    title: { en: 'Golden Summit Live', zh: '峨眉山「云端金顶」' },
    source: { en: 'Mount Emei scenic area · self-run', zh: '峨眉山景区 · 自运营' },
    note: {
      en: 'The Golden Summit runs its own weather system — check the live summit view before committing to the pre-dawn push. WeChat account 峨眉山景区, or the official travel site.',
      zh: '金顶自成一套天气系统——凌晨冲顶前先看金顶实时画面。微信公众号「峨眉山景区」,或官网入口。',
    },
  },
]

/** guide 引用的合并数组([slug].vue 按 mainlandOnly/scenicArea 分三组渲染) */
export const chinaLiveCams: LiveCamEntry[] = [...globalLiveCams, ...mainlandLiveCams, ...scenicLiveCams]
