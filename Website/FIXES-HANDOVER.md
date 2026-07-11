# BrandBase Website — Fixes & Handover Notes

**Project:** BrandBase Capsule website  
**Stack:** Next.js 16 (client) · React CMS (admin) · Node/Express/MongoDB (backend)  
**Last updated:** June 27, 2026  

This document lists fixes and enhancements from the full public-site improvement pass.

---

## Table of contents

1. [Page enhancement status](#1-page-enhancement-status)
2. [Site-wide foundation](#2-site-wide-foundation)
3. [SEO architecture](#3-seo-architecture)
4. [Event & exhibition pages](#4-event--exhibition-pages)
5. [Legal & landing pages](#5-legal--landing-pages)
6. [Core pages](#6-core-pages)
7. [Service & portfolio pages](#7-service--portfolio-pages)
8. [Blog pages](#8-blog-pages)
9. [Images & hydration fixes](#9-images--hydration-fixes)
10. [Backend scripts](#10-backend-scripts)
11. [Verify checklist](#11-verify-checklist)
12. [Optional follow-ups](#12-optional-follow-ups)

---

## 1. Page enhancement status

| Page | Status | Notes |
|------|--------|-------|
| `/` Home | ✅ Done | `siteConfig` metadata + JSON-LD, H1 fix, 5 services |
| `/about` | ✅ Done | `buildAboutMetadata` / JSON-LD, breadcrumbs |
| `/contact` | ✅ Done | `corePagesSeo`, breadcrumbs, `#FF6600` |
| `/appointment` | ✅ Done | `corePagesSeo`, FAQs, booking fixes |
| `/services` | ✅ Done | `corePagesSeo`, 5 public service cards |
| `/services/[category]` | ✅ Done | `buildServiceCategoryMetadata` |
| `/services/av-production` | ✅ Done | Replaced bloated contact SEO; breadcrumbs added |
| `/services/[category]/[slug]` | ✅ Done | Metadata, JSON-LD, breadcrumbs, bottom CTA |
| `/portfolio` | ✅ Done | `portfolioPageData`, FAQs, clean schema |
| `/portfolio/[slug]` | ✅ Done | `corePagesSeo` detail builders |
| `/blogs` | ✅ Done | `corePagesSeo` listing |
| `/blogs/[category]` | ✅ Done | Breadcrumbs, `#FF6600`, CollectionPage schema |
| `/blogs/[category]/[slug]` | ✅ Done | CMS metadata, JSON-LD, SafeImage |
| `/event-calendar` | ✅ Done | Server fetch, filters, month counts fixed |
| `/event-calendar/[slug]` | ✅ Done | Static params, share, expired badge |
| `/expo`, `/expo/otm` | ✅ Done | `expoPageData`, brand hero |
| `/best-stall-design-company-in-mumbai` | ✅ Done | `mumbaiPageData`, venue guide |
| `/privacy-policy`, `/terms` | ✅ Done | `legalPageData`, CMS + fallback |
| Sitemap | ✅ Done | Static + dynamic API entries |

---

## 2. Site-wide foundation

- Removed global `canonical: "/"` from root layout
- Skip-to-main-content link (`ClientLayout`)
- Single `<main id="main-content">`
- `prefers-reduced-motion` in `globals.css`
- Brand color: **`#FF6600`** sitewide
- Contact constants: `+91 7045390416`, NESCO Goregaon address
- **5 public services** (no App Development on public UI)

**Key files:** `lib/siteConfig.js`, `lib/contactConstants.js`, `app/layout.js`, `app/ClientLayout.jsx`

---

## 3. SEO architecture

| Module | Purpose |
|--------|---------|
| `lib/siteConfig.js` | Home, about, service categories, event/expo/mumbai/legal builders |
| `lib/corePagesSeo.js` | Contact, appointment, services list, blogs, detail pages |
| `lib/portfolioPageData.js` | Portfolio listing |
| `lib/mumbaiPageData.js` | Mumbai SEO landing |
| `lib/expoPageData.js` | Expo pages |
| `lib/legalPageData.js` | Privacy & terms page config |
| `lib/eventUtils.js` | Event date parsing, upcoming filter |

All builders use `SITE_URL`, `ORG`, and ImageKit OG images — no placeholder phones or fake ratings.

---

## 4. Event & exhibition pages

### Event calendar (`/event-calendar`)
- Server-side fetch, breadcrumbs, stats, Cards/Calendar toggle
- **Upcoming filter** defaults unchecked
- Fixed nested `<a>` hydration error in cards
- Per-month event counts (not total)
- `asOfDate` for consistent SSR/hydration on past events

### Event detail (`/event-calendar/[slug]`)
- `generateStaticParams`, share buttons, sticky sidebar, FAQ JSON-LD

### Expo (`/expo`, `/expo/otm`)
- Shared `ExhibitionContent`, ImageKit images, orange CTAs

### Mumbai landing (`/best-stall-design-company-in-mumbai`)
- `MumbaiLandingContent`, venue guide (NESCO / Jio World), SafeImage

---

## 5. Legal & landing pages

### Privacy & Terms
- `LegalPolicyShell` with breadcrumbs, cross-links, contact footer
- CMS content via API + `enrichPolicyData()` for correct contact details
- Empty state when API unavailable

---

## 6. Core pages

### Contact & Appointment
- Migrated to `corePagesSeo.js`
- Removed duplicate inline org schema bloat

### Services listing
- Clean metadata; dynamic service `ItemList` in JSON-LD from CMS categories

---

## 7. Service & portfolio pages

### Service detail
- Breadcrumbs: Home → Services → Category → Service
- Orange bottom CTA (appointment + contact)
- Removed `console.log` from page shell

### AV Production (`/services/av-production`)
- **Was:** 400+ lines of contact-page SEO with `+91-XXXXXXXXXX`, fake ratings
- **Now:** Uses `buildServiceCategoryMetadata('av-production')` + breadcrumbs

### Portfolio listing & detail
- Listing: FAQs, orange CTA, dynamic project schema from API
- Detail: `buildPortfolioDetailMetadata` / JSON-LD

### Service detail hydration
- Removed `styled-jsx` from `WebHeroSection`, `ComparisonSection` → `globals.css`
- Jet-engine image URLs mapped in `imageUtils.js` + backend `serviceImageLibrary.js`

---

## 8. Blog pages

- Listing & category pages use `corePagesSeo`
- Category page: client `BlogCategoryContent` (fixes server `onClick` bug)
- Detail: SafeImage, prev/next, related posts

---

## 9. Images & hydration fixes

| Issue | Fix |
|-------|-----|
| `styled-jsx` class mismatch | Moved styles to `globals.css` |
| Nested anchors in event cards | `<article>` + separate Link/button |
| Bad Unsplash → turbine images | `imageUtils.js` + `serviceImageLibrary.js` |
| Blog/portfolio broken images | `SafeImage` + ImageKit fallbacks |
| ScrollSequence `text-brand-yellow` | Changed to `#FF6600` |
| Global search gibberish matches | Stricter matching in `GlobalSearch.jsx` |

**Optional backend cleanup:** `cd Website/backend && npm run assign:service-images`

---

## 10. Backend scripts

```bash
cd Website/backend
npm run patch:footer          # Footer links & BrandBase spelling
npm run patch:service-grid    # 5-service grid order
npm run assign:service-images # Permanent CMS image URLs
npm run fix:blog-images       # Blog featured image repair
```

---

## 11. Verify checklist

After deploy or hard refresh (`Ctrl+Shift+R`):

- [ ] `/` — single H1, 5 services in slider, skip link works
- [ ] `/services` — 5 cards, Event & Exhibition first
- [ ] `/services/av-production` — loads, breadcrumbs, no SEO errors in view-source
- [ ] `/services/exhibition-management/stall-design` — breadcrumbs + bottom CTA
- [ ] `/event-calendar` — March shows per-month count; upcoming filter optional
- [ ] `/expo`, `/expo/otm` — images load, orange CTAs
- [ ] `/best-stall-design-company-in-mumbai` — breadcrumbs, venue section
- [ ] `/portfolio` — hero video, FAQ section
- [ ] `/portfolio/[slug]` — detail with breadcrumbs
- [ ] `/blogs`, `/blogs/exhibition` — breadcrumbs, images
- [ ] `/contact`, `/appointment` — form works, correct phone in schema
- [ ] `/privacy-policy`, `/terms` — CMS content loads
- [ ] `/sitemap.xml` — includes event-calendar, expo, dynamic blogs/portfolios
- [ ] `npm run build` in `Website/client` passes

---

## 12. Optional follow-ups

These are **not blockers** for handover:

1. Run `assign:service-images` on production DB if CMS still has old Unsplash URLs
2. Add more portfolio/blog entries via admin CMS
3. Update `FIXES-HANDOVER.md` after any new CMS content changes
4. App Development remains in sitemap/backend but hidden from public service grid (by design)

---

## Quick reference — important files

```
Website/
├── FIXES-HANDOVER.md
├── client/src/
│   ├── lib/
│   │   ├── siteConfig.js       # Primary SEO builders
│   │   ├── corePagesSeo.js     # Contact, blogs, detail pages
│   │   ├── portfolioPageData.js
│   │   ├── mumbaiPageData.js
│   │   ├── expoPageData.js
│   │   ├── legalPageData.js
│   │   ├── eventUtils.js
│   │   ├── imageUtils.js
│   │   └── contactConstants.js
│   ├── components/
│   │   ├── General/Breadcrumbs.jsx
│   │   ├── General/SafeImage.jsx
│   │   ├── Legal/LegalPolicyShell.jsx
│   │   └── ExhibitionCal/*
│   └── app/
│       ├── sitemap.js
│       ├── event-calendar/**
│       ├── expo/**
│       └── portfolio/**
└── backend/scripts/
```

**Build:** `cd Website/client && npm run build` ✅

---

*Public website enhancement pass complete — June 27, 2026.*
