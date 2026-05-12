import { afterEach, describe, expect, it, vi } from "vitest";

const originalStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

async function getCspHeader(strapiUrl: string): Promise<string> {
  vi.resetModules();
  process.env.NEXT_PUBLIC_STRAPI_URL = strapiUrl;

  const { default: nextConfig } = await import("../../next.config");
  const headers = await nextConfig.headers?.();
  const cspHeader = headers?.[0]?.headers.find((header) => header.key === "Content-Security-Policy");

  expect(cspHeader?.value).toBeTypeOf("string");
  return cspHeader?.value ?? "";
}

function getDirective(cspHeader: string, directiveName: string): string {
  return cspHeader.split("; ").find((directive) => directive.startsWith(`${directiveName} `)) ?? "";
}

afterEach(() => {
  vi.resetModules();
  if (originalStrapiUrl === undefined) {
    delete process.env.NEXT_PUBLIC_STRAPI_URL;
  } else {
    process.env.NEXT_PUBLIC_STRAPI_URL = originalStrapiUrl;
  }
});

describe("next.config Content-Security-Policy", () => {
  it("allows browser CMS fetches to the configured Strapi origin", async () => {
    const cspHeader = await getCspHeader("https://cms.example.com/admin");
    const connectSrc = getDirective(cspHeader, "connect-src");

    expect(connectSrc).toContain("https://cms.example.com");
    expect(connectSrc).not.toContain("https://cms.example.com/admin");
  });
});
