'use client'

import React, { useState } from 'react'
import { CreatePostModal } from './CreatePostModal'

export function CreatePostFAB() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-90 transition-transform z-40 ring-4 ring-primary/20"
      >
        <span className="material-symbols-outlined text-[28px]">edit</span>
      </button>

      <CreatePostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
