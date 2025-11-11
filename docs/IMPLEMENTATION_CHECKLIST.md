# SEO Implementation Checklist
## AI Sekretarka (Yieldo) - Next.js 15 App Router

**Date Created:** 2025-11-10
**Status:** In Progress

---

## Phase 1: Foundation (Week 1)

### Critical Files Created
- [x] `/docs/SEO_ARCHITECTURE.md` - Complete architecture documentation
- [x] `/src/lib/seo/schemas/organization.ts` - Organization schema
- [x] `/src/lib/seo/schemas/product.ts` - Product schema
- [x] `/src/lib/seo/schemas/faq.ts` - FAQ schema
- [x] `/src/lib/seo/schemas/breadcrumb.ts` - Breadcrumb schema
- [x] `/src/components/seo/StructuredData.tsx` - Schema component
- [x] `/src/app/sitemap.ts` - Dynamic sitemap
- [x] `/src/app/robots.ts` - Robots.txt configuration
- [x] `/src/lib/analytics/web-vitals.ts` - Web Vitals tracking
- [x] `/src/components/seo/WebVitalsReporter.tsx` - Web Vitals reporter

### Dependencies to Install
- [x] `schema-dts` - TypeScript schema.org definitions
- [x] `web-vitals` - Core Web Vitals library

### Metadata Updates Needed
- [ ] Update `/src/app/layout.tsx` with complete metadata
  - [ ] Add metadataBase URL
  - [ ] Update title template
  - [ ] Add comprehensive keywords array
  - [ ] Add structured alternates
  - [ ] Add verification codes
- [ ] Update `/src/app/page.tsx` metadata
- [ ] Update `/src/app/ai-sekretarka/page.tsx` metadata
- [ ] Update `/src/app/kalkulator/page.tsx` metadata

### Structured Data Integration
- [ ] Add Organization schema to root layout
- [ ] Add Product schema to AI Sekretarka page
- [ ] Add FAQ schema to AI Sekretarka page
- [ ] Add Breadcrumb schema to all pages

---

## Phase 2: Image Optimization (Week 2)

### Image Audit
- [ ] Identify all images without Next.js Image component
- [ ] Add alt texts to all images (Polish language)
- [ ] Identify LCP images and add priority loading
- [ ] Convert images to WebP format
- [ ] Generate placeholder blur data URLs

### Image Locations to Update
- [ ] `/src/app/page.tsx` - Homepage hero images
- [ ] `/src/app/ai-sekretarka/layout.tsx` - Product images
- [ ] `/src/components/ui/navbar.tsx` - Logo images
- [ ] All other component images

### Alt Text Checklist
- [ ] Hero images: Descriptive with keywords
- [ ] Product features: Functional descriptions
- [ ] Logos: Brand names
- [ ] Icons: Empty alt for decorative
- [ ] Testimonials: Person identification

---

## Phase 3: Core Web Vitals Optimization (Week 3)

### LCP Optimization
- [ ] Identify LCP element on homepage
- [ ] Add priority loading to hero image
- [ ] Preload critical fonts
- [ ] Optimize font loading strategy
- [ ] Enable Vercel Edge Network

### INP Optimization
- [ ] Implement code splitting for heavy components
- [ ] Add debouncing to search/filter inputs
- [ ] Use React 19 concurrent features
- [ ] Defer non-critical third-party scripts

### CLS Optimization
- [ ] Define explicit dimensions for all images
- [ ] Add skeleton loaders for dynamic content
- [ ] Fix hydration layout shifts
- [ ] Set min-height for dynamic containers

### Performance Monitoring
- [ ] Set up Google Analytics 4
- [ ] Enable Vercel Analytics
- [ ] Configure Web Vitals reporting
- [ ] Set up Google Search Console

---

## Phase 4: Polish Market Optimization (Week 4)

### Localization
- [ ] Verify lang="pl" in HTML tag
- [ ] Add hreflang tags
- [ ] Implement LocalBusiness schema
- [ ] Add Polish business directory listings

