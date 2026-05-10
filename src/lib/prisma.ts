import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const createClient = () => {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')

  const cleanUrl = url.trim().replace(/^["']|["']$/g, '')
  
  try {
    const urlObj = new URL(cleanUrl)

    const pool = new Pool({
      host: urlObj.hostname,
      user: urlObj.username,
      password: urlObj.password,
      database: urlObj.pathname.slice(1),
      port: parseInt(urlObj.port) || 5432,
      ssl: { rejectUnauthorized: false }
    })
    
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  } catch (err) {
    throw err
  }
}

const prisma = createClient()
export default prisma
