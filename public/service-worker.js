// public/service-worker.js
const CACHE_NAME = 'aerowise-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/data/vuelo.json',
 // '/icons/icon-192.png',
 // '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
