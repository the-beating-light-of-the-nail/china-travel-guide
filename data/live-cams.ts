// china-live-cams 直播页(data/travel-data.ts 的 china-live-cams guide)嵌入层直播流数据
// ---------------------------------------------------------------
// 嵌入层只收「官方频道 YouTube 24/7 流」——海外可看、嵌入合规、地址最稳。
// videoId 与封面为 2026-10-01 快照(oEmbed 存活验证通过)。YouTube 直播链接会
// 轮换失效,巡查规则(与投稿/状态巡查同节奏,记台账):
//   curl -s "https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D<id>&format=json"
// 返回 401/404 即流已停,去 @iPandaChannel / @cgtn 的 streams 页取最新直播 ID,
// 并同步重下封面:hqdefault.jpg → public/images/live-cams/<id>.jpg(>10KB 为有效)。
// 目录层(livechina.cctv.com 大陆限定慢直播)写在 guide 正文的表格里,不在此维护。
// ---------------------------------------------------------------
import type { L } from './localize'

export interface LiveCamEntry {
  /** YouTube 直播 videoId(官方频道,全球可看) */
  videoId: string
  /** 本地封面快照 public/images/live-cams/<videoId>.jpg */
  cover: string
  title: L
  /** 归属频道/机构(含 official 标注) */
  source: L
  /** 一句话看点 + 最佳观看时段(北京时间) */
  note: L
}

export const chinaLiveCams: LiveCamEntry[] = [
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
]
