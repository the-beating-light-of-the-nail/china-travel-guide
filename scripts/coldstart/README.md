# 冷启动采集管线

2026-09-02 首次执行。把 B站公开 API 的真实数据写进 `data/hub-data.ts`，替换全部占位 vlog。

## 脚本

```
# 关键词搜索（wbi 签名，免登录；order: '' 综合 / click 播放 / pubdate 最新）
node scripts/coldstart/bili-search.mjs search "成都旅游vlog" 2 click

# 单个视频详情（标题/播放/点赞/时长/简介/标签/封面）
node scripts/coldstart/bili-search.mjs detail BV1kh411K77k

# 批量详情（对 selected.json 里的 [{bvid}] 逐个拉取）
node scripts/coldstart/bili-search.mjs batch scripts/coldstart/out/selected.json

# 评论区（热度排序顶层评论，默认 3 页，存 out/comments/<BV>.json）
node scripts/coldstart/bili-search.mjs comments BV1kh411K77k
```

### 评论区抓取的限制（重要）

B 站 2023 年起**未登录只能看到每个视频约 3 条精选热评**（任何端点翻页都返回空），
所以免登录时 `comments` 命令抓到的 3 条就是全部可得内容——但它们恰好是点赞最高的
「高赞回答」，做内容素材通常够用。需要全量评论区时：

```bash
# 从浏览器 F12 → Application → Cookies 里复制 SESSDATA 的值
BILI_SESSDATA="xxx,xxx" node scripts/coldstart/bili-search.mjs comments BV1kh411K77k 5
```

输出字段：uname / message / like / rcount(回复数) / ctime / location(IP属地)。
接口为 `/x/v2/reply/wbi/main`（wbi 签名 + 首页 `next=0`，注意 `next=1` 返回空），
风控码 -412/-352/-509 自动退避重试，持续失败降级旧版 `/x/v2/reply`。

原始结果落在 `scripts/coldstart/out/`（已 gitignore）。封面下载与数据回填当时为一次性操作（`patch-hub-data.mjs`，防重复执行）。

## 刷新统计数字（日常维护）

播放量/点赞是抓取日快照，会漂移。刷新流程：

1. 把 `data/hub-data.ts` 里所有 BV 号抄进 `scripts/coldstart/out/refresh.json`（`[{"bvid":"BV..."}]` 格式）
2. `node scripts/coldstart/bili-search.mjs batch scripts/coldstart/out/refresh.json`
3. 对照输出的 play/like/duration 手动更新 `hub-data.ts` 的 `views` 字段

注意：`/x/web-interface/view` 接口连续快抓会触发风控（返回 HTML），脚本已内置
cookie + 退避重试，批量时保持默认 2 秒间隔即可。

## 新增视频

1. 搜索或人工挑出 BV 号 → `detail` 看数据判断值不值得收
2. 封面：`curl -A "Mozilla/5.0" -e "https://www.bilibili.com/" -o public/images/vlogs/<BV号>.jpg "<pic地址>@640w_400h_1c.jpg"`（hdslb 图床支持后缀实时缩放）
3. 在 `hub-data.ts` 按发布时间升序插入条目（页面 latest 排序 = 数组倒序）
4. `npm run generate` 验证

## 下一阶段（需要人工的）

- **小红书/抖音/B站搜索词批量采集**：部署 [MediaCrawler](https://github.com/NanmiCoder/MediaCrawler)（Playwright + 扫码登录一次），按关键词导 CSV 后人工筛
- **UP主持续追踪**：自部署 [RSSHub](https://github.com/DIYgod/RSSHub)，订阅选定 UP 主的投稿 RSS
- **YouTube 频道**：`https://www.youtube.com/feeds/videos.xml?channel_id=<UC...>` 免 key 拉最新视频（`user=` 旧形式已失效）；播放量走 ReturnYouTubeDislike API 或 YouTube Data API v3
- **马蜂窝/穷游**：JS 反爬，只能真实浏览器 + Web Scraper 插件导出
- **PartnerService 邮箱**：占位待人工接洽
