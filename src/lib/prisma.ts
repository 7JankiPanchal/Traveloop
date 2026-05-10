import { PrismaClient } from './generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Use WebSocket in Node.js environments (not needed in the browser / Edge)
if (typeof globalThis.WebSocket === 'undefined') {
  neonConfig.webSocketConstructor = ws
}

const createPrismaClient = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  // v7 API: pass connection config directly — PrismaNeon manages the pool internally
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: ReturnType<typeof createPrismaClient> | undefined
}

const prisma = globalThis.prismaGlobal ?? createPrismaClient()

export default prisma

// Prevent multiple instances in dev due to hot-reloading
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}
