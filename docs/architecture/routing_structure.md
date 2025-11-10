# Routing Structure for Yieldo Platform

**Version:** 1.0.0
**Date:** 2025-11-07
**Status:** Technical Specification

---

## Overview

This document defines the routing architecture for the expanded Yieldo platform with 4 products and their corresponding landing pages.

---

## 1. Route Tree

```
/                                   (app/page.tsx)
├── /ai-sekretarka                 (app/ai-sekretarka/page.tsx) ✅ Existing
├── /website-creation              (app/website-creation/page.tsx) ⭐ NEW
├── /google-business               (app/google-business/page.tsx) ⭐ NEW
├── /kalkulator                    (app/kalkulator/page.tsx) ✅ Existing
├── /login                         (app/login/page.tsx) 🔒 Feature-flagged
├── /dashboard                     (app/dashboard/page.tsx) 🔒 Feature-flagged
└── /api
    ├── /contact                   (app/api/contact/route.ts)
    └── /auth                      (app/api/auth/route.ts)
```

---

## 2. Route Specifications

### 2.1 Root Page (`/`)

**Purpose:** Product showcase and navigation hub

**File:** `src/app/page.tsx`

**Layout:** `src/app/layout.tsx`

**Sections:**
- Navbar with logo
- Hero section with 4 ProductCards in grid
- Footer with copyright

**SEO Metadata:**
```typescript
export const metadata: Metadata = {
  title: "Yieldo - Kompleksowe Rozwiązania AI dla Biznesu",
  description: "AI Sekretarka 24/7, Automatyzacja Dotacji, Tworzenie Stron WWW, Google Business Management. Nowoczesne narzędzia AI dla rozwoju Twojej firmy.",
  keywords: "AI dla biznesu, automatyzacja, AI sekretarka, tworzenie stron www, google business, dotacje dla firm",
  openGraph: {
    title: "Yieldo - 4 Produkty AI dla Twojego Biznesu",
    description: "Kompleksowe rozwiązania AI: obsługa klientów, marketing, online presence i fundraising.",
    type: "website",
    locale: "pl_PL",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }]
  }
}
```

**Performance Targets:**
- LCP: < 1.5s
- FID: < 100ms
- CLS: < 0.1

---

### 2.2 AI Sekretarka (`/ai-sekretarka`)

**Status:** ✅ Existing - No changes needed

**File:** `src/app/ai-sekretarka/page.tsx`

**Layout:** `src/app/ai-sekretarka/layout.tsx`

**SEO Metadata:**
```typescript
export const metadata: Metadata = {
  title: "AI Sekretarka 24/7 | Yieldo - Automatyczna Obsługa Telefonów",
  description: "AI Sekretarka odbiera telefony 24/7, umawia wizyty i wysyła SMS-y. Oszczędzaj czas i nigdy nie trać klienta. Konfiguracja w 5 minut.",
  keywords: "AI sekretarka, automatyczna obsługa telefonów, wirtualna recepcjonistka, umawianie wizyt AI"
}
```

**Route Behavior:**
- Direct navigation from root page ProductCard
- Breadcrumb: `Produkty / AI Sekretarka`
- Back button returns to `/`

---

### 2.3 Website Creation (`/website-creation`) ⭐ NEW

**Status:** New product landing page to be created

**File:** `src/app/website-creation/page.tsx`

**Layout:** `src/app/website-creation/layout.tsx`

**SEO Metadata:**
```typescript
export const metadata: Metadata = {
  title: "Tworzenie Stron WWW z AI | Yieldo - Profesjonalna Strona w 24h",
  description: "Stwórz profesjonalną stronę internetową w 24 godziny. AI projektuje responsywne strony z optymalizacją SEO. Od 999 zł.",
  keywords: "tworzenie stron www, AI website builder, responsywne strony, szybkie tworzenie stron, SEO",
  openGraph: {
    title: "Yieldo - Tworzenie Stron WWW z AI w 24 Godziny",
    description: "Profesjonalna strona internetowa stworzona przez AI. Responsive, SEO-friendly, gotowa w 1 dzień.",
    type: "website",
    locale: "pl_PL",
    images: [{ url: '/og-website-creation.png', width: 1200, height: 630 }]
  }
}
```

**Page Sections:**
1. Hero with website mockup preview
2. Features grid (4 cards)
3. Before/After portfolio section
4. Pricing table (3 tiers)
5. Implementation process (4 steps)
6. FAQ accordion
7. Contact form + CTA

**Route Behavior:**
- Navigate from root ProductCard (id: `website-creation`)
- Breadcrumb: `Produkty / Tworzenie Stron WWW`
- Navbar highlights "Strony WWW" link

---

### 2.4 Google Business (`/google-business`) ⭐ NEW

**Status:** New product landing page to be created

**File:** `src/app/google-business/page.tsx`

