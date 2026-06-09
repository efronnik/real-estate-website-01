import { describe, expect, it } from "vitest";
import { isCmsDevPlaceholder, isUsableCmsBlogPost, resolveCmsText } from "@/lib/cms-content";

describe("cms-content", () => {
  it("detects seeded dev placeholder copy", () => {
    expect(isCmsDevPlaceholder("Testowy lead z CMS dla strony glownej.")).toBe(true);
    expect(isCmsDevPlaceholder("To jest testowa tresc dla strony glownej.")).toBe(true);
  });

  it("keeps real CMS copy", () => {
    expect(isCmsDevPlaceholder("Proces sprzedazy od przygotowania po finalizacje.")).toBe(false);
    expect(isCmsDevPlaceholder("Testowa kampania sprzedazy pozwala sprawdzic zainteresowanie kupujacych.")).toBe(false);
    expect(isCmsDevPlaceholder("W kolejnym kroku omawiamy dokumenty i terminy przekazania mieszkania.")).toBe(false);
    expect(isCmsDevPlaceholder("Aktualizacja z CMS opisuje nowa usluge premium.")).toBe(false);
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

  it("accepts real blog posts with formerly broad marker words", () => {
    expect(
      isUsableCmsBlogPost({
        slug: "testowa-kampania-sprzedazy",
        title: "Testowa kampania sprzedazy mieszkania",
        excerpt: "Jak zaplanowac bezpieczny test komunikatu przed publikacja oferty.",
        content: "W kolejnym kroku opisujemy, jak porownac zapytania i dopasowac cene.",
      }),
    ).toBe(true);
  });
});
