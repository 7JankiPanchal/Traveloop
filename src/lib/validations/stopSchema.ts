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

export const createStopSchema = stopSchema.omit({ sortOrder: true }).refine(
  (data) => {
    // If one is provided, both should be provided for valid timeline
    if ((data.arriveDate && !data.departDate) || (!data.arriveDate && data.departDate)) return false
    if (!data.arriveDate || !data.departDate) return true
    return new Date(data.departDate) >= new Date(data.arriveDate)
  },
  {
    message: 'Both arrival and departure dates are required for an itinerary stop, and departure must be after arrival.',
    path: ['departDate'],
  }
)

export const updateStopSchema = stopSchema.partial().extend({
  id: z.string().uuid(),
}).refine(
  (data) => {
    if (data.arriveDate === undefined && data.departDate === undefined) return true
    // If updating dates, both should be consistent
    if ((data.arriveDate && !data.departDate) || (!data.arriveDate && data.departDate)) return false
    if (!data.arriveDate || !data.departDate) return true
    return new Date(data.departDate) >= new Date(data.arriveDate)
  },
  {
    message: 'Both arrival and departure dates are required for an itinerary stop, and departure must be after arrival.',
    path: ['departDate'],
  }
)


export type StopInput = z.infer<typeof stopSchema>
export type CreateStopInput = z.infer<typeof createStopSchema>
export type UpdateStopInput = z.infer<typeof updateStopSchema>
