'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

interface AppNavbarProps {
  user: {
    id: string
    firstName?: string | null
    email: string
    avatarUrl?: string | null
  }
}

// Fixed top header for app pages
export function AppNavbar({ user }: AppNavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/trips', label: 'My Trips' },
    { href: '/search', label: 'Discover' },
    { href: '/communityTab', label: 'Community' },
  ]

  const initial = (user.firstName?.[0] || user.email[0]).toUpperCase()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(15, 17, 23, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          href="/trips"
          style={{
            textDecoration: 'none',
            fontSize: 20,
            fontWeight: 800,
            color: '#f97316',
            letterSpacing: '-0.5px',
            flexShrink: 0,
          }}
        >
          Traveloop
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                color: pathname === link.href ? '#fff' : 'rgba(255,255,255,0.5)',
                background: pathname === link.href ? 'rgba(255,255,255,0.08)' : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: User */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {pathname === '/trips' && (
              <Link
                href="/trips/new"
                style={{
                  textDecoration: 'none',
                  padding: '6px 16px',
                  background: '#f97316',
                  color: '#fff',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'background 0.15s',
                }}
                className="hidden-mobile"
              >
                Plan Trip
              </Link>
            )}
            <Link href="/profile" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: '#1e293b',
                  border: '2px solid rgba(249,115,22,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f97316',
                  fontSize: 13,
                  fontWeight: 700,
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.firstName ?? 'User'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  initial
                )}
              </div>
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            style={{
              textDecoration: 'none',
              padding: '6px 16px',
              background: '#f97316',
              color: '#fff',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Sign In
          </Link>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}
