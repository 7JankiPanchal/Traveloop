'use client'

import React, { useState } from 'react'
import { Plus, Check, Trash2, Package, Luggage } from 'lucide-react'
import { addPackingItem, togglePackingItem, deletePackingItem } from '@/actions/packing/packingActions'
import { motion, AnimatePresence } from 'motion/react'

interface PackingItem {
  id: string
  label: string
  category: string | null
  isPacked: boolean
}

interface PackingModuleProps {
  items: PackingItem[]
  tripId: string
}

export function PackingModule({ items, tripId }: PackingModuleProps) {
  const [newItemLabel, setNewItemLabel] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemLabel.trim()) return

    setIsAdding(true)
    const res = await addPackingItem(tripId, newItemLabel)
    if (res.success) {
      setNewItemLabel('')
    }
    setIsAdding(false)
  }

  const handleToggle = async (itemId: string, currentStatus: boolean) => {
    await togglePackingItem(tripId, itemId, !currentStatus)
  }

  const handleDelete = async (itemId: string) => {
    await deletePackingItem(tripId, itemId)
  }

  return (
    <div className="bg-surface-container border border-outline rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Luggage className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-on-surface">Packing List</h3>
        </div>
        <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-3 py-1 rounded-full border border-outline-variant">
          {items.filter(i => i.isPacked).length} / {items.length} items
        </span>
      </div>

      <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newItemLabel}
          onChange={(e) => setNewItemLabel(e.target.value)}
          placeholder="Add an item..."
          className="flex-1 bg-surface-bright border border-outline rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors text-on-surface placeholder:text-outline"
        />
        <button
          type="submit"
          disabled={isAdding}
          className="p-2 bg-primary text-white hover:bg-primary/90 rounded-xl transition-colors disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-outline text-sm italic"
            >
              No items yet. Ready to pack?
            </motion.div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  item.isPacked 
                    ? 'bg-primary/5 border-primary/20 opacity-60' 
                    : 'bg-surface-container border-outline-variant hover:border-primary/20'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => handleToggle(item.id, item.isPacked)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                      item.isPacked 
                        ? 'bg-primary border-primary text-white' 
                        : 'border-outline-variant group-hover:border-primary/40'
                    }`}
                  >
                    {item.isPacked && <Check className="w-4 h-4" />}
                  </button>
                  <span className={`text-sm ${item.isPacked ? 'line-through text-outline' : 'text-on-surface'}`}>
                    {item.label}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
