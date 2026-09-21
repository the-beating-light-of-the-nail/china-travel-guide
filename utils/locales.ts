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

/**
 * 把数据层里的图片路径转成绝对 URL（og:image / JSON-LD image 要求绝对 HTTPS）。
 * 已是 http(s) 的原样返回，否则拼上站点域名。
 */
export function absoluteUrl(src: string, siteUrl: string): string {
  if (!src) return src
  if (/^https?:\/\//.test(src)) return src
  return `${siteUrl}${src.startsWith('/') ? '' : '/'}${src}`
}

/**
 * 社交分享图（og:image）：统一 1200×630。
 * - Unsplash 图：通过 URL 参数请求 1200×630 中心裁剪（零存储）；
 * - 本地图：映射到 public/images/og/ 下的裁剪变体
 *   （由 scripts/gen-og-images.py 生成；新增 guide/city 图片后需重跑）；
 * - 其余：退回 absoluteUrl。
 */
export function shareImageUrl(src: string, siteUrl: string): string {
  if (!src) return src
  if (/^https:\/\/images\.unsplash\.com\//.test(src)) {
    return `${src.split('?')[0]}?w=1200&h=630&fit=crop&q=80`
  }
  const m = src.match(/^(\/images\/.+)\.[a-z]+$/i)
  if (m) return `${siteUrl}/images/og/${m[1].slice('/images/'.length)}.jpg`
  return absoluteUrl(src, siteUrl)
}

/** 按语言格式化发布日期（如 en-US → Sep 6, 2026），供攻略页头与卡片展示真实日期 */
export function formatPublishDate(iso: string, code: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat(isoLocale(code), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(d)
}
