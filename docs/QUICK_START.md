# Quick Start Guide

**Setup Time:** 15 minutes
**Difficulty:** Beginner-friendly

## Prerequisites

- Node.js 20+ installed
- Git installed
- Code editor (VS Code recommended)

---

## 1. Installation (2 minutes)

```bash
# Clone repository (if not already)
# cd into project directory
cd ai-sekretarka-ui-mockup

# Install dependencies
npm install
```

---

## 2. Environment Setup (5 minutes)

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local
```

**Minimum Required Variables:**

```env
# Generate secrets: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret-here"
JWT_SECRET="your-secret-here"

# Database (for local development, use SQLite or local Postgres)
POSTGRES_URL="postgresql://localhost:5432/ai_sekretarka"

# For production, see DEPLOYMENT_SETUP.md
```

---

## 3. Run Development Server (1 minute)

```bash
# Start server
npm run dev

# Open browser
open http://localhost:3000
```

**You should see:**
- Homepage at `/`
- Digital Presence at `/digital-presence`
- Dashboard at `/dashboard` (requires login)

---

## 4. Test the Application (5 minutes)

### Homepage
Visit http://localhost:3000
- ✓ Page loads without errors
- ✓ Navigation works
- ✓ Animations render

### Forms
- Fill out contact form
- Check console for submission (no email in dev mode)

### Dashboard (Optional)
- Requires database setup
- See DEPLOYMENT_SETUP.md for full setup

---

## 5. Build for Production (2 minutes)

```bash
# Type check
npm run type-check

# Build
npm run build

# Start production server
npm start
```

---

## Next Steps

### For Development
1. **Read:** [ARCHITECTURE.md](./ARCHITECTURE.md) - System overview
2. **Setup:** [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) - Full deployment guide
3. **Design:** [RESEARCH_INSIGHTS.md](./RESEARCH_INSIGHTS.md) - Design patterns

### For Production Deployment
1. Follow [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)
2. Set up Vercel Postgres database
3. Configure all environment variables
4. Deploy to Vercel

### For AI Agents
1. Read [AGENT_KNOWLEDGE_BASE.md](./AGENT_KNOWLEDGE_BASE.md)
2. Use consolidated docs for context
3. Follow architectural patterns

---

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules .next package-lock.json
npm install
```

### Type Errors
```bash
# Check TypeScript
npm run type-check

# Auto-fix linting
npm run lint -- --fix
```

---

## Directory Structure

```
project/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── lib/              # Utilities & logic
│   └── types/            # TypeScript types
├── docs/                 # Documentation (you are here!)
├── public/              # Static assets
└── tests/               # Tests
```

---

## Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev --turbo      # Start with Turbopack (faster)

# Building
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript
npm run format           # Format with Prettier

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode
```

---

## Getting Help

1. **Documentation**
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
   - [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) - Deployment guide
   - [RESEARCH_INSIGHTS.md](./RESEARCH_INSIGHTS.md) - Design patterns
   - [AGENT_KNOWLEDGE_BASE.md](./AGENT_KNOWLEDGE_BASE.md) - For AI agents

2. **External Resources**
   - [Next.js Docs](https://nextjs.org/docs)
   - [React Docs](https://react.dev)
   - [Tailwind CSS](https://tailwindcss.com/docs)

3. **Troubleshooting**
   - Check console for errors
   - Review error messages carefully
   - Search existing GitHub issues

---

**Ready to build?** 🚀

Start coding and refer to the comprehensive documentation as needed!
