import { defineConfig, devices } from "@playwright/test";

const e2ePort = process.env.E2E_PORT ?? "3011";
const e2eOrigin = `http://127.0.0.1:${e2ePort}`;
const downStrapi = process.env.E2E_FAILOVER_STRAPI_URL ?? "http://127.0.0.1:9";
const webServerCommand = [
  `NEXT_PUBLIC_STRAPI_URL=${downStrapi}`,
  `STRAPI_URL=${downStrapi}`,
  "npm run build",
  `NEXT_PUBLIC_STRAPI_URL=${downStrapi}`,
  `STRAPI_URL=${downStrapi}`,
  `npm run start -- -p ${e2ePort}`,
].join(" && ");

export default defineConfig({
  testDir: "./e2e",
  testMatch: /cms-failover\.spec\.ts/,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: e2eOrigin,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: webServerCommand,
    url: e2eOrigin,
    reuseExistingServer: false,
    timeout: process.env.CI ? 240_000 : 150_000,
  },
});
