# 《发酵白菜宇宙》内容规划（Fermented Cabbage Universe）

> 状态：**Phase 1 已完成**（2026-09-06）——文章已创作并接入视频架/FAQ/互链，`nuxt generate` 9 语言构建通过、页面渲染验收通过（见第 6 节）。
> 下一步：Phase 2 深度翻译（ko/ja/de）。
> 载体：chinatravel.world / guides 板块（Phase 1 长文）。
> 已就位资产：头图 `public/images/guides/suancai-vs-sauerkraut.jpg`（Commons CC BY-SA 4.0，酸菜鱼实拍，署名见 `public/images/guides/CREDITS.md`）；抓图脚本 `scripts/fetch-suancai-cover.mjs`；
> **B 站精选视频 16 条**（`data/fermented-videos.ts` + 封面 `public/images/vlogs/<bvid>.jpg` × 16）。

## 0. 一句话定位

借外国人已经认识的 **kimchi**（全球发酵菜第一词）和 **sauerkraut**（欧美基本盘）当敲门砖，
把他们引进**中国发酵食品版图**——东北酸菜、四川泡菜、贵州酸汤、重庆酸菜鱼、涪陵榨菜……
用事实密度展示"大国底蕴"，最终沉淀为美食旅行内容资产，导流城市页和饺子图鉴。

## 1. 数据底盘（Google Trends 实测，近 12 个月，同尺度相对值）

| 关键词 | 全球 | 美国 | 德国 |
|---|---|---|---|
| kimchi | 46.1 | 40.0 | 32.6 |
| sauerkraut | 16.3 | 20.9 | **52.4** |
| pickled cabbage | 1.0 | 1.0 | ~0 |
| suan cai | 0.09 | ~0 | ~0 |

三条结论：
1. **kimchi 是绝对流量磁铁**（连德国都不低）——文章必须把 kimchi 拉进对比，只做中西对比等于自断流量。
2. **suan cai 是零起点词**——文章不靠主词吃饭，靠长尾组合词 + 站内美食集群权重。
3. **德国市场 sauerkraut > kimchi**——de 版有独特卖点（"德国人视角看中国酸菜"）。

## 2. 载体与阶段

- **Phase 1**：guides 长文 1 篇（slug 建议 `kimchi-sauerkraut-suancai`），复用现有 Guide 模式，
  自动获得 Article JSON-LD + hreflang + 9 语言兜底。成本最低，先验证。
  唯一结构性扩展：Guide 支持可选 `videos` 字段，正文后渲染分组视频架（设计见第 5 节）。
- **Phase 2**：ko / ja 深度翻译 + de 核心字段翻译（guide 模式其余语言自动英文兜底）。
- **Phase 3**：若 Search Console 3 个月数据达标（长尾有曝光、停留时长达标）→
  升级 `/fermented-foods` 图鉴目录页，复刻 dumplings 模式（卡片 + 按地区/菌种/辣度筛选 + 城市云），
  届时才动 Navbar / i18n locale / 翻译包。

## 3. 文章架构（目录级）

1. **钩子**：白宫"酸菜饮食法"热点（2026，一段带过）→ "你以为酸菜只是德国货？最大的发酵白菜家族在中国"
2. **两个已知参照系**：Sauerkraut（东欧 / 宾州荷兰人新年传统）、Kimchi（韩国国食、全球认知度之王）——为对比搭台
3. **中国版图**（核心章节）：
   - 东北酸菜：大缸秋腌、酸菜白肉、铁锅炖；落脚哈尔滨/沈阳
   - 四川泡菜：老坛 / 洗澡泡菜；落脚成都
   - 贵州酸汤：红酸（毛辣角）/ 白酸（米汤）、凯里酸汤鱼、西江千户苗寨；"三天不吃酸，走路打蹿蹿"
   - 重庆酸菜鱼：东北酸菜做的川菜——食物流动性的活案例
   - 纵深点名段（制造版图感）：涪陵榨菜、天津冬菜、客家酸菜、云南大理酸菜
4. **一张对比矩阵**：原料 / 发酵介质 / 时长 / 酸型 / 经典搭配 / 活菌——设计成可截图传播的表格
5. **旅行吃图**：品类 → 城市 → 招牌店型 → 预算区间
6. **健康真相段**：接白宫热点辟谣（低卡高纤、高钠、无燃脂魔法）——E-E-A-T 加分项
7. **眼见为实视频架**：正文之后接 5 组 B 站精选视频（东北酸菜 6 条 / 川泡菜 3 条 / 贵州酸汤 5 条 / 酸菜鱼 1 条 / 涪陵榨菜 1 条），
   每条卡片 = 本地封面 + 时长角标 + 标题 + UP 主 + 播放量 + 一句话推荐语，点击新窗口跳 B 站——
   图文给事实密度，视频给"这真的存在"的现场感（2026-09-06 用户需求）
8. **互链收尾**：饺子图鉴、城市页（贵州/成都/重庆/西安酸汤水饺）、guides 列表

## 4. SEO 细则

