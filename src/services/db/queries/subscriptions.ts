export const get_subscriptions = ({ options = '' } = {}) =>
  `SELECT
    id,
    subscription,
    created_at
  FROM
    subscriptions
  ORDER BY id
  DESC ${options}`

export const insert_subscription = () =>
  `INSERT
    INTO subscriptions
    (subscription)
    VALUES
    ($1)
    RETURNING *
  `

export const find_subscription = (id: number) =>
  `SELECT
    id,
    subscription,
    created_at
  FROM subscriptions
  WHERE
    id=${id}
  `
export const delete_subscription = (id: number) => `DELETE FROM subscriptions WHERE id=${id}`
