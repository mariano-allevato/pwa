const CACHE_NAME = 'aerowise-cache-v1';
const urlsToCache = [
  '/',                  // la raíz
  '/index.html',        // HTML principal
  '/manifest.json',     // manifest
  '/data/vuelo.json',   // datos offline
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Instalar y cachear recursos conocidos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activar y limpiar caches viejos (buena práctica)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Interceptar todas las requests y servir cache o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() =>
          // fallback opcional si querés mostrar algo sin conexión
          new Response('<h1>Estás offline</h1>', {
            headers: { 'Content-Type': 'text/html' }
          })
        )
      );
    })
  );
});
