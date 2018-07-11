import express from 'express'
import React from 'react'
import { ServerLocation, isRedirect } from '@reach/router'
import { Provider } from 'react-redux'

import configureStore from '../../common/store/configureStore'

import Layout from '../views/admin'
import render from '../utils/render'

import Admin from '../../app/admin'

const router = express.Router()

router.get('*', (req, res, next) => {
  const store = configureStore()

  const View = () => (
    <ServerLocation url={req.originalUrl}>
      <Provider store={store}>
        <Admin />
      </Provider>
    </ServerLocation>
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

export default router
