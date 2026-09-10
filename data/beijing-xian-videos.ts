// 北京→西安 高铁串联指南（beijing-to-xian-train-guide）配套视频架
// ---------------------------------------------------------------
// 播放量为 2026-09-09 快照（scripts/coldstart/out/batch2-details.json），
// 采集自 scripts/coldstart/bili-search.mjs search "北京到西安高铁"。
// ---------------------------------------------------------------
import type { FermentedVideoGroup } from './fermented-videos'

export const railVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'rail-overnight',
    heading: { en: 'The Classic Overnight Way: The Z20 Express', zh: '经典的夜行方式：Z20 直达特快' },
    videos: [
      {
        bvid: 'BV1Ut421P77D',
        cover: 'https://i1.hdslb.com/bfs/archive/3908a861ff545f197110f2bc46acbbd4ec13e1bd.jpg',
        title: { en: 'The Northwest\'s Flagship Train: 1,200 km to Beijing Without a Single Stop', zh: '西北第一火车！1200km一站直达北京！西安局王牌Z20次体验' },
        vloggerName: '小南微视角',
        duration: '8:14',
        viewsText: { en: '52K views', zh: '5.2万播放' },
        publishedAt: { en: 'Apr 2024', zh: '2024年4月' },
        note: {
          en: 'A rail enthusiast rides the Xi\'an Railway Bureau\'s flagship Z20 — the 1,200-km overnight express that reaches Beijing without calling at a single station. Soft-sleeper cabins, morning arrival, and a rolling lesson in why Chinese train culture has fans.',
          zh: '铁路爱好者体验西安局的王牌 Z20——1200 公里夕发朝至、中途一站不停的直达特快。软卧车厢、清晨抵京，顺便讲明白中国的火车文化为什么有粉丝。',
        },
        featured: true,
      },
    ],
  },
]
