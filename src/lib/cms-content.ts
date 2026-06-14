/**
 * Odfiltrowuje developerskie tresci seedowane w Strapi — na froncie pokazujemy fallback z kodu.
 */
const CMS_DEV_PLACEHOLDER_SNIPPETS = [
  "[twoje imię]",
  "eksperckie prowadzenie sprzedaży",
  "szkieletem",
  "testow integracji",
  "testowe dane",
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

function hasCmsDevPlaceholder(value?: string | null): boolean {
  return Boolean(value?.trim()) && isCmsDevPlaceholder(value);
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
  if (!post.slug?.trim() || !post.title?.trim() || !post.content?.trim()) {
    return false;
  }

  if (
    hasCmsDevPlaceholder(post.title) ||
    hasCmsDevPlaceholder(post.excerpt) ||
    hasCmsDevPlaceholder(post.content)
  ) {
    return false;
  }

  return true;
}
