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
  "./mathjax/a11y/assistive-mml.js",
  "./mathjax/a11y/complexity.js",
  "./mathjax/a11y/explorer.js",
  "./mathjax/a11y/semantic-enrich.js",
  "./mathjax/a11y/sre.js",
  "./mathjax/adaptors/liteDOM.js",
  "./mathjax/input/mml/extensions/mml3.js",
  "./mathjax/input/mml/extensions/mml3.sef.json",
  "./mathjax/input/mml/entities.js",
  "./mathjax/input/tex/extensions/action.js",
  "./mathjax/input/tex/extensions/all-packages.js",
  "./mathjax/input/tex/extensions/ams.js",
  "./mathjax/input/tex/extensions/amscd.js",
  "./mathjax/input/tex/extensions/autoload.js",
  "./mathjax/input/tex/extensions/bbox.js",
  "./mathjax/input/tex/extensions/boldsymbol.js",
  "./mathjax/input/tex/extensions/braket.js",
  "./mathjax/input/tex/extensions/bussproofs.js",
  "./mathjax/input/tex/extensions/cancel.js",
  "./mathjax/input/tex/extensions/cases.js",
  "./mathjax/input/tex/extensions/centernot.js",
  "./mathjax/input/tex/extensions/color.js",
  "./mathjax/input/tex/extensions/colortbl.js",
  "./mathjax/input/tex/extensions/colorv2.js",
  "./mathjax/input/tex/extensions/configmacros.js",
  "./mathjax/input/tex/extensions/empheq.js",
  "./mathjax/input/tex/extensions/enclose.js",
  "./mathjax/input/tex/extensions/extpfeil.js",
  "./mathjax/input/tex/extensions/gensymb.js",
  "./mathjax/input/tex/extensions/html.js",
  "./mathjax/input/tex/extensions/mathtools.js",
  "./mathjax/input/tex/extensions/mhchem.js",
  "./mathjax/input/tex/extensions/newcommand.js",
  "./mathjax/input/tex/extensions/noerrors.js",
  "./mathjax/input/tex/extensions/noundefined.js",
  "./mathjax/input/tex/extensions/physics.js",
  "./mathjax/input/tex/extensions/require.js",
  "./mathjax/input/tex/extensions/setoptions.js",
  "./mathjax/input/tex/extensions/tagformat.js",
  "./mathjax/input/tex/extensions/textcomp.js",
  "./mathjax/input/tex/extensions/textmacros.js",
  "./mathjax/input/tex/extensions/unicode.js",
  "./mathjax/input/tex/extensions/upgreek.js",
  "./mathjax/input/tex/extensions/verb.js",
  "./mathjax/input/asciimath.js",
  "./mathjax/input/mml.js",
  "./mathjax/input/tex-base.js",
  "./mathjax/input/tex-full.js",
  "./mathjax/input/tex.js",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_AMS-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Calligraphic-Bold.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Calligraphic-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Fraktur-Bold.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Fraktur-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Main-Bold.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Main-Italic.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Main-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Math-BoldItalic.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Math-Italic.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Math-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_SansSerif-Bold.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_SansSerif-Italic.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_SansSerif-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Script-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Size1-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Size2-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Size3-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Size4-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Typewriter-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Vector-Bold.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Vector-Regular.woff",
  "./mathjax/output/chtml/fonts/woff-v2/./mathjax_Zero.woff",
  "./mathjax/output/chtml/fonts/tex.js",
  "./mathjax/output/svg/fonts/tex.js",
  "./mathjax/output/chtml.js",
  "./mathjax/output/svg.js",
  "./mathjax/sre/mathmaps/base.json",
  "./mathjax/sre/mathmaps/ca.json",
  "./mathjax/sre/mathmaps/da.json",
  "./mathjax/sre/mathmaps/de.json",
  "./mathjax/sre/mathmaps/en.json",
  "./mathjax/sre/mathmaps/es.json",
  "./mathjax/sre/mathmaps/fr.json",
  "./mathjax/sre/mathmaps/hi.json",
  "./mathjax/sre/mathmaps/it.json",
  "./mathjax/sre/mathmaps/nb.json",
  "./mathjax/sre/mathmaps/nemeth.json",
  "./mathjax/sre/mathmaps/nn.json",
  "./mathjax/sre/mathmaps/sv.json",
  "./mathjax/ui/lazy.js",
  "./mathjax/ui/menu.js",
  "./mathjax/ui/safe.js",
  "./mathjax/core.js",
  "./mathjax/latest.js",
  "./mathjax/loader.js",
  "./mathjax/mml-chtml.js",
  "./mathjax/mml-svg.js",
  "./mathjax/node-main.js",
  "./mathjax/startup.js",
  "./mathjax/tex-chtml-full-speech.js",
  "./mathjax/tex-chtml-full.js",
  "./mathjax/tex-chtml.js",
  "./mathjax/tex-mml-chtml.js",
  "./mathjax/tex-mml-svg.js",
  "./mathjax/tex-svg-full.js",
  "./mathjax/tex-svg.js",
  "./style.css",
  "./manifest.json",
  "./function-plot.js",
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
, {'ignoreSearch' : true}
);
});
