import { z } from 'zod'
import { PagerSchema } from '../pager'
import { PhotoSchema } from './photo'

export const PhotosSchema = z.object({
  items: z.array(PhotoSchema),
  pager: PagerSchema
})

export type Photos = z.infer<typeof PhotosSchema>
