'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { createStop } from '@/actions/stop/createStop'
import { updateStop } from '@/actions/stop/updateStop'
import { createStopSchema } from '@/lib/validations/stopSchema'
import type { CreateStopInput } from '@/lib/validations/stopSchema'
import { Button } from '@/components/ui/Button'
import { CitySearchInput } from '@/components/city-search/CitySearchInput'
import type { StopWithActivities } from '@/types/itinerary'

interface StopFormProps {
  tripId: string
  existingStop?: StopWithActivities
  onSuccess?: () => void
}

export function StopForm({ tripId, existingStop, onSuccess }: StopFormProps) {
  const [isPending, startTransition] = useTransition()
  const isEdit = Boolean(existingStop)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateStopInput>({
    resolver: zodResolver(createStopSchema),
    defaultValues: existingStop
      ? {
          cityName: existingStop.cityName,
          country: existingStop.country ?? '',
          arriveDate: existingStop.arriveDate ? new Date(existingStop.arriveDate).toISOString().split('T')[0] : '',
          departDate: existingStop.departDate ? new Date(existingStop.departDate).toISOString().split('T')[0] : '',
          estimatedBudget: existingStop.estimatedBudget ? Number(existingStop.estimatedBudget) : undefined,
        }
      : {},
  })

  function onSubmit(data: CreateStopInput) {
    startTransition(async () => {
      if (isEdit && existingStop) {
        await updateStop(tripId, { ...data, id: existingStop.id })
      } else {
        await createStop(tripId, data)
      }
      onSuccess?.()
    })
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors'
  const labelClass = 'text-xs font-medium text-slate-400 mb-1 block'
  const errorClass = 'text-xs text-red-400 mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-2">
        <label className={labelClass}>Search City (Auto-fill)</label>
        <CitySearchInput 
          placeholder="Type to search and auto-fill..."
          onSelect={(city) => {
            setValue('cityName', city.name, { shouldValidate: true })
            setValue('country', city.country ?? '', { shouldValidate: true })
          }} 
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>City *</label>
          <input {...register('cityName')} className={inputClass} placeholder="e.g. Tokyo" />
          {errors.cityName && <p className={errorClass}>{errors.cityName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Country</label>
          <input {...register('country')} className={inputClass} placeholder="e.g. Japan" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Arrive Date</label>
          <input type="date" {...register('arriveDate')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Depart Date</label>
          <input type="date" {...register('departDate')} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Estimated Budget (USD)</label>
        <input type="number" {...register('estimatedBudget', { setValueAs: v => v === "" ? undefined : Number(v) })} className={inputClass} placeholder="0" min="0" />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onSuccess}>Cancel</Button>
        <Button type="submit" size="sm" isLoading={isPending}>
          {isEdit ? 'Save Changes' : 'Add Stop'}
        </Button>
      </div>
    </form>
  )
}
