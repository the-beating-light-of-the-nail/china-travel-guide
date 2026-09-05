// v2：修复 v1 排序脚本吃掉条目闭合 `  },` 的问题，按当前状态重建 rawVlogs 数组
import fs from 'node:fs'

const FILE = 'data/hub-data.ts'
let src = fs.readFileSync(FILE, 'utf-8')

const startMarker = "const rawVlogs: Omit<Vlog, 'id'>[] = ["
const start = src.indexOf(startMarker)
if (start < 0) throw new Error('rawVlogs not found')
const bodyStart = src.indexOf('\n', start) + 1
const close = src.indexOf('\n]', bodyStart)
const body = src.slice(bodyStart, close)

// 当前状态：条目间分隔符为 '\n  {'，每条末尾多了个逗号、缺 '\n  },'
const parts = body.split('\n  {')
const entries = parts.map((p, i) => (i === 0 ? p : '  {' + p))
  .map(e => e.replace(/,\s*$/, ''))

if (entries.length !== 31) throw new Error(`expected 31 entries, got ${entries.length}`)
for (const e of entries) {
  if (!/publishedAt: \{ en: '[A-Za-z]{3} \d{4}'/.test(e)) throw new Error('entry missing publishedAt: ' + e.slice(0, 60))
}

// 按 publishedAt 升序稳定排序
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
function dateKey(e) {
  const m = e.match(/publishedAt: \{ en: '([A-Za-z]{3}) (\d{4})'/)
  return Number(m[2]) * 12 + MONTHS[m[1]]
}
entries.sort((a, b) => dateKey(a) - dateKey(b))

// 重建：每条补回闭合 '\n  },'
const newBody = entries.map(e => e + ',\n  },').join('\n')
src = src.slice(0, bodyStart) + newBody + src.slice(close)

fs.writeFileSync(FILE, src, 'utf-8')
console.log('rebuilt rawVlogs with', entries.length, 'entries')
