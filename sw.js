// I modified the service worker code from my Wittr project

let staticCacheName = 'restaurant-reviews-static-v6';

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(staticCacheName).then(function (cache) {
    console.log("Installing");
    return cache.addAll([
      '/',
      '/favicon.ico',
      '/index.html',
      '/restaurant.html',
      '/js/dbhelper.js', 
      '/js/main.js', 
      '/js/restaurant_info.js', 
      '/css/styles.css', 
      '/data/restaurants.json']);
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.filter(function (cacheName) {
      return cacheName.startsWith('restaurant-reviews-') && cacheName != staticCacheName;
    }).map(function (cacheName) {
      return caches['delete'](cacheName);
    }));
  }));
});

self.addEventListener('fetch', function (event) {

  event.respondWith(caches.match(event.request).then(function (response) {
    console.log("Fetch");
    return response || fetch(event.request);
  }));
});