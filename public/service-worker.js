const CACHE_NAME = "contacts-pwa-v3";

// Archivos mínimos que SIEMPRE deben quedar para offline
const CORE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/vite.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // 1) Navegación: Network First (HYBRID)
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  // 2) Assets: Cache First (HYBRID)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => {
          // SIEMPRE retornar algo para evitar el error "Uncaught"
          return caches.match(req);
        });
    })
  );
});