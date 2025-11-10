# System Architecture Documentation

**Last Updated:** 2025-11-10
**Status:** Production Ready
**Version:** 2.0

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Product Architecture](#product-architecture)
4. [Component Structure](#component-structure)
5. [Database Schema](#database-schema)
6. [API Routes](#api-routes)
7. [State Management](#state-management)
8. [Security](#security)
9. [Performance](#performance)
10. [Deployment](#deployment)

---

## Overview

AI Sekretarka is a SaaS platform offering three main products:
1. **Digital Presence Package** - Website + Google Business (unified)
2. **AI Receptionist** - 24/7 automated customer service
3. **Individual Services** - Standalone website or Google Business optimization

### System Design Philosophy

- **Server-First Architecture** - React Server Components by default
- **Progressive Enhancement** - Enhanced experiences for modern browsers
- **Mobile-First** - Responsive design from the ground up
- **Performance-Optimized** - Sub-3s Time to Interactive
- **SEO-Focused** - Semantic HTML, meta tags, structured data

---

## Technology Stack

### Frontend
- **Framework:** Next.js 15.3.5 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui
- **Animations:** Framer Motion 11.x
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Notifications:** Sonner

### Backend
- **Runtime:** Node.js 20+
- **API:** Next.js API Routes + Server Actions
- **Database:** Neon PostgreSQL
- **Session Storage:** Vercel KV (Redis)
- **ORM:** Drizzle (planned)
- **Authentication:** NextAuth.js v5

### External Services
- **Payments:** Stripe
- **Email:** Resend
- **AI Voice:** ElevenLabs
- **Analytics:** Google Analytics
- **Monitoring:** Sentry

### Development Tools
- **Language:** TypeScript 5.x
- **Linting:** ESLint + Prettier
- **Testing:** Jest + Playwright
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel

---

## Product Architecture

### Unified Digital Presence Package

**Route:** `/digital-presence`

**Value Proposition:**
> "Professional Website + Google Business Profile = Complete Online Dominance"

#### Key Features
- Unified pricing (3 tiers)
- Combined service showcase
- Integrated ROI calculator
- Synergy messaging (1+1=3 effect)
- Bundle savings visualization

#### Pricing Tiers

**Starter** - 3,999 zł + 349 zł/mies
- Website: 5 pages
- Google: Basic optimization + 2 posts/month
- Target: Small businesses

**Professional** ⭐ - 7,499 zł + 449 zł/mies (Most Popular)
- Website: 10 pages, premium design, CMS
- Google: Full optimization + 4-6 posts/month
- Bonus: 3 months Google FREE
- Target: Established businesses

**Enterprise** - From 12,999 zł + 799 zł/mies
- Website: Unlimited pages, custom
- Google: Multi-location, 8-12 posts/month
- Bonus: 6 months Google FREE + video
- Target: Multi-location, competitive industries

### Component Architecture

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── digital-presence/           # Unified package
│   │   └── page.tsx
│   ├── website-creation/           # Individual service
│   │   └── page.tsx
│   ├── google-business/            # Individual service
│   │   └── page.tsx
│   ├── dashboard/                  # User dashboard
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Overview
│   │   ├── agents/                # AI agents
│   │   ├── analytics/             # Analytics
│   │   ├── billing/               # Billing & subscriptions
│   │   └── settings/              # Settings
│   └── api/                       # API routes
│       ├── auth/                  # Authentication
│       ├── agents/                # AI agent management
│       ├── analytics/             # Analytics
│       ├── billing/               # Stripe integration
│       └── contact/               # Contact form
│
├── components/
│   ├── layout/                    # Layout components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── sections/                  # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsGrid.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ProcessTimeline.tsx
│   │   ├── FAQSection.tsx
│   │   └── FinalCTA.tsx
│   │
│   ├── interactive/               # Interactive components
│   │   ├── InteractiveMapPreview.tsx
│   │   ├── RankingVisualizer.tsx
│   │   ├── AnimatedStatCard.tsx
│   │   └── CaseStudyCard.tsx
│   │
│   ├── calculators/               # ROI calculators
│   │   ├── UnifiedROICalculator.tsx
│   │   ├── WebsiteROICalculator.tsx
│   │   └── GBPROICalculator.tsx
│   │
│   ├── forms/                     # Form components
│   │   ├── ContactForm.tsx
│   │   └── FormInput.tsx
│   │
│   └── ui/                        # UI primitives (shadcn)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
│
├── lib/
│   ├── db/                        # Database
│   │   ├── schema.ts
│   │   ├── queries.ts
│   │   └── migrations/
│   │
│   ├── auth/                      # Authentication
│   │   ├── config.ts
│   │   ├── jwt.ts
│   │   └── session.ts
│   │
│   ├── calculations/              # Business logic
│   │   ├── roiCalculations.ts
│   │   ├── pricingLogic.ts
│   │   └── savingsCalculations.ts
│   │
│   └── utils/                     # Utilities
│       ├── cn.ts
│       ├── format.ts
│       └── validation.ts
│
└── types/
    ├── calculator.ts
    ├── pricing.ts
    ├── agent.ts
    └── database.ts
```

---

## Database Schema

### Core Tables

#### users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  email_verified TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### organizations
```sql
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INTEGER REFERENCES users(id),
  subscription_tier VARCHAR(50),
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### ai_agents
```sql
CREATE TABLE ai_agents (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  voice_id VARCHAR(255),
  configuration JSONB,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### conversations
```sql
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  agent_id INTEGER REFERENCES ai_agents(id),
  caller_phone VARCHAR(50),
  duration_seconds INTEGER,
  transcript TEXT,
  outcome VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### appointments
```sql
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id),
  conversation_id INTEGER REFERENCES conversations(id),
  service_name VARCHAR(255),
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  appointment_time TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### subscriptions
```sql
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id),
  stripe_subscription_id VARCHAR(255) UNIQUE,
  plan_id VARCHAR(100),
  status VARCHAR(50),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (NextAuth)
- `GET /api/auth/me` - Current user
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Session check

### AI Agents
- `GET /api/agents` - List agents
- `POST /api/agents` - Create agent
- `GET /api/agents/:id` - Get agent
- `PUT /api/agents/:id` - Update agent
- `DELETE /api/agents/:id` - Delete agent
- `POST /api/agents/:id/test` - Test agent

### Conversations
- `GET /api/conversations` - List conversations
- `GET /api/conversations/:id` - Get conversation details
- `GET /api/conversations/stats` - Conversation statistics

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Analytics
- `GET /api/analytics/overview` - Dashboard metrics
- `GET /api/analytics/conversations` - Conversation analytics
- `GET /api/analytics/performance` - Performance metrics

### Billing (Stripe)
- `POST /api/billing/create-checkout` - Create checkout session
- `POST /api/billing/create-portal` - Customer portal
- `POST /api/billing/webhook` - Stripe webhooks
- `GET /api/billing/subscription` - Get subscription

### Contact
- `POST /api/contact` - Contact form submission

---

## State Management

### State Layers

1. **Server State** - Database (PostgreSQL)
   - User data, agents, conversations
   - Managed via API routes

2. **URL State** - Search params
   - Filters, sorting, pagination
   - Managed via Next.js router

3. **Session State** - NextAuth.js
   - User authentication
   - JWT stored in httpOnly cookies

4. **Cache State** - Vercel KV
   - Session data, rate limiting
   - Managed via Redis client

5. **Component State** - React hooks
   - Form inputs, UI state
   - Managed via useState, useReducer

6. **Global State** - Context (minimal)
   - Theme, user preferences
   - Managed via React Context

---

## Security

### Authentication
- **Provider:** NextAuth.js v5
- **Strategy:** JWT (httpOnly cookies)
- **Password Hashing:** bcrypt (12 rounds)
- **Session Duration:** 7 days
- **Refresh:** Automatic on activity

### Authorization
- **Role-Based Access Control (RBAC)**
  - admin: Full access
  - owner: Organization management
  - user: Limited access

### Data Protection
- **SQL Injection:** Parameterized queries
- **XSS:** Input sanitization, CSP headers
- **CSRF:** SameSite cookies, token validation
- **Rate Limiting:** Vercel KV tracking
- **Input Validation:** Zod schemas

### GDPR/RODO Compliance
- User data export
- Right to deletion
- Cookie consent
- Privacy policy
- Data retention policies

### Security Headers
```typescript
// next.config.js
headers: [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
]
```

---

## Performance

### Targets
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3s
- **Cumulative Layout Shift:** < 0.1
- **Lighthouse Score:** > 90

### Optimization Strategies

#### Code Splitting
```typescript
// Dynamic imports for heavy components
const Calculator = dynamic(() => import('@/components/calculators/UnifiedROICalculator'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

#### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={800}
  priority
  quality={85}
/>
```

#### Lazy Loading
```typescript
// Below-the-fold components
import { lazy, Suspense } from 'react';

const Testimonials = lazy(() => import('@/components/sections/Testimonials'));

<Suspense fallback={<Skeleton />}>
  <Testimonials />
</Suspense>
```

#### Caching Strategy
- Static pages: ISR (Incremental Static Regeneration)
- Dynamic data: Client-side SWR
- API responses: Cache-Control headers
- Assets: CDN caching (Vercel)

---

## Deployment

### Vercel Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Create Postgres database
vercel storage create postgres

# Create KV store
vercel storage create kv

# Pull environment variables
vercel env pull .env.local

# Deploy
vercel --prod
```

### Environment Variables

```env
# Database
POSTGRES_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."

# Redis/KV
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="..." # Generate: openssl rand -base64 32
JWT_SECRET="..." # Generate: openssl rand -base64 32

# Stripe
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_BASIC_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."

# ElevenLabs
ELEVENLABS_API_KEY="sk_..."
ELEVENLABS_BASE_URL="https://api.elevenlabs.io"

# Email
RESEND_API_KEY="re_..."
ADMIN_EMAIL="admin@yourdomain.com"
```

### Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Database migrations run
- [ ] Stripe webhooks configured
- [ ] Custom domain configured
- [ ] SSL/TLS enabled
- [ ] Analytics tracking added
- [ ] Error monitoring (Sentry) configured
- [ ] Performance monitoring enabled
- [ ] Backup strategy implemented
- [ ] Security headers verified

---

## Architecture Decisions

### ADR 1: Single Unified Page vs Separate Pages
**Decision:** Create unified `/digital-presence` page as primary offering, keep individual pages as secondary options.

**Rationale:**
- Reduces decision fatigue
- Positions services as complementary
- Higher average order value
- Clearer value proposition

### ADR 2: Bundle-First Pricing
**Decision:** Lead with bundle pricing, de-emphasize individual services.

**Rationale:**
- Higher perceived value
- Encourages complete solution purchase
- Better unit economics
- Stronger positioning

### ADR 3: NextAuth.js with JWT
**Decision:** Use NextAuth.js v5 with JWT tokens in httpOnly cookies.

**Rationale:**
- Production-ready security
- Good developer experience
- Flexible authentication providers
- Serverless-friendly

### ADR 4: PostgreSQL with JSONB
**Decision:** Use PostgreSQL with JSONB columns for flexible AI data.

**Rationale:**
- Relational data integrity
- Flexible JSON storage for AI configurations
- Powerful query capabilities
- Proven scalability

### ADR 5: shadcn/ui Components
**Decision:** Use shadcn/ui instead of pre-built UI library.

**Rationale:**
- Full control over components
- No bundle bloat
- Accessible by default
- Easy customization

---

## Monitoring & Observability

### Error Tracking
- **Tool:** Sentry
- **Tracked:** Unhandled errors, API failures, performance issues

### Analytics
- **Tool:** Google Analytics 4
- **Tracked:** Page views, conversions, user journeys

### Performance Monitoring
- **Tool:** Vercel Analytics
- **Tracked:** Web Vitals, function execution times

### Logging
- **Tool:** Vercel Logs
- **Tracked:** API requests, errors, user actions

---

## Scaling Considerations

### Database Scaling
- Connection pooling via Neon
- Read replicas for analytics
- Indexes on frequently queried columns
- Partitioning for large tables

### Application Scaling
- Vercel serverless functions auto-scale
- Edge runtime for faster response times
- Static generation where possible
- CDN for assets

### Cost Optimization
- Optimize database queries
- Use edge caching
- Implement request batching
- Monitor function execution times

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Stripe Documentation](https://stripe.com/docs)
- [ElevenLabs API](https://elevenlabs.io/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

**Document Maintainers:** Architecture Team
**Review Frequency:** Monthly
**Next Review:** 2025-12-10
