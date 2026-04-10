"use client";

import type { FormEvent } from "react";
import { handleFieldValidationOnInput, handleInvalidSubmit } from "@/lib/form-validation";

type ContactFormProps = {
  sourcePage: string;
  leadType?: "kontakt" | "inwestor";
};

export function ContactForm({ sourcePage, leadType = "kontakt" }: ContactFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    handleInvalidSubmit(event);
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

      <label>
        Imię i nazwisko <span className="required-mark">*</span>
        <input type="text" name="full_name" placeholder="Jan Kowalski" required />
      </label>
      <label>
        Telefon <span className="required-mark">*</span>
        <input type="tel" name="phone" placeholder="+48 000 000 000" required />
      </label>
      <label>
        E-mail
        <input type="email" name="email" placeholder="jan@email.com" />
      </label>
      <label>
        Miasto / dzielnica
        <input type="text" name="city_or_district" placeholder="Warszawa, Mokotów" />
      </label>
      <label>
        Preferowana godzina kontaktu
        <input type="text" name="preferred_contact_time" placeholder="Np. 10:00-12:00" />
      </label>
      <label>
        Krótki opis zapytania
        <textarea
          name="message"
          rows={4}
          placeholder="Napisz, czego potrzebujesz i jakiej nieruchomosci dotyczy temat."
        />
      </label>
      <label className="form-consent">
        <input className="consent-checkbox" type="checkbox" name="consent_data" required /> Wyrazam zgode na przetwarzanie danych
        kontaktowych <span className="required-mark">*</span>
      </label>
      <button type="submit">
        <span className="prefooter-btn-text-wrap" aria-hidden="true">
          <span className="prefooter-btn-text prefooter-btn-text-top">Wyślij zapytanie</span>
          <span className="prefooter-btn-text prefooter-btn-text-bottom">Wyślij zapytanie</span>
        </span>
        <span className="sr-only">Wyślij zapytanie</span>
        <span className="prefooter-btn-arrow" aria-hidden="true">
          →
        </span>
      </button>
    </form>
  );
}
