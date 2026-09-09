// B站搜索冷启动采集脚本（wbi 签名，免登录）
// ---------------------------------------------------------------
// 用法：
//   node scripts/coldstart/bili-search.mjs search "成都旅游vlog" 2 click
//     参数：keyword, 页数(默认2), order(默认 '' 综合 / 'click' 按播放 / 'pubdate' 按最新)
//   node scripts/coldstart/bili-search.mjs detail BV1xx411c7mD
//     拉取单个视频详情（标题/简介/播放/时长/标签/封面）
//   node scripts/coldstart/bili-search.mjs batch out/candidates.json
//     对 JSON 文件 [{bvid}] 数组批量拉详情
//   node scripts/coldstart/bili-search.mjs comments BV1xx411c7mD [页数]
//     拉取评论区（热度排序顶层评论），默认 3 页(≈90 条)，另存
//     scripts/coldstart/out/comments/<BV>.json；失败自动降级旧版端点
// 输出：stdout JSON；search 结果另存 scripts/coldstart/out/<关键词>.json
// ---------------------------------------------------------------

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

// wbi mixinKey 混淆表（来自 B站网页端，社区广泛使用的公开算法）
const TAB = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61,
  26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20,
  34, 44, 52,
]

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function getCookieJar() {
  const res = await fetch('https://www.bilibili.com/', {
    headers: { 'user-agent': UA },
  })
  const setCookies = res.headers.getSetCookie ? res.headers.getSetCookie() : []
  const jar = {}
  for (const sc of setCookies) {
    const kv = sc.split(';')[0]
    const i = kv.indexOf('=')
    jar[kv.slice(0, i)] = kv.slice(i + 1)
  }
  return jar
}

function cookieHeader(jar) {
  return Object.entries(jar)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ')
}

async function getWbiKey() {
  const res = await fetch('https://api.bilibili.com/x/web-interface/nav', {
    headers: { 'user-agent': UA, referer: 'https://www.bilibili.com/' },
  })
  const json = await res.json()
  const { img_url, sub_url } = json.data.wbi_img
  const imgKey = img_url.split('/').pop().split('.')[0]
  const subKey = sub_url.split('/').pop().split('.')[0]
  return TAB.map((i) => (imgKey + subKey)[i]).join('').slice(0, 32)
}

