const CACHE_NAME = "footbal-info";

// Daftar resource yang akan disimpan
const url = [
  "/",
  "/index.html",
  "/bundle.js",
  "/src/img/144/icon.png",
  "/src/img/480/icon.png",
  "/src/img/24/bookmark.svg",
  "/src/img/24/bookmark-border.svg",
  "/favicon.ico",
  "/manifest.json"
];

// Menyimpan resource ke cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then( cache => {
        return cache.addAll(url);
      })
  );
});

self.addEventListener('fetch', event => {
  const base_url = 'https://api.football-data.org/';

  // Cek apakah terjadi request pada base_url
  if (event.request.url.indexOf(base_url) > -1) {
    // Jika true maka
    event.respondWith(
      // Membuka CacheS dengan nama CACHE_NAME
      // Jika tak ada maka CacheS akan dibuat
      caches.open(CACHE_NAME)
        // Proses response dari caches.open
        .then( cache => {
          // Return FetchEvent request
          return fetch(event.request)
            .then( response => {
              // Update Cache
              cache.put(event.request.url, response.clone());
              return response;
            })
        })
    );
  } else {
    event.respondWith(
      // Membandingkan resource dari cache dengan server
      caches.match(event.request, { ignoreSearch: true })
        // Proses response dari caches match
        .then( response => {
          return response || fetch (event.request);
        })
    )
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then( cacheNames => {
        return Promise.all(
          cacheNames.map( cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              // Delete cache
              return caches.delete(cacheName);
            }
        })
      );
    })
  );
})

// Notification
self.addEventListener('push', event => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message without payload'
  }

  const option = {
    body: body,
    icon: 'src/img/144/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Push Notifikasi', option)
  )
})
