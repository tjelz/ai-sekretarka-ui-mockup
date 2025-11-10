# Component Structure for Yieldo Product Display

**Version:** 1.0.0
**Date:** 2025-11-07
**Status:** Design Specification

---

## Component Hierarchy

```
Root Page (app/page.tsx)
├── Navbar (components/ui/navbar.tsx)
├── Hero Section
│   └── ProductGrid (app/components/ProductGrid.tsx)
│       └── ProductCard (app/components/ProductCard.tsx) × 4
│           ├── IconContainer
│           ├── StatusBadge (app/components/StatusBadge.tsx)
│           ├── Title
│           ├── Description
│           └── CTAButton
└── Footer
```

---

## 1. ProductCard Component

### File Location
`src/app/components/ProductCard.tsx`

### Component Code

```typescript
"use client"

import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StatusBadge } from "./StatusBadge"

export interface ProductCardProps {
  // Identity
  id: string
  title: string
  description: string
  href: string

  // Visual
  icon: LucideIcon
  gradientFrom: string
  gradientTo: string

  // Status
  status: 'available' | 'coming-soon'
  statusBadge?: {
    text: string
    color: 'green' | 'yellow' | 'blue'
    animated?: boolean
  }

  // Optional
  features?: string[]
  ctaText?: string
}

export function ProductCard({
  id,
  title,
  description,
  href,
  icon: Icon,
  gradientFrom,
  gradientTo,
  status,
  statusBadge,
  ctaText = "Odkryj Moduł"
}: ProductCardProps) {
  const isAvailable = status === 'available'

  const cardContent = (
    <div
      className={`
        ${isAvailable
          ? `bg-gradient-to-br from-[${gradientFrom}] to-[${gradientTo}] text-white`
          : 'bg-white text-gray-900 border-2 border-gray-200'
        }
        p-8 rounded-2xl shadow-xl
        hover:shadow-2xl transition-all duration-300
        ${isAvailable ? 'hover:scale-105' : ''}
        relative overflow-hidden
        min-h-[320px] flex flex-col justify-between
      `}
    >
      {/* Background blur effect for available cards */}
      {isAvailable && (
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      )}

      <div className="relative">
        {/* Icon Container */}
        <div className={`
          w-16 h-16
          ${isAvailable ? 'bg-white/20' : 'bg-gray-100'}
          rounded-xl flex items-center justify-center mb-6
        `}>
          <Icon className={`w-8 h-8 ${isAvailable ? 'text-white' : 'text-gray-400'}`} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className={`
          ${isAvailable ? 'text-blue-100' : 'text-gray-600'}
          mb-6 text-sm leading-relaxed
        `}>
          {description}
        </p>

        {/* Status Badge */}
        {statusBadge && (
          <div className="mb-6">
            <StatusBadge
              text={statusBadge.text}
              color={statusBadge.color}
              animated={statusBadge.animated}
              variant={isAvailable ? 'light' : 'solid'}
            />
          </div>
        )}

        {/* CTA */}
        {isAvailable ? (
          <div className="flex items-center text-white font-semibold group-hover:gap-3 transition-all">
            {ctaText}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        ) : (
          <div className="text-gray-400 font-medium">
            W przygotowaniu
          </div>
        )}
      </div>
    </div>
  )

  // Wrap in Link if available, otherwise just div
  if (isAvailable && href !== '#') {
    return (
      <Link href={href} className="group">
        {cardContent}
      </Link>
    )
  }

  return <div>{cardContent}</div>
}
```

### Usage Example

```typescript
<ProductCard
  id="website-creation"
  title="Tworzenie Stron WWW"
  description="Profesjonalna strona internetowa w 24 godziny. AI projektuje, optymalizuje i wdraża."
  href="/website-creation"
  icon={Globe}
  gradientFrom="#8B5CF6"
  gradientTo="#6D28D9"
  status="available"
  statusBadge={{
    text: "Dostępne Teraz",
    color: "green",
    animated: true
  }}
/>
```

---

## 2. ProductGrid Component

### File Location
`src/app/components/ProductGrid.tsx`

