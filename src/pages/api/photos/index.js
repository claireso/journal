import differenceInMinutes from 'date-fns/differenceInMinutes'

import crud from '@services/middlewares/crud'
import withPagination from '@services/middlewares/withPagination'
import withAuth from '@services/middlewares/withAuth'
import withMulter from '@services/middlewares/withMulter'
import { sendNotification, NOTIFICATION_NEW_PHOTO, IS_NOTIFICATIONS_ENABLED } from '@services/web-push'

import { pool, queries, models } from '@services/db'

const photoModel = models.photo

// GET ALL PHOTOS
const getPhotos = async (req, res) => {
  const response = await pool.query(
    queries.get_photos({
      options: `OFFSET ${res.pager.offset} LIMIT ${res.pager.limit}`
    })
  )

  res.status(200).json({
    items: response.rows,
    pager: res.pager
  })
}

// CREATE PHOTO
const createPhoto = async (req, res) => {
  try {
    const file = req.file
    const photo = photoModel({
      ...req.body,
      name: file.filename,
      width: file.width,
      height: file.height
    })

    const response = await pool.query(queries.insert_photo(), [
      photo.title,
      photo.description,
      photo.name,
      photo.position,
      photo.portrait,
      photo.square
    ])

    res.status(201).send(response.rows[0])

    // send web-push notification
    if (IS_NOTIFICATIONS_ENABLED) {
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
        sendNotification(subscription, NOTIFICATION_NEW_PHOTO).catch((err) => {
          if (err && [410, 404].includes(err.statusCode)) {
            pool.query(queries.delete_subscription(id))
          }
        })
      )
    }
  } catch (err) {
    res.status(500).send('')
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default crud({
  GET: [withPagination('photos'), getPhotos],
  POST: [withAuth, withMulter, createPhoto]
})
