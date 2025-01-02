'use server'

import { differenceInMinutes } from 'date-fns'
import pipeAsync from '@utils/pipeAsync'
import { photoService, subscriptionService } from '@ioc/container'
import { IS_NOTIFICATIONS_ENABLED, sendNotification, NOTIFICATION_NEW_PHOTO } from '@infrastructure/web-push'
import { mapPhotoToPhotoDto, PhotoDto, PhotoInsertDtoSchema } from '@dto'
import { withAuth } from '@infrastructure/middlewares'
import logger from '@infrastructure/logger'

async function createPhoto(prevState: FormActionState<PhotoDto>, data: FormData) {
  try {
    const body = Object.fromEntries(data.entries())

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
          logger.info({ id }, `Send notification`)
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
    return {
      status: 'success',
      item: photoDto
    }
  } catch (err) {
    logger.error(err)
    return {
      status: 'error'
    }
  }
}

export default pipeAsync<FormActionState<PhotoDto>>(withAuth, createPhoto)
