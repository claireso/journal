import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import auth from 'http-auth'
import helmet from 'helmet'

import admin from './routes/admin'
import api from './routes/api'
import client from './routes/client'

import config from '../../config'

const PORT = process.env.PORT || 3000

const app = express()

app.disable('x-powered-by')

const basic = auth.basic({
  realm: 'Admin area',
  file: path.resolve('htpasswd')
})

app.use(helmet())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.locals.config = { ...config.website, version: +new Date() }

app.use('/', client)
// app.use('/admin', helmet.noCache(), auth.connect(basic), admin)
app.use('/admin', helmet.noCache(), admin)
app.use('/api', api)

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
