// 根据 slug 获取单个城市详情（含景点、美食、行程、贴士等关联数据）
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'City slug is required' })
  }

  const city = await prisma.city.findUnique({
    where: { slug },
    include: {
      attractions: { orderBy: { sortOrder: 'asc' } },
      foods: { orderBy: { sortOrder: 'asc' } },
      itineraries: {
        orderBy: { dayNumber: 'asc' },
        include: { items: { orderBy: { sortOrder: 'asc' } } },
      },
      tips: { orderBy: { sortOrder: 'asc' } },
    },
  })

  if (!city) {
    throw createError({ statusCode: 404, statusMessage: 'City not found' })
  }

  return city
})
