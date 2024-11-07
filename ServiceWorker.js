const cacheName = "DefaultCompany-Wow_Web_Telegram-1.5";
const contentToCache = [
    "Build/5e01b8537730e14afb5fd3ca096a2e01.loader.js",
    "Build/b8453d6f1dc56d68f547b73b3a313624.framework.js.br",
    "Build/e7910bbc13ac15a42e8bba907a0fa521.data.br",
    "Build/28ee3b224aa6ac726e09ca8e864d9c23.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
