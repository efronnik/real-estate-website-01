import { describe, expect, it } from "vitest";
import { isCmsDevPlaceholder, isUsableCmsBlogPost, resolveCmsText } from "@/lib/cms-content";

describe("cms-content", () => {
  it("detects seeded dev placeholder copy", () => {
    expect(isCmsDevPlaceholder("Testowy lead z CMS dla strony glownej.")).toBe(true);
    expect(isCmsDevPlaceholder("To jest testowa tresc dla strony glownej.")).toBe(true);
  });

  it("keeps real CMS copy", () => {
    expect(isCmsDevPlaceholder("Proces sprzedazy od przygotowania po finalizacje.")).toBe(false);
    expect(isCmsDevPlaceholder("W kolejnym kroku przygotuj dokumenty do sprzedaży mieszkania.")).toBe(false);
    expect(isCmsDevPlaceholder("Opis testowy scenariusza negocjacji dla sprzedającego.")).toBe(false);
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

  it("keeps real blog posts with optional fields missing or common phrases", () => {
    expect(
      isUsableCmsBlogPost({
        slug: "negocjacje",
        title: "Scenariusz rozmowy z kupującym",
      }),
    ).toBe(true);

    expect(
      isUsableCmsBlogPost({
        slug: "kolejny-krok",
        title: "Dokumenty przed sprzedażą",
        content: "W kolejnym kroku przygotuj zaświadczenia i komplet dokumentów dla notariusza.",
      }),
    ).toBe(true);
  });
});
