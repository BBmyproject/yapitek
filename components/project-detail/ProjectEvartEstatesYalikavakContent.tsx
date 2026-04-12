import { RevealFadeUp } from "@/components/ui/RevealFadeUp";
import { Link } from "@/i18n/navigation";
import { EVART_ESTATES_MEDIA } from "@/lib/evart-estates-yalikavak-media";
import { getTranslations } from "next-intl/server";
import type { IconType } from "react-icons";
import { FaWater } from "react-icons/fa6";
import { MdHolidayVillage, MdLandscape, MdViewModule } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";

type StatItem = { value: string; label: string; detail: string };
type LocationMetric = { label: string; value: string };

const STAT_ICONS: IconType[] = [
  MdLandscape,
  MdHolidayVillage,
  TbRulerMeasure,
  MdViewModule,
  FaWater,
];

export async function ProjectEvartEstatesYalikavakContent() {
  const t = await getTranslations("ProjectEvartEstates");
  const stats = t.raw("stats") as StatItem[];
  const archBullets = t.raw("archBullets") as string[];
  const socialList = t.raw("socialList") as string[];
  const techList = t.raw("techList") as string[];
  const locationMetrics = t.raw("locationMetrics") as LocationMetric[];
  const investmentBullets = t.raw("investmentBullets") as string[];

  return (
    <article
      id="project-icerik"
      className="relative z-10 bg-[#f9f6f3] text-[#1f3a40]"
    >
      <RevealFadeUp>
        <section
          className="border-b border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-20"
          aria-labelledby="estates-stats-heading"
        >
          <div className="mx-auto max-w-[1200px]">
            <h2 id="estates-stats-heading" className="sr-only">
              {t("statsSectionLabel")}
            </h2>
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d] md:mb-10">
              {t("statsAreasLabel")}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {stats.map((item, index) => {
                const Icon = STAT_ICONS[index] ?? MdLandscape;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-4 border border-[#d1dfe0] bg-white/80 px-5 py-7 text-center shadow-sm sm:py-8"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f677d]/12 text-[#0f677d]"
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
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
        </section>
      </RevealFadeUp>

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
                src={EVART_ESTATES_MEDIA.concept}
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

      <RevealFadeUp>
        <section className="border-t border-[#d1dfe0] bg-[#eef4f4]/40 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative order-2 aspect-[4/3] overflow-hidden bg-[#d1dfdf]/50 lg:order-1">
              <img
                src={EVART_ESTATES_MEDIA.architecture}
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
              <ul className="mt-8 space-y-3 border-l-2 border-[#0f677d]/40 pl-5 text-sm text-[#1f3a40]/90 md:text-base">
                {archBullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-8 text-sm font-medium leading-relaxed text-[#1f3a40] md:text-base">
                {t("archBody")}
              </p>
            </div>
          </div>
        </section>
      </RevealFadeUp>

      <RevealFadeUp>
        <section className="px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden bg-[#d1dfdf]/50">
              <img
                src={EVART_ESTATES_MEDIA.social}
                alt={t("socialImageAlt")}
                width={2100}
                height={900}
                className="h-full w-full object-cover"
                sizes="100vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 to-transparent"
                aria-hidden
              />
            </div>
            <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                  {t("socialKicker")}
                </p>
                <h2 className="mt-3 font-serif text-2xl tracking-tight md:text-3xl">
                  {t("socialTitle")}
                </h2>
                <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                  {socialList.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-[#0f677d]" aria-hidden>
                        ·
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 lg:mt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                  {t("techKicker")}
                </p>
                <h2 className="mt-3 font-serif text-2xl tracking-tight md:text-3xl">
                  {t("techTitle")}
                </h2>
                <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                  {techList.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-[#0f677d]" aria-hidden>
                        ·
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </RevealFadeUp>

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
              <dl className="mt-8 space-y-4 border border-[#d1dfe0] bg-white/80 p-6">
                {locationMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-baseline justify-between gap-4 border-b border-[#d1dfe0]/80 pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm font-medium text-[#1f3a40]/80">
                      {m.label}
                    </dt>
                    <dd className="font-serif text-lg text-[#0f677d] md:text-xl">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                {t("locationBody")}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#d1dfdf]/50">
              <img
                src={EVART_ESTATES_MEDIA.location}
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

      <RevealFadeUp>
        <section className="border-t border-[#1f3a40] bg-[#1f3a40] px-6 py-16 text-white lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              {t("privilegeKicker")}
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight md:text-4xl">
              {t("privilegeTitle")}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/88 md:text-lg md:leading-relaxed">
              {t("privilegeLead")}
            </p>
            <p className="mt-4 text-sm text-white/75 md:text-base">
              {t("privilegeSub")}
            </p>
          </div>
        </section>
      </RevealFadeUp>

      <RevealFadeUp>
        <section className="border-t border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
              {t("investmentKicker")}
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              {t("investmentTitle")}
            </h2>
            <ul className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm text-[#1f3a40]/90 md:text-base">
              {investmentBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f677d]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 font-serif text-xl text-[#1f3a40] md:text-2xl">
              {t("investmentTagline")}
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex cursor-pointer items-center justify-center bg-[#1f3a40] px-6 py-2.5 text-base font-medium text-[#f9f6f3] transition-colors duration-300 ease-out hover:bg-[#0f677d]"
            >
              {t("closingCta")}
            </Link>
          </div>
        </section>
      </RevealFadeUp>
    </article>
  );
}
