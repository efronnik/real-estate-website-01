import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

function uniqueList(items: string[]): string[] {
  return [...new Set(items.filter(Boolean))];
}

const strapiFromEnv = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "");
const strapiOrigins = uniqueList([
  ...(strapiFromEnv ? [strapiFromEnv] : []),
  ...(isDev ? ["http://localhost:1337", "http://127.0.0.1:1337"] : []),
]);

const gaImgOrigins = [
  "https://www.google-analytics.com",
  "https://www.googletagmanager.com",
  "https://www.google.com",
  "https://ssl.gstatic.com",
];

const gaConnectOrigins = [
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
  "https://analytics.google.com",
  "https://www.googletagmanager.com",
];

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  [
    "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com",
    ...gaImgOrigins,
    ...strapiOrigins,
  ].join(" "),
  ["media-src 'self' blob:", ...strapiOrigins].join(" "),
  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "",
    "https://www.googletagmanager.com https://www.google-analytics.com",
  ]
    .filter(Boolean)
    .join(" "),
  ["connect-src 'self'", ...gaConnectOrigins, ...strapiOrigins].join(" "),
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
