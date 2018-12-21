let staticCache = 'restaurant-1'

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('restaurant-') && cacheName !== staticCache;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCache).then(cache => {
            return cache.addAll(
                [
                    './index.html',
                    './restaurant.html',
                    './sw.js',
                    './js/dbhelper.js',
                    './js/main.js',
                    './js/restaurant_info.js',
                    './data/restaurants.json',
                    './css/styles.css'
                ]
            );
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