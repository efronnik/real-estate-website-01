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
  "w kolejnym kroku",
  "testowy",
  "testowa",
  "testowe",
  "z cms",
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
