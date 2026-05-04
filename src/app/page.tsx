import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";
import {
  fetchCmsFeaturedTestimonials,
  fetchCmsPageBySlug,
  getHomePageMetadataFromCms,
  safeCmsCall,
} from "@/lib/cms";

const fallbackMetadata: Metadata = {
  title: "FIND - Sprzedaj mieszkanie",
  description: "Sprzedaż mieszkania bez chaosu, z planem i pełnym wsparciem.",
};

export async function generateMetadata(): Promise<Metadata> {
  const cmsMetadata = await safeCmsCall(getHomePageMetadataFromCms, null);
  if (!cmsMetadata) {
    return fallbackMetadata;
  }
  return cmsMetadata;
}

export default async function Home() {
  const [cmsPage, cmsTestimonials] = await Promise.all([
    safeCmsCall(() => fetchCmsPageBySlug("glowna"), null),
    safeCmsCall(fetchCmsFeaturedTestimonials, []),
  ]);
  return <HomePageClient cmsPage={cmsPage} cmsTestimonials={cmsTestimonials} />;
}
