import express from 'express'

import pool from '@server/db/db'
import queries from '@server/db/queries'
import render from '@server/utils/render'
import catchErrors from '@server/utils/catchErrors'

import { publicKey } from '@server/web-push'

import Page from '@client'
import Layout from '@server/views/index'

const router = express.Router()

router.get('/', (req, res) => {
  const { config } = req.app.locals

  res.send(render(Layout, Page, null, config))
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
