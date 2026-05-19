"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  isRouteActive,
  isUslugiNavActive,
  type NavLink,
  type TopbarNavItem,
} from "@/config/navigation";

type SiteTopbarNavProps = {
  items: TopbarNavItem[];
  pathname: string;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

function NavAnchor({
  href,
  label,
  active,
  onNavigate,
  className,
}: NavLink & { active: boolean; onNavigate?: () => void; className?: string }) {
  return (
    <a
      href={href}
      className={active ? `nav-link-active ${className ?? ""}`.trim() : className}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {label}
    </a>
  );
}

function MobileServicesDropdown({
  label,
  links,
  pathname,
  onNavigate,
}: {
  label: string;
  links: NavLink[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const panelId = useId();
  const active = isUslugiNavActive(pathname);
  const [expanded, setExpanded] = useState(active);

  return (
    <div className={`topbar-mobile-accordion ${expanded ? "is-expanded" : ""} ${active ? "is-active-group" : ""}`}>
      <button
        type="button"
        className="topbar-mobile-accordion-trigger"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
      >
        <span>{label}</span>
        <span className="topbar-mobile-accordion-caret" aria-hidden="true">
          ▾
        </span>
      </button>
      <div id={panelId} className="topbar-mobile-accordion-panel" hidden={!expanded}>
        {links.map((link) => (
          <NavAnchor
            key={link.href}
            {...link}
            active={isRouteActive(pathname, link.href)}
            onNavigate={onNavigate}
            className="topbar-mobile-accordion-link"
          />
        ))}
      </div>
    </div>
  );
}

function DesktopDropdown({
  label,
  links,
  pathname,
}: {
  label: string;
  links: NavLink[];
  pathname: string;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const active = isUslugiNavActive(pathname);

  const openMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 150);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`site-nav-dropdown ${open ? "is-open" : ""} ${active ? "nav-link-active" : ""}`}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocus={openMenu}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          scheduleClose();
        }
      }}
    >
      <button
        type="button"
        className="site-nav-dropdown-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="site-nav-dropdown-label">{label}</span>
        <span className="site-nav-dropdown-caret" aria-hidden="true">
          ▾
        </span>
      </button>
      <div id={panelId} className="site-nav-dropdown-panel" role="menu">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            role="menuitem"
            className={isRouteActive(pathname, link.href) ? "nav-link-active" : undefined}
            aria-current={isRouteActive(pathname, link.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function SiteTopbarNav({ items, pathname, variant = "desktop", onNavigate }: SiteTopbarNavProps) {
  if (variant === "mobile") {
    return (
      <>
        {items.map((item) => {
          if (item.type === "link") {
            return (
              <NavAnchor
                key={item.href}
                {...item}
                active={isRouteActive(pathname, item.href)}
                onNavigate={onNavigate}
              />
            );
          }
          return (
            <MobileServicesDropdown
              key="uslugi-mobile"
              label={item.label}
              links={item.children}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      {items.map((item) => {
        if (item.type === "link") {
          return (
            <NavAnchor key={item.href} {...item} active={isRouteActive(pathname, item.href)} onNavigate={onNavigate} />
          );
        }
        return <DesktopDropdown key="uslugi" label={item.label} links={item.children} pathname={pathname} />;
      })}
    </>
  );
}
