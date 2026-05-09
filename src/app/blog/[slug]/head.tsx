import { resolveBlogPostMetadata } from "@/lib/page-metadata";

type HeadProps = {
  params: Promise<{ slug: string }>;
};

export default async function Head({ params }: HeadProps) {
  const { slug } = await params;
  const metadata = await resolveBlogPostMetadata(slug);
  const title = typeof metadata.title === "string" ? metadata.title : "Artykul blogowy | FIND";
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
      <meta property="og:type" content="article" />
      <meta property="og:title" content={ogTitle.toString()} />
      <meta property="og:description" content={ogDescription.toString()} />
      {ogUrl ? <meta property="og:url" content={ogUrl.toString()} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
