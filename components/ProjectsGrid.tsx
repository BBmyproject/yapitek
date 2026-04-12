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
  return `overflow-hidden transition-all duration-700 ease-out ${
    visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
  }`;
}

function ProjectCard({ slug }: { slug: ProjectSlug }) {
  const t = useTranslations("ProjectsPage");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
        className="group relative block h-full overflow-hidden border border-[#d1dfe0] bg-[#d1dfdf]/50 shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={PROJECT_COVERS[slug]}
            alt=""
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-1/2 opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 42, 52, 0) 0%, rgba(0, 0, 0, 0.55) 55%, rgba(0, 0, 0, 0.9) 100%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 z-[2] overflow-hidden p-5 pb-5 md:p-6 md:pb-6">
            <div className="flex min-w-0 flex-col items-stretch justify-end">
              <h2 className="font-serif text-xl font-medium tracking-tight text-white drop-shadow-sm md:text-2xl">
                {t(`cards.${slug}.title`)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/90 md:mt-3 md:text-[0.9375rem] md:leading-relaxed">
                {t(`cards.${slug}.excerpt`)}
              </p>
              <div
                className="mt-0 max-h-0 overflow-hidden opacity-0 transition-[max-height,margin-top,opacity] duration-300 ease-out motion-reduce:transition-none group-hover:mt-2.5 group-hover:max-h-14 group-hover:opacity-100 md:group-hover:mt-3 md:group-hover:max-h-16"
                aria-hidden
              >
                <span className="inline-block font-serif font-semibold uppercase text-white">
                  {t("cardCta")}
                </span>
              </div>
            </div>
          </div>
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
    <div>
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
                  ? "border-[#fbbe64] bg-[#fbbe64] text-white"
                  : "border-[#d1dfe0] bg-white/80 text-[#1f3a40] hover:border-[#fbbe64]/40 hover:bg-white"
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
          {slugs.map((slug) => (
            <ProjectCard key={`${tab}-${slug}`} slug={slug} />
          ))}
        </div>
      </div>
    </div>
  );
}
