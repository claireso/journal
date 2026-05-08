export const getSubscriptions = () =>
  `SELECT
    id,
    subscription,
    created_at,
    updated_at
  FROM
    subscriptions
  ORDER BY
    id DESC
  `

export const getSubscriptionsPage = (offset: number, limit: number) => ({
  text: `SELECT
    id,
    subscription,
    created_at,
    updated_at
  FROM
    subscriptions
  ORDER BY
    id DESC
  OFFSET $1
  LIMIT $2
  `,
  values: [offset, limit]
})

export const insertSubscription = () =>
  `INSERT
    INTO subscriptions
    (subscription)
    VALUES
    ($1)
    RETURNING *
  `

export const getSubscriptionById = (id: number) => ({
  text: `SELECT
    id,
    subscription,
    created_at,
    updated_at
  FROM subscriptions
  WHERE
    id=$1
  `,
  values: [id]
})

export const getSubscriptionByEndpoint = (endpoint: string) => ({
  text: `SELECT
    id,
    subscription,
    created_at,
    updated_at
  FROM subscriptions
  WHERE
    subscription->>'endpoint' = $1
  `,
  values: [endpoint]
})
export const deleteSubscription = (id: number) => ({
  text: `DELETE FROM subscriptions WHERE id=$1`,
  values: [id]
})

export const count = () => `SELECT COUNT(*) FROM subscriptions`
