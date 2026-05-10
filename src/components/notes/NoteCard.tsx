'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Trash2, Edit2, Check, X, MapPin } from 'lucide-react'
import { updateNoteAction, deleteNoteAction } from '@/actions/note/noteActions'
import { Badge } from '@/components/ui/Badge'

interface NoteCardProps {
  note: {
    id: string
    body: string
    createdAt: string
    stop?: { cityName: string } | null
  }
}

export function NoteCard({ note }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedBody, setEditedBody] = useState(note.body)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUpdate = async () => {
    await updateNoteAction(note.id, editedBody)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteNoteAction(note.id)
  }

  return (
    <div className="group relative p-6 bg-white/5 border border-white/10 rounded-[32px] hover:border-white/20 transition-all hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              {format(new Date(note.createdAt), 'MMM d, yyyy • h:mm a')}
            </span>
            {note.stop && (
              <Badge 
                variant="accent" 
                label={note.stop.cityName}
                className="pl-2" 
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="p-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditedBody(note.body)
                }}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-orange-500/50 transition-all resize-none"
        />
      ) : (
        <p className="text-lg text-slate-200 leading-relaxed whitespace-pre-wrap">
          {note.body}
        </p>
      )}

      {/* Decorative element */}
      <div className="absolute bottom-4 right-4 text-orange-500/5 select-none pointer-events-none">
        <StickyNoteIcon size={48} />
      </div>
    </div>
  )
}

function StickyNoteIcon({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
      <path d="M15 3v5h5" />
    </svg>
  )
}
