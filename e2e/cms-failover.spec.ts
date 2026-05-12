import { expect, test } from "@playwright/test";

test.describe("CMS failover (Strapi unavailable)", () => {
  test("key pages render fallback content and critical CTA", async ({ page }) => {
    await page.goto("/sprzedaz", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Sprzedaz nieruchomosci to dobrze zaplanowany proces",
    );
    await expect(page.getByRole("link", { name: "Przejdź do wyceny" }).first()).toBeVisible();
    await expect(page.locator("#wycena")).toBeVisible();

    await page.goto("/kontakt", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Porozmawiajmy o sprzedaży Twojej nieruchomości",
    );
    await expect(page.locator('input[name="full_name"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /Wyślij zapytanie/i })).toBeVisible();

    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Blog sprzedaży mieszkania");
    await expect(page.getByRole("link", { name: /Czytaj analizę|Czytaj artykuł/i }).first()).toBeVisible();
  });

  test("kontakt form is still submittable with API mocked", async ({ page }) => {
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
    await page.locator('input[name="full_name"]').fill("Failover Test User");
    await page.locator('input[name="phone"]').fill("+48500111222");
    await page.locator('input[name="consent_data"]').check();
    await page.locator('input[name="consent_regulations"]').check();
    await page.getByRole("button", { name: /Wyślij zapytanie/i }).click();
    await expect(page.getByRole("status")).toContainText(/Dziekujemy|Dziękujemy/i, { timeout: 15_000 });
  });
});
