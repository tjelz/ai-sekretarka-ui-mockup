# Policy Pages Architecture - Yieldo AI Sekretarka

**Author:** System Architecture Designer
**Date:** 2025-11-11
**Status:** APPROVED
**Architecture Type:** Component-Based, Statically Generated Web Pages

---

## Executive Summary

This document outlines the technical architecture for implementing policy pages (Privacy Policy, Cookie Policy, Data Protection, Terms of Service, and Refund Policy) for the Yieldo platform. The architecture prioritizes **performance**, **maintainability**, **SEO optimization**, and **RODO/GDPR compliance**.

### Key Architectural Decisions

1. **Static Site Generation (SSG)** for optimal performance and SEO
2. **Component-based reusable architecture** for consistency
3. **Text file storage** for legal content (version controlled, human-readable)
4. **Polish URL slugs** for local market optimization
5. **Structured data integration** for enhanced search engine understanding

---

## 1. Route Structure

### Next.js App Router Implementation

All policy pages follow Next.js 15 App Router conventions with server-side rendering and static generation.

| Policy Type | Route Path | File Location | Content Source |
|-------------|------------|---------------|----------------|
| Privacy Policy | `/polityka-prywatnosci` | `src/app/polityka-prywatnosci/page.tsx` | `docs/policies/privacy.txt` |
| Cookie Policy | `/polityka-cookies` | `src/app/polityka-cookies/page.tsx` | `docs/policies/cookie.txt` |
| Data Protection | `/ochrona-danych` | `src/app/ochrona-danych/page.tsx` | `docs/policies/data-protection.txt` |
| Terms of Service | `/regulamin` | `src/app/regulamin/page.tsx` | `docs/policies/tos.txt` |
| Refund Policy | `/polityka-zwrotow` | `src/app/polityka-zwrotow/page.tsx` | `docs/policies/refund.txt` |

### Rationale

- **Polish URL slugs**: Target Polish market, improve local SEO, match content language
- **Semantic paths**: User-friendly, descriptive, memorable URLs
- **SEO-optimized**: Google prefers semantic URLs over generic paths like `/policy/privacy`

---

## 2. Component Architecture

### Component Hierarchy

```
PolicyPageLayout (Wrapper)
├── Header (Title + Dates)
├── BreadcrumbSchema (SEO)
├── PolicyNavigation (TOC Sidebar)
└── PolicyContent (Main Content)
    ├── Section (Auto-generated)
    ├── Section (Auto-generated)
    └── ContactCard (Optional)
```

### Core Components

#### 2.1 PolicyPageLayout

**Path:** `src/components/policy/PolicyPageLayout.tsx`

**Purpose:** Main layout wrapper providing consistent structure for all policy pages.

**Props:**
```typescript
interface PolicyPageLayoutProps {
  title: string           // Page title (e.g., "Polityka Prywatności")
  lastUpdated: string     // ISO date or display date
  effectiveDate: string   // ISO date or display date
  children: React.ReactNode
}
```

**Features:**
- Responsive container with max-width constraints
- Header section with title and date badges
- Breadcrumb navigation integration
- Print-friendly styling
- Schema.org WebPage structured data
- Mobile-first responsive design

**Dependencies:**
- `@/components/ui/card`
- `@/components/ui/separator`
- `@/components/seo/BreadcrumbSchema`

---

#### 2.2 PolicyContent

**Path:** `src/components/policy/PolicyContent.tsx`

**Purpose:** Typography-optimized content renderer with automatic heading anchors.

**Props:**
```typescript
interface PolicyContentProps {
  sections: PolicySection[]
}

interface PolicySection {
  id: string              // Anchor ID (auto-generated from title)
  level: 1 | 2 | 3 | 4   // Heading level
  title: string           // Section title
  content: string | string[] // Paragraph(s) or list items
}
```

**Features:**
- Tailwind Typography (`prose` classes) for beautiful text rendering
- Automatic heading anchors for deep linking
- Styled lists (ordered/unordered)
- Highlighted important sections
- Contact information cards
- Table rendering (if needed)

**Typography System:**
```css
/* Example prose styling */
.prose h2 { @apply text-3xl font-bold mt-10 mb-4; }
.prose h3 { @apply text-2xl font-semibold mt-8 mb-3; }
.prose p { @apply text-base leading-relaxed mb-4; }
.prose ul { @apply list-disc ml-6 space-y-2; }
```

