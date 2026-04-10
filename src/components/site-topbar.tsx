"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTE_PATHS, getTopbarLinks } from "@/config/navigation";

type SiteTopbarProps = {
  variant?: "site" | "cp";
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteTopbar({
  variant = "site",
  ctaHref = ROUTE_PATHS.kontakt,
  ctaLabel = "Umów rozmowę",
}: SiteTopbarProps) {
  const CLOSE_ANIMATION_MS = 240;
  const isCp = variant === "cp";
  const topbarLinks = getTopbarLinks();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const menuId = useId();

  useEffect(() => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMenuOpen(false);
    setMenuVisible(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuVisible) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuVisible]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMenuVisible(true);
    window.requestAnimationFrame(() => setMenuOpen(true));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setMenuVisible(false);
      closeTimeoutRef.current = null;
    }, CLOSE_ANIMATION_MS);
  };

  const toggleMenu = () => {
    if (menuOpen || menuVisible) {
      closeMenu();
      return;
    }
    openMenu();
  };

  return (
    <header className={`${isCp ? "cp-topbar" : "site-topbar"} ${menuOpen ? "topbar--menu-open" : ""}`}>
      <a
        href={ROUTE_PATHS.home}
        className={isCp ? "cp-brand" : "site-brand"}
        aria-label="FIND home"
        onClick={closeMenu}
      >
        <img src="/LOGO.png" alt="FIND" />
      </a>

      <nav className={isCp ? "cp-nav" : "site-nav"} aria-label="Primary navigation">
        {topbarLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      {ctaHref ? (
        <a href={ctaHref} className="cp-sign">
          <span className="prefooter-btn-text-wrap" aria-hidden="true">
            <span className="prefooter-btn-text prefooter-btn-text-top">{ctaLabel}</span>
            <span className="prefooter-btn-text prefooter-btn-text-bottom">{ctaLabel}</span>
          </span>
          <span className="sr-only">{ctaLabel}</span>
        </a>
      ) : (
        <div className="site-spacer" aria-hidden="true"></div>
      )}

      <button
        type="button"
        className="topbar-burger"
        aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={toggleMenu}
      >
        <span className="topbar-burger-line" aria-hidden="true"></span>
        <span className="topbar-burger-line" aria-hidden="true"></span>
        <span className="topbar-burger-line" aria-hidden="true"></span>
      </button>

      {menuVisible ? (
        <div className={`topbar-mobile-overlay ${menuOpen ? "is-open" : ""}`} onClick={closeMenu}>
          <nav
            id={menuId}
            className={`topbar-mobile-menu ${menuOpen ? "is-open" : ""}`}
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="topbar-mobile-close" aria-label="Zamknij menu" onClick={closeMenu}>
              <span aria-hidden="true">×</span>
            </button>
            {topbarLinks.map((link) => (
              <a key={`mobile-${link.href}`} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            {ctaHref ? (
              <a href={ctaHref} className="topbar-mobile-cta" onClick={closeMenu}>
                {ctaLabel}
              </a>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
