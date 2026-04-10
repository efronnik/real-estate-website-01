import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContactForm } from "@/components/contact-form";
export function LeadContactSection({ sectionId = "kontakt", sourcePage, leadType = "kontakt", eyebrow, title, description, verticalLabel = "Kontakt", showMapOverlay = true, }) {
    return (_jsx("section", { id: sectionId, className: "section cta", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "shell", children: [_jsxs("div", { className: "copy", children: [showMapOverlay ? _jsx("div", { className: "map-overlay" }) : null, verticalLabel ? _jsx("p", { className: "vertical-label", children: verticalLabel }) : null, _jsxs("div", { className: "copy-inner", children: [_jsx("p", { className: "eyebrow", children: eyebrow }), _jsx("h2", { children: title }), _jsx("p", { children: description })] })] }), _jsx(ContactForm, { sourcePage: sourcePage, leadType: leadType })] }) }) }));
}
