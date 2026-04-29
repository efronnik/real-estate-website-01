"use client";

import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { ROUTE_PATHS } from "@/config/navigation";

const MIN_AREA = 15;
const MAX_AREA = 300;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const basePricePerM2 = 14500;

const conditionOptions = [
  { label: "Do remontu", value: 0.9 },
  { label: "Dobry", value: 1 },
  { label: "Bardzo dobry", value: 1.08 },
  { label: "Premium", value: 1.15 },
];

const districtOptions = [
  { label: "Niższa", value: 0.92 },
  { label: "Standardowa", value: 1 },
  { label: "Wysoka", value: 1.1 },
  { label: "Top", value: 1.2 },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const formatPln = (value: number) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(value);

// Day 6 architectural decision: Kalkulator remains a code-driven tool (option A),
// not a CMS-managed landing for hero/SEO/CTA content.
export default function KalkulatorPage() {
  const year = new Date().getFullYear();
  const [area, setArea] = useState(50);
  const [rooms, setRooms] = useState(2);
  const [conditionFactor, setConditionFactor] = useState(1);
  const [districtFactor, setDistrictFactor] = useState(1);

  const estimate = useMemo(() => {
    const raw = area * basePricePerM2 * conditionFactor * districtFactor;
    return Math.round(raw / 1000) * 1000;
  }, [area, conditionFactor, districtFactor]);

  return (
    <>
      <main className="calculator-page">
        <SiteTopbar />

        <div className="container calc-shell">
          <section className="calc-hero">
            <video className="calculator-video-bg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
              <source src="/Hero-Calculator.mp4" type="video/mp4" />
            </video>
            <div className="calculator-video-overlay" aria-hidden="true"></div>
            <header className="calc-head">
              <p className="eyebrow">Kalkulator</p>
              <h1 className="section-title">Szybki szacunek wartości mieszkania</h1>
              <p className="section-copy">To orientacyjny kalkulator. Finalna wycena zależy od lokalizacji, stanu nieruchomości i strategii sprzedaży.</p>
            </header>
          </section>

          <div className="calc-grid">
            <div className="calc-grid-overlay" aria-hidden="true"></div>
            <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
              <label>
                Metraż (m²)
                <div className="input-row">
                  <input value={area} type="number" min={MIN_AREA} max={MAX_AREA} onChange={(e) => setArea(clamp(Number(e.target.value || MIN_AREA), MIN_AREA, MAX_AREA))} />
                  <span className="unit">m²</span>
                </div>
                <input className="range" value={area} type="range" min={MIN_AREA} max={MAX_AREA} step={1} onChange={(e) => setArea(clamp(Number(e.target.value), MIN_AREA, MAX_AREA))} />
              </label>

              <label>
                Liczba pokoi
                <div className="rooms-grid">
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                    <button key={`room-${n}`} type="button" className={`chip ${rooms === n ? "active" : ""}`} onClick={() => setRooms(clamp(n, MIN_ROOMS, MAX_ROOMS))}>
                      {n}
                    </button>
                  ))}
                </div>
              </label>

              <label>
                Stan mieszkania
                <div className="chips-row">
                  {conditionOptions.map((option) => (
                    <button key={`cond-${option.value}`} type="button" className={`chip chip-wide ${conditionFactor === option.value ? "active" : ""}`} onClick={() => setConditionFactor(option.value)}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </label>

              <label>
                Atrakcyjność lokalizacji
                <div className="chips-row">
                  {districtOptions.map((option) => (
                    <button key={`dist-${option.value}`} type="button" className={`chip chip-wide ${districtFactor === option.value ? "active" : ""}`} onClick={() => setDistrictFactor(option.value)}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </label>
            </form>

            <aside className="calc-result">
              <p className="result-kicker">Szacowana wartość</p>
              <strong className="result-value">{formatPln(estimate)}</strong>
              <p className="muted">Założenie bazowe: {formatPln(basePricePerM2)} / m², rynek Warszawa.</p>
              <div className="result-meta">
                <p><span>Metraż</span><strong>{area} m²</strong></p>
                <p><span>Pokoje</span><strong>{rooms}</strong></p>
                <p><span>Stan</span><strong>{conditionFactor.toFixed(2)}x</strong></p>
                <p><span>Lokalizacja</span><strong>{districtFactor.toFixed(2)}x</strong></p>
              </div>
              <a href={ROUTE_PATHS.kontakt} className="link-arrow">Umów dokładną wycenę</a>
            </aside>
          </div>
        </div>
      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Koniec przewijania? Zróbmy pierwszy krok."
          title="Sprzedaj mieszkanie spokojnie i na dobrych warunkach."
          buttons={[{ href: "/kontakt", label: "Umów konsultację" }]}
        />
        <SiteFooter year={year} />
      </div>
      <ScrollToTopButton />
    </>
  );
}

