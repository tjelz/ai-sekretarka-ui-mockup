# Agent Knowledge Base Index

**Purpose:** Comprehensive documentation index for AI agents working on this project
**Last Updated:** 2025-11-10
**Documentation Version:** 2.0 (Consolidated)

---

## 📚 Core Documentation (Start Here)

### 1. [ARCHITECTURE.md](./ARCHITECTURE.md) ⭐
**When to use:** Understanding system design, tech stack, or adding new features

**Contains:**
- Complete technology stack
- Product architecture (3 main products)
- Component structure & file organization
- Database schema (11+ tables)
- API routes reference
- State management strategy
- Security implementation
- Performance optimization
- Deployment architecture

**Key Sections:**
- Product Architecture (Digital Presence, AI Receptionist)
- Component File Structure (`src/` directory map)
- Database Schema (SQL tables)
- API Routes (authentication, agents, billing)
- Security Configuration
- Architectural Decisions (ADRs)

---

### 2. [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) ⭐
**When to use:** Setting up development environment or deploying to production

**Contains:**
- Quick start guide (5-minute setup)
- Database setup (Vercel Postgres, Neon, Local)
- Authentication configuration (NextAuth.js)
- External services (ElevenLabs, Stripe, Resend)
- Deployment instructions (Vercel, Railway, Render)
- Security configuration
- Troubleshooting guide
- Complete environment variables reference

**Key Sections:**
- Quick Start (fastest path to working app)
- Database Setup (3 options with SQL scripts)
- NextAuth.js Configuration
- Stripe Integration (webhooks, products)
- Post-Deployment Checklist
- Troubleshooting Common Issues

---

### 3. [RESEARCH_INSIGHTS.md](./RESEARCH_INSIGHTS.md) ⭐
**When to use:** Designing landing pages, writing copy, or optimizing conversions

**Contains:**
- Landing page best practices
- 100-point quality scoring system
- Design patterns (colors, typography, spacing)
- Copy formulas (headlines, CTAs, trust badges)
- Component patterns (code examples)
- Conversion optimization strategies
- Mobile optimization guidelines
- Performance targets & techniques

**Key Sections:**
- Quality Scoring System (minimum 85/100)
- Design Patterns (colors, typography, spacing)
- Copy Formulas (headline patterns, CTA types)
- Component Patterns (Hero, Stats, Pricing, Calculator)
- Conversion Optimization (8 CTAs strategy)
- Mobile Optimization (responsive patterns)

---

### 4. [QUICK_START.md](./QUICK_START.md)
**When to use:** First time setup or quick reference

**Contains:**
- 15-minute setup guide
- Installation steps
- Environment configuration
- Development server commands
- Production build process
- Common issues & solutions
- Available npm commands

---

## 🎯 Project Overview

### Products

**1. Digital Presence Package** (Unified)
- Route: `/digital-presence`
- Combines Website Creation + Google Business
- 3 pricing tiers (Starter, Professional, Enterprise)
- Bundle savings strategy

**2. AI Receptionist**
- Route: `/dashboard`
- ElevenLabs AI voice integration
- 24/7 automated customer service
- Conversation management

**3. Individual Services**
- Website Creation: `/website-creation`
- Google Business: `/google-business`
- Standalone offerings

### Technology Stack

**Frontend:**
- Next.js 15.3.5 (App Router)
- React 19
- TypeScript 5.x
- Tailwind CSS 4
- shadcn/ui components
- Framer Motion (animations)

**Backend:**
- Next.js API Routes
- Server Actions
- Neon PostgreSQL
- Vercel KV (Redis)
- NextAuth.js v5 (authentication)

**External Services:**
- Stripe (payments)
- ElevenLabs (AI voice)
- Resend (email)

---

## 📋 Quick Reference

