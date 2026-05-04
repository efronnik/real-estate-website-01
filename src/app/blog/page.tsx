"use client";

import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteTopbar } from "@/components/site-topbar";
import { Prefooter } from "@/components/prefooter";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { ROUTE_PATHS } from "@/config/navigation";
import { fetchCmsBlogPosts, type CmsBlogPostRecord, fetchCmsPageBySlug } from "@/lib/cms";

const blogPaths = [
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
    cta: "Czytaj blog",
  },
];

function getCmsCategoryLabel(post: CmsBlogPostRecord): string {
  return post.category?.name ?? post.category?.attributes?.name ?? "Blog / CMS";
}

export default function BlogPage() {
  const [cmsPosts, setCmsPosts] = useState<CmsBlogPostRecord[]>([]);
  const [heroHeadline, setHeroHeadline] = useState<string | null>(null);
  const [heroLead, setHeroLead] = useState<string | null>(null);
  const listPosts = useMemo(() => {
    if (!cmsPosts.length) return posts;
    return cmsPosts
      .filter((post) => Boolean(post.slug) && Boolean(post.title))
      .map((post, idx) => ({
        slug: post.slug as string,
        title: post.title as string,
        excerpt: post.excerpt ?? "Artykuł ekspercki o sprzedaży i inwestowaniu w nieruchomości.",
        image: posts[idx % posts.length].image,
        meta: getCmsCategoryLabel(post),
        cta: "Czytaj artykuł",
      }));
  }, [cmsPosts]);
  const featuredPost = listPosts[0];
  const sidePosts = listPosts.slice(1);
  const year = new Date().getFullYear();

  useEffect(() => {
    let mounted = true;
    const loadCmsData = async () => {
      const [blogPosts, blogPage] = await Promise.all([
        fetchCmsBlogPosts(),
        fetchCmsPageBySlug("blog"),
      ]);
      if (!mounted) return;
      setCmsPosts(blogPosts);
      setHeroHeadline(blogPage?.headline ?? null);
      setHeroLead(blogPage?.lead ?? null);
    };
    void loadCmsData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <main>
        <SiteTopbar />

        <section className="section blog-hero">
          <video className="blog-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/Hero-Blog.mp4" type="video/mp4" />
          </video>
          <div className="blog-hero-overlay" aria-hidden="true"></div>
          <div className="container blog-hero-shell">
            <p className="eyebrow">Blog</p>
            <h1 className="section-title">{heroHeadline ?? "Blog sprzedaży mieszkania"}</h1>
            <p className="section-copy">{heroLead ?? "Zebrane w jednym miejscu: wycena, przygotowanie oferty, dokumenty, podatki i negocjacje. Treści ułożone tak, aby przeprowadzić Cię od decyzji o sprzedaży do bezpiecznej finalizacji."}</p>
          </div>
        </section>

        <section id="blog" className="section blog">
          <div className="container">
            <header className="process-head">
              <p className="eyebrow">Lista artykułów</p>
              <h2 className="section-title">Najnowsze materiały: sprzedaż, negocjacje i finalizacja</h2>
            </header>
            <div className="editorial editorial--full-bleed">
              <div className="editorial-bg" style={{ backgroundImage: `url(${featuredPost?.image ?? posts[0].image})` }}>
                <div className="scan-lines" aria-hidden="true"></div>
                <div className="scan-lines-right" aria-hidden="true"></div>
                <article className="featured-copy">
                  <p className="meta">{featuredPost?.meta ?? "Blog / CMS"}</p>
                  <h3>{featuredPost?.title ?? "Brak artykułów"}</h3>
                  <p>{featuredPost?.excerpt ?? "Dodaj pierwszy wpis w Strapi, aby wyświetlić go na stronie."}</p>
                  {featuredPost?.slug ? (
                    <a href={`/blog/${featuredPost.slug}`} className="link-arrow">{featuredPost.cta}</a>
                  ) : null}
                </article>
                <div className="dock">
                  {sidePosts.map((post) => (
                    <article key={post.title} className="dock-card">
                      <div className="dock-thumb" style={{ backgroundImage: `url(${post.image})` }}></div>
                      <div className="dock-copy">
                        <p className="meta">{post.meta}</p>
                        <h4>{post.title}</h4>
                        <a href={`/blog/${post.slug}`} className="link-arrow">{post.cta}</a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section process blog-process">
          <div className="container">
            <header className="process-head">
              <p className="eyebrow">Jak korzystać z bloga</p>
              <h2 className="section-title">Ścieżki czytania zamiast listy błędów</h2>
            </header>
          </div>
          <div className="service-board">
            {blogPaths.map((step) => (
              <article key={step.title} className="service-row" style={{ ["--bg" as string]: `url(${step.image})` }}>
                <div className="service-info"><p className="idx"><span className="idx-text">{step.label}</span></p><h3>{step.title}</h3><p>{step.text}</p></div>
                <div className="service-word"><span>{step.hero}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section blog-structure">
          <div className="container">
            <div className="surface faq-box">
              <h2>FAQ i kolejne kroki po lekturze</h2>
              <h3>FAQ: najczęstsze pytania właścicieli mieszkań</h3>
              <article className="faq-item"><h4>Od czego zacząć sprzedaż mieszkania, żeby nie tracić czasu?</h4><p>Zacznij od krótkiego audytu: realna cena startowa, plan przygotowania mieszkania i harmonogram publikacji. Bez tej kolejności ogłoszenie często trafia na rynek zbyt wcześnie i od razu traci dynamikę.</p></article>
              <article className="faq-item"><h4>Ile czasu dać ofercie, zanim zmieniać cenę?</h4><p>Najpierw analizuj dane z pierwszych 7-14 dni: liczba zapytań, jakość rozmów i reakcje po prezentacjach. Dopiero na tej podstawie podejmuj decyzję o korekcie ceny, zdjęć albo opisu.</p></article>
              <article className="faq-item"><h4>Jakie dokumenty przygotować przed publikacją ogłoszenia?</h4><p>Minimum to komplet dokumentów własności i dokumentów potrzebnych do bezpiecznej finalizacji. Im wcześniej to zrobisz, tym mniejsze ryzyko opóźnień oraz słabszej pozycji negocjacyjnej pod koniec procesu.</p></article>
              <article className="faq-item"><h4>Czy home staging i profesjonalne zdjęcia naprawdę robią różnicę?</h4><p>Tak, bo pierwsza decyzja kupującego zapada w ogłoszeniu. Dobrze przygotowane wnętrze i spójne zdjęcia podnoszą liczbę jakościowych zapytań i skracają czas dochodzenia do spotkania.</p></article>
              <article className="faq-item"><h4>Jak negocjować, żeby nie oddać ceny na starcie?</h4><p>Ustal przed rozmowami warunki graniczne i kolejność ustępstw. Dzięki temu odpowiadasz spokojnie na presję kupującego i bronisz ceny argumentami, a nie emocjami.</p></article>
              <article className="faq-item"><h4>Kiedy warto skonsultować sprzedaż z ekspertem?</h4><p>Najlepiej na starcie albo wtedy, gdy oferta jest aktywna, ale nie daje efektu. To momenty, w których zmiana strategii najszybciej poprawia wynik sprzedaży i ogranicza koszt czasu.</p></article>
            </div>
            <div className="surface faq-box">
              <h3>Przejdź do właściwej ścieżki działania</h3>
              <p>
                Po lekturze artykułów możesz od razu przejść do odpowiedniego lejka i zostawić lead.
              </p>
              <p className="section-copy">
                <a href={`${ROUTE_PATHS.sprzedaz}#wycena`}>Sprzedaż: formularz wyceny</a>
                {" | "}
                <a href={`${ROUTE_PATHS.kontakt}#kontakt`}>Kontakt: konsultacja 1:1</a>
                {" | "}
                <a href={ROUTE_PATHS.inwestycje}>Inwestycje: ścieżka inwestora</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <div className="footer-stack">
        <Prefooter
          tall
          extraClassName="blog-prefooter"
          kicker="Potrzebujesz strategii dopasowanej do Twojego mieszkania?"
          title="Umów krótką rozmowę i sprawdźmy, jakie działania najszybciej poprawią wynik sprzedaży."
          buttons={[
            { href: `${ROUTE_PATHS.kontakt}#kontakt`, label: "Umów konsultację" },
            { href: `${ROUTE_PATHS.sprzedaz}#wycena`, label: "Wyceń nieruchomość" },
          ]}
        />
        <SiteFooter year={year} />
      </div>
      <ScrollToTopButton />
    </>
  );
}

