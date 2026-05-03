import type { FormEvent } from "react";

type ValidatableField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function isValidatableField(target: EventTarget | null): target is ValidatableField {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

function getValidationMessage(field: ValidatableField): string {
  if (field.validity.valueMissing) return "To pole jest wymagane.";
  if (field.validity.typeMismatch && field.type === "email") return "Podaj poprawny adres e-mail.";
  if (field.validity.typeMismatch && field.type === "tel") return "Podaj poprawny numer telefonu.";
  if (field.validity.badInput) return "Podaj poprawna wartosc.";
  if (field.validity.rangeUnderflow) return "Wartosc jest zbyt niska.";
  if (field.validity.rangeOverflow) return "Wartosc jest zbyt wysoka.";
  if (field.validity.stepMismatch) return "Wprowadz poprawny format wartosci.";
  if (field.validity.tooShort) return "Wprowadz wiecej znakow.";
  if (field.validity.tooLong) return "Wprowadz mniej znakow.";
  if (field.validity.patternMismatch) return "Wprowadz wartosc w poprawnym formacie.";
  return "Sprawdz to pole.";
}

export function markInvalidFields(form: HTMLFormElement) {
  const fields = form.querySelectorAll<ValidatableField>("input, textarea, select");
  fields.forEach((field) => {
    if (!field.willValidate) return;
    field.setCustomValidity("");
    if (!field.validity.valid) {
      field.setCustomValidity(getValidationMessage(field));
    }
    field.dataset.invalid = field.validity.valid ? "false" : "true";
  });
}

export function handleInvalidSubmit(event: FormEvent<HTMLFormElement>) {
  const form = event.currentTarget;
  if (form.checkValidity()) return false;

  event.preventDefault();
  form.classList.add("form--validate");
  markInvalidFields(form);

  const firstInvalid = form.querySelector<ValidatableField>(
    "input[data-invalid='true'], textarea[data-invalid='true'], select[data-invalid='true']",
  );
  firstInvalid?.focus();
  firstInvalid?.reportValidity();
  return true;
}

export function handleFieldValidationOnInput(event: FormEvent<HTMLFormElement>) {
  if (!isValidatableField(event.target)) return;
  if (!event.target.willValidate) return;
  event.target.setCustomValidity("");
  event.target.dataset.invalid = event.target.validity.valid ? "false" : "true";
}

type LeadPayload = {
  fullName: string;
  phone: string;
  leadType: "kontakt" | "inwestor" | "wycena";
  sourcePage: string;
  email?: string;
  message?: string;
  city?: string;
  preferredContactTime?: string;
  district?: string;
  propertyType?: string;
  areaM2?: number;
  rooms?: number;
  condition?: string;
  floor?: string;
  buildingType?: string;
  ownershipType?: string;
  expectedPrice?: string;
  timeline?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  consentData?: boolean;
};

function asText(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function asNumber(formData: FormData, key: string): number | undefined {
  const value = asText(formData, key);
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function buildLeadPayload(form: HTMLFormElement): LeadPayload {
  const formData = new FormData(form);
  const leadType = asText(formData, "lead_type");
  const consentRaw = formData.get("consent_data");

  return {
    fullName: asText(formData, "full_name"),
    phone: asText(formData, "phone"),
    leadType: (leadType || "kontakt") as LeadPayload["leadType"],
    sourcePage: asText(formData, "source_page"),
    email: asText(formData, "email") || undefined,
    message: asText(formData, "message") || undefined,
    city: asText(formData, "city") || asText(formData, "city_or_district") || undefined,
    preferredContactTime: asText(formData, "preferred_contact_time") || undefined,
    district: asText(formData, "district") || undefined,
    propertyType: asText(formData, "property_type") || undefined,
    areaM2: asNumber(formData, "area_m2"),
    rooms: asNumber(formData, "rooms"),
    condition: asText(formData, "condition") || undefined,
    floor: asText(formData, "floor") || undefined,
    buildingType: asText(formData, "building_type") || undefined,
    ownershipType: asText(formData, "ownership_type") || undefined,
    expectedPrice: asText(formData, "expected_price") || undefined,
    timeline: asText(formData, "timeline") || undefined,
    utmSource: asText(formData, "utm_source") || undefined,
    utmMedium: asText(formData, "utm_medium") || undefined,
    utmCampaign: asText(formData, "utm_campaign") || undefined,
    consentData: consentRaw === "on" || consentRaw === "true",
  };
}

export async function submitLeadForm(form: HTMLFormElement) {
  const payload = buildLeadPayload(form);
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  const response = await fetch(`${strapiUrl}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: payload }),
  });

  if (!response.ok) {
    throw new Error(`Lead submit failed: ${response.status}`);
  }
}
