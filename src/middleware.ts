import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Protected routes: anything under /trips or /profile, or the (app) group routes
  // For now, let's protect /trips
  const isProtectedRoute = pathname.startsWith('/trips')

  // Auth routes: login and signup
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup')

  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/trips', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/trips/:path*', '/login', '/signup'],
}
