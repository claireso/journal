import escape from 'lodash/escape'

export default ({ width, height, ...photo } = {}) => ({
  ...photo,
  // override
  title: escape(photo.title),
  description: escape(photo.description),
  portrait: width && height ? width < height : photo.portrait || false,
  square: width && height ? width == height : photo.square || false
})
