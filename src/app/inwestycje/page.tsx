import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { PageIntroSection } from "@/components/page-intro-section";
import { ROUTE_PATHS } from "@/config/navigation";
import {
  fetchCmsFaqByPageType,
  fetchCmsFeaturedTestimonials,
  fetchCmsPageBySlug,
  getPageMetadataFromCms,
  safeCmsCall,
} from "@/lib/cms";

const investorLandingSections = [
  {
    title: "Inwestowanie w nieruchomości Warszawa: od strategii do wykonania",
    copy:
      "Warszawski rynek wymaga precyzyjnego doboru strategii: inna logika działa dla mieszkań pod flip, inna dla lokalu pod stabilny najem. Dlatego zaczynamy od celu inwestora, budżetu i akceptowanego poziomu ryzyka.",
    bullets: [
      "Analiza lokalizacji i mikrotrendów popytu w dzielnicach Warszawy.",
      "Dobór modelu inwestycyjnego: flip, najem długoterminowy lub hybryda.",
    ],
  },
  {
    title: "Flipy Warszawa: jak selekcjonować okazje bez przepalania kapitału",
    copy:
      "W projektach typu flip kluczowa jest selekcja: nie każda „okazja” daje margines bezpieczeństwa. Oceniamy potencjał nieruchomości pod kątem ceny wejścia, kosztu prac i realnego czasu wyjścia.",
    bullets: [
      "Wstępna filtracja okazji i ocena potencjału wzrostu wartości.",
      "Scenariusze kosztowe i plan minimalizacji ryzyka remontowego.",
    ],
  },
  {
    title: "Bezpieczna finalizacja inwestycji i kontrola wyniku",
    copy:
      "Na końcu liczy się nie tylko zakup, ale pełny wynik inwestycji. Dlatego prowadzimy proces od analizy i negocjacji po domknięcie formalności i plan kolejnego ruchu kapitału.",
    bullets: [
      "Negocjacje warunków zakupu z orientacją na wynik netto inwestora.",
      "Checklisty formalne i porządek procesu, który skraca czas decyzji.",
    ],
  },
];

const inwestycjeHowItWorks = [
  {
    step: "01",
    title: "Diagnoza celu i kapitału",
    text: "Ustalamy, jaki wynik chcesz osiągnąć i jakie parametry ryzyka są dla Ciebie akceptowalne.",
  },
  {
    step: "02",
    title: "Selekcja okazji inwestycyjnych",
    text: "Filtrujemy nieruchomości pod strategię inwestora: flip, najem lub model mieszany.",
  },
  {
    step: "03",
    title: "Ocena opłacalności i ryzyka",
    text: "Liczymy scenariusze wejścia, kosztów i wyjścia, aby podejmować decyzje na danych, nie na emocjach.",
  },
  {
    step: "04",
    title: "Negocjacje i finalizacja",
    text: "Prowadzimy proces zakupu oraz formalności tak, by chronić wynik i tempo inwestycji.",
  },
];

const inwestycjeMistakes = [
  "Zakup nieruchomości bez scenariusza wyjścia i harmonogramu działań.",
  "Niedoszacowanie kosztów remontu i bufora bezpieczeństwa.",
  "Podejmowanie decyzji na podstawie ogólnego trendu zamiast danych mikro-lokalnych.",
  "Brak kwalifikacji okazji pod konkretną strategię inwestora.",
];

const inwestycjeForWho = [
  "Dla inwestora, który ma kapitał i chce wejść w nieruchomości z planem.",
  "Dla osoby, która chce ograniczyć ryzyko błędnych decyzji na starcie.",
  "Dla właściciela kapitału, który oczekuje uporządkowanego procesu i kontroli wyniku.",
];

const inwestycjeSeoImages = [
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    alt: "Inwestowanie w nieruchomosci w Warszawie - analiza lokalizacji i potencjalu dzielnicy.",
  },
  {
    src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
    alt: "Flipy Warszawa - kalkulacja kosztow, harmonogram remontu i plan wyjscia z inwestycji.",
  },
  {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    alt: "Konsultacja inwestycyjna nieruchomosci - strategia inwestora i kontrola ryzyka decyzji.",
  },
];

