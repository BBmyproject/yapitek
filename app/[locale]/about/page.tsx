import { AboutApproachSection } from "@/components/AboutApproachSection";
import { AboutOurStorySection } from "@/components/AboutOurStorySection";
import AboutSection from "@/components/AboutSection";
import { AboutPageHero } from "@/components/AboutPageHero";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
