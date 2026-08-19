/* ==========================================================================
   sw.js — the "service worker". A little background helper the browser runs
   so the app can be installed on a phone and still open when offline.
   --------------------------------------------------------------------------
   Strategy (kept deliberately simple for learning):
   - On install, cache the app's "shell" (pages, styles, icons).
   - For page/asset requests, serve from cache first, fall back to network.
   - For API calls (/api/...), always go to the network (they need live data).
   Bump CACHE_VERSION whenever you change files so phones pick up the update.
   ========================================================================== */
const CACHE_VERSION = "studybuddy-v1";
const SHELL = [
  "/", "/index.html", "/result.html", "/chat.html", "/organizer.html",
  "/theme.css", "/styles.css", "/app.js", "/questions.js",
  "/manifest.json", "/icon.svg", "/icon-192.png", "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Delete old caches from previous versions.
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Never cache API calls — they must be live.
  if (url.pathname.startsWith("/api/")) return;
  // Cache-first for everything else in the shell.
  event.respondWith(
    caches.match(event.request).then((hit) => hit || fetch(event.request))
  );
});
