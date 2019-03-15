const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = self.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// web push
self.addEventListener('push', event => {
  if (!event.data) return

  const payload = JSON.parse(event.data.text())

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.content
    })
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()

  event.waitUntil(clients.openWindow(self.origin))
})

// renew subscription on subscription expiration
self.addEventListener('pushsubscriptionchange', event => {
  event.waitUntil(
    // get public key
    fetch('/push-public-key')
      .then(response => response.text())
      // renew subscription
      .then(pushPublicKey => {
        const convertedPushPublicKey = urlBase64ToUint8Array(pushPublicKey)

        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedPushPublicKey
        })
      })
      .then(subscription => {
        return fetch('/subscriptions', {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            subscription: subscription
          })
        })
      })
  )
})
