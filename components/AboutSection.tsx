"use client";

import useEmblaCarousel from "embla-carousel-react";
import { usePathname } from "@/i18n/navigation";
import React, { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type AboutSectionProps = {
  showHeading?: boolean;
  showSignature?: boolean;
};

const ABOUT_SLIDES = [
  {
    src: "/images/about-section.jpg",
    alt: "About Section 1",
  },
  {
    src: "/images/about-section-2.jpg",
    alt: "About Section 2",
  },
  {
    src: "/images/about-section-3.jpg",
    alt: "About Section 3",
  },
  {
    src: "/images/about-section-4.jpg",
    alt: "About Section 4",
  },
  {
    src: "/images/about-section-5.jpg",
    alt: "About Section 5",
  },
] as const;

/** Embla: loop + autoplay; yalnızca max-xl (1280px altı) görünür */
function AboutBelowXlCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3800);

    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <div className="mt-10 w-full max-xl:mt-12">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="About projects"
      >
        <div className="-ml-3 flex touch-pan-y">
          {ABOUT_SLIDES.map((slide) => (
            <div
              key={slide.src}
              className="min-w-0 shrink-0 grow-0 pl-3 flex-[0_0_min(72vw,260px)] sm:flex-[0_0_min(55vw,280px)] md:flex-[0_0_min(42vw,300px)]"
            >
              <div className="aspect-[5/6] w-full overflow-hidden bg-[#e8ecec]">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const AboutSection = ({
  showHeading = true,
  showSignature = true,
}: AboutSectionProps) => {
  const t = useTranslations("AboutSection");
  const pathname = usePathname();
  const hideOnHomeMobile = pathname === "/";
  const containerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateParallax = useCallback(() => {
    if (!window.matchMedia("(min-width: 1280px)").matches) return;

    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const range = Math.max(el.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(-rect.top / range, 0), 1);

    const ranges: Array<[number, number]> = [
      [0.1, 0.2],
      [0.3, 0.4],
      [0.5, 0.6],
      [0.7, 0.8],
      [0.8, 0.9],
    ];

    itemRefs.current.forEach((node, i) => {
      if (!node) return;
      const [start, end] = ranges[i];
      const localT = Math.min(
        Math.max((progress - start) / (end - start), 0),
        1,
      );
      const y = -360 + 360 * localT;
      node.style.transform = `translate3d(0, ${y}px, 0)`;
    });
  }, []);

  useEffect(() => {
    let raf = 0;

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [updateParallax]);

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full xl:min-h-[3000px] xl:overflow-x-clip"
      >
        <div className="relative max-xl:static max-xl:block max-xl:h-auto xl:sticky xl:top-0 xl:z-10 xl:flex xl:h-screen xl:w-full xl:items-center xl:justify-center">
          <div className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
            <div className="relative left-1/2 h-screen w-screen -translate-x-1/2">
              <img
                src="/bg-logo-left.gif"
                alt=""
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-full object-contain opacity-60"
                style={{
                  aspectRatio: "auto 803 / 674",
                  maxWidth: "451px",
                  maxHeight: "373px",
                  filter: "blur(5px)",
                }}
              />
              <img
                src="/bg-logo-right.gif"
                alt=""
                aria-hidden="true"
                className="absolute -bottom-[20px] right-0 h-full w-full object-contain opacity-60"
                style={{
                  aspectRatio: "auto 803 / 674",
                  maxWidth: "451px",
                  maxHeight: "373px",
                  transform: "scaleX(-1)",
                  filter: "blur(5px)",
                }}
              />
            </div>
          </div>
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="relative z-10 mx-auto w-full max-w-[600px] min-w-0 px-6 text-center text-[#1f3a40] max-xl:pb-4 max-xl:pt-12 xl:py-20">
              <div className="mb-8 flex justify-center">
                <div className="relative h-16 w-16">
                  <img
                    src="/logo-dark-2.png"
                    alt="Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {showHeading ? (
                <>
                  <p className="mb-4 text-sm uppercase tracking-widest text-[#1f3a40]/70">
                    {t("label")}
                  </p>

                  <h2 className="mb-8 font-serif text-4xl text-[#1f3a40] md:text-6xl">
                    {t("title")}
                  </h2>
                </>
              ) : null}

              <div
                className={`${hideOnHomeMobile ? "hidden md:block" : "block"} mx-auto max-w-2xl space-y-6 text-sm font-medium leading-relaxed text-[#1f3a40]`}
              >
                <p>{t("p1")}</p>
                <p>{t("p2")}</p>
                <p>{t("p3")}</p>
                <p>{t("p4")}</p>
              </div>

              {showSignature ? (
                <div className={`mt-12 ${hideOnHomeMobile ? "hidden md:block" : "block"}`}>
                  <p className="font-medium">{t("signName")}</p>
                  <p className="text-sm opacity-60">{t("signRole")}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="w-full px-6 pb-6 lg:pb-16 hidden">
          <AboutBelowXlCarousel />
        </div>

        <div className="pointer-events-none max-xl:hidden xl:absolute xl:inset-0">
          {ABOUT_SLIDES.map((slide, i) => {
            const positions: Array<{
              top: string;
              left?: string;
              right?: number | string;
            }> = [
              { top: "35%", right: 40 },
              { top: "47%", left: "0" },
              { top: "59%", right: 0 },
              { top: "71%", left: "40px" },
              { top: "83%", right: 60 },
            ];
            const pos = positions[i];
            return (
              <div
                key={slide.src}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  position: "absolute",
                }}
                className="h-[240px] w-[200px] overflow-hidden xl:h-[360px] xl:w-[300px] z-10"
              >
                <div
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  style={{ transform: "translate3d(0, -360px, 0)" }}
                  className="h-full w-full will-change-transform"
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <style jsx>{`
        .about-logo-swing {
          transform-origin: center;
          animation: aboutLogoSwing 2s ease-in infinite alternate;
        }

        @keyframes aboutLogoSwing {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(6deg);
          }
        }
      `}</style>
    </>
  );
};

export default AboutSection;
