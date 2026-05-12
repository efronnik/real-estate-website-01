# Release Checklist

## 1) Preflight
- [ ] Verify envs are set (`.env.local`, hosting env, CMS env).
- [ ] Confirm CMS is reachable and returns expected collections.
- [ ] Confirm analytics IDs and consent banner behavior.

## 2) Automated Quality Gate
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run test:e2e`
- [ ] `npm run test:e2e:failover`

## 3) Manual QA
- [ ] Navigation smoke on key routes: `/`, `/sprzedaz`, `/inwestycje`, `/kontakt`, `/blog`.
- [ ] Form submit smoke on `/kontakt` and `/sprzedaz#wycena`.
- [ ] Mobile/tablet burger menu: open/close, active link, route transitions, no visual jumps.
- [ ] SEO spot-check: `robots.txt`, `sitemap.xml`, page titles/H1, canonical on key pages.
- [ ] Analytics spot-check: consent flow + GA4 DebugView events.

## 4) Production Readiness
- [ ] Security headers verified (`HSTS`, `CSP`, `X-Content-Type-Options`, `Referrer-Policy`).
- [ ] Rollback steps validated and owner assigned.
- [ ] Post-release monitoring window and owner assigned.

## 5) Go/No-Go
- [ ] All required checks green.
- [ ] No blocker defects open.
- [ ] Release owner approves deployment.
