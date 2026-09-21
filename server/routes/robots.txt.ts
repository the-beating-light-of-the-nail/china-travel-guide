// 动态生成 robots.txt
export default defineEventHandler((event) => {
  const { public: pub } = useRuntimeConfig(event)
  const siteUrl = pub.siteUrl

  // 直接声明 sitemap index（/sitemap.xml 本身是模块生成的 302 跳转，指 200 落地更干净）
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap_index.xml
`
  setHeader(event, 'Content-Type', 'text/plain')
  return robots
})
