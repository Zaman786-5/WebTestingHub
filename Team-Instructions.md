# Team Instructions — WebTestingHub System

**Build**: 2025-08-13T18:17:42.253039Z

## Overview
This system provides two flows:
- **Engagement Flow**: neutral pages, capped at 10 visits/day per unique user.
- **Premium Flow**: conversion-optimized pages, gated to one visit per user. OFFER_URL used only here.

## Deploy Steps (Netlify or GitHub Pages)
1. Unzip ZIPs **01 → 14** into a single project folder.
2. Ensure folders:
   - `/assets` (from ZIP 13)
   - `/scripts` (from ZIP 11)
   - root files from ZIP 14
   - generated page pools from ZIPs 01–10
3. For Netlify, include `_headers` and `_redirects` from ZIP 12 at project root.
4. Deploy.

## Visitor Limits
- Limits are enforced client‑side via localStorage + fingerprint checks (see `filter.js` in ZIP 11).
- Engagement: up to 10 visits/day.
- Premium: one visit total.

## Offer URL
`https://singingfiles.com/show.php?l=0&u=2425630&id=68831` — used **only** by premium landing pages.

## Maintenance
- Rotate themes by changing the `<link rel="stylesheet">` to any `theme-XX.css`.
- Update assets from ZIP 13 as needed.
- If you regenerate pages with scripts from ZIP 11, redeploy the updated files.

## Compliance
- Content should remain truthful and non-deceptive.
- Respect hosting provider policies and applicable regulations.