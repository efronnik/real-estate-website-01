const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export type CmsPageRecord = {
  title?: string;
  slug?: string;
  headline?: string;
  lead?: string;
  content?: string;
  seo?: CmsSeoRecord | null;
};

export type CmsSeoRecord = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: {
    url?: string;
  } | null;
};

export type CmsBlogPostRecord = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  createdAt?: string;
  publishedAt?: string;
};

type StrapiListResponse<T> = {
  data?: Array<{ id: number; attributes?: T } & T>;
};

function pickRecord<T>(item: { attributes?: T } & T): T {
  if (item && typeof item === "object" && "attributes" in item && item.attributes) {
    return item.attributes;
  }
  return item as T;
}

async function fetchStrapiList<T>(resource: string, params: URLSearchParams): Promise<T[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${resource}?${params.toString()}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as StrapiListResponse<T>;
    return (payload.data ?? []).map((item) => pickRecord<T>(item));
  } catch {
    return [];
  }
}

export async function fetchCmsPageBySlug(slug: string): Promise<CmsPageRecord | null> {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "pagination[pageSize]": "1",
    "populate[seo][populate][ogImage]": "*",
  });
  const items = await fetchStrapiList<CmsPageRecord>("pages", params);
  return items[0] ?? null;
}

export async function fetchCmsBlogPosts(): Promise<CmsBlogPostRecord[]> {
  const params = new URLSearchParams({
    "pagination[pageSize]": "50",
    sort: "publishedAt:desc",
  });
  return fetchStrapiList<CmsBlogPostRecord>("blog-posts", params);
}

export async function fetchCmsBlogPostBySlug(slug: string): Promise<CmsBlogPostRecord | null> {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "pagination[pageSize]": "1",
  });
  const items = await fetchStrapiList<CmsBlogPostRecord>("blog-posts", params);
  return items[0] ?? null;
}

function toAbsoluteUrl(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  return `${STRAPI_URL}${raw}`;
}

type HomeMetadata = {
  title: string;
  description: string;
  alternates?: { canonical?: string };
  openGraph?: {
    title: string;
    description: string;
    url?: string;
    images?: Array<{ url: string }>;
    type: "website";
  };
  robots?: {
    index: boolean;
    follow: boolean;
  };
};

export async function getHomePageMetadataFromCms(): Promise<HomeMetadata | null> {
  const page = await fetchCmsPageBySlug("glowna");
  const seo = page?.seo;
  if (!seo?.metaTitle || !seo.metaDescription) {
    return null;
  }

  const canonical = seo.canonicalUrl || SITE_URL;
  const ogImageUrl = toAbsoluteUrl(seo.ogImage?.url);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      url: canonical,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
      type: "website",
    },
    robots: {
      index: !seo.noindex,
      follow: !seo.noindex,
    },
  };
}
