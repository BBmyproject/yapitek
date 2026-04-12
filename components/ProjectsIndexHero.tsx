"use client";

import { HeroBackdropLayer } from "@/components/HeroBackdropLayer";
import { HeroFadeUpContent } from "@/components/HeroFadeUpContent";
import { useTranslations } from "next-intl";

const PROJECTS_HERO_IMAGE =
  "/images/evart-oran-3.jpg";

export function ProjectsIndexHero() {
  const t = useTranslations("ProjectsPage");

  return (
    <section
      aria-label={t("heroSectionLabel")}
      className="pointer-events-none fixed inset-0 z-0 h-dvh min-h-dvh w-full overflow-hidden"
    >
      <HeroBackdropLayer>
        <img
          src={PROJECTS_HERO_IMAGE}
          alt={t("heroImageAlt")}
          width={1440}
          height={800}
          className="h-full w-full object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-black/55 via-black/45 to-black/60"
          aria-hidden
        />
      </HeroBackdropLayer>

      <div className="pointer-events-auto relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <HeroFadeUpContent>
          <div className="flex max-w-4xl flex-col items-center pb-12 pt-[clamp(5rem,12vh,7rem)]">
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3.25rem)] font-medium leading-tight tracking-tight md:leading-snug">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/88 md:text-lg md:leading-relaxed">
              {t("lead")}
            </p>
          </div>
        </HeroFadeUpContent>
      </div>
    </section>
  );
}
