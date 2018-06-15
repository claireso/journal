import fs from 'fs'
import path from 'path'
import express from 'express'
import multer from 'multer'
import { ulid } from 'ulid'
import escape from 'lodash/escape'

import pool from '../../db/db'
import queries from '../../db/queries'
import paginate from '../middleware/paginate'
import render from '../../utils/render'
import catchErrors from '../../utils/catchErrors'

import { sendNotification, NOTIFICATION_NEW_PHOTO } from '../../web-push'

import ListView from '../../../app/admin/photos/List'
import NewView from '../../../app/admin/photos/New'
import EditView from '../../../app/admin/photos/Edit'

import Layout from '../../views/admin'

// multer storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.resolve('public', 'img'))
  },
  filename: function(req, file, callback) {
    const fieldname = ulid().toLowerCase()
    const extension = path.extname(file.originalname)

    callback(null, `${fieldname}${extension}`)
  }
})

const upload = multer({ storage: storage })

const router = express.Router()

const deleteFile = fileName =>
  new Promise(resolve => {
    const file = path.resolve('public', 'img', fileName)

    fs.unlink(file, resolve)
  })

// ALL PHOTOS
const renderList = async (req, res) => {
  const response = await pool.query(
    queries.get_photos({
      options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
    })
  )

  res.send(
    render(Layout, ListView, {
      photos: response.rows,
      pager: res.pager
    })
  )
}

router.get('/', catchErrors(paginate('photos')), catchErrors(renderList))
router.get(
  '/page/:page',
  catchErrors(paginate('photos')),
  catchErrors(renderList)
)

// NEW PHOTO
router.get('/new', (req, res) => {
  res.send(render(Layout, NewView))
})

router.post(
  '/new',
  upload.single('file'),
  catchErrors(async (req, res) => {
    const photo = req.body
    const filename = req.file && req.file.filename

    await pool.query(queries.insert_photo(), [
      escape(photo.title),
      escape(photo.description),
      filename,
      photo.position,
      photo.portrait || false,
      photo.square || false
    ])

    // send web-push notification
    const response = await pool.query(queries.get_subscriptions())

    const subscriptions = response.rows

    subscriptions.map(({ subscription, id }) =>
      sendNotification(subscription, NOTIFICATION_NEW_PHOTO).catch(err => {
        if (err && [410, 404].includes(err.statusCode)) {
          pool.query(queries.delete_subscription(id))
        }
      })
    )

    res.redirect('/admin/photos')
  })
)

// EDIT PHOTO
router.get(
  '/:id(\\d+)/edit',
  catchErrors(async (req, res, next) => {
    const { id } = req.params

    const response = await pool.query(queries.find_photo(id))
    const photo = response.rows[0]

    if (photo === undefined) {
      next()
      return
    }

    res.send(render(Layout, EditView, { photo }))
  })
)

router.post(
  '/:id(\\d+)/edit',
  upload.single('file'),
  catchErrors(async (req, res) => {
    const { id } = req.params
    const photo = req.body
    const filename = req.file && req.file.filename

    const newPhoto = { ...photo }

    // TODO delete current file
    if (filename) newPhoto.name = filename

    newPhoto.square = photo.square || false
    newPhoto.portrait = photo.portrait || false
    newPhoto.description = escape(newPhoto.description)
    newPhoto.title = escape(newPhoto.title)
    newPhoto.updated_at = new Date()

    const fields = Object.entries(newPhoto)
      .map((entry, index) => `${entry[0]}=($${index + 1})`)
      .join(',')

    await pool.query(queries.update_photo(id, fields), Object.values(newPhoto))
    res.redirect('/admin/photos')
  })
)

// DELETE PHOTO
router.get(
  '/:id(\\d+)/delete',
  catchErrors(async (req, res, next) => {
    const { id } = req.params

    const response = await pool.query(queries.find_photo(id))
    const photo = response.rows[0]

    if (photo === undefined) {
      next()
      return
    }

    // delete photo from the folder
    await deleteFile(response.rows[0].name)

    //delete photo from database
    await pool.query(queries.delete_photo(id))

    res.redirect('back')
  })
)

export default router
