import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { differenceInMinutes } from 'date-fns'
import { createRouteHandler, withPagination, withAuth } from '@services/middlewares'
import { pool, queries } from '@services/db'
import { IS_NOTIFICATIONS_ENABLED, sendNotification, NOTIFICATION_NEW_PHOTO } from '@services/web-push'
import {
  PhotoRequestSchema,
  Photo,
  Subscription,
  Pager,
  createPhoto as createPhotoHelper,
  formatPhoto as formatPhotoHelper
} from '@models'
import uploadFile from '@utils/uploadFile'

// endpoint list photos
const getAllPhotos = async (request: NextRequest & { pager: Pager }) => {
  const response = await pool.query(
    queries.get_photos({
      options: `OFFSET ${request.pager.offset} LIMIT ${request.pager.limit}`
    })
  )

  return Response.json(
    {
      items: response.rows.map(formatPhotoHelper),
      pager: request.pager
    },
    { status: 200 }
  )
}

// endpoint POST photo
const createPhoto = async (request: NextRequest) => {
  const formData = await request.formData()

  const body = Object.fromEntries(formData)

  const result = PhotoRequestSchema.parse(body)

  const { file, ...partialPhoto } = result

  const uploadedFile = await uploadFile(file)

  const photo = createPhotoHelper(partialPhoto, uploadedFile)

  const response = await pool.query(queries.insert_photo(), [
    photo.title,
    photo.description,
    photo.name,
    photo.position,
    photo.portrait,
    photo.square
  ])

  // send web-push notification
  if (IS_NOTIFICATIONS_ENABLED) {
    const responseForPreviousPhoto = await pool.query(queries.get_previous_photo())
    let skipNotification = false

    if (responseForPreviousPhoto.rowCount === 1) {
      const previousPhoto: Photo = responseForPreviousPhoto.rows[0]
      // do not send web push if the previous photo was posted less than 30 minutes ago
      if (differenceInMinutes(new Date(), new Date(previousPhoto.created_at)) < 30) {
        skipNotification = true
      }
    }

    if (!skipNotification) {
      const responseSub = await pool.query(queries.get_subscriptions())
      const subscriptions: Subscription[] = responseSub.rows
      subscriptions.map(({ subscription, id }) =>
        sendNotification(subscription, NOTIFICATION_NEW_PHOTO).catch((err: any) => {
          if (err && [410, 404].includes(err.statusCode)) {
            pool.query(queries.delete_subscription(id))
          }
        })
      )
    }
  }

  revalidateTag('photos')
  return Response.json(formatPhotoHelper(response.rows[0]), { status: 201 })
}

export const GET = createRouteHandler(withPagination('photos'), getAllPhotos)
export const POST = createRouteHandler(withAuth, createPhoto)
