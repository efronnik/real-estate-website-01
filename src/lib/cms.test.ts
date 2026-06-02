import { afterEach, describe, expect, it, vi } from "vitest";
import { KEY_SEO_PAGE_MAPPING } from "./seo-mapping";

function mockCmsPage(seo: Record<string, unknown>) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          data: [
            {
              id: 1,
              attributes: {
                seo,
              },
            },
          ],
        }),
        { status: 200 },
      ),
    ),
  );
}

async function loadMetadataModules(siteUrl: string) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", siteUrl);
  return {
    cms: await import("./cms"),
    pageMetadata: await import("./page-metadata"),
  };
}

describe("CMS metadata", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("rejects seeded development canonicals so key pages keep static SEO", async () => {
    mockCmsPage({
      metaTitle: "FIND Nieruchomosci",
      metaDescription: "Wsparcie w sprzedazy mieszkan i inwestowaniu w nieruchomosci w Warszawie.",
      canonicalUrl: "http://localhost:3000/",
      ogTitle: "FIND Nieruchomosci",
      ogDescription: "Sprzedaz i inwestycje nieruchomosci w Warszawie.",
    });

    const { pageMetadata } = await loadMetadataModules("https://kompas.example");
    const metadata = await pageMetadata.resolveKeyPageMetadata("sprzedaz");

    expect(metadata.title).toBe(KEY_SEO_PAGE_MAPPING.sprzedaz.title);
    expect(metadata.description).toBe(KEY_SEO_PAGE_MAPPING.sprzedaz.description);
    expect(String(metadata.alternates?.canonical)).toBe("https://kompas.example/sprzedaz");
  });

  it("uses CMS SEO when an explicit canonical matches the page path", async () => {
    mockCmsPage({
      metaTitle: "CMS Sprzedaz",
      metaDescription: "CMS opis strony sprzedazy z poprawnym canonicalem.",
      canonicalUrl: "https://kompas.example/sprzedaz",
    });

    const { cms } = await loadMetadataModules("https://kompas.example");
    const metadata = await cms.getPageMetadataFromCms("sprzedaz", "/sprzedaz");

    expect(metadata?.title).toBe("CMS Sprzedaz");
    expect(metadata?.description).toBe("CMS opis strony sprzedazy z poprawnym canonicalem.");
    expect(metadata?.alternates?.canonical).toBe("https://kompas.example/sprzedaz");
  });

  it("uses the page-specific fallback canonical when CMS omits canonicalUrl", async () => {
    mockCmsPage({
      metaTitle: "CMS Inwestycje",
      metaDescription: "CMS opis strony inwestycji bez recznie wpisanego canonicala.",
    });

    const { cms } = await loadMetadataModules("https://kompas.example");
    const metadata = await cms.getPageMetadataFromCms("inwestycje", "/inwestycje");

    expect(metadata?.title).toBe("CMS Inwestycje");
    expect(metadata?.alternates?.canonical).toBe("https://kompas.example/inwestycje");
  });
});
