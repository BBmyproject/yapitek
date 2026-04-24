import { HeroBanner } from "@/components/HeroBanner";
import { HomeEntryLoader } from "@/components/HomeEntryLoader";
import { HomeLastProjects } from "@/components/HomeLastProjects";
import PhotoGallery from "@/components/PhotoGallery";
import ProjectShowcase from "@/components/ProjectShowcase";
import AboutSection from "@/components/AboutSection";
import {
  buildPageMetadata,
  getDefaultDescription,
  getHomeTitle,
  getLocalizedPath,
  getSiteName,
  toAbsoluteUrl,
  type AppLocale,
} from "@/lib/seo";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

type Props = {
  params?: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return {};
  }
  const { locale } = resolvedParams;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const currentLocale = locale as AppLocale;
  return {
    ...buildPageMetadata({
      locale: currentLocale,
      title: getHomeTitle(currentLocale),
      description: getDefaultDescription(currentLocale),
      path: getLocalizedPath(currentLocale, "/"),
    }),
    alternates: {
      canonical: getLocalizedPath(currentLocale, "/"),
      languages: {
        tr: getLocalizedPath("tr", "/"),
        en: getLocalizedPath("en", "/"),
        "x-default": getLocalizedPath("tr", "/"),
      },
    },
    category: currentLocale === "tr" ? "anasayfa" : "home",
  };
}

export default async function Home({ params }: Props) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return null;
  }
  const { locale } = resolvedParams;
  const currentLocale = hasLocale(routing.locales, locale)
    ? (locale as AppLocale)
    : "tr";

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": toAbsoluteUrl("/#organization"),
        name: getSiteName(currentLocale),
        url: toAbsoluteUrl(getLocalizedPath(currentLocale, "/")),
        logo: toAbsoluteUrl("/favicon.ico"),
      },
      {
        "@type": "Brand",
        "@id": toAbsoluteUrl("/#brand"),
        name: getSiteName(currentLocale),
        url: toAbsoluteUrl(getLocalizedPath(currentLocale, "/")),
      },
      {
        "@type": "WebSite",
        "@id": toAbsoluteUrl("/#website"),
        url: toAbsoluteUrl(getLocalizedPath(currentLocale, "/")),
        name: getSiteName(currentLocale),
        inLanguage: currentLocale,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeEntryLoader />
      <HeroBanner />
      {/* Sabit hero için akışta yer tutar: kaydırınca sonraki bölümler üstte gelir */}
      <div className="h-dvh hidden md:block shrink-0" aria-hidden />
      <main
        id="content"
        className="relative z-10 text-foreground bg-[#f9f6f3]"
      >
        <AboutSection />
        <HomeLastProjects />
        <PhotoGallery />
        <ProjectShowcase />
      </main>
    </>
  );
}
