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
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3.25rem)] font-medium leading-tight tracking-tight md:leading-snug">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/88 md:text-lg md:leading-relaxed">
              {t("description")}
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex cursor-pointer items-center justify-center bg-[#f9f6f3] px-5 py-1 text-lg font-medium text-[#1f3a40] transition-colors duration-300 ease-out hover:bg-white hover:shadow-md"
            >
              <ShiftHoverText
                selfGroup={false}
                variant="comfortable"
                lineClassName="whitespace-nowrap text-base md:text-lg font-medium text-[#1f3a40]"
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