function wbiSign(params, mixinKey) {
  const wts = Math.floor(Date.now() / 1000)
  const all = { ...params, wts }
  const qs = Object.keys(all)
    .sort()
    .map((k) => {
      const v = String(all[k]).replace(/[!'()*]/g, '')
      return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    })
    .join('&')
  const wRid = crypto.createHash('md5').update(qs + mixinKey).digest('hex')
  return `${qs}&w_rid=${wRid}`
}

async function searchVideo(jar, mixinKey, keyword, page, order) {
  const params = { search_type: 'video', keyword, page: String(page) }
  if (order) params.order = order
  const qs = wbiSign(params, mixinKey)
  const url = `https://api.bilibili.com/x/web-interface/wbi/search/type?${qs}`
  const res = await fetch(url, {
    headers: {
      'user-agent': UA,
      referer: `https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword)}`,
      cookie: cookieHeader(jar),
      accept: 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9',
    },
  })
  return res.json()
}

function stripTags(s) {
  return String(s || '').replace(/<[^>]+>/g, '')
}

function parseDuration(d) {
  // "1:02:33" 或 "12:34" → 秒
  const parts = String(d || '').split(':').map(Number)
  if (parts.some(Number.isNaN)) return 0
  return parts.reduce((acc, p) => acc * 60 + p, 0)
}

function fmtDuration(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function mapSearchItem(r) {
  return {
    bvid: r.bvid,
    title: stripTags(r.title),
    author: r.author,
    mid: r.mid,
    play: r.play,
    danmaku: r.video_review,
    durationSec: parseDuration(r.duration),
    duration: r.duration,
    pubdate: r.pubdate,
    pubdateISO: new Date(r.pubdate * 1000).toISOString().slice(0, 10),
    pic: r.pic.replace(/^http:/, 'https:'),
    desc: stripTags(r.description).slice(0, 200),
    url: `https://www.bilibili.com/video/${r.bvid}`,
  }
}

async function fetchDetail(bvid, jar) {
  const headers = {
    'user-agent': UA,
    referer: `https://www.bilibili.com/video/${bvid}`,
    accept: 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
  }
  if (jar) headers.cookie = cookieHeader(jar)
  let json
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(
      `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`,
      { headers }
    )
    const text = await res.text()
    if (text.trimStart().startsWith('<')) {
      // 风控返回 HTML 页：等待后重试
      await sleep(attempt * 4000)
      continue
    }
    json = JSON.parse(text)
    break
  }
  if (!json) return { bvid, error: 'risk-controlled (HTML response)' }
  if (json.code !== 0) return { bvid, error: json.message }
  const d = json.data
  return {
    bvid: d.bvid,
    aid: d.aid,
    title: d.title,
    author: d.owner.name,
    mid: d.owner.mid,
    play: d.stat.view,
    like: d.stat.like,
    coin: d.stat.coin,
    favorite: d.stat.favorite,
    danmaku: d.stat.danmaku,
    reply: d.stat.reply,
    durationSec: d.duration,
    duration: fmtDuration(d.duration),
    pubdate: d.pubdate,
    pubdateISO: new Date(d.pubdate * 1000).toISOString().slice(0, 10),
    pic: d.pic.replace(/^http:/, 'https:'),
    desc: (d.desc || '').slice(0, 600),
    tags: (d.tag_name || '').split(',').filter(Boolean).slice(0, 6),
    tid: d.tid,
    url: `https://www.bilibili.com/video/${d.bvid}`,
  }
}

// ---------------------------------------------------------------------------
// 评论区抓取：/x/v2/reply/wbi/main（wbi 签名 + 免登录 cookie）。
// 重要：B 站 2023 起未登录只能看每视频约 3 条精选热评（翻页一律空），
// 因此默认抓「热度模式」前 3 条即全部可得内容；如需全量评论区，
// 设置环境变量 BILI_SESSDATA=<你的SESSDATA cookie> 后本脚本自动解锁翻页。
// ---------------------------------------------------------------------------

// 网页端同款设备指纹占位参数（社区通行做法，非空即可过基础风控）
const DM_PARAMS = {
  dm_img_list: '[]',
  dm_img_str: 'V2ViR0wgMS4wIChjb21wYXRpYmxlKQ==',
  dm_cover_img_str: 'QU5HTEUgKFZpZGVvY28yZSwgVkNFLTMzNS4wLCBHc2FpYSBORVNDKQ==',
  dm_img_inter: '{"ds":[],"wh":[3547,3573,35],"of":[280,460,280]}',
}

function mapReply(r) {
  return {
    rpid: r.rpid,
    uname: (r.member && r.member.uname) || '',
    level: r.member && r.member.level_info ? r.member.level_info.current_level : undefined,
    message: stripTags((r.content && r.content.message) || ''),
    like: r.like,
    rcount: r.rcount,
    ctime: r.ctime,
    ctimeISO: r.ctime ? new Date(r.ctime * 1000).toISOString().slice(0, 10) : '',
    location: (r.reply_control && r.reply_control.location) || '',
  }
}

async function replyRequest(jar, url) {
  let json
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, {
      headers: {
        'user-agent': UA,
        referer: 'https://www.bilibili.com/',
        cookie: cookieHeader(jar),
        accept: 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
      },
    })
    const text = await res.text()
    if (text.trimStart().startsWith('<')) {
      await sleep(attempt * 4000)
      continue
    }
    json = JSON.parse(text)
    if (json.code === 0 || !RETRYABLE_REPLY_CODES.has(json.code)) break
    await sleep(attempt * 3000)
  }
  return json
}

async function fetchReplyPageWbi(jar, mixinKey, aid, next) {
  const params = { oid: String(aid), type: '1', mode: '3', ps: '30', next: String(next), ...DM_PARAMS }
  const qs = wbiSign(params, mixinKey)
  return replyRequest(jar, `https://api.bilibili.com/x/v2/reply/wbi/main?${qs}`)
}

async function fetchReplyPageLegacy(jar, aid, pn) {
  return replyRequest(jar, `https://api.bilibili.com/x/v2/reply?type=1&oid=${aid}&sort=2&pn=${pn}&ps=20`)
}

