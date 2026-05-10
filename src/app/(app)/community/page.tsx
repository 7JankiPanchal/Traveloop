import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import prisma from '@/lib/prisma'
import { serialize } from '@/lib/utils'
import { CommunityPostCard } from '@/components/community/CommunityPostCard'
import { CreatePostFAB } from '@/components/community/CreatePostFAB'
import { Users } from 'lucide-react'

export const metadata = {
  title: 'Community | Traveloop',
  description: 'Share your travel stories and discover inspiration from fellow explorers.',
}

export default async function CommunityPage() {
  const user = await getCurrentUser()

  const posts = await prisma.communityPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
        },
      },
    },
  })

  const serialized = serialize(posts)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f1117',
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'rgba(249,115,22,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={20} color="#f97316" />
            </div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
              Community
            </h1>
          </div>
          <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
            Travel stories from explorers around the world
          </p>
        </div>

        {/* Posts Feed */}
        {serialized.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#475569',
            }}
          >
            <Users size={48} color="#1e293b" style={{ marginBottom: 16 }} />
            <p style={{ fontSize: 16, fontWeight: 600, color: '#334155', margin: '0 0 8px' }}>
              No posts yet — be the first!
            </p>
            <p style={{ margin: 0, fontSize: 14 }}>
              Share your travel story to inspire others.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {serialized.map((post: any) => (
              <CommunityPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {user && <CreatePostFAB />}
    </div>
  )
}
