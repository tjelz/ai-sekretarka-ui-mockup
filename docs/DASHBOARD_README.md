# ElevenLabs Dashboard Implementation

## Overview

A complete dashboard implementation for managing ElevenLabs AI voice agents with Stripe payment integration, analytics, and account management.

## Features Implemented

### 1. ElevenLabs API Integration
- **Location**: `/src/lib/elevenlabs/client.ts`
- Full TypeScript client for ElevenLabs API
- Voice management
- Agent CRUD operations
- Conversation metrics and analytics
- Error handling and validation

### 2. Stripe Payment Integration
- **Location**: `/src/lib/stripe/client.ts`, `/src/lib/stripe/utils.ts`
- Customer management
- Checkout session creation
- Subscription management (create, update, cancel, resume)
- Payment method handling
- Invoice management
- Billing portal integration
- Webhook event processing

### 3. Dashboard Layout & Navigation
- **Location**: `/src/components/dashboard/DashboardLayout.tsx`
- Responsive sidebar navigation
- Mobile-friendly design
- User menu with profile dropdown
- Dark mode support

### 4. Dashboard Pages

#### Overview Page (`/dashboard`)
- Welcome message with user details
- Quick action buttons
- Key metrics cards (Active Agents, Total Calls, Success Rate, Duration)
- Recent activity feed
- Usage overview with progress bars
- Getting started guide for new users

#### AI Agents Page (`/dashboard/agents`)
- Grid view of all agents
- Agent cards with status indicators
- Create, edit, delete, pause/activate actions
- Empty state for new users

#### Analytics Page (`/dashboard/analytics`)
- Performance metrics overview
- Line and bar charts for conversation trends
- Success rate tracking
- Call duration analytics

#### Billing Page (`/dashboard/billing`)
- Current subscription plan display
- Usage tracking (calls, agents)
- Available subscription tiers (Basic, Pro, Enterprise)
- Payment method management
- Invoice history with download options
- Upgrade/downgrade functionality

#### Settings Page (`/dashboard/settings`)
- Profile information management
- Security settings (password change)
- Notification preferences
- API key configuration
- Webhook URL setup
- Account deletion (danger zone)

### 5. API Routes

#### ElevenLabs Routes
- `GET /api/elevenlabs/agents` - List all agents
- `POST /api/elevenlabs/agents` - Create new agent
- `GET /api/elevenlabs/agents/[agentId]` - Get agent details
- `PATCH /api/elevenlabs/agents/[agentId]` - Update agent
- `DELETE /api/elevenlabs/agents/[agentId]` - Delete agent

#### Stripe Routes
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhooks` - Handle Stripe webhooks

### 6. Reusable Components

#### AgentCard
- Displays agent information
- Status badge (Active/Paused)
- Action menu (Edit, Pause, Delete)
- Created date and configuration

#### AnalyticsChart
- Line and bar chart support
- Powered by Recharts
- Responsive design
- Dark mode compatible

#### StatsCard
- Metric display with icon
- Trend indicators (up/down percentage)
- Description text
- Consistent styling

## Environment Variables

Add these to your `.env` file (see `.env.example` for template):

```env
# ElevenLabs API
ELEVENLABS_API_KEY=your_api_key
ELEVENLABS_BASE_URL=https://api.elevenlabs.io

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...
```

## Database Schema

Run the SQL migration in `/docs/database-schema.sql` to set up the required tables:

1. Extended `users` table with Stripe fields
2. `invoices` table for payment history
3. `ai_agents` table for agent configurations
4. `conversation_metrics` table for analytics
5. `usage_tracking` table for billing

## Subscription Tiers

### Basic Plan - $29/month
- 1 AI Agent
- 100 calls/month
- Basic analytics
- Email support

### Pro Plan - $99/month
- 5 AI Agents
- 1,000 calls/month
- Advanced analytics
- Priority support

### Enterprise Plan - $299/month
- Unlimited Agents
- Unlimited calls
- Custom analytics
- Dedicated support

## Setup Instructions

### 1. Database Setup
```bash
# Run the migration
psql $POSTGRES_URL < docs/database-schema.sql
```

### 2. Stripe Setup
1. Create a Stripe account at https://stripe.com
2. Set up Products and Prices in Stripe Dashboard
3. Configure webhook endpoint: `https://your-domain.com/api/stripe/webhooks`
4. Copy Price IDs to environment variables

### 3. ElevenLabs Setup
1. Create an account at https://elevenlabs.io
2. Generate API key in Settings
3. Add API key to environment variables

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000/dashboard` to see the dashboard.

## Architecture

### Authentication Flow
- NextAuth.js with Postgres adapter
- JWT session strategy
- Protected routes with middleware
- Automatic redirect to login

### Payment Flow
1. User selects subscription tier
2. Frontend calls `/api/stripe/checkout`
3. Creates Stripe Customer (if new)
4. Creates Checkout Session
5. Redirects to Stripe Checkout
6. Webhook updates subscription status
7. User redirected back to dashboard

### Agent Management Flow
1. User creates agent via UI
2. Frontend calls `/api/elevenlabs/agents`
3. ElevenLabs client creates agent
4. Agent data stored in database
5. Agent appears in dashboard

## Security Features

- Authentication required for all dashboard routes
- API routes protected with session checks
- Environment variables for sensitive data
- Webhook signature verification
- Input validation with Zod schemas
- SQL injection protection with parameterized queries

## Performance Optimizations

- Server-side rendering for dashboard pages
- Client-side components for interactivity
- Optimistic UI updates
- Efficient data fetching
- Proper error boundaries

## Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly controls
- Responsive charts and tables
- Dark mode support

## Next Steps

1. **Connect Real ElevenLabs API**: Replace mock data with actual API calls
2. **Implement Agent Creation Form**: Build form for creating new agents
3. **Add Voice Selection**: Integrate voice picker from ElevenLabs
4. **Real-time Analytics**: Add WebSocket support for live metrics
5. **Email Notifications**: Integrate with Resend for email alerts
6. **Testing**: Add unit and integration tests
7. **Documentation**: Add API documentation with examples

## File Structure

```
/src
  /app
    /dashboard
      /agents         - AI agent management
      /analytics      - Performance metrics
      /billing        - Subscription & payments
      /settings       - Account settings
      page.tsx        - Dashboard overview
      layout.tsx      - Dashboard wrapper
    /api
      /elevenlabs
        /agents       - Agent CRUD endpoints
      /stripe
        /checkout     - Payment checkout
        /webhooks     - Stripe events
  /components
    /dashboard
      DashboardLayout.tsx
      AgentCard.tsx
      AnalyticsChart.tsx
      StatsCard.tsx
  /lib
    /elevenlabs
      client.ts       - ElevenLabs API client
    /stripe
      client.ts       - Stripe client
      utils.ts        - Helper functions
```

## Support

For issues or questions:
- Check the documentation in `/docs`
- Review environment variables in `.env.example`
- Verify database schema is up to date
- Check API credentials are correct

## License

This implementation is part of the AI Secretary project.
