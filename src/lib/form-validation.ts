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
  website?: string;
  email?: string;
  message?: string;
  city?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  consentData?: boolean;
};

const FORM_DETAIL_FIELDS = [
  ["preferred_contact_time", "Preferowana godzina kontaktu"],
  ["district", "Dzielnica"],
  ["property_type", "Typ nieruchomości"],
  ["area_m2", "Metraż (m²)"],
  ["rooms", "Liczba pokoi"],
  ["condition", "Stan nieruchomości"],
  ["floor", "Piętro"],
  ["building_type", "Typ budynku"],
  ["ownership_type", "Forma własności"],
  ["expected_price", "Oczekiwana cena"],
  ["timeline", "Termin sprzedaży"],
] as const;

const FORM_DETAIL_VALUE_LABELS: Record<string, Record<string, string>> = {
  property_type: {
    mieszkanie: "Mieszkanie",
    dom: "Dom",
    lokal: "Lokal",
  },
  condition: {
    do_remontu: "Do remontu",
    dobry: "Dobry",
    bardzo_dobry: "Bardzo dobry",
    premium: "Premium",
  },
};

function asText(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function detailValue(formData: FormData, key: string): string {
  const rawValue = asText(formData, key);
  return FORM_DETAIL_VALUE_LABELS[key]?.[rawValue] ?? rawValue;
}

function buildLeadMessage(formData: FormData): string | undefined {
  const message = asText(formData, "message");
  const details = FORM_DETAIL_FIELDS.map(([key, label]) => {
    const value = detailValue(formData, key);
    return value ? `${label}: ${value}` : null;
  }).filter((item): item is string => Boolean(item));

  if (!details.length) {
    return message || undefined;
  }

  return ["Szczegóły formularza:", ...details, message ? `Wiadomość: ${message}` : ""]
    .filter(Boolean)
    .join("\n");
}

export function buildLeadPayloadFromFormData(formData: FormData): LeadPayload {
  const leadType = asText(formData, "lead_type");
  const consentRaw = formData.get("consent_data");

  return {
    fullName: asText(formData, "full_name"),
    phone: asText(formData, "phone"),
    leadType: (leadType || "kontakt") as LeadPayload["leadType"],
    sourcePage: asText(formData, "source_page"),
    website: asText(formData, "website") || undefined,
    email: asText(formData, "email") || undefined,
    message: buildLeadMessage(formData),
    city: asText(formData, "city") || asText(formData, "city_or_district") || undefined,
    utmSource: asText(formData, "utm_source") || undefined,
    utmMedium: asText(formData, "utm_medium") || undefined,
    utmCampaign: asText(formData, "utm_campaign") || undefined,
    consentData: consentRaw === "on" || consentRaw === "true",
  };
}

function buildLeadPayload(form: HTMLFormElement): LeadPayload {
  return buildLeadPayloadFromFormData(new FormData(form));
}

export async function submitLeadForm(form: HTMLFormElement) {
  const payload = buildLeadPayload(form);
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: payload }),
  });

  if (!response.ok) {
    let errorText = `Lead submit failed: ${response.status}`;
    try {
      const body = (await response.json()) as { error?: string; details?: string[] };
      if (body?.details?.length) {
        errorText = body.details.join(" ");
      } else if (body?.error) {
        errorText = body.error;
      }
    } catch {
      // ignore JSON parse errors and keep fallback message
    }
    throw new Error(errorText);
  }
}
