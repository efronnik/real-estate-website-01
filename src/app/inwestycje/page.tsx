import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { PageIntroSection } from "@/components/page-intro-section";

export default function InwestycjePage() {
  const year = new Date().getFullYear();

  return (
    <>
      <main>
        <SiteTopbar />
        <PageIntroSection
          eyebrow="Inwestycje"
          title="Inwestowanie w nieruchomosci w Warszawie"
          copy="To szkielet strony pod oferte flipow, leady i tresci SEO. W kolejnym kroku uzupelnimy sekcje o finalny content, FAQ i formularz konsultacji."
        />

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
          kicker="Chcesz zobaczyc, jak pracujemy w praktyce?"
          title="Zobacz nasze podejscie i proces inwestycyjny."
          buttons={[{ href: "/blog", label: "Zobacz jak pracujemy" }]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
