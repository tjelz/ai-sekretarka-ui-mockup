# API Routes & Data Flow Architecture

## Overview

This document defines the API architecture for the AI Sekretarka dashboard using Next.js 15 App Router patterns with API Routes and Server Actions.

## API Design Principles

### 1. RESTful Convention
- **GET**: Retrieve resources
- **POST**: Create resources
- **PATCH**: Update resources
- **DELETE**: Remove resources
- **PUT**: Replace resources (rarely used)

### 2. Server Actions for Mutations
- Prefer Server Actions for form handling
- Use API routes for external integrations
- Leverage progressive enhancement

### 3. API Versioning
- Current: `/api/v1/*`
- Future versions: `/api/v2/*`

### 4. Response Format
```typescript
// Success Response
interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Error Response
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
```

## API Route Structure

### Authentication Routes

#### `/api/auth/[...nextauth]`
NextAuth.js handler (already implemented)
```typescript
// GET /api/auth/signin
// GET /api/auth/signout
// POST /api/auth/callback/:provider
// GET /api/auth/session
// GET /api/auth/csrf
// GET /api/auth/providers
```

#### `/api/auth/register`
```typescript
// POST /api/auth/register
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  organizationName?: string;
}

interface RegisterResponse {
  success: true;
  data: {
    userId: string;
    email: string;
  };
}
```

### User & Organization Routes

#### `/api/users/me`
```typescript
// GET /api/users/me - Get current user profile
// PATCH /api/users/me - Update user profile
interface UpdateUserRequest {
  name?: string;
  phone?: string;
  avatarUrl?: string;
}
```

#### `/api/organizations`
```typescript
// GET /api/organizations - List user's organizations
// POST /api/organizations - Create new organization

interface CreateOrganizationRequest {
  name: string;
  industry: string;
  businessType: string;
  phone: string;
  email: string;
  businessHours: BusinessHours;
}

// PATCH /api/organizations/:id - Update organization
// DELETE /api/organizations/:id - Delete organization
```

### AI Agent Routes

#### `/api/agents`
```typescript
// GET /api/agents - List organization's agents
// POST /api/agents - Create new agent

interface CreateAgentRequest {
  name: string;
  voiceId?: string;
  language: string;
  personalityTraits: Record<string, unknown>;
  knowledgeBase: Record<string, unknown>;
  capabilities: string[];
}

// GET /api/agents/:id - Get agent details
// PATCH /api/agents/:id - Update agent
// DELETE /api/agents/:id - Delete agent
// POST /api/agents/:id/activate - Activate agent
// POST /api/agents/:id/deactivate - Deactivate agent
```

#### `/api/agents/:id/performance`
```typescript
// GET /api/agents/:id/performance - Get performance metrics
interface PerformanceMetricsResponse {
  totalCalls: number;
  totalMinutes: number;
  appointmentsBooked: number;
  averageSentiment: number;
  successRate: number;
  trends: {
    calls: Trend[];
    appointments: Trend[];
    satisfaction: Trend[];
  };
}
```

### Conversation Routes

#### `/api/conversations`
```typescript
// GET /api/conversations - List conversations with filters
interface GetConversationsQuery {
  page?: number;
  limit?: number;
  status?: 'active' | 'completed' | 'missed' | 'failed';
  startDate?: string;
  endDate?: string;
  agentId?: string;
  search?: string;
}

// POST /api/conversations - Create conversation (webhook from AI service)
// GET /api/conversations/:id - Get conversation details
// PATCH /api/conversations/:id - Update conversation
```

#### `/api/conversations/:id/transcript`
```typescript
// GET /api/conversations/:id/transcript - Get conversation transcript
interface TranscriptResponse {
  messages: Array<{
    timestamp: string;
    speaker: 'agent' | 'caller';
    text: string;
    sentiment?: number;
  }>;
}
```

#### `/api/conversations/:id/recording`
```typescript
// GET /api/conversations/:id/recording - Get audio recording URL
interface RecordingResponse {
  url: string;
  duration: number;
  expiresAt: string;
}
```

### Appointment Routes

#### `/api/appointments`
```typescript
// GET /api/appointments - List appointments with filters
interface GetAppointmentsQuery {
  page?: number;
  limit?: number;
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  startDate?: string;
  endDate?: string;
  serviceType?: string;
}

// POST /api/appointments - Create appointment
interface CreateAppointmentRequest {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceType: string;
  scheduledAt: string;
  notes?: string;
}

// GET /api/appointments/:id - Get appointment details
// PATCH /api/appointments/:id - Update appointment
// DELETE /api/appointments/:id - Cancel appointment
// POST /api/appointments/:id/confirm - Confirm appointment
// POST /api/appointments/:id/complete - Mark as completed
// POST /api/appointments/:id/no-show - Mark as no-show
```

#### `/api/appointments/availability`
```typescript
// GET /api/appointments/availability - Get available time slots
interface AvailabilityQuery {
  date: string;
  serviceType: string;
  staffId?: string;
}

interface AvailabilityResponse {
  slots: Array<{
    time: string;
    available: boolean;
  }>;
}
```

### Message Routes

#### `/api/messages`
```typescript
// GET /api/messages - List messages
interface GetMessagesQuery {
  page?: number;
  limit?: number;
  channel?: 'sms' | 'email' | 'voice' | 'chat';
  direction?: 'inbound' | 'outbound';
  status?: 'sent' | 'delivered' | 'failed' | 'pending';
}

// POST /api/messages - Send message
interface SendMessageRequest {
  to: string;
  channel: 'sms' | 'email';
  subject?: string;
  body: string;
  appointmentId?: string;
}

// GET /api/messages/:id - Get message details
```

