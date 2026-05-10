'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Image as ImageIcon, MapPin, Send } from 'lucide-react'
import { createCommunityPost } from '@/actions/community/createPost'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('content', content)
      formData.append('location', location)
      formData.append('imageUrl', imageUrl)
      
      await createCommunityPost(formData)
      onClose()
      setContent('')
      setLocation('')
      setImageUrl('')
    } catch (error) {
      // Handle error silently or through UI notifications if needed
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[#1c1c19]/40 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md p-4"
          >
            <div className="bg-[#fdf9f4] border border-[#dfc0b7] rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h2 className="text-lg font-bold text-[#1c1c19]">Share a Moment</h2>
                    <p className="text-[10px] text-[#8c7b72] font-medium uppercase tracking-widest">Post to community</p>
                  </div>
                  <button 
                    onClick={onClose} 
                    className="p-1.5 bg-white border border-[#f0e8e4] rounded-lg text-[#8c7b72] hover:text-[#a43716] transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#a43716] uppercase tracking-[0.2em] ml-1">Your Story</label>
                    <textarea
                      placeholder="Where have you been? What did you find?"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full h-24 p-3 rounded-xl bg-white border border-[#f0e8e4] text-[#1c1c19] placeholder-[#8c7b72]/50 focus:border-[#a43716] outline-none resize-none font-medium text-sm transition-all shadow-inner"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-[#a43716] uppercase tracking-[0.2em] ml-1">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a43716] w-3.5 h-3.5" />
                        <input
                          type="text"
                          placeholder="Paris, France"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#f0e8e4] text-[#1c1c19] placeholder-[#8c7b72]/50 focus:border-[#a43716] outline-none text-xs font-bold transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-[#a43716] uppercase tracking-[0.2em] ml-1">Image Link</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a43716] w-3.5 h-3.5" />
                        <input
                          type="text"
                          placeholder="https://..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#f0e8e4] text-[#1c1c19] placeholder-[#8c7b72]/50 focus:border-[#a43716] outline-none text-xs font-bold transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#a43716] text-white font-black flex items-center justify-center gap-2 hover:bg-[#8c2e12] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-[#a43716]/10 uppercase tracking-widest text-xs mt-2"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Share with the world</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
