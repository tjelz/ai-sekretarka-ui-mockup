# Implementation Guide for Coder Agent

## Quick Start

This guide provides everything the coder agent needs to implement the authentication system based on the database schema.

---

## File Structure

```
src/
├── db/
│   ├── schema.sql                    # Database schema (DONE)
│   ├── README.md                     # Documentation (DONE)
│   ├── indexes.md                    # Performance guide (DONE)
│   ├── schema-summary.md            # Quick reference (DONE)
│   ├── implementation-guide.md      # This file (DONE)
│   ├── client.ts                    # Vercel Postgres client
│   └── migrations/
│       ├── 001_initial_schema.sql   # Migration (DONE)
│       └── rollback_001.sql         # Rollback (DONE)
├── lib/
│   ├── auth/
│   │   ├── password.ts              # Password hashing/verification (TODO)
│   │   ├── tokens.ts                # Token generation/validation (TODO)
│   │   ├── session.ts               # Session management (TODO)
│   │   └── audit.ts                 # Audit logging (TODO)
│   └── db/
│       └── queries.ts               # Database queries (TODO)
└── api/
    ├── auth/
    │   ├── login.ts                 # Login endpoint (TODO)
    │   ├── logout.ts                # Logout endpoint (TODO)
    │   ├── register.ts              # Registration endpoint (TODO)
    │   ├── refresh.ts               # Token refresh (TODO)
    │   └── verify-email.ts          # Email verification (TODO)
    └── cron/
        ├── cleanup-sessions.ts      # Session cleanup (TODO)
        └── cleanup-tokens.ts        # Token cleanup (TODO)
```

---

## Implementation Steps

### Step 1: Database Setup

```bash
# 1. Create Vercel Postgres database
vercel env pull .env.local

# 2. Run migration
psql $POSTGRES_URL -f src/db/migrations/001_initial_schema.sql

# 3. Verify
psql $POSTGRES_URL -c "\dt"
```

### Step 2: Core Libraries

#### `src/lib/auth/password.ts`
```typescript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
```

#### `src/lib/auth/tokens.ts`
```typescript
import crypto from 'crypto';

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateTokenPair() {
  const accessToken = generateToken();
  const refreshToken = generateToken();

  return {
    accessToken,
    accessTokenHash: hashToken(accessToken),
    refreshToken,
    refreshTokenHash: hashToken(refreshToken),
  };
}

// Token expiration times (in seconds)
export const TOKEN_EXPIRY = {
  ACCESS: 15 * 60, // 15 minutes
  REFRESH: 7 * 24 * 60 * 60, // 7 days
  PASSWORD_RESET: 60 * 60, // 1 hour
  EMAIL_VERIFICATION: 24 * 60 * 60, // 24 hours
};
```

#### `src/lib/auth/session.ts`
```typescript
import { sql } from '@vercel/postgres';
import { generateTokenPair, hashToken, TOKEN_EXPIRY } from './tokens';

export async function createSession(
  userId: string,
  ipAddress: string,
  userAgent: string
) {
  const { accessToken, accessTokenHash, refreshToken, refreshTokenHash } =
    generateTokenPair();

  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY.ACCESS * 1000);
  const refreshExpiresAt = new Date(Date.now() + TOKEN_EXPIRY.REFRESH * 1000);

  await sql`
    INSERT INTO sessions (
      user_id, token_hash, refresh_token_hash,
      ip_address, user_agent, expires_at, refresh_expires_at
    ) VALUES (
      ${userId}, ${accessTokenHash}, ${refreshTokenHash},
      ${ipAddress}, ${userAgent}, ${expiresAt}, ${refreshExpiresAt}
    )
  `;

  return {
    accessToken,
    refreshToken,
    expiresAt,
  };
}

export async function validateSession(token: string) {
  const tokenHash = hashToken(token);

  const { rows } = await sql`
    SELECT s.*, u.id as user_id, u.email, u.display_name
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token_hash = ${tokenHash}
      AND s.is_active = TRUE
      AND s.expires_at > NOW()
      AND u.deleted_at IS NULL
  `;

  if (rows.length === 0) return null;

  // Update last activity
  await sql`
    UPDATE sessions
    SET last_activity_at = NOW()
    WHERE token_hash = ${tokenHash}
  `;

  return rows[0];
}

export async function revokeSession(token: string) {
  const tokenHash = hashToken(token);

  await sql`
    UPDATE sessions
    SET is_active = FALSE,
        revoked_at = NOW(),
        revoke_reason = 'user_logout'
    WHERE token_hash = ${tokenHash}
  `;
}

export async function revokeAllUserSessions(userId: string) {
  await sql`
    UPDATE sessions
    SET is_active = FALSE,
        revoked_at = NOW(),
        revoke_reason = 'revoke_all'
    WHERE user_id = ${userId}
      AND is_active = TRUE
  `;
}
```