### File Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage
│   ├── digital-presence/        # Unified package page
│   ├── website-creation/        # Individual service
│   ├── google-business/         # Individual service
│   ├── dashboard/               # User dashboard
│   └── api/                     # API routes
│
├── components/
│   ├── layout/                  # Navigation, Footer, Sidebar
│   ├── sections/                # Page sections (Hero, Pricing, etc.)
│   ├── interactive/             # Interactive components
│   ├── calculators/             # ROI calculators
│   ├── forms/                   # Form components
│   └── ui/                      # shadcn/ui primitives
│
├── lib/
│   ├── db/                      # Database (schema, queries)
│   ├── auth/                    # Authentication logic
│   ├── calculations/            # Business logic
│   └── utils/                   # Utilities
│
└── types/                        # TypeScript types
```

### Database Tables

**Core:**
- `users` - User accounts
- `organizations` - Business entities
- `ai_agents` - AI receptionist configs
- `conversations` - Call records
- `appointments` - Scheduled bookings
- `subscriptions` - Billing

**NextAuth:**
- `accounts`, `sessions`, `verification_tokens`

### API Routes

**Authentication:**
- `/api/auth/*` - NextAuth.js handlers
- `/api/auth/register` - User registration

**Resources:**
- `/api/agents` - AI agent management
- `/api/conversations` - Call history
- `/api/appointments` - Booking management
- `/api/billing/*` - Stripe integration

### Environment Variables

**Required for Development:**
```env
NEXTAUTH_SECRET="..." # openssl rand -base64 32
JWT_SECRET="..."
POSTGRES_URL="postgresql://..."
```

**Required for Production:**
```env
# Add: ELEVENLABS_API_KEY, STRIPE_SECRET_KEY, etc.
# See DEPLOYMENT_SETUP.md for complete list
```

---

## 🔍 Finding Information

### By Task Type

**Adding a New Feature:**
1. Read: ARCHITECTURE.md → Component Structure
2. Review: Existing components in similar section
3. Follow: File organization patterns
4. Implement: With TypeScript types
5. Test: Locally before committing

**Fixing a Bug:**
1. Identify: Which component/API route
2. Check: ARCHITECTURE.md for related systems
3. Review: Error logs and console
4. Debug: With TypeScript checking
5. Verify: Fix works on all devices

**Designing a Landing Page:**
1. Read: RESEARCH_INSIGHTS.md → Landing Page Best Practices
2. Use: Quality Scoring System (target: 85/100)
3. Follow: Design Patterns (colors, typography)
4. Apply: Copy Formulas (headlines, CTAs)
5. Optimize: Mobile-first approach

**Deploying to Production:**
1. Follow: DEPLOYMENT_SETUP.md step-by-step
2. Set up: Database (Vercel Postgres)
3. Configure: All environment variables
4. Test: Stripe webhooks
5. Monitor: Analytics and errors

**Optimizing Performance:**
1. Check: ARCHITECTURE.md → Performance section
2. Review: RESEARCH_INSIGHTS.md → Performance Guidelines
3. Implement: Code splitting, lazy loading
4. Test: Lighthouse audit (target: 90+)
5. Monitor: Web Vitals

---

## 🎨 Design System

### Colors
```css
--primary-blue: #007BFF
--success-green: #10B981
--warning-orange: #F97316
--trust-purple: #9333EA
```

### Typography
```css
--text-7xl: 72px (headlines)
--text-base: 16px (body)
--font-black: 900 (headlines)
--font-normal: 400 (body)
```

### Spacing
```css
--container-sm: 16px (mobile)
--container-lg: 32px (desktop)
--section-padding: 48px vertical
```

---

## ✅ Quality Standards

### Code Quality
- **TypeScript:** Strict mode, no `any` types
- **Components:** Under 500 lines per file
- **Tests:** Unit tests for business logic
- **Linting:** ESLint + Prettier configured
- **Performance:** Lighthouse score > 90

### Landing Pages
- **Quality Score:** Minimum 85/100
- **Load Time:** < 3s Time to Interactive
- **Mobile:** Fully responsive, touch-friendly
- **SEO:** Meta tags, semantic HTML
- **Accessibility:** WCAG AA compliance

### Security
- **Authentication:** NextAuth.js with JWT
- **Passwords:** bcrypt (12 rounds)
- **Input Validation:** Zod schemas
- **SQL Injection:** Parameterized queries
- **XSS Protection:** Input sanitization

---

## 🚀 Common Tasks

### Creating a New Page

```typescript
// 1. Create file: src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold">New Page</h1>
      {/* Content */}
    </div>
  );
}

