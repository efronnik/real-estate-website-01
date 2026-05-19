import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { WycenaSection } from "@/components/wycena-section";
import { Prefooter } from "@/components/prefooter";
import { PageIntroSection } from "@/components/page-intro-section";
import { ROUTE_PATHS } from "@/config/navigation";
import { CtaClickLink } from "@/components/cta-click-link";
import {
  fetchCmsFaqByPageType,
  fetchCmsFeaturedTestimonials,
  fetchCmsPageBySlug,
  safeCmsCall,
} from "@/lib/cms";
import { resolveKeyPageMetadata } from "@/lib/page-metadata";
import { resolveCmsText } from "@/lib/cms-content";

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

const saleFaqFallback = [
  {
    question: "Skąd mam pewność, że wycenicie moją nieruchomość zgodnie z jej realną wartością?",
    answer:
      "Podczas wyceny nieruchomości korzystamy z autorskiego programu Wyceny 5 Kroków. Porównujemy ceny ofertowe i transakcyjne z wielu różnych źródeł, zanim przedstawimy szczegółowy raport analityczny. Dzięki temu wyceny opieramy o rzeczywiste dane oraz aktualną sytuację makroekonomiczną i trendy rynkowe.",
  },
  {
    question: "Jak wygląda proces sprzedaży? Czy ktoś poprowadzi mnie krok po kroku przez wszystkie formalności?",
    answer:
      "Zajmujemy się całym procesem sprzedaży – od przygotowania nieruchomości, przez nowoczesny marketing, negocjacje, aż po finalizację formalności. Przeprowadzamy klientów przez każdy etap w sposób przejrzysty i profesjonalny.",
  },
];

const defaultIntroTitle = "Sprzedaj mieszkanie świadomie — z wyceną opartą o realny rynek";
const defaultIntroCopy =
  "Zajmujemy się całym procesem sprzedaży – od przygotowania nieruchomości, przez nowoczesny marketing, negocjacje, aż po finalizację formalności. Przeprowadzamy klientów przez każdy etap w sposób przejrzysty i profesjonalny.";

