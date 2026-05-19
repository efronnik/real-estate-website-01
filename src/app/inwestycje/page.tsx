import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { LeadContactSection } from "@/components/lead-contact-section";
import { PageIntroSection } from "@/components/page-intro-section";
import { ROUTE_PATHS } from "@/config/navigation";
import { CtaClickLink } from "@/components/cta-click-link";
import { RemoteFillImage } from "@/components/remote-fill-image";
import {
  fetchCmsFaqByPageType,
  fetchCmsFeaturedTestimonials,
  fetchCmsPageBySlug,
  safeCmsCall,
} from "@/lib/cms";
import { resolveKeyPageMetadata } from "@/lib/page-metadata";
import { resolveCmsText } from "@/lib/cms-content";

const defaultIntroTitle =
  "Inwestowanie w Nieruchomości Warszawa – Flipy Mieszkań z Gwarantowanym Nadzorem";

const defaultIntroCopy = [
  "Szukasz bezpiecznej inwestycji w nieruchomości w Warszawie? Specjalizujemy się w flipach mieszkań – wyszukujemy Perełki z potencjałem, remontujemy i sprzedajemy z zyskiem. Sprawdź, jak możemy pomnożyć Twój kapitał.",
  "Czy Twoje pieniądze pracują wystarczająco ciężko? Masz oszczędności, ale inflacja je zjada. Wiesz, że powinieneś inwestować – ale nie wiesz jak, nie masz czasu, albo po prostu boisz się stracić. To całkowicie normalne.",
  "Większość osób zainteresowanych inwestowaniem w nieruchomości w Warszawie jest dokładnie w tym samym miejscu. Dobra wiadomość: my robimy to za Ciebie.",
].join("\n\n");

const flipPartnershipBullets = [
  "Znajomość rynku nieruchomości w Warszawie i dostęp do okazji, których nie znajdziesz na portalach",
  "Doświadczenie w negocjacjach i profesjonalnej wycenie mieszkań",
  "Sprawdzoną ekipę remontową z wieloletnim doświadczeniem",
  "Pełną obsługę transakcji od zakupu do sprzedaży – od A do Z",
];

const flipBenefits = [
  {
    title: "Krótki horyzont inwestycji",
    text: "Zazwyczaj kilka miesięcy, nie lat – szybszy obrót kapitału niż w długim najmie.",
  },
  {
    title: "Namacalny, fizyczny aktyw",
    text: "Nieruchomość to konkretna wartość – nie wirtualne akcje ani kryptowaluty.",
  },
  {
    title: "Przewidywalny model",
    text: "Sprawdzona strategia flipa: zakup poniżej rynku, remont, sprzedaż z marżą.",
  },
  {
    title: "Wysoki zwrot przy dobrym doborze",
    text: "Przy właściwej selekcji mieszkania i budżecie remontu zwrot z inwestycji może realnie przewyższać lokaty.",
  },
];

const preparationSteps = [
  {
    title: "Patrzymy oczami kupującego, nie sprzedającego",
    text: "Największy błąd to ocenianie nieruchomości z własnej perspektywy. Wiemy, czego szuka Twoja grupa docelowa na rynku warszawskim i pod nią przygotowujemy każdy metr kwadratowy mieszkania.",
  },
  {
    title: "Oceniamy stan techniczny przed zakupem",
    text: "Dokładnie sprawdzamy każdą nieruchomość przed zakupem, żeby nie sprawiała niespodzianek technicznych w trakcie remontu. Każda ukryta usterka to dziura w budżecie – i w Twoim zysku.",
  },
  {
    title: "Planujemy budżet z zapasem",
    text: "Żeby wyjść na plus, a nie na zero – budżet musi być przemyślany zanim wbijemy pierwszy gwóźdź. Nigdy nie zaczynamy remontu bez pełnego planu finansowego.",
  },
  {
    title: "Celujemy w szybką sprzedaż za gotówkę",
    text: "Gotówkowi kupujący = szybkie zamknięcie transakcji = szybszy zwrot kapitału dla inwestora. Dzięki znajomości rynku wiemy, gdzie i jak sprzedać, żeby nie czekać miesiącami.",
  },
];

