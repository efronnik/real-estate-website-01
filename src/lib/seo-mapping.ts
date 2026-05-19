export type KeySeoPage = "glowna" | "sprzedaz" | "inwestycje" | "o-mnie" | "kontakt" | "blog";

type SeoMappingEntry = {
  cmsSlug: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
};

export const KEY_SEO_PAGE_MAPPING: Record<KeySeoPage, SeoMappingEntry> = {
  glowna: {
    cmsSlug: "glowna",
    path: "/",
    title: "FIND - Sprzedaj mieszkanie",
    description: "Sprzedaż mieszkania bez chaosu, z planem i pełnym wsparciem.",
    type: "website",
  },
  sprzedaz: {
    cmsSlug: "sprzedaz",
    path: "/sprzedaz",
    title: "Sprzedaz nieruchomosci | FIND",
    description:
      "Sprzedaż mieszkania z wyceną opartą o ceny transakcyjne, program Wyceny 5 Kroków i bezpłatną wycenę online.",
    type: "website",
  },
  inwestycje: {
    cmsSlug: "inwestycje",
    path: "/inwestycje",
    title: "Inwestowanie w nieruchomosci Warszawa – flipy mieszkan | FIND",
    description:
      "Flip nieruchomosci Warszawa: okazje inwestycyjne, remont, wycena mieszkania i pelna obsluga od zakupu do sprzedazy. Bezpłatna konsultacja inwestycyjna.",
    type: "website",
  },
  "o-mnie": {
    cmsSlug: "o-mnie",
    path: "/o-mnie",
    title: "O mnie | Patrycja Szewczyk · Kompas",
    description:
      "Patrycja Szewczyk — ponad 17 lat w sprzedaży i inwestowaniu w nieruchomości w Warszawie. Butikowa agencja Kompas: flipy, remonty, home staging, model 1:1.",
    type: "website",
  },
  kontakt: {
    cmsSlug: "kontakt",
    path: "/kontakt",
    title: "Kontakt | FIND",
    description: "Skontaktuj sie, aby omowic sprzedaz lub inwestowanie w nieruchomosci. Krotka konsultacja i konkretny plan dalszych dzialan.",
    type: "website",
  },
  blog: {
    cmsSlug: "blog",
    path: "/blog",
    title: "Blog | FIND",
    description: "Blog o sprzedaży i inwestowaniu w nieruchomości: strategie, negocjacje, dokumenty i decyzje oparte na danych.",
    type: "website",
  },
};
