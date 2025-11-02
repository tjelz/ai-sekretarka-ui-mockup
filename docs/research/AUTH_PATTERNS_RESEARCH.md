# Authentication Patterns & Security Research
**Research Date:** 2025-11-01
**Agent:** Researcher (Hive Mind Collective Intelligence)
**Session ID:** swarm-1762040469176-bvntrdyx1

---

## Executive Summary

This document provides comprehensive research on authentication patterns, Vercel storage capabilities, shadcn UI components, and security best practices for building a secure authentication system in Next.js 15+ with TypeScript.

### Key Findings
- **Better-auth** (already installed v1.3.10) is recommended for modern Next.js authentication
- **Vercel Postgres** provides scalable serverless SQL for user data
- **Argon2id** is the gold standard for password hashing (bcrypt acceptable for legacy)
- **Data Access Layer (DAL)** pattern is now preferred over middleware-only auth
- **shadcn/ui** provides comprehensive form components suitable for auth interfaces

---

## 1. Authentication Architecture

### 1.1 Recommended Approach: Multi-Layer Protection

**Critical Security Update (2025):** Middleware is no longer considered safe for authentication following CVE-2025-29927. Use Data Access Layer (DAL) pattern instead.

#### Security Layers (Defense in Depth)
1. **Data Layer**: Add auth checks in Data Access Layer functions
2. **Route Level**: Verify authentication in page components
3. **Server Actions**: Validate sessions before all mutations
4. **UI Elements**: Hide sensitive components for unauthenticated users

### 1.2 Better-Auth Integration

**Project Status:** `better-auth@1.3.10` already installed

#### Setup Steps
```typescript
// 1. Create auth instance (src/lib/auth.ts)
import { betterAuth } from "better-auth"
import { db } from "@/lib/db" // Your database connection

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  // Additional plugins as needed
})

// 2. Mount handler (app/api/auth/[...all]/route.ts)
import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

export const { GET, POST } = toNextJsHandler(auth)

// 3. Create client (src/lib/auth-client.ts)
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL
})
```

#### Better-Auth Features
- ✅ Email & password authentication
- ✅ Social sign-ons (GitHub, Google, etc.)
- ✅ Two-factor authentication (2FA)
- ✅ Multi-tenant support (organizations/teams)
- ✅ Session management
- ✅ TypeScript-first design

---

## 2. Vercel Storage Solutions

### 2.1 Vercel Postgres

**Project Status:** `@vercel/postgres@0.10.0` installed

#### Key Features
- Serverless PostgreSQL database
- Auto-scaling based on demand
- Zero-config edge caching
- ACID compliance
- Connection pooling

#### Database Schema for Authentication

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  password_hash TEXT NOT NULL,
  name VARCHAR(255),
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verification tokens (email verification, password reset)
CREATE TABLE verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMP NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Accounts table (for OAuth providers)
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE(provider, provider_account_id)
);

-- Indexes for performance
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_verification_tokens_token ON verification_tokens(token);
```

#### Environment Variables
```bash
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
```

### 2.2 Vercel KV (Alternative for Session Storage)

**Project Status:** `@vercel/kv@3.0.0` installed

#### Use Cases
- Session storage (faster than Postgres for ephemeral data)
- Rate limiting counters
- Feature flags
- Cache layer

#### Configuration Example
```typescript
import { kv } from "@vercel/kv"

// Store session
await kv.set(`session:${sessionId}`, sessionData, { ex: 3600 })

// Retrieve session
const session = await kv.get(`session:${sessionId}`)

// Rate limiting
const attempts = await kv.incr(`login-attempts:${email}`)
await kv.expire(`login-attempts:${email}`, 900) // 15 min TTL
```

---

## 3. Password Security Best Practices

### 3.1 Hashing Algorithm Selection

**Recommendation Hierarchy (2025):**

1. **Argon2id** (FIRST CHOICE)
   - Winner of Password Hashing Competition (2015)
   - Resistant to GPU attacks
   - Resistant to side-channel attacks
   - Memory-hard algorithm

2. **bcrypt** (ACCEPTABLE - Already installed)
   - Industry standard for years
   - Well-tested and battle-proven
   - Suitable for legacy systems
   - Automatic salting

3. **AVOID:** MD5, SHA1, SHA256 (without proper key derivation)

### 3.2 Argon2id Configuration (OWASP 2025)

```typescript
import argon2 from "argon2"

// Recommended settings
const argon2Config = {
  type: argon2.argon2id,
  memoryCost: 47104, // 46 MiB
  timeCost: 1,
  parallelism: 1
}

// Alternative (lower memory)
const argon2ConfigLowMem = {
  type: argon2.argon2id,
  memoryCost: 19456, // 19 MiB
  timeCost: 2,
  parallelism: 1
}

