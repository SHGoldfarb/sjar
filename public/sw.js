const appVersion = "0.0.26";
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

const fetchAndSave = async (request) => {
  const response = await fetch(request);
  const cache = await caches.open(cacheName);
  console.log(`[Service Worker] Caching resource: ${request.url}`);
  cache.put(request, response.clone());
  return response;
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
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      const cachedResponse = await caches.match(e.request);
      const responsePromise = fetchAndSave(e.request);
      if (cachedResponse) {
        console.log(
          `[Service Worker] Using cached response for: ${e.request.url}`
        );
        return cachedResponse;
      }
      console.log(
        `[Service Worker] Using network response for: ${e.request.url}`
      );
      return await responsePromise;
    })()
  );
});
