import { describe, expect, it } from "vitest";
import { isCmsDevPlaceholder, isUsableCmsBlogPost, resolveCmsText } from "@/lib/cms-content";

describe("cms-content", () => {
  it("detects seeded dev placeholder copy", () => {
    expect(isCmsDevPlaceholder("Testowy lead z CMS dla strony glownej.")).toBe(true);
    expect(isCmsDevPlaceholder("To jest testowa tresc dla strony glownej.")).toBe(true);
    expect(
      isCmsDevPlaceholder(
        "To jest testowa tresc dla strony glownej. Dane sa automatycznie seedowane podczas developmentu.",
      ),
    ).toBe(true);
  });

  it("keeps real CMS copy", () => {
    expect(isCmsDevPlaceholder("Proces sprzedazy od przygotowania po finalizacje.")).toBe(false);
    expect(isCmsDevPlaceholder("Specjalizujemy się w mieszkaniach na rynku developerskim.")).toBe(false);
    expect(isCmsDevPlaceholder("W kolejnym kroku przygotujemy dokumenty do sprzedaży.")).toBe(false);
    expect(isCmsDevPlaceholder("Oferta testowa na rynku wtórnym.")).toBe(false);
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

  it("accepts real blog posts without an optional excerpt", () => {
    expect(
      isUsableCmsBlogPost({
        slug: "analiza-rynku-2026",
        title: "Analiza rynku developerskiego w 2026 roku",
        content: "Pełna treść artykułu o sytuacji na rynku nieruchomości.",
      }),
    ).toBe(true);
  });
});
