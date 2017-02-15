const get_photos = (fields = '*') =>
  `select ${ fields } from photos`

module.exports = {
  get_photos,
}
