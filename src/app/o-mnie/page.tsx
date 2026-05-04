import type { Metadata } from "next";
import { AboutPageClient } from "@/components/about-page-client";
import { fetchCmsPageBySlug, getPageMetadataFromCms, safeCmsCall } from "@/lib/cms";

const fallbackMetadata: Metadata = {
  title: "O mnie | FIND",
  description: "Ekspercki profil i podejście do sprzedaży nieruchomości: strategia, negocjacje i bezpieczna finalizacja procesu.",
};

export async function generateMetadata(): Promise<Metadata> {
  const cmsMetadata = await safeCmsCall(() => getPageMetadataFromCms("o-mnie", "/o-mnie"), null);
  if (!cmsMetadata) {
    return fallbackMetadata;
  }
  return cmsMetadata;
}

export default async function AboutPage() {
  const cmsPage = await safeCmsCall(() => fetchCmsPageBySlug("o-mnie"), null);
  return (
    <AboutPageClient
      cmsHeadline={cmsPage?.headline ?? null}
      cmsLead={cmsPage?.lead ?? null}
      cmsContent={cmsPage?.content ?? null}
    />
  );
}

