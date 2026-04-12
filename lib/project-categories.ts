import type { ProjectSlug } from "./projects";

export const PROJECT_CATEGORY_IDS = [
  "housing",
  "commercial",
  "development",
  "institutional",
  "social",
] as const;

export type ProjectCategoryId = (typeof PROJECT_CATEGORY_IDS)[number];

/** Sekmeler: önce Tümü, sonra kategoriler */
export const PROJECT_TAB_IDS = [
  "all",
  ...PROJECT_CATEGORY_IDS,
] as const;

export type ProjectTabId = (typeof PROJECT_TAB_IDS)[number];

/** Projeler sayfası sekmeleri — sıra kullanıcı listesiyle uyumlu */
export const PROJECT_SLUGS_BY_CATEGORY: Record<
  ProjectCategoryId,
  readonly ProjectSlug[]
> = {
  housing: [
    "evart-oran",
    "evart-yalikavak",
    "evart-estates-yalikavak",
    "evart-1",
    "evart-2",
    "may-life-incek",
    "park-royal-residence",
    "docs-vadi",
  ],
  commercial: ["heska", "incek-louren", "park-royal-venue"],
  development: ["imza-gokdemir"],
  institutional: ["zirvekent", "vali-erdogan"],
  social: [
    "abidin-pasa-kutuphanesi",
    "amfi-tiyatro-uyanik",
    "kirim-sudak",
    "sehitlik",
    "sayhan-hukuk",
    "kumas",
  ],
};

/** Kategori sırasıyla birleşik liste (Tümü sekmesi) */
export const ALL_PROJECT_SLUGS_IN_TAB_ORDER: readonly ProjectSlug[] =
  PROJECT_CATEGORY_IDS.flatMap((id) => [...PROJECT_SLUGS_BY_CATEGORY[id]]);

export const DEFAULT_PROJECT_TAB: ProjectTabId = "all";

export function getProjectSlugsForTab(tab: ProjectTabId): readonly ProjectSlug[] {
  if (tab === "all") return ALL_PROJECT_SLUGS_IN_TAB_ORDER;
  return PROJECT_SLUGS_BY_CATEGORY[tab];
}
