// IndexNow 主动提交脚本 - 让 Bing/Yandex/Seznam 等搜索引擎即时发现新页面
// ---------------------------------------------------------------
// 用法：
//   node scripts/indexnow-submit.mjs                    # 提交脚本内默认的新页面清单
//   node scripts/indexnow-submit.mjs urls.txt           # 提交文本文件中的 URL（每行一个）
//   node scripts/indexnow-submit.mjs https://... https://...  # 提交命令行指定的 URL
// key 验证文件位于 public/<KEY>.txt，需先部署生效后再提交。
// API 返回 202/200 表示已接受；403 表示 key 文件不可访问（先确认部署）。
// 文档：https://www.bing.com/indexnow
// ---------------------------------------------------------------

const HOST = 'chinatravel.world'
const KEY = '6b6565769e0803bd37991783a9cb7691'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const LOCALES = ['en', 'zh', 'ko', 'ja', 'th', 'de', 'fr', 'es', 'it']

// 默认提交清单：按「新上线路径 × 全语言」笛卡尔积生成（改成需要的路径再跑）
const DEFAULT_PAGE_PATHS = [
  '/guides/chengdu-vs-chongqing-food',
]

function defaultUrls() {
  return LOCALES.flatMap(l => DEFAULT_PAGE_PATHS.map(p => `https://${HOST}/${l}${p}`))
}

async function main() {
  const [, , ...args] = process.argv
  let urls
  if (args.length === 0) {
    urls = defaultUrls()
  } else if (args[0].startsWith('http')) {
    urls = args
  } else {
    const fs = await import('node:fs')
    urls = fs.readFileSync(args[0], 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean)
  }

  console.log(`提交 ${urls.length} 个 URL 到 IndexNow（key 验证文件 ${KEY_LOCATION}）`)

  // IndexNow 单次上限 10000 条，这里按 1000 分批
  for (let i = 0; i < urls.length; i += 1000) {
    const batch = urls.slice(i, i + 1000)
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch }),
    })
    console.log(`批次 ${Math.floor(i / 1000) + 1}: HTTP ${res.status} ${res.statusText}`)
    if (res.status >= 400) {
      const body = await res.text()
      console.error(body.slice(0, 500))
      process.exit(1)
    }
  }
  console.log('完成。202=已接受待抓取，200=已提交过。')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
