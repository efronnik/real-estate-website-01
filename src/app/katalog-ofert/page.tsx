import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { PageIntroSection } from "@/components/page-intro-section";
import { ROUTE_PATHS, USLUGI_NAV_LINKS } from "@/config/navigation";
import { CtaClickLink } from "@/components/cta-click-link";
import { buildStaticMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildStaticMetadata({
    title: "Katalog ofert | FIND",
    description:
      "Przeglądaj oferty mieszkań na sprzedaż w Warszawie. Katalog w przygotowaniu — skontaktuj się lub zobacz pozostałe usługi FIND.",
    path: ROUTE_PATHS.katalogOfert,
  });
}

const relatedServices = USLUGI_NAV_LINKS.filter((link) => link.href !== ROUTE_PATHS.katalogOfert);

export default function KatalogOfertPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <main>
        <SiteTopbar />
        <PageIntroSection
          eyebrow="Usługi / Katalog"
          title="Katalog ofert mieszkań"
          copy="Tutaj pojawią się aktualne oferty mieszkań na sprzedaż — z filtrowaniem, zdjęciami i możliwością kontaktu w sprawie wybranej nieruchomości. Pracujemy nad uruchomieniem katalogu. Do tego czasu pomożemy Ci w finansowaniu zakupu, home stagingu przy sprzedaży lub pełnej ścieżce sprzedaży."
        />

        <section className="section lane-qualify">
          <div className="container lane-qualify-shell">
            <p className="eyebrow">Status</p>
            <h2 className="section-title">Katalog ofert — wkrótce dostępny online</h2>
            <div className="lane-checks">
              <article className="lane-check">
                <strong>01</strong>
                <p>Oferty mieszkań z opisem, zdjęciami i kluczowymi parametrami (metraż, lokalizacja, cena).</p>
              </article>
              <article className="lane-check">
                <strong>02</strong>
                <p>Możliwość przejścia do kredytu hipotecznego lub kontaktu w sprawie wybranego lokalu.</p>
              </article>
              <article className="lane-check">
                <strong>03</strong>
                <p>Spójność z pozostałymi usługami FIND — sprzedaż, staging i doradztwo kredytowe.</p>
              </article>
            </div>
            <div className="lane-actions">
              <CtaClickLink href={ROUTE_PATHS.kontakt} className="prefooter-btn" ctaLocation="katalog_lane" ctaLabel="Zapytaj o ofertę">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Zapytaj o ofertę</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Zapytaj o ofertę</span>
                </span>
                <span className="sr-only">Zapytaj o ofertę</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
              <CtaClickLink href={ROUTE_PATHS.sprzedaz} className="link-arrow" ctaLocation="katalog_lane" ctaLabel="sprzedaz">
                Sprzedajesz mieszkanie? → Sprzedaż
              </CtaClickLink>
            </div>
          </div>
        </section>

        <section className="section sale-pillars">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Inne usługi FIND</p>
            <h2 className="section-title">Co możesz zrobić już teraz</h2>
            <div className="sale-pillars-grid">
              {relatedServices.map((service) => (
                <article key={service.href} className="sale-pillar-card">
                  <h3>{service.label}</h3>
                  <p>
                    {service.href === ROUTE_PATHS.homeStaging
                      ? "Profesjonalne przygotowanie wnętrza pod sprzedaż — aranżacja, dekoracje i sesja foto."
                      : service.href === ROUTE_PATHS.kredytyHipoteczne
                        ? "Doradztwo kredytowe przy zakupie — porównanie banków i prowadzenie wniosku."
                        : "Poznaj usługę FIND."}
                  </p>
                  <p>
                    <a href={service.href} className="link-arrow">
                      Przejdź do {service.label.toLowerCase()}
                    </a>
                  </p>
                </article>
              ))}
              <article className="sale-pillar-card">
                <h3>Sprzedaż nieruchomości</h3>
                <p>Pełna ścieżka sprzedaży — wycena, marketing, negocjacje i formalności. Osobna usługa poza katalogiem.</p>
                <p>
                  <a href={ROUTE_PATHS.sprzedaz} className="link-arrow">
                    Przejdź do sprzedaży
                  </a>
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Szukasz mieszkania?"
          title="Zostaw kontakt — damy znać, gdy katalog będzie gotowy."
          buttons={[
            { href: ROUTE_PATHS.kontakt, label: "Kontakt" },
            { href: ROUTE_PATHS.kredytyHipoteczne, label: "Kredyt hipoteczny" },
          ]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