const inwestycjeMistakes = [
  "Strach przed inwestowaniem paraliżuje i kosztuje Cię więcej niż jakiekolwiek ryzyko",
  "Brak umiejętności negocjacyjnych i przepłacanie za nieruchomość to najszybsza droga do straty",
  "Ocenianie mieszkania z własnej perspektywy zamiast z perspektywy rynku i kupującego",
  "Brak doświadczenia w wycenie nieruchomości – kupujesz za drogo, sprzedajesz za tanio",
  "Wchodzenie bez przygotowanego budżetu na niespodzianki techniczne",
  "Przeinwestowanie – wydawanie za dużo na remont bez analizy zwrotu",
];

const inwestycjeForWho = [
  "Masz wolny kapitał od 100 000 zł wzwyż i chcesz go efektywnie pomnożyć",
  "Chcesz zarabiać na nieruchomościach w Warszawie bez samodzielnego zarządzania",
  "Zależy Ci na bezpieczeństwie i pełnej przejrzystości każdego kroku inwestycji",
  "Myślisz o dywersyfikacji oszczędności poza lokatami i giełdą",
  "Nie masz czasu ani ochoty na samodzielne szukanie okazji inwestycyjnych",
  "Boisz się stracić pieniądze na nieudanej transakcji i potrzebujesz doświadczonego partnera",
];

const inwestycjeFaqFallback = [
  {
    question: "Ile kapitału potrzebuję, żeby wejść we współpracę inwestycyjną?",
    answer:
      "Zwykle rozmawiamy o projektach od ok. 100 000 zł wzwyż – dokładny model zależy od okazji, zakresu remontu i Twojego profilu ryzyka. Na bezpłatnej konsultacji ustalimy, co jest realne w Twojej sytuacji.",
  },
  {
    question: "Jak długo trwa flip mieszkania w Warszawie?",
    answer:
      "Horyzont to zazwyczaj kilka miesięcy: zakup, remont, sprzedaż. Tempo zależy od stanu nieruchomości, budżetu i popytu w danej lokalizacji – przed startem pokazujemy scenariusz czasowy i finansowy.",
  },
  {
    question: "Czy muszę sam szukać mieszkań i nadzorować remont?",
    answer:
      "Nie. Ty wnosisz kapitał i decyzje strategiczne na kluczowych etapach; my prowadzimy selekcję, negocjacje, remont i sprzedaż. Twój czas zaangażowania jest minimalny przy pełnej przejrzystości procesu.",
  },
];

const inwestycjeSeoImages = [
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    alt: "Flip nieruchomości Warszawa – moderny budynek mieszkalny na tle centrum",
  },
  {
    src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
    alt: "Mieszkanie pod inwestycję Warszawa – analiza kosztów remontu i planu wyjścia",
  },
  {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    alt: "Wycena mieszkania Warszawa – konsultacja inwestycyjna i ocena potencjału flipa",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return resolveKeyPageMetadata("inwestycje");
}

