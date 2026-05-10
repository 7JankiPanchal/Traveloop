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
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface-bright p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="w-full max-w-[400px] bg-surface border border-outline-variant rounded-[32px] p-8 backdrop-blur-xl shadow-2xl transition-all hover:border-outline">
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          {/* Circular Photo Placeholder */}
          <div className="w-24 h-24 rounded-full bg-surface-container border-2 border-dashed border-outline-variant flex items-center justify-center mb-8 group transition-all hover:border-primary/50">
            <span className="text-on-surface-variant text-sm font-medium group-hover:text-primary">Photo</span>
          </div>

          <h1 className="text-2xl font-bold text-on-surface mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant text-sm mb-8">Login to your Traveloop account</p>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider ml-1">Username / Email</label>
              <input
                type="email"
                required
                className="w-full bg-surface-container border border-outline-variant rounded-2xl px-5 py-3.5 text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="gaurav@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider ml-1">Password</label>
              <input
                type="password"
                required
                className="w-full bg-surface-container border border-outline-variant rounded-2xl px-5 py-3.5 text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl w-full text-center">
              <p className="text-red-400 text-xs font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login Button'}
          </button>

          <p className="mt-8 text-on-surface-variant text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
