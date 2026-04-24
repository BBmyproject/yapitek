import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export type AppLocale = (typeof routing.locales)[number];

const FALLBACK_SITE_URL = "https://example.com";
const OG_IMAGE_PATH = "/logo-2.png";

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (!envUrl) {
    return FALLBACK_SITE_URL;
  }

  try {
    return normalizeBaseUrl(new URL(envUrl).toString());
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export function getSiteName(locale: AppLocale): string {
  return locale === "tr" ? "Yapıtek Anka İnşaat" : "Yapitek Anka Construction";
}

export function getDefaultDescription(locale: AppLocale): string {
  return locale === "tr"
    ? "Yapıtek Anka İnşaat; konut, ticari ve karma kullanım projelerinde tasarım ve uygulama deneyimi sunar."
    : "Yapitek Anka Construction delivers design and execution experience across residential, commercial, and mixed-use projects.";
}

export function getHomeTitle(locale: AppLocale): string {
  return locale === "tr"
    ? "Yapıtek Anka İnşaat"
    : "Yapitek Anka Construction";
}

export function getLocalizedPath(locale: AppLocale, page: string): string {
  if (page === "/") {
    return locale === routing.defaultLocale ? "/" : `/${locale}`;
  }

  const routeMap: Record<string, { tr: string; en: string }> = {
    "/about": { tr: "/hakkimizda", en: "/about" },
    "/projects": { tr: "/projeler", en: "/projects" },
    "/contact": { tr: "/iletisim", en: "/contact" },
  };

  const map = routeMap[page];
  const localizedPath = map?.[locale] ?? page;

  if (locale === routing.defaultLocale) {
    return localizedPath;
  }

  return `/${locale}${localizedPath}`;
}

export function getLocalizedProjectPath(locale: AppLocale, slug: string): string {
  const base = locale === "tr" ? "/projeler" : "/projects";
  if (locale === routing.defaultLocale) {
    return `${base}/${slug}`;
  }
  return `/${locale}${base}/${slug}`;
}

export function toAbsoluteUrl(path: string): string {
  return `${getSiteUrl()}${path}`;
}

export function buildPageMetadata(args: {
  locale: AppLocale;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { locale, title, description, path } = args;
  const canonical = toAbsoluteUrl(path);
  const siteName = getSiteName(locale);
  const ogImage = toAbsoluteUrl(OG_IMAGE_PATH);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName,
      images: [
        {
          url: ogImage,
          alt: siteName,
        },
      ],
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
