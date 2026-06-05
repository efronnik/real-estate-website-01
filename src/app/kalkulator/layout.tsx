import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildStaticMetadata } from "@/lib/seo";

type KalkulatorLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = buildStaticMetadata({
  title: "Kalkulator wyceny mieszkania | FIND",
  description:
    "Szybki kalkulator wartości mieszkania: orientacyjna wycena na podstawie metrażu, liczby pokoi, stanu i lokalizacji.",
  path: "/kalkulator",
});

export default function KalkulatorLayout({ children }: KalkulatorLayoutProps) {
  return children;
}
