const get_photos = (fields = '*') =>
  `SELECT ${ fields } FROM photos`

const insert_photo = () =>
  `INSERT
    INTO photos
    (title, description, name, position, portrait, square)
    VALUES
    ($1, $2, $3, $4, $5, $6)
  `

module.exports = {
  get_photos,
  insert_photo,
}
