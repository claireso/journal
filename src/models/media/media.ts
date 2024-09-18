import { z } from 'zod'
import { EntitySchema } from '../entity'

export const MediaSchema = EntitySchema.extend({
  name: z.string(),
  type: z.enum(['image']), // todo: avoid hard code
  // dto
  size: z.object({
    width: z.number(),
    height: z.number()
  }),
  portrait: z.boolean(),
  square: z.boolean(),
  source: z.string()
})

export const LegacyMediaSchema = MediaSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  size: true
})

export type Media = z.infer<typeof MediaSchema>
export type LegacyMedia = z.infer<typeof LegacyMediaSchema>
