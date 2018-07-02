import express from 'express'

import catchErrors from '../../utils/catchErrors'
import pool from '../../db/db'
import queries from '../../db/queries'
import paginate from '../middleware/paginate'

const router = express.Router()

router.get('/', catchErrors(paginate('photos')), catchErrors(async (req, res, next) => {
  const response = await pool.query(
    queries.get_photos({
      options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
    })
  )

  res.json({
    items: response.rows,
    pager: res.pager
  })
}))

router.post('/', (req, res, next) => {
  res.json('new photo')
})

export default router