"use client";

import { Link } from "@/i18n/navigation";
import {
  DEFAULT_PROJECT_TAB,
  PROJECT_TAB_IDS,
  getProjectSlugsForTab,
  type ProjectTabId,
} from "@/lib/project-categories";
import { PROJECT_COVERS, type ProjectSlug } from "@/lib/projects";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

function fadeUpClass(visible: boolean) {
  return `max-w-[1400px] mx-auto overflow-hidden transition-all duration-700 ease-out ${
    visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
  }`;
}

/** 1-based tek satırlar (1,3,5…): görsel solda → 0-based çift index */
function imageOnRight(index: number) {
  return index % 2 === 1;
}

function ProjectCard({ slug, index }: { slug: ProjectSlug; index: number }) {
  const t = useTranslations("ProjectsPage");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const swap = imageOnRight(index);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [slug]);

  return (
    <div ref={ref} className={fadeUpClass(visible)}>
      <Link
        href={{ pathname: "/projects/[slug]", params: { slug } }}
        className="group grid grid-cols-1 overflow-hidden bg-white shadow-sm transition-shadow duration-300 hover:shadow-md md:grid-cols-2 md:min-h-[min(22rem,52vw)]"
      >
        <div
          className={`relative w-full overflow-hidden bg-[#d1dfdf]/50 md:h-full ${
            swap ? "md:order-2" : "md:order-1"
          }`}
          style={{ aspectRatio: "1.5" }}
        >
          <img
            src={PROJECT_COVERS[slug]}
            alt=""
            width={720}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div
          className={`flex min-h-0 flex-col justify-center bg-[#f9f6f3] px-6 py-8 md:px-10 md:py-12 ${
            swap ? "md:order-1" : "md:order-2"
          }`}
        >
          <h2 className="font-serif text-2xl font-medium tracking-tight text-[#1f3a40] md:text-3xl">
            {t(`cards.${slug}.title`)}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#1f3a40]/85 md:mt-4 md:text-[0.9375rem] md:leading-relaxed">
            {t(`cards.${slug}.excerpt`)}
          </p>
          <span className="mt-5 inline-flex w-fit font-serif text-xs font-semibold uppercase tracking-wide text-[#0f677d] underline-offset-4 transition-opacity group-hover:underline md:text-[0.6875rem]">
            {t("cardCta")}
          </span>
        </div>
      </Link>
    </div>
  );
}

export function ProjectsGrid() {
  const t = useTranslations("ProjectsPage");
  const [tab, setTab] = useState<ProjectTabId>(DEFAULT_PROJECT_TAB);
  const slugs = getProjectSlugsForTab(tab);
  const tabListRef = useRef<HTMLDivElement>(null);

  const onTabKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (index + 1) % PROJECT_TAB_IDS.length
        : (index - 1 + PROJECT_TAB_IDS.length) % PROJECT_TAB_IDS.length;
    const id = PROJECT_TAB_IDS[next];
    setTab(id);
    queueMicrotask(() => {
      tabListRef.current?.querySelector<HTMLButtonElement>(`#project-tab-${id}`)?.focus();
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div
        ref={tabListRef}
        role="tablist"
        aria-label={t("projectTabsLabel")}
        className="-mx-1 mb-10 flex snap-x snap-proximity flex-nowrap gap-2 overflow-x-auto overflow-y-hidden scroll-pl-1 scroll-pr-4 pb-1 [scrollbar-width:thin] touch-pan-x motion-reduce:scroll-auto md:mb-12 md:snap-none md:flex-wrap md:gap-3 md:scroll-pr-0 md:overflow-visible md:pb-0 md:touch-auto"
      >
        {PROJECT_TAB_IDS.map((id, index) => {
          const selected = tab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`project-tab-${id}`}
              aria-selected={selected}
              aria-controls={`projects-panel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(id)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
              className={`shrink-0 snap-start rounded-none border cursor-pointer px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider transition-colors duration-200 md:px-4 md:py-3 md:text-[0.6875rem] ${
                selected
                  ? "border-[#1f3a40] bg-[#1f3a40] text-white"
                  : "border-[#d1dfe0] bg-white/80 text-[#1f3a40] hover:border-[#1f3a40]/40 hover:bg-white"
              }`}
            >
              {t(`projectCategories.${id}.label` as never)}
            </button>
          );
        })}
      </div>

      <div
        id={`projects-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`project-tab-${tab}`}
      >
        <div className="flex flex-col gap-10 md:gap-20">
          {slugs.map((slug, index) => (
            <ProjectCard key={`${tab}-${slug}`} slug={slug} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
