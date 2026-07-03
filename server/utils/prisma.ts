// 服务端 Prisma 单例 - 供所有 server/api 路由使用（Nitro 自动导入）
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export { prisma }
