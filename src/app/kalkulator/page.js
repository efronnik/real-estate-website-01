"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { ROUTE_PATHS } from "@/config/navigation";
const MIN_AREA = 15;
const MAX_AREA = 300;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const basePricePerM2 = 14500;
const conditionOptions = [
    { label: "Do remontu", value: 0.9 },
    { label: "Dobry", value: 1 },
    { label: "Bardzo dobry", value: 1.08 },
    { label: "Premium", value: 1.15 },
];
const districtOptions = [
    { label: "Niższa", value: 0.92 },
    { label: "Standardowa", value: 1 },
    { label: "Wysoka", value: 1.1 },
    { label: "Top", value: 1.2 },
];
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const formatPln = (value) => new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(value);
export default function KalkulatorPage() {
    const year = new Date().getFullYear();
    const [area, setArea] = useState(50);
    const [rooms, setRooms] = useState(2);
    const [conditionFactor, setConditionFactor] = useState(1);
    const [districtFactor, setDistrictFactor] = useState(1);
    const estimate = useMemo(() => {
        const raw = area * basePricePerM2 * conditionFactor * districtFactor;
        return Math.round(raw / 1000) * 1000;
    }, [area, conditionFactor, districtFactor]);
    return (_jsxs(_Fragment, { children: [_jsxs("main", { className: "calculator-page", children: [_jsx(SiteTopbar, {}), _jsxs("div", { className: "container calc-shell", children: [_jsxs("section", { className: "calc-hero", children: [_jsx("video", { className: "calculator-video-bg", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", "aria-hidden": "true", children: _jsx("source", { src: "/Hero-Calculator.mp4", type: "video/mp4" }) }), _jsx("div", { className: "calculator-video-overlay", "aria-hidden": "true" }), _jsxs("header", { className: "calc-head", children: [_jsx("p", { className: "eyebrow", children: "Kalkulator" }), _jsx("h1", { className: "section-title", children: "Szybki szacunek warto\u015Bci mieszkania" }), _jsx("p", { className: "section-copy", children: "To orientacyjny kalkulator. Finalna wycena zale\u017Cy od lokalizacji, stanu nieruchomo\u015Bci i strategii sprzeda\u017Cy." })] })] }), _jsxs("div", { className: "calc-grid", children: [_jsx("div", { className: "calc-grid-overlay", "aria-hidden": "true" }), _jsxs("form", { className: "calc-form", onSubmit: (e) => e.preventDefault(), children: [_jsxs("label", { children: ["Metra\u017C (m\u00B2)", _jsxs("div", { className: "input-row", children: [_jsx("input", { value: area, type: "number", min: MIN_AREA, max: MAX_AREA, onChange: (e) => setArea(clamp(Number(e.target.value || MIN_AREA), MIN_AREA, MAX_AREA)) }), _jsx("span", { className: "unit", children: "m\u00B2" })] }), _jsx("input", { className: "range", value: area, type: "range", min: MIN_AREA, max: MAX_AREA, step: 1, onChange: (e) => setArea(clamp(Number(e.target.value), MIN_AREA, MAX_AREA)) })] }), _jsxs("label", { children: ["Liczba pokoi", _jsx("div", { className: "rooms-grid", children: Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (_jsx("button", { type: "button", className: `chip ${rooms === n ? "active" : ""}`, onClick: () => setRooms(clamp(n, MIN_ROOMS, MAX_ROOMS)), children: n }, `room-${n}`))) })] }), _jsxs("label", { children: ["Stan mieszkania", _jsx("div", { className: "chips-row", children: conditionOptions.map((option) => (_jsx("button", { type: "button", className: `chip chip-wide ${conditionFactor === option.value ? "active" : ""}`, onClick: () => setConditionFactor(option.value), children: option.label }, `cond-${option.value}`))) })] }), _jsxs("label", { children: ["Atrakcyjno\u015B\u0107 lokalizacji", _jsx("div", { className: "chips-row", children: districtOptions.map((option) => (_jsx("button", { type: "button", className: `chip chip-wide ${districtFactor === option.value ? "active" : ""}`, onClick: () => setDistrictFactor(option.value), children: option.label }, `dist-${option.value}`))) })] })] }), _jsxs("aside", { className: "calc-result", children: [_jsx("p", { className: "result-kicker", children: "Szacowana warto\u015B\u0107" }), _jsx("strong", { className: "result-value", children: formatPln(estimate) }), _jsxs("p", { className: "muted", children: ["Za\u0142o\u017Cenie bazowe: ", formatPln(basePricePerM2), " / m\u00B2, rynek Warszawa."] }), _jsxs("div", { className: "result-meta", children: [_jsxs("p", { children: [_jsx("span", { children: "Metra\u017C" }), _jsxs("strong", { children: [area, " m\u00B2"] })] }), _jsxs("p", { children: [_jsx("span", { children: "Pokoje" }), _jsx("strong", { children: rooms })] }), _jsxs("p", { children: [_jsx("span", { children: "Stan" }), _jsxs("strong", { children: [conditionFactor.toFixed(2), "x"] })] }), _jsxs("p", { children: [_jsx("span", { children: "Lokalizacja" }), _jsxs("strong", { children: [districtFactor.toFixed(2), "x"] })] })] }), _jsx("a", { href: ROUTE_PATHS.kontakt, className: "link-arrow", children: "Um\u00F3w dok\u0142adn\u0105 wycen\u0119" })] })] })] })] }), _jsxs("div", { className: "footer-stack", children: [_jsx(Prefooter, { kicker: "Koniec przewijania? Zr\u00F3bmy pierwszy krok.", title: "Sprzedaj mieszkanie spokojnie i na dobrych warunkach.", buttons: [{ href: "/kontakt", label: "Umów konsultację" }] }), _jsx(SiteFooter, { year: year })] }), _jsx(ScrollToTopButton, {})] }));
}
