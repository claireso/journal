const express = require('express')

const pool = require('../db/db')
const queries = require('../db/queries')
const paginate = require('./middleware/paginate')
const render = require('../utils/render')

const ReactApp = require('../../app/App')
const Layout = require('../views/index')

const router = express.Router()

const renderPage = (req, res, next) => {
  pool
    .query(queries.get_photos({
      options: `OFFSET ${ res.pager.offset } LIMIT ${ res.pager.limit }`
    }))
    .then(response => {
      const photos = response.rows
      const pager = res.pager

      res.send( render(Layout, ReactApp, { photos, pager }) )
    })
    .catch(next)
}

router.get('/', paginate, renderPage)

router.get('/page/:page(\\d+)', paginate, renderPage)

module.exports = router
