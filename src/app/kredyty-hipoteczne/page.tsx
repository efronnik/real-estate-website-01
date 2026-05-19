import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { PageIntroSection } from "@/components/page-intro-section";
import { ROUTE_PATHS } from "@/config/navigation";
import { CtaClickLink } from "@/components/cta-click-link";
import { buildStaticMetadata } from "@/lib/seo";

const creditProcessSteps = [
  {
    step: "01",
    title: "Diagnoza sytuacji i celu zakupu",
    text: "Omawiamy budżet, wkład własny, dochody i plan zakupu nieruchomości, aby ustalić realny przedział finansowania.",
    hero: "Diagnoza",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    step: "02",
    title: "Porównanie ofert bankowych",
    text: "Analizujemy propozycje wiodących banków pod kątem raty, kosztów całkowitych i elastyczności warunków.",
    hero: "Oferty",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1600&q=80",
  },
  {
    step: "03",
    title: "Przygotowanie i złożenie wniosku",
    text: "Pomagamy zebrać dokumenty, uporządkować dane i złożyć wniosek tak, aby ograniczyć ryzyko opóźnień formalnych.",
    hero: "Wniosek",
    image: "https://images.pexels.com/photos/48195/document-agreement-documents-sign-48195.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    step: "04",
    title: "Decyzja kredytowa i negocjacje warunków",
    text: "Wyjaśniamy decyzję banku, omawiamy warunki umowy i wspieramy w wyborze wariantu dopasowanego do Twojej sytuacji.",
    hero: "Decyzja",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  },
  {
    step: "05",
    title: "Finalizacja umowy i zakup nieruchomości",
    text: "Towarzyszymy w domknięciu procesu kredytowego i koordynacji z zakupem mieszkania — od wniosku po podpisanie umowy.",
    hero: "Final",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
  },
];

const creditPillars = [
  {
    title: "Współpraca z wiodącymi bankami",
    lead: "Porównujemy rozwiązania wielu instytucji, aby dobrać finansowanie zakupu nieruchomości do Twoich możliwości.",
    points: [
      "Dostęp do ofert kilku banków w jednym procesie doradczym.",
      "Porównanie warunków pod kątem raty, okresu i kosztów całkowitych.",
    ],
  },
  {
    title: "Oferta dopasowana do Ciebie",
    lead: "Nie chodzi o „najtańszy kredyt z reklamy”, lecz o wariant bezpieczny przy Twoim budżecie i planie życia.",
    points: [
      "Analiza wkładu własnego, dochodów i planowanego zakupu.",
      "Scenariusze: stała vs zmienna stopa, okres spłaty, zabezpieczenia.",
    ],
  },
  {
    title: "Prowadzenie krok po kroku",
    lead: "Od pierwszej rozmowy po finalizację umowy — z jasnym harmonogramem i odpowiedzialnością za kolejne etapy.",
    points: [
      "Lista dokumentów i checklista formalna przed wnioskiem.",
      "Wsparcie przy pytaniach banku i przygotowaniu do podpisu umowy.",
    ],
  },
  {
    title: "Spójność z zakupem mieszkania",
    lead: "Kredyt i transakcja nieruchomości idą w parze — pomagamy zsynchronizować terminy i warunki.",
    points: [
      "Koordynacja z procesem zakupu (w tym przyszłe katalogi ofert).",
      "Bezpieczne planowanie harmonogramu: decyzja kredytowa → akt → wpłata.",
    ],
  },
];

const creditFaq = [
  {
    question: "Dla kogo jest doradztwo kredytowe FIND?",
    answer:
      "Dla osób planujących zakup mieszkania lub domu — pierwsze mieszkanie, zmiana na większe metraże lub inwestycja pod wynajem. Jeśli potrzebujesz uporządkować finansowanie przed podpisaniem umowy, ta ścieżka jest dla Ciebie.",
  },
  {
    question: "Czy FIND zastępuje bank lub doradcę kredytowego banku?",
    answer:
      "Nie. Wspieramy w porównaniu ofert i przejściu przez proces, ale ostateczną decyzję kredytową podejmuje bank. Szczegóły umowy zawsze weryfikuj z przedstawicielem instytucji finansowej.",
  },
  {
    question: "Ile trwa uzyskanie kredytu hipotecznego?",
    answer:
      "Zależy od banku, kompletności dokumentów i sytuacji finansowej. Po wstępnej diagnozie podamy realny harmonogram — zwykle od kilku dni roboczych na wstępną ocenę do kilku tygodni do decyzji i umowy.",
  },
];

const introTitle = "Kredyty hipoteczne";
const introCopy =
  "Oferujemy kompleksowe doradztwo w zakresie kredytów hipotecznych. Współpracujemy z wiodącymi bankami, aby zapewnić naszym klientom najlepsze warunki finansowania zakupu nieruchomości. Nasz zespół ekspertów pomoże Ci wybrać najkorzystniejszą ofertę kredytową, dostosowaną do Twoich potrzeb i możliwości. Przeprowadzimy Cię przez cały proces uzyskiwania kredytu, od złożenia wniosku po finalizację umowy, dbając o każdy detal i zapewniając pełne wsparcie na każdym etapie.";

export function generateMetadata(): Metadata {
  return buildStaticMetadata({
    title: "Kredyty hipoteczne | FIND",
    description:
      "Kompleksowe doradztwo kredytowe przy zakupie nieruchomości: porównanie ofert banków, wniosek i wsparcie do finalizacji umowy.",
    path: ROUTE_PATHS.kredytyHipoteczne,
  });
}

