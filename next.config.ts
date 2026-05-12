import type { NextConfig } from "next";

function getCspOrigin(rawUrl: string | undefined): string | null {
  if (!rawUrl) return null;

  try {
    return new URL(rawUrl).origin;
  } catch {
    return null;
  }
}

function cspSources(sources: Array<string | null | undefined>): string {
  return Array.from(new Set(sources.filter((source): source is string => Boolean(source)))).join(" ");
}

const defaultDevStrapiUrl = process.env.NODE_ENV === "production" ? undefined : "http://localhost:1337";
const strapiConnectSource = getCspOrigin(process.env.NEXT_PUBLIC_STRAPI_URL ?? defaultDevStrapiUrl);

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com",
  "media-src 'self' blob:",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  `connect-src ${cspSources([
    "'self'",
    strapiConnectSource,
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://www.googletagmanager.com",
  ])}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Content-Security-Policy", value: cspDirectives },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
