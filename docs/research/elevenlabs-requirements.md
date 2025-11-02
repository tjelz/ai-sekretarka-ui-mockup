# ElevenLabs Agents Platform - Comprehensive Research Findings

**Research Date:** November 2, 2025
**Researcher:** Hive Mind Research Agent
**Session ID:** swarm-1762046628873-cvvw12em1
**Task ID:** task-1762046712939-b6eqxpnck

---

## Executive Summary

This research document provides comprehensive analysis of the ElevenLabs Agents Platform API and requirements for building a conversational AI agent dashboard. The platform enables real-time voice and chat interactions powered by advanced AI models, with extensive customization capabilities for building production-ready conversational AI agents.

### Key Platform Capabilities
- **Multi-modal conversational AI** with voice and text support
- **Real-time WebSocket API** for low-latency interactions
- **Flexible agent configuration** including LLM selection, voice customization, knowledge bases
- **Production-ready features** including authentication, analytics, and webhooks
- **Payment integration** support via Stripe and other services
- **Comprehensive API** for agent lifecycle management

---

## 1. API Architecture Overview

### 1.1 Base Configuration
- **Base URL:** `https://api.elevenlabs.io`
- **API Version:** v1
- **Authentication Method:** API Key via `xi-api-key` header
- **Protocol Support:** REST API + WebSocket API

### 1.2 Core Platform Components
1. **Speech-to-Text (ASR)** - Automatic Speech Recognition model
2. **Language Model** - Customizable (GPT-4, Claude, Gemini, or custom models)
3. **Text-to-Speech (TTS)** - High-quality voice synthesis
4. **Turn-taking Model** - Proprietary conversation flow management
5. **Knowledge Base** - RAG (Retrieval-Augmented Generation) support
6. **Tool Integration** - External API and service connections

---

## 2. Authentication & Security

### 2.1 API Key Authentication
- **Location:** Profile settings in ElevenLabs dashboard
- **Header:** `xi-api-key: YOUR_API_KEY`
- **Scope Control:** Limit endpoint access per key
- **Credit Limits:** Custom usage controls per API key

### 2.2 Agent-Specific Authentication

#### A. Signed URLs (Recommended for Client-Side)
- **Purpose:** Secure client-side access without exposing API keys
- **Endpoint:** `POST /v1/convai/agents/{agent_id}/get_signed_url`
- **Expiration:** 15 minutes
- **Use Case:** Web applications, mobile apps
- **Process:**
  1. Server requests signed URL with API key
  2. ElevenLabs returns temporary token + signed WebSocket URL
  3. Client connects using signed URL

#### B. Domain Allowlists
- **Configuration:** Agent authentication settings
- **Limit:** Up to 10 unique hostnames per agent
- **Use Case:** Restrict agent access to specific domains

#### C. Server Tools Authentication
- **Methods:** Multiple authentication schemes for external API connections
- **Configuration:** Per-tool authentication in agent settings
- **Security:** API keys, OAuth, custom headers supported

---

## 3. Core API Endpoints

### 3.1 Agent Management

#### Create Agent
```http
POST /v1/convai/agents/create
Headers:
  xi-api-key: YOUR_API_KEY
Content-Type: application/json

Request Body:
{
  "name": "string (optional)",
  "conversation_config": {
    "asr": { /* ASR settings */ },
    "turn": { /* Turn-taking configuration */ },
    "tts": { /* Text-to-speech settings */ },
    "conversation": { /* Conversation parameters */ },
    "language_presets": { /* Language configurations */ },
    "vad": { /* Voice activity detection */ },
    "agent": { /* Agent-specific settings */ }
  },
  "platform_settings": {
    "widget": { /* Widget configuration */ },
    "evaluation": { /* Evaluation settings */ },
    "data_collection": { /* Data collection preferences */ },
    "authentication": { /* Auth configuration */ },
    "call_limits": { /* Usage limits */ },
    "privacy_settings": { /* Privacy controls */ }
  },
  "workflow": {
    "nodes": [ /* Conversation flow nodes */ ],
    "edges": [ /* Node connections */ ]
  },
  "tags": ["string"]
}

Response (200 OK):
{
  "agent_id": "string"
}
```

#### Get Agent
```http
GET /v1/convai/agents/{agent_id}
Headers:
  xi-api-key: YOUR_API_KEY

Response (200 OK):
{
  "agent_id": "string",
  "name": "string",
  "conversation_config": { /* Full configuration */ },
  "metadata": {
    "created_at": "timestamp",
    "updated_at": "timestamp"
  },
  "platform_settings": { /* Platform configuration */ },
  "phone_numbers": [ /* Associated phone numbers */ ],
  "workflow": { /* Conversation workflow */ },
  "access_info": { /* Access details */ },
  "tags": ["string"]
}

Errors:
  422 - Validation Error
```

