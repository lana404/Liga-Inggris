const webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BE9NJ8WbfXUSvcBtbiqZ2KnBxgQtujI2lXFdlATPGpWucw05l3Y-LTrs6j9T8qGp7qXXIWb2UFLSRRGPNsyI61M",
   "privateKey": "V4m4Ej-ctgeMWkdY7rs7ru43TkDDa1p-ekdz-SmHxa0"
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fwqFMaGH9Js:APA91bEFWCsaABRZ8sr9Y-IGdoyN0DF9fEU0Jf78ed1K4kN3uWA34VY9HCBf2NFT7aKyIXoMgvnCX0MBcbtxTW-wSNPOF20-uaoaOpAmSGxgPNLBm6ksRrG2fBfnJM7BsHLF7Qoc_YMt",
   "keys": {
       "p256dh": "BBQO6uZ8jmlwk0JAxt+kmE/OZK9qZ/EdVLNtrIff9kfFSmAkRPcqEqSs3rthtMrGFbjsWEzxl4LcBnDL84spnKE=",
       "auth": "Gnn/4hDT+EgX7heyrByjgw=="
   }
};

let payload = 'Selamat Data di Football Info';

const options = {
   gcmAPIKey: '433600530657',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
