// 获取攻略文章列表（可选参数 featured 过滤精选文章）
export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // 仅查询精选文章
  if (query.featured === 'true') {
    return await prisma.guide.findMany({
      where: { featured: true },
      orderBy: { id: 'asc' },
    })
  }

  // 查询全部文章
  return await prisma.guide.findMany({
    orderBy: { id: 'asc' },
  })
})
