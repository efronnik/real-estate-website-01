/**
 * Odfiltrowuje developerskie tresci seedowane w Strapi — na froncie pokazujemy fallback z kodu.
 */
const CMS_DEV_PLACEHOLDER_VALUES = [
  "testowy lead z cms dla strony glownej.",
  "to jest testowa tresc dla strony glownej. dane sa automatycznie seedowane podczas developmentu.",
  "testowe dane z cms",
  "testowe dane dla lejka inwestora.",
  "tresc testowa do sprawdzenia renderu dynamicznego.",
  "to jest testowy artykul blogowy nr 2.",
  "to jest testowy artykul blogowy nr 2. dane sa wystarczajace do developmentu.",
];

const CMS_DEV_PLACEHOLDER_SNIPPETS = [
  "[twoje imię]",
  "eksperckie prowadzenie sprzedaży",
  "szkieletem",
  "testow integracji",
  "sekcje, cta",
  "seo landing",
  "developersk",
  "seedowane podczas developmentu",
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

  const normalized = value.trim().toLowerCase();
  return CMS_DEV_PLACEHOLDER_VALUES.includes(normalized) || CMS_DEV_PLACEHOLDER_SNIPPETS.some((snippet) => normalized.includes(snippet));
}

export function resolveCmsText(cmsValue: string | null | undefined, fallback: string): string {
  if (isCmsDevPlaceholder(cmsValue)) {
    return fallback;
  }

  return cmsValue!.trim();
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

  if (isCmsDevPlaceholder(post.title)) {
    return false;
  }

  if (post.excerpt?.trim() && isCmsDevPlaceholder(post.excerpt)) {
    return false;
  }

  if (post.content?.trim() && isCmsDevPlaceholder(post.content)) {
    return false;
  }

  return true;
}
