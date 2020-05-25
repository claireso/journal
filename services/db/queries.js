export const get_photos = ({ fields = '*', options = '' } = {}) =>
  `SELECT ${fields} FROM photos ORDER BY id DESC ${options}`

export const insert_photo = () =>
  `INSERT
    INTO photos
    (title, description, name, position, portrait, square)
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `

export const update_photo = (id, fields) =>
  `UPDATE photos SET ${fields} WHERE id=${id} RETURNING *`

export const get_photo = (id, fields = '*') =>
  `SELECT ${fields} FROM photos WHERE id=${id}`

export const get_previous_photo = ({ fields = '*' } = {}) =>
  `SELECT ${fields} FROM photos ORDER BY created_at DESC LIMIT 1 OFFSET 1`

export const delete_photo = (id) => `DELETE FROM photos WHERE id=${id}`

export const count = (table) => `SELECT count(*) FROM ${table}`

export const insert_subscription = () =>
  `INSERT
    INTO subscriptions
    (subscription)
    VALUES
    ($1)
    RETURNING *
  `
export const get_subscriptions = ({ fields = '*', options = '' } = {}) =>
  `SELECT ${fields} FROM subscriptions ORDER BY id DESC ${options}`

export const delete_subscription = (id) =>
  `DELETE FROM subscriptions WHERE id=${id}`

export const find_subscription = (id, fields = '*') =>
  `SELECT ${fields} FROM subscriptions WHERE id=${id}`

export const find_user_by_username = (username, password, fields = '*') =>
  `SELECT ${fields} FROM users WHERE username='${username}' AND password=crypt('${password}', password)`

export const find_user_by_cid = (cid, fields = '*') =>
  `SELECT ${fields} FROM users WHERE cid='${cid}'`
