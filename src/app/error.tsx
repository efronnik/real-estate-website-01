"use client";

import { useEffect } from "react";
import { ROUTE_PATHS } from "@/config/navigation";
import { SiteTopbar } from "@/components/site-topbar";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("route_render_error", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <main>
      <SiteTopbar />
      <section className="section">
        <div className="container article-shell">
          <p className="eyebrow">500</p>
          <h1 className="section-title">Wystąpił błąd po stronie aplikacji</h1>
          <p className="section-copy">
            Spróbuj odświeżyć widok. Jeśli problem powtarza się, przejdź do kontaktu.
          </p>
          <div className="sale-cta-actions">
            <button type="button" className="prefooter-btn" onClick={reset}>
              Spróbuj ponownie
            </button>
            <a href={ROUTE_PATHS.kontakt} className="prefooter-btn">
              Kontakt
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
