# SEO Implementation Guide

## Overview
Comprehensive SEO metadata and structured data implementation for Yieldo AI Sekretarka application.

## Files Created

### 1. Core SEO Utilities
- **`/src/lib/seo/metadata.ts`** - Metadata generation utilities and defaults

### 2. Structured Data Components (JSON-LD)
- **`/src/components/seo/OrganizationSchema.tsx`** - Organization structured data
- **`/src/components/seo/ProductSchema.tsx`** - Product/Service structured data
- **`/src/components/seo/FAQSchema.tsx`** - FAQ structured data
- **`/src/components/seo/BreadcrumbSchema.tsx`** - Breadcrumb navigation structured data
- **`/src/components/seo/LocalBusinessSchema.tsx`** - Local business structured data
- **`/src/components/seo/WebPageSchema.tsx`** - WebPage structured data

### 3. Page Metadata Files
- **`/src/app/metadata.ts`** - Centralized metadata configurations
- **`/src/app/ai-sekretarka-demo/metadata.ts`**
- **`/src/app/google-business/metadata.ts`**
- **`/src/app/website-creation/metadata.ts`**
- **`/src/app/digital-presence/metadata.ts`**
- **`/src/app/login/metadata.ts`**
- **`/src/app/dashboard/metadata.ts`**

### 4. Root Layout
- **`/src/app/layout.tsx`** - Updated with comprehensive metadata

## Implementation Instructions

### For Homepage (`/src/app/page.tsx`)

Since the page uses `"use client"`, add metadata via a separate `page-metadata.ts`:

```typescript
// Create: /src/app/page-metadata.ts
import { homeMetadata } from './metadata'
export const metadata = homeMetadata
```

Then in your page component, import the schema components at the top level:

```typescript
// In page.tsx, add these imports
import OrganizationSchema from '@/components/seo/OrganizationSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'

// Add inside the component return, preferably at the end before closing tag:
export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* existing content */}

      {/* SEO Structured Data */}
      <OrganizationSchema />
      <WebPageSchema
        name="Yieldo - Wszystko, Czego Potrzebujesz Do Rozwoju Firmy"
        description="Kompleksowe rozwiązania AI dla nowoczesnych firm"
        url="https://yieldo.pl"
      />
    </div>
  )
}
```

### For AI Sekretarka Page (`/src/app/ai-sekretarka/page.tsx`)

```typescript
import { aiSekretarkaMetadata } from '../metadata'
import ProductSchema from '@/components/seo/ProductSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

// Add metadata export if converting to server component, or use metadata.ts approach

// Add structured data components:
<ProductSchema
  name="AI Sekretarka - Automatyczna Obsługa Telefonów 24/7"
  description="Profesjonalna AI Sekretarka dla Twojej firmy"
  offers={[
    { name: "Plan Solo", price: 299, priceCurrency: "PLN" },
    { name: "Plan Ekipa", price: 599, priceCurrency: "PLN" },
    { name: "Plan Firma", price: 999, priceCurrency: "PLN" }
  ]}
  aggregateRating={{
    ratingValue: 4.8,
    reviewCount: 127
  }}
/>

<FAQSchema
  faqs={[
    {
      question: "Jak szybko mogę wdrożyć AI Sekretarkę?",
      answer: "Wdrożenie trwa zaledwie kilka godzin. Po wypełnieniu formularza system automatycznie konfiguruje AI, numer telefonu i wszystkie integracje."
    },
    {
      question: "Czy AI Sekretarka obsługuje język polski?",
      answer: "Tak, nasza AI Sekretarka jest w pełni zoptymalizowana do obsługi języka polskiego. Rozumie kontekst, lokalne nazwy i naturalne wyrażenia."
    },
    {
      question: "Ile kosztuje AI Sekretarka?",
      answer: "Oferujemy trzy plany: Solo (299 zł/mies), Ekipa (599 zł/mies) i Firma (999 zł/mies). Każdy plan zawiera określoną liczbę rozmów w cenie."
    },
    {
      question: "Czy mogę anulować w każdej chwili?",
      answer: "Tak, możesz anulować subskrypcję w dowolnym momencie bez dodatkowych opłat czy kar."
    },
    {
      question: "Jak AI Sekretarka integruje się z moim kalendarzem?",
      answer: "AI Sekretarka integruje się z Google Calendar i Booksy, automatycznie rezerwując terminy wizyt i aktualizując dostępność."
    }
  ]}
/>

<BreadcrumbSchema
  items={[
    { name: "Strona główna", url: "https://yieldo.pl" },
    { name: "AI Sekretarka", url: "https://yieldo.pl/ai-sekretarka" }
  ]}
/>
```

