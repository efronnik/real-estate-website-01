import { isGaTrackingAllowed } from "@/lib/analytics-consent";
import { resolveCurrentUtm, utmRecordForGa } from "@/lib/utm-attribution";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type Ga4ParamValue = string | number | boolean;

function pruneParams(params: Record<string, Ga4ParamValue | undefined>) {
  const out: Record<string, Ga4ParamValue> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      out[key] = value;
    }
  }
  return out;
}

/** Strip query/hash and sensitive paths — avoid PII in GA event params. */
export function sanitizeUrlForGa(href: string): string {
  if (typeof window === "undefined") {
    return "";
  }
  try {
    const u = new URL(href, window.location.origin);
    if (u.protocol === "mailto:" || u.protocol === "tel:") {
      return u.protocol.replace(":", "");
    }
    return `${u.origin}${u.pathname}`.slice(0, 500);
  } catch {
    return "";
  }
}

export function sendGa4Event(eventName: string, params?: Record<string, Ga4ParamValue | undefined>) {
  if (typeof window === "undefined") return;
  if (!isGaTrackingAllowed()) return;

  const payload = params ? pruneParams(params) : undefined;
  const { gtag, dataLayer } = window;

  const eventParams = payload ?? {};

  if (typeof gtag === "function") {
    gtag("event", eventName, eventParams);
    return;
  }

  if (Array.isArray(dataLayer)) {
    dataLayer.push(["event", eventName, eventParams]);
  }
}

export function normalizeLeadSubmitError(message: string): string {
  const status = message.match(/\b(\d{3})\b/);
  if (status) {
    return `http_${status[1]}`;
  }
  const trimmed = message.replace(/\s+/g, " ").trim().slice(0, 80);
  if (!trimmed) {
    return "unknown";
  }
  const safe = trimmed.replace(/[^\p{L}\p{N}\s_.-]/gu, "").slice(0, 48);
  return safe || "submit_failed";
}

/** Values posted in `lead_type` hidden field */
export type LeadFormVariant = "kontakt" | "inwestor" | "wycena";

/** GA4 `form_type`: kontakt vs wycena form UI */
function analyticsFormType(variant: LeadFormVariant): "kontakt" | "wycena" {
  return variant === "wycena" ? "wycena" : "kontakt";
}

/** GA4 `lead_type`: business lane (wycena funnel → sprzedaz) */
function analyticsLeadLane(variant: LeadFormVariant): "sprzedaz" | "inwestor" | "kontakt" {
  if (variant === "wycena") {
    return "sprzedaz";
  }
  if (variant === "inwestor") {
    return "inwestor";
  }
  return "kontakt";
}

function leadUtmParams() {
  return utmRecordForGa(resolveCurrentUtm());
}

export function trackLeadFormSubmit(variant: LeadFormVariant, sourcePage: string) {
  sendGa4Event("lead_form_submit", {
    form_type: analyticsFormType(variant),
    lead_type: analyticsLeadLane(variant),
    source_page: sourcePage,
    status: "success",
    ...leadUtmParams(),
  });
}

export function trackLeadFormError(variant: LeadFormVariant, sourcePage: string, errorReason: string) {
  sendGa4Event("lead_form_error", {
    form_type: analyticsFormType(variant),
    lead_type: analyticsLeadLane(variant),
    source_page: sourcePage,
    status: "error",
    error_reason: errorReason,
    ...leadUtmParams(),
  });
}

function slugForCtaId(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\da-z]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 48);
}

export function trackCtaClick(placement: string, ctaLabel: string, linkUrl: string) {
  const place = slugForCtaId(placement) || "placement";
  const label = slugForCtaId(ctaLabel) || "cta";
  const ctaId = `${place}__${label}`.replace(/_+/g, "_").slice(0, 95);

  sendGa4Event("cta_click", {
    placement,
    cta_id: ctaId,
    cta_label: ctaLabel,
    link_url: sanitizeUrlForGa(linkUrl),
  });
}

function contactChannelFromHref(href: string): "phone" | "email" | "messenger" | null {
  const h = href.trim().toLowerCase();
  if (h.startsWith("tel:")) {
    return "phone";
  }
  if (h.startsWith("mailto:")) {
    return "email";
  }
  if (
    h.includes("wa.me/") ||
    h.includes("api.whatsapp.com") ||
    h.includes("t.me/") ||
    h.includes("telegram.me/") ||
    h.includes("telegram.org")
  ) {
    return "messenger";
  }
  return null;
}

/** Fire only for tel / mailto / messenger URLs (no PII in event params). */
export function trackContactClick(href: string) {
  const contactType = contactChannelFromHref(href);
  if (!contactType) {
    return;
  }
  sendGa4Event("contact_click", {
    contact_type: contactType,
    placement: "contact",
    cta_id: `contact__${contactType}`,
  });
}
