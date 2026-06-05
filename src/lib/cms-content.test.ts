import { describe, expect, it } from "vitest";
import { isCmsDevPlaceholder, isUsableCmsBlogPost, resolveCmsCanonicalUrl, resolveCmsText } from "@/lib/cms-content";

describe("cms-content", () => {
  it("detects seeded dev placeholder copy", () => {
    expect(isCmsDevPlaceholder("Testowy lead z CMS dla strony glownej.")).toBe(true);
    expect(isCmsDevPlaceholder("To jest testowa tresc dla strony glownej.")).toBe(true);
  });

  it("keeps real CMS copy", () => {
    expect(isCmsDevPlaceholder("Proces sprzedazy od przygotowania po finalizacje.")).toBe(false);
  });

  it("falls back when placeholder", () => {
    expect(resolveCmsText("Testowe dane z CMS", "Fallback")).toBe("Fallback");
    expect(resolveCmsText("Prawdziwy lead", "Fallback")).toBe("Prawdziwy lead");
  });

  it("falls back from unsafe CMS canonicals", () => {
    expect(resolveCmsCanonicalUrl("http://localhost:3000/", "https://find.pl/sprzedaz")).toBe(
      "https://find.pl/sprzedaz",
    );
    expect(resolveCmsCanonicalUrl("https://example.local/sprzedaz", "https://find.pl/sprzedaz")).toBe(
      "https://find.pl/sprzedaz",
    );
    expect(resolveCmsCanonicalUrl("https://find.pl/custom", "https://find.pl/sprzedaz")).toBe(
      "https://find.pl/custom",
    );
  });

  it("rejects test blog posts", () => {
    expect(
      isUsableCmsBlogPost({
        slug: "5-zasad",
        title: "5 zasad",
        content: "To jest testowy artykul blogowy nr 2.",
      }),
    ).toBe(false);
  });
});
