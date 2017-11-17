const get_photos = ({fields = '*', options = ''} = {}) =>
  `SELECT ${ fields } FROM photos ORDER BY id DESC ${ options }`

const insert_photo = () =>
  `INSERT
    INTO photos
    (title, description, name, position, portrait, square)
    VALUES
    ($1, $2, $3, $4, $5, $6)
  `

const update_photo = (id = '', fields) =>
  `UPDATE photos SET ${ fields } WHERE id=${ id }`

const find_photo = (id = '', fields = '*') =>
  `SELECT ${ fields } FROM photos WHERE id=${ id }`

const delete_photo = (id = '') =>
  `DELETE FROM photos WHERE id=${ id }`

const count_photos = () =>
  'SELECT count(*) FROM photos'

export default {
  get_photos,
  insert_photo,
  update_photo,
  find_photo,
  delete_photo,
  count_photos,
}