**Layout:** `src/app/google-business/layout.tsx`

**SEO Metadata:**
```typescript
export const metadata: Metadata = {
  title: "Google Business Profile | Yieldo - Automatyzacja Wizytówki Google",
  description: "Zarządzaj wizytówką Google z pomocą AI. Automatyczne posty, odpowiedzi na opinie, optymalizacja SEO lokalnego. Zwiększ widoczność w Google Maps.",
  keywords: "google business profile, wizytówka google, lokalne SEO, google maps, zarządzanie opiniami",
  openGraph: {
    title: "Yieldo - Automatyzacja Google Business Profile z AI",
    description: "AI zarządza Twoją wizytówką Google: posty, opinie, zdjęcia, SEO. Zwiększ lokalną widoczność.",
    type: "website",
    locale: "pl_PL",
    images: [{ url: '/og-google-business.png', width: 1200, height: 630 }]
  }
}
```

**Page Sections:**
1. Hero with Google Maps mockup
2. Features grid (automation, reviews, analytics)
3. Benefits section (local SEO, engagement)
4. Before/After comparison (ranking improvements)
5. Pricing table (single/multi-location plans)
6. Integration showcase (Google API, social media)
7. FAQ accordion
8. Contact form + CTA

**Route Behavior:**
- Navigate from root ProductCard (id: `google-business`)
- Breadcrumb: `Produkty / Google Business`
- Navbar highlights "Google Business" link

---

### 2.5 Kalkulator (`/kalkulator`)

**Status:** ✅ Existing - No changes needed

**File:** `src/app/kalkulator/page.tsx`

**Purpose:** Revenue loss calculator for AI Receptionist

**Route Behavior:**
- Accessible from Navbar on all pages
- Can be accessed directly via URL
- Standalone page (no breadcrumb)

---

### 2.6 Login (`/login`) 🔒

**Status:** Feature-flagged (NEXT_PUBLIC_DISABLE_AUTH=true)

**File:** `src/app/login/page.tsx`

**Purpose:** User authentication (currently disabled)

**Route Behavior:**
- Hidden from navigation when feature flag is on
- Returns 404 or redirects to `/` when disabled

---

### 2.7 Dashboard (`/dashboard`) 🔒

**Status:** Feature-flagged (protected route)

**File:** `src/app/dashboard/page.tsx`

**Purpose:** User admin panel (currently disabled)

**Route Behavior:**
- Protected route - requires authentication
- Redirects to `/login` if not authenticated

---

## 3. Navigation Configuration

### 3.1 Navbar Links

**Desktop Navigation:**
```typescript
// src/components/ui/navbar.tsx
const navLinks = [
  { href: '/ai-sekretarka', label: 'AI Sekretarka', icon: Phone },
  { href: '/website-creation', label: 'Strony WWW', icon: Globe },
  { href: '/google-business', label: 'Google Business', icon: MapPin },
  { href: '/kalkulator', label: 'Kalkulator', icon: Calculator }
]
```

**Mobile Navigation (Hamburger Menu):**
- Same links as desktop
- Additional: Login button (if auth enabled)
- Full-screen overlay menu

### 3.2 Breadcrumb Navigation

**Implementation:**
```typescript
// src/app/components/Breadcrumb.tsx
interface BreadcrumbItem {
  label: string
  href: string
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  '/ai-sekretarka': [
    { label: 'Produkty', href: '/' },
    { label: 'AI Sekretarka', href: '/ai-sekretarka' }
  ],
  '/website-creation': [
    { label: 'Produkty', href: '/' },
    { label: 'Tworzenie Stron WWW', href: '/website-creation' }
  ],
  '/google-business': [
    { label: 'Produkty', href: '/' },
    { label: 'Google Business', href: '/google-business' }
  ]
}
```

**Rendering:**
```tsx
<nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
  <ol className="flex items-center gap-2">
    <li><Link href="/">Produkty</Link></li>
    <li aria-hidden="true">/</li>
    <li aria-current="page" className="text-gray-900 font-semibold">
      {currentPageTitle}
    </li>
  </ol>
</nav>
```

---

## 4. URL Structure Best Practices

### 4.1 URL Conventions

✅ **Good URLs:**
- `/ai-sekretarka` (kebab-case, descriptive)
- `/website-creation` (English, SEO-friendly)
- `/google-business` (recognizable brand name)

❌ **Bad URLs:**
- `/ai_sekretarka` (snake_case)
- `/strony-www` (Polish, harder to read in URL)
- `/product/1` (non-descriptive)

### 4.2 URL Parameters

**Query Parameters (Optional):**
```typescript
// Example: Track marketing campaigns
/ai-sekretarka?utm_source=facebook&utm_campaign=summer2025

// Example: Pre-fill contact form
/website-creation?plan=business&ref=partner
```

