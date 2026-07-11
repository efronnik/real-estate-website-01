import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OPTIONS, POST } from "./route";

const ORIGINAL_STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

let ipSeq = 0;
function uniqueClientIp() {
  ipSeq += 1;
  return `203.0.113.${ipSeq}`;
}

function restoreEnv(key: "STRAPI_API_TOKEN" | "NEXT_PUBLIC_SITE_URL", value: string | undefined) {
  if (value === undefined) {
    delete process.env[key];
    return;
  }
  process.env[key] = value;
}

describe("POST /api/leads integration", () => {
  beforeEach(() => {
    process.env.STRAPI_API_TOKEN = "test-strapi-token";
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: { id: 1 } }), { status: 200 })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    restoreEnv("STRAPI_API_TOKEN", ORIGINAL_STRAPI_API_TOKEN);
    restoreEnv("NEXT_PUBLIC_SITE_URL", ORIGINAL_SITE_URL);
  });

  it("returns 201 and posts sanitized lead to Strapi", async () => {
    const strapiBase = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
    const request = new Request("http://127.0.0.1:3000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://127.0.0.1:3000",
        "x-forwarded-for": uniqueClientIp(),
      },
      body: JSON.stringify({
        data: {
          fullName: "Anna Nowak",
          phone: "+48500111222",
          leadType: "kontakt",
          sourcePage: "kontakt",
          consentData: true,
        },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(201);

    expect(fetch).toHaveBeenCalledWith(
      `${strapiBase}/api/leads`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer test-strapi-token" },
      }),
    );
    const [, init] = vi.mocked(fetch).mock.calls[0];
    const posted = JSON.parse(String((init as RequestInit).body)) as {
      data: { leadStatus: string; fullName: string };
    };
    expect(posted.data.leadStatus).toBe("new");
    expect(posted.data.fullName).toBe("Anna Nowak");
  });

  it("accepts the configured site origin after normalizing trailing slashes", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";

    const request = new Request("https://example.com/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://example.com",
        "x-forwarded-for": uniqueClientIp(),
      },
      body: JSON.stringify({
        data: {
          fullName: "Anna Nowak",
          phone: "+48500111222",
          leadType: "kontakt",
          sourcePage: "kontakt",
          consentData: true,
        },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(201);
    expect(fetch).toHaveBeenCalled();
  });

  it("fails closed without posting to Strapi when the API token is missing", async () => {
    delete process.env.STRAPI_API_TOKEN;

    const request = new Request("http://127.0.0.1:3000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://127.0.0.1:3000",
        "x-forwarded-for": uniqueClientIp(),
      },
      body: JSON.stringify({
        data: {
          fullName: "Anna Nowak",
          phone: "+48500111222",
          leadType: "kontakt",
          sourcePage: "kontakt",
          consentData: true,
        },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 400 when validation fails", async () => {
    const request = new Request("http://127.0.0.1:3000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://127.0.0.1:3000",
        "x-forwarded-for": uniqueClientIp(),
      },
      body: JSON.stringify({
        data: {
          fullName: "X",
          phone: "bad",
          leadType: "kontakt",
          sourcePage: "kontakt",
          consentData: true,
        },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 400 for unknown payload keys", async () => {
    const request = new Request("http://127.0.0.1:3000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://127.0.0.1:3000",
        "x-forwarded-for": uniqueClientIp(),
      },
      body: JSON.stringify({
        data: {
          fullName: "Jan Kowalski",
          phone: "+48500111222",
          leadType: "kontakt",
          sourcePage: "kontakt",
          consentData: true,
          extraField: "nope",
        },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("short-circuits honeypot without calling Strapi", async () => {
    const request = new Request("http://127.0.0.1:3000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://127.0.0.1:3000",
        "x-forwarded-for": uniqueClientIp(),
      },
      body: JSON.stringify({
        data: {
          fullName: "Bot User",
          phone: "+48500111222",
          leadType: "kontakt",
          sourcePage: "kontakt",
          consentData: true,
          website: "https://spam.example",
        },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 502 when Strapi is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const request = new Request("http://127.0.0.1:3000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://127.0.0.1:3000",
        "x-forwarded-for": uniqueClientIp(),
      },
      body: JSON.stringify({
        data: {
          fullName: "Jan Kowalski",
          phone: "+48500111222",
          leadType: "kontakt",
          sourcePage: "kontakt",
          consentData: true,
        },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(502);
  });

  it("rejects OPTIONS preflight from unknown origin", async () => {
    const request = new Request("http://127.0.0.1:3000/api/leads", {
      method: "OPTIONS",
      headers: {
        Origin: "https://evil.example.com",
      },
    });

    const response = await OPTIONS(request);
    expect(response.status).toBe(403);
  });
});
