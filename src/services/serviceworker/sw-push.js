import urlBase64ToUint8Array from '@utils/urlBase64ToUint8Array'

const SWPush = () => {
  const applicationServerKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY, self)

  self.addEventListener('push', (event) => {
    if (!event.data) return

    const payload = event.data.json()

    event.waitUntil(
      self.registration.showNotification(payload.title, {
        body: payload.content
      })
    )
  })

  self.addEventListener('notificationclick', (event) => {
    event.notification.close()

    event.waitUntil(
      self.clients.matchAll().then((clientList) => {
        // get the first browser tab (except admin tab)
        const tab = clientList.find((client) => !client.url.includes('/admin/'))

        if (tab) {
          tab.navigate(self.origin)
          return tab.focus()
        }

        return self.clients.openWindow(self.origin)
      })
    )
  })

  // renew subscription on subscription expiration
  self.addEventListener('pushsubscriptionchange', (event) => {
    event.waitUntil(
      self.registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
        .then((subscription) => {
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
}

export default SWPush
