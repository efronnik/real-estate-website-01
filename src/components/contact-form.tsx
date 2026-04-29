"use client";

import { LeadForm } from "@/components/lead-form";

type ContactFormProps = {
  sourcePage: string;
  leadType?: "kontakt" | "inwestor";
};

export function ContactForm({ sourcePage, leadType = "kontakt" }: ContactFormProps) {
  return (
    <LeadForm
      sourcePage={sourcePage}
      leadType={leadType}
      helperText="Odpowiadamy zwykle w ciagu jednego dnia roboczego."
      submitLabel="Wyślij zapytanie"
      successMessage="Dziekujemy. Formularz zostal wyslany. Potwierdzimy kontakt maksymalnie w 1 dzien roboczy."
    >
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
    </LeadForm>
  );
}
