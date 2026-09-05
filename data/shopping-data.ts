// 购物推荐数据 - 从旅行者社区真实反馈整理的「值得买」清单
// ---------------------------------------------------------------
// 数据来源：旅行者社区（r/chinatravel 等）数百条真实购买反馈，
// 价格为参考区间（人民币），随行就市会有浮动。
// 结构与 hub-data.ts 同构：L 字段 en/zh 必填，
// 其余 7 语由 data/translations/ 翻译包构建时合并，缺失回退英文。
// ---------------------------------------------------------------
import { mergeLanguagePack, fillLocaleFallbacks } from './localize'
import type { L } from './localize'
import { contentPacks } from './translations'

/** 商品品类（筛选与角标使用，i18n key: shopping.categories.*） */
export type ShoppingCategory = 'electronics' | 'fashion' | 'eyewear' | 'tea-food' | 'hobby' | 'crafts'

/** 避坑等级：low 正品渠道放心买 / medium 需要挑渠道 / high 货比三家谨慎出手 */
export type FakeRisk = 'low' | 'medium' | 'high'

/** 单条购物推荐 */
export interface ShoppingItem {
  id: number
  slug: string
  name: L
  category: ShoppingCategory
  tagline: L
  description: L
  /** 参考价（人民币区间 + 美元换算） */
  priceRef: L
  /** 去哪买（渠道 + 城市/门店提示） */
  whereToBuy: L
  /** 关联城市（现有城市 slug），无特定城市用 nationwide */
  citySlug: string
  /** 线下退税商店是否常见（大商场/品牌门店通常可退，市场摊位不可） */
  taxRefund: boolean
  fakeRisk: FakeRisk
  image: string
  featured: boolean
}

// ===== 原始数据（顺序即翻译包索引对齐顺序，勿随意调换） =====

