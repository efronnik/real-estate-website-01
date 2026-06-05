import { afterEach, describe, expect, it, vi } from "vitest";
import { getPageMetadataFromCms } from "@/lib/cms";

describe("CMS metadata", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("uses the page fallback canonical when CMS SEO points at localhost", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://find.pl");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            data: [
              {
                id: 1,
                attributes: {
                  seo: {
                    metaTitle: "Sprzedaz CMS",
                    metaDescription: "Opis strony sprzedazy z CMS.",
                    canonicalUrl: "http://localhost:3000/",
                  },
                },
              },
            ],
          }),
          { status: 200 },
        ),
      ),
    );

    const metadata = await getPageMetadataFromCms("sprzedaz", "/sprzedaz");

    expect(metadata?.alternates?.canonical).toBe("https://find.pl/sprzedaz");
    expect(metadata?.openGraph?.url).toBe("https://find.pl/sprzedaz");
  });
});
