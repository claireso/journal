// IMPORTANT: This file is built outside of Next.js using esbuild.
// It is compiled separately using esbuild before being included in the Next.js application.
// For more details on how to build this file, make sure to check the 'npm build:sw' command.

const CACHE_PREFIX = 'claireso-journal'

const sw = self as unknown as ServiceWorkerGlobalScope & { __WB_MANIFEST: unknown[] }

sw.addEventListener('install', function (event) {
  event.waitUntil(sw.skipWaiting())
})
sw.addEventListener('activate', function (event) {
  event.waitUntil(sw.clients.claim())
})

// Enable web push notifications
if (process.env.NOTIFICATIONS_ENABLED) {
  sw.addEventListener('push', (event) => {
    if (!event.data) return

    const payload = event.data.json()

    event.waitUntil(
      sw.registration.showNotification(payload.title, {
        body: payload.content
      })
    )
  })

  sw.addEventListener('notificationclick', (event) => {
    event.notification.close()

    event.waitUntil(
      sw.clients.matchAll({ type: 'window' }).then((clientList) => {
        // get the first browser tab (except admin tab)
        const tab = clientList.find((client) => !client.url.includes('/admin/'))

        if (tab) {
          tab.navigate(sw.origin)
          return tab.focus()
        }

        return sw.clients.openWindow(sw.origin)
      })
    )
  })
}

// USE CACHE (legacy) ONLY IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
  // Clean all caches
  sw.addEventListener('activate', (event: ExtendableEvent) => {
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
