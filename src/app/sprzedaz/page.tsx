import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { WycenaSection } from "@/components/wycena-section";
import { Prefooter } from "@/components/prefooter";
import { PageIntroSection } from "@/components/page-intro-section";
import { ROUTE_PATHS } from "@/config/navigation";
import { fetchCmsPageBySlug } from "@/lib/cms";

export default async function SprzedazPage() {
  const year = new Date().getFullYear();
  const cmsPage = await fetchCmsPageBySlug("sprzedaz");
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
              <a href="#wycena" className="prefooter-btn">
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

        <WycenaSection sourcePage="sprzedaz" />

      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Gotowy na decyzję?"
          title="Wybierz kolejny krok: szybka wycena albo rozmowa 1:1."
          buttons={[
            { href: "#wycena", label: "Przejdz do wyceny" },
            { href: ROUTE_PATHS.kontakt, label: "Umow konsultacje" },
          ]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