#### List Agents
```http
GET /v1/convai/agents
Headers:
  xi-api-key: YOUR_API_KEY

Query Parameters:
  page_size: integer (max 100, default 30)
  search: string (filter by agent name)
  archived: boolean (filter by archive status)
  sort_direction: "asc" | "desc"
  sort_by: "name" | "created_at"
  cursor: string (pagination token)

Response (200 OK):
{
  "agents": [
    {
      "agent_id": "string",
      "name": "string",
      "tags": ["string"],
      "created_at": "timestamp",
      "access_info": {},
      "last_call_time": "timestamp",
      "archived": boolean
    }
  ],
  "next_cursor": "string",
  "has_more": boolean
}
```

#### Update Agent
```http
PATCH /v1/convai/agents/{agent_id}
Headers:
  xi-api-key: YOUR_API_KEY
Content-Type: application/json

Request Body:
{
  "name": "string (optional)",
  "conversation_config": { /* Updated configuration */ },
  "platform_settings": { /* Updated settings */ },
  "workflow": { /* Updated workflow */ },
  "tags": ["string"]
}

Response (200 OK):
{
  /* Updated agent configuration */
}

Errors:
  422 - Validation Error
```

#### Delete Agent
```http
DELETE /v1/convai/agents/{agent_id}
Headers:
  xi-api-key: YOUR_API_KEY

Response (200 OK):
{
  "message": "Agent deleted successfully"
}
```

### 3.2 Conversation Management

#### Get Conversation Details
```http
GET /v1/convai/conversations/{conversation_id}
Headers:
  xi-api-key: YOUR_API_KEY

Response (200 OK):
{
  "conversation_id": "string",
  "agent_id": "string",
  "transcript": [
    {
      "role": "user" | "agent",
      "message": "string",
      "timestamp": "timestamp"
    }
  ],
  "analysis": {
    "sentiment": "string",
    "key_topics": ["string"],
    "evaluation_scores": {}
  },
  "metadata": {
    "started_at": "timestamp",
    "ended_at": "timestamp",
    "duration": "number (seconds)"
  },
  "metrics": {
    "user_satisfaction": "number",
    "goal_completion": boolean
  }
}
```

#### List Conversations (Inferred)
```http
GET /v1/convai/conversations
Headers:
  xi-api-key: YOUR_API_KEY

Query Parameters:
  agent_id: string (filter by agent)
  page_size: integer
  cursor: string (pagination)
  start_date: timestamp
  end_date: timestamp
```

---

## 4. WebSocket API Specification

### 4.1 Connection Details

#### Endpoint
```
wss://api.elevenlabs.io/v1/convai/conversation?agent_id={agent_id}
```

#### Authentication Methods
1. **Public Agents:** Direct connection with `agent_id` in URL
2. **Private Agents:** Use signed URL from server

### 4.2 Message Types

#### Client → Server Messages

**A. Audio Data**
```json
{
  "type": "audio",
  "data": "base64_encoded_audio",
  "format": "pcm16",
  "sample_rate": 16000
}
```

**B. Contextual Information (Non-interrupting)**
```json
{
  "type": "context",
  "data": {
    "user_info": {},
    "session_data": {},
    "custom_variables": {}
  }
}
```

**C. Ping/Pong**
```json
{
  "type": "ping"
}
```

#### Server → Client Messages

**A. Conversation Metadata (Initial)**
```json
{
  "type": "metadata",
  "conversation_id": "string",
  "agent_id": "string",
  "config": {}
}
```

**B. Audio Response Chunks**
```json
{
  "type": "audio",
  "data": "base64_encoded_audio",
  "format": "pcm16",
  "sample_rate": 16000
}
```

**C. Interruption Signal**
```json
{
  "type": "interruption",
  "reason": "user_speech_detected"
}
```

**D. Pong Response**
```json
{
  "type": "pong"
}
```

**E. Transcript Updates**
```json
{
  "type": "transcript",
  "role": "agent" | "user",
  "message": "string",
  "timestamp": "timestamp"
}
```

### 4.3 Best Practices
- **Audio Chunk Size:** Send audio every 250ms for optimal balance
- **Format:** PCM16, 16kHz sample rate
- **Connection Lifecycle:** Implement reconnection logic
- **Error Handling:** Listen for error messages and connection drops

---

## 5. Knowledge Base & Customization

### 5.1 Knowledge Base Features

#### Supported Formats
- **File Types:** PDF, TXT, DOCX, HTML, EPUB
- **URL Import:** Documentation pages, product pages
- **Direct Text:** Custom text content

#### Size Limits
- **Non-Enterprise:**
  - Maximum: 20MB or 300k characters
  - Limit: 5 files or links
- **With RAG Enabled:**
  - Maximum: 10MB per item (increased from 300KB)

