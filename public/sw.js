const CACHE_NAME = "mini-quran-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Basic pass-through fetch for now
  // In the future, we can implement caching strategies
  event.respondWith(fetch(event.request));
});
