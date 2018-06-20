import express from 'express'
import React from 'react'
import { ServerLocation, isRedirect } from '@reach/router'

// import photos from './photos'
// import subscriptions from './subscriptions'
import Layout from '../views/admin'
import render from '../utils/render'

import Admin from '../../app/admin'

const router = express.Router()

router.get('*', (req, res, next) => {
  const View = () => (
    <div>
      <ServerLocation url={'/admin' + req.url}>
        <Admin />
      </ServerLocation>
    </div>
  )

  try {
    const markup = render(Layout, View)
    res.send(markup)
  } catch(err) {
    if (isRedirect(err)) {
      res.redirect('admin' + err.uri)
    } else {
      next(err)
    }
  }
})

// router.use('/photos', photos)
// router.use('/subscriptions', subscriptions)

export default router
