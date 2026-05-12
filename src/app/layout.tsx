import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { CookieConsentBar } from "@/components/cookie-consent-bar";
import { GoogleAnalytics } from "@/components/google-analytics";
import { UtmSessionSync } from "@/components/utm-session-sync";
import { getGaMeasurementId } from "@/lib/ga-measurement-id";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";
import { getLocalBusinessSchema } from "@/lib/schema";
import { isSiteIndexable } from "@/lib/site-indexable";

const indexable = isSiteIndexable();

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-playfair",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "FIND - Sprzedaj mieszkanie",
  description: "Sprzedaż mieszkania bez chaosu, z planem i pełnym wsparciem.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "FIND - Sprzedaj mieszkanie",
    description: "Sprzedaż mieszkania bez chaosu, z planem i pełnym wsparciem.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: "FIND",
    locale: "pl_PL",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIND - Sprzedaj mieszkanie",
    description: "Sprzedaż mieszkania bez chaosu, z planem i pełnym wsparciem.",
  },
  ...(indexable
    ? {}
    : {
        robots: {
          index: false,
          follow: false,
        },
      }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = getGaMeasurementId();
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <html lang="pl" className={`h-full ${playfair.variable}`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // JSON-LD for LocalBusiness discovery in search engines.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {gaMeasurementId ? (
          <>
            <GoogleAnalytics measurementId={gaMeasurementId} />
            <CookieConsentBar />
          </>
        ) : null}
        <Suspense fallback={null}>
          <UtmSessionSync />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
