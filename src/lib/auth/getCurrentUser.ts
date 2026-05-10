import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import prisma from '@/lib/prisma'
import type { AuthUser } from '@/types/auth'

// ─── Internal token reader ─────────────────────────────────────────
async function resolveUserFromToken(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    if (process.env.NODE_ENV === 'development' && process.env.SKIP_AUTH === 'true') {
      return {
        id: 'dev-user-00000000-0000-0000-0000-000000000000',
        email: 'dev@traveloop.app',
        name: 'Dev User',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev',
      }
    }
    return null
  }

  const payload = await verifyToken(token)
  if (!payload || !payload.userId) return null

  // Fetch from DB to get the latest avatarUrl and name
  const user = await prisma.user.findUnique({
    where: { id: payload.userId as string },
    select: { id: true, email: true, firstName: true, lastName: true, avatarUrl: true }
  })

  if (!user) return null

  return { 
    id: user.id, 
    email: user.email, 
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
    avatarUrl: user.avatarUrl || undefined
  }
}

// ─── Public API ────────────────────────────────────────────────────────────

/** Returns the authenticated user, or null if not authenticated. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  return resolveUserFromToken()
}

/** Returns the authenticated user. Throws if not authenticated.
 *  Use this inside server actions and service calls that require auth. */
export async function requireUser(): Promise<AuthUser> {
  const user = await resolveUserFromToken()
  if (!user) {
    throw new Error('UNAUTHORIZED')
  }
  return user
}

