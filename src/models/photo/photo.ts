import { z } from 'zod'
import { EntitySchema } from '../entity'

export const PhotoSchema = EntitySchema.extend({
  title: z.string().optional().default(''),
  description: z.string().optional().default(''),
  name: z.string(),
  position: z.enum(['left', 'center', 'right']).default('left'),
  portrait: z.boolean(),
  color: z
    .string()
    .nullable()
    .refine((val) => val === null || val === '' || (val.startsWith('#') && val.length === 7), {
      message: 'Color must be defined as a hex color'
    })
    .default(null),
  square: z.boolean()
})

export const EnhancedPhotoSchema = PhotoSchema.extend({
  source: z.string()
})

export type Photo = z.infer<typeof PhotoSchema>
export type EnhancedPhoto = z.infer<typeof EnhancedPhotoSchema>
