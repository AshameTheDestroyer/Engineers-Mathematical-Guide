const CACHE_KEY = "mathware-engineers-mathematical-guide";
const URLsToCache = ["index.html", "offline.html"];

this.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(CACHE_KEY)
            .then(
                (cache) => (
                    console.log("Cache Opened"), cache.addAll(URLsToCache)
                )
            )
    );
});

this.addEventListener("fetch", (e) => {
    e.respondWith(
        caches
            .match(e.request)
            .then(() =>
                fetch(e.request).catch(() => caches.match(URLsToCache[1]))
            )
    );
});

this.addEventListener("activate", (e) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_KEY);

    e.waitUntil(
        caches
            .keys()
            .then((cacheKeys) =>
                Promise.all(
                    cacheKeys.map(
                        (cacheKey) =>
                            cacheWhitelist.includes(cacheKey) ||
                            caches.delete(cacheKey)
                    )
                )
            )
    );
});
