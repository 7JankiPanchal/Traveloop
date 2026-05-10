'use client'

import { useState } from 'react'
import { createNoteAction } from '@/actions/note/noteActions'
import { Button } from '@/components/ui/Button'
import { Plus, StickyNote } from 'lucide-react'

interface NoteEditorProps {
  tripId: string
  stops: { id: string; cityName: string }[]
}

export function NoteEditor({ tripId, stops }: NoteEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedStopId, setSelectedStopId] = useState<string>('')

  return (
    <div className={`transition-all duration-300 ${isExpanded ? 'mb-8' : 'mb-4'}`}>
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-orange-500/30 transition-all text-slate-400 hover:text-white group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span className="font-medium">Add a new note or journal entry...</span>
        </button>
      ) : (
        <form
          action={async (formData) => {
            await createNoteAction(formData)
            setIsExpanded(false)
          }}
          className="p-6 bg-white/5 border border-orange-500/20 rounded-[32px] backdrop-blur-xl space-y-4 animate-in fade-in zoom-in duration-300"
        >
          <input type="hidden" name="tripId" value={tripId} />
          <input type="hidden" name="stopId" value={selectedStopId} />

          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2 text-orange-500">
              <StickyNote className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">New Journal Entry</span>
            </div>
            
            <select
              value={selectedStopId}
              onChange={(e) => setSelectedStopId(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-orange-500 transition-colors"
            >
              <option value="">General (Trip Level)</option>
              {stops.map((stop) => (
                <option key={stop.id} value={stop.id}>
                  Stop: {stop.cityName}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="body"
            required
            rows={4}
            autoFocus
            placeholder="What's on your mind? Thoughts, plans, or memories..."
            className="w-full bg-transparent border-none text-lg text-white placeholder:text-slate-600 focus:ring-0 resize-none"
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <Button type="submit">Save Entry</Button>
          </div>
        </form>
      )}
    </div>
  )
}
