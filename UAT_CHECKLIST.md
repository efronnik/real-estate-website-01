# UAT Checklist (Pages, Forms, Analytics)

Release:
Date/time:
Tester:

## 1) Pages (content + navigation)

- [ ] `/` loads without runtime errors; hero and top navigation visible.
- [ ] `/sprzedaz` loads with process section, FAQ block and visible CTA to `#wycena`.
- [ ] `/inwestycje` loads with key sections and visible CTA path to contact.
- [ ] `/o-mnie` loads with profile/experience sections and no broken layout.
- [ ] `/kontakt` loads with visible contact form and key quick links.
- [ ] `/blog` loads with article list/cards and at least one readable article CTA.
- [ ] `/blog/[slug]` opens and shows article title/lead and CTA strip.
- [ ] `/kalkulator` loads and interactive controls react to input changes.
- [ ] `/bledy` loads and does not block navigation to core pages.
- [ ] Topbar/footer links route correctly on desktop, mobile and tablet.

## 2) Forms (functional acceptance)

- [ ] `/kontakt` positive flow: submit valid data -> success status message.
- [ ] `/kontakt` validation flow: empty required fields are blocked and focused.
- [ ] `/sprzedaz#wycena` positive flow: submit valid data -> success status message.
- [ ] Required consents (`consent_data`, `consent_regulations`) are enforced.
- [ ] Honeypot field is hidden and does not affect normal users.
- [ ] Form UI remains usable when CMS content is unavailable.

## 3) Analytics (acceptance)

- [ ] Consent banner behavior matches env (`NEXT_PUBLIC_ANALYTICS_CONSENT_BANNER`).
- [ ] After consent (if enabled), one `page_view` per route change is visible in GA4 DebugView.
- [ ] CTA click produces `cta_click` with `placement` and `cta_id`.
- [ ] Successful form submit produces `lead_form_submit` with lane/source params.
- [ ] UTM params are present in event payload when opening with UTM query.
- [ ] No PII fields (`email`, `phone`, `full_name`, free-text `message`) are sent to GA4.

## 4) UAT Sign-off

- [ ] No blocker defects remain open.
- [ ] Known minor issues are documented and accepted.
- [ ] Business owner approves release.

Notes:
