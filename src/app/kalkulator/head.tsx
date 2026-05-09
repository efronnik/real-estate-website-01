import { buildStaticMetadata } from "@/lib/seo";

export default function Head() {
  const metadata = buildStaticMetadata({
    title: "Kalkulator wyceny mieszkania | FIND",
    description:
      "Szybki kalkulator wartości mieszkania: orientacyjna wycena na podstawie metrażu, liczby pokoi, stanu i lokalizacji.",
    path: "/kalkulator",
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
