import { NextResponse, NextRequest } from 'next/server'

// Routes that require authentication
const PROTECTED_PREFIXES = [
  '/trips',
  '/search',
  '/profile',
  '/community',
  '/admin',
]

// Auth routes — redirect to app if already authenticated
const AUTH_ROUTES = ['/login', '/signup']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  // Unauthenticated user trying to access a protected page
  if (isProtected && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // Authenticated user trying to access login/signup
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/trips', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/trips/:path*',
    '/search/:path*',
    '/profile/:path*',
    '/community/:path*',
    '/communityTab/:path*',
    '/admin/:path*',
    '/login',
    '/signup',
  ],
}