**Dynamic Routes (Future):**
```typescript
// Future: Blog or case studies
/blog/[slug]           → /blog/jak-zautomatyzowac-recepcje
/case-studies/[id]     → /case-studies/salon-beauty-krakow
```

---

## 5. Redirects & Rewrites

### 5.1 Legacy URL Redirects

**Configuration:** `next.config.js`

```javascript
module.exports = {
  async redirects() {
    return [
      // Redirect old AI Receptionist URLs
      {
        source: '/receptionist',
        destination: '/ai-sekretarka',
        permanent: true // 301 redirect
      },
      // Redirect homepage variations
      {
        source: '/home',
        destination: '/',
        permanent: true
      },
      // Redirect old calculator URLs
      {
        source: '/calculator',
        destination: '/kalkulator',
        permanent: true
      }
    ]
  }
}
```

### 5.2 Rewrites (URL Masking)

```javascript
async rewrites() {
  return [
    // Example: Proxy to external API
    {
      source: '/api/external/:path*',
      destination: 'https://api.example.com/:path*'
    }
  ]
}
```

---

## 6. Route Protection & Middleware

### 6.1 Authentication Middleware

**File:** `src/middleware.ts`

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if auth is disabled
  const isAuthDisabled = process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true'

  if (isAuthDisabled) {
    // Redirect protected routes to homepage
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Check authentication for protected routes
  const isAuthenticated = request.cookies.get('auth_token')

  if (request.nextUrl.pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}
```

---

## 7. Error Handling

### 7.1 404 Not Found

**File:** `src/app/not-found.tsx`

```typescript
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-8">Strona nie została znaleziona</p>
        <Link href="/">
          <Button size="lg">
            Wróć do strony głównej
          </Button>
        </Link>
      </div>
    </div>
  )
}
```

### 7.2 Error Boundary

**File:** `src/app/error.tsx`

```typescript
'use client'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Coś poszło nie tak!
        </h2>
        <Button onClick={() => reset()}>
          Spróbuj ponownie
        </Button>
      </div>
    </div>
  )
}
```

---

## 8. Sitemap Generation

### 8.1 Static Sitemap

**File:** `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yieldo.pl'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/ai-sekretarka`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/website-creation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/google-business`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/kalkulator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    }
  ]
}
```

---

## 9. Robots.txt Configuration

**File:** `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/login']
      }
    ],
    sitemap: 'https://yieldo.pl/sitemap.xml'
  }
}
```

---

## 10. Route Analytics

### 10.1 Page View Tracking

**Implement in each page component:**

```typescript
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ProductPage() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title
      })
    }
  }, [pathname])

  // ... rest of component
}
```

### 10.2 Route Performance Monitoring

**Track route change performance:**

```typescript
// src/app/layout.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    // Measure route change duration
    const startTime = performance.now()

    return () => {
      const duration = performance.now() - startTime
      console.log(`Route ${pathname} rendered in ${duration}ms`)

      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'route_change',
          value: Math.round(duration),
          event_category: 'Performance'
        })
      }
    }
  }, [pathname])

  return <>{children}</>
}
```

---

## 11. Route Implementation Checklist

### Phase 1: Root Page Update
- [ ] Update `/` with 4-product grid
- [ ] Create `ProductCard` component
- [ ] Create `ProductGrid` component
- [ ] Update SEO metadata for root page
- [ ] Test responsive layout
- [ ] Deploy to staging

### Phase 2: Website Creation Route
- [ ] Create `/website-creation` directory
- [ ] Create `page.tsx` with all sections
- [ ] Create `layout.tsx` with SEO metadata
- [ ] Add hero images and assets
- [ ] Create pricing table component
- [ ] Test navigation from root page
- [ ] Deploy to staging

### Phase 3: Google Business Route
- [ ] Create `/google-business` directory
- [ ] Create `page.tsx` with all sections
- [ ] Create `layout.tsx` with SEO metadata
- [ ] Add mockups and screenshots
- [ ] Create integration showcase
- [ ] Test navigation from root page
- [ ] Deploy to staging

### Phase 4: Navigation & Polish
- [ ] Update `navbar.tsx` with new links
- [ ] Add breadcrumb navigation
- [ ] Implement route analytics
- [ ] Test all internal links
- [ ] Generate sitemap
- [ ] Submit to Google Search Console
- [ ] Deploy to production

---

## 12. Route Maintenance

### 12.1 Regular Checks
- Weekly: Check for broken links (use link checker tool)
- Monthly: Review analytics for 404 errors
- Quarterly: Audit SEO metadata freshness
- Annually: Review URL structure for improvements

### 12.2 Version Control
- Use feature branches for new routes
- Tag releases with route changes
- Document major routing updates in CHANGELOG

---

**Next Steps:**
1. Review routing structure with development team
2. Set up route monitoring and analytics
3. Begin Phase 1 implementation
4. Test all routes on staging before production deploy
