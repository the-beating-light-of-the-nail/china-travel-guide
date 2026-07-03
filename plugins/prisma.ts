// Prisma 客户端 Nuxt 服务端插件
// 在服务端提供单例的 PrismaClient，避免热重载时重复创建连接
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineNuxtPlugin(() => {
  // 将 prisma 实例挂载到 nuxtApp 上下文，供服务端使用
  return {
    provide: {
      prisma,
    },
  }
})
