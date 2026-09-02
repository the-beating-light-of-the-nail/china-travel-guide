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
      siteName: 'ChinaTravelHub',
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
      title: 'ChinaTravelHub - Discover Real China, Curated by Real Travelers',
      meta: [
        { name: 'description', content: 'Handpicked vlogs, guides & local services for foreign travelers in China. Destinations, street food, high-speed rail and local partners.' },
        { name: 'keywords', content: 'China travel, China travel vlog, China travel guide, Beijing, Xi\'an, Chengdu, China high-speed rail, China street food, China local guide' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'ChinaTravelHub' },
      ],
      link: [
        // Inter 字体（英文标题/正文），中文回退系统字体
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' },
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
        '/en/vlogs',
        '/en/guides',
        '/en/photos',
        '/en/services',
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
        '/zh/vlogs',
        '/zh/guides',
        '/zh/photos',
        '/zh/services',
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
