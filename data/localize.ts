// 多语言内容基础设施
// ---------------------------------------------------------------
// L 类型：en / zh 为必填基础语言（随内容一起维护），
// 其余语言（ko / ja / th / de / fr / es / it）为可选，
// 由 data/translations/ 下的翻译包在构建时合并补充。
// 缺失的语言统一在构建时回退为英文（fillLocaleFallbacks），
// 保证页面代码 l[locale] 取值永远非空。
// ---------------------------------------------------------------

/** 全站支持的语言代码 */
export const SUPPORTED_LOCALES = ['en', 'zh', 'ko', 'ja', 'th', 'de', 'fr', 'es', 'it'] as const
export type LocaleCode = (typeof SUPPORTED_LOCALES)[number]

/** 兜底语言：无翻译的语言显示英文 */
export const FALLBACK_LOCALE = 'en'

/** 本地化文本：en/zh 必填，其余语言可选（构建时英文兜底填充） */
export interface L {
  en: string
  zh: string
  ko?: string
  ja?: string
  th?: string
  de?: string
  fr?: string
  es?: string
  it?: string
}

/**
 * 翻译包形态：与 data/travel-data.ts / data/hub-data.ts 的数据结构同构，
 * 但其中的 L 字段（name/description/...）直接写目标语言的字符串。
 * cities / guides 按 slug 索引；数组类（vlogs/photos/...）按源数据顺序索引对齐。
 */
export interface LocalePack {
  cities?: Record<string, Record<string, unknown>>
  guides?: Record<string, Record<string, unknown>>
  vlogs?: Record<string, unknown>[]
  externalGuides?: Record<string, unknown>[]
  photos?: Record<string, unknown>[]
  services?: Record<string, unknown>[]
  shoppingItems?: Record<string, unknown>[]
}

/** 判断节点是否为本地化文本对象（L） */
function isL(node: unknown): node is L {
  return (
    typeof node === 'object'
    && node !== null
    && !Array.isArray(node)
    && typeof (node as Record<string, unknown>).en === 'string'
    && typeof (node as Record<string, unknown>).zh === 'string'
  )
}

function isPlainObject(node: unknown): node is Record<string, unknown> {
  return typeof node === 'object' && node !== null && !Array.isArray(node)
}

/**
 * 将翻译包合并进数据节点（就地修改）。
 * - 基础字段为 L 对象、翻译包提供字符串 → 写入 base[field][lang]
 * - 双方均为对象/数组 → 递归（数组按索引对齐）
 * - 结构不匹配（数组长度不一致 / 多余键）→ 构建时 console.warn，便于及时发现翻译包过期
 */
export function mergeLanguagePack(base: unknown, pack: unknown, lang: string, path = ''): void {
  if (pack === undefined || pack === null) return

  if (isL(base)) {
    if (typeof pack === 'string') {
      ;(base as unknown as Record<string, unknown>)[lang] = pack
      return
    }
    console.warn(`[i18n-content] ${path}: 翻译包此处应为字符串，已忽略（${lang}）`)
    return
  }

  if (Array.isArray(base)) {
    if (!Array.isArray(pack)) {
      console.warn(`[i18n-content] ${path}: 翻译包此处应为数组，已忽略（${lang}）`)
      return
    }
    if (pack.length !== base.length) {
      console.warn(
        `[i18n-content] ${path}: 数组长度不一致 base=${base.length} pack=${pack.length}（${lang}），按较短者对齐，请核对翻译包顺序`,
      )
    }
    const n = Math.min(base.length, pack.length)
    for (let i = 0; i < n; i++) mergeLanguagePack(base[i], pack[i], lang, `${path}[${i}]`)
    return
  }

  if (isPlainObject(base)) {
    for (const key of Object.keys(pack)) {
      if (!(key in base)) {
        console.warn(`[i18n-content] ${path}.${key}: 基础数据中不存在该字段，已忽略（${lang}）`)
        continue
      }
      mergeLanguagePack(base[key], (pack as Record<string, unknown>)[key], lang, path ? `${path}.${key}` : key)
    }
    return
  }

  // 其余标量字段（slug / image / rating 等）不参与翻译
}

/**
 * 递归填充缺失语言：每个 L 节点中未提供翻译的语言回退为英文，
 * 使页面 l[locale] 永远有值（就地修改并返回原引用）。
 */
export function fillLocaleFallbacks<T>(node: T): T {
  if (isL(node)) {
    const l = node as unknown as Record<string, string>
    for (const code of SUPPORTED_LOCALES) {
      if (!l[code]) l[code] = l[FALLBACK_LOCALE]
    }
  } else if (Array.isArray(node)) {
    for (const item of node) fillLocaleFallbacks(item)
  } else if (isPlainObject(node)) {
    for (const value of Object.values(node)) fillLocaleFallbacks(value)
  }
  return node
}
