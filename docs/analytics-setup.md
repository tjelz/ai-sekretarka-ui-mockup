# Google Analytics 4 (GA4) Setup Guide

This guide will walk you through setting up Google Analytics 4 for your AI Sekretarka application.

## Table of Contents
1. [Creating a GA4 Account](#creating-a-ga4-account)
2. [Getting Your Measurement ID](#getting-your-measurement-id)
3. [Environment Variable Configuration](#environment-variable-configuration)
4. [Verifying the Integration](#verifying-the-integration)
5. [Testing in Development vs Production](#testing-in-development-vs-production)
6. [Troubleshooting](#troubleshooting)

---

## Creating a GA4 Account

### Step 1: Access Google Analytics
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Start measuring"** or **"Admin"** (gear icon in bottom left)

### Step 2: Create a Property
1. Click **"Create Property"** in the Admin section
2. Enter your property details:
   - **Property name**: "AI Sekretarka" (or your preferred name)
   - **Reporting time zone**: Select your timezone (e.g., Europe/Warsaw)
   - **Currency**: Select your currency (e.g., PLN)
3. Click **"Next"**

### Step 3: Configure Property Settings
1. Fill in business information:
   - **Industry category**: Select relevant category (e.g., "Technology" or "Business & Industrial")
   - **Business size**: Select appropriate size
2. Select your business objectives (choose all that apply):
   - "Examine user behavior"
   - "Measure advertising ROI"
   - "Baseline reports"
3. Click **"Create"** and accept the Terms of Service

### Step 4: Set Up Data Stream
1. Select **"Web"** as your platform
2. Enter your website details:
   - **Website URL**: `https://aisekretarka.pl` (your production domain)
   - **Stream name**: "AI Sekretarka Website"
3. **Optional**: Enable enhanced measurement (recommended):
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Form interactions
   - ✅ Video engagement
4. Click **"Create stream"**

---

## Getting Your Measurement ID

### Method 1: From Data Stream Details
1. After creating the data stream, you'll see **"Web stream details"**
2. Look for **"Measurement ID"** at the top right
3. It will be in the format: `G-XXXXXXXXXX`
4. Click the copy icon to copy it

### Method 2: From Admin Panel
1. Go to **Admin** (gear icon in bottom left)
2. Under **Property** column, click **"Data Streams"**
3. Click on your web stream name
4. Find **"Measurement ID"** in the top right corner
5. Copy the ID (format: `G-XXXXXXXXXX`)

**Example Measurement ID**: `G-12345ABCDE`

---

## Environment Variable Configuration

### Step 1: Create Environment File

1. **Create `.env.local` file** in the root of your project:
   ```bash
   # In project root directory
   touch .env.local
   ```

2. **Add your Measurement ID** to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   Replace `G-XXXXXXXXXX` with your actual Measurement ID from GA4.

### Step 2: Verify .env.example

Check that `.env.example` exists with template:
```env
# Google Analytics 4 Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3: Understand the Variable Name

**Important**: The `NEXT_PUBLIC_` prefix is required for Next.js:
- ✅ `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Accessible in browser
- ❌ `GA_MEASUREMENT_ID` - Only accessible server-side

### Example Configuration

```env
# .env.local (for local development)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ

# .env.production (for production deployment)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PROD456DEF
```

### Step 4: Git Security

**Important**: Never commit `.env.local` to version control!

Verify `.gitignore` contains:
```gitignore
# Environment variables
.env*.local
.env.local
.env.production.local
.env.development.local
```

---

## Verifying the Integration

### Method 1: Browser Developer Tools (Real-time)

1. **Open your application** in a browser
2. **Open Developer Tools** (F12 or right-click → Inspect)
3. Go to **Network** tab
4. Filter by **"collect"** or **"google-analytics"**
5. Refresh the page
6. Look for requests to:
   - `https://www.google-analytics.com/g/collect`
   - `https://www.googletagmanager.com/gtag/js`

7. **Check the request**:
   - Click on the `collect` request
   - Go to **Payload** or **Query String Parameters**
   - Verify `tid` parameter matches your Measurement ID: `tid=G-XXXXXXXXXX`

### Method 2: Google Analytics Realtime Reports

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Navigate to **Reports** → **Realtime**
4. Open your website in a new browser tab
5. Within 30 seconds, you should see:
   - Active users count increase
   - Your page view in the "Page title and screen name" card
   - Location data (if enabled)

### Method 3: Google Tag Assistant (Chrome Extension)

1. Install [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Open your website
3. Click the Tag Assistant icon
4. Click **"Enable"** and refresh the page
5. You should see:
   - ✅ **Google Analytics: GA4** tag detected
   - Tag status: **"Working"** (green)
   - Measurement ID displayed

### Method 4: Browser Console Check

1. Open your website
2. Open Developer Tools → **Console** tab
3. Type and run:
   ```javascript
   console.log(window.gtag)
   ```
4. If GA4 is loaded, you should see a function definition
5. Check the Measurement ID:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
   ```

---

## Testing in Development vs Production

### Development Environment

**Local Testing (http://localhost:3000)**

1. **Create `.env.local`** with your GA4 ID:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Verify in console**:
   - Open browser console
   - You should see GA4 events being tracked
   - Check Network tab for `collect` requests

4. **Optional: Use separate GA4 property**:
   - Create a separate GA4 property for development
   - Use different Measurement ID in `.env.local`
   - This prevents development traffic from polluting production data

**Best Practice**:
```env
# .env.local (development)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DEV123ABC

# .env.production (production)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PROD456XYZ
```

### Production Environment

**Deployment Platforms**

#### Vercel
1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add variable:
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX`
   - **Environment**: Select **Production** (and optionally Preview)
4. Click **"Save"**
5. **Redeploy** your application

#### Netlify
1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Add variable"**
3. Add:
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX`
4. Click **"Save"**
5. Trigger a new deployment

#### Other Platforms
- Ensure the environment variable is set in your hosting platform's settings
- Redeploy after adding the variable
- Most platforms support `.env.production` file or environment variable configuration

### Testing Strategy

**Development Testing Checklist**:
- [ ] Verify GA4 loads without errors
- [ ] Check page views are tracked
- [ ] Test button clicks and events
- [ ] Verify console shows no GA4 errors
- [ ] Use GA4 Realtime reports to confirm tracking

**Production Testing Checklist**:
- [ ] Deploy with production Measurement ID
- [ ] Clear browser cache and cookies
- [ ] Visit production URL
- [ ] Verify Realtime reports show activity
- [ ] Check 24-48 hours for full reports
- [ ] Test from different devices/browsers
- [ ] Verify all custom events are tracked

---

## Troubleshooting

### Issue 1: GA4 Not Loading

**Symptoms**:
- No `gtag` function in console
- No requests to `google-analytics.com` in Network tab
- Realtime reports show 0 users

**Solutions**:
1. **Check environment variable**:
   ```bash
   # In terminal
   echo $NEXT_PUBLIC_GA_MEASUREMENT_ID
   ```

2. **Verify variable format**:
   - Must start with `G-`
   - Format: `G-XXXXXXXXXX` (10 characters after `G-`)

3. **Restart development server**:
   ```bash
   # Stop server (Ctrl+C) and restart
   npm run dev
   ```

4. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

5. **Check for typos**:
   - Variable name must be exactly: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Note the underscore `_` characters

### Issue 2: Events Not Appearing in GA4

**Symptoms**:
- GA4 loads but no events are tracked
- Realtime reports show users but no events

**Solutions**:
1. **Check ad blockers**:
   - Disable browser extensions (uBlock Origin, AdBlock Plus, etc.)
   - Test in incognito/private browsing mode

2. **Verify data stream is active**:
   - Go to GA4 Admin → Data Streams
   - Ensure stream status is "Active"

3. **Wait for data processing**:
   - Realtime: Appears within 30 seconds
   - Standard reports: Can take 24-48 hours

4. **Check browser console for errors**:
   ```javascript
   // Look for errors related to gtag or analytics
   ```

### Issue 3: Wrong Measurement ID

**Symptoms**:
- Events go to wrong GA4 property
- Data appears in unexpected property

**Solutions**:
1. **Double-check Measurement ID**:
   - Go to GA4 Admin → Data Streams
   - Copy the correct Measurement ID

2. **Update `.env.local`**:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-CORRECTID123
   ```

3. **Restart server** and clear browser cache

### Issue 4: Environment Variable Not Working in Production

**Symptoms**:
- Works locally but not in production
- Production site shows no GA4 tracking

**Solutions**:
1. **Verify deployment platform environment variables**:
   - Check Vercel/Netlify/your host's environment variables
   - Ensure `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set

2. **Redeploy after adding variable**:
   - Environment variables require a new deployment

3. **Check build logs**:
   - Look for environment variable warnings
   - Verify variable is available during build

4. **Test with build locally**:
   ```bash
   npm run build
   npm run start
   # Visit http://localhost:3000 and test
   ```

### Issue 5: Data Privacy/GDPR Concerns

**Solutions**:
1. **Implement consent banner** (if required by EU law):
   - Use libraries like `react-cookie-consent`
   - Only load GA4 after user consent

2. **Anonymize IP addresses** (enabled by default in GA4):
   - GA4 automatically anonymizes IPs

3. **Configure data retention**:
   - Go to GA4 Admin → Data Settings → Data Retention
   - Set appropriate retention period (2-14 months)

4. **Add privacy policy**:
   - Inform users about analytics tracking
   - Provide opt-out instructions

### Issue 6: Multiple GA4 Tags Loading

**Symptoms**:
- Duplicate events in GA4
- Multiple `gtag.js` requests

**Solutions**:
1. **Check for multiple implementations**:
   - Search codebase for `gtag` or `GA_MEASUREMENT_ID`
   - Ensure only one GA4 initialization

2. **Verify no conflicting plugins**:
   - Remove duplicate analytics plugins
   - Check for Google Tag Manager conflicts

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `gtag is not defined` | GA4 script not loaded | Check Measurement ID, verify script loading |
| `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID is undefined` | Environment variable not set | Create `.env.local` with correct variable |
| `Failed to load resource: net::ERR_BLOCKED_BY_CLIENT` | Ad blocker enabled | Disable ad blocker for testing |
| `Invalid Measurement ID format` | Wrong ID format | Ensure format is `G-XXXXXXXXXX` |

---

## Additional Resources

### Official Documentation
- [Google Analytics 4 Help Center](https://support.google.com/analytics/answer/9304153)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

### Useful Tools
- [Google Tag Assistant](https://tagassistant.google.com/) - Debug tracking
- [GA4 Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [Realtime Report](https://analytics.google.com/) - Test tracking immediately

### Best Practices
1. **Use separate properties** for development and production
2. **Test in Realtime reports** before deploying to production
3. **Document your Measurement ID** in team documentation
4. **Set up alerts** in GA4 for tracking issues
5. **Review data regularly** to ensure proper tracking

---

## Quick Reference

### File Locations
```
project-root/
├── .env.local              # Local development (DO NOT COMMIT)
├── .env.example            # Template for team
├── .env.production         # Production (if not using platform variables)
├── docs/
│   └── analytics-setup.md  # This documentation
└── .gitignore              # Must include .env*.local
```

### Key Commands
```bash
# Create environment file
touch .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm run build && npm run start

# Clear Next.js cache
rm -rf .next
```

### Environment Variable Format
```env
# Correct format
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Example with real ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ9
```

---

## Support

If you continue to experience issues after following this guide:

1. **Check Next.js documentation**: [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
2. **Review GA4 documentation**: [Google Analytics 4](https://support.google.com/analytics/answer/9304153)
3. **Contact your team lead** or project maintainer
4. **Open an issue** in the project repository with:
   - Steps to reproduce
   - Error messages
   - Screenshots of Network tab and Console
   - Environment (local/production, browser, OS)

---

**Last Updated**: 2025-11-11
**Version**: 1.0.0
