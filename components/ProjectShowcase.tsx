"use client";

import { Link } from "@/i18n/navigation";
import { PROJECT_SLUGS_BY_CATEGORY } from "@/lib/project-categories";
import { PROJECT_COVERS } from "@/lib/projects";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";

export default function ProjectShowcase() {
  const t = useTranslations("ProjectShowcase");
  const tProjects = useTranslations("ProjectsPage");
  const tHomeLastProjects = useTranslations("HomeLastProjects");
  const housingSlugs = PROJECT_SLUGS_BY_CATEGORY.housing;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const id = window.setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
        return;
      }
      emblaApi.scrollTo(0);
    }, 4000);

    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <section
      id="projeler"
      className="w-full pb-12 lg:pb-20 text-[#1f3a40]"
      aria-labelledby="project-showcase-heading"
    >
      <h2
        id="project-showcase-heading"
        className="px-4 pb-8 pt-8 text-center font-serif text-3xl tracking-tight text-[#1f3a40] md:text-6xl md:pb-16"
      >
        {t("title")}
      </h2>
      <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
        <div className="relative">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#00000066] text-white transition-transform active:scale-95 md:left-3"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#00000066] text-white transition-transform active:scale-95 md:right-3"
          >
            <span aria-hidden>›</span>
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {housingSlugs.map((slug) => (
                <div key={slug} className="min-w-0 shrink-0 basis-[84%] pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link
                    href={{ pathname: "/projects/[slug]", params: { slug } }}
                    className="group block h-full overflow-hidden bg-white"
                  >
                    <img
                      src={PROJECT_COVERS[slug]}
                      alt={tProjects(`cards.${slug}.title`)}
                      width={900}
                      height={620}
                      className="h-[220px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] md:h-[250px]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="space-y-2 px-5 py-5">
                      <h4 className="font-serif text-xl tracking-tight text-[#1f3a40]">
                        {tProjects(`cards.${slug}.title`)}
                      </h4>
                      <p className="line-clamp-3 text-sm leading-relaxed text-[#1f3a40]/85">
                        {tProjects(`cards.${slug}.excerpt`)}
                      </p>
                      <span className="inline-flex pt-1 font-serif text-xs font-semibold uppercase tracking-wide text-[#0f677d] underline-offset-4 transition-opacity group-hover:underline">
                        {tProjects("cardCta")}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center md:mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center border border-[#1f3a40]/25 bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1f3a40] transition-colors hover:border-[#0f677d] hover:bg-[#ecf2f2] hover:text-[#0f677d]"
          >
            {tHomeLastProjects("allProjectsCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
