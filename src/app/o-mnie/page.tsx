"use client";

import { useEffect, useRef, useState } from "react";

const portfolioCases = [
  {
    title: "Mokotów - sprzedaż po rebrandingu oferty",
    text: "Po zmianie pozycjonowania i materiałów premium oferta wróciła na rynek z nową narracją. Finalnie mieszkanie sprzedało się szybciej i bez nerwowych negocjacji.",
    result: "Finalizacja: 27 dni",
    hero: "Rebranding",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Śródmieście - obrona ceny przy dużym ruchu",
    text: "Kluczowe było przejęcie rozmów i selekcja zapytań. Dzięki temu presja na obniżkę została ograniczona, a transakcja zamknięta na warunkach właściciela.",
    result: "Cena końcowa: +6.5% vs. oczekiwania",
    hero: "Negocjacje",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Praga Południe - przygotowanie od zera",
    text: "Od audytu mieszkania po finalne dokumenty. Spójny plan pozwolił skrócić czas ekspozycji i poprowadzić cały proces bez chaosu po stronie klienta.",
    result: "Liczba jakościowych zapytań: x2.3",
    hero: "Finalizacja",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80",
  },
];

const valueCards = [
  {
    text: "Strategia zamiast przypadkowych decyzji",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
  },
  {
    text: "Transparentna komunikacja na każdym etapie",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80",
  },
  {
    text: "Estetyka oferty, która realnie wspiera cenę",
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    text: "Negocjacje prowadzone spokojnie i zdecydowanie",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1800&q=80",
  },
];

const process = [
  {
    step: "01",
    title: "Diagnoza i pozycjonowanie",
    text: "Analiza mieszkania, konkurencji i profilu kupującego. Ustalamy plan, który ma konkretny cel: sprzedaż na dobrych warunkach.",
    image: "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    step: "02",
    title: "Przygotowanie oferty",
    text: "Home staging, zdjęcia, opis i narracja. Każdy element jest dopasowany do grupy docelowej i oczekiwań rynku.",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    step: "03",
    title: "Prezentacje i negocjacje",
    text: "Prowadzę spotkania i rozmowy tak, aby utrzymać przewagę po stronie właściciela i chronić wartość oferty.",
    image: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    step: "04",
    title: "Domknięcie transakcji",
    text: "Koordynacja formalności, terminy i dokumenty. Finalizacja przebiega spokojnie, jasno i bez niepotrzebnego ryzyka.",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
];

export default function AboutPage() {
  const year = new Date().getFullYear();
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const processCardRefs = useRef<Array<HTMLElement | null>>([]);
  const valueCardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const updateByCenter = (refs: Array<HTMLElement | null>, setter: (idx: number) => void) => {
      if (!refs.length) return;
      const viewportCenter = window.innerHeight * 0.45;
      let closest = 0;
      let minDistance = Number.POSITIVE_INFINITY;
      refs.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = Math.abs(center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closest = idx;
        }
      });
      setter(closest);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        updateByCenter(processCardRefs.current, setActiveProcessIndex);
        updateByCenter(valueCardRefs.current, setActiveValueIndex);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <main className="about-page">
        <header className="site-topbar">
          <a href="/" className="site-brand" aria-label="FIND home"><img src="/LOGO.png" alt="FIND" /></a>
          <nav className="site-nav" aria-label="Primary navigation">
            <a href="/">Główna</a><a href="/o-mnie">O mnie</a><a href="/bledy">Błędy</a><a href="/poradnik">Poradnik</a><a href="/kalkulator">Kalkulator</a><a href="/kontakt">Kontakt</a>
          </nav>
          <div className="site-spacer" aria-hidden="true"></div>
        </header>

        <section className="section about-hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">O mnie</p>
              <h1 className="section-title">Eksperckie prowadzenie sprzedaży nieruchomości w modelu premium</h1>
              <p className="section-copy">Nazywam się [Twoje imię]. Pracuję z właścicielami mieszkań, którzy chcą sprzedać świadomie: z planem, kontrolą procesu i wynikiem finansowym, który ma uzasadnienie rynkowe.</p>
              <p className="section-copy">Łączę doświadczenie negocjacyjne, przygotowanie oferty i estetykę prezentacji. Dzięki temu sprzedaż jest uporządkowana, przewidywalna i bez chaosu.</p>
            </div>
            <figure className="hero-photo"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1800&q=80" alt="Portret eksperta nieruchomości" /></figure>
          </div>
        </section>

        <section className="section">
          <div className="container about-value-layout">
            <aside className="about-value-copy">
              <p className="eyebrow">Podejście</p>
              <h2>Kim jestem i jak pracuję</h2>
              <p>Wspieram klientów, którzy chcą sprzedać mieszkanie dobrze, a nie przypadkowo. Od pierwszego audytu po podpisanie dokumentów prowadzę cały proces tak, aby każdy etap miał jasny cel i konkretne mierniki.</p>
              <p>Nie działam szablonowo. Każda nieruchomość wymaga innej strategii ceny, innej narracji i innego planu negocjacji. To właśnie te detale tworzą przewagę przy finalnym wyniku.</p>
              <blockquote>"Dobrze sprzedana nieruchomość to wynik decyzji podjętych we właściwej kolejności."</blockquote>
            </aside>
            <div className="about-value-visuals">
              <div className="value-points">
                <h3>Co jest dla mnie ważne</h3>
                <div className="value-image-grid">
                  {valueCards.map((item, idx) => (
                    <article key={item.text} ref={(el) => { valueCardRefs.current[idx] = el; }} className={`value-image-item ${idx === activeValueIndex ? "active" : ""}`}>
                      <img src={item.image} alt={item.text} />
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-process-section">
          <div className="container">
            <header className="about-process-head">
              <p className="eyebrow">Portfolio</p>
              <h2 className="section-title">Przykłady projektów i efektów współpracy</h2>
            </header>
            <div className="about-service-board">
              {portfolioCases.map((item, idx) => (
                <article key={item.title} className="about-service-row" style={{ ["--bg" as string]: `url(${item.image})` }}>
                  <div className="about-service-info">
                    <p className="about-idx"><span className="about-idx-text">{String(idx + 1).padStart(2, "0")}</span></p>
                    <p className="about-service-result">{item.result}</p>
                    <p className="about-service-tag">{item.hero}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container process-layout">
            <div className="process-visuals">
              {process.map((item, idx) => (
                <article key={`img-${item.step}`} ref={(el) => { processCardRefs.current[idx] = el; }} className={`process-image-item ${idx === activeProcessIndex ? "active" : ""}`}>
                  <img src={item.image} alt={item.title} />
                </article>
              ))}
            </div>
            <aside className="process-copy">
              <p className="eyebrow">Proces</p>
              <h2 className="section-title">Model współpracy krok po kroku</h2>
              <p className="process-progress">{activeProcessIndex + 1} / {process.length}</p>
              <p className="process-lead">{process[activeProcessIndex]?.title}</p>
              <p className="process-desc">{process[activeProcessIndex]?.text}</p>
            </aside>
          </div>
        </section>
      </main>

      <div className="footer-stack">
        <section className="prefooter-stage prefooter-stage--tall" aria-label="Sekcja końcowa">
          <div className="prefooter-sticky prefooter-sticky--tall">
            <div className="prefooter-shell prefooter-shell--tall">
              <p className="prefooter-kicker">Porozmawiajmy o Twojej nieruchomości</p>
              <h2>Jeśli chcesz sprzedać mieszkanie z planem i spokojem, umów rozmowę.</h2>
              <p className="prefooter-copy">Zaczniemy od krótkiej diagnozy i konkretnego kierunku działań.</p>
              <a href="#kontakt" className="prefooter-btn">
                <span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span></span>
                <span className="sr-only">Umów konsultację</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="container footer-shell">
            <div className="footer-brand"><a href="/" className="footer-logo" aria-label="FIND home"><img src="/LOGO.png" alt="FIND" /></a><p className="footer-copy">Eksperckie wsparcie właściciela mieszkania: od strategii ceny po bezpieczny podpis.</p></div>
            <div className="footer-links"><a href="/">Główna</a><a href="/o-mnie">O mnie</a><a href="/bledy">Błędy</a><a href="/poradnik">Poradnik</a><a href="/kalkulator">Kalkulator</a><a href="/kontakt">Kontakt</a></div>
            <div className="footer-social"><a href="#" aria-label="Instagram"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4.1"></circle><circle cx="17.35" cy="6.65" r="1"></circle></svg></span>Instagram</a><a href="#" aria-label="Facebook"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M14.2 8.1h2.2V4.5h-2.6c-3 0-4.6 1.8-4.6 4.9v2H6.8v3.7h2.4V20h3.8v-4.9h2.9l.5-3.7h-3.4V9.8c0-1 .4-1.7 1.6-1.7Z"></path></svg></span>Facebook</a><a href="#" aria-label="LinkedIn"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="9.2" width="3.4" height="10.8"></rect><circle cx="5.7" cy="5.8" r="1.6"></circle><path d="M10 9.2h3.3v1.5c.6-1 1.8-1.8 3.6-1.8 3 0 4.1 2 4.1 5.1V20h-3.5v-5.3c0-1.7-.6-2.6-1.9-2.6-1.5 0-2.2 1.1-2.2 2.6V20H10V9.2Z"></path></svg></span>LinkedIn</a></div>
          </div>
          <div className="container footer-bottom"><p>© {year} FIND. Wszelkie prawa zastrzeżone.</p></div>
        </footer>
      </div>

      <button className="to-top" type="button" aria-label="Wróć na górę" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}

