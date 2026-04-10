import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { WycenaSection } from "@/components/wycena-section";
import { Prefooter } from "@/components/prefooter";
import { PageIntroSection } from "@/components/page-intro-section";
export default function SprzedazPage() {
    const year = new Date().getFullYear();
    return (_jsxs(_Fragment, { children: [_jsxs("main", { children: [_jsx(SiteTopbar, {}), _jsx(PageIntroSection, { eyebrow: "Sprzedaz nieruchomosci", title: "Sprzedaz nieruchomosci to dobrze zaplanowany proces", copy: "Ta strona jest gotowym szkieletem pod oferte sprzedazy, leady i CTA. W kolejnym kroku uzupelnimy ja finalna trescia oraz formularzem wyceny." }), _jsx(WycenaSection, { sourcePage: "sprzedaz" })] }), _jsxs("div", { className: "footer-stack", children: [_jsx(Prefooter, { kicker: "Masz pytania?", title: "Wolisz najpierw rozmowe zamiast formularza?", buttons: [{ href: "/kontakt", label: "Umow konsultacje" }] }), _jsx(SiteFooter, { year: year })] })] }));
}
