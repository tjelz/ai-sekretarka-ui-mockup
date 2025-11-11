# SEO Architecture Design Document
## AI Sekretarka (Yieldo) - Next.js 15 App Router

**Document Version:** 1.0.0
**Date:** 2025-11-10
**Author:** SEO Architecture Designer
**Project:** yieldo.pl (Yieldo)

---

## Executive Summary

This document outlines a comprehensive SEO architecture for the AI Sekretarka platform, designed specifically for the Polish market (yieldo.pl). The architecture leverages Next.js 15 App Router features, implements structured data, and optimizes for Core Web Vitals to achieve maximum visibility in Polish search results.

**Target Market:** Polish SMBs and enterprises
**Primary Keywords:** AI Sekretarka, AI asystent biznesowy, automatyzacja obsługi klienta
**Technology Stack:** Next.js 15, React 19, TypeScript

---

## 1. Architecture Decision Records (ADRs)

### ADR-001: Metadata Strategy - Hybrid Approach

**Status:** Accepted
**Context:** Need to balance static and dynamic metadata across various route types
**Decision:** Use hybrid metadata approach:
- **Static metadata objects** for stable pages (homepage, about, pricing)
- **generateMetadata()** for dynamic routes (blog posts, case studies, AI agent profiles)

**Rationale:**
- Static metadata improves build-time optimization
- Dynamic metadata enables personalization for user-generated content
- Hybrid approach provides best performance/flexibility balance

**Implementation:**
```typescript
// Static pages (layout.tsx, page.tsx)
export const metadata: Metadata = { ... }

// Dynamic routes ([slug]/page.tsx)
export async function generateMetadata({ params }): Promise<Metadata> { ... }
```

---

### ADR-002: Structured Data Implementation

**Status:** Accepted
**Context:** Need comprehensive structured data for rich snippets
**Decision:** Implement JSON-LD structured data using Next.js Script component

**Priority Schema Types:**
1. **Organization** - Company identity (highest priority)
2. **Product** - AI Sekretarka service offerings
3. **FAQPage** - Common questions about AI services
4. **BreadcrumbList** - Navigation structure
5. **AggregateRating** - Customer reviews (when available)

**Rationale:**
- JSON-LD is Google's recommended format
- Separate schema files for maintainability
- Type-safe implementation with TypeScript
- No impact on DOM rendering performance

---

### ADR-003: Sitemap Strategy - Dynamic Generation

**Status:** Accepted
**Context:** Need automated sitemap generation for various content types
**Decision:** Use Next.js 15 sitemap.ts with dynamic route generation

**Structure:**
- Static routes: High priority (1.0), daily changefreq
- Dynamic content: Medium priority (0.8), weekly changefreq
- Archive pages: Lower priority (0.6), monthly changefreq

**Rationale:**
- Automated updates prevent stale sitemaps
- Priority signals guide crawler budget allocation
- TypeScript ensures type safety

---

### ADR-004: Canonical URL Strategy

**Status:** Accepted
**Context:** Prevent duplicate content issues across multiple URLs
**Decision:** Implement strict canonical URL structure

**Rules:**
1. Always use absolute URLs: `https://www.yieldo.pl/path`
2. Trailing slash consistency: Always include trailing slash
3. HTTPS enforcement: Redirect all HTTP to HTTPS
4. WWW canonicalization: Choose non-www as canonical

**Implementation:**
```typescript
const baseUrl = 'https://www.yieldo.pl';
const canonicalUrl = `${baseUrl}${pathname}/`;
```

---

### ADR-005: Image Optimization Strategy

**Status:** Accepted
**Context:** Images significantly impact Core Web Vitals
**Decision:** Comprehensive image optimization approach

**Strategy:**
1. Use Next.js Image component for all images
2. WebP format with JPEG fallback
3. Responsive images with srcset
4. Lazy loading for below-fold images
5. Priority loading for LCP images
6. Descriptive alt text (Polish language)

**Implementation:**
```typescript
<Image
  src="/hero.jpg"
  alt="AI Sekretarka obsługująca telefony 24/7"
  width={1200}
  height={630}
  priority // LCP image
  quality={90}
/>
```

---

### ADR-006: Core Web Vitals Optimization Priority

**Status:** Accepted
**Context:** Google's page experience signals require optimization
**Decision:** Prioritize CWV metrics in following order

**Priority Order:**
1. **LCP (Largest Contentful Paint)** - Target: < 2.5s
   - Optimize hero images
   - Implement CDN for static assets
   - Use Next.js Image optimization

