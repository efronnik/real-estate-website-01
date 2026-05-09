import { resolveKeyPageMetadata } from "@/lib/page-metadata";

export default async function Head() {
  const metadata = await resolveKeyPageMetadata("blog");
  const title = typeof metadata.title === "string" ? metadata.title : "Blog | FIND";
  const description = metadata.description ?? "";
  const canonical = metadata.alternates?.canonical;
  const ogTitle = metadata.openGraph?.title ?? title;
  const ogDescription = metadata.openGraph?.description ?? description;
  const ogUrl = metadata.openGraph?.url ?? canonical;

  return (
    <>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {canonical ? <link rel="canonical" href={canonical.toString()} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle.toString()} />
      <meta property="og:description" content={ogDescription.toString()} />
      {ogUrl ? <meta property="og:url" content={ogUrl.toString()} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
