//might be interesting https://whatwebcando.today/articles/handling-service-worker-updates/
//press in chrome CTRL+SHIFT+R to do a hard refresh ignoring the cache
//use tailwind instead of bulma
//https://www.youtube.com/watch?v=P6gEnVlJPOc
//does not work: npx svelte-add tailwindcss
//
//this should simplify changing the data-cache... https://blog.lutterloh.dev/2020/08/08/service-worker-pwa-workbox-rollup.html

url = self.location.href;
urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(url);
hostname = urlParts[1]; // www.example.com

//https://stackoverflow.com/questions/64245188/how-to-differentiate-between-svelte-dev-mode-and-build-mode
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./service-worker.js",
  "./app.js",
  "./style.css",
  "./manifest.json",
  "./images/favicon.png",
  "./images/icons/icon-32x32.png",
  "./images/icons/icon-128x128.png",
  "./images/icons/icon-144x144.png",
  "./images/icons/icon-192x192.png",
  "./images/icons/icon-256x256.png",
  "./images/icons/icon-512x512.png",
  "./images/icons/maskable_icon.png",
];

const CACHE_NAME = "4";
const DATA_CACHE_NAME = "4";


// install
self.addEventListener("install", function (evt) {
evt.waitUntil(
  caches
    .open(CACHE_NAME)
    .then((cache) => {
      console.log("Your files were pre-cached successfully!");
      cache
        .addAll(FILES_TO_CACHE)
        .then((result) => {
          // debugger;
          console.log("result of add all", result);
        })
        .catch((err) => {
          // debugger;
          console.log("Add all error: ", err);
        });
    })
    .catch((err) => {
      console.log(err);
    })
);

self.skipWaiting();
});

// activate
self.addEventListener("activate", function (evt) {
evt.waitUntil(
  caches.keys().then((keyList) => {
    return Promise.all(
      keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME || hostname.startsWith("localhost")) {
          console.log("Removing old cache data", key);
          return caches.delete(key);
        }
      })
    );
  })
);

self.clients.claim();
});

// fetch
self.addEventListener("fetch", function (evt) {
if (evt.request.url.includes("/api/")) {
  evt.respondWith(
    caches
      .open(DATA_CACHE_NAME)
      .then((cache) => {
        return fetch(evt.request)
          .then((response) => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }

            return response;
          })
          .catch((err) => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      })
      .catch((err) => console.log(err))
  );

  return;
}

evt.respondWith(
  caches.open(CACHE_NAME).then((cache) => {
    return cache.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    });
  })
);
});
