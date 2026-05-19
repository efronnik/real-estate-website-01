"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ROUTE_PATHS } from "@/config/navigation";
import { CtaClickLink } from "@/components/cta-click-link";
import {
  CLIENT_ABOUT,
  CLIENT_COMMISSION_NOTE,
  CLIENT_COMPETENCIES,
  CLIENT_METHOD_STEPS,
  CLIENT_PROFILE,
  CLIENT_SERVICES,
  CLIENT_STATS,
} from "@/lib/client-profile";
import { resolveCmsText } from "@/lib/cms-content";

const defaultHeadline = CLIENT_ABOUT.headline;
const defaultLead = CLIENT_ABOUT.lead;

const expertStats = CLIENT_STATS.map((item) => ({ label: item.label, value: item.value }));

type AboutPageClientProps = {
  cmsHeadline: string | null;
  cmsLead: string | null;
  cmsContent: string | null;
};

export function AboutPageClient({ cmsHeadline, cmsLead, cmsContent }: AboutPageClientProps) {
  const year = new Date().getFullYear();
  const headline = resolveCmsText(cmsHeadline, defaultHeadline);
  const lead = resolveCmsText(cmsLead, defaultLead);
  const resolvedContent = resolveCmsText(
    cmsContent,
    `${CLIENT_ABOUT.paragraphOwner}\n\n${CLIENT_ABOUT.paragraphToday}`,
  );
  const contentParagraphs = resolvedContent.split(/\n\n+/).filter(Boolean);

  return (
    <>
      <main className="about-page">
        <SiteTopbar />

        <section className="section about-hero about-hero--portfolio">
          <div className="container about-hero-shell">
            <p className="eyebrow">O mnie</p>
            <p className="about-hero-kicker">
              {CLIENT_PROFILE.fullName} — {CLIENT_PROFILE.tagline} · {CLIENT_PROFILE.location}
            </p>
            <h1 className="section-title">{headline}</h1>
            <p className="section-copy">{lead}</p>
            {contentParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="section-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="section about-expert">
          <div className="container about-expert-shell">
            <div className="about-expert-stats">
              {expertStats.map((item) => (
                <article key={item.label} className="about-expert-stat">
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
            <p className="section-copy about-expert-note">{CLIENT_COMMISSION_NOTE}</p>
          </div>
        </section>

        <section className="section about-competencies">
          <div className="container about-competencies-shell">
            <p className="eyebrow">Moje kompetencje</p>
            <h2 className="section-title">Doświadczenie, które przekłada się na wynik</h2>
            <ul className="about-competencies-list">
              {CLIENT_COMPETENCIES.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <blockquote className="about-portfolio-quote">{CLIENT_ABOUT.quote}</blockquote>
          </div>
        </section>

        <section className="section sale-pillars">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Usługi</p>
            <h2 className="section-title">Co mogę dla Ciebie zrobić?</h2>
            <p className="section-copy">{CLIENT_ABOUT.ctaHeadline}</p>
            <div className="sale-pillars-grid">
              {CLIENT_SERVICES.map((item, idx) => (
                <article key={item.title} className="sale-pillar-card">
                  <p className="about-idx-text">{String(idx + 1).padStart(2, "0")}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-method">
          <div className="container about-method-shell">
            <p className="eyebrow">Autorska metoda</p>
            <h2 className="section-title">Moja autorska metoda</h2>
            <ol className="about-method-list">
              {CLIENT_METHOD_STEPS.map((item) => (
                <li key={item.step} className="about-method-step">
                  <p className="about-idx-text">{item.step}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
            <blockquote className="about-portfolio-quote about-portfolio-quote--closing">
              {CLIENT_ABOUT.methodClosing}
            </blockquote>
            <p className="section-copy about-method-cta">Zapraszam do współpracy.</p>
            <div className="sale-cta-actions about-method-links">
              <CtaClickLink href={ROUTE_PATHS.sprzedaz} className="prefooter-btn" ctaLocation="about_portfolio" ctaLabel="Sprzedaż">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Sprzedaż</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Sprzedaż</span>
                </span>
                <span className="sr-only">Sprzedaż</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
              <CtaClickLink href={ROUTE_PATHS.inwestycje} className="prefooter-btn" ctaLocation="about_portfolio" ctaLabel="Inwestycje">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Inwestycje</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Inwestycje</span>
                </span>
                <span className="sr-only">Inwestycje</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
              <CtaClickLink href={ROUTE_PATHS.kontakt} className="prefooter-btn" ctaLocation="about_portfolio" ctaLabel="Kontakt">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Kontakt</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Kontakt</span>
                </span>
                <span className="sr-only">Kontakt</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </CtaClickLink>
            </div>
          </div>
        </section>
      </main>

      <div className="footer-stack">
        <Prefooter
          tall
          kicker={`${CLIENT_PROFILE.fullName} · ${CLIENT_PROFILE.shortBusinessName}`}
          title="Szukasz partnera, nie tylko pośrednika? Porozmawiajmy."
          copy="Umów bezpłatną konsultację — wspólnie dobierzemy strategię: sprzedaż, przygotowanie nieruchomości lub inwestycja."
          buttons={[
            { href: `${ROUTE_PATHS.kontakt}#kontakt`, label: "Umów konsultację" },
            { href: ROUTE_PATHS.sprzedaz, label: "Ścieżka sprzedaży" },
          ]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
