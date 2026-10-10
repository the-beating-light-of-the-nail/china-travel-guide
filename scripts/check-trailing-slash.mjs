// 构建期校验：扫描 .output/public 全部 HTML 的站内链接
// 规则 1：内部路径必须以尾斜杠结尾（全站信号统一带斜杠，见 nuxt.config.ts site/i18n 注释）
// 规则 2：内部路径必须在产物中存在对应文件（抓 404 坏链，如历史遗留的无语言前缀路径）
// 挂在 `npm run generate` 之后自动执行；也可单独 `npm run check:links`
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.argv[2] || '.output/public'
const ASSET_RE = /\.(xml|txt|ico|svg|png|jpe?g|webp|avif|css|js|mjs|json|woff2?|ttf|mp4|webm|map)$/i

function walkHtml(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walkHtml(p, acc)
    else if (name.endsWith('.html')) acc.push(p)
  }
  return acc
}

function existsInOutput(urlPath) {
  // `/en/` → `en/index.html`；`/en/guides/x/` → `en/guides/x/index.html`
  if (urlPath === '/') return true // 根路径由运行时 301 处理，产物中无文件是预期
  const clean = urlPath.replace(/\/+$/, '')
  return existsSync(join(ROOT, clean, 'index.html')) || existsSync(join(ROOT, clean + '.html'))
}

const htmlFiles = walkHtml(ROOT)
const badSlash = new Map()
const badMissing = new Map()
let linkCount = 0

for (const file of htmlFiles) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(/href\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    const raw = m[1] ?? m[2]
    if (!raw || !raw.startsWith('/')) continue // 只查站内绝对路径；外链/锚点/协议相对跳过
    const clean = raw.split(/[?#]/)[0]
    if (clean === '/' || ASSET_RE.test(clean)) continue
    linkCount++
    const rel = relative(ROOT, file)
    if (!existsInOutput(clean)) {
      if (!badMissing.has(clean)) badMissing.set(clean, new Set())
      badMissing.get(clean).add(rel)
    } else if (!clean.endsWith('/')) {
      if (!badSlash.has(clean)) badSlash.set(clean, new Set())
      badSlash.get(clean).add(rel)
    }
  }
}

console.log(`[check-trailing-slash] 扫描 ${htmlFiles.length} 个 HTML，站内路径链接 ${linkCount} 条`)
let failed = false
for (const [u, files] of badSlash) {
  failed = true
  console.error(`  ✗ 缺尾斜杠: ${u}  (${files.size} 个页面，如 ${[...files][0]})`)
}
for (const [u, files] of badMissing) {
  failed = true
  console.error(`  ✗ 产物中不存在(404 坏链): ${u}  (${files.size} 个页面，如 ${[...files][0]})`)
}
if (failed) process.exit(1)
console.log('[check-trailing-slash] 全部通过 ✓')
