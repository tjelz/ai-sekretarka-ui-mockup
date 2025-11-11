# Integration Example - Messaging Components

## Quick Start: Add to AI Sekretarka Page

### Step 1: Import the Component

Add this import at the top of `/src/app/ai-sekretarka/page.tsx`:

```tsx
// Add after line 16 (after existing imports)
import { MessagingIntegrationSection } from "../components/messaging/MessagingIntegrationSection"
```

### Step 2: Insert the Component

Add the component after the Features Section (around line 309):

```tsx
{/* Features Section */}
<section className="py-12 px-4 bg-gray-50">
  {/* ... existing features code ... */}
</section>

{/* 👇 ADD THIS NEW SECTION HERE */}
<MessagingIntegrationSection />

{/* Implementation Section */}
<section className="py-12 px-4 bg-gray-50">
  {/* ... existing implementation code ... */}
</section>
```

### Complete Example

Here's what the relevant section of your `ai-sekretarka/page.tsx` will look like:

```tsx
"use client"

import { OrganizationSchema, ProductSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Phone, Calendar, MessageSquare, Shield, Clock, Zap, TrendingUp, CheckCircle2, Users, Settings, ArrowRight, Star, Sparkles, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import LostRevenueCalculator from "../components/LostRevenueCalculator"
import EnhancedPricingCard from "../components/EnhancedPricingCard"
import AnimatedBackground from "../components/AnimatedBackground"
import HeroPhoneMockup from "../components/HeroPhoneMockup"
import TypewriterText from "../components/TypewriterText"
import AnimatedStatCard from "../components/AnimatedStatCard"
import { MessagingIntegrationSection } from "../components/messaging/MessagingIntegrationSection" // 👈 NEW IMPORT

export default function AISekretarkaPage() {
  // ... existing state and handlers ...

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD, Navbar, Hero, Stats, Calculator, etc. */}

      {/* Features Section */}
      <section className="py-12 px-4 bg-gray-50">
        {/* ... existing features ... */}
      </section>

      {/* 👇 NEW: Messaging Integration Section */}
      <MessagingIntegrationSection />

      {/* Implementation Section */}
      <section className="py-12 px-4 bg-gray-50">
        {/* ... existing implementation ... */}
      </section>

      {/* Rest of the page... */}
    </div>
  )
}
```

---

## Alternative: Standalone Page

If you prefer a dedicated integrations page:

### Create `/src/app/integracje/page.tsx`:

```tsx
"use client"

import { OrganizationSchema, BreadcrumbSchema } from "@/components/seo"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { MessagingIntegrationSection } from "../components/messaging/MessagingIntegrationSection"

export default function IntegracjePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Structured Data */}
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Strona Główna', url: 'https://www.yieldo.pl' },
        { name: 'Integracje', url: 'https://www.yieldo.pl/integracje' }
      ]} />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">
            Integracje Komunikacyjne
          </h1>
          <p className="text-xl text-blue-100">
            Połącz AI Sekretarkę ze wszystkimi kanałami komunikacji
          </p>
        </div>
      </section>

      {/* Main Content */}
      <MessagingIntegrationSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
```

### Create `/src/app/integracje/metadata.ts`:

```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integracje - SMS, WhatsApp, Messenger | Yieldo AI Sekretarka',
  description: 'Wielokanałowa obsługa klientów. Integracja z SMS, WhatsApp Business, Facebook Messenger i custom API. Jedna platforma, wszystkie kanały komunikacji.',
  keywords: 'integracje AI, SMS API, WhatsApp Business API, Messenger bot, wielokanałowa komunikacja, chatbot integracje',
  openGraph: {
    title: 'Integracje Komunikacyjne - Yieldo',
    description: 'SMS, WhatsApp, Messenger i więcej - wszystko w jednej platformie',
    type: 'website',
    url: 'https://www.yieldo.pl/integracje',
  }
}
```

---

## Navigation Menu Update

Add link to integrations in your navbar:

```tsx
// In your Navbar component
<Link href="/integracje" className="hover:text-[#007BFF] transition-colors">
  Integracje
</Link>
```

---

## Visual Preview

