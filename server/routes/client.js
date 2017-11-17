import express from 'express'

import pool from '../db/db'
import queries from '../db/queries'
import paginate from './middleware/paginate'
import render from '../utils/render'

import ReactApp from '../../app/App'
import Layout from '../views/index'

const router = express.Router()

const renderPage = (req, res, next) => {
  const { config } = req.app.locals

  pool
    .query(
      queries.get_photos({
        options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
      })
    )
    .then(response => {
      const photos = response.rows
      const pager = res.pager

      res.send(render(Layout, ReactApp, { photos, pager }, config))
    })
    .catch(next)
}

router.get('/', paginate, renderPage)

router.get('/page/:page(\\d+)', paginate, renderPage)

export default router
