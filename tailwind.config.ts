import type { Config } from 'tailwindcss'

// Tailwind CSS 配置 - ChinaTravelHub 深色设计系统
// 色板对齐设计系统规范：
//   背景 slate-900(#0f172a) / 卡片 slate-800(#1e293b) / 边框 slate-700(#334155)
//   主强调 #3b82f6（蓝）/ 次强调 #10b981（绿，Verified/Success）
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
        // 主强调色 - 蓝（按钮、链接、标签）
        brand: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
        // 次强调色 - 绿（Verified、Success 状态）
        accent: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        // 深色页面底色
        base: {
          DEFAULT: '#0f172a',
          raised: '#1e293b',
          border: '#334155',
        },
        footer: {
          DEFAULT: '#020617',
          border: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'SimSun', 'serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
