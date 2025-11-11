# Policy Pages - Implementation Guide

**Quick Start Guide for Developers**

This is a practical, step-by-step guide for implementing the policy pages architecture. For detailed architectural decisions, see [POLICY_PAGES_ARCHITECTURE.md](./POLICY_PAGES_ARCHITECTURE.md).

---

## Prerequisites

- Next.js 15 project setup ✅ (already configured)
- Tailwind CSS ✅ (already configured)
- TypeScript ✅ (already configured)
- Content in `docs/policies/*.txt` ✅ (already available)

---

## Implementation Phases

### Phase 1: Foundation Components (2-3 hours)

#### Step 1.1: Install Tailwind Typography

```bash
npm install -D @tailwindcss/typography
```

Update `tailwind.config.ts`:
```typescript
export default {
  plugins: [
    require('@tailwindcss/typography'),
    // ... other plugins
  ],
}
```

#### Step 1.2: Create Parser Utility

**File:** `src/lib/policy/types.ts`
```typescript
export interface PolicySection {
  id: string
  level: 1 | 2 | 3 | 4
  title: string
  content: string[]
}

export interface ParsedPolicy {
  title: string
  effectiveDate: string
  lastUpdated: string
  sections: PolicySection[]
}
```

**File:** `src/lib/policy/parser.ts`
```typescript
import fs from 'fs'
import path from 'path'
import type { ParsedPolicy, PolicySection } from './types'

function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
}

function detectLevel(line: string): 1 | 2 | 3 | 4 {
  if (line.match(/^\d+\.\d+\.\d+\./)) return 4
  if (line.match(/^\d+\.\d+\./)) return 3
  if (line.match(/^\d+\./)) return 2
  return 1
}

export function parsePolicyContent(filePath: string): ParsedPolicy {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  // Extract metadata
  const title = lines[0].trim()
  const effectiveLine = lines.find(l => l.includes('Obowiązuje od:'))
  const updatedLine = lines.find(l => l.includes('Ostatnia aktualizacja:'))

  const effectiveDate = effectiveLine?.replace('Obowiązuje od:', '').trim() || ''
  const lastUpdated = updatedLine?.replace('Ostatnia aktualizacja:', '').trim() || ''

  // Parse sections
  const sections: PolicySection[] = []
  let currentSection: PolicySection | null = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Skip metadata lines
    if (i < 10 && (line.includes('Obowiązuje') || line.includes('Ostatnia') || line === '⸻')) {
      continue
    }

    // Detect section headings (numbered lines)
    if (line.match(/^\d+\.[\s\w]/)) {
      // Save previous section
      if (currentSection) {
        sections.push(currentSection)
      }

      // Start new section
      currentSection = {
        id: generateId(line),
        level: detectLevel(line),
        title: line,
        content: []
      }
    } else if (currentSection && line.length > 0) {
      // Add content to current section
      currentSection.content.push(line)
    }
  }

  // Add final section
  if (currentSection) {
    sections.push(currentSection)
  }

  return {
    title,
    effectiveDate,
    lastUpdated,
    sections
  }
}
```

**File:** `src/lib/policy/index.ts`
```typescript
export { parsePolicyContent } from './parser'
export type { ParsedPolicy, PolicySection } from './types'
```

#### Step 1.3: Create PolicyPageLayout Component

**File:** `src/components/policy/PolicyPageLayout.tsx`
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
          { name: 'Strona główna', url: 'https://www.yieldo.pl' },
          { name: title, url: '' }
        ]}
      />

      <div className="container mx-auto max-w-5xl py-12 px-4">
        <Card className="p-8 md:p-12">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600">
              <span className="font-medium">
                Obowiązuje od: <time>{effectiveDate}</time>
              </span>
              <Separator orientation="vertical" className="hidden sm:block h-5" />
              <span className="font-medium">
                Ostatnia aktualizacja: <time>{lastUpdated}</time>
              </span>
            </div>
          </header>

          <Separator className="mb-8" />

          <div className="prose prose-lg prose-gray max-w-none">
            {children}
          </div>
        </Card>
      </div>
    </>
  )
}
```

#### Step 1.4: Create PolicyContent Component

**File:** `src/components/policy/PolicyContent.tsx`
```typescript
import type { PolicySection } from '@/lib/policy/types'

