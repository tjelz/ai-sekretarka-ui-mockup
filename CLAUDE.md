# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **AI Sekretarka UI Mockup** - a marketing website for Yieldo, specifically showcasing their "AI Sekretarka" (AI Secretary) service. The site is built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

## Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4 with custom theme configuration
- **UI Components**: Extensive shadcn/ui component library + Radix UI primitives
- **Animations**: Framer Motion, Motion DOM
- **Icons**: Lucide React, Heroicons, Tabler Icons

## Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (Yieldo landing)
│   ├── ai-sekretarka/     # AI Sekretarka product page
│   │   └── page.tsx
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles & Tailwind config
│   └── global-error.tsx   # Global error boundary
├── components/
│   └── ui/                # shadcn/ui components (60+ components)
├── lib/
│   ├── utils.ts           # Utility functions (cn, etc.)
│   └── hooks/             # Custom React hooks
├── hooks/                 # Additional hooks
└── visual-edits/          # Visual editing utilities
```

## Key Architecture Notes

### Routing
- Uses Next.js App Router with file-based routing
- Two main pages:
  - `/` - Homepage showcasing Yieldo agency
  - `/ai-sekretarka` - Detailed product page for AI Secretary service

### Styling System
- Tailwind CSS 4 with `@theme inline` configuration in `globals.css`
- Custom CSS variables for theming (light/dark mode support)
- Brand colors defined as `--blue-accent` (#007BFF), `--blue-accent-light`, `--blue-accent-dark`
- Uses OKLCH color space for better color consistency
- Path alias: `@/*` maps to `./src/*`

### Component Library
- Extensive shadcn/ui component collection already installed
- All UI components follow consistent patterns with Radix UI primitives
- Located in `src/components/ui/`
- Includes: buttons, forms, dialogs, navigation, data display, etc.

### State Management
- Client-side components use React hooks (`"use client"` directive)
- Form state managed with local useState (see ai-sekretarka/page.tsx:9)
- No global state management library currently used

### Type Safety
- Strict TypeScript configuration enabled
- Target: ES2017
- Module resolution: bundler

## Important Conventions

1. **Client Components**: Pages that need interactivity use `"use client"` directive at the top
2. **Styling**: Use Tailwind classes with `cn()` utility for conditional classes
3. **Icons**: Import from `lucide-react` for consistency
4. **Color Usage**: Reference brand colors via CSS variables or Tailwind classes
5. **Forms**: Currently using controlled components with useState (no react-hook-form integration on these pages yet, though library is installed)

## Content Notes

- Website is in **Polish language** (for Polish market)
- Target audience: Small businesses, beauty salons, service companies
- Key value proposition: 24/7 AI phone answering service that schedules appointments
- Pricing: 499 PLN setup fee, 199 PLN/month subscription

## Dependencies of Note

- **Authentication**: better-auth installed but not yet implemented
- **Database**: Drizzle ORM + libsql configured but not used in current pages
- **Forms**: react-hook-form + zod installed for future use
- **Payments**: Stripe SDK included
- **3D Graphics**: Three.js, react-three-fiber, drei available for visual enhancements

## Next.js Configuration

- Uses Turbopack for faster development builds
- TypeScript strict mode enabled
- ESLint configured with Next.js config

## Production Readiness

This codebase has been cleaned up for production deployment:
- All development tools removed (VisualEditsMessenger, ErrorReporter, debug scripts)
- Proper SEO metadata added to all pages
- Form handling with validation and user feedback via toast notifications
- Language correctly set to Polish (`lang="pl"`)
- Build verified and passing (all pages static)
- See `PRODUCTION_CHANGES.md` for complete details

**Important Notes:**
- Contact form needs API endpoint implementation (currently simulated)
- Favicon needs to be added (removed corrupted placeholder)
- Install dependencies with `npm install --legacy-peer-deps` due to better-auth peer dependency conflict
