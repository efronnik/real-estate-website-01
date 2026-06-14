import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OPTIONS, POST } from "./route";

let ipSeq = 0;
function uniqueClientIp() {
  ipSeq += 1;
  return `203.0.113.${ipSeq}`;
}

describe("POST /api/leads integration", () => {
  beforeEach(() => {
    vi.stubEnv("STRAPI_API_TOKEN", "test-strapi-token");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: { id: 1 } }), { status: 200 })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
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

  it("does not post to Strapi when the API token is missing", async () => {
    vi.stubEnv("STRAPI_API_TOKEN", "");

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
    expect(response.status).toBe(500);
    expect(fetch).not.toHaveBeenCalled();
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
