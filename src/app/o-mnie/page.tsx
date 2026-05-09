import type { Metadata } from "next";
import { AboutPageClient } from "@/components/about-page-client";
import { fetchCmsPageBySlug, safeCmsCall } from "@/lib/cms";
import { resolveKeyPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return resolveKeyPageMetadata("o-mnie");
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

