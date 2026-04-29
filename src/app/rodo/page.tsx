import type { Metadata } from "next";
import Link from "next/link";
import { ROUTE_PATHS } from "@/config/navigation";

export const metadata: Metadata = {
  title: "RODO - informacja o przetwarzaniu danych",
  description: "Informacja o prawach i zasadach przetwarzania danych zgodnie z RODO.",
};

export default function RodoPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="shell" style={{ padding: "2rem" }}>
          <h1>RODO - informacja o przetwarzaniu danych</h1>
          <p>
            Dane osobowe przetwarzamy zgodnie z Rozporzadzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO),
            w zakresie niezbednym do odpowiedzi na zapytanie, kontaktu i przygotowania oferty wspolpracy.
          </p>
          <p>
            Podanie danych jest dobrowolne, ale niezbedne do obslugi formularza. Przysluguje Ci prawo dostepu,
            sprostowania, usuniecia, ograniczenia przetwarzania, przenoszenia danych i wniesienia skargi do organu
            nadzorczego.
          </p>
          <p>
            Aby skorzystac ze swoich praw, skontaktuj sie z administratorem przez formularz kontaktowy.
          </p>
          <p>
            <Link href={ROUTE_PATHS.politykaPrywatnosci}>Wroc do Polityki prywatnosci</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