#### RAG (Retrieval-Augmented Generation)
- Enables semantic search over knowledge base
- Improves context-aware responses
- Configurable in agent settings

### 5.2 System Prompts (Custom Prompts)

#### Six Key Elements

**1. Personality**
- Name, traits, role
- Background and context
- Character definition

**2. Environment**
- Communication channel (phone, web, chat)
- Situational context
- User expectations

**3. Tone**
- Linguistic style
- Speech patterns
- Formality level
- Conversational elements

**4. Goal**
- Primary objectives
- Success criteria
- Conversation outcomes

**5. Guardrails**
- Ethical boundaries
- Prohibited topics
- Safety constraints
- Compliance requirements

**6. Tools**
- Available external capabilities
- API integrations
- Function calling

#### Prompt Management
- **Modification:** Can be updated anytime
- **Versioning:** Track prompt changes over time
- **Testing:** Use simulation API to test prompts
- **Flexibility:** Adjust based on user feedback

---

## 6. Payment Integration (Stripe)

### 6.1 Stripe Integration Overview
- **Purpose:** Process transactions, manage subscriptions, handle billing via AI conversation
- **Setup:** Minimal configuration required
- **Integration Type:** Out-of-the-box with ElevenLabs agents

### 6.2 Use Cases
- **Transaction Processing:** Secure payment handling during conversations
- **Subscription Management:** Recurring billing automation
- **Billing Operations:** Invoice generation, payment tracking
- **Natural Conversation:** Payment flows integrated into dialogue

### 6.3 Technical Requirements
- **Stripe Account:** Required with API keys
- **Webhook Configuration:** Handle payment events
- **Tool Configuration:** Connect Stripe as agent tool
- **Security:** PCI compliance, secure token handling

### 6.4 Integration Reference
- **Documentation:** `https://elevenlabs.io/agents/integrations/stripe`
- **ElevenLabs + Stripe:** ElevenLabs uses Stripe Billing internally

### 6.5 Implementation Considerations
- **Backend Required:** Server-side Stripe API calls
- **Agent Tool:** Configure Stripe as callable function
- **Event Handling:** Webhook listeners for payment confirmation
- **Error Handling:** Payment failure scenarios in conversation flow

---

## 7. Pricing & Usage

### 7.1 Pricing Structure
- **Model:** Usage-based billing
- **API Access:** Included in all plans (even free)
- **Cost Basis:**
  - Text-to-Speech: Per 1,000 characters
  - Speech-to-Speech: Per minute
  - API calls: Per request

### 7.2 Pricing Tiers
1. **Free Tier:** Limited credits, API access included
2. **Starter:** Additional credits with lower per-unit cost
3. **Creator:** Enhanced limits and features
4. **Pro:** Professional tier with higher limits
5. **Scale:** Business tier
6. **Enterprise:** Custom pricing and features

### 7.3 Credit System
- **Overage Pricing:** Fixed price per 1,000 additional credits
- **Monitoring:** Track usage via API or dashboard
- **Alerts:** Configure credit limit notifications

### 7.4 Concurrent Calls
- **Limitation:** Based on plan tier
- **Agents:** Unlimited agent creation on all plans
- **Restriction:** Monthly credit limits apply

---

## 8. Dashboard Requirements Analysis

### 8.1 Reference Dashboard Features
Based on analysis of `https://3000-97e53d38-f78e-45fa-8902-a6c29357c94a.orchids.page/`

#### Navigation Structure
- **Overview** - Main dashboard with KPIs
- **Conversations** - Conversation history and analytics
- **Appointments** - Booking management
- **Messages** - Message inbox
- **Settings** - Agent configuration
- **Billing** - Payment and subscription management

#### Key Performance Indicators (KPIs)
1. **Calls** - Total count with trend percentage
   - Display: 119 calls (+12%)
2. **Booked Visits** - Appointments scheduled
   - Display: 47 visits (+8%)
3. **Sent Reminders** - Automated notifications
   - Display: 73 reminders (+15%)
4. **Average Call Duration** - Conversation length
   - Display: 2:45 minutes (-5%)
5. **Generated Revenue** - Financial performance
   - Display: 14,200 PLN (+18%)

#### Visualization Components
- **Trend Indicators:** Percentage change with color coding
- **Real-time Section:** Live status monitoring ("Na żywo")
- **Conversion Rate:** 39.5% displayed
- **Time-based Metrics:** Duration tracking

#### UI/UX Patterns
- **Clean Interface:** Minimalist, data-focused design
- **Color Coding:** Green for positive trends, red for negative
- **Compact Layout:** High information density
- **Multilingual:** Polish language support
- **Responsive:** Sidebar navigation with main content area

### 8.2 Required Dashboard Components

