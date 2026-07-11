import { describe, expect, it } from "vitest";
import { isCmsDevPlaceholder, isUsableCmsBlogPost, resolveCmsText } from "@/lib/cms-content";

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

  it("accepts real blog posts with a blank optional excerpt", () => {
    expect(
      isUsableCmsBlogPost({
        slug: "nowy-poradnik",
        title: "Nowy poradnik",
        excerpt: "   ",
        content: "Praktyczny poradnik dla wlascicieli mieszkan w Warszawie.",
      }),
    ).toBe(true);
  });

  it("rejects blog posts with a placeholder excerpt", () => {
    expect(
      isUsableCmsBlogPost({
        slug: "nowy-poradnik",
        title: "Nowy poradnik",
        excerpt: "Testowe dane z CMS",
        content: "Praktyczny poradnik dla wlascicieli mieszkan w Warszawie.",
      }),
    ).toBe(false);
  });
});
