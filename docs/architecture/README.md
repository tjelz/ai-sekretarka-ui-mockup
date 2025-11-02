# AI Sekretarka Dashboard - Architecture Documentation

## Overview

This directory contains comprehensive architecture documentation for the AI Sekretarka dashboard system. The documentation was created by the Analyst Agent as part of the Hive Mind collective intelligence system.

## Document Index

| Document | Description | Status |
|----------|-------------|--------|
| [01-overview.md](./01-overview.md) | System architecture overview, technology stack, and key decisions | ✅ Complete |
| [02-database-schema.md](./02-database-schema.md) | PostgreSQL database schema with 11+ tables and relationships | ✅ Complete |
| [03-component-hierarchy.md](./03-component-hierarchy.md) | React component architecture and design system | ✅ Complete |
| [04-api-routes.md](./04-api-routes.md) | API routes, Server Actions, and data flow patterns | ✅ Complete |
| [05-state-management.md](./05-state-management.md) | State management strategy across 6 layers | ✅ Complete |
| [06-security.md](./06-security.md) | Security architecture, authentication, and GDPR compliance | ✅ Complete |
| [07-performance.md](./07-performance.md) | Performance optimization strategies and monitoring | ✅ Complete |

## Quick Reference

### Technology Stack

- **Framework**: Next.js 15.3.5 (App Router)
- **Frontend**: React 19, shadcn/ui, Tailwind CSS 4
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Neon Postgres, Vercel KV
- **Auth**: NextAuth.js v5
- **ORM**: Drizzle (planned)
- **Payments**: Stripe
- **Email**: Resend
- **Testing**: Jest, Playwright

### Key Architectural Decisions

1. **Server-First Architecture** - React Server Components by default
2. **NextAuth.js with JWT** - Secure, production-ready authentication
3. **PostgreSQL with JSONB** - Flexible schema for AI data
4. **shadcn/ui Components** - Accessible, customizable UI primitives
5. **Edge-Ready Deployment** - Vercel serverless platform

### Database Tables

**Core Tables:**
- `users` - User accounts and authentication
- `organizations` - Business entities
- `ai_agents` - AI receptionist configurations
- `conversations` - Call records and transcripts
- `appointments` - Scheduled bookings
- `services` - Service offerings
- `staff` - Staff members and availability
- `messages` - SMS/email communications
- `analytics_events` - Usage tracking
- `subscriptions` - Billing and payments
- `usage_metrics` - Resource consumption

**NextAuth Tables:**
- `accounts` - OAuth provider data
- `sessions` - User sessions
- `verification_tokens` - Email verification

### Component Structure

```
dashboard/
├── layout/          # Sidebar, Header, Navigation
├── overview/        # Dashboard metrics and charts
├── conversations/   # Call history and transcripts
├── appointments/    # Calendar and booking management
├── messages/        # SMS and email threads
└── settings/        # Configuration and preferences
```

### API Routes

**Authentication:**
- `/api/auth/*` - NextAuth.js handlers
- `/api/auth/register` - User registration

**Resources:**
- `/api/users/me` - Current user
- `/api/organizations` - Organization CRUD
- `/api/agents` - AI agent management
- `/api/conversations` - Call history
- `/api/appointments` - Booking management
- `/api/messages` - Communications
- `/api/services` - Service catalog
- `/api/staff` - Staff management

**Analytics & Billing:**
- `/api/analytics/*` - Performance metrics
- `/api/billing/*` - Subscription and payments

### Security Features

- ✅ NextAuth.js authentication
- ✅ bcrypt password hashing (12 rounds)
- ✅ Role-based access control (RBAC)
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input validation (Zod)
- ✅ GDPR/RODO compliance
- ✅ Audit logging
- ✅ Security headers (CSP, HSTS)

### Performance Targets

| Metric | Target | Priority |
|--------|--------|----------|
| First Contentful Paint | < 1.5s | High |
| Time to Interactive | < 3s | High |
| Lighthouse Score | > 90 | High |
| Bundle Size | < 150KB | Medium |

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [x] Architecture documentation
- [ ] Database schema implementation
- [ ] NextAuth.js setup completion
- [ ] Basic dashboard layout

### Phase 2: Core Features (Week 3-4)
- [ ] Conversation management
- [ ] Appointment system
- [ ] AI agent configuration
- [ ] Message handling

### Phase 3: Advanced Features (Week 5-6)
- [ ] Analytics dashboard
- [ ] Billing integration (Stripe)
- [ ] Real-time updates
- [ ] Performance optimization

### Phase 4: Polish & Launch (Week 7-8)
- [ ] Security audit
- [ ] Performance testing
- [ ] User acceptance testing
- [ ] Production deployment

## Development Guidelines

### Code Organization
- Server Components by default
- Client Components only when needed
- Co-locate related files
- Keep files under 500 lines

### Database Queries
- Use parameterized queries
- Add indexes for frequent queries
- Optimize N+1 queries with joins
- Cache expensive operations

### State Management
1. **Server State** - Database (Neon Postgres)
2. **URL State** - Search params for filters
3. **Session State** - NextAuth.js cookies
4. **Cache State** - Vercel KV
5. **Component State** - React hooks
6. **Global State** - Context/Zustand (minimal)

### Performance Best Practices
- Lazy load heavy components
- Use Image optimization
- Implement code splitting
- Enable streaming with Suspense
- Monitor Web Vitals

## Reference Design

Based on analysis of https://3000-97e53d38-f78e-45fa-8902-a6c29357c94a.orchids.page/

**Key Patterns:**
- Vertical sidebar navigation
- Minimalist card-based layout
- Numerical metrics with trends
- Clean typography and spacing
- Real-time performance monitoring

## Contact

For questions or clarifications about this architecture:
- Review the individual documents in this directory
- Check the inline code documentation
- Consult the Hive Mind collective memory

---

**Document Version**: 1.0
**Last Updated**: 2025-11-02
**Created By**: Analyst Agent - Hive Mind Swarm
**Total Pages**: 100+
**Total Words**: ~50,000
