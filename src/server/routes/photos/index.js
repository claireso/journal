import fs from 'fs'
import path from 'path'
import express from 'express'
import { differenceInMinutes } from 'date-fns'

import authenticated from '../middleware/authenticated'
import upload from '../middleware/upload'

import { sendNotification, NOTIFICATION_NEW_PHOTO, isPushEnabled } from '@server/web-push'

import catchErrors from '@server/utils/catchErrors'
import pool from '@server/db/db'
import queries from '@server/db/queries'
import paginate from '../middleware/paginate'

import photoModel from './model'

const deleteFile = fileName =>
  new Promise(resolve => {
    const file = path.resolve('public', 'img', fileName)

    fs.unlink(file, resolve)
  })

const router = express.Router()

// GET ALL PHOTOS
router.get(
  '/',
  catchErrors(paginate('photos')),
  catchErrors(async (req, res) => {
    const response = await pool.query(
      queries.get_photos({
        options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
      })
    )

    res.json({
      items: response.rows,
      pager: res.pager
    })
  })
)

// CREATE NEW PHOTO
router.post(
  '/',
  authenticated,
  upload.single('file'),
  catchErrors(async (req, res) => {
    const filename = req.file && req.file.filename

    //@TODO manage errors
    if (!filename) {
      res.status(422).json({
        message: 'Photo is required'
      })
      return
    }

    const photo = photoModel({
      ...req.body,
      name: filename
    })

    const response = await pool.query(queries.insert_photo(), [
      photo.title,
      photo.description,
      photo.name,
      photo.position,
      photo.portrait,
      photo.square
    ])

    res.json(response.rows[0])

    // send web-push notification
    if (isPushEnabled) {
      const responseForPreviousPhoto = await pool.query(queries.get_previous_photo())

      if (responseForPreviousPhoto.rowCount === 1) {
        const previousPhoto = responseForPreviousPhoto.rows[0]

        // do not send web push if the previous photo was posted less than 30 minutes ago
        if (differenceInMinutes(new Date(), new Date(previousPhoto.created_at)) < 30) {
          return
        }
      }

      const responseSub = await pool.query(queries.get_subscriptions())

      const subscriptions = responseSub.rows

      subscriptions.map(({ subscription, id }) =>
        sendNotification(subscription, NOTIFICATION_NEW_PHOTO).catch(err => {
          if (err && [410, 404].includes(err.statusCode)) {
            pool.query(queries.delete_subscription(id))
          }
        })
      )
    }
  })
)

// GET ONE PHOTO
router.get(
  '/:id(\\d+)',
  catchErrors(async (req, res) => {
    const { id } = req.params

    const response = await pool.query(queries.get_photo(id))
    const photo = response.rows[0]

    if (photo === undefined) {
      res.status(404).json()
      return
    }

    res.json(photo)
  })
)

// UPDATE PHOTO
router.patch(
  '/:id(\\d+)',
  authenticated,
  upload.single('file'),
  catchErrors(async (req, res) => {
    const { id } = req.params

    let response = await pool.query(queries.get_photo(id))
    const photo = response.rows[0]

    if (photo === undefined) {
      res.status(404).json()
      return
    }

    const newPhoto = photoModel(req.body)
    const filename = req.file && req.file.filename

    // TODO delete current file
    if (filename) newPhoto.name = filename

    newPhoto.updated_at = new Date()

    const fields = Object.entries(newPhoto)
      .map((entry, index) => `${entry[0]}=($${index + 1})`)
      .join(',')

    response = await pool.query(
      queries.update_photo(id, fields),
      Object.values(newPhoto)
    )

    res.json(response.rows[0])
  })
)

// DELETE PHOTO
router.delete(
  '/:id(\\d+)',
  authenticated,
  catchErrors(async (req, res) => {
    const { id } = req.params

    const response = await pool.query(queries.get_photo(id))
    const photo = response.rows[0]

    if (photo === undefined) {
      res.status(404).json()
      return
    }

    // delete photo from the folder
    await deleteFile(response.rows[0].name)

    //delete photo from database
    await pool.query(queries.delete_photo(id))

    res.json()
  })
)

export default router
