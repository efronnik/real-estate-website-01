import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Strapi build/cache output (huge bundles — linting causes OOM / long runs)
    "cms/dist/**",
    "cms/build/**",
    "cms/.cache/**",
    "cms/.tmp/**",
    // Strapi lives under `cms/` with its own toolchain; root ESLint targets the Next app.
    "cms/**",
  ]),
]);

export default eslintConfig;
