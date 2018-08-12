import express from 'express'

import authenticated from '../middleware/authenticated'

import pool from '../../db/db'
import queries from '../../db/queries'

import catchErrors from '../../utils/catchErrors'
import paginate from '../middleware/paginate'

const router = express.Router()

// ALL SUBSCRIPTIONS
router.get(
  '/',
  authenticated,
  catchErrors(paginate('subscriptions')),
  catchErrors(async (req, res) => {
    const response = await pool.query(
      queries.get_subscriptions({
        options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
      })
    )

    res.json({
      items: response.rows,
      pager: res.pager
    })
  })
)

// DELETE SUBSCRIPTION
router.delete(
  '/:id(\\d+)',
  authenticated,
  catchErrors(async (req, res, next) => {
    const { id } = req.params

    const response = await pool.query(queries.find_subscription(id))
    const subscription = response.rows[0]

    if (subscription === undefined) {
      next()
      return
    }

    //delete subscription from database
    await pool.query(queries.delete_subscription(id))

    res.json()
  })
)

export default router
