// 语言代码 → SEO 语言标识映射
// 供各页面 useHead 的 og:locale（下划线格式）与 JSON-LD inLanguage（BCP47 格式）使用

const ISO_LOCALES: Record<string, string> = {
  en: 'en-US',
  zh: 'zh-CN',
  ko: 'ko-KR',
  ja: 'ja-JP',
  th: 'th-TH',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  it: 'it-IT',
}

const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  ko: 'ko_KR',
  ja: 'ja_JP',
  th: 'th_TH',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',
  it: 'it_IT',
}

/** BCP47 语言标签（JSON-LD inLanguage 用），如 ko-KR */
export function isoLocale(code: string): string {
  return ISO_LOCALES[code] || 'en-US'
}

/** Open Graph locale 格式（og:locale 用），如 ko_KR */
export function ogLocale(code: string): string {
  return OG_LOCALES[code] || 'en_US'
}
