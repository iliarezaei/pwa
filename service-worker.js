self.addEventListener('install', (event) => {
  console.log('Service Worker نصب شد');
  // به صورت پیش‌فرض هیچ فایل خاصی را کش نمی‌کنیم
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker فعال شد');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request)); // اجازه دسترسی به تمام درخواست‌ها
});
