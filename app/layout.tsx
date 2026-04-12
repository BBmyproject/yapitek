import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

/** Kök: `html` / `body` `app/[locale]/layout.tsx` içinde (dil `lang` dinamik). */
export default function RootLayout({ children }: Props) {
  return children;
}
