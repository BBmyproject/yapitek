import { RevealFadeUp } from "@/components/ui/RevealFadeUp";
import { Link } from "@/i18n/navigation";
import { EVART_YALIKAVAK_MEDIA } from "@/lib/evart-yalikavak-media";
import { getTranslations } from "next-intl/server";
import type { IconType } from "react-icons";
import {
  MdApartment,
  MdPercent,
  MdShowChart,
  MdWbSunny,
} from "react-icons/md";
import { TbLayoutList, TbRulerMeasure } from "react-icons/tb";

type StatItem = { value: string; label: string; detail: string };

/** Sıra: konut tipi → alan → tipoloji → doluluk → ROI */
const STAT_ICONS: IconType[] = [
  TbLayoutList,
  TbRulerMeasure,
  MdApartment,
  MdPercent,
  MdShowChart,
];

export async function ProjectEvartYalikavakContent() {
  const t = await getTranslations("ProjectEvartYalikavak");
  const stats = t.raw("stats") as StatItem[];
  const archBullets = t.raw("archBullets") as string[];
  const socialHighlights = t.raw("socialHighlights") as string[];
  const modelBullets = t.raw("modelBullets") as string[];
  const investmentPoints = t.raw("investmentPoints") as string[];

  return (
    <article
      id="project-icerik"
      className="relative z-10 bg-[#f9f6f3] text-[#1f3a40]"
    >
      <RevealFadeUp>
        <section
          className="border-b border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-20"
          aria-labelledby="yalikavak-stats-heading"
        >
          <div className="mx-auto max-w-[1200px]">
            <h2 id="yalikavak-stats-heading" className="sr-only">
              {t("statsSectionLabel")}
            </h2>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12">
              <aside className="flex shrink-0 flex-col lg:w-[min(100%,320px)] lg:text-left xl:w-[360px]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                  {t("modelKicker")}
                </p>
                <p className="mt-3 font-serif text-2xl leading-tight md:text-3xl">
                  {t("modelTitle")}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                  {modelBullets.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f677d]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/80 md:text-base">
                  {t("modelClosing")}
                </p>
              </aside>

              <div className="min-w-0 flex-1">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                  {t("statsAreasLabel")}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {stats.map((item, index) => {
                    const Icon = STAT_ICONS[index] ?? MdWbSunny;
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
                src={EVART_YALIKAVAK_MEDIA.concept}
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
                src={EVART_YALIKAVAK_MEDIA.architecture}
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
              <ul className="mt-8 space-y-4 border-l-2 border-[#0f677d]/40 pl-5 text-sm text-[#1f3a40]/90 md:text-base">
                {archBullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
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
                src={EVART_YALIKAVAK_MEDIA.social}
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
              <ul className="mt-8 space-y-3 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                {socialHighlights.map((item) => (
                  <li key={item} className="flex gap-2 items-center">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f677d]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mx-auto italic mt-10 max-w-3xl text-center text-sm font-medium leading-relaxed text-[#1f3a40] md:text-lg">
                {t("socialBody")}
              </p>
            </div>
          </div>
        </section>
      </RevealFadeUp>

      <RevealFadeUp>
        <section className="border-t border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                {t("investmentKicker")}
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
                {t("investmentTitle")}
              </h2>
              <ul className="mt-8 space-y-3 text-sm leading-relaxed text-[#1f3a40]/90 md:text-base">
                {investmentPoints.map((line) => (
                  <li key={line} className="flex gap-2 items-center">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f677d]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-l-4 border-[#0f677d] bg-[#0f677d]/5 py-3 pl-4 pr-4 text-sm font-semibold text-[#1f3a40] md:text-base">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#0f677d]">
                  {t("investmentFormulaLabel")}
                </span>
                <span className="mt-1 block">{t("investmentFormula")}</span>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#d1dfdf]/50">
              <img
                src={EVART_YALIKAVAK_MEDIA.investment}
                alt={t("investmentImageAlt")}
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
        <section className="border-t border-[#d1dfe0] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
              {t("closingTitle")}
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-[#1f3a40]/40 bg-linear-to-r from-[#1f3a40] to-[#0f677d] px-7 py-2.5 text-base font-medium text-[#f9f6f3] shadow-[0_10px_24px_rgba(15,103,125,0.32)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:from-[#0f677d] hover:to-[#0a4f62] hover:shadow-[0_14px_30px_rgba(15,103,125,0.4)]"
            >
              {t("closingCta")}
            </Link>
          </div>
        </section>
      </RevealFadeUp>
    </article>
  );
}
