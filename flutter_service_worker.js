'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "9b93cc781f206eb155846b30c4cfcc79",
"assets/assets/kedikap1.jpg": "9b449586c6a3d302a50aad683d1128ce",
"assets/assets/kedikum1.jpg": "22e9197a6c309b7c786d36f229fb1611",
"assets/assets/kedimama1.jpg": "41506a693faa5bfc9cf09a90b33ab978",
"assets/assets/kedimama2.jpg": "516b42ff81b5a033615da637b22c8898",
"assets/assets/kedimama3.jpg": "c6f33e7d5d327d074c68fac3aaa35985",
"assets/assets/kedimama4.jpg": "79a5a8eb8b421e9349cb588289bda777",
"assets/assets/kedimama5.jpg": "23dfcf1c3f6e6bcf3981d57b8647462c",
"assets/assets/kedimama6.jpg": "b8baef96a33bb10cb0556979e52230c0",
"assets/assets/kedioyuncak1.jpg": "aa79501901963ac3361e5ee16e032796",
"assets/assets/kedioyuncak2.jpg": "36240133945cb1060e5c41af98ccc5de",
"assets/assets/keditasma1.jpg": "d302020b2a420ac76e3726de969be4ae",
"assets/assets/keditasma2.jpg": "55509006b4605ad49c0356b9c3a8c04f",
"assets/assets/kediyatak1.jpg": "197b4f9d9378d84bec93237652707cdc",
"assets/assets/kopekceket1.jpeg": "0a4dd80ae93530cec795607eb3db2890",
"assets/assets/kopekkafes1.jpg": "44fef88ad37e9142b188277d84958249",
"assets/assets/kopekmama1.jpg": "f2c3a1920adbce60c071a554867b1f6f",
"assets/assets/kopekmama2.jpg": "fc2bc1b7cf831b89c378c30d7cc78bd3",
"assets/assets/kopekmama3.jpg": "8988aaf6113b3a705a4a1f8df2934b81",
"assets/assets/kopekmama4.jpeg": "8e51fa2826c2963ba11a16458a86cfa4",
"assets/assets/kopekmama5.jpg": "c68f64b2556ec42196bdafd7becc7a0d",
"assets/assets/kopekmama6.jpg": "a4141fe54fe4b1243d3b47499074af7c",
"assets/assets/kopekoyuncak1.jpg": "b3be7640f60b44a30f121eb2a2272612",
"assets/assets/kopektasma1.jpg": "39735435f978dd87c341c3d5dbe2bf44",
"assets/assets/kopektasma2.jpg": "1bdba8acb8d39780537603f3e5d3e91b",
"assets/assets/kopektasma3.jpg": "fb22600fedd849f6fbe933a9f010b30b",
"assets/assets/kopektasma4.jpg": "035444627840de6591a1d15494fe9a37",
"assets/assets/kopekyatak1.jpg": "6fc6b98bab1eb3280a2c00b2e7dd1fcb",
"assets/assets/kopekyatak2.jpg": "b7979f8b7dced05b96f3e3e0707ce2e7",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "40a47d08b9a9abfda6985a0b9d9acef4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5ada3c4c2aaf5beada1fd8e25ad6ad09",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "6ffb39c8cb9e8d35ebbc2e35d2c34da5",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "4fc935dad351697db8e181de23cfec50",
"canvaskit/canvaskit.js": "62b9906717d7215a6ff4cc24efbd1b5c",
"canvaskit/canvaskit.wasm": "b179ba02b7a9f61ebc108f82c5a1ecdb",
"canvaskit/profiling/canvaskit.js": "3783918f48ef691e230156c251169480",
"canvaskit/profiling/canvaskit.wasm": "6d1b0fc1ec88c3110db88caa3393c580",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "5277171a6d534ea9cfc8422a4c5d0cea",
"/": "5277171a6d534ea9cfc8422a4c5d0cea",
"main.dart.js": "f020ae32bc15ac1001f4ca1ba9a99327",
"manifest.json": "a97d08bbc31baa7516eea9311ea81a97",
"version.json": "319a7a3fd00f2cd273dcc0f144e49dc2"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
