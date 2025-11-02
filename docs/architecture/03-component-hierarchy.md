# Component Hierarchy & Design System

## Overview

This document defines the component architecture for the AI Sekretarka dashboard, based on the reference design and shadcn/ui component library.

## Design System Foundation

### Color Palette
```typescript
// Based on reference design analysis
const colors = {
  primary: {
    DEFAULT: '#007BFF',  // Blue primary
    hover: '#0056b3',    // Darker blue
    light: 'rgb(59, 130, 246)', // Light blue
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    600: '#4b5563',
    900: '#111827',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
}
```

### Typography Scale
```typescript
const typography = {
  h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold',
  h2: 'text-3xl sm:text-4xl font-bold',
  h3: 'text-2xl font-bold',
  body: 'text-base',
  small: 'text-sm',
  tiny: 'text-xs',
}
```

### Spacing System
- Base unit: 4px (Tailwind's default)
- Gaps: 4px, 8px, 12px, 16px, 24px, 32px, 48px
- Padding: 8px, 16px, 24px, 32px

## Component Hierarchy

### Page Layout Structure

```
AppLayout
├── Navigation
│   ├── Sidebar (Desktop)
│   │   ├── Logo
│   │   ├── NavigationMenu
│   │   │   ├── MenuItem (Overview)
│   │   │   ├── MenuItem (Conversations)
│   │   │   ├── MenuItem (Appointments)
│   │   │   ├── MenuItem (Messages)
│   │   │   ├── MenuItem (Settings)
│   │   │   └── MenuItem (Billing)
│   │   └── UserMenu
│   └── MobileNav (Mobile)
│       └── Sheet
│           └── NavigationMenu
├── Header
│   ├── Breadcrumbs
│   ├── SearchBar
│   └── UserAvatar
└── MainContent
    ├── PageHeader
    │   ├── Title
    │   ├── Description
    │   └── Actions
    └── PageContent
        └── [Page-specific components]
```

## Core Components

### 1. Navigation Components

#### Sidebar Component
```typescript
// File: src/components/dashboard/Sidebar.tsx
interface SidebarProps {
  currentPath: string;
  user: User;
}

const Sidebar = ({ currentPath, user }: SidebarProps) => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <SidebarHeader />
      <SidebarNav currentPath={currentPath} />
      <SidebarFooter user={user} />
    </aside>
  );
};
```

#### Navigation Menu Items
```typescript
const menuItems = [
  {
    id: 'overview',
    label: 'Przegląd',
    icon: LayoutDashboard,
    href: '/dashboard',
    badge?: number,
  },
  {
    id: 'conversations',
    label: 'Rozmowy',
    icon: MessageSquare,
    href: '/dashboard/conversations',
    badge?: number,
  },
  {
    id: 'appointments',
    label: 'Wizyty',
    icon: Calendar,
    href: '/dashboard/appointments',
  },
  {
    id: 'messages',
    label: 'Wiadomości',
    icon: Mail,
    href: '/dashboard/messages',
  },
  {
    id: 'settings',
    label: 'Ustawienia',
    icon: Settings,
    href: '/dashboard/settings',
  },
  {
    id: 'billing',
    label: 'Płatności',
    icon: CreditCard,
    href: '/dashboard/billing',
  },
];
```

### 2. Dashboard Overview Components

#### Stats Card Component
```typescript
// File: src/components/dashboard/StatsCard.tsx
interface StatsCardProps {
  title: string;
  value: number | string;
  change?: number; // Percentage change
  period?: string; // e.g., "vs last 7 days"
  icon?: React.ComponentType;
  trend?: 'up' | 'down' | 'neutral';
}

const StatsCard = ({ title, value, change, period, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            <span className={cn(
              trend === 'up' && 'text-green-600',
              trend === 'down' && 'text-red-600'
            )}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            {' '}{period}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
```

#### Performance Metrics Grid
```typescript
// File: src/components/dashboard/PerformanceMetrics.tsx
const metrics = [
  {
    title: 'Odbierane połączenia',
    value: 247,
    change: 12,
    period: 'ostatnie 7 dni',
    icon: Phone,
    trend: 'up',
  },
  {
    title: 'Umówione wizyty',
    value: 89,
    change: 8,
    period: 'ostatnie 7 dni',
    icon: Calendar,
    trend: 'up',
  },
  {
    title: 'Wysłane SMS-y',
    value: 156,
    change: -3,
    period: 'ostatnie 7 dni',
    icon: MessageSquare,
    trend: 'down',
  },
  {
    title: 'Średni czas rozmowy',
    value: '2:45',
    change: 5,
    period: 'ostatnie 7 dni',
    icon: Clock,
    trend: 'up',
  },
];

const PerformanceMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <StatsCard key={metric.title} {...metric} />
      ))}
    </div>
  );
};
```

### 3. Conversations Components

#### Conversation List
```typescript
// File: src/components/dashboard/ConversationList.tsx
interface Conversation {
  id: string;
  callerName: string;
  callerPhone: string;
  timestamp: Date;
  duration: number;
  status: 'completed' | 'missed' | 'active';
  sentiment: 'positive' | 'neutral' | 'negative';
  summary: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  onSelect: (id: string) => void;
}

const ConversationList = ({ conversations, onSelect }: ConversationListProps) => {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <ConversationCard
          key={conversation.id}
          conversation={conversation}
          onClick={() => onSelect(conversation.id)}
        />
      ))}
    </div>
  );
};
```

#### Conversation Detail
```typescript
// File: src/components/dashboard/ConversationDetail.tsx
interface ConversationDetailProps {
  conversation: Conversation;
  transcript: TranscriptMessage[];
}

const ConversationDetail = ({ conversation, transcript }: ConversationDetailProps) => {
  return (
    <Card>
      <CardHeader>
        <ConversationHeader conversation={conversation} />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transcript">
          <TabsList>
            <TabsTrigger value="transcript">Transkrypcja</TabsTrigger>
            <TabsTrigger value="summary">Podsumowanie</TabsTrigger>
            <TabsTrigger value="analysis">Analiza</TabsTrigger>
          </TabsList>
          <TabsContent value="transcript">
            <TranscriptView messages={transcript} />
          </TabsContent>
          <TabsContent value="summary">
            <SummaryView conversation={conversation} />
          </TabsContent>
          <TabsContent value="analysis">
            <AnalysisView conversation={conversation} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
```

### 4. Appointments Components

#### Calendar View
```typescript
// File: src/components/dashboard/AppointmentCalendar.tsx
import { Calendar } from '@/components/ui/calendar';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onDateSelect: (date: Date) => void;
  onAppointmentClick: (id: string) => void;
}

const AppointmentCalendar = ({
  appointments,
  onDateSelect,
  onAppointmentClick
}: AppointmentCalendarProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          modifiers={{ hasAppointments: appointmentDates }}
        />
      </div>
      <div className="lg:col-span-2">
        <AppointmentList
          appointments={filteredAppointments}
          onAppointmentClick={onAppointmentClick}
        />
      </div>
    </div>
  );
};
```

#### Appointment Card
```typescript
// File: src/components/dashboard/AppointmentCard.tsx
interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
  onEdit: (id: string) => void;
  onCancel: (id: string) => void;
}

const AppointmentCard = ({
  appointment,
  onStatusChange,
  onEdit,
  onCancel
}: AppointmentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{appointment.clientName}</CardTitle>
          <Badge variant={getStatusVariant(appointment.status)}>
            {appointment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{formatDateTime(appointment.scheduledAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{appointment.clientPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Scissors className="h-4 w-4 text-gray-500" />
            <span>{appointment.serviceType}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <AppointmentActions
          appointment={appointment}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onCancel={onCancel}
        />
      </CardFooter>
    </Card>
  );
};
```

### 5. Data Visualization Components

#### Performance Chart
```typescript
// File: src/components/dashboard/PerformanceChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  data: Array<{
    date: string;
    calls: number;
    appointments: number;
    messages: number;
  }>;
  metric: 'calls' | 'appointments' | 'messages';
}

const PerformanceChart = ({ data, metric }: PerformanceChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wydajność w czasie</CardTitle>
        <CardDescription>Ostatnie 30 dni</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={metric}
              stroke="#007BFF"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
```

### 6. Settings Components

#### Settings Layout
```typescript
// File: src/components/dashboard/settings/SettingsLayout.tsx
const settingsSections = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'organization', label: 'Organizacja', icon: Building },
  { id: 'ai-agent', label: 'AI Asystent', icon: Bot },
  { id: 'integrations', label: 'Integracje', icon: Plug },
  { id: 'notifications', label: 'Powiadomienia', icon: Bell },
  { id: 'security', label: 'Bezpieczeństwo', icon: Shield },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="lg:w-64">
        <SettingsNav sections={settingsSections} />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};
```

## Reusable Component Patterns

### 1. Empty States
```typescript
// File: src/components/ui/empty-state.tsx
interface EmptyStateProps {
  icon?: React.ComponentType;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {Icon && <Icon className="h-12 w-12 text-gray-400 mb-4" />}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
};
```

### 2. Loading States
```typescript
// File: src/components/ui/loading-state.tsx
const LoadingState = ({ type = 'spinner' }: { type?: 'spinner' | 'skeleton' }) => {
  if (type === 'skeleton') {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Spinner className="h-8 w-8" />
    </div>
  );
};
```

### 3. Error States
```typescript
// File: src/components/ui/error-state.tsx
interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = 'Wystąpił błąd',
  message,
  onRetry
}: ErrorStateProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Spróbuj ponownie
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};
```

## Component File Organization

```
src/
├── components/
│   ├── ui/                      # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   └── ...
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── overview/
│   │   │   ├── StatsCard.tsx
│   │   │   ├── PerformanceMetrics.tsx
│   │   │   └── PerformanceChart.tsx
│   │   ├── conversations/
│   │   │   ├── ConversationList.tsx
│   │   │   ├── ConversationCard.tsx
│   │   │   ├── ConversationDetail.tsx
│   │   │   └── TranscriptView.tsx
│   │   ├── appointments/
│   │   │   ├── AppointmentCalendar.tsx
│   │   │   ├── AppointmentList.tsx
│   │   │   ├── AppointmentCard.tsx
│   │   │   └── AppointmentForm.tsx
│   │   ├── messages/
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageThread.tsx
│   │   │   └── ComposeMessage.tsx
│   │   └── settings/
│   │       ├── SettingsLayout.tsx
│   │       ├── ProfileSettings.tsx
│   │       ├── OrganizationSettings.tsx
│   │       └── AIAgentSettings.tsx
│   └── shared/                  # Shared components
│       ├── EmptyState.tsx
│       ├── LoadingState.tsx
│       ├── ErrorState.tsx
│       └── PageHeader.tsx
```

## Responsive Design Strategy

### Breakpoints (Tailwind)
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
};
```

### Mobile-First Patterns
- Stack layout on mobile (single column)
- Side-by-side on tablet (2 columns)
- Grid layout on desktop (3-4 columns)
- Collapsible sidebar on mobile (Sheet component)
- Sticky header on mobile
- Bottom navigation on small screens (optional)

---

*Document Version: 1.0*
*Last Updated: 2025-11-02*
*Author: Analyst Agent - Hive Mind Swarm*
