require('babel-register')

const express = require('express')
const bodyParser = require('body-parser')
const auth = require('http-auth')

const admin = require('./routes/admin')
const client = require('./routes/client')

const app = express()

const basic = auth.basic({
	realm: 'Admin area',
	file: __dirname + '/htpasswd'
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/', client)
app.use('/admin', auth.connect(basic), admin)

// app.use((req, res, next) => {
//   res.redirect('/')
// })

app.listen(3000, () => {})