#### 1. Agent Configuration Panel
**Features:**
- Agent name and description
- Voice selection (from ElevenLabs voice library)
- Language configuration
- LLM model selection (GPT-4, Claude, Gemini)
- System prompt editor
- Knowledge base upload/management
- Tool and integration setup
- Workflow designer

**API Endpoints:**
- `POST /v1/convai/agents/create`
- `PATCH /v1/convai/agents/{agent_id}`
- `GET /v1/convai/agents/{agent_id}`

#### 2. Analytics Dashboard
**Metrics to Display:**
- Total conversations
- Average conversation duration
- Conversion rates
- Goal completion rates
- User satisfaction scores
- Call volume trends
- Peak usage times
- Error rates

**Data Sources:**
- `GET /v1/convai/conversations`
- `GET /v1/convai/conversations/{conversation_id}`
- Custom analytics aggregation

#### 3. Conversation History
**Features:**
- Searchable conversation list
- Transcript viewer
- Audio playback
- Sentiment analysis display
- Key topics extraction
- Evaluation scores
- Filter by date, agent, outcome

**API Endpoints:**
- `GET /v1/convai/conversations`
- `GET /v1/convai/conversations/{conversation_id}`

#### 4. Billing Integration
**Features:**
- Stripe payment setup
- Subscription management
- Usage tracking
- Invoice generation
- Payment history
- Auto-refill configuration

**Integration:**
- Stripe API for payment processing
- ElevenLabs credit tracking API
- Webhook handling for payment events

#### 5. Settings & Account Management
**Features:**
- User profile management
- Team member access control
- API key management
- Notification preferences
- Integration configuration
- Data export capabilities

#### 6. Real-time Monitoring
**Features:**
- Live conversation status
- Active agent count
- Current call volume
- System health indicators
- WebSocket connection status

---

## 9. Data Models & Schemas

### 9.1 Agent Schema
```typescript
interface Agent {
  agent_id: string;
  name: string;
  conversation_config: ConversationConfig;
  platform_settings: PlatformSettings;
  workflow: Workflow;
  metadata: {
    created_at: string;
    updated_at: string;
  };
  access_info: AccessInfo;
  tags: string[];
  archived: boolean;
  last_call_time?: string;
}

interface ConversationConfig {
  asr: ASRConfig;
  turn: TurnConfig;
  tts: TTSConfig;
  conversation: ConversationParameters;
  language_presets: LanguagePresets;
  vad: VADConfig;
  agent: AgentConfig;
}

interface PlatformSettings {
  widget: WidgetConfig;
  evaluation: EvaluationConfig;
  data_collection: DataCollectionConfig;
  authentication: AuthenticationConfig;
  call_limits: CallLimitsConfig;
  privacy_settings: PrivacyConfig;
}

interface Workflow {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

interface WorkflowNode {
  id: string;
  type: 'start' | 'end' | 'agent' | 'phone_number' | 'agent_override';
  config: Record<string, any>;
}

interface WorkflowEdge {
  from: string;
  to: string;
  condition?: string;
}
```

### 9.2 Conversation Schema
```typescript
interface Conversation {
  conversation_id: string;
  agent_id: string;
  transcript: TranscriptEntry[];
  analysis: ConversationAnalysis;
  metadata: ConversationMetadata;
  metrics: ConversationMetrics;
}

interface TranscriptEntry {
  role: 'user' | 'agent';
  message: string;
  timestamp: string;
  audio_url?: string;
}

interface ConversationAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  key_topics: string[];
  evaluation_scores: Record<string, number>;
  summary?: string;
}

interface ConversationMetadata {
  started_at: string;
  ended_at?: string;
  duration: number; // seconds
  platform: 'web' | 'mobile' | 'phone';
  user_id?: string;
}

interface ConversationMetrics {
  user_satisfaction?: number;
  goal_completion: boolean;
  interruptions: number;
  response_time_avg: number; // milliseconds
}
```

### 9.3 Knowledge Base Schema
```typescript
interface KnowledgeBase {
  id: string;
  name: string;
  items: KnowledgeBaseItem[];
  created_at: string;
  updated_at: string;
}

interface KnowledgeBaseItem {
  id: string;
  type: 'file' | 'url' | 'text';
  content: string;
  metadata: {
    filename?: string;
    url?: string;
    size: number;
    format: string;
  };
  indexed: boolean;
}
```

### 9.4 Dashboard Analytics Schema
```typescript
interface DashboardAnalytics {
  agent_id: string;
  period: {
    start_date: string;
    end_date: string;
  };
  metrics: {
    total_calls: number;
    total_duration: number; // seconds
    average_duration: number;
    booked_appointments: number;
    sent_reminders: number;
    revenue: {
      amount: number;
      currency: string;
      change_percentage: number;
    };
    conversion_rate: number;
    satisfaction_score: number;
  };
  trends: {
    calls_trend: number; // percentage
    duration_trend: number;
    appointments_trend: number;
    revenue_trend: number;
  };
  hourly_distribution: HourlyMetric[];
  daily_distribution: DailyMetric[];
}

interface HourlyMetric {
  hour: number; // 0-23
  call_count: number;
  average_duration: number;
}

interface DailyMetric {
  date: string;
  call_count: number;
  appointments: number;
  revenue: number;
}
```

