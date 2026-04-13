"use client";

import { HeroBackdropLayer } from "@/components/HeroBackdropLayer";
import { HeroFadeUpContent } from "@/components/HeroFadeUpContent";
import { Link } from "@/i18n/navigation";
import { ShiftHoverText } from "@/components/ui/ShiftHoverText";
import { useTranslations } from "next-intl";

export const HERO_BANNER_IMAGE =
  "/images/evart-oran.jpg";

export function HeroBanner() {
  const t = useTranslations("HeroBanner");

  return (
    <section
      aria-label={t("sectionLabel")}
      className="pointer-events-none fixed inset-0 z-0 h-dvh min-h-dvh w-full overflow-hidden"
    >
      <HeroBackdropLayer>
        <img
          src={HERO_BANNER_IMAGE}
          alt={t("imageAlt")}
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
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3.75rem)] font-medium leading-tight tracking-tight md:leading-snug">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/88 md:text-lg md:leading-relaxed">
              {t("description")}
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex cursor-pointer items-center justify-center border border-white/35 bg-white/15 px-7 py-2.5 text-lg font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#1f3a40] hover:shadow-[0_14px_34px_rgba(0,0,0,0.3)]"
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
