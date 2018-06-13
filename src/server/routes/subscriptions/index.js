import express from 'express'

import pool from '../../db/db'
import queries from '../../db/queries'

import render from '../../utils/render'
import catchErrors from '../../utils/catchErrors'
import paginate from '../middleware/paginate'

import Layout from '../../views/admin'

import ListView from '../../../app/admin/subscriptions/List'

const router = express.Router()

// ALL SUBSCRIPTIONS
const renderList = async (req, res) => {
  const response = await pool.query(
    queries.get_subscriptions({
      options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
    })
  )

  res.send(
    render(Layout, ListView, {
      subscriptions: response.rows,
      pager: res.pager
    })
  )
}

router.get('/', catchErrors(paginate('subscriptions')), catchErrors(renderList))
router.get(
  '/page/:page',
  catchErrors(paginate('subscriptions')),
  catchErrors(renderList)
)

export default router
