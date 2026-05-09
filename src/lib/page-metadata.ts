import type { Metadata } from "next";
import { getBlogPostMetadataFromCms, getPageMetadataFromCms, safeCmsCall } from "@/lib/cms";
import { KEY_SEO_PAGE_MAPPING, type KeySeoPage } from "@/lib/seo-mapping";
import { buildStaticMetadata } from "@/lib/seo";

function fallbackMetadataForKey(key: KeySeoPage): Metadata {
  const mapping = KEY_SEO_PAGE_MAPPING[key];
  return buildStaticMetadata({
    title: mapping.title,
    description: mapping.description,
    path: mapping.path,
    type: mapping.type ?? "website",
  });
}

export async function resolveKeyPageMetadata(key: KeySeoPage): Promise<Metadata> {
  const mapping = KEY_SEO_PAGE_MAPPING[key];
  const fallback = fallbackMetadataForKey(key);
  const cmsMetadata = await safeCmsCall(
    () => getPageMetadataFromCms(mapping.cmsSlug, mapping.path),
    null,
  );
  return cmsMetadata ?? fallback;
}

export async function resolveBlogPostMetadata(slug: string): Promise<Metadata> {
  const fallback = buildStaticMetadata({
    title: "Artykul blogowy | FIND",
    description: "Artykul o sprzedazy i inwestowaniu w nieruchomosci.",
    path: `/blog/${slug}`,
    type: "article",
  });
  const cmsMetadata = await safeCmsCall(() => getBlogPostMetadataFromCms(slug), null);
  return cmsMetadata ?? fallback;
}
