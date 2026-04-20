"use client";

import { HeroBackdropLayer } from "@/components/HeroBackdropLayer";
import { HeroFadeUpContent } from "@/components/HeroFadeUpContent";
import { Link } from "@/i18n/navigation";
import { ShiftHoverText } from "@/components/ui/ShiftHoverText";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

export const HERO_BANNER_IMAGE =
  "/images/hero-banner-poster.png";
export const HERO_BANNER_VIDEO =
  "/images/hero-banner.mp4";
const HERO_BANNER_EXTRA_IMAGES = [
  "/images/hero-banner-2.png",
  "/images/hero-banner-3.png",
] as const;
const HERO_BANNER_MOBILE_PROJECT_LINKS = [
  { label: "Evart Estates", slug: "evart-estates-yalikavak" },
  { label: "Evart Oran", slug: "evart-oran" },
  { label: "Evart Yalikavak", slug: "evart-yalikavak" },
] as const;

export function HeroBanner() {
  const t = useTranslations("HeroBanner");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: false,
  });

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
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches || selected !== 0) {
        video.pause();
        video.removeAttribute("autoplay");
        return;
      }
      video.setAttribute("autoplay", "");
      void video.play().catch(() => {});
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [selected]);

  useEffect(() => {
    if (!emblaApi) return;

    const intervalId = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [emblaApi]);

  const dotCount = emblaApi?.scrollSnapList().length ?? 3;
  const selectedProject =
    HERO_BANNER_MOBILE_PROJECT_LINKS[
      selected % HERO_BANNER_MOBILE_PROJECT_LINKS.length
    ];

  return (
    <section
      aria-label={t("sectionLabel")}
      className="pointer-events-none relative md:fixed inset-0 z-0 md:h-dvh md:min-h-dvh w-full overflow-hidden"
    >
      <HeroBackdropLayer>
        <div
          className="pointer-events-auto h-full w-full overflow-hidden md:pointer-events-none"
          ref={emblaRef}
        >
          <div className="flex h-full touch-pan-y">
            <div className="min-h-[300px] md:min-h-auto md:h-full min-w-0 flex-[0_0_100%]">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={HERO_BANNER_IMAGE}
                aria-label={t("imageAlt")}
              >
                <source src={HERO_BANNER_VIDEO} type="video/mp4" />
              </video>
            </div>
            {HERO_BANNER_EXTRA_IMAGES.map((src, idx) => (
              <div key={src} className="min-h-[300px] md:min-h-auto md:h-full min-w-0 flex-[0_0_100%]">
                <img
                  src={src}
                  alt={`${t("imageAlt")} ${idx + 2}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-0 bg-linear-to-b from-black/55 via-black/45 to-black/60"
          aria-hidden
        />
      </HeroBackdropLayer>

      <div className="pointer-events-auto relative z-10 hidden h-full flex-col items-center justify-center px-6 text-center text-white md:flex">
        <HeroFadeUpContent>
          <div className="flex max-w-4xl flex-col items-center pb-12 pt-[clamp(5rem,12vh,7rem)]">
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3.75rem)] font-medium leading-tight tracking-tight md:leading-snug">
              {t("title")}
            </h1>
            <p className="mt-4 md:mt-6 max-w-xl md:max-w-2xl text-base leading-relaxed text-white/88 md:text-lg md:leading-relaxed">
              {t("description")}
            </p>
            <Link
              href="/contact"
              className="group mt-4 md:mt-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-[#d9cdb8] bg-linear-to-r from-[#fcf9f6] to-[#f1ebe4] px-7 py-2.5 text-lg font-medium text-[#1f3a40] shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:from-white hover:to-[#f5efe9] hover:shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
            >
              <ShiftHoverText
                selfGroup={false}
                variant="comfortable"
                lineClassName="whitespace-nowrap text-base md:text-lg font-medium text-current"
              >
                {t("cta")}
              </ShiftHoverText>
            </Link>
          </div>
        </HeroFadeUpContent>
      </div>

      <div className="pointer-events-none absolute bottom-16 right-4 z-20 md:hidden">
        <Link
          href={{
            pathname: "/projects/[slug]",
            params: { slug: selectedProject.slug },
          }}
          className="pointer-events-auto inline-flex items-center rounded-full border border-white/35 bg-white/45 px-3 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          {selectedProject.label}
        </Link>
      </div>

      <div
        className="pointer-events-auto absolute bottom-5 left-1/2 z-20 flex flex-wrap items-center justify-center gap-2 px-4 -translate-x-1/2"
        role="tablist"
        aria-label="Hero slides"
      >
        {Array.from({ length: dotCount }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={selected === i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-200 cursor-pointer active:scale-75 ${
              selected === i
                ? "w-8 bg-[#f9f6f3]"
                : "w-2 bg-[#f9f6f3]/30 hover:bg-[#f9f6f3]/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