---

## 10. Technical Architecture Recommendations

### 10.1 Frontend Architecture

#### Technology Stack Recommendation
- **Framework:** Next.js 14+ (App Router)
- **UI Library:** React 18+
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React Query + Zustand
- **Charts:** Recharts or Chart.js
- **WebSocket:** Native WebSocket API or Socket.io client

#### Component Architecture
```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── overview/
│   │   ├── conversations/
│   │   ├── agents/
│   │   ├── settings/
│   │   └── billing/
│   └── api/
│       ├── elevenlabs/
│       └── stripe/
├── components/
│   ├── ui/ (shadcn components)
│   ├── charts/
│   ├── agents/
│   └── conversations/
├── lib/
│   ├── elevenlabs-client.ts
│   ├── stripe-client.ts
│   └── websocket-manager.ts
└── types/
    ├── agent.ts
    ├── conversation.ts
    └── analytics.ts
```

### 10.2 Backend Architecture

#### API Layer
- **Framework:** Next.js API Routes or separate Express.js backend
- **Authentication:** NextAuth.js or custom JWT
- **Database:** PostgreSQL (for user data, analytics)
- **Caching:** Redis (for real-time metrics)
- **Queue:** Bull or similar (for async processing)

#### Services Architecture
```typescript
// services/elevenlabs.service.ts
class ElevenLabsService {
  async createAgent(config: AgentConfig): Promise<Agent>
  async getAgent(agentId: string): Promise<Agent>
  async listAgents(filters: AgentFilters): Promise<Agent[]>
  async updateAgent(agentId: string, updates: Partial<AgentConfig>): Promise<Agent>
  async deleteAgent(agentId: string): Promise<void>
  async getConversations(agentId: string): Promise<Conversation[]>
  async getConversation(conversationId: string): Promise<Conversation>
}

// services/stripe.service.ts
class StripeService {
  async createCheckoutSession(userId: string, plan: string): Promise<string>
  async createSubscription(customerId: string, priceId: string): Promise<Subscription>
  async handleWebhook(event: StripeEvent): Promise<void>
  async getUsage(customerId: string): Promise<UsageRecord>
}

// services/analytics.service.ts
class AnalyticsService {
  async getAgentMetrics(agentId: string, period: DateRange): Promise<DashboardAnalytics>
  async trackConversation(conversation: Conversation): Promise<void>
  async calculateTrends(agentId: string): Promise<TrendData>
}
```

### 10.3 Real-time Features

#### WebSocket Manager
```typescript
class ConversationWebSocket {
  private ws: WebSocket;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  connect(agentId: string, signedUrl?: string): void;
  sendAudio(audioData: ArrayBuffer): void;
  sendContext(context: ContextData): void;
  onAudioReceived(callback: (audio: ArrayBuffer) => void): void;
  onTranscriptUpdate(callback: (transcript: TranscriptEntry) => void): void;
  onInterruption(callback: () => void): void;
  disconnect(): void;
  private reconnect(): void;
}
```

### 10.4 Database Schema

#### Users & Authentication
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  elevenlabs_api_key TEXT ENCRYPTED,
  stripe_api_key TEXT ENCRYPTED,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Agent Tracking
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  elevenlabs_agent_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Analytics & Metrics
```sql
CREATE TABLE conversation_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  conversation_id VARCHAR(255) NOT NULL,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  duration INTEGER, -- seconds
  user_satisfaction DECIMAL(3,2),
  goal_completed BOOLEAN,
  revenue DECIMAL(10,2),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversation_metrics_agent ON conversation_metrics(agent_id);
CREATE INDEX idx_conversation_metrics_date ON conversation_metrics(started_at);
```

### 10.5 Security Considerations

#### API Key Protection
- **Storage:** Encrypt API keys in database
- **Server-side Only:** Never expose ElevenLabs API keys to client
- **Environment Variables:** Use `.env` files for sensitive data
- **Rotation:** Support API key rotation

#### Authentication
- **User Auth:** JWT or session-based authentication
- **Agent Access:** Signed URLs for client-side WebSocket connections
- **RBAC:** Role-based access control for multi-user dashboards

#### Data Privacy
- **Conversation Data:** Implement data retention policies
- **PII Protection:** Anonymize or encrypt sensitive user data
- **GDPR Compliance:** Support data export and deletion
- **Audit Logs:** Track all API operations

---

## 11. Integration Points Summary

