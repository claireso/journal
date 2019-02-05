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