export default async function InwestycjePage() {
  const year = new Date().getFullYear();
  const [cmsPage, cmsFaqItems, cmsTestimonials] = await Promise.all([
    safeCmsCall(() => fetchCmsPageBySlug("inwestycje"), null),
    safeCmsCall(() => fetchCmsFaqByPageType("inwestycje"), []),
    safeCmsCall(fetchCmsFeaturedTestimonials, []),
  ]);

  const introTitle = resolveCmsText(cmsPage?.headline, defaultIntroTitle);
  const introCopy = resolveCmsText(cmsPage?.content, defaultIntroCopy);
  const faqItems = cmsFaqItems.length > 0 ? cmsFaqItems : inwestycjeFaqFallback;

  return (
    <>
      <main>
        <SiteTopbar />
        <PageIntroSection eyebrow="Inwestycje · flipy mieszkań Warszawa" title={introTitle} copy={introCopy} />

        <section className="section">
          <div className="container sale-pillars-shell">
            <p className="section-copy seo-keywords-muted">
              flip nieruchomości Warszawa · inwestowanie w nieruchomości Warszawa · mieszkania pod inwestycję
              Warszawa ·{" "}
              <CtaClickLink href={ROUTE_PATHS.kalkulator} ctaLocation="inwestycje_keywords" ctaLabel="wycena mieszkania Warszawa">
                wycena mieszkania Warszawa
              </CtaClickLink>
              {" · "}
              zwrot z inwestycji nieruchomości · zakup mieszkania pod flipa Warszawa
            </p>
          </div>
        </section>

        <section className="section sale-pillars">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Model współpracy</p>
            <h2 className="section-title">Jak działa flip nieruchomości w Warszawie?</h2>
            <p className="section-copy">
              Specjalizujemy się w flipach nieruchomości na rynku warszawskim. Kupujemy mieszkania poniżej wartości
              rynkowej, remontujemy je i sprzedajemy z zyskiem – zazwyczaj w ciągu kilku miesięcy. To sprawdzony,
              powtarzalny model zarabiania na rynku nieruchomości w Warszawie.
            </p>
            <div className="sale-pillars-grid">
              <article className="sale-pillar-card">
                <h3>Ty wnosisz kapitał</h3>
                <p>Decyzje strategiczne i finansowanie projektu po Twojej stronie – bez codziennego zarządzania remontem.</p>
              </article>
              <article className="sale-pillar-card">
                <h3>My wnosimy wykonanie</h3>
                <ul>
                  {flipPartnershipBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
            <p className="section-copy">
              <strong>Twój czas zaangażowania: minimalny.</strong> <strong>Twój zysk: realny.</strong>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Dlaczego flip</p>
            <h2 className="section-title">Dlaczego warto inwestować w flipy nieruchomości</h2>
            <div className="sale-pillars-grid">
              {flipBenefits.map((item) => (
                <article key={item.title} className="sale-pillar-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Przygotowanie pod sprzedaż</p>
            <h2 className="section-title">Jak przygotowujemy nieruchomość do szybkiej sprzedaży w Warszawie?</h2>
            <p className="section-copy">
              To jeden z kluczowych elementów udanego flipa – i właśnie tutaj większość inwestorów traci pieniądze.
              Wyciągamy maksymalny potencjał z każdej nieruchomości, zanim trafi na rynek. Przed zakupem korzystamy z{" "}
              <CtaClickLink href={ROUTE_PATHS.kalkulator} ctaLocation="inwestycje_prep" ctaLabel="wycena mieszkania">
                profesjonalnej wyceny mieszkania
              </CtaClickLink>{" "}
              i analizy opłacalności – żeby nie wchodzić w transakcję na ślepo.
            </p>
            <div className="sale-pillars-grid">
              {preparationSteps.map((step) => (
                <article key={step.title} className="sale-pillar-card">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section inwestycje-seo-gallery">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Rynek warszawski</p>
            <h2 className="section-title">Inwestowanie i flipy w Warszawie – od okazji po bezpieczną finalizację</h2>
            <div className="inwestycje-seo-gallery-grid">
              {inwestycjeSeoImages.map((item) => (
                <figure key={item.src} className="inwestycje-seo-gallery-item">
                  <RemoteFillImage src={item.src} alt={item.alt} sizes="(max-width: 768px) 100vw, 33vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container sale-pillars-shell">
            <p className="eyebrow">Ryzyka, których unikasz</p>
            <h2 className="section-title">Najczęstsze błędy inwestorów w nieruchomości – których u nas unikniesz</h2>
            <p className="section-copy">My te błędy już popełniliśmy i nauczyliśmy się na nich. Ty nie musisz:</p>
            <div className="sale-pillars-grid">
              {inwestycjeMistakes.map((mistake) => (
                <article key={mistake} className="sale-pillar-card">
                  <p>{mistake}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section lane-qualify">
          <div className="container lane-qualify-shell">
            <p className="eyebrow">Dla kogo</p>
            <h2 className="section-title">Dla kogo jest ta współpraca?</h2>
            <p className="section-copy">Dla Ciebie, jeśli:</p>
            <div className="lane-checks">
              {inwestycjeForWho.map((item, idx) => (
                <article key={item} className="lane-check">
                  <strong>{String(idx + 1).padStart(2, "0")}</strong>
                  <p>{item}</p>
                </article>
              ))}
            </div>
            <div className="lane-actions">
              <CtaClickLink
                href={`${ROUTE_PATHS.kontakt}?lane=inwestycje#kontakt`}
                className="prefooter-btn"
                ctaLocation="inwestycje_lane"
                ctaLabel="Umów bezpłatną konsultację"
              >
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów bezpłatną konsultację</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów bezpłatną konsultację</span>
                </span>
                <span className="sr-only">Umów bezpłatną konsultację</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </CtaClickLink>
              <CtaClickLink href={ROUTE_PATHS.sprzedaz} className="link-arrow" ctaLocation="inwestycje_lane" ctaLabel="sprzedaz">
                Masz nieruchomość do sprzedaży przed reinwestycją? → Sprzedaż
              </CtaClickLink>
            </div>
          </div>
        </section>

        <section className="section sale-social-proof">
          <div className="container sale-social-proof-shell">
            <p className="eyebrow">Opinie inwestorów</p>
            <h2 className="section-title">Doświadczenia po współpracy inwestycyjnej</h2>
            <div className="sale-social-proof-grid">
              {cmsTestimonials.map((item, idx) => (
                <article key={`${item.authorName ?? "testimonial"}-${idx}`} className="sale-social-proof-card">
                  <p className="stars">★★★★★</p>
                  <blockquote>{item.quote}</blockquote>
                  <footer>
                    <strong>{item.authorName ?? "Klient"}</strong>
                    <span>{item.city ?? "Warszawa"}</span>
                  </footer>
                </article>
              ))}
              {cmsTestimonials.length === 0 ? (
                <article className="sale-social-proof-card">
                  <p>Opinie inwestorów pojawią się tutaj po dodaniu rekordów w CMS.</p>
                </article>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="surface faq-box">
              <h2>FAQ inwestycyjne</h2>
              {faqItems.map((item, idx) => (
                <article key={`${item.question ?? "faq"}-${idx}`} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section sale-cta-strip">
          <div className="container sale-cta-shell">
            <p className="eyebrow">Następny krok</p>
            <h2 className="section-title">Zacznij inwestować w nieruchomości w Warszawie – porozmawiajmy</h2>
            <p>
              Każda współpraca zaczyna się od bezpłatnej konsultacji. Opowiedz o swoich celach inwestycyjnych – razem
              ocenimy, czy i jak możemy pomnożyć Twój kapitał na rynku nieruchomości w Warszawie.
            </p>
            <div className="sale-cta-actions">
              <CtaClickLink
                href={`${ROUTE_PATHS.kontakt}?lane=inwestycje#kontakt`}
                className="prefooter-btn"
                ctaLocation="inwestycje_strip"
                ctaLabel="Umów bezpłatną konsultację"
              >
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Umów bezpłatną konsultację</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Umów bezpłatną konsultację</span>
                </span>
                <span className="sr-only">Umów bezpłatną konsultację</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </CtaClickLink>
              <CtaClickLink href={ROUTE_PATHS.kalkulator} className="prefooter-btn" ctaLocation="inwestycje_strip" ctaLabel="Kalkulator wyceny">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">Kalkulator wyceny</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">Kalkulator wyceny</span>
                </span>
                <span className="sr-only">Kalkulator wyceny</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
              </CtaClickLink>
            </div>
          </div>
        </section>

        <LeadContactSection
          sectionId="kontakt"
          sourcePage="inwestycje"
          leadType="inwestor"
          eyebrow="Konsultacja inwestycyjna"
          title="Porozmawiajmy o Twoim kapitale"
          description="Umów bezpłatną rozmowę i sprawdź, jak możemy podejść do inwestycji na rynku warszawskim."
          showMapOverlay={false}
          verticalLabel=""
        />
      </main>

      <div className="footer-stack">
        <Prefooter
          kicker="Ekspert w inwestowaniu i sprzedaży nieruchomości w Warszawie"
          title="Patrycja Szewczyk · flip nieruchomości i bezpieczna finalizacja transakcji"
          buttons={[{ href: `${ROUTE_PATHS.kontakt}?lane=inwestycje`, label: "Umów konsultację" }]}
        />
        <SiteFooter year={year} />
      </div>
    </>
  );
}
