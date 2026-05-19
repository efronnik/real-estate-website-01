import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { PageIntroSection } from "@/components/page-intro-section";
import { ROUTE_PATHS } from "@/config/navigation";
import { CtaClickLink } from "@/components/cta-click-link";
import { buildStaticMetadata } from "@/lib/seo";

const stagingProcessSteps = [
  {
    step: "01",
    title: "Diagnoza mieszkania i plan działań",
    text: "Oceniamy stan wnętrza, grupę docelową kupujących i zakres prac — od porządku po większe odświeżenie.",
    hero: "Plan",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    step: "02",
    title: "Aranżacja i dekoracje",
    text: "Dobieramy układ mebli, kolory i dodatki tak, by podkreślić atuty lokalu i ułatwić wyobrażenie sobie życia w przestrzeni.",
    hero: "Styl",
    image: "https://images.pexels.com/photos/7578903/pexels-photo-7578903.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    step: "03",
    title: "Profesjonalna sesja fotograficzna",
    text: "Przygotowane wnętrze fotografujemy pod kątem ogłoszenia — światło, kadry i spójność materiałów marketingowych.",
    hero: "Foto",
    image: "https://images.pexels.com/photos/7031398/pexels-photo-7031398.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    step: "04",
    title: "Prezentacja i pokazy",
    text: "Dbamy o to, by mieszkanie na żywo wyglądało tak samo dobrze jak na zdjęciach — to buduje zaufanie kupujących.",
    hero: "Pokaz",
    image: "https://images.pexels.com/photos/7578912/pexels-photo-7578912.jpeg?auto=compress&cs=tinysrgb&w=1800",
  },
  {
    step: "05",
    title: "Wsparcie przy sprzedaży",
    text: "Home staging łączymy z procesem sprzedaży — szybsze zapytania i lepsze warunki negocjacji ceny.",
    hero: "Sprzedaż",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
  },
];

const stagingPillars = [
  {
    title: "Większa atrakcyjność na rynku",
    lead: "Starannie przygotowane wnętrze wyróżnia ofertę już w ogłoszeniu i podczas pierwszej wizyty.",
    points: [
      "Lepsze pierwsze wrażenie w kuchni, łazience i strefie dziennej.",
      "Więcej jakościowych zapytań od zdecydowanych kupujących.",
    ],
  },
  {
    title: "Estetyka i funkcjonalność",
    lead: "Wnętrza są nie tylko ładne, ale też logicznie zaprojektowane — łatwiej „zobaczyć siebie” w mieszkaniu.",
    points: [
      "Aranżacja pod realny metraż i światło w lokalu.",
      "Spójna narracja wartości w całym mieszkaniu.",
    ],
  },
  {
    title: "Szybsza sprzedaż i lepsza cena",
    lead: "Dobrze przygotowane wnętrza skracają czas oczekiwania na transakcję i wspierają negocjacje.",
    points: [
      "Mniej przypadkowych oglądań, więcej rozmów o warunkach.",
      "Lepsze uzasadnienie ceny ofertowej na rynku.",
    ],
  },
  {
    title: "Kompleks od A do Z",
    lead: "Od planu po zdjęcia — jeden zespół, jeden standard jakości.",
    points: [
      "Aranżacja, dekoracje i sesja foto w jednym procesie.",
      "Możliwość połączenia ze ścieżką sprzedaży FIND.",
    ],
  },
];

const stagingFaq = [
  {
    question: "Dla kogo jest usługa home staging FIND?",
    answer:
      "Dla właścicieli sprzedających mieszkanie lub dom — zwłaszcza gdy zależy im na szybszej sprzedaży i profesjonalnej prezentacji bez samodzielnego „składania” wnętrza.",
  },
  {
    question: "Czy home staging to to samo co remont?",
    answer:
      "Nie. Staging koncentruje się na prezentacji i pierwszym wrażeniu — porządek, aranżacja, światło, detale. Remont to osobny zakres, który omawiamy tylko wtedy, gdy ma sens ekonomicznie.",
  },
  {
    question: "Czy mogę przeczytać poradnik przed zamówieniem usługi?",
    answer:
      "Tak — na blogu znajdziesz artykuły o przygotowaniu mieszkania do sprzedaży. Usługa FIND to wykonanie stagingu przez nasz zespół, nie tylko teoria.",
  },
];

const introTitle = "Home staging";
const introCopy =
  "Oferujemy profesjonalne usługi home stagingu, które znacząco zwiększają atrakcyjność nieruchomości na rynku. Dzięki starannemu przygotowaniu wnętrza, Twoja nieruchomość zyska na wartości i przyciągnie większą liczbę potencjalnych klientów. Nasz zespół specjalistów zadba o każdy detal – od aranżacji wnętrz, przez dobór odpowiednich dekoracji, aż po profesjonalną sesję fotograficzną. Przygotowane przez nas wnętrza są nie tylko estetyczne, ale także funkcjonalne, co pozwala klientom łatwiej wyobrazić sobie życie w danej przestrzeni. Home staging to sprawdzony sposób na przyspieszenie sprzedaży i uzyskanie lepszej ceny za nieruchomość. Nasze doświadczenie pokazuje, że dobrze przygotowane wnętrza przyciągają więcej zainteresowanych i skracają czas oczekiwania na finalizację transakcji.";

