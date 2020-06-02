import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import {
  CacheFirst,
  StaleWhileRevalidate,
  NetworkOnly,
  NetworkFirst
} from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

import pushService from './sw-push'

const { isNotificationsEnabled } = process.env

const VERSION = '2'

const CACHE_PREFIX = 'claireso-journal'
const CACHE_NAME_IMG = `${CACHE_PREFIX}-img-${VERSION}`
const CACHE_NAME_PAGES = `${CACHE_PREFIX}-pages-${VERSION}`
const CACHE_NAME_CSS_FONTS = `${CACHE_PREFIX}-google-fonts-stylesheets-${VERSION}`
const CACHE_NAME_FONTS = `${CACHE_PREFIX}-google-fonts-webfonts-${VERSION}`
const CACHE_NAME_API = `${CACHE_PREFIX}-api-${VERSION}`

const expectedCaches = [
  CACHE_NAME_IMG,
  CACHE_NAME_PAGES,
  CACHE_NAME_CSS_FONTS,
  CACHE_NAME_FONTS,
  CACHE_NAME_API
]

const WB_MANIFEST = self.__WB_MANIFEST || []

skipWaiting()
clientsClaim()

if (isNotificationsEnabled) {
  pushService()
}

// USE CACHE ONLY IN PRODUCTION
if (process.env.isProduction) {
  // precache js files
  precacheAndRoute(WB_MANIFEST)

  // cache for images
  registerRoute(
    /.*\.(png|jpg)/,
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

  // cache for fonts
  registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: CACHE_NAME_CSS_FONTS
    })
  )

  registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
      cacheName: CACHE_NAME_FONTS,
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365 // 365 Days
        })
      ]
    })
  )

  // admin: no cache
  registerRoute(/\/admin\/(.*)/, new NetworkOnly())

  // api : cache for endpoint photos
  registerRoute(
    /\/api\/photos(\?.*)?$/,
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

  // api: no cache for others endpoints
  registerRoute(/\/api\/(.*)/, new NetworkOnly())

  // cache for pages (root / and /page=2)
  registerRoute(
    /\/(\?.*)?$/,
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
