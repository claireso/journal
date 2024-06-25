import { z } from 'zod'

export const EntitySchema = z.object({
  id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
})

export type Entity = z.infer<typeof EntitySchema>
