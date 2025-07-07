if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
} else {
  console.log("Service Worker not available");
}
