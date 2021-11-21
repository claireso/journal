import webpush from 'web-push'
import { getTranslations } from '@hooks/useTranslations'

// CONSTANTS
export const NOTIFICATION_NEW_PHOTO = 'NOTIFICATION_NEW_PHOTO'
export const IS_NOTIFICATIONS_ENABLED = process.env.IS_NOTIFICATIONS_ENABLED

const NOTIFICATIONS_PRIVATE_KEY = process.env.NOTIFICATIONS_PRIVATE_KEY
const NOTIFICATIONS_PUBLIC_KEY = process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY

const translations = getTranslations(process.env.NEXT_PUBLIC_WEBSITE_LANGUAGE, 'admin')

IS_NOTIFICATIONS_ENABLED &&
  webpush.setVapidDetails(process.env.NEXT_PUBLIC_WEBSITE_URL, NOTIFICATIONS_PUBLIC_KEY, NOTIFICATIONS_PRIVATE_KEY)

export const sendNotification = (subscription, key = '') => {
  const payload = {}

  if (IS_NOTIFICATIONS_ENABLED === false) return

  if (key === NOTIFICATION_NEW_PHOTO) {
    payload.title = process.env.NEXT_PUBLIC_WEBSITE_META_TITLE
    payload.content = translations.pushNewPhotoPosted
  }

  return webpush.sendNotification(subscription, JSON.stringify(payload))
}
