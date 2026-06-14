import { describe, expect, it } from "vitest";
import { isCmsDevPlaceholder, isUsableCmsBlogPost, resolveCmsText } from "@/lib/cms-content";

describe("cms-content", () => {
  it("detects seeded dev placeholder copy", () => {
    expect(isCmsDevPlaceholder("Testowe dane z CMS")).toBe(true);
    expect(isCmsDevPlaceholder("Artykul do sprawdzenia renderu")).toBe(true);
  });

  it("keeps real CMS copy", () => {
    expect(isCmsDevPlaceholder("Proces sprzedazy od przygotowania po finalizacje.")).toBe(false);
    expect(isCmsDevPlaceholder("W kolejnym kroku przygotujemy strategie z CMS.")).toBe(false);
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
        content: "To jest tresc artykulu z CMS do developmentu.",
      }),
    ).toBe(false);
  });

  it("keeps published blog posts without optional excerpt", () => {
    expect(
      isUsableCmsBlogPost({
        slug: "analiza-rynku",
        title: "Analiza rynku",
        content: "Konkretny poradnik o przygotowaniu nieruchomosci do sprzedazy.",
      }),
    ).toBe(true);
  });
});
