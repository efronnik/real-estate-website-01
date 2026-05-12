# Real Estate Website + Strapi CMS

Frontend: Next.js (`/`)  
CMS: Strapi (`/cms`)

## Requirements

- Node.js
- npm

## Environment setup

### Frontend

```bash
cp .env.example .env.local
```

Frontend env keys:

- `NEXT_PUBLIC_STRAPI_URL` (default local CMS URL)
- `NEXT_PUBLIC_SITE_URL` (default local frontend URL)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (GA4 Measurement ID, for example `G-XXXXXXXXXX`)
- `NEXT_PUBLIC_ANALYTICS_CONSENT_BANNER` (`true` to require consent before analytics, default `false`)

### CMS

```bash
cp cms/.env.example cms/.env
```

Required CMS env keys are documented in `cms/.env.example`:

- `HOST`, `PORT`
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`, `JWT_SECRET`
- `DATABASE_*`
- `CORS_ORIGIN` (default: `http://localhost:3000`)

## Run commands

### Frontend

```bash
npm run dev
```

Frontend URL: `http://localhost:3000`

### CMS

```bash
npm run cms:build
npm run cms:start
```

CMS URL: `http://localhost:1337`  
Admin URL: `http://localhost:1337/admin`

> If `cms:dev` (`strapi develop`) hits local file watcher limits (`EMFILE`), use `cms:start` after `cms:build`.

## Tests

```bash
npm run test          # Vitest (unit + API integration)
npm run test:e2e      # Playwright: build + start on E2E port (burger, critical paths, full QA)
npm run test:e2e:failover # Playwright: Strapi unavailable (fallback + critical CTA/forms)
npm run release:check # Full pre-release gate (lint + tests + e2e + failover)
```

See `MASTER_PLAN_14_DAYS.md` (Day 13) for what is covered automatically vs manual QA before production.
Use `UAT_CHECKLIST.md` for business acceptance (pages, forms, analytics) and `GA4_QA_PROTOCOL.md` for post-release analytics validation.

## Frontend <-> CMS contract

- Frontend reads public CMS content via Strapi REST API (`/api/*`), for example `/api/pages`
- CORS allows requests from `CORS_ORIGIN`
- Public role is read-only for selected collections

## Smoke check

With CMS running:

```bash
curl http://localhost:1337/api/pages
```

Expected: JSON with `data` array (it may be empty before content is added).

## Analytics QA

- Post-release GA4 checks: `GA4_QA_PROTOCOL.md`
