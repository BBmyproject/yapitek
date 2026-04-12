import { RevealFadeUp } from "@/components/ui/RevealFadeUp";
import { MAY_LIFE_INCEK_MEDIA } from "@/lib/may-life-incek-media";
import { getTranslations } from "next-intl/server";
import type { IconType } from "react-icons";
import { MdMeetingRoom, MdStorefront } from "react-icons/md";
import { TbBuilding, TbBuildingSkyscraper, TbRulerMeasure } from "react-icons/tb";

type StatItem = { value: string; label: string; detail: string };

const STAT_ICONS: IconType[] = [
  TbBuilding,
  MdStorefront,
  TbRulerMeasure,
  MdMeetingRoom,
  TbBuildingSkyscraper,
];

export async function ProjectMayLifeIncekContent() {
  const t = await getTranslations("ProjectMayLifeIncek");
  const stats = t.raw("stats") as StatItem[];
  const archBullets = t.raw("archBullets") as string[];
  const socialAmenities = t.raw("socialAmenities") as string[];
  const commercialList = t.raw("commercialList") as string[];
  const locationBullets = t.raw("locationBullets") as string[];
  const investmentStrength = t.raw("investmentStrength") as string[];

  return (
    <article
      id="project-icerik"
      className="relative z-10 bg-[#f9f6f3] text-[#1f3a40]"
    >
      <RevealFadeUp>
        <section
          className="border-b border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-20"
          aria-labelledby="maylife-stats-heading"
        >
          <div className="mx-auto max-w-[1200px]">
            <h2 id="maylife-stats-heading" className="sr-only">
              {t("statsSectionLabel")}
            </h2>
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d] md:mb-10">
              {t("statsAreasLabel")}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {stats.map((item, index) => {
                const Icon = STAT_ICONS[index] ?? TbBuilding;
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
                src={MAY_LIFE_INCEK_MEDIA.concept}
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
                src={MAY_LIFE_INCEK_MEDIA.architecture}
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
                src={MAY_LIFE_INCEK_MEDIA.social}
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
            <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                  {t("socialKicker")}
                </p>
                <h2 className="mt-3 font-serif text-2xl tracking-tight md:text-3xl">
                  {t("socialTitle")}
                </h2>
                <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                  {socialAmenities.map((line) => (
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
                  {t("commercialKicker")}
                </p>
                <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                  {commercialList.map((line) => (
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
            <p className="mx-auto mt-12 max-w-2xl text-center font-serif text-lg leading-relaxed text-[#1f3a40] md:text-xl">
              {t("socialClosing")}
            </p>
          </div>
        </section>
      </RevealFadeUp>

      <RevealFadeUp>
        <section className="border-t border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                {t("locationInvestmentKicker")}
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
                {t("locationInvestmentTitle")}
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
                {t("locationIntro")}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                {locationBullets.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-[#0f677d]" aria-hidden>
                      ·
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                {t("investmentStrengthKicker")}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                {investmentStrength.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f677d]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                {t("formulaLabel")}
              </p>
              <p className="mt-3 font-serif text-xl text-[#1f3a40] md:text-2xl">
                {t("formula")}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#d1dfdf]/50 lg:mt-10">
              <img
                src={MAY_LIFE_INCEK_MEDIA.location}
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
    </article>
  );
}
