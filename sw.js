importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  cachingProses();
  pushNotifikasi();
} else {
  console.log(`Workbox gagal dimuat`);
  console.log('Proses Cache Gagal');
}

function cachingProses() {
  workbox.precaching.precacheAndRoute([
    { url : './index.html', revision : '1'},
    { url : './bundle.js', revision : '1'},
    { url : './manifest.json', revision : '1'},
    { url : './src/img/144/icon.png', revision : '1'},
    { url : './src/img/480/icon.png', revision : '1'},
    { url : './src/img/24/delete.svg', revision : '1'},
    { url : './src/img/24/add.svg', revision : '1'}
  ]);

  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.networkFirst({
      networkTimeoutSeconds: 5,
      cacheName: 'football-api'
    })
  )
}

function pushNotifikasi() {
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
      icon: './src/img/144/icon.png',
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
}
