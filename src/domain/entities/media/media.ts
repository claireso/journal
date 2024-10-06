import { z } from 'zod'
import { EntitySchema } from '../entity'

export enum MediaType {
  IMAGE = 'image'
}

export const MediaSchema = EntitySchema.omit({ updated_at: true }).extend({
  name: z.string(),
  type: z.nativeEnum(MediaType),
  size: z.object({
    width: z.number(),
    height: z.number()
  })
})

export type Media = z.infer<typeof MediaSchema>
