"use client";

const poradnikPaths = [
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
    cta: "Czytaj poradnik",
  },
];

export default function PoradnikPage() {
  const featuredPost = posts[0];
  const sidePosts = posts.slice(1);
  const year = new Date().getFullYear();

  return (
    <>
      <main>
        <header className="site-topbar">
          <a href="/" className="site-brand" aria-label="FIND home"><img src="/LOGO.png" alt="FIND" /></a>
          <nav className="site-nav" aria-label="Primary navigation">
            <a href="/">Główna</a><a href="/o-mnie">O mnie</a><a href="/bledy">Błędy</a><a href="/poradnik">Poradnik</a><a href="/kalkulator">Kalkulator</a><a href="/kontakt">Kontakt</a>
          </nav>
          <div className="site-spacer" aria-hidden="true"></div>
        </header>

        <section className="section poradnik-hero">
          <video className="poradnik-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/Hero-Blog.mp4" type="video/mp4" />
          </video>
          <div className="poradnik-hero-overlay" aria-hidden="true"></div>
          <div className="container poradnik-hero-shell">
            <p className="eyebrow">Poradnik</p>
            <h1 className="section-title">Blog i poradnik sprzedaży mieszkania</h1>
            <p className="section-copy">Zebrane w jednym miejscu: wycena, przygotowanie oferty, dokumenty, podatki i negocjacje. Treści ułożone tak, aby przeprowadzić Cię od decyzji o sprzedaży do bezpiecznej finalizacji.</p>
          </div>
        </section>

        <section id="blog" className="section blog">
          <div className="container">
            <div className="editorial editorial--full-bleed">
              <div className="editorial-bg" style={{ backgroundImage: `url(${featuredPost.image})` }}>
                <div className="scan-lines" aria-hidden="true"></div>
                <div className="scan-lines-right" aria-hidden="true"></div>
                <article className="featured-copy">
                  <p className="meta">{featuredPost.meta}</p>
                  <h3>{featuredPost.title}</h3>
                  <p>{featuredPost.excerpt}</p>
                  <a href={`/poradnik/${featuredPost.slug}`} className="link-arrow">{featuredPost.cta}</a>
                </article>
                <div className="dock">
                  {sidePosts.map((post) => (
                    <article key={post.title} className="dock-card">
                      <div className="dock-thumb" style={{ backgroundImage: `url(${post.image})` }}></div>
                      <div className="dock-copy">
                        <p className="meta">{post.meta}</p>
                        <h4>{post.title}</h4>
                        <a href={`/poradnik/${post.slug}`} className="link-arrow">{post.cta}</a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section process poradnik-process">
          <div className="container">
            <header className="process-head">
              <p className="eyebrow">Jak korzystać z poradnika</p>
              <h2 className="section-title">Ścieżki czytania zamiast listy błędów</h2>
            </header>
          </div>
          <div className="service-board">
            {poradnikPaths.map((step) => (
              <article key={step.title} className="service-row" style={{ ["--bg" as string]: `url(${step.image})` }}>
                <div className="service-info"><p className="idx"><span className="idx-text">{step.label}</span></p><h3>{step.title}</h3><p>{step.text}</p></div>
                <div className="service-word"><span>{step.hero}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section poradnik-structure">
          <div className="container">
            <div className="surface faq-box">
              <h3>FAQ: najczęstsze pytania właścicieli mieszkań</h3>
              <article className="faq-item"><h4>Od czego zacząć sprzedaż mieszkania, żeby nie tracić czasu?</h4><p>Zacznij od krótkiego audytu: realna cena startowa, plan przygotowania mieszkania i harmonogram publikacji. Bez tej kolejności ogłoszenie często trafia na rynek zbyt wcześnie i od razu traci dynamikę.</p></article>
              <article className="faq-item"><h4>Ile czasu dać ofercie, zanim zmieniać cenę?</h4><p>Najpierw analizuj dane z pierwszych 7-14 dni: liczba zapytań, jakość rozmów i reakcje po prezentacjach. Dopiero na tej podstawie podejmuj decyzję o korekcie ceny, zdjęć albo opisu.</p></article>
              <article className="faq-item"><h4>Jakie dokumenty przygotować przed publikacją ogłoszenia?</h4><p>Minimum to komplet dokumentów własności i dokumentów potrzebnych do bezpiecznej finalizacji. Im wcześniej to zrobisz, tym mniejsze ryzyko opóźnień oraz słabszej pozycji negocjacyjnej pod koniec procesu.</p></article>
              <article className="faq-item"><h4>Czy home staging i profesjonalne zdjęcia naprawdę robią różnicę?</h4><p>Tak, bo pierwsza decyzja kupującego zapada w ogłoszeniu. Dobrze przygotowane wnętrze i spójne zdjęcia podnoszą liczbę jakościowych zapytań i skracają czas dochodzenia do spotkania.</p></article>
              <article className="faq-item"><h4>Jak negocjować, żeby nie oddać ceny na starcie?</h4><p>Ustal przed rozmowami warunki graniczne i kolejność ustępstw. Dzięki temu odpowiadasz spokojnie na presję kupującego i bronisz ceny argumentami, a nie emocjami.</p></article>
              <article className="faq-item"><h4>Kiedy warto skonsultować sprzedaż z ekspertem?</h4><p>Najlepiej na starcie albo wtedy, gdy oferta jest aktywna, ale nie daje efektu. To momenty, w których zmiana strategii najszybciej poprawia wynik sprzedaży i ogranicza koszt czasu.</p></article>
            </div>
          </div>
        </section>
      </main>

      <div className="footer-stack">
        <section className="prefooter-stage prefooter-stage--tall poradnik-prefooter" aria-label="Sekcja końcowa">
          <div className="prefooter-sticky prefooter-sticky--tall">
            <div className="prefooter-shell prefooter-shell--tall">
              <p className="prefooter-kicker">Potrzebujesz strategii dopasowanej do Twojego mieszkania?</p>
              <h2>Umów krótką rozmowę i sprawdźmy, jakie działania najszybciej poprawią wynik sprzedaży.</h2>
              <a href="#kontakt" className="prefooter-btn"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span></span><span className="sr-only">Umów konsultację</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
        <footer className="site-footer">
          <div className="container footer-shell">
            <div className="footer-brand"><a href="/" className="footer-logo" aria-label="FIND home"><img src="/LOGO.png" alt="FIND" /></a><p className="footer-copy">Eksperckie wsparcie właściciela mieszkania: od strategii ceny po bezpieczny podpis.</p></div>
            <div className="footer-links"><a href="/">Główna</a><a href="/o-mnie">O mnie</a><a href="/bledy">Błędy</a><a href="/kalkulator">Kalkulator</a><a href="/kontakt">Kontakt</a></div>
            <div className="footer-social"><a href="#" aria-label="Instagram"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4.1"></circle><circle cx="17.35" cy="6.65" r="1"></circle></svg></span>Instagram</a><a href="#" aria-label="Facebook"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M14.2 8.1h2.2V4.5h-2.6c-3 0-4.6 1.8-4.6 4.9v2H6.8v3.7h2.4V20h3.8v-4.9h2.9l.5-3.7h-3.4V9.8c0-1 .4-1.7 1.6-1.7Z"></path></svg></span>Facebook</a><a href="#" aria-label="LinkedIn"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="9.2" width="3.4" height="10.8"></rect><circle cx="5.7" cy="5.8" r="1.6"></circle><path d="M10 9.2h3.3v1.5c.6-1 1.8-1.8 3.6-1.8 3 0 4.1 2 4.1 5.1V20h-3.5v-5.3c0-1.7-.6-2.6-1.9-2.6-1.5 0-2.2 1.1-2.2 2.6V20H10V9.2Z"></path></svg></span>LinkedIn</a></div>
          </div>
          <div className="container footer-bottom"><p>© {year} FIND. Wszelkie prawa zastrzeżone.</p></div>
        </footer>
      </div>
      <button className="to-top" type="button" aria-label="Wróć na górę" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span aria-hidden="true">↑</span></button>
    </>
  );
}

