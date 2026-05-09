import type { Metadata } from "next";

const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return FALLBACK_SITE_URL;
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL);
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildStaticMetadataArgs = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function buildStaticMetadata({
  title,
  description,
  path,
  type = "website",
}: BuildStaticMetadataArgs): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      siteName: "FIND",
      locale: "pl_PL",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
