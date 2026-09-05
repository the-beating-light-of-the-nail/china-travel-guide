// Nuxt 配置文件
// 支持的语言列表（顺序即语言切换器中的展示顺序）
// P0 英语（默认）/ P1 韩语·日语 / P2 泰语 / P3 德法西意
const i18nLocales = [
  { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
  { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
  { code: 'ko', language: 'ko-KR', name: '한국어', file: 'ko.json' },
  { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
  { code: 'th', language: 'th-TH', name: 'ไทย', file: 'th.json' },
  { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
  { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
  { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
  { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
]

// 需要预渲染的页面路径（不含语言前缀），与语言列表做笛卡尔积
const prerenderPages = [
  '',
  '/about',
  '/vlogs',
  '/guides',
  '/photos',
  '/services',
  '/cities/chengdu',
  '/cities/xian',
  '/cities/beijing',
  '/cities/guizhou',
  '/guides/xian-3-day-classic-route',
  '/guides/beijing-off-the-beaten-path',
  '/guides/chengdu-food-guide',
  '/guides/first-trip-to-china-guide',
  '/guides/best-time-to-visit-china',
]

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // 启用 SSR 以支持 SEO
  ssr: true,

  // 全局 CSS
  css: ['~/assets/css/main.css'],

  // 模块配置
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
  ],

  // Tailwind CSS 配置
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
  },

  // Element Plus 配置
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'css',
  },

  // Nuxt Image 配置 - 使用 Unsplash 图片
  image: {
    domains: ['images.unsplash.com', 'picsum.photos'],
  },

  // 运行时配置 - 提供给前端使用
  runtimeConfig: {
    public: {
      siteUrl: 'https://chinatravel.world',
      siteName: 'With My Eyes',
    },
  },

  // 站点配置（供 sitemap 模块使用）
  site: {
    url: 'https://chinatravel.world',
  },

  // 国际化（i18n）配置
  // ---------------------------------------------------------------
  // 策略 prefix：所有路由带语言前缀，例如 /en/...、/ko/...
  // 默认语言为 en，共 9 种语言（面向主要入境客源国）
  // 关闭浏览器语言自动检测，优先用户显式选择
  // 开启 SEO，自动注入 hreflang 与 og:locale 等标签
  // lazy：语言包按需分包加载，避免 9 个语言全量打进首屏
  // ---------------------------------------------------------------
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en',
    locales: i18nLocales,
    langDir: 'locales',
    lazy: true,
    differentDomains: false,
    detectBrowserLanguage: false,
    baseUrl: 'https://chinatravel.world',
  },

  // 应用级 head 配置（默认 SEO，各页面会按语言覆盖）
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'With My Eyes — Hand-picked China travel from Chinese platforms',
      meta: [
        { name: 'description', content: 'Handpicked vlogs, guides & local services for foreign travelers in China. Destinations, street food, high-speed rail and local partners.' },
        { name: 'keywords', content: 'China travel, China travel vlog, China travel guide, Beijing, Xi\'an, Chengdu, China high-speed rail, China street food, China local guide' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'With My Eyes' },
      ],
      link: [
        // Inter 字体（拉丁语系标题/正文），CJK/泰文回退 Noto Sans（按 unicode-range 按需加载）与系统字体
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&family=Noto+Sans+Thai:wght@400;500;700&display=swap' },
        // 现代浏览器使用 SVG 矢量图标
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // 兜底 favicon.ico，避免浏览器请求触发 404/500
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
      ],
      // Google 标签 (gtag.js) - Google Analytics
      // 通过 app.head 自动注入到所有页面 <head> 中；SSG 预渲染时会被写入每个静态 HTML
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-5V6YWGXS3Y',
          async: true,
          tagPosition: 'head',
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-5V6YWGXS3Y');`,
          tagPosition: 'head',
        },
        // Microsoft Clarity - 行为分析（热力图/会话回放）
        {
          innerHTML: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "ybt0nnb490");`,
          tagPosition: 'head',
        },
        // 广告展示脚本（CPM 广告网络）
        {
          src: 'https://pl30745593.effectivecpmnetwork.com/25/a4/4a/25a44a68bd636adeeef5dcc144a01c8f.js',
          tagPosition: 'head',
        },
      ],
    },
  },

  // 路由级规则
  // prefix 策略下根路径无默认页面，静态部署时将 `/` 重定向到默认语言 `/en`
  // （兜底：Vercel 等平台会读取此规则；静态根 index.html 由 public/ 提供 meta 跳转）
  routeRules: {
    '/': { redirect: '/en' },
  },

  // 静态预渲染配置（SSG）
  // 配合 nuxt generate，在构建时把所有页面预渲染为静态 HTML
  // i18n prefix 策略下，每种语言都生成一套完整页面（语言 × 页面笛卡尔积）
  nitro: {
    prerender: {
      crawlLinks: true,
      // 显式声明需要预渲染的路由，确保所有语言的所有城市与攻略页面都被生成
      routes: [
        '/',
        ...i18nLocales.flatMap(l => prerenderPages.map(p => `/${l.code}${p}`)),
        '/robots.txt',
        '/sitemap.xml',
        '/favicon.ico',
        '/favicon.svg',
      ],
      // 忽略构建期间的非致命错误（例如 sitemap 间接产生的告警）
      failOnError: false,
    },
  },

  typescript: {
    strict: true,
  },
})
