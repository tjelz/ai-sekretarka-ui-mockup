# Architecture Overview - AI Sekretarka Dashboard

## Executive Summary

This document provides a comprehensive architecture analysis for the AI Sekretarka dashboard system, based on the reference design and existing codebase implementation using Next.js 15, NextAuth.js, and Neon Postgres.

## System Context

### Current Implementation
- **Framework**: Next.js 15.3.5 (App Router with React Server Components)
- **UI Library**: React 19 with shadcn/ui components (Radix UI primitives)
- **Authentication**: NextAuth.js v5 with PostgreSQL adapter
- **Database**: Neon Postgres (via Vercel Postgres SDK)
- **Styling**: Tailwind CSS 4 with custom theme
- **State Management**: React Server Components + Client Components with hooks
- **Form Handling**: React Hook Form with Zod validation
- **Email Service**: Resend API for transactional emails

### Reference Design Analysis
Based on the orchids.page reference, the dashboard features:
- **Vertical sidebar navigation** with icon-based menu
- **Performance metrics dashboard** with numerical KPIs and trend indicators
- **Minimalist design** with clean typography and compact layouts
- **Real-time monitoring** capabilities for AI receptionist performance
- **7-day trend tracking** for key business metrics

## Architecture Principles

### 1. Server-First Architecture
Leveraging Next.js 15 App Router capabilities:
- React Server Components by default for optimal performance
- Client Components only when interactivity is required
- Server Actions for data mutations
- Streaming and Suspense for progressive rendering

### 2. Type Safety
- TypeScript 5 for all code
- Zod schemas for runtime validation
- Database types derived from schema
- Strict null checking enabled

### 3. Security by Default
- JWT-based session management
- CSRF protection via NextAuth
- Environment variable validation
- SQL injection prevention via parameterized queries
- GDPR/RODO compliance considerations

### 4. Performance Optimization
- Edge-ready API routes
- Server-side rendering for initial load
- Client-side hydration for interactivity
- Image optimization via next/image
- Code splitting and lazy loading

### 5. Scalability
- Serverless deployment model (Vercel)
- Database connection pooling
- Caching strategies (Vercel KV)
- CDN-distributed static assets

## Technology Stack Matrix

