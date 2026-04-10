"use client";

import { useEffect, useRef, useState } from "react";

const valueSteps = [
  {
    title: "Lepsza cena sprzedaży",
    desc: "Lepsze pozycjonowanie oferty i spokojne negocjacje, które pomagają utrzymać mocną cenę.",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    title: "Krótszy czas na rynku",
    desc: "Precyzyjna selekcja zapytań i mocna prezentacja nieruchomości.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    title: "Spokój i kontrola procesu",
    desc: "Jasne etapy współpracy i domknięcie formalności bez chaosu.",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    title: "Finalizacja z wynikiem",
    desc: "Negocjacje prowadzone tak, by bronić ceny i interesu właściciela.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
];

const processSteps = [
  { label: "01", title: "Diagnoza i pozycjonowanie", text: "Szybka diagnoza sytuacji mieszkania i rynku. Ustalamy plan, który daje realną przewagę właścicielowi.", hero: "Diagnoza", image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80" },
  { label: "02", title: "Przygotowanie i publikacja", text: "Materiały premium i narracja, która pokazuje wartość mieszkania oraz prowadzi klienta do decyzji.", hero: "Ekspozycja", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" },
  { label: "03", title: "Pokazy i negocjacje", text: "Prowadzę rozmowy i zarządzam dynamiką tak, aby bronić ceny i domykać transakcje.", hero: "Negocjacje", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80" },
  { label: "04", title: "Final i przekazanie", text: "Domykamy formalności, terminy i podpis. Bez chaosu i bez ryzyka utraty kontroli.", hero: "Finalizacja", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80" },
];

const results = [
  { title: "Sprzedaż po 2 miesiącach ciszy", desc: "Problem: oferta bez zapytań. Działanie: nowa strategia wejścia i materiały premium. Efekt: finalizacja w 3 tygodnie.", image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { title: "Negocjacje bez dużej obniżki", desc: "Problem: presja kupujących na szybkie zejście z ceny. Działanie: scenariusz rozmów i jasne punkty obrony ceny.", image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { title: "Więcej jakościowych zapytań", desc: "Problem: słaba prezentacja mieszkania. Działanie: profesjonalna sesja i dopracowany opis oferty.", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800" },
];

const reviews = [
  { quote: "W końcu mieliśmy plan. Sprzedaż przestała być chaosem i domknęła się szybciej, niż zakładaliśmy.", author: "Daniela A." },
  { quote: "Największa różnica? Spokój i konkretne decyzje na każdym etapie. Czuć, że proces jest pod kontrolą.", author: "Tina H." },
  { quote: "Profesjonalna prezentacja i bardzo dobrze poprowadzone negocjacje. Finalna cena była wyższa niż zakładałam.", author: "Sandra D." },
];

export default function Home() {
  const year = new Date().getFullYear();
  const [heroReady, setHeroReady] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const [activeResult, setActiveResult] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(1);
  const valueRefs = useRef<Array<HTMLElement | null>>([]);
  const resultRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setHeroReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const updateByCenter = (refs: Array<HTMLElement | null>, setter: (idx: number) => void) => {
      const viewportCenter = window.innerHeight * 0.45;
      let next = 0;
      let minDistance = Number.POSITIVE_INFINITY;
      refs.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = Math.abs(center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          next = idx;
        }
      });
      setter(next);
    };

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateByCenter(valueRefs.current, setActiveValue);
        updateByCenter(resultRefs.current, setActiveResult);
        rafId = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const reviewAt = (offset: number) => {
    const len = reviews.length;
    return reviews[(reviewIndex + offset + len) % len];
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <main>
        <section className="cp-hero">
          <header className="cp-topbar">
            <a href="/" className="cp-brand" aria-label="FIND home"><img src="/LOGO.png" alt="FIND" /></a>
            <nav className="cp-nav" aria-label="Primary navigation">
              <a href="/">Główna</a><a href="/o-mnie">O mnie</a><a href="/bledy">Błędy</a><a href="/poradnik">Poradnik</a><a href="/kalkulator">Kalkulator</a><a href="/kontakt">Kontakt</a>
            </nav>
            <a href="#kontakt" className="cp-sign">
              <span className="prefooter-btn-text-wrap" aria-hidden="true">
                <span className="prefooter-btn-text prefooter-btn-text-top">Umów rozmowę</span>
                <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów rozmowę</span>
              </span>
              <span className="sr-only">Umów rozmowę</span>
            </a>
          </header>

          <video className="cp-video-bg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/Hero-Warszaw.mp4" type="video/mp4" /></video>
          <div className="cp-video-overlay" aria-hidden="true"></div>
          <div className="cp-content">
            <h1 className={`hero-title ${heroReady ? "ready" : ""}`}><span className="hero-word-mask"><span className="hero-word">Sprzedaj</span></span><span className="hero-word-mask"><span className="hero-word">mieszkanie</span></span></h1>
            <p className={`hero-subtitle ${heroReady ? "ready" : ""}`}>Pokażę błędy i dam jasny plan sprzedaży.</p>
            <a href="#kontakt" className={`cp-btn hero-cta ${heroReady ? "ready" : ""}`}>
              <span className="prefooter-btn-text-wrap" aria-hidden="true">
                <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span>
                <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span>
              </span>
              <span className="sr-only">Umów konsultację</span>
              <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="section value">
          <div className="container value-layout">
            <aside className="value-copy">
              <p className="eyebrow">Co zyskujesz</p>
              <h2 className="value-title">Kluczowe korzyści współpracy</h2>
              <div className="value-progress">{activeValue + 1} / {valueSteps.length}</div>
              <p className="value-lead">{valueSteps[activeValue]?.title}</p>
              <p className="value-desc">{valueSteps[activeValue]?.desc}</p>
            </aside>
            <div className="value-visuals">
              {valueSteps.map((step, idx) => (
                <article key={step.title} ref={(el) => { valueRefs.current[idx] = el; }} className={`visual-card ${idx === activeValue ? "active" : ""}`}><img src={step.image} alt={step.title} /></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <header className="process-head"><p className="eyebrow">Proces pracy</p><h2 className="section-title">Jak prowadzimy sprzedaż od strategii do podpisu</h2></header>
          </div>
          <div className="service-board">
            {processSteps.map((step) => (
              <article key={step.title} className="service-row" style={{ ["--bg" as string]: `url(${step.image})` }}>
                <div className="service-info"><p className="idx"><span className="idx-text">{step.label}</span></p><h3>{step.title}</h3><p>{step.text}</p></div>
                <div className="service-word"><span>{step.hero}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section results">
          <div className="container results-layout">
            <div className="results-visuals">
              {results.map((item, idx) => (
                <article key={item.title} ref={(el) => { resultRefs.current[idx] = el; }} className={`result-card ${idx === activeResult ? "active" : ""}`}><img src={item.image} alt={item.title} /></article>
              ))}
            </div>
            <aside className="results-copy">
              <p className="eyebrow">Rezultaty</p>
              <h2 className="results-title">Przykłady efektów współpracy</h2>
              <div className="results-progress">{activeResult + 1} / {results.length}</div>
              <p className="results-lead">{results[activeResult]?.title}</p>
              <p className="results-desc">{results[activeResult]?.desc}</p>
            </aside>
          </div>
        </section>

        <section className="section trust">
          <div className="container"><div className="trust-shell">
            <div className="trust-head"><p className="eyebrow">Dlaczego klienci ufają</p><h2 className="section-title">Dowody, nie obietnice</h2></div>
            <div className="trust-stats">
              <article className="stat"><strong>100+</strong><p>przeprowadzonych procesów sprzedaży</p></article>
              <article className="stat"><strong>4.9/5</strong><p>średnia ocena współpracy klientów</p></article>
              <article className="stat"><strong>1:1</strong><p>opiekun prowadzący od diagnozy do finału</p></article>
            </div>
            <div className="trust-slider">
              <div className="slider-head"><h3>Opinie klientów</h3><div className="controls"><button onClick={() => setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}>←</button><button onClick={() => setReviewIndex((prev) => (prev + 1) % reviews.length)}>→</button></div></div>
              <div className="track">
                <article className="quote-card side"><p className="stars">★★★★★</p><blockquote>{reviewAt(-1).quote}</blockquote><footer><strong>{reviewAt(-1).author}</strong><span>Zweryfikowana opinia</span></footer></article>
                <article className="quote-card center"><p className="stars">★★★★★</p><blockquote>{reviewAt(0).quote}</blockquote><footer><strong>{reviewAt(0).author}</strong><span>Zweryfikowana opinia</span></footer></article>
                <article className="quote-card side"><p className="stars">★★★★★</p><blockquote>{reviewAt(1).quote}</blockquote><footer><strong>{reviewAt(1).author}</strong><span>Zweryfikowana opinia</span></footer></article>
              </div>
            </div>
          </div></div>
        </section>

        <section id="kontakt" className="section cta">
          <div className="container"><div className="shell">
            <div className="copy"><div className="map-overlay"></div><p className="vertical-label">Kontakt</p><div className="copy-inner"><p className="eyebrow">Konsultacja / Współpraca</p><h2>Warszawa, Polska</h2><p>Pracujemy lokalnie, ale prowadzimy proces end-to-end. Dostajesz strategię, egzekucję i bezpieczny finał sprzedaży.</p></div></div>
            <form className="form"><label>Imię i nazwisko<input type="text" placeholder="Jan Kowalski" required /></label><label>E-mail<input type="email" placeholder="jan@email.com" required /></label><label>Telefon<input type="tel" placeholder="+48 000 000 000" required /></label><label>Miasto / dzielnica<input type="text" placeholder="Warszawa, Mokotów" required /></label><label>Krótki opis mieszkania i sytuacji<textarea rows={4} placeholder="Metraż, liczba pokoi, standard, planowany termin sprzedaży..." /></label><button type="submit"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Wyślij zapytanie</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Wyślij zapytanie</span></span><span className="sr-only">Wyślij zapytanie</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></button></form>
          </div></div>
        </section>
      </main>

      <div className="footer-stack">
        <section className="prefooter-stage" aria-label="Sekcja końcowa">
          <div className="prefooter-sticky">
            <div className="prefooter-shell">
              <p className="prefooter-kicker">Koniec przewijania? Zróbmy pierwszy krok.</p>
              <h2>Sprzedaj mieszkanie spokojnie i na dobrych warunkach.</h2>
              <a href="#kontakt" className="prefooter-btn">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span>
                </span>
                <span className="sr-only">Umów konsultację</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

      <footer className="site-footer">
        <div className="container footer-shell">
          <div className="footer-brand">
            <a href="/" className="footer-logo" aria-label="FIND home">
              <img src="/LOGO.png" alt="FIND" />
            </a>
            <p className="footer-copy">
              Eksperckie wsparcie właściciela mieszkania: od strategii ceny po bezpieczny podpis.
            </p>
          </div>

          <div className="footer-links">
            <a href="/">Główna</a>
            <a href="/o-mnie">O mnie</a>
            <a href="/bledy">Błędy</a>
            <a href="/poradnik">Poradnik</a>
            <a href="/kalkulator">Kalkulator</a>
            <a href="/kontakt">Kontakt</a>
          </div>

          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <span className="social-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect>
                  <circle cx="12" cy="12" r="4.1"></circle>
                  <circle cx="17.35" cy="6.65" r="1"></circle>
                </svg>
              </span>
              Instagram
            </a>
            <a href="#" aria-label="Facebook">
              <span className="social-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M14.2 8.1h2.2V4.5h-2.6c-3 0-4.6 1.8-4.6 4.9v2H6.8v3.7h2.4V20h3.8v-4.9h2.9l.5-3.7h-3.4V9.8c0-1 .4-1.7 1.6-1.7Z"></path>
                </svg>
              </span>
              Facebook
            </a>
            <a href="#" aria-label="LinkedIn">
              <span className="social-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="9.2" width="3.4" height="10.8"></rect>
                  <circle cx="5.7" cy="5.8" r="1.6"></circle>
                  <path d="M10 9.2h3.3v1.5c.6-1 1.8-1.8 3.6-1.8 3 0 4.1 2 4.1 5.1V20h-3.5v-5.3c0-1.7-.6-2.6-1.9-2.6-1.5 0-2.2 1.1-2.2 2.6V20H10V9.2Z"></path>
                </svg>
              </span>
              LinkedIn
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {year} FIND. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
      </div>

      <button className="to-top" type="button" aria-label="Wróć na górę" onClick={scrollToTop}>
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}
