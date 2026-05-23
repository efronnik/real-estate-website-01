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

const CMS_DEV_CANONICAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1", "example.local"]);

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

export function resolveCmsCanonicalUrl(cmsCanonicalUrl: string | null | undefined, fallbackCanonical: string): string {
  const canonical = cmsCanonicalUrl?.trim();
  if (!canonical) {
    return fallbackCanonical;
  }

  try {
    const parsed = new URL(canonical);
    const hostname = parsed.hostname.toLowerCase();
    if (CMS_DEV_CANONICAL_HOSTS.has(hostname)) {
      return fallbackCanonical;
    }
  } catch {
    return fallbackCanonical;
  }

  return canonical;
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
