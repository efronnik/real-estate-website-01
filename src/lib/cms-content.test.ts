import { describe, expect, it } from "vitest";
import {
  hasUsableCmsBlogContent,
  isCmsDevPlaceholder,
  isUsableCmsBlogPost,
  isUsableCmsBlogSummary,
  resolveCmsText,
} from "@/lib/cms-content";

describe("cms-content", () => {
  it("detects seeded dev placeholder copy", () => {
    expect(isCmsDevPlaceholder("Testowy lead z CMS dla strony glownej.")).toBe(true);
    expect(isCmsDevPlaceholder("To jest testowa tresc dla strony glownej.")).toBe(true);
  });

  it("keeps real CMS copy", () => {
    expect(isCmsDevPlaceholder("Proces sprzedazy od przygotowania po finalizacje.")).toBe(false);
    expect(isCmsDevPlaceholder("Przedstawiamy testowa strategie wyceny dla Twojego mieszkania.")).toBe(false);
    expect(isCmsDevPlaceholder("Material zsynchronizowany z cms-em i gotowy do publikacji.")).toBe(false);
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

  it("accepts real blog summaries without requiring optional fields", () => {
    expect(
      isUsableCmsBlogSummary({
        slug: "5-testowych-bledow",
        title: "5 testowych bledow przy sprzedazy",
      }),
    ).toBe(true);
  });

  it("rejects only exact frontend-prose seed content for blog bodies", () => {
    expect(
      hasUsableCmsBlogContent({
        content: "Artykul renderowany z frontendu (prose). Pelna tresc w kodzie aplikacji.",
      }),
    ).toBe(false);
    expect(
      hasUsableCmsBlogContent({
        content: "Opisujemy testowa strategie przygotowania mieszkania bez utraty realnej tresci.",
      }),
    ).toBe(true);
  });
});
