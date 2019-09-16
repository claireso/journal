import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import session from 'express-session'

import admin from './routes/admin'
import api from './routes/api'
import client from './routes/client'

import config from '../../config'

const PORT = process.env.PORT || 3000

const app = express()

app.disable('x-powered-by')

app.use(helmet())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24h
  })
)

app.locals.config = config.website

app.use('/', client)
app.use('/admin', helmet.noCache(), admin)
app.use('/api', api)
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

// Handle 404
app.use((req, res) => {
  res.status(404)
  res.send('404')
})

// Handle 500
app.use(function(err, req, res) {
  res.status(500)
  res.send('500')
  /* eslint-disable */
  console.log(err)
})

app.listen(PORT, () => {
  /* eslint-disable */
  console.log('App listening on port %d!', PORT)
})
