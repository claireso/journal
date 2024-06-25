import escape from 'lodash/escape'
import unescape from '@utils/unescape'

import { Photo, EnhancedPhoto } from './photo'

export const createPhoto = (
  data: Partial<Photo>,
  file?: { width: number; height: number; filename: string }
): Partial<Photo> => ({
  ...data,
  name: file?.filename ?? data.name,
  // override
  title: escape(data.title),
  description: escape(data.description),
  portrait: file?.width && file.height ? file.width < file.height : data.portrait || false,
  square: file?.width && file?.height ? file?.width == file?.height : data.square || false,
  position: data.position,
  color: data.color || null
})

export const formatPhoto = (photo: Photo): EnhancedPhoto => ({
  ...photo,
  title: unescape(photo.title),
  description: unescape(photo.description),
  source: `/uploads/${photo.name}`
})
