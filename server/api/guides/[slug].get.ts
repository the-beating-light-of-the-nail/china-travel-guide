// 根据 slug 获取单篇攻略文章详情
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Guide slug is required' })
  }

  const guide = await prisma.guide.findUnique({
    where: { slug },
  })

  if (!guide) {
    throw createError({ statusCode: 404, statusMessage: 'Guide not found' })
  }

  return guide
})
