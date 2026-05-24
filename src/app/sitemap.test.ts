import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCmsBlogPosts } from "@/lib/cms";
import sitemap from "./sitemap";

vi.mock("@/lib/cms", () => ({
  fetchCmsBlogPosts: vi.fn(),
  safeCmsCall: async <T>(call: () => Promise<T>, fallback: T): Promise<T> => {
    try {
      return await call();
    } catch {
      return fallback;
    }
  },
}));

const mockedFetchCmsBlogPosts = vi.mocked(fetchCmsBlogPosts);

describe("sitemap", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://find.example");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("only includes CMS blog posts that the article page can render", async () => {
    mockedFetchCmsBlogPosts.mockResolvedValue([
      {
        slug: "realny-artykul",
        title: "Realny artykul",
        excerpt: "",
        content: "Pelna tresc poradnika dla sprzedajacych mieszkanie.",
        publishedAt: "2026-05-24T10:00:00.000Z",
      },
      {
        slug: "testowy-artykul",
        title: "Testowy artykul",
        excerpt: "Jak unikac typowych bledow inwestora.",
        content: "To jest testowy artykul blogowy nr 2.",
      },
      {
        slug: "pusty-artykul",
        title: "Pusty artykul",
      },
    ]);

    const entries = await sitemap();
    const articleUrls = entries.map((entry) => entry.url).filter((url) => url.includes("/blog/"));

    expect(articleUrls).toContain("https://find.example/blog/realny-artykul");
    expect(articleUrls).not.toContain("https://find.example/blog/testowy-artykul");
    expect(articleUrls).not.toContain("https://find.example/blog/pusty-artykul");
  });
});