const rawShoppingItems: Omit<ShoppingItem, 'id'>[] = [
  {
    slug: 'powerbank-chargers',
    name: { en: 'Power Banks, GaN Chargers & Cables', zh: '充电宝、氮化镓充电器与数据线' },
    category: 'electronics',
    tagline: { en: 'The #1 traveler pick — 30–50% cheaper than back home', zh: '游客首选第一名单——比欧美便宜 30–50%' },
    description: {
      en: 'Anker, Ugreen and Baseus accessories cost dramatically less in China than in Europe or North America — visitors from Italy and Singapore both report the same. A 65W GaN charger, a 10,000mAh power bank and braided USB-C cables together can cost less than a single charger at home. Grab a MagSafe battery pack while you\'re at it.',
      zh: '安克、绿联、倍思的配件在中国比欧美便宜一大截——来自意大利和新加坡的游客结论一致。65W 氮化镓充电器 + 一万毫安充电宝 + 编织数据线的总价，可能还不如国内单买一个充电器。磁吸充电宝也别错过。',
    },
    priceRef: { en: 'Cables from ¥20; chargers ¥60–150; power banks ¥80–200', zh: '数据线 ¥20 起；充电器 ¥60–150；充电宝 ¥80–200' },
    whereToBuy: { en: 'JD self-operated, Anker brand stores, or any mall electronics floor', zh: '京东自营、安克品牌店或任意商场的数码楼层' },
    citySlug: 'nationwide',
    taxRefund: true,
    fakeRisk: 'low',
    image: '/images/shopping/powerbank-chargers.jpg',
    featured: true,
  },
  {
    slug: 'xiaomi-luggage',
    name: { en: 'Xiaomi Luggage (the Famous ¥315 Suitcase)', zh: '小米行李箱（传说中的 ¥315 箱子）' },
    category: 'electronics',
    tagline: { en: 'Well-built 20-inch suitcase at a shockingly sane price', zh: '做工扎实的 20 寸登机箱，价格实在得离谱' },
    description: {
      en: 'Travelers rave about Xiaomi\'s suitcases — one owner has two in different sizes. The 20-inch runs about ¥315 on Taobao, and the Xiaomi-ecosystem brand 90go is about ¥254. Online is usually a bit cheaper than the physical store; if the store price is much higher, order online to your hotel — it arrives in 3–4 days. Buy several items at a Xiaomi store and politely ask for an extra discount.',
      zh: '小米行李箱在游客圈口碑极好——有人家里放着两个不同尺寸。20 寸淘宝约 ¥315，小米生态链的 90go 约 ¥254。线上通常比门店便宜一点；门店贵太多就寄到酒店，3–4 天到。在小米之家多买几件，礼貌问问额外折扣，常有惊喜。',
    },
    priceRef: { en: '20-inch: ¥315 (90go equivalent ¥254)', zh: '20 寸 ¥315（90go 同款约 ¥254）' },
    whereToBuy: { en: 'Taobao Xiaomi flagship store or Mi Home stores', zh: '淘宝小米旗舰店或小米之家门店' },
    citySlug: 'nationwide',
    taxRefund: true,
    fakeRisk: 'low',
    image: '/images/shopping/xiaomi-luggage.jpg',
    featured: true,
  },
  {
    slug: 'huawei-freeclip',
    name: { en: 'Huawei FreeClip Earbuds', zh: '华为 FreeClip 耳夹耳机' },
    category: 'electronics',
    tagline: { en: 'Around $170 — and simply unavailable in the US', zh: '约 $170——而且在美国根本买不到' },
    description: {
      en: 'Huawei\'s open-ear FreeClip earbuds became a viral souvenir: a US visitor paid about $177 and reported the whole family was jealous. They cannot be bought officially in the United States at all. Note the two honest caveats from owners: sound quality is a notch below AirPods for music, and the warranty is China-only.',
      zh: '华为的开放佩戴式 FreeClip 成了网红伴手礼：一位美国游客花约 $177 买入，全家都眼红。这款耳机在美国根本没有官方销售渠道。两个诚实的提醒：音质略逊 AirPods，且保修仅限中国大陆。',
    },
    priceRef: { en: '≈¥1,200–1,400 (~$170–190)', zh: '约 ¥1200–1400（$170–190）' },
    whereToBuy: { en: 'Huawei stores in malls or JD self-operated', zh: '商场华为门店或京东自营' },
    citySlug: 'nationwide',
    taxRefund: true,
    fakeRisk: 'low',
    image: '/images/shopping/huawei-freeclip.jpg',
    featured: false,
  },
  {
    slug: 'ssd-storage',
    name: { en: 'SSDs & Storage', zh: '固态硬盘与存储' },
    category: 'electronics',
    tagline: { en: '2TB at a fraction of Western prices', zh: '2TB 价格只有西方的零头' },
    description: {
      en: 'A traveler from India put it bluntly: 2TB and even 5TB drives cost "a fraction of the price" compared with home, and the gap versus Western retail is just as big. Stick to JD self-operated listings of name brands (Samsung, WD, Crucial, Kingston) — that is where the authentic-goods guarantee is.',
      zh: '一位印度游客说得很直白：2TB 甚至 5TB 的价格只及本土的零头，与西方零售的差距同样巨大。认准京东自营的品牌盘（三星、西数、英睿达、金士顿）——正品保障在这里。',
    },
    priceRef: { en: '2TB NVMe: ¥600–900', zh: '2TB NVMe：¥600–900' },
    whereToBuy: { en: 'JD self-operated (自营 badge) only', zh: '仅京东自营（认准「自营」标）' },
    citySlug: 'nationwide',
    taxRefund: true,
    fakeRisk: 'medium',
    image: '/images/shopping/ssd-storage.jpg',
    featured: false,
  },
  {
    slug: 'e-reader',
    name: { en: 'E-Readers (iReader & Friends)', zh: '电纸书（iReader 等）' },
    category: 'electronics',
    tagline: { en: 'Mainstream models ¥500–1,500 — worth it if you\'re coming from the UK', zh: '主流型号 ¥500–1500——从英国来很值得' },
    description: {
      en: 'Chinese e-readers like iReader start around ¥500–1,500 for mainstream models, with high-end units past ¥2,000. A UK visitor weighed exactly this question: whether buying here beats buying at home. The honest answer: hardware is cheaper in China, but check that the firmware language and store ecosystem suit you before committing.',
      zh: 'iReader 等国产电纸书主流型号 ¥500–1500，高端过 ¥2000。一位英国游客纠结的正是「比在英国买值不值」：诚实的答案是硬件确实更便宜，但下单前先确认固件语言和书城生态适合你。',
    },
    priceRef: { en: 'Mainstream models ¥500–1,500', zh: '主流型号 ¥500–1500' },
    whereToBuy: { en: 'JD self-operated or brand stores', zh: '京东自营或品牌门店' },
    citySlug: 'nationwide',
    taxRefund: true,
    fakeRisk: 'low',
    image: '/images/shopping/e-reader.jpg',
    featured: false,
  },
  {
    slug: 'huaqiangbei-tech',
    name: { en: 'Huaqiangbei: The World\'s Densest Electronics Market', zh: '华强北：全球最密集的电子市场' },
    category: 'electronics',
    tagline: { en: 'Nowhere else on earth this much tech in one place', zh: '世界上没有第二个地方电子货这么齐' },
    description: {
      en: 'If you love tech, Shenzhen\'s Huaqiangbei is a destination in itself — component markets, repair culture, gadget stalls and flagship stores stacked in blocks. Go for the experience, small accessories and repairs; for big-ticket items, remember the DJI-and-friends truth: global brands are price-unified, so buy where the warranty suits you. Bargain hard, check everything before paying, and skip anything that looks like a "too-good" flagship phone.',
      zh: '喜欢科技的话，深圳华强北本身就是个景点——元器件市场、维修文化、数码摊位和旗舰店挤在一起。为体验、小配件和维修而去；大件请记住大疆们的真相：全球品牌统一价，哪边保修方便哪边买。大胆砍价、付款前验货、来路不明的「超低价旗舰机」别碰。',
    },
    priceRef: { en: 'Experiences free; accessories from ¥10', zh: '逛免费；配件 ¥10 起' },
    whereToBuy: { en: 'Huaqiangbei, Shenzhen (metro Huaqiang Road)', zh: '深圳华强北（地铁华强路站）' },
    citySlug: 'nationwide',
    taxRefund: false,
    fakeRisk: 'high',
    image: '/images/shopping/huaqiangbei-tech.jpg',
    featured: true,
  },
  {
    slug: 'prescription-glasses',
    name: { en: 'Prescription Glasses, Ready in 20 Minutes', zh: '处方眼镜，20 分钟取件' },
    category: 'eyewear',
    tagline: { en: 'Complete pairs from ¥150–400 — 5–10× cheaper than the West', zh: '整副 ¥150–400 起——比欧美便宜 5–10 倍' },
    description: {
      en: 'Possibly the single best deal in China for anyone who wears glasses. Beijing Glasses City is an entire shopping mall of nothing but eyewear stores; a visitor\'s pair was cut and fitted in 20 minutes. Bring your prescription (a photo of your lens specs works) or get tested on the spot. Go before late afternoon — the market closes around 5 PM.',
      zh: '对戴眼镜的人来说，这可能是全中国最划算的一单。北京眼镜城是一整栋只有眼镜店的商场；有游客的眼镜 20 分钟配好取走。带上验光单（拍张镜片参数照片也行）或现场验光。别去太晚——市场下午 5 点左右关门。',
    },
    priceRef: { en: 'Complete pairs ¥150–400 (frames + lenses)', zh: '整副 ¥150–400（镜框+镜片）' },
    whereToBuy: { en: 'Beijing Glasses City (北京眼镜城)', zh: '北京眼镜城' },
    citySlug: 'beijing',
    taxRefund: false,
    fakeRisk: 'low',
    image: '/images/shopping/prescription-glasses.jpg',
    featured: true,
  },
  {
    slug: 'uniqlo-linen',
    name: { en: 'Uniqlo Linen & Basics', zh: '优衣库亚麻与基本款' },
    category: 'fashion',
    tagline: { en: '~40% off linen vs the EU, 20% on the rest', zh: '亚麻比欧盟便宜约 40%，其他约 20%' },
    description: {
      en: 'Measured, not vibes: an EU-based shopper found linen about 40% cheaper in China and roughly 20% off everything else, and visitors say the same every summer. If your itinerary hits a Uniqlo (they\'re in every mall), it\'s the easiest guaranteed saving on this list. International brands like adidas and Nike, by contrast, are priced the same as home — spend your money elsewhere.',
      zh: '实测数据而非感觉：一位常驻欧盟的游客发现中国优衣库亚麻约便宜 40%，其他商品约 20%，每年夏天游客结论一致。行程里只要路过优衣库（每个商场都有），这就是清单上最稳的省钱项。相比之下阿迪、耐克与国内同价——钱花别处吧。',
    },
    priceRef: { en: 'Linen shirts ¥99–199; AIRism tees ¥79', zh: '亚麻衬衫 ¥99–199；AIRism T恤 ¥79' },
    whereToBuy: { en: 'Any Uniqlo store in malls; same price nationwide', zh: '商场内任意优衣库；全国同价' },
    citySlug: 'nationwide',
    taxRefund: true,
    fakeRisk: 'low',
    image: '/images/shopping/uniqlo-linen.jpg',
    featured: true,
  },
  {
    slug: 'down-jacket',
    name: { en: 'Down Jackets (Anta, 361°, Uniqlo)', zh: '羽绒服（安踏、361°、优衣库）' },
    category: 'fashion',
    tagline: { en: 'Serious warmth at non-serious prices', zh: '认真保暖，价格不认真' },
    description: {
      en: 'Quality down jackets from Anta, 361° or Uniqlo are very reasonably priced in Chinese malls — worth checking if you\'re heading somewhere cold, or come from a warm country where down costs a fortune. Quality and fill weight vary by model, so compare fill-power labels, and obviously skip this one if you live in Singapore.',
      zh: '安踏、361°、优衣库的羽绒服在中国商场价格相当合理——要去冷的地方，或来自羽绒服贵到离谱的温暖国度，都值得看看。不同型号的充绒量和品质差异大，对比一下充绒参数；当然，住新加坡的就跳过这条。',
    },
    priceRef: { en: 'Anta/361°: ¥300–700; Uniqlo: ¥499–799', zh: '安踏/361°：¥300–700；优衣库：¥499–799' },
    whereToBuy: { en: 'Shopping-mall brand stores (Anta, 361°, Uniqlo)', zh: '商场品牌门店（安踏、361°、优衣库）' },
    citySlug: 'nationwide',
    taxRefund: true,
    fakeRisk: 'medium',
    image: '/images/shopping/down-jacket.jpg',
    featured: false,
  },
  {
    slug: 'suzhou-silk',
    name: { en: 'Suzhou Mulberry Silk', zh: '苏州桑蚕丝' },
    category: 'fashion',
    tagline: { en: 'Family-run quality with no online store at all', zh: '家庭品牌，连线上店都没有' },
    description: {
      en: 'A visitor bought "so much silk" from the family brand Xiuniang on Suzhou\'s Pingjiang Road — high quality, multiple city locations, and deliberately no online store. That makes it exactly the kind of find you can only get in person. Real mulberry silk (check for the 100% mulberry label and burn-test certificate) costs a fraction of what boutiques abroad charge.',
      zh: '一位游客在苏州平江路的家庭品牌「绣娘」买了「超多」丝绸——品质很高，苏州有多家店，且刻意不开线上店。这正是只能亲自到场才能买到的东西。真桑蚕丝（认准 100% 桑蚕丝标识与检验证书）的价格只及海外精品店的一小部分。',
    },
    priceRef: { en: 'Scarves from ¥100–300; garments ¥400+', zh: '丝巾 ¥100–300 起；衣物 ¥400 起' },
    whereToBuy: { en: 'Xiuniang (绣娘), Pingjiang Road, Suzhou — and their other Suzhou stores', zh: '苏州平江路「绣娘」及其苏州其他门店' },
    citySlug: 'nationwide',
    taxRefund: false,
    fakeRisk: 'medium',
    image: '/images/shopping/suzhou-silk.jpg',
    featured: true,
  },
  {
    slug: 'hanfu-souvenirs',
    name: { en: 'Hanfu, Tang Suits & Silk Scarves', zh: '汉服、唐装与丝巾' },
    category: 'fashion',
    tagline: { en: 'Wearable souvenirs with actual character', zh: '有性格的可穿戴伴手礼' },
    description: {
      en: 'Locals recommend going beyond trinkets: a proper Tang suit, a hanfu set, or fine silk scarves are gifts people keep using. Quality varies wildly between workshops — in person you can feel the fabric and check stitching, which is exactly what you cannot do on AliExpress. Many cities have hanfu streets; Suzhou and Xi\'an are the classics.',
      zh: '本地人的建议是别只买小玩意：一套像样的唐装、汉服或真丝丝巾，是收礼人真的会一直用的东西。不同作坊品质差异极大——现场能摸面料、看走线，这正是速卖通上做不到的。很多城市都有汉服街，苏州和西安最经典。',
    },
    priceRef: { en: 'Scarves ¥80–300; hanfu sets ¥300–800', zh: '丝巾 ¥80–300；汉服套装 ¥300–800' },
    whereToBuy: { en: 'Hanfu streets in Xi\'an/Suzhou, silk shops, museum stores', zh: '西安/苏州汉服街、丝绸店、博物馆文创店' },
    citySlug: 'nationwide',
    taxRefund: false,
    fakeRisk: 'medium',
    image: '/images/shopping/hanfu-souvenirs.jpg',
    featured: false,
  },
  {
    slug: 'chinese-tea',
    name: { en: 'Good Tea (Genuinely Cheaper)', zh: '好茶（真便宜）' },
    category: 'tea-food',
    tagline: { en: 'Quality tea costs a fraction of overseas prices', zh: '优质茶叶价格只及海外零头' },
    description: {
      en: '"Really good tea is much cheaper in China than most other places" — one of the most upvoted answers, and it holds. The catch is knowing what you\'re buying: shop where you can taste first (tea markets, brand stores like Tenfu), buy loose-leaf in quantity you\'ll actually drink, and skip the over-packaged tourist gift tins. Longjing, oolong and pu\'er all reward the curious.',
      zh: '「真正的好茶在中国比大多数地方便宜得多」——高赞答案之一，且属实。关键是要懂自己在买什么：去能先试喝的地方（茶叶市场、天福等品牌店），按真实饮量买散茶，跳过过度包装的游客礼盒。龙井、乌龙、普洱都值得认真试。',
    },
    priceRef: { en: 'Drinkable quality from ¥60–150 per 500g', zh: '口粮级 ¥60–150 / 500g 起' },
    whereToBuy: { en: 'Tea markets with tasting; brand stores; avoid airport tins', zh: '可试喝的茶叶市场；品牌门店；避开机场罐装' },
    citySlug: 'nationwide',
    taxRefund: true,
    fakeRisk: 'medium',
    image: '/images/shopping/chinese-tea.jpg',
    featured: true,
  },
  {
    slug: 'regional-food-gifts',
    name: { en: 'Regional Food Gifts', zh: '地方特产美食' },
    category: 'tea-food',
    tagline: { en: 'Crab-roe noodles to spice kits — gifts people fight over', zh: '从蟹黄面到调料礼盒——被疯抢的伴手礼' },
    description: {
      en: 'When a thread full of seasoned travelers was asked what to buy, the very first answer was one word: "Food." Regional specialties — Suzhou crab-roe noodle gift boxes, Sichuan spice kits, pastries from time-honored brands — are light, cheap and genuinely welcome at home. Buy at brand flagship stores or time-honored laozihao shops, not scenic-spot stalls.',
      zh: '当一整帖资深游客被问「买什么」，第一条答案只有一个词：「吃的」。各地特产——苏州蟹黄面礼盒、川味调料礼盒、老字号点心——轻便、便宜、带回去真的受欢迎。认准品牌旗舰店和老字号门店，别在景区摊位买。',
    },
    priceRef: { en: 'Gift boxes ¥30–150', zh: '礼盒 ¥30–150' },
    whereToBuy: { en: 'Laozihao (老字号) stores and brand flagships', zh: '老字号门店与品牌旗舰店' },
    citySlug: 'nationwide',
    taxRefund: false,
    fakeRisk: 'low',
    image: '/images/shopping/regional-food-gifts.jpg',
    featured: false,
  },
  {
    slug: 'acg-acrylic-stands',
    name: { en: 'ACG Goods: Acrylic Stands & Badges', zh: '谷子：亚克力立牌与徽章' },
    category: 'hobby',
    tagline: { en: '1/3–1/2 the Japan price, often better made', zh: '约日本 1/3–1/2 价，做工常更好' },
    description: {
      en: 'The insider pick for anyone into anime, comics or games. Acrylic stands for Genshin Impact, Honkai: Star Rail, ZZZ, Arknights and more cost 1/3–1/2 the Japanese price — and Chinese makers often embed the print inside the acrylic with layered, light-reactive designs. Note: many goods-store items count as hobby purchases, so for tax refunds stick to mall stores that are registered refund shops.',
      zh: '二次元爱好者的行家之选。《原神》《崩坏：星穹铁道》《绝区零》《明日方舟》的亚克力立牌价格约为日本的 1/3–1/2，且国内厂商常把印刷夹进亚克力内部、做出多层透光设计。注意：多数谷子店不在退税名录，要退税就去商场里挂牌的门店。',
    },
    priceRef: { en: 'Acrylic stands ¥20–60; badges ¥10–30', zh: '立牌 ¥20–60；徽章 ¥10–30' },
    whereToBuy: { en: 'Goods stores (谷子店) in big-city malls; Taobao flagship stores', zh: '大城市商场谷子店；淘宝旗舰店' },
    citySlug: 'nationwide',
    taxRefund: false,
    fakeRisk: 'low',
    image: '/images/shopping/acg-acrylic-stands.jpg',
    featured: true,
  },
  {
    slug: 'chinese-figures',
    name: { en: 'Chinese Figures & Model Kits', zh: '国产手办与模型' },
    category: 'hobby',
    tagline: { en: 'Officially sold in Japan at ~2× the Chinese price', zh: '官方出口日本，价格翻倍' },
    description: {
      en: 'Chinese figure brands — Hasuki, Snail Shell, Animester, Apex, Hobby Sakura — and model kit makers have gotten seriously good, and their products are officially distributed in Japan at roughly double the price. Buy direct in China from the brands\' Taobao flagship stores or specialty shops. Watch for bootlegs on third-party listings: flagship stores and JD self-operated are the safe channels.',
      zh: '国产手办品牌——Hasuki、蜗牛壳、Animester、Apex、Hobby Sakura——和模型厂商进步神速，产品官方出口到日本要卖约两倍价。在中国直接从品牌淘宝旗舰店或专门店买。警惕第三方店铺的山寨：旗舰店和京东自营才保险。',
    },
    priceRef: { en: 'Figures ¥100–600; model kits ¥80–400', zh: '手办 ¥100–600；模型 ¥80–400' },
    whereToBuy: { en: 'Brand Taobao flagship stores; specialty figure shops', zh: '品牌淘宝旗舰店；手办专门店' },
    citySlug: 'nationwide',
    taxRefund: false,
    fakeRisk: 'medium',
    image: '/images/shopping/chinese-figures.jpg',
    featured: false,
  },
  {
    slug: 'fountain-pens',
    name: { en: 'Fountain Pens & Stationery', zh: '钢笔与文具' },
    category: 'hobby',
    tagline: { en: 'A ¥30 pen that writes like a ¥100 one abroad', zh: '¥30 的笔有海外 ¥100 的手感' },
    description: {
      en: 'China makes a huge share of the world\'s pens, and domestic-market fountain pens (Hero, Pilot\'s China lines, plus workshop brands) are excellent value — a natural pick for the visitor asking about fountain pens specifically. Mall stationery counters and stationery megastores are the easy entry; specialty shops have the deep benches.',
      zh: '全球很大一部分钢笔产自中国，内销钢笔（英雄、百乐中国线以及工作室品牌）性价比极高——专门问钢笔的游客选这个最合适。商场文具专柜和文具大店是轻松入门；深度玩家去专门店。',
    },
    priceRef: { en: 'From ¥30; quality daily writers ¥80–300', zh: '¥30 起；日用好笔 ¥80–300' },
    whereToBuy: { en: 'Stationery megastores and mall counters', zh: '文具大店与商场专柜' },
    citySlug: 'nationwide',
    taxRefund: true,
    fakeRisk: 'medium',
    image: '/images/shopping/fountain-pens.jpg',
    featured: false,
  },
  {
    slug: 'xuan-paper-calligraphy',
    name: { en: 'Xuan Paper & Calligraphy Sets', zh: '宣纸与文房四宝' },
    category: 'crafts',
    tagline: { en: 'Souvenirs with actual use, from the source', zh: '产地直供、真的会被用掉的伴手礼' },
    description: {
      en: 'A local\'s recommendation that most visitors never hear: Xuan paper from Jingxian, Anhui — the rice paper Chinese calligraphy and painting have used for a millennium — plus inkstones and brushes, sold at source prices. Unlike the inflated tourist-street purple clay teapots, art supplies from a proper stationery street are honestly priced. Great gift for anyone who writes, draws or paints.',
      zh: '一个多数游客没听过的本地人推荐：安徽泾县宣纸——中国书画用了一千年的纸——配砚台毛笔，产地价。与旅游街虚高的紫砂壶不同，正规文具街的文房用品价格实在。送给写字、画画的人都合适。',
    },
    priceRef: { en: 'Paper from ¥30/100 sheets; sets ¥100–300', zh: '宣纸 ¥30/100 张起；套装 ¥100–300' },
    whereToBuy: { en: 'Calligraphy supply streets (Liulichang in Beijing; Wenhua Street in Xi\'an)', zh: '文房用品街（北京琉璃厂、西安书院门）' },
    citySlug: 'nationwide',
    taxRefund: false,
    fakeRisk: 'medium',
    image: '/images/shopping/xuan-paper-calligraphy.jpg',
    featured: false,
  },
  {
    slug: 'museum-gifts',
    name: { en: 'Museum Gift Shops (Start with NMC)', zh: '博物馆文创（先逛国博）' },
    category: 'crafts',
    tagline: { en: 'Replicas and designs you can\'t get anywhere else', zh: '别处买不到的复刻与设计' },
    description: {
      en: '"National Museum of China in Beijing — very excellent!" is a direct quote, and it generalizes: China\'s big museums have turned gift shops into design studios. Faithful artifact replicas, scarves, tea sets and stationery keyed to actual collections make gifts with a story. Free-entry museums just need a reservation — tie the visit and the shopping into one morning.',
      zh: '「北京的中国国家博物馆，真是太棒了！」——这是原话，而且可以推广：中国大博物馆把文创店做成了设计工作室。高还原文物复刻、丝巾、茶具、文具都对应真实馆藏，送礼有故事。免费博物馆只需预约——参观和购物一个上午一起搞定。',
    },
    priceRef: { en: 'Souvenirs ¥30–300', zh: '文创 ¥30–300' },
    whereToBuy: { en: 'National Museum of China gift shop; major museum stores', zh: '中国国家博物馆文创店；各大博物馆文创' },
    citySlug: 'beijing',
    taxRefund: true,
    fakeRisk: 'low',
    image: '/images/shopping/museum-gifts.jpg',
    featured: true,
  },
]

// ===== 组装与访问函数 =====

let _shoppingId = 0

const shoppingItems: ShoppingItem[] = rawShoppingItems.map(s => ({ ...s, id: ++_shoppingId }))

// 合并各语言翻译包（数组按索引对齐），并为缺失语言填充英文兜底
for (const [lang, pack] of Object.entries(contentPacks)) {
  shoppingItems.forEach((s, i) => mergeLanguagePack(s, pack.shoppingItems?.[i], lang, `shoppingItems[${i}]`))
}
fillLocaleFallbacks(shoppingItems)

// 全部购物推荐
export function getShoppingItems(): ShoppingItem[] {
  return shoppingItems
}

// 编辑精选（目录页默认排序权重）
export function getFeaturedShoppingItems(): ShoppingItem[] {
  return shoppingItems.filter(s => s.featured)
}

// 按品类筛选
export function getShoppingItemsByCategory(category: ShoppingCategory): ShoppingItem[] {
  return shoppingItems.filter(s => s.category === category)
}
