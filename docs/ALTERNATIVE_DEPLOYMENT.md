# Alternative Deployment Guide (Without KV)

## Issue: KV Not Available

If you don't see KV (Redis) options in your Vercel dashboard, you have several alternatives:

---

## ✅ Solution 1: Use Postgres for Sessions (Simplest)

Since we already have a database schema with a `sessions` table, we can use Postgres instead of KV for session storage.

### Step 1: Create Only Postgres Database

1. Go to: https://vercel.com/dashboard/stores
2. Click **"Create Database"**
3. You should see these options:
   - **Postgres** ✅ (We need this)
   - **Blob** (File storage - skip)
   - **Edge Config** (Configuration - skip)
   - **KV** (Redis - if not visible, skip)
4. Select **"Postgres"**
5. Configure:
   - Name: `auth-database`
   - Region: `iad1` or closest to you
6. Link to your project: `ai-sekretarka-ui-mockup`

### Step 2: Modify Auth Library for Postgres Sessions

We'll update the code to use Postgres instead of KV:

**Edit `/src/lib/auth.ts`** - Replace the session storage functions:

```typescript
// Replace the KV session functions with Postgres versions

export async function createSession(userId: string, email: string) {
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  // Store session in Postgres instead of KV
  await sql`
    INSERT INTO sessions (user_id, token_hash, expires_at, ip_address, user_agent)
    VALUES (
      ${userId},
      ${hashToken(token)},
      ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)},
      ${null},
      ${null}
    )
  `;

  return token;
}

export async function validateSession(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    // Validate session in Postgres
    const result = await sql`
      SELECT s.*, u.email, u.name
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token_hash = ${hashToken(token)}
        AND s.expires_at > NOW()
        AND s.revoked_at IS NULL
        AND u.deleted_at IS NULL
    `;

    if (result.rows.length === 0) {
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      name: result.rows[0].name,
    };
  } catch {
    return null;
  }
}

export async function revokeSession(token: string) {
  await sql`
    UPDATE sessions
    SET revoked_at = NOW()
    WHERE token_hash = ${hashToken(token)}
  `;
}

// Helper to hash tokens for storage
function hashToken(token: string): string {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(token).digest('hex');
}
```

### Step 3: Add JWT_SECRET

1. Go to: https://vercel.com/tomfebrys-projects/ai-sekretarka-ui-mockup/settings/environment-variables
2. Generate secret:
   ```bash
   openssl rand -base64 32
   ```
3. Add environment variable:
   - Key: `JWT_SECRET`
   - Value: (your generated secret)
   - Environments: All
4. Save

### Step 4: Initialize Database Schema

Since we already have the `sessions` table in our schema:

```bash
# Pull environment variables
vercel env pull .env.local

# Connect to database
psql $(grep POSTGRES_URL .env.local | cut -d '=' -f2 | tr -d '"')

# Run schema (already includes sessions table)
\i src/db/schema.sql

# Verify
\dt

# Should see: users, sessions, audit_logs, password_reset_tokens, etc.
\q
```

### Step 5: Redeploy

```bash
vercel --prod
```

---

## ✅ Solution 2: Try Upstash Redis (KV Alternative)

If Vercel KV isn't available, you can use Upstash Redis (free tier available):

### Step 1: Create Upstash Account

1. Go to: https://upstash.com/
2. Sign up (free account)
3. Create a Redis database
4. Get the connection details

### Step 2: Add Upstash Environment Variables

In Vercel project settings, add:
- `KV_URL` = Your Upstash Redis URL
- `KV_REST_API_URL` = Your Upstash REST API URL
- `KV_REST_API_TOKEN` = Your Upstash token

The existing code will work with Upstash since we're using `@vercel/kv` which is compatible.

---

## ✅ Solution 3: Simplified In-Memory Sessions (Development Only)

For development/testing only, you can use JWT-only sessions without persistence:

**This approach**:
- No database needed for sessions
- Sessions stored in JWT tokens only
- Simpler but less secure
- No session revocation
- **NOT recommended for production**

Skip this unless you want a quick test deployment.

---

## 🎯 Recommended Approach

**Use Solution 1 (Postgres Sessions)**

Why?
- ✅ We already have the schema
- ✅ No additional service needed
- ✅ Production-ready
- ✅ Supports session revocation
- ✅ Audit trail included

---

## 📋 Quick Checklist for Postgres-Only Setup

1. [ ] Create Vercel Postgres database
2. [ ] Link to project (auto-adds environment variables)
3. [ ] Generate and add JWT_SECRET
4. [ ] Initialize database schema (`psql` + `\i src/db/schema.sql`)
5. [ ] Update `/src/lib/auth.ts` with Postgres session code (above)
6. [ ] Redeploy to Vercel
7. [ ] Test at `/login`

---

## 🔍 Finding KV in Vercel Dashboard

If you want to check for KV again:

1. Go to: https://vercel.com/dashboard
2. Select your project: `ai-sekretarka-ui-mockup`
3. Go to **Storage** tab (left sidebar)
4. Click **"Create Database"**
5. You should see options:
   - **Postgres** (SQL database)
   - **KV** (Redis key-value) ← Look for this
   - **Blob** (File storage)
   - **Edge Config** (Configuration)

If KV isn't listed, it might not be available for your account/region yet. Use Solution 1 (Postgres) instead.

---

## 📞 Need Help?

The Postgres-only approach works great and is what we'll use. Let me know if you:
- Can't create Postgres database
- Need help with the schema
- Want to use Upstash instead
- Have any other questions

The important thing: **Postgres alone is sufficient and production-ready** for your authentication system!