---

#### 2.3 PolicyNavigation

**Path:** `src/components/policy/PolicyNavigation.tsx`

**Purpose:** Floating table of contents with scroll spy highlighting.

**Props:**
```typescript
interface PolicyNavigationProps {
  sections: PolicySection[]
  activeSection?: string
}
```

**Features:**
- Auto-generated from heading structure
- Scroll spy tracking (highlights current section)
- Smooth scroll behavior
- Sticky positioning on desktop
- Collapsible drawer on mobile
- Progress indicator

**Behavior:**
- Desktop: Fixed sidebar on the right
- Tablet: Collapsible panel
- Mobile: Drawer accessible via FAB (Floating Action Button)

---

#### 2.4 PolicyFooterLinks

**Path:** `src/components/policy/PolicyFooterLinks.tsx`

**Purpose:** Organized policy links for footer integration.

**Features:**
- Grid layout of all policy pages
- Icon representation for each policy type
- Responsive columns (1-3 columns based on screen size)
- Accessible link styling

---

## 3. Footer Integration

### Footer Component

**Path:** `src/components/layout/Footer.tsx`

**Structure:**
```typescript
interface FooterProps {
  variant?: 'default' | 'minimal'
}
```

**Layout Sections:**

1. **Products** (Column 1)
   - AI Sekretarka
   - Digital Presence
   - Kalkulator Oszczędności

2. **Company** (Column 2)
   - O Nas
   - Kontakt
   - Blog

3. **Legal** (Column 3)
   - Polityka Prywatności
   - Polityka Cookies
   - Ochrona Danych
   - Regulamin
   - Polityka Zwrotów

4. **Contact** (Column 4)
   - Email: info.yieldo@gmail.com
   - Address: ul. Drukarska 3, 30-348 Kraków
   - Social media links

**Bottom Bar:**
- Copyright notice: "© 2025 Yieldo Sp. z o.o. Wszystkie prawa zastrzeżone."
- RODO compliance badge

**Integration Point:**
```typescript
// src/app/layout.tsx
import Footer from '@/components/layout/Footer'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

---

## 4. SEO Metadata Structure

### Metadata Configuration

**File:** `src/app/metadata.ts`

Each policy page exports dedicated metadata:

```typescript
import { generateMetadata } from '@/lib/seo/metadata'

export const privacyPolicyMetadata: Metadata = generateMetadata({
  title: 'Polityka Prywatności - Ochrona Danych Osobowych',
  description: 'Polityka prywatności Yieldo zgodna z RODO. Dowiedz się, jak przetwarzamy i chronimy Twoje dane osobowe.',
  keywords: [
    'polityka prywatności',
    'RODO',
    'GDPR',
    'ochrona danych',
    'Yieldo',
    'prywatność danych'
  ],
  canonical: '/polityka-prywatnosci',
  noindex: false
})

export const cookiePolicyMetadata: Metadata = generateMetadata({
  title: 'Polityka Cookies - Zasady Używania Plików Cookie',
  description: 'Polityka cookies Yieldo. Informacje o plikach cookie używanych na stronie oraz ich zarządzanie.',
  keywords: [
    'polityka cookies',
    'pliki cookie',
    'zgoda na cookies',
    'Yieldo',
    'śledzenie'
  ],
  canonical: '/polityka-cookies',
  noindex: false
})

// ... similar exports for other policies
```

### Structured Data Schema

**Type:** WebPage (Schema.org)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Polityka Prywatności",
  "description": "Polityka prywatności Yieldo zgodna z RODO",
  "inLanguage": "pl-PL",
  "datePublished": "2025-10-21T00:00:00Z",
  "dateModified": "2025-10-21T00:00:00Z",
  "publisher": {
    "@type": "Organization",
    "name": "Yieldo Sp. z o.o.",
    "url": "https://www.yieldo.pl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.yieldo.pl/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.yieldo.pl/polityka-prywatnosci"
  }
}
```

### SEO Best Practices

1. **Title Tags:** < 60 characters, include primary keyword
2. **Meta Descriptions:** 120-160 characters, actionable
3. **Canonical URLs:** Prevent duplicate content issues
4. **Structured Data:** Enhance search engine understanding
5. **Internal Linking:** Link between related policy pages
6. **Mobile Optimization:** Responsive design, fast loading

---

## 5. Content Parser System

### Parser Utility

**Path:** `src/lib/policy/parser.ts`

