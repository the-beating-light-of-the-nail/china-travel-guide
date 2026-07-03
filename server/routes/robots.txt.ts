// 动态生成 robots.txt
export default defineEventHandler((event) => {
  const { public: pub } = useRuntimeConfig(event)
  const siteUrl = pub.siteUrl

  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
  setHeader(event, 'Content-Type', 'text/plain')
  return robots
})
