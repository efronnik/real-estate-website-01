# Real Estate Website + Strapi CMS

Frontend: Next.js (`/`)  
CMS: Strapi (`/cms`)

## Requirements

- Node.js
- npm

## Environment setup

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
