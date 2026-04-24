import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ProjectsIndexHero } from "@/components/ProjectsIndexHero";
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
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return {
    ...buildPageMetadata({
      locale: currentLocale,
      title: t("metaTitle"),
      description: t("metaDescription"),
      path: getLocalizedPath(currentLocale, "/projects"),
    }),
    alternates: {
      canonical: getLocalizedPath(currentLocale, "/projects"),
      languages: {
        tr: getLocalizedPath("tr", "/projects"),
        en: getLocalizedPath("en", "/projects"),
        "x-default": getLocalizedPath("tr", "/projects"),
      },
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return null;
  }
  const { locale } = resolvedParams;
  setRequestLocale(locale);
  const currentLocale = hasLocale(routing.locales, locale)
    ? (locale as AppLocale)
    : "tr";
  const t = await getTranslations("ProjectsPage");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: toAbsoluteUrl(getLocalizedPath(currentLocale, "/projects")),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsIndexHero />
      <div className="h-dvh hidden md:block shrink-0" aria-hidden />
      <section className="relative overflow-x-clip bg-[#f9f6f3] text-[#1f3a40]">
          <div className="sticky hidden md:block top-0 z-0 h-screen overflow-hidden">
            <div className="relative left-1/2 h-screen w-screen -translate-x-1/2">
              <img
                src="/bg-logo-left.gif"
                alt=""
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-full object-contain opacity-60"
                style={{
                  aspectRatio: "auto 803 / 674",
                  maxWidth: "451px",
                  maxHeight: "373px",
                  filter: "blur(5px)",
                }}
              />
              <img
                src="/bg-logo-right.gif"
                alt=""
                aria-hidden="true"
                className="absolute -bottom-[20px] right-0 h-full w-full object-contain opacity-60"
                style={{
                  aspectRatio: "auto 803 / 674",
                  maxWidth: "451px",
                  maxHeight: "373px",
                  transform: "scaleX(-1)",
                  filter: "blur(5px)",
                }}
              />
            </div>
          </div>

        <div className="relative z-10 px-6 pb-20 pt-12 lg:px-10 lg:pt-16 xl:-mt-[100vh]">
          <div>
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[#1f3a40]/78 md:text-base">
              {t("intro")}
            </p>
            <div className="mt-14">
              <ProjectsGrid />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
