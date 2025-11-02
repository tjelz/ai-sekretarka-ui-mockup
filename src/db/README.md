# Database Schema Documentation

## Overview

This directory contains the complete database schema for user authentication, designed for **Vercel Postgres** storage with a focus on security, performance, and scalability.

## Schema Design Principles

1. **Security First**: All sensitive data is properly hashed/encrypted
2. **Audit Trail**: Complete logging of authentication events
3. **Performance Optimized**: Strategic indexes for common query patterns
4. **Soft Deletes**: User data preservation with `deleted_at` timestamps
5. **Token Security**: Multiple token types with proper expiration
6. **Account Protection**: Failed login tracking and account lockout

## Database Tables

### Core Tables

#### 1. `users`
**Purpose**: Core user authentication and profile data

**Key Columns**:
- `id` (UUID): Primary identifier
- `email` (VARCHAR): Unique, validated email address
- `password_hash` (TEXT): bcrypt hash (12+ salt rounds)
- `failed_login_attempts` (INTEGER): Brute force protection
- `account_locked_until` (TIMESTAMP): Temporary account locks
- `two_factor_enabled` (BOOLEAN): 2FA status

**Indexes**:
- `idx_users_email`: Fast email lookups (excluding deleted)
- `idx_users_created_at`: Chronological user queries
- `idx_users_last_login`: Activity tracking
- `idx_users_account_locked`: Locked account queries

**Security Features**:
- Email format validation via CHECK constraint
- Failed attempt limits (0-10)
- Soft delete support
- Password change tracking

---

#### 2. `sessions`
**Purpose**: Manage active user sessions with token-based authentication

**Key Columns**:
- `id` (UUID): Session identifier
- `user_id` (UUID): Foreign key to users
- `token_hash` (TEXT): SHA-256 hashed session token
- `refresh_token_hash` (TEXT): Refresh token for renewal
- `expires_at` (TIMESTAMP): Session expiration
- `ip_address` (INET): Client IP for anomaly detection
- `device_fingerprint` (TEXT): Browser/device identification

**Indexes**:
- `idx_sessions_user_id`: User's active sessions
- `idx_sessions_token_hash`: Fast token validation
- `idx_sessions_expires_at`: Expiration queries
- `idx_sessions_active`: Composite index for active session queries

**Features**:
- Token rotation support
- Session revocation
- Activity tracking
- Multi-device support

---

#### 3. `password_reset_tokens`
**Purpose**: Secure password reset flow with time-limited tokens

**Key Columns**:
- `token_hash` (TEXT): Hashed reset token
- `expires_at` (TIMESTAMP): Typically 1 hour expiration
- `used_at` (TIMESTAMP): One-time use tracking

**Indexes**:
- `idx_reset_tokens_hash`: Fast token lookup
- `idx_reset_tokens_expires`: Cleanup queries

**Security**:
- Short expiration window (1 hour recommended)
- One-time use enforcement
- IP tracking for auditing

---

#### 4. `email_verification_tokens`
**Purpose**: Email verification workflow

**Key Columns**:
- `token_hash` (TEXT): Hashed verification token
- `email` (VARCHAR): Email being verified
- `expires_at` (TIMESTAMP): 24-hour expiration

**Features**:
- Supports email change verification
- Prevents email hijacking
- Automatic cleanup of expired tokens

---

#### 5. `audit_logs`
**Purpose**: Security audit trail for all authentication events

**Key Columns**:
- `event_type` (VARCHAR): Event classification
- `event_status` (VARCHAR): success/failure/blocked
- `details` (JSONB): Flexible event metadata

**Supported Events**:
- login, logout
- password_change, password_reset_request
- email_verification
- account_locked, account_unlocked
- 2fa_enabled, 2fa_disabled
- session_revoked

**Indexes**:
- `idx_audit_user_id`: Per-user audit trails
- `idx_audit_event_type`: Event type filtering
- `idx_audit_ip_address`: IP-based analysis

---

#### 6. `refresh_tokens`
**Purpose**: Enhanced security with token rotation

**Key Columns**:
- `parent_token_hash` (TEXT): Token family tracking
- `used_at` (TIMESTAMP): Rotation detection

**Features**:
- Automatic token rotation
- Token family tracking
- Refresh token reuse detection

---

## Database Views

### `active_sessions`
Returns all currently active user sessions with user details.

```sql
SELECT * FROM active_sessions WHERE user_id = $1;
```

### `user_security_status`
Comprehensive security status per user including:
- Failed login attempts
- Account lock status
- 2FA status
- Active session count
- Last security event

```sql
SELECT * FROM user_security_status WHERE email = $1;
```

---

## Automated Functions

### `update_updated_at_column()`
**Trigger**: Automatically updates `updated_at` timestamp on user record changes

