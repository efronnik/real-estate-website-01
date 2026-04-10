import { jsx as _jsx } from "react/jsx-runtime";
import "./globals.css";
export const metadata = {
    title: "FIND - Sprzedaj mieszkanie",
    description: "Sprzedaż mieszkania bez chaosu, z planem i pełnym wsparciem.",
};
export default function RootLayout({ children, }) {
    return (_jsx("html", { lang: "pl", className: "h-full", children: _jsx("body", { className: "min-h-full flex flex-col", children: children }) }));
}
