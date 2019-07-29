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
  // TODO: respond to requests for the root page with
  // the page skeleton from the cache

  //var requestUrl = new URL(event.request.url);

  //if (requestUrl.origin === location.origin) {
  //  if (requestUrl.pathname === '/') {
  //    event.respondWith(caches.match('/skeleton'));
  //    return;
  //  }
  //}

  event.respondWith(caches.match(event.request).then(function (response) {
    console.log("Fetch");
    return response || fetch(event.request);
  }));
});

//self.addEventListener('message', function (event) {
//  if (event.data.action === 'skipWaiting') {
//    self.skipWaiting();
//  }
//});