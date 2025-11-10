# Deployment & Setup Guide

**Last Updated:** 2025-11-10
**Target Platform:** Vercel (Primary), Railway/Render (Alternative)
**Estimated Setup Time:** 15-30 minutes

## Table of Contents

1. [Quick Start (5 minutes)](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Database Setup](#database-setup)
4. [Authentication Setup](#authentication-setup)
5. [External Services](#external-services)
6. [Deployment](#deployment)
7. [Security Configuration](#security-configuration)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Create Vercel Postgres database
vercel storage create postgres

# 4. Create Vercel KV store
vercel storage create kv

# 5. Pull environment variables
vercel env pull .env.local

# 6. Generate JWT secret
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env.local
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env.local

# 7. Run development server
npm run dev
```

Visit http://localhost:3000 🎉

---

## Prerequisites

### Required
- Node.js 20+ installed
- Vercel account ([Sign up](https://vercel.com))
- PostgreSQL database (Neon recommended)
- Git repository

### Recommended
- Vercel CLI: `npm i -g vercel`
- PostgreSQL client: `psql`

### External Services
- ElevenLabs account (for AI voice)
- Stripe account (for payments)
- Resend account (for emails)

---

## Database Setup

### Option 1: Vercel Postgres (Recommended)

```bash
# Create database
vercel storage create postgres

# Select your project
# Choose closest region to users
# Name: ai-sekretarka-db

# This automatically adds environment variables:
# - POSTGRES_URL
# - POSTGRES_PRISMA_URL
# - POSTGRES_URL_NON_POOLING
```

### Option 2: Neon (Free Tier Available)

```bash
# 1. Create account at https://neon.tech
# 2. Create new project: ai-sekretarka
# 3. Copy connection string
# 4. Add to .env.local:
POSTGRES_URL="postgresql://user:pass@host/db?sslmode=require"
```

### Option 3: Local PostgreSQL

```bash
# Create database
createdb ai_sekretarka

# Connection string
POSTGRES_URL="postgresql://localhost:5432/ai_sekretarka"
```

### Initialize Database Schema

```bash
# Option A: Manual SQL execution
psql $POSTGRES_URL < docs/database-schema.sql

# Option B: Auto-init on first connection
# Schema will be created automatically when app starts
```

### Database Schema

The system uses these tables:
- `users` - User accounts
- `organizations` - Business entities
- `ai_agents` - AI receptionist configurations
- `conversations` - Call records
- `appointments` - Scheduled bookings
- `services` - Service offerings
- `staff` - Staff members
- `messages` - Communications
- `subscriptions` - Billing
- `analytics_events` - Usage tracking
- `accounts`, `sessions`, `verification_tokens` - NextAuth.js

---

## Authentication Setup

### NextAuth.js Configuration

**Environment Variables:**

```env
# Production URL
NEXTAUTH_URL="https://yourdomain.com"

# Secret key (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"

# JWT Secret (can be same as NEXTAUTH_SECRET or different)
JWT_SECRET="your-jwt-secret-key-min-32-chars"
```

### Generate Secure Secrets

```bash
# macOS/Linux
openssl rand -base64 32

# Windows (PowerShell)
-join ((65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Session Storage Setup

#### Option 1: Vercel KV (Recommended)

```bash
# Create KV store
vercel storage create kv

# Select your project
# Choose same region as Postgres
# Name: ai-sekretarka-sessions

# This automatically adds:
# - KV_URL
# - KV_REST_API_URL
# - KV_REST_API_TOKEN
# - KV_REST_API_READ_ONLY_TOKEN
```

#### Option 2: Database Sessions (Simpler)

```env
# Just use database for sessions
# No KV needed, but slightly slower
# Configure in: src/lib/auth/config.ts
```

### NextAuth.js Features Included

- ✅ Email/password authentication
- ✅ JWT session strategy
- ✅ Secure password hashing (bcrypt)
- ✅ Session management
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Email verification (optional)
- ✅ Password reset (optional)
- ✅ OAuth providers (optional: Google, GitHub)

---

## External Services

### ElevenLabs Setup

```bash
# 1. Create account at https://elevenlabs.io
# 2. Go to Settings → API Keys
# 3. Create new API key
# 4. Copy key (starts with 'sk_')
```

```env
ELEVENLABS_API_KEY="sk_your_api_key_here"
ELEVENLABS_BASE_URL="https://api.elevenlabs.io"
```

### Stripe Setup

```bash
# 1. Create account at https://stripe.com
# 2. Get API keys from Dashboard → Developers → API keys
# 3. Create products:
#    - Basic Plan: $29/month
#    - Pro Plan: $99/month
#    - Enterprise Plan: $299/month
# 4. Copy Price IDs (price_...)
```

```env
# Test keys
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Price IDs
STRIPE_BASIC_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."

# Webhook secret (after deployment)
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Resend Setup (Email)

```bash
# 1. Create account at https://resend.com
# 2. Add and verify your domain
# 3. Create API key
```

```env
RESEND_API_KEY="re_..."
ADMIN_EMAIL="admin@yourdomain.com"
```

---

## Deployment

### Deploy to Vercel (Recommended)

#### Step 1: Connect Repository

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link
```

#### Step 2: Configure Environment Variables

```bash
# Add all environment variables to Vercel
vercel env add NEXTAUTH_SECRET production
vercel env add JWT_SECRET production
vercel env add ELEVENLABS_API_KEY production
vercel env add STRIPE_SECRET_KEY production
# ... add all other variables
```

#### Step 3: Deploy

```bash
# Preview deployment (test first)
vercel

# Production deployment
vercel --prod
```

#### Step 4: Configure Stripe Webhooks

```bash
# After deployment, add webhook endpoint in Stripe Dashboard:
# URL: https://yourdomain.com/api/stripe/webhook

# Select these events:
✓ checkout.session.completed
✓ customer.subscription.created
✓ customer.subscription.updated
✓ customer.subscription.deleted
✓ invoice.payment_succeeded
✓ invoice.payment_failed

# Copy webhook signing secret
# Add to Vercel: vercel env add STRIPE_WEBHOOK_SECRET production
```

### Deploy to Railway (Alternative)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Add environment variables via Railway dashboard
# Deploy
railway up
```

### Deploy to Render (Alternative)

1. Connect GitHub repository
2. Create new Web Service
3. Add environment variables
4. Deploy

---

## Security Configuration

### 1. Security Headers

Configured in `next.config.js`:

```javascript
headers: async () => [
  {
    source: '/:path*',
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
  }
]
```

### 2. CORS Configuration

```typescript
// For API routes that need CORS
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://yourdomain.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

### 3. Rate Limiting

```typescript
// Implemented via Vercel KV
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});
```

### 4. Input Validation

```typescript
// Using Zod schemas
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(255),
});
```

### 5. GDPR/RODO Compliance

- ✅ Cookie consent banner
- ✅ Privacy policy page
- ✅ Terms of service
- ✅ Data export functionality
- ✅ Account deletion option
- ✅ Data retention policies

---

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql "$POSTGRES_URL" -c "SELECT 1"

# Check connection string format
# Should be: postgresql://user:password@host:port/database

# Common issues:
# - Missing SSL parameter: ?sslmode=require
# - Wrong port (default: 5432)
# - Firewall blocking connection
```

### Authentication Issues

```bash
# Verify JWT_SECRET is set
echo $JWT_SECRET

# Check NextAuth.js session
# Visit: http://localhost:3000/api/auth/session

# Clear cookies and try again
# Check browser DevTools → Application → Cookies
```

### Stripe Webhook Issues

```bash
# Test webhook locally with Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Verify webhook secret matches
# Check Stripe Dashboard → Webhooks → [your webhook] → Signing secret

# Common issues:
# - Webhook URL not accessible
# - Wrong webhook secret
# - Missing event types
```

### Build Errors

```bash
# Clear cache
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Type check
npm run type-check

# Build
npm run build
```

### Performance Issues

```bash
# Run Lighthouse audit
npm run lighthouse

# Check bundle size
npm run analyze

# Monitor Web Vitals
# Check Vercel Analytics dashboard
```

---

## Post-Deployment Checklist

### Immediate (Day 1)
- [ ] Verify all environment variables are set
- [ ] Test user registration flow
- [ ] Test user login flow
- [ ] Test password reset (if implemented)
- [ ] Verify Stripe payment flow
- [ ] Check Stripe webhooks are receiving events
- [ ] Test AI agent creation
- [ ] Verify email sending works

### Short-term (Week 1)
- [ ] Set up monitoring (Sentry)
- [ ] Configure error tracking
- [ ] Set up analytics (Google Analytics)
- [ ] Test all user flows
- [ ] Verify database backups
- [ ] Security audit
- [ ] Performance testing
- [ ] Load testing

### Medium-term (Month 1)
- [ ] User acceptance testing
- [ ] Bug fixes based on feedback
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Documentation updates
- [ ] Team training
- [ ] Marketing site updates

---

## Monitoring & Maintenance

### Error Tracking (Sentry)

```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs

# Configure in .env.local
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."
```

### Analytics (Google Analytics 4)

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."
```

### Database Backups

```bash
# Manual backup
pg_dump "$POSTGRES_URL" > backup-$(date +%Y%m%d).sql

# Automated backups (Vercel)
# Included in Vercel Postgres (7-day retention)

# Restore from backup
psql "$POSTGRES_URL" < backup-20251110.sql
```

### Performance Monitoring

```bash
# Vercel Analytics (included)
# View in Vercel Dashboard → Analytics

# Custom monitoring
npm install @vercel/analytics
```

---

## Environment Variables Reference

### Complete .env.local Template

```env
# Database
POSTGRES_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."

# Redis/KV
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."

# NextAuth.js
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="..." # openssl rand -base64 32
JWT_SECRET="..." # openssl rand -base64 32

# ElevenLabs
ELEVENLABS_API_KEY="sk_..."
ELEVENLABS_BASE_URL="https://api.elevenlabs.io"

# Stripe
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_BASIC_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."

# Email
RESEND_API_KEY="re_..."
ADMIN_EMAIL="admin@yourdomain.com"

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."

# Feature Flags (Optional)
ENABLE_EMAIL_VERIFICATION="false"
ENABLE_PASSWORD_RESET="false"
ENABLE_OAUTH="false"
```

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Stripe Documentation](https://stripe.com/docs)
- [ElevenLabs API](https://elevenlabs.io/docs)
- [Project Architecture](./ARCHITECTURE.md)

---

**Need Help?**
- Review this guide
- Check troubleshooting section
- Consult external documentation
- Review existing issues on GitHub

---

**Last Updated:** 2025-11-10
**Maintainers:** DevOps Team
**Review Frequency:** Monthly
