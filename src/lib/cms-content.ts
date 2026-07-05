/**
 * Odfiltrowuje developerskie tresci seedowane w Strapi — na froncie pokazujemy fallback z kodu.
 */
const CMS_DEV_PLACEHOLDER_SNIPPETS = [
  "[twoje imię]",
  "testow integracji",
  "testowe dane",
  "testowy lead z cms dla strony glownej",
  "to jest testowa tresc dla strony glownej",
  "testowa kategoria poradnikowa",
  "testowa kategoria inwestycyjna",
  "testowe dane dla lejka inwestora",
  "tresc testowa do sprawdzenia renderu dynamicznego",
  "to jest testowy artykul blogowy nr 2",
  "eksperckie prowadzenie sprzedaży",
  "szkieletem",
  "sekcje, cta",
  "seo landing",
  "developersk",
  "seedowane",
  "example.local",
  "wersja developerska",
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

function hasNonEmptyCmsDevPlaceholder(value?: string | null): boolean {
  return Boolean(value?.trim()) && isCmsDevPlaceholder(value);
}

export function isUsableCmsBlogPost(post: {
  title?: string;
  excerpt?: string;
  content?: string;
  slug?: string;
}): boolean {
  if (!post.slug?.trim() || !post.title?.trim()) {
    return false;
  }

  if (
    isCmsDevPlaceholder(post.title) ||
    hasNonEmptyCmsDevPlaceholder(post.excerpt) ||
    hasNonEmptyCmsDevPlaceholder(post.content)
  ) {
    return false;
  }

  return true;
}
