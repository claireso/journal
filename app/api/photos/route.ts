import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { differenceInMinutes } from 'date-fns'
import { createRouteHandler, withPagination, withAuth } from '@api/middlewares'
import { pool, queries } from '@infrastructure/db'
import logger from '@infrastructure/logger'
import { IS_NOTIFICATIONS_ENABLED, sendNotification, NOTIFICATION_NEW_PHOTO } from '@web/services/web-push'
import {
  PhotoRequestSchema,
  Photo,
  Media,
  Subscription,
  Pager,
  createPhoto as createPhotoHelper,
  formatPhoto as formatPhotoHelper
} from '@domain/entities'

// endpoint list photos
const getAllPhotos = async (request: NextRequest & { pager: Pager }) => {
  const response = await pool.query(
    queries.get_photos({
      options: `OFFSET ${request.pager.offset} LIMIT ${request.pager.limit}`
    })
  )

  const photos: Array<Photo> = response.rows.map(formatPhotoHelper)

  return Response.json(
    {
      items: photos,
      pager: request.pager
    },
    { status: 200 }
  )
}

// endpoint POST photo
const createPhoto = async (request: NextRequest) => {
  const body = await request.json()

  const result = PhotoRequestSchema.parse(body)

  // idea: check if it is a good idea to add the check in zod media schema
  const mediaResponse = await pool.query(queries.get_media(result.media_id))

  if (mediaResponse.rowCount === 0) {
    const message = 'Media is required and must exist'
    logger.error(message)
    return Response.json({ message }, { status: 422 })
  }

  const media: Media = mediaResponse.rows[0]

  const photoByMediaResponse = await pool.query(queries.get_photo_by_media(media.id))

  if (photoByMediaResponse.rowCount === 1) {
    const message = `Media ${media.id} is already linked to a photo`
    logger.error(message)
    return Response.json({ message }, { status: 422 })
  }

  const data = createPhotoHelper(result)

  const responsePhoto = await pool.query(queries.insert_photo(), [
    media.name, // set a value for "name" to keep legacy working (a database migration is required in the future)
    data.title,
    data.description,
    data.position,
    data.color,
    data.media_id
  ])

  const photo = formatPhotoHelper(responsePhoto.rows[0])

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
  return Response.json(photo, { status: 201 })
}

export const GET = createRouteHandler(withPagination('photos'), getAllPhotos)
export const POST = createRouteHandler(withAuth, createPhoto)
