"use client";

import { HeroBackdropLayer } from "@/components/HeroBackdropLayer";
import { HeroFadeUpContent } from "@/components/HeroFadeUpContent";
import type { ProjectSlug } from "@/lib/projects";
import { PROJECT_COVERS } from "@/lib/projects";
import { useTranslations } from "next-intl";

type ProjectDetailHeroProps = {
  slug: ProjectSlug;
};

/** Tek ek paragraf (heroLead2) — estates, imza vb. */
const HERO_EXTRA_SINGLE_SLUGS: ReadonlySet<ProjectSlug> = new Set([
  "evart-mansion-yalikavak",
  "imza-gokdemir",
]);

/** İkinci + üçüncü hero paragrafı (heroLead2, heroLead3) */
const HERO_TRIPLE_PARAGRAPH_SLUGS: ReadonlySet<ProjectSlug> = new Set([
  "evart-yalikavak",
  "may-life-incek",
  "docs-vadi",
]);

/** #project-icerik CTA */
const HERO_EXPLORE_CTA_SLUGS: ReadonlySet<ProjectSlug> = new Set([
  "evart-oran",
  "evart-1",
  "evart-2",
  "evart-yalikavak",
  "evart-mansion-yalikavak",
  "imza-gokdemir",
  "may-life-incek",
  "docs-vadi",
  "park-royal-residence",
  "park-royal-venue",
  "heska",
  "zirvekent",
  "vali-erdogan",
  "abidin-pasa-kutuphanesi",
  "amfi-tiyatro-uyanik",
  "kirim-sudak",
  "sehitlik",
  "sayhan-hukuk",
  "incek-louren",
  "kumas",
]);

export function ProjectDetailHero({ slug }: ProjectDetailHeroProps) {
  const t = useTranslations("ProjectDetail");
  const tCards = useTranslations("ProjectsPage");

  return (
    <section
      aria-label={t(`items.${slug}.heroSectionLabel`)}
      className="pointer-events-none relative md:fixed inset-0 z-0 md:h-dvh md:min-h-dvh w-full overflow-hidden"
    >
      <HeroBackdropLayer>
        <img
          src={PROJECT_COVERS[slug]}
          alt={t(`items.${slug}.heroImageAlt`)}
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
          <div className="flex max-w-4xl flex-col items-center pb-8 md:pb-12 pt-8 md:pt-[clamp(5rem,12vh,7rem)]">
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,4.75rem)] font-medium leading-tight text-[#1f3a40] md:text-white">
              {t(`items.${slug}.heroTitle`)}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-serif text-[#1f3a40] md:text-white md:text-xl">
              {t(`items.${slug}.heroLead`)}
            </p>
            {HERO_TRIPLE_PARAGRAPH_SLUGS.has(slug) ? (
              <>
                <p className="mt-5 max-w-2xl text-base font-serif leading-relaxed text-[#1f3a40] md:text-white/92 md:text-lg md:leading-relaxed">
                  {t(`items.${slug}.heroLead2` as never)}
                </p>
                <p className="mt-5 max-w-2xl text-base font-serif leading-relaxed text-[#1f3a40] md:text-white/92 md:text-lg md:leading-relaxed">
                  {t(`items.${slug}.heroLead3` as never)}
                </p>
              </>
            ) : null}
            {HERO_EXTRA_SINGLE_SLUGS.has(slug) ? (
              <p className="mt-5 max-w-2xl text-base font-serif leading-relaxed text-[#1f3a40] md:text-white/92 md:text-lg md:leading-relaxed">
                {t(`items.${slug}.heroLead2` as never)}
              </p>
            ) : null}
            {HERO_EXPLORE_CTA_SLUGS.has(slug) ? (
              <a
                href="#project-icerik"
                className="mt-10 inline-flex max-w-xl cursor-pointer items-center justify-center bg-[#f9f6f3] px-5 py-2 text-center text-lg font-medium text-balance text-[#1f3a40] transition-colors duration-300 ease-out hover:bg-white hover:shadow-md"
              >
                {tCards(`cards.${slug}.title` as never)}
              </a>
            ) : null}
          </div>
        </HeroFadeUpContent>
      </div>
    </section>
  );
}
