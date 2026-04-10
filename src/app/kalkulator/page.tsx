"use client";

import { useMemo, useState } from "react";

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
        <header className="site-topbar">
          <a href="/" className="site-brand" aria-label="FIND home"><img src="/LOGO.png" alt="FIND" /></a>
          <nav className="site-nav" aria-label="Primary navigation">
            <a href="/">Główna</a><a href="/o-mnie">O mnie</a><a href="/bledy">Błędy</a><a href="/poradnik">Poradnik</a><a href="/kalkulator">Kalkulator</a><a href="/kontakt">Kontakt</a>
          </nav>
          <div className="site-spacer" aria-hidden="true"></div>
        </header>

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
              <a href="/kontakt" className="link-arrow">Umów dokładną wycenę</a>
            </aside>
          </div>
        </div>
      </main>

      <div className="footer-stack">
        <section className="prefooter-stage" aria-label="Sekcja końcowa">
          <div className="prefooter-sticky">
            <div className="prefooter-shell">
              <p className="prefooter-kicker">Koniec przewijania? Zróbmy pierwszy krok.</p>
              <h2>Sprzedaj mieszkanie spokojnie i na dobrych warunkach.</h2>
              <a href="#kontakt" className="prefooter-btn"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span></span><span className="sr-only">Umów konsultację</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
        <footer className="site-footer">
          <div className="container footer-shell">
            <div className="footer-brand"><a href="/" className="footer-logo" aria-label="FIND home"><img src="/LOGO.png" alt="FIND" /></a><p className="footer-copy">Eksperckie wsparcie właściciela mieszkania: od strategii ceny po bezpieczny podpis.</p></div>
            <div className="footer-links"><a href="/">Główna</a><a href="/o-mnie">O mnie</a><a href="/bledy">Błędy</a><a href="/poradnik">Poradnik</a><a href="/kontakt">Kontakt</a></div>
            <div className="footer-social"><a href="#" aria-label="Instagram"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4.1"></circle><circle cx="17.35" cy="6.65" r="1"></circle></svg></span>Instagram</a><a href="#" aria-label="Facebook"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M14.2 8.1h2.2V4.5h-2.6c-3 0-4.6 1.8-4.6 4.9v2H6.8v3.7h2.4V20h3.8v-4.9h2.9l.5-3.7h-3.4V9.8c0-1 .4-1.7 1.6-1.7Z"></path></svg></span>Facebook</a><a href="#" aria-label="LinkedIn"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="9.2" width="3.4" height="10.8"></rect><circle cx="5.7" cy="5.8" r="1.6"></circle><path d="M10 9.2h3.3v1.5c.6-1 1.8-1.8 3.6-1.8 3 0 4.1 2 4.1 5.1V20h-3.5v-5.3c0-1.7-.6-2.6-1.9-2.6-1.5 0-2.2 1.1-2.2 2.6V20H10V9.2Z"></path></svg></span>LinkedIn</a></div>
          </div>
          <div className="container footer-bottom"><p>© {year} FIND. Wszelkie prawa zastrzeżone.</p></div>
        </footer>
      </div>
      <button className="to-top" type="button" aria-label="Wróć na górę" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span aria-hidden="true">↑</span></button>
    </>
  );
}

