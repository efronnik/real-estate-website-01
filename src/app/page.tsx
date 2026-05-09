import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";
import {
  fetchCmsFeaturedTestimonials,
  fetchCmsPageBySlug,
  safeCmsCall,
} from "@/lib/cms";
import { resolveKeyPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return resolveKeyPageMetadata("glowna");
}

export default async function Home() {
  const [cmsPage, cmsTestimonials] = await Promise.all([
    safeCmsCall(() => fetchCmsPageBySlug("glowna"), null),
    safeCmsCall(fetchCmsFeaturedTestimonials, []),
  ]);
  return <HomePageClient cmsPage={cmsPage} cmsTestimonials={cmsTestimonials} />;
}
