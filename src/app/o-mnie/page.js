"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
const portfolioCases = [
    {
        title: "Mokotów - sprzedaż po rebrandingu oferty",
        text: "Po zmianie pozycjonowania i materiałów premium oferta wróciła na rynek z nową narracją. Finalnie mieszkanie sprzedało się szybciej i bez nerwowych negocjacji.",
        result: "Finalizacja: 27 dni",
        hero: "Rebranding",
        image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1800&q=80",
    },
    {
        title: "Śródmieście - obrona ceny przy dużym ruchu",
        text: "Kluczowe było przejęcie rozmów i selekcja zapytań. Dzięki temu presja na obniżkę została ograniczona, a transakcja zamknięta na warunkach właściciela.",
        result: "Cena końcowa: +6.5% vs. oczekiwania",
        hero: "Negocjacje",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
    },
    {
        title: "Praga Południe - przygotowanie od zera",
        text: "Od audytu mieszkania po finalne dokumenty. Spójny plan pozwolił skrócić czas ekspozycji i poprowadzić cały proces bez chaosu po stronie klienta.",
        result: "Liczba jakościowych zapytań: x2.3",
        hero: "Finalizacja",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80",
    },
];
const valueCards = [
    {
        text: "Strategia zamiast przypadkowych decyzji",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
    },
    {
        text: "Transparentna komunikacja na każdym etapie",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80",
    },
    {
        text: "Estetyka oferty, która realnie wspiera cenę",
        image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        text: "Negocjacje prowadzone spokojnie i zdecydowanie",
        image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1800&q=80",
    },
];
const process = [
    {
        step: "01",
        title: "Diagnoza i pozycjonowanie",
        text: "Analiza mieszkania, konkurencji i profilu kupującego. Ustalamy plan, który ma konkretny cel: sprzedaż na dobrych warunkach.",
        image: "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        step: "02",
        title: "Przygotowanie oferty",
        text: "Home staging, zdjęcia, opis i narracja. Każdy element jest dopasowany do grupy docelowej i oczekiwań rynku.",
        image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        step: "03",
        title: "Prezentacje i negocjacje",
        text: "Prowadzę spotkania i rozmowy tak, aby utrzymać przewagę po stronie właściciela i chronić wartość oferty.",
        image: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        step: "04",
        title: "Domknięcie transakcji",
        text: "Koordynacja formalności, terminy i dokumenty. Finalizacja przebiega spokojnie, jasno i bez niepotrzebnego ryzyka.",
        image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
];
export default function AboutPage() {
    var _a, _b;
    const year = new Date().getFullYear();
    const [activeProcessIndex, setActiveProcessIndex] = useState(0);
    const [activeValueIndex, setActiveValueIndex] = useState(0);
    const processCardRefs = useRef([]);
    const valueCardRefs = useRef([]);
    useEffect(() => {
        const updateByCenter = (refs, setter) => {
            if (!refs.length)
                return;
            const viewportCenter = window.innerHeight * 0.45;
            let closest = 0;
            let minDistance = Number.POSITIVE_INFINITY;
            refs.forEach((el, idx) => {
                if (!el)
                    return;
                const rect = el.getBoundingClientRect();
                const center = rect.top + rect.height * 0.5;
                const distance = Math.abs(center - viewportCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = idx;
                }
            });
            setter(closest);
        };
        let raf = 0;
        const onScroll = () => {
            if (raf)
                return;
            raf = window.requestAnimationFrame(() => {
                updateByCenter(processCardRefs.current, setActiveProcessIndex);
                updateByCenter(valueCardRefs.current, setActiveValueIndex);
                raf = 0;
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            if (raf)
                window.cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("main", { className: "about-page", children: [_jsx(SiteTopbar, {}), _jsx("section", { className: "section about-hero", children: _jsxs("div", { className: "container hero-grid", children: [_jsxs("div", { className: "hero-copy", children: [_jsx("p", { className: "eyebrow", children: "O mnie" }), _jsx("h1", { className: "section-title", children: "Eksperckie prowadzenie sprzeda\u017Cy nieruchomo\u015Bci w modelu premium" }), _jsx("p", { className: "section-copy", children: "Nazywam si\u0119 [Twoje imi\u0119]. Pracuj\u0119 z w\u0142a\u015Bcicielami mieszka\u0144, kt\u00F3rzy chc\u0105 sprzeda\u0107 \u015Bwiadomie: z planem, kontrol\u0105 procesu i wynikiem finansowym, kt\u00F3ry ma uzasadnienie rynkowe." }), _jsx("p", { className: "section-copy", children: "\u0141\u0105cz\u0119 do\u015Bwiadczenie negocjacyjne, przygotowanie oferty i estetyk\u0119 prezentacji. Dzi\u0119ki temu sprzeda\u017C jest uporz\u0105dkowana, przewidywalna i bez chaosu." })] }), _jsx("figure", { className: "hero-photo", children: _jsx("img", { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1800&q=80", alt: "Portret eksperta nieruchomo\u015Bci" }) })] }) }), _jsx("section", { className: "section", children: _jsxs("div", { className: "container about-value-layout", children: [_jsxs("aside", { className: "about-value-copy", children: [_jsx("p", { className: "eyebrow", children: "Podej\u015Bcie" }), _jsx("h2", { children: "Kim jestem i jak pracuj\u0119" }), _jsx("p", { children: "Wspieram klient\u00F3w, kt\u00F3rzy chc\u0105 sprzeda\u0107 mieszkanie dobrze, a nie przypadkowo. Od pierwszego audytu po podpisanie dokument\u00F3w prowadz\u0119 ca\u0142y proces tak, aby ka\u017Cdy etap mia\u0142 jasny cel i konkretne mierniki." }), _jsx("p", { children: "Nie dzia\u0142am szablonowo. Ka\u017Cda nieruchomo\u015B\u0107 wymaga innej strategii ceny, innej narracji i innego planu negocjacji. To w\u0142a\u015Bnie te detale tworz\u0105 przewag\u0119 przy finalnym wyniku." }), _jsx("blockquote", { children: "\"Dobrze sprzedana nieruchomo\u015B\u0107 to wynik decyzji podj\u0119tych we w\u0142a\u015Bciwej kolejno\u015Bci.\"" })] }), _jsx("div", { className: "about-value-visuals", children: _jsxs("div", { className: "value-points", children: [_jsx("h3", { children: "Co jest dla mnie wa\u017Cne" }), _jsx("div", { className: "value-image-grid", children: valueCards.map((item, idx) => (_jsxs("article", { ref: (el) => { valueCardRefs.current[idx] = el; }, className: `value-image-item ${idx === activeValueIndex ? "active" : ""}`, children: [_jsx("img", { src: item.image, alt: item.text }), _jsx("p", { children: item.text })] }, item.text))) })] }) })] }) }), _jsx("section", { className: "section about-process-section", children: _jsxs("div", { className: "container", children: [_jsxs("header", { className: "about-process-head", children: [_jsx("p", { className: "eyebrow", children: "Portfolio" }), _jsx("h2", { className: "section-title", children: "Przyk\u0142ady projekt\u00F3w i efekt\u00F3w wsp\u00F3\u0142pracy" })] }), _jsx("div", { className: "about-service-board", children: portfolioCases.map((item, idx) => (_jsx("article", { className: "about-service-row", style: { ["--bg"]: `url(${item.image})` }, children: _jsxs("div", { className: "about-service-info", children: [_jsx("p", { className: "about-idx", children: _jsx("span", { className: "about-idx-text", children: String(idx + 1).padStart(2, "0") }) }), _jsx("p", { className: "about-service-result", children: item.result }), _jsx("p", { className: "about-service-tag", children: item.hero }), _jsx("h3", { children: item.title }), _jsx("p", { children: item.text })] }) }, item.title))) })] }) }), _jsx("section", { className: "section", children: _jsxs("div", { className: "container process-layout", children: [_jsx("div", { className: "process-visuals", children: process.map((item, idx) => (_jsx("article", { ref: (el) => { processCardRefs.current[idx] = el; }, className: `process-image-item ${idx === activeProcessIndex ? "active" : ""}`, children: _jsx("img", { src: item.image, alt: item.title }) }, `img-${item.step}`))) }), _jsxs("aside", { className: "process-copy", children: [_jsx("p", { className: "eyebrow", children: "Proces" }), _jsx("h2", { className: "section-title", children: "Model wsp\u00F3\u0142pracy krok po kroku" }), _jsxs("p", { className: "process-progress", children: [activeProcessIndex + 1, " / ", process.length] }), _jsx("p", { className: "process-lead", children: (_a = process[activeProcessIndex]) === null || _a === void 0 ? void 0 : _a.title }), _jsx("p", { className: "process-desc", children: (_b = process[activeProcessIndex]) === null || _b === void 0 ? void 0 : _b.text })] })] }) })] }), _jsxs("div", { className: "footer-stack", children: [_jsx(Prefooter, { tall: true, kicker: "Porozmawiajmy o Twojej nieruchomo\u015Bci", title: "Je\u015Bli chcesz sprzeda\u0107 mieszkanie z planem i spokojem, um\u00F3w rozmow\u0119.", copy: "Zaczniemy od kr\u00F3tkiej diagnozy i konkretnego kierunku dzia\u0142a\u0144.", buttons: [
                            { href: "/kontakt", label: "Umów konsultację" },
                            { href: "/sprzedaz", label: "Zobacz ofertę sprzedaży" },
                        ] }), _jsx(SiteFooter, { year: year })] }), _jsx(ScrollToTopButton, {})] }));
}
