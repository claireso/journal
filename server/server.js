import express from 'express'
import bodyParser from 'body-parser'
import auth from 'http-auth'
import helmet from 'helmet'

import admin from './routes/admin'
import client from './routes/client'

const PORT = process.env.PORT || 3000

const app = express()

const basic = auth.basic({
  realm: 'Admin area',
  file: __dirname + '/htpasswd'
})

app.use(helmet())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.disable('x-powered-by');

console.log(helmet.noCache)

app.use('/', client)
app.use('/admin', helmet.noCache(), auth.connect(basic), admin)

// Handle 404
app.use((req, res, next) => {
  res.status(404)
  res.send('404')
})

// Handle 500
app.use(function(err, req, res, next) {
  res.status(500)
  res.send('500')
  console.log(err)
})

app.listen(PORT, () => {
  console.log('App listening on port %d!', PORT)
})
