(global => {
  const VERSION = '2'

  const CACHE_PREFIX = 'claireso-journal'
  const CACHE_NAME_IMG = `${ CACHE_PREFIX }-img-${ VERSION }`
  const CACHE_NAME_ASSETS = `${ CACHE_PREFIX }-assets-${ VERSION }`
  const CACHE_NAME_PAGES = `${ CACHE_PREFIX }-pages-${ VERSION }`

  const expectedCaches = [
    CACHE_NAME_IMG,
    CACHE_NAME_ASSETS,
    CACHE_NAME_PAGES,
  ]

  importScripts('./sw-toolbox.js')

  global.toolbox.options.cache = {name: CACHE_NAME_ASSETS}

  // precache assets
  global.toolbox.precache(['/css/journal.css', '/css/admin.css'])

  // cache for images
  global.toolbox.router.get('/img/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: CACHE_NAME_IMG,
      maxAgeSeconds: 86400 * 30, // cache for 30 days
    }
  })

  //cache for css
  global.toolbox.router.get('/css/(.*)', global.toolbox.cacheFirst)

  //cache for js
  global.toolbox.router.get('/js/(.*)', global.toolbox.cacheFirst)

  // cache for fonts
  global.toolbox.router.get('/(.+)', global.toolbox.cacheFirst, {
    origin: /https?:\/\/fonts.+/
  })

  // no cache for api
  global.toolbox.router.get('/api/(.*)', global.toolbox.networkOnly)

  // no cache for admin
  global.toolbox.router.get('/admin/(.*)', global.toolbox.networkOnly)

  // cache for pages
  global.toolbox.router.get('/(.*)', global.toolbox.networkFirst, {
    cache: {
      name: CACHE_NAME_PAGES,
    },
  })

  global.addEventListener('install', event => {
    event.waitUntil(global.skipWaiting())
  })

  global.addEventListener('activate', event => {
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

  global.addEventListener('push', event => {
    if (!event.data) return

    const payload = JSON.parse(event.data.text())

    event.waitUntil(
      self.registration.showNotification(payload.title, {
        body: payload.content,
      })
    )
  })

  global.addEventListener('notificationclick', event => {
    event.notification.close()

    event.waitUntil(
      clients.openWindow(global.origin)
    )
  })
})(self)
