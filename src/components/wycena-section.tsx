"use client";

import type { FormEvent } from "react";
import { handleFieldValidationOnInput, handleInvalidSubmit } from "@/lib/form-validation";

type WycenaSectionProps = {
  sourcePage: string;
  sectionId?: string;
};

export function WycenaSection({ sourcePage, sectionId = "wycena" }: WycenaSectionProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    handleInvalidSubmit(event);
  };

  const handleFieldInput = (event: FormEvent<HTMLFormElement>) => {
    handleFieldValidationOnInput(event);
  };

  return (
    <section className="section cta" id={sectionId}>
      <div className="container">
        <div className="shell">
          <div className="copy">
            <div className="map-overlay"></div>
            <p className="vertical-label">Wycena</p>
            <div className="copy-inner">
              <p className="eyebrow">Wycena nieruchomosci</p>
              <h2>Zostaw dane do szybkiej wyceny</h2>
              <p>
                Uzupelnij formularz, a przygotujemy wstepna analize i skontaktujemy sie z
                Toba z kolejnym krokiem.
              </p>
            </div>
          </div>

          <form className="form" noValidate onSubmit={handleSubmit} onInput={handleFieldInput}>
            <input type="hidden" name="lead_type" value="wycena" />
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
              E-mail <span className="required-mark">*</span>
              <input type="email" name="email" placeholder="jan@email.com" required />
            </label>
            <label>
              Miasto <span className="required-mark">*</span>
              <input type="text" name="city" placeholder="Warszawa" required />
            </label>
            <label>
              Dzielnica
              <input type="text" name="district" placeholder="Mokotow" />
            </label>
            <label>
              Typ nieruchomosci <span className="required-mark">*</span>
              <select name="property_type" required>
                <option value="">Wybierz typ</option>
                <option value="mieszkanie">Mieszkanie</option>
                <option value="dom">Dom</option>
                <option value="lokal">Lokal</option>
              </select>
            </label>
            <label>
              Metraz (m2) <span className="required-mark">*</span>
              <input type="number" name="area_m2" min={10} step="1" placeholder="58" required />
            </label>
            <label>
              Liczba pokoi <span className="required-mark">*</span>
              <input type="number" name="rooms" min={1} step="1" placeholder="3" required />
            </label>
            <label>
              Stan nieruchomosci
              <select name="condition">
                <option value="">Wybierz stan</option>
                <option value="do_remontu">Do remontu</option>
                <option value="dobry">Dobry</option>
                <option value="bardzo_dobry">Bardzo dobry</option>
                <option value="premium">Premium</option>
              </select>
            </label>
            <label>
              Pietro
              <input type="text" name="floor" placeholder="Np. 3/8" />
            </label>
            <label>
              Typ budynku
              <input type="text" name="building_type" placeholder="Np. blok, kamienica" />
            </label>
            <label>
              Forma wlasnosci
              <input type="text" name="ownership_type" placeholder="Np. pelna wlasnosc" />
            </label>
            <label>
              Oczekiwana cena
              <input type="text" name="expected_price" placeholder="Np. 950000 PLN" />
            </label>
            <label>
              Termin sprzedazy
              <input type="text" name="timeline" placeholder="Np. 1-3 miesiace" />
            </label>
            <label>
              Dodatkowe informacje
              <textarea
                name="message"
                rows={4}
                placeholder="Wpisz informacje o nieruchomosci i sytuacji sprzedazy."
              />
            </label>
            <label className="form-consent">
              <input className="consent-checkbox" type="checkbox" name="consent_data" required /> Wyrazam zgode na
              przetwarzanie danych kontaktowych <span className="required-mark">*</span>
            </label>

            <button type="submit">
              <span className="prefooter-btn-text-wrap" aria-hidden="true">
                <span className="prefooter-btn-text prefooter-btn-text-top">Wyślij wycenę</span>
                <span className="prefooter-btn-text prefooter-btn-text-bottom">Wyślij wycenę</span>
              </span>
              <span className="sr-only">Wyślij wycenę</span>
              <span className="prefooter-btn-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
