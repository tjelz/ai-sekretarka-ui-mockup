# 🚀 Quick Start Guide - ElevenLabs Dashboard

Get your ElevenLabs AI Agent Dashboard up and running in **15 minutes**.

---

## ⚡ Prerequisites

- Node.js 20+ installed
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- ElevenLabs account ([Sign up](https://elevenlabs.io))
- Stripe account ([Sign up](https://stripe.com))

---

## 📋 5-Step Setup

### Step 1️⃣: Clone & Install (2 minutes)

```bash
# Already in project directory
cd /Users/thomasfebry/ai-sekretarka-ui-mockup

# Install dependencies
npm install

# Or use bun for faster installation
bun install
```

---

### Step 2️⃣: Database Setup (3 minutes)

#### Option A: Neon (Recommended - Free Tier)
```bash
# 1. Create Neon account at https://neon.tech
# 2. Create new project
# 3. Copy connection string
# 4. Run migrations:

psql "your-neon-connection-string" < docs/database-schema.sql
```

#### Option B: Local PostgreSQL
```bash
# Create database
createdb ai_sekretarka

# Run migrations
psql ai_sekretarka < docs/database-schema.sql
```

---

### Step 3️⃣: ElevenLabs Setup (2 minutes)

```bash
# 1. Go to https://elevenlabs.io/app/settings/api-keys
# 2. Create new API key
# 3. Copy the key (starts with 'sk_...')
```

---

### Step 4️⃣: Stripe Setup (5 minutes)

```bash
# 1. Create Stripe account at https://stripe.com
# 2. Get API keys from https://dashboard.stripe.com/test/apikeys
# 3. Create 3 products with prices:

# Basic Plan - $29/month
# Pro Plan - $99/month
# Enterprise Plan - $299/month

# 4. Copy Price IDs (price_...)
# 5. Set up webhook endpoint (after deployment):
#    https://your-domain.com/api/stripe/webhooks
#    Select events: checkout.session.completed, customer.subscription.*
```

---

### Step 5️⃣: Environment Configuration (3 minutes)

```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your credentials
nano .env.local
```

**Required Environment Variables:**

```env
# Database (from Neon or local PostgreSQL)
POSTGRES_URL="postgresql://user:pass@host/dbname"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-here"  # Generate: openssl rand -base64 32

# ElevenLabs
ELEVENLABS_API_KEY="sk_your_api_key_here"
ELEVENLABS_BASE_URL="https://api.elevenlabs.io"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # Get after webhook setup
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Stripe Price IDs (from products you created)
STRIPE_BASIC_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."

# Email (Optional - for notifications)
RESEND_API_KEY="re_..."
ADMIN_EMAIL="admin@yourdomain.com"
```

---

## 🏃 Run Development Server

```bash
# Start development server
npm run dev

# Or with Turbopack (faster)
npm run dev --turbo

# Or with bun
bun run dev
```

Visit **http://localhost:3000/dashboard** 🎉

---

## ✅ Verify Installation

### 1. Check Database Connection
```bash
# Test database connection
npm run db:test
```

### 2. Run Tests
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e
```

### 3. Build for Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 🚀 Deploy to Production

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard
# Set production webhook URL in Stripe
```

### Deploy to Other Platforms

See deployment guides:
- [Railway](https://railway.app)
- [Render](https://render.com)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

---

## 🔧 Post-Deployment Setup

### 1. Configure Stripe Webhooks

```bash
# After deployment, add webhook endpoint:
# URL: https://your-domain.com/api/stripe/webhooks

# Select these events:
✓ checkout.session.completed
✓ customer.subscription.created
✓ customer.subscription.updated
✓ customer.subscription.deleted
✓ invoice.payment_succeeded
✓ invoice.payment_failed
```

### 2. Test Payment Flow

1. Go to your dashboard
2. Click "Billing" → "Upgrade Plan"
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future date and any CVC
5. Verify subscription activates

### 3. Create Your First Agent

1. Go to "AI Agents"
2. Click "Create Agent"
3. Configure:
   - Name, description
   - Voice selection
   - Speaking style
   - Services & pricing
4. Activate agent

---

## 📊 Dashboard Features

### Overview Page
- Key metrics (agents, calls, success rate)
- Recent activity feed
- Usage overview
- Quick actions

### AI Agents Page
- Create, edit, delete agents
- Configure voice & style
- Set services & pricing
- Assign staff members
- Pause/activate agents

### Analytics Page
- Performance metrics
- Conversation trends
- Success rate tracking
- Call duration analysis

### Billing Page
- View current plan
- Upgrade/downgrade
- Usage tracking
- Invoice history
- Payment methods

### Settings Page
- Profile management
- Security (password change)
- API keys
- Webhook configuration
- Notification preferences

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check connection string format
# Should be: postgresql://user:password@host:port/database

# Test connection
psql "your-connection-string" -c "SELECT 1"
```

### ElevenLabs API Errors
```bash
# Verify API key is correct
# Check API key starts with 'sk_'
# Ensure you have credits in your ElevenLabs account
```

### Stripe Webhook Issues
```bash
# Verify webhook secret in .env.local
# Check webhook endpoint is accessible
# Review Stripe Dashboard → Webhooks → Recent Events
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📚 Additional Resources

### Documentation
- [Complete Dashboard README](/docs/DASHBOARD_README.md)
- [Architecture Guide](/docs/architecture/README.md)
- [Database Schema](/docs/database-schema.sql)
- [Research Findings](/docs/research/RESEARCH_SUMMARY.md)
- [Hive Mind Summary](/docs/HIVE_MIND_SUMMARY.md)

### External Docs
- [ElevenLabs API](https://elevenlabs.io/docs/agents-platform/overview)
- [Stripe Integration](https://stripe.com/docs)
- [Next.js 15](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org)

### Testing
- [Test Suite README](/tests/README.md)
- [Test Summary](/tests/TEST_SUMMARY.md)

---

## 💡 Pro Tips

### Development
```bash
# Use Turbopack for faster dev builds
npm run dev --turbo

# Run tests in watch mode
npm run test:watch

# Check types
npm run type-check

# Lint code
npm run lint
```

### Database
```bash
# Backup database
pg_dump "your-connection-string" > backup.sql

# Restore database
psql "your-connection-string" < backup.sql
```

### Stripe Testing
```bash
# Test credit cards:
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
Require 3DS: 4000 0025 0000 3155
```

---

## 🎯 What's Next?

### Immediate (This Week)
- [ ] Set up production environment
- [ ] Configure monitoring (Sentry)
- [ ] Set up error tracking
- [ ] Create backup strategy
- [ ] Security audit

### Short-term (This Month)
- [ ] User onboarding flow
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Performance optimization
- [ ] Documentation site

### Long-term (Next Quarter)
- [ ] Mobile app
- [ ] Team collaboration features
- [ ] Advanced reporting
- [ ] Multi-language support
- [ ] White-label options

---

## 🆘 Need Help?

### Common Issues
1. **Can't access dashboard** → Check if you're logged in
2. **Payment not working** → Verify Stripe keys and webhook
3. **Agent creation fails** → Check ElevenLabs API key and credits
4. **Database errors** → Verify connection string and migrations

### Support Channels
- 📖 Check `/docs` directory
- 🐛 Review test files in `/tests`
- 📝 Read architecture docs
- 🔍 Search existing issues

---

## ✅ Setup Checklist

- [ ] Node.js 20+ installed
- [ ] PostgreSQL database created
- [ ] Database migrations run
- [ ] ElevenLabs API key obtained
- [ ] Stripe account created
- [ ] Stripe products configured
- [ ] Environment variables set
- [ ] Dependencies installed
- [ ] Development server running
- [ ] Tests passing
- [ ] Production build successful
- [ ] Deployed to hosting platform
- [ ] Webhooks configured
- [ ] Payment flow tested
- [ ] First agent created

---

**🎉 Congratulations!** Your ElevenLabs AI Agent Dashboard is ready!

Visit your dashboard at **http://localhost:3000/dashboard** or your production URL.

---

**Created by**: Hive Mind Collective Intelligence System
**Last Updated**: November 2, 2025
**Version**: 1.0.0
