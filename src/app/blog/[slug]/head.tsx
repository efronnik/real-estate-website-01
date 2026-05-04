import { fetchCmsBlogPostBySlug, getBlogPostMetadataFromCms } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type BlogPostHeadProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Head({ params }: BlogPostHeadProps) {
  const resolved = await params;
  const slug = resolved.slug;
  const cmsMetadata = await getBlogPostMetadataFromCms(slug);
  const cmsPost = await fetchCmsBlogPostBySlug(slug);

  const title =
    cmsMetadata?.title ??
    (cmsPost?.title ? `${cmsPost.title} | Blog FIND` : "Artykul blogowy | FIND");
  const description =
    cmsMetadata?.description ??
    cmsPost?.excerpt ??
    "Artykul ekspercki o sprzedazy i inwestowaniu w nieruchomosci.";
  const canonical = cmsMetadata?.alternates?.canonical ?? `${SITE_URL}/blog/${slug}`;
  const ogTitle = cmsMetadata?.openGraph?.title ?? title;
  const ogDescription = cmsMetadata?.openGraph?.description ?? description;
  const ogUrl = cmsMetadata?.openGraph?.url ?? canonical;
  const ogImage = cmsMetadata?.openGraph?.images?.[0]?.url;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={ogUrl} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
    </>
  );
}