### Desktop Layout (1920px):
```
┌─────────────────────────────────────────────────────────┐
│                    Navbar                               │
├─────────────────────────────────────────────────────────┤
│  🔹 Integracje Komunikacyjne                           │
│  Wielokanałowa Obsługa Klientów                        │
├─────────────────────────────────────────────────────────┤
│  [⚡ Instant Response] [✓ One Platform] [🌐 24/7]      │
├─────────────────────────────────────────────────────────┤
│  ┌───────┐  ┌───────┐  ┌───────┐                      │
│  │  📱   │  │  💬   │  │  💙   │                      │
│  │  SMS  │  │WhatsApp│  │Messenger│                    │
│  │       │  │  ⭐   │  │       │                      │
│  └───────┘  └───────┘  └───────┘                      │
├─────────────────────────────────────────────────────────┤
│  🔧 Custom Integration Showcase                        │
│  [API] [Webhooks] [Zapier]                            │
│  Code examples and documentation                       │
├─────────────────────────────────────────────────────────┤
│  [Zacznij Teraz] [Zobacz Demo]                        │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (375px):
```
┌─────────────────┐
│     Navbar      │
├─────────────────┤
│  Integracje     │
│  Komunikacyjne  │
├─────────────────┤
│  ⚡ Instant     │
│  ✓ Platform     │
│  🌐 24/7        │
├─────────────────┤
│  ┌───────────┐  │
│  │   📱 SMS  │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │💬WhatsApp │  │
│  │    ⭐     │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │💙Messenger│  │
│  └───────────┘  │
├─────────────────┤
│  🔧 Custom      │
│  [Tabs]         │
├─────────────────┤
│  [CTA Buttons]  │
└─────────────────┘
```

---

## Testing Checklist

After integration, test these scenarios:

### Desktop (1920x1080)
- [ ] All 3 channel cards display side-by-side
- [ ] Hover effects work on cards
- [ ] Tab switching works in CustomIntegrationShowcase
- [ ] CTA buttons are clickable and styled correctly
- [ ] Code examples display properly with syntax highlighting

### Tablet (768px)
- [ ] Cards display in 2-column grid
- [ ] All content is readable
- [ ] No horizontal scroll
- [ ] Touch targets are appropriate size

### Mobile (375px)
- [ ] Cards stack vertically
- [ ] Text is readable without zooming
- [ ] Buttons are thumb-friendly (min 44px)
- [ ] No layout overflow

### Cross-Browser
- [ ] Chrome/Edge (Chromium)
- [ ] Safari (WebKit)
- [ ] Firefox (Gecko)

---

## Performance Tips

1. **Lazy Loading** (Optional):
```tsx
import dynamic from 'next/dynamic'

const MessagingIntegrationSection = dynamic(
  () => import('../components/messaging/MessagingIntegrationSection'),
  { ssr: true }
)
```

2. **Image Optimization**: Component uses emoji icons (no images to optimize)

3. **Code Splitting**: Already optimized with "use client" directive

---

## Customization Options

### Change Colors:
Edit the `colorClasses` object in `MessagingChannelCard.tsx`:

```tsx
const colorClasses = {
  blue: {
    bg: "bg-your-brand-color-50",
    border: "border-your-brand-color-200",
    // ... etc
  }
}
```

### Add More Channels:
Add a new card in `MessagingIntegrationSection.tsx`:

```tsx
<MessagingChannelCard
  icon="📧"
  title="Email Integration"
  description="Professional email communication"
  features={[
    "Automated responses",
    "Template management",
    "Tracking and analytics"
  ]}
  metrics={{
    deliveryRate: "99.9%",
    openRate: "45%"
  }}
  color="blue"
/>
```

### Change CTAs:
Update button links in `MessagingIntegrationSection.tsx` (lines 120-140)

---

## Support

Need help with integration?
- 📚 **Documentation**: `/docs/messaging-integration-guide.md`
- 📞 **Book Demo**: https://calendly.com/info-yieldo/ai-recepcjonistka
- 📧 **Email**: info.yieldo@gmail.com

---

**Last Updated:** 2025-11-11
**Version:** 1.0.0
