const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const pool = require('../db/db')
const queries = require('../db/queries')
const paginate = require('./middleware/paginate')

const ReactApp = require('../app/App')

const router = express.Router()

const renderPage = (req, res, next) => {
  pool
    .query(queries.get_photos({
      options: `OFFSET ${ res.pager.offset } LIMIT ${ res.pager.limit }`
    }))
    .then(response => {
      const photos = response.rows
      const pager = res.pager

      res.render('index', {
        content: ReactDOMServer.renderToStaticMarkup(React.createElement(ReactApp, {photos, pager})),
      })
    })
    .catch(next)
}


router.get('/', paginate, renderPage)

router.get('/page/:page(\\d+)', paginate, renderPage)

module.exports = router
