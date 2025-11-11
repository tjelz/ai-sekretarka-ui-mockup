# SEO Implementation Plan - llmstxt.org Integration
## Yieldo AI Receptionist Website

**Date:** 2025-11-11
**Domain:** https://www.yieldo.pl
**Target Market:** Polish (.pl)
**Primary Product:** AI Sekretarka (AI Receptionist)

---

## Executive Summary

This document outlines the SEO optimization strategy for Yieldo, focusing on llms.txt integration for AI search engines (2025 standard), structured data implementation, and Polish market optimization.

**Key Finding:** Yieldo currently has strong traditional SEO foundation but lacks:
1. ❌ llms.txt file (critical for AI search visibility)
2. ❌ robots.txt in public directory
3. ❌ Structured data (JSON-LD) for product and services
4. ⚠️ Limited schema markup for local business

---

## 1. llms.txt Specification (2025 Standard)

### What is llms.txt?

llms.txt is a new standard for helping Large Language Models (LLMs) understand website content. By 2025, LLM traffic is projected to reach 10% of all search volume, making this critical.

### File Location Options

**Option A: Static File (Recommended for simplicity)**
- Location: `/public/llms.txt`
- Served at: `https://www.yieldo.pl/llms.txt`

**Option B: Dynamic Route (Recommended for maintenance)**
- Location: `/src/app/llms.txt/route.ts`
- Served at: `https://www.yieldo.pl/llms.txt`

### Required Format

```markdown
# Site Name (H1 - REQUIRED)

> Brief project summary (Blockquote - Recommended)

Detailed project information in clear, concise paragraphs.

## Main Section (H2)
- [Link Title](URL): Brief description
- [Link Title](URL): Brief description

## Documentation
- [Documentation Link](URL): Description

## Optional
- [Secondary Information](URL)
```

---

## 2. Yieldo llms.txt Implementation

### Recommended Content Structure

```markdown
# Yieldo - AI Receptionist for Polish Businesses

> Yieldo provides AI-powered phone reception services for Polish businesses. Our AI Sekretarka answers calls 24/7, schedules appointments automatically, and integrates with popular calendar systems like Booksy and Google Calendar.

Yieldo is a comprehensive business automation platform focused on the Polish market. Our flagship product, AI Sekretarka, handles incoming phone calls using advanced natural language processing, eliminating missed calls and automating appointment scheduling.

## Core Services

- [AI Sekretarka](https://www.yieldo.pl/ai-sekretarka): 24/7 AI phone receptionist that answers calls, schedules appointments, and sends SMS confirmations. Starting at 299 PLN/month.
- [ROI Calculator](https://www.yieldo.pl/kalkulator): Calculate revenue loss from missed calls and potential savings with AI automation.
- [Digital Presence Package](https://www.yieldo.pl/digital-presence): Complete online presence solution including website creation and Google Business Profile optimization.
- [Product Demo](https://www.yieldo.pl/ai-sekretarka-demo): Interactive demonstration of AI Sekretarka capabilities and features.

## Key Features

- Automatic call answering 24/7 in Polish language
- Calendar integration (Booksy, Google Calendar, custom systems)
- Automated appointment scheduling and rescheduling
- SMS notifications and confirmations
- Multi-industry support (healthcare, beauty, professional services)
- 5-minute setup process
- GDPR compliant for Polish/EU market

## Target Industries

- Beauty salons and barbershops
- Healthcare clinics and dental practices
- Professional services (lawyers, accountants)
- Home services (plumbers, electricians)
- Fitness studios and wellness centers

## Pricing

- **Basic Plan**: 299 PLN/month - 100 calls, basic features
- **Professional Plan**: 599 PLN/month - 500 calls, advanced analytics
- **Enterprise Plan**: Custom pricing - Unlimited calls, dedicated support

## Technical Specifications

- Integration: REST API, webhooks, calendar APIs
- Languages: Polish (native), multi-language support planned
- Uptime: 99.9% SLA guarantee
- Data: Hosted in EU, GDPR compliant
- Setup: No technical knowledge required, 5-minute configuration

## Company Information

- Market: Poland (primary), Central Europe (expansion planned)
- Founded: 2024
- Domain: www.yieldo.pl
- Contact: Available through website contact forms
- Support: Polish language support available

## Optional

- [Dashboard](https://www.yieldo.pl/dashboard): Client dashboard (authentication required)
- [Analytics](https://www.yieldo.pl/dashboard/analytics): Call analytics and reporting
- [Website Creation](https://www.yieldo.pl/website-creation): Professional website development service
- [Google Business Optimization](https://www.yieldo.pl/google-business): Local SEO and Google Business Profile management
```

