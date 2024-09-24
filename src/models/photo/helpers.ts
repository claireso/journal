import escape from 'lodash/escape'
import unescape from '@utils/unescape'

import { Photo } from './photo'
import { formatMedia, formatLegacyMedia } from '../media/helpers'

export const createPhoto = (data: Partial<Photo>): Partial<Photo> => ({
  title: escape(data.title),
  description: escape(data.description),
  color: data.color || null,
  position: data.position,
  media_id: data.media_id,
  updated_at: new Date()
})

// DTO Photo
export const formatPhoto = (photo: any): Photo => ({
  id: photo.photo_id,
  title: unescape(photo.title),
  description: unescape(photo.description),
  color: photo.color,
  position: photo.position,
  created_at: photo.photo_created_at,
  updated_at: photo.photo_updated_at,
  media_id: photo.media_id,
  media: photo.media_id
    ? formatMedia({
        id: photo.media_id,
        created_at: photo.media_created_at,
        name: photo.media_name,
        type: photo.media_type,
        width: photo.media_width,
        height: photo.media_height
      })
    : formatLegacyMedia({
        // legacy
        name: photo.photo_name, // deprecated, moved in media
        portrait: photo.portrait, // deprecated, moved in media
        square: photo.square // deprecated, moved in media
      })
})