### `cleanup_expired_sessions()`
**Purpose**: Mark expired sessions as inactive
**Recommended Schedule**: Every 5 minutes via cron job

```sql
SELECT cleanup_expired_sessions();
```

### `cleanup_expired_tokens()`
**Purpose**: Delete old expired tokens (7-30 day retention)
**Recommended Schedule**: Daily via cron job

```sql
SELECT cleanup_expired_tokens();
```

---

## Migration Strategy

### Files
- `migrations/001_initial_schema.sql`: Forward migration
- `migrations/rollback_001.sql`: Rollback migration

### Applying Migration (Vercel Postgres)

```bash
# Using Vercel CLI
vercel env pull .env.local
psql $POSTGRES_URL -f src/db/migrations/001_initial_schema.sql

# Or using Node.js migration script
npm run db:migrate
```

### Rollback

```bash
psql $POSTGRES_URL -f src/db/migrations/rollback_001.sql
```

---

## Performance Optimization

### Index Strategy

1. **Partial Indexes**: Only index active/non-deleted records
   ```sql
   CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
   ```

2. **Composite Indexes**: Optimize multi-column queries
   ```sql
   CREATE INDEX idx_sessions_active ON sessions(user_id, is_active, expires_at);
   ```

3. **DESC Indexes**: Optimize chronological queries
   ```sql
   CREATE INDEX idx_users_created_at ON users(created_at DESC);
   ```

### Query Patterns

**Optimized for**:
- User login/authentication (< 10ms)
- Session validation (< 5ms)
- Active session lookup (< 10ms)
- Security audit queries (< 50ms)

**Recommended Connection Pooling**:
- Min connections: 2
- Max connections: 10
- Idle timeout: 30s

---

## Security Best Practices

### Password Storage
```javascript
// bcrypt with 12+ salt rounds
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 12);
```

### Token Generation
```javascript
// Cryptographically secure random tokens
const crypto = require('crypto');
const token = crypto.randomBytes(32).toString('hex');
const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
```

### Session Management
- Access token: 15 minutes expiration
- Refresh token: 7 days expiration
- Implement token rotation on refresh
- Revoke all sessions on password change

### Rate Limiting
- Failed login attempts: 5 per 15 minutes
- Account lockout: 30 minutes after 5 failures
- Password reset requests: 3 per hour
- Email verification: 5 per day

---

## Maintenance Tasks

### Daily Tasks
```sql
-- Cleanup expired tokens
SELECT cleanup_expired_tokens();

-- Archive old audit logs (optional)
DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL '90 days';
```

### Weekly Tasks
```sql
-- Analyze query performance
ANALYZE users;
ANALYZE sessions;
ANALYZE audit_logs;

-- Check for unused indexes
SELECT * FROM pg_stat_user_indexes WHERE idx_scan = 0;
```

### Monthly Tasks
```sql
-- Vacuum full on large tables
VACUUM FULL audit_logs;

-- Review security metrics
SELECT event_type, event_status, COUNT(*)
FROM audit_logs
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY event_type, event_status;
```

---

## Integration with Vercel

### Environment Variables

```env
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
```

### Connection Example

```javascript
import { sql } from '@vercel/postgres';

// Query with prepared statements
const result = await sql`
  SELECT * FROM users WHERE email = ${email} AND deleted_at IS NULL
`;
```

### Deployment

1. Create Vercel Postgres database in dashboard
2. Link to your project
3. Run migrations
4. Set up cron jobs for cleanup tasks
5. Monitor performance via Vercel dashboard

---

## Monitoring & Alerts

### Key Metrics
- Active user count
- Session count per user (detect anomalies)
- Failed login rate (detect brute force)
- Token rotation failures
- Database query performance

### Alert Thresholds
- Failed login spike: > 100/minute
- Account lockouts: > 50/hour
- Session count per user: > 10 concurrent
- Query time: > 100ms for auth queries

---

## Future Enhancements

### Planned Features
1. **OAuth Integration Table**: Support for social login
2. **API Keys Table**: Service-to-service authentication
3. **Device Tracking**: Enhanced multi-device management
4. **Geolocation**: IP-based location tracking
5. **Passwordless Auth**: Magic link support

### Scalability Considerations
- Read replicas for audit logs
- Partitioning for large audit_logs table
- Redis caching for session validation
- CDN for static user assets

---

## Support & Resources

- **Vercel Postgres Docs**: https://vercel.com/docs/storage/vercel-postgres
- **Security Best Practices**: OWASP Authentication Cheat Sheet
- **Schema Version**: 1.0.0
- **Last Updated**: 2025-11-01

---

## Contributing

When modifying the schema:
1. Create new migration file with incremented version
2. Update this README with changes
3. Test rollback script
4. Update seed data if needed
5. Document breaking changes
