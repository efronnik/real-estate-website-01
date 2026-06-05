import type { Metadata } from "next";
import type { ReactNode } from "react";
import { resolveKeyPageMetadata } from "@/lib/page-metadata";

type BlogLayoutProps = {
  children: ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveKeyPageMetadata("blog");
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return children;
}
