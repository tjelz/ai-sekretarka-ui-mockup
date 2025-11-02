# State Management Strategy

## Overview

This document outlines the state management approach for the AI Sekretarka dashboard, leveraging Next.js 15 App Router capabilities with React Server Components and minimal client-side state.

## Core Philosophy

### Server-First Approach
- **Default**: Use React Server Components for data fetching
- **Progressive Enhancement**: Add client interactivity only when needed
- **Performance**: Reduce JavaScript bundle size via server rendering

### State Management Layers

```
┌─────────────────────────────────────────────────────────┐
│              Application State Layers                    │
├─────────────────────────────────────────────────────────┤
│  Layer 1: Server State (Database)                       │
│  - PostgreSQL (Neon)                                    │
│  - Drizzle ORM                                          │
│  - Server Components                                     │
├─────────────────────────────────────────────────────────┤
│  Layer 2: URL State (Search Params)                     │
│  - Filters, pagination, search                          │
│  - useSearchParams hook                                 │
│  - Server-side rendering                                │
├─────────────────────────────────────────────────────────┤
│  Layer 3: Session State (Cookies)                       │
│  - Authentication (NextAuth.js)                         │
│  - User preferences                                     │
│  - JWT tokens                                           │
├─────────────────────────────────────────────────────────┤
│  Layer 4: Cache State (Vercel KV)                       │
│  - Rate limiting                                        │
│  - Temporary data                                       │
│  - Session storage                                      │
├─────────────────────────────────────────────────────────┤
│  Layer 5: Component State (React Hooks)                 │
│  - useState for local UI state                          │
│  - useOptimistic for optimistic updates                │
│  - Form state                                           │
├─────────────────────────────────────────────────────────┤
│  Layer 6: Global Client State (Context/Zustand)         │
│  - User preferences (theme, language)                   │
│  - UI state (sidebar, modals)                           │
│  - Notifications                                        │
└─────────────────────────────────────────────────────────┘
```

## 1. Server State Management

### Data Fetching in Server Components

```typescript
// File: src/app/dashboard/conversations/page.tsx
import { db } from '@/db/client';
import { auth } from '@/auth';

export default async function ConversationsPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string };
}) {
  const session = await auth();
  const page = Number(searchParams.page) || 1;
  const status = searchParams.status;

  // Fetch data directly in Server Component
  const conversations = await db.query.conversations.findMany({
    where: and(
      eq(conversations.organizationId, session.user.organizationId),
      status ? eq(conversations.status, status) : undefined
    ),
    limit: 20,
    offset: (page - 1) * 20,
    orderBy: desc(conversations.startedAt),
  });

  return <ConversationList conversations={conversations} />;
}
```

### Server Actions for Mutations

```typescript
// File: src/app/actions/conversations.ts
'use server'

import { revalidatePath } from 'next/cache';
import { db } from '@/db/client';

export async function updateConversationStatus(
  conversationId: string,
  status: 'completed' | 'missed' | 'failed'
) {
  const session = await auth();

  await db.update(conversations)
    .set({ status, updatedAt: new Date() })
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.organizationId, session.user.organizationId)
      )
    );

  revalidatePath('/dashboard/conversations');
  return { success: true };
}
```

## 2. URL State Management

### Search Params for Filters

```typescript
// File: src/components/dashboard/ConversationFilters.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation';

export function ConversationFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <Select
        value={searchParams.get('status') || 'all'}
        onValueChange={(value) => handleFilterChange('status', value)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="missed">Missed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

## 3. Session State Management

### NextAuth.js Session

```typescript
// File: src/lib/auth/session.ts
import { auth } from '@/auth';

export async function getServerSession() {
  return await auth();
}

// Client-side session access
'use client'

import { useSession } from 'next-auth/react';

export function useUserSession() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}
```

## 4. Cache State Management

### Vercel KV for Caching

```typescript
// File: src/lib/cache/kv-cache.ts
import { cache } from '@/db/client';

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const cached = await cache.get(key);
  if (cached) {
    return cached as T;
  }

  const data = await fetcher();
  await cache.set(key, data, { ex: ttl });
  return data;
}

// Usage
const metrics = await getCachedData(
  `metrics:${organizationId}:${date}`,
  () => fetchMetrics(organizationId, date),
  1800 // 30 minutes
);
```

## 5. Component State Management

### Local UI State with useState

```typescript
// File: src/components/dashboard/AppointmentForm.tsx
'use client'

