import { z } from 'zod'
import { PhotoSchema } from '@domain/entities'

export const PhotoInsertDtoSchema = PhotoSchema.pick({
  title: true,
  description: true,
  position: true,
  color: true
}).extend({
  media_id: z.coerce.number()
})

export type PhotoInsertDto = z.infer<typeof PhotoInsertDtoSchema>

export const PhotoUpdateDtoSchema = PhotoInsertDtoSchema.extend({
  media_id: z.coerce.number().optional()
})

export type PhotoUpdateDto = z.infer<typeof PhotoUpdateDtoSchema>
