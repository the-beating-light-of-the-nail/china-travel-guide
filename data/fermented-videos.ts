// 发酵美食专栏 B 站精选视频 - 《发酵白菜宇宙》guide 配套「眼见为实」视频架
// ---------------------------------------------------------------
// 16 条精选视频按 5 组组织，对应 guide 文章章节（东北酸菜 / 四川泡菜 /
// 贵州酸汤 / 酸菜鱼 / 涪陵榨菜）。缩略图为纯 CSS 占位，点击原地加载 B 站官方播放器（components/BiliPlayer.vue），
// 不自托管封面图。标题可外链 B 站（新窗口）。
// 播放量为 2026-09-06 快照；筛选与元数据来自
// scripts/coldstart/fermented-research.mjs + bili-search.mjs batch。
// 结构与 hiking-data.ts 的 HikingVideo 同构：L 字段 en/zh 必填，
// 其余 7 语由翻译包构建时合并（Phase 2），缺失回退英文。
// 【摆放位置】默认渲染在文章尾部「眼见为实」架；正文 HTML 里写
//   [[videos:<组id>]] 可让该组内联渲染在标记处（见 chengdu-food-videos.ts
// 头注释与 pages/guides/[slug].vue 的 contentSegments）。
// 注意：数组顺序即翻译包索引对齐顺序，勿随意调换。
// ---------------------------------------------------------------
import { fillLocaleFallbacks } from './localize'
import type { L } from './localize'

export interface FermentedVideo {
  bvid: string
  cover?: string
  title: L
  vloggerName: string
  duration: string
  viewsText: L
  publishedAt: L
  note: L
  featured: boolean
}

export interface FermentedVideoGroup {
  id: string
  heading: L
  videos: FermentedVideo[]
}

export function fermentedVideoUrl(bvid: string): string {
  return `https://www.bilibili.com/video/${bvid}`
}

