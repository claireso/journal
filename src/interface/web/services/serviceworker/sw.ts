// IMPORTANT: This file is built outside of Next.js using esbuild.
// It is compiled separately using esbuild before being included in the Next.js application.
// For more details on how to build this file, make sure to check the 'npm build:sw' command.

import urlBase64ToUint8Array from '@utils/urlBase64ToUint8Array'

declare const self: ServiceWorkerGlobalScope & { __WB_MANIFEST: unknown[] }

const CACHE_PREFIX = 'claireso-journal'

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting())
})
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

// Enable web push notifications
if (process.env.NOTIFICATIONS_ENABLED) {
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
          // eslint-disable-next-line
          // @ts-ignore
          tab.navigate(self.origin)
          // eslint-disable-next-line
          // @ts-ignore
          return tab.focus()
        }

        return self.clients.openWindow(self.origin)
      })
    )
  })

  // renew subscription on subscription expiration
  self.addEventListener('pushsubscriptionchange', (event) => {
    // eslint-disable-next-line
    // @ts-ignore
    event.waitUntil(
      self.registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
        .then((subscription) => {
          return fetch('/api/subscriptions', {
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

// USE CACHE (legacy) ONLY IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
  // Clean all caches
  self.addEventListener('activate', (event: ExtendableEvent) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX))
            .map((cacheName) => {
              return caches.delete(cacheName)
            })
        )
      })
    )
  })
}
