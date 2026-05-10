'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { CreatePostModal } from './CreatePostModal'

interface CreatePostFABProps {
  onPost?: (data: { content: string; location: string; imageUrl: string }) => void
}

export function CreatePostFAB({ onPost }: CreatePostFABProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        id="create-post-fab"
        aria-label="Share a travel moment"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: 16,
          background: '#f97316',
          color: '#fff',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(249,115,22,0.4)',
          cursor: 'pointer',
          zIndex: 40,
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.4)'
        }}
      >
        <PlusCircle size={24} />
      </button>

      {open && (
        <CreatePostModal
          onClose={() => setOpen(false)}
          onSubmit={async (data) => {
            if (onPost) onPost(data)
          }}
        />
      )}
    </>
  )
}