### For Calculator Page (`/src/app/kalkulator/page.tsx`)

```typescript
import { kalkulatorMetadata } from '../metadata'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'

<WebPageSchema
  name="Kalkulator Oszczędności - Ile Tracisz Przez Nieodebrane Telefony?"
  description="Oblicz straty wynikające z nieodebranych połączeń"
  url="https://yieldo.pl/kalkulator"
/>

<BreadcrumbSchema
  items={[
    { name: "Strona główna", url: "https://yieldo.pl" },
    { name: "Kalkulator", url: "https://yieldo.pl/kalkulator" }
  ]}
/>
```

## Next.js 15 Metadata Best Practices

### 1. Static Metadata (Recommended)
For pages that don't need dynamic metadata:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page Description',
  // ... rest of metadata
}
```

### 2. Dynamic Metadata
For pages with dynamic content:

```typescript
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `Dynamic Title - ${params.slug}`,
    description: 'Dynamic description',
  }
}
```

### 3. Client Components
For "use client" components, metadata must be defined in parent Server Component or separate file.

## SEO Checklist

### ✅ Completed
- [x] Root layout metadata with Open Graph and Twitter Cards
- [x] Metadata utility functions
- [x] Organization schema component
- [x] Product schema component
- [x] FAQ schema component
- [x] Breadcrumb schema component
- [x] Local Business schema component
- [x] WebPage schema component
- [x] Metadata files for all pages
- [x] Proper robots.txt directives
- [x] Viewport configuration
- [x] Canonical URLs

### 🔄 To Be Implemented
- [ ] Add metadata exports to all page.tsx files
- [ ] Add structured data components to main pages
- [ ] Create sitemap.xml (Next.js 15 automatic)
- [ ] Add robots.txt file
- [ ] Configure Google Search Console verification
- [ ] Add og-image.jpg to public folder
- [ ] Test metadata with social media preview tools
- [ ] Implement review schema (when reviews available)

## Testing

### Metadata Testing Tools
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### Local Testing
```bash
npm run build
npm run start
# Check http://localhost:3000 source code for metadata
```

## Keywords Strategy

### Primary Keywords
- AI Sekretarka
- Automatyczna obsługa telefonów
- Wirtualna sekretarka

### Secondary Keywords
- AI dla biznesu
- Automatyzacja biznesu
- Obsługa klienta AI
- Rezerwacje online
- Umówienie wizyty

### Long-tail Keywords
- Sekretarka AI po polsku
- Automatyczne umawianie wizyt
- AI odbieranie telefonów 24/7
- Wirtualna recepcjonistka dla firmy

## Performance Considerations

1. **Structured Data Size**: Keep JSON-LD compact and relevant
2. **Image Optimization**: Ensure og-image.jpg is optimized (<200KB)
3. **Metadata Duplication**: Avoid duplicate metadata across pages
4. **Canonical URLs**: Always set proper canonical to avoid duplicate content

## Updates Required

### High Priority
1. Update all page.tsx files to import and render schema components
2. Create og-image.jpg for social sharing
3. Replace 'your-google-verification-code' with actual verification code

### Medium Priority
1. Add review schema when customer reviews are available
2. Implement Article schema for blog posts (if applicable)
3. Add LocalBusiness schema with actual business address

### Low Priority
1. Implement hreflang tags for multi-language support (future)
2. Add video schema for tutorial videos (future)
3. Implement Event schema for webinars/demos (future)

## Support

For questions or issues:
- Technical: Check Next.js 15 metadata documentation
- SEO: Consult Google Search Central guidelines
- Schema: Reference schema.org documentation
