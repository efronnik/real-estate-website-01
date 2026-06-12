/**
 * Odfiltrowuje developerskie tresci seedowane w Strapi — na froncie pokazujemy fallback z kodu.
 */
const CMS_DEV_PLACEHOLDER_VALUES = new Set([
  "testowy lead z cms dla strony glownej.",
  "to jest testowa tresc dla strony glownej.",
  "testowe dane z cms",
  "to jest testowy artykul blogowy nr 2.",
]);

const CMS_DEV_PLACEHOLDER_SNIPPETS = [
  "[twoje imię]",
  "testow integracji",
  "sekcje, cta",
  "seo landing",
  "example.local",
  "wersja developerska",
  "do developmentu",
  "do sprawdzenia renderu",
  "wystarczajace do developmentu",
  "treść artykułu z cms",
  "tresc artykulu z cms",
  "blog / cms",
  "jan testowy",
  "artykul renderowany z frontendu (prose). pelna tresc w kodzie aplikacji.",
];

export function isCmsDevPlaceholder(value?: string | null): boolean {
  if (!value?.trim()) {
    return true;
  }

  const normalized = value.toLowerCase().replace(/\s+/g, " ").trim();
  return (
    CMS_DEV_PLACEHOLDER_VALUES.has(normalized) ||
    CMS_DEV_PLACEHOLDER_SNIPPETS.some((snippet) => normalized.includes(snippet))
  );
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

  if (isCmsDevPlaceholder(post.title) || isCmsDevPlaceholder(post.excerpt) || isCmsDevPlaceholder(post.content)) {
    return false;
  }

  return true;
}