// 2. Add to navigation
// 3. Update sitemap
// 4. Add metadata for SEO
```

### Creating a New Component

```typescript
// 1. Create file: src/components/[category]/ComponentName.tsx
import { FC } from 'react';

interface ComponentNameProps {
  // Props with TypeScript types
}

export const ComponentName: FC<ComponentNameProps> = (props) => {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

// 2. Export from index.ts
// 3. Use in pages
```

### Adding an API Route

```typescript
// 1. Create file: src/app/api/resource/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Handle GET request
  return NextResponse.json({ data: [] });
}

export async function POST(request: NextRequest) {
  // Handle POST request
  const body = await request.json();
  return NextResponse.json({ success: true });
}

// 2. Add authentication if needed
// 3. Add input validation
// 4. Add error handling
```

---

## 📊 Performance Targets

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Lighthouse Score:** > 90
- **Bundle Size:** < 150KB initial
- **Mobile Load Time:** < 3s on 4G

---

## 🛡️ Security Checklist

- [ ] Authentication required for protected routes
- [ ] Input validation on all forms
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (sanitize user input)
- [ ] CSRF protection (enabled by default)
- [ ] Rate limiting on API routes
- [ ] Security headers configured
- [ ] Environment variables secure
- [ ] HTTPS enabled in production
- [ ] GDPR compliance implemented

---

## 🔗 External Resources

### Official Documentation
- [Next.js 15](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org)

### External Services
- [Vercel Platform](https://vercel.com/docs)
- [Stripe API](https://stripe.com/docs/api)
- [ElevenLabs API](https://elevenlabs.io/docs)
- [Resend Email](https://resend.com/docs)

---

## 💡 Best Practices

### For AI Agents

**When generating code:**
1. Always use TypeScript with proper types
2. Follow existing component patterns
3. Use shadcn/ui components when possible
4. Keep files under 500 lines
5. Add proper error handling
6. Include loading states
7. Make components responsive
8. Optimize for performance

**When writing documentation:**
1. Be concise and actionable
2. Include code examples
3. Explain the "why" not just "how"
4. Update relevant sections
5. Maintain consistency

**When debugging:**
1. Check TypeScript errors first
2. Review console logs
3. Test on multiple devices
4. Verify database queries
5. Check environment variables

---

## 📝 Documentation Maintenance

### When to Update

**ARCHITECTURE.md:**
- Adding new features/pages
- Changing database schema
- Updating technology stack
- Modifying security implementation

**DEPLOYMENT_SETUP.md:**
- Changing deployment process
- Adding new environment variables
- Updating external service setup
- Modifying security configuration

**RESEARCH_INSIGHTS.md:**
- Creating new design patterns
- Updating quality benchmarks
- Adding new component patterns
- Refining conversion strategies

**AGENT_KNOWLEDGE_BASE.md:**
- Adding new documentation files
- Restructuring project
- Changing best practices
- Updating quality standards

---

## ✨ Quick Tips for AI Agents

1. **Always read relevant docs first** before making changes
2. **Follow existing patterns** in the codebase
3. **Use TypeScript strictly** - no `any` types
4. **Keep components modular** and reusable
5. **Optimize for performance** from the start
6. **Test on mobile** as well as desktop
7. **Update documentation** when adding features
8. **Follow security best practices** always

---

**This is your starting point.** Use the navigation above to find detailed information for any task.

Good luck building! 🚀
