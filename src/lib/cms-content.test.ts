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

  it("rejects test blog posts", () => {
    expect(
      isUsableCmsBlogPost({
        slug: "5-zasad",
        title: "5 zasad",
        content: "To jest testowy artykul blogowy nr 2.",
      }),
    ).toBe(false);
  });

  it("falls back from development canonical URLs", () => {
    expect(resolveCmsCanonicalUrl("http://localhost:3000/", "https://find.example/sprzedaz")).toBe(
      "https://find.example/sprzedaz",
    );
    expect(resolveCmsCanonicalUrl("http://127.0.0.1:3000/blog/test", "https://find.example/blog/test")).toBe(
      "https://find.example/blog/test",
    );
  });

  it("keeps production CMS canonical URLs", () => {
    expect(resolveCmsCanonicalUrl("https://find.example/kontakt", "https://find.example/fallback")).toBe(
      "https://find.example/kontakt",
    );
  });
});
