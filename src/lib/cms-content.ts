/**
 * Odfiltrowuje developerskie tresci seedowane w Strapi — na froncie pokazujemy fallback z kodu.
 */
const CMS_DEV_PLACEHOLDER_VALUES = new Set([
  "testowy lead z cms dla strony glownej",
  "to jest testowa tresc dla strony glownej",
  "testowe dane z cms",
  "tresc artykulu z cms",
]);

const CMS_DEV_PLACEHOLDER_PATTERNS = [
  /^to jest testowy artykul blogowy nr \d+$/,
  /\[twoje imie\]/,
  /testow integracji/,
  /sekcje, cta/,
  /seo landing/,
  /developersk/,
  /seedowane/,
  /example\.local/,
  /wersja developerska/,
  /do developmentu/,
  /do sprawdzenia renderu/,
  /wystarczajace do developmentu/,
  /blog \/ cms/,
  /jan testowy/,
];

function normalizeCmsText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

export function isCmsDevPlaceholder(value?: string | null): boolean {
  if (!value?.trim()) {
    return true;
  }

  const normalized = normalizeCmsText(value);
  const normalizedWithoutTerminalPunctuation = normalized.replace(/[.!?]+$/g, "");

  return (
    CMS_DEV_PLACEHOLDER_VALUES.has(normalizedWithoutTerminalPunctuation) ||
    CMS_DEV_PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(normalizedWithoutTerminalPunctuation))
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
