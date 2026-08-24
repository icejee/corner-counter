// Offline-First PWA Service Worker for Corner Counter POS
const CACHE_NAME = "corner-counter-v15-instant-refresh";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css?v=15",
  "./js/storage.js?v=15",
  "./js/audio.js?v=15",
  "./js/confetti.js",
  "./js/stars.js?v=15",
  "./js/app.js?v=15",
  "./icons/favicon-16.png",
  "./icons/favicon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/logo.png"
];

// Install Event: pre-cache all core application assets & skip waiting immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
});

// Activate Event: delete ALL old caches and claim all clients immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Purging old cache:", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: NEVER intercept API or cloud requests; use Network-First for JS/HTML
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // 1. NEVER cache or intercept API endpoints or Render cloud calls
  if (url.includes("/api/") || url.includes("onrender.com") || event.request.method !== "GET") {
    return; // Pass through directly to live network
  }

  // 2. Network-First Strategy for app code (HTML, JS, CSS) so updates are always instant
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        // If offline, fallback to cached assets
        return caches.match(event.request, { ignoreSearch: true }).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === "navigate" || event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match("./index.html");
          }
        });
      })
  );
});
