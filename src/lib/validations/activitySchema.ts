import { z } from 'zod'

export const activitySchema = z.object({
  name: z.string().min(1, 'Activity name is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  estimatedCost: z.number().min(0).optional(),
  scheduledDate: z.string().date().optional().or(z.literal('')),
  scheduledTime: z.string().optional(),
  durationMinutes: z.number().int().min(1).optional(),
})

export const createActivitySchema = activitySchema.extend({
  stopId: z.string().uuid(),
})

export const updateActivitySchema = activitySchema.partial().extend({
  id: z.string().uuid(),
  stopId: z.string().uuid(),
})

export type ActivityInput = z.infer<typeof activitySchema>
export type CreateActivityInput = z.infer<typeof createActivitySchema>
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>
