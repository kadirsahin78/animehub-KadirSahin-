const CACHE_NAME = "animehub-v1";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./services.html",
  "./about.html",
  "./contact.html",
  "./detail.html",
  "./manifest.json",
  "./assets/css/style.css",
  "./assets/js/main.js",
  "./assets/js/contact.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

/* ================= INSTALL ================= */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

/* ================= ACTIVATE ================= */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* ================= FETCH ================= */
self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  // 🔹 API isteği (Jikan)
  if (requestUrl.origin.includes("jikan.moe")) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 🔹 Statik dosyalar (HTML, CSS, JS)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
