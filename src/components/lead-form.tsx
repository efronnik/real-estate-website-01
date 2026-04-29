"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { ROUTE_PATHS } from "@/config/navigation";
import { handleFieldValidationOnInput, handleInvalidSubmit, submitLeadForm } from "@/lib/form-validation";

type StatusType = "success" | "error" | null;
type LeadType = "kontakt" | "inwestor" | "wycena";

type LeadFormProps = {
  sourcePage: string;
  leadType: LeadType;
  helperText: string;
  submitLabel: string;
  successMessage: string;
  errorMessage?: string;
  children: ReactNode;
};

export function LeadForm({
  sourcePage,
  leadType,
  helperText,
  submitLabel,
  successMessage,
  errorMessage = "Nie udalo sie wyslac formularza. Sprawdz pola i sprobuj ponownie za chwile.",
  children,
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<StatusType>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasInvalidFields = handleInvalidSubmit(event);
    if (hasInvalidFields) return;

    setIsSubmitting(true);
    setStatusMessage(null);
    setStatusType(null);

    try {
      await submitLeadForm(event.currentTarget);
      event.currentTarget.reset();
      setStatusMessage(successMessage);
      setStatusType("success");
    } catch {
      setStatusMessage(errorMessage);
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldInput = (event: FormEvent<HTMLFormElement>) => {
    handleFieldValidationOnInput(event);
  };

  return (
    <form className="form" noValidate onSubmit={handleSubmit} onInput={handleFieldInput}>
      <input type="hidden" name="lead_type" value={leadType} />
      <input type="hidden" name="source_page" value={sourcePage} />
      <input type="hidden" name="language" value="pl" />
      <input type="hidden" name="utm_source" value="" />
      <input type="hidden" name="utm_medium" value="" />
      <input type="hidden" name="utm_campaign" value="" />

      <p className="form-helper">
        {helperText} Pola oznaczone <span className="required-mark">*</span> sa wymagane.
      </p>

      {children}

      <label className="form-consent">
        <input className="consent-checkbox" type="checkbox" name="consent_data" required /> Wyrazam zgode na przetwarzanie danych
        kontaktowych zgodnie z{" "}
        <Link href={ROUTE_PATHS.politykaPrywatnosci}>Polityka prywatnosci</Link> oraz zasadami{" "}
        <Link href={ROUTE_PATHS.rodo}>RODO</Link> <span className="required-mark">*</span>
      </label>
      <label className="form-consent form-consent--secondary">
        <input className="consent-checkbox" type="checkbox" name="consent_regulations" required /> Potwierdzam, ze zapoznalem/am
        sie z informacja o przetwarzaniu danych i prawach osoby, ktorej dane dotycza{" "}
        <span className="required-mark">*</span>
      </label>
      <button type="submit" disabled={isSubmitting}>
        <span className="prefooter-btn-text-wrap" aria-hidden="true">
          <span className="prefooter-btn-text prefooter-btn-text-top">{isSubmitting ? "Wysyłanie..." : submitLabel}</span>
          <span className="prefooter-btn-text prefooter-btn-text-bottom">{isSubmitting ? "Wysyłanie..." : submitLabel}</span>
        </span>
        <span className="sr-only">{isSubmitting ? "Wysyłanie..." : submitLabel}</span>
        <span className="prefooter-btn-arrow" aria-hidden="true">
          →
        </span>
      </button>
      {statusMessage ? (
        <p
          className={`form-status ${statusType ? `form-status--${statusType}` : ""}`}
          role="status"
          aria-live={statusType === "error" ? "assertive" : "polite"}
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
