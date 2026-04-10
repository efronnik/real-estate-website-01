"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { ROUTE_PATHS } from "@/config/navigation";
const valueSteps = [
    {
        title: "Lepsza cena sprzedaży",
        desc: "Lepsze pozycjonowanie oferty i spokojne negocjacje, które pomagają utrzymać mocną cenę.",
        image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        title: "Krótszy czas na rynku",
        desc: "Precyzyjna selekcja zapytań i mocna prezentacja nieruchomości.",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        title: "Spokój i kontrola procesu",
        desc: "Jasne etapy współpracy i domknięcie formalności bez chaosu.",
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        title: "Finalizacja z wynikiem",
        desc: "Negocjacje prowadzone tak, by bronić ceny i interesu właściciela.",
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
];
const processSteps = [
    { label: "01", title: "Diagnoza i pozycjonowanie", text: "Szybka diagnoza sytuacji mieszkania i rynku. Ustalamy plan, który daje realną przewagę właścicielowi.", hero: "Diagnoza", image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80" },
    { label: "02", title: "Przygotowanie i publikacja", text: "Materiały premium i narracja, która pokazuje wartość mieszkania oraz prowadzi klienta do decyzji.", hero: "Ekspozycja", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" },
    { label: "03", title: "Pokazy i negocjacje", text: "Prowadzę rozmowy i zarządzam dynamiką tak, aby bronić ceny i domykać transakcje.", hero: "Negocjacje", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80" },
    { label: "04", title: "Final i przekazanie", text: "Domykamy formalności, terminy i podpis. Bez chaosu i bez ryzyka utraty kontroli.", hero: "Finalizacja", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80" },
];
const results = [
    { title: "Sprzedaż po 2 miesiącach ciszy", desc: "Problem: oferta bez zapytań. Działanie: nowa strategia wejścia i materiały premium. Efekt: finalizacja w 3 tygodnie.", image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800" },
    { title: "Negocjacje bez dużej obniżki", desc: "Problem: presja kupujących na szybkie zejście z ceny. Działanie: scenariusz rozmów i jasne punkty obrony ceny.", image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1800" },
    { title: "Więcej jakościowych zapytań", desc: "Problem: słaba prezentacja mieszkania. Działanie: profesjonalna sesja i dopracowany opis oferty.", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800" },
];
const reviews = [
    { quote: "W końcu mieliśmy plan. Sprzedaż przestała być chaosem i domknęła się szybciej, niż zakładaliśmy.", author: "Daniela A." },
    { quote: "Największa różnica? Spokój i konkretne decyzje na każdym etapie. Czuć, że proces jest pod kontrolą.", author: "Tina H." },
    { quote: "Profesjonalna prezentacja i bardzo dobrze poprowadzone negocjacje. Finalna cena była wyższa niż zakładałam.", author: "Sandra D." },
];
export default function Home() {
    var _a, _b, _c, _d;
    const year = new Date().getFullYear();
    const [heroReady, setHeroReady] = useState(false);
    const [activeValue, setActiveValue] = useState(0);
    const [activeResult, setActiveResult] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(1);
    const valueRefs = useRef([]);
    const resultRefs = useRef([]);
    useEffect(() => {
        const id = window.requestAnimationFrame(() => setHeroReady(true));
        return () => window.cancelAnimationFrame(id);
    }, []);
    useEffect(() => {
        const updateByCenter = (refs, setter) => {
            const viewportCenter = window.innerHeight * 0.45;
            let next = 0;
            let minDistance = Number.POSITIVE_INFINITY;
            refs.forEach((el, idx) => {
                if (!el)
                    return;
                const rect = el.getBoundingClientRect();
                const center = rect.top + rect.height * 0.5;
                const distance = Math.abs(center - viewportCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    next = idx;
                }
            });
            setter(next);
        };
        let rafId = 0;
        const onScroll = () => {
            if (rafId)
                return;
            rafId = window.requestAnimationFrame(() => {
                updateByCenter(valueRefs.current, setActiveValue);
                updateByCenter(resultRefs.current, setActiveResult);
                rafId = 0;
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            if (rafId)
                window.cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);
    const reviewAt = (offset) => {
        const len = reviews.length;
        return reviews[(reviewIndex + offset + len) % len];
    };
    return (_jsxs(_Fragment, { children: [_jsxs("main", { children: [_jsxs("section", { className: "cp-hero", children: [_jsx(SiteTopbar, { variant: "cp", ctaHref: "#kontakt", ctaLabel: "Um\u00F3w rozmow\u0119" }), _jsx("video", { className: "cp-video-bg", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", "aria-hidden": "true", children: _jsx("source", { src: "/Hero-Warszaw.mp4", type: "video/mp4" }) }), _jsx("div", { className: "cp-video-overlay", "aria-hidden": "true" }), _jsxs("div", { className: "cp-content", children: [_jsxs("h1", { className: `hero-title ${heroReady ? "ready" : ""}`, children: [_jsx("span", { className: "hero-word-mask", children: _jsx("span", { className: "hero-word", children: "Sprzedaj" }) }), _jsx("span", { className: "hero-word-mask", children: _jsx("span", { className: "hero-word", children: "mieszkanie" }) })] }), _jsx("p", { className: `hero-subtitle ${heroReady ? "ready" : ""}`, children: "Poka\u017C\u0119 b\u0142\u0119dy i dam jasny plan sprzeda\u017Cy." }), _jsxs("div", { className: `hero-cta-row ${heroReady ? "ready" : ""}`, children: [_jsxs("a", { href: ROUTE_PATHS.sprzedaz, className: "cp-btn hero-cta hero-cta-primary", children: [_jsxs("span", { className: "prefooter-btn-text-wrap", "aria-hidden": "true", children: [_jsx("span", { className: "prefooter-btn-text prefooter-btn-text-top", children: "Sprzedaj" }), _jsx("span", { className: "prefooter-btn-text prefooter-btn-text-bottom", children: "Sprzedaj" })] }), _jsx("span", { className: "sr-only", children: "Sprzedaj" }), _jsx("span", { className: "prefooter-btn-arrow", "aria-hidden": "true", children: "\u2192" })] }), _jsxs("a", { href: ROUTE_PATHS.inwestycje, className: "cp-btn hero-cta hero-cta-secondary", children: [_jsxs("span", { className: "prefooter-btn-text-wrap", "aria-hidden": "true", children: [_jsx("span", { className: "prefooter-btn-text prefooter-btn-text-top", children: "Inwestuj" }), _jsx("span", { className: "prefooter-btn-text prefooter-btn-text-bottom", children: "Inwestuj" })] }), _jsx("span", { className: "sr-only", children: "Inwestuj" }), _jsx("span", { className: "prefooter-btn-arrow", "aria-hidden": "true", children: "\u2192" })] })] })] })] }), _jsx("section", { className: "section value", children: _jsxs("div", { className: "container value-layout", children: [_jsxs("aside", { className: "value-copy", children: [_jsx("p", { className: "eyebrow", children: "Co zyskujesz" }), _jsx("h2", { className: "value-title", children: "Kluczowe korzy\u015Bci wsp\u00F3\u0142pracy" }), _jsxs("div", { className: "value-progress", children: [activeValue + 1, " / ", valueSteps.length] }), _jsx("p", { className: "value-lead", children: (_a = valueSteps[activeValue]) === null || _a === void 0 ? void 0 : _a.title }), _jsx("p", { className: "value-desc", children: (_b = valueSteps[activeValue]) === null || _b === void 0 ? void 0 : _b.desc })] }), _jsx("div", { className: "value-visuals", children: valueSteps.map((step, idx) => (_jsx("article", { ref: (el) => { valueRefs.current[idx] = el; }, className: `visual-card ${idx === activeValue ? "active" : ""}`, children: _jsx("img", { src: step.image, alt: step.title }) }, step.title))) })] }) }), _jsxs("section", { className: "section process", children: [_jsx("div", { className: "container", children: _jsxs("header", { className: "process-head", children: [_jsx("p", { className: "eyebrow", children: "Proces pracy" }), _jsx("h2", { className: "section-title", children: "Jak prowadzimy sprzeda\u017C od strategii do podpisu" })] }) }), _jsx("div", { className: "service-board", children: processSteps.map((step) => (_jsxs("article", { className: "service-row", style: { ["--bg"]: `url(${step.image})` }, children: [_jsxs("div", { className: "service-info", children: [_jsx("p", { className: "idx", children: _jsx("span", { className: "idx-text", children: step.label }) }), _jsx("h3", { children: step.title }), _jsx("p", { children: step.text })] }), _jsx("div", { className: "service-word", children: _jsx("span", { children: step.hero }) })] }, step.title))) })] }), _jsx("section", { className: "section results", children: _jsxs("div", { className: "container results-layout", children: [_jsx("div", { className: "results-visuals", children: results.map((item, idx) => (_jsx("article", { ref: (el) => { resultRefs.current[idx] = el; }, className: `result-card ${idx === activeResult ? "active" : ""}`, children: _jsx("img", { src: item.image, alt: item.title }) }, item.title))) }), _jsxs("aside", { className: "results-copy", children: [_jsx("p", { className: "eyebrow", children: "Rezultaty" }), _jsx("h2", { className: "results-title", children: "Przyk\u0142ady efekt\u00F3w wsp\u00F3\u0142pracy" }), _jsxs("div", { className: "results-progress", children: [activeResult + 1, " / ", results.length] }), _jsx("p", { className: "results-lead", children: (_c = results[activeResult]) === null || _c === void 0 ? void 0 : _c.title }), _jsx("p", { className: "results-desc", children: (_d = results[activeResult]) === null || _d === void 0 ? void 0 : _d.desc })] })] }) }), _jsx("section", { className: "section trust", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "trust-shell", children: [_jsxs("div", { className: "trust-head", children: [_jsx("p", { className: "eyebrow", children: "Dlaczego klienci ufaj\u0105" }), _jsx("h2", { className: "section-title", children: "Dowody, nie obietnice" })] }), _jsxs("div", { className: "trust-stats", children: [_jsxs("article", { className: "stat", children: [_jsx("strong", { children: "100+" }), _jsx("p", { children: "przeprowadzonych proces\u00F3w sprzeda\u017Cy" })] }), _jsxs("article", { className: "stat", children: [_jsx("strong", { children: "4.9/5" }), _jsx("p", { children: "\u015Brednia ocena wsp\u00F3\u0142pracy klient\u00F3w" })] }), _jsxs("article", { className: "stat", children: [_jsx("strong", { children: "1:1" }), _jsx("p", { children: "opiekun prowadz\u0105cy od diagnozy do fina\u0142u" })] })] }), _jsxs("div", { className: "trust-slider", children: [_jsxs("div", { className: "slider-head", children: [_jsx("h3", { children: "Opinie klient\u00F3w" }), _jsxs("div", { className: "controls", children: [_jsx("button", { onClick: () => setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length), children: "\u2190" }), _jsx("button", { onClick: () => setReviewIndex((prev) => (prev + 1) % reviews.length), children: "\u2192" })] })] }), _jsxs("div", { className: "track", children: [_jsxs("article", { className: "quote-card side", children: [_jsx("p", { className: "stars", children: "\u2605\u2605\u2605\u2605\u2605" }), _jsx("blockquote", { children: reviewAt(-1).quote }), _jsxs("footer", { children: [_jsx("strong", { children: reviewAt(-1).author }), _jsx("span", { children: "Zweryfikowana opinia" })] })] }), _jsxs("article", { className: "quote-card center", children: [_jsx("p", { className: "stars", children: "\u2605\u2605\u2605\u2605\u2605" }), _jsx("blockquote", { children: reviewAt(0).quote }), _jsxs("footer", { children: [_jsx("strong", { children: reviewAt(0).author }), _jsx("span", { children: "Zweryfikowana opinia" })] })] }), _jsxs("article", { className: "quote-card side", children: [_jsx("p", { className: "stars", children: "\u2605\u2605\u2605\u2605\u2605" }), _jsx("blockquote", { children: reviewAt(1).quote }), _jsxs("footer", { children: [_jsx("strong", { children: reviewAt(1).author }), _jsx("span", { children: "Zweryfikowana opinia" })] })] })] })] })] }) }) }), _jsx(LeadContactSection, { sectionId: "kontakt", sourcePage: "glowna", eyebrow: "Konsultacja / Wsp\u00F3\u0142praca", title: "Warszawa, Polska", description: "Pracujemy lokalnie, ale prowadzimy proces end-to-end. Dostajesz strategie, egzekucje i bezpieczny final sprzedazy." })] }), _jsxs("div", { className: "footer-stack", children: [_jsx(Prefooter, { kicker: "Koniec przewijania? Zr\u00F3bmy pierwszy krok.", title: "Sprzedaj mieszkanie spokojnie i na dobrych warunkach.", buttons: [{ href: "#kontakt", label: "Umów konsultację" }] }), _jsx(SiteFooter, { year: year })] }), _jsx(ScrollToTopButton, {})] }));
}
