# Performance Optimization Strategy

## Overview

This document outlines performance optimization techniques, monitoring strategies, and best practices for the AI Sekretarka dashboard to achieve sub-3s TTI and 90+ Lighthouse scores.

## Performance Targets

| Metric | Target | Current* | Priority |
|--------|--------|----------|----------|
| First Contentful Paint (FCP) | < 1.5s | TBD | High |
| Largest Contentful Paint (LCP) | < 2.5s | TBD | High |
| Time to Interactive (TTI) | < 3s | TBD | High |
| Cumulative Layout Shift (CLS) | < 0.1 | TBD | Medium |
| First Input Delay (FID) | < 100ms | TBD | High |
| Lighthouse Performance | > 90 | TBD | High |
| Bundle Size (Initial) | < 150KB | TBD | Medium |

*To be measured after implementation

## Next.js Optimization Features

### 1. Image Optimization

```typescript
// File: src/components/OptimizedImage.tsx
import Image from 'next/image';

export function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/png;base64,..." // Generate blur placeholder
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={85} // Balance quality vs size
    />
  );
}
```

### 2. Code Splitting & Dynamic Imports

```typescript
// File: src/app/dashboard/analytics/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy chart components
const PerformanceChart = dynamic(
  () => import('@/components/dashboard/PerformanceChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false, // Client-side only if needed
  }
);

const RevenueChart = dynamic(
  () => import('@/components/dashboard/RevenueChart'),
  { loading: () => <ChartSkeleton /> }
);

export default function AnalyticsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Suspense fallback={<ChartSkeleton />}>
        <PerformanceChart />
      </Suspense>
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>
    </div>
  );
}
```

### 3. Font Optimization

```typescript
// File: src/app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'latin-ext'], // Include Polish characters
  display: 'swap', // Prevent invisible text during font load
  variable: '--font-inter',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

## React Performance Optimization

### 1. Server Components by Default

```typescript
// ✅ Server Component (default, no 'use client')
export default async function ConversationsPage() {
  const conversations = await fetchConversations();

  return <ConversationList conversations={conversations} />;
}

// Only mark as client component when needed
'use client'

export function InteractiveWidget() {
  const [state, setState] = useState();
  // Client-side interactivity
}
```

### 2. Memoization

```typescript
// File: src/components/dashboard/ConversationList.tsx
'use client'

import { useMemo, memo } from 'react';

interface ConversationListProps {
  conversations: Conversation[];
  filter: string;
}

// Memoize expensive filtering operation
export const ConversationList = memo(function ConversationList({
  conversations,
  filter,
}: ConversationListProps) {
  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) =>
      conv.callerName.toLowerCase().includes(filter.toLowerCase())
    );
  }, [conversations, filter]);

  return (
    <div>
      {filteredConversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
});