export function generateMetadata(): Metadata {
  return buildStaticMetadata({
    title: "Home staging | FIND",
    description:
      "Profesjonalny home staging: aranżacja, dekoracje i sesja foto. Przyspiesz sprzedaż i zwiększ atrakcyjność nieruchomości na rynku.",
    path: ROUTE_PATHS.homeStaging,
  });
}

export default function HomeStagingPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <main>
        <SiteTopbar />
        <PageIntroSection eyebrow="Usługi / Home staging" title={introTitle} copy={introCopy} />

        <section className="section lane-qualify">
          <div className="container lane-qualify-shell">
            <p className="eyebrow">Czy ta usługa jest dla Ciebie?</p>
            <h2 className="section-title">Home staging ma sens, gdy zależy Ci na mocnej prezentacji i szybszej sprzedaży.</h2>
            <div className="lane-checks">
              <article className="lane-check">
                <strong>01</strong>
                <p>Wystawiasz mieszkanie na sprzedaż i chcesz wyróżnić je na tle konkurencji w ogłoszeniu.</p>
              </article>
              <article className="lane-check">
                <strong>02</strong>
                <p>Potrzebujesz profesjonalnych zdjęć i spójnej aranżacji bez samodzielnej organizacji.</p>
              </article>
              <article className="lane-check">
                <strong>03</strong>
                <p>Chcesz skrócić czas sprzedaży i wesprzeć negocjacje lepszym pierwszym wrażeniem.</p>
              </article>
            </div>
            <div className="lane-actions">
              <CtaClickLink
                href={`${ROUTE_PATHS.kontakt}?lane=staging#kontakt`}
                className="prefooter-btn"
                ctaLocation="staging_lane"
                ctaLabel="Zapytaj o home staging"
              >
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Zapytaj o home staging</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Zapytaj o home staging</span>
                </span>
                <span className="sr-only">Zapytaj o home staging</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
              <CtaClickLink href={ROUTE_PATHS.sprzedaz} className="link-arrow" ctaLocation="staging_lane" ctaLabel="sprzedaz_link">
                Pełna ścieżka sprzedaży → Sprzedaż
              </CtaClickLink>
            </div>
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <header className="process-head">
              <p className="eyebrow">Jak pracujemy</p>
              <h2 className="section-title">5 etapów profesjonalnego home stagingu</h2>
            </header>
          </div>
          <div className="service-board">
            {stagingProcessSteps.map((step) => (
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
            <p className="eyebrow">Co zyskujesz</p>
            <h2 className="section-title">Dlaczego home staging FIND działa na rynku</h2>
            <div className="sale-pillars-grid">
              {stagingPillars.map((pillar) => (
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
              <h2>FAQ — home staging</h2>
              {stagingFaq.map((item) => (
                <article key={item.question} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
              <p className="section-copy" style={{ marginTop: "1rem" }}>
                Poradniki na blogu:{" "}
                <Link href="/blog/jak-przygotowac-mieszkanie-do-sprzedazy" className="link-arrow">
                  Jak przygotować mieszkanie do sprzedaży
                </Link>
                {" · "}
                <Link href="/blog/home-staging-premium-bez-przepalania-budzetu" className="link-arrow">
                  Home staging premium
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="section sale-cta-strip">
          <div className="container sale-cta-shell">
            <p className="eyebrow">Następny krok</p>
            <h2>Przygotuj mieszkanie do sprzedaży z naszym zespołem</h2>
            <p>Umów rozmowę — ustalimy zakres stagingu i harmonogram pod Twoją ofertę.</p>
            <div className="sale-cta-actions">
              <CtaClickLink
                href={`${ROUTE_PATHS.kontakt}?lane=staging#kontakt`}
                className="prefooter-btn"
                ctaLocation="staging_strip"
                ctaLabel="Umów konsultację"
              >
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span>
                </span>
                <span className="sr-only">Umów konsultację</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
              <CtaClickLink
                href="/blog/jak-przygotowac-mieszkanie-do-sprzedazy"
                className="prefooter-btn"
                ctaLocation="staging_strip"
                ctaLabel="Czytaj poradnik"
              >
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Czytaj poradnik</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Czytaj poradnik</span>
                </span>
                <span className="sr-only">Czytaj poradnik</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
            </div>
          </div>
        </section>

        <LeadContactSection
          sectionId="kontakt"
          sourcePage="home-staging"
          eyebrow="Kontakt / Home staging"
          title="Zostaw dane — wrócimy z propozycją zakresu prac"
          description="Opisz krótko lokal i termin sprzedaży. Zaproponujemy plan home stagingu i kolejne kroki."
        />
      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Sprzedajesz mieszkanie?"
          title="Połącz home staging z profesjonalną sprzedażą FIND."
          buttons={[
            { href: `${ROUTE_PATHS.kontakt}?lane=staging#kontakt`, label: "Zapytaj o staging" },
            { href: ROUTE_PATHS.sprzedaz, label: "Ścieżka sprzedaży" },
          ]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
