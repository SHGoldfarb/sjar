const appVersion = "0.0.17";
const cacheName = `sjar-general-cache-${appVersion}`;

const deleteOldKeys = async () => {
  console.log("[Service Worker] Getting keys...");
  try {
    const keys = await caches.keys();
    console.log(`[Service Worker] Existing cache keys [${keys.join(" ")}]`);
    return Promise.all(
      keys.map(async (key) => {
        if (key !== cacheName) {
          await caches.delete(key);
          console.log(`[Service Worker] Deleted cache: ${key}`);
        }
      })
    );
  } catch (e) {
    console.log(`[Service Worker] An error ocurrend on Activate: ${e}`);
  }
};

self.addEventListener("install", (_e) => {
  console.log("[Service Worker] Install");
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activate");
  e.waitUntil(deleteOldKeys());
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r && !e.request.url.includes("localhost")) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
