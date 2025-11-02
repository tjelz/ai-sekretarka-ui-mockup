# Database Schema Design

## Overview

This document defines the PostgreSQL database schema for the AI Sekretarka dashboard, designed for Neon Postgres with support for Drizzle ORM migrations.

## Schema Architecture Principles

1. **Normalization**: 3NF compliance for data integrity
2. **Soft Deletes**: Use `deleted_at` timestamps instead of hard deletes
3. **Audit Trail**: `created_at` and `updated_at` on all tables
4. **UUID Primary Keys**: For security and distributed systems compatibility
5. **Foreign Key Constraints**: Enforce referential integrity
6. **Indexes**: Strategic indexing for query performance

## Core Tables

### 1. Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified TIMESTAMP,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'agent')),
    avatar_url TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    subscription_status VARCHAR(50) DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'cancelled', 'past_due')),
    subscription_tier VARCHAR(50) DEFAULT 'basic' CHECK (subscription_tier IN ('basic', 'professional', 'enterprise')),
    stripe_customer_id VARCHAR(255),
    trial_ends_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_stripe ON users(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;
CREATE INDEX idx_users_role ON users(role) WHERE deleted_at IS NULL;
```

### 2. Organizations Table

```sql
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    business_type VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(255),
    website TEXT,
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'PL',
    timezone VARCHAR(100) DEFAULT 'Europe/Warsaw',
    business_hours JSONB DEFAULT '{"monday": {"open": "09:00", "close": "17:00"}, "tuesday": {"open": "09:00", "close": "17:00"}, "wednesday": {"open": "09:00", "close": "17:00"}, "thursday": {"open": "09:00", "close": "17:00"}, "friday": {"open": "09:00", "close": "17:00"}}',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE INDEX idx_organizations_owner ON organizations(owner_id);
```

### 3. AI Agents Table

```sql
CREATE TABLE ai_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    voice_id VARCHAR(255),
    language VARCHAR(10) DEFAULT 'pl',
    personality_traits JSONB DEFAULT '{}',
    knowledge_base JSONB DEFAULT '{}',
    capabilities JSONB DEFAULT '["phone_answering", "appointment_booking", "information_providing"]',
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'training', 'error')),
    phone_number VARCHAR(50) UNIQUE,
    sms_enabled BOOLEAN DEFAULT TRUE,
    calendar_integration JSONB DEFAULT '{}',
    performance_metrics JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE INDEX idx_agents_org ON ai_agents(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_agents_status ON ai_agents(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_agents_phone ON ai_agents(phone_number) WHERE deleted_at IS NULL;
```

### 4. Conversations Table

```sql
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    caller_phone VARCHAR(50),
    caller_name VARCHAR(255),
    caller_email VARCHAR(255),
    direction VARCHAR(20) CHECK (direction IN ('inbound', 'outbound')),
    status VARCHAR(50) CHECK (status IN ('active', 'completed', 'missed', 'failed')),
    duration_seconds INTEGER DEFAULT 0,
    sentiment_score DECIMAL(3,2) CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
    topics JSONB DEFAULT '[]',
    summary TEXT,
    intent VARCHAR(100),
    outcome VARCHAR(100),
    appointment_created BOOLEAN DEFAULT FALSE,
    recording_url TEXT,
    transcript JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversations_agent ON conversations(agent_id);
CREATE INDEX idx_conversations_org ON conversations(organization_id);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_conversations_caller ON conversations(caller_phone);
CREATE INDEX idx_conversations_started ON conversations(started_at DESC);
CREATE INDEX idx_conversations_intent ON conversations(intent);
```

### 5. Appointments Table

```sql
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    client_email VARCHAR(255),
    service_type VARCHAR(255) NOT NULL,
    service_duration INTEGER, -- minutes
    service_price DECIMAL(10,2),
    scheduled_at TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
    cancellation_reason TEXT,
    confirmation_sent_at TIMESTAMP,
    reminder_sent_at TIMESTAMP,
    calendar_event_id VARCHAR(255),
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_appointments_org ON appointments(organization_id);
CREATE INDEX idx_appointments_scheduled ON appointments(scheduled_at);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_client ON appointments(client_phone);
CREATE INDEX idx_appointments_conversation ON appointments(conversation_id);
```

### 6. Services Table

```sql
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- minutes
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PLN',
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    booking_buffer INTEGER DEFAULT 0, -- minutes before/after
    max_advance_booking_days INTEGER DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE INDEX idx_services_org ON services(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_services_active ON services(is_active) WHERE deleted_at IS NULL;
```

### 7. Staff Table

```sql
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    role VARCHAR(100),
    specializations JSONB DEFAULT '[]',
    availability JSONB DEFAULT '{}',
    calendar_integration JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE INDEX idx_staff_org ON staff(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_staff_user ON staff(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_staff_active ON staff(is_active) WHERE deleted_at IS NULL;
```

### 8. Messages Table

```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    direction VARCHAR(20) CHECK (direction IN ('inbound', 'outbound')),
    channel VARCHAR(50) CHECK (channel IN ('sms', 'email', 'voice', 'chat')),
    from_number VARCHAR(50),
    to_number VARCHAR(50),
    from_email VARCHAR(255),
    to_email VARCHAR(255),
    subject VARCHAR(500),
    body TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('sent', 'delivered', 'failed', 'pending')),
    provider_message_id VARCHAR(255),
    error_message TEXT,
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_org ON messages(organization_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_appointment ON messages(appointment_id);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
```

### 9. Analytics Events Table

```sql
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    event_category VARCHAR(100),
    event_data JSONB DEFAULT '{}',
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_org ON analytics_events(organization_id);
CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_session ON analytics_events(session_id);
```

### 10. Billing & Subscriptions Table

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_customer_id VARCHAR(255),
    status VARCHAR(50) CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing', 'incomplete')),
    plan_name VARCHAR(100) NOT NULL,
    plan_price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PLN',
    billing_period VARCHAR(50) CHECK (billing_period IN ('monthly', 'yearly')),
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    cancel_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    trial_start TIMESTAMP,
    trial_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_org ON subscriptions(organization_id);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

### 11. Usage Metrics Table

```sql
CREATE TABLE usage_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    metric_type VARCHAR(100) NOT NULL,
    metric_value DECIMAL(12,2) NOT NULL,
    metric_unit VARCHAR(50),
    period_start TIMESTAMP NOT NULL,
    period_end TIMESTAMP NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_usage_org ON usage_metrics(organization_id);
CREATE INDEX idx_usage_type ON usage_metrics(metric_type);
CREATE INDEX idx_usage_period ON usage_metrics(period_start, period_end);
```

## NextAuth.js Tables

```sql
-- NextAuth.js required tables (PostgreSQL adapter)
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    token_type VARCHAR(50),
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    UNIQUE(provider, provider_account_id)
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMP NOT NULL
);

CREATE TABLE verification_tokens (
    identifier VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires TIMESTAMP NOT NULL,
    PRIMARY KEY (identifier, token)
);

CREATE INDEX idx_accounts_user ON accounts(user_id);
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(session_token);
```

## Database Functions & Triggers

### Update Timestamp Trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_agents_updated_at BEFORE UPDATE ON ai_agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Data Relationships Diagram

```
users ──┬─── organizations (owner)
        │
        ├─── subscriptions
        │
        └─── staff (user_id)

organizations ──┬─── ai_agents
                │
                ├─── conversations
                │
                ├─── appointments
                │
                ├─── services
                │
                ├─── staff
                │
                ├─── messages
                │
                ├─── analytics_events
                │
                └─── usage_metrics

ai_agents ──┬─── conversations
            │
            └─── analytics_events

conversations ──┬─── appointments
                │
                └─── messages

appointments ──── messages
```

## Migration Strategy

### Drizzle ORM Schema (TypeScript)

```typescript
// File: src/db/schema.ts
import { pgTable, uuid, varchar, timestamp, boolean, integer, decimal, text, jsonb, inet, check } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  emailVerified: timestamp('email_verified'),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  role: varchar('role', { length: 50 }).default('user'),
  avatarUrl: text('avatar_url'),
  onboardingCompleted: boolean('onboarding_completed').default(false),
  subscriptionStatus: varchar('subscription_status', { length: 50 }).default('trial'),
  subscriptionTier: varchar('subscription_tier', { length: 50 }).default('basic'),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  trialEndsAt: timestamp('trial_ends_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// ... (similar definitions for other tables)
```

## Performance Considerations

### Indexing Strategy
- **Primary Keys**: UUID with `gen_random_uuid()` for security
- **Foreign Keys**: Indexed automatically
- **Frequent Queries**: Indexed on status, dates, organization_id
- **Partial Indexes**: For soft-deleted rows (`WHERE deleted_at IS NULL`)

### Query Optimization
- **Connection Pooling**: Neon Postgres auto-scaling
- **Prepared Statements**: Prevent SQL injection, improve performance
- **JSONB Indexing**: GIN indexes for JSONB columns when needed
- **Materialized Views**: For complex analytics queries

### Scalability
- **Partitioning**: Consider partitioning `analytics_events` and `conversations` by date
- **Archival**: Move old data (>1 year) to cold storage
- **Read Replicas**: For analytics and reporting queries

---

*Document Version: 1.0*
*Last Updated: 2025-11-02*
*Author: Analyst Agent - Hive Mind Swarm*
