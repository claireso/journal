import webpush from 'web-push'

import config from '../../../config'

// CONSTANTS
export const NOTIFICATION_NEW_PHOTO = 'NOTIFICATION_NEW_PHOTO'

const notifConfig = config.website.notification

const enabledPush = notifConfig.publicKey && notifConfig.privateKey

enabledPush &&
  webpush.setVapidDetails(
    config.website.baseUrl,
    notifConfig.publicKey,
    notifConfig.privateKey
  )

export const publicKey = notifConfig.publicKey

export const sendNotification = (subscription, key = '') => {
  const payload = {}

  if (enabledPush === false) return

  if (key === NOTIFICATION_NEW_PHOTO) {
    payload.title = config.website.meta.title
    payload.content = notifConfig.newPhotoDefaultText
  }

  return webpush.sendNotification(subscription, JSON.stringify(payload))
}