// Memoize individual card if expensive to render
const ConversationCard = memo(function ConversationCard({
  conversation,
}: {
  conversation: Conversation;
}) {
  return <Card>{/* ... */}</Card>;
});
```

### 3. Virtual Lists for Large Data Sets

```typescript
// File: src/components/dashboard/VirtualConversationList.tsx
'use client'

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualConversationList({
  conversations,
}: {
  conversations: Conversation[];
}) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: conversations.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Estimated row height
    overscan: 5, // Render extra items for smooth scrolling
  });

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <ConversationCard
              conversation={conversations[virtualRow.index]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Data Fetching Optimization

### 1. Parallel Data Fetching

```typescript
// ❌ Sequential (slow)
const user = await fetchUser();
const conversations = await fetchConversations(user.id);
const appointments = await fetchAppointments(user.id);

// ✅ Parallel (fast)
const [user, conversations, appointments] = await Promise.all([
  fetchUser(),
  fetchConversations(userId),
  fetchAppointments(userId),
]);
```

### 2. Request Deduplication

```typescript
// File: src/lib/data/cache.ts
import { cache } from 'react';

// React automatically deduplicates this during SSR
export const getUser = cache(async (userId: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
});

// Multiple calls in the same request tree will only execute once
const user1 = await getUser('123');
const user2 = await getUser('123'); // Cached, no DB query
```

### 3. Streaming with Suspense

```typescript
// File: src/app/dashboard/page.tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Immediate render */}
      <PageHeader />

      {/* Stream in when ready */}
      <Suspense fallback={<MetricsSkeleton />}>
        <PerformanceMetrics />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <PerformanceChart />
      </Suspense>
    </div>
  );
}

// This component can take time to load, but won't block page render
async function PerformanceMetrics() {
  const metrics = await fetchMetrics(); // Slow query
  return <MetricsDisplay metrics={metrics} />;
}
```

## Caching Strategy

### 1. Next.js Data Cache

```typescript
// File: src/lib/data/conversations.ts

// Cache for 5 minutes, revalidate in background
export async function getConversations() {
  const data = await fetch('/api/conversations', {
    next: { revalidate: 300 }, // 5 minutes
  });
  return data.json();
}

// Cache for 1 hour, use tags for targeted invalidation
export async function getConversationById(id: string) {
  const data = await fetch(`/api/conversations/${id}`, {
    next: {
      revalidate: 3600, // 1 hour
      tags: [`conversation:${id}`],
    },
  });
  return data.json();
}

// Invalidate specific conversation
import { revalidateTag } from 'next/cache';
revalidateTag(`conversation:${id}`);
```

### 2. Vercel KV for Session Data

```typescript
// File: src/lib/cache/session-cache.ts
import { kv } from '@vercel/kv';

export async function getCachedUserPreferences(userId: string) {
  const cacheKey = `preferences:${userId}`;

  // Try cache first
  const cached = await kv.get(cacheKey);
  if (cached) {
    return cached as UserPreferences;
  }

  // Fetch from DB
  const preferences = await db.query.userPreferences.findFirst({
    where: eq(userPreferences.userId, userId),
  });

  // Cache for 1 hour
  await kv.set(cacheKey, preferences, { ex: 3600 });

  return preferences;
}
```

### 3. Client-Side Caching with SWR

```typescript
// File: src/hooks/useConversations.ts
'use client'

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useConversations() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/conversations',
    fetcher,
    {
      refreshInterval: 30000, // Auto-refresh every 30s
      revalidateOnFocus: true, // Revalidate when tab focused
      dedupingInterval: 2000, // Dedupe requests within 2s
    }
  );

  return {
    conversations: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
```

## Bundle Size Optimization

### 1. Tree Shaking

```typescript
// ❌ Import entire library
import _ from 'lodash';

// ✅ Import specific functions
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Or use tree-shakeable alternatives
import { debounce } from 'es-toolkit';
```

### 2. Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

```typescript
// File: next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Next.js config
});

// Run: ANALYZE=true npm run build
```

### 3. Remove Unused Dependencies

```bash
# Find unused dependencies
npx depcheck

# Remove unused packages
npm uninstall <package-name>
```

## Database Query Optimization

### 1. Indexing Strategy

```sql
-- Index frequently queried columns
CREATE INDEX idx_conversations_org_started ON conversations(organization_id, started_at DESC);
CREATE INDEX idx_appointments_org_scheduled ON appointments(organization_id, scheduled_at);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);

-- Partial indexes for filtered queries
CREATE INDEX idx_active_conversations ON conversations(organization_id, started_at)
WHERE status = 'active';
```

### 2. Query Optimization

```typescript
// ❌ N+1 Query Problem
const conversations = await db.query.conversations.findMany();
for (const conv of conversations) {
  conv.agent = await db.query.agents.findFirst({
    where: eq(agents.id, conv.agentId),
  });
}

// ✅ Join Query
const conversations = await db.query.conversations.findMany({
  with: {
    agent: true, // Drizzle automatically joins
  },
});

// ✅ Or use SQL join
const result = await db.execute(
  sql`
    SELECT c.*, a.name as agent_name
    FROM conversations c
    LEFT JOIN agents a ON c.agent_id = a.id
    WHERE c.organization_id = ${organizationId}
  `
);
```

### 3. Connection Pooling

```typescript
// File: src/db/pool.ts
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Timeout connection attempts after 2s
});
```

## Monitoring & Metrics

### 1. Web Vitals Tracking

```typescript
// File: src/app/layout.tsx
'use client'

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Send to analytics
    analytics.track('web-vital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  });

  return null;
}
```

### 2. Performance API

```typescript
// File: src/lib/monitoring/performance.ts
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();

  console.log(`${name} took ${(end - start).toFixed(2)}ms`);

  // Send to monitoring service
  if (end - start > 100) {
    analytics.track('slow-operation', {
      operation: name,
      duration: end - start,
    });
  }
}
```

### 3. Real User Monitoring

```typescript
// File: src/lib/monitoring/rum.ts
export function initRUM() {
  if (typeof window === 'undefined') return;

  // Track page load time
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    const loadTime = perfData.loadEventEnd - perfData.fetchStart;

    analytics.track('page-load', {
      duration: loadTime,
      path: window.location.pathname,
    });
  });

  // Track errors
  window.addEventListener('error', (event) => {
    analytics.track('error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
    });
  });
}
```

## Performance Checklist

- [x] Server Components by default
- [x] Image optimization with next/image
- [x] Font optimization with next/font
- [x] Code splitting with dynamic imports
- [x] Bundle size analysis
- [x] Tree shaking (no default imports)
- [x] Data fetching optimization (parallel, caching)
- [x] Database query optimization (indexes, joins)
- [x] Connection pooling
- [x] Streaming with Suspense
- [x] Virtual lists for large data sets
- [x] Memoization (useMemo, memo)
- [x] Request deduplication
- [x] Web Vitals monitoring
- [x] Real User Monitoring
- [ ] CDN configuration (Vercel automatic)
- [ ] Service Worker for offline support (optional)
- [ ] Prefetching critical routes

---

*Document Version: 1.0*
*Last Updated: 2025-11-02*
*Author: Analyst Agent - Hive Mind Swarm*