const fallbackMetadata: Metadata = {
  title: "Inwestycje nieruchomosci Warszawa | FIND",
  description:
    "Strategia inwestowania i flipy w Warszawie: selekcja okazji, ocena ryzyka, negocjacje i bezpieczna finalizacja inwestycji.",
};

export async function generateMetadata(): Promise<Metadata> {
  const cmsMetadata = await safeCmsCall(() => getPageMetadataFromCms("inwestycje", "/inwestycje"), null);
  if (!cmsMetadata) {
    return fallbackMetadata;
  }
  return cmsMetadata;
}

export default async function InwestycjePage() {
  const year = new Date().getFullYear();
  const [cmsPage, cmsFaqItems, cmsTestimonials] = await Promise.all([
    safeCmsCall(() => fetchCmsPageBySlug("inwestycje"), null),
    safeCmsCall(() => fetchCmsFaqByPageType("inwestycje"), []),
    safeCmsCall(fetchCmsFeaturedTestimonials, []),
  ]);
  const introTitle = cmsPage?.headline ?? "Inwestowanie w nieruchomosci w Warszawie";
  const introCopy =
    cmsPage?.content ??
    "To szkielet strony pod oferte flipow, leady i tresci SEO. W kolejnym kroku uzupelnimy sekcje o finalny content, FAQ i formularz konsultacji.";

  return (
    <>
      <main>
        <SiteTopbar />
        <PageIntroSection
          eyebrow="Inwestycje"
          title={introTitle}
          copy={introCopy}
        />

        <section className="section lane-qualify">
          <div className="container lane-qualify-shell">
            <p className="eyebrow">Czy to dobry kierunek dla Ciebie?</p>
            <h2 className="section-title">Ścieżka inwestycyjna pasuje, jeśli chcesz pomnażać kapitał na rynku nieruchomości z jasnym planem działania.</h2>
            <div className="lane-checks">
              <article className="lane-check"><strong>01</strong><p>Masz kapitał i chcesz dobrać strategię inwestowania do swojego celu.</p></article>
              <article className="lane-check"><strong>02</strong><p>Potrzebujesz wsparcia w selekcji okazji i ocenie ryzyka decyzji.</p></article>
              <article className="lane-check"><strong>03</strong><p>Zależy Ci na konkretnych krokach zamiast przypadkowych ruchów.</p></article>
            </div>
            <div className="lane-actions">
              <a href={ROUTE_PATHS.sprzedaz} className="link-arrow">Masz nieruchomość do sprzedaży? Przejdź do sprzedaży</a>
              <a href={`${ROUTE_PATHS.sprzedaz}#wycena`} className="link-arrow">Chcesz najpierw wycenić aktywo? Przejdź do formularza wyceny</a>
            </div>
          </div>
        </section>

        <section className="section sale-pillars">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">SEO landing: inwestowanie/flipy Warszawa</p>
            <h2 className="section-title">Inwestowanie w nieruchomości w Warszawie wymaga planu, nie przypadkowych decyzji.</h2>
            <div className="sale-pillars-grid">
              {investorLandingSections.map((section) => (
                <article key={section.title} className="sale-pillar-card">
                  <h3>{section.title}</h3>
                  <p>{section.copy}</p>
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="section-copy">
              Jeśli rozważasz sprzedaż aktywa przed reinwestycją, przejdź do
              {" "}
              <a href={ROUTE_PATHS.sprzedaz}>ścieżki sprzedaży</a>.
            </p>
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <header className="process-head">
              <p className="eyebrow">Jak to działa</p>
              <h2 className="section-title">Proces inwestowania w nieruchomości w Warszawie krok po kroku</h2>
            </header>
          </div>
          <div className="service-board">
            {inwestycjeHowItWorks.map((item) => (
              <article key={item.title} className="service-row">
                <div className="service-info">
                  <p className="idx"><span className="idx-text">{item.step}</span></p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <div className="service-word"><span>Etap</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section inwestycje-seo-gallery">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">SEO semantyka i kontekst</p>
            <h2 className="section-title">Inwestowanie i flipy w Warszawie: od analizy okazji po bezpieczną finalizację.</h2>
            <div className="inwestycje-seo-gallery-grid">
              {inwestycjeSeoImages.map((item) => (
                <figure key={item.src} className="inwestycje-seo-gallery-item">
                  <img src={item.src} alt={item.alt} />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Najczęstsze błędy inwestora</p>
            <h2 className="section-title">Błędy, które najczęściej obniżają wynik inwestycji</h2>
            <div className="sale-pillars-grid">
              {inwestycjeMistakes.map((mistake, idx) => (
                <article key={mistake} className="sale-pillar-card">
                  <h3>Błąd {idx + 1}</h3>
                  <p>{mistake}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Dla kogo</p>
            <h2 className="section-title">Ten model współpracy będzie dobry, jeśli:</h2>
            <div className="sale-pillars-grid">
              {inwestycjeForWho.map((item, idx) => (
                <article key={item} className="sale-pillar-card">
                  <h3>Profil {idx + 1}</h3>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section sale-social-proof">
          <div className="container sale-social-proof-shell">
            <p className="eyebrow">Opinie inwestorów</p>
            <h2 className="section-title">Doświadczenia klientów inwestycyjnych po współpracy</h2>
            <div className="sale-social-proof-grid">
              {cmsTestimonials.map((item, idx) => (
                <article key={`${item.authorName ?? "testimonial"}-${idx}`} className="sale-social-proof-card">
                  <p className="stars">★★★★★</p>
                  <blockquote>{item.quote}</blockquote>
                  <footer>
                    <strong>{item.authorName ?? "Klient"}</strong>
                    <span>{item.city ?? "Warszawa"}</span>
                  </footer>
                </article>
              ))}
              {cmsTestimonials.length === 0 ? (
                <article className="sale-social-proof-card">
                  <p>Brak opinii w CMS dla tej sekcji. Dodaj rekordy `Testimonial`, aby je wyświetlić.</p>
                </article>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="surface faq-box">
              <h2>FAQ inwestycyjne</h2>
              {cmsFaqItems.map((item, idx) => (
                <article key={`${item.question ?? "faq"}-${idx}`} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
              {cmsFaqItems.length === 0 ? (
                <article className="faq-item">
                  <p>Brak pytań FAQ w CMS dla strony inwestycji. Dodaj rekordy `FAQItem` z `pageType=inwestycje`.</p>
                </article>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section sale-cta-strip">
          <div className="container sale-cta-shell">
            <p className="eyebrow">CTA</p>
            <h2>Chcesz sprawdzić, która strategia inwestowania będzie najlepsza dla Ciebie?</h2>
            <p>Umów konsultację inwestycyjną i otrzymaj konkretny plan działania dla Twojego kapitału.</p>
            <div className="sale-cta-actions">
              <a href={`${ROUTE_PATHS.kontakt}?lane=inwestycje#kontakt`} className="prefooter-btn">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację inwestycyjną</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację inwestycyjną</span>
                </span>
                <span className="sr-only">Umów konsultację inwestycyjną</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href={ROUTE_PATHS.kalkulator} className="prefooter-btn">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do kalkulatora</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do kalkulatora</span>
                </span>
                <span className="sr-only">Przejdź do kalkulatora</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href={ROUTE_PATHS.blog} className="prefooter-btn">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Zobacz materiały edukacyjne</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Zobacz materiały edukacyjne</span>
                </span>
                <span className="sr-only">Zobacz materiały edukacyjne</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <LeadContactSection
          sectionId="kontakt"
          sourcePage="inwestycje"
          leadType="inwestor"
          eyebrow="Konsultacja inwestycyjna"
          title="Porozmawiajmy o Twoim kapitalie"
          description="Umow bezplatna rozmowe i sprawdz, jak mozemy podejsc do inwestycji na rynku warszawskim."
          showMapOverlay={false}
          verticalLabel=""
        />
      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Jaki jest kolejny krok?"
          title="Masz aktywo do sprzedaży przed reinwestycją? Przejdź do ścieżki sprzedaży."
          buttons={[
            { href: ROUTE_PATHS.sprzedaz, label: "Przejdz do sprzedazy" },
          ]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
