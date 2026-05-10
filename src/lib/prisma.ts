import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws
}

const prismaClientSingleton = () => {
  const neon = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaNeon(neon as any)
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
