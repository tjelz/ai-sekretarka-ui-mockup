# SEO Quick Start Guide

## 🚀 5-Minute Integration

### 1. Import Schema Components
```typescript
// In any page.tsx file
import { ProductSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo'
```

### 2. Add to Page Component
```typescript
export default function YourPage() {
  return (
    <div>
      {/* Your page content */}

      {/* Add schemas before closing div */}
      <ProductSchema
        name="Your Product/Service"
        description="Description"
        offers={[{ name: "Plan", price: 299, priceCurrency: "PLN" }]}
      />
    </div>
  )
}
```

### 3. That's It! ✅

---

## 📦 Available Schema Components

### OrganizationSchema
```typescript
import { OrganizationSchema } from '@/components/seo'

<OrganizationSchema
  name="Yieldo"
  url="https://yieldo.pl"
  email="info.yieldo@gmail.com"
  telephone="+48-123-456-789"
/>
```

### ProductSchema
```typescript
import { ProductSchema } from '@/components/seo'

<ProductSchema
  name="AI Sekretarka"
  description="Automatyczna obsługa telefonów 24/7"
  offers={[
    { name: "Solo", price: 299, priceCurrency: "PLN" },
    { name: "Ekipa", price: 599, priceCurrency: "PLN" },
    { name: "Firma", price: 999, priceCurrency: "PLN" }
  ]}
  aggregateRating={{
    ratingValue: 4.8,
    reviewCount: 127
  }}
/>
```

### FAQSchema
```typescript
import { FAQSchema } from '@/components/seo'

<FAQSchema
  faqs={[
    {
      question: "Jak szybko mogę wdrożyć AI Sekretarkę?",
      answer: "Wdrożenie trwa zaledwie kilka godzin..."
    },
    {
      question: "Ile to kosztuje?",
      answer: "Oferujemy trzy plany od 299 zł/mies..."
    }
  ]}
/>
```

### BreadcrumbSchema
```typescript
import { BreadcrumbSchema } from '@/components/seo'

<BreadcrumbSchema
  items={[
    { name: "Strona główna", url: "https://yieldo.pl" },
    { name: "AI Sekretarka", url: "https://yieldo.pl/ai-sekretarka" }
  ]}
/>
```

### LocalBusinessSchema
```typescript
import { LocalBusinessSchema } from '@/components/seo'

<LocalBusinessSchema
  name="Yieldo"
  description="Profesjonalna AI Sekretarka"
  telephone="+48-123-456-789"
  address={{
    addressLocality: "Warszawa",
    addressCountry: "PL"
  }}
  openingHours={["Mo-Su 00:00-24:00"]}
/>
```

### WebPageSchema
```typescript
import { WebPageSchema } from '@/components/seo'

<WebPageSchema
  name="AI Sekretarka - Automatyczna Obsługa"
  description="Profesjonalna obsługa telefonów 24/7"
  url="https://yieldo.pl/ai-sekretarka"
  breadcrumbs={[
    { name: "Home", url: "https://yieldo.pl" },
    { name: "AI Sekretarka", url: "https://yieldo.pl/ai-sekretarka" }
  ]}
/>
```

---

## 🎯 Recommended Schema Combinations

### Homepage
```typescript
<OrganizationSchema />
<WebPageSchema name="..." description="..." url="..." />
```

### Product/Service Page
```typescript
<ProductSchema name="..." offers={[...]} />
<FAQSchema faqs={[...]} />
<BreadcrumbSchema items={[...]} />
```

### Location/Business Page
```typescript
<LocalBusinessSchema name="..." address={{...}} />
<WebPageSchema name="..." url="..." />
```

---

## 🧪 Testing Your Implementation

### 1. View Source
```bash
# Start dev server
npm run dev

# Open browser to http://localhost:3000
# Right-click → View Page Source
# Search for "application/ld+json"
# You should see your schema data
```

### 2. Google Rich Results Test
1. Go to: https://search.google.com/test/rich-results
2. Enter your URL or paste HTML
3. Click "Test URL"
4. Check for errors/warnings

### 3. Schema.org Validator
1. Go to: https://validator.schema.org/
2. Paste your schema JSON
3. Validate structure

---

## ✅ Pre-Launch Checklist

- [ ] All pages have appropriate schemas
- [ ] FAQ schema added to main pages
- [ ] Breadcrumbs on all sub-pages
- [ ] Organization schema on homepage
- [ ] Product schema with correct pricing
- [ ] og-image.jpg created (1200x630)
- [ ] Google verification code added
- [ ] All metadata tested
- [ ] Social sharing tested
- [ ] Mobile-friendly verified

---

## 🐛 Common Issues & Solutions

### Issue: Schema not appearing
**Solution**: Schemas only render on client-side, but are in HTML source. View page source to verify.

### Issue: TypeScript errors
**Solution**: Make sure to import types:
```typescript
import type { FAQItem } from '@/components/seo'
```

### Issue: "use client" conflicts
**Solution**: Schema components work fine in client components. They render as `<Script>` tags.

### Issue: Duplicate schemas
**Solution**: Only add each schema type once per page.

---

## 📚 More Resources

- **Full Documentation**: `/docs/SEO_IMPLEMENTATION.md`
- **Implementation Summary**: `/docs/IMPLEMENTATION_SUMMARY.md`
- **Next.js Metadata**: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **Schema.org**: https://schema.org/

---

## 💡 Pro Tips

1. **Start Simple**: Add OrganizationSchema to homepage first
2. **Test Often**: Use Google Rich Results Test after each addition
3. **Keep Updated**: Update pricing in ProductSchema when prices change
4. **Monitor**: Check Google Search Console for rich result performance
5. **Expand Gradually**: Add more schemas as you create more content

---

**Questions?** Check `/docs/SEO_IMPLEMENTATION.md` for detailed technical documentation.
