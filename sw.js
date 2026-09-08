const BUILD = 11;
const CACHE_NAME = `bearagnostic-app-b${BUILD}`;
const SUPPORT_CACHE = `bearagnostic-support-b${BUILD}`;
const PROMPTPAY_QR_URL = 'https://raw.githubusercontent.com/grolygori789-crypto/little-ganesha-tarot/main/assets/support/promptpay-qr.png';
const APP_SHELL = [
  './',
  './index.html',
  './css/app.css?v=11',
  './css/experience.css?v=11',
  './css/checkup.css?v=11',
  './js/config/app-config.js?v=11',
  './js/config/i18n.js?v=11',
  './js/core/app.js?v=11',
  './js/core/checkup.js?v=11',
  './js/support/help-feedback.js?v=11',
  './js/support/voluntary-support.js?v=11',
  './manifest.webmanifest?v=11',
  './assets/icons/app-icon-192.png',
  './assets/icons/app-icon-512.png',
  './assets/icons/app-icon-maskable-192.png',
  './assets/icons/app-icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png?v=11',
  './assets/icons/favicon-32.png?v=11',
  './assets/mascot/dr-bear-approved.png',
  './assets/mascot/dr-bear-scanning.png',
  './assets/mascot/dr-bear-concerned.png',
  './assets/mascot/dr-bear-warning.png',
  './assets/brand/home-editorial-still-life.webp',
  './assets/brand/scanning-clinical-scene.webp',
  './assets/ui/glass-icons/cleanup.webp',
  './assets/ui/glass-icons/duplicates.webp',
  './assets/ui/glass-icons/large-files.webp',
  './assets/ui/glass-icons/older-files.webp',
  './assets/ui/glass-icons/home.webp',
  './assets/ui/glass-icons/checkup.webp',
  './assets/ui/glass-icons/tools.webp',
  './assets/ui/glass-icons/insights.webp',
  './assets/ui/glass-icons/more.webp',
  './assets/ui/glass-icons/preferences.webp',
  './assets/ui/plain-icons/header-gear-silver.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(Promise.all([
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
    // Best-effort cache of the verified PromptPay QR. Failure never blocks app installation.
    caches.open(SUPPORT_CACHE).then((cache) => cache.add(PROMPTPAY_QR_URL).catch(() => null))
  ]));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => (key.startsWith('bearagnostic-app-b') && key !== CACHE_NAME) || (key.startsWith('bearagnostic-support-b') && key !== SUPPORT_CACHE))
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // The verified PromptPay QR is the only external resource Bearagnostic caches,
  // best-effort and isolated from the app shell. Ko-fi remains user-initiated only.
  if (request.url === PROMPTPAY_QR_URL) {
    event.respondWith(caches.match(PROMPTPAY_QR_URL).then((cached) => cached || fetch(request)));
    return;
  }
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || !response.ok || response.type === 'opaque') return response;
        const requestHref = new URL(request.url).href;
        const isShellAsset = APP_SHELL.some((entry) => new URL(entry, self.registration.scope).href === requestHref);
        if (isShellAsset) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
