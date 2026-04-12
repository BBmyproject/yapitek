export const PROJECT_SLUGS = [
  "evart-oran",
  "evart-1",
  "evart-2",
  "evart-yalikavak",
  "evart-estates-yalikavak",
  "imza-gokdemir",
  "may-life-incek",
  "docs-vadi",
  "park-royal-residence",
  "park-royal-venue",
  "heska",
  "zirvekent",
  "vali-erdogan",
  "abidin-pasa-kutuphanesi",
  "amfi-tiyatro-uyanik",
  "kirim-sudak",
  "sehitlik",
  "sayhan-hukuk",
  "incek-louren",
  "kumas",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

/** Anasayfa: galeri ile vitrin arası ilk 5 proje */
export const HOME_FEATURED_PROJECT_SLUGS = PROJECT_SLUGS.slice(0, 5);

export function isProjectSlug(s: string): s is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(s);
}

/** Kart ve detay hero görselleri */
export const PROJECT_COVERS: Record<ProjectSlug, string> = {
  "evart-oran":
    "/images/evart-oran.jpg",
  "evart-1": "/images/evart1.jpg",
  "evart-2": "/images/evart2.jpg",
  "evart-yalikavak": "/images/evart-yalikavak.jpg",
  "evart-estates-yalikavak":
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
  "imza-gokdemir": "/images/imza-gokdemir.jpeg",
  "may-life-incek": "/images/may-life-incek.jpg",
  "docs-vadi": "/images/docs-vadi.webp",
  "park-royal-residence": "/images/park-royal-residence.jpg",
  "park-royal-venue": "/images/park-royal.jpg",
  "heska": "/images/heska.jpg",
  "zirvekent": "/images/zirvekent.jpg",
  "vali-erdogan": "/images/vali-erdogan.jpg",
  "abidin-pasa-kutuphanesi":
    "/images/abidin.jpg",
  "amfi-tiyatro-uyanik":
    "/images/amfi.jpg",
  "kirim-sudak":
    "/images/kirim-sudak.jpg",
  sehitlik: "/images/sehitlik.jpg",
  "sayhan-hukuk": "/images/seyhan-hukuk.jpeg",
  "incek-louren":
    "/images/incek-louren.jpg",
  kumas: "/images/kumas.jpeg",
};
