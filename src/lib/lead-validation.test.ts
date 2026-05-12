import { describe, expect, it } from "vitest";
import { sanitizeText, validateAndSanitizeLead } from "./lead-validation";

describe("sanitizeText", () => {
  it("strips HTML tags and trims", () => {
    expect(sanitizeText("  hello <b>world</b>  ", 50)).toBe("hello world");
  });

  it("returns undefined for empty after strip", () => {
    expect(sanitizeText("   ")).toBeUndefined();
  });
});

describe("validateAndSanitizeLead", () => {
  const validBase = {
    fullName: "Jan Kowalski",
    phone: "+48 600 100 200",
    leadType: "kontakt",
    sourcePage: "kontakt",
    consentData: true,
  };

  it("accepts a minimal valid payload", () => {
    const result = validateAndSanitizeLead(validBase);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.leadStatus).toBe("new");
      expect(result.payload.fullName).toBe("Jan Kowalski");
    }
  });

  it("rejects short name", () => {
    const result = validateAndSanitizeLead({ ...validBase, fullName: "J" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("fullName"))).toBe(true);
    }
  });

  it("rejects bad phone", () => {
    const result = validateAndSanitizeLead({ ...validBase, phone: "123" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => e.includes("phone"))).toBe(true);
    }
  });

  it("rejects invalid leadType", () => {
    const result = validateAndSanitizeLead({ ...validBase, leadType: "spam" });
    expect(result.ok).toBe(false);
  });

  it("rejects sourcePage with angle brackets", () => {
    const result = validateAndSanitizeLead({ ...validBase, sourcePage: "x<script>" });
    expect(result.ok).toBe(false);
  });

  it("rejects invalid email when present", () => {
    const result = validateAndSanitizeLead({ ...validBase, email: "not-an-email" });
    expect(result.ok).toBe(false);
  });

  it("accepts optional email when valid", () => {
    const result = validateAndSanitizeLead({ ...validBase, email: "a@b.co" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.email).toBe("a@b.co");
    }
  });

  it("requires consent", () => {
    const result = validateAndSanitizeLead({ ...validBase, consentData: false });
    expect(result.ok).toBe(false);
  });

  it("accepts consent as string on", () => {
    const result = validateAndSanitizeLead({ ...validBase, consentData: "on" });
    expect(result.ok).toBe(true);
  });
});
