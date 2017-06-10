import express from 'express'
import bodyParser from 'body-parser'
import auth from 'http-auth'

import admin from './routes/admin'
import client from './routes/client'

const PORT = process.env.PORT || 3000

const app = express()

const basic = auth.basic({
  realm: 'Admin area',
  file: __dirname + '/htpasswd'
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', client)
app.use('/admin', auth.connect(basic), admin)

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
