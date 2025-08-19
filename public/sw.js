const appVersion = "0.0.29";
const cacheName = `sjar-general-cache-${appVersion}`;
const disableLocalhost = true;

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

const removeSearchParams = (request) => {
  const url = new URL(request.url);
  url.search = "";

  const requestOptions = {
    method: request.method,
    headers: request.headers,
    body: request.body,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    referrer: request.referrer,
  };

  if (request.mode !== "navigate") {
    requestOptions.mode = request.mode;
  }

  const modifiedRequest = new Request(url.toString(), requestOptions);

  return modifiedRequest;
};

const fetchAndSave = async (request) => {
  const response = await fetch(request);
  const cache = await caches.open(cacheName);
  console.log(`[Service Worker] Caching resource: ${request.url}`);
  cache.put(request, response.clone());
  return response;
};

const handleRequestEvent = async (e) => {
  console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
  const plainRequest = removeSearchParams(e.request);
  const cachedResponse = await caches.match(plainRequest);
  const responsePromise = fetchAndSave(plainRequest);
  if (
    cachedResponse &&
    !(disableLocalhost && plainRequest.url.includes("://localhost:"))
  ) {
    console.log(
      `[Service Worker] Using cached response for: ${plainRequest.url}`
    );
    return cachedResponse;
  }
  console.log(
    `[Service Worker] Using network response for: ${plainRequest.url}`
  );
  return responsePromise;
};

self.addEventListener("install", (_e) => {
  console.log("[Service Worker] Install");
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activate");
  e.waitUntil(deleteOldKeys());
});

self.addEventListener("fetch", (e) => {
  e.respondWith(handleRequestEvent(e));
});
