import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIND - Sprzedaj mieszkanie",
  description: "Sprzedaż mieszkania bez chaosu, z planem i pełnym wsparciem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
