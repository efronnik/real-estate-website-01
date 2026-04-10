"use client";

import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";

const problems = [
  {
    title: "Brak analizy rynku",
    text: "Ustalasz cenę według swoich potrzeb, a nie na podstawie cen transakcyjnych podobnych nieruchomości.",
    metric: "Konsekwencja: za tanio albo za drogo",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    title: "Nieprzygotowane wnętrza",
    text: "Publikujesz ofertę bez przygotowania mieszkania: drobne usterki, przedmioty osobiste i chaos obniżają odbiór.",
    metric: "Konsekwencja: nie przyciągasz uwagi kupujących",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    title: "Zdjęcia słabej jakości",
    text: "Wykonujesz zdjęcia smartfonem zamiast zamówić profesjonalną sesję, która podnosi wartość oferty.",
    metric: "Konsekwencja: mniejsza liczba zapytań",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
];

const guideSignals = [
  {
    title: "Zła wycena na starcie",
    why: "Cena ustawiona emocjonalnie zamiast na danych obniża jakość zapytań i od razu ustawia rozmowy na obniżkę.",
    action: "Porównaj realne transakcje i konkurencję 1:1. Ustal wariant ceny startowej oraz granice negocjacyjne.",
    image: "https://images.pexels.com/photos/7578919/pexels-photo-7578919.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    title: "Nieprzygotowany stan prawny i dokumenty",
    why: "Braki formalne wydłużają decyzję kupującego i osłabiają zaufanie w kluczowym momencie procesu.",
    action: "Przygotuj komplet dokumentów przed publikacją i usuń ryzyka formalne przed pierwszymi prezentacjami.",
    image: "https://images.pexels.com/photos/8293777/pexels-photo-8293777.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    title: "Słaba prezentacja oferty",
    why: "Przypadkowe zdjęcia i ogólny opis sprawiają, że oferta przegrywa już na etapie pierwszego kontaktu.",
    action: "Zadbaj o porządek, światło i profesjonalne kadry. Opis oprzyj na konkretnych przewagach nieruchomości.",
    image: "https://images.pexels.com/photos/7031590/pexels-photo-7031590.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    title: "Negocjacje prowadzone pod presją",
    why: "Brak scenariusza rozmów i zbyt szybkie ustępstwa prowadzą do finalnej ceny niższej od potencjału.",
    action: "Ustal warunki brzegowe, argumenty obrony ceny i plan rozmowy przed kontaktem z kupującym.",
    image: "https://images.pexels.com/photos/7414284/pexels-photo-7414284.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
];

const checklistItems = [
  "Strategia ceny oparta o dane z rynku lokalnego",
  "Zweryfikowany stan prawny i komplet dokumentów",
  "Przygotowanie mieszkania do prezentacji i sesji zdjęciowej",
  "Opis oferty z konkretami: układ, standard, otoczenie, atuty",
  "Plan negocjacji i scenariusze odpowiedzi na obniżki",
  "Wstępna weryfikacja skutków podatkowych transakcji",
];

const checklistImages = [
  "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/8292799/pexels-photo-8292799.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7415036/pexels-photo-7415036.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7821510/pexels-photo-7821510.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7578903/pexels-photo-7578903.jpeg?auto=compress&cs=tinysrgb&w=1800",
];

const checklistCards = checklistItems.map((text, idx) => ({
  title: text,
  text: "Element checklisty przed publikacją ogłoszenia.",
  metric: "Checklista wdrożenia",
  image: checklistImages[idx % checklistImages.length],
}));

export default function BledyPage() {
  const year = new Date().getFullYear();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeGuideIndex, setActiveGuideIndex] = useState(0);
  const [currentChecklistSlide, setCurrentChecklistSlide] = useState(0);
  const [isChecklistPaused, setIsChecklistPaused] = useState(false);
  const guideCardRefs = useRef<Array<HTMLElement | null>>([]);

  const rel = (idx: number, current: number, len: number) => {
    let diff = (idx - current + len) % len;
    if (diff > len / 2) diff -= len;
    return diff;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) setCurrentSlide((s) => (s + 1) % problems.length);
      if (!isChecklistPaused) setCurrentChecklistSlide((s) => (s + 1) % checklistCards.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isPaused, isChecklistPaused]);

  useEffect(() => {
    const update = () => {
      const center = window.innerHeight * 0.45;
      let closest = 0;
      let min = Number.POSITIVE_INFINITY;
      guideCardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height * 0.5 - center);
        if (dist < min) {
          min = dist;
          closest = idx;
        }
      });
      setActiveGuideIndex(closest);
    };
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };
    update();
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
      <main>
        <SiteTopbar />

        <section className="section mistakes-hero">
          <video className="mistakes-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/Hero-Fail.mp4" type="video/mp4" />
          </video>
          <div className="mistakes-hero-overlay" aria-hidden="true"></div>
          <div className="container mistakes-hero-shell">
            <p className="eyebrow">Błędy</p>
            <h1 className="section-title">Błędy przy sprzedaży nieruchomości</h1>
            <p className="section-copy">Zebrane w jednym miejscu: najczęstsze potknięcia, które obniżają cenę lub wydłużają proces sprzedaży.</p>
          </div>
        </section>

        <section id="bledy" className="section problems">
          <div className="container">
            <div className="lead">
              <p className="eyebrow no-sweep">Najdroższe pomyłki przy sprzedaży</p>
              <h2 className="section-title sweep-reveal">Kosztowne błędy w procesie sprzedaży mieszkania</h2>
              <p className="section-copy sweep-reveal">W premium segmencie nie przegrywa ten, kto ma słabszą nieruchomość. Przegrywa ten, kto oddaje narrację i kontrolę procesu.</p>
            </div>
            <div className="stage" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
              <div className="stage-head"><p className="no-sweep">Najbardziej kosztowne punkty procesu</p></div>
              <div className="carousel">
                {problems.map((item, idx) => {
                  const r = rel(idx, currentSlide, problems.length);
                  return (
                    <article key={item.title} className={`panel ${r === 0 ? "center" : ""} ${r === -1 ? "left" : ""} ${r === 1 ? "right" : ""} ${Math.abs(r) > 1 ? "hidden" : ""}`} style={{ ["--bg" as string]: `url(${item.image})` }} onClick={() => setCurrentSlide(idx)}>
                      <div className="panel-overlay">
                        <p className="kicker">{String(idx + 1).padStart(2, "0")}</p><h3>{item.title}</h3><p>{item.text}</p><div className="metric">{item.metric}</div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="dots" role="tablist" aria-label="Nawigacja slajdów">
                {problems.map((item, idx) => (
                  <button key={`dot-${item.title}`} className={`dot ${idx === currentSlide ? "active" : ""}`} aria-label={`Przejdź do slajdu ${idx + 1}`} onClick={() => setCurrentSlide(idx)}><span className="dot-core"></span></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section mistakes-extended">
          <div className="container">
            <header className="mistakes-head">
              <p className="eyebrow">Praktyczny przewodnik</p>
              <h2 className="section-title">Najczęstsze błędy przy sprzedaży mieszkania i jak ich uniknąć</h2>
              <p className="section-copy">Poniżej znajdziesz rozwinięcie najważniejszych obszarów, które najczęściej wydłużają sprzedaż lub obniżają cenę transakcyjną.</p>
            </header>
            <div className="signals-layout">
              <aside className="signals-copy">
                <div className="signals-progress">{activeGuideIndex + 1} / {guideSignals.length}</div>
                <p className="signals-lead">{guideSignals[activeGuideIndex]?.title}</p>
              </aside>
              <div className="signals-visuals">
                {guideSignals.map((signal, idx) => (
                  <article key={signal.title} ref={(el) => { guideCardRefs.current[idx] = el; }} className={`signal-card ${idx === activeGuideIndex ? "active" : ""}`} style={{ ["--bg" as string]: `url(${signal.image})` }}>
                    <p><strong>Dlaczego to ważne:</strong> {signal.why}</p>
                    <p><strong>Co zrobić:</strong> {signal.action}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="checklist-stage">
              <div className="checklist-head"><h3>Checklista przed publikacją ogłoszenia</h3></div>
              <div className="checklist-carousel" onMouseEnter={() => setIsChecklistPaused(true)} onMouseLeave={() => setIsChecklistPaused(false)}>
                {checklistCards.map((item, idx) => {
                  const r = rel(idx, currentChecklistSlide, checklistCards.length);
                  return (
                    <article key={item.title} className={`checklist-panel ${r === 0 ? "center" : ""} ${r === -1 ? "left" : ""} ${r === 1 ? "right" : ""} ${Math.abs(r) > 1 ? "hidden" : ""}`} style={{ ["--bg" as string]: `url(${item.image})` }} onClick={() => setCurrentChecklistSlide(idx)}>
                      <div className="checklist-panel-overlay">
                        <p className="checklist-kicker">{String(idx + 1).padStart(2, "0")}</p>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                        <div className="checklist-metric">{item.metric}</div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="checklist-dots" role="tablist" aria-label="Nawigacja checklisty">
                {checklistCards.map((item, idx) => (
                  <button key={`checklist-dot-${item.title}`} className={`checklist-dot ${idx === currentChecklistSlide ? "active" : ""}`} onClick={() => setCurrentChecklistSlide(idx)}></button>
                ))}
              </div>
            </div>

            <div className="mistakes-note">
              <p><strong>Uwaga podatkowa:</strong> przy sprzedaży przed upływem 5 lat (licząc od końca roku nabycia) może wystąpić obowiązek rozliczenia PIT od dochodu. W praktyce warto to zweryfikować przed wystawieniem nieruchomości, aby uniknąć kosztownych decyzji na finiszu.</p>
            </div>
          </div>
        </section>
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

