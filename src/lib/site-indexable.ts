/**
 * Controls whether the deployment should be indexed by search engines.
 * - Production: indexable unless opted out via env.
 * - Vercel preview URLs: not indexable by default (VERCEL_ENV=preview).
 * - Staging: set NEXT_PUBLIC_SITE_INDEXABLE=false.
 */
export function isSiteIndexable(): boolean {
  const explicit = process.env.NEXT_PUBLIC_SITE_INDEXABLE?.trim().toLowerCase();
  if (explicit === "false" || explicit === "0") {
    return false;
  }
  if (explicit === "true" || explicit === "1") {
    return true;
  }
  if (process.env.VERCEL_ENV === "preview") {
    return false;
  }
  return true;
}
