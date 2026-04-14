"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/** Yalnız 3. ve 6. slayt 400×480; diğerleri 600×480 */
const SLIDE_SPECS = [
  { w: 600},
  { w: 600},
  { w: 400},
  { w: 600},
  { w: 600},
  { w: 400},
] as const;

/** Evart Oran + Evart Yalıkavak (public/images) */
const SLIDE_SRC = [
  "/images/evart-estates.jpeg",
  "/images/evart-yalikava-6.jpeg",
  "/images/evart-oran.jpg",
  "/images/docs-vadi.webp",
  "/images/imza-gokdemir.jpeg",
  "/images/may-life-incek.jpg",
] as const;

function slideWidthClass(w: 600 | 400) {
  return w === 600
    ? "w-[min(600px,calc(100vw-7rem))]"
    : "w-[min(400px,calc(100vw-7rem))]";
}

export default function PhotoGallery() {
  const t = useTranslations("PhotoGallery");
  const galleryViewportRef = useRef<HTMLDivElement | null>(null);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  const [selected, setSelected] = useState(0);

  const slides = useMemo(
    () =>
      SLIDE_SPECS.map((spec, i) => ({
        ...spec,
        src: SLIDE_SRC[i],
        key: `${spec.w}-${i}`,
      })),
    [],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    queueMicrotask(onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const section = galleryViewportRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGalleryVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const dotCount = emblaApi?.scrollSnapList().length ?? slides.length;

  return (
    <section
      className="w-full text-[#1f3a40] pt-8 lg:pt-15"
      aria-labelledby="photo-gallery-heading"
    >
      <p className="px-4 text-center tracking-tight text-[#0f677d]">
        {t("description")}
      </p>
      <h2
        id="photo-gallery-heading"
        className="px-4 pb-6 pt-8 text-center font-serif text-3xl tracking-tight text-[#1f3a40] md:text-6xl md:pb-14"
      >
        {t("title")}
      </h2>

      <div className="relative w-full">
        <button
          type="button"
          aria-label={t("prev")}
          onClick={scrollPrev}
          className="absolute cursor-pointer left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0003] text-white transition-all duration-150 active:scale-[0.92] md:left-5 md:h-12 md:w-12"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={t("next")}
          onClick={scrollNext}
          className="absolute cursor-pointer right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0003] text-white transition-all duration-150 active:scale-[0.92] md:right-5 md:h-12 md:w-12"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className={`overflow-hidden transition-all duration-700 ease-out ${
            isGalleryVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          ref={(node) => {
            emblaRef(node);
            galleryViewportRef.current = node;
          }}
        >
          <div className="flex touch-pan-y gap-6">
            {slides.map((slide, index) => (
              <div
                key={slide.key}
                className={`relative shrink-0 overflow-hidden bg-[#d1dfdf]/40 h-[360px] lg:h-[480px] ${slideWidthClass(slide.w)}`}
              >
                <img
                  src={slide.src}
                  alt={t("slideAlt", { n: index + 1 })}
                  width={slide.w}
                  height={480}
                  className="h-full w-full object-cover"
                  sizes={
                    slide.w === 600
                      ? "(max-width: 768px) min(600px, 100vw), 600px"
                      : "(max-width: 768px) min(400px, 100vw), 400px"
                  }
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[#000000]/20"
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 px-4"
          role="tablist"
          aria-label={t("dotsLabel")}
        >
          {Array.from({ length: dotCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-label={t("goToSlide", { n: i + 1 })}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer active:scale-75 ${
                selected === i
                  ? "w-8 bg-[#f9f6f3]"
                  : "w-2 bg-[#f9f6f3]/30 hover:bg-[#f9f6f3]/50"
              }`}
            />
          ))}
        </div>
      </div>
      <div
        className="mx-auto flex w-full max-w-[1440px] items-center gap-0 px-6 pt-10 lg:pt-25 pb-10"
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
