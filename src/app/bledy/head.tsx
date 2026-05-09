import { buildStaticMetadata } from "@/lib/seo";

export default function Head() {
  const metadata = buildStaticMetadata({
    title: "Błędy przy sprzedaży mieszkania | FIND",
    description:
      "Najczęstsze błędy właścicieli przy sprzedaży mieszkania i checklista działań, która pomaga odzyskać kontrolę nad procesem.",
    path: "/bledy",
  });

  return (
    <>
      <title>{metadata.title as string}</title>
      <meta name="description" content={metadata.description ?? ""} />
      <link rel="canonical" href={metadata.alternates?.canonical as string} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metadata.openGraph?.title as string} />
      <meta property="og:description" content={metadata.openGraph?.description as string} />
      <meta property="og:url" content={metadata.openGraph?.url as string} />
    </>
  );
}
