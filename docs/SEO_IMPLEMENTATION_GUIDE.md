# SEO Implementation Quick Start Guide
## AI Sekretarka (Yieldo) - Next.js 15 App Router

**Target Domain:** yieldo.pl
**Market:** Poland (Polish language)
**Framework:** Next.js 15.3.5 with App Router

---

## Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
npm install --save-dev schema-dts web-vitals
```

Already installed ✅

---

### 2. Update Root Layout Metadata

**File:** `/src/app/layout.tsx`

Add the comprehensive metadata (already partially done, needs completion):

```typescript
import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/StructuredData";
import { getOrganizationSchema } from "@/lib/seo/schemas/organization";
import { WebVitalsReporter } from "@/components/seo/WebVitalsReporter";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yieldo.pl'),

  title: {
    default: "AI Sekretarka 24/7 | Yieldo - Automatyzacja Obsługi Klienta",
    template: "%s | AI Sekretarka Yieldo"
  },

  // ... rest of metadata (see SEO_ARCHITECTURE.md)
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <StructuredData data={getOrganizationSchema()} />
      </head>
      <body className="antialiased">
        <WebVitalsReporter />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

---

### 3. Verify Critical Files

All files have been created:

```
✅ /docs/SEO_ARCHITECTURE.md
✅ /docs/IMPLEMENTATION_CHECKLIST.md
✅ /docs/ADR_SUMMARY.md
✅ /src/lib/seo/schemas/organization.ts
✅ /src/lib/seo/schemas/product.ts
✅ /src/lib/seo/schemas/faq.ts
✅ /src/lib/seo/schemas/breadcrumb.ts
✅ /src/components/seo/StructuredData.tsx
✅ /src/components/seo/WebVitalsReporter.tsx
✅ /src/lib/analytics/web-vitals.ts
✅ /src/app/sitemap.ts
✅ /src/app/robots.ts
```

---

### 4. Test Locally

```bash
# Build the project
npm run build

# Start production server
npm run start

# Test endpoints
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/robots.txt
```

---

## Implementation Priority

### Week 1: Foundation (Critical)

**Priority 1: Update Metadata**
- [ ] Update `/src/app/layout.tsx` with complete metadata
- [ ] Add Organization schema to root layout
- [ ] Add WebVitalsReporter component

**Priority 2: Page-Specific Metadata**
- [ ] Update `/src/app/ai-sekretarka/page.tsx` metadata
- [ ] Add Product schema to AI Sekretarka page
- [ ] Add FAQ schema to AI Sekretarka page

**Priority 3: Verify SEO Files**
- [ ] Test sitemap.xml accessibility
- [ ] Test robots.txt accessibility
- [ ] Verify structured data in Rich Results Test

---

### Week 2: Image Optimization

**Priority 1: Hero Images**
```typescript
// Add to all hero images
<Image
  src="/hero.jpg"
  alt="AI Sekretarka odbierająca telefony biznesowe całodobowo"
  width={1200}
  height={630}
  priority // Critical for LCP
  quality={90}
/>
```

**Priority 2: Alt Text Audit**
- [ ] Add Polish alt texts to all images
- [ ] Identify and optimize LCP images
- [ ] Convert images to WebP format

---

### Week 3: Core Web Vitals

**Priority 1: LCP Optimization**
- [ ] Add priority to hero images
- [ ] Preload critical fonts
- [ ] Enable Vercel Edge Network

**Priority 2: Performance Monitoring**
- [ ] Set up Google Search Console
- [ ] Configure Google Analytics 4
- [ ] Enable Vercel Analytics

---

### Week 4: Polish Market SEO

**Priority 1: Local SEO**
- [ ] Create Google Business Profile
- [ ] Add to Polish business directories
- [ ] Implement LocalBusiness schema

**Priority 2: Content Optimization**
- [ ] Optimize for Polish keywords
- [ ] Update content for local audience
- [ ] Add hreflang tags

---

## Critical URLs to Update

**Current base URL in code:** `https://www.yieldo.pl`

**Files to update when domain is finalized:**
1. `/src/app/layout.tsx` - metadataBase
2. `/src/app/sitemap.ts` - baseUrl constant
3. `/src/app/robots.ts` - baseUrl constant
4. `/src/lib/seo/schemas/organization.ts` - All URLs
5. `/src/lib/seo/schemas/product.ts` - All URLs
6. `/src/lib/seo/schemas/breadcrumb.ts` - Base URL in function

**Find and replace command:**
```bash
# When domain is confirmed, run:
grep -r "yieldo.pl" src/ docs/
# Then update all occurrences
```