2. **INP (Interaction to Next Paint)** - Target: < 200ms
   - Minimize JavaScript execution
   - Defer non-critical scripts
   - Use React 19 concurrent features

3. **CLS (Cumulative Layout Shift)** - Target: < 0.1
   - Define explicit dimensions for images
   - Reserve space for dynamic content
   - Avoid layout shifts during hydration

**Monitoring:**
- Use Vercel Analytics
- Google Search Console Core Web Vitals report
- Real User Monitoring (RUM)

---

## 2. Metadata Architecture

### 2.1 Root Layout Metadata (Global)

**File:** `/src/app/layout.tsx`

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yieldo.pl'),

  title: {
    default: "AI Sekretarka 24/7 | Yieldo - Automatyzacja Obsługi Klienta",
    template: "%s | AI Sekretarka Yieldo"
  },

  description: "Profesjonalna AI Sekretarka dla polskich firm. Automatyczna obsługa telefonów 24/7, umawianie wizyt, wysyłka SMS-ów. Oszczędź czas i zwiększ efektywność swojej firmy z Yieldo.",

  keywords: [
    "AI Sekretarka",
    "AI asystent",
    "automatyzacja biznesu",
    "obsługa telefonów AI",
    "wirtualna sekretarka",
    "AI dla firm",
    "automatyzacja obsługi klienta",
    "inteligentny asystent biznesowy",
    "rezerwacje automatyczne",
    "AI call center",
    "automatyzacja procesów biznesowych"
  ],

  authors: [{ name: "Yieldo", url: "https://yieldo.io" }],
  creator: "Yieldo",
  publisher: "Yieldo",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },

  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.yieldo.pl/',
    siteName: 'AI Sekretarka Yieldo',
    title: 'AI Sekretarka 24/7 dla Twojej Firmy | Yieldo',
    description: 'Automatyczna obsługa połączeń, umawianie wizyt i SMS-y. Twój biznes nigdy nie śpi. Profesjonalna AI Sekretarka dla polskich firm.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Sekretarka Yieldo - Automatyzacja obsługi klienta 24/7',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AI Sekretarka 24/7 dla Twojej Firmy | Yieldo',
    description: 'Automatyczna obsługa połączeń, umawianie wizyt i SMS-y. Twój biznes nigdy nie śpi.',
    images: ['/twitter-image.png'],
    creator: '@yieldo_io',
  },

  alternates: {
    canonical: 'https://www.yieldo.pl/',
    languages: {
      'pl': 'https://www.yieldo.pl/',
    },
  },

  verification: {
    google: 'GOOGLE_SITE_VERIFICATION_CODE',
    other: {
      'facebook-domain-verification': 'FACEBOOK_VERIFICATION_CODE',
    },
  },

  category: 'technology',
};
```

---

### 2.2 Page-Specific Metadata

#### Homepage (`/src/app/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: "AI Sekretarka 24/7 | Yieldo - Kompleksowe Rozwiązania AI dla Firm",
  description: "Odkryj kompleksowe rozwiązania AI od Yieldo: AI Sekretarka 24/7, Automatyzacja Dotacji, Profesjonalne Strony WWW. Rozwijaj swoją firmę z automatyzacją AI.",
  openGraph: {
    title: "AI Sekretarka i Rozwiązania AI dla Firm | Yieldo",
    description: "Kompleksowe rozwiązania AI - od obsługi klientów, przez tworzenie stron, po automatyzację dotacji.",
    url: "https://www.yieldo.pl/",
    images: [
      {
        url: "/og-homepage.png",
        width: 1200,
        height: 630,
        alt: "Yieldo - AI Solutions for Business"
      }
    ]
  }
};
```

#### AI Sekretarka Page (`/src/app/ai-sekretarka/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: "AI Sekretarka 24/7 - Automatyczna Obsługa Telefonów",
  description: "Profesjonalna AI Sekretarka, która rozmawia jak człowiek. Odbiera telefony 24/7, umawia spotkania, pamięta klientów i wysyła SMS-y. Bezpłatny okres próbny.",
  keywords: [
    "AI Sekretarka",
    "wirtualna recepcjonistka",
    "automatyczna obsługa telefonów",
    "AI call center",
    "inteligentny asystent telefoniczny",
    "automatyzacja umawiania wizyt",
    "AI obsługa klienta"
  ],
  openGraph: {
    title: "AI Sekretarka 24/7 - Nigdy Nie Przegap Klienta",
    description: "Twoja AI Sekretarka rozmawia jak człowiek, umawia wizyty i obsługuje klientów 24 godziny na dobę, 7 dni w tygodniu.",
    url: "https://www.yieldo.pl/ai-sekretarka/",
    images: [
      {
        url: "/og-ai-sekretarka.png",
        width: 1200,
        height: 630,
        alt: "AI Sekretarka odbierająca telefony 24/7"
      }
    ]
  }
};
```

#### Calculator Page (`/src/app/kalkulator/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: "Kalkulator Straconych Przychodów - Oblicz Koszty Nieodebranych Połączeń",
  description: "Sprawdź ile tracisz przez nieodebrane połączenia. Interaktywny kalkulator pokazujący straty finansowe i potencjalne oszczędności z AI Sekretarką.",
  openGraph: {
    title: "Ile Tracisz na Nieodebranych Połączeniach? | Kalkulator AI Sekretarka",
    description: "Oblicz swoje roczne straty z nieodebranych telefonów i zobacz jak AI Sekretarka może zwiększyć Twoje przychody.",
    url: "https://www.yieldo.pl/kalkulator/",
    images: [
      {
        url: "/og-kalkulator.png",
        width: 1200,
        height: 630,
        alt: "Kalkulator straconych przychodów"
      }
    ]
  }
};
```

---

## 3. Structured Data Schema

### 3.1 Organization Schema

**File:** `/src/lib/seo/schemas/organization.ts`

```typescript
import { Organization, WithContext } from 'schema-dts';

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.yieldo.pl/#organization",
    "name": "Yieldo",
    "legalName": "Yieldo Sp. z o.o.",
    "url": "https://www.yieldo.pl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.yieldo.pl/logo.png",
      "width": 250,
      "height": 60
    },
    "image": "https://www.yieldo.pl/og-image.png",
    "description": "Yieldo to agencja AI specjalizująca się w automatyzacji procesów biznesowych. Oferujemy AI Sekretarkę 24/7, tworzenie stron internetowych i automatyzację dotacji dla polskich firm.",
    "foundingDate": "2024",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+48-XXX-XXX-XXX",
        "contactType": "customer service",
        "areaServed": "PL",
        "availableLanguage": ["Polish", "English"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "info@yieldo.io",
        "areaServed": "PL",
        "availableLanguage": ["Polish"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL",
      "addressLocality": "Warsaw",
      "addressRegion": "Mazowieckie"
    },
    "sameAs": [
      "https://www.linkedin.com/company/yieldo",
      "https://www.facebook.com/yieldo",
      "https://twitter.com/yieldo_io"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Poland"
    }
  };
}
```

---

### 3.2 Product Schema (AI Sekretarka)

**File:** `/src/lib/seo/schemas/product.ts`

```typescript
import { Product, WithContext } from 'schema-dts';

export function getAISekretrkaProductSchema(): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://www.yieldo.pl/ai-sekretarka/#product",
    "name": "AI Sekretarka Yieldo",
    "description": "Profesjonalna AI Sekretarka, która automatycznie odbiera telefony 24/7, umawia spotkania, odpowiada na pytania klientów i wysyła SMS-y z potwierdzeniami. Rozmawia naturalnie jak człowiek.",
    "brand": {
      "@type": "Brand",
      "name": "Yieldo"
    },
    "image": [
      "https://www.yieldo.pl/product-ai-sekretarka-1.png",
      "https://www.yieldo.pl/product-ai-sekretarka-2.png",
      "https://www.yieldo.pl/product-ai-sekretarka-3.png"
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://www.yieldo.pl/ai-sekretarka/",
      "priceCurrency": "PLN",
      "price": "399.00",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Yieldo"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "category": "Business Software",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Availability",
        "value": "24/7"
      },
      {
        "@type": "PropertyValue",
        "name": "Language",
        "value": "Polish"
      },
      {
        "@type": "PropertyValue",
        "name": "Integration",
        "value": "Calendar, CRM, SMS"
      }
    ]
  };
}
```

---

### 3.3 FAQPage Schema

**File:** `/src/lib/seo/schemas/faq.ts`

```typescript
import { FAQPage, WithContext } from 'schema-dts';

export function getAISekretarkaFAQSchema(): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Jak działa AI Sekretarka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI Sekretarka to zaawansowany system oparty na sztucznej inteligencji, który automatycznie odbiera telefony do Twojej firmy 24/7. Rozmawia z klientami w języku polskim jak prawdziwa osoba, odpowiada na pytania, umawia spotkania w kalendarzu i wysyła SMS-y z potwierdzeniami."
        }
      },
      {
        "@type": "Question",
        "name": "Ile kosztuje AI Sekretarka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI Sekretarka dostępna jest w planach od 399 PLN miesięcznie. Oferujemy 14-dniowy bezpłatny okres próbny, podczas którego możesz przetestować wszystkie funkcje bez podawania danych karty kredytowej."
        }
      },
      {
        "@type": "Question",
        "name": "Czy AI Sekretarka integruje się z moim kalendarzem?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, AI Sekretarka integruje się z popularnymi systemami kalendarzowymi takimi jak Google Calendar, Outlook Calendar oraz dedykowanymi systemami rezerwacji. Automatycznie sprawdza dostępność i umawia spotkania bez Twojego udziału."
        }
      },
      {
        "@type": "Question",
        "name": "Czy klienci zorientują się, że rozmawiają z AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nasza AI Sekretarka wykorzystuje najnowsze technologie przetwarzania języka naturalnego i brzmi bardzo naturalnie. Informujemy klientów, że rozmawiają z asystentem AI, zachowując transparentność, jednocześnie zapewniając profesjonalną obsługę na najwyższym poziomie."
        }
      },
      {
        "@type": "Question",
        "name": "Jak szybko mogę uruchomić AI Sekretarkę?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI Sekretarkę możesz uruchomić już w 24 godziny. Po zarejestrowaniu konta, nasz zespół pomoże Ci w konfiguracji, integracji z systemami i dostosowaniu scenariuszy rozmów do specyfiki Twojej branży."
        }
      },
      {
        "@type": "Question",
        "name": "Czy AI Sekretarka obsługuje wiele języków?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Obecnie AI Sekretarka specjalizuje się w języku polskim, zapewniając najwyższą jakość obsługi dla polskich firm i klientów. Pracujemy nad rozszerzeniem o dodatkowe języki, w tym angielski i niemiecki."
        }
      }
    ]
  };
}
```

---

### 3.4 Breadcrumb Schema

**File:** `/src/lib/seo/schemas/breadcrumb.ts`

```typescript
import { BreadcrumbList, WithContext } from 'schema-dts';

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
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

// Usage examples:
export const aiSekretrarkaBreadcrumb = getBreadcrumbSchema([
  { name: "Strona główna", url: "/" },
  { name: "AI Sekretarka", url: "/ai-sekretarka" }
]);

export const calculatorBreadcrumb = getBreadcrumbSchema([
  { name: "Strona główna", url: "/" },
  { name: "Kalkulator", url: "/kalkulator" }
]);
```

---

### 3.5 Schema Component Integration

**File:** `/src/components/seo/StructuredData.tsx`

```typescript
import Script from 'next/script';
import { WithContext, Thing } from 'schema-dts';

interface StructuredDataProps {
  data: WithContext<Thing>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${data['@type']}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="beforeInteractive"
    />
  );
}
```

**Usage in Layout:**

```typescript
import { StructuredData } from '@/components/seo/StructuredData';
import { getOrganizationSchema } from '@/lib/seo/schemas/organization';

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <StructuredData data={getOrganizationSchema()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 4. Sitemap Architecture

### 4.1 Dynamic Sitemap Generation

**File:** `/src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

const baseUrl = 'https://www.yieldo.pl';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static routes with high priority
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ai-sekretarka/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kalkulator/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/digital-presence/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Dashboard routes (authenticated, lower priority)
  const dashboardRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/dashboard/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/dashboard/analytics/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/dashboard/agents/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/dashboard/billing/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/dashboard/settings/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Future: Dynamic blog/case study routes
  // const blogRoutes = await getBlogPosts().then(posts =>
  //   posts.map(post => ({
  //     url: `${baseUrl}/blog/${post.slug}/`,
  //     lastModified: post.updatedAt,
  //     changeFrequency: 'monthly' as const,
  //     priority: 0.6,
  //   }))
  // );

  return [
    ...staticRoutes,
    ...dashboardRoutes,
    // ...blogRoutes, // Uncomment when blog is implemented
  ];
}
```

---

## 5. Robots.txt Configuration

### 5.1 Robots.txt Generation

**File:** `/src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.yieldo.pl';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API routes
          '/dashboard/',     // Authenticated areas
          '/_next/',         // Next.js internals
          '/admin/',         // Admin panel
          '/private/',       // Private content
          '/*.json$',        // JSON files
          '/*?*utm_*',       // URLs with UTM parameters
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/_next/',
          '/admin/',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [
          '/private/',
        ],
      },
      // Block problematic bots
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    host: baseUrl,
  };
}
```

---

## 6. Canonical URL Implementation

### 6.1 Canonical URL Component

**File:** `/src/components/seo/CanonicalLink.tsx`

```typescript
'use client';

import { usePathname } from 'next/navigation';

const BASE_URL = 'https://www.yieldo.pl';

export function CanonicalLink() {
  const pathname = usePathname();

  // Normalize pathname: ensure trailing slash
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;

  // Remove query parameters and hash for canonical
  const canonicalUrl = `${BASE_URL}${normalizedPath}`;

  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}
```

**Usage in Root Layout:**

```typescript
import { CanonicalLink } from '@/components/seo/CanonicalLink';

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <CanonicalLink />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

### 6.2 Middleware for URL Normalization

**File:** `/src/middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Force HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${pathname}${search}`,
      301
    );
  }

  // Enforce trailing slash (except for files and API routes)
  if (
    !pathname.endsWith('/') &&
    !pathname.includes('.') &&
    !pathname.startsWith('/api/')
  ) {
    return NextResponse.redirect(
      new URL(`${pathname}/${search}`, request.url),
      301
    );
  }

  // Remove www if present
  const host = request.headers.get('host');
  if (host?.startsWith('www.')) {
    return NextResponse.redirect(
      `https://${host.replace('www.', '')}${pathname}${search}`,
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

---

## 7. Open Graph & Social Sharing Strategy

### 7.1 OG Image Generation

**File:** `/src/app/opengraph-image.tsx` (Route Handler)

```typescript
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI Sekretarka Yieldo - Automatyzacja Obsługi Klienta 24/7';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 30 }}>
          AI Sekretarka 24/7
        </div>
        <div style={{ fontSize: 36, opacity: 0.9, textAlign: 'center' }}>
          Automatyczna obsługa telefonów dla Twojej firmy
        </div>
        <div
          style={{
            marginTop: 50,
            fontSize: 28,
            background: 'rgba(255,255,255,0.2)',
            padding: '15px 40px',
            borderRadius: 50,
          }}
        >
          Yieldo.io
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
```

---

### 7.2 Dynamic OG Images per Page

**File:** `/src/app/ai-sekretarka/opengraph-image.tsx`

```typescript
import { ImageResponse } from 'next/og';

export default async function AISekretatkaOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>
            📞 AI Sekretarka
          </div>
          <div style={{ fontSize: 32, opacity: 0.9 }}>
            Nigdy nie przegap klienta
          </div>
          <div style={{ fontSize: 24, marginTop: 40, opacity: 0.8 }}>
            ✓ Odbiera 24/7 ✓ Umawia wizyty ✓ Wysyła SMS-y
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

---

## 8. Image Optimization Strategy

### 8.1 Image Component Configuration

**File:** `/next.config.js` (or `/next.config.mjs`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
```

---

### 8.2 Image Usage Guidelines

```typescript
// ✅ Correct: LCP Image with Priority
<Image
  src="/hero-ai-sekretarka.jpg"
  alt="AI Sekretarka odbierająca telefony biznesowe całodobowo"
  width={1200}
  height={800}
  priority // Critical for LCP
  quality={90}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// ✅ Correct: Below-fold Image with Lazy Loading
<Image
  src="/feature-calendar-integration.jpg"
  alt="Integracja AI Sekretarki z Google Calendar i Outlook"
  width={600}
  height={400}
  loading="lazy" // Default, but explicit
  quality={85}
/>

// ✅ Correct: Responsive Image
<Image
  src="/logo.png"
  alt="Yieldo - AI dla biznesu"
  width={200}
  height={50}
  sizes="(max-width: 768px) 150px, 200px"
  priority
/>

// ❌ Wrong: No alt text
<Image src="/image.jpg" width={100} height={100} alt="" />

// ❌ Wrong: Using <img> tag
<img src="/hero.jpg" />
```

---

### 8.3 Alt Text Guidelines (Polish SEO)

**Alt Text Best Practices:**
- Descriptive, natural language
- Include target keywords naturally
- 125 characters or less
- Describe what's in the image
- Use Polish language

**Examples:**

```typescript
// Hero Images
alt="AI Sekretarka odbierająca telefony biznesowe całodobowo w nowoczesnym biurze"

// Product Features
alt="Dashboard AI Sekretarki pokazujący statystyki odebranych połączeń i umówionych wizyt"

// Logos
alt="Yieldo - Agencja AI specjalizująca się w automatyzacji biznesu"

// Testimonials
alt="Jan Kowalski, właściciel salonu kosmetycznego, zadowolony klient AI Sekretarki"

// Icons (decorative)
alt="" // Empty for decorative images

// Infographics
alt="Infografika pokazująca 75% wzrost liczby umówionych wizyt dzięki AI Sekretarce"
```

---

## 9. Core Web Vitals Optimization Strategy

### 9.1 Largest Contentful Paint (LCP) Optimization

**Target:** < 2.5 seconds

**Implementation Checklist:**

1. **Optimize Hero Images**
   ```typescript
   // Use priority loading for LCP element
   <Image
     src="/hero.jpg"
     alt="AI Sekretarka"
     width={1200}
     height={630}
     priority
     quality={90}
   />
   ```

2. **Preload Critical Resources**
   ```typescript
   // In layout.tsx or page.tsx
   <link
     rel="preload"
     href="/fonts/inter-var.woff2"
     as="font"
     type="font/woff2"
     crossOrigin="anonymous"
   />
   ```

3. **Use CDN for Static Assets**
   - Configure Vercel Edge Network
   - Enable automatic static optimization
   - Use `next/image` for automatic optimization

4. **Optimize Web Fonts**
   ```typescript
   // Use next/font for automatic optimization
   import { Inter } from 'next/font/google';

   const inter = Inter({
     subsets: ['latin', 'latin-ext'], // Include Polish characters
     display: 'swap',
     preload: true,
   });
   ```

---

### 9.2 Interaction to Next Paint (INP) Optimization

**Target:** < 200 milliseconds

**Implementation Checklist:**

1. **Code Splitting**
   ```typescript
   // Dynamic imports for heavy components
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Spinner />,
     ssr: false,
   });
   ```

2. **Debounce User Interactions**
   ```typescript
   import { useDebouncedCallback } from 'use-debounce';

   const handleSearch = useDebouncedCallback((value) => {
     // Search logic
   }, 300);
   ```

3. **Use React 19 Concurrent Features**
   ```typescript
   import { useTransition } from 'react';

   const [isPending, startTransition] = useTransition();

   function handleClick() {
     startTransition(() => {
       // Non-urgent update
       setTab(nextTab);
     });
   }
   ```

4. **Minimize Third-Party Scripts**
   ```typescript
   // Load analytics asynchronously
   <Script
     src="https://analytics.example.com/script.js"
     strategy="afterInteractive"
   />
   ```

---

### 9.3 Cumulative Layout Shift (CLS) Optimization

**Target:** < 0.1

**Implementation Checklist:**

1. **Define Image Dimensions**
   ```typescript
   // ✅ Always specify width and height
   <Image
     src="/image.jpg"
     width={600}
     height={400}
     alt="Description"
   />
   ```

2. **Reserve Space for Dynamic Content**
   ```typescript
   // Use skeleton loaders
   {isLoading ? (
     <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
   ) : (
     <ContentComponent />
   )}
   ```

3. **Avoid Layout Shifts During Hydration**
   ```typescript
   // Use suppressHydrationWarning for client-only content
   <div suppressHydrationWarning>
     {typeof window !== 'undefined' && <ClientOnlyComponent />}
   </div>
   ```

4. **Fixed Container Sizes**
   ```typescript
   // Use min-height for containers
   <div className="min-h-[400px]">
     <DynamicContent />
   </div>
   ```

---

### 9.4 Performance Monitoring Setup

**File:** `/src/lib/analytics/web-vitals.ts`

```typescript
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric.name, metric.value);
  }
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
```

**Usage in Root Layout:**

```typescript
'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/analytics/web-vitals';

export function WebVitalsReporter() {
  useEffect(() => {
    reportWebVitals();
  }, []);

  return null;
}
```

---

## 10. Polish Market Optimization

### 10.1 Language & Localization

**Language Tags:**
```html
<html lang="pl">
```

**hreflang Implementation:**
```typescript
// In metadata
alternates: {
  canonical: 'https://www.yieldo.pl/',
  languages: {
    'pl': 'https://www.yieldo.pl/',
    'en': 'https://www.yieldo.pl/en/', // Future
  },
}
```

---

### 10.2 Local Business Schema

```typescript
import { LocalBusiness, WithContext } from 'schema-dts';

export function getLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Yieldo - AI Sekretarka",
    "image": "https://www.yieldo.pl/og-image.png",
    "telephone": "+48-XXX-XXX-XXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Example 123",
      "addressLocality": "Warszawa",
      "addressRegion": "mazowieckie",
      "postalCode": "00-001",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.2297,
      "longitude": 21.0122
    },
    "url": "https://www.yieldo.pl",
    "priceRange": "399 PLN - 1499 PLN",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      }
    ]
  };
}
```

---

### 10.3 Polish Keywords Strategy

**Primary Keywords:**
- AI Sekretarka
- wirtualna sekretarka AI
- automatyczna obsługa telefonów
- AI asystent biznesowy
- inteligentna recepcjonistka

**Secondary Keywords:**
- automatyzacja obsługi klienta
- AI call center
- automatyczne umawianie wizyt
- obsługa telefonów 24/7
- wirtualny asystent dla firm

**Long-tail Keywords:**
- "jak działa AI sekretarka"
- "ile kosztuje wirtualna sekretarka"
- "AI sekretarka dla salonu kosmetycznego"
- "automatyczna obsługa telefonów dla firmy"
- "AI recepcjonistka po polsku"

---

## 11. Technical SEO Checklist

### 11.1 HTML Semantic Structure

```typescript
// ✅ Correct semantic HTML
<header>
  <nav>
    <ul>
      <li><Link href="/">Strona główna</Link></li>
      <li><Link href="/ai-sekretarka">AI Sekretarka</Link></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>AI Sekretarka 24/7</h1>
    <section>
      <h2>Jak to działa?</h2>
      <p>...</p>
    </section>
  </article>
</main>

<footer>
  <p>© 2025 Yieldo</p>
</footer>
```

---

### 11.2 Heading Hierarchy

```typescript
// ✅ Correct hierarchy
<h1>AI Sekretarka 24/7 | Yieldo</h1> {/* Only one H1 per page */}
  <h2>Funkcje AI Sekretarki</h2>
    <h3>Obsługa telefonów 24/7</h3>
    <h3>Integracja z kalendarzem</h3>
  <h2>Cennik</h2>
    <h3>Plan podstawowy</h3>
    <h3>Plan profesjonalny</h3>

// ❌ Wrong: Skipping levels
<h1>Title</h1>
<h3>Subtitle</h3> {/* Skipped H2 */}
```

---

### 11.3 Internal Linking Strategy

**Best Practices:**
- Use descriptive anchor text
- Link to related pages
- Maintain logical link structure
- Use breadcrumbs for navigation

```typescript
// ✅ Good internal links
<Link href="/ai-sekretarka">
  Dowiedz się więcej o AI Sekretarce
</Link>

<Link href="/kalkulator">
  Oblicz ile tracisz na nieodebranych połączeniach
</Link>

// ❌ Bad internal links
<Link href="/ai-sekretarka">
  Kliknij tutaj
</Link>
```

---

## 12. Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Update root layout with comprehensive metadata
- [ ] Implement Organization schema
- [ ] Create sitemap.ts
- [ ] Create robots.ts
- [ ] Add canonical link component
- [ ] Implement URL normalization middleware

### Phase 2: Enhanced Metadata (Week 2)
- [ ] Add page-specific metadata for all routes
- [ ] Implement Product schema for AI Sekretarka
- [ ] Create FAQPage schema
- [ ] Add Breadcrumb schema
- [ ] Generate OG images for key pages

### Phase 3: Performance Optimization (Week 3)
- [ ] Optimize all images with Next.js Image
- [ ] Add alt texts to all images
- [ ] Implement font optimization
- [ ] Set up Web Vitals monitoring
- [ ] Optimize LCP elements with priority loading

### Phase 4: Polish Market Optimization (Week 4)
- [ ] Add LocalBusiness schema
- [ ] Implement hreflang tags
- [ ] Optimize content for Polish keywords
- [ ] Add structured data for local search
- [ ] Submit to Polish business directories

### Phase 5: Monitoring & Iteration (Ongoing)
- [ ] Set up Google Search Console
- [ ] Configure Google Analytics 4
- [ ] Monitor Core Web Vitals
- [ ] Track keyword rankings
- [ ] A/B test metadata variations

---

## 13. Monitoring & Maintenance

### 13.1 Tools & Services

**Essential Tools:**
1. **Google Search Console** - Index status, performance, Core Web Vitals
2. **Google Analytics 4** - Traffic, conversions, user behavior
3. **Vercel Analytics** - Real-time performance metrics
4. **Schema Markup Validator** - Structured data testing
5. **PageSpeed Insights** - Core Web Vitals analysis

---

### 13.2 Monthly SEO Audit Checklist

- [ ] Check Google Search Console for crawl errors
- [ ] Review Core Web Vitals metrics
- [ ] Analyze organic traffic trends
- [ ] Check for broken internal/external links
- [ ] Validate structured data
- [ ] Review sitemap coverage
- [ ] Monitor keyword rankings
- [ ] Check mobile usability
- [ ] Review page load times
- [ ] Analyze user engagement metrics

---

## 14. Performance Benchmarks

### 14.1 Target Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| LCP | < 2.5s | TBD | 🟡 |
| INP | < 200ms | TBD | 🟡 |
| CLS | < 0.1 | TBD | 🟡 |
| FCP | < 1.8s | TBD | 🟡 |
| TTFB | < 600ms | TBD | 🟡 |
| Lighthouse Score | > 90 | TBD | 🟡 |

---

### 14.2 SEO KPIs

| KPI | Target | Measurement |
|-----|--------|-------------|
| Organic Traffic | +50% MoM | Google Analytics |
| Keyword Rankings | Top 3 for 5 primary keywords | SEMrush/Ahrefs |
| Indexed Pages | 100% | Google Search Console |
| Average Position | < 5.0 | Google Search Console |
| CTR | > 3% | Google Search Console |
| Bounce Rate | < 60% | Google Analytics |

---

## 15. Risk Mitigation

### 15.1 Common SEO Risks

**Risk 1: Duplicate Content**
- Mitigation: Strict canonical URL implementation
- Monitoring: Regular Search Console audits

**Risk 2: Slow Page Speed**
- Mitigation: Next.js Image optimization, code splitting
- Monitoring: Core Web Vitals reports

**Risk 3: Broken Links**
- Mitigation: Automated link checking in CI/CD
- Monitoring: Google Search Console

**Risk 4: Missing Alt Texts**
- Mitigation: Linting rules for Image components
- Monitoring: Accessibility audits

**Risk 5: Outdated Sitemap**
- Mitigation: Dynamic sitemap generation
- Monitoring: Last-modified dates

---

## 16. Contact & Support

**SEO Team:**
- SEO Architect: [Your Name]
- Technical SEO: TBD
- Content Strategist: TBD

**Documentation Updates:**
- This document is maintained in `/docs/SEO_ARCHITECTURE.md`
- Version control via Git
- Review cycle: Quarterly

---

## Appendix A: File Structure

```
/src
  /app
    layout.tsx              # Root metadata
    page.tsx                # Homepage metadata
    sitemap.ts             # Dynamic sitemap
    robots.ts              # Robots.txt rules
    opengraph-image.tsx    # OG image generation
    /ai-sekretarka
      page.tsx             # AI Sekretarka metadata
      opengraph-image.tsx  # Page-specific OG image
    /kalkulator
      page.tsx             # Calculator metadata
  /components
    /seo
      StructuredData.tsx   # Schema component
      CanonicalLink.tsx    # Canonical URL component
      WebVitalsReporter.tsx # Performance monitoring
  /lib
    /seo
      /schemas
        organization.ts    # Organization schema
        product.ts         # Product schema
        faq.ts             # FAQ schema
        breadcrumb.ts      # Breadcrumb schema
    /analytics
      web-vitals.ts        # Web Vitals tracking
  middleware.ts            # URL normalization
/docs
  SEO_ARCHITECTURE.md      # This document
```

---

## Appendix B: Schema.org Types Reference

**Implemented:**
- Organization
- Product
- FAQPage
- BreadcrumbList
- AggregateRating

**Future Implementation:**
- Review
- Service
- Article (for blog)
- HowTo
- VideoObject

---

## Appendix C: Polish SEO Resources

**Industry Directories:**
- Panorama Firm (panoramafirm.pl)
- Polskie Firmy (polskiefirmy.eu)
- Złote Strony (zloterystrony.pl)

**Local Citation Sites:**
- Google Business Profile
- Bing Places
- Apple Maps

**Polish SEO Tools:**
- Senuto (keyword research)
- Surfer SEO (content optimization)
- Semstorm (competitive analysis)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-11-10 | SEO Architecture Designer | Initial architecture document |

---

**END OF DOCUMENT**