interface PolicyContentProps {
  sections: PolicySection[]
}

export default function PolicyContent({ sections }: PolicyContentProps) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-24"
        >
          {section.level === 2 && (
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {section.title}
            </h2>
          )}
          {section.level === 3 && (
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              {section.title}
            </h3>
          )}
          {section.level === 4 && (
            <h4 className="text-xl font-semibold mb-2 text-gray-700">
              {section.title}
            </h4>
          )}

          {section.content.map((paragraph, idx) => (
            <p key={idx} className="text-base leading-relaxed mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  )
}
```

#### Step 1.5: Create PolicyNavigation Component

**File:** `src/components/policy/PolicyNavigation.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import type { PolicySection } from '@/lib/policy/types'

interface PolicyNavigationProps {
  sections: PolicySection[]
}

export default function PolicyNavigation({ sections }: PolicyNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -70% 0px'
      }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <nav
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      aria-label="Table of contents"
    >
      <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-4">
        Spis Treści
      </h2>
      <ul className="space-y-2 border-l-2 border-gray-200">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => handleClick(section.id)}
              className={`block pl-4 py-1 text-sm transition-colors w-full text-left ${
                activeSection === section.id
                  ? 'font-semibold text-blue-600 border-l-2 border-blue-600 -ml-[2px]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

#### Step 1.6: Barrel Export

**File:** `src/components/policy/index.ts`
```typescript
export { default as PolicyPageLayout } from './PolicyPageLayout'
export { default as PolicyContent } from './PolicyContent'
export { default as PolicyNavigation } from './PolicyNavigation'
```

---

### Phase 2: Policy Pages (2-3 hours)

#### Step 2.1: Add Metadata Exports

**File:** `src/app/metadata.ts` (append to existing file)
```typescript
// ... existing imports and metadata ...

export const privacyPolicyMetadata: Metadata = generateMetadata({
  title: 'Polityka Prywatności - Ochrona Danych Osobowych',
  description: 'Polityka prywatności Yieldo zgodna z RODO. Dowiedz się, jak przetwarzamy i chronimy Twoje dane osobowe.',
  keywords: [
    'polityka prywatności',
    'RODO',
    'GDPR',
    'ochrona danych',
    'Yieldo',
    'prywatność danych',
    'bezpieczeństwo danych'
  ],
  canonical: '/polityka-prywatnosci'
})

export const cookiePolicyMetadata: Metadata = generateMetadata({
  title: 'Polityka Cookies - Zasady Używania Plików Cookie',
  description: 'Polityka cookies Yieldo. Informacje o plikach cookie używanych na stronie oraz ich zarządzanie.',
  keywords: [
    'polityka cookies',
    'pliki cookie',
    'zgoda na cookies',
    'Yieldo',
    'śledzenie',
    'prywatność'
  ],
  canonical: '/polityka-cookies'
})

export const dataProtectionMetadata: Metadata = generateMetadata({
  title: 'Ochrona Danych Osobowych - RODO',
  description: 'Informacje o ochronie danych osobowych w Yieldo zgodnie z RODO. Twoje prawa i nasze zobowiązania.',
  keywords: [
    'ochrona danych',
    'RODO',
    'GDPR',
    'bezpieczeństwo danych',
    'prawa użytkownika',
    'Yieldo'
  ],
  canonical: '/ochrona-danych'
})

export const tosMetadata: Metadata = generateMetadata({
  title: 'Regulamin Świadczenia Usług',
  description: 'Regulamin korzystania z usług Yieldo. Warunki umowy, prawa i obowiązki stron.',
  keywords: [
    'regulamin',
    'warunki użytkowania',
    'terms of service',
    'Yieldo',
    'umowa',
    'zasady'
  ],
  canonical: '/regulamin'
})

export const refundPolicyMetadata: Metadata = generateMetadata({
  title: 'Polityka Zwrotów i Reklamacji',
  description: 'Polityka zwrotów Yieldo. Zasady reklamacji, zwrotów i refundacji płatności.',
  keywords: [
    'polityka zwrotów',
    'reklamacje',
    'refundacja',
    'Yieldo',
    'zwrot pieniędzy',
    'gwarancja'
  ],
  canonical: '/polityka-zwrotow'
})
```

#### Step 2.2: Create Policy Page Template

Create this structure for each policy page:

**Example:** `src/app/polityka-prywatnosci/page.tsx`
```typescript
import path from 'path'
import { privacyPolicyMetadata } from '@/app/metadata'
import { parsePolicyContent } from '@/lib/policy'
import {
  PolicyPageLayout,
  PolicyContent,
  PolicyNavigation
} from '@/components/policy'

export const metadata = privacyPolicyMetadata

export default function PrivacyPolicyPage() {
  const policyPath = path.join(process.cwd(), 'docs/policies/privacy.txt')
  const policy = parsePolicyContent(policyPath)

  return (
    <PolicyPageLayout
      title={policy.title}
      effectiveDate={policy.effectiveDate}
      lastUpdated={policy.lastUpdated}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <PolicyNavigation sections={policy.sections} />
        </div>
        <div className="lg:col-span-3">
          <PolicyContent sections={policy.sections} />
        </div>
      </div>
    </PolicyPageLayout>
  )
}
```

#### Step 2.3: Create All Policy Pages

Repeat Step 2.2 for:
- `src/app/polityka-cookies/page.tsx` (use `cookiePolicyMetadata`, `cookie.txt`)
- `src/app/ochrona-danych/page.tsx` (use `dataProtectionMetadata`, `data-protection.txt`)
- `src/app/regulamin/page.tsx` (use `tosMetadata`, `tos.txt`)
- `src/app/polityka-zwrotow/page.tsx` (use `refundPolicyMetadata`, `refund.txt`)

Just change:
1. Metadata import name
2. File name in `path.join()`

---

### Phase 3: Footer Integration (1-2 hours)

#### Step 3.1: Create Footer Component

**File:** `src/components/layout/Footer.tsx`
```typescript
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Produkty */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Produkty</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-sekretarka" className="hover:text-white transition-colors">
                  AI Sekretarka
                </Link>
              </li>
              <li>
                <Link href="/digital-presence" className="hover:text-white transition-colors">
                  Digital Presence
                </Link>
              </li>
              <li>
                <Link href="/kalkulator" className="hover:text-white transition-colors">
                  Kalkulator Oszczędności
                </Link>
              </li>
            </ul>
          </div>

          {/* Firma */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Firma</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="hover:text-white transition-colors">
                  O Nas
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Prawne */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Prawne</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">
                  Polityka Prywatności
                </Link>
              </li>
              <li>
                <Link href="/polityka-cookies" className="hover:text-white transition-colors">
                  Polityka Cookies
                </Link>
              </li>
              <li>
                <Link href="/ochrona-danych" className="hover:text-white transition-colors">
                  Ochrona Danych
                </Link>
              </li>
              <li>
                <Link href="/regulamin" className="hover:text-white transition-colors">
                  Regulamin
                </Link>
              </li>
              <li>
                <Link href="/polityka-zwrotow" className="hover:text-white transition-colors">
                  Polityka Zwrotów
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info.yieldo@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  info.yieldo@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <address className="not-italic">
                  ul. Drukarska 3<br />
                  30-348 Kraków, Polska
                </address>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            © {new Date().getFullYear()} Yieldo Sp. z o.o. Wszystkie prawa zastrzeżone.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            Zgodność z RODO/GDPR
          </p>
        </div>
      </div>
    </footer>
  )
}
```

#### Step 3.2: Integrate Footer in Root Layout

**File:** `src/app/layout.tsx` (modify existing)
```typescript
import Footer from '@/components/layout/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster />
        <Analytics />
        <AnalyticsProvider showCookieConsent />
        <Footer /> {/* ← Add this line */}
      </body>
    </html>
  )
}
```

---

### Phase 4: Polish & Test (2-3 hours)

#### Step 4.1: Add Print Styles

**File:** `src/app/globals.css` (append)
```css
/* Print styles for policy pages */
@media print {
  /* Hide navigation */
  nav,
  footer,
  .no-print {
    display: none !important;
  }

  /* Expand content */
  .container {
    max-width: 100% !important;
    padding: 0 !important;
  }

  /* Page breaks */
  h2 {
    page-break-after: avoid;
  }

  /* Ensure links are visible */
  a[href]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  /* Remove link underlines in print */
  a {
    text-decoration: none;
    color: #000;
  }
}
```

#### Step 4.2: Run Tests

**Accessibility Test:**
```bash
# Install axe-core (if not already)
npm install -D @axe-core/playwright