### Local SEO
- [ ] Create Google Business Profile
- [ ] Add business to Panorama Firm
- [ ] Add business to Polskie Firmy
- [ ] Optimize for local keywords

### Content Optimization
- [ ] Keyword research for Polish market
- [ ] Optimize page titles with Polish keywords
- [ ] Update meta descriptions for Polish audience
- [ ] Create Polish-specific content

---

## Phase 5: Technical SEO (Ongoing)

### URL Structure
- [ ] Implement canonical URL component
- [ ] Create middleware for URL normalization
- [ ] Force HTTPS in production
- [ ] Enforce trailing slash consistency
- [ ] Remove www prefix

### Internal Linking
- [ ] Create breadcrumb navigation component
- [ ] Add related content links
- [ ] Optimize footer links
- [ ] Create internal linking strategy

### XML Sitemap
- [ ] Verify sitemap.xml is accessible
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Monitor sitemap coverage

---

## Testing & Validation

### Pre-Launch Checklist
- [ ] Test all pages in Google Rich Results Test
- [ ] Validate structured data in Schema Markup Validator
- [ ] Check mobile usability in Mobile-Friendly Test
- [ ] Run Lighthouse audit (target score > 90)
- [ ] Test Core Web Vitals in PageSpeed Insights
- [ ] Verify canonical URLs
- [ ] Check robots.txt is accessible
- [ ] Verify sitemap.xml format

### Browser Testing
- [ ] Chrome desktop
- [ ] Chrome mobile
- [ ] Safari desktop
- [ ] Safari mobile (iOS)
- [ ] Firefox
- [ ] Edge

---

## Post-Launch Monitoring

### Week 1
- [ ] Monitor Google Search Console for indexing
- [ ] Check Core Web Vitals report
- [ ] Review crawl errors
- [ ] Monitor site speed

### Week 2-4
- [ ] Track keyword rankings
- [ ] Analyze organic traffic growth
- [ ] Review user engagement metrics
- [ ] Check for broken links

### Monthly
- [ ] SEO performance review
- [ ] Competitor analysis
- [ ] Content gap analysis
- [ ] Backlink audit

---

## Priority Actions (Do First)

1. **Install Dependencies**
   ```bash
   npm install --save-dev schema-dts web-vitals
   ```

2. **Update Root Layout Metadata**
   - File: `/src/app/layout.tsx`
   - Add comprehensive metadata
   - Integrate Organization schema
   - Add WebVitalsReporter component

3. **Create Sitemap & Robots.txt**
   - Files already created: `sitemap.ts`, `robots.ts`
   - Verify base URL is correct
   - Test accessibility

4. **Optimize Hero Images**
   - Add Next.js Image component
   - Add priority loading
   - Add descriptive alt texts

5. **Set Up Analytics**
   - Configure Google Analytics 4
   - Enable Vercel Analytics
   - Set up Google Search Console

---

## Quick Reference Commands

```bash
# Install dependencies
npm install --save-dev schema-dts web-vitals

# Build and test
npm run build
npm run start

# Test sitemap
curl http://localhost:3000/sitemap.xml

# Test robots.txt
curl http://localhost:3000/robots.txt

# Run Lighthouse
npx lighthouse http://localhost:3000 --view

# Validate structured data
# Use: https://search.google.com/test/rich-results
```

---

## Notes

- **Domain:** yieldo.pl (update all base URLs)
- **Primary Market:** Poland (Polish language)
- **Target Keywords:** AI Sekretarka, wirtualna sekretarka, automatyczna obsługa telefonów
- **Next.js Version:** 15.3.5
- **React Version:** 19.0.0

---

## Contact

**SEO Architecture Designer:** [Your Name]
**Last Updated:** 2025-11-10
**Next Review:** Weekly during implementation

---

**Status Legend:**
- [ ] Not started
- [x] Completed
- 🟡 In progress
- 🔴 Blocked
