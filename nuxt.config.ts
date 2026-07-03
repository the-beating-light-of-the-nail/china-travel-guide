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
      siteUrl: 'https://china-travel-guide.example.com',
      siteName: 'China Travel Guide',
    },
  },

  // 站点配置（供 sitemap 模块使用）
  site: {
    url: 'https://china-travel-guide.example.com',
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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  typescript: {
    strict: true,
  },
})