---

## 3. Sitemap Analysis & Recommendations

### Current Sitemap Structure (/src/app/sitemap.ts)

**Strengths:**
- ✅ 10 routes properly configured
- ✅ Priority levels correctly assigned
- ✅ Change frequency appropriate
- ✅ Daily updates for high-priority pages
- ✅ Dashboard routes marked with lower priority

**Issues Identified:**
- ⚠️ No alternate language links (hreflang)
- ⚠️ Missing structured data references
- ⚠️ No image sitemap integration

### Recommended Enhancements

```typescript
// Add to sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const baseUrl = 'https://www.yieldo.pl';

  // Add language alternates
  const routes = staticRoutes.map(route => ({
    ...route,
    alternates: {
      languages: {
        'pl': route.url,
        'en': `${route.url}?lang=en`, // Future English version
      }
    }
  }));

  return routes;
}
```

---

## 4. Structured Data Implementation (JSON-LD)

### Priority 1: Product Schema for AI Sekretarka

**Location:** `/src/app/ai-sekretarka/page.tsx`

```typescript
const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Yieldo AI Sekretarka",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web-based",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "299",
    "highPrice": "599",
    "priceCurrency": "PLN",
    "priceSpecification": [
      {
        "@type": "UnitPriceSpecification",
        "price": "299",
        "priceCurrency": "PLN",
        "name": "Basic Plan",
        "billingIncrement": 1,
        "unitCode": "MON"
      },
      {
        "@type": "UnitPriceSpecification",
        "price": "599",
        "priceCurrency": "PLN",
        "name": "Professional Plan",
        "billingIncrement": 1,
        "unitCode": "MON"
      }
    ]
  },
  "description": "Profesjonalna AI Sekretarka odbiera telefony 24/7, umawia wizyty automatycznie i wysyła SMS-y",
  "featureList": [
    "Automatyczne odbieranie telefonów 24/7",
    "Umawianie wizyt",
    "Integracja z kalendarzem",
    "Wysyłanie SMS",
    "Język polski"
  ],
  "inLanguage": "pl",
  "provider": {
    "@type": "Organization",
    "name": "Yieldo",
    "url": "https://www.yieldo.pl"
  }
}
```

### Priority 2: LocalBusiness Schema

**Location:** `/src/app/layout.tsx` or dedicated schema file

```typescript
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Yieldo",
  "description": "Kompleksowe rozwiązania AI dla polskich firm",
  "url": "https://www.yieldo.pl",
  "telephone": "+48-XXX-XXX-XXX", // Add actual phone
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PL",
    "addressLocality": "City", // Add actual city
    "addressRegion": "Region" // Add actual region
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "XX.XXXX", // Add actual coordinates
    "longitude": "XX.XXXX"
  },
  "priceRange": "299-599 PLN",
  "areaServed": {
    "@type": "Country",
    "name": "Poland"
  },
  "availableLanguage": ["Polish"],
  "paymentAccepted": "Credit Card, Bank Transfer",
  "openingHours": "Mo-Su 00:00-24:00"
}
```

### Priority 3: FAQ Schema

**Location:** `/src/app/ai-sekretarka-demo/components/faq/FAQSection.tsx`

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ile kosztuje AI Sekretarka?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI Sekretarka dostępna jest w trzech planach: Basic (299 PLN/miesiąc), Professional (599 PLN/miesiąc) oraz Enterprise (cena ustalana indywidualnie)."
      }
    },
    {
      "@type": "Question",
      "name": "Jak długo trwa wdrożenie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wdrożenie AI Sekretarki trwa około 5 minut. Nie wymaga żadnej wiedzy technicznej."
      }
    }
    // Add more FAQ items
  ]
}
```

### Priority 4: BreadcrumbList Schema

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.yieldo.pl"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "AI Sekretarka",
      "item": "https://www.yieldo.pl/ai-sekretarka"
    }
  ]
}
```

---

## 5. robots.txt Implementation

### Create: /public/robots.txt

```
# Yieldo - AI Receptionist
# https://www.yieldo.pl

User-agent: *
Allow: /

# AI Crawlers (GPT, Claude, Gemini, etc.)
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Allow: /
User-agent: PerplexityBot
Allow: /

# Disallow authenticated areas
Disallow: /dashboard/
Disallow: /api/
Disallow: /login
Disallow: /_next/

# Disallow search parameters
Disallow: /*?*

# Allow static assets
Allow: /*.css$
Allow: /*.js$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.svg$

# Sitemaps
Sitemap: https://www.yieldo.pl/sitemap.xml
Sitemap: https://www.yieldo.pl/llms.txt

# Crawl delay for non-AI bots
Crawl-delay: 1
```

---

## 6. Polish Market SEO Strategy

### Language Optimization

1. **Current Status:** ✅ Excellent
   - All metadata in Polish
   - locale: 'pl_PL' properly configured
   - Polish keywords well-targeted

2. **Recommendations:**
   - Add Polish language schema markup
   - Emphasize local terms (e.g., "polska firma", "polski rynek")
   - Use Polish customer testimonials in schema

### Local SEO Enhancements

```typescript
// Add to metadata
export const polishMarketEnhancements = {
  locale: 'pl_PL',
  alternateLocales: ['pl-PL', 'pl'],
  geo: {
    region: 'PL',
    placename: 'Poland',
    position: 'latitude;longitude' // Add actual coordinates
  },
  distribution: 'PL',
  audience: 'Polish businesses, Polish market'
}
```

### Polish-Specific Keywords Enhancement

Current keywords are good, but add:
- "polska AI sekretarka"
- "obsługa telefoniczna Polska"
- "automatyzacja dla polskich firm"
- "sekretarka wirtualna po polsku"
- "rezerwacje online Polska"

---

## 7. Implementation Priority & Timeline

### Phase 1: Critical (Week 1)
1. ✅ Create llms.txt file
2. ✅ Create robots.txt file
3. ✅ Add Product schema to /ai-sekretarka
4. ✅ Add LocalBusiness schema to layout

### Phase 2: High Priority (Week 2)
1. ⚠️ Add FAQ schema to demo page
2. ⚠️ Add BreadcrumbList to all pages
3. ⚠️ Enhance sitemap with alternates
4. ⚠️ Add Organization schema

### Phase 3: Medium Priority (Week 3)
1. 🔄 Add Review/Rating schema (when reviews available)
2. 🔄 Add HowTo schema for setup guide
3. 🔄 Add VideoObject schema for demo videos
4. 🔄 Create image sitemap

### Phase 4: Ongoing
1. 📊 Monitor AI search visibility
2. 📊 Track llms.txt usage in analytics
3. 📊 Update schemas with real data
4. 📊 Expand Polish market keywords

---

## 8. Technical Implementation Steps

### Step 1: Create llms.txt Route

**File:** `/src/app/llms.txt/route.ts`

```typescript
export async function GET() {
  const llmsTxt = `# Yieldo - AI Receptionist for Polish Businesses

> Yieldo provides AI-powered phone reception services for Polish businesses. Our AI Sekretarka answers calls 24/7, schedules appointments automatically, and integrates with popular calendar systems.

[... content from section 2 ...]
`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
```

### Step 2: Create Structured Data Utility

**File:** `/src/lib/seo/structured-data.ts`

```typescript
export function generateStructuredData(type: string, data: any) {
  return {
    __html: JSON.stringify(data, null, 2)
  };
}

export const schemas = {
  product: (productData) => ({ /* ... */ }),
  localBusiness: (businessData) => ({ /* ... */ }),
  faq: (faqItems) => ({ /* ... */ }),
  breadcrumb: (items) => ({ /* ... */ })
};
```

### Step 3: Add Schema to Pages

```typescript
// In page.tsx
import { generateStructuredData, schemas } from '@/lib/seo/structured-data';

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData('Product', schemas.product(...))}
      />
      {/* Page content */}
    </>
  );
}
```

### Step 4: Create robots.txt

Simply create `/public/robots.txt` with content from Section 5.

---

## 9. Monitoring & Analytics

### Track These Metrics

1. **AI Search Visibility**
   - ChatGPT citations
   - Claude Code references
   - Perplexity.ai appearances
   - Google SGE (Search Generative Experience) visibility

2. **Traditional SEO**
   - Google Search Console rankings
   - Organic traffic from Polish search engines
   - Keyword positions for target terms
   - Click-through rates

3. **llms.txt Specific**
   - Direct hits to /llms.txt endpoint
   - Referrers from AI tools
   - AI bot crawl frequency (from server logs)

### Tools Setup

```bash
# Add to Google Search Console
# Add to Google Analytics 4
# Monitor AI crawler activity in server logs
# Track llms.txt requests separately
```

---

## 10. Polish Market Competitive Advantages

### Emphasize in SEO:

1. **Native Polish Language**
   - "Natywny język polski"
   - "Obsługa w języku polskim"
   - "Polski system AI"

2. **Local Integration**
   - Polish calendar systems (Booksy integration emphasized)
   - Polish phone number support
   - PLN pricing (not Euro)
   - GDPR compliance for EU/Poland

3. **Cultural Understanding**
   - Polish business hours
   - Polish customer service expectations
   - Polish industry-specific terminology

4. **Market Focus**
   - "Dla polskich firm"
   - "Polski rynek"
   - "Polscy klienci"

---

## 11. Success Criteria

### 3 Months Goals

- ✅ llms.txt indexed by major AI search engines
- ✅ 10%+ increase in AI referral traffic
- ✅ Structured data passing Google Rich Results Test
- ✅ Featured snippets for target keywords
- ✅ Improved visibility in AI search results (ChatGPT, Claude, Perplexity)

### 6 Months Goals

- ✅ Top 3 positions for "AI sekretarka" in Poland
- ✅ 50+ backlinks from Polish business websites
- ✅ Rich snippets showing in SERPs
- ✅ AI search traffic representing 5-10% of total

### 12 Months Goals

- ✅ Market leader in Polish AI receptionist SEO
- ✅ 100+ positive reviews with schema markup
- ✅ Video snippets in search results
- ✅ AI search traffic representing 10-15% of total

---

## 12. Next Steps - Action Items

### For Development Team

1. **Immediate Actions:**
   - [ ] Create /src/app/llms.txt/route.ts
   - [ ] Create /public/robots.txt
   - [ ] Create /src/lib/seo/structured-data.ts utility

2. **This Week:**
   - [ ] Add Product schema to AI Sekretarka page
   - [ ] Add LocalBusiness schema to main layout
   - [ ] Test structured data with Google Rich Results Test

3. **Next Week:**
   - [ ] Add FAQ schema to demo page
   - [ ] Implement breadcrumb schema on all pages
   - [ ] Update sitemap with language alternates

### For Marketing Team

1. **Content Actions:**
   - [ ] Gather company address for LocalBusiness schema
   - [ ] Collect customer testimonials for Review schema
   - [ ] Prepare FAQ content with answers
   - [ ] Get actual phone number for contact

2. **Monitoring Setup:**
   - [ ] Set up Google Search Console tracking
   - [ ] Configure AI crawler monitoring
   - [ ] Create llms.txt analytics dashboard
   - [ ] Track AI referral sources

---

## Appendix A: Useful Resources

- llms.txt Specification: https://llmstxt.org/
- Schema.org Documentation: https://schema.org/
- Google Structured Data Guidelines: https://developers.google.com/search/docs/appearance/structured-data
- Polish SEO Best Practices: https://support.google.com/webmasters/answer/182192?hl=pl

---

## Appendix B: Testing Tools

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/
- llms.txt Validator: https://llmstxt.org/validator (when available)
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

---

**Document Version:** 1.0
**Last Updated:** 2025-11-11
**Owner:** SEO Specialist Agent
**Status:** Ready for Implementation
