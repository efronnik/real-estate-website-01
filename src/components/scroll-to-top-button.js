"use client";
import { jsx as _jsx } from "react/jsx-runtime";
export function ScrollToTopButton({ ariaLabel = "Wróć na górę" }) {
    return (_jsx("button", { className: "to-top", type: "button", "aria-label": ariaLabel, onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), children: _jsx("span", { "aria-hidden": "true", children: "\u2191" }) }));
}
