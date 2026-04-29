import type { Metadata } from "next";
import Link from "next/link";
import { ROUTE_PATHS } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Polityka prywatnosci",
  description: "Zasady przetwarzania danych osobowych i kontaktowych.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="shell" style={{ padding: "2rem" }}>
          <h1>Polityka prywatnosci</h1>
          <p>
            Administratorem danych osobowych jest wlasciciel serwisu. Dane podane w formularzach kontaktowych i wyceny
            sa przetwarzane w celu odpowiedzi na zapytanie i obslugi procesu wspolpracy.
          </p>
          <p>
            Masz prawo dostepu do danych, ich sprostowania, usuniecia, ograniczenia przetwarzania, przenoszenia oraz
            wniesienia sprzeciwu. W sprawach zwiazanych z danymi napisz przez formularz na stronie kontaktowej.
          </p>
          <p>
            Szczegolowe informacje dotyczace podstaw prawnych i okresu przechowywania danych znajdziesz w informacji
            RODO.
          </p>
          <p>
            <Link href={ROUTE_PATHS.rodo}>Przejdz do informacji RODO</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
