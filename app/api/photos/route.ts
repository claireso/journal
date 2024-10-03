import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { differenceInMinutes } from 'date-fns'
import { BadRequestError } from '@domain/errors'
import { createRouteHandler, withAuth } from '@api/middlewares'
import { IS_NOTIFICATIONS_ENABLED, sendNotification, NOTIFICATION_NEW_PHOTO } from '@infrastructure/web-push'
import { mapPhotoToPhotoDto, mapPhotosToPhotosDto, PhotoInsertDtoSchema } from '@dto'
import { photoService, subscriptionService } from '@ioc/container'
import logger from '@infrastructure/logger'

// endpoint list photos
const getPaginatedPhotos = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  let page = searchParams.get('page') as string | number

  page = Number(page)

  if (isNaN(page) || page < 0) {
    throw new BadRequestError('Incorrect search parameter “page”', { cause: { page } })
  }

  const paginatedPhotos = await photoService.getPaginatedPhotos(page ?? 1)
  const paginatedPhotosDto = mapPhotosToPhotosDto(paginatedPhotos)

  return Response.json(paginatedPhotosDto, { status: 200 })
}

// endpoint POST photo
const createPhoto = async (request: NextRequest) => {
  const body = await request.json()

  const result = PhotoInsertDtoSchema.parse(body)

  const photo = await photoService.create(result)

  const photoDto = mapPhotoToPhotoDto(photo)

  // send web-push notification
  if (IS_NOTIFICATIONS_ENABLED) {
    const previousPhoto = await photoService.getPreviousPhoto()
    let skipNotification = false

    if (previousPhoto) {
      // do not send web push if the previous photo was posted less than 30 minutes ago
      if (differenceInMinutes(new Date(), new Date(previousPhoto.created_at)) < 30) {
        skipNotification = true
      }
    }

    if (!skipNotification) {
      const subscriptions = await subscriptionService.getAll()
      subscriptions.map(({ subscription, id }) => {
        logger.debug(`Send notification (id: ${id})`)
        return sendNotification(subscription, NOTIFICATION_NEW_PHOTO).catch((err: any) => {
          if (err && [410, 404].includes(err.statusCode)) {
            logger.warn({ err, ctx: { notificationId: id } }, 'Can not send notification')
            subscriptionService.delete(id)
          }
          logger.error({ err, ctx: { notificationId: id } }, 'Can not send notification')
        })
      })
    }
  }

  revalidateTag('photos')
  return Response.json(photoDto, { status: 201 })
}

export const GET = createRouteHandler(getPaginatedPhotos)
export const POST = createRouteHandler(withAuth, createPhoto)
