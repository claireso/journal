import path from 'path'
import express from 'express'
import React from 'react'
import { ServerLocation, isRedirect } from '@reach/router'
import { Provider } from 'react-redux'
import { ChunkExtractor } from '@loadable/server'

import configureStore from '@admin/store/configureStore'

import Layout from '@server/views/admin'
import render from '@server/utils/render'

import Admin from '@admin'

const statsFile = path.resolve('./dist/loadable-stats/loadable-stats.json')

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

  const Component = () => (
    <ServerLocation url={req.originalUrl}>
      <Provider store={store}>
        <Admin />
      </Provider>
    </ServerLocation>
  )

  try {
    const extractor = new ChunkExtractor({ statsFile, entrypoints: ['admin'] })
    const markup = render({ Layout, Component, preloadedState, extractor })
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
