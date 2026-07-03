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

  // 应用级 head 配置（默认 SEO）
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
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

  // 静态预渲染配置（SSG）
  // 配合 nuxt generate，在构建时把所有页面预渲染为静态 HTML
  nitro: {
    prerender: {
      crawlLinks: true,
      // 显式声明需要预渲染的路由，确保所有城市与攻略页面都被生成
      routes: [
        '/',
        '/about',
        '/cities/chengdu',
        '/cities/xian',
        '/cities/beijing',
        '/guides/xian-3-day-classic-route',
        '/guides/beijing-off-the-beaten-path',
        '/guides/chengdu-food-guide',
        '/guides/first-trip-to-china-guide',
        '/guides/best-time-to-visit-china',
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
