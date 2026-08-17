// Minimal offline cache for the trip itinerary.
// Strategy: stale-while-revalidate on same-origin GET requests only —
// Wikipedia photo lookups and Google Maps links always go straight to the
// network (or fail silently offline; the app already handles that).
const CACHE = "bru26-v4";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./favicon-16.png",
  "./favicon-32.png",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  // Place photos — precached on install so every stop's photo works
  // offline from the very first launch, without needing to open each one.
  "img/ams_bloemenmarkt.jpg",
  "img/ams_canales.jpg",
  "img/ams_dam.jpg",
  "img/ams_museumplein.jpg",
  "img/ams_negenstraatjes.jpg",
  "img/ams_nieuwmarkt.jpg",
  "img/ams_vondelpark.jpg",
  "img/ams_wallen.jpg",
  "img/atomium.jpg",
  "img/berlaymont.jpg",
  "img/brugge_begijnhof.jpg",
  "img/brugge_belfort.jpg",
  "img/brugge_boat.jpg",
  "img/brugge_bonifacius.jpg",
  "img/brugge_burg.jpg",
  "img/brugge_markt.jpg",
  "img/brugge_minnewater.jpg",
  "img/brugge_onzelievevrouw.jpg",
  "img/brugge_rozenhoedkaai.jpg",
  "img/brugge_santasangre.jpg",
  "img/brugge_vismarkt.jpg",
  "img/chocolate_line.jpg",
  "img/chocolatier_dumon.jpeg",
  "img/chocostory.jpg",
  "img/cinquantenaire.jpg",
  "img/delirium.jpg",
  "img/dinant_ciudadela.jpg",
  "img/dinant_colegiata.jpg",
  "img/dinant_mosa.jpg",
  "img/dinant_sax.jpg",
  "img/dinant_town.jpg",
  "img/esplanade_parlamento.jpg",
  "img/gent_belfort.jpg",
  "img/gent_dullegriet.jpg",
  "img/gent_graslei.jpg",
  "img/gent_gravensteen.jpg",
  "img/gent_groentenmarkt.jpg",
  "img/gent_michielsbrug.jpg",
  "img/gent_patershol.jpg",
  "img/gent_sintniklaas.jpg",
  "img/gent_stbavo.jpg",
  "img/gent_vrijdagmarkt.jpg",
  "img/grandplace.jpg",
  "img/koekelberg.jpg",
  "img/lux_adolphe.jpg",
  "img/lux_bock.jpg",
  "img/lux_corniche.jpg",
  "img/lux_grund.jpg",
  "img/lux_palace.jpg",
  "img/lux_pfaffenthal.jpg",
  "img/lux_placedarmes.jpg",
  "img/marolles.jpg",
  "img/muro_berlin.jpg",
  "img/parlamento.jpg",
  "img/porte_hal.jpg",
  "img/rue_bouchers.jpg",
  "img/rueneuve.jpg",
  "img/sablon.jpg",
  "img/saint_gery.jpg",
  "img/saint_hubert.jpg",
  "img/ste_catherine.jpg",
  "img/toone.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // let Wikipedia/Maps go straight to network

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
