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

  // Extract tripId from pathname if it exists
  const tripMatch = pathname?.match(/\/trips\/([^\/]+)/)
  const tripId = tripMatch ? tripMatch[1] : null

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
          ? 'py-3 bg-[#030303]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <a href="/" className="group flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">Traveloop</span>
            </a>

            {/* Main Nav - Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    pathname === item.href 
                      ? 'text-white bg-white/10' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Context Nav - Trip Specific (Desktop) */}
          {tripId && (
            <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
              {tripNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    pathname === item.href 
                      ? 'text-orange-500 bg-orange-500/10' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                      ? 'border-orange-500/50 bg-orange-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/10">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.firstName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-500">
                        {user.firstName?.[0]}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-bold text-white hidden sm:block">{user.firstName}</span>
                </a>
                <div className="hidden sm:block">
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <a href="/login" className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all">
                Sign In
              </a>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
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
            className="fixed inset-0 z-40 bg-[#030303] pt-28 px-6 lg:hidden"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-4">Menu</p>
                <div className="flex flex-col gap-2">
                  {mainNavItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/5 border border-white/5 text-lg font-bold"
                    >
                      <item.icon className="w-5 h-5 text-orange-500" />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {tripId && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-4">Current Trip</p>
                  <div className="flex flex-col gap-2">
                    {tripNavItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/5 border border-white/5 text-lg font-bold"
                      >
                        <item.icon className="w-5 h-5 text-blue-500" />
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
