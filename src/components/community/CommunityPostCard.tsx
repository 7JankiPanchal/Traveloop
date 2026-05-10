'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, MapPin, MoreHorizontal } from 'lucide-react'

interface CommunityPostCardProps {
  post: {
    id: string
    content: string
    imageUrl?: string | null
    location?: string | null
    likes: number
    createdAt: string
    user: {
      firstName?: string | null
      lastName?: string | null
      email: string
      avatarUrl?: string | null
    }
  }
}

export function CommunityPostCard({ post }: CommunityPostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const displayName =
    post.user.firstName && post.user.lastName
      ? `${post.user.firstName} ${post.user.lastName}`
      : post.user.firstName ?? post.user.email.split('@')[0]

  const initial = displayName[0].toUpperCase()

  function handleLike() {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  function timeAgo(dateStr: string): string {
    const diffMs = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diffMs / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <article
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Header */}
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: '#1e293b',
              border: '2px solid rgba(249,115,22,0.3)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f97316',
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            {post.user.avatarUrl ? (
              <img src={post.user.avatarUrl} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              initial
            )}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#f1f5f9' }}>{displayName}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              {post.location && (
                <>
                  <MapPin size={11} color="#94a3b8" />
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{post.location}</span>
                  <span style={{ color: '#334155', fontSize: 10 }}>•</span>
                </>
              )}
              <span style={{ fontSize: 12, color: '#475569' }}>{timeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <button
          aria-label="More options"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 4 }}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <p style={{ margin: '12px 20px', fontSize: 14, lineHeight: 1.7, color: '#cbd5e1' }}>{post.content}</p>

      {/* Image */}
      {post.imageUrl && (
        <div style={{ margin: '0 20px 16px', borderRadius: 12, overflow: 'hidden', maxHeight: 320 }}>
          <img src={post.imageUrl} alt="Post" style={{ width: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <button
          onClick={handleLike}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: liked ? '#ef4444' : '#64748b',
            fontSize: 13,
            fontWeight: 500,
            transition: 'color 0.15s',
          }}
        >
          <Heart size={16} fill={liked ? '#ef4444' : 'none'} />
          {likeCount}
        </button>

        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748b',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <MessageCircle size={16} />
          Reply
        </button>

        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748b',
            fontSize: 13,
            marginLeft: 'auto',
          }}
        >
          <Share2 size={16} />
        </button>
      </div>
    </article>
  )
}
