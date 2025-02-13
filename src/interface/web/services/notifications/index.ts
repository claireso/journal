import logger from '@infrastructure/logger'
import urlBase64ToUint8Array from '@utils/urlBase64ToUint8Array'
import arrayBufferToUrlBase64 from '@utils/arrayBufferToUrlBase64'

const NOTIFICATIONS_PUBLIC_KEY = process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY

export const areDenied = () => {
  return Notification.permission === 'denied'
}

export const areGranted = () => {
  return Notification.permission === 'granted'
}

export const areDefault = () => {
  return Notification.permission === 'default'
}

export const subscribe = async (registration?: ServiceWorkerRegistration) => {
  try {
    if (!NOTIFICATIONS_PUBLIC_KEY) return

    const applicationServerKey = urlBase64ToUint8Array(NOTIFICATIONS_PUBLIC_KEY, window)

    if (!registration) {
      registration = await getRegistration()
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })

    await fetch('/api/subscriptions', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription
      })
    })
  } catch (err) {
    logger.error(err)
  }
}

export const getRegistration = async () => {
  try {
    return await navigator.serviceWorker.ready
  } catch {
    throw new Error('Notifications: can not get registration')
  }
}

export const getSubscription = async () => {
  try {
    const registration = await getRegistration()
    if (registration) {
      const subscription = await registration.pushManager.getSubscription()
      return subscription
    }
  } catch {
    throw new Error('Notifications: can not get subscription')
  }
}

// a subscription is valid if its applicationServerKey is the same of the application notifications public key defined in environment variable
export const isSubscriptionValid = (subscription: PushSubscription): boolean => {
  const { applicationServerKey } = subscription.options
  if (!applicationServerKey) {
    return false
  }

  const applicationServerKeyString = arrayBufferToUrlBase64(applicationServerKey)

  return applicationServerKeyString === NOTIFICATIONS_PUBLIC_KEY
}