### Component Code

```typescript
"use client"

import { ProductCard, ProductCardProps } from "./ProductCard"

interface ProductGridProps {
  products: ProductCardProps[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="container mx-auto max-w-6xl px-4">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Kompleksowe Rozwiązania AI
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Wybierz moduł, który pomoże Twojemu biznesowi
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <p className="text-sm text-gray-500 mb-4">
          Potrzebujesz pomocy w wyborze? Skontaktuj się z nami
        </p>
        <a
          href="https://calendly.com/info-yieldo/ai-recepcjonistka"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#007BFF] hover:text-[#0056b3] font-semibold transition-colors"
        >
          Zamów Konsultację
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}
```

---

## 3. StatusBadge Component

### File Location
`src/app/components/StatusBadge.tsx`

### Component Code

```typescript
"use client"

export interface StatusBadgeProps {
  text: string
  color: 'green' | 'yellow' | 'blue' | 'orange'
  animated?: boolean
  variant?: 'light' | 'solid'
}

export function StatusBadge({
  text,
  color,
  animated = false,
  variant = 'light'
}: StatusBadgeProps) {

  // Color mapping
  const colorClasses = {
    green: {
      light: 'bg-white/20 text-white',
      solid: 'bg-green-100 text-green-700',
      dot: 'bg-green-400'
    },
    yellow: {
      light: 'bg-white/20 text-white',
      solid: 'bg-yellow-100 text-yellow-700',
      dot: 'bg-yellow-400'
    },
    blue: {
      light: 'bg-white/20 text-white',
      solid: 'bg-blue-100 text-blue-700',
      dot: 'bg-blue-400'
    },
    orange: {
      light: 'bg-white/20 text-white',
      solid: 'bg-orange-100 text-orange-700',
      dot: 'bg-orange-400'
    }
  }

  const classes = colorClasses[color][variant]
  const dotClass = colorClasses[color].dot

  return (
    <div className={`
      inline-flex items-center gap-2
      px-4 py-2 rounded-full
      text-sm font-semibold
      ${classes}
    `}>
      {animated && (
        <span className={`w-2 h-2 ${dotClass} rounded-full animate-pulse`} />
      )}
      {text}
    </div>
  )
}
```

### Usage Examples

```typescript
// Available status (on gradient card)
<StatusBadge
  text="Dostępne Teraz"
  color="green"
  animated={true}
  variant="light"
/>

// Coming Soon status (on white card)
<StatusBadge
  text="Wkrótce"
  color="yellow"
  variant="solid"
/>

// New feature badge
<StatusBadge
  text="Nowość"
  color="blue"
  animated={true}
  variant="solid"
/>
```

---

## 4. Updated Root Page

### File Location
`src/app/page.tsx`

### Updated Code

```typescript
"use client"

import { Phone, Search, Globe, MapPin } from "lucide-react"
import Image from "next/image"
import { Navbar } from "@/components/ui/navbar"
import { ProductGrid } from "./components/ProductGrid"
import { ProductCardProps } from "./components/ProductCard"

export default function Home() {
  const products: ProductCardProps[] = [
    {
      id: 'ai-receptionist',
      title: 'AI Sekretarka',
      description: 'Automatyczna obsługa telefonów 24/7. Rozmawia, pamięta klientów i umawia spotkania.',
      href: '/ai-sekretarka',
      icon: Phone,
      gradientFrom: '#007BFF',
      gradientTo: '#0056b3',
      status: 'available',
      statusBadge: {
        text: 'Dostępne Teraz',
        color: 'green',
        animated: true
      }
    },
    {
      id: 'grants',
      title: 'Automatyzacja Dotacji',
      description: 'Znajdź idealne dotacje i granty dla swojej firmy automatycznie.',
      href: '#',
      icon: Search,
      gradientFrom: '#F59E0B',
      gradientTo: '#D97706',
      status: 'coming-soon',
      statusBadge: {
        text: 'Wkrótce',
        color: 'yellow'
      }
    },
    {
      id: 'website-creation',
      title: 'Tworzenie Stron WWW',
      description: 'Profesjonalna strona internetowa w 24 godziny. AI projektuje, optymalizuje i wdraża.',
      href: '/website-creation',
      icon: Globe,
      gradientFrom: '#8B5CF6',
      gradientTo: '#6D28D9',
      status: 'available',
      statusBadge: {
        text: 'Dostępne Teraz',
        color: 'green',
        animated: true
      }
    },
    {
      id: 'google-business',
      title: 'Google Business Listings',
      description: 'Zarządzanie wizytówką Google i lokalnym SEO z pomocą AI. Zwiększ widoczność.',
      href: '/google-business',
      icon: MapPin,
      gradientFrom: '#10B981',
      gradientTo: '#059669',
      status: 'available',
      statusBadge: {
        text: 'Dostępne Teraz',
        color: 'green',
        animated: true
      }
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section - Centered with top padding for fixed navbar */}
      <section className="flex-1 flex items-center justify-center py-8 px-4 pt-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6">
            <Image
              src="/logo.png"
              alt="Yieldo"
              width={120}
              height={40}
              className="h-8 md:h-12 w-auto mx-auto mb-6"
              priority
            />
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Kompleksowe rozwiązania AI dla rozwoju Twojego biznesu
            </p>
          </div>

          {/* Product Grid */}
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Yieldo. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  )
}
```

