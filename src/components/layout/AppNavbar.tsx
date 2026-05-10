'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface AppNavbarProps {
  user: {
    id: string
    firstName?: string | null
    email: string
    avatarUrl?: string | null
  }
}

export function AppNavbar({ user }: AppNavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const menuLinks = [
    { href: '/trips', label: 'My Trips' },
    { href: '/trips/new', label: 'Plan a Trip' },
    { href: '/search', label: 'Discover Cities' },
    { href: '/community', label: 'Community' },
    { href: '/profile', label: 'Profile' },
  ]

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center px-5 h-16 w-full max-w-screen-xl mx-auto">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-primary hover:opacity-70 transition-opacity"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Centered Logo */}
          <Link
            href="/trips"
            className="absolute left-1/2 -translate-x-1/2 font-display text-xl tracking-tighter text-primary font-bold no-underline"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            TRAVELOOP
          </Link>

          {/* Right: Search + Avatar */}
          <div className="flex items-center gap-3">
            <Link href="/search" className="text-primary hover:opacity-70 transition-opacity" aria-label="Search">
              <span className="material-symbols-outlined">search</span>
            </Link>
            <Link href="/profile" aria-label="Profile">
              <div
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30 flex items-center justify-center text-primary font-bold text-sm"
                style={{ background: '#ffdbd1' }}
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.firstName ?? 'User'} className="w-full h-full object-cover" />
                ) : (
                  (user.firstName?.[0] || user.email[0]).toUpperCase()
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-in Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-on-surface/40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer */}
          <div
            className="relative w-72 h-full bg-surface-container-low shadow-2xl flex flex-col py-12 px-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <p className="text-xl font-bold text-primary mb-1">TRAVELOOP</p>
            <p className="text-sm text-on-surface-variant mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Welcome, {user.firstName || user.email.split('@')[0]}
            </p>
            <nav className="flex flex-col gap-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {menuLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors no-underline ${
                    pathname === href
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-error hover:bg-error-container transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
