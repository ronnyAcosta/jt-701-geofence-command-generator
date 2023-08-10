/*
"https://unpkg.com/react@18/umd/react.production.min.js",
"https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
"https://unpkg.com/@babel/standalone/babel.min.js",
*/
const CACHE_ELEMENTS = [
    "./",
    "./src/index.css",
    "./src/App.css",
    "./src/App.jsx",
    "./src/main.jsx",
    "./src/map-providers.js",
    "https://fonts.googleapis.com/css2?family=Poppins&family=Roboto&display=swap"
]

const CACHE_NAME = "v1_geofence_commands_cache";

const self = this;

self.addEventListener("install", (e) =>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            cache.addAll(CACHE_ELEMENTS).then( () =>{
                self.skipWaiting();
            }).catch(console.log)
        })
    )
});

self.addEventListener("activate", (e) =>{
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then((cacheNames) =>{
            return Promise.all(
                cacheNames.map((cacheName) =>{
                    return (
                        cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
                    );
                })
            );
        }).then(() => self.clients.claim())
    );
});


self.addEventListener("fetch", (e) =>{
   e.respondWith(
        caches.match(e.request).then((res) => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});