| Layer | Technology | Purpose | Status |
|-------|-----------|---------|--------|
| **Frontend** | Next.js 15 | Full-stack framework | ✅ Implemented |
| | React 19 | UI library | ✅ Implemented |
| | Tailwind CSS 4 | Styling | ✅ Implemented |
| | shadcn/ui | Component library | ✅ Implemented |
| | Framer Motion | Animations | ✅ Implemented |
| **Backend** | Next.js API Routes | API layer | ✅ Partial |
| | NextAuth.js | Authentication | ✅ Implemented |
| | Server Actions | Data mutations | 📋 Planned |
| **Database** | Neon Postgres | Primary database | ✅ Implemented |
| | Vercel KV | Session/cache store | ✅ Implemented |
| | Drizzle ORM | Database migrations | 📋 Planned |
| **External Services** | Resend | Email delivery | ✅ Implemented |
| | Stripe | Payment processing | 📋 Planned |
| | Twilio/SendGrid | SMS notifications | 📋 Planned |
| **Testing** | Jest | Unit testing | ✅ Configured |
| | Playwright | E2E testing | ✅ Configured |
| | Testing Library | Component testing | ✅ Configured |
| **DevOps** | Vercel | Hosting & CI/CD | ✅ Assumed |
| | GitHub Actions | Additional CI/CD | 📋 Optional |

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Next.js App Router (React 19)                  │ │
│  │  ┌──────────────────┐  ┌─────────────────────────────┐ │ │
│  │  │  Public Pages    │  │  Protected Dashboard        │ │ │
│  │  │  - Landing       │  │  - Overview                 │ │ │
│  │  │  - AI Sekretarka │  │  - Conversations            │ │ │
│  │  │  - Login         │  │  - Appointments             │ │ │
│  │  └──────────────────┘  │  - Messages                 │ │ │
│  │                        │  - Settings                 │ │ │
│  │                        │  - Billing                  │ │ │
│  │                        └─────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Server (Edge)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              API Routes & Server Actions                │ │
│  │  ┌─────────────┐  ┌──────────┐  ┌──────────────────┐  │ │
│  │  │ /api/auth/* │  │ /api/*   │  │  Server Actions  │  │ │
│  │  │ NextAuth.js │  │ Custom   │  │  (Form handling) │  │ │
│  │  └─────────────┘  └──────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Middleware Layer                       │ │
│  │  - Authentication checks                                │ │
│  │  - Session management                                   │ │
│  │  - Route protection                                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
┌──────────────────┐  ┌──────────────┐  ┌─────────────────┐
│ Neon Postgres    │  │  Vercel KV   │  │  External APIs  │
│ - Users          │  │  - Sessions  │  │  - Resend       │
│ - Agents         │  │  - Cache     │  │  - Stripe       │
│ - Conversations  │  │  - Rate      │  │  - Twilio       │
│ - Appointments   │  │    limiting  │  │  - AI Services  │
│ - Analytics      │  └──────────────┘  └─────────────────┘
│ - Billing        │
└──────────────────┘
```

## Key Architectural Decisions

### ADR-001: Next.js App Router
**Decision**: Use Next.js 15 App Router instead of Pages Router
- **Rationale**: Better performance via React Server Components, built-in layouts, streaming
- **Consequences**: Requires understanding of server/client component boundaries
- **Status**: Implemented

### ADR-002: NextAuth.js for Authentication
**Decision**: Use NextAuth.js with JWT sessions and PostgreSQL adapter
- **Rationale**: Production-ready, secure, well-maintained, supports multiple providers
- **Consequences**: Requires PostgreSQL tables, JWT token management
- **Status**: Implemented

### ADR-003: shadcn/ui Component Library
**Decision**: Use shadcn/ui built on Radix UI primitives
- **Rationale**: Accessible, customizable, type-safe, no runtime dependencies
- **Consequences**: Components are copied into codebase (not npm package)
- **Status**: Implemented

### ADR-004: Monolithic Deployment
**Decision**: Deploy as single Next.js application on Vercel
- **Rationale**: Simplicity, automatic scaling, global CDN, serverless functions
- **Consequences**: Coupled deployment, but suitable for current scale
- **Status**: Assumed

### ADR-005: Server Actions for Mutations
**Decision**: Use Server Actions for form handling instead of API routes
- **Rationale**: Simplified data flow, built-in loading states, progressive enhancement
- **Consequences**: Requires understanding of server/client boundaries
- **Status**: Planned

## Non-Functional Requirements

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: > 90 (all categories)
- **API Response Time**: < 200ms (p95)

### Security Requirements
- **Authentication**: Multi-factor authentication support
- **Authorization**: Role-based access control
- **Data Encryption**: At rest and in transit
- **Compliance**: RODO/GDPR, data retention policies

### Scalability Requirements
- **Users**: Support up to 10,000 concurrent users
- **Database**: Connection pooling for 100+ connections
- **API**: Rate limiting per user/IP
- **Storage**: Unlimited conversation history with archival

### Availability Requirements
- **Uptime**: 99.9% SLA
- **Disaster Recovery**: Daily backups, < 1hr RTO
- **Monitoring**: Real-time error tracking, performance monitoring

## Next Steps

1. **Database Schema Design** (docs/architecture/02-database-schema.md)
2. **Component Hierarchy** (docs/architecture/03-component-hierarchy.md)
3. **API Routes & Data Flow** (docs/architecture/04-api-routes.md)
4. **State Management Strategy** (docs/architecture/05-state-management.md)
5. **Security Architecture** (docs/architecture/06-security.md)
6. **Performance Optimization** (docs/architecture/07-performance.md)

---

*Document Version: 1.0*
*Last Updated: 2025-11-02*
*Author: Analyst Agent - Hive Mind Swarm*
