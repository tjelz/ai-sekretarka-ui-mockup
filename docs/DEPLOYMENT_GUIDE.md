# 🚀 Authentication System Deployment Guide

## Overview

This guide covers deploying the complete authentication system built by the Hive Mind collective intelligence to Vercel with PostgreSQL and KV storage.

## Prerequisites

- Vercel account
- Vercel CLI installed (`npm i -g vercel`)
- Node.js 18+ installed
- Git repository connected to Vercel

## Quick Start (5 minutes)

```bash
# 1. Login to Vercel
vercel login

# 2. Link your project
vercel link

# 3. Create Vercel Postgres database
vercel storage create postgres

# 4. Create Vercel KV store
vercel storage create kv

# 5. Pull environment variables
vercel env pull .env.local

# 6. Add JWT secret to .env.local
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env.local

# 7. Deploy to Vercel
vercel --prod
```

## Detailed Setup Steps

### 1. Database Setup

#### Create Vercel Postgres Database

```bash
vercel storage create postgres
```

Follow the prompts:
- Select your project
- Choose a region (closest to your users)
- Name: `auth-db` (or your preference)

This automatically adds these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

#### Initialize Database Schema

The schema is automatically created on first connection by the application. To manually initialize:

```bash
# Connect to your Vercel Postgres
psql $(vercel env get POSTGRES_URL)

# Run the schema
\i src/db/schema.sql

# Verify tables
\dt
```

### 2. Session Storage Setup

#### Create Vercel KV Store

```bash
vercel storage create kv
```

Follow the prompts:
- Select your project
- Choose a region (same as Postgres for lower latency)
- Name: `auth-sessions` (or your preference)

This automatically adds:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 3. Environment Variables

#### Required Variables

Create `.env.local` file:

```bash
# Database (auto-populated by Vercel)
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."

# KV Storage (auto-populated by Vercel)
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."

# JWT Secret (REQUIRED - generate manually)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"

# Optional: Production URL
NEXTAUTH_URL="https://yourdomain.com"
```

#### Generate Secure JWT Secret

```bash
# macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add the generated secret to `.env.local` and Vercel:

```bash
vercel env add JWT_SECRET production
# Paste the generated secret when prompted
```

### 4. Deploy to Vercel

#### Preview Deployment (Test First)

```bash
vercel
```

This creates a preview deployment. Test it thoroughly:
- Visit the preview URL
- Test registration
- Test login
- Test dashboard access
- Test logout

#### Production Deployment

Once preview is validated:

```bash
vercel --prod
```

### 5. Post-Deployment Verification

#### Health Check

```bash
# Check API health
curl https://yourdomain.com/api/auth/me

# Should return 401 (unauthorized) if not logged in
```

#### Test Registration

```bash
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "name": "Test User"
  }'
```

#### Test Login

```bash
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

### 6. Database Monitoring

#### Access Vercel Dashboard

```bash
vercel storage ls
```

Or visit: https://vercel.com/dashboard/stores

Monitor:
- Connection pool usage
- Query performance
- Storage size
- Active sessions

#### Run Maintenance Tasks

Set up cron jobs in `vercel.json`:

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

## Security Checklist

Before going live, ensure:

- [ ] JWT_SECRET is strong (32+ random characters)
- [ ] Environment variables are set in Vercel (not in code)
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] SQL injection protection is verified
- [ ] XSS protection headers are set
- [ ] CSRF protection is enabled
- [ ] Session timeout is configured
- [ ] Password requirements are enforced
- [ ] Error messages don't leak sensitive info

## Performance Optimization

### Enable Edge Runtime (Optional)

For faster cold starts, add to API routes:

```typescript
export const runtime = 'edge';
```

### Configure Caching

Add to `next.config.js`:

```javascript
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  headers: async () => [
    {
      source: '/api/auth/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, must-revalidate',
        },
      ],
    },
  ],
};
```

### Database Connection Pooling

Vercel Postgres uses PgBouncer automatically. Monitor connection usage:

```bash
vercel logs --follow
```

## Troubleshooting

### Common Issues

#### "Database connection failed"

```bash
# Check environment variables
vercel env ls

# Pull latest variables
vercel env pull .env.local

# Test connection
psql $(vercel env get POSTGRES_URL)
```

#### "JWT verification failed"

- Ensure JWT_SECRET matches between deployments
- Check token expiration (default 7 days)
- Verify cookies are being sent (check browser DevTools)

#### "Rate limit exceeded"

- Check KV storage connection
- Verify KV_REST_API_URL and KV_REST_API_TOKEN
- Monitor Redis usage in Vercel dashboard

#### "Session not persisting"

- Verify cookies are set (check Set-Cookie header)
- Ensure httpOnly and secure flags are correct
- Check domain configuration for cookies

### Logs and Monitoring

```bash
# View real-time logs
vercel logs --follow

# View specific function logs
vercel logs --follow api/auth/login

# Download logs
vercel logs > auth-logs.txt
```

## Scaling Considerations

### Database Scaling

Vercel Postgres auto-scales. Monitor:
- Query performance (aim for <50ms p95)
- Connection pool saturation
- Storage growth

Upgrade plan if:
- Queries exceed 100ms consistently
- Connection pool hits 100% usage
- Storage exceeds plan limits

### KV Scaling

Vercel KV auto-scales. Monitor:
- Request rate
- Storage size
- Latency

### Application Scaling

Vercel auto-scales serverless functions:
- No configuration needed
- Pay per execution
- Monitor function duration and memory

## Backup and Recovery

### Database Backups

Vercel Postgres includes automatic daily backups (retained 7 days).

Manual backup:

```bash
# Export database
pg_dump $(vercel env get POSTGRES_URL) > backup.sql

# Import (if needed)
psql $(vercel env get POSTGRES_URL) < backup.sql
```

### KV Backups

Export sessions (if needed):

```bash
# Use Vercel KV dashboard or Redis CLI
redis-cli -u $(vercel env get KV_URL) --scan > kv-backup.txt
```

## Rollback Procedure

If deployment fails:

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

Database rollback:

```bash
# Run rollback migration
psql $(vercel env get POSTGRES_URL) < src/db/migrations/rollback_001.sql
```

## Monitoring and Alerts

### Set Up Alerts

In Vercel Dashboard:
1. Go to Project Settings
2. Navigate to Monitoring
3. Configure alerts for:
   - High error rate (>1%)
   - Slow response time (>1s p95)
   - High memory usage (>80%)

### Custom Monitoring

Integrate with monitoring services:
- Sentry for error tracking
- LogRocket for session replay
- Datadog for metrics

## Support and Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
- **Vercel KV**: https://vercel.com/docs/storage/vercel-kv
- **Project Docs**: `/docs/AUTH_SETUP.md`
- **Implementation Guide**: `/docs/AUTH_IMPLEMENTATION.md`

## Success Metrics

After deployment, monitor:
- Registration success rate (aim for >95%)
- Login success rate (aim for >98%)
- Average response time (<200ms)
- Error rate (<0.1%)
- Session persistence (>90% users stay logged in)

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure custom domain
3. Implement email verification
4. Add password reset functionality
5. Set up OAuth providers (Google, GitHub)
6. Implement role-based access control
7. Add audit logging
8. Configure backup procedures

---

**Deployment Complete!** 🎉

Your authentication system is now live and ready for production use.
