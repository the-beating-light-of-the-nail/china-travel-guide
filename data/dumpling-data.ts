// 饺子图鉴数据 - 把中国饺子吃明白：15 种皮、五种做法、一张地图
// ---------------------------------------------------------------
// 结构与 shopping-data.ts 同构：L 字段 en/zh 必填，
// 其余 7 语由 data/translations/ 翻译包构建时合并，缺失回退英文。
// 图片来自 Wikimedia Commons 自由许可（CC0/CC BY/CC BY-SA），
// 署名清单见 public/images/dumplings/CREDITS.md，
// 抓取脚本 scripts/fetch-dumpling-images.mjs。
// ---------------------------------------------------------------
import { mergeLanguagePack, fillLocaleFallbacks } from './localize'
import type { L } from './localize'
import { contentPacks } from './translations'

/** 做法（筛选与角标使用，i18n key: dumplings.categories.*） */
export type DumplingCategory = 'boiled' | 'pan-fried' | 'steamed' | 'soup' | 'sweet'

/** 辣度：none 不辣 / medium 微辣 / spicy 麻辣 */
export type SpiceLevel = 'none' | 'medium' | 'spicy'

/** 单个饺子条目 */
export interface DumplingItem {
  id: number
  slug: string
  name: L
  category: DumplingCategory
  tagline: L
  description: L
  /** 参考价（人民币） */
  priceRef: L
  /** 去哪吃（渠道 + 城市提示） */
  whereToEat: L
  /** 关联城市（现有城市 slug），无特定城市用 nationwide */
  citySlug: string
  spice: SpiceLevel
  /** 是否常见素馅版本 */
  vegOption: boolean
  image: string
  featured: boolean
}

// ===== 原始数据（顺序即翻译包索引对齐顺序，勿随意调换） =====

