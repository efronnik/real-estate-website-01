"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ROUTE_PATHS } from "@/config/navigation";
import {
  analyticsConsentBannerEnabled,
  notifyAnalyticsConsentChanged,
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/lib/analytics-consent";
import { getGaMeasurementId } from "@/lib/ga-measurement-id";

export function CookieConsentBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!analyticsConsentBannerEnabled() || !getGaMeasurementId()) {
      return;
    }
    /* eslint-disable react-hooks/set-state-in-effect -- show banner when no stored choice */
    if (readAnalyticsConsent() === null) {
      setOpen(true);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  if (!open) {
    return null;
  }

  const choose = (granted: boolean) => {
    writeAnalyticsConsent(granted ? "granted" : "denied");
    setOpen(false);
    notifyAnalyticsConsentChanged();
  };

  return (
    <div
      className="cookie-consent-bar"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      aria-live="polite"
    >
      <div className="cookie-consent-inner container">
        <p id="cookie-consent-title" className="cookie-consent-text">
          Używamy Google Analytics, aby rozumieć ruch na stronie. Dane są przetwarzane zgodnie z{" "}
          <span id="cookie-consent-description" className="sr-only">
            Baner zgody na analityke. Wybierz akceptacje lub odrzucenie analityki.
          </span>
          <Link href={ROUTE_PATHS.politykaPrywatnosci}>Polityką prywatności</Link>. Możesz zaakceptować analitykę lub
          odrzucić — wtedy nie ładujemy skryptów pomiarowych.
        </p>
        <div className="cookie-consent-actions">
          <button type="button" className="cookie-consent-btn cookie-consent-btn--secondary" onClick={() => choose(false)}>
            Odrzuć analitykę
          </button>
          <button type="button" className="cookie-consent-btn cookie-consent-btn--primary" onClick={() => choose(true)}>
            Akceptuję analitykę
          </button>
        </div>
      </div>
    </div>
  );
}
