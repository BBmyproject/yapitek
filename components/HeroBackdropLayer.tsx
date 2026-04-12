"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

type HeroBackdropLayerProps = {
  children: ReactNode;
};

const DURATION_MS = 1000;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export function HeroBackdropLayer({ children }: HeroBackdropLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
      return;
    }

    const anim = el.animate(
      [
        { opacity: 0.5, transform: "scale(1.02)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      {
        duration: DURATION_MS,
        easing: EASING,
        fill: "forwards",
      },
    );

    return () => anim.cancel();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 origin-center"
      style={{ opacity: 0.5, transform: "scale(1.02)" }}
    >
      {children}
    </div>
  );
}
