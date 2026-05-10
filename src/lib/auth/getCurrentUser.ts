/**
 * Auth abstraction — PASETO-ready stub.
 *
 * This file is the ONLY place auth provider logic should live.
 * Features import from here, never from the auth provider SDK directly.
 *
 * TODO (auth team): Replace the stub body with PASETO token verification.
 * The token should be read from the `Authorization` header or an HttpOnly cookie.
 * Use the `paseto` npm package (https://github.com/nickel-lang/paseto-standard/paseto-spec)
 *
 * Expected token payload shape: { sub: string, email: string, name: string }
 */

import type { AuthUser } from '@/types/auth'

// ─── Internal token reader (stub) ─────────────────────────────────────────
async function resolveUserFromToken(): Promise<AuthUser | null> {
  // TODO: Parse PASETO v4.local or v4.public token from request cookies/headers.
  // Example structure once implemented:
  //   const token = cookies().get('session')?.value
  //   const payload = await V4.verify(token, secretKey)
  //   return { id: payload.sub, email: payload.email, name: payload.name }

  // DEV STUB: returns a mock user so builder/view screens work before auth ships.
  if (process.env.NODE_ENV === 'development') {
    return {
      id: 'dev-user-00000000-0000-0000-0000-000000000000',
      email: 'dev@traveloop.app',
      name: 'Dev User',
    }
  }

  return null
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
