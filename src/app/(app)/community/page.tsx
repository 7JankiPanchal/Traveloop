import React from 'react'
import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { serialize } from '@/lib/utils'
import { CommunityPostCard } from '@/components/community/CommunityPostCard'
import { CreatePostFAB } from '@/components/community/CreatePostFAB'
import { EmptyState } from '@/components/ui/EmptyState'

export default async function CommunityPage() {
  const user = await getCurrentUser()

  // Graceful fallback if community_posts table doesn't exist yet (pre-migration)
  let dbPosts: any[] = []
  try {
    dbPosts = await prisma.communityPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    })
  } catch (err) {
    // Warning suppressed for production
  }

  const mockPosts = [
    {
      id: 'mock-1',
      user: {
        firstName: 'Elena',
        lastName: 'Rossi',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
      },
      createdAt: new Date(Date.now() - 7200000),
      location: 'Rome, Italy',
      content: "Hidden gems in Rome you can't miss! Everyone goes to the Trevi Fountain, but have you tried the orange garden on Aventine Hill at sunset? The view is absolutely breathtaking and far less crowded. 🇮🇹✨",
      imageUrl: 'https://images.unsplash.com/photo-1529260839382-3eff510abcbf?q=80&w=2070&auto=format&fit=crop',
      likes: 124,
    },
    {
      id: 'mock-2',
      user: {
        firstName: 'Marcus',
        lastName: 'Chen',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
      },
      createdAt: new Date(Date.now() - 18000000),
      location: 'Kyoto, Japan',
      content: 'Our trip to Kyoto was magical... walking through the Fushimi Inari gates at 6 AM before the crowds arrived was a spiritual experience I\'ll never forget. ⛩️🍃',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
      likes: 342,
    },
  ]

  const posts = dbPosts.length > 0 ? serialize(dbPosts) : mockPosts

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '32px 20px 100px',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 34,
              fontWeight: 700,
              color: '#1c1c19',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Community
          </h1>
          <p style={{ color: '#58423c', fontSize: 14, marginTop: 6 }}>
            Stories and tips from fellow travelers around the world
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            position: 'relative',
            marginBottom: 24,
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 18,
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search destinations, tips, or travelers..."
            style={{
              width: '100%',
              padding: '14px 20px 14px 48px',
              borderRadius: 14,
              border: '1.5px solid #dfc0b7',
              backgroundColor: '#fff',
              fontSize: 14,
              fontFamily: "'Montserrat', sans-serif",
              color: '#1c1c19',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 28,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
        >
          {['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Middle East'].map((tag, i) => (
            <button
              key={tag}
              style={{
                padding: '8px 16px',
                borderRadius: 9999,
                border: '1.5px solid',
                borderColor: i === 0 ? '#a43716' : '#dfc0b7',
                backgroundColor: i === 0 ? '#a43716' : 'transparent',
                color: i === 0 ? '#fff' : '#58423c',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: "'Montserrat', sans-serif",
                transition: 'all 0.15s',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <CommunityPostCard key={post.id} post={post} />
            ))
          ) : (
            <EmptyState
              title="No posts yet"
              description="Be the first to share your travel experience with the community!"
            />
          )}
        </div>
      </div>

      <CreatePostFAB />
    </div>
  )
}
