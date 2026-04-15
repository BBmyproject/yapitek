"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  "/images/docs-vadi.webp",
] as const;

const STAGGER_MS = 200;

function fadeUpClass(visible: boolean) {
  return `overflow-hidden transition-all duration-700 ease-out ${
    visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
  }`;
}

export function AboutApproachSection() {
  const t = useTranslations("AboutApproach");
  const sectionRef = useRef<HTMLElement>(null);
  const sequenceStarted = useRef(false);
  const [stage, setStage] = useState(0);

  const c0Bullets = t.raw("c0Bullets") as string[];
  const c1Bullets = t.raw("c1Bullets") as string[];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const timers: number[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || sequenceStarted.current) return;
        sequenceStarted.current = true;

        setStage(1);
        timers.push(
          window.setTimeout(() => setStage(2), STAGGER_MS),
          window.setTimeout(() => setStage(3), STAGGER_MS * 2),
          window.setTimeout(() => setStage(4), STAGGER_MS * 3),
        );
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f9f6f3] px-6 py-16 text-[#1f3a40] lg:px-10 lg:py-24"
      aria-labelledby="about-approach-title"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className={fadeUpClass(stage >= 1)}>
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-[#0f677d]">
            {t("kicker")}
          </p>
          <h2
            id="about-approach-title"
            className="mt-4 text-center font-serif text-3xl tracking-tight md:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-[#1f3a40]/75 md:text-base">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16 lg:gap-20">
          <article
            className={`flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 ${fadeUpClass(stage >= 2)}`}
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-xl font-medium tracking-wide text-[#1f3a40] md:text-2xl">
                {t("c0Title")}
              </h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-[#1f3a40]/88 md:text-base">
                {t("c0Lead")}
              </p>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#1f3a40]/90 md:text-[0.9375rem]">
                {c0Bullets.map((item, idx) => (
                  <li key={`c0-${idx}`}>{item}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/88 md:text-[0.9375rem]">
                {t("c0Body")}
              </p>
            </div>
            <div className="mx-auto w-full max-w-[400px] shrink-0 lg:mx-0 lg:w-[400px]">
              <div className="relative aspect-[1.5/1] w-full overflow-hidden bg-[#d1dfdf]/40">
                <img
                  src={CARD_IMAGES[0]}
                  alt={t("c0ImageAlt")}
                  width={600}
                  height={400}
                  className="absolute inset-0 h-full w-full object-cover"
                  sizes="400px"
                />
              </div>
            </div>
          </article>

          <article
            className={`flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 ${fadeUpClass(stage >= 3)}`}
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-xl font-medium tracking-wide text-[#1f3a40] md:text-2xl">
                {t("c1Title")}
              </h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-[#1f3a40]/88 md:text-base">
                {t("c1Lead")}
              </p>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#1f3a40]/90 md:text-[0.9375rem]">
                {c1Bullets.map((item, idx) => (
                  <li key={`c1-${idx}`}>{item}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/88 md:text-[0.9375rem]">
                {t("c1Body")}
              </p>
            </div>
            <div className="mx-auto w-full max-w-[400px] shrink-0 lg:mx-0 lg:w-[400px]">
              <div className="relative aspect-[1.5/1] w-full overflow-hidden bg-[#d1dfdf]/40">
                <img
                  src={CARD_IMAGES[1]}
                  alt={t("c1ImageAlt")}
                  width={600}
                  height={400}
                  className="absolute inset-0 h-full w-full object-cover"
                  sizes="400px"
                />
              </div>
            </div>
          </article>

          <article
            className={`flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 ${fadeUpClass(stage >= 4)}`}
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-xl font-medium tracking-wide text-[#1f3a40] md:text-2xl">
                {t("c2Title")}
              </h3>
              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0f677d]">
                    {t("c2MissionTitle")}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-[#1f3a40]/88 md:text-[0.9375rem]">
                    {t("c2MissionP1")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#1f3a40]/88 md:text-[0.9375rem]">
                    {t("c2MissionP2")}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0f677d]">
                    {t("c2VisionTitle")}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-[#1f3a40]/88 md:text-[0.9375rem]">
                    {t("c2VisionP1")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#1f3a40]/88 md:text-[0.9375rem]">
                    {t("c2VisionP2")}
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[400px] shrink-0 lg:mx-0 lg:w-[400px]">
              <div className="relative aspect-[1.5/1] w-full overflow-hidden bg-[#d1dfdf]/40">
                <img
                  src={CARD_IMAGES[2]}
                  alt={t("c2ImageAlt")}
                  width={600}
                  height={400}
                  className="absolute inset-0 h-full w-full object-cover"
                  sizes="400px"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
