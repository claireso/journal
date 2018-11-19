const VERSION = '2'

const CACHE_PREFIX = 'claireso-journal'
const CACHE_NAME_IMG = `${CACHE_PREFIX}-img-${VERSION}`
const CACHE_NAME_PAGES = `${CACHE_PREFIX}-pages-${VERSION}`
const CACHE_NAME_CSS_FONTS = `${CACHE_PREFIX}-google-fonts-stylesheets-${VERSION}`
const CACHE_NAME_FONTS = `${CACHE_PREFIX}-google-fonts-webfonts-${VERSION}`

const expectedCaches = [
  CACHE_NAME_IMG,
  CACHE_NAME_PAGES,
  CACHE_NAME_CSS_FONTS,
  CACHE_NAME_FONTS
]

if (workbox) {
  workbox.skipWaiting()
  workbox.clientsClaim()
  // precache js files
  workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

  // cache for images
  workbox.routing.registerRoute(
    /.*\.(png|jpg)/,
    workbox.strategies.cacheFirst({
      cacheName: CACHE_NAME_IMG,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  )

  // cache for fonts
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: CACHE_NAME_CSS_FONTS
    })
  )

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: CACHE_NAME_FONTS,
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365
        })
      ]
    })
  )

  // no cache for api and admin
  workbox.routing.registerRoute(
    /\/(api|admin)\/(.*)/,
    workbox.strategies.networkOnly()
  )

  // cache for pages
  workbox.routing.registerRoute(
    /\/(.*)/,
    workbox.strategies.networkFirst({
      cacheName: CACHE_NAME_PAGES,
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  )

  self.addEventListener('activate', event => {
    // remove old caches
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith(CACHE_PREFIX))
            .map(cacheName => {
              if (expectedCaches.indexOf(cacheName) == -1) {
                return caches.delete(cacheName)
              }
            })
        )
      })
    )
  })

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
}
