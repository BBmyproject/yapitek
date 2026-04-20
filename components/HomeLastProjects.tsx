"use client";

import { Link } from "@/i18n/navigation";
import {
  HOME_FEATURED_PROJECT_SLUGS,
  PROJECT_COVERS,
  type ProjectSlug,
} from "@/lib/projects";
import { useTranslations } from "next-intl";
import { useState } from "react";

const LINE_GRADIENT =
  "linear-gradient(90deg, rgb(84, 84, 84) 0%, #ecf2f2 100%, rgb(236, 242, 242) 100%)";
const SECTION_END_GRADIENT =
  "linear-gradient(270deg, #ecf2f2 0%, rgb(236, 242, 242) 12%, #1f3a40 50%, rgb(31, 58, 64) 50%, #ecf2f2 88%, rgb(236, 242, 242) 100%)";

export function HomeLastProjects() {
  const t = useTranslations("HomeLastProjects");
  const tPage = useTranslations("ProjectsPage");

  const slugs = HOME_FEATURED_PROJECT_SLUGS as readonly ProjectSlug[];
  const [selected, setSelected] = useState<ProjectSlug>(slugs[0]!);
  const [hovered, setHovered] = useState<ProjectSlug | null>(null);

  return (
    <section
      className="w-full bg-[#f9f6f3] text-[#1f3a40]"
      aria-labelledby="home-last-projects-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-12 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#0f677d]">
              {t("kicker")}
            </p>
            <h2
              id="home-last-projects-heading"
              className="mt-3 font-serif text-2xl font-medium uppercase tracking-[0.08em] text-[#1f3a40] md:text-4xl lg:text-4xl lg:leading-tight"
            >
              {t("title")}
            </h2>
            <p className="mt-5 text-sm font-normal leading-relaxed text-[#1f3a40]/78 md:text-base md:leading-relaxed">
              {t("body")}
            </p>
          </div>
          <div className="shrink-0 md:pt-1">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center border border-[#1f3a40]/25 bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1f3a40] transition-colors hover:border-[#0f677d] hover:bg-[#ecf2f2] hover:text-[#0f677d]"
            >
              {t("allProjectsCta")}
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14 lg:items-center">
          <div className="flex min-w-0 flex-col gap-0" aria-label={t("listLabel")}>
            {slugs.map((slug) => {
              const isSelected = selected === slug;
              const lineOn =
                isSelected || hovered === slug;

              return (
                <div key={slug} className="py-4">
                  <div className="flex w-full min-w-0 flex-col gap-0">
                    <div
                      className="flex w-full min-w-0 items-center gap-4"
                      onMouseEnter={() => setHovered(slug)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelected(slug)}
                        className={`min-w-0 max-w-[min(100%,20rem)] shrink cursor-pointer text-left font-serif text-xl font-medium tracking-tight motion-safe:transition-[color,padding] motion-safe:duration-300 sm:max-w-xs md:max-w-sm md:text-3xl ${
                          lineOn ? "pl-[20px]" : "pl-0"
                        } ${
                          isSelected
                            ? "text-[#1f3a40] hover:text-[#0f677d]"
                            : "text-[#99c0c2] hover:text-[#0f677d]"
                        }`}
                      >
                        {tPage(`cards.${slug}.title`)}
                      </button>
                      <div
                        className="relative h-px min-h-px min-w-0 flex-1 self-center overflow-hidden rounded-full bg-[#ecf2f2]/70"
                        aria-hidden
                      >
                        <span
                          className="absolute inset-y-0 left-0 block h-full w-full origin-left motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
                          style={{
                            background: LINE_GRADIENT,
                            transform: lineOn ? "scaleX(1)" : "scaleX(0)",
                          }}
                        />
                      </div>
                    </div>
                    {isSelected ? (
                      <div className="mt-3 max-w-md md:mt-4 pl-5">
                        <p className="text-sm leading-relaxed text-[#1f3a40]/85 md:text-[0.9375rem] md:leading-relaxed">
                          {tPage(`cards.${slug}.excerpt`)}
                        </p>
                        <Link
                          href={{
                            pathname: "/projects/[slug]",
                            params: { slug },
                          }}
                          className="mt-2 inline-block uppercase text-xs font-medium tracking-wide text-[#0f677d] underline-offset-4 transition-opacity hover:underline md:mt-3"
                        >
                          {t("inspectCta")}
                        </Link>
                        <div className="relative mt-4 min-h-[220px] overflow-hidden bg-[#d1dfe0]/40 lg:hidden">
                          <img
                            src={PROJECT_COVERS[slug]}
                            alt={tPage(`cards.${slug}.title`)}
                            width={1600}
                            height={1067}
                            className="absolute inset-0 h-full w-full object-cover"
                            sizes="100vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    ) : null}
                    {isSelected ? (
                      <div
                        className="mt-6 h-px w-full shrink-0 lg:mt-8"
                        style={{ background: SECTION_END_GRADIENT }}
                        aria-hidden
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="relative hidden min-h-[240px] overflow-hidden bg-[#d1dfe0]/40 lg:block lg:min-h-[min(70vh,520px)]"
            aria-live="polite"
            aria-label={t("previewLabel", {
              title: tPage(`cards.${selected}.title`),
            })}
          >
            {slugs.map((slug) => (
              <img
                key={slug}
                src={PROJECT_COVERS[slug]}
                alt={
                  selected === slug ? tPage(`cards.${slug}.title`) : ""
                }
                aria-hidden={selected !== slug}
                width={1600}
                height={1067}
                className={`absolute inset-0 h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-500 ${
                  selected === slug
                    ? "z-10 opacity-100"
                    : "z-0 opacity-0 pointer-events-none"
                }`}
                sizes="(max-width: 1024px) 100vw, 60vw"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="mx-auto flex w-full max-w-[1440px] items-center gap-0 px-6 pb-10 lg:pb-25 pt-2 lg:pt-10"
        aria-hidden
      >
        <div className="h-px min-w-0 flex-1 bg-[#d1dfe0] dark:bg-[#d1dfe0]" />
          <div
            className="about-section-end-cap relative aspect-square h-[13px] w-[13px] shrink-0 rotate-45 overflow-hidden"
            data-border="true"
          />
        <div className="h-px min-w-0 flex-1 bg-[#d1dfe0] dark:bg-[#d1dfe0]" />
      </div>
    </section>
  );
}
