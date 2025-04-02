const CACHE_KEY = "mathware-engineers-mathematical-guide";
const URLsToCache = ["/index.html", "/offline.html", "/offline_font.ttf"];

this.addEventListener("install", (e) =>
    e.waitUntil(
        caches
            .open(CACHE_KEY)
            .then(
                (cache) => (
                    console.log("Cache Opened"), cache.addAll(URLsToCache)
                )
            )
            .catch((err) => console.error("Failed to cache resources:", err))
    )
);

this.addEventListener("fetch", (e) =>
    e.respondWith(
        caches
            .match(e.request)
            .then((cachedResponse) =>
                cachedResponse
                    ? cachedResponse
                    : fetch(e.request).catch(() =>
                          e.request.destination == "font"
                              ? caches.match("/offline_font.ttf")
                              : caches.match("/offline.html")
                      )
            )
    )
);

this.addEventListener("activate", (e) =>
    e.waitUntil(
        caches
            .keys()
            .then((cacheKeys) =>
                Promise.all(
                    cacheKeys.map(
                        (cacheKey) =>
                            cacheWhitelist.includes(cacheKey) ||
                            (console.log(`Deleting old cache: ${cacheKey}`),
                            caches.delete(cacheKey))
                    )
                )
            )
    )
);
