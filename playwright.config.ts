import { defineConfig, devices } from "@playwright/test";

const e2ePort = process.env.E2E_PORT ?? "3001";
const e2eOrigin = `http://127.0.0.1:${e2ePort}`;
// Production server on a free port: avoids conflicting with `next dev` (single dev lock per repo dir).
const webServerCommand = `npm run build && npm run start -- -p ${e2ePort}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
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
    timeout: process.env.CI ? 180_000 : 120_000,
  },
});