// Hash password
const hash = await argon2.hash(password, argon2Config)

// Verify password
const isValid = await argon2.verify(hash, password)
```

### 3.3 bcrypt Configuration (Current Setup)

**Project Status:** `bcrypt@6.0.0` installed

```typescript
import bcrypt from "bcrypt"

// OWASP recommendation: work factor 10+
const saltRounds = 12 // Higher = more secure but slower

// Hash password
const hash = await bcrypt.hash(password, saltRounds)

// Verify password
const isValid = await bcrypt.compare(password, hash)

// IMPORTANT: bcrypt limits passwords to 72 bytes
// Truncate or use pre-hash if needed
```

### 3.4 Additional Security Measures

#### Password Validation Rules
```typescript
const passwordSchema = z.string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[a-z]/, "Must contain lowercase letter")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[^A-Za-z0-9]/, "Must contain special character")
```

#### Peppering (Additional Protection)
```typescript
const pepper = process.env.PASSWORD_PEPPER // Store in secrets vault
const pepperedPassword = password + pepper
const hash = await argon2.hash(pepperedPassword, argon2Config)
```

---

## 4. Session Management

### 4.1 Cookie Security Configuration

**Critical Settings:**
```typescript
const cookieOptions = {
  httpOnly: true,      // Prevent XSS attacks
  secure: true,        // HTTPS only
  sameSite: "lax",     // CSRF protection
  maxAge: 604800,      // 7 days (in seconds)
  path: "/",
}
```

### 4.2 JWT Best Practices

**IMPORTANT:** JWTs are base64-encoded, NOT encrypted. Never store sensitive data.

```typescript
import jwt from "jsonwebtoken"

// Token structure
interface JWTPayload {
  userId: string
  email: string
  // NEVER include: password, SSN, credit cards
}

// Generate token
const token = jwt.sign(
  payload,
  process.env.JWT_SECRET!,
  {
    expiresIn: "7d",
    issuer: "your-app",
    audience: "your-app-users"
  }
)

// Verify token
const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET!
) as JWTPayload
```

### 4.3 Token Refresh Strategy

```typescript
// Short-lived access token
const accessToken = jwt.sign(payload, secret, { expiresIn: "15m" })

// Long-lived refresh token
const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "7d" })

// Store refresh token in database
await db.session.create({
  data: {
    userId,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
})
```

---

## 5. Security Threats & Mitigations

### 5.1 CSRF (Cross-Site Request Forgery) Protection

**Built-in Next.js Protections:**
- Server Actions use POST method exclusively
- SameSite cookies (default in modern browsers)
- Origin header validation

**Additional CSRF Protection:**
```typescript
// Using edge-csrf library
import { createCsrfProtect } from "@edge-csrf/nextjs"

const csrfProtect = createCsrfProtect({
  cookie: {
    secure: process.env.NODE_ENV === "production",
  },
})

// Middleware
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Check CSRF token
  const csrfError = await csrfProtect(request, response)
  if (csrfError) {
    return new NextResponse("Invalid CSRF token", { status: 403 })
  }

  return response
}

// Client: Include token in requests
headers: {
  "X-CSRF-Token": csrfToken
}
```

### 5.2 XSS (Cross-Site Scripting) Protection

**Security Headers (next.config.js):**
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

**Input Sanitization:**
```typescript
import DOMPurify from "isomorphic-dompurify"

// Sanitize user input before rendering
const cleanHTML = DOMPurify.sanitize(userInput)
```

### 5.3 Rate Limiting

**Implementation Strategies:**

#### 1. Using Vercel KV
```typescript
import { kv } from "@vercel/kv"

async function checkRateLimit(identifier: string): Promise<boolean> {
  const key = `rate-limit:${identifier}`
  const requests = await kv.incr(key)

  if (requests === 1) {
    await kv.expire(key, 60) // 1 minute window
  }

  return requests <= 5 // Max 5 requests per minute
}
```

#### 2. Using Upstash Rate Limit
```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { kv } from "@vercel/kv"

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})

const { success } = await ratelimit.limit(identifier)
if (!success) {
  return new Response("Too Many Requests", { status: 429 })
}
```

### 5.4 SQL Injection Prevention

**Using ORM (Drizzle/Prisma):**
```typescript
// ✅ SAFE - Parameterized queries
const user = await db.user.findUnique({
  where: { email: userInput }
})

// ❌ DANGEROUS - String concatenation
const user = await db.$queryRaw(`SELECT * FROM users WHERE email = '${userInput}'`)
```

---

## 6. shadcn/ui Components for Authentication

### 6.1 Available Components

**Already Installed Components:**
- ✅ `input.tsx` - Text input fields
- ✅ `button.tsx` - Action buttons
- ✅ `card.tsx` - Container layouts
- ✅ `form.tsx` - Form management (react-hook-form)
- ✅ `label.tsx` - Form labels
- ✅ `checkbox.tsx` - Remember me, terms acceptance
- ✅ `alert.tsx` - Error/success messages
- ✅ `dialog.tsx` - Modals for confirmations
- ✅ `separator.tsx` - Visual dividers
- ✅ `avatar.tsx` - User profile images

### 6.2 Login Form Component Example

```typescript
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false)
})

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Handle login
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="!mt-0">Remember me</FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
```

### 6.3 Dashboard Layout Components

```typescript
// Using sidebar.tsx for navigation
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3 p-4">
            <Avatar>
              <AvatarImage src="/user-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* Navigation items */}
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
```

---

## 7. Authentication Flow Patterns

### 7.1 Email + Password Flow

```
┌─────────────┐
│   User      │
│  Submits    │
│  Form       │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  1. Validate Input  │
│     (Zod Schema)    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  2. Find User       │
│     (Postgres)      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  3. Verify Password │
│     (bcrypt/argon2) │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  4. Create Session  │
│     (JWT/Cookie)    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  5. Set HttpOnly    │
│     Cookie          │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  6. Redirect to     │
│     Dashboard       │
└─────────────────────┘
```

### 7.2 OAuth Flow (GitHub/Google)

```
┌─────────────┐
│   User      │
│  Clicks     │
│  "GitHub"   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  1. Redirect to     │
│     OAuth Provider  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  2. User Authorizes │
│     (GitHub)        │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  3. Callback with   │
│     Auth Code       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  4. Exchange Code   │
│     for Token       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  5. Fetch User Info │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  6. Create/Link     │
│     Account         │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  7. Create Session  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  8. Redirect to     │
│     Dashboard       │
└─────────────────────┘
```

### 7.3 Protected Route Pattern

```typescript
// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")

  // Redirect to login if no session
  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"]
}
```

---

## 8. Security Checklist

### 8.1 Pre-Launch Security Audit

- [ ] **Password Security**
  - [ ] Using Argon2id or bcrypt with proper work factors
  - [ ] Enforcing strong password requirements
  - [ ] Implementing password reset flow
  - [ ] Rate limiting password attempts

- [ ] **Session Management**
  - [ ] HttpOnly cookies enabled
  - [ ] Secure flag set (HTTPS only)
  - [ ] SameSite attribute configured
  - [ ] Session expiration implemented
  - [ ] Token refresh strategy in place

- [ ] **Input Validation**
  - [ ] All inputs validated with Zod schemas
  - [ ] SQL injection prevented (using ORM)
  - [ ] XSS protection (CSP headers, sanitization)
  - [ ] CSRF tokens implemented

- [ ] **API Security**
  - [ ] Rate limiting on all endpoints
  - [ ] Authentication required for protected routes
  - [ ] Authorization checks for sensitive operations
  - [ ] CORS properly configured

- [ ] **Data Protection**
  - [ ] Environment variables secured
  - [ ] Secrets in vault (not in code)
  - [ ] Database encrypted at rest
  - [ ] HTTPS enforced
  - [ ] Sensitive data not in JWT payload

- [ ] **Monitoring & Logging**
  - [ ] Failed login attempts logged
  - [ ] Suspicious activity alerts
  - [ ] Error logs reviewed regularly
  - [ ] Security headers validated

### 8.2 OWASP Top 10 Mitigations

1. **Broken Access Control** - Implement DAL pattern with authorization
2. **Cryptographic Failures** - Use Argon2id/bcrypt, HTTPS, encrypted DB
3. **Injection** - Use ORM, validate inputs
4. **Insecure Design** - Follow security by design principles
5. **Security Misconfiguration** - Proper headers, disable defaults
6. **Vulnerable Components** - Keep dependencies updated
7. **Authentication Failures** - Multi-factor, rate limiting, secure sessions
8. **Data Integrity Failures** - Sign JWTs, validate data
9. **Logging Failures** - Log security events
10. **SSRF** - Validate URLs, whitelist domains

---

## 9. Environment Variables

### 9.1 Required Variables

```bash
# Database
POSTGRES_URL="postgres://user:pass@host:port/db"
POSTGRES_PRISMA_URL="postgres://user:pass@host:port/db?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgres://user:pass@host:port/db"

# Vercel KV (optional)
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."

# Authentication
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
JWT_SECRET="generate-with-openssl-rand-base64-32"

# Password Peppering (optional but recommended)
PASSWORD_PEPPER="generate-with-openssl-rand-base64-32"

