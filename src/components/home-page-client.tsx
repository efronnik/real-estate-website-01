"use client";

import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { ROUTE_PATHS } from "@/config/navigation";
import type { CmsPageRecord } from "@/lib/cms";

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

const offerPoints = [
  "Diagnoza sytuacji i szybki plan wyjścia na rynek",
  "Pozycjonowanie oferty pod właściwego kupującego",
  "Prowadzenie negocjacji i bezpieczna finalizacja",
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

type HomePageClientProps = {
  cmsPage: CmsPageRecord | null;
};

export function HomePageClient({ cmsPage }: HomePageClientProps) {
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

  const heroSubtitle = cmsPage?.lead ?? "Pokażę błędy i dam jasny plan sprzedaży.";
  const offerTitle =
    cmsPage?.headline ??
    "Jedna odpowiedzialna osoba, jeden plan, jeden cel: sprzedaż na dobrych warunkach.";
  const offerDescription =
    cmsPage?.content ??
    "Nie dostajesz przypadkowych działań. Dostajesz konkretny proces od pierwszej diagnozy do podpisu, z jasnymi decyzjami na każdym etapie.";

  return (
    <>
      <main>
        <section className="cp-hero">
          <SiteTopbar variant="cp" ctaHref="#kontakt" ctaLabel="Umów rozmowę" />
          <video className="cp-video-bg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/Hero-Warszaw.mp4" type="video/mp4" /></video>
          <div className="cp-video-overlay" aria-hidden="true"></div>
          <div className="cp-content">
            <h1 className={`hero-title ${heroReady ? "ready" : ""}`}><span className="hero-word-mask"><span className="hero-word">Sprzedaj</span></span><span className="hero-word-mask"><span className="hero-word">mieszkanie</span></span></h1>
            <p className={`hero-subtitle ${heroReady ? "ready" : ""}`}>{heroSubtitle}</p>
            <div className={`hero-cta-row ${heroReady ? "ready" : ""}`}>
              <a href={ROUTE_PATHS.sprzedaz} className="cp-btn hero-cta hero-cta-primary"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Sprzedaj</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Sprzedaj</span></span><span className="sr-only">Sprzedaj</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a>
              <a href={ROUTE_PATHS.inwestycje} className="cp-btn hero-cta hero-cta-secondary"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Inwestuj</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Inwestuj</span></span><span className="sr-only">Inwestuj</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a>
            </div>
            <p className="hero-internal-links">
              Popularne ścieżki:
              {" "}
              <a href={ROUTE_PATHS.sprzedaz}>sprzedaż nieruchomości</a>,
              {" "}
              <a href={ROUTE_PATHS.inwestycje}>inwestowanie w nieruchomości</a>,
              {" "}
              <a href="#kontakt">konsultacja 1:1</a>.
            </p>
          </div>
        </section>

        <section className="section offer-structure">
          <div className="container offer-layout">
            <div className="offer-copy">
              <p className="eyebrow">Oferta współpracy</p>
              <h2 className="offer-title">{offerTitle}</h2>
              <p className="offer-desc">{offerDescription}</p>
              <a href="#kontakt" className="prefooter-btn offer-btn"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span></span><span className="sr-only">Umów konsultację</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a>
            </div>
            <div className="offer-points">{offerPoints.map((point, idx) => (<article key={point} className="offer-point"><p className="offer-point-index">0{idx + 1}</p><p>{point}</p></article>))}</div>
          </div>
        </section>

        <section className="section funnel-split">
          <div className="container funnel-split-shell">
            <p className="eyebrow">Wybierz cel współpracy</p>
            <h2 className="section-title">Powiedz, czego potrzebujesz teraz, a poprowadzimy Cię właściwą ścieżką.</h2>
            <div className="funnel-cards">
              <article className="funnel-card">
                <p className="funnel-card-kicker">Dla sprzedających</p>
                <h3>Chcę sprzedać nieruchomość.</h3>
                <p>Przejdź do strategii sprzedaży, wyceny i procesu finalizacji krok po kroku.</p>
                <ul className="funnel-points"><li>Masz nieruchomość i chcesz sprzedać ją na dobrych warunkach.</li><li>Potrzebujesz planu, negocjacji i domknięcia formalności.</li></ul>
                <a href={ROUTE_PATHS.sprzedaz} className="prefooter-btn"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do Sprzedaży</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do Sprzedaży</span></span><span className="sr-only">Przejdź do Sprzedaży</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a>
              </article>
              <article className="funnel-card">
                <p className="funnel-card-kicker">Dla inwestorów</p>
                <h3>Chcę inwestować kapitał.</h3>
                <p>Przejdź do ścieżki inwestycyjnej, analizy opcji i wsparcia przy podejmowaniu decyzji.</p>
                <ul className="funnel-points"><li>Masz kapitał i szukasz strategii inwestowania w nieruchomości.</li><li>Chcesz lepiej oceniać ryzyko i wybierać właściwe okazje.</li></ul>
                <a href={ROUTE_PATHS.inwestycje} className="prefooter-btn"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do Inwestycji</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do Inwestycji</span></span><span className="sr-only">Przejdź do Inwestycji</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a>
              </article>
            </div>
          </div>
        </section>

        <section className="section trust"><div className="container"><div className="trust-shell"><div className="trust-head"><p className="eyebrow">Dlaczego klienci ufają</p><h2 className="section-title">Dowody, nie obietnice</h2></div><div className="trust-stats"><article className="stat"><strong>100+</strong><p>przeprowadzonych procesów sprzedaży</p></article><article className="stat"><strong>4.9/5</strong><p>średnia ocena współpracy klientów</p></article><article className="stat"><strong>1:1</strong><p>opiekun prowadzący od diagnozy do finału</p></article></div><div className="trust-slider"><div className="slider-head"><h3>Opinie klientów</h3><div className="controls"><button onClick={() => setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}>←</button><button onClick={() => setReviewIndex((prev) => (prev + 1) % reviews.length)}>→</button></div></div><div className="track"><article className="quote-card side"><p className="stars">★★★★★</p><blockquote>{reviewAt(-1).quote}</blockquote><footer><strong>{reviewAt(-1).author}</strong><span>Zweryfikowana opinia</span></footer></article><article className="quote-card center"><p className="stars">★★★★★</p><blockquote>{reviewAt(0).quote}</blockquote><footer><strong>{reviewAt(0).author}</strong><span>Zweryfikowana opinia</span></footer></article><article className="quote-card side"><p className="stars">★★★★★</p><blockquote>{reviewAt(1).quote}</blockquote><footer><strong>{reviewAt(1).author}</strong><span>Zweryfikowana opinia</span></footer></article></div></div></div></div></section>

        <section className="section process"><div className="container"><header className="process-head"><p className="eyebrow">Proces pracy</p><h2 className="section-title">Jak prowadzimy sprzedaż od strategii do podpisu</h2></header></div><div className="service-board">{processSteps.map((step) => (<article key={step.title} className="service-row" style={{ ["--bg" as string]: `url(${step.image})` }}><div className="service-info"><p className="idx"><span className="idx-text">{step.label}</span></p><h3>{step.title}</h3><p>{step.text}</p></div><div className="service-word"><span>{step.hero}</span></div></article>))}</div></section>

        <section className="section process-cta"><div className="container process-cta-shell"><p className="eyebrow">Następny krok</p><h2>Wybierz najbliższy krok i przejdź dalej bez zgadywania.</h2><p>Możesz od razu wejść w ścieżkę sprzedaży, inwestowania albo umówić krótką konsultację.</p><div className="process-cta-actions"><a href={ROUTE_PATHS.sprzedaz} className="prefooter-btn"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Sprzedaż nieruchomości</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Sprzedaż nieruchomości</span></span><span className="sr-only">Sprzedaż nieruchomości</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a><a href={ROUTE_PATHS.inwestycje} className="prefooter-btn"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Inwestowanie kapitału</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Inwestowanie kapitału</span></span><span className="sr-only">Inwestowanie kapitału</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a><a href="#kontakt" className="prefooter-btn"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do konsultacji</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do konsultacji</span></span><span className="sr-only">Przejdź do konsultacji</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a></div></div></section>

        <section className="section results"><div className="container results-layout"><div className="results-visuals">{results.map((item, idx) => (<article key={item.title} ref={(el) => { resultRefs.current[idx] = el; }} className={`result-card ${idx === activeResult ? "active" : ""}`}><img src={item.image} alt={item.title} /></article>))}</div><aside className="results-copy"><p className="eyebrow">Rezultaty</p><h2 className="results-title">Przykłady efektów współpracy</h2><div className="results-progress">{activeResult + 1} / {results.length}</div><p className="results-lead">{results[activeResult]?.title}</p><p className="results-desc">{results[activeResult]?.desc}</p></aside></div></section>

        <section className="section value"><div className="container value-layout"><aside className="value-copy"><p className="eyebrow">Co zyskujesz</p><h2 className="value-title">Kluczowe korzyści współpracy</h2><div className="value-progress">{activeValue + 1} / {valueSteps.length}</div><p className="value-lead">{valueSteps[activeValue]?.title}</p><p className="value-desc">{valueSteps[activeValue]?.desc}</p></aside><div className="value-visuals">{valueSteps.map((step, idx) => (<article key={step.title} ref={(el) => { valueRefs.current[idx] = el; }} className={`visual-card ${idx === activeValue ? "active" : ""}`}><img src={step.image} alt={step.title} /></article>))}</div></div></section>

        <LeadContactSection sectionId="kontakt" sourcePage="glowna" eyebrow="Konsultacja / Współpraca" title="Warszawa, Polska" description="Pracujemy lokalnie, ale prowadzimy proces end-to-end. Dostajesz strategie, egzekucje i bezpieczny final sprzedazy." />
      </main>

      <div className="footer-stack">
        <Prefooter kicker="Koniec przewijania? Zróbmy pierwszy krok." title="Sprzedaj mieszkanie spokojnie i na dobrych warunkach." buttons={[{ href: "#kontakt", label: "Umów konsultację" }]} />
        <SiteFooter year={year} />
      </div>
      <ScrollToTopButton />
    </>
  );
}
