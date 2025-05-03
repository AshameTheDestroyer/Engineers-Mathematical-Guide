const indexPageURL = "/index.html";
const offlinePageURL = "/offline.html";
const offlineFontEnURL = "/offline_font_en.ttf";
const offlineFontArURL = "/offline_font_ar.ttf";

const CACHE_KEY = "MATHWARE-EMG";

const URLsToCache = [
    indexPageURL,
    offlinePageURL,
    offlineFontEnURL,
    offlineFontArURL,
];

this.addEventListener("install", (e) =>
    e.waitUntil(
        caches
            .open(CACHE_KEY)
            .then(
                (cache) => (
                    console.log("Cache Opened"), cache.addAll(URLsToCache)
                )
            )
            .catch((error) =>
                console.error("Failed to cache resources:", error)
            )
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
                              ? e.request.url.includes("ar")
                                  ? caches.match(offlineFontArURL)
                                  : caches.match(offlineFontEnURL)
                              : caches.match(offlinePageURL)
                      )
            )
            .catch((error) =>
                console.error("Failed to fetch resources:", error)
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
            .catch((error) =>
                console.error("Failed to clean up resources:", error)
            )
    )
);
