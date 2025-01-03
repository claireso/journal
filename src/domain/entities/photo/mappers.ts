import type { Photo } from './photo'
import { mapRowToMedia } from '../media'

// eslint-disable-next-line
export const mapRowToPhoto = (data: any): Photo => ({
  id: data.photo_id,
  title: data.title,
  description: data.description,
  position: data.position,
  color: data.color,
  created_at: data.photo_created_at,
  updated_at: data.updated_at,
  media_id: data.media_id,
  media: data.media_id
    ? mapRowToMedia({
        id: data.media_id,
        created_at: data.media_created_at,
        type: data.media_type,
        name: data.media_name,
        width: data.media_width,
        height: data.media_height
      })
    : undefined,
  // deprecated fields
  name: data.photo_name,
  portrait: data.portrait,
  square: data.square
})
