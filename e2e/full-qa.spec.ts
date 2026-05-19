import { expect, test } from "@playwright/test";

const keyPaths = ["/", "/sprzedaz", "/inwestycje", "/o-mnie", "/kontakt", "/blog", "/kalkulator", "/bledy"] as const;

test.describe("full QA — SEO & crawl", () => {
  test("security headers present on homepage response", async ({ request }) => {
    const res = await request.get("/");
    expect(res.ok()).toBeTruthy();
    const headers = res.headers();
    expect(headers["strict-transport-security"]).toContain("max-age=");
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("robots.txt responds", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const text = await res.text();
    expect(text).toMatch(/User-agent/i);
  });

  test("sitemap.xml responds with URLs", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const text = await res.text();
    expect(text).toMatch(/<loc>/i);
    expect(text).toMatch(/\/kontakt/);
  });

  test("key pages expose title and single main h1", async ({ page }) => {
    for (const path of keyPaths) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const title = await page.title();
      expect(title.trim().length, `title for ${path}`).toBeGreaterThan(4);
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    }
  });

  test("JSON-LD LocalBusiness present on home", async ({ page }) => {
    await page.goto("/");
    const ld = page.locator('script[type="application/ld+json"]');
    await expect(ld).toHaveCount(1);
    const raw = await ld.textContent();
    expect(raw).toBeTruthy();
    const data = JSON.parse(raw!) as { "@type"?: string };
    expect(data["@type"]).toBe("LocalBusiness");
  });

  test("unknown route returns custom 404 page", async ({ page, request }) => {
    const missingPath = "/missing-route-for-qa";
    const response = await request.get(missingPath);
    expect(response.status()).toBe(404);

    await page.goto(missingPath, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Strona nie została znaleziona");
    await expect(page.getByRole("link", { name: /Wróć na stronę główną/i })).toBeVisible();
  });
});

test.describe("full QA — navigation (desktop)", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("topbar primary routes load", async ({ page }) => {
    await page.goto("/");
    for (const label of ["Sprzedaż", "Inwestycje", "Blog", "Kontakt"] as const) {
      await page.getByRole("link", { name: label }).first().click();
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
      await page.goto("/");
    }
  });
});

test.describe("full QA — kontakt form", () => {
  test("submit shows success when API returns 201", async ({ page }) => {
    await page.route("**/api/leads", async (route) => {
      if (route.request().method() !== "POST") {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/kontakt", { waitUntil: "domcontentloaded" });
    await page.locator('input[name="full_name"]').fill("E2E Test User");
    await page.locator('input[name="phone"]').fill("+48500111222");
    await page.locator('input[name="consent_data"]').check();
    await page.locator('input[name="consent_regulations"]').check();
    await page.getByRole("button", { name: /Wyślij zapytanie/i }).click();
    await expect(page.getByRole("status")).toContainText(/Dziekujemy|Dziękujemy/i, { timeout: 15_000 });
  });

  test("HTML5 validation blocks empty submit", async ({ page }) => {
    await page.goto("/kontakt", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Wyślij zapytanie/i }).click();
    const name = page.locator('input[name="full_name"]');
    await expect(name).toBeFocused();
  });
});

test.describe("full QA — blog", () => {
  test("index lists articles and article page has CTA strip", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const readArticle = page.getByRole("link", { name: /Czytaj|Pobierz listę|Zobacz checklist/i }).first();
    const href = await readArticle.getAttribute("href");
    expect(href).toMatch(/^\/blog\/.+/);
    await page.goto(href!, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: "Przejdź do wyceny" }).first()).toBeVisible();
  });
});

test.describe("full QA — API error scenarios", () => {
  test("api/leads rejects invalid JSON with 400", async ({ request }) => {
    const response = await request.post("/api/leads", {
      headers: {
        "Content-Type": "application/json",
        Origin: "http://127.0.0.1:3000",
      },
      data: "not-a-json",
    });
    expect(response.status()).toBe(400);
  });

  test("api/leads rejects unknown origin with 403", async ({ request }) => {
    const response = await request.post("/api/leads", {
      headers: {
        "Content-Type": "application/json",
        Origin: "https://evil.example.com",
      },
      data: {
        data: {
          fullName: "E2E User",
          phone: "+48500111222",
          leadType: "kontakt",
          sourcePage: "kontakt",
          consentData: true,
        },
      },
    });
    expect(response.status()).toBe(403);
  });
});
