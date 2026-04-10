"use client";

export default function KontaktPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <main className="kontakt-page">
        <header className="site-topbar">
          <a href="/" className="site-brand" aria-label="FIND home"><img src="/LOGO.png" alt="FIND" /></a>
          <nav className="site-nav" aria-label="Primary navigation">
            <a href="/">Główna</a><a href="/o-mnie">O mnie</a><a href="/bledy">Błędy</a><a href="/poradnik">Poradnik</a><a href="/kalkulator">Kalkulator</a><a href="/kontakt">Kontakt</a>
          </nav>
          <div className="site-spacer" aria-hidden="true"></div>
        </header>

        <section className="section kontakt-hero">
          <video className="kontakt-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/Hero-Kontakt.mp4" type="video/mp4" />
          </video>
          <div className="kontakt-hero-overlay" aria-hidden="true"></div>
          <div className="container kontakt-hero-shell">
            <p className="eyebrow">Kontakt</p>
            <h1 className="section-title">Porozmawiajmy o sprzedaży Twojej nieruchomości</h1>
            <p className="section-copy">Krótka konsultacja wystarczy, żeby ustalić kierunek działań i bezpieczny plan sprzedaży.</p>
          </div>
        </section>

        <section id="kontakt" className="section cta">
          <div className="container">
            <div className="shell">
              <div className="copy">
                <div className="map-overlay"></div>
                <p className="vertical-label">Kontakt</p>
                <div className="copy-inner">
                  <p className="eyebrow">Konsultacja / Współpraca</p>
                  <h2>Warszawa, Polska</h2>
                  <p>Pracujemy lokalnie, ale prowadzimy proces end-to-end. Dostajesz strategię, egzekucję i bezpieczny finał sprzedaży.</p>
                </div>
              </div>
              <form className="form">
                <label>Imię i nazwisko<input type="text" placeholder="Jan Kowalski" required /></label>
                <label>E-mail<input type="email" placeholder="jan@email.com" required /></label>
                <label>Telefon<input type="tel" placeholder="+48 000 000 000" required /></label>
                <label>Miasto / dzielnica<input type="text" placeholder="Warszawa, Mokotów" required /></label>
                <label>Krótki opis mieszkania i sytuacji<textarea rows={4} placeholder="Metraż, liczba pokoi, standard, planowany termin sprzedaży..." /></label>
                <button type="submit">
                  <span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Wyślij zapytanie</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Wyślij zapytanie</span></span>
                  <span className="sr-only">Wyślij zapytanie</span>
                  <span className="prefooter-btn-arrow" aria-hidden="true">→</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <div className="footer-stack">
        <section className="prefooter-stage" aria-label="Sekcja końcowa">
          <div className="prefooter-sticky">
            <div className="prefooter-shell">
              <p className="prefooter-kicker">Koniec przewijania? Zróbmy pierwszy krok.</p>
              <h2>Sprzedaj mieszkanie spokojnie i na dobrych warunkach.</h2>
              <a href="#kontakt" className="prefooter-btn"><span className="prefooter-btn-text-wrap" aria-hidden="true"><span className="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span><span className="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span></span><span className="sr-only">Umów konsultację</span><span className="prefooter-btn-arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="container footer-shell">
            <div className="footer-brand"><a href="/" className="footer-logo" aria-label="FIND home"><img src="/LOGO.png" alt="FIND" /></a><p className="footer-copy">Eksperckie wsparcie właściciela mieszkania: od strategii ceny po bezpieczny podpis.</p></div>
            <div className="footer-links"><a href="/">Główna</a><a href="/o-mnie">O mnie</a><a href="/bledy">Błędy</a><a href="/poradnik">Poradnik</a><a href="/kalkulator">Kalkulator</a></div>
            <div className="footer-social"><a href="#" aria-label="Instagram"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4.1"></circle><circle cx="17.35" cy="6.65" r="1"></circle></svg></span>Instagram</a><a href="#" aria-label="Facebook"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M14.2 8.1h2.2V4.5h-2.6c-3 0-4.6 1.8-4.6 4.9v2H6.8v3.7h2.4V20h3.8v-4.9h2.9l.5-3.7h-3.4V9.8c0-1 .4-1.7 1.6-1.7Z"></path></svg></span>Facebook</a><a href="#" aria-label="LinkedIn"><span className="social-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="9.2" width="3.4" height="10.8"></rect><circle cx="5.7" cy="5.8" r="1.6"></circle><path d="M10 9.2h3.3v1.5c.6-1 1.8-1.8 3.6-1.8 3 0 4.1 2 4.1 5.1V20h-3.5v-5.3c0-1.7-.6-2.6-1.9-2.6-1.5 0-2.2 1.1-2.2 2.6V20H10V9.2Z"></path></svg></span>LinkedIn</a></div>
          </div>
          <div className="container footer-bottom"><p>© {year} FIND. Wszelkie prawa zastrzeżone.</p></div>
        </footer>
      </div>

      <button className="to-top" type="button" aria-label="Wróć na górę" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span aria-hidden="true">↑</span></button>
    </>
  );
}

