// 根路径运行时 301 → 默认语言（i18n strategy: prefix 下无根路由）
// 不能用 routeRules redirect 替代：Nitro 构建时会把 redirect 物化成静态 stub，
// 在 Vercel 上抢在运行时之前（见 nuxt.config.ts routeRules 注释）
export default defineEventHandler((event) => {
  return sendRedirect(event, '/en/', 301)
})
