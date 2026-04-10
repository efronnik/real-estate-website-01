"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTE_PATHS, getTopbarLinks } from "@/config/navigation";
export function SiteTopbar({ variant = "site", ctaHref = ROUTE_PATHS.kontakt, ctaLabel = "Umów rozmowę", }) {
    const CLOSE_ANIMATION_MS = 240;
    const isCp = variant === "cp";
    const topbarLinks = getTopbarLinks();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const closeTimeoutRef = useRef(null);
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
        if (!menuVisible)
            return;
        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event) => {
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
    return (_jsxs("header", { className: `${isCp ? "cp-topbar" : "site-topbar"} ${menuOpen ? "topbar--menu-open" : ""}`, children: [_jsx("a", { href: ROUTE_PATHS.home, className: isCp ? "cp-brand" : "site-brand", "aria-label": "FIND home", onClick: closeMenu, children: _jsx("img", { src: "/LOGO.png", alt: "FIND" }) }), _jsx("nav", { className: isCp ? "cp-nav" : "site-nav", "aria-label": "Primary navigation", children: topbarLinks.map((link) => (_jsx("a", { href: link.href, children: link.label }, link.href))) }), ctaHref ? (_jsxs("a", { href: ctaHref, className: "cp-sign", children: [_jsxs("span", { className: "prefooter-btn-text-wrap", "aria-hidden": "true", children: [_jsx("span", { className: "prefooter-btn-text prefooter-btn-text-top", children: ctaLabel }), _jsx("span", { className: "prefooter-btn-text prefooter-btn-text-bottom", children: ctaLabel })] }), _jsx("span", { className: "sr-only", children: ctaLabel })] })) : (_jsx("div", { className: "site-spacer", "aria-hidden": "true" })), _jsxs("button", { type: "button", className: "topbar-burger", "aria-label": menuOpen ? "Zamknij menu" : "Otwórz menu", "aria-expanded": menuOpen, "aria-controls": menuId, onClick: toggleMenu, children: [_jsx("span", { className: "topbar-burger-line", "aria-hidden": "true" }), _jsx("span", { className: "topbar-burger-line", "aria-hidden": "true" }), _jsx("span", { className: "topbar-burger-line", "aria-hidden": "true" })] }), menuVisible ? (_jsx("div", { className: `topbar-mobile-overlay ${menuOpen ? "is-open" : ""}`, onClick: closeMenu, children: _jsxs("nav", { id: menuId, className: `topbar-mobile-menu ${menuOpen ? "is-open" : ""}`, "aria-label": "Mobile navigation", onClick: (event) => event.stopPropagation(), children: [_jsx("button", { type: "button", className: "topbar-mobile-close", "aria-label": "Zamknij menu", onClick: closeMenu, children: _jsx("span", { "aria-hidden": "true", children: "\u00D7" }) }), topbarLinks.map((link) => (_jsx("a", { href: link.href, onClick: closeMenu, children: link.label }, `mobile-${link.href}`))), ctaHref ? (_jsx("a", { href: ctaHref, className: "topbar-mobile-cta", onClick: closeMenu, children: ctaLabel })) : null] }) })) : null] }));
}
