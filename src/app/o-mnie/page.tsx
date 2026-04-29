import type { Metadata } from "next";
import { AboutPageClient } from "@/components/about-page-client";
import { fetchCmsPageBySlug, getPageMetadataFromCms } from "@/lib/cms";

const fallbackMetadata: Metadata = {
  title: "O mnie | FIND",
  description: "Ekspercki profil i podejście do sprzedaży nieruchomości: strategia, negocjacje i bezpieczna finalizacja procesu.",
};

export async function generateMetadata(): Promise<Metadata> {
  const cmsMetadata = await getPageMetadataFromCms("o-mnie", "/o-mnie");
  if (!cmsMetadata) {
    return fallbackMetadata;
  }
  return cmsMetadata;
}

export default async function AboutPage() {
  const cmsPage = await fetchCmsPageBySlug("o-mnie");
  return (
    <AboutPageClient
      cmsHeadline={cmsPage?.headline ?? null}
      cmsLead={cmsPage?.lead ?? null}
      cmsContent={cmsPage?.content ?? null}
    />
  );
}

