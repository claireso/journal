import { z } from 'zod'
import { EntitySchema } from '../entity'
import { MediaSchema } from '../media'

export enum PhotoPositionType {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

export const PhotoSchema = EntitySchema.extend({
  title: z.string().optional().default(''),
  description: z.string().optional().default(''),
  position: z.nativeEnum(PhotoPositionType).default(PhotoPositionType.LEFT),
  color: z
    .string()
    .nullable()
    .refine((val) => val === null || val === '' || (val.startsWith('#') && val.length === 7), {
      message: 'Color must be defined as a hex color'
    })
    .default(null),
  // optional in database due to the legacy
  // a migration is necessary to make it required
  media_id: z.number().optional(),
  media: MediaSchema.optional(),
  // legacy fields
  name: z.string(),
  portrait: z.boolean(),
  square: z.boolean()
})

export type Photo = z.infer<typeof PhotoSchema>
