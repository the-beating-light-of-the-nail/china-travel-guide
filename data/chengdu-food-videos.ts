// 成都美食系列 guide 配套「眼见为实」B 站视频架
// ---------------------------------------------------------------
// 供 chengdu-airport-food-guide / halal-food-in-chengdu /
// chengdu-vs-chongqing-food / chengdu-food-guide（增强）四个页面挂载，
// 结构与 data/fermented-videos.ts 的 FermentedVideoGroup 同构。
// 【摆放位置】视频组默认渲染在文章尾部；在 guide 正文的 HTML 里写
//   [[videos:<组id>]]（如 [[videos:tfu-inside]]）
// 即可让该组内联渲染在标记处（推荐放在其主题章节末尾，让读者扫读时
// 顺手看到）。en/zh 两个正文串都要插同一标记；未被标记引用的组仍在
// 尾部兜底渲染，全部内联则尾部架自动隐藏。
// 播放量为抓取日快照（机场组：2026-09-09，来自
// scripts/coldstart/bili-search.mjs search/detail/comments）。
// 注意：数组顺序即翻译包索引对齐顺序，勿随意调换。
// ---------------------------------------------------------------
import type { FermentedVideoGroup } from './fermented-videos'

export function chengduFoodVideoUrl(bvid: string): string {
  return `https://www.bilibili.com/video/${bvid}`
}

