"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTE_PATHS, getTopbarNavItems } from "@/config/navigation";
import { CtaClickLink } from "@/components/cta-click-link";
import { SiteTopbarNav } from "@/components/site-topbar-nav";

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
  const topbarNavItems = getTopbarNavItems();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const burgerButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setMenuVisible(false);
      closeTimeoutRef.current = null;
    }, CLOSE_ANIMATION_MS);
  }, []);

  const openMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMenuVisible(true);
    window.requestAnimationFrame(() => setMenuOpen(true));
  }, []);

  const toggleMenu = useCallback(() => {
    if (menuOpen || menuVisible) {
      closeMenu();
      return;
    }
    openMenu();
  }, [menuOpen, menuVisible, closeMenu, openMenu]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- reset mobile menu on client navigation */
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMenuOpen(false);
    setMenuVisible(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  useEffect(() => {
    if (!menuVisible) return;

    const previousOverflow = document.body.style.overflow;
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !mobileMenuRef.current) return;
      const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        burgerButtonRef.current?.focus();
        return;
      }
      trapFocus(event);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuVisible, closeMenu]);

  useEffect(() => {
    if (!menuVisible && !menuOpen) {
      burgerButtonRef.current?.focus();
    }
  }, [menuVisible, menuOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className={`${isCp ? "cp-topbar" : "site-topbar"} ${menuOpen ? "topbar--menu-open" : ""}`}>
      <a
        href={ROUTE_PATHS.home}
        className={isCp ? "cp-brand" : "site-brand"}
        aria-label="FIND home"
        onClick={closeMenu}
      >
        <Image src="/LOGO.png" alt="FIND" width={256} height={74} className="block h-auto w-full" priority />
      </a>

      <nav className={isCp ? "cp-nav" : "site-nav"} aria-label="Primary navigation">
        <SiteTopbarNav items={topbarNavItems} pathname={pathname} variant="desktop" />
      </nav>

      {ctaHref ? (
        <CtaClickLink href={ctaHref} className="cp-sign" ctaLocation="topbar_desktop" ctaLabel={ctaLabel}>
          <span className="prefooter-btn-text-wrap" aria-hidden="true">
            <span className="prefooter-btn-text prefooter-btn-text-top">{ctaLabel}</span>
            <span className="prefooter-btn-text prefooter-btn-text-bottom">{ctaLabel}</span>
          </span>
          <span className="sr-only">{ctaLabel}</span>
        </CtaClickLink>
      ) : (
        <div className="site-spacer" aria-hidden="true"></div>
      )}

      <button
        type="button"
        className="topbar-burger"
        ref={burgerButtonRef}
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
            ref={mobileMenuRef}
            className={`topbar-mobile-menu ${menuOpen ? "is-open" : ""}`}
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              ref={closeButtonRef}
              className="topbar-mobile-close"
              aria-label="Zamknij menu"
              onClick={closeMenu}
            >
              <span aria-hidden="true">×</span>
            </button>
            <SiteTopbarNav
              items={topbarNavItems}
              pathname={pathname}
              variant="mobile"
              onNavigate={closeMenu}
            />
            {ctaHref ? (
              <CtaClickLink
                href={ctaHref}
                className="topbar-mobile-cta"
                ctaLocation="topbar_mobile"
                ctaLabel={ctaLabel}
                onClick={closeMenu}
              >
                {ctaLabel}
              </CtaClickLink>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
