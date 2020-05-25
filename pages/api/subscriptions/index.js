import crud from '@services/middlewares/crud'
import withAuth from '@services/middlewares/withAuth'
import withPagination from '@services/middlewares/withPagination'

import { pool, queries } from '@services/db'

const getSubscriptions = async (req, res) => {
  try {
    const response = await pool.query(
      queries.get_subscriptions({
        options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
      })
    )
    res.status(200).json({
      items: response.rows,
      pager: res.pager
    })
  } catch {
    res.status(500).json({})
  }
}

//@TODO: improve security of this endpoint
const createSubscription = async (req, res) => {
  try {
    const { subscription } = req.body

    if (!subscription || !subscription.endpoint) {
      res.status(400).json({
        error: {
          id: 'unprocessable_entity',
          message: 'Subscription is missing or misformed'
        }
      })

      return
    }

    const response = await pool.query(queries.insert_subscription(), [
      req.body.subscription
    ])

    // eslint-disable-next-line no-unused-vars
    const { id, ...newSubscription } = response.rows[0]

    res.status(201).send(newSubscription)
  } catch {
    res.status(500).json({})
  }
}

export default crud({
  GET: [withAuth, withPagination('subscriptions'), getSubscriptions],
  POST: [createSubscription]
})
