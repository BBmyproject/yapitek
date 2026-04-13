import { RevealFadeUp } from "@/components/ui/RevealFadeUp";
import { Link } from "@/i18n/navigation";
import { EVART_ESTATES_MEDIA } from "@/lib/evart-estates-yalikavak-media";
import { getTranslations } from "next-intl/server";
type LocationMetric = { label: string; value: string };
type SectionItem = {
  kicker: string;
  title: string;
  subtitle?: string;
  body: string;
  body2?: string;
  bullets?: string[];
  metrics?: LocationMetric[];
  imageAlt: string;
};

export async function ProjectEvartEstatesYalikavakContent() {
  const t = await getTranslations("ProjectEvartEstates");
  const sections = t.raw("sections") as SectionItem[];

  return (
    <article
      id="project-icerik"
      className="relative z-10 bg-[#f9f6f3] text-[#1f3a40]"
    >
      {sections.map((section, index) => {
        const mediaSrc = EVART_ESTATES_MEDIA[index % EVART_ESTATES_MEDIA.length];
        const imageRight = index % 2 === 1;

        return (
          <RevealFadeUp key={`${section.kicker}-${section.title}`}>
            <section className="border-t border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-24">
              <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className={imageRight ? "order-2" : "order-1"}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                    {section.kicker}
                  </p>
                  <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
                    {section.title}
                  </h2>
                  {section.subtitle ? (
                    <p className="mt-4 text-lg font-medium text-[#0f677d] md:text-xl">
                      {section.subtitle}
                    </p>
                  ) : null}
                  <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
                    {section.body}
                  </p>
                  {section.body2 ? (
                    <p className="mt-4 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
                      {section.body2}
                    </p>
                  ) : null}
                  {section.bullets?.length ? (
                    <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#1f3a40]/90 md:text-base">
                      {section.bullets.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="text-[#0f677d]" aria-hidden>
                            ·
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.metrics?.length ? (
                    <dl className="mt-6 space-y-3 border border-[#d1dfe0] bg-white/80 p-5">
                      {section.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="flex items-baseline justify-between gap-4 border-b border-[#d1dfe0]/80 pb-3 last:border-0 last:pb-0"
                        >
                          <dt className="text-sm text-[#1f3a40]/80">{metric.label}</dt>
                          <dd className="font-serif text-lg text-[#0f677d]">{metric.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </div>

                <div
                  className={`relative aspect-4/3 overflow-hidden bg-[#d1dfdf]/50 ${imageRight ? "order-1" : "order-2"}`}
                >
                  <img
                    src={mediaSrc}
                    alt={section.imageAlt}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </section>
          </RevealFadeUp>
        );
      })}

      <RevealFadeUp>
        <section className="border-t border-[#d1dfe0] px-6 py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/contact"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#1f3a40]/40 bg-linear-to-r from-[#1f3a40] to-[#0f677d] px-7 py-2.5 text-base font-medium text-[#f9f6f3] shadow-[0_10px_24px_rgba(15,103,125,0.32)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:from-[#0f677d] hover:to-[#0a4f62] hover:shadow-[0_14px_30px_rgba(15,103,125,0.4)]"
            >
              {t("closingCta")}
            </Link>
          </div>
        </section>
      </RevealFadeUp>
    </article>
  );
}
