// کدهای نصب برای PWA و تعامل با API
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker ثبت شد:', registration);
    })
    .catch((error) => {
      console.log('Service Worker ثبت نشد:', error);
    });
}