#### `src/lib/auth/audit.ts`
```typescript
import { sql } from '@vercel/postgres';

type EventType =
  | 'login'
  | 'logout'
  | 'password_change'
  | 'password_reset_request'
  | 'password_reset_complete'
  | 'email_verification'
  | 'account_locked'
  | 'account_unlocked'
  | '2fa_enabled'
  | '2fa_disabled'
  | 'session_revoked';

type EventStatus = 'success' | 'failure' | 'blocked' | 'pending';

export async function logAuditEvent(
  eventType: EventType,
  eventStatus: EventStatus,
  userId: string | null,
  ipAddress: string,
  details?: Record<string, any>
) {
  await sql`
    INSERT INTO audit_logs (
      user_id, event_type, event_status, ip_address, details
    ) VALUES (
      ${userId}, ${eventType}, ${eventStatus}, ${ipAddress}, ${JSON.stringify(details || {})}
    )
  `;
}

export async function getRecentFailedLogins(
  ipAddress: string,
  minutes: number = 15
): Promise<number> {
  const { rows } = await sql`
    SELECT COUNT(*) as count
    FROM audit_logs
    WHERE event_type = 'login'
      AND event_status = 'failure'
      AND ip_address = ${ipAddress}
      AND created_at > NOW() - INTERVAL '${minutes} minutes'
  `;

  return parseInt(rows[0].count);
}
```

---

### Step 3: API Endpoints