const rawDumplingItems: Omit<DumplingItem, 'id'>[] = [
  {
    slug: 'jiaozi',
    name: { en: 'Jiaozi (Boiled Dumplings)', zh: '水饺' },
    category: 'boiled',
    tagline: { en: 'The dumpling — northern China\'s answer to everything', zh: '饺子——北方人一切节日和乡愁的答案' },
    description: {
      en: 'The archetype every other entry on this page riffs on: a wheat wrapper crimped into a fat half-moon, boiled in waves of water and served dry with a dip dish of black vinegar and raw garlic. Fillings run pork-and-cabbage, pork-and-chive, or lamb-and-scallion in the northwest. Eating jiaozi at midnight on Lunar New Year is northern China\'s single strongest food ritual — families fold them together for hours, then eat them in minutes. Vegetarian versions (egg-and-chive, mushroom) are on nearly every menu.',
      zh: '本页所有条目的「祖先」：小麦面皮对折捏出半月形胖墩，滚水三沸捞出，蘸黑醋蒜泥吃。馅料从猪肉白菜、猪肉韭菜到西北的羊肉大葱。除夕半夜吃饺子是北方最根深蒂固的食俗——全家包一下午，十分钟吃光。几乎每家店都有素馅版本（韭菜鸡蛋、香菇）。',
    },
    priceRef: { en: '¥12–25 per plate of ~15', zh: '一份约 15 只 ¥12–25' },
    whereToEat: { en: 'Any laozihao dumpling house; Beijing hutong jiaozi shops at breakfast and dinner', zh: '老字号饺子馆；北京胡同饺子馆（早市和晚餐都有）' },
    citySlug: 'beijing',
    spice: 'none',
    vegOption: true,
    image: '/images/dumplings/jiaozi.jpg',
    featured: true,
  },
  {
    slug: 'zhong-dumplings',
    name: { en: 'Zhong Dumplings', zh: '钟水饺' },
    category: 'boiled',
    tagline: { en: 'Chengdu\'s sweet-spicy chili-oil icon since 1893', zh: '1893 年起成都的甜辣红油名片' },
    description: {
      en: 'All-pork dumplings with thin, silky skins, bathed in a glossy sauce of sweet-spicy chili oil, dark soy, sugar and a heavy hit of raw garlic — no soup, all coating. Founded by Zhong Shaobai in 1893, the original shop on Tidu Street still pulls queues, and the convenient outposts near Wenshu Monastery and Wuhou Shrine make it an easy Chengdu snack stop. Sichuan people will tell you the sauce is the dish; they are right.',
      zh: '纯猪肉馅、皮薄滑嫩，出锅淋上一勺甜辣红油——红油、复制酱油、白糖加足量蒜泥，无汤全靠挂汁。1893 年钟少白创始，提督街老店至今排队，文殊院、武侯祠旁的分店让外地人顺手就能吃到。川人会告诉你「这碗的灵魂是料汁」——他们没说错。',
    },
    priceRef: { en: '¥10–15 for 10', zh: '10 只 ¥10–15' },
    whereToEat: { en: 'Zhong Dumplings (钟水饺) branches — original on Tidu St, plus Wenshu Monastery & Wuhou Shrine area', zh: '钟水饺各分店——提督街总店及文殊院、武侯祠店' },
    citySlug: 'chengdu',
    spice: 'medium',
    vegOption: false,
    image: '/images/dumplings/zhong-dumplings.jpg',
    featured: true,
  },
  {
    slug: 'chaoshou',
    name: { en: 'Chao Shou (Sichuan Wontons in Red Oil)', zh: '红油抄手' },
    category: 'soup',
    tagline: { en: '“Crossed-hands” wontons drowning in mala chili oil', zh: '「交叠双手」的馄饨，泡在麻辣红油里' },
    description: {
      en: 'Sichuan\'s wonton: a thinner, slippier wrapper than jiaozi, folded so the corners cross like clasped hands — hence the name, literally “crossed hands.” The red-oil version arrives in a scarlet bath of chili oil, Sichuan peppercorn, garlic and a splash of vinegar; ask for “qing tang” (clear broth) if you want the gentle twin. Long Chaoshou, a Chengdu institution since 1941, serves both. Smaller than northern wontons, dangerously easy to eat fifteen of.',
      zh: '四川的馄饨：皮比饺子更薄更滑，对角一捏形如交叠的双手——名字就是这么来的。红油版泡在辣椒、花椒、蒜泥和醋调成的猩红汤汁里；想温柔一点就说「清汤」。1941 年开业的龙抄手是成都的老门面，两种都做。个头比北方馄饨小，不知不觉就是十五个。',
    },
    priceRef: { en: '¥8–14 per bowl of 10', zh: '一碗 10 只 ¥8–14' },
    whereToEat: { en: 'Long Chaoshou (龙抄手) in Chengdu; any Sichuan noodle shop', zh: '成都龙抄手；任意川味面馆' },
    citySlug: 'chengdu',
    spice: 'spicy',
    vegOption: false,
    image: '/images/dumplings/chaoshou.jpg',
    featured: false,
  },
  {
    slug: 'guotie',
    name: { en: 'Guo Tie (Potstickers)', zh: '锅贴' },
    category: 'pan-fried',
    tagline: { en: 'Crispy golden soles, juicy filling, done in minutes', zh: '金黄脆底、爆汁内馅，几分钟出锅' },
    description: {
      en: 'Long, slender dumplings pan-fried in a shallow splash of water-and-oil so the bottoms fry to a lacy golden crisp while the tops steam tender. The contrast — shatter, then juice — is the whole point. Street-breakfast royalty across China: watch the flat-top masters ladle water, clap on the lid, and lift a whole connected sheet twenty seconds later. Dip in vinegar with a shred of ginger. The Bafang Yunji chain is a reliable everywhere-option.',
      zh: '细长身形的饺子，平底锅少油加水煎——底面结出金黄脆壳，顶上蒸汽焖熟。先脆后爆汁的反差感就是全部意义。街头早餐之王：看老师傅淋水、扣盖，二十秒后整片铲起连成一排。配姜丝香醋。八方云集连锁是随处可得的稳妥选择。',
    },
    priceRef: { en: '¥8–15 for 8–10', zh: '8–10 只 ¥8–15' },
    whereToEat: { en: 'Street breakfast stalls; Bafang Yunji (八方云集) chain stores', zh: '街头早餐摊；八方云集连锁' },
    citySlug: 'nationwide',
    spice: 'none',
    vegOption: true,
    image: '/images/dumplings/guotie.jpg',
    featured: false,
  },
  {
    slug: 'suantang-shuijiao',
    name: { en: 'Suan Tang Shui Jiao (Sour-Soup Dumplings)', zh: '酸汤水饺' },
    category: 'soup',
    tagline: { en: 'Xi\'an\'s midnight Muslim-Quarter warmer', zh: '西安回民街的深夜暖身神器' },
    description: {
      en: 'Xi\'an\'s answer to a cold night: beef or lamb dumplings (halal, intense) floating in a broth sharpened with black vinegar, white pepper, chili and a spoon of sizzling oil. The soup itself is half the order — sour first, then peppery, then beefy. Standard issue in the Muslim Quarter around Huajue and Beiyuanmen, where shops ladle it until 2 AM. Locals add extra vinegar and chili from the table caddies; copy them.',
      zh: '西安对寒冷夜晚的回答：牛肉或羊肉馅饺子（清真、味道足）泡在以香醋、白胡椒、辣子和热油激过的酸汤里。汤占这碗的一半——先酸、再辣、后肉香。北院门和化觉巷一带的回民街名店会营业到凌晨两点。本地人会再从桌上加醋加辣——照做就是。',
    },
    priceRef: { en: '¥13–18 for 15, soup included', zh: '15 只带汤 ¥13–18' },
    whereToEat: { en: 'Muslim Quarter (北院门/化觉巷) dumpling shops, Xi\'an — open past midnight', zh: '西安回民街（北院门、化觉巷）水饺店——营业到深夜' },
    citySlug: 'xian',
    spice: 'medium',
    vegOption: false,
    image: '/images/dumplings/suantang-shuijiao.jpg',
    featured: true,
  },
  {
    slug: 'shengjianbao',
    name: { en: 'Sheng Jian Bao (Pan-Fried Soup Buns)', zh: '生煎包' },
    category: 'pan-fried',
    tagline: { en: 'Shanghai\'s blistered-bottom soup bombs', zh: '底面起脆壳的上海汤包炸弹' },
    description: {
      en: 'Thicker-skinned cousins of xiaolongbao, fried raw (“sheng”) in a wide pan until the bottoms blister amber, then showered with sesame seeds and scallions. Inside: a pork plug and a scalding pocket of soup. The Shanghai protocol: bite a small hole on the side, slurp the broth, then commit. One order is four to six buns — a breakfast, not a feast — and the best shops sell out by 10 AM. Now common in every big city\'s food streets.',
      zh: '小笼包的厚皮表亲：生坯下宽锅煎到底面焦糖起壳，出锅前撒芝麻葱花。里面是猪肉丸子和一包滚烫的汤汁。上海标准流程：侧面咬小口、先吸汤、再整个下肚。一客四到六个——是早餐不是宴席——最好的店十点前就卖光。现在各大城市美食街都很常见。',
    },
    priceRef: { en: '¥8–15 for 4', zh: '4 只 ¥8–15' },
    whereToEat: { en: 'Shanghai-style breakfast shops; big-city food streets nationwide', zh: '沪式早餐店；全国各大城市美食街' },
    citySlug: 'nationwide',
    spice: 'none',
    vegOption: false,
    image: '/images/dumplings/shengjianbao.jpg',
    featured: true,
  },
  {
    slug: 'xiaolongbao',
    name: { en: 'Xiao Long Bao (Soup Dumplings)', zh: '小笼包' },
    category: 'steamed',
    tagline: { en: 'Nanjing Road\'s featherweight aspic magician', zh: '皮薄如纸、靠肉冻变戏法的汤包' },
    description: {
      en: 'The precision instrument of the dumpling world: a paper-thin wrapper (ideally ≥18 pleats, Din Tai Fung demands 18 exactly) hiding a pork meatball and soup that was solid aspic when the bun was folded. Steam melts it back to broth. Born in Nanxiang, a Shanghai suburb town, perfected across the Yangtze delta. Eat in the prescribed order: onto the spoon, nibble the skin, drink the soup, dip the rest in ginger vinegar. Crab-roe versions are the autumn flex.',
      zh: '饺子世界的精密仪器：纸一样薄的面皮（讲究 18 褶以上，鼎泰丰正好 18 褶），包着猪肉丸子和折时还是肉冻的「汤」。上锅一蒸，冻化回汤。出生于上海郊区的南翔镇，在长江三角洲被做到极致。标准吃法：先放勺子、咬破皮、喝汤、再蘸姜醋整个吃。秋季的蟹粉版是隐藏菜。',
    },
    priceRef: { en: '¥10–30 for 6, chains higher', zh: '6 只 ¥10–30（连锁店更贵）' },
    whereToEat: { en: 'Nanxiang Steamed Bun (南翔馒头店) at Yu Garden, Shanghai; XLB shops in every major city', zh: '上海豫园南翔馒头店；各大城市小笼包专门店' },
    citySlug: 'nationwide',
    spice: 'none',
    vegOption: false,
    image: '/images/dumplings/xiaolongbao.jpg',
    featured: true,
  },
  {
    slug: 'baozi',
    name: { en: 'Baozi (Steamed Buns)', zh: '包子' },
    category: 'steamed',
    tagline: { en: 'China\'s breakfast clock: fluffy, ¥2, everywhere', zh: '中国的早餐时钟：暄软、两块钱、到处都是' },
    description: {
      en: 'The tall, fluffy, fully-closed steamed bun — thicker dough than any dumpling, cloud-like from a long yeast rise. Sold from bamboo steamers stacked tower-high at street windows from 6 AM, usually ¥2–3 a piece: char siu (BBQ pork) in the south, pork-and-cabbage or beef-and-onion up north, and always a vegetarian option — the pumpkin-filled nangua baozi is a quiet classic. In Beijing, the Qingfeng chain is famous enough to be a stop on its own.',
      zh: '高高胖胖、收口捏紧的蒸包——面皮比一切饺子都厚，长时间发酵成就云朵口感。清晨六点起在街边窗口的竹蒸笼塔里售卖，通常两三块钱一个：南方叉烧，北方猪肉白菜或牛肉大葱，而且必有素馅——南瓜包子是被低估的经典。在北京，庆丰包子铺本身就是个打卡点。',
    },
    priceRef: { en: '¥2–3 each; a filling breakfast under ¥10', zh: '每个 ¥2–3；十元内吃到饱' },
    whereToEat: { en: 'Street steamer windows everywhere; Qingfeng Baozipu (庆丰) in Beijing', zh: '任意街头蒸笼窗口；北京庆丰包子铺' },
    citySlug: 'beijing',
    spice: 'none',
    vegOption: true,
    image: '/images/dumplings/baozi.jpg',
    featured: false,
  },
  {
    slug: 'har-gow',
    name: { en: 'Har Gow (Crystal Shrimp Dumplings)', zh: '虾饺' },
    category: 'steamed',
    tagline: { en: 'The dim-sum litmus test: translucent, springy, ten pleats', zh: '点心试金石：透亮、弹牙、十褶' },
    description: {
      en: 'Cantonese yum cha\'s benchmark dish: a wheat-starch skin stretched glassy-thin over a whole chopped shrimp that should bounce back when bitten. Connoisseurs judge a tea house entirely on its har gow — the skin must be translucent without tearing, pleats ideally ten or more, no leaking at the table. Comes in a bamboo steamer with a pot of pu\'er or chrysanthemum tea alongside. Weekend dim sum with the trolley carts is one of China\'s great dining theater experiences.',
      zh: '广式饮茶的基准菜：澄面皮拉到玻璃纸般的透亮，包着整只剁碎的虾仁——咬下去要能回弹。行家完全以虾饺论茶楼高下：皮透不破、褶十道起步、上桌不漏底。装在竹蒸笼里，旁边配一壶普洱或菊花茶。周末推车仔饮茶是中国最精彩的餐饮剧场之一。',
    },
    priceRef: { en: '¥15–40 per steamer of 4', zh: '一笼 4 只 ¥15–40' },
    whereToEat: { en: 'Cantonese tea houses & dim sum restaurants in every big city', zh: '各大城市粤式茶楼与点心店' },
    citySlug: 'nationwide',
    spice: 'none',
    vegOption: false,
    image: '/images/dumplings/har-gow.jpg',
    featured: true,
  },
  {
    slug: 'shumai',
    name: { en: 'Shu Mai (Open-Top Dumplings)', zh: '烧卖' },
    category: 'steamed',
    tagline: { en: 'The pleated cup that never closes', zh: '永不收口的百褶小杯' },
    description: {
      en: 'The yin to har gow\'s yang on every dim sum table: a thin yellow wrapper gathered — not sealed — into an open tulip shape, the pork-and-shrimp filling crowning through the top, often dotted with a single orange crab roe or carrot coin. Because it never closes, the filling stays loose and juicy while the cup\'s walls go silky. Northern China has its own pork-and-glutinous-rice version sold from breakfast windows — heartier, equally ¥2-cheap.',
      zh: '虾饺在每张点心桌上的另一极：黄色薄皮拢而不封，捏成开口的郁金香杯，猪肉虾仁馅从顶上冒头，常点一粒橘色蟹籽或胡萝卜花。正因为不封口，馅心松散多汁，杯壁蒸得滑韧。北方另有猪肉糯米烧卖，早餐窗口论个卖——更顶饱，同样两块钱级。',
    },
    priceRef: { en: '¥12–35 per steamer of 4', zh: '一笼 4 只 ¥12–35' },
    whereToEat: { en: 'Dim sum restaurants; northern breakfast windows (sticky-rice version)', zh: '点心茶楼；北方早餐窗口（糯米烧卖）' },
    citySlug: 'nationwide',
    spice: 'none',
    vegOption: false,
    image: '/images/dumplings/shumai.jpg',
    featured: false,
  },
  {
    slug: 'crystal-dumplings',
    name: { en: 'Chaozhou Fun Guo (Crystal Dumplings)', zh: '潮州粉果' },
    category: 'steamed',
    tagline: { en: 'Translucent skin, peanut-chive crunch, often vegetarian', zh: '半透明皮、花生韭菜脆口，常有素版' },
    description: {
      en: 'Chaozhou-Teochew contribution to the dim sum canon: a dough of wheat and starch that steams to a genuine window-glass translucence, showing off the filling — classically peanuts, chives, dried shrimp and pork, a mix that crunches. Many shops make a fully vegetarian version with peanuts, chives, mushroom and glass noodles, which makes this the entry vegetarians keep in their back pocket at Cantonese restaurants. Look for the fat oval shape with the braided top seam.',
      zh: '潮州人对点心谱系的贡献：小麦淀粉混合面团蒸到真正的玻璃透亮，把馅料亮出来——经典是花生、韭菜、虾米和肉丁，一口脆响。很多店做全素版（花生、韭菜、香菇、粉丝），这让它成为素食者在粤菜馆的救命暗号。认准胖椭圆形加顶上花边收口。',
    },
    priceRef: { en: '¥15–30 per steamer of 3–4', zh: '一笼 3–4 只 ¥15–30' },
    whereToEat: { en: 'Teochew & Cantonese dim sum restaurants', zh: '潮汕菜馆与粤式点心店' },
    citySlug: 'nationwide',
    spice: 'none',
    vegOption: true,
    image: '/images/dumplings/crystal-dumplings.jpg',
    featured: false,
  },
  {
    slug: 'wonton-noodles',
    name: { en: 'Wonton Noodles (Yun Tun Mian)', zh: '云吞面' },
    category: 'soup',
    tagline: { en: 'Cantonese engineering: prawn wontons on a noodle trampoline', zh: '广式工程学：弹牙面上卧着鲜虾云吞' },
    description: {
      en: 'A Guangzhou-Hong Kong classic where the dumpling is only half the point: slippery prawn-and-pork wontons (smaller, daintier than northern cousins) parked on a raft of alkaline egg noodles that stay springy in a clear anchovy-and-dashi-style broth. Traditionalists insist the noodles go in first, wontons on top “so the bed stays firm.” A bowl costs the same as a coffee and is a complete meal at any hour. The kondow (springy noodle) texture is the tell of a good shop.',
      zh: '广港经典，饺子只占一半看点：滑溜的鲜虾猪肉云吞（比北方馄饨更小巧）卧在碱性蛋面上，泡在清亮的鱼虾高汤里——面条久泡仍弹。老派讲究「面在下、云吞在上，让面床保持弹劲」。一碗咖啡的价钱，任何时段都是完整一餐。「爽韧」的面是判店标准。',
    },
    priceRef: { en: '¥15–35 per bowl', zh: '一碗 ¥15–35' },
    whereToEat: { en: 'Hong Kong–style cha chaan tengs and noodle shops in every city', zh: '各城市港式茶餐厅与粉面店' },
    citySlug: 'nationwide',
    spice: 'none',
    vegOption: false,
    image: '/images/dumplings/wonton-noodles.jpg',
    featured: false,
  },
  {
    slug: 'tangyuan',
    name: { en: 'Tangyuan (Sweet Glutinous Balls)', zh: '汤圆' },
    category: 'sweet',
    tagline: { en: 'Molten black-sesame lava in a snowball', zh: '雪球里包着熔岩黑芝麻' },
    description: {
      en: 'The sweet endpoint of the dumpling family: glutinous-rice balls, snow-white and chewy, filled with black-sesame paste that pours out like lava on the first bite (peanut and red-bean versions tie). Served in the boiling water they cooked in, or in fermented rice wine (jiuniang) for the grown-up version. Eaten at the Lantern Festival and Winter Solstice to seal the holiday season — the round shape means reunion. Guizhou and Sichuan also do a savory tangyuan tradition; ask for “tian tangyuan” (sweet) to be safe.',
      zh: '饺子家族的甜品终点：糯米团子，雪白软糯，咬开是熔岩般流出的黑芝麻馅（花生、红豆并列第二）。直接连煮汤盛碗，大人版加醪糟（酒酿）。元宵和冬至必吃——圆即团圆。贵州、四川另有咸汤圆流派，想稳妥就说「甜汤圆」。',
    },
    priceRef: { en: '¥6–15 per bowl of 6–8', zh: '一碗 6–8 只 ¥6–15' },
    whereToEat: { en: 'Dessert shops, supermarket freezer (Hayao brand), festival street stalls', zh: '甜品店、超市冷冻柜（湾仔码头等）、节庆街头摊' },
    citySlug: 'nationwide',
    spice: 'none',
    vegOption: true,
    image: '/images/dumplings/tangyuan.jpg',
    featured: false,
  },
  {
    slug: 'zongzi',
    name: { en: 'Zongzi (Sticky Rice Dumplings)', zh: '粽子' },
    category: 'sweet',
    tagline: { en: 'Bamboo-leaf parcels, Dragon Boat currency', zh: '竹叶包裹的糯米粽，端午节的硬通货' },
    description: {
      en: 'China\'s oldest “dumpling”: glutinous rice wrapped in bamboo or reed leaves and boiled for hours — portable food invented millennia ago for the Dragon Boat Festival, now eaten year-round at breakfast carts. The great north-south divide: northern zongzi are sweet (red dates, red-bean paste, dipped in sugar); southern ones are savory (pork belly, salted egg yolk, mushrooms — the Jiaxing pork zongzi is the gold standard). Unwrap the string, peel the leaves, and the rice comes out jade-green and leaf-perfumed.',
      zh: '中国最古老的「饺子」：糯米裹进竹叶或苇叶煮几个小时——几千年前为端午发明的便携口粮，如今早餐车全年供应。南北大分裂：北方粽子是甜的（红枣、豆沙，蘸糖）；南方是咸的（五花肉、咸蛋黄、香菇——嘉兴肉粽是黄金标准）。解开绳子、剥开叶子，米粒带着叶香呈玉绿色。',
    },
    priceRef: { en: '¥3–8 each; gift boxes higher', zh: '每个 ¥3–8；礼盒装更贵' },
    whereToEat: { en: 'Breakfast carts, Wufangzhai (五芳斋) shops, Dragon Boat season markets', zh: '早餐车、五芳斋门店、端午时令市场' },
    citySlug: 'nationwide',
    spice: 'none',
    vegOption: true,
    image: '/images/dumplings/zongzi.jpg',
    featured: false,
  },
  {
    slug: 'xian-tangbao',
    name: { en: 'Xi\'an Tang Bao (Jia San Soup Buns)', zh: '西安灌汤包（贾三）' },
    category: 'steamed',
    tagline: { en: 'Beef-and-lamb soup buns in the Muslim Quarter', zh: '回民街的牛羊肉灌汤包' },
    description: {
      en: 'Xi\'an\'s own take on the soup bun — bigger and bolder than Shanghai\'s, filled with beef or lamb (halal cuisine of the Hui community) and a serious pour of broth. Jia San, on West Sheep Street (Xiyang Shi) in the Muslim Quarter, is the name everyone recommends: paper-thin skins, a vinegar-and-chili dip that cuts the richness, and a dining room that runs like a dumpling factory. Lift with chopsticks, rest on the spoon, open carefully — this is the soup-iest item on this page.',
      zh: '西安自己的汤包流派——比上海的更大更豪放，馅是牛肉或羊肉（回族清真风味），汤汁给得毫不含糊。回民街西羊市的贾三是所有人都会推荐的名字：皮薄如纸、蘸醋辣子解腻、堂内运转如饺子工厂。筷子夹起、勺子垫底、小心开包——这是全页汤量最猛的一个。',
    },
    priceRef: { en: '¥15–25 per basket of 8–10', zh: '一笼 8–10 只 ¥15–25' },
    whereToEat: { en: 'Jia San Guantangbao (贾三灌汤包子馆), West Sheep St, Xi\'an Muslim Quarter', zh: '西安回民街西羊市贾三灌汤包子馆' },
    citySlug: 'xian',
    spice: 'none',
    vegOption: false,
    image: '/images/dumplings/xian-tangbao.jpg',
    featured: false,
  },
]

// ===== 组装与访问函数 =====

let _dumplingId = 0

const dumplingItems: DumplingItem[] = rawDumplingItems.map(d => ({ ...d, id: ++_dumplingId }))

// 合并各语言翻译包（数组按索引对齐），并为缺失语言填充英文兜底
for (const [lang, pack] of Object.entries(contentPacks)) {
  dumplingItems.forEach((d, i) => mergeLanguagePack(d, pack.dumplingItems?.[i], lang, `dumplingItems[${i}]`))
}
fillLocaleFallbacks(dumplingItems)

// 全部饺子条目
export function getDumplingItems(): DumplingItem[] {
  return dumplingItems
}

// 编辑精选（目录页默认排序权重）
export function getFeaturedDumplingItems(): DumplingItem[] {
  return dumplingItems.filter(d => d.featured)
}

// 按做法筛选
export function getDumplingItemsByCategory(category: DumplingCategory): DumplingItem[] {
  return dumplingItems.filter(d => d.category === category)
}
