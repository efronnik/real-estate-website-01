import { ROUTE_PATHS } from "@/config/navigation";
import { SiteTopbar } from "@/components/site-topbar";
import { SiteFooter } from "@/components/site-footer";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";

export default function NotFoundPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <main>
        <SiteTopbar />
        <section className="section">
          <div className="container article-shell">
            <p className="eyebrow">404</p>
            <h1 className="section-title">Strona nie została znaleziona</h1>
            <p className="section-copy">
              Ten adres nie istnieje albo został przeniesiony. Przejdź do strony głównej lub kontaktu.
            </p>
            <p className="section-copy">
              <a href={ROUTE_PATHS.home}>Wróć na stronę główną</a>
              {" | "}
              <a href={ROUTE_PATHS.kontakt}>Przejdź do kontaktu</a>
            </p>
          </div>
        </section>
      </main>
      <div className="footer-stack">
        <SiteFooter year={year} />
      </div>
      <ScrollToTopButton />
    </>
  );
}
