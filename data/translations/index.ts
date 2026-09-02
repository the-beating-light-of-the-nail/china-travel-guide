// 各语言内容翻译包注册表
// ---------------------------------------------------------------
// 每个语言一个文件（结构见 data/localize.ts 的 LocalePack）。
// 新增语言翻译时：在此 import 并注册即可，构建时自动合并进数据，
// 缺失字段回退英文。en / zh 随源数据（travel-data.ts / hub-data.ts）维护，不在此注册。
// ---------------------------------------------------------------
import type { LocalePack } from '../localize'

import ko from './ko'
import ja from './ja'
import th from './th'
import de from './de'
import fr from './fr'
import es from './es'
import it from './it'

export const contentPacks: Record<string, LocalePack> = {
  ko,
  ja,
  th,
  de,
  fr,
  es,
  it,
}
