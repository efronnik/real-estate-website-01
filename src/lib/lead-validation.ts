export type LeadType = "kontakt" | "inwestor" | "wycena";

export type LeadPayload = {
  fullName: string;
  phone: string;
  leadType: LeadType;
  leadStatus: "new";
  sourcePage: string;
  email?: string;
  message?: string;
  city?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  consentData?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-.\s\d]{6,25}$/;
const SOURCE_PAGE_RE = /^[a-z0-9\-_/]{1,120}$/i;
const ALLOWED_LEAD_TYPES: LeadType[] = ["kontakt", "inwestor", "wycena"];

export function sanitizeText(value: unknown, maxLen = 255): string | undefined {
  if (typeof value !== "string") return undefined;
  const withoutTags = value.replace(/<[^>]*>/g, "");
  const cleaned = withoutTags.replace(/\s+/g, " ").trim();
  if (!cleaned) return undefined;
  return cleaned.slice(0, maxLen);
}

export function sanitizeBoolean(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === 1;
}

export function normalizePhone(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  return raw.replace(/\s+/g, " ").trim();
}

export function validateAndSanitizeLead(input: Record<string, unknown>) {
  const errors: string[] = [];
  const rawSourcePage = typeof input.sourcePage === "string" ? input.sourcePage.trim() : "";

  const fullName = sanitizeText(input.fullName, 120);
  const phone = normalizePhone(sanitizeText(input.phone, 25));
  const rawLeadType = sanitizeText(input.leadType, 20);
  const sourcePage = sanitizeText(input.sourcePage, 120);
  const email = sanitizeText(input.email, 160);
  const message = sanitizeText(input.message, 2000);
  const city = sanitizeText(input.city, 120);
  const utmSource = sanitizeText(input.utmSource, 120);
  const utmMedium = sanitizeText(input.utmMedium, 120);
  const utmCampaign = sanitizeText(input.utmCampaign, 120);
  const consentData = sanitizeBoolean(input.consentData);

  if (!fullName || fullName.length < 2) {
    errors.push("fullName is required.");
  }

  if (!phone || !PHONE_RE.test(phone)) {
    errors.push("phone is invalid.");
  }

  if (!rawLeadType || !ALLOWED_LEAD_TYPES.includes(rawLeadType as LeadType)) {
    errors.push("leadType is invalid.");
  }

  if (!sourcePage) {
    errors.push("sourcePage is required.");
  } else if (/[<>]/.test(rawSourcePage)) {
    errors.push("sourcePage is invalid.");
  } else if (!SOURCE_PAGE_RE.test(sourcePage)) {
    errors.push("sourcePage is invalid.");
  }

  if (email && !EMAIL_RE.test(email)) {
    errors.push("email is invalid.");
  }

  if (!consentData) {
    errors.push("consentData must be accepted.");
  }

  if (errors.length > 0) {
    return { ok: false as const, errors };
  }

  const payload: LeadPayload = {
    fullName: fullName!,
    phone: phone!,
    leadType: rawLeadType as LeadType,
    leadStatus: "new",
    sourcePage: sourcePage!,
    email,
    message,
    city,
    utmSource,
    utmMedium,
    utmCampaign,
    consentData,
  };

  return { ok: true as const, payload };
}