**Purpose:** Convert plain text policy files to structured React components.

**Function Signature:**
```typescript
interface ParsedPolicy {
  title: string
  effectiveDate: string
  lastUpdated: string
  sections: PolicySection[]
}

function parsePolicyContent(filePath: string): ParsedPolicy
```

**Parsing Logic:**

1. **Extract Metadata:**
   - Title (first line)
   - Effective date ("Obowiązuje od:")
   - Last updated ("Ostatnia aktualizacja:")

2. **Identify Sections:**
   - Detect headings (lines followed by separator "⸻" or numbered)
   - Parse hierarchy (1., 1.1, 1.1.1, etc.)

3. **Parse Content:**
   - Paragraphs (text blocks)
   - Lists (bullet points "•" or numbered)
   - Tables (if present)

4. **Generate IDs:**
   - Convert heading titles to URL-safe IDs
   - Example: "1. Informacje ogólne" → "1-informacje-ogolne"

**Example Usage:**
```typescript
import { parsePolicyContent } from '@/lib/policy/parser'
import path from 'path'

export default function PrivacyPolicyPage() {
  const policyPath = path.join(process.cwd(), 'docs/policies/privacy.txt')
  const policy = parsePolicyContent(policyPath)

  return (
    <PolicyPageLayout
      title={policy.title}
      effectiveDate={policy.effectiveDate}
      lastUpdated={policy.lastUpdated}
    >
      <PolicyContent sections={policy.sections} />
    </PolicyPageLayout>
  )
}
```

---

