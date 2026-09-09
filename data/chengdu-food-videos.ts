// 成都美食系列 guide 配套「眼见为实」B 站视频架
// ---------------------------------------------------------------
// 供 chengdu-airport-food-guide / halal-food-in-chengdu /
// chengdu-vs-chongqing-food / chengdu-food-guide（增强）四个页面挂载，
// 结构与 data/fermented-videos.ts 的 FermentedVideoGroup 同构。
// 封面存于 /images/vlogs/<bvid>.jpg，点击外链 B 站（新窗口），不嵌 iframe。
// 播放量为抓取日快照（机场组：2026-09-09，来自
// scripts/coldstart/bili-search.mjs search/detail/comments）。
// 注意：数组顺序即翻译包索引对齐顺序，勿随意调换。
// ---------------------------------------------------------------
import type { FermentedVideoGroup } from './fermented-videos'

export function chengduFoodVideoUrl(bvid: string): string {
  return `https://www.bilibili.com/video/${bvid}`
}

export function chengduFoodVideoThumb(bvid: string): string {
  return `/images/vlogs/${bvid}.jpg`
}

// ===== 天府/双流机场美食生存指南 =====
export const airportVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'tfu-inside',
    heading: { en: 'Eating Inside Tianfu Airport (TFU)', zh: '天府机场航站楼里怎么吃' },
    videos: [
      {
        bvid: 'BV15j411v7LS',
        title: {
          en: 'Almost Missed My Flight Eating at Tianfu Airport — One More Bite!',
          zh: '差点没吃上成都天府机场！还好换登机口了！我还能再吃一口！',
        },
        vloggerName: '密子君',
        duration: '8:59',
        viewsText: { en: '560K views', zh: '56.0万播放' },
        publishedAt: { en: 'Oct 2023', zh: '2023年10月' },
        note: {
          en: 'One of China\'s most famous food vloggers films a full sit-down Sichuan meal inside the terminal — and nearly misses boarding when her gate changes. The practical lesson: TFU is enormous, build in walking time.',
          zh: '头部吃播密子君在航站楼里正儿八经吃了一顿川菜，结果换登机口差点误机。教训很实在：天府机场巨大，吃饭要预留走路时间。',
        },
        featured: true,
      },
      {
        bvid: 'BV1vD4y1f7dJ',
        title: {
          en: 'How to Eat a ¥10 Meal at Chengdu Tianfu Airport',
          zh: '第一次去成都天府机场怎么花10元吃一顿饭',
        },
        vloggerName: '吃遍东西',
        duration: '4:55',
        viewsText: { en: '77K views', zh: '7.7万播放' },
        publishedAt: { en: 'Jan 2024', zh: '2024年1月' },
        note: {
          en: 'A budget traveler proves the ¥10 airport meal exists: convenience-store bento and rice balls are priced the same as downtown, because the price is printed on the package.',
          zh: '实测在机场花 10 元吃饱：便利店盒饭、饭团和市区同价——因为价格直接印在包装上，机场店也加不了价。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'tfu-nearby',
    heading: { en: 'Near the Airport: Where the Airport Workers Eat', zh: '机场周边：地勤和机组去哪吃' },
    videos: [
      {
        bvid: 'BV1SKFkzEEen',
        title: {
          en: 'The \'Fly Restaurant\' Next to Tianfu Airport — Cheap, Huge Portions',
          zh: '成都天府机场旁"顶火苍蝇馆子"，隐藏的民间高手，便宜量足',
        },
        vloggerName: '馒头叔叔就是大馒头',
        duration: '6:27',
        viewsText: { en: '94K views', zh: '9.4万播放' },
        publishedAt: { en: 'Feb 2026', zh: '2026年2月' },
        note: {
          en: 'A hole-in-the-wall master cook minutes from the runway, where catching-a-flight regulars go for cheap, generous Sichuan home cooking. The comment section adds a 7-year airport worker\'s full list.',
          zh: '跑道边上的民间高手苍蝇馆子，赶飞机的人来这里吃便宜量足的川味家常菜。评论区还有一位 7 年机场人的完整私藏清单。',
        },
        featured: true,
      },
      {
        bvid: 'BV1St4y1c7ft',
        title: {
          en: 'No More McDonald\'s: The Staff-Canteen Sichuan Kitchen by the Airport',
          zh: '在成都机场终于不用吃麦当当了，制服小姐姐的二食堂',
        },
        vloggerName: '馒头叔叔就是大馒头',
        duration: '4:42',
        viewsText: { en: '84K views', zh: '8.4万播放' },
        publishedAt: { en: 'Oct 2022', zh: '2022年10月' },
        note: {
          en: 'The canteen where uniformed airline crews actually eat (Shuangliu, Jiichang East 2nd Rd): douhua beef pot ¥48, rice ¥2. Avoid the staff lunch rush and you eat like crew for ¥30.',
          zh: '双流机场东二路上空乘制服小姐姐们的"二食堂"：豆花牛肉 48 元、米饭 2 元。避开饭点，30 元就能吃得像机组一样好。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'tfu-layover',
    heading: { en: 'Layover & Overnight Survival', zh: '转机过夜生存指南' },
    videos: [
      {
        bvid: 'BV1pRNBeEEh4',
        title: { en: '12-Hour Layover: The Overnight-at-the-Airport Guide', zh: '转机12h，机场过夜指南！' },
        vloggerName: '小小酱臭美日记',
        duration: '4:30',
        viewsText: { en: '101K views', zh: '10.1万播放' },
        publishedAt: { en: 'Feb 2025', zh: '2025年2月' },
        note: {
          en: 'A solo female traveler\'s 12-hour overnight at TFU: sleeping pods, quiet corners, and the cost math. The comments add the local alternative — shuttle hotels near the airport from ~¥100.',
          zh: '独行女生在天府机场的 12 小时过夜实录：太空舱、安静角落、价格账。评论区补充了本地方案——机场周边免费接送机酒店一百出头一晚。',
        },
        featured: true,
      },
    ],
  },
  {
    id: 'ctu-street',
    heading: { en: 'Flying Through Shuangliu (CTU)', zh: '双流机场怎么样' },
    videos: [
      {
        bvid: 'BV1xZ421H7mQ',
        title: { en: 'Chengdu Shuangliu Airport\'s Snack Street — Crayfish at ¥18 per 500g', zh: '成都双流机场的小吃街！18一斤的小龙虾！' },
        vloggerName: '吃货圆圈圈',
        duration: '8:00',
        viewsText: { en: '169K views', zh: '16.9万播放' },
        publishedAt: { en: 'Jun 2024', zh: '2024年6月' },
        note: {
          en: 'Inside CTU\'s terminal snack street: crayfish sold by weight, noodle stalls and the legendary luosifen counter that regulars line up for. Proof the older airport eats surprisingly well.',
          zh: '双流机场航站楼里的小吃街：按斤卖的小龙虾、面条档口，还有让常旅客连去六天都买不到的螺蛳粉。老机场的伙食意外地能打。',
        },
        featured: true,
      },
    ],
  },
]
