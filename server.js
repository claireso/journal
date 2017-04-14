require('babel-register')

const express = require('express')
const bodyParser = require('body-parser')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const pool = require('./db/db')
const queries = require('./db/queries')
const admin = require('./routes/admin')
const ReactApp = require('./app/App')
const Photos = require('./resources/photos')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', './views')

const renderPage = (req, res, next) => {

  pool
    .query(queries.get_photos())
    .then(response => {
      const photos = response.rows
      const pager = {} // TODO

      res.render('index', {
        content: ReactDOMServer.renderToStaticMarkup(React.createElement(ReactApp, {photos, pager})),
      })
    })
    .catch(next)
}

app.get('/', renderPage)

app.get('/page/:page', renderPage)

app.use('/admin', admin)

app.get('*', function(req, res){
  res.redirect('/')
})

app.listen(3000, () => {})
