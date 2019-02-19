var cacheName = 'thca-nursing-homes-dec-2018';
var filesToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/images/*',
    '/icons/*'
];
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate',  event => {
    event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, {ignoreSearch:true}).then(response => {
            return response || fetch(event.request);
        })
    );
});