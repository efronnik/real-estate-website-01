"use client";

import { useEffect, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { fetchCmsPageBySlug } from "@/lib/cms";

export default function KontaktPage() {
  const year = new Date().getFullYear();
  const [heroTitle, setHeroTitle] = useState<string | null>(null);
  const [heroLead, setHeroLead] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadCmsPage = async () => {
      const page = await fetchCmsPageBySlug("kontakt");
      if (!mounted || !page) return;
      setHeroTitle(page.headline ?? null);
      setHeroLead(page.lead ?? null);
    };
    void loadCmsPage();
    return () => {
      mounted = false;
    };
  }, []);

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
            <h1 className="section-title">{heroTitle ?? "Porozmawiajmy o sprzedaży Twojej nieruchomości"}</h1>
            <p className="section-copy">{heroLead ?? "Krótka konsultacja wystarczy, żeby ustalić kierunek działań i bezpieczny plan sprzedaży."}</p>
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

