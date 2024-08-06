import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute, matchPrecache } from 'workbox-precaching'
import { registerRoute, setCatchHandler } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

import pushService from './sw-push'

const VERSION = process.env.NEXT_PUBLIC_SERVICEWORKER_VERSION

const CACHE_PREFIX = 'claireso-journal'
const CACHE_NAME_IMG = `${CACHE_PREFIX}-img-${VERSION}`
const CACHE_NAME_PAGES = `${CACHE_PREFIX}-pages-${VERSION}`
const CACHE_NAME_API = `${CACHE_PREFIX}-api-${VERSION}`

const expectedCaches = [CACHE_NAME_IMG, CACHE_NAME_PAGES, CACHE_NAME_API]

const WB_MANIFEST = self.__WB_MANIFEST || []

skipWaiting()
clientsClaim()

if (process.env.NEXT_PUBLIC_IS_NOTIFICATIONS_ENABLED === 'true') {
  pushService()
}

// USE CACHE ONLY IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
  // precache js files
  precacheAndRoute(WB_MANIFEST)

  // cache for images
  registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
      cacheName: CACHE_NAME_IMG,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
        })
      ]
    })
  )

  // api : cache for endpoint photos
  registerRoute(
    ({ url }) => url.pathname.startsWith('/api/photos'),
    new NetworkFirst({
      cacheName: CACHE_NAME_API,
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
        })
      ]
    })
  )

  // cache all pages except admin pages
  registerRoute(
    ({ request, url }) => request.destination === 'document' && !url.pathname.startsWith('/admin'),
    new NetworkFirst({
      cacheName: CACHE_NAME_PAGES,
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
        })
      ]
    })
  )

  // Fallback when user is offline
  setCatchHandler(({ event }) => {
    switch (event.request.destination) {
      case 'document':
        return matchPrecache('/offline.html')

      default:
        return Response.error()
    }
  })

  // Clean caches when version has been updated
  self.addEventListener('activate', (event) => {
    // remove old caches
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX))
            .map((cacheName) => {
              if (expectedCaches.indexOf(cacheName) == -1) {
                return caches.delete(cacheName)
              }
            })
        )
      })
    )
  })
}