### 11.1 ElevenLabs API Integration
**Required Endpoints:**
- `POST /v1/convai/agents/create` - Create agents
- `GET /v1/convai/agents` - List agents
- `GET /v1/convai/agents/{agent_id}` - Get agent details
- `PATCH /v1/convai/agents/{agent_id}` - Update agent
- `DELETE /v1/convai/agents/{agent_id}` - Delete agent
- `GET /v1/convai/conversations` - List conversations
- `GET /v1/convai/conversations/{conversation_id}` - Get conversation details
- `WebSocket: wss://api.elevenlabs.io/v1/convai/conversation` - Real-time conversations

### 11.2 Stripe Payment Integration
**Required Features:**
- Payment checkout sessions
- Subscription management
- Webhook event handling
- Usage tracking
- Invoice generation

**Webhook Events:**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### 11.3 Dashboard UI Components
**Core Components:**
1. Agent configuration form
2. Conversation list with search/filter
3. Analytics charts (line, bar, pie)
4. Real-time status indicators
5. Transcript viewer with audio playback
6. Knowledge base file uploader
7. System prompt editor
8. Billing/payment forms

---

## 12. Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up Next.js project with TypeScript
- [ ] Implement authentication system
- [ ] Create ElevenLabs API client wrapper
- [ ] Set up PostgreSQL database
- [ ] Implement basic agent CRUD operations

### Phase 2: Core Features (Weeks 3-4)
- [ ] Build agent configuration interface
- [ ] Implement conversation history viewer
- [ ] Create analytics dashboard
- [ ] Set up WebSocket integration
- [ ] Implement real-time monitoring

### Phase 3: Advanced Features (Weeks 5-6)
- [ ] Integrate Stripe payment system
- [ ] Build knowledge base management
- [ ] Implement system prompt editor
- [ ] Create workflow designer
- [ ] Add data export functionality

### Phase 4: Polish & Launch (Weeks 7-8)
- [ ] Performance optimization
- [ ] Security audit
- [ ] User testing and feedback
- [ ] Documentation
- [ ] Deployment to production

---

## 13. API Limitations & Considerations

### 13.1 Rate Limits
- **Documentation:** Not explicitly stated in public docs
- **Recommendation:** Implement exponential backoff
- **Monitoring:** Track rate limit headers in responses

### 13.2 Concurrent Connections
- **WebSocket:** Limited by plan tier
- **Agents:** Unlimited creation, limited concurrent calls

### 13.3 Data Retention
- **Conversations:** Retention policy varies by plan
- **Audio Files:** Storage limits may apply
- **Recommendation:** Archive important conversations locally

### 13.4 Regional Availability
- **API Access:** Check regional restrictions
- **Latency:** Consider CDN for global users

---

## 14. Testing Strategy

### 14.1 Unit Tests
- API client methods
- Data transformation functions
- Analytics calculations
- WebSocket message handling

### 14.2 Integration Tests
- ElevenLabs API endpoints
- Stripe payment flows
- Database operations
- WebSocket connections

### 14.3 E2E Tests
- User authentication flows
- Agent creation workflow
- Conversation simulation
- Payment processing

### 14.4 Performance Tests
- API response times
- WebSocket latency
- Database query optimization
- Dashboard load times

---

## 15. Monitoring & Observability

### 15.1 Application Monitoring
- **Tool Recommendations:** Sentry, LogRocket, or Datadog
- **Metrics:**
  - API response times
  - Error rates
  - User session duration
  - WebSocket connection stability

### 15.2 Business Metrics
- **Track:**
  - Active agents
  - Total conversations
  - Conversion rates
  - Revenue generated
  - User satisfaction scores

### 15.3 Alerts
- **Critical:**
  - API authentication failures
  - Payment processing errors
  - WebSocket disconnections
- **Warning:**
  - High API latency
  - Low credit balance
  - Unusual traffic patterns

---

## 16. Compliance & Legal

### 16.1 Data Privacy
- **GDPR:** Right to access, rectification, deletion
- **CCPA:** California Consumer Privacy Act compliance
- **Data Processing Agreement:** Required for EU users

### 16.2 Voice Recording Consent
- **Requirement:** Obtain user consent before recording
- **Implementation:** Disclosure in conversation flow
- **Storage:** Secure, encrypted storage of recordings

### 16.3 Payment Processing
- **PCI DSS:** Use Stripe's compliant infrastructure
- **Financial Regulations:** Comply with local payment laws

---

## 17. Cost Estimation

### 17.1 ElevenLabs Costs
- **Base Plan:** Starting at $5-$80/month depending on tier
- **Usage Costs:** Per-character TTS, per-minute STT
- **Estimated Monthly:** $50-$500 for small-medium usage

