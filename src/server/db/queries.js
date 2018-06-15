const get_photos = ({ fields = '*', options = '' } = {}) =>
  `SELECT ${fields} FROM photos ORDER BY id DESC ${options}`

const insert_photo = () =>
  `INSERT
    INTO photos
    (title, description, name, position, portrait, square)
    VALUES
    ($1, $2, $3, $4, $5, $6)
  `

const update_photo = (id, fields) =>
  `UPDATE photos SET ${fields} WHERE id=${id}`

const find_photo = (id, fields = '*') =>
  `SELECT ${fields} FROM photos WHERE id=${id}`

const delete_photo = id => `DELETE FROM photos WHERE id=${id}`

const count = table => `SELECT count(*) FROM ${table}`

const insert_subscription = () =>
  `INSERT
    INTO subscriptions
    (subscription)
    VALUES
    ($1)
  `
const get_subscriptions = ({ fields = '*', options = '' } = {}) =>
  `SELECT ${fields} FROM subscriptions ORDER BY id DESC ${options}`

const delete_subscription = id => `DELETE FROM subscriptions WHERE id=${id}`

const find_subscription = (id, fields = '*') =>
  `SELECT ${fields} FROM subscriptions WHERE id=${id}`

export default {
  get_photos,
  insert_photo,
  update_photo,
  find_photo,
  delete_photo,
  count,
  insert_subscription,
  get_subscriptions,
  delete_subscription,
  find_subscription
}
