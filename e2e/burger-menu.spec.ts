import { expect, test, type Page } from "@playwright/test";

async function openMobileMenu(page: Page) {
  const burger = page.locator(".site-topbar .topbar-burger, .cp-topbar .topbar-burger").first();
  await burger.click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible({ timeout: 10_000 });
  await expect(burger).toHaveAttribute("aria-expanded", "true", { timeout: 5000 });
}

async function expectMenuClosed(page: Page) {
  const burger = page.locator(".site-topbar .topbar-burger, .cp-topbar .topbar-burger").first();
  await expect(burger).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0, {
    timeout: 800,
  });
}

function runBurgerSuite(viewportLabel: string) {
  test(`[${viewportLabel}] open / close via ×`, async ({ page }) => {
    await page.goto("/sprzedaz", { waitUntil: "domcontentloaded" });
    const vwBefore = await page.evaluate(() => document.documentElement.clientWidth);
    await openMobileMenu(page);
    expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(vwBefore);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("button", { name: "Zamknij menu" })
      .click();
    await expectMenuClosed(page);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });

  test(`[${viewportLabel}] close via overlay click`, async ({ page }) => {
    await page.goto("/sprzedaz", { waitUntil: "domcontentloaded" });
    await openMobileMenu(page);
    await page.locator(".topbar-mobile-overlay").click({ position: { x: 12, y: 400 } });
    await expectMenuClosed(page);
  });

  test(`[${viewportLabel}] close via Escape`, async ({ page }) => {
    await page.goto("/sprzedaz", { waitUntil: "domcontentloaded" });
    await openMobileMenu(page);
    await page.keyboard.press("Escape");
    await expectMenuClosed(page);
  });

  test(`[${viewportLabel}] active link Blog on article + navigate Sprzedaz`, async ({ page }) => {
    const readArticle = page.getByRole("link", { name: /Czytaj|Pobierz listę|Zobacz checklist/i }).first();
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    const href = await readArticle.getAttribute("href");
    expect(href).toMatch(/^\/blog\/.+/);
    await page.goto(href!, { waitUntil: "domcontentloaded" });

    await openMobileMenu(page);
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    const blogLink = mobileNav.getByRole("link", { name: "Blog" });
    await expect(blogLink).toHaveAttribute("aria-current", "page");
    await expect(blogLink).toHaveClass(/nav-link-active/);

    await blogLink.click();
    await expect(page).toHaveURL(/\/blog\/?$/);
    await expectMenuClosed(page);

    await openMobileMenu(page);
    await mobileNav.getByRole("link", { name: "Sprzedaz" }).click();
    await expect(page).toHaveURL(/\/sprzedaz/);
    await expectMenuClosed(page);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });
}

test.describe("burger menu — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  runBurgerSuite("mobile");
});

test.describe("burger menu — tablet", () => {
  test.use({ viewport: { width: 820, height: 1100 } });
  runBurgerSuite("tablet");
});
