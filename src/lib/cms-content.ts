/**
 * Odfiltrowuje developerskie tresci seedowane w Strapi — na froncie pokazujemy fallback z kodu.
 */
const CMS_DEV_PLACEHOLDER_VALUES = new Set([
  "testowy lead z cms dla strony glownej.",
  "to jest testowa tresc dla strony glownej.",
  "to jest testowa tresc dla strony glownej. dane sa automatycznie seedowane podczas developmentu.",
  "testowe dane z cms",
  "testowe dane",
  "testowe dane dla lejka inwestora.",
  "tresc testowa do sprawdzenia renderu dynamicznego.",
  "to jest testowy artykul blogowy nr 2.",
  "to jest testowy artykul blogowy nr 2. dane sa wystarczajace do developmentu.",
  "wersja developerska",
  "do developmentu",
  "do sprawdzenia renderu",
  "wystarczajace do developmentu",
  "treść artykułu z cms",
  "tresc artykulu z cms",
  "blog / cms",
  "jan testowy",
  "ta strona jest gotowym szkieletem pod oferte sprzedazy, leady i cta. w kolejnym kroku uzupelnimy ja finalna trescia oraz formularzem wyceny.",
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
  if (!post.slug?.trim() || !post.title?.trim()) {
    return false;
  }

  if (
    isCmsDevPlaceholder(post.title) ||
    (Boolean(post.excerpt?.trim()) && isCmsDevPlaceholder(post.excerpt)) ||
    isCmsDevPlaceholder(post.content)
  ) {
    return false;
  }

  return true;
}