- **H1 候选**（须同时含 kimchi 和 sauerkraut，suancai 占差异位）：
  1. Kimchi vs Sauerkraut vs Suancai: The Fermented Cabbage Atlas of China
  2. Sauerkraut, Kimchi, Suancai: One Cabbage, Three Civilizations
  3. Beyond Kimchi and Sauerkraut: China's Fermented Cabbage Universe
- **主打长尾**：kimchi vs sauerkraut / is kimchi the same as chinese suancai /
  chinese pickled vegetables types / kaili sour soup fish / suancaiyu / northeast china suancai
- **FAQ schema**：4-5 问（suancai 和 kimchi 什么关系 / 酸菜健康吗 / 去哪吃酸汤鱼 / 素食者能吃什么）
- **语言优先级**：en 基本盘 > ko（泡菜读者天然好奇中国版）> ja（漬物文化亲近）> de（独特卖点）> 其余兜底

## 5. 视频搭配（B 站，已完成选片）

**定位**：图文讲清"是什么、去哪吃"，视频负责"眼见为实"——发酵现场、开坛瞬间、探店实拍是文字替代不了的说服力。
**已完成（2026-09-06）**：调研脚本跑完 → 人工精选 16 条 → 详情快照 → 封面 16 张全部下载入库。

### 5.1 数据与资产位置

| 资产 | 位置 |
|---|---|
| 精选视频数据（16 条 × 5 组，en/zh 双语推荐语） | `data/fermented-videos.ts` |
| 封面图（本地化，不热链 B 站图床） | `public/images/vlogs/<bvid>.jpg` |
| 调研脚本（关键词 ×10，宽口径过滤） | `scripts/coldstart/fermented-research.mjs` |
| 封面下载脚本 | `scripts/coldstart/fetch-fermented-thumbs.mjs` |
| 原始调研/详情快照（不入库） | `scripts/coldstart/out/fermented-*.json` |

### 5.2 精选清单（播放量为 2026-09-06 快照）

**东北酸菜（6 条）**：

| BV 号 | 标题 | UP 主 | 播放 | 时长 | 用途 |
|---|---|---|---|---|---|
| BV1eu411o745 ★ | 东北不能失去酸菜！（全流程教程） | 手艺贾 | 342.3万 | 10:20 | 腌制全流程（§3-3 主视频） |
| BV1gy4y1m7Xx ★ | 腌酸白菜 | 小高姐的魔法调料 | 120.8万 | 6:15 | 海外知名科普 UP，天然亲外国读者 |
| BV1oSCsBMEPh | 姥姥五百斤白菜秋腌 | 八零徐姥姥 | 101.8万 | 5:39 | 家庭秋腌现场、规模感 |
| BV1kQ4y1D7j5 | 酸菜鱼/泡面里的酸菜怎么做 | 四处观察的小臣 | 35.5万 | 4:28 | 工业化视角（版图纵深） |
| BV1MK4y1z7fw | 酸菜白肉 | 老饭骨 | 85.3万 | 4:57 | 经典吃法（§3-3 落脚菜） |
| BV1XT4y1n7A1 | 东北酸菜锅！能吃又能喝 | 小傲想睡觉 | 369.9万 | 16:34 | 餐桌实拍（"你会吃到什么"） |

**四川泡菜（3 条）**：

| BV 号 | 标题 | UP 主 | 播放 | 时长 | 用途 |
|---|---|---|---|---|---|
| BV1B8411Z71Q ★ | 微观层面解释泡菜原理 | 吉尔的小灯塔 | 78.4万 | 15:30 | 发酵科学（对比矩阵的活注脚） |
| BV1jq4y16757 | 洗澡泡菜 | 林述巍JACKLIN | 57.5万 | 11:13 | 名厨家常版 |
| BV1oF411J7Uv | 120 年老坛泡菜水试味 | 锅铲居士 | 20.1万 | 18:05 | "老坛"叙事的硬证据 |

**贵州酸汤（5 条）**：

| BV 号 | 标题 | UP 主 | 播放 | 时长 | 用途 |
|---|---|---|---|---|---|
| BV1mWUGBNESc ★ | 贵州酸汤如何成为中餐顶流 | 赛博食录 | 119.2万 | 15:18 | 文化/产业纪录片（§3-3 主视频） |
| BV1HZ4y1M7TB | 凯里苗寨酸汤鱼（旅行视角） | 阿星探店 | 21.1万 | 20:36 | 旅行场景（西江/苗寨落脚点） |
| BV1g14y1S78K | 厨子探店凯里酸汤鱼 ¥102 | 真探唐仁杰 | 103.2万 | 3:49 | 真实菜单价（旅行吃图背书） |
| BV1Bw411m7Gg | 最下饭火锅：酸汤火锅 | 特厨做饭_ | 150.9万 | 5:33 | 吃法演示 |
| BV1Mz4y1s7KB | 红酸汤对照实验+亚硝酸盐 | 吉尔的小灯塔 | 17.4万 | 13:40 | 健康真相段（§3-6）的事实弹药 |