async function runComments(bvid, pages) {
  let jar = await getCookieJar()
  if (process.env.BILI_SESSDATA) jar.SESSDATA = process.env.BILI_SESSDATA
  const mixinKey = await getWbiKey()
  const detail = await fetchDetail(bvid, jar)
  if (detail.error) throw new Error(`detail: ${detail.error}`)
  const { aid, title } = detail

  const all = []
  let allCount = 0
  let useLegacy = false
  let next = 0 // 首页必须 next=0；next=1 会返回空
  for (let p = 1; p <= pages; p++) {
    const json = useLegacy
      ? await fetchReplyPageLegacy(jar, aid, p)
      : await fetchReplyPageWbi(jar, mixinKey, aid, next)
    if (!json) throw new Error('risk-controlled (HTML response)')
    if (json.code !== 0) {
      if (!useLegacy && RETRYABLE_REPLY_CODES.has(json.code)) {
        console.error(`wbi/main code=${json.code}，切换旧版端点重试`)
        useLegacy = true
        const legacy = await fetchReplyPageLegacy(jar, aid, p)
        if (!legacy || legacy.code !== 0) throw new Error(`reply: ${(legacy && legacy.message) || 'no data'}`)
        json.data = legacy.data
      } else {
        throw new Error(`reply code=${json.code} message=${json.message}`)
      }
    }
    const data = json.data || {}
    allCount = (data.cursor && data.cursor.all_count) || (data.page && data.page.acount) || allCount
    const replies = (data.replies || []).map(mapReply)
    if (replies.length === 0) break
    all.push(...replies)
    const cursor = data.cursor
    if ((cursor && cursor.is_end) || p >= pages) break
    if (cursor && cursor.next !== undefined && cursor.next !== 0) {
      next = cursor.next
    } else {
      break // 无游标（未登录被截断）→ 到手即全部可得评论
    }
    await sleep(2000)
  }

  all.sort((a, b) => b.like - a.like)
  const outDir = path.resolve('scripts/coldstart/out/comments')
  fs.mkdirSync(outDir, { recursive: true })
  const outFile = path.join(outDir, `${bvid}.json`)
  fs.writeFileSync(
    outFile,
    JSON.stringify(
      { bvid, aid, title, allCount, fetchedAt: new Date().toISOString(), replies: all },
      null,
      2
    ),
    'utf-8'
  )
  const note = process.env.BILI_SESSDATA ? '' : '（未登录：仅能获取精选热评）'
  console.log(`「${title.slice(0, 40)}」评论共 ${allCount} 条，抓到 ${all.length} 条${note}`)
  for (const r of all) {
    console.log(`${r.like}\t${r.uname}\t${String(r.message).replace(/\s+/g, ' ').slice(0, 70)}`)
  }
  console.log(`已保存: ${outFile}`)
}


async function main() {
  const [, , cmd, ...rest] = process.argv

  if (cmd === 'detail') {
    console.log(JSON.stringify(await fetchDetail(rest[0]), null, 2))
    return
  }

  if (cmd === 'comments') {
    await runComments(rest[0], Number(rest[1] || 3))
    return
  }

  if (cmd === 'batch') {
    const file = rest[0]
    const list = JSON.parse(fs.readFileSync(file, 'utf-8'))
    const jar = await getCookieJar()
    const out = []
    for (const item of list) {
      out.push(await fetchDetail(item.bvid, jar))
      await sleep(2000)
    }
    console.log(JSON.stringify(out, null, 2))
    return
  }

  // 默认 search
  const keyword = rest[0]
  const pages = Number(rest[1] || 2)
  const order = rest[2] || ''

  const jar = await getCookieJar()
  const mixinKey = await getWbiKey()
  const results = []
  for (let p = 1; p <= pages; p++) {
    const json = await searchVideo(jar, mixinKey, keyword, p, order)
    if (json.code !== 0) {
      console.error(`API code=${json.code} message=${json.message}`)
      process.exit(1)
    }
    const items = (json.data.result || []).filter((r) => r.type === 'video')
    results.push(...items.map(mapSearchItem))
    if (p < pages) await sleep(1200)
  }

  // 粗过滤：≥4 分钟、2022 年后发布、播放 ≥5 万
  const filtered = results.filter(
    (r) => r.durationSec >= 240 && r.pubdate * 1000 > Date.parse('2022-01-01') && r.play >= 50000
  )
  filtered.sort((a, b) => b.play - a.play)

  const outDir = path.resolve('scripts/coldstart/out')
  fs.mkdirSync(outDir, { recursive: true })
  const outFile = path.join(outDir, `${keyword.replace(/[\\/:*?"<>|\s]+/g, '_')}.json`)
  fs.writeFileSync(outFile, JSON.stringify({ keyword, total: results.length, kept: filtered.length, results: filtered }, null, 2), 'utf-8')

  console.log(`关键词「${keyword}」共 ${results.length} 条，过滤后 ${filtered.length} 条`)
  for (const r of filtered.slice(0, 20)) {
    console.log(`${r.play}\t${r.duration}\t${r.pubdateISO}\t${r.author}\t${r.title}\t${r.bvid}`)
  }
  console.log(`已保存: ${outFile}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
