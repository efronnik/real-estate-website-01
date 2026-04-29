import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { fetchCmsPageBySlug, getPageMetadataFromCms } from "@/lib/cms";
import { ROUTE_PATHS } from "@/config/navigation";

const kontaktFinalBlocks = [
  {
    title: "Co dzieje się po wysłaniu formularza",
    points: [
      "Kontaktujemy się z Tobą i doprecyzowujemy sytuację nieruchomości.",
      "Ustalamy priorytety i rekomendowany następny krok.",
      "Przechodzisz do planu działania bez zgadywania.",
    ],
  },
  {
    title: "Jak przygotować się do konsultacji",
    points: [
      "Przygotuj podstawowe dane nieruchomości i cel sprzedaży/inwestycji.",
      "Zanotuj najważniejsze pytania i ograniczenia czasowe.",
      "Wspólnie dobierzemy właściwą ścieżkę działania.",
    ],
  },
  {
    title: "Gdzie przejść dalej",
    points: [
      "Ścieżka sprzedaży: pełny proces i wycena nieruchomości.",
      "Ścieżka inwestycyjna: strategia kapitału i selekcja okazji.",
      "Blog: materiały edukacyjne i checklisty decyzji.",
    ],
  },
];

const fallbackMetadata: Metadata = {
  title: "Kontakt | FIND",
  description: "Skontaktuj sie, aby omowic sprzedaz lub inwestowanie w nieruchomosci. Krotka konsultacja i konkretny plan dalszych dzialan.",
};

export async function generateMetadata(): Promise<Metadata> {
  const cmsMetadata = await getPageMetadataFromCms("kontakt", "/kontakt");
  if (!cmsMetadata) {
    return fallbackMetadata;
  }
  return cmsMetadata;
}

type KontaktPageProps = {
  searchParams?: {
    lane?: string | string[];
  };
};

function toSingleParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function KontaktPage({ searchParams }: KontaktPageProps) {
  const year = new Date().getFullYear();
  const cmsPage = await fetchCmsPageBySlug("kontakt");
  const laneParam = toSingleParam(searchParams?.lane);
  const isInvestorLane = laneParam === "inwestycje";
  const formLeadType = isInvestorLane ? "inwestor" : "kontakt";
  const heroTitle = cmsPage?.headline ?? "Porozmawiajmy o sprzedaży Twojej nieruchomości";
  const heroLead =
    cmsPage?.lead ??
    "Krótka konsultacja wystarczy, żeby ustalić kierunek działań i bezpieczny plan sprzedaży.";
  const cmsSectionLead =
    cmsPage?.content ??
    "Po kontakcie dostajesz konkretny plan dalszych działań: od diagnozy sytuacji po wybór najlepszej ścieżki współpracy.";

  return (
    <>
      <main className="kontakt-page">
        <SiteTopbar />

        <section className="section kontakt-hero">
          <video className="kontakt-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/Hero-Kontakt.mp4" type="video/mp4" />
          </video>
          <div className="kontakt-hero-overlay" aria-hidden="true"></div>
          <div className="container kontakt-hero-shell">
            <p className="eyebrow">Kontakt</p>
            <h1 className="section-title">{heroTitle}</h1>
            <p className="section-copy">{heroLead}</p>
          </div>
        </section>

        <section className="section sale-pillars">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Finalizacja kontaktu</p>
            <h2 className="section-title">Krótko i konkretnie: co dalej po kontakcie</h2>
            <p className="section-copy">{cmsSectionLead}</p>
            <div className="sale-pillars-grid">
              {kontaktFinalBlocks.map((block) => (
                <article key={block.title} className="sale-pillar-card">
                  <h3>{block.title}</h3>
                  <ul>
                    {block.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <h3>Przejdz bezposrednio do odpowiedniej sciezki</h3>
            <p className="section-copy">
              Szybkie przejścia:
              {" "}
              <a href={`${ROUTE_PATHS.sprzedaz}#wycena`}>Sprzedaż</a>
              {" | "}
              <a href={ROUTE_PATHS.inwestycje}>Inwestycje</a>
              {" | "}
              <a href={ROUTE_PATHS.blog}>Blog</a>
            </p>
          </div>
        </section>

        <LeadContactSection
          sectionId="kontakt"
          sourcePage="kontakt"
          leadType={formLeadType}
          eyebrow={isInvestorLane ? "Konsultacja inwestycyjna" : "Konsultacja / Współpraca"}
          title={isInvestorLane ? "Porozmawiajmy o Twoim kapitalie" : "Warszawa, Polska"}
          description={
            isInvestorLane
              ? "Przejscie z inwestycji: zaczynamy od celu kapitalowego i planu dzialania krok po kroku."
              : "Przejscie ze sprzedazy: doprecyzujemy sytuacje nieruchomosci i wybierzemy najlepszy wariant kolejnego kroku."
          }
        />
      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Koniec przewijania? Zróbmy pierwszy krok."
          title="Sprzedaj mieszkanie spokojnie i na dobrych warunkach."
          buttons={[
            { href: "#kontakt", label: "Umów konsultację" },
            { href: ROUTE_PATHS.sprzedaz, label: "Przejdź do wyceny" },
          ]}
        />

        <SiteFooter year={year} />
      </div>

      <ScrollToTopButton />
    </>
  );
}

