// 徒步专栏封面批量下载 - 从 hiking-bv-details.json 读取封面 URL，存为 public/images/vlogs/<bvid>.jpg
import fs from 'node:fs'
import path from 'node:path'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; Win64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const details = JSON.parse(
  fs.readFileSync(path.resolve('scripts/coldstart/out/hiking-bv-details.json'), 'utf-8')
)
const outDir = path.resolve('public/images/vlogs')
fs.mkdirSync(outDir, { recursive: true })

let ok = 0, skip = 0, fail = 0
for (const d of details) {
  if (!d.bvid || !d.pic) { fail++; continue }
  const file = path.join(outDir, `${d.bvid}.jpg`)
  if (fs.existsSync(file) && fs.statSync(file).size > 10_000) { skip++; continue }
  try {
    const res = await fetch(d.pic, { headers: { 'user-agent': UA, referer: 'https://www.bilibili.com/' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 5000) throw new Error(`too small: ${buf.length}B`)
    fs.writeFileSync(file, buf)
    ok++
    console.log(`✓ ${d.bvid} ${(buf.length / 1024).toFixed(0)}KB`)
  } catch (e) {
    fail++
    console.error(`✗ ${d.bvid} ${e.message}`)
  }
  await new Promise(r => setTimeout(r, 400))
}
console.log(`\n完成：下载 ${ok}，跳过 ${skip}，失败 ${fail}`)
