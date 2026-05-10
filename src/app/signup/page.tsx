'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    country: '',
    additionalInfo: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/trips')
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0b] p-4 lg:p-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[150px]"></div>

      <div className="w-full max-w-[700px] bg-white/5 border border-white/10 rounded-[32px] p-8 lg:p-10 backdrop-blur-xl shadow-2xl">
        <form onSubmit={handleSignup} className="flex flex-col items-center">
          {/* Circular Photo Placeholder */}
          <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center mb-8 group transition-all hover:border-blue-500/50">
            <span className="text-white/30 text-sm font-medium">Photo</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-8">Registration Screen</h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">First Name</label>
              <input
                name="firstName"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="John"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Last Name</label>
              <input
                name="lastName"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="Doe"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="john@example.com"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Phone Number</label>
              <input
                name="phoneNumber"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="+1 234 567 890"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">City</label>
              <input
                name="city"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="London"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Country</label>
              <input
                name="country"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="United Kingdom"
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Additional Information ....</label>
              <textarea
                name="additionalInfo"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                placeholder="Tell us more about your travel preferences..."
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl w-full text-center">
              <p className="text-red-400 text-xs font-medium">{error}</p>
            </div>
          )}

          <div className="w-full flex flex-col items-center mt-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-[280px] bg-white text-black font-bold py-4 rounded-2xl hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Register Users'}
            </button>

            <p className="mt-6 text-white/40 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-white hover:text-white/80 underline underline-offset-4 font-medium transition-all">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