### Service & Staff Routes

#### `/api/services`
```typescript
// GET /api/services - List services
// POST /api/services - Create service
// PATCH /api/services/:id - Update service
// DELETE /api/services/:id - Delete service
```

#### `/api/staff`
```typescript
// GET /api/staff - List staff members
// POST /api/staff - Create staff member
// PATCH /api/staff/:id - Update staff member
// DELETE /api/staff/:id - Delete staff member
// GET /api/staff/:id/availability - Get staff availability
```

### Analytics Routes

#### `/api/analytics/overview`
```typescript
// GET /api/analytics/overview - Get dashboard overview metrics
interface OverviewMetricsResponse {
  calls: {
    total: number;
    change: number;
    trend: Array<{ date: string; value: number }>;
  };
  appointments: {
    total: number;
    change: number;
    trend: Array<{ date: string; value: number }>;
  };
  messages: {
    total: number;
    change: number;
    trend: Array<{ date: string; value: number }>;
  };
  revenue: {
    total: number;
    change: number;
    trend: Array<{ date: string; value: number }>;
  };
}
```

#### `/api/analytics/performance`
```typescript
// GET /api/analytics/performance - Get performance analytics
interface PerformanceQuery {
  startDate: string;
  endDate: string;
  groupBy?: 'day' | 'week' | 'month';
}
```

### Billing & Subscription Routes

#### `/api/billing/subscription`
```typescript
// GET /api/billing/subscription - Get current subscription
// POST /api/billing/subscription - Create/update subscription
// DELETE /api/billing/subscription - Cancel subscription
```

#### `/api/billing/payment-methods`
```typescript
// GET /api/billing/payment-methods - List payment methods
// POST /api/billing/payment-methods - Add payment method
// DELETE /api/billing/payment-methods/:id - Remove payment method
```

#### `/api/billing/invoices`
```typescript
// GET /api/billing/invoices - List invoices
// GET /api/billing/invoices/:id - Get invoice details
// GET /api/billing/invoices/:id/download - Download invoice PDF
```

### Webhook Routes

#### `/api/webhooks/stripe`
```typescript
// POST /api/webhooks/stripe - Stripe webhook handler
// Handles: payment_succeeded, payment_failed, subscription_updated, etc.
```

#### `/api/webhooks/ai-service`
```typescript
// POST /api/webhooks/ai-service - AI service webhook
// Handles: call_started, call_ended, message_sent, etc.
```

## Server Actions

### Form Handling Actions

```typescript
// File: src/app/actions/appointments.ts
'use server'

export async function createAppointmentAction(
  prevState: unknown,
  formData: FormData
) {
  const session = await auth();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  const validatedFields = appointmentSchema.safeParse({
    clientName: formData.get('clientName'),
    clientPhone: formData.get('clientPhone'),
    serviceType: formData.get('serviceType'),
    scheduledAt: formData.get('scheduledAt'),
  });

  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten() };
  }

  try {
    const appointment = await db.insert(appointments).values({
      ...validatedFields.data,
      organizationId: session.user.organizationId,
    }).returning();

    revalidatePath('/dashboard/appointments');
    return { success: true, data: appointment };
  } catch (error) {
    return { success: false, error: 'Failed to create appointment' };
  }
}
```

### Authentication Actions

```typescript
// File: src/app/actions/auth.ts
'use server'

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
  } catch (error) {
    throw error;
  }

  redirect('/dashboard');
}

export async function logoutAction() {
  await signOut({ redirectTo: '/login' });
}
```

## Data Flow Patterns

### 1. Server Component Data Fetching

```typescript
// File: src/app/dashboard/appointments/page.tsx
import { db } from '@/db/client';

export default async function AppointmentsPage() {
  const session = await auth();

  const appointments = await db.query.appointments.findMany({
    where: eq(appointments.organizationId, session.user.organizationId),
    orderBy: desc(appointments.scheduledAt),
    limit: 20,
  });

  return <AppointmentList appointments={appointments} />;
}
```

### 2. Client Component with API Calls

```typescript
// File: src/components/dashboard/AppointmentForm.tsx
'use client'

export function AppointmentForm() {
  const [state, formAction] = useFormState(createAppointmentAction, null);

  return (
    <form action={formAction}>
      <Input name="clientName" />
      <Input name="clientPhone" />
      <Select name="serviceType" />
      <DatePicker name="scheduledAt" />
      <Button type="submit">Create Appointment</Button>
      {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
    </form>
  );
}
```

### 3. Real-time Data with Server-Sent Events

```typescript
// File: src/app/api/conversations/stream/route.ts
export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const subscription = subscribeToConversations((event) => {
        const data = `data: ${JSON.stringify(event)}\n\n`;
        controller.enqueue(encoder.encode(data));
      });

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        subscription.unsubscribe();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

## Error Handling Strategy

### API Route Error Handler

```typescript
// File: src/lib/api/error-handler.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

export function handleAPIError(error: unknown): Response {
  if (error instanceof APIError) {
    return Response.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.statusCode }
    );
  }

  // Log unexpected errors
  console.error('Unexpected API error:', error);

  return Response.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
    },
    { status: 500 }
  );
}
```

## Rate Limiting

```typescript
// File: src/middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  return NextResponse.next();
}
```

## Caching Strategy

### Revalidation Patterns

```typescript
// Static with revalidation
export const revalidate = 3600; // 1 hour

// Dynamic with tags
export async function GET() {
  const data = await fetchData();

  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
```

---

*Document Version: 1.0*
*Last Updated: 2025-11-02*
*Author: Analyst Agent - Hive Mind Swarm*
