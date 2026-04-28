import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";
import { fetchCmsPageBySlug, getHomePageMetadataFromCms } from "@/lib/cms";

const fallbackMetadata: Metadata = {
  title: "FIND - Sprzedaj mieszkanie",
  description: "Sprzedaż mieszkania bez chaosu, z planem i pełnym wsparciem.",
};

export async function generateMetadata(): Promise<Metadata> {
  const cmsMetadata = await getHomePageMetadataFromCms();
  if (!cmsMetadata) {
    return fallbackMetadata;
  }
  return cmsMetadata;
}

export default async function Home() {
  const cmsPage = await fetchCmsPageBySlug("glowna");
  return <HomePageClient cmsPage={cmsPage} />;
}
