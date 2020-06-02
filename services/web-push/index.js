import webpush from 'web-push'

// CONSTANTS
export const NOTIFICATION_NEW_PHOTO = 'NOTIFICATION_NEW_PHOTO'
export const IS_NOTIFICATIONS_ENABLED = process.env.isNotificationsEnabled

const NOTIFICATIONS_PRIVATE_KEY = process.env.notificationsPrivateKey
const NOTIFICATIONS_PUBLIC_KEY = process.env.notificationsPublicKey

const website = process.env.website

IS_NOTIFICATIONS_ENABLED &&
  webpush.setVapidDetails(
    website.baseUrl,
    NOTIFICATIONS_PUBLIC_KEY,
    NOTIFICATIONS_PRIVATE_KEY
  )

export const sendNotification = (subscription, key = '') => {
  const payload = {}

  if (IS_NOTIFICATIONS_ENABLED === false) return

  if (key === NOTIFICATION_NEW_PHOTO) {
    payload.title = website.meta.title
    payload.content = website?.translations?.admin?.pushNewPhotoPosted
  }

  return webpush.sendNotification(subscription, JSON.stringify(payload))
}
