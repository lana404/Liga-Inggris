function register() {
  // Cek Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./service-worker.js')
          .then( () => {
            console.log('Pendaftaran Service Worker berhasil');
            notifikasi();
          })
          .catch( () => {
            console.log('Pendaftaran Service Worker Gagal');
          });
      })
    } else {
      console.log('Service Worker tak didukung');
    }
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function notifikasi() {
  if ("Notification" in window) {
    Notification.requestPermission()
      .then( result => {
        if (result === "denied") {
          console.log("Fitur notifikasi tidak diijinkan.");
          return;
        } else if (result === "default") {
          console.error("Pengguna menutup kotak dialog permintaan ijin.");
          return;
        }

        if ('PushManager' in window) {
          navigator.serviceWorker.getRegistration()
            .then( reg => {
              reg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array('BE9NJ8WbfXUSvcBtbiqZ2KnBxgQtujI2lXFdlATPGpWucw05l3Y-LTrs6j9T8qGp7qXXIWb2UFLSRRGPNsyI61M')
              })
                .then( subs => {
                  console.log('Berhasil melakukan subscribe dengan endpoint: ', subs.endpoint);
                  console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey('p256dh')))));
                  console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey('auth')))));
                })
                .catch( err => {
                  console.error('Tidak dapat melakukan subscribe ', err.message);
                });
            })
        }
      });
  } else {
    console.error("Browser tidak mendukung notifikasi.");
  }
}

export {register, notifikasi};
