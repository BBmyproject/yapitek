import { RevealFadeUp } from "@/components/ui/RevealFadeUp";
import { getTranslations } from "next-intl/server";
import type { IconType } from "react-icons";
import { MdLandscape } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";

type StatItem = { value: string; label: string; detail: string };

const STAT_ICONS: IconType[] = [TbRulerMeasure, MdLandscape];

export async function ProjectIncekLourenContent() {
  const t = await getTranslations("ProjectIncekLouren");
  const stats = t.raw("stats") as StatItem[];

  return (
    <article
      id="project-icerik"
      className="relative z-10 bg-[#f9f6f3] text-[#1f3a40]"
    >
      <RevealFadeUp>
        <section
          className="px-6 py-16 lg:px-10 lg:py-20"
          aria-labelledby="incek-louren-stats-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2 id="incek-louren-stats-heading" className="sr-only">
              {t("statsSectionLabel")}
            </h2>
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d] md:mb-10">
              {t("statsAreasLabel")}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map((item, index) => {
                const Icon = STAT_ICONS[index] ?? TbRulerMeasure;
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
                      <p className="font-serif text-xl font-medium tracking-tight text-[#0f677d] md:text-2xl">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#1f3a40]">
                        {item.label}
                      </p>
                      {item.detail?.trim() ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-[#1f3a40]/72">
                          {item.detail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </RevealFadeUp>
    </article>
  );
}
