import { AboutApproachSection } from "@/components/AboutApproachSection";
import { AboutOurStorySection } from "@/components/AboutOurStorySection";
import AboutSection from "@/components/AboutSection";
import { AboutPageHero } from "@/components/AboutPageHero";
import {
  buildPageMetadata,
  getLocalizedPath,
  getSiteName,
  toAbsoluteUrl,
  type AppLocale,
} from "@/lib/seo";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    ...buildPageMetadata({
      locale: currentLocale,
      title: t("metaTitle"),
      description: t("metaDescription"),
      path: getLocalizedPath(currentLocale, "/about"),
    }),
    alternates: {
      canonical: getLocalizedPath(currentLocale, "/about"),
      languages: {
        tr: getLocalizedPath("tr", "/about"),
        en: getLocalizedPath("en", "/about"),
        "x-default": getLocalizedPath("tr", "/about"),
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return null;
  }
  const { locale } = resolvedParams;
  setRequestLocale(locale);
  const currentLocale = hasLocale(routing.locales, locale)
    ? (locale as AppLocale)
    : "tr";
  const t = await getTranslations({ locale: currentLocale, namespace: "AboutPage" });

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: toAbsoluteUrl(getLocalizedPath(currentLocale, "/about")),
    inLanguage: currentLocale,
    publisher: {
      "@type": "Organization",
      name: getSiteName(currentLocale),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutPageHero />
      <div className="h-dvh hidden md:block shrink-0" aria-hidden />
      <div className="relative z-10 bg-[#f9f6f3]">
        <AboutSection showHeading={false} showSignature={false} />
        <AboutOurStorySection />
        <AboutApproachSection />
      </div>
    </>
  );
}
