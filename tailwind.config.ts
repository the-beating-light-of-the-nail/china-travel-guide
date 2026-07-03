import type { Config } from 'tailwindcss'

// Tailwind CSS 配置 - 中国旅游攻略主题
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
        // 品牌主色 - 沉稳绿色
        brand: {
          DEFAULT: '#2c5c4e',
          light: '#3a7563',
          dark: '#1f4236',
        },
        // 强调色 - 中国红
        accent: {
          DEFAULT: '#c0392b',
          light: '#d9534f',
          dark: '#a93226',
        },
        // 西安古城主题色（城市详情页使用）
        ancient: {
          red: '#8B2323',
          gold: '#C9A961',
          brown: '#5D4037',
          wall: '#8D7B68',
          cream: '#F5F0E6',
        },
        footer: {
          DEFAULT: '#1f2933',
          border: '#323f4b',
        },
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'SimSun', 'serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
