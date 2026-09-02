// 极简静态文件服务器（仅本地预览构建产物用）
// 用法：node preview-serve.mjs [端口] [目录]
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const PORT = Number(process.argv[2]) || 4173
const ROOT = process.argv[3] || process.cwd()

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
}

createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (urlPath.endsWith('/')) urlPath += 'index.html'
    // 防目录穿越
    const filePath = normalize(join(ROOT, urlPath))
    if (!filePath.startsWith(normalize(ROOT))) {
      res.writeHead(403).end('Forbidden')
      return
    }
    let data
    try {
      data = await readFile(filePath)
    } catch {
      // 无扩展名路径 → 尝试 .html 或 /index.html（如 /en/vlogs）
      try {
        data = await readFile(filePath + '.html')
      } catch {
        data = await readFile(join(filePath, 'index.html'))
      }
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(404).end('Not Found')
  }
}).listen(PORT, () => {
  console.log(`Preview server running at http://127.0.0.1:${PORT}`)
})
