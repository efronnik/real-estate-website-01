import { getPageMetadataFromCms } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function Head() {
  const cmsMetadata = await getPageMetadataFromCms("blog", "/blog");
  const title = cmsMetadata?.title ?? "Blog nieruchomosci | FIND";
  const description =
    cmsMetadata?.description ??
    "Artykuly o sprzedazy i inwestowaniu w nieruchomosci: wycena, negocjacje, formalnosci i strategie decyzji.";
  const canonical = cmsMetadata?.alternates?.canonical ?? `${SITE_URL}/blog`;
  const ogTitle = cmsMetadata?.openGraph?.title ?? title;
  const ogDescription = cmsMetadata?.openGraph?.description ?? description;
  const ogUrl = cmsMetadata?.openGraph?.url ?? canonical;
  const ogImage = cmsMetadata?.openGraph?.images?.[0]?.url;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={ogUrl} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
    </>
  );
}
