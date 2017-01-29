(global => {
  const VERSION = '1';

  const CACHE_PREFIX = 'claireso-journal';
  const CACHE_NAME_IMG = `${ CACHE_PREFIX }-img-${ VERSION }`;
  const CACHE_NAME_ASSETS = `${ CACHE_PREFIX }-assets-${ VERSION }`;
  const CACHE_NAME_PAGES = `${ CACHE_PREFIX }-pages-${ VERSION }`;

  const expectedCaches = [
    CACHE_NAME_IMG,
    CACHE_NAME_ASSETS,
    CACHE_NAME_PAGES,
  ];

  importScripts('./sw-toolbox.js');

  global.toolbox.options.debug = true;
  global.toolbox.options.cache = {name: CACHE_NAME_ASSETS};

  // precache assets
  global.toolbox.precache(['/css/journal.css']);

  // cache for images
  toolbox.router.get('/img/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: CACHE_NAME_IMG,
      maxAgeSeconds: 86400 * 30, // cache for 30 days
    }
  });

  //cache for css
  toolbox.router.get('/css/(.*)', global.toolbox.cacheFirst);

  // cache for fonts
  global.toolbox.router.get('/(.+)', global.toolbox.cacheFirst, {
    origin: /https?:\/\/fonts.+/
  });

  // cache for pages
  toolbox.router.get('/(.*)', global.toolbox.networkFirst, {
    cache: {
      name: CACHE_NAME_PAGES,
    },
  });

  global.addEventListener('install', event => {
    event.waitUntil(global.skipWaiting());
  });

  self.addEventListener('activate', event => {
    // remove old caches
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith(CACHE_PREFIX))
            .map(cacheName => {
              if (expectedCaches.indexOf(cacheName) == -1) {
                return caches.delete(cacheName);
              }
            })
        );
      })
    );
  });
})(self);