# OAuth Providers (if using)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email Service (for verification)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
```

---

## 10. Recommended npm Packages

### 10.1 Already Installed
✅ `better-auth@1.3.10` - Authentication library
✅ `bcrypt@6.0.0` - Password hashing
✅ `jsonwebtoken@9.0.2` - JWT handling
✅ `cookie@1.0.2` - Cookie utilities
✅ `@vercel/postgres@0.10.0` - Database
✅ `@vercel/kv@3.0.0` - Key-value store
✅ `zod@4.1.12` - Schema validation
✅ `react-hook-form@7.60.0` - Form handling

### 10.2 Recommended Additions
```bash
# Better password hashing
npm install argon2

# CSRF protection
npm install @edge-csrf/nextjs

# Rate limiting
npm install @upstash/ratelimit

# Input sanitization
npm install isomorphic-dompurify

# Email verification
npm install nodemailer
npm install @types/nodemailer -D

# 2FA/OTP
npm install otplib qrcode
npm install @types/qrcode -D
```

---

## 11. Testing Strategy

### 11.1 Security Test Cases

```typescript
describe("Authentication Security", () => {
  test("should reject weak passwords", async () => {
    const weakPassword = "password123"
    const result = await registerUser({ email: "test@example.com", password: weakPassword })
    expect(result.error).toBe("Password does not meet requirements")
  })

  test("should prevent SQL injection", async () => {
    const maliciousEmail = "'; DROP TABLE users; --"
    const result = await loginUser({ email: maliciousEmail, password: "test" })
    expect(result.error).toBe("Invalid credentials")
  })

  test("should rate limit login attempts", async () => {
    const attempts = Array(10).fill(null).map(() =>
      loginUser({ email: "test@example.com", password: "wrong" })
    )
    const results = await Promise.all(attempts)
    expect(results.slice(-1)[0].error).toContain("Too many attempts")
  })

  test("should create secure session cookies", async () => {
    const response = await loginUser({ email: "test@example.com", password: "correct" })
    const cookie = response.headers.get("set-cookie")
    expect(cookie).toContain("HttpOnly")
    expect(cookie).toContain("Secure")
    expect(cookie).toContain("SameSite=Lax")
  })
})
```

---

## 12. Migration Path

### 12.1 From Legacy Auth Systems

```typescript
// Migration script example
async function migrateUsers() {
  const legacyUsers = await oldDb.query("SELECT * FROM users")

  for (const user of legacyUsers) {
    // Re-hash passwords with Argon2id
    const newHash = await argon2.hash(user.passwordHash, argon2Config)

    await newDb.user.create({
      data: {
        email: user.email,
        passwordHash: newHash,
        emailVerified: user.email_verified,
        createdAt: user.created_at
      }
    })
  }
}
```

### 12.2 Gradual Password Upgrade

```typescript
async function loginUser(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } })

  if (!user) return { error: "Invalid credentials" }

  // Check if using old bcrypt hash
  if (user.passwordHash.startsWith("$2b$")) {
    const isValid = await bcrypt.compare(password, user.passwordHash)

    if (isValid) {
      // Upgrade to Argon2id on successful login
      const newHash = await argon2.hash(password, argon2Config)
      await db.user.update({
        where: { id: user.id },
        data: { passwordHash: newHash }
      })
    }
  } else {
    // Already using Argon2id
    const isValid = await argon2.verify(user.passwordHash, password)
  }
}
```

---

## 13. Additional Resources

### 13.1 Documentation
- Better Auth: https://www.better-auth.com/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- OWASP Cheat Sheets: https://cheatsheetseries.owasp.org
- Next.js Security: https://nextjs.org/blog/security-nextjs-server-components-actions

### 13.2 Tools
- Password Strength Tester: https://www.passwordmonster.com
- Security Headers Checker: https://securityheaders.com
- JWT Debugger: https://jwt.io
- CSRF Token Generator: https://www.npmjs.com/package/@edge-csrf/nextjs

---

## 14. Conclusion

This research provides a comprehensive foundation for implementing secure authentication in your Next.js application. The combination of **Better-auth**, **Vercel Postgres**, **Argon2id/bcrypt** password hashing, and **shadcn/ui** components offers a modern, secure, and user-friendly authentication system.

### Next Steps for Implementation
1. Set up Vercel Postgres database with schema
2. Configure Better-auth with email/password provider
3. Implement login/register forms using shadcn/ui
4. Add security headers and rate limiting
5. Set up session management with secure cookies
6. Implement protected routes and authorization
7. Add comprehensive testing
8. Security audit before launch

**Research completed by:** Researcher Agent
**Session ID:** swarm-1762040469176-bvntrdyx1
**Date:** 2025-11-01
