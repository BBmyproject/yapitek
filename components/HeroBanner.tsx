"use client";

import { HeroBackdropLayer } from "@/components/HeroBackdropLayer";
import { HeroFadeUpContent } from "@/components/HeroFadeUpContent";
import { Link } from "@/i18n/navigation";
import { ShiftHoverText } from "@/components/ui/ShiftHoverText";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export const HERO_BANNER_IMAGE =
  "/images/hero-banner-poster.png";
export const HERO_BANNER_VIDEO =
  "/images/hero-banner.mp4";

export function HeroBanner() {
  const t = useTranslations("HeroBanner");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
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
  }, []);

  return (
    <section
      aria-label={t("sectionLabel")}
      className="pointer-events-none fixed inset-0 z-0 h-dvh min-h-dvh w-full overflow-hidden"
    >
      <HeroBackdropLayer>
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
        <div
          className="absolute inset-0 bg-linear-to-b from-black/55 via-black/45 to-black/60"
          aria-hidden
        />
      </HeroBackdropLayer>

      <div className="pointer-events-auto relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <HeroFadeUpContent>
          <div className="flex max-w-4xl flex-col items-center pb-12 pt-[clamp(5rem,12vh,7rem)]">
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3.75rem)] font-medium leading-tight tracking-tight md:leading-snug">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/88 md:text-lg md:leading-relaxed">
              {t("description")}
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-[#d9cdb8] bg-linear-to-r from-[#fcf9f6] to-[#f1ebe4] px-7 py-2.5 text-lg font-medium text-[#1f3a40] shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:from-white hover:to-[#f5efe9] hover:shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
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
    </section>
  );
}
