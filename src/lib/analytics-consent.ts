import { getGaMeasurementId } from "@/lib/ga-measurement-id";

export const ANALYTICS_CONSENT_STORAGE_KEY = "find_analytics_consent_v1";

export const ANALYTICS_CONSENT_CHANGE_EVENT = "find-analytics-consent";

export type AnalyticsConsentChoice = "granted" | "denied";

export function analyticsConsentBannerEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_CONSENT_BANNER === "true";
}

export function readAnalyticsConsent(): AnalyticsConsentChoice | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    if (raw === "granted" || raw === "denied") {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

export function writeAnalyticsConsent(choice: AnalyticsConsentChoice) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, choice);
  } catch {
    // private mode / quota
  }
}

export function notifyAnalyticsConsentChanged() {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGE_EVENT));
}

/** GA4 / gtag events and tags should run only when this returns true. */
export function isGaTrackingAllowed(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  if (!getGaMeasurementId()) {
    return false;
  }
  if (!analyticsConsentBannerEnabled()) {
    return true;
  }
  return readAnalyticsConsent() === "granted";
}
