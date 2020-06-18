function register() {
  // Cek Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener('load', event => {
        navigator.serviceWorker
          .register('./sw.js')
          .then( reg => {
            swInstalation(reg);
          })
          .catch( () => {
            console.log('Pendaftaran Service Worker Gagal');
          });
      })
    } else {
      console.log('Service Worker tak didukung');
    }
}

function swInstalation(reg) {
  let swState;
  if (reg.installing) {
    swState = reg.installing;
  } else if (reg.waiting) {
    swState = reg.waiting;
  } else if (reg.active) {
    swState = reg.active;
  }

  if (swState) {
    swState.addEventListener('statechange', event => {
      console.log(event.target.state + ' service worker');
      if (event.target.state === 'activating') {
        notifikasi(reg);
      }
    });
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

function notifikasi(reg) {
  if ("Notification" in window) {
    Notification.requestPermission()
      .then( result => {
        if (result === "denied") {
          console.log("Notifikasi tidak diizinkan oleh pengguna");
          return;
        } else if (result === "default") {
          console.error("Kotak dialog ditutup");
          return;
        }

        if ('PushManager' in window) {
          reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BE9NJ8WbfXUSvcBtbiqZ2KnBxgQtujI2lXFdlATPGpWucw05l3Y-LTrs6j9T8qGp7qXXIWb2UFLSRRGPNsyI61M')
          })
            .then( subs => {
              console.log('Berhasil melakukan subscribe dengan');
              console.log('endpoint: ', subs.endpoint);
              console.log('p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey('p256dh')))));
              console.log('auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey('auth')))));
            })
            .catch( err => {
              console.error('Gagal melakukan subscribe ', err.message);
            });
        }
      });
  } else {
    console.error("Browser tidak mendukung fitur notifikasi.");
  }
}


export default register;
