import React from 'react'

export function CommunityPostCard({ post }: { post: any }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '24px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(164, 55, 22, 0.05)',
      border: '1px solid #fdf9f4'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <img src={post.user?.avatarUrl} alt={post.user?.firstName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <h4 style={{ margin: 0, fontWeight: 600, color: '#1c1c19' }}>{post.user?.firstName} {post.user?.lastName}</h4>
          <span style={{ fontSize: '12px', color: '#58423c' }}>{post.location}</span>
        </div>
      </div>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.6', color: '#1c1c19' }}>
        {post.content}
      </p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" style={{ width: '100%', borderRadius: '16px', maxHeight: '300px', objectFit: 'cover', marginBottom: '16px' }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a43716' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>favorite</span>
        <span style={{ fontSize: '14px', fontWeight: 600 }}>{post.likes}</span>
      </div>
    </div>
  )
}
