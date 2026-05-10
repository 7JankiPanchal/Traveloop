'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/trips')
        router.refresh()
      } else {
        setError(data.error || 'Invalid email or password.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-background px-5 py-12 relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 rounded-full bg-secondary-container/30 blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl font-bold text-primary tracking-tighter"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            TRAVELOOP
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            The world is yours to explore.
          </p>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-8 shadow-[0_20px_40px_-15px_rgba(164,55,22,0.12)]">
          <h2
            className="text-xl font-semibold text-on-surface mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Welcome back
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Email
              </label>
              <div className="flex items-center bg-surface-container rounded-xl px-4 border border-outline-variant focus-within:border-primary transition-colors">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant mr-2">mail</span>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Password
              </label>
              <div className="flex items-center bg-surface-container rounded-xl px-4 border border-outline-variant focus-within:border-primary transition-colors">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant mr-2">lock</span>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-error-container text-error text-xs text-center font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-primary text-on-primary rounded-full py-3.5 text-sm font-semibold tracking-wide hover:bg-primary-container transition-colors active:scale-95 disabled:opacity-50"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-on-surface-variant" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          No account?{' '}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            Create one free →
          </Link>
        </p>
      </div>
    </div>
  )
}
