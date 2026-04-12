"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ShiftHoverText } from "@/components/ui/ShiftHoverText";

const navItems = [
  { key: "home" as const, href: "/" as const },
  { key: "about" as const, href: "/about" as const },
  { key: "projects" as const, href: "/projects" as const },
  { key: "contact" as const, href: "/contact" as const },
] as const;

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.84.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-8 w-8 shrink-0" aria-hidden>
      <span
        className={`absolute left-1/2 top-[8px] block h-px w-full -translate-x-1/2 bg-current transition-[top,transform] duration-300 ease-out motion-reduce:transition-none ${
          open
            ? "top-[15px] -translate-y-1/2 rotate-45"
            : "rotate-0"
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 block h-px w-full -translate-x-1/2 -translate-y-1/2 bg-current transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          open ? "scale-x-0 opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute bottom-[8px] left-1/2 block h-px w-full -translate-x-1/2 bg-current transition-[bottom,transform] duration-300 ease-out motion-reduce:transition-none ${
          open
            ? "bottom-[16px] translate-y-1/2 -rotate-45"
            : "rotate-0"
        }`}
      />
    </span>
  );
}

export function SiteHeader() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const routeParams = useParams<{ slug?: string | string[] }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  const localeSwitchHref = useMemo(() => {
    const raw = routeParams.slug;
    const slug = typeof raw === "string" ? raw : raw?.[0];
    if (slug) {
      return {
        pathname: "/projects/[slug]" as const,
        params: { slug },
      };
    }
    if (pathname === "/projects/[slug]") {
      return "/projects" as const;
    }
    return pathname;
  }, [pathname, routeParams.slug]);

  const hasFixedHero =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/projects" ||
    pathname.startsWith("/projects/");
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const [pastHero, setPastHero] = useState(() => !hasFixedHero);
  const lastScrollY = useRef(0);

  const lightHeader = pastHero && !hiddenOnScroll;
  const showLightBar = lightHeader || mobileMenuOpen;
  const navLine = lightHeader
    ? "whitespace-nowrap text-[#1f3a40]"
    : "whitespace-nowrap text-white";
  const mobileBarText = showLightBar
    ? "text-[#1f3a40]"
    : "text-white";

  const heroGradient =
    "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 50.02%, rgba(0, 0, 0, 0) 100%)";

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    queueMicrotask(() => {
      setPortalReady(true);
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setMobileMenuOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) closeMenu();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen, closeMenu]);

  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const syncPastHero = () => {
      if (!hasFixedHero) {
        setPastHero(true);
        return;
      }
      setPastHero(window.scrollY >= window.innerHeight);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      lastScrollY.current = y;

      syncPastHero();

      if (y < 40) {
        setHiddenOnScroll(false);
        return;
      }
      if (y > prev && y > 80) {
        setHiddenOnScroll(true);
        return;
      }
      if (y < prev) {
        setHiddenOnScroll(false);
      }
    };

    syncPastHero();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncPastHero);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncPastHero);
    };
  }, [hasFixedHero]);

  const mobileMenuPortal =
    portalReady &&
    createPortal(
      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t("mobileNavLabel")}
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-40 flex h-dvh min-h-dvh w-screen max-w-[100vw] flex-col bg-white text-[#1f3a40] transition-[transform,visibility] duration-300 ease-out lg:hidden motion-reduce:transition-none ${
          mobileMenuOpen
            ? "visible translate-y-0"
            : "invisible pointer-events-none -translate-y-full"
        }`}
      >
        <div className="shrink-0 pt-[calc(15px+2.5rem+16px)]" aria-hidden />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div
            className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#f9f6f3] motion-safe:transition-[clip-path] motion-safe:duration-620 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              mobileMenuOpen
                ? "[clip-path:inset(0_0_0_0)]"
                : "[clip-path:inset(0_0_100%_0)]"
            }`}
            style={{
              transitionDelay:
                mobileMenuOpen && !reduceMotion ? "120ms" : "0ms",
            }}
          >
            <nav
              className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-6 pb-6 pt-6"
              aria-label="Ana menü"
            >
              {navItems.map((item, i) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-center font-serif py-4 text-xl font-medium motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out ${
                    mobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-3 opacity-0"
                  }`}
                  style={{
                    transitionDelay:
                      mobileMenuOpen && !reduceMotion
                        ? `${220 + i * 75}ms`
                        : "0ms",
                  }}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div
          className={`flex shrink-0 flex-col gap-4 border-t border-[#d1dfe0] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 text-xs motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
          style={{
            transitionDelay:
              mobileMenuOpen && !reduceMotion
                ? `${70 + navItems.length * 75}ms`
                : "0ms",
          }}
        >
          <nav
            className="flex shrink-0 items-center gap-1.5 font-semibold justify-center"
            aria-label="Dil seçimi"
          >
            <Link
              href={localeSwitchHref as never}
              locale="tr"
              onClick={closeMenu}
              className={
                locale === "tr"
                  ? "text-[#1f3a40]"
                  : "text-[#1f3a40]/50 hover:text-[#1f3a40]"
              }
            >
              TR
            </Link>
            <span className="text-[#1f3a40]/30" aria-hidden>
              |
            </span>
            <Link
              href={localeSwitchHref as never}
              locale="en"
              onClick={closeMenu}
              className={
                locale === "en"
                  ? "text-[#1f3a40]"
                  : "text-[#1f3a40]/50 hover:text-[#1f3a40]"
              }
            >
              EN
            </Link>
          </nav>
          <div className="flex items-start justify-between gap-3">
            <a
              href={t("headerPhoneHref")}
              className="flex max-w-[45%] shrink-0 items-center justify-start gap-1.5 font-medium text-[#1f3a40] hover:text-[#0f677d]"
            >
              <PhoneIcon className="h-4 w-4 shrink-0 opacity-90" />
              <span className="break-all">{t("headerPhone")}</span>
            </a>
            <span className="flex max-w-[50%] items-start justify-end gap-1.5 text-right leading-snug text-[#1f3a40]/85">
              <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#0f677d]" />
              <span className="wrap-break-word">{t("headerLocation")}</span>
            </span>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full px-4 py-3 transition-transform duration-300 ease-out lg:py-[12px] ${
        mobileMenuOpen ? "max-lg:pt-[15px] max-lg:pb-4" : ""
      } ${
        hiddenOnScroll && !mobileMenuOpen
          ? "-translate-y-[100px]"
          : "translate-y-0"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-10 transition-[background-color,box-shadow] duration-300 ease-out ${
          showLightBar ? "border-b border-[#d1dfe0] bg-[#f9f6f3]" : "bg-transparent"
        }`}
        style={showLightBar ? undefined : { background: heroGradient }}
        aria-hidden
      />

      {/* Masaüstü */}
      <div className="relative mx-auto hidden w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-6 lg:grid">
        <nav
          className="flex flex-wrap items-center gap-x-8 gap-y-2 justify-self-start font-medium"
          aria-label="Ana menü"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group inline-flex font-medium"
            >
              <ShiftHoverText selfGroup={false} lineClassName={navLine}>
                {t(item.key)}
              </ShiftHoverText>
            </Link>
          ))}
        </nav>

        <div className="justify-self-center">
          <Link
            href="/"
            className="inline-flex items-center"
            aria-label="Yapıtek Anka"
          >
            <img
              src={lightHeader ? "/logo-dark.png" : "/logo.png"}
              alt="Yapıtek Anka"
              width={80}
              height={40}
              fetchPriority="high"
              className="h-auto w-[80px]"
            />
          </Link>
        </div>

        <div
          className={`flex h-[30px] items-center justify-self-end gap-4 text-sm ${
            lightHeader ? "text-[#1f3a40]" : "text-white"
          }`}
        >
          <nav
            className="flex items-center gap-1.5 font-medium"
            aria-label="Dil seçimi"
          >
            <Link
              href={localeSwitchHref as never}
              locale="tr"
              className={
                locale === "tr"
                  ? lightHeader
                    ? "text-[#1f3a40]"
                    : "text-white"
                  : lightHeader
                    ? "text-[#1f3a40]/55 transition-opacity hover:text-[#1f3a40]"
                    : "text-white/55 transition-opacity hover:text-white"
              }
            >
              TR
            </Link>
            <span
              className={lightHeader ? "text-[#1f3a40]/35" : "text-white/35"}
              aria-hidden
            >
              |
            </span>
            <Link
              href={localeSwitchHref as never}
              locale="en"
              className={
                locale === "en"
                  ? lightHeader
                    ? "text-[#1f3a40]"
                    : "text-white"
                  : lightHeader
                    ? "text-[#1f3a40]/55 transition-opacity hover:text-[#1f3a40]"
                    : "text-white/55 transition-opacity hover:text-white"
              }
            >
              EN
            </Link>
          </nav>
          <span
            className={`h-full w-px shrink-0 ${
              lightHeader ? "bg-[#1f3a40]/20" : "bg-white/35"
            }`}
            aria-hidden
          />
          <span className="group flex cursor-default items-center gap-2">
            <LocationIcon className="shrink-0 opacity-90" />
            <ShiftHoverText selfGroup={false} lineClassName={navLine}>
              {t("headerLocation")}
            </ShiftHoverText>
          </span>
          <span
            className={`h-full w-px shrink-0 ${
              lightHeader ? "bg-[#1f3a40]/20" : "bg-white/35"
            }`}
            aria-hidden
          />
          <a
            href={t("headerPhoneHref")}
            className="group flex items-center gap-2"
          >
            <PhoneIcon className="shrink-0 opacity-90" />
            <ShiftHoverText selfGroup={false} lineClassName={navLine}>
              {t("headerPhone")}
            </ShiftHoverText>
          </a>
        </div>
      </div>

      {/* Mobil */}
      <div className="relative z-50 mx-auto flex w-full max-w-[1440px] items-center justify-between lg:hidden">
        <div className="h-8 w-8 shrink-0" aria-hidden />
        <div className="pointer-events-none inset-0 flex items-center justify-center">
          <Link
            href="/"
            className="pointer-events-auto inline-flex items-center"
            aria-label="Yapıtek Anka"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={showLightBar ? "/logo-dark.png" : "/logo.png"}
              alt="Yapıtek Anka"
              width={80}
              height={40}
              fetchPriority="high"
              className="h-auto w-[70px]"
            />
          </Link>
        </div>
        <button
          type="button"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#0f677d] focus-visible:ring-offset-2 ${mobileBarText}`}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-panel"
          aria-label={mobileMenuOpen ? t("menuClose") : t("menuOpen")}
          onClick={() => setMobileMenuOpen((o) => !o)}
        >
          <HamburgerIcon open={mobileMenuOpen} />
        </button>
      </div>
    </header>
    {mobileMenuPortal}
    </>
  );
}
