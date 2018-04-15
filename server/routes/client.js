import express from 'express'

import pool from '../db/db'
import queries from '../db/queries'
import paginate from './middleware/paginate'
import render from '../utils/render'
import catchErrors from '../utils/catchErrors'

import ReactApp from '../../app/App'
import Layout from '../views/index'

const router = express.Router()

const renderPage = async (req, res, next) => {
  const { config } = req.app.locals

  const response = await pool.query(
    queries.get_photos({
      options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
    })
  )

  const photos = response.rows
  const pager = res.pager

  res.send(render(Layout, ReactApp, { photos, pager }, config))
}

router.get('/', catchErrors(paginate), catchErrors(renderPage))

router.get('/page/:page(\\d+)', catchErrors(paginate), catchErrors(renderPage))

export default router
