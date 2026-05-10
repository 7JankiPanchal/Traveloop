import { z } from 'zod'

export const tripSchema = z.object({
  title: z.string().min(1, 'Trip title is required').max(100),
  description: z.string().optional(),
  startDate: z.string().date().optional().or(z.literal('')),
  endDate: z.string().date().optional().or(z.literal('')),
  budgetLimit: z.coerce.number().min(0).optional(),
  isPublic: z.boolean().default(false),
})

export const createTripSchema = tripSchema

export const updateTripSchema = tripSchema.partial().extend({
  id: z.string().uuid(),
})

export type TripInput = z.infer<typeof tripSchema>
export type CreateTripInput = z.infer<typeof createTripSchema>
export type UpdateTripInput = z.infer<typeof updateTripSchema>
