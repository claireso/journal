import urlBase64ToUint8Array from './urlBase64ToUint8Array'

export default {
  areDenied() {
    return Notification.permission === 'denied'
  },

  areGranted() {
    return Notification.permission === 'granted'
  },

  areDefault() {
    return Notification.permission === 'default'
  },

  async subscribe(registration) {
    const pushPublicKey = await this.getPushPublicKey()

    if (!registration) {
      registration = await this.getRegistration()
    }

    if (!pushPublicKey) return

    const convertedPushPublicKey = urlBase64ToUint8Array(pushPublicKey)

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedPushPublicKey
    })

    await fetch('/subscriptions', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription
      })
    })
  },

  async getRegistration() {
    try {
      return await navigator.serviceWorker.ready
    } catch (err) {
      throw new Error('Banner: can not get registration')
    }
  },

  async getPushPublicKey() {
    try {
      const response = await fetch('/push-public-key')
      return await response.text()
    } catch (err) {
      throw new Error('Banner can not get public key')
    }
  }
}
