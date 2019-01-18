import webpush from 'web-push'

import config from '../../../config'

// CONSTANTS
export const NOTIFICATION_NEW_PHOTO = 'NOTIFICATION_NEW_PHOTO'

const notifConfig = config.website.notification

export const isPushEnabled = !!(notifConfig.publicKey && notifConfig.privateKey)

isPushEnabled &&
  webpush.setVapidDetails(
    config.website.baseUrl,
    notifConfig.publicKey,
    notifConfig.privateKey
  )

export const publicKey = notifConfig.publicKey

export const sendNotification = (subscription, key = '') => {
  const payload = {}

  if (isPushEnabled === false) return

  if (key === NOTIFICATION_NEW_PHOTO) {
    payload.title = config.website.meta.title
    payload.content = notifConfig.newPhotoDefaultText
  }

  return webpush.sendNotification(subscription, JSON.stringify(payload))
}
