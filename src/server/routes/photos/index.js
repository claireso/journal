import path from 'path'
import express from 'express'
import multer from 'multer'
import { ulid } from 'ulid'
import escape from 'lodash/escape'

import catchErrors from '../../utils/catchErrors'
import pool from '../../db/db'
import queries from '../../db/queries'
import paginate from '../middleware/paginate'

import { ALLOWED_MIMETYPES } from '../../../common/constants'

// multer storage configuration
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve('public', 'img'))
  },
  filename(req, file, callback) {
    const fieldname = ulid().toLowerCase()
    const extension = path.extname(file.originalname)

    callback(null, `${fieldname}${extension}`)
  }
})

const upload = multer({
  storage: storage,
  fileFilter(req, file, callback) {
    if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
      callback(null, true)
      return
    }

    // reject file
    callback(null, false)
  }
})

const router = express.Router()

router.get('/', catchErrors(paginate('photos')), catchErrors(async (req, res, next) => {
  const response = await pool.query(
    queries.get_photos({
      options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
    })
  )

  res.json({
    items: response.rows,
    pager: res.pager
  })
}))

router.post('/', upload.single('file'), catchErrors(async (req, res, next) => {
  const photo = req.body
  const filename = req.file && req.file.filename

  //@TODO manage errors
  if (!filename) {
    res.status(422).json({
      message: 'Photo is required'
    })
    return
  }

  const response = await pool.query(queries.insert_photo(), [
    escape(photo.title),
    escape(photo.description),
    filename,
    photo.position,
    photo.portrait || false,
    photo.square || false
  ])

  // send web-push notification
  const responseSub = await pool.query(queries.get_subscriptions())

  const subscriptions = responseSub.rows

  subscriptions.map(({ subscription, id }) =>
    sendNotification(subscription, NOTIFICATION_NEW_PHOTO).catch(err => {
      if (err && [410, 404].includes(err.statusCode)) {
        pool.query(queries.delete_subscription(id))
      }
    })
  )

  res.json(response.rows[0])
}))

router.patch(
  '/:id(\\d+)',
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

    const response = await pool.query(queries.update_photo(id, fields), Object.values(newPhoto))

    res.json(response.rows[0])
  })
)

export default router