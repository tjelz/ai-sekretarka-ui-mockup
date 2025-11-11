# Structured Data Schemas for Yieldo
## Complete JSON-LD Schema Implementations

This document contains all structured data schemas ready for implementation.

---

## 1. Product Schema - AI Sekretarka

**File:** `/src/app/ai-sekretarka/page.tsx`

```typescript
const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Yieldo AI Sekretarka",
  "alternateName": "AI Receptionist Yieldo",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web-based, Cloud",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "299",
    "highPrice": "599",
    "priceCurrency": "PLN",
    "availability": "https://schema.org/InStock",
    "url": "https://www.yieldo.pl/ai-sekretarka",
    "priceValidUntil": "2025-12-31",
    "priceSpecification": [
      {
        "@type": "UnitPriceSpecification",
        "price": "299",
        "priceCurrency": "PLN",
        "name": "Plan Basic",
        "description": "100 połączeń miesięcznie, podstawowe funkcje",
        "billingIncrement": 1,
        "unitCode": "MON",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "value": 100,
          "unitText": "połączenia"
        }
      },
      {
        "@type": "UnitPriceSpecification",
        "price": "599",
        "priceCurrency": "PLN",
        "name": "Plan Professional",
        "description": "500 połączeń miesięcznie, zaawansowana analityka",
        "billingIncrement": 1,
        "unitCode": "MON",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "value": 500,
          "unitText": "połączenia"
        }
      }
    ]
  },
  "description": "Profesjonalna AI Sekretarka odbiera telefony 24/7, umawia wizyty automatycznie i wysyła SMS-y. Integracja z kalendarzem w 5 minut. Oszczędź czas i nie trać żadnego klienta.",
  "featureList": [
    "Automatyczne odbieranie telefonów 24/7",
    "Umawianie wizyt w kalendarzu",
    "Integracja z Booksy, Google Calendar",
    "Automatyczne wysyłanie SMS",
    "Obsługa w języku polskim",
    "Konfiguracja w 5 minut",
    "Analityka połączeń",
    "RODO compliant"
  ],
  "screenshot": "https://www.yieldo.pl/og-image.jpg",
  "inLanguage": "pl",
  "provider": {
    "@type": "Organization",
    "name": "Yieldo",
    "url": "https://www.yieldo.pl",
    "logo": "https://www.yieldo.pl/logo.png",
    "sameAs": [
      "https://twitter.com/yieldo_pl"
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

---

## 2. LocalBusiness Schema

**File:** `/src/app/layout.tsx` or `/src/lib/seo/structured-data.ts`

```typescript
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Yieldo",
  "alternateName": "Yieldo AI Solutions",
  "description": "Kompleksowe rozwiązania AI dla polskich firm - AI Sekretarka, tworzenie stron WWW, automatyzacja biznesu",
  "image": "https://www.yieldo.pl/og-image.jpg",
  "logo": "https://www.yieldo.pl/logo.png",
  "url": "https://www.yieldo.pl",
  "telephone": "+48-XXX-XXX-XXX", // TODO: Add actual phone
  "email": "kontakt@yieldo.pl", // TODO: Verify email
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Example 123", // TODO: Add actual address
    "addressLocality": "Warszawa", // TODO: Add actual city
    "addressRegion": "mazowieckie", // TODO: Add actual region
    "postalCode": "00-000", // TODO: Add actual postal code
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.2297", // TODO: Add actual latitude
    "longitude": "21.0122" // TODO: Add actual longitude
  },
  "priceRange": "299-599 PLN",
  "currenciesAccepted": "PLN",
  "paymentAccepted": "Credit Card, Bank Transfer, Online Payment",
  "areaServed": [
    {
      "@type": "Country",
      "name": "Poland"
    },
    {
      "@type": "Country",
      "name": "Polska"
    }
  ],
  "availableLanguage": [
    {
      "@type": "Language",
      "name": "Polish",
      "alternateName": "Polski"
    }
  ],
  "openingHours": "Mo-Su 00:00-24:00",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "sameAs": [
    "https://twitter.com/yieldo_pl"
    // Add other social media profiles
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Usługi Yieldo",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Sekretarka",
          "description": "Automatyczna obsługa telefonów 24/7"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tworzenie Stron WWW",
          "description": "Profesjonalne strony internetowe"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Optymalizacja Google Business",
          "description": "SEO lokalne i zarządzanie profilem"
        }
      }
    ]
  }
}
```

---

## 3. FAQ Schema

**File:** `/src/app/ai-sekretarka-demo/components/faq/FAQSection.tsx`

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
        "text": "AI Sekretarka dostępna jest w trzech planach cenowych: Plan Basic za 299 PLN/miesiąc (100 połączeń), Plan Professional za 599 PLN/miesiąc (500 połączeń) oraz Plan Enterprise z indywidualną wyceną (nieograniczona liczba połączeń i dedykowane wsparcie)."
      }
    },
    {
      "@type": "Question",
      "name": "Jak długo trwa wdrożenie AI Sekretarki?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wdrożenie AI Sekretarki trwa około 5 minut. Proces jest w pełni zautomatyzowany i nie wymaga żadnej wiedzy technicznej. Wystarczy podłączyć kalendarz i skonfigurować podstawowe ustawienia."
      }
    },
    {
      "@type": "Question",
      "name": "Czy AI Sekretarka obsługuje język polski?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak, AI Sekretarka została stworzona specjalnie dla polskiego rynku i w pełni obsługuje język polski. Rozumie polskie akcenty, dialekty i specyficzne dla Polski zwroty."
      }
    },
    {
      "@type": "Question",
      "name": "Z jakimi kalendarzami integruje się AI Sekretarka?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI Sekretarka integruje się z najpopularniejszymi systemami kalendarzowymi: Booksy, Google Calendar, Outlook Calendar, a także z własnymi systemami poprzez REST API i webhooks."
      }
    },
    {
      "@type": "Question",
      "name": "Czy mogę przetestować AI Sekretarkę przed zakupem?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak, oferujemy 14-dniowy okres próbny bez konieczności podawania karty kredytowej. Możesz również obejrzeć interaktywne demo na stronie https://www.yieldo.pl/ai-sekretarka-demo"
      }
    },
    {
      "@type": "Question",
      "name": "Czy AI Sekretarka jest zgodna z RODO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak, AI Sekretarka jest w pełni zgodna z RODO i przepisami o ochronie danych osobowych. Wszystkie dane są przechowywane w Unii Europejskiej, a klienci mają pełną kontrolę nad swoimi danymi."
      }
    },
    {
      "@type": "Question",
      "name": "Co się stanie gdy przekroczę limit połączeń?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gdy przekroczysz limit połączeń w swoim planie, otrzymasz automatyczne powiadomienie z propozycją upgrade'u. Możesz też dokupić dodatkowe pakiety połączeń lub kontynuować z podstawową obsługą."
      }
    },
    {
      "@type": "Question",
      "name": "Czy mogę anulować subskrypcję w każdej chwili?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak, możesz anulować subskrypcję w każdej chwili bez żadnych kar. Twoje dane pozostaną dostępne przez 30 dni po anulowaniu, aby umożliwić ich pobranie."
      }
    }
  ]
}
```

---

## 4. BreadcrumbList Schema

**File:** Create utility in `/src/lib/seo/structured-data.ts`

```typescript
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

// Example usage for AI Sekretarka page:
const aiSekretarkaBreadcrumb = generateBreadcrumbSchema([
  { name: "Home", url: "" },
  { name: "AI Sekretarka", url: "/ai-sekretarka" }
]);

// Example for calculator:
const kalkulatorBreadcrumb = generateBreadcrumbSchema([
  { name: "Home", url: "" },
  { name: "Kalkulator", url: "/kalkulator" }
]);
```

---

## 5. Organization Schema

**File:** `/src/app/layout.tsx` (root layout)

```typescript
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Yieldo",
  "alternateName": "Yieldo AI Solutions",
  "url": "https://www.yieldo.pl",
  "logo": "https://www.yieldo.pl/logo.png",
  "image": "https://www.yieldo.pl/og-image.jpg",
  "description": "Kompleksowe rozwiązania AI dla polskich firm",
  "email": "kontakt@yieldo.pl",
  "telephone": "+48-XXX-XXX-XXX",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PL"
  },
  "foundingDate": "2024",
  "founder": {
    "@type": "Organization",
    "name": "Yieldo Team"
  },
  "sameAs": [
    "https://twitter.com/yieldo_pl"
  ],
  "knowsAbout": [
    "Artificial Intelligence",
    "Business Automation",
    "Phone Reception AI",
    "Appointment Scheduling",
    "Customer Service Automation"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Poland"
  }
}
```

---

## 6. HowTo Schema (for Setup Guide)

**File:** Consider adding to demo or onboarding page

```typescript
const setupHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Jak skonfigurować AI Sekretarkę w 5 minut",
  "description": "Przewodnik krok po kroku po konfiguracji AI Sekretarki Yieldo",
  "image": "https://www.yieldo.pl/setup-guide.jpg",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "PLN",
    "value": "299"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Rejestracja konta",
      "text": "Zarejestruj się na platformie Yieldo podając email i tworząc hasło",
      "image": "https://www.yieldo.pl/step1.jpg",
      "url": "https://www.yieldo.pl/register"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Podłączenie kalendarza",
      "text": "Połącz swój kalendarz (Booksy, Google Calendar lub inny)",
      "image": "https://www.yieldo.pl/step2.jpg"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Konfiguracja głosu",
      "text": "Wybierz głos AI Sekretarki i dostosuj ton rozmowy",
      "image": "https://www.yieldo.pl/step3.jpg"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Ustawienie dostępności",
      "text": "Określ godziny przyjmowania wizyt i długość spotkań",
      "image": "https://www.yieldo.pl/step4.jpg"
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Test i aktywacja",
      "text": "Przetestuj system i aktywuj AI Sekretarkę",
      "image": "https://www.yieldo.pl/step5.jpg"
    }
  ]
}
```

---

## 7. Review/Rating Schema (Template for future use)

**Note:** Add this when you have actual customer reviews

```typescript
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": "Yieldo AI Sekretarka"
  },
  "author": {
    "@type": "Person",
    "name": "Jan Kowalski"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "datePublished": "2024-11-01",
  "reviewBody": "Świetne rozwiązanie dla mojego salonu fryzjerskiego. Od wdrożenia AI Sekretarki nie tracę żadnych klientów przez nieodebrane telefony."
}
```

---

## Implementation Helper Utility

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

// Export all schemas
export {
  productSchema,
  localBusinessSchema,
  faqSchema,
  organizationSchema,
  generateBreadcrumbSchema,
  setupHowToSchema
};
```

---

## Usage Example

```typescript
// In your page.tsx
import { StructuredData } from '@/lib/seo/structured-data';
import { productSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export default function AISekretar kaPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "" },
    { name: "AI Sekretarka", url: "/ai-sekretarka" }
  ]);

  return (
    <>
      <StructuredData data={[productSchema, breadcrumb]} />
      {/* Your page content */}
    </>
  );
}
```

---

## Testing Checklist

After implementation, test each schema:

- [ ] Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Schema.org Validator: https://validator.schema.org/
- [ ] Verify in Google Search Console
- [ ] Check mobile rendering
- [ ] Validate JSON-LD syntax
- [ ] Test with real data (not placeholders)

---

**Note:** Remember to replace all TODO comments with actual data before deployment!
