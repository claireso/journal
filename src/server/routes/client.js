import express from 'express'
import url from 'url'
import request from 'axios'

import pool from '@server/db/db'
import queries from '@server/db/queries'
import render from '@server/utils/render'
import catchErrors from '@server/utils/catchErrors'

import { publicKey } from '@server/web-push'

import Component from '@client'
import Layout from '@server/views/index'

const router = express.Router()

router.get('/', async (req, res) => {
  const { config } = req.app.locals

  const api = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: 'api/photos'
  })

  try {
    const response = await request.get(api, {
      params: {
        page: req.query.page
      }
    })

    const preloadedState = response.data

    res.send(
      render({
        Layout,
        Component,
        config,
        preloadedState,
        props: preloadedState
      })
    )
  } catch (err) {
    const status = err.response && err.response.status

    if (status === 404 && req.url !== '/') {
      res.redirect('/')
    }

    res.status(500).send()
  }
})

router.get('/push-public-key', (req, res) => res.send(publicKey))

router.post(
  '/subscriptions',
  catchErrors(async (req, res) => {
    const subscription = req.body.subscription

    if (!subscription || !subscription.endpoint) {
      res.setHeader('Content-Type', 'application/json')
      res.status(400).send(
        JSON.stringify({
          error: {
            id: 'no-endpoint',
            message: 'Subscription must have an endpoint.'
          }
        })
      )

      return
    }

    await pool.query(queries.insert_subscription(), [req.body.subscription])

    res.status(201).send(subscription)
  })
)

export default router
