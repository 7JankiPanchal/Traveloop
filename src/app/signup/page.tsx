'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plane, User, Mail, Lock, Phone, MapPin, FileText } from 'lucide-react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  paddingLeft: 40,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 12,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
  color: '#f1f5f9',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.15s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: 7,
}

interface FieldProps {
  label: string
  name: string
  type?: string
  placeholder: string
  required?: boolean
  icon: React.ReactNode
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Field({ label, name, type = 'text', placeholder, required, icon, onChange }: FieldProps) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={name} style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.3 }}>
          {icon}
        </span>
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={name}
          onChange={onChange}
          style={{
            ...inputStyle,
            borderColor: focused ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.08)',
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  )
}

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
        router.refresh()
      } else {
        setError(data.error || 'Registration failed. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0b0f',
        padding: '32px 16px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div
        style={{
          width: '100%',
          maxWidth: 640,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 28,
          padding: '40px 36px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              boxShadow: '0 8px 24px rgba(249,115,22,0.4)',
              marginBottom: 14,
            }}
          >
            <Plane size={22} color="#fff" />
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
            Create your account
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Join thousands of explorers on Traveloop
          </p>
        </div>

        <form onSubmit={handleSignup}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Field label="First Name" name="firstName" placeholder="Jane" required icon={<User size={15} />} onChange={handleChange} />
            <Field label="Last Name" name="lastName" placeholder="Doe" required icon={<User size={15} />} onChange={handleChange} />
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Email Address" name="email" type="email" placeholder="jane@example.com" required icon={<Mail size={15} />} onChange={handleChange} />
            </div>
            <Field label="Phone Number" name="phoneNumber" placeholder="+1 234 567 890" icon={<Phone size={15} />} onChange={handleChange} />
            <Field label="Password" name="password" type="password" placeholder="••••••••" required icon={<Lock size={15} />} onChange={handleChange} />
            <Field label="City" name="city" placeholder="London" icon={<MapPin size={15} />} onChange={handleChange} />
            <Field label="Country" name="country" placeholder="United Kingdom" icon={<MapPin size={15} />} onChange={handleChange} />
            <div style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="additionalInfo" style={labelStyle}>Travel Preferences (optional)</label>
              <div style={{ position: 'relative' }}>
                <FileText size={15} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 12, top: 13, pointerEvents: 'none' }} />
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={3}
                  placeholder="Tell us about your travel style, interests…"
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    paddingTop: 12,
                    resize: 'vertical',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                />
              </div>
            </div>
          </div>

          {error && (
            <div
              style={{
                marginTop: 16,
                padding: '10px 14px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 12,
                color: '#fca5a5',
                fontSize: 13,
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 24,
              width: '100%',
              padding: '14px 0',
              background: loading ? 'rgba(249,115,22,0.5)' : 'linear-gradient(135deg, #f97316, #ea580c)',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 8px 20px rgba(249,115,22,0.35)',
              transition: 'all 0.15s',
              fontFamily: 'inherit',
            }}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>

          <p style={{ textAlign: 'center', margin: '16px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>
              Sign in →
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
