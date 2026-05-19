"use client";

import { LeadForm } from "@/components/lead-form";

type WycenaStep = {
  title: string;
  text: string;
};

type WycenaSectionProps = {
  sourcePage: string;
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  promise?: string;
  steps?: WycenaStep[];
  consultationNote?: string;
  helperText?: string;
  submitLabel?: string;
  successMessage?: string;
};

const defaultCopy = {
  eyebrow: "Wycena nieruchomości",
  title: "Zostaw dane do szybkiej wyceny",
  lead: "Uzupełnij formularz, a przygotujemy wstępną analizę i skontaktujemy się z Tobą z kolejnym krokiem.",
  helperText: "Wstępna wycena to pierwszy krok. Po analizie skontaktujemy się z rekomendowanym scenariuszem działania.",
  submitLabel: "Wyślij wycenę",
  successMessage:
    "Dziękujemy. Formularz wyceny został wysłany. Wrócimy z odpowiedzią maksymalnie w 1 dzień roboczy.",
};

export function WycenaSection({
  sourcePage,
  sectionId = "wycena",
  eyebrow = defaultCopy.eyebrow,
  title = defaultCopy.title,
  lead = defaultCopy.lead,
  promise,
  steps,
  consultationNote,
  helperText = defaultCopy.helperText,
  submitLabel = defaultCopy.submitLabel,
  successMessage = defaultCopy.successMessage,
}: WycenaSectionProps) {
  return (
    <section className="section cta" id={sectionId}>
      <div className="container">
        <div className="shell">
          <div className="copy">
            <div className="map-overlay"></div>
            <p className="vertical-label">Wycena</p>
            <div className="copy-inner">
              <p className="eyebrow">{eyebrow}</p>
              <h2>{title}</h2>
              <p>{lead}</p>
              {promise ? <p className="wycena-promise">{promise}</p> : null}
              {steps && steps.length > 0 ? (
                <ol className="wycena-steps">
                  {steps.map((step) => (
                    <li key={step.title}>
                      <strong>{step.title}</strong>
                      <span>{step.text}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
              {consultationNote ? <p className="wycena-consultation">{consultationNote}</p> : null}
            </div>
          </div>

          <LeadForm
            sourcePage={sourcePage}
            leadType="wycena"
            helperText={helperText}
            submitLabel={submitLabel}
            successMessage={successMessage}
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
              E-mail <span className="required-mark">*</span>
              <input type="email" name="email" placeholder="jan@email.com" required />
            </label>
            <label>
              Miasto <span className="required-mark">*</span>
              <input type="text" name="city" placeholder="Warszawa" required />
            </label>
            <label>
              Dzielnica
              <input type="text" name="district" placeholder="Mokotów" />
            </label>
            <label>
              Typ nieruchomości <span className="required-mark">*</span>
              <select name="property_type" required>
                <option value="">Wybierz typ</option>
                <option value="mieszkanie">Mieszkanie</option>
                <option value="dom">Dom</option>
                <option value="lokal">Lokal</option>
              </select>
            </label>
            <label>
              Metraż (m²) <span className="required-mark">*</span>
              <input type="number" name="area_m2" min={10} step="1" placeholder="58" required />
            </label>
            <label>
              Liczba pokoi <span className="required-mark">*</span>
              <input type="number" name="rooms" min={1} step="1" placeholder="3" required />
            </label>
            <label>
              Stan nieruchomości
              <select name="condition">
                <option value="">Wybierz stan</option>
                <option value="do_remontu">Do remontu</option>
                <option value="dobry">Dobry</option>
                <option value="bardzo_dobry">Bardzo dobry</option>
                <option value="premium">Premium</option>
              </select>
            </label>
            <label>
              Piętro
              <input type="text" name="floor" placeholder="Np. 3/8" />
            </label>
            <label>
              Typ budynku
              <input type="text" name="building_type" placeholder="Np. blok, kamienica" />
            </label>
            <label>
              Forma własności
              <input type="text" name="ownership_type" placeholder="Np. pełna własność" />
            </label>
            <label>
              Oczekiwana cena
              <input type="text" name="expected_price" placeholder="Np. 950000 PLN" />
            </label>
            <label>
              Termin sprzedaży
              <input type="text" name="timeline" placeholder="Np. 1–3 miesiące" />
            </label>
            <label>
              Dodatkowe informacje
              <textarea
                name="message"
                rows={4}
                placeholder="Wpisz informacje o nieruchomości i sytuacji sprzedaży."
              />
            </label>
          </LeadForm>
        </div>
      </div>
    </section>
  );
}
