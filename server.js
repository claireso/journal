require('babel-register')

const express = require('express')
const bodyParser = require('body-parser')

const admin = require('./routes/admin')
const client = require('./routes/client')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/', client)
app.use('/admin', admin)

// app.use((req, res, next) => {
//   res.redirect('/')
// })

app.listen(3000, () => {})
