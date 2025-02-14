export const getSubscriptions = ({ options = '' } = {}) =>
  `SELECT
    id,
    subscription,
    created_at,
    updated_at
  FROM
    subscriptions
  ORDER BY
    id DESC
  ${options}`

export const insertSubscription = () =>
  `INSERT
    INTO subscriptions
    (subscription)
    VALUES
    ($1)
    RETURNING *
  `

export const getSubscriptionById = (id: number) =>
  `SELECT
    id,
    subscription,
    created_at,
    updated_at
  FROM subscriptions
  WHERE
    id=${id}
  `

export const getSubscriptionByEndpoint = (endpoint: string) =>
  `SELECT
    id,
    subscription,
    created_at,
    updated_at
  FROM subscriptions
  WHERE
    subscription->>'endpoint' = '${endpoint}'
  `
export const deleteSubscription = (id: number) => `DELETE FROM subscriptions WHERE id=${id}`

export const count = () => `SELECT COUNT(*) FROM subscriptions`
