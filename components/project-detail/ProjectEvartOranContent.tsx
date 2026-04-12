import { EvartOranSampleCarousels } from "@/components/project-detail/EvartOranSampleCarousels";
import { RevealFadeUp } from "@/components/ui/RevealFadeUp";
import { EVART_ORAN_MEDIA } from "@/lib/evart-oran-media";
import { getTranslations } from "next-intl/server";
import type { IconType } from "react-icons";
import { MdApartment, MdLocalParking, MdPointOfSale, MdStorefront } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";

type StatItem = { value: string; label: string; detail: string };

/** Sıra: proje alanı → ticari → konut → mağaza → otopark */
const STAT_ICONS: IconType[] = [
  TbRulerMeasure,
  MdStorefront,
  MdApartment,
  MdPointOfSale,
  MdLocalParking,
];

export async function ProjectEvartOranContent() {
  const t = await getTranslations("ProjectEvartOran");
  const stats = t.raw("stats") as StatItem[];
  const archBullets = t.raw("archBullets") as string[];
  const socialHighlights = t.raw("socialHighlights") as string[];

  return (
    <article
      id="project-icerik"
      className="relative z-10 bg-[#f9f6f3] text-[#1f3a40]"
    >
      {/* Sayısal blok */}
      <RevealFadeUp>
      <section
        className="border-b border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-20"
        aria-labelledby="evart-stats-heading"
      >
        <div className="mx-auto max-w-[1200px]">
          <h2
            id="evart-stats-heading"
            className="sr-only"
          >
            {t("statsSectionLabel")}
          </h2>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12">
            <aside className="flex shrink-0 flex-col  lg:w-[min(100%,320px)] lg:text-left xl:w-[360px]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                {t("statsFooterKicker")}
              </p>
              <p className="mt-3 font-serif text-2xl leading-tight md:text-3xl">
                {t("statsFooterTitle")}
              </p>
              <p className="mt-4 text-sm leading-relaxed md:text-base">
                {t("statsFooterSubtitle")}
              </p>
            </aside>

            <div className="min-w-0 flex-1">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                {t("statsAreasLabel")}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {stats.map((item, index) => {
                  const Icon = STAT_ICONS[index] ?? STAT_ICONS[0];
                  return (
                    <div
                      key={item.label}
                      className="flex gap-4 border border-[#d1dfe0] bg-white/80 px-5 py-6 shadow-sm sm:px-6 sm:py-7"
                    >
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f677d]/12 text-[#0f677d]"
                        aria-hidden
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 text-left">
                        <p className="font-serif text-2xl font-medium tracking-tight text-[#0f677d] md:text-3xl">
                          {item.value}
                        </p>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#1f3a40]">
                          {item.label}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#1f3a40]/72">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      </RevealFadeUp>

      {/* Proje konsepti */}
      <RevealFadeUp>
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
              {t("conceptKicker")}
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              {t("conceptTitle")}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
              {t("conceptP1")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
              {t("conceptP2")}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#d1dfdf]/50">
            <img
              src={EVART_ORAN_MEDIA.concept}
              alt={t("conceptImageAlt")}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      </RevealFadeUp>

      {/* Mimari */}
      <RevealFadeUp>
      <section className="border-t border-[#d1dfe0] bg-[#eef4f4]/40 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative order-2 aspect-[4/3] overflow-hidden bg-[#d1dfdf]/50 lg:order-1">
            <img
              src={EVART_ORAN_MEDIA.architecture}
              alt={t("archImageAlt")}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
              {t("archKicker")}
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              {t("archTitle")}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
              {t("archBody1")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
              {t("archBody2")}
            </p>
            <ul className="mt-8 space-y-3 border-l-2 border-[#0f677d]/40 pl-5 text-sm text-[#1f3a40]/90 md:text-base">
              {archBullets.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      </RevealFadeUp>

      <RevealFadeUp>
        <EvartOranSampleCarousels />
      </RevealFadeUp>

      {/* Sosyal yaşam */}
      <RevealFadeUp>
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden bg-[#d1dfdf]/50">
            <img
              src={EVART_ORAN_MEDIA.social}
              alt={t("socialImageAlt")}
              width={2100}
              height={900}
              className="h-full w-full object-cover"
              sizes="100vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 to-transparent"
              aria-hidden
            />
          </div>
          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
              {t("socialKicker")}
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              {t("socialTitle")}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
              {t("socialBody")}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {socialHighlights.map((item) => (
                <span
                  key={item}
                  className="border border-[#d1dfe0] bg-white px-4 py-2 text-xs font-medium uppercase tracking-wide text-[#1f3a40] md:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      </RevealFadeUp>

      {/* Lokasyon */}
      <RevealFadeUp>
      <section className="border-t border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
              {t("locationKicker")}
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              {t("locationTitle")}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
              {t("locationBody1")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
              {t("locationBody2")}
            </p>
            <p className="mt-8 inline-flex border border-[#0f677d] bg-[#0f677d]/5 px-5 py-3 text-sm font-semibold text-[#0f677d] md:text-base">
              {t("locationHighlight")}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#d1dfdf]/50">
            <img
              src={EVART_ORAN_MEDIA.location}
              alt={t("locationImageAlt")}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      </RevealFadeUp>

      {/* Kapanış CTA */}
      <RevealFadeUp>
      <section className="border-t border-[#d1dfe0] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
            {t("closingTitle")}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/85 md:text-base md:leading-relaxed">
            {t("closingBody")}
          </p>
        </div>
      </section>
      </RevealFadeUp>
    </article>
  );
}
