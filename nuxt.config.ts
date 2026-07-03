// Nuxt 配置文件
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
      siteUrl: 'https://travelchina-mu.vercel.app',
      siteName: 'China Travel Guide',
    },
  },

  // 站点配置（供 sitemap 模块使用）
  site: {
    url: 'https://travelchina-mu.vercel.app',
  },

  // 国际化（i18n）配置
  // ---------------------------------------------------------------
  // 策略 prefix：所有路由带语言前缀，例如 /en/...、/zh/...
  // 默认语言为 en，可选 en、zh
  // 关闭浏览器语言自动检测，优先用户显式选择
  // 开启 SEO，自动注入 hreflang 与 og:locale 等标签
  // ---------------------------------------------------------------
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
    ],
    langDir: 'locales',
    lazy: false,
    differentDomains: false,
    detectBrowserLanguage: false,
    baseUrl: 'https://travelchina-mu.vercel.app',
  },

  // 应用级 head 配置（默认 SEO，各页面会按语言覆盖）
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'China Travel Guide - Explore the Wonders of China',
      meta: [
        { name: 'description', content: 'Discover China with in-depth travel guides for top cities including Beijing, Xi\'an, and Chengdu. Attractions, food, itineraries, and practical tips.' },
        { name: 'keywords', content: 'China travel, China guide, Beijing, Xi\'an, Chengdu, China attractions, China food, China itinerary' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'China Travel Guide' },
      ],
      link: [
        // 现代浏览器使用 SVG 矢量图标
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // 兜底 favicon.ico，避免浏览器请求触发 404/500
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
      ],
    },
  },

  // 路由级规则
  // prefix 策略下根路径无默认页面，静态部署时将 `/` 重定向到默认语言 `/en`
  // （兜底：Vercel 等平台会读取此规则；静态根 index.html 由 public/ 提供 meta 跳转）
  routeRules: {
    '/': { redirect: '/en/' },
  },

  // 静态预渲染配置（SSG）
  // 配合 nuxt generate，在构建时把所有页面预渲染为静态 HTML
  // i18n prefix 策略下，每种语言都生成一套完整页面
  nitro: {
    prerender: {
      crawlLinks: true,
      // 显式声明需要预渲染的路由，确保两种语言的所有城市与攻略页面都被生成
      routes: [
        '/',
        '/en',
        '/en/',
        '/en/about',
        '/en/cities/chengdu',
        '/en/cities/xian',
        '/en/cities/beijing',
        '/en/guides/xian-3-day-classic-route',
        '/en/guides/beijing-off-the-beaten-path',
        '/en/guides/chengdu-food-guide',
        '/en/guides/first-trip-to-china-guide',
        '/en/guides/best-time-to-visit-china',
        '/zh',
        '/zh/',
        '/zh/about',
        '/zh/cities/chengdu',
        '/zh/cities/xian',
        '/zh/cities/beijing',
        '/zh/guides/xian-3-day-classic-route',
        '/zh/guides/beijing-off-the-beaten-path',
        '/zh/guides/chengdu-food-guide',
        '/zh/guides/first-trip-to-china-guide',
        '/zh/guides/best-time-to-visit-china',
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
