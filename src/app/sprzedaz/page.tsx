import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { WycenaSection } from "@/components/wycena-section";
import { Prefooter } from "@/components/prefooter";
import { PageIntroSection } from "@/components/page-intro-section";

export default function SprzedazPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <main>
        <SiteTopbar />
        <PageIntroSection
          eyebrow="Sprzedaz nieruchomosci"
          title="Sprzedaz nieruchomosci to dobrze zaplanowany proces"
          copy="Ta strona jest gotowym szkieletem pod oferte sprzedazy, leady i CTA. W kolejnym kroku uzupelnimy ja finalna trescia oraz formularzem wyceny."
        />

        <WycenaSection sourcePage="sprzedaz" />

      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Masz pytania?"
          title="Wolisz najpierw rozmowe zamiast formularza?"
          buttons={[{ href: "/kontakt", label: "Umow konsultacje" }]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
