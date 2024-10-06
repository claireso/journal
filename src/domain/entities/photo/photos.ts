import { z } from 'zod'
import { ListSchema } from '../list'
import { PhotoSchema } from './photo'

export const PhotosSchema = ListSchema(z.array(PhotoSchema))

export type Photos = z.infer<typeof PhotosSchema>
