const CACHE_NAME = 'uos-mock-portal-v1.2';
const STATIC_ASSETS = [
    './',
    './index.html',
    './admin.html',
    './past-paper.html',
    './auth.js',
    './uos-past-papers-data.js',
    './uos-advanced-tools.js',
    './manifest.json',
    './site.webmanifest',
    './uos-logo.png',
    './web-app-manifest-192x192.png',
    './web-app-manifest-512x512.png',
    './favicon-96x96.png',
    './favicon.ico',
    './apple-touch-icon.png',
    './uos-quiz1.html',
    './uos-quiz2.html',
    './uos-quiz3.html',
    './uos-quiz4.html',
    './uos-quiz5.html',
    './uos-quiz6.html',
    './uos-quiz7.html',
    './uos-quiz8.html',
    './uos-quiz9.html',
    './uos-quiz10.html',
    './official-test1.html',
    './practice-test1.html',
    './uos.html'
];

// Install Event - Cache Core Assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching core app assets...');
            return cache.addAll(STATIC_ASSETS).catch(err => {
                console.warn('[Service Worker] Non-fatal caching warning:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Removing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
    // Only handle http/https requests
    if (!event.request.url.startsWith('http')) return;

    // Route alias: /admin or /admin/ -> admin.html
    const reqUrl = new URL(event.request.url);
    if (reqUrl.pathname.endsWith('/admin') || reqUrl.pathname.endsWith('/admin/')) {
        const adminUrl = new URL('admin.html', self.location.origin).href;
        event.respondWith(
            caches.match(adminUrl)
                .then(cached => cached || caches.match('./admin.html'))
                .then(cached => cached || fetch(adminUrl))
                .catch(() => caches.match('./admin.html'))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Fetch in background to update cache
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse);
                        });
                    }
                }).catch(() => {/* Offline fallback */});

                return cachedResponse;
            }

            // Not in cache -> fetch from network and cache
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // Return offline fallback if navigating HTML
                if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
