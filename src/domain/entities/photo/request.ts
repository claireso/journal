import { z } from 'zod'
import { PhotoSchema } from '../photo'

export const PhotoRequestSchema = PhotoSchema.pick({
  title: true,
  description: true,
  position: true,
  color: true,
  media_id: true
})

export const LegacyPhotoRequestSchema = PhotoRequestSchema.extend({
  media_id: z.number().optional()
})

export type PhotoRequest = z.infer<typeof PhotoRequestSchema>
export type LegacyPhotoRequest = z.infer<typeof LegacyPhotoRequestSchema>
