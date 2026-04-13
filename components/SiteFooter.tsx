"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoArrowUpOutline } from "react-icons/io5";
import { ShiftHoverText } from "./ui/ShiftHoverText";

const FOOTER_NAV = [
  { key: "home" as const, href: "/" as const },
  { key: "about" as const, href: "/about" as const },
  { key: "projects" as const, href: "/projects" as const },
  { key: "contact" as const, href: "/contact" as const },
] as const;

const FOOTER_PAGE_KEYS = ["privacy", "kvkk", "cookies"] as const;

const SOCIAL_LINKS = [
  { key: "linkedin" as const, href: "#", Icon: FaLinkedinIn },
  { key: "instagram" as const, href: "#", Icon: FaInstagram },
] as const;

const PEXELS_VIDEO =
  "https://videos.pexels.com/video-files/4932586/4932586-uhd_2732_1440_30fps.mp4";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      } else {
        video.setAttribute("autoplay", "");
        void video.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full bg-[#f9f6f3] text-[#1f3a40] overflow-hidden">
      <section
        id="iletisim"
        className="relative flex h-[600px] w-full items-center justify-center overflow-hidden"
        aria-labelledby="footer-cta-heading"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        >
          <source src={PEXELS_VIDEO} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-[#0003]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2
            id="footer-cta-heading"
            className="font-serif text-4xl tracking-tight text-white md:text-5xl lg:text-7xl"
          >
            {t("getInTouch")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">
            {t("getInTouchBody")}
          </p>
          <Link
              href="/contact"
              className="group mt-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-[#d9cdb8] bg-linear-to-r from-[#fcf9f6] to-[#f1ebe4] px-7 py-2.5 text-lg font-medium text-[#1f3a40] shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:from-white hover:to-[#f5efe9] hover:shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
            >
              <ShiftHoverText
                selfGroup={false}
                variant="comfortable"
                lineClassName="whitespace-nowrap text-base md:text-lg font-medium text-current"
              >
                {t("cta")}
              </ShiftHoverText>
            </Link>
        </div>
      </section>

      <div className="relative overflow-x-clip bg-[#f9f6f3] px-6 pt-25 pb-14 lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden h-[220px] xl:block">
          <img
            src="/bg-logo-left.png"
            alt=""
            aria-hidden="true"
            className="footer-logo-swing absolute -bottom-8 left-0 h-[180px] w-[180px] object-contain opacity-80"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/bg-logo-right.png"
            alt=""
            aria-hidden="true"
            className="footer-logo-swing absolute -bottom-8 right-0 h-[180px] w-[180px] object-contain opacity-80"
            loading="lazy"
            decoding="async"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group absolute left-1/2 top-0 z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-full bg-[#f9f6f3] p-0 shadow-md transition-shadow duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a40]"
          aria-label={t("scrollToTop")}
        >
          <span className="flex h-full w-full flex-col overflow-hidden">
            <span
              className="flex flex-col gap-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-20"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center p-2">
                <img
                  src="/logo-dark-2.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center"
                aria-hidden
              >
                <IoArrowUpOutline className="h-7 w-7 font-light text-[#1f3a40]" />
              </span>
            </span>
          </span>
        </button>

        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-6 text-xs font-semibold text-[#fbbe64]">
              {t("columns.menu")}
            </h3>
            <ul className="space-y-5 text-[#1f3a40]">
              {FOOTER_NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="transition-opacity hover:opacity-100 hover:underline"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-semibold text-[#fbbe64]">
              {t("columns.pages")}
            </h3>
            <ul className="space-y-5 text-[#1f3a40]">
              {FOOTER_PAGE_KEYS.map((key) => (
                <li key={key}>
                  <a
                    href="#"
                    className="transition-opacity hover:opacity-100 hover:underline"
                  >
                    {t(`pages.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-semibold text-[#fbbe64]">
              {t("columns.contact")}
            </h3>
            <ul className="space-y-5 text-[#1f3a40]">
              <li>
                <a href={t("contactPhoneHref")} className="hover:underline">
                  {t("contactPhone")}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("contactEmail")}`}
                  className="hover:underline"
                >
                  {t("contactEmail")}
                </a>
              </li>
              <li>{t("contactAddress")}</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-semibold text-[#fbbe64]">
              {t("columns.social")}
            </h3>
            <ul
              className="flex flex-wrap items-center gap-4 text-[#1f3a40]"
              role="list"
            >
              {SOCIAL_LINKS.map(({ key, href, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#1f3a40] transition-opacity hover:opacity-70"
                    aria-label={t(`social.${key}`)}
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-14 max-w-[1440px] border-t border-[#d1dfe0] pt-8 text-center text-xs text-[#1f3a40] md:text-sm">
          {t("copyright", { year })}
        </div>
      </div>
      <style jsx>{`
        .footer-logo-swing {
          transform-origin: center;
          animation: footerLogoSwing 3.2s ease-in-out infinite alternate;
        }

        @keyframes footerLogoSwing {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(6deg);
          }
        }
      `}</style>
    </footer>
  );
}