# Run Lighthouse
npx lighthouse http://localhost:3000/polityka-prywatnosci --view

# Test keyboard navigation manually:
# 1. Tab through all links
# 2. Enter to activate
# 3. Escape to close (if drawer)
```

**Performance Test:**
```bash
# Build production
npm run build

# Start production server
npm start

# Run Lighthouse on all policy pages
npx lighthouse http://localhost:3000/polityka-prywatnosci --view
npx lighthouse http://localhost:3000/polityka-cookies --view
npx lighthouse http://localhost:3000/ochrona-danych --view
npx lighthouse http://localhost:3000/regulamin --view
npx lighthouse http://localhost:3000/polityka-zwrotow --view
```

**Visual Regression Test:**
```bash
# Take screenshots at different breakpoints
# Mobile: 375px
# Tablet: 768px
# Desktop: 1920px
```

---

## Verification Checklist

### Functionality
- [ ] All 5 policy pages render without errors
- [ ] TOC navigation works (smooth scroll)
- [ ] Active section highlights in TOC
- [ ] Breadcrumbs display correctly
- [ ] Footer links work on all pages
- [ ] Mobile responsive (test 375px, 768px, 1024px)

### SEO
- [ ] Meta titles unique for each page
- [ ] Meta descriptions unique and descriptive
- [ ] Canonical URLs set correctly
- [ ] Structured data (JSON-LD) validates
- [ ] Sitemap includes policy pages
- [ ] robots.txt allows indexing

### Performance
- [ ] Lighthouse score > 90 (all metrics)
- [ ] First Contentful Paint < 1.0s
- [ ] Largest Contentful Paint < 2.0s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Color contrast ratio > 4.5:1
- [ ] Focus indicators visible
- [ ] ARIA labels present and correct

### Legal
- [ ] Content reviewed by legal team
- [ ] Dates accurate (effective + last updated)
- [ ] Contact information correct
- [ ] RODO/GDPR requirements met

---

## Troubleshooting

### Issue: "Cannot find module '@/lib/policy'"

**Solution:**
Check `tsconfig.json` has path alias:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: Parser fails to read .txt file

**Solution:**
Ensure file path is absolute:
```typescript
const policyPath = path.join(process.cwd(), 'docs/policies/privacy.txt')
// NOT: './docs/policies/privacy.txt'
```

### Issue: Smooth scroll not working

**Solution:**
Add to `globals.css`:
```css
html {
  scroll-behavior: smooth;
}
```

### Issue: TOC not highlighting active section

**Solution:**
Add `scroll-mt-24` class to sections for offset:
```typescript
<section id={section.id} className="scroll-mt-24">
```

---

## Performance Tips

1. **Lazy load mobile TOC drawer:**
```typescript
const PolicyNavigationMobile = dynamic(
  () => import('./PolicyNavigationMobile'),
  { ssr: false }
)
```

2. **Preload critical fonts:**
```typescript
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

3. **Use CDN for static assets:**
Vercel automatically handles this, no config needed.

---

## Deployment

```bash
# 1. Test locally
npm run dev

# 2. Build production
npm run build

# 3. Test production build
npm start

# 4. Commit changes
git add .
git commit -m "feat: add policy pages with reusable architecture"

# 5. Push to deploy (Vercel auto-deploys from main)
git push origin main

# 6. Verify deployment
# Check all policy pages are accessible
# Run Lighthouse on production URLs
```

---

## Next Steps After Implementation

1. **Submit Sitemap to Google Search Console**
2. **Monitor Analytics** (track policy page views)
3. **Legal Review** (quarterly content check)
4. **Performance Monitoring** (weekly Lighthouse runs)
5. **Accessibility Audit** (annual WCAG review)

---

## Support

For questions or issues:
1. Check [POLICY_PAGES_ARCHITECTURE.md](./POLICY_PAGES_ARCHITECTURE.md) for detailed design
2. Review [POLICY_PAGES_DIAGRAM.md](./POLICY_PAGES_DIAGRAM.md) for visual references
3. Contact: System Architecture Designer

---

**Happy Coding! 🚀**
