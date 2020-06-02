import escape from 'lodash/escape'

const DEFAULT_POSITION = 'left'
const DEFAULT_PORTRAIT = false
const DEFAULT_SQUARE = false

export default ({ width, height, ...photo } = {}) => ({
  ...photo,
  // override
  title: escape(photo.title),
  description: escape(photo.description),
  portrait:
    width && height ? width < height : photo.portrait || DEFAULT_PORTRAIT,
  square: width && height ? width == height : photo.square || DEFAULT_SQUARE,
  position: photo.position || DEFAULT_POSITION
})