## 6. Data Flow Architecture

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  docs/policies/*.txt (Source of Truth)                      │
│  - privacy.txt                                               │
│  - cookie.txt                                                │
│  - data-protection.txt                                       │
│  - tos.txt                                                   │
│  - refund.txt                                                │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Build Time: Parser (src/lib/policy/parser.ts)              │
│  - Read .txt files                                           │
│  - Extract metadata                                          │
│  - Parse sections & content                                  │
│  - Generate IDs                                              │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Structured Data (PolicySection[])                           │
│  {                                                           │
│    id: "1-informacje-ogolne",                               │
│    level: 2,                                                 │
│    title: "1. Informacje ogólne",                           │
│    content: ["Niniejsza Polityka Prywatności..."]           │
│  }                                                           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Page Component (src/app/polityka-prywatnosci/page.tsx)     │
│  - Import parsed data                                        │
│  - Inject metadata                                           │
│  - Render PolicyPageLayout                                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Client Rendering                                            │
│  ├── PolicyPageLayout (wrapper)                              │
│  ├── PolicyNavigation (TOC)                                  │
│  └── PolicyContent (sections)                                │
└─────────────────────────────────────────────────────────────┘
```

### Build Process

1. **Development:** Hot reload on .txt file changes
2. **Build:** Static pages generated via `next build`
3. **Deploy:** Pre-rendered HTML served from CDN
4. **Update:** Rebuild required for policy changes (acceptable for legal docs)

---

## 7. Architecture Decision Records (ADRs)

### ADR-001: Static Site Generation over Dynamic Rendering

**Context:** Policy pages need to be fast, SEO-friendly, and rarely change.

**Decision:** Use Static Site Generation (SSG) for all policy pages.

**Rationale:**
- Best performance (pre-rendered HTML)
- Optimal SEO (fully rendered at build time)
- Cost-effective (served from CDN)
- Policy changes are infrequent (rebuild acceptable)

**Consequences:**
- ✅ Sub-second load times
- ✅ Perfect SEO indexing
- ✅ Lower server costs
- ⚠️ Requires rebuild for content updates
- ✅ Content updates are rare, so acceptable

**Alternatives Considered:**
- Server-Side Rendering (SSR): Unnecessary overhead
- Client-Side Rendering (CSR): Poor SEO, slower initial load

---

### ADR-002: Text Files for Legal Content Storage

**Context:** Legal content needs version control, human readability, and easy editing.

**Decision:** Store policy content as plain .txt files in `docs/policies/`.

**Rationale:**
- Git-friendly (clear diffs)
- Human-readable (legal team can review)
- Separation of concerns (content vs. code)
- Easy to edit (no technical knowledge required)
- Audit trail via git history

**Consequences:**
- ✅ Version controlled
- ✅ Easy legal review
- ✅ Clear change history
- ⚠️ Requires parsing at build time
- ✅ Parser is one-time overhead

**Alternatives Considered:**
- CMS (Contentful, Sanity): Overkill for static legal docs
- Markdown: More features than needed, potential security issues
- Database: Adds complexity, unnecessary for static content

---

### ADR-003: Component-Based Reusable Architecture

**Context:** Five policy pages share similar structure and behavior.

**Decision:** Build reusable components (PolicyPageLayout, PolicyContent, PolicyNavigation).

**Rationale:**
- DRY principle (Don't Repeat Yourself)
- Consistent UI across all policies
- Easier maintenance (update once, apply everywhere)
- Faster development for future policies

**Consequences:**
- ✅ Consistent user experience
- ✅ Easier maintenance
- ✅ Faster feature additions
- ⚠️ Initial setup time
- ✅ Long-term time savings

**Alternatives Considered:**
- Duplicate page code: Maintenance nightmare
- Single page with routing: Poor SEO, complex state management

---

### ADR-004: Polish URL Slugs

**Context:** Yieldo targets the Polish market with .pl domain.

**Decision:** Use Polish URL slugs (e.g., `/polityka-prywatnosci` instead of `/privacy-policy`).

**Rationale:**
- Better local SEO (Google prefers localized URLs)
- User-friendly for Polish audience
- Matches content language
- Improves click-through rates in search results

**Consequences:**
- ✅ Better Polish SEO
- ✅ User-friendly URLs
- ✅ Consistent with .pl domain
- ⚠️ Non-standard for international sites
- ✅ Appropriate for Polish-only service

**Alternatives Considered:**
- English slugs: Inconsistent with Polish content
- Generic paths (/policy/1): Poor UX and SEO

---

### ADR-005: Auto-Generated Table of Contents

**Context:** Long legal documents need navigation aids.

**Decision:** Auto-generate TOC from heading structure using PolicyNavigation component.

**Rationale:**
- Improves UX (users can jump to relevant sections)
- No manual maintenance (automatically synced with content)
- Accessibility (keyboard navigation)
- Scroll spy enhances context awareness

**Consequences:**
- ✅ Better UX for long documents
- ✅ Zero maintenance overhead
- ✅ Accessible navigation
- ⚠️ Depends on proper heading structure
- ✅ Parser enforces structure

**Alternatives Considered:**
- Manual TOC: High maintenance, error-prone
- No TOC: Poor UX for long documents

---

## 8. Security & Compliance

### RODO/GDPR Compliance

1. **Content Accuracy:**
   - Clear administrator contact information
   - Explicit data processing purposes
   - User rights clearly stated
   - Cookie consent integration

2. **Data Minimization:**
   - No tracking on policy pages (without consent)
   - Analytics only with cookie consent
   - No third-party scripts (except essential)

3. **Transparency:**
   - Last updated dates displayed
   - Effective dates clearly marked
   - Change history available (git)

4. **User Rights:**
   - Contact email prominently displayed
   - Data request procedures documented
   - Unsubscribe mechanisms explained

### Security Measures

1. **SSL/TLS:** All pages served over HTTPS
2. **CSP Headers:** Content Security Policy headers
3. **No inline scripts:** All JS in separate files
4. **Sanitized content:** Parser sanitizes text input
5. **No user input:** Static pages, no forms (reduces attack surface)

### Accessibility (WCAG 2.1 AA)

1. **Semantic HTML:** Proper heading hierarchy
2. **Keyboard Navigation:** All interactive elements accessible
3. **Screen Reader Support:** ARIA labels where needed
4. **Color Contrast:** Minimum 4.5:1 ratio
5. **Print Accessibility:** Print-friendly styles

---

## 9. Performance Optimization

### Target Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| First Contentful Paint (FCP) | < 1.0s | User sees content quickly |
| Largest Contentful Paint (LCP) | < 2.0s | Main content loads fast |
| Total Blocking Time (TBT) | < 200ms | Page remains interactive |
| Cumulative Layout Shift (CLS) | < 0.1 | Stable layout |
| Time to Interactive (TTI) | < 3.0s | Fully interactive |

### Optimization Strategies

#### 1. Static Generation
- Pre-rendered HTML at build time
- Served from CDN edge locations
- No server-side rendering overhead

#### 2. Minimal JavaScript
- Components are mostly server-side rendered
- Only TOC scroll spy requires client JS
- Defer non-critical JavaScript
- Code splitting for TOC drawer (mobile only)

#### 3. CSS Optimization
- Tailwind CSS purging (removes unused styles)
- Critical CSS inlined
- Font optimization (preload critical fonts)

#### 4. Asset Optimization
- No images on policy pages (text-only)
- SVG icons inline (no HTTP requests)
- Gzip/Brotli compression

#### 5. Caching Strategy
```
Cache-Control: public, max-age=31536000, immutable (for static assets)
Cache-Control: public, max-age=3600, must-revalidate (for HTML)
```

#### 6. Code Splitting
```typescript
// Lazy load mobile TOC drawer
const PolicyNavigationMobile = dynamic(
  () => import('@/components/policy/PolicyNavigationMobile'),
  { ssr: false }
)
```

---

## 10. Implementation Phases

### Phase 1: Foundation (2-3 hours)

**Goal:** Build reusable component foundation.

**Tasks:**
1. Create `PolicyPageLayout` component
2. Create `PolicyContent` component
3. Create `PolicyNavigation` component
4. Build `parsePolicyContent` utility
5. Setup Tailwind Typography plugin

**Deliverables:**
- ✅ Reusable components
- ✅ Content parser utility
- ✅ Typography system configured

---

### Phase 2: Policy Pages (2-3 hours)

**Goal:** Implement all five policy pages.

**Tasks:**
1. Create `/polityka-prywatnosci/page.tsx`
2. Create `/polityka-cookies/page.tsx`
3. Create `/ochrona-danych/page.tsx`
4. Create `/regulamin/page.tsx`
5. Create `/polityka-zwrotow/page.tsx`
6. Add metadata exports to `src/app/metadata.ts`
7. Integrate structured data schemas

**Deliverables:**
- ✅ Five functional policy pages
- ✅ SEO metadata configured
- ✅ Structured data integrated

---

### Phase 3: Footer Integration (1-2 hours)

**Goal:** Create footer with policy links.

**Tasks:**
1. Create `Footer` component
2. Create `PolicyFooterLinks` component
3. Integrate Footer in `layout.tsx`
4. Style footer (responsive design)
5. Add social media links

**Deliverables:**
- ✅ Site-wide footer
- ✅ Policy links accessible from all pages
- ✅ Contact information displayed

---

### Phase 4: Polish & Optimization (2-3 hours)

**Goal:** Refine UX and optimize performance.

**Tasks:**
1. Add breadcrumb navigation
2. Implement smooth scroll behavior
3. Add print styles
4. Accessibility audit (WAVE, axe DevTools)
5. Performance optimization (Lighthouse)
6. Cross-browser testing (Chrome, Firefox, Safari)
7. Mobile responsiveness testing

**Deliverables:**
- ✅ Breadcrumb navigation
- ✅ Print-friendly pages
- ✅ WCAG 2.1 AA compliance
- ✅ 90+ Lighthouse score
- ✅ Cross-browser compatibility

---

## 11. File Structure

### New Files

```
src/
├── components/
│   ├── policy/
│   │   ├── PolicyPageLayout.tsx       # Main layout wrapper
│   │   ├── PolicyContent.tsx          # Content renderer
│   │   ├── PolicyNavigation.tsx       # TOC sidebar (desktop)
│   │   ├── PolicyNavigationMobile.tsx # TOC drawer (mobile)
│   │   ├── PolicyFooterLinks.tsx      # Policy links grid
│   │   └── index.ts                   # Barrel export
│   └── layout/
│       └── Footer.tsx                 # Site-wide footer
├── lib/
│   └── policy/
│       ├── parser.ts                  # Text file parser
│       ├── types.ts                   # TypeScript interfaces
│       └── index.ts                   # Barrel export
└── app/
    ├── polityka-prywatnosci/
    │   └── page.tsx                   # Privacy Policy page
    ├── polityka-cookies/
    │   └── page.tsx                   # Cookie Policy page
    ├── ochrona-danych/
    │   └── page.tsx                   # Data Protection page
    ├── regulamin/
    │   └── page.tsx                   # Terms of Service page
    └── polityka-zwrotow/
        └── page.tsx                   # Refund Policy page
```

### Modified Files

```
src/app/
├── layout.tsx          # Add Footer component
└── metadata.ts         # Add policy metadata exports
```

### Existing Files (Reference)

```
docs/policies/
├── privacy.txt
├── cookie.txt
├── data-protection.txt
├── tos.txt
└── refund.txt
```

---

## 12. Testing Strategy

### Unit Tests

**Framework:** Jest + React Testing Library

**Test Cases:**
1. `parsePolicyContent` utility
   - Correctly extracts title
   - Correctly extracts dates
   - Parses sections correctly
   - Generates valid IDs
   - Handles malformed input gracefully

2. `PolicyContent` component
   - Renders all sections
   - Generates heading anchors
   - Applies correct heading levels

3. `PolicyNavigation` component
   - Renders TOC from sections
   - Highlights active section
   - Handles smooth scroll

**Example Test:**
```typescript
describe('parsePolicyContent', () => {
  it('should extract title from first line', () => {
    const content = 'Polityka Prywatności\n\nObowiązuje od: 21.10.2025'
    const parsed = parsePolicyContent(content)
    expect(parsed.title).toBe('Polityka Prywatności')
  })
})
```

---

### Integration Tests

**Framework:** Playwright

**Test Cases:**
1. End-to-end page rendering
   - Page loads without errors
   - All sections visible
   - TOC navigation works
   - Breadcrumbs render correctly

2. Navigation between policies
   - Footer links work
   - Breadcrumb links work
   - Browser back/forward works

3. Responsive behavior
   - Mobile TOC drawer toggles
   - Desktop TOC stays fixed
   - Content reflows properly

**Example Test:**
```typescript
test('policy page navigation', async ({ page }) => {
  await page.goto('/polityka-prywatnosci')
  await page.click('footer a[href="/regulamin"]')
  await expect(page).toHaveURL('/regulamin')
  await expect(page.locator('h1')).toContainText('Regulamin')
})
```

---

### Manual Tests

**Accessibility:**
- ✅ WAVE browser extension (0 errors)
- ✅ axe DevTools (WCAG 2.1 AA)
- ✅ Keyboard navigation only
- ✅ Screen reader testing (NVDA/JAWS)

**Performance:**
- ✅ Lighthouse (target: 90+ for all metrics)
- ✅ WebPageTest (load time < 2s)
- ✅ PageSpeed Insights (desktop & mobile)

**Cross-Browser:**
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Mobile Devices:**
- ✅ iOS Safari (iPhone)
- ✅ Chrome Android
- ✅ Samsung Internet

**Print Layout:**
- ✅ Print preview looks good
- ✅ No broken layout
- ✅ QR code for return URL (optional)

---

## 13. Deployment Checklist

### Pre-Deployment

- [ ] All components pass unit tests
- [ ] Integration tests pass
- [ ] Lighthouse score > 90
- [ ] Accessibility audit passed
- [ ] Legal team reviewed content
- [ ] Copyright year updated
- [ ] Contact information accurate

### Deployment

- [ ] Build production bundle: `npm run build`
- [ ] Verify static pages generated in `.next/server/pages/`
- [ ] Deploy to Vercel/production
- [ ] Verify all routes accessible
- [ ] Check SEO metadata (view source)
- [ ] Test all footer links

### Post-Deployment

- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Vercel Analytics
- [ ] Check for 404 errors
- [ ] Verify HTTPS certificate
- [ ] Test from different locations (CDN edge)

---

## 14. Maintenance Plan

### Quarterly Review

**Legal Content:**
- Review RODO/GDPR compliance
- Update dates if content changed
- Check for new legal requirements

**Technical:**
- Update dependencies
- Audit Lighthouse scores
- Review accessibility

### Annual Review

**Full Audit:**
- Legal compliance review
- Content accuracy check
- Design refresh if needed
- Performance optimization

---

## 15. Monitoring & Analytics

### Metrics to Track

1. **Page Views:** Which policies are most visited?
2. **Bounce Rate:** Are users finding what they need?
3. **Time on Page:** Are policies readable/engaging?
4. **Scroll Depth:** How far do users read?
5. **Exit Pages:** Where do users leave?

### Tools

- **Google Analytics 4:** Page views, engagement
- **Vercel Analytics:** Performance, speed
- **Google Search Console:** SEO performance, errors
- **Hotjar (optional):** Heatmaps, session recordings

---

## 16. Risk Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Legal non-compliance | High | Low | Legal team review before deployment |
| Accessibility issues | Medium | Medium | Automated tools + manual testing |
| Performance degradation | Medium | Low | Lighthouse monitoring, CDN caching |
| Content updates break layout | Low | Medium | Unit tests for parser, visual regression tests |
| SEO indexing issues | High | Low | Structured data, sitemap, canonical URLs |

---

## 17. Success Criteria

### Technical Success

- ✅ All policy pages load in < 2 seconds
- ✅ Lighthouse score > 90 for all pages
- ✅ WCAG 2.1 AA compliance
- ✅ Zero console errors
- ✅ 100% unit test coverage for parser

### Business Success

- ✅ RODO/GDPR compliant
- ✅ Legal team approval
- ✅ Users can easily find and read policies
- ✅ No customer complaints about accessibility

### SEO Success

- ✅ All pages indexed by Google within 1 week
- ✅ Structured data validated (Rich Results Test)
- ✅ No duplicate content issues
- ✅ Proper canonical URLs

---

## 18. Future Enhancements

### Phase 2 Features (Optional)

1. **Multi-Language Support:**
   - English translations for international users
   - Language switcher in header

2. **Version History:**
   - Show previous versions of policies
   - Highlight changes between versions

3. **Interactive Elements:**
   - Expandable sections for long lists
   - Search functionality within policies

4. **Export Options:**
   - PDF download button
   - Email policy to user

5. **Analytics Dashboard:**
   - Track policy acceptance rates
   - Monitor read time and engagement

---

## 19. Conclusion

This architecture provides a robust, scalable, and performant foundation for policy pages on the Yieldo platform. Key strengths:

1. **Performance-First:** Static generation ensures sub-second load times
2. **Maintainable:** Component-based architecture reduces duplication
3. **SEO-Optimized:** Structured data and semantic HTML maximize visibility
4. **Compliant:** RODO/GDPR considerations built in from the start
5. **Accessible:** WCAG 2.1 AA compliance ensures inclusivity

The implementation can be completed in **8-11 hours** across four phases, with immediate benefits for compliance, SEO, and user experience.

---

## 20. Architecture Review Sign-Off

**Architect:** System Architecture Designer
**Date:** 2025-11-11
**Status:** ✅ APPROVED FOR IMPLEMENTATION

**Next Steps:**
1. Researcher to provide website structure analysis (if available)
2. Coder to implement Phase 1 (Foundation)
3. Reviewer to validate component quality
4. Tester to execute test plan

---

## Appendix A: Component Code Examples

### PolicyPageLayout.tsx (Skeleton)

```typescript
import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

interface PolicyPageLayoutProps {
  title: string
  lastUpdated: string
  effectiveDate: string
  children: ReactNode
}

export default function PolicyPageLayout({
  title,
  lastUpdated,
  effectiveDate,
  children
}: PolicyPageLayoutProps) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Strona główna', url: '/' },
          { name: title, url: '' }
        ]}
      />

      <div className="container mx-auto max-w-5xl py-12 px-4">
        <Card className="p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Obowiązuje od: {effectiveDate}</span>
              <Separator orientation="vertical" className="h-5" />
              <span>Ostatnia aktualizacja: {lastUpdated}</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </Card>
      </div>
    </>
  )
}
```

---

## Appendix B: Parser Algorithm Pseudocode

```
FUNCTION parsePolicyContent(filePath: string) -> ParsedPolicy

  1. Read file content
  content = readFile(filePath)

  2. Extract metadata
  lines = content.split('\n')
  title = lines[0].trim()
  effectiveDate = extractDate(lines, "Obowiązuje od:")
  lastUpdated = extractDate(lines, "Ostatnia aktualizacja:")

  3. Parse sections
  sections = []
  currentSection = null

  FOR EACH line IN lines
    IF line matches heading pattern (e.g., "1.", "⸻")
      IF currentSection exists
        sections.push(currentSection)

      currentSection = {
        id: generateId(line),
        level: detectLevel(line),
        title: line.trim(),
        content: []
      }
    ELSE IF line is not empty
      currentSection.content.push(line.trim())

  IF currentSection exists
    sections.push(currentSection)

  4. Return parsed policy
  RETURN {
    title,
    effectiveDate,
    lastUpdated,
    sections
  }
END FUNCTION
```

---

## Appendix C: References

### Standards & Specifications

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org WebPage](https://schema.org/WebPage)
- [RODO/GDPR Compliance](https://gdpr.eu/)

### Design Systems

- [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin)
- [shadcn/ui Components](https://ui.shadcn.com/)

### Performance

- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**END OF ARCHITECTURE DOCUMENT**
