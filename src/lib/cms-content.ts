/**
 * Odfiltrowuje developerskie tresci seedowane w Strapi — na froncie pokazujemy fallback z kodu.
 */
const CMS_DEV_PLACEHOLDER_VALUES = new Set([
  "testowy lead z cms dla strony glownej.",
  "to jest testowa tresc dla strony glownej.",
  "testowe dane z cms",
  "testowe dane",
  "to jest testowy artykul blogowy nr 2.",
  "artykul renderowany z frontendu (prose). pelna tresc w kodzie aplikacji.",
  "treść artykułu z cms",
  "tresc artykulu z cms",
  "blog / cms",
  "jan testowy",
  "wersja developerska",
  "do developmentu",
  "do sprawdzenia renderu",
  "wystarczajace do developmentu",
]);

const CMS_DEV_PLACEHOLDER_MARKERS = ["[twoje imię]", "example.local"];

function normalizeCmsText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isCmsDevPlaceholder(value?: string | null): boolean {
  if (!value?.trim()) {
    return true;
  }

  const normalized = normalizeCmsText(value);
  return (
    CMS_DEV_PLACEHOLDER_VALUES.has(normalized) ||
    CMS_DEV_PLACEHOLDER_MARKERS.some((marker) => normalized.includes(marker))
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
  return isUsableCmsBlogSummary(post) && hasUsableCmsBlogContent(post);
}

export function isUsableCmsBlogSummary(post: {
  title?: string;
  excerpt?: string;
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

  return true;
}

export function hasUsableCmsBlogContent(post: { content?: string }): boolean {
  return Boolean(post.content?.trim()) && !isCmsDevPlaceholder(post.content);
}
