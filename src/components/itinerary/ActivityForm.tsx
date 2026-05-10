'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { createActivity } from '@/actions/activity/createActivity'
import { updateActivity } from '@/actions/activity/updateActivity'
import { createActivitySchema } from '@/lib/validations/activitySchema'
import type { CreateActivityInput } from '@/lib/validations/activitySchema'
import { Button } from '@/components/ui/Button'
import type { StopActivityWithDetail } from '@/types/itinerary'

const CATEGORIES = ['Food', 'Transport', 'Nature', 'Culture', 'Adventure', 'Shopping', 'Accommodation', 'Other']

interface ActivityFormProps {
  tripId: string
  stopId: string
  existingStopActivity?: StopActivityWithDetail
  onSuccess?: () => void
}

export function ActivityForm({ tripId, stopId, existingStopActivity, onSuccess }: ActivityFormProps) {
  const [isPending, startTransition] = useTransition()
  const isEdit = Boolean(existingStopActivity)

  const { register, handleSubmit, formState: { errors } } = useForm<CreateActivityInput>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: existingStopActivity
      ? {
          stopId,
          name: existingStopActivity.activity.name,
          description: existingStopActivity.activity.description ?? '',
          category: existingStopActivity.activity.category ?? '',
          estimatedCost: Number(existingStopActivity.costOverride ?? existingStopActivity.activity.baseCost ?? 0) || undefined,
          scheduledDate: existingStopActivity.scheduledDate
            ? new Date(existingStopActivity.scheduledDate).toISOString().split('T')[0]
            : '',
          durationMinutes: existingStopActivity.activity.durationMinutes ?? undefined,
        }
      : { stopId },
  })

  function onSubmit(data: CreateActivityInput) {
    startTransition(async () => {
      if (isEdit && existingStopActivity) {
        await updateActivity(tripId, { ...data, id: existingStopActivity.id })
      } else {
        await createActivity(tripId, data)
      }
      onSuccess?.()
    })
  }

  const inputClass = 'w-full bg-surface-container border border-outline rounded-xl px-3 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors'
  const labelClass = 'text-xs font-medium text-on-surface-variant mb-1 block'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input type="hidden" {...register('stopId')} />
      <div>
        <label className={labelClass}>Activity Name *</label>
        <input {...register('name')} className={inputClass} placeholder="e.g. Visit Senso-ji Temple" />
        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Category</label>
          <select {...register('category')} className={inputClass}>
            <option value="">Select…</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Estimated Cost (USD)</label>
          <input type="number" {...register('estimatedCost', { setValueAs: v => v === "" ? undefined : Number(v) })} className={inputClass} placeholder="0" min="0" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Date</label>
          <input type="date" {...register('scheduledDate')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Duration (minutes)</label>
          <input type="number" {...register('durationMinutes', { setValueAs: v => v === "" ? undefined : Number(v) })} className={inputClass} placeholder="60" min="1" />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onSuccess}>Cancel</Button>
        <Button type="submit" size="sm" isLoading={isPending}>
          {isEdit ? 'Save' : 'Add Activity'}
        </Button>
      </div>
    </form>
  )
}
