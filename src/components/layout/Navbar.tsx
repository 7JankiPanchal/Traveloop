'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Home, 
  Search, 
  Map, 
  Luggage, 
  StickyNote, 
  Wallet, 
  User as UserIcon, 
  LogOut,
  Menu,
  X,
  Compass
} from 'lucide-react'
import { LogoutButton } from '@/components/auth/LogoutButton'

interface NavbarProps {
  user: any
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Extract tripId from pathname if it exists and is not 'new'
  const tripMatch = pathname?.match(/\/trips\/([^\/]+)/)
  const tripId = tripMatch && tripMatch[1] !== 'new' ? tripMatch[1] : null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainNavItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'My Trips', href: '/trips', icon: Compass },
    { label: 'Discover', href: '/search', icon: Search },
  ]

  const tripNavItems = tripId ? [
    { label: 'Overview', href: `/trips/${tripId}`, icon: Map },
    { label: 'Itinerary', href: `/trips/${tripId}/itinerary`, icon: Map },
    { label: 'Packing', href: `/trips/${tripId}/packing`, icon: Luggage },
    { label: 'Journal', href: `/trips/${tripId}/notes`, icon: StickyNote },
    { label: 'Budget', href: `/trips/${tripId}/budget`, icon: Wallet },
  ] : []

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-surface-bright/80 backdrop-blur-2xl border-b border-outline-variant shadow-2xl' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <a href="/" className="group flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-on-surface">Traveloop</span>
            </a>

            {/* Main Nav - Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    pathname === item.href 
                      ? 'text-on-surface bg-surface-container' 
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Context Nav - Trip Specific (Desktop) */}
          {tripId && (
            <div className="hidden lg:flex items-center gap-1 bg-surface-container border border-outline p-1 rounded-2xl backdrop-blur-md">
              {tripNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    pathname === item.href 
                      ? 'text-primary bg-primary/10' 
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </a>
              ))}
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <a 
                  href="/profile" 
                  className={`flex items-center gap-3 p-1 pr-4 rounded-full border transition-all ${
                    pathname === '/profile'
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-outline bg-surface-container hover:border-primary/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container border border-outline">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.firstName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-outline">
                        {user.firstName?.[0]}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-bold text-on-surface hidden sm:block">{user.firstName}</span>
                </a>
                <div className="hidden sm:block">
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <a href="/login" className="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all">
                Sign In
              </a>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from jumping under fixed nav */}
      <div className="h-24" />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-surface-bright pt-28 px-6 lg:hidden"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-outline px-4">Menu</p>
                <div className="flex flex-col gap-2">
                  {mainNavItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-surface-container border border-outline-variant text-lg font-bold text-on-surface"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {tripId && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-outline px-4">Current Trip</p>
                  <div className="flex flex-col gap-2">
                    {tripNavItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-surface-container border border-outline-variant text-lg font-bold text-on-surface"
                      >
                        <item.icon className="w-5 h-5 text-primary" />
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
