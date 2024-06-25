import { z } from 'zod'

export const EntitySchema = z.object({
  id: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
})

export type Entity = z.infer<typeof EntitySchema>
