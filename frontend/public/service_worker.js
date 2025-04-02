const CACHE_KEY = "mathware-engineers-mathematical-guide";
const URLsToCache = ["/index.html", "/offline.html", "/offline_font.ttf"];

this.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(CACHE_KEY)
            .then((cache) => {
                console.log("Cache Opened");
                return cache.addAll(URLsToCache);
            })
            .catch((err) => {
                console.error("Failed to cache resources:", err);
            })
    );
});

this.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(e.request).catch(() => {
                if (e.request.destination === "font") {
                    return caches.match("/offline_font.ttf");
                }

                return caches.match("/offline.html");
            });
        })
    );
});

this.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_KEY];

    e.waitUntil(
        caches.keys().then((cacheKeys) =>
            Promise.all(
                cacheKeys.map((cacheKey) => {
                    if (!cacheWhitelist.includes(cacheKey)) {
                        console.log(`Deleting old cache: ${cacheKey}`);
                        return caches.delete(cacheKey);
                    }
                })
            )
        )
    );
});
