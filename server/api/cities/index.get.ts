// 获取所有城市列表（按创建顺序）
export default defineEventHandler(async () => {
  const cities = await prisma.city.findMany({
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      heroImage: true,
      tagline: true,
      tags: true,
      region: true,
    },
  })

  return cities
})
