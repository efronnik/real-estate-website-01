import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PageIntroSection({ eyebrow, title, copy }) {
    return (_jsx("section", { className: "section", children: _jsxs("div", { className: "container", children: [_jsx("p", { className: "eyebrow", children: eyebrow }), _jsx("h1", { className: "section-title", children: title }), _jsx("p", { className: "section-copy", children: copy })] }) }));
}
