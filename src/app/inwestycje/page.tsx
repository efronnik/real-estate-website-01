import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { PageIntroSection } from "@/components/page-intro-section";
import { ROUTE_PATHS } from "@/config/navigation";
import { fetchCmsPageBySlug } from "@/lib/cms";

export default async function InwestycjePage() {
  const year = new Date().getFullYear();
  const cmsPage = await fetchCmsPageBySlug("inwestycje");
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
              <a href="#kontakt" className="prefooter-btn">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację inwestycyjną</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację inwestycyjną</span>
                </span>
                <span className="sr-only">Umów konsultację inwestycyjną</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href={ROUTE_PATHS.sprzedaz} className="link-arrow">Masz nieruchomość do sprzedaży? Przejdź do sprzedaży</a>
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
          title="Wybierz: konsultacja inwestycyjna albo materiały edukacyjne."
          buttons={[
            { href: "#kontakt", label: "Umow konsultacje" },
            { href: ROUTE_PATHS.blog, label: "Czytaj materialy" },
          ]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
