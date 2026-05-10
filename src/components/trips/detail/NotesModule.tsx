'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FileText, Plus, Search, Calendar, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'

import { useTransition } from 'react'
import { createNoteAction, deleteNoteAction } from '@/actions/note/noteActions'

interface NotesModuleProps {
  notes: any[]
  tripId: string
}

export function NotesModule({ notes, tripId }: NotesModuleProps) {
  const [showAdd, setShowAdd] = useState(false)
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()

  const filteredNotes = notes.filter(n => n.body.toLowerCase().includes(search.toLowerCase()))

  const handleAdd = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await createNoteAction(formData)
        setShowAdd(false)
      } catch (err) {
                alert('Failed to save note')
      }
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return
    startTransition(async () => {
      try {
        await deleteNoteAction(id)
      } catch (err) {
                alert('Failed to delete note')
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search your notes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20"
        >
          {showAdd ? 'Cancel' : <><Plus className="w-5 h-5" /> Write Entry</>}
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 rounded-[40px] bg-[#1a1d2e] border border-purple-500/30 shadow-2xl space-y-6"
          >
            <form action={handleAdd} className="space-y-6">
              <input type="hidden" name="tripId" value={tripId} />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Journal Entry</label>
                <textarea 
                  name="body"
                  required
                  placeholder="What's on your mind? Thoughts about today's adventure..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors min-h-[150px] resize-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowAdd(false)} className="px-6 py-2 text-slate-400 font-bold hover:text-white transition-colors">Cancel</button>
                <button disabled={isPending} type="submit" className="px-8 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50">
                  {isPending ? 'Saving...' : 'Save Entry'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.length > 0 ? filteredNotes.map((note, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={note.id} 
            className="p-8 rounded-[40px] bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all flex flex-col justify-between h-full group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Calendar className="w-3 h-3" />
                  {formatDate(note.createdAt)}
                </div>
              </div>
              <p className="text-white/80 leading-relaxed italic">
                "{note.body}"
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-3 h-3 text-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {note.stop?.cityName || 'General Note'}
                </span>
              </div>
              <button 
                onClick={() => handleDelete(note.id)}
                disabled={isPending}
                className="text-[10px] font-black uppercase tracking-widest text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )) : (
          <div className="md:col-span-2 text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
            <p className="text-slate-500 font-medium">No notes found. Capture your first memory!</p>
          </div>
        )}
      </div>
    </div>
  )
}
