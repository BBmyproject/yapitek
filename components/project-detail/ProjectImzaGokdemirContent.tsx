import { RevealFadeUp } from "@/components/ui/RevealFadeUp";
import { IMZA_GOKDEMIR_MEDIA } from "@/lib/imza-gokdemir-media";
import { getTranslations } from "next-intl/server";
import type { IconType } from "react-icons";
import {
  MdApartment,
  MdMeetingRoom,
  MdStorefront,
} from "react-icons/md";
import { TbBuilding, TbBuildingSkyscraper } from "react-icons/tb";

type StatItem = { value: string; label: string; detail: string };

const STAT_ICONS: IconType[] = [
  TbBuilding,
  TbBuildingSkyscraper,
  MdMeetingRoom,
  MdStorefront,
  MdApartment,
];

export async function ProjectImzaGokdemirContent() {
  const t = await getTranslations("ProjectImzaGokdemir");
  const stats = t.raw("stats") as StatItem[];
  const archBullets = t.raw("archBullets") as string[];
  const locationBullets = t.raw("locationBullets") as string[];
  const socialBullets = t.raw("socialBullets") as string[];
  const evartBullets = t.raw("evartBullets") as string[];
  const investmentBullets = t.raw("investmentBullets") as string[];

  return (
    <article
      id="project-icerik"
      className="relative z-10 bg-[#f9f6f3] text-[#1f3a40]"
    >
      <RevealFadeUp>
        <section
          className="border-b border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-20"
          aria-labelledby="imza-stats-heading"
        >
          <div className="mx-auto max-w-[1200px]">
            <h2 id="imza-stats-heading" className="sr-only">
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
                {t("conceptBody")}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#d1dfdf]/50">
              <img
                src={IMZA_GOKDEMIR_MEDIA.concept}
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
                src={IMZA_GOKDEMIR_MEDIA.architecture}
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
            </div>
          </div>
        </section>
      </RevealFadeUp>

      <RevealFadeUp>
        <section className="px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                {t("locationKicker")}
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
                {t("locationTitle")}
              </h2>
              <ul className="mt-8 space-y-2.5 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
                {locationBullets.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-[#0f677d]" aria-hidden>
                      ·
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm font-medium leading-relaxed text-[#1f3a40] md:text-base">
                {t("locationClosing")}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#d1dfdf]/50">
              <img
                src={IMZA_GOKDEMIR_MEDIA.location}
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
        <section className="border-t border-[#d1dfe0] bg-white/60 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
              {t("socialKicker")}
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              {t("socialTitle")}
            </h2>
            <ul className="mx-auto mt-8 max-w-md space-y-2.5 text-left text-sm text-[#1f3a40]/90 md:text-base">
              {socialBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f677d]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </RevealFadeUp>

      <RevealFadeUp>
        <section className="border-t border-[#1f3a40] bg-[#1f3a40] px-6 py-16 text-white lg:px-10 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              {t("evartKicker")}
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight md:text-4xl">
              {t("evartTitle")}
            </h2>
            <ul className="mx-auto mt-8 max-w-md space-y-2.5 text-left text-sm text-white/90 md:text-base">
              {evartBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-base font-serif leading-relaxed text-white/92 md:text-lg">
              {t("evartClosing")}
            </p>
          </div>
        </section>
      </RevealFadeUp>

      <RevealFadeUp>
        <section className="border-t border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
              {t("investmentKicker")}
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl tracking-tight md:text-4xl">
              {t("investmentTitle")}
            </h2>
            <ul className="mx-auto mt-8 max-w-md space-y-3 text-sm text-[#1f3a40]/90 md:text-base">
              {investmentBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f677d]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </RevealFadeUp>
    </article>
  );
}
