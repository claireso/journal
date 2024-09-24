import { z } from 'zod'
import { EntitySchema } from '../entity'
import { MediaSchema, LegacyMediaSchema } from '../media'

export const PhotoSchema = EntitySchema.extend({
  title: z.string().optional().default(''),
  description: z.string().optional().default(''),
  position: z.enum(['left', 'center', 'right']).default('left'),
  color: z
    .string()
    .nullable()
    .refine((val) => val === null || val === '' || (val.startsWith('#') && val.length === 7), {
      message: 'Color must be defined as a hex color'
    })
    .default(null),
  media_id: z.number(),
  media: z.union([MediaSchema, LegacyMediaSchema])
})

export type Photo = z.infer<typeof PhotoSchema>
