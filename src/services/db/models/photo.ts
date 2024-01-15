import escape from 'lodash/escape'
import unescape from '@utils/unescape'

const DEFAULT_POSITION = 'left'
const DEFAULT_PORTRAIT = false
const DEFAULT_SQUARE = false

const model = ({ width, height, ...photo }: Partial<Photo> & { width?: number; height?: number } = {}) => ({
  ...photo,
  // override
  title: escape(photo.title),
  description: escape(photo.description),
  portrait: width && height ? width < height : photo.portrait || DEFAULT_PORTRAIT,
  square: width && height ? width == height : photo.square || DEFAULT_SQUARE,
  position: photo.position || DEFAULT_POSITION,
  color: photo.color || null
})

export default model

export const formatPhoto = (photo: Partial<Photo> = {}) => ({
  ...photo,
  title: unescape(photo.title),
  description: unescape(photo.description),
  source: `/uploads/${photo.name}`
})
