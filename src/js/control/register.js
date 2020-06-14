const register = () => {
  // Cek Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./service-worker.js')
          .then( () => {
            console.log('Pendaftaran Service Worker berhasil');
          })
          .catch( () => {
            console.log('Pendaftaran Service Worker Gagal');
          });
      })
    } else {
      console.log('Service Worker tak didukung');
    }
}

export default register;
