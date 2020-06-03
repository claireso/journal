const path = require('path')
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: '.' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.disable('x-powered-by')

  server.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'), {
      maxAge: dev ? '0' : '365d'
    })
  )

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
