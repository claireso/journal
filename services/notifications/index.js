import urlBase64ToUint8Array from '../../utils/urlBase64ToUint8Array'

const NOTIFICATIONS_PUBLIC_KEY = process.env.notificationsPublicKey

export const areDenied = () => {
  return Notification.permission === 'denied'
}

export const areGranted = () => {
  return Notification.permission === 'granted'
}

export const areDefault = () => {
  return Notification.permission === 'default'
}

export const subscribe = async (registration) => {
  try {
    if (!NOTIFICATIONS_PUBLIC_KEY) return

    const convertedPushPublicKey = urlBase64ToUint8Array(
      NOTIFICATIONS_PUBLIC_KEY,
      window
    )

    if (!registration) {
      registration = await getRegistration()
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedPushPublicKey
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
    console.log(err)
  }
}

export const getRegistration = async () => {
  try {
    return await navigator.serviceWorker.ready
  } catch (err) {
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
  } catch (err) {
    throw new Error('Notifications: can not get subscription')
  }
}
