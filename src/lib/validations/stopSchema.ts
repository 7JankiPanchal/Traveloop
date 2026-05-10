import { z } from 'zod'

export const stopSchema = z.object({
  cityName: z.string().min(1, 'City name is required'),
  country: z.string().optional(),
  cityId: z.string().uuid().optional(),
  sortOrder: z.number().int().min(0),
  arriveDate: z.string().date().optional().or(z.literal('')),
  departDate: z.string().date().optional().or(z.literal('')),
  estimatedBudget: z.number().min(0).optional(),
})

export const createStopSchema = stopSchema.omit({ sortOrder: true })

export const updateStopSchema = stopSchema.partial().extend({
  id: z.string().uuid(),
})

export type StopInput = z.infer<typeof stopSchema>
export type CreateStopInput = z.infer<typeof createStopSchema>
export type UpdateStopInput = z.infer<typeof updateStopSchema>
