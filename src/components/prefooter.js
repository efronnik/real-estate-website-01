import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Prefooter({ kicker, title, copy, buttons, tall = false, extraClassName, ariaLabel = "Sekcja końcowa", }) {
    const stageClass = ["prefooter-stage", tall ? "prefooter-stage--tall" : "", extraClassName !== null && extraClassName !== void 0 ? extraClassName : ""]
        .filter(Boolean)
        .join(" ");
    const stickyClass = ["prefooter-sticky", tall ? "prefooter-sticky--tall" : ""]
        .filter(Boolean)
        .join(" ");
    const shellClass = ["prefooter-shell", tall ? "prefooter-shell--tall" : ""]
        .filter(Boolean)
        .join(" ");
    return (_jsx("section", { className: stageClass, "aria-label": ariaLabel, children: _jsx("div", { className: stickyClass, children: _jsxs("div", { className: shellClass, children: [_jsx("p", { className: "prefooter-kicker", children: kicker }), _jsx("h2", { children: title }), copy ? _jsx("p", { className: "prefooter-copy", children: copy }) : null, _jsx("div", { className: "prefooter-actions", children: buttons.map((button) => {
                            var _a;
                            return (_jsxs("a", { href: button.href, className: "prefooter-btn", children: [_jsxs("span", { className: "prefooter-btn-text-wrap", "aria-hidden": "true", children: [_jsx("span", { className: "prefooter-btn-text prefooter-btn-text-top", children: button.label }), _jsx("span", { className: "prefooter-btn-text prefooter-btn-text-bottom", children: button.label })] }), _jsx("span", { className: "sr-only", children: (_a = button.srLabel) !== null && _a !== void 0 ? _a : button.label }), _jsx("span", { className: "prefooter-btn-arrow", "aria-hidden": "true", children: "\u2192" })] }, `${button.href}-${button.label}`));
                        }) })] }) }) }));
}
