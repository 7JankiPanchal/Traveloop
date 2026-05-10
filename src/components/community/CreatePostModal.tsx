'use client'

import { useState, useRef } from 'react'
import { X, Image, MapPin, Send } from 'lucide-react'

interface CreatePostModalProps {
  onClose: () => void
  onSubmit: (data: { content: string; location: string; imageUrl: string }) => void
}

export function CreatePostModal({ onClose, onSubmit }: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    await onSubmit({ content: content.trim(), location: location.trim(), imageUrl: imageUrl.trim() })
    setSubmitting(false)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share a travel moment"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          background: '#111827',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>
            Share a Moment ✈️
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              color: '#94a3b8',
              padding: 6,
              display: 'flex',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: 20 }}>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's your travel story today?"
            required
            maxLength={500}
            rows={4}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '12px 14px',
              color: '#f1f5f9',
              fontSize: 14,
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
          <p style={{ margin: '4px 0 12px', fontSize: 11, color: '#475569', textAlign: 'right' }}>
            {content.length}/500
          </p>

          {/* Location */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '8px 12px',
              marginBottom: 10,
            }}
          >
            <MapPin size={14} color="#f97316" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location (optional)"
              maxLength={100}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#f1f5f9',
                fontSize: 13,
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Image URL Toggle */}
          {showImageInput && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '8px 12px',
                marginBottom: 10,
              }}
            >
              <Image size={14} color="#f97316" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL (optional)"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#f1f5f9',
                  fontSize: 13,
                  fontFamily: 'inherit',
                }}
              />
            </div>
          )}

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
            <button
              type="button"
              onClick={() => setShowImageInput((v) => !v)}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: '#64748b',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              <Image size={14} />
              {showImageInput ? 'Remove Image' : 'Add Image'}
            </button>

            <button
              type="submit"
              disabled={!content.trim() || submitting}
              style={{
                background: content.trim() ? '#f97316' : 'rgba(255,255,255,0.05)',
                color: content.trim() ? '#fff' : '#475569',
                border: 'none',
                borderRadius: 10,
                padding: '8px 20px',
                fontWeight: 600,
                fontSize: 13,
                cursor: content.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'background 0.15s',
              }}
            >
              <Send size={14} />
              {submitting ? 'Posting…' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