---

## Testing Checklist

### Before Launch

**1. Structured Data Validation**
- [ ] Test in [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate in [Schema Markup Validator](https://validator.schema.org/)
- [ ] Check all schema types render correctly

**2. SEO Tools**
- [ ] Run Lighthouse audit (target score > 90)
- [ ] Test mobile usability
- [ ] Check Core Web Vitals in PageSpeed Insights
- [ ] Verify canonical URLs

**3. Accessibility**
```bash
# Test sitemap
curl https://www.yieldo.pl/sitemap.xml | head -20

# Test robots.txt
curl https://www.yieldo.pl/robots.txt

# Test structured data
curl https://www.yieldo.pl/ | grep -o '@type'
```

---

## Post-Launch Actions

### Day 1
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Request indexing for key pages

### Week 1
- [ ] Monitor indexing status
- [ ] Check for crawl errors
- [ ] Review Core Web Vitals report

### Week 2-4
- [ ] Track keyword rankings
- [ ] Analyze organic traffic
- [ ] Review user engagement metrics

### Monthly
- [ ] SEO performance review
- [ ] Competitor analysis
- [ ] Content optimization

---

## Key Performance Indicators (KPIs)

### Technical SEO
| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Score | > 90 | Lighthouse |
| LCP | < 2.5s | PageSpeed Insights |
| INP | < 200ms | PageSpeed Insights |
| CLS | < 0.1 | PageSpeed Insights |
| Indexed Pages | 100% | Search Console |

### Organic Performance
| Metric | Target | Tool |
|--------|--------|------|
| Organic Traffic | +50% MoM | Google Analytics |
| Keyword Rankings | Top 3 for primary KWs | SEMrush |
| Average Position | < 5.0 | Search Console |
| CTR | > 3% | Search Console |

---

## Primary Keywords (Polish Market)

**High Priority:**
- AI Sekretarka
- wirtualna sekretarka AI
- automatyczna obsługa telefonów
- AI asystent biznesowy
- inteligentna recepcjonistka

**Medium Priority:**
- automatyzacja obsługi klienta
- AI call center
- automatyczne umawianie wizyt
- obsługa telefonów 24/7
- wirtualny asystent dla firm

**Long-tail:**
- "jak działa AI sekretarka"
- "ile kosztuje wirtualna sekretarka"
- "AI sekretarka dla salonu kosmetycznego"
- "automatyczna obsługa telefonów dla firmy"

---

## Common Issues & Solutions

### Issue 1: Sitemap not accessible
**Solution:**
```bash
# Verify file exists
ls src/app/sitemap.ts

# Rebuild project
npm run build

# Check build output
ls .next/server/app/sitemap.xml
```

### Issue 2: Structured data not rendering
**Solution:**
```typescript
// Ensure Script component is in <head>
<head>
  <StructuredData data={getOrganizationSchema()} />
</head>
```

### Issue 3: Poor LCP score
**Solution:**
```typescript
// Add priority to hero image
<Image src="/hero.jpg" priority quality={90} />

// Preload critical fonts
<link rel="preload" href="/fonts/inter.woff2" as="font" />
```

---

## Quick Reference Links

**Documentation:**
- [Complete SEO Architecture](/docs/SEO_ARCHITECTURE.md)
- [Implementation Checklist](/docs/IMPLEMENTATION_CHECKLIST.md)
- [ADR Summary](/docs/ADR_SUMMARY.md)

**Testing Tools:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema Markup Validator](https://validator.schema.org/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

**Analytics:**
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Vercel Analytics](https://vercel.com/analytics)

---

## Support & Contact

**Architecture Documentation:** `/docs/SEO_ARCHITECTURE.md`
**Implementation Help:** Check IMPLEMENTATION_CHECKLIST.md
**Decision Context:** See ADR_SUMMARY.md

**Review Schedule:**
- Weekly during implementation (4 weeks)
- Monthly post-launch (3 months)
- Quarterly for strategic updates

---

## Next Steps

1. **Review** `/docs/SEO_ARCHITECTURE.md` for complete details
2. **Follow** `/docs/IMPLEMENTATION_CHECKLIST.md` for tasks
3. **Update** root layout with metadata and schemas
4. **Test** sitemap and robots.txt locally
5. **Deploy** and monitor in Google Search Console

---

**Last Updated:** 2025-11-10
**Status:** Ready for Implementation
**Estimated Time:** 4 weeks (80 hours total)

---

**Good luck with implementation!** 🚀