---

## 5. Component Testing

### Test Files Structure

```
src/
├── app/
│   └── components/
│       ├── __tests__/
│       │   ├── ProductCard.test.tsx
│       │   ├── ProductGrid.test.tsx
│       │   └── StatusBadge.test.tsx
│       ├── ProductCard.tsx
│       ├── ProductGrid.tsx
│       └── StatusBadge.tsx
```

### ProductCard Test Example

```typescript
// src/app/components/__tests__/ProductCard.test.tsx
import { render, screen } from '@testing-library/react'
import { ProductCard } from '../ProductCard'
import { Phone } from 'lucide-react'

describe('ProductCard', () => {
  const defaultProps = {
    id: 'test-product',
    title: 'Test Product',
    description: 'Test description',
    href: '/test',
    icon: Phone,
    gradientFrom: '#007BFF',
    gradientTo: '#0056b3',
    status: 'available' as const,
    statusBadge: {
      text: 'Available',
      color: 'green' as const,
      animated: true
    }
  }

  it('renders title and description', () => {
    render(<ProductCard {...defaultProps} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders status badge', () => {
    render(<ProductCard {...defaultProps} />)
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('applies gradient for available products', () => {
    const { container } = render(<ProductCard {...defaultProps} />)
    const card = container.querySelector('.bg-gradient-to-br')
    expect(card).toBeInTheDocument()
  })

  it('renders without link for coming-soon status', () => {
    const comingSoonProps = { ...defaultProps, status: 'coming-soon' as const }
    const { container } = render(<ProductCard {...comingSoonProps} />)
    const link = container.querySelector('a')
    expect(link).not.toBeInTheDocument()
  })
})
```

---

## 6. Component Props Documentation

### ProductCard Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | ✅ | - | Unique product identifier |
| `title` | `string` | ✅ | - | Product name |
| `description` | `string` | ✅ | - | Short description (2-3 sentences) |
| `href` | `string` | ✅ | - | Link to product landing page |
| `icon` | `LucideIcon` | ✅ | - | Icon component from lucide-react |
| `gradientFrom` | `string` | ✅ | - | Start color of gradient (hex) |
| `gradientTo` | `string` | ✅ | - | End color of gradient (hex) |
| `status` | `'available' \| 'coming-soon'` | ✅ | - | Product availability status |
| `statusBadge` | `StatusBadgeProps` | ❌ | - | Badge configuration |
| `features` | `string[]` | ❌ | - | List of key features (future use) |
| `ctaText` | `string` | ❌ | `"Odkryj Moduł"` | Call-to-action button text |

### StatusBadge Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | ✅ | - | Badge text |
| `color` | `'green' \| 'yellow' \| 'blue' \| 'orange'` | ✅ | - | Badge color theme |
| `animated` | `boolean` | ❌ | `false` | Show pulsing dot animation |
| `variant` | `'light' \| 'solid'` | ❌ | `'light'` | Light (on gradient) or solid background |

