self.addEventListener('install', (event) => {
  console.log('Service Worker نصب شد');
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.js',
        '/images/icon-192x192.png',
        '/images/icon-512x512.png',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker فعال شد');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // اگر کش موجود باشد از آن استفاده می‌کنیم
      }
      return fetch(event.request); // در غیر این صورت از سرور درخواست می‌کنیم
    })
  );
});
