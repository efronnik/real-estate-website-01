"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";

export default function KontaktPage() {
  const year = new Date().getFullYear();

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
            <h1 className="section-title">Porozmawiajmy o sprzedaży Twojej nieruchomości</h1>
            <p className="section-copy">Krótka konsultacja wystarczy, żeby ustalić kierunek działań i bezpieczny plan sprzedaży.</p>
          </div>
        </section>

        <LeadContactSection
          sectionId="kontakt"
          sourcePage="kontakt"
          eyebrow="Konsultacja / Współpraca"
          title="Warszawa, Polska"
          description="Pracujemy lokalnie, ale prowadzimy proces end-to-end. Dostajesz strategię, egzekucję i bezpieczny final sprzedazy."
        />
      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Koniec przewijania? Zróbmy pierwszy krok."
          title="Sprzedaj mieszkanie spokojnie i na dobrych warunkach."
          buttons={[
            { href: "#kontakt", label: "Umów konsultację" },
            { href: "/sprzedaz", label: "Przejdź do wyceny" },
          ]}
        />

        <SiteFooter year={year} />
      </div>

      <ScrollToTopButton />
    </>
  );
}

