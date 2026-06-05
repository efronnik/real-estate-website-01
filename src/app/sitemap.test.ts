import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("excludes CMS blog posts that the blog UI treats as placeholders", async () => {
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
                  slug: "testowy-artykul",
                  title: "Testowy artykul",
                  excerpt: "To jest testowy artykul blogowy.",
                  content: "To jest testowy artykul blogowy.",
                  publishedAt: "2026-01-01T00:00:00.000Z",
                },
              },
              {
                id: 2,
                attributes: {
                  slug: "realny-artykul",
                  title: "Realny artykul",
                  excerpt: "Praktyczny poradnik dla sprzedajacych mieszkanie.",
                  content: "Konkretna tresc poradnikowa bez placeholderow.",
                  publishedAt: "2026-01-02T00:00:00.000Z",
                },
              },
            ],
          }),
          { status: 200 },
        ),
      ),
    );

    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://find.pl/blog/realny-artykul");
    expect(urls).not.toContain("https://find.pl/blog/testowy-artykul");
  });
});
