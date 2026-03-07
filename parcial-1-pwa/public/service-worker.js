const CACHE_NAME = "medicare-cache-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json", "/icon-192.png", "/icon-512.png"];

// Instalación del service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// "Cache first" significa que el service worker primero busca el recurso en la memoria caché.
// Si lo encuentra, lo entrega de inmediato; si no está guardado, entonces lo solicita a la red.
// Esta estrategia es útil en una app médica para recursos estáticos como íconos, logos,
// imágenes o elementos visuales de la interfaz, porque mejora la velocidad de carga
// y ayuda a que la aplicación siga mostrando su estructura incluso con conexión inestable.
// Sin embargo, no es la mejor opción para datos clínicos o información que cambia con frecuencia,
// ya que en esos casos es más importante obtener siempre la versión más actualizada.