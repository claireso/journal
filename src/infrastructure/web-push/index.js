import webpush from 'web-push'
import { getTranslations } from '@infrastructure/translations'

// CONSTANTS
export const NOTIFICATION_NEW_PHOTO = 'NOTIFICATION_NEW_PHOTO'
export const IS_NOTIFICATIONS_ENABLED = process.env.NEXT_PUBLIC_IS_NOTIFICATIONS_ENABLED === 'true'

const NOTIFICATIONS_PRIVATE_KEY = process.env.NOTIFICATIONS_PRIVATE_KEY
const NOTIFICATIONS_PUBLIC_KEY = process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY

const translations = getTranslations(process.env.WEBSITE_LANGUAGE, 'admin')

if (IS_NOTIFICATIONS_ENABLED) {
  webpush.setVapidDetails(process.env.NOTIFICATIONS_SUBJECT, NOTIFICATIONS_PUBLIC_KEY, NOTIFICATIONS_PRIVATE_KEY)
}

export const sendNotification = (subscription, key = '') => {
  const payload = {}

  if (IS_NOTIFICATIONS_ENABLED === false) return

  if (key === NOTIFICATION_NEW_PHOTO) {
    payload.title = process.env.WEBSITE_META_TITLE
    payload.content = translations.pushNewPhotoPosted
  }

  return webpush.sendNotification(subscription, JSON.stringify(payload))
}
