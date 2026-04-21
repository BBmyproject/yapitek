"use client";

import { Link } from "@/i18n/navigation";
import { PROJECT_COVERS, type ProjectSlug } from "@/lib/projects";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ROW_LAYOUT = ["image-left", "text-left", "image-left", "text-left"] as const;

const SHOWCASE_PROJECT_GROUPS: readonly (readonly ProjectSlug[])[] = [
  [
    "evart-oran",
    "evart-yalikavak",
    "evart-mansion-yalikavak",
    "may-life-incek",
    "park-royal-residence",
    "docs-vadi",
  ],
  ["heska", "incek-louren", "park-royal-venue"],
  ["zirvekent", "vali-erdogan"],
  [
    "abidin-pasa-kutuphanesi",
    "amfi-tiyatro-uyanik",
    "kirim-sudak",
    "sehitlik",
    "sayhan-hukuk",
    "kumas",
  ],
] as const;

const SHOWCASE_AUTOPLAY_MS = [2000, 4000, 5500, 6500] as const;

function ShowcaseProjectsCarousel({
  slugs,
  autoplayMs,
}: {
  slugs: readonly ProjectSlug[];
  autoplayMs: number;
}) {
  const tProjects = useTranslations("ProjectsPage");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    let autoplayId: number | null = null;
    let resumeId: number | null = null;

    const stopAutoplay = () => {
      if (autoplayId !== null) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayId = window.setInterval(() => {
        emblaApi.scrollNext();
      }, autoplayMs);
    };

    const pauseAndResume = () => {
      stopAutoplay();
      if (resumeId !== null) window.clearTimeout(resumeId);
      resumeId = window.setTimeout(() => startAutoplay(), 2000);
    };

    startAutoplay();
    emblaApi.on("pointerDown", pauseAndResume);

    return () => {
      stopAutoplay();
      if (resumeId !== null) window.clearTimeout(resumeId);
      emblaApi.off("pointerDown", pauseAndResume);
    };
  }, [autoplayMs, emblaApi]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#d1dfdf]/40" ref={emblaRef}>
      <div className="flex h-full touch-pan-y">
        {slugs.map((slug) => (
          <Link
            key={slug}
            href={{ pathname: "/projects/[slug]", params: { slug } }}
            className="group relative h-full min-w-0 shrink-0 basis-full"
          >
            <img
              src={PROJECT_COVERS[slug]}
              alt={tProjects(`cards.${slug}.title`)}
              width={1536}
              height={1024}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
          </Link>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 z-10 bg-black/45 px-3 py-2 backdrop-blur-sm">
        <p className="font-serif text-sm tracking-wide text-white md:text-base">
          {tProjects(`cards.${slugs[selectedIndex]}.title`)}
        </p>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const t = useTranslations("ProjectShowcase");

  return (
    <section
      id="projeler"
      className="w-full pb-12 lg:pb-20 text-[#1f3a40]"
      aria-labelledby="project-showcase-heading"
    >
      <p className="px-4 text-center tracking-tight text-[#0f677d]">{t("description")}</p>
      <h2
        id="project-showcase-heading"
        className="px-4 pb-8 pt-8 text-center font-serif text-3xl tracking-tight text-[#1f3a40] md:text-6xl md:pb-16"
      >
        {t("title")}
      </h2>

      <div className="w-full">
        {ROW_LAYOUT.map((layout, index) => {
          const textFirst = layout === "text-left";
          return (
            <article
              key={index}
              className="grid w-full grid-cols-1 md:sticky md:top-0 md:h-[600px] md:grid-cols-2"
              style={{ zIndex: (index + 1) * 5 }}
            >
              <div className={textFirst ? "order-1 md:h-[600px]" : "order-2 md:order-1 md:h-[600px]"}>
                {textFirst ? (
                  <div className="flex h-full items-center justify-center text-center px-8 py-8 md:px-16 lg:px-24 bg-[#ecf2f2]">
                    <div className="max-w-[300px] space-y-4">
                      <h3 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                        {t(`items.${index}.heading`)}
                      </h3>
                      <p className="text-base leading-relaxed">
                        {t(`items.${index}.line1`)}
                      </p>
                      <p className="text-base leading-relaxed">
                        {t(`items.${index}.line2`)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <ShowcaseProjectsCarousel
                    slugs={SHOWCASE_PROJECT_GROUPS[index]}
                    autoplayMs={SHOWCASE_AUTOPLAY_MS[index]}
                  />
                )}
              </div>

              <div className={textFirst ? "order-2 md:h-[600px]" : "order-1 md:order-2 md:h-[600px]"}>
                {textFirst ? (
                  <ShowcaseProjectsCarousel
                    slugs={SHOWCASE_PROJECT_GROUPS[index]}
                    autoplayMs={SHOWCASE_AUTOPLAY_MS[index]}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-center px-8 py-8 md:px-16 lg:px-24 bg-[#ecf2f2]">
                    <div className="max-w-[300px] space-y-4">
                      <h3 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                        {t(`items.${index}.heading`)}
                      </h3>
                      <p className="text-base leading-relaxed">
                        {t(`items.${index}.line1`)}
                      </p>
                      <p className="text-base leading-relaxed">
                        {t(`items.${index}.line2`)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
