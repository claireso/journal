import { z } from 'zod'
import { MediaSchema } from '@domain/entities'

export const MediaDtoSchema = MediaSchema.extend({
  portrait: z.boolean(),
  square: z.boolean(),
  source: z.string()
})

export type MediaDto = z.infer<typeof MediaDtoSchema>

export const LegacyMediaDtoSchema = MediaDtoSchema.omit({
  id: true,
  created_at: true,
  size: true
})

export type LegacyMediaDto = z.infer<typeof LegacyMediaDtoSchema>
