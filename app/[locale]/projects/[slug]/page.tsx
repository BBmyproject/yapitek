import { ProjectEvartEstatesYalikavakContent } from "@/components/project-detail/ProjectEvartEstatesYalikavakContent";
import { ProjectEvart1Content } from "@/components/project-detail/ProjectEvart1Content";
import { ProjectEvart2Content } from "@/components/project-detail/ProjectEvart2Content";
import { ProjectEvartOranContent } from "@/components/project-detail/ProjectEvartOranContent";
import { ProjectEvartYalikavakContent } from "@/components/project-detail/ProjectEvartYalikavakContent";
import { ProjectHeskaContent } from "@/components/project-detail/ProjectHeskaContent";
import { ProjectParkRoyalResidenceContent } from "@/components/project-detail/ProjectParkRoyalResidenceContent";
import { ProjectParkRoyalVenueContent } from "@/components/project-detail/ProjectParkRoyalVenueContent";
import { ProjectAmfiTiyatroUyanikContent } from "@/components/project-detail/ProjectAmfiTiyatroUyanikContent";
import { ProjectAbidinPasaKutuphanesiContent } from "@/components/project-detail/ProjectAbidinPasaKutuphanesiContent";
import { ProjectKirimSudakContent } from "@/components/project-detail/ProjectKirimSudakContent";
import { ProjectSehitlikContent } from "@/components/project-detail/ProjectSehitlikContent";
import { ProjectSayhanHukukContent } from "@/components/project-detail/ProjectSayhanHukukContent";
import { ProjectValiErdoganContent } from "@/components/project-detail/ProjectValiErdoganContent";
import { ProjectZirvekentContent } from "@/components/project-detail/ProjectZirvekentContent";
import { ProjectImzaGokdemirContent } from "@/components/project-detail/ProjectImzaGokdemirContent";
import { ProjectDocsVadiContent } from "@/components/project-detail/ProjectDocsVadiContent";
import { ProjectIncekLourenContent } from "@/components/project-detail/ProjectIncekLourenContent";
import { ProjectKumasContent } from "@/components/project-detail/ProjectKumasContent";
import { ProjectMayLifeIncekContent } from "@/components/project-detail/ProjectMayLifeIncekContent";
import { ProjectDetailHero } from "@/components/ProjectDetailHero";
import { ProjectDetailOtherProjects } from "@/components/ProjectDetailOtherProjects";
import {
  PROJECT_COVERS,
  isProjectSlug,
  PROJECT_SLUGS,
  type ProjectSlug,
} from "@/lib/projects";
import {
  buildPageMetadata,
  getLocalizedProjectPath,
  getSiteName,
  toAbsoluteUrl,
  type AppLocale,
} from "@/lib/seo";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  params?: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return {};
  }
  const { locale, slug } = resolvedParams;
  if (!hasLocale(routing.locales, locale) || !isProjectSlug(slug)) {
    return {};
  }
  const s = slug as ProjectSlug;
  const currentLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "ProjectDetail" });
  const path = getLocalizedProjectPath(currentLocale, slug);

  return {
    ...buildPageMetadata({
      locale: currentLocale,
      title: t(`items.${s}.metaTitle`),
      description: t(`items.${s}.metaDescription`),
      path,
    }),
    alternates: {
      canonical: path,
      languages: {
        tr: getLocalizedProjectPath("tr", slug),
        en: getLocalizedProjectPath("en", slug),
        "x-default": getLocalizedProjectPath("tr", slug),
      },
    },
    openGraph: {
      ...buildPageMetadata({
        locale: currentLocale,
        title: t(`items.${s}.metaTitle`),
        description: t(`items.${s}.metaDescription`),
        path,
      }).openGraph,
      images: [
        {
          url: toAbsoluteUrl(PROJECT_COVERS[s]),
          alt: t(`items.${s}.heroImageAlt`),
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    notFound();
  }
  const { locale, slug } = resolvedParams;

  if (!isProjectSlug(slug)) {
    notFound();
  }

  setRequestLocale(locale);
  const currentLocale = hasLocale(routing.locales, locale)
    ? (locale as AppLocale)
    : "tr";
  const t = await getTranslations("ProjectDetail");
  const projectTitle = t(`items.${slug}.heroTitle`);
  const projectDescription = t(`items.${slug}.metaDescription`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projectTitle,
    description: projectDescription,
    url: toAbsoluteUrl(getLocalizedProjectPath(currentLocale, slug)),
    inLanguage: currentLocale,
    image: toAbsoluteUrl(PROJECT_COVERS[slug]),
    creator: {
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
      <ProjectDetailHero slug={slug} />
      <div className="h-dvh hidden md:block shrink-0" aria-hidden />
      {slug === "evart-oran" ? (
        <ProjectEvartOranContent />
      ) : slug === "evart-1" ? (
        <ProjectEvart1Content />
      ) : slug === "evart-2" ? (
        <ProjectEvart2Content />
      ) : slug === "evart-yalikavak" ? (
        <ProjectEvartYalikavakContent />
      ) : slug === "evart-mansion-yalikavak" ? (
        <ProjectEvartEstatesYalikavakContent />
      ) : slug === "imza-gokdemir" ? (
        <ProjectImzaGokdemirContent />
      ) : slug === "may-life-incek" ? (
        <ProjectMayLifeIncekContent />
      ) : slug === "docs-vadi" ? (
        <ProjectDocsVadiContent />
      ) : slug === "park-royal-residence" ? (
        <ProjectParkRoyalResidenceContent />
      ) : slug === "park-royal-venue" ? (
        <ProjectParkRoyalVenueContent />
      ) : slug === "heska" ? (
        <ProjectHeskaContent />
      ) : slug === "zirvekent" ? (
        <ProjectZirvekentContent />
      ) : slug === "vali-erdogan" ? (
        <ProjectValiErdoganContent />
      ) : slug === "abidin-pasa-kutuphanesi" ? (
        <ProjectAbidinPasaKutuphanesiContent />
      ) : slug === "amfi-tiyatro-uyanik" ? (
        <ProjectAmfiTiyatroUyanikContent />
      ) : slug === "kirim-sudak" ? (
        <ProjectKirimSudakContent />
      ) : slug === "sehitlik" ? (
        <ProjectSehitlikContent />
      ) : slug === "sayhan-hukuk" ? (
        <ProjectSayhanHukukContent />
      ) : slug === "incek-louren" ? (
        <ProjectIncekLourenContent />
      ) : slug === "kumas" ? (
        <ProjectKumasContent />
      ) : (
        <div
          id="project-icerik"
          className="relative z-10 bg-[#f9f6f3] px-6 py-16 text-center text-[#1f3a40]/75 lg:px-10"
        >
          <p className="mx-auto max-w-xl text-sm leading-relaxed md:text-base">
            {t("placeholder")}
          </p>
        </div>
      )}
      <ProjectDetailOtherProjects locale={locale} currentSlug={slug} />
    </>
  );
}
