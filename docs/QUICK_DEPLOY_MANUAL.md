# 🚀 Quick Manual Deployment Guide

**Duration**: 5-10 minutes
**Method**: Vercel Web Dashboard (Recommended due to CLI issue)

## Step 1: Create Vercel Postgres Database

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard/stores
2. **Click "Create Database"**
3. **Select "Postgres"**
4. **Configure**:
   - Name: `auth-database`
   - Region: Choose closest to your users (e.g., `iad1` for US East)
   - Click "Create"
5. **Link to Project**: Select `ai-sekretarka-ui-mockup`

**Result**: Environment variables automatically added to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Step 2: Create Vercel KV Store

1. **In Vercel Dashboard**: https://vercel.com/dashboard/stores
2. **Click "Create Database"**
3. **Select "KV"**
4. **Configure**:
   - Name: `auth-sessions`
   - Region: Same as Postgres (for low latency)
   - Click "Create"
5. **Link to Project**: Select `ai-sekretarka-ui-mockup`

**Result**: Environment variables automatically added:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

## Step 3: Add JWT Secret

1. **Go to Project Settings**: https://vercel.com/dashboard
2. **Navigate to**: Your Project → Settings → Environment Variables
3. **Add New Variable**:
   - Name: `JWT_SECRET`
   - Value: Generate with command below
   - Environments: Production, Preview, Development
   - Click "Save"

**Generate JWT Secret**:
```bash
openssl rand -base64 32
```

Copy the output and paste it as the JWT_SECRET value.

## Step 4: Initialize Database Schema

**Option A: Using Vercel Postgres Dashboard**
1. Go to your Postgres database in Vercel Dashboard
2. Click "Query" tab
3. Copy contents of `src/db/schema.sql`
4. Paste and execute

**Option B: Using psql**
```bash
# Pull environment variables
vercel env pull .env.local

# Connect to database
psql $(grep POSTGRES_URL .env.local | cut -d '=' -f2)

# Run schema
\i src/db/schema.sql

# Verify tables
\dt

# Exit
\q
```

## Step 5: Deploy to Vercel

```bash
# Deploy to production
vercel --prod
```

**Or** use the GitHub integration:
1. Push code to GitHub
2. Vercel auto-deploys on push
3. Check deployment at: https://vercel.com/dashboard

## Step 6: Verify Deployment

1. **Visit your deployment URL** (shown after deploy)
2. **Test Registration**:
   - Go to `/login`
   - Click "Create account" tab
   - Register with email and password
3. **Test Login**:
   - Login with credentials
   - Should redirect to `/dashboard`
4. **Test Logout**:
   - Click "Sign Out"
   - Should redirect to `/login`

## Quick CLI Alternative (If CLI Works)

If the Vercel CLI starts working, run this one-liner:

```bash
# Create both databases and deploy
vercel postgres create auth-db && \
vercel kv create auth-sessions && \
vercel env add JWT_SECRET production && \
vercel --prod
```

## Environment Variables Checklist

After setup, verify all variables are set:

```bash
# Pull all environment variables
vercel env pull .env.local

# Check .env.local contains:
cat .env.local
```

Should see:
- ✅ `POSTGRES_URL`
- ✅ `POSTGRES_PRISMA_URL`
- ✅ `POSTGRES_URL_NON_POOLING`
- ✅ `KV_URL`
- ✅ `KV_REST_API_URL`
- ✅ `KV_REST_API_TOKEN`
- ✅ `KV_REST_API_READ_ONLY_TOKEN`
- ✅ `JWT_SECRET`

## Post-Deployment Tasks

1. **Test Authentication Flow**:
   ```bash
   # Register user
   curl -X POST https://your-domain.vercel.app/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"SecurePass123!","name":"Test User"}'

   # Login
   curl -X POST https://your-domain.vercel.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"SecurePass123!"}'
   ```

2. **Monitor Logs**:
   ```bash
   vercel logs --follow
   ```

3. **Check Database**:
   - Vercel Dashboard → Your Postgres → Insights
   - Monitor connection pool, query performance

## Troubleshooting

### "Database connection failed"
```bash
# Re-pull environment variables
vercel env pull .env.local --force

# Check connection
psql $(grep POSTGRES_URL .env.local | cut -d '=' -f2)
```

### "JWT verification failed"
- Ensure JWT_SECRET is set in Vercel project settings
- Redeploy after adding: `vercel --prod`

### "Session not persisting"
- Check KV_REST_API_TOKEN is set
- Verify cookies in browser DevTools
- Check secure flag (should be true in production)

## Next Steps

After successful deployment:
1. ✅ Set up custom domain
2. ✅ Configure monitoring and alerts
3. ✅ Implement rate limiting (see `/docs/SECURITY_ANALYSIS.md`)
4. ✅ Add email verification
5. ✅ Enable OAuth providers

## Support

- **Full Guide**: `/docs/DEPLOYMENT_GUIDE.md`
- **Security**: `/docs/SECURITY_ANALYSIS.md`
- **Database**: `/src/db/README.md`
- **Vercel Docs**: https://vercel.com/docs/storage

---

**Total Time**: 5-10 minutes
**Difficulty**: Easy
**Status**: Ready to deploy! 🚀
