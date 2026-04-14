"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 2000;

export function HomeEntryLoader() {
  const [active, setActive] = useState(true);
  const [progress, setProgress] = useState(0);
  const [reversing, setReversing] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, (elapsed / DURATION_MS) * 100);
      setProgress(next);

      if (next < 100) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setReversing(true);
      window.requestAnimationFrame(() => {
        setProgress(0);
      });
      window.setTimeout(() => {
        setClosing(true);
      }, 260);
      window.setTimeout(() => {
        setActive(false);
      }, 690);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const logoVisible = progress >= 25;
  if (!active) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-100 flex items-center justify-center bg-white transition-[clip-path,opacity] duration-450 ease-out ${
        closing ? "[clip-path:inset(0_0_100%_0)] opacity-0" : "[clip-path:inset(0_0_0_0)] opacity-100"
      }`}
      aria-hidden
    >
      <div className="flex w-[200px] flex-col items-center gap-4">
        <div className="h-10 overflow-hidden">
          <img
            src="/logo-dark-2.png"
            alt=""
            className={`h-10 w-auto object-contain transition-transform duration-500 ease-out ${
              logoVisible ? "translate-y-0 " : "translate-y-12"
            }`}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="relative h-[2px] w-full overflow-hidden bg-[#d1dfe0]">
          <span
            className={`absolute inset-y-0 left-0 w-full bg-[#1f3a40] transition-transform ${
              reversing ? "origin-right duration-220 ease-in" : "origin-left duration-100 ease-linear"
            }`}
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}
