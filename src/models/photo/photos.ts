import { z } from 'zod'
import { PagerSchema } from '../pager'
import { EnhancedPhotoSchema } from './photo'

export const PhotosSchema = z.object({
  items: z.array(EnhancedPhotoSchema),
  pager: PagerSchema
})

export type Photos = z.infer<typeof PhotosSchema>
