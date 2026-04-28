"use client";

import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { fetchCmsPageBySlug } from "@/lib/cms";

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
  const [cmsLead, setCmsLead] = useState<string | null>(null);
  const [cmsHeadline, setCmsHeadline] = useState<string | null>(null);
  const [cmsContent, setCmsContent] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadCmsPage = async () => {
      const page = await fetchCmsPageBySlug("o-mnie");
      if (mounted && page) {
        setCmsHeadline(page.headline ?? null);
        setCmsLead(page.lead ?? null);
        setCmsContent(page.content ?? null);
      }
    };
    void loadCmsPage();
    return () => {
      mounted = false;
    };
  }, []);

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
        <SiteTopbar />

        <section className="section about-hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">O mnie</p>
              <h1 className="section-title">{cmsHeadline ?? "Eksperckie prowadzenie sprzedaży nieruchomości w modelu premium"}</h1>
              <p className="section-copy">{cmsLead ?? "Nazywam się [Twoje imię]. Pracuję z właścicielami mieszkań, którzy chcą sprzedać świadomie: z planem, kontrolą procesu i wynikiem finansowym, który ma uzasadnienie rynkowe."}</p>
              <p className="section-copy">{cmsContent ?? "Łączę doświadczenie negocjacyjne, przygotowanie oferty i estetykę prezentacji. Dzięki temu sprzedaż jest uporządkowana, przewidywalna i bez chaosu."}</p>
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
        <Prefooter
          tall
          kicker="Porozmawiajmy o Twojej nieruchomości"
          title="Jeśli chcesz sprzedać mieszkanie z planem i spokojem, umów rozmowę."
          copy="Zaczniemy od krótkiej diagnozy i konkretnego kierunku działań."
          buttons={[
            { href: "/kontakt", label: "Umów konsultację" },
            { href: "/sprzedaz", label: "Zobacz ofertę sprzedaży" },
          ]}
        />

        <SiteFooter year={year} />
      </div>

      <ScrollToTopButton />
    </>
  );
}