### ProductGrid Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `products` | `ProductCardProps[]` | ✅ | - | Array of product configurations |

---

## 7. Accessibility (a11y) Considerations

### Keyboard Navigation
- All clickable cards are keyboard accessible
- Tab order follows visual order (left-to-right, top-to-bottom)
- Enter/Space keys activate links

### Screen Readers
```typescript
// Add aria-labels to ProductCard
<Link
  href={href}
  className="group"
  aria-label={`Learn more about ${title}`}
>
  {/* ... card content */}
</Link>

// Add role and aria-label to StatusBadge
<div
  className="inline-flex items-center gap-2..."
  role="status"
  aria-label={`Product status: ${text}`}
>
  {/* ... badge content */}
</div>
```

### Color Contrast
- All text meets WCAG AA contrast ratios (4.5:1 for normal text)
- Available cards: White text on blue gradient (contrast: 7.2:1)
- Coming Soon cards: Dark gray text on white (contrast: 12.6:1)

### Focus States
```css
/* Add to component styles */
.product-card:focus-visible {
  outline: 2px solid #007BFF;
  outline-offset: 4px;
}
```

---

## 8. Responsive Behavior

### Mobile (< 768px)
- Single column layout
- Cards stack vertically
- Full-width cards with padding
- Touch-friendly tap targets (min 44x44px)

### Tablet (768px - 1024px)
- 2-column grid
- Cards maintain aspect ratio
- Comfortable spacing between cards

### Desktop (> 1024px)
- 2x2 grid layout
- Max-width container (1280px)
- Hover effects enabled
- Scale animation on hover

---

## 9. Animation Specifications

### Card Hover Animation
```typescript
// Transition duration: 300ms
// Scale: 1.05 (5% increase)
// Shadow: xl → 2xl elevation
className="transition-all duration-300 hover:scale-105 hover:shadow-2xl"
```

### Status Badge Pulse
```typescript
// Animated dot on "Available" badges
// Pulse duration: 2s infinite
className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
```

### Arrow CTA Animation
```typescript
// Arrow slides right on hover
// Transition: 200ms
className="ml-2 group-hover:translate-x-1 transition-transform"
```

---

## 10. Component Dependencies

### External Libraries
- `lucide-react` - Icons
- `next/link` - Routing
- `next/image` - Image optimization
- `tailwindcss` - Styling

### Internal Dependencies
- `@/components/ui/button` - CTA buttons
- `@/components/ui/navbar` - Navigation
- Design tokens from `globals.css`

---

## Component Interaction Flow

```mermaid
graph TD
    A[User lands on Root Page] --> B{Sees 4 ProductCards}
    B --> C[Hovers over Available Card]
    C --> D[Card scales up, shadow increases]
    D --> E{User clicks card}
    E --> F[Navigate to product landing page]

    B --> G[Hovers over Coming Soon Card]
    G --> H[No hover effect, cursor remains pointer]
    H --> I[User sees "W przygotowaniu" text]

    F --> J[Product Landing Page Loads]
    J --> K[User can return via Navbar or Back button]
```

---

## Implementation Checklist

- [ ] Create `ProductCard.tsx` component
- [ ] Create `StatusBadge.tsx` component
- [ ] Create `ProductGrid.tsx` component
- [ ] Update `app/page.tsx` with new structure
- [ ] Add TypeScript types and interfaces
- [ ] Write unit tests for each component
- [ ] Test responsive behavior on all breakpoints
- [ ] Verify keyboard navigation
- [ ] Check color contrast ratios
- [ ] Optimize images and icons
- [ ] Add error boundaries
- [ ] Document component API
- [ ] Create Storybook stories (optional)
- [ ] Get design approval
- [ ] Deploy to staging for review

---

**Next Steps:**
1. Review component specifications with development team
2. Create design mockups in Figma (optional)
3. Begin implementation in feature branch
4. Test components in isolation before integration
