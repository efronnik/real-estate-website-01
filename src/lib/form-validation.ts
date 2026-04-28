import type { FormEvent } from "react";

type ValidatableField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function isValidatableField(target: EventTarget | null): target is ValidatableField {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

export function markInvalidFields(form: HTMLFormElement) {
  const fields = form.querySelectorAll<ValidatableField>("input, textarea, select");
  fields.forEach((field) => {
    if (!field.willValidate) return;
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
  return true;
}

export function handleFieldValidationOnInput(event: FormEvent<HTMLFormElement>) {
  if (!isValidatableField(event.target)) return;
  if (!event.target.willValidate) return;
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
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  consentData?: boolean;
};

function asText(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
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
