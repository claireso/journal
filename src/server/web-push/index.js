import webpush from 'web-push'

import config from '../../../config'

// CONSTANTS
export const NOTIFICATION_NEW_PHOTO = 'NOTIFICATION_NEW_PHOTO'

webpush.setVapidDetails(
  config.website.baseUrl,
  config.website.notification.publicKey,
  config.website.notification.privateKey
)

export const publicKey = config.website.notification.publicKey

export const sendNotification = (subscription, key = '') => {
  const payload = {}

  if (key === NOTIFICATION_NEW_PHOTO) {
    payload.title = config.website.meta.title
    payload.content =
      config.website.notification.newPhotoDefaultText || 'new photo posted'
  }

  return webpush.sendNotification(subscription, JSON.stringify(payload))
}
