const get_photos = ({ fields = '*', options = '' } = {}) =>
  `SELECT ${fields} FROM photos ORDER BY id DESC ${options}`

const insert_photo = () =>
  `INSERT
    INTO photos
    (title, description, name, position, portrait, square)
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `

const update_photo = (id, fields) =>
  `UPDATE photos SET ${fields} WHERE id=${id} RETURNING *`

const get_photo = (id, fields = '*') =>
  `SELECT ${fields} FROM photos WHERE id=${id}`

const get_previous_photo = ({ fields = '*' } = {}) =>
  `SELECT ${fields} FROM photos ORDER BY created_at DESC LIMIT 1 OFFSET 1`

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

const find_user_by_username = (username, password, fields = '*') =>
  `SELECT ${fields} FROM users WHERE username='${username}' AND password=crypt('${password}', password)`

const find_user_by_cid = (cid, fields = '*') =>
  `SELECT ${fields} FROM users WHERE cid='${cid}'`

export default {
  get_photos,
  insert_photo,
  update_photo,
  get_photo,
  get_previous_photo,
  delete_photo,
  count,
  insert_subscription,
  get_subscriptions,
  delete_subscription,
  find_subscription,
  find_user_by_username,
  find_user_by_cid
}
