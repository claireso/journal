import { z } from 'zod'
import { PhotoSchema } from '../photo'

export const PhotoRequestSchema = PhotoSchema.pick({
  title: true,
  description: true,
  position: true,
  color: true
}).extend({
  file: z.instanceof(File)
})

export type PhotoRequest = z.infer<typeof PhotoRequestSchema>
