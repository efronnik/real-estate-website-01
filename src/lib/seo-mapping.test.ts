import { describe, expect, it } from "vitest";
import { KEY_SEO_PAGE_MAPPING, type KeySeoPage } from "./seo-mapping";

const keys: KeySeoPage[] = ["glowna", "sprzedaz", "inwestycje", "o-mnie", "kontakt", "blog"];

describe("KEY_SEO_PAGE_MAPPING", () => {
  it("keeps cmsSlug aligned with the key page id", () => {
    for (const key of keys) {
      const entry = KEY_SEO_PAGE_MAPPING[key];
      expect(entry.cmsSlug).toBe(key);
    }
  });

  it("uses stable non-empty titles and descriptions", () => {
    for (const key of keys) {
      const entry = KEY_SEO_PAGE_MAPPING[key];
      expect(entry.title.trim().length).toBeGreaterThan(3);
      expect(entry.description.trim().length).toBeGreaterThan(10);
    }
  });

  it("uses unique paths", () => {
    const paths = keys.map((k) => KEY_SEO_PAGE_MAPPING[k].path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("maps home to root", () => {
    expect(KEY_SEO_PAGE_MAPPING.glowna.path).toBe("/");
  });
});
