import escape from 'lodash/escape'

export default (photo = {}) => ({
  ...photo,
  // override
  title: escape(photo.title),
  description: escape(photo.description),
  portrait: photo.portrait || false,
  square: photo.square || false
})