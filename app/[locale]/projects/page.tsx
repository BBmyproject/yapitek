import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ProjectsIndexHero } from "@/components/ProjectsIndexHero";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProjectsPage");

  return (
    <>
      <ProjectsIndexHero />
      <div className="h-dvh shrink-0" aria-hidden />
      <div className="relative z-10 bg-[#f9f6f3] px-6 pb-20 pt-12 text-[#1f3a40] lg:px-10 lg:pt-16">
        <div>
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[#1f3a40]/78 md:text-base">
            {t("intro")}
          </p>
          <div className="mt-14">
            <ProjectsGrid />
          </div>
        </div>
      </div>
    </>
  );
}
