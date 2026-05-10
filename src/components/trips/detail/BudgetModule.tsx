'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Wallet, Plus, Trash2, TrendingDown, Tag } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
// Note: We'll need a server action to add budget entries
// import { addBudgetEntryAction } from '@/actions/budget/addEntry'

import { createBudgetEntryAction, deleteBudgetEntryAction } from '@/actions/budget/budgetActions'

interface BudgetModuleProps {
  budgetLimit: number
  entries: any[]
  tripId: string
}

export function BudgetModule({ budgetLimit, entries, tripId }: BudgetModuleProps) {
  const [showAdd, setShowAdd] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const totalSpent = entries.reduce((sum, entry) => sum + Number(entry.amount), 0)
  const remaining = budgetLimit - totalSpent
  const spentPercentage = Math.min((totalSpent / (budgetLimit || 1)) * 100, 100)

  const handleAdd = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await createBudgetEntryAction(formData)
        setShowAdd(false)
      } catch (err) {
        console.error(err)
        alert('Failed to add expense')
      }
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return
    startTransition(async () => {
      try {
        await deleteBudgetEntryAction(id)
      } catch (err) {
        console.error(err)
        alert('Failed to delete expense')
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="p-8 rounded-[40px] bg-[#1a1d2e] border border-white/5 space-y-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Wallet className="w-24 h-24 text-orange-500" />
        </div>

        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Total Spent</p>
          <h3 className="text-4xl font-black text-white">{formatCurrency(totalSpent)}</h3>
          <p className="text-sm text-slate-400">of {formatCurrency(budgetLimit)} limit</p>
        </div>

        <div className="space-y-3">
          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${spentPercentage}%` }}
              className={`h-full bg-gradient-to-r ${spentPercentage > 90 ? 'from-red-500 to-orange-500' : 'from-orange-500 to-yellow-500'}`}
            />
          </div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span>{Math.round(spentPercentage)}% Used</span>
            <span className={remaining < 0 ? 'text-red-500' : ''}>
              {remaining < 0 ? 'Exceeded by ' : ''}{formatCurrency(Math.abs(remaining))} {remaining < 0 ? '' : 'Left'}
            </span>
          </div>
        </div>

        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all text-sm"
        >
          <Plus className="w-4 h-4 text-orange-500" />
          {showAdd ? 'Cancel' : 'Add Expense'}
        </button>
      </div>

      {/* Add Entry Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form action={handleAdd} className="p-6 rounded-[32px] bg-white/5 border border-white/10 space-y-4">
              <input type="hidden" name="tripId" value={tripId} />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Label</label>
                  <input name="label" required type="text" placeholder="Flight, Dinner, etc." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Amount</label>
                  <input name="amount" required type="number" step="0.01" placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>
              <button disabled={isPending} type="submit" className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors disabled:opacity-50">
                {isPending ? 'Saving...' : 'Save Expense'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Entries */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Recent Expenses</h4>
        <div className="space-y-3">
          {entries.length > 0 ? entries.map((entry) => (
            <div key={entry.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{entry.label}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">{entry.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-white">{formatCurrency(entry.amount)}</p>
                <button 
                  onClick={() => handleDelete(entry.id)}
                  disabled={isPending}
                  className="text-[10px] text-red-500 font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Remove
                </button>
              </div>
            </div>
          )) : (
            <p className="text-sm text-slate-500 text-center py-4">No expenses recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
