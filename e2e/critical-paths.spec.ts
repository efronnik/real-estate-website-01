import { expect, test } from "@playwright/test";

test.describe("critical paths", () => {
  test("Główna → Sprzedaż → Kontakt", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Sprzedaz" }).first().click();
    await expect(page).toHaveURL(/\/sprzedaz$/);
    await page.getByRole("link", { name: "Kontakt" }).first().click();
    await expect(page).toHaveURL(/\/kontakt/);
  });

  test("Główna → Inwestycje → Kontakt", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Inwestycje" }).first().click();
    await expect(page).toHaveURL(/\/inwestycje/);
    await page.getByRole("link", { name: "Kontakt" }).first().click();
    await expect(page).toHaveURL(/\/kontakt/);
  });

  test("Blog list → artykuł → CTA wycena", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "load" });
    // Fallback list uses "Czytaj analizę"; CMS-backed list uses "Czytaj artykuł".
    const readArticle = page.getByRole("link", { name: /Czytaj (analizę|artykuł)/ }).first();
    const articleHref = await readArticle.getAttribute("href");
    expect(articleHref).toMatch(/^\/blog\/.+/);
    await page.goto(articleHref!, { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: "Przejdź do wyceny" }).first().click({ timeout: 30_000 });
    await expect(page).toHaveURL(/\/sprzedaz/);
  });
});
