/**
 * Odfiltrowuje developerskie tresci seedowane w Strapi — na froncie pokazujemy fallback z kodu.
 */
const CMS_DEV_PLACEHOLDER_SNIPPETS = [
  "[twoje imię]",
  "to jest testowa tresc dla strony glownej",
  "to jest testowy artykul blogowy nr 1",
  "to jest testowy artykul blogowy nr 2",
  "testowy lead z cms dla strony glownej",
  "testowe dane cms dla projektu nieruchomosci",
  "testowe dane z cms",
  "testowe dane og z cms",
  "testowe dane dla lejka",
  "testowa kategoria poradnikowa",
  "testowa kategoria inwestycyjna",
  "tresc testowa do sprawdzenia renderu dynamicznego",
  "testow integracji",
  "sekcje, cta",
  "seo landing",
  "wersja developerska",
  "seedowane",
  "example.local",
  "do developmentu",
  "do sprawdzenia renderu",
  "wystarczajace do developmentu",
  "treść artykułu z cms",
  "tresc artykulu z cms",
  "blog / cms",
  "jan testowy",
];

export function isCmsDevPlaceholder(value?: string | null): boolean {
  if (!value?.trim()) {
    return true;
  }

  const normalized = value.toLowerCase();
  return CMS_DEV_PLACEHOLDER_SNIPPETS.some((snippet) => normalized.includes(snippet));
}

export function resolveCmsText(cmsValue: string | null | undefined, fallback: string): string {
  if (isCmsDevPlaceholder(cmsValue)) {
    return fallback;
  }

  return cmsValue!.trim();
}

function hasCmsValue(value?: string | null): value is string {
  return Boolean(value?.trim());
}

export function isUsableCmsBlogPost(post: {
  title?: string;
  excerpt?: string;
  content?: string;
  slug?: string;
}): boolean {
  if (!post.slug?.trim() || !post.title?.trim() || !post.content?.trim()) {
    return false;
  }

  if (
    isCmsDevPlaceholder(post.title) ||
    isCmsDevPlaceholder(post.content) ||
    (hasCmsValue(post.excerpt) && isCmsDevPlaceholder(post.excerpt))
  ) {
    return false;
  }

  return true;
}
