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

// ===== 成都清真美食指南 =====
export const halalVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'halal-chengdu',
    heading: { en: 'Chengdu\'s Sichuan-Style Halal Kitchens', zh: '川味清真菜：成都的全牛馆子' },
    videos: [
      {
        bvid: 'BV1knVw6CEkP',
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