**酸菜鱼（1 条）**：`BV1RsE9z6EhK` ★ 黑鱼酸菜鱼技法拆解 · 小厨大凯 · 192.4万 · 4:54 —— "东北酸菜做的川菜"流动性论点的演示件

**涪陵榨菜（1 条）**：`BV12A4m1P7PW` ★ 30 天做 10 坛榨菜、2 年后才吃 · 燕麦行游 · 56.9万 · 12:50 —— 时间成本的现场证据（纵深点名段）

★ = featured（卡片高亮位）

### 5.3 集成设计（随 Phase 1 文章落地）

- 数据：`data/fermented-videos.ts` 导出 `fermentedVideoGroups` + `fermentedVideoUrl/Thumb`，结构与 `HikingVideo` 同构
  （en/zh 必填 → `fillLocaleFallbacks` 英文兜底；Phase 2 ko/ja 翻译包按数组索引合并，同 hiking 模式——**顺序即索引，勿调换**）。
- 渲染：Guide 接口加可选 `videos?: FermentedVideoGroup[]`；`pages/guides/[slug].vue` 在正文 `v-html` 之后渲染
  「眼见为实 / Watch It Happen」分组视频架，卡片视觉复用 `HikingRouteCard` 的视频行（本地封面 + 时长角标 + 标题/UP/播放量）。
- **不嵌 iframe**（性能 + B 站播放器海外体验差），全部卡片外链 `bilibili.com/video/<bvid>` 新窗口。

### 5.4 选片纪律

- 播放量/时长/日期为 2026-09-06 快照，页面上线时如需最新数据重跑 `bili-search.mjs batch`。
- 淘汰了主账号已"塌房"的 UP（如东北雨姐）的视频，避免品牌连带风险。
- 中韩 paocai/kimchi 争议不选边：不选任何"泡菜归属之争"向视频，只选制作/吃法/旅行向。
- 每组保留一种"权威型"（名厨/科普/纪录片）+ 至少一种"现场型"（家庭/探店/吃播），避免全是教程。

## 6. 资产清单

| 项 | 状态 |
|---|---|
| 头图（酸菜鱼，CC BY-SA 4.0） | ✅ 已抓取 |
| B 站精选视频 16 条（`data/fermented-videos.ts`，en/zh 推荐语） | ✅ 已完成 |
| 视频封面 16 张（`public/images/vlogs/`） | ✅ 已下载 |
| 调研 + 封面脚本（fermented-research / fetch-fermented-thumbs） | ✅ 已入库 |
| 正文配图 6-8 张（Commons：东北酸菜/泡菜坛/酸汤鱼/酸菜鱼/榨菜/kimchi/sauerkraut） | ✅ 已抓取 8 张（含酸菜饺子，`scripts/fetch-fermented-images.mjs` + `fix-fermented-images.mjs`） |
| travel-data.ts 新 guide 条目（en/zh 全文 + videos 挂载） | ✅ 已完成（slug `kimchi-sauerkraut-suancai`，H1 用第 4 节候选 1，含 FAQ×5 + relatedLinks×5） |
| Guide `videos` 字段 + `[slug].vue` 视频架渲染 | ✅ 已完成（同时新增 `faq`/`relatedLinks` 可选字段 + FAQPage JSON-LD + 正文 img/table 样式） |
| nuxt.config sitemap 加 `/guides/<slug>` | ✅ 已加入 prerenderPages，9 语言 sitemap 均已收录 |
| dumplings 页侧栏 deepDive 互链 | ✅ 已完成 |
| i18n 9 语言 `guide.faqTitle/videosTitle/videosNote/relatedTitle` UI 键 | ✅ 已完成 |
| ko/ja/de 翻译包（正文 + 视频 note） | Phase 2 |

## 7. 分寸与风险

- **"大国底蕴"表达纪律**：给外国读者的说服力来自**事实密度**（品类数量、地理跨度、历史、俗语），
  不来自形容词——show, don't tell；任何"最/第一/碾压"式表述会触发逆反，弃用。
- **中韩 paocai/kimchi 溯源争议**：不站队、不展开，只做平行介绍；FAQ 里被问到也一句话带过。
- **健康段**不做医疗声明，只引用热量/钠含量事实。
- **白宫热点占比 <10%**，热点退潮后文章必须依然成立（常青结构为主，热点只是开头钩子）。

## 8. 执行顺序

1. ~~用户确认：第 3 节品类名单、第 4 节 H1 选型、slug，以及第 5.2 节视频清单是否调整~~ ✅ 2026-09-06 确认（"开发吧"），H1 取候选 1，slug `kimchi-sauerkraut-suancai`，视频清单维持 16 条
2. ~~抓正文配图 → 写 en/zh 长文 → Guide videos 字段 + 视频架渲染 → 接 sitemap/互链 → 本地 generate 验证~~ ✅ 2026-09-06 完成（689 路由构建通过，en/zh 页面截图验收通过）
3. 提交部署后 3 个月看 GSC，决定是否进入 Phase 3 目录页；Phase 2（ko/ja 深度翻译 + de 核心字段）可先行
