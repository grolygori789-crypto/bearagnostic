const BUILD = 3;
const CACHE_NAME = `bearagnostic-app-b${BUILD}`;
const APP_SHELL = [
  './',
  './index.html',
  './css/app.css?v=3',
  './js/config/app-config.js?v=3',
  './js/config/i18n.js?v=3',
  './js/core/app.js?v=3',
  './manifest.webmanifest?v=3',
  './assets/icons/app-icon-192.png',
  './assets/icons/app-icon-512.png',
  './assets/icons/app-icon-maskable-192.png',
  './assets/icons/app-icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png?v=3',
  './assets/icons/favicon-32.png?v=3',
  './assets/mascot/dr-bear-approved.png',
  './assets/mascot/dr-bear-scanning.png',
  './assets/mascot/dr-bear-concerned.png',
  './assets/mascot/dr-bear-warning.png',
  './assets/brand/home-editorial-still-life.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith('bearagnostic-app-b') && key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
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