export const fermentedVideoGroups: FermentedVideoGroup[] = [
  {
    id: 'northeast-suancai',
    heading: { en: 'Northeast Suancai', zh: '东北酸菜' },
    videos: [
      {
        bvid: 'BV1eu411o745',
        cover: 'https://i1.hdslb.com/bfs/archive/4288fa6adcd69bafc13db0344278eaa474393ed3.jpg',
        title: { en: 'Dongbei Cannot Live Without Suancai! — The Complete Tutorial', zh: '东北不能失去酸菜！' },
        vloggerName: '手艺贾',
        duration: '10:20',
        viewsText: { en: '3.4M views', zh: '342.3万播放' },
        publishedAt: { en: 'Nov 2021', zh: '2021年11月' },
        note: {
          en: 'A 3.4M-view masterclass that runs the whole arc — salting, the pressing stone, the crock, and the first pot of winter — the Dongbei pickling ritual in one video.',
          zh: '342 万播放的全流程教程：下盐、压石、封缸，一直到入冬第一锅——东北腌酸菜的完整仪式感。',
        },
        featured: true,
      },
      {
        bvid: 'BV1gy4y1m7Xx',
        cover: 'https://i2.hdslb.com/bfs/archive/8e90cc8c33e2564b2bea33f8638298f25de29adb.jpg',
        title: { en: 'Pickled Sour Cabbage, the Family Way', zh: '【小高姐】腌酸白菜' },
        vloggerName: '小高姐的魔法调料',
        duration: '6:15',
        viewsText: { en: '1.2M views', zh: '120.8万播放' },
        publishedAt: { en: 'Jan 2021', zh: '2021年1月' },
        note: {
          en: 'A Canada-based food-science favourite recreates her father\'s waist-deep crock in a small jar — big crock or little jar, the lactobacillus logic never changes.',
          zh: '移居加拿大的美食科普博主，用小瓶复刻父亲齐腰深的大缸——缸变瓶子，乳酸菌的原理从未改变。',
        },
        featured: true,
      },
      {
        bvid: 'BV1oSCsBMEPh',
        cover: 'https://i1.hdslb.com/bfs/archive/1bd80b3e8770906b34d752ecdc139efc56754f9f.jpg',
        title: { en: 'Grandma Pickles 500 Jin of Cabbage in One Go', zh: '东北腌酸菜啦，看我姥五百斤白菜能腌多少酸菜' },
        vloggerName: '八零徐姥姥',
        duration: '5:39',
        viewsText: { en: '1M views', zh: '101.8万播放' },
        publishedAt: { en: 'Nov 2025', zh: '2025年11月' },
        note: {
          en: 'Five hundred jin (250 kg) of cabbage going into the crock in a single afternoon — autumn pickling as a family production, no recipe card, just hands and weather.',
          zh: '五百斤白菜一下午进缸的秋腌现场：姥姥辈的手艺没有配方表，全凭手感和气温。',
        },
        featured: false,
      },
      {
        bvid: 'BV1kQ4y1D7j5',
        cover: 'https://i1.hdslb.com/bfs/archive/2fcca8cdbaab59b46659f10c2344ffff6314c9fc.jpg',
        title: { en: 'How the Suancai in Your Fish Pot Is Mass-Made', zh: '酸菜鱼里的酸菜，泡面里的酸菜包，是这样做出来的' },
        vloggerName: '四处观察的小臣',
        duration: '4:28',
        viewsText: { en: '355k views', zh: '35.5万播放' },
        publishedAt: { en: 'Oct 2021', zh: '2021年10月' },
        note: {
          en: 'The industrial side of the tradition: how the suancai in suancaiyu restaurants and instant-noodle packets is produced at factory scale.',
          zh: '你在酸菜鱼餐馆和泡面配料包里吃到的酸菜，是怎么在工厂里规模量产的——车间级视角。',
        },
        featured: false,
      },
      {
        bvid: 'BV1MK4y1z7fw',
        cover: 'https://i0.hdslb.com/bfs/archive/4a6165a067b6821d9a9a4ab792dd9782033eb48c.jpg',
        title: { en: 'Suancai Pork Belly — Winter\'s Hardest-Working Dish', zh: '冬天不可或缺的大硬菜！丨酸菜白肉' },
        vloggerName: '老饭骨',
        duration: '4:57',
        viewsText: { en: '853k views', zh: '85.3万播放' },
        publishedAt: { en: 'Jan 2024', zh: '2024年1月' },
        note: {
          en: 'State-banquet veteran chefs cook suancai baizhou: the acid slices straight through the pork belly fat — the definitive Dongbei winter pairing.',
          zh: '国宴班底的老饭骨示范酸菜白肉：酸解腻、肉借香，东北冬天最硬的一道菜。',
        },
        featured: false,
      },
      {
        bvid: 'BV1XT4y1n7A1',
        cover: 'https://i1.hdslb.com/bfs/archive/3dbb4b94a2d0c294ef63ebbb56fc94fce0796d4a.jpg',
        title: { en: 'A Full Dongbei Suancai Hotpot, Table-Cam Edition', zh: '东北酸菜锅！能吃又能喝！' },
        vloggerName: '小傲想睡觉',
        duration: '16:34',
        viewsText: { en: '3.7M views', zh: '369.9万播放' },
        publishedAt: { en: 'Jan 2024', zh: '2024年1月' },
        note: {
          en: 'A 3.7M-view eating classic: order one suancai hotpot, drink the broth, eat the pork, finish the rice in the soup — what your table in Harbin will look like.',
          zh: '370 万播放的酸菜锅名场面：点一锅东北酸菜锅，汤能喝、肉能吃、饭能泡——你在哈尔滨的餐桌大概率长这样。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'sichuan-paocai',
    heading: { en: 'Sichuan Paocai', zh: '四川泡菜' },
    videos: [
      {
        bvid: 'BV1B8411Z71Q',
        cover: 'https://i2.hdslb.com/bfs/archive/0d48745ce3f9192febd16deaf9be55fb15dea87d.jpg',
        title: { en: 'The Microbiology of Sichuan Paocai, Demystified', zh: '微观层面解释四川泡菜原理，把玄学讲清楚！' },
        vloggerName: '吉尔的小灯塔',
        duration: '15:30',
        viewsText: { en: '784k views', zh: '78.4万播放' },
        publishedAt: { en: 'Jun 2023', zh: '2023年6月' },
        note: {
          en: 'Paocai "folk magic" translated into microbiology: mother brine, pickled chillies and ginger, one-day "bath" pickles, and why the old jar tastes alive.',
          zh: '把四川泡菜的"玄学"拆成微生物学：老坛水、泡椒泡姜、洗澡泡菜，以及老坛为什么是活的。',
        },
        featured: true,
      },
      {
        bvid: 'BV1jq4y16757',
        cover: 'https://i1.hdslb.com/bfs/archive/cca8a071882ca6399306d0690fb77d5f304502cf.jpg',
        title: { en: 'Bath Paocai — the Jar Every Sichuan Home Keeps', zh: '四川洗澡泡菜，家家户户必吃' },
        vloggerName: '林述巍JACKLIN',
        duration: '11:13',
        viewsText: { en: '575k views', zh: '57.5万播放' },
        publishedAt: { en: 'Nov 2021', zh: '2021年11月' },
        note: {
          en: 'A five-star-hotel executive chef makes "bath paocai" in his home kitchen — the quick 24-hour pickle that resets every Sichuan meal.',
          zh: '五星酒店行政总厨在家做"洗澡泡菜"——那坛随时捞一筷子、随时添新的川人家常味。',
        },
        featured: false,
      },
      {
        bvid: 'BV1oF411J7Uv',
        cover: 'https://i1.hdslb.com/bfs/archive/b4f417a9602518dce97ab2bf2d58525da5d59c16.jpg',
        title: { en: 'What Does a 120-Year-Old Mother Brine Taste Like?', zh: '传承120年的老坛泡菜水，是啥口感？' },
        vloggerName: '锅铲居士',
        duration: '18:05',
        viewsText: { en: '201k views', zh: '20.1万播放' },
        publishedAt: { en: 'Feb 2022', zh: '2022年2月' },
        note: {
          en: 'A century-plus-old brine, tasted on camera — the strongest possible evidence for the "old jar" lore that anchors Sichuan pickle culture.',
          zh: '一坛传承 120 年的老卤水现场开坛试味——川菜"百年老坛"叙事的最硬证据。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'guizhou-sour-soup',
    heading: { en: 'Guizhou Sour Soup', zh: '贵州酸汤' },
    videos: [
      {
        bvid: 'BV1mWUGBNESc',
        cover: 'https://i2.hdslb.com/bfs/archive/9cb6eed39846ae9e728e32abee9e40156f037d06.jpg',
        title: { en: 'From Mountain Kitchens to China\'s Hottest Menu Trend', zh: '从黔贵山乡到国民餐桌：贵州酸汤如何成为中餐顶流？' },
        vloggerName: '赛博食录',
        duration: '15:18',
        viewsText: { en: '1.2M views', zh: '119.2万播放' },
        publishedAt: { en: 'Nov 2025', zh: '2025年11月' },
        note: {
          en: 'It starts with a land that had no salt: how Guizhou\'s sour soup went from village hearths to the top of China\'s dining tables — the perfect video companion to this article.',
          zh: '从"无盐之地酿出酸"讲起，贵州酸汤如何从山乡灶台走成中餐顶流——与本文互为最佳注脚。',
        },
        featured: true,
      },
      {
        bvid: 'BV1HZ4y1M7TB',
        cover: 'https://i0.hdslb.com/bfs/archive/837fb872775589b153c9901929b08b543b83b1fe.jpg',
        title: { en: 'Sour Soup Fish in a Miao Village Near Kaili', zh: '贵州凯里酸汤鱼，500年苗寨美味河鱼' },
        vloggerName: '阿星探店',
        duration: '20:36',
        viewsText: { en: '211k views', zh: '21.1万播放' },
        publishedAt: { en: 'Aug 2020', zh: '2020年8月' },
        note: {
          en: 'A travel host eats at a Miao village head\'s home near Kaili: river-fresh fish, crock-fermented broth, rice wine and folk songs — the sour-soup heartland as a traveler meets it.',
          zh: '到凯里苗寨村长家吃酸汤鱼：河里现捞的鱼、坛子发酵的红酸、米酒与歌——旅行者视角的酸汤原乡。',
        },
        featured: false,
      },
      {
        bvid: 'BV1g14y1S78K',
        cover: 'https://i2.hdslb.com/bfs/archive/d12dcb2a637b4c650479ea5342e6d839070c29d4.jpg',
        title: { en: 'A Chef Reviews Kaili Sour Soup Fish — ¥102 a Head', zh: '凯里.酸汤鱼 厨子探店¥102' },
        vloggerName: '真探唐仁杰',
        duration: '3:49',
        viewsText: { en: '1M views', zh: '103.2万播放' },
        publishedAt: { en: 'Jun 2023', zh: '2023年6月' },
        note: {
          en: 'A chef-turned-reviewer makes the pilgrimage to Kaili: a full sour soup fish meal for ¥102 — broth, fish and dipping sauce scored, with real menu prices.',
          zh: '厨师出身的探店博主专程去凯里：一顿酸汤鱼 102 元，酸度、鱼种、蘸水逐项点评，带真实菜单价。',
        },
        featured: false,
      },
      {
        bvid: 'BV1Bw411m7Gg',
        cover: 'https://i0.hdslb.com/bfs/archive/68401360e605bf2c27f7ad1c0fca06a2bcc5476b.jpg',
        title: { en: 'Guizhou Sour Hotpot: One Spoonful of Broth per Bowl of Rice', zh: '一勺汤就是一碗饭，贵州酸汤火锅是世界上最下饭的火锅！' },
        vloggerName: '特厨做饭_',
        duration: '5:33',
        viewsText: { en: '1.5M views', zh: '150.9万播放' },
        publishedAt: { en: 'Sep 2023', zh: '2023年9月' },
        note: {
          en: 'A professional chef builds the case that this is the most rice-friendly hotpot on earth — and shows you the spoon-over-rice move locals swear by.',
          zh: '专业厨师实测"最下饭火锅"：一勺红酸汤浇一碗饭，贵州人就这么吃。',
        },
        featured: false,
      },
      {
        bvid: 'BV1Mz4y1s7KB',
        cover: 'https://i2.hdslb.com/bfs/archive/a92d5a27ffc9f81f049f9544611479a530403a29.jpg',
        title: { en: 'Red Sour Soup, Tested Like a Lab Experiment', zh: '科学制作贵州红酸汤，对照测试不同发酵方法和器皿' },
        vloggerName: '吉尔的小灯塔',
        duration: '13:40',
        viewsText: { en: '174k views', zh: '17.4万播放' },
        publishedAt: { en: 'Aug 2023', zh: '2023年8月' },
        note: {
          en: 'Controlled experiments on red sour soup: fermentation methods and vessels compared head-to-head, with a clear-eyed answer on nitrite safety.',
          zh: '红酸汤对照实验：不同发酵方法与器皿横向测评，顺带正面回答亚硝酸盐安全问题。',
        },
        featured: false,
      },
    ],
  },
  {
    id: 'suancaiyu',
    heading: { en: 'Suancaiyu (Chongqing Pickled-Fish Hotpot)', zh: '重庆酸菜鱼' },
    videos: [
      {
        bvid: 'BV1RsE9z6EhK',
        cover: 'https://i1.hdslb.com/bfs/archive/edb5188e6d9a7e9ad0e919d7352056c7fe0c777c.jpg',
        title: { en: 'Suancaiyu with Blackfish — Silkier Fillets, Better Broth', zh: '用黑鱼做出的酸菜鱼比草鱼好吃多了' },
        vloggerName: '小厨大凯',
        duration: '4:54',
        viewsText: { en: '1.9M views', zh: '192.4万播放' },
        publishedAt: { en: 'May 2025', zh: '2025年5月' },
        note: {
          en: 'A 1.9M-view suancaiyu breakdown: why blackfish beats grass carp, how fillets stay silky, how the cabbage stays crunchy — the Sichuan-Chongqing classic built on Northeast cabbage.',
          zh: '192 万播放的酸菜鱼技法拆解：黑鱼为什么比草鱼强、鱼片如何滑嫩、酸菜怎样脆爽——这道川渝名菜正建立在东北酸菜上。',
        },
        featured: true,
      },
    ],
  },
  {
    id: 'fuling-zhacai',
    heading: { en: 'Fuling Zhacai', zh: '涪陵榨菜' },
    videos: [
      {
        bvid: 'BV12A4m1P7PW',
        cover: 'https://i0.hdslb.com/bfs/archive/1bc48ca690df4229656d2fd66352ecf48b398364.jpg',
        title: { en: '30 Days of Work, 2 Years Until It\'s Edible', zh: '用30天做了10坛涪陵本地人爱吃的榨菜，但是要2年后才能吃到' },
        vloggerName: '燕麦行游',
        duration: '12:50',
        viewsText: { en: '569k views', zh: '56.9万播放' },
        publishedAt: { en: 'Mar 2024', zh: '2024年3月' },
        note: {
          en: 'Thirty days of labor for ten crocks of zhacai that won\'t be ready for two years — the true time cost of Fuling\'s famous pickle, filmed start to finish.',
          zh: '博主花 30 天照本地做法腌 10 坛榨菜，还要再等 2 年才能开吃——把"青菜头到榨菜"的真实时间成本拍给你看。',
        },
        featured: true,
      },
    ],
  },
]

// 缺失语言填充英文兜底（翻译包 Phase 2 接入，见 data/translations/）
fillLocaleFallbacks(fermentedVideoGroups)