export function AppointmentForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Calendar
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        <TimeSlotPicker
          date={selectedDate}
          value={selectedTime}
          onChange={setSelectedTime}
        />
      </DialogContent>
    </Dialog>
  );
}
```

### Optimistic Updates

```typescript
// File: src/components/dashboard/ConversationCard.tsx
'use client'

import { useOptimistic } from 'react';

export function ConversationCard({ conversation }: { conversation: Conversation }) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    conversation.status,
    (state, newStatus: string) => newStatus
  );

  const handleStatusChange = async (newStatus: string) => {
    setOptimisticStatus(newStatus);
    await updateConversationStatus(conversation.id, newStatus);
  };

  return (
    <Card>
      <StatusBadge status={optimisticStatus} />
      <Button onClick={() => handleStatusChange('completed')}>
        Mark as Completed
      </Button>
    </Card>
  );
}
```

## 6. Global Client State Management

### Theme Provider (Context)

```typescript
// File: src/components/providers/ThemeProvider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

// Usage in client components
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </Button>
  );
}
```

### User Preferences Store (Zustand)

```typescript
// File: src/stores/preferences-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  sidebarCollapsed: boolean;
  defaultView: 'list' | 'grid' | 'calendar';
  language: 'pl' | 'en';
  toggleSidebar: () => void;
  setDefaultView: (view: 'list' | 'grid' | 'calendar') => void;
  setLanguage: (lang: 'pl' | 'en') => void;
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      defaultView: 'list',
      language: 'pl',
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setDefaultView: (view) => set({ defaultView: view }),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'user-preferences',
    }
  )
);
```

### Notifications Store

```typescript
// File: src/stores/notifications-store.ts
import { create } from 'zustand';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

interface NotificationsState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useNotifications = create<NotificationsState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: crypto.randomUUID() },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

// Usage
import { useNotifications } from '@/stores/notifications-store';

export function SomeComponent() {
  const addNotification = useNotifications((state) => state.addNotification);

  const handleSuccess = () => {
    addNotification({
      type: 'success',
      message: 'Appointment created successfully',
      duration: 5000,
    });
  };
}
```

## Form State Management

### React Hook Form with Zod

```typescript
// File: src/components/forms/AppointmentForm.tsx
'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const appointmentSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  serviceType: z.string().min(1, 'Please select a service'),
  scheduledAt: z.date(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export function AppointmentForm() {
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      clientName: '',
      clientPhone: '',
      serviceType: '',
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    const result = await createAppointmentAction(data);
    if (result.success) {
      form.reset();
      toast.success('Appointment created');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating...' : 'Create Appointment'}
        </Button>
      </form>
    </Form>
  );
}
```

## Real-time State Management

### Server-Sent Events for Live Updates

```typescript
// File: src/hooks/useConversationUpdates.ts
'use client'

import { useEffect, useState } from 'react';

export function useConversationUpdates() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/conversations/stream');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setConversations((prev) => {
        const index = prev.findIndex((c) => c.id === data.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        }
        return [data, ...prev];
      });
    };

    return () => eventSource.close();
  }, []);

  return conversations;
}
```

## State Management Best Practices

### 1. Server vs Client Decision Tree

```
Is the state needed for SEO or initial render?
├─ Yes → Server Component (fetch in component)
└─ No → Is it derived from URL params?
    ├─ Yes → URL state (useSearchParams)
    └─ No → Is it user-specific and persisted?
        ├─ Yes → Session (cookies/NextAuth)
        └─ No → Is it shared across components?
            ├─ Yes → Global state (Context/Zustand)
            └─ No → Local state (useState)
```

### 2. Caching Strategy

```typescript
// Revalidation tags for granular cache invalidation
export const revalidate = 60; // seconds

// Or use tags
fetch('/api/data', {
  next: { tags: ['conversations'] }
});

// Invalidate specific tags
revalidateTag('conversations');
```

### 3. Error Boundaries

```typescript
// File: src/components/ErrorBoundary.tsx
'use client'

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

## Performance Optimization

### Selective Hydration

```typescript
// Only hydrate interactive parts
'use client' // This component and its children will hydrate

export function InteractiveWidget() {
  // Client-side logic here
}

// Meanwhile, parent can be Server Component
export default function Page() {
  return (
    <div>
      <ServerRenderedContent />
      <InteractiveWidget />
    </div>
  );
}
```

---

*Document Version: 1.0*
*Last Updated: 2025-11-02*
*Author: Analyst Agent - Hive Mind Swarm*