const salePillars = [
  {
    title: "Wycena: program Wyceny 5 Kroków",
    lead:
      "Ceny widoczne na portalach ogłoszeniowych to wartości ofertowe, często zawyżone nawet o 20–30% względem realnych kwot, po których nieruchomości faktycznie znajdują nabywców.",
    points: [
      "W analizie bazujemy wyłącznie na cenach transakcyjnych — danych z rzeczywiście zakończonych sprzedaży.",
      "Określisz trafną cenę ofertową i unikniesz zbyt długiego czasu sprzedaży.",
      "Będziesz negocjować z pozycji wiedzy, nie intuicji.",
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

export async function generateMetadata(): Promise<Metadata> {
  return resolveKeyPageMetadata("sprzedaz");
}

export default async function SprzedazPage() {
  const year = new Date().getFullYear();
  const [cmsPage, cmsFaqItems, cmsTestimonials] = await Promise.all([
    safeCmsCall(() => fetchCmsPageBySlug("sprzedaz"), null),
    safeCmsCall(() => fetchCmsFaqByPageType("sprzedaz"), []),
    safeCmsCall(fetchCmsFeaturedTestimonials, []),
  ]);
  const introTitle = resolveCmsText(cmsPage?.headline, defaultIntroTitle);
  const introCopy = resolveCmsText(cmsPage?.content, defaultIntroCopy);
  const hasOnlySeedFaq =
    cmsFaqItems.length === 1 &&
    (cmsFaqItems[0]?.question?.includes("Ile trwa standardowa sprzedaz") ?? false);
  const faqItems = cmsFaqItems.length > 0 && !hasOnlySeedFaq ? cmsFaqItems : saleFaqFallback;

  return (
    <>
      <main>
        <SiteTopbar />
        <PageIntroSection
          eyebrow="Sprzedaż nieruchomości"
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
              <CtaClickLink href="#wycena" className="prefooter-btn" ctaLocation="sprzedaz_lane" ctaLabel="Przejdź do wyceny" data-conversion-point="sprzedaz_lane_wycena">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do wyceny</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do wyceny</span>
                </span>
                <span className="sr-only">Przejdź do wyceny</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </CtaClickLink>
              <CtaClickLink href={ROUTE_PATHS.inwestycje} className="link-arrow" ctaLocation="sprzedaz_lane" ctaLabel="inwestycje_link">
                Szukasz ścieżki inwestycyjnej? Przejdź do inwestycji
              </CtaClickLink>
            </div>
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <header className="process-head">
              <p className="eyebrow">Proces sprzedaży</p>
              <h2 className="section-title">5 kroków do bezpiecznej i skutecznej sprzedaży nieruchomości</h2>
              <p className="section-copy process-head-copy">
                Prowadzimy Cię krok po kroku — od wyceny w oparciu o program Wyceny 5 Kroków, przez marketing i
                negocjacje, aż po formalności przy finalizacji transakcji.
              </p>
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
              {faqItems.map((item, idx) => (
                <article key={`${item.question ?? "faq"}-${idx}`} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section sale-cta-strip">
          <div className="container sale-cta-shell">
            <p className="eyebrow">Następny krok</p>
            <h2>Bezpłatna wycena online albo rozmowa z ekspertem.</h2>
            <p>
              Dzięki bezpłatnej wycenie online sprzedajesz w cenie rynkowej, a nie poniżej realnej wartości
              mieszkania. Możesz też najpierw umówić konsultację i omówić sytuację 1:1.
            </p>
            <div className="sale-cta-actions">
              <CtaClickLink
                href={`${ROUTE_PATHS.kontakt}?lane=sprzedaz#kontakt`}
                className="prefooter-btn"
                ctaLocation="sprzedaz_strip"
                ctaLabel="Umów konsultację"
                data-conversion-point="sprzedaz_strip_kontakt"
              >
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span>
                </span>
                <span className="sr-only">Umów konsultację</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </CtaClickLink>
              <CtaClickLink href="#wycena" className="prefooter-btn" ctaLocation="sprzedaz_strip" ctaLabel="Przejdź do formularza wyceny" data-conversion-point="sprzedaz_strip_wycena">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Przejdź do formularza wyceny</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Przejdź do formularza wyceny</span>
                </span>
                <span className="sr-only">Przejdź do formularza wyceny</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </CtaClickLink>
            </div>
          </div>
        </section>

        <WycenaSection
          sourcePage="sprzedaz"
          eyebrow="Bezpłatna wycena online"
          title="Sprzedaj w cenie rynkowej, nie poniżej realnej wartości"
          lead="Wypełnij krótki formularz — zajmie Ci to mniej niż 2 minuty. System analizuje tysiące ofert i realne ceny transakcyjne, uwzględniając lokalizację, metraż i standard."
          promise="Otrzymujesz gotową wycenę na e-mail wraz z porównaniem ofert w okolicy."
          steps={[
            {
              title: "Wypełnij formularz",
              text: "Podaj podstawowe informacje o nieruchomości — to zajmie mniej niż 2 minuty.",
            },
            {
              title: "Analiza",
              text: "System analizuje tysiące ofert i realne ceny transakcyjne z uwzględnieniem lokalizacji, metrażu i standardu.",
            },
            {
              title: "Raport na e-mail",
              text: "W kilka chwil dostajesz raport z wyceną oraz porównaniem ofert w okolicy.",
            },
          ]}
          consultationNote="Dodatkowo: bezpłatna konsultacja z ekspertem — razem z wyceną możesz porozmawiać o tym, jak sprzedać nieruchomość."
          helperText="Po wysłaniu formularza przygotujemy wycenę i odezwiemy się z raportem oraz możliwością bezpłatnej konsultacji."
          submitLabel="Wyślij i odbierz wycenę"
          successMessage="Dziękujemy. Formularz wyceny został wysłany — wkrótce otrzymasz raport na e-mail."
        />

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
