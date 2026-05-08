import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CookieConsentBar } from "@/components/cookie-consent-bar";
import { GoogleAnalytics } from "@/components/google-analytics";
import { UtmSessionSync } from "@/components/utm-session-sync";
import { getGaMeasurementId } from "@/lib/ga-measurement-id";

export const metadata: Metadata = {
  title: "FIND - Sprzedaj mieszkanie",
  description: "Sprzedaż mieszkania bez chaosu, z planem i pełnym wsparciem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = getGaMeasurementId();

  return (
    <html lang="pl" className="h-full">
      <body className="min-h-full flex flex-col">
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