#### `src/api/auth/register.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hashPassword, validatePasswordStrength } from '@/lib/auth/password';
import { logAuditEvent } from '@/lib/auth/audit';

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName } = await req.json();

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: 'Weak password', details: passwordValidation.errors },
        { status: 400 }
      );
    }

    // Check if user exists
    const { rows: existingUsers } = await sql`
      SELECT id FROM users WHERE email = ${email} AND deleted_at IS NULL
    `;

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const { rows } = await sql`
      INSERT INTO users (email, password_hash, full_name, email_verified)
      VALUES (${email}, ${passwordHash}, ${fullName}, false)
      RETURNING id, email, full_name, created_at
    `;

    const user = rows[0];
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';

    await logAuditEvent('email_verification', 'pending', user.id, ipAddress);

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### `src/api/auth/login.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { logAuditEvent, getRecentFailedLogins } from '@/lib/auth/audit';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 30;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Check for rate limiting
    const recentFailures = await getRecentFailedLogins(ipAddress);
    if (recentFailures >= MAX_FAILED_ATTEMPTS * 2) {
      await logAuditEvent('login', 'blocked', null, ipAddress);
      return NextResponse.json(
        { error: 'Too many failed attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Get user
    const { rows: users } = await sql`
      SELECT * FROM users
      WHERE email = ${email}
        AND deleted_at IS NULL
    `;

    if (users.length === 0) {
      await logAuditEvent('login', 'failure', null, ipAddress, { email });
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Check if account is locked
    if (
      user.account_locked_until &&
      new Date(user.account_locked_until) > new Date()
    ) {
      await logAuditEvent('login', 'blocked', user.id, ipAddress);
      return NextResponse.json(
        { error: 'Account temporarily locked. Please try again later.' },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
      // Increment failed attempts
      const newFailedAttempts = user.failed_login_attempts + 1;
      const shouldLock = newFailedAttempts >= MAX_FAILED_ATTEMPTS;

      await sql`
        UPDATE users
        SET failed_login_attempts = ${newFailedAttempts},
            account_locked_until = ${
              shouldLock
                ? `NOW() + INTERVAL '${LOCKOUT_DURATION_MINUTES} minutes'`
                : null
            }
        WHERE id = ${user.id}
      `;

      await logAuditEvent('login', 'failure', user.id, ipAddress);

      if (shouldLock) {
        await logAuditEvent('account_locked', 'success', user.id, ipAddress);
      }

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Success - create session
    const session = await createSession(user.id, ipAddress, userAgent);

    // Reset failed attempts
    await sql`
      UPDATE users
      SET failed_login_attempts = 0,
          account_locked_until = NULL,
          last_login_at = NOW()
      WHERE id = ${user.id}
    `;

    await logAuditEvent('login', 'success', user.id, ipAddress);

    return NextResponse.json({
      message: 'Login successful',
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

### Step 4: Cron Jobs

#### `src/api/cron/cleanup-sessions.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await sql`SELECT cleanup_expired_sessions()`;

    return NextResponse.json({
      message: 'Expired sessions cleaned up',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Cleanup failed' },
      { status: 500 }
    );
  }
}
```

#### `vercel.json` (Cron Configuration)
```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup-sessions",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/cron/cleanup-tokens",
      "schedule": "0 0 * * *"
    }
  ]
}
```

---

### Step 5: Environment Variables

```env
# Database
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."

# Auth
CRON_SECRET="your-cron-secret"
JWT_SECRET="your-jwt-secret" # If using JWT

# Email (for verification)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="user@example.com"
SMTP_PASS="password"
```

---

### Step 6: Testing

#### `tests/auth.test.ts`
```typescript
import { describe, it, expect } from '@jest/globals';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { generateToken, hashToken } from '@/lib/auth/tokens';

describe('Password Functions', () => {
  it('should hash and verify password', async () => {
    const password = 'SecureP@ssw0rd';
    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    expect(await verifyPassword(password, hash)).toBe(true);
    expect(await verifyPassword('wrong', hash)).toBe(false);
  });
});

describe('Token Functions', () => {
  it('should generate unique tokens', () => {
    const token1 = generateToken();
    const token2 = generateToken();

    expect(token1).not.toBe(token2);
    expect(token1.length).toBe(64);
  });

  it('should hash tokens consistently', () => {
    const token = generateToken();
    const hash1 = hashToken(token);
    const hash2 = hashToken(token);

    expect(hash1).toBe(hash2);
  });
});
```

---

## Key Implementation Notes

### Security Checklist
- [ ] Use HTTPS in production
- [ ] Set secure cookie flags (HttpOnly, Secure, SameSite)
- [ ] Implement CSRF protection
- [ ] Rate limit authentication endpoints
- [ ] Hash all tokens before storage
- [ ] Use bcrypt with 12+ salt rounds
- [ ] Validate all user inputs
- [ ] Sanitize database inputs (use parameterized queries)
- [ ] Enable audit logging for all auth events
- [ ] Implement account lockout mechanism

### Performance Checklist
- [ ] Use connection pooling
- [ ] Index all foreign keys
- [ ] Monitor query performance (< 5ms for auth)
- [ ] Cache session validation results
- [ ] Use database transactions for multi-step operations
- [ ] Implement read replicas for audit logs

### Monitoring Checklist
- [ ] Track authentication success/failure rates
- [ ] Monitor session validation latency
- [ ] Alert on brute force attempts
- [ ] Track account lockout rates
- [ ] Monitor database connection pool usage

---

## Coordination with Other Agents

### From Researcher
- Check `hive/researcher/storage-analysis` for Vercel storage recommendations

### For Tester
- Store test scenarios in `hive/coder/test-requirements`
- Document edge cases for testing

### For Reviewer
- Store implementation decisions in `hive/coder/implementation-log`
- Document security considerations

---

## Next Steps

1. Review this implementation guide
2. Implement core libraries (`lib/auth/`)
3. Build API endpoints (`api/auth/`)
4. Set up cron jobs
5. Write tests
6. Security review
7. Load testing
8. Deploy to Vercel

---

**Implementation Status**: Ready for Coder Agent
**Schema Status**: ✅ Complete
**Documentation Status**: ✅ Complete
**Coordination**: Active in Hive Mind collective
