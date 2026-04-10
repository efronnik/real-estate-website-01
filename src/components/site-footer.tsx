"use client";

import { usePathname } from "next/navigation";
import { ROUTE_PATHS, getFooterLinks } from "@/config/navigation";

type SiteFooterProps = {
  year: number;
};

export function SiteFooter({ year }: SiteFooterProps) {
  const pathname = usePathname();
  const visibleFooterLinks = getFooterLinks(pathname);

  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-brand">
          <a href={ROUTE_PATHS.home} className="footer-logo" aria-label="FIND home">
            <img src="/LOGO.png" alt="FIND" />
          </a>
          <p className="footer-copy">
            Eksperckie wsparcie właściciela mieszkania: od strategii ceny po bezpieczny podpis.
          </p>
        </div>

        <div className="footer-links">
          {visibleFooterLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="footer-social">
          <a href="#" aria-label="Instagram">
            <span className="social-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect>
                <circle cx="12" cy="12" r="4.1"></circle>
                <circle cx="17.35" cy="6.65" r="1"></circle>
              </svg>
            </span>
            Instagram
          </a>
          <a href="#" aria-label="Facebook">
            <span className="social-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14.2 8.1h2.2V4.5h-2.6c-3 0-4.6 1.8-4.6 4.9v2H6.8v3.7h2.4V20h3.8v-4.9h2.9l.5-3.7h-3.4V9.8c0-1 .4-1.7 1.6-1.7Z"></path>
              </svg>
            </span>
            Facebook
          </a>
          <a href="#" aria-label="LinkedIn">
            <span className="social-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="4" y="9.2" width="3.4" height="10.8"></rect>
                <circle cx="5.7" cy="5.8" r="1.6"></circle>
                <path d="M10 9.2h3.3v1.5c.6-1 1.8-1.8 3.6-1.8 3 0 4.1 2 4.1 5.1V20h-3.5v-5.3c0-1.7-.6-2.6-1.9-2.6-1.5 0-2.2 1.1-2.2 2.6V20H10V9.2Z"></path>
              </svg>
            </span>
            LinkedIn
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {year} FIND. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