// ===== 天府/双流机场美食生存指南 =====
export const airportVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'tfu-inside',
    heading: { en: 'Eating Inside Tianfu Airport (TFU)', zh: '天府机场航站楼里怎么吃' },
    videos: [
      {
        bvid: 'BV15j411v7LS',
        cover: 'https://i2.hdslb.com/bfs/archive/a51243f848d84eead8f0a373dccba5d452d41728.jpg',
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
        cover: 'https://i2.hdslb.com/bfs/archive/daa01fea4747f63cca0ecb9d56d365a1d452906a.jpg',
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
        cover: 'https://i0.hdslb.com/bfs/archive/3538ffaaeaac036ba3bf0fc8b6554da1f86eac50.jpg',
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
        cover: 'https://i0.hdslb.com/bfs/archive/3aaac2ea847604a0ea744a1550da1d6db1db59e3.jpg',
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
        cover: 'https://i2.hdslb.com/bfs/archive/c3e5b8d8d722a5b42d374fcd927677c8a447ada4.jpg',
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
        cover: 'https://i1.hdslb.com/bfs/archive/ce293aa398d822ea43bd8e5e130132225bfa40ac.jpg',
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

// ===== 成都清真美食指南 =====
export const halalVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'halal-chengdu',
    heading: { en: 'Chengdu\'s Sichuan-Style Halal Kitchens', zh: '川味清真菜：成都的全牛馆子' },
    videos: [
      {
        bvid: 'BV1knVw6CEkP',
        cover: 'https://i0.hdslb.com/bfs/archive/7620b107ba8424b99726d4de8893893dbb06fa6c.jpg',
        title: { en: 'A Food Journey — A Chengdu Hui Restaurant', zh: '美食之旅——成都回民餐馆' },
        vloggerName: '王迅',
        duration: '4:59',
        viewsText: { en: '227K views', zh: '22.7万播放' },
        publishedAt: { en: 'May 2026', zh: '2026年5月' },
        note: {
          en: 'Sichuan-born actor Wang Xun — a Chengdu local — takes viewers to the Hui-run restaurant he has eaten at for years. The most-watched recent window into the city\'s halal food scene.',
          zh: '川籍演员王迅带观众去他吃了多年的回民餐馆——观察成都清真饮食圈最近的一扇高播放量窗口。',
        },
        featured: true,
      },
      {
        bvid: 'BV1zjUCB3EJv',
        cover: 'https://i0.hdslb.com/bfs/archive/7c7d360d8c8c7004968e77063427de44c2f73dcb.jpg',
        title: {
          en: 'First Taste of Sichuan-Style Halal — The Boss Handed Me a Basin for Rice',
          zh: '【逛吃成都】第一次吃川味清真菜！老板给了我一个盆…',
        },
        vloggerName: '逛吃小猪猪',
        duration: '7:19',
        viewsText: { en: '97K views', zh: '9.7万播放' },
        publishedAt: { en: 'Nov 2025', zh: '2025年11月' },
        note: {
          en: 'At Huangchengba Beef Restaurant in the Xiaojiaghe residential quarter: an all-beef menu — brain, marrow, tripe, tongue — all in classic Sichuan technique. Rice refills come by the basin.',
          zh: '肖家河居民区的皇城坝牛肉馆：全牛菜单——牛脑花、牛骨髓、牛肚、牛舌——全是经典川式做法，米饭直接用盆上。',
        },
        featured: true,
      },
      {
        bvid: 'BV18qq8BFEiM',
        cover: 'https://i0.hdslb.com/bfs/archive/4db906150510c5898b8123aa43d1fcca7640f1bb.jpg',
        title: { en: 'Found a Halal Restaurant in Chengdu — Coming Back', zh: '在成都发现了一家清真菜，下次还去' },
        vloggerName: '馋人老田',
        duration: '7:01',
        viewsText: { en: '62K views', zh: '6.2万播放' },
        publishedAt: { en: 'Dec 2025', zh: '2025年12月' },
        note: {
          en: 'A low-key walk into one of the halal joints locals actually rotate through — the comments chime in with more halal picks in the same block.',
          zh: '低调探店成都本地人轮着去的清真馆子——评论区接力补充了同一条街上的更多清真选择。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'halal-staples',
    heading: { en: 'The Staples: Beef Noodles & Mutton Soup', zh: '日常支柱：牛肉面与羊肉汤' },
    videos: [
      {
        bvid: 'BV13KbW6tEHx',
        cover: 'https://i0.hdslb.com/bfs/archive/75f732818232787e29b57ca7bd062a047cd134d0.jpg',
        title: { en: 'Lanzhou Beef Noodles — The Standard, at the Source', zh: '在兰州连连跺脚的「兰州牛肉面」' },
        vloggerName: '特别乌啦啦',
        duration: '6:13',
        viewsText: { en: '70K views', zh: '7.0万播放' },
        publishedAt: { en: 'Sep 2026', zh: '2026年9月' },
        note: {
          en: 'What a proper bowl looks like at the source in Lanzhou — the benchmark for the Muslim-run noodle shops you\'ll rely on in every Chinese city, Chengdu included.',
          zh: '兰州原产地的一碗标准牛肉面长什么样——你在所有中国城市（包括成都）赖以生存的清真拉面店的基准线。',
        },
        featured: false,
      },
      {
        bvid: 'BV1zMAHeZE4X',
        cover: 'https://i0.hdslb.com/bfs/archive/d980b72a986e2db7582888afbdc31b3f21ad31bb.jpg',
        title: { en: 'Jianyang Mutton Soup: Milk-White Broth + Fire-Blasted Liver & Kidney', zh: '【王刚探店】四大羊肉汤之一：简阳羊肉汤' },
        vloggerName: '餐饮研究员王刚',
        duration: '12:33',
        viewsText: { en: '524K views', zh: '52.4万播放' },
        publishedAt: { en: 'Feb 2025', zh: '2025年2月' },
        note: {
          en: 'Chef Wang Gang on Sichuan\'s famous mutton soup, ladled from a milk-white pot and paired with wok-fired lamb organs — Chengdu\'s winter halal-friendly classic. Check for the 清真 sign shop by shop.',
          zh: '王刚讲四川名物简阳羊肉汤：奶白汤锅配火爆羊肝腰——成都冬天的清真友好经典。具体门店记得逐家看清真标识。',
        },
        featured: true,
      },
    ],
  },
]

// ===== 成都 vs 重庆美食对比 =====
export const versusVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'versus-chengdu',
    heading: { en: 'Team Chengdu: Refined Mala & Teahouse Slow', zh: '成都队：精致麻辣与茶馆慢生活' },
    videos: [
      {
        bvid: 'BV11Z3v6BEY5',
        cover: 'https://i1.hdslb.com/bfs/archive/ff19f9d7528b93ffe2d1d956aac6967657a2256c.jpg',
        title: { en: 'A Decades-Old Chengdu Hotpot Institution — The Beef Multi-Tripe Is Legendary', zh: '在成都开了几十年的老牌火锅店，他家的千层肚夯爆了' },
        vloggerName: '密子君',
        duration: '10:01',
        viewsText: { en: '636K views', zh: '63.6万播放' },
        publishedAt: { en: 'Jul 2026', zh: '2026年7月' },
        note: {
          en: 'The Chengdu side of the hotpot argument: an old-school local institution whose qiancengdu (leaf tripe) regulars chase across branches — the comment section posts the exact alleys.',
          zh: '火锅之争的成都方：本地老字号，千层肚是回头客跨店追的灵魂菜——评论区直接给出具体巷子。',
        },
        featured: true,
      },
      {
        bvid: 'BV1J54y1f7Ys',
        cover: 'https://i2.hdslb.com/bfs/archive/6934545791259b09c84054deadcb9edbeead5560.jpg',
        title: { en: 'Chengdu\'s No-Signboard Maocai, Open 4 Hours a Day — Neighbors Bring Their Own Pots', zh: '成都"油爆爆"辣冒菜，没招牌一天只开4小时，街坊端着锅来吃' },
        vloggerName: '肉肉大搜索',
        duration: '5:53',
        viewsText: { en: '5M views', zh: '502.5万播放' },
        publishedAt: { en: 'May 2022', zh: '2022年5月' },
        note: {
          en: 'Five million views of pure Chengdu neighborhood energy: a maocai stall with no sign, four open hours a day, and regulars carrying pots from home. This — not banquet cooking — is the city\'s daily spice.',
          zh: '五百万播放的成都街坊烟火：无招牌、一天只开四小时的冒菜摊，街坊自己端锅来打。这才是成都的日常辣度，不是宴席菜。',
        },
        featured: true,
      },
      {
        bvid: 'BV1sJbW6UEpi',
        cover: 'https://i0.hdslb.com/bfs/archive/9828c05f2f838afbfa0fd4afcebcb970a6f9d89b.jpg',
        title: { en: 'Chengdu Romance: Pork Trotter Soup & Chili-Oil Maocai', zh: '成都人的浪漫除了蹄花还有红油冒菜！' },
        vloggerName: '密子君',
        duration: '7:49',
        viewsText: { en: '146K views', zh: '14.6万播放' },
        publishedAt: { en: 'Sep 2026', zh: '2026年9月' },
        note: {
          en: 'A fresh 2026 tour of the two late-night Chengdu comfort plates: tender tihua (stewed trotter) and chili-oil maocai — the counter-argument to "Chengdu is only about hotpot."',
          zh: '2026 年新视频：成都深夜两块慰藉——软糯蹄花与红油冒菜——反驳"成都只有火锅"的最好证据。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'versus-chongqing',
    heading: { en: 'Team Chongqing: Tallow Fire & Jianghu Soul', zh: '重庆队：牛油烈火与江湖气' },
    videos: [
      {
        bvid: 'BV1nu411M7xj',
        cover: 'https://i1.hdslb.com/bfs/archive/c67642373b0b1e52c30d4179e36b1d86647098bb.jpg',
        title: { en: 'Chongqing\'s Must-Do Bomb-Shelter Hotpot — Eat, and Understand the City', zh: '重庆必打卡的防空洞火锅' },
        vloggerName: '老王在中国',
        duration: '11:19',
        viewsText: { en: '2.8M views', zh: '284.9万播放' },
        publishedAt: { en: 'Oct 2023', zh: '2023年10月' },
        note: {
          en: 'A long-term foreign resident eats hotpot inside a WWII air-raid shelter and explains why the cave scene is the city\'s soul — the single best English-adjacent window into Chongqing hotpot culture.',
          zh: '长居中国的外国博主在防空洞里吃火锅，讲清楚洞子场景为何是这座城市的灵魂——外国人理解重庆火锅的最佳窗口。',
        },
        featured: true,
      },
      {
        bvid: 'BV12wYyzvEhU',
        cover: 'https://i1.hdslb.com/bfs/archive/90f0e579db3ed4c1b34a407e7680eda50ff25844.jpg',
        title: { en: 'Chongqing Wanza Noodles with Big Chunks of Beef — Half a Kilo Each', zh: '重庆特色豌杂面+大块牛肉，一人一斤！' },
        vloggerName: '干饭三健客',
        duration: '6:22',
        viewsText: { en: '7.8M views', zh: '783.8万播放' },
        publishedAt: { en: 'Aug 2025', zh: '2025年8月' },
        note: {
          en: 'The Chongqing breakfast argument in 7.8M views: wanza noodles — peas, minced-pork sauce, chili — by the half-kilo. This is the bowl Chongqing wakes up for.',
          zh: '780 万播放的重庆早餐宣言：豌杂面——豌豆、肉酱、海椒——按斤上桌。重庆人早起就是为了这碗。',
        },
        featured: true,
      },
      {
        bvid: 'BV1nWc7e5EDc',
        cover: 'https://i0.hdslb.com/bfs/archive/a54688d1681863f92a2b6de23f5a4ff7b6c4e58c.jpg',
        title: { en: 'Chongqing Hotpot, Slow-Told: An Elder\'s Lifetime with the Pot', zh: '重庆火锅"千呼万唤始出来"！听老辈子讲述他与火锅的一段奇缘' },
        vloggerName: '叔叔的临时生活安顿处',
        duration: '21:56',
        viewsText: { en: '371K views', zh: '37.1万播放' },
        publishedAt: { en: 'Jan 2025', zh: '2025年1月' },
        note: {
          en: 'A 22-minute slow documentary: broth built from scratch and an old Chongqing man\'s lifetime of hotpot stories — the depth piece for readers who want the culture, not just the chili.',
          zh: '22 分钟慢纪录片：从头吊一锅汤，听一位重庆老辈子讲他与火锅的一世缘分——给想了解文化而不只是辣的读者。',
        },
        featured: false,
      },
    ],
  },
]

// ===== 成都美食全指南（增强版）「眼见为实」视频架 =====
export const realVoicesVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'rv-firsttimers',
    heading: { en: 'First-Timers Eat Chengdu', zh: '初来乍到：外国家庭的成都餐桌' },
    videos: [
      {
        bvid: 'BV1RH4y1Q71r',
        cover: 'https://i2.hdslb.com/bfs/archive/e24ad2b91e01f2f7589c5a0fc7ccba9323442366.jpg',
        title: { en: 'A Finnish Family demolishes 15 Sichuan Meals in 3 Days', zh: '芬兰特种兵一家三天在成都狂炫15顿四川美食！' },
        vloggerName: '小马逛吃',
        duration: '22:43',
        viewsText: { en: '8.5M views', zh: '846.1万播放' },
        publishedAt: { en: 'Sep 2023', zh: '2023年9月' },
        note: {
          en: 'The classic foreign-family Chengdu pig-out: hotpot, roast duck, tihua trotter soup, BBQ — 15 meals in 72 hours. The top comment is a viewer-organized address list of every stop in the video.',
          zh: '外国家庭吃成都的经典样本：火锅、冒烤鸭、蹄花、烧烤，72 小时 15 顿。置顶热评是观众整理的全片店铺地址清单。',
        },
        featured: true,
      },
      {
        bvid: 'BV1S659zREUE',
        cover: 'https://i0.hdslb.com/bfs/archive/e9117e8333a31e20515d0735ddd0039de44314af.jpg',
        title: { en: 'A British Family\'s First Time in Chengdu — None of Us Slept That Night', zh: '英国家人第一次去成都，这一晚我们无人入睡' },
        vloggerName: '小马逛吃',
        duration: '19:00',
        viewsText: { en: '1M views', zh: '104.0万播放' },
        publishedAt: { en: 'Apr 2025', zh: '2025年4月' },
        note: {
          en: 'The same vlogger\'s British in-laws meet Chengdu for the first time — arrival night turns into an unplanned street-food crawl. The best proxy for what your own first evening will feel like.',
          zh: '还是这位博主的英国亲家第一次进成都——落地当晚演变成一场计划外的街头觅食。你自己第一个晚上大概就是这种感觉。',
        },
        featured: false,
      },
      {
        bvid: 'BV1WE421G7vt',
        cover: 'https://i0.hdslb.com/bfs/archive/8b57c4a3bd2265e50baabc60ccd638dd128e4a66.jpg',
        title: { en: 'First Time in Chengdu: What Should You Eat? (Part 1)', zh: '第一次来成都吃点儿啥？好吃的不要太多吧！（上）' },
        vloggerName: '吃不胖的野妹儿',
        duration: '5:40',
        viewsText: { en: '5.2M views', zh: '522.5万播放' },
        publishedAt: { en: 'May 2024', zh: '2024年5月' },
        note: {
          en: 'The local\'s starter checklist in 5 minutes — and the comment section under it is a second guide in itself: a Chengdu native\'s regular-rotation restaurant list sits at the top with 2.1K likes.',
          zh: '5 分钟版本地人入门清单——它楼下的评论区本身就是第二份指南：一条成都土著的常吃店清单以 2.1K 赞置顶。',
        },
        featured: true,
      },
    ],
  },
  {
    id: 'rv-beyond',
    heading: { en: 'Chengdu Beyond the Restaurant List', zh: '清单之外：更野的成都' },
    videos: [
      {
        bvid: 'BV1K6XAYZEFh',
        cover: 'https://i2.hdslb.com/bfs/archive/d4d414d4559b3233c8798aade93c5b8a5f76c478.jpg',
        title: { en: 'Dad from Jiangxi Takes On Chengdu\'s Spiciest Restaurant', zh: '江西老爸，挑战成都最辣餐厅！老爸：有点意思啊' },
        vloggerName: '小马逛吃',
        duration: '8:59',
        viewsText: { en: '12M views', zh: '1206.3万播放' },
        publishedAt: { en: 'Mar 2025', zh: '2025年3月' },
        note: {
          en: '12M views of a chili-hardened dad meeting Chengdu\'s ceiling — the honest test of how hot "hot" gets here, and how locals actually react to outsiders keeping up.',
          zh: '1200 万播放：吃辣大省来的老爸挑战成都辣度天花板——"辣"在成都到底有多辣、本地人怎么看外地人扛辣，一次交代清楚。',
        },
        featured: true,
      },
      {
        bvid: 'BV1Ui4y1U7LD',
        cover: 'https://i2.hdslb.com/bfs/archive/181b797da8454d0414271b5b64abdf8db84f3cf4.jpg',
        title: { en: 'Chengdu\'s ¥15 Street Buffet: 20 Dishes, and 85-Year-Olds Eat Free', zh: '成都街边15元自助餐，20道菜，85岁老人吃饭不要钱' },
        vloggerName: '肉肉大搜索',
        duration: '6:12',
        viewsText: { en: '6.6M views', zh: '655.2万播放' },
        publishedAt: { en: 'Apr 2022', zh: '2022年4月' },
        note: {
          en: 'The most-loved Chengdu food video on this site: a ¥15 all-you-can-eat street buffet for the city\'s workers, free for anyone over 85. Its top comment (26K likes) is an office worker discovering it 1.1 km from their desk.',
          zh: '本站最出圈的成都美食视频：给打工人吃的 15 元 20 道菜街边自助，85 岁以上老人免单。26K 赞的置顶评论，是一位上班族发现自己公司离它只有 1.1 公里。',
        },
        featured: true,
      },
      {
        bvid: 'BV1GbcMz8En9',
        cover: 'https://i1.hdslb.com/bfs/archive/d0581430e57c0e7b7c14fa6b902938f66ef71d17.jpg',
        title: { en: 'A Baba Banquet in a Chengdu Village: No Menu, You Just Grab', zh: '在成都金牛区一个村里吃"成都坝坝宴"，吃饭全靠"抢"' },
        vloggerName: '好吃_fooD',
        duration: '10:10',
        viewsText: { en: '5.1M views', zh: '507.5万播放' },
        publishedAt: { en: 'Feb 2026', zh: '2026年2月' },
        note: {
          en: 'The countryside banquet experience inside Chengdu\'s city limits: communal tables, no ordering, dishes land and you grab. The comments double as a street-vendor scam warning thread.',
          zh: '成都市区里的农村吃席体验：拼桌、不点菜、菜来了靠抢。评论区还兼职科普了街头小贩的坑。',
        },
        featured: false,
      },
    ],
  },
]

// ===== 成都街头小吃指南（chengdu-street-food） =====
// 播放量为 2026-09-09 快照，来自 scripts/coldstart/bili-search.mjs
// search（"成都街头小吃"/"成都苍蝇馆子"/"成都夜市小吃"/"成都蛋烘糕"）
// + batch 详情（scripts/coldstart/out/street-food-details.json）。
export const streetFoodVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'street-stalls',
    heading: { en: 'The Street-Stall Lunch Economy', zh: '路边摊的午餐经济学' },
    videos: [
      {
        bvid: 'BV1WY4y1p77K',
        cover: 'https://i1.hdslb.com/bfs/archive/fa003d2a88d3a7ae79a645a0fcdaeaa98a926917.jpg',
        title: { en: 'Chengdu\'s ¥1-per-Skewer Bobo Chicken Street Cart', zh: '成都"1元地摊钵钵鸡"，够麻够辣，端着碗围着摊吃' },
        vloggerName: '肉肉大搜索',
        duration: '6:00',
        viewsText: { en: '2.6M views', zh: '260.0万播放' },
        publishedAt: { en: 'Mar 2022', zh: '2022年3月' },
        note: {
          en: 'Bobo chicken (钵钵鸡) at its most primitive: cold skewers pulled from a tub of chili oil, one yuan each, eaten standing around the cart with your bowl in hand. This is the format that later got gentrified into ¥3-a-skewer chain stores.',
          zh: '钵钵鸡最原始的形态：冷串从红油钵里现抽，一元一签，端着碗围着摊站着吃。后来被连锁店"精致化"成 3 元一串之前，它长这样。',
        },
        featured: true,
      },
      {
        bvid: 'BV1eS4y1c7Gt',
        cover: 'https://i2.hdslb.com/bfs/archive/d42992dba44580b2bae42c81e259f32f49d3433c.jpg',
        title: { en: 'The Boxed-Lunch Auntie: ¥16 to Eat Your Fill, Mixed in a Basin', zh: '成都街头盒饭大姐，十几年用大盆拌肉，16元就能吃的饱' },
        vloggerName: '肉肉大搜索',
        duration: '6:41',
        viewsText: { en: '4.2M views', zh: '415.1万播放' },
        publishedAt: { en: 'Apr 2022', zh: '2022年4月' },
        note: {
          en: 'For over a decade this auntie has mixed rice and meat in a wash-basin-sized bowl for the neighborhood\'s workers — ¥16, no ambiance, pure fuel. Watching regulars arrive is a lesson in how Chengdu actually lunches.',
          zh: '十几年了，这位大姐用洗脸盆大小的盆给街坊打工人拌饭——16 元，毫无环境，全是热量。看熟客们陆续来，就是看成都真实的午饭生态。',
        },
        featured: false,
      },
      {
        bvid: 'BV1tg41187YK',
        cover: 'https://i0.hdslb.com/bfs/archive/aa896423ebe22754e764b9f39abe0c3710f3bbbd.jpg',
        title: { en: '¥7 Pork Rice, ¥14 Twice-Cooked Pork: A 30-Year-Old Counter', zh: '成都7元肉扣饭，14元回锅肉满满的锅气，30多年老店边吃边扣' },
        vloggerName: '肉肉大搜索',
        duration: '5:05',
        viewsText: { en: '2.2M views', zh: '217.7万播放' },
        publishedAt: { en: 'Oct 2022', zh: '2022年10月' },
        note: {
          en: 'A 30-year-old rice-and-topping counter where ¥7 still buys pork over rice and ¥14 gets wok-heated twice-cooked pork. The owner tops up your bowl as you eat — the old street contract of "nobody leaves hungry."',
          zh: '开了 30 多年的饭摊：7 元肉扣饭，14 元回锅肉还带着锅气。老板看你吃得差不多就过来"扣"一勺——街头的老规矩：没人饿着走。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'fly-restaurants',
    heading: { en: 'Fly Restaurants: Where Locals Actually Eat', zh: '苍蝇馆子：本地人真正下馆子的地方' },
    videos: [
      {
        bvid: 'BV1fZ421H73B',
        cover: 'https://i0.hdslb.com/bfs/archive/6caa5e86aff2795fcf460d95d2b3dfcf2a4af121.jpg',
        title: { en: 'Wang Gang Reviews a Fly Restaurant Selling Only 3 Dishes for 20+ Years', zh: '【王刚探店】成都苍蝇馆子，生意火爆，20多年来只卖"三样菜"' },
        vloggerName: '餐饮研究员王刚',
        duration: '14:05',
        viewsText: { en: '1.5M views', zh: '151.0万播放' },
        publishedAt: { en: 'Jun 2024', zh: '2024年6月' },
        note: {
          en: 'China\'s most-watched professional chef reviews a hole-in-the-wall that has sold exactly three dishes for two decades — and explains, in cook\'s terms, why the fire control beats restaurants ten times the price.',
          zh: '中国最有影响力的专业厨师博主，探一家 20 年只卖三样菜的苍蝇馆子，并用厨师的语言解释：为什么它的火候胜过十倍价格的馆子。',
        },
        featured: true,
      },
      {
        bvid: 'BV1ba411q7Pw',
        cover: 'https://i2.hdslb.com/bfs/archive/fb14291c8c7d6e9dcdaaf735b8f7ffd44cd7f665.jpg',
        title: { en: 'A French Chef in Chengdu\'s Fly Restaurants: "I\'ve Become Fully Chinese-Stomached"', zh: '主厨广坦：大成都就像挖掘不尽的美食宝藏，苍蝇馆子撸串串，让我彻底变成中国胃' },
        vloggerName: '主厨广坦',
        duration: '5:12',
        viewsText: { en: '134K views', zh: '13.4万播放' },
        publishedAt: { en: 'Jan 2022', zh: '2022年1月' },
        note: {
          en: 'A classically trained French chef working in Chengdu eats skewers at a fly restaurant and narrates his full conversion. The best foreign-language bridge into this world: he explains what he\'s tasting in terms a Western palate understands.',
          zh: '一位在成都工作的法餐主厨，在苍蝇馆子撸串串并全程解说自己的"倒戈"。这是外国观众进入这个世界最好的桥：他用西式味觉的词汇，讲清他在吃什么。',
        },
        featured: false,
      },
      {
        bvid: 'BV1pz4y1W79X',
        cover: 'https://i2.hdslb.com/bfs/archive/d336726955a4cccd724867293ef99b2a8ec81989.jpg',
        title: { en: 'Honest Review: Chengdu\'s Viral Fly Restaurant (Full of Tourists Queuing?)', zh: '成都爆火的苍蝇馆味道怎么样？（不过好像都是游客在排队）' },
        vloggerName: '真探高文麒',
        duration: '4:07',
        viewsText: { en: '663K views', zh: '66.3万播放' },
        publishedAt: { en: 'Aug 2023', zh: '2023年8月' },
        note: {
          en: 'The honest-check genre at its best: a no-drama reviewer visits a social-media-famous fly restaurant, notices the queue is mostly tourists, and separates the food from the hype. Exactly the skepticism you should pack for any "viral" spot.',
          zh: '诚实测评的范本：探店博主去了一家网红苍蝇馆子，发现排队的多是游客，然后把"菜本身"和"网红滤镜"分开打分。去任何"爆火"小店前，都该带上这份警惕。',
        },
        featured: false,
      },
      {
        bvid: 'BV1pW4y197WK',
        cover: 'https://i0.hdslb.com/bfs/archive/1924d2c906c80100d3ad6f4a829222df7232b01f.jpg',
        title: { en: 'A Korean First-Timer Tries Mao-Kaoya at a Fly Restaurant', zh: '成都的苍蝇馆子都这么好吃吗？韩国人第一次吃冒烤鸭' },
        vloggerName: 'Iam小方',
        duration: '11:30',
        viewsText: { en: '453K views', zh: '45.4万播放' },
        publishedAt: { en: 'Jun 2023', zh: '2023年6月' },
        note: {
          en: 'Mao kaoya — roast duck drowned in mala broth — is Chengdu\'s answer to both hotpot and roast meat. A Korean vlogger\'s first encounter doubles as a beginner\'s FAQ: how to order, what the red oil is, why it costs so little.',
          zh: '冒烤鸭——烤鸭泡进麻辣汤底——是成都对火锅和烤肉的双重回答。韩国博主的第一次体验顺便就是新手 FAQ：怎么点、红油是什么、为什么这么便宜。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'night-markets',
    heading: { en: 'Night Markets: The After-Dark Crawl', zh: '夜市：天黑之后的逛吃' },
    videos: [
      {
        bvid: 'BV1e14y1i7pe',
        cover: 'https://i1.hdslb.com/bfs/archive/ede4927e1652240474bf0a7f7d8911ae351e475d.jpg',
        title: { en: 'Chengdu\'s "Ceiling" Night Market: 11 Stalls in One Crawl', zh: '探秘成都夜市天花板！连吃11个小吃摊位！红油肥肠豆花+巨无霸肉串苕皮' },
        vloggerName: '羊羊羊PD',
        duration: '13:47',
        viewsText: { en: '1.2M views', zh: '119.6万播放' },
        publishedAt: { en: 'Aug 2023', zh: '2023年8月' },
        note: {
          en: 'A full crawl through one of Chengdu\'s biggest night markets — 11 stalls in one video, from red-oil pork-intestine douhua to jumbo meat skewers and shaopi (sweet potato sheets). Use it as your visual menu before you go.',
          zh: '一条视频刷完成都头部夜市的 11 个摊位：红油肥肠豆花、巨无霸肉串、苕皮……出发前把它当图片菜单看。',
        },
        featured: true,
      },
      {
        bvid: 'BV1my4y1P71m',
        cover: 'https://i1.hdslb.com/bfs/archive/b1c9900e98969556b6c8cff5fdca215fa130ea10.jpg',
        title: { en: 'Three Hours in Yulin Night Market, Snacks From a Few Yuan', zh: '成都极限三小时逛吃玉林夜市！低至几元钱的小吃美味又管饱' },
        vloggerName: '小果食',
        duration: '7:36',
        viewsText: { en: '175K views', zh: '17.5万播放' },
        publishedAt: { en: 'Oct 2023', zh: '2023年10月' },
        note: {
          en: 'Yulin is the neighborhood the folk song made famous — and its night market is where locals actually eat, a few yuan per snack, no queue theater. A calmer alternative to the tourist-heavy Jianshe Road.',
          zh: '玉林就是民谣里唱的那条路——它的夜市是本地人真正吃饭的地方，几块钱一样小吃，没有排队表演。比游客扎堆的建设路更松弛的选择。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'snack-icons',
    heading: { en: 'Snack Icons: Dan Hong Gao & the Sweet Finish', zh: '小吃名物：蛋烘糕与甜口收尾' },
    videos: [
      {
        bvid: 'BV1CTG2z7E5j',
        cover: 'https://i0.hdslb.com/bfs/archive/ed239ae06f235d5ff6cb31b0de208e277b5580ec.jpg',
        title: { en: 'An Objective Review of Chengdu\'s Famous "Granny" Dan Hong Gao', zh: '【客观评价】成都蛋烘糕婆婆的蛋烘糕' },
        vloggerName: '山禾Yellow',
        duration: '6:19',
        viewsText: { en: '405K views', zh: '40.5万播放' },
        publishedAt: { en: 'Apr 2025', zh: '2025年4月' },
        note: {
          en: 'Dan hong gao — the griddled egg cakes folded around fillings — is THE Chengdu street snack. This review of a viral granny\'s stall measures hype against craft: crust texture, filling ratio, and whether fame changed anything.',
          zh: '蛋烘糕——小铜锅烙的蛋饼对折夹馅——是成都街头小吃的头牌。这条对"婆婆蛋烘糕"的测评，把名气和手艺分开称重：饼皮、馅料比、出名之后变没变味。',
        },
        featured: true,
      },
      {
        bvid: 'BV1iz421U7Cq',
        cover: 'https://i2.hdslb.com/bfs/archive/b73c2c6a64515e810589c43a1dc1851e47627f25.jpg',
        title: { en: 'A Family Food Crawl from Chengdu to Leshan: Dan Hong Gao Breakfast to Beef Dinner', zh: '带娃从成都逛吃到乐山：早餐蛋烘糕红油抄手和红糖凉虾' },
        vloggerName: '君在西安',
        duration: '6:56',
        viewsText: { en: '528K views', zh: '52.8万播放' },
        publishedAt: { en: 'May 2024', zh: '2024年5月' },
        note: {
          en: 'A family with a toddler eats Chengdu street-style from breakfast onward — dan hong gao, red-oil wontons, brown-sugar liangxia — then trains it to Leshan for more. Proof the street-food tier of this city is genuinely family-friendly.',
          zh: '带娃家庭从早餐开始吃成都街头：蛋烘糕、红油抄手、红糖凉虾，再坐高铁去乐山接着吃。证明这座城的小吃层级是真的亲子友好。',
        },
        featured: false,
      },
    ],
  },
]

// ===== 成都火锅指南（chengdu-hot-pot-guide） =====
// 播放量为 2026-09-09 快照（scripts/coldstart/out/batch2-details.json）。
export const hotPotVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'hotpot-queues',
    heading: { en: 'The Queue Question: Is a 3-Hour Wait Worth It?', zh: '排队问题：3 小时的队值不值？' },
    videos: [
      {
        bvid: 'BV1Sp4y1g7Zr',
        cover: 'https://i1.hdslb.com/bfs/archive/df4b61445ba4ed5316499ca35c931a01d212e6e0.jpg',
        title: { en: 'The Chengdu Hot Pot People Queue 3 Hours For — How Good Is It Really?', zh: '排队快三小时的成都火锅店到底有多好吃？' },
        vloggerName: '真探高文麒',
        duration: '4:51',
        viewsText: { en: '1.8M views', zh: '184.8万播放' },
        publishedAt: { en: 'Aug 2023', zh: '2023年8月' },
        note: {
          en: 'Chengdu\'s most trusted no-drama reviewer joins the city\'s most notorious hot pot queue and reports back like an auditor: wait mechanics, table turnover, and whether the pot itself justifies the clock. The comment section is a citywide referendum on queue culture.',
          zh: '成都最可信的毒舌测评博主，加入了全城最出名的火锅队伍，然后像审计一样汇报：排队机制、翻台速度、锅底本身值不值这个时间。评论区则是一场全市公投。',
        },
        featured: true,
      },
      {
        bvid: 'BV1aw411Q7ud',
        cover: 'https://i1.hdslb.com/bfs/archive/0a3d549b6d91a0e767c73268ac873431cf62c6f7.jpg',
        title: { en: 'A Foreign Resident Tests His Chengdu Friends\' No.1 Hot Pot', zh: '成都朋友心中 TOP1 的火锅，好吃得不像样了' },
        vloggerName: '老王在中国',
        duration: '6:53',
        viewsText: { en: '581K views', zh: '58.1万播放' },
        publishedAt: { en: 'Aug 2023', zh: '2023年8月' },
        note: {
          en: 'A long-term foreign resident takes his local friends\' unanimous No.1 pick to the test — the strongest possible curation signal, because Chengdu friends do not agree on hot pot lightly. His verdict doubles as a beginner\'s ordering guide.',
          zh: '长居中国的外国博主，去测评本地朋友们口径罕见的"TOP1"——这是最强的筛选信号，因为成都人在火锅上从不轻易统一意见。他的结论顺便就是新手点单指南。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'hotpot-neighborhood',
    heading: { en: 'Neighborhood Pots: Where the Regulars Go', zh: '社区火锅：熟客们的地方' },
    videos: [
      {
        bvid: 'BV17rqrY2Ev5',
        cover: 'https://i1.hdslb.com/bfs/archive/104fee43c97428d03f5902e6d547869260bb5c41.jpg',
        title: { en: 'The South-Gate Hot Pot I\'ve Eaten at 20+ Times', zh: '吃了不下20次的火锅店！我愿称为成都南门火锅之光' },
        vloggerName: '丹妮妮妮妮2098',
        duration: '10:01',
        viewsText: { en: '464K views', zh: '46.4万播放' },
        publishedAt: { en: 'Dec 2024', zh: '2024年12月' },
        note: {
          en: 'Repeat-visit content is the highest tier of trust: a local vlogger\'s own rotation spot, eaten at twenty-plus times. This is what "local favorite" actually means — not a listicle, a habit.',
          zh: '回访类内容是信任的最高等级：本地博主自己的轮换食堂，吃了二十多次。这才是"本地人最爱"的真实含义——不是清单，是习惯。',
        },
        featured: true,
      },
      {
        bvid: 'BV16sNE6iEq3',
        cover: 'https://i2.hdslb.com/bfs/archive/feec760c92fe880df2f745698ec868d3222c8552.jpg',
        title: { en: 'The Neighborhood Pot My Subscribers Won\'t Stop Recommending', zh: '粉丝推荐N次的社区火锅，必须翻牌' },
        vloggerName: '丹妮妮妮妮2098',
        duration: '12:56',
        viewsText: { en: '194K views', zh: '19.4万播放' },
        publishedAt: { en: 'Jul 2026', zh: '2026年7月' },
        note: {
          en: 'Crowd-sourced curation: a community hot pot nominated over and over in the comments until the vlogger finally goes. Watch for the cold-menu fried-rice trick — a deep-cut local ordering move.',
          zh: '众包筛选：评论区被粉丝点名太多次的社区火锅，博主终于去了。注意视频里的"冷门炒饭吃法"——相当深入的本地点单操作。',
        },
        featured: false,
      },
    ],
  },
]

// ===== 成都美食一日游（chengdu-food-tour） =====
export const foodTourVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'tour-yulin',
    heading: { en: 'One Day in Yulin, Eaten Properly', zh: '玉林一天的正确吃法' },
    videos: [
      {
        bvid: 'BV1im421x7Q8',
        cover: 'https://i2.hdslb.com/bfs/archive/c0025ac30d720fc987ed107f51fb7fbe1cda0e23.jpg',
        title: { en: 'An Old-Chengdu Vlogger\'s Yulin Eating Day, Distilled', zh: '成都玉林一日游吃喝攻略，来自老成都up主的阶段性总结' },
        vloggerName: '馒头叔叔就是大馒头',
        duration: '8:27',
        viewsText: { en: '184K views', zh: '18.4万播放' },
        publishedAt: { en: 'Apr 2024', zh: '2024年4月' },
        note: {
          en: 'A born-and-raised Chengdu vlogger compresses his own neighborhood — the folk-song Yulin — into one walkable day of eating. The closest thing to being walked around by a local friend; steal his stop order directly.',
          zh: '土生土长的成都 up 主，把自家街区——民谣里的玉林——压缩成一天走完的吃喝动线。等于本地朋友带你逛；他的停站顺序可以直接照抄。',
        },
        featured: true,
      },
      {
        bvid: 'BV1bzU2YrESN',
        cover: 'https://i0.hdslb.com/bfs/archive/16336afc19b467618bbc8f920a982c5a95482fd1.jpg',
        title: { en: 'Chengdu Speed-Run Food Day: Eating Whenever, Wherever', zh: '成都极限逛吃一日游，这里太适合随地大小吃了' },
        vloggerName: '饭局的鱼',
        duration: '10:41',
        viewsText: { en: '57K views', zh: '5.7万播放' },
        publishedAt: { en: 'Nov 2024', zh: '2024年11月' },
        note: {
          en: 'The anti-itinerary itinerary: no plan, maximum stops, eating standing, walking, queueing. Watch it to calibrate your own pace — this city rewards grazing over scheduling.',
          zh: '反行程的行程：不做计划、停站最多、站着吃、走着吃、排队吃。看它来校准自己的节奏——这座城市奖励"放牧"，不奖励"排表"。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'tour-classics',
    heading: { en: 'The Old-School Rotation: Legacy Shops & Hand-Holding Routes', zh: '老店轮换：资深老店与保姆级路线' },
    videos: [
      {
        bvid: 'BV1Zz9rBLEiL',
        cover: 'https://i0.hdslb.com/bfs/archive/e0cf03ad7a72318a73f23601a657e59253412f4f.jpg',
        title: { en: '17 Legacy Chengdu Eateries, Mapped for Eating While Walking', zh: '最新成都17家资深老店美食攻略，最好的旅行就是边走边吃' },
        vloggerName: '许有有Kmi',
        duration: '11:30',
        viewsText: { en: '142K views', zh: '14.2万播放' },
        publishedAt: { en: 'Apr 2026', zh: '2026年4月' },
        note: {
          en: 'Seventeen time-tested shops in one current (2026) sweep — use it as the master index behind any self-guided route: pick three near your day\'s path, ignore the rest with a clear conscience.',
          zh: '一条 2026 年新鲜的 17 家老店大盘点——把它当任何自走路线背后的主索引：挑你当天动线附近的三家，其余的放心略过。',
        },
        featured: true,
      },
      {
        bvid: 'BV11ELrzLEpc',
        cover: 'https://i2.hdslb.com/bfs/archive/0e790ba5306ef2d07b7d6c24d6037ac5b712aca0.jpg',
        title: { en: 'The Reputation-Only Chengdu Guide: Old Shops, Zero Misses', zh: '只推口碑老店的成都保姆级旅游攻略' },
        vloggerName: '胖虎和小夫-',
        duration: '10:01',
        viewsText: { en: '87K views', zh: '8.7万播放' },
        publishedAt: { en: 'Apr 2025', zh: '2025年4月' },
        note: {
          en: 'A "nanny-level" (hand-holding) guide that only lists shops with long-standing word of mouth — the Chinese internet\'s term for step-by-step curation. A good template for pacing a full eating day without burning out.',
          zh: '一份只收口碑老店的"保姆级"攻略——中文互联网对"手把手级精选"的叫法。照着它安排一整天的吃喝不容易吃到撑崩。',
        },
        featured: false,
      },
    ],
  },
]
