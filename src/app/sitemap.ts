import type { MetadataRoute } from "next";
import { ROUTE_PATHS } from "@/config/navigation";
import { fetchCmsBlogPosts, safeCmsCall } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo";

const STATIC_ROUTES: string[] = [
  ROUTE_PATHS.home,
  ROUTE_PATHS.about,
  ROUTE_PATHS.sprzedaz,
  ROUTE_PATHS.inwestycje,
  ROUTE_PATHS.katalogOfert,
  ROUTE_PATHS.homeStaging,
  ROUTE_PATHS.kredytyHipoteczne,
  ROUTE_PATHS.bledy,
  ROUTE_PATHS.blog,
  ROUTE_PATHS.kalkulator,
  ROUTE_PATHS.kontakt,
  ROUTE_PATHS.politykaPrywatnosci,
  ROUTE_PATHS.rodo,
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === ROUTE_PATHS.home ? "daily" : "weekly",
    priority: path === ROUTE_PATHS.home ? 1 : 0.7,
  }));

  const posts = await safeCmsCall(fetchCmsBlogPosts, []);
  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries];
}
