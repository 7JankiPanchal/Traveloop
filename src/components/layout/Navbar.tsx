'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
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
  Compass,
  Heart,
  Calendar
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
    { label: 'Explore', href: '/', icon: Compass },
    { label: 'Bookings', href: '/trips', icon: Calendar },
    { label: 'Saved', href: '/saved', icon: Heart },
    { label: 'Profile', href: '/profile', icon: UserIcon },
  ]

  const tripNavItems = tripId ? [
    { label: 'View', href: `/trips/${tripId}/view`, icon: Map },
    { label: 'Builder', href: `/trips/${tripId}/builder`, icon: Map },
    { label: 'Packing', href: `/trips/${tripId}/packing`, icon: Luggage },
    { label: 'Journal', href: `/trips/${tripId}/notes`, icon: StickyNote },
    { label: 'Budget', href: `/trips/${tripId}/budget`, icon: Wallet },
  ] : []

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-surface-bright/90 backdrop-blur-2xl border-b border-outline-variant shadow-lg' 
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Menu Icon - Left */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo - Center */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-3xl font-display font-bold tracking-tighter text-primary uppercase">Traveloop</h1>
          </Link>

          {/* Search Icon - Right */}
          <Link href="/search" className="p-2 text-on-surface hover:text-primary transition-colors">
            <Search className="w-6 h-6" />
          </Link>
        </div>
      </nav>


      {/* Spacer to prevent content from jumping under fixed nav */}
      <div className="h-24" />

      {/* Mobile Bottom Navigation - Visible on mobile only */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-[100]">
        <div className="bg-white/90 backdrop-blur-2xl border border-outline-variant rounded-full px-2 py-2 flex items-center justify-between shadow-2xl">
          {[
            { icon: Compass, label: 'Explore', href: '/' },
            { icon: Calendar, label: 'Bookings', href: '/trips' },
            { icon: Heart, label: 'Saved', href: '/saved' },
            { icon: UserIcon, label: 'Profile', href: '/profile' },
          ].map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'fill-white' : ''}`} />
                {isActive && <span className="text-xs font-black uppercase tracking-wider">{item.label}</span>}
              </Link>
            )
          })}
        </div>
      </div>

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
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 px-4">Menu</p>
                <div className="flex flex-col gap-2">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all ${
                        pathname === item.href 
                          ? 'bg-primary/5 border-primary/20 text-primary'
                          : 'bg-surface-container border-outline-variant text-on-surface'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${pathname === item.href ? 'text-primary' : 'text-on-surface-variant'}`} />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {tripId && (
                <div className="space-y-4 pb-20">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 px-4">Current Trip</p>
                  <div className="flex flex-col gap-2">
                    {tripNavItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all ${
                          pathname === item.href 
                            ? 'bg-primary/5 border-primary/20 text-primary'
                            : 'bg-surface-container border-outline-variant text-on-surface'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${pathname === item.href ? 'text-primary' : 'text-on-surface-variant'}`} />
                        {item.label}
                      </Link>
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
