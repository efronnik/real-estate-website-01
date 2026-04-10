"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
const problems = [
    {
        title: "Brak analizy rynku",
        text: "Ustalasz cenę według swoich potrzeb, a nie na podstawie cen transakcyjnych podobnych nieruchomości.",
        metric: "Konsekwencja: za tanio albo za drogo",
        image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400",
    },
    {
        title: "Nieprzygotowane wnętrza",
        text: "Publikujesz ofertę bez przygotowania mieszkania: drobne usterki, przedmioty osobiste i chaos obniżają odbiór.",
        metric: "Konsekwencja: nie przyciągasz uwagi kupujących",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400",
    },
    {
        title: "Zdjęcia słabej jakości",
        text: "Wykonujesz zdjęcia smartfonem zamiast zamówić profesjonalną sesję, która podnosi wartość oferty.",
        metric: "Konsekwencja: mniejsza liczba zapytań",
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1400",
    },
];
const guideSignals = [
    {
        title: "Zła wycena na starcie",
        why: "Cena ustawiona emocjonalnie zamiast na danych obniża jakość zapytań i od razu ustawia rozmowy na obniżkę.",
        action: "Porównaj realne transakcje i konkurencję 1:1. Ustal wariant ceny startowej oraz granice negocjacyjne.",
        image: "https://images.pexels.com/photos/7578919/pexels-photo-7578919.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        title: "Nieprzygotowany stan prawny i dokumenty",
        why: "Braki formalne wydłużają decyzję kupującego i osłabiają zaufanie w kluczowym momencie procesu.",
        action: "Przygotuj komplet dokumentów przed publikacją i usuń ryzyka formalne przed pierwszymi prezentacjami.",
        image: "https://images.pexels.com/photos/8293777/pexels-photo-8293777.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        title: "Słaba prezentacja oferty",
        why: "Przypadkowe zdjęcia i ogólny opis sprawiają, że oferta przegrywa już na etapie pierwszego kontaktu.",
        action: "Zadbaj o porządek, światło i profesjonalne kadry. Opis oprzyj na konkretnych przewagach nieruchomości.",
        image: "https://images.pexels.com/photos/7031590/pexels-photo-7031590.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        title: "Negocjacje prowadzone pod presją",
        why: "Brak scenariusza rozmów i zbyt szybkie ustępstwa prowadzą do finalnej ceny niższej od potencjału.",
        action: "Ustal warunki brzegowe, argumenty obrony ceny i plan rozmowy przed kontaktem z kupującym.",
        image: "https://images.pexels.com/photos/7414284/pexels-photo-7414284.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
];
const checklistItems = [
    "Strategia ceny oparta o dane z rynku lokalnego",
    "Zweryfikowany stan prawny i komplet dokumentów",
    "Przygotowanie mieszkania do prezentacji i sesji zdjęciowej",
    "Opis oferty z konkretami: układ, standard, otoczenie, atuty",
    "Plan negocjacji i scenariusze odpowiedzi na obniżki",
    "Wstępna weryfikacja skutków podatkowych transakcji",
];
const checklistImages = [
    "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/8292799/pexels-photo-8292799.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/7415036/pexels-photo-7415036.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/7821510/pexels-photo-7821510.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/7578903/pexels-photo-7578903.jpeg?auto=compress&cs=tinysrgb&w=1800",
];
const checklistCards = checklistItems.map((text, idx) => ({
    title: text,
    text: "Element checklisty przed publikacją ogłoszenia.",
    metric: "Checklista wdrożenia",
    image: checklistImages[idx % checklistImages.length],
}));
export default function BledyPage() {
    var _a;
    const year = new Date().getFullYear();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [activeGuideIndex, setActiveGuideIndex] = useState(0);
    const [currentChecklistSlide, setCurrentChecklistSlide] = useState(0);
    const [isChecklistPaused, setIsChecklistPaused] = useState(false);
    const guideCardRefs = useRef([]);
    const rel = (idx, current, len) => {
        let diff = (idx - current + len) % len;
        if (diff > len / 2)
            diff -= len;
        return diff;
    };
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isPaused)
                setCurrentSlide((s) => (s + 1) % problems.length);
            if (!isChecklistPaused)
                setCurrentChecklistSlide((s) => (s + 1) % checklistCards.length);
        }, 5200);
        return () => clearInterval(timer);
    }, [isPaused, isChecklistPaused]);
    useEffect(() => {
        const update = () => {
            const center = window.innerHeight * 0.45;
            let closest = 0;
            let min = Number.POSITIVE_INFINITY;
            guideCardRefs.current.forEach((el, idx) => {
                if (!el)
                    return;
                const rect = el.getBoundingClientRect();
                const dist = Math.abs(rect.top + rect.height * 0.5 - center);
                if (dist < min) {
                    min = dist;
                    closest = idx;
                }
            });
            setActiveGuideIndex(closest);
        };
        let raf = 0;
        const onScroll = () => {
            if (raf)
                return;
            raf = window.requestAnimationFrame(() => {
                update();
                raf = 0;
            });
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            if (raf)
                window.cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("main", { children: [_jsx(SiteTopbar, {}), _jsxs("section", { className: "section mistakes-hero", children: [_jsx("video", { className: "mistakes-hero-video", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", "aria-hidden": "true", children: _jsx("source", { src: "/Hero-Fail.mp4", type: "video/mp4" }) }), _jsx("div", { className: "mistakes-hero-overlay", "aria-hidden": "true" }), _jsxs("div", { className: "container mistakes-hero-shell", children: [_jsx("p", { className: "eyebrow", children: "B\u0142\u0119dy" }), _jsx("h1", { className: "section-title", children: "B\u0142\u0119dy przy sprzeda\u017Cy nieruchomo\u015Bci" }), _jsx("p", { className: "section-copy", children: "Zebrane w jednym miejscu: najcz\u0119stsze potkni\u0119cia, kt\u00F3re obni\u017Caj\u0105 cen\u0119 lub wyd\u0142u\u017Caj\u0105 proces sprzeda\u017Cy." })] })] }), _jsx("section", { id: "bledy", className: "section problems", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "lead", children: [_jsx("p", { className: "eyebrow no-sweep", children: "Najdro\u017Csze pomy\u0142ki przy sprzeda\u017Cy" }), _jsx("h2", { className: "section-title sweep-reveal", children: "Kosztowne b\u0142\u0119dy w procesie sprzeda\u017Cy mieszkania" }), _jsx("p", { className: "section-copy sweep-reveal", children: "W premium segmencie nie przegrywa ten, kto ma s\u0142absz\u0105 nieruchomo\u015B\u0107. Przegrywa ten, kto oddaje narracj\u0119 i kontrol\u0119 procesu." })] }), _jsxs("div", { className: "stage", onMouseEnter: () => setIsPaused(true), onMouseLeave: () => setIsPaused(false), children: [_jsx("div", { className: "stage-head", children: _jsx("p", { className: "no-sweep", children: "Najbardziej kosztowne punkty procesu" }) }), _jsx("div", { className: "carousel", children: problems.map((item, idx) => {
                                                const r = rel(idx, currentSlide, problems.length);
                                                return (_jsx("article", { className: `panel ${r === 0 ? "center" : ""} ${r === -1 ? "left" : ""} ${r === 1 ? "right" : ""} ${Math.abs(r) > 1 ? "hidden" : ""}`, style: { ["--bg"]: `url(${item.image})` }, onClick: () => setCurrentSlide(idx), children: _jsxs("div", { className: "panel-overlay", children: [_jsx("p", { className: "kicker", children: String(idx + 1).padStart(2, "0") }), _jsx("h3", { children: item.title }), _jsx("p", { children: item.text }), _jsx("div", { className: "metric", children: item.metric })] }) }, item.title));
                                            }) }), _jsx("div", { className: "dots", role: "tablist", "aria-label": "Nawigacja slajd\u00F3w", children: problems.map((item, idx) => (_jsx("button", { className: `dot ${idx === currentSlide ? "active" : ""}`, "aria-label": `Przejdź do slajdu ${idx + 1}`, onClick: () => setCurrentSlide(idx), children: _jsx("span", { className: "dot-core" }) }, `dot-${item.title}`))) })] })] }) }), _jsx("section", { className: "section mistakes-extended", children: _jsxs("div", { className: "container", children: [_jsxs("header", { className: "mistakes-head", children: [_jsx("p", { className: "eyebrow", children: "Praktyczny przewodnik" }), _jsx("h2", { className: "section-title", children: "Najcz\u0119stsze b\u0142\u0119dy przy sprzeda\u017Cy mieszkania i jak ich unikn\u0105\u0107" }), _jsx("p", { className: "section-copy", children: "Poni\u017Cej znajdziesz rozwini\u0119cie najwa\u017Cniejszych obszar\u00F3w, kt\u00F3re najcz\u0119\u015Bciej wyd\u0142u\u017Caj\u0105 sprzeda\u017C lub obni\u017Caj\u0105 cen\u0119 transakcyjn\u0105." })] }), _jsxs("div", { className: "signals-layout", children: [_jsxs("aside", { className: "signals-copy", children: [_jsxs("div", { className: "signals-progress", children: [activeGuideIndex + 1, " / ", guideSignals.length] }), _jsx("p", { className: "signals-lead", children: (_a = guideSignals[activeGuideIndex]) === null || _a === void 0 ? void 0 : _a.title })] }), _jsx("div", { className: "signals-visuals", children: guideSignals.map((signal, idx) => (_jsxs("article", { ref: (el) => { guideCardRefs.current[idx] = el; }, className: `signal-card ${idx === activeGuideIndex ? "active" : ""}`, style: { ["--bg"]: `url(${signal.image})` }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Dlaczego to wa\u017Cne:" }), " ", signal.why] }), _jsxs("p", { children: [_jsx("strong", { children: "Co zrobi\u0107:" }), " ", signal.action] })] }, signal.title))) })] }), _jsxs("div", { className: "checklist-stage", children: [_jsx("div", { className: "checklist-head", children: _jsx("h3", { children: "Checklista przed publikacj\u0105 og\u0142oszenia" }) }), _jsx("div", { className: "checklist-carousel", onMouseEnter: () => setIsChecklistPaused(true), onMouseLeave: () => setIsChecklistPaused(false), children: checklistCards.map((item, idx) => {
                                                const r = rel(idx, currentChecklistSlide, checklistCards.length);
                                                return (_jsx("article", { className: `checklist-panel ${r === 0 ? "center" : ""} ${r === -1 ? "left" : ""} ${r === 1 ? "right" : ""} ${Math.abs(r) > 1 ? "hidden" : ""}`, style: { ["--bg"]: `url(${item.image})` }, onClick: () => setCurrentChecklistSlide(idx), children: _jsxs("div", { className: "checklist-panel-overlay", children: [_jsx("p", { className: "checklist-kicker", children: String(idx + 1).padStart(2, "0") }), _jsx("h3", { children: item.title }), _jsx("p", { children: item.text }), _jsx("div", { className: "checklist-metric", children: item.metric })] }) }, item.title));
                                            }) }), _jsx("div", { className: "checklist-dots", role: "tablist", "aria-label": "Nawigacja checklisty", children: checklistCards.map((item, idx) => (_jsx("button", { className: `checklist-dot ${idx === currentChecklistSlide ? "active" : ""}`, onClick: () => setCurrentChecklistSlide(idx) }, `checklist-dot-${item.title}`))) })] }), _jsx("div", { className: "mistakes-note", children: _jsxs("p", { children: [_jsx("strong", { children: "Uwaga podatkowa:" }), " przy sprzeda\u017Cy przed up\u0142ywem 5 lat (licz\u0105c od ko\u0144ca roku nabycia) mo\u017Ce wyst\u0105pi\u0107 obowi\u0105zek rozliczenia PIT od dochodu. W praktyce warto to zweryfikowa\u0107 przed wystawieniem nieruchomo\u015Bci, aby unikn\u0105\u0107 kosztownych decyzji na finiszu."] }) })] }) })] }), _jsxs("div", { className: "footer-stack", children: [_jsx(Prefooter, { kicker: "Koniec przewijania? Zr\u00F3bmy pierwszy krok.", title: "Sprzedaj mieszkanie spokojnie i na dobrych warunkach.", buttons: [{ href: "/kontakt", label: "Umów konsultację" }] }), _jsx(SiteFooter, { year: year })] }), _jsx(ScrollToTopButton, {})] }));
}
