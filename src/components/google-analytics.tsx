"use client";

import Script from "next/script";
import { Suspense, useCallback, useEffect, useState } from "react";
import { GoogleAnalyticsPageView } from "@/components/google-analytics-page-view";
import {
  ANALYTICS_CONSENT_CHANGE_EVENT,
  analyticsConsentBannerEnabled,
  readAnalyticsConsent,
} from "@/lib/analytics-consent";
import { isValidGaMeasurementId } from "@/lib/ga-measurement-id";

type GoogleAnalyticsProps = {
  measurementId: string;
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [loadScripts, setLoadScripts] = useState(() => !analyticsConsentBannerEnabled());

  const syncFromStorage = useCallback(() => {
    if (!analyticsConsentBannerEnabled()) {
      setLoadScripts(true);
      return;
    }
    setLoadScripts(readAnalyticsConsent() === "granted");
  }, []);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- align gtag load with localStorage consent */
    syncFromStorage();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [syncFromStorage]);

  useEffect(() => {
    const onChange = () => syncFromStorage();
    window.addEventListener(ANALYTICS_CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(ANALYTICS_CONSENT_CHANGE_EVENT, onChange);
  }, [syncFromStorage]);

  if (!isValidGaMeasurementId(measurementId)) {
    return null;
  }

  if (!loadScripts) {
    return null;
  }

  const inlineSnippet = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'granted',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'functionality_storage': 'granted',
  'personalization_storage': 'denied',
  'security_storage': 'granted'
});
gtag('js', new Date());
gtag('config', '${measurementId}');
`.trim();

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-gtag" strategy="afterInteractive">
        {inlineSnippet}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView measurementId={measurementId} />
      </Suspense>
    </>
  );
}
