import type { Config } from 'tailwindcss'

// Tailwind CSS 配置 - trip.com 风格浅色设计系统
// 色板对齐 trip.com 视觉语言：
//   页面底 #F5F6F8 / 卡片纯白 / 分隔线 slate-200
//   品牌蓝 #287DFA（按钮、链接、激活态）/ 促销橙 #FF7413 / 星级金 #F5A623
//   文字墨色系 ink（#1F2430 / #4B505C / #848B98）/ 页脚深海军蓝 #171C26
export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // 主强调色 - trip.com 品牌蓝（按钮、链接、标签）
        brand: {
          DEFAULT: '#287DFA',
          light: '#5D9BFF',
          dark: '#1A63D6',
          tint: '#EAF2FE',
        },
        // 次强调色 - 绿（Verified、Success 状态）
        accent: {
          DEFAULT: '#00875A',
          light: '#33B58C',
          dark: '#006B46',
        },
        // 促销/亮点橙（价格、折扣、亮点文案）
        promo: {
          DEFAULT: '#FF7413',
          dark: '#E85D00',
        },
        // 星级评分金
        gold: '#F5A623',
        // 墨色文字体系
        ink: {
          DEFAULT: '#1F2430',
          body: '#4B505C',
          muted: '#848B98',
        },
        // 浅色页面底色
        base: {
          DEFAULT: '#F5F6F8',
          raised: '#FFFFFF',
          border: '#E4E8EF',
        },
        // 页脚深海军蓝（trip.com 风格深色页脚）
        footer: {
          DEFAULT: '#171C26',
          border: '#2B3342',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'SimSun', 'serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
