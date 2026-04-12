import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  /** `/` her zaman varsayılan dil (TR); tarayıcı diliyle otomatik /en yönlendirmesini kapatır */
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/about": {
      tr: "/hakkimizda",
      en: "/about",
    },
    "/projects": {
      tr: "/projeler",
      en: "/projects",
    },
    "/projects/[slug]": {
      tr: "/projeler/[slug]",
      en: "/projects/[slug]",
    },
    "/contact": {
      tr: "/iletisim",
      en: "/contact",
    },
  },
});
