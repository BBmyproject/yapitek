import type { ReactNode } from "react";

type ShiftHoverTextProps = {
  /** Aynı metin iki kez üst üste renderlanır; hover’da alttaki yukarı kayar. */
  children: ReactNode;
  /** Dış sarmalayıcı (overflow + yükseklik). */
  className?: string;
  /** İki satır metin bloğuna ek sınıflar (font-ağırlık, boyut vb.). */
  lineClassName?: string;
  /**
   * true ise `group` ve hover bu bileşenin içinde.
   * false ise üst düzeyde `group` olmalı (örn. ikon + yazı aynı Link içinde).
   */
  selfGroup?: boolean;
  /** `comfortable`: daha yüksek satır (ör. hero CTA `text-lg`). */
  variant?: "default" | "comfortable";
};

/**
 * Çift katmanlı metin hover’ı: aynı içerik alt alta, hover’da alttaki üste transition ile gelir.
 * Projede linkler ve başlıklarda tekrar kullanılabilir.
 */
export function ShiftHoverText({
  children,
  className = "",
  lineClassName = "",
  selfGroup = true,
  variant = "default",
}: ShiftHoverTextProps) {
  const isComfortable = variant === "comfortable";
  const lineH = isComfortable ? "h-10" : "h-6";
  const clipH = isComfortable ? "h-10" : "h-6";
  const translate = isComfortable
    ? "group-hover:-translate-y-16"
    : "group-hover:-translate-y-12";

  const rail = (
    <span
      className={`flex flex-col gap-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${translate}`}
    >
      <span className={`flex ${lineH} shrink-0 items-center ${lineClassName}`}>
        {children}
      </span>
      <span
        className={`flex ${lineH} shrink-0 items-center ${lineClassName}`}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );

  if (selfGroup) {
    return (
      <span
        className={`group inline-flex ${clipH} overflow-hidden align-middle ${className}`}
      >
        {rail}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex ${clipH} overflow-hidden align-middle ${className}`}
    >
      {rail}
    </span>
  );
}
