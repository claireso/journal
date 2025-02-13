'use server'

import { after } from 'next/server'
import { WebPushError } from 'web-push'
import { differenceInMinutes } from 'date-fns'
import pipeAsync from '@utils/pipeAsync'
import { photoService, subscriptionService } from '@ioc/container'
import { IS_NOTIFICATIONS_ENABLED, sendNotification, NOTIFICATION_NEW_PHOTO } from '@infrastructure/web-push'
import { PhotoInsertDtoSchema } from '@dto'
import { withAuth } from '@infrastructure/middlewares'
import logger from '@infrastructure/logger'

async function createPhoto(data: FormData) {
  try {
    const body = Object.fromEntries(data.entries())

    const result = PhotoInsertDtoSchema.parse(body)

    await photoService.create(result)

    // https://nextjs.org/docs/app/api-reference/functions/after
    after(async () => {
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

          for (const subscription of subscriptions) {
            logger.info({ id: subscription.id }, `Send notification`)
            try {
              await sendNotification(subscription.subscription, NOTIFICATION_NEW_PHOTO)
            } catch (err) {
              if (err instanceof WebPushError) {
                // 410 push subscription has unsubscribed or expired
                // 401 VAPID public key mismatch
                if ([401, 410, 404].includes(err.statusCode)) {
                  logger.warn({ err, ctx: { notificationId: subscription.id } }, 'Can not send notification')
                  await subscriptionService.delete(subscription.id)
                }
              }
              logger.error({ err, ctx: { notificationId: subscription.id } }, 'Can not send notification')
            }
          }
        }
      }
    })
  } catch (err) {
    logger.error(err, 'Could not create photo')
    throw err
  }
}

export default pipeAsync<void>(withAuth, createPhoto)