### 17.2 Infrastructure Costs
- **Hosting:** Vercel/AWS/Google Cloud: $20-$100/month
- **Database:** PostgreSQL managed service: $15-$50/month
- **Redis:** Caching layer: $10-$30/month
- **Storage:** Audio files: $5-$20/month

### 17.3 Third-party Services
- **Stripe:** 2.9% + $0.30 per transaction
- **Monitoring:** Sentry/Datadog: $25-$100/month
- **Authentication:** Auth0/NextAuth: $0-$50/month

**Total Estimated Monthly Operating Cost:** $125-$850 (scales with usage)

---

## 18. References & Resources

### 18.1 Official Documentation
- ElevenLabs API: https://elevenlabs.io/docs/overview
- Agents Platform: https://elevenlabs.io/docs/agents-platform/overview
- Conversational AI: https://elevenlabs.io/docs/conversational-ai
- API Reference: https://elevenlabs.io/docs/api-reference
- Stripe Integration: https://elevenlabs.io/agents/integrations/stripe

### 18.2 Code Examples
- WebSocket API: https://elevenlabs.io/docs/conversational-ai/libraries/web-sockets
- React SDK: npm package @11labs/react
- Python SDK: Available via pip

### 18.3 Community Resources
- ElevenLabs Help Center: https://help.elevenlabs.io
- GitHub: https://github.com/elevenlabs
- Discord: Community support channel

---

## 19. Key Findings & Recommendations

### 19.1 Critical Success Factors
1. **API Key Security:** Implement robust server-side API key management
2. **Real-time Performance:** Optimize WebSocket connections for low latency
3. **User Experience:** Intuitive agent configuration interface
4. **Analytics Depth:** Provide actionable insights from conversation data
5. **Payment Integration:** Seamless Stripe integration for monetization

### 19.2 Technical Recommendations
- Use **Next.js App Router** for modern React architecture
- Implement **React Query** for efficient API state management
- Use **WebSocket** for real-time conversation features
- Store **encrypted API keys** in PostgreSQL
- Leverage **Redis** for caching analytics data
- Use **shadcn/ui** for consistent, accessible components

### 19.3 Risk Mitigation
- **API Changes:** Monitor ElevenLabs changelog for breaking changes
- **Rate Limits:** Implement request throttling and queueing
- **Cost Overruns:** Set up usage alerts and spending caps
- **Data Loss:** Regular backups of conversation data
- **Security Breaches:** Regular security audits and penetration testing

### 19.4 Scalability Considerations
- **Database:** Partition conversation metrics by date
- **Caching:** Aggressive caching of dashboard analytics
- **CDN:** Serve static assets via CDN
- **Load Balancing:** Horizontal scaling for API layer
- **Async Processing:** Queue-based processing for heavy operations

---

## 20. Next Steps for Development Team

### Immediate Actions (Week 1)
1. **Set up development environment**
   - Initialize Next.js project
   - Configure TypeScript and ESLint
   - Set up PostgreSQL database
   - Create ElevenLabs developer account

2. **Create API integration layer**
   - Build ElevenLabs API client
   - Implement authentication
   - Create type definitions
   - Write unit tests

3. **Design database schema**
   - User and authentication tables
   - Agent configuration storage
   - Analytics and metrics tables
   - Migration scripts

### Short-term Goals (Weeks 2-4)
1. **Build core dashboard pages**
   - Overview/analytics page
   - Agent configuration interface
   - Conversation history viewer
   - Settings page

2. **Implement WebSocket integration**
   - Connection manager
   - Audio streaming
   - Real-time transcription
   - Error handling

3. **Integrate Stripe payments**
   - Checkout flow
   - Subscription management
   - Webhook handlers
   - Usage tracking

### Medium-term Goals (Weeks 5-8)
1. **Advanced features**
   - Knowledge base management
   - System prompt editor
   - Workflow designer
   - Data export/import

2. **Optimization**
   - Performance tuning
   - Caching strategy
   - Database indexing
   - Load testing

3. **Testing & QA**
   - Comprehensive test suite
   - Security audit
   - User acceptance testing
   - Bug fixes and polish

---

## Appendix A: Sample API Requests

### A.1 Create Agent Example
```bash
curl -X POST https://api.elevenlabs.io/v1/convai/agents/create \
  -H "xi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer Support Agent",
    "conversation_config": {
      "agent": {
        "prompt": {
          "prompt": "You are a friendly customer support agent..."
        },
        "first_message": "Hello! How can I help you today?",
        "language": "en"
      },
      "tts": {
        "voice_id": "21m00Tcm4TlvDq8ikWAM"
      }
    },
    "platform_settings": {
      "widget": {
        "color": "#3B82F6"
      }
    }
  }'
```

### A.2 Get Conversation Example
```bash
curl -X GET https://api.elevenlabs.io/v1/convai/conversations/conv_123abc \
  -H "xi-api-key: YOUR_API_KEY"
```

