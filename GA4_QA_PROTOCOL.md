# GA4 QA Protocol (Post-release)

Use this checklist after deploy to verify analytics health.

## Preconditions

- Frontend is live with `NEXT_PUBLIC_GA_MEASUREMENT_ID` set.
- If consent banner is required in production, set `NEXT_PUBLIC_ANALYTICS_CONSENT_BANNER=true`.
- Open GA4 property and `Admin -> DebugView`.

## 1) Base tracking

- Open site home page once.
- Confirm one `page_view` appears for the load (no immediate duplicate).
- Navigate to another internal route and confirm one new `page_view`.

## 2) Conversion events

- Click one key CTA and confirm one `cta_click` with:
  - `placement`
  - `cta_id`
- Submit one lead form successfully and confirm one `lead_form_submit` with:
  - `form_type`
  - `lead_type`
  - `source_page`
  - `status=success`

## 3) UTM attribution

- Open a page with UTM query params, for example:
  - `?utm_source=test_source&utm_medium=test_medium&utm_campaign=test_campaign`
- Submit a lead form.
- Confirm `lead_form_submit` includes:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`

## 4) Consent (only if banner is enabled)

Use a clean browser profile/incognito:

- Before consent: no GA events should be sent.
- After `Accept`: events should be sent.
- After `Reject`: events should not be sent.

## 5) PII safety

In DebugView event parameters, confirm these are NOT sent:

- `email`
- `phone`
- `full_name`
- free-text form `message` content

## 6) GA4 admin setup

- Mark `lead_form_submit` as key event (conversion).
- Optional: mark `contact_click` as key event based on business decision.
- Custom dimensions created (event scope):
  - `form_type`, `lead_type`, `source_page`, `status`
  - `placement`, `cta_id`
  - `utm_source`, `utm_medium`, `utm_campaign` (when available in selector)

## 7) Quick pass/fail template

- Release/tag:
- Date/time:
- Tester:
- Result:
  - Base tracking: PASS/FAIL
  - Conversions: PASS/FAIL
  - UTM: PASS/FAIL
  - Consent: PASS/FAIL/N/A
  - PII: PASS/FAIL
- Notes:
