# Quick Implementation Guide - SEO & llms.txt
## 🚀 Fast Track to AI Search Optimization

**Total Time:** ~2 hours
**Impact:** Major improvement in AI search visibility

---

## Phase 1: Critical Files (30 minutes)

### 1. Create llms.txt Route (10 min)

**File:** `/src/app/llms.txt/route.ts`

```typescript
export async function GET() {
  const content = `# Yieldo - AI Receptionist for Polish Businesses

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
- [Google Business Optimization](https://www.yieldo.pl/google-business): Local SEO and Google Business Profile management`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
```

**Test:** `curl http://localhost:3000/llms.txt`

---

### 2. Create robots.txt (5 min)

**File:** `/public/robots.txt`

```
# Yieldo - AI Receptionist
User-agent: *
Allow: /

# AI Crawlers
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

# Sitemaps
Sitemap: https://www.yieldo.pl/sitemap.xml
```

**Test:** `curl http://localhost:3000/robots.txt`

---

### 3. Create Structured Data Utility (15 min)

**File:** `/src/lib/seo/structured-data.ts`

```typescript
import Script from 'next/script';

export interface StructuredDataProps {
  data: object | object[];
  key?: string;
}

export function StructuredData({ data, key = 'structured-data' }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`${key}-${index}`}
          id={`${key}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
          strategy="beforeInteractive"
        />
      ))}
    </>
  );
}

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Yieldo AI Sekretarka",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web-based",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "299",
    "highPrice": "599",
    "priceCurrency": "PLN"
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
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Yieldo",
  "description": "Kompleksowe rozwiązania AI dla polskich firm",
  "url": "https://www.yieldo.pl",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PL"
  },
  "priceRange": "299-599 PLN",
  "areaServed": {
    "@type": "Country",
    "name": "Poland"
  },
  "availableLanguage": ["Polish"]
};

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.yieldo.pl${item.url}`
    }))
  };
}
```

---

## Phase 2: Add Schemas to Pages (45 minutes)

### 1. Update AI Sekretarka Page (15 min)

**File:** `/src/app/ai-sekretarka/page.tsx`

Add at the top of your component:

```typescript
import { StructuredData, productSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export default function AISekretar kaPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "" },
    { name: "AI Sekretarka", url: "/ai-sekretarka" }
  ]);

  return (
    <>
      <StructuredData data={[productSchema, breadcrumb]} />
      {/* Existing page content */}
    </>
  );
}
```

---

### 2. Update Root Layout (15 min)

**File:** `/src/app/layout.tsx`

Add LocalBusiness schema:

```typescript
import { StructuredData, localBusinessSchema } from '@/lib/seo/structured-data';

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <StructuredData data={localBusinessSchema} key="local-business" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

### 3. Add FAQ Schema (15 min)

**File:** `/src/app/ai-sekretarka-demo/page.tsx` or FAQ component

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
  ]
};

// Add to your FAQ component:
<StructuredData data={faqSchema} key="faq" />
```

---

## Phase 3: Testing & Validation (30 minutes)

### 1. Local Testing

```bash
# Start dev server
npm run dev

# Test llms.txt
curl http://localhost:3000/llms.txt

# Test robots.txt
curl http://localhost:3000/robots.txt

# Check in browser
open http://localhost:3000/llms.txt
open http://localhost:3000/robots.txt
```

---

### 2. Validate Structured Data

Visit these tools:

1. **Google Rich Results Test**
   - Go to: https://search.google.com/test/rich-results
   - Test: `https://www.yieldo.pl/ai-sekretarka`
   - Verify: Product and Breadcrumb schemas detected

2. **Schema.org Validator**
   - Go to: https://validator.schema.org/
   - Paste your schema JSON
   - Fix any errors

3. **View Page Source**
   - Right-click → View Page Source
   - Search for `application/ld+json`
   - Verify schemas are present

---

### 3. AI Search Testing

**After deployment, test with AI assistants:**

```
Ask ChatGPT: "What is Yieldo?"
Ask Claude: "Tell me about Yieldo AI Sekretarka"
Ask Perplexity: "Yieldo pricing Poland"
```

AI tools should cite your llms.txt content.

---

## Phase 4: Deployment (15 minutes)

### Pre-Deployment Checklist

- [ ] All files created and committed
- [ ] Local testing passed
- [ ] No console errors
- [ ] Schemas validated
- [ ] Build succeeds: `npm run build`

### Deploy

```bash
# Commit changes
git add .
git commit -m "feat: Add llms.txt and structured data for AI search optimization"
git push

# Deploy (depends on your hosting)
# Vercel: Automatic on push
# Other: Follow your deployment process
```

---

### Post-Deployment Verification

```bash
# Test production
curl https://www.yieldo.pl/llms.txt
curl https://www.yieldo.pl/robots.txt

# Check in browser
open https://www.yieldo.pl/llms.txt
```

---

## Monitoring Setup (30 minutes)

### 1. Google Search Console

1. Add property: `https://www.yieldo.pl`
2. Verify ownership
3. Submit sitemap
4. Monitor: "Enhancements" → "Product" section

### 2. Track llms.txt Usage

Add to your analytics (Google Analytics 4):

```typescript
// Track llms.txt views
gtag('event', 'page_view', {
  page_path: '/llms.txt',
  page_title: 'LLMs.txt'
});
```

### 3. Monitor AI Bot Traffic

Check server logs for these user agents:
- `GPTBot`
- `ChatGPT-User`
- `Claude-Web`
- `anthropic-ai`
- `Google-Extended`
- `CCBot`
- `PerplexityBot`

---

## Expected Results Timeline

### Week 1
- ✅ llms.txt indexed by AI search engines
- ✅ Structured data showing in Google Search Console
- ✅ AI bot traffic visible in logs

### Month 1
- ✅ AI assistants citing Yieldo in responses
- ✅ 5-10% increase in AI referral traffic
- ✅ Rich snippets appearing in Google

### Month 3
- ✅ 10%+ increase in AI referral traffic
- ✅ Featured snippets for key terms
- ✅ Improved rankings for "AI sekretarka"

---

## Troubleshooting

### llms.txt not loading
```bash
# Check file exists
ls -la /src/app/llms.txt/route.ts

# Check build output
npm run build

# Verify route works
curl http://localhost:3000/llms.txt
```

### Schemas not showing in Google
- Wait 24-48 hours for indexing
- Check Google Search Console for errors
- Validate JSON-LD syntax
- Ensure no JavaScript errors on page

### AI tools not citing content
- Verify llms.txt is publicly accessible
- Check robots.txt allows AI bots
- Wait 1-2 weeks for AI index updates
- Ensure content is clear and concise

---

## Quick Command Reference

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run lint               # Lint code

# Testing
curl http://localhost:3000/llms.txt
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml

# Validation
# Visit: https://search.google.com/test/rich-results
# Visit: https://validator.schema.org/

# Deployment
git add .
git commit -m "feat: SEO optimization"
git push
```

---

## Next Steps After Implementation

1. **Week 1:**
   - Monitor Google Search Console
   - Check AI bot traffic
   - Verify schemas indexed

2. **Week 2:**
   - Test AI assistant responses
   - Track llms.txt access logs
   - Adjust content based on feedback

3. **Month 1:**
   - Analyze AI referral traffic
   - Optimize based on performance
   - Add more structured data

4. **Ongoing:**
   - Update llms.txt with new features
   - Add customer reviews to schemas
   - Monitor rankings and visibility

---

## Support Resources

- **Full Documentation:** `/docs/seo-implementation-plan.md`
- **llms.txt Content:** `/docs/llmstxt-content.md`
- **All Schemas:** `/docs/structured-data-schemas.md`
- **llms.txt Spec:** https://llmstxt.org/
- **Schema.org Docs:** https://schema.org/

---

**Total Time Invested:** ~2 hours
**Expected ROI:** 10-15% traffic increase from AI search within 6 months

Good luck with your implementation! 🚀
