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
  const state = {}
  const userCid = req.session.passport && req.session.passport.user

  if (userCid) {
    state['user'] = {
      cid: userCid
    }
  }

  const store = configureStore(state)

  const preloadedState = store.getState()

  const View = () => (
    <ServerLocation url={req.originalUrl}>
      <Provider store={store}>
        <Admin />
      </Provider>
    </ServerLocation>
  )

  try {
    const markup = render(Layout, View, undefined, undefined, preloadedState)
    res.send(markup)
  } catch (err) {
    if (isRedirect(err)) {
      res.redirect(err.uri)
    } else {
      next(err)
    }
  }
})

export default router
