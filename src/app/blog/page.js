"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
const blogPaths = [
    {
        label: "01",
        title: "Start sprzedaży (0-14 dni)",
        text: "Od audytu mieszkania po publikację oferty. Kolejność decyzji, które budują dobry start i tempo zapytań.",
        hero: "Start",
        image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        label: "02",
        title: "Oferta już wisi, brak efektu",
        text: "Plan naprawczy dla ogłoszeń, które nie generują wartościowych leadów: cena, komunikat i ekspozycja.",
        hero: "Naprawa",
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        label: "03",
        title: "Negocjacje i obrona ceny",
        text: "Przygotowanie argumentów, granic ustępstw i scenariusza rozmów, aby nie oddawać marży pod presją.",
        hero: "Obrona",
        image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
    {
        label: "04",
        title: "Finalizacja i bezpieczeństwo",
        text: "Checklista dokumentów, terminów i przekazania nieruchomości, żeby domknąć transakcję spokojnie i bez opóźnień.",
        hero: "Final",
        image: "https://images.pexels.com/photos/48195/document-agreement-documents-sign-48195.jpeg?auto=compress&cs=tinysrgb&w=1800",
    },
];
const posts = [
    {
        slug: "7-sygnalow-ze-cena-blokuje-sprzedaz",
        title: "7 sygnałów, że cena blokuje sprzedaż",
        excerpt: "Jak odczytać dane z rynku i ustawić cenę mieszkania, zanim negocjacje zaczną zabierać Twój margines.",
        image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
        meta: "Warszawa / analiza rynku",
        cta: "Czytaj analizę",
    },
    {
        slug: "home-staging-premium-bez-przepalania-budzetu",
        title: "Home staging premium bez przepalania budżetu",
        excerpt: "Co realnie podnosi postrzeganą wartość mieszkania i pomaga szybciej domknąć decyzję klienta.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        meta: "home staging / premium",
        cta: "Zobacz checklist",
    },
    {
        slug: "dokumenty-do-sprzedazy-checklista-eksperta",
        title: "Dokumenty do sprzedaży: checklista eksperta",
        excerpt: "Lista formalności, która przyspiesza finał i ogranicza ryzyko zerwania transakcji.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
        meta: "formalności / bezpieczeństwo",
        cta: "Pobierz listę",
    },
    {
        slug: "negocjacje-ceny-scenariusze-rozmowy",
        title: "Negocjacje ceny: scenariusze rozmowy",
        excerpt: "Jak odpowiadać na presję klienta i utrzymać finalną cenę bez utraty kontroli nad procesem.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        meta: "negocjacje / strategie",
        cta: "Czytaj blog",
    },
];
export default function BlogPage() {
    const featuredPost = posts[0];
    const sidePosts = posts.slice(1);
    const year = new Date().getFullYear();
    return (_jsxs(_Fragment, { children: [_jsxs("main", { children: [_jsx(SiteTopbar, {}), _jsxs("section", { className: "section blog-hero", children: [_jsx("video", { className: "blog-hero-video", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", "aria-hidden": "true", children: _jsx("source", { src: "/Hero-Blog.mp4", type: "video/mp4" }) }), _jsx("div", { className: "blog-hero-overlay", "aria-hidden": "true" }), _jsxs("div", { className: "container blog-hero-shell", children: [_jsx("p", { className: "eyebrow", children: "Blog" }), _jsx("h1", { className: "section-title", children: "Blog sprzeda\u017Cy mieszkania" }), _jsx("p", { className: "section-copy", children: "Zebrane w jednym miejscu: wycena, przygotowanie oferty, dokumenty, podatki i negocjacje. Tre\u015Bci u\u0142o\u017Cone tak, aby przeprowadzi\u0107 Ci\u0119 od decyzji o sprzeda\u017Cy do bezpiecznej finalizacji." })] })] }), _jsx("section", { id: "blog", className: "section blog", children: _jsx("div", { className: "container", children: _jsx("div", { className: "editorial editorial--full-bleed", children: _jsxs("div", { className: "editorial-bg", style: { backgroundImage: `url(${featuredPost.image})` }, children: [_jsx("div", { className: "scan-lines", "aria-hidden": "true" }), _jsx("div", { className: "scan-lines-right", "aria-hidden": "true" }), _jsxs("article", { className: "featured-copy", children: [_jsx("p", { className: "meta", children: featuredPost.meta }), _jsx("h3", { children: featuredPost.title }), _jsx("p", { children: featuredPost.excerpt }), _jsx("a", { href: `/blog/${featuredPost.slug}`, className: "link-arrow", children: featuredPost.cta })] }), _jsx("div", { className: "dock", children: sidePosts.map((post) => (_jsxs("article", { className: "dock-card", children: [_jsx("div", { className: "dock-thumb", style: { backgroundImage: `url(${post.image})` } }), _jsxs("div", { className: "dock-copy", children: [_jsx("p", { className: "meta", children: post.meta }), _jsx("h4", { children: post.title }), _jsx("a", { href: `/blog/${post.slug}`, className: "link-arrow", children: post.cta })] })] }, post.title))) })] }) }) }) }), _jsxs("section", { className: "section process blog-process", children: [_jsx("div", { className: "container", children: _jsxs("header", { className: "process-head", children: [_jsx("p", { className: "eyebrow", children: "Jak korzysta\u0107 z bloga" }), _jsx("h2", { className: "section-title", children: "\u015Acie\u017Cki czytania zamiast listy b\u0142\u0119d\u00F3w" })] }) }), _jsx("div", { className: "service-board", children: blogPaths.map((step) => (_jsxs("article", { className: "service-row", style: { ["--bg"]: `url(${step.image})` }, children: [_jsxs("div", { className: "service-info", children: [_jsx("p", { className: "idx", children: _jsx("span", { className: "idx-text", children: step.label }) }), _jsx("h3", { children: step.title }), _jsx("p", { children: step.text })] }), _jsx("div", { className: "service-word", children: _jsx("span", { children: step.hero }) })] }, step.title))) })] }), _jsx("section", { className: "section blog-structure", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "surface faq-box", children: [_jsx("h3", { children: "FAQ: najcz\u0119stsze pytania w\u0142a\u015Bcicieli mieszka\u0144" }), _jsxs("article", { className: "faq-item", children: [_jsx("h4", { children: "Od czego zacz\u0105\u0107 sprzeda\u017C mieszkania, \u017Ceby nie traci\u0107 czasu?" }), _jsx("p", { children: "Zacznij od kr\u00F3tkiego audytu: realna cena startowa, plan przygotowania mieszkania i harmonogram publikacji. Bez tej kolejno\u015Bci og\u0142oszenie cz\u0119sto trafia na rynek zbyt wcze\u015Bnie i od razu traci dynamik\u0119." })] }), _jsxs("article", { className: "faq-item", children: [_jsx("h4", { children: "Ile czasu da\u0107 ofercie, zanim zmienia\u0107 cen\u0119?" }), _jsx("p", { children: "Najpierw analizuj dane z pierwszych 7-14 dni: liczba zapyta\u0144, jako\u015B\u0107 rozm\u00F3w i reakcje po prezentacjach. Dopiero na tej podstawie podejmuj decyzj\u0119 o korekcie ceny, zdj\u0119\u0107 albo opisu." })] }), _jsxs("article", { className: "faq-item", children: [_jsx("h4", { children: "Jakie dokumenty przygotowa\u0107 przed publikacj\u0105 og\u0142oszenia?" }), _jsx("p", { children: "Minimum to komplet dokument\u00F3w w\u0142asno\u015Bci i dokument\u00F3w potrzebnych do bezpiecznej finalizacji. Im wcze\u015Bniej to zrobisz, tym mniejsze ryzyko op\u00F3\u017Anie\u0144 oraz s\u0142abszej pozycji negocjacyjnej pod koniec procesu." })] }), _jsxs("article", { className: "faq-item", children: [_jsx("h4", { children: "Czy home staging i profesjonalne zdj\u0119cia naprawd\u0119 robi\u0105 r\u00F3\u017Cnic\u0119?" }), _jsx("p", { children: "Tak, bo pierwsza decyzja kupuj\u0105cego zapada w og\u0142oszeniu. Dobrze przygotowane wn\u0119trze i sp\u00F3jne zdj\u0119cia podnosz\u0105 liczb\u0119 jako\u015Bciowych zapyta\u0144 i skracaj\u0105 czas dochodzenia do spotkania." })] }), _jsxs("article", { className: "faq-item", children: [_jsx("h4", { children: "Jak negocjowa\u0107, \u017Ceby nie odda\u0107 ceny na starcie?" }), _jsx("p", { children: "Ustal przed rozmowami warunki graniczne i kolejno\u015B\u0107 ust\u0119pstw. Dzi\u0119ki temu odpowiadasz spokojnie na presj\u0119 kupuj\u0105cego i bronisz ceny argumentami, a nie emocjami." })] }), _jsxs("article", { className: "faq-item", children: [_jsx("h4", { children: "Kiedy warto skonsultowa\u0107 sprzeda\u017C z ekspertem?" }), _jsx("p", { children: "Najlepiej na starcie albo wtedy, gdy oferta jest aktywna, ale nie daje efektu. To momenty, w kt\u00F3rych zmiana strategii najszybciej poprawia wynik sprzeda\u017Cy i ogranicza koszt czasu." })] })] }) }) })] }), _jsxs("div", { className: "footer-stack", children: [_jsx(Prefooter, { tall: true, extraClassName: "blog-prefooter", kicker: "Potrzebujesz strategii dopasowanej do Twojego mieszkania?", title: "Um\u00F3w kr\u00F3tk\u0105 rozmow\u0119 i sprawd\u017Amy, jakie dzia\u0142ania najszybciej poprawi\u0105 wynik sprzeda\u017Cy.", buttons: [
                            { href: "/kontakt", label: "Umów konsultację" },
                            { href: "/sprzedaz", label: "Wyceń nieruchomość" },
                        ] }), _jsx(SiteFooter, { year: year })] }), _jsx(ScrollToTopButton, {})] }));
}
