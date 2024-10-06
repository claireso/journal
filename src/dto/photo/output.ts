import { z } from 'zod'

import { PhotoSchema, PhotosSchema } from '@domain/entities'
import { MediaDtoSchema, LegacyMediaDtoSchema } from '../media'

const PhotoDtoSchema = PhotoSchema.omit({
  portrait: true,
  square: true,
  name: true,
  media: true
}).extend({
  media: z.union([MediaDtoSchema, LegacyMediaDtoSchema])
})

export type PhotoDto = z.infer<typeof PhotoDtoSchema>

const PhotosDtoSchema = PhotosSchema.pick({
  pager: true
}).extend({
  items: z.array(PhotoDtoSchema)
})

export type PhotosDto = z.infer<typeof PhotosDtoSchema>
