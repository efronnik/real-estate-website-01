import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildStaticMetadata } from "@/lib/seo";

type BledyLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = buildStaticMetadata({
  title: "Błędy przy sprzedaży mieszkania | FIND",
  description:
    "Najczęstsze błędy właścicieli przy sprzedaży mieszkania i checklista działań, która pomaga odzyskać kontrolę nad procesem.",
  path: "/bledy",
});

export default function BledyLayout({ children }: BledyLayoutProps) {
  return children;
}
