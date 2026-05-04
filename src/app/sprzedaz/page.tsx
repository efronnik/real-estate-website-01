import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { WycenaSection } from "@/components/wycena-section";
import { Prefooter } from "@/components/prefooter";
import { PageIntroSection } from "@/components/page-intro-section";
import { ROUTE_PATHS } from "@/config/navigation";
import {
  fetchCmsFaqByPageType,
  fetchCmsFeaturedTestimonials,
  fetchCmsPageBySlug,
  getPageMetadataFromCms,
  safeCmsCall,
} from "@/lib/cms";

const saleProcessSteps = [
  {
    step: "01",
    title: "Diagnoza nieruchomości i celu sprzedaży",
    text: "Analizujemy mieszkanie, sytuację rynkową i priorytety właściciela, żeby od razu ustawić właściwą strategię.",
    hero: "Diagnoza",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
  },
  {
    step: "02",
    title: "Wycena i pozycjonowanie oferty",
    text: "Ustalamy cenę, scenariusze negocjacji i sposób pozycjonowania oferty pod docelowego kupującego.",
    hero: "Wycena",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    step: "03",
    title: "Przygotowanie materiałów sprzedażowych",
    text: "Tworzymy prezentację nieruchomości: zdjęcia, opis i narrację, która buduje zainteresowanie i jakość zapytań.",
    hero: "Ekspozycja",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
  },
  {
    step: "04",
    title: "Prezentacje i negocjacje warunków",
    text: "Prowadzimy rozmowy z kupującymi tak, aby utrzymać kontrolę nad procesem i chronić docelowe warunki sprzedaży.",
    hero: "Negocjacje",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
  },
  {
    step: "05",
    title: "Finalizacja transakcji i przekazanie",
    text: "Koordynujemy formalności, dokumenty i harmonogram przekazania nieruchomości, aby domknąć sprzedaż spokojnie i bez ryzyka.",
    hero: "Finalizacja",
    image: "https://images.pexels.com/photos/48195/document-agreement-documents-sign-48195.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
];

const salePillars = [
  {
    title: "Wycena: transakcyjna vs ofertowa",
    lead: "Rozdzielamy dwie perspektywy ceny, żeby uniknąć błędnej strategii wejścia na rynek.",
    points: [
      "Wycena ofertowa: cena startowa pod ekspozycję i rozmowy z kupującymi.",
      "Wycena transakcyjna: realny przedział domknięcia na podstawie danych i dynamiki negocjacji.",
    ],
  },
  {
    title: "Marketing i prezentacja oferty",
    lead: "Budujemy materiały, które zwiększają jakość zapytań, a nie tylko liczbę odsłon.",
    points: [
      "Profesjonalna sesja, opis i narracja wartości nieruchomości.",
      "Spójna komunikacja oferty w kanałach publikacji.",
    ],
  },
  {
    title: "Selekcja i kwalifikacja leadów",
    lead: "Ograniczamy przypadkowe rozmowy i koncentrujemy się na realnie zdecydowanych kupujących.",
    points: [
      "Wstępna kwalifikacja zapytań przed prezentacją nieruchomości.",
      "Priorytetyzacja rozmów pod szybkość i bezpieczeństwo finalizacji.",
    ],
  },
  {
    title: "Bezpieczeństwo procesu i formalności",
    lead: "Chronimy Twoje interesy na każdym etapie od oferty po podpisanie dokumentów.",
    points: [
      "Kontrola dokumentów, warunków i terminów transakcji.",
      "Jasny scenariusz finalizacji i przekazania nieruchomości.",
    ],
  },
];

const fallbackMetadata: Metadata = {
  title: "Sprzedaz nieruchomosci | FIND",
  description: "Proces sprzedaży nieruchomości krok po kroku: wycena, marketing, selekcja leadów i bezpieczna finalizacja.",
};

export async function generateMetadata(): Promise<Metadata> {
  const cmsMetadata = await safeCmsCall(() => getPageMetadataFromCms("sprzedaz", "/sprzedaz"), null);
  if (!cmsMetadata) {
    return fallbackMetadata;
  }
  return cmsMetadata;
}

export default async function SprzedazPage() {
  const year = new Date().getFullYear();
  const [cmsPage, cmsFaqItems, cmsTestimonials] = await Promise.all([
    safeCmsCall(() => fetchCmsPageBySlug("sprzedaz"), null),
    safeCmsCall(() => fetchCmsFaqByPageType("sprzedaz"), []),
    safeCmsCall(fetchCmsFeaturedTestimonials, []),
  ]);
  const introTitle = cmsPage?.headline ?? "Sprzedaz nieruchomosci to dobrze zaplanowany proces";
  const introCopy =
    cmsPage?.content ??
    "Ta strona jest gotowym szkieletem pod oferte sprzedazy, leady i CTA. W kolejnym kroku uzupelnimy ja finalna trescia oraz formularzem wyceny.";

  return (
    <>
      <main>
        <SiteTopbar />
        <PageIntroSection
          eyebrow="Sprzedaz nieruchomosci"
          title={introTitle}
          copy={introCopy}
        />

        <section className="section lane-qualify">
          <div className="container lane-qualify-shell">
            <p className="eyebrow">Czy ten kierunek jest dla Ciebie?</p>
            <h2 className="section-title">Ścieżka sprzedaży pasuje, jeśli chcesz szybko podjąć decyzje i domknąć transakcję bez chaosu.</h2>
            <div className="lane-checks">
              <article className="lane-check"><strong>01</strong><p>Masz nieruchomość i chcesz ją sprzedać w przewidywalnym procesie.</p></article>
              <article className="lane-check"><strong>02</strong><p>Zależy Ci na wycenie, przygotowaniu oferty i prowadzeniu negocjacji.</p></article>
              <article className="lane-check"><strong>03</strong><p>Chcesz mieć jedną osobę odpowiedzialną od planu do finalizacji.</p></article>
            </div>
            <div className="lane-actions">
              <a href="#wycena" className="prefooter-btn" data-conversion-point="sprzedaz_lane_wycena">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do wyceny</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do wyceny</span>
                </span>
                <span className="sr-only">Przejdź do wyceny</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href={ROUTE_PATHS.inwestycje} className="link-arrow">Szukasz ścieżki inwestycyjnej? Przejdź do inwestycji</a>
            </div>
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <header className="process-head">
              <p className="eyebrow">Proces sprzedaży</p>
              <h2 className="section-title">5 kroków do bezpiecznej i skutecznej sprzedaży nieruchomości</h2>
            </header>
          </div>
          <div className="service-board">
            {saleProcessSteps.map((step) => (
              <article key={step.title} className="service-row" style={{ ["--bg" as string]: `url(${step.image})` }}>
                <div className="service-info">
                  <p className="idx"><span className="idx-text">{step.step}</span></p>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <div className="service-word"><span>{step.hero}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section sale-pillars">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Kluczowe sekcje współpracy</p>
            <h2 className="section-title">Wycena, marketing, leady i bezpieczeństwo w jednym spójnym modelu sprzedaży.</h2>
            <div className="sale-pillars-grid">
              {salePillars.map((pillar) => (
                <article key={pillar.title} className="sale-pillar-card">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.lead}</p>
                  <ul>
                    {pillar.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section sale-social-proof">
          <div className="container sale-social-proof-shell">
            <p className="eyebrow">Opinie klientów</p>
            <h2 className="section-title">Doświadczenie klientów po współpracy sprzedażowej</h2>
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
              <h2>FAQ sprzedaży nieruchomości</h2>
              {cmsFaqItems.map((item, idx) => (
                <article key={`${item.question ?? "faq"}-${idx}`} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
              {cmsFaqItems.length === 0 ? (
                <article className="faq-item">
                  <p>Brak pytań FAQ w CMS dla strony sprzedaży. Dodaj rekordy `FAQItem` z `pageType=sprzedaz`.</p>
                </article>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section sale-cta-strip">
          <div className="container sale-cta-shell">
            <p className="eyebrow">Następny krok</p>
            <h2>Wybierz: szybka konsultacja 1:1 albo od razu formularz wyceny.</h2>
            <p>
              Jeśli chcesz najpierw omówić sytuację, zacznij od rozmowy. Jeśli jesteś gotowy, przejdź
              bezpośrednio do formularza wyceny nieruchomości.
            </p>
            <div className="sale-cta-actions">
              <a href={`${ROUTE_PATHS.kontakt}?lane=sprzedaz#kontakt`} className="prefooter-btn" data-conversion-point="sprzedaz_strip_kontakt">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span>
                </span>
                <span className="sr-only">Umów konsultację</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#wycena" className="prefooter-btn" data-conversion-point="sprzedaz_strip_wycena">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do formularza wyceny</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do formularza wyceny</span>
                </span>
                <span className="sr-only">Przejdź do formularza wyceny</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <WycenaSection sourcePage="sprzedaz" />

      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Gotowy na decyzję?"
          title="Wybierz kolejny krok: szybka wycena albo rozmowa 1:1."
          buttons={[
            { href: "#wycena", label: "Przejdz do wyceny" },
            { href: `${ROUTE_PATHS.kontakt}?lane=sprzedaz#kontakt`, label: "Umow konsultacje" },
          ]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
