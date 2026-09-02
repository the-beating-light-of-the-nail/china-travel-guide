# 冷启动信息池（待人工筛选）

首轮采集已完成 17 条 vlog + 16 条攻略。以下是搜索中发现的、**未收录但值得看的候选**，
以及下一轮采集的方向。人肉判断后按 `scripts/coldstart/README.md` 的流程补录。

## B站候选视频（首轮未收录）

| BV号 | UP主 | 内容 | 播放 | 备注 |
|---|---|---|---|---|
| BV1K6XAYZEFh | Meetfood觅食 | 江西老爸挑战成都最辣餐厅 | 1204万 | 家庭向辣度挑战，可作成都 food |
| BV1S659zREUE | 小马逛吃 | 英国家人第一次去成都 | 104万 | 外国人视角，与站内受众最match |
| BV1i5KKeJE2v | 干饭三健客 | 特种兵一天吃遍西安 | 511万 | 西安 food 备选 |
| BV1uEQhBAEVr | 问题不太大- | 一镜到底全程徒步华山（2026-04） | 34万 | 比长空栈道POV更全面的华山徒步 |
| BV1Tu4m1T7uo | 小锤大可 | 北京纯攻略：一条视频讲透 | 33万 | 综合攻略型，适合 itinerary 主题 |
| BV1LEsGe2Ew2 | 只因我是V5 | 北京9日保姆级攻略（预约/抢票） | 7万 | 含抢票攻略，信息密度高 |
| BV1qNmJBqEXq | 藻虾AmanoShrimp | 天府之星号餐车体验（成都—北京） | 86万 | 特色列车，transport 差异化内容 |
| BV1Np4y1N7u5 之外的铁路题材 | 涡轮风扇鱼ViC | 该UP主整条"中国铁路Vlog"系列 | — | 铁路环线游可持续追踪 |

## YouTube 频道（需人工确认频道ID与选片）

- **Two Mad Explorers**（已收录一条熊猫基地视频）— 爱尔兰夫妇，中国内容量大
- **The Food Ranger**（Trevor James）— 中国街头美食天花板，老外受众认知度最高
- **Little Chinese Everywhere** — 中国乡村/小众目的地
- **Blondie in China** — 澳洲女生中国旅行
- 抓取方式见 `scripts/coldstart/README.md`（RSS + ReturnYouTubeDislike）

## 英文独立站待深挖文章

- farwestchina.com：Urumqi walking tour / Xinjiang hiker's guide / 新疆自驾 Highway 216
- rachelmeetschina.com：北京冬季12事 / 厂甸庙会 / 公寓租赁 App（长住向）
- chengdu-expat.com：待人工翻美食库，挑具体文章深链
- 维基旅行骨架已有三城，可扩展 en.wikivoyage.org/wiki/China 总览页

## 采集盲区（AI/脚本进不去，需人肉）

- 小红书：收藏>点赞的干货帖（MediaCrawler 扫码后按关键词导出）
- 抖音：近期爆款（同上）
- 微信公众号：成都/川西旅游号约10个，看历史文章
- 闲鱼/淘宝：包车司机、领队、摄影师（PartnerService 真实联系方式的唯一来源）
- 马蜂窝/穷游：浏览器内人肉看，Web Scraper 插件导列表
