const CACHE_NAME = 'prp5g-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/dashboard.html',
    '/payment.html',
    '/success.html',
    '/manifest.json',
    '/icon.svg'
];

// INSTALAR
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('📦 Cache abierto');
            return cache.addAll(urlsToCache);
        })
    );
});

// ACTIVAR
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Cache antiguo eliminado:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// FETCH — Servir desde caché si no hay internet
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; // Desde caché
            }
            return fetch(event.request).then(response => {
                if (!response || response.status !== 200) {
                    return response;
                }
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
        }).catch(() => {
            // Sin internet — página offline
            return caches.match('/index.html');
        })
    );
});

// PUSH NOTIFICATIONS
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    event.waitUntil(
        self.registration.showNotification(data.title || 'PRP 5G Academy', {
            body: data.body || '¡Tienes contenido nuevo!',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            vibrate: [200, 100, 200],
            data: { url: data.url || '/' }
        })
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
