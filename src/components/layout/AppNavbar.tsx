'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogoutButton } from '@/components/auth/LogoutButton'

interface AppNavbarProps {
  user: any
}

// Warm terracotta bottom nav + fixed top header for app pages
export function AppNavbar({ user }: AppNavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const tripMatch = pathname?.match(/\/trips\/([^\/]+)/)
  const tripId = tripMatch ? tripMatch[1] : null

  const tripNavItems = tripId ? [
    { label: 'Overview', href: `/trips/${tripId}` },
    { label: 'Itinerary', href: `/trips/${tripId}/itinerary` },
    { label: 'Packing', href: `/trips/${tripId}/packing` },
    { label: 'Notes', href: `/trips/${tripId}/notes` },
    { label: 'Budget', href: `/trips/${tripId}/budget` },
  ] : []


  return (
    <>
      {/* Top App Bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          backgroundColor: 'rgba(253,249,244,0.92)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 1px 0 rgba(164,55,22,0.08)',
          transition: 'all 0.3s',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            height: 64,
            maxWidth: 1280,
            margin: '0 auto',
          }}
        >
          {/* Left: Menu or back */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#a43716' }}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          {/* Center: Logo */}
          <Link
            href="/trips"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 700,
              color: '#a43716',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            TRAVELOOP
          </Link>

          {/* Right: User */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Link href="/profile" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9999,
                    overflow: 'hidden',
                    backgroundColor: '#e6e2dd',
                    border: '2px solid #dfc0b7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#a43716',
                  }}
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.firstName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    user.firstName?.[0]?.toUpperCase()
                  )}
                </div>
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              style={{
                backgroundColor: '#a43716',
                color: '#fff',
                borderRadius: 9999,
                padding: '6px 16px',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'Montserrat', sans-serif",
                textDecoration: 'none',
              }}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Trip Sub-Nav */}
        {tripId && tripNavItems.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 4,
              padding: '6px 20px 8px',
              overflowX: 'auto',
              borderTop: '1px solid rgba(164,55,22,0.08)',
              backgroundColor: 'rgba(253,249,244,0.95)',
            }}
          >
            {tripNavItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  padding: '5px 14px',
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'Montserrat', sans-serif",
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  backgroundColor: pathname === item.href ? '#a43716' : 'transparent',
                  color: pathname === item.href ? '#fff' : '#58423c',
                  border: pathname === item.href ? '1px solid #a43716' : '1px solid #dfc0b7',
                  transition: 'all 0.15s',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Spacer */}
      <div style={{ height: tripId ? 96 : 64 }} />

      {/* Mobile Slide-out Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            backgroundColor: '#fdf9f4',
            paddingTop: 80,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: '🧭 Explore', href: '/trips' },
              { label: '🌍 Community', href: '/community' },
              { label: '🔍 Discover', href: '/search' },
              { label: '👤 Profile', href: '/profile' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '16px 20px',
                  borderRadius: 12,
                  backgroundColor: pathname === item.href ? '#c54f2c' : '#f1ede8',
                  color: pathname === item.href ? '#fff' : '#1c1c19',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <div style={{ marginTop: 16 }}>
                <LogoutButton />
              </div>
            )}
          </nav>
        </div>
      )}


    </>
  )
}
