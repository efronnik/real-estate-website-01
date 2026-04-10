"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
export default function KontaktPage() {
    const year = new Date().getFullYear();
    return (_jsxs(_Fragment, { children: [_jsxs("main", { className: "kontakt-page", children: [_jsx(SiteTopbar, {}), _jsxs("section", { className: "section kontakt-hero", children: [_jsx("video", { className: "kontakt-hero-video", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", "aria-hidden": "true", children: _jsx("source", { src: "/Hero-Kontakt.mp4", type: "video/mp4" }) }), _jsx("div", { className: "kontakt-hero-overlay", "aria-hidden": "true" }), _jsxs("div", { className: "container kontakt-hero-shell", children: [_jsx("p", { className: "eyebrow", children: "Kontakt" }), _jsx("h1", { className: "section-title", children: "Porozmawiajmy o sprzeda\u017Cy Twojej nieruchomo\u015Bci" }), _jsx("p", { className: "section-copy", children: "Kr\u00F3tka konsultacja wystarczy, \u017Ceby ustali\u0107 kierunek dzia\u0142a\u0144 i bezpieczny plan sprzeda\u017Cy." })] })] }), _jsx(LeadContactSection, { sectionId: "kontakt", sourcePage: "kontakt", eyebrow: "Konsultacja / Wsp\u00F3\u0142praca", title: "Warszawa, Polska", description: "Pracujemy lokalnie, ale prowadzimy proces end-to-end. Dostajesz strategi\u0119, egzekucj\u0119 i bezpieczny final sprzedazy." })] }), _jsxs("div", { className: "footer-stack", children: [_jsx(Prefooter, { kicker: "Koniec przewijania? Zr\u00F3bmy pierwszy krok.", title: "Sprzedaj mieszkanie spokojnie i na dobrych warunkach.", buttons: [
                            { href: "#kontakt", label: "Umów konsultację" },
                            { href: "/sprzedaz", label: "Przejdź do wyceny" },
                        ] }), _jsx(SiteFooter, { year: year })] }), _jsx(ScrollToTopButton, {})] }));
}