### A.3 WebSocket Connection Example
```javascript
const ws = new WebSocket(
  'wss://api.elevenlabs.io/v1/convai/conversation?agent_id=agent_abc123'
);

ws.onopen = () => {
  console.log('Connected to ElevenLabs');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.type === 'audio') {
    // Handle audio response
    const audioData = atob(message.data);
  } else if (message.type === 'transcript') {
    // Handle transcript update
    console.log(`${message.role}: ${message.message}`);
  }
};

// Send audio data
const sendAudio = (audioBuffer) => {
  const base64Audio = btoa(
    String.fromCharCode(...new Uint8Array(audioBuffer))
  );

  ws.send(JSON.stringify({
    type: 'audio',
    data: base64Audio,
    format: 'pcm16',
    sample_rate: 16000
  }));
};
```

---

## Appendix B: Dashboard Mockup Specifications

### B.1 Overview Page Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Dashboard - AI Sekretarka                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  Calls   │ │  Visits  │ │Reminders │ │ Duration │      │
│  │   119    │ │    47    │ │    73    │ │  2:45    │      │
│  │  +12%    │ │   +8%    │ │   +15%   │ │   -5%    │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Revenue: 14,200 PLN (+18%)                          │  │
│  │  Conversion Rate: 39.5%                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 Call Volume Chart                     │  │
│  │  [Line chart showing daily call patterns]            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Live Conversations (3 active)            │  │
│  │  • Agent talking with customer about appointment...  │  │
│  │  • Processing payment for service booking...         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### B.2 Agent Configuration Page
```
┌─────────────────────────────────────────────────────────────┐
│ Agent Settings                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Basic Information                                           │
│ ├─ Name: [Customer Service Agent              ]            │
│ ├─ Description: [Handles customer inquiries...  ]          │
│ └─ Tags: [support] [sales] [+Add]                          │
│                                                              │
│ Voice Configuration                                         │
│ ├─ Voice: [Rachel - Professional Female ▼]                 │
│ ├─ Language: [English (US) ▼]                              │
│ └─ Preview: [▶ Play Sample]                                │
│                                                              │
│ AI Model                                                    │
│ ├─ Model: [GPT-4 ▼]                                        │
│ └─ Temperature: [0.7 ━━━━━━━━━━ ]                         │
│                                                              │
│ System Prompt                                               │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ You are a professional customer service agent...       │ │
│ │                                                         │ │
│ │ [Multi-line text editor with syntax highlighting]     │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                              │
│ Knowledge Base                                              │
│ ├─ [📄 Product Catalog.pdf] [X]                            │
│ ├─ [🔗 FAQ Documentation] [X]                              │
│ └─ [+ Upload Files or Add URLs]                            │
│                                                              │
│ [Cancel] [Save Changes]                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Appendix C: Error Handling Patterns

### C.1 API Error Response Format
```typescript
interface ElevenLabsError {
  error: {
    type: 'validation_error' | 'authentication_error' | 'rate_limit_error' | 'server_error';
    message: string;
    details?: Record<string, any>;
  };
}
```

### C.2 Error Handling Examples
```typescript
async function createAgent(config: AgentConfig): Promise<Agent> {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/convai/agents/create', {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      const error: ElevenLabsError = await response.json();

      switch (error.error.type) {
        case 'validation_error':
          throw new ValidationError(error.error.message, error.error.details);
        case 'authentication_error':
          throw new AuthenticationError('Invalid API key');
        case 'rate_limit_error':
          throw new RateLimitError('Rate limit exceeded');
        default:
          throw new ServerError(error.error.message);
      }
    }

    return await response.json();
  } catch (error) {
    // Log error for monitoring
    console.error('Failed to create agent:', error);

    // Re-throw for upstream handling
    throw error;
  }
}
```

---

## Conclusion

This comprehensive research document provides all necessary information to build a production-ready dashboard for the ElevenLabs Agents Platform. The platform offers robust APIs for conversational AI, extensive customization options, and seamless integration capabilities with payment systems like Stripe.

Key takeaways:
1. **Well-documented API** with comprehensive endpoint coverage
2. **Real-time WebSocket** support for low-latency conversations
3. **Flexible configuration** for agents, voices, and workflows
4. **Built-in analytics** and conversation tracking
5. **Production-ready features** including authentication, monitoring, and scaling

The recommended Next.js architecture with PostgreSQL database, Redis caching, and Stripe payments provides a solid foundation for building a scalable, secure, and feature-rich dashboard application.

**Next Step:** Share this research with the development team and begin Phase 1 implementation.

---

**Research completed by:** Hive Mind Research Agent
**Date:** November 2, 2025
**Status:** ✅ Complete
**Stored in collective memory:** swarm/researcher/findings
