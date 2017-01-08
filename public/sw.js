const CURRENT_CACHE_STATIC = 'claireso-journal-static-v1';
const CURRENT_CACHE_IMG = 'claireso-journal-img-v1';

const expectedCaches = [
  CURRENT_CACHE_STATIC,
  CURRENT_CACHE_IMG,
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CURRENT_CACHE_STATIC)
      .then(cache => cache.addAll([
        '/',
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  // remove old caches
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!/^claireso-/.test(cacheName)) {
            return;
          }
          if (expectedCaches.indexOf(cacheName) == -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request).then(response => {
        const cacheName = /\.jpg$/.test(event.request.url) ? CURRENT_CACHE_IMG : CURRENT_CACHE_STATIC;
        return caches.open(cacheName).then(cache => cache.put(event.request, response.clone()).then(() => response));
      })
    )
  );
});