export default function KredytyHipotecznePage() {
  const year = new Date().getFullYear();

  return (
    <>
      <main>
        <SiteTopbar />
        <PageIntroSection eyebrow="Finansowanie zakupu" title={introTitle} copy={introCopy} />

        <section className="section lane-qualify">
          <div className="container lane-qualify-shell">
            <p className="eyebrow">Czy ta ścieżka jest dla Ciebie?</p>
            <h2 className="section-title">
              Kredyt hipoteczny ma sens, gdy chcesz kupić nieruchomość z planem i wsparciem na każdym etapie.
            </h2>
            <div className="lane-checks">
              <article className="lane-check">
                <strong>01</strong>
                <p>Planujesz zakup mieszkania i chcesz porównać oferty kilku banków w jednym miejscu.</p>
              </article>
              <article className="lane-check">
                <strong>02</strong>
                <p>Potrzebujesz pomocy w dokumentach, wniosku i harmonogramie decyzji kredytowej.</p>
              </article>
              <article className="lane-check">
                <strong>03</strong>
                <p>Zależy Ci, aby finansowanie było spójne z procesem zakupu nieruchomości.</p>
              </article>
            </div>
            <div className="lane-actions">
              <CtaClickLink
                href={`${ROUTE_PATHS.kontakt}?lane=kredyt#kontakt`}
                className="prefooter-btn"
                ctaLocation="kredyty_lane"
                ctaLabel="Umów rozmowę o kredycie"
              >
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów rozmowę o kredycie</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów rozmowę o kredycie</span>
                </span>
                <span className="sr-only">Umów rozmowę o kredycie</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
              <CtaClickLink href={ROUTE_PATHS.sprzedaz} className="link-arrow" ctaLocation="kredyty_lane" ctaLabel="sprzedaz_link">
                Sprzedajesz mieszkanie? Przejdź do sprzedaży
              </CtaClickLink>
            </div>
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <header className="process-head">
              <p className="eyebrow">Proces kredytowy</p>
              <h2 className="section-title">5 etapów od pierwszej rozmowy do finalizacji umowy</h2>
              <p className="section-copy process-head-copy">
                Przeprowadzimy Cię przez cały proces uzyskiwania kredytu — od złożenia wniosku po finalizację umowy,
                dbając o każdy detal.
              </p>
            </header>
          </div>
          <div className="service-board">
            {creditProcessSteps.map((step) => (
              <article key={step.title} className="service-row" style={{ ["--bg" as string]: `url(${step.image})` }}>
                <div className="service-info">
                  <p className="idx">
                    <span className="idx-text">{step.step}</span>
                  </p>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <div className="service-word">
                  <span>{step.hero}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section sale-pillars">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Co obejmuje współpraca</p>
            <h2 className="section-title">Doradztwo kredytowe dopasowane do zakupu nieruchomości</h2>
            <div className="sale-pillars-grid">
              {creditPillars.map((pillar) => (
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

        <section className="section">
          <div className="container">
            <div className="surface faq-box">
              <h2>FAQ — kredyty hipoteczne</h2>
              {creditFaq.map((item) => (
                <article key={item.question} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
              <p className="credit-disclaimer">
                Informacje na stronie mają charakter ogólny i nie stanowią oferty kredytu ani porady prawnej. Warunki
                kredytu ustalane są indywidualnie przez bank. Przed podpisaniem umowy zapoznaj się z dokumentacją
                instytucji finansowej.
              </p>
            </div>
          </div>
        </section>

        <section className="section sale-cta-strip">
          <div className="container sale-cta-shell">
            <p className="eyebrow">Następny krok</p>
            <h2>Porozmawiajmy o finansowaniu zakupu mieszkania</h2>
            <p>
              Umów krótką konsultację — omówimy budżet, wkład własny i kolejne kroki w kierunku decyzji kredytowej.
            </p>
            <div className="sale-cta-actions">
              <CtaClickLink
                href={`${ROUTE_PATHS.kontakt}?lane=kredyt#kontakt`}
                className="prefooter-btn"
                ctaLocation="kredyty_strip"
                ctaLabel="Umów konsultację kredytową"
              >
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację kredytową</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację kredytową</span>
                </span>
                <span className="sr-only">Umów konsultację kredytową</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
              <CtaClickLink href={ROUTE_PATHS.inwestycje} className="prefooter-btn" ctaLocation="kredyty_strip" ctaLabel="Inwestycje">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Ścieżka inwestycyjna</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Ścieżka inwestycyjna</span>
                </span>
                <span className="sr-only">Ścieżka inwestycyjna</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
            </div>
          </div>
        </section>

        <LeadContactSection
          sectionId="kontakt"
          sourcePage="kredyty-hipoteczne"
          eyebrow="Kontakt / Kredyt hipoteczny"
          title="Zostaw dane — oddzwonimy z planem finansowania"
          description="Opisz krótko plan zakupu i budżet. Wrócimy z propozycją kolejnych kroków w procesie kredytowym."
        />
      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Planujesz zakup?"
          title="Porównaj oferty banków i przejdź przez proces kredytowy z wsparciem."
          buttons={[
            { href: `${ROUTE_PATHS.kontakt}?lane=kredyt#kontakt`, label: "Umów konsultację" },
            { href: ROUTE_PATHS.sprzedaz, label: "Sprzedaż nieruchomości" },
          ]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
