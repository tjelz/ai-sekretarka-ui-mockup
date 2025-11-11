# Robots.txt Analysis Report
**Project:** Yieldo.pl - AI Sekretarka
**Date:** 2025-11-11
**File:** `/src/app/robots.ts` (Next.js 15 dynamic robots.txt)

---

## Executive Summary

✅ **Overall Status:** MOSTLY GOOD with some optimization opportunities
⚠️ **Security Risk Level:** LOW (minor improvements recommended)
🎯 **SEO Impact:** MODERATE (configuration conflicts detected)

---

## 1. Syntax Validation

### ✅ Valid Syntax Elements
- Proper Next.js 15 `MetadataRoute.Robots` format
- Valid User-Agent declarations
- Correct Allow/Disallow syntax
- Sitemap URL properly formatted
- Host directive included

### ⚠️ Syntax Issues Found

#### Issue 1: Regex Pattern Syntax
```typescript
// LINE 17-18: Invalid regex syntax in robots.txt
disallow: [
  '/*.json$',      // ❌ Robots.txt doesn't support regex
  '/*?*utm_*',     // ❌ Invalid pattern syntax
],
```

**Problem:** Robots.txt standard (RFC 9309) doesn't support regex patterns like `$` or complex wildcards.

**Fix:**
```typescript
disallow: [
  '/*.json',       // ✅ Correct: blocks all .json files
  '/*?utm_',       // ✅ Correct: blocks URLs with utm_ parameters
],
```

#### Issue 2: crawlDelay Deprecated
```typescript
// LINE 30: crawlDelay is not officially supported by Google
crawlDelay: 0,
```

**Problem:** Google ignores `crawlDelay`. Use Google Search Console instead.

---

## 2. Configuration Conflicts

### 🚨 Critical Conflict: Dashboard in Sitemap but Blocked

**Sitemap includes:**
```typescript
// sitemap.ts lines 83-114
{
  url: `${baseUrl}/dashboard`,           // Priority 0.5
  url: `${baseUrl}/dashboard/analytics`, // Priority 0.4
  url: `${baseUrl}/dashboard/agents`,    // Priority 0.4
  url: `${baseUrl}/dashboard/billing`,   // Priority 0.4
  url: `${baseUrl}/dashboard/settings`,  // Priority 0.3
}
```

**robots.ts blocks:**
```typescript
// robots.ts line 13
disallow: ['/dashboard/']
```

**Impact:**
- 🔴 Google discovers URLs in sitemap but can't crawl them
- 🔴 Wasted crawl budget
- 🔴 Potential Search Console warnings
- 🔴 Confusing signals to search engines

**Recommendation:** Remove dashboard routes from sitemap OR allow crawling with `noindex` meta tags.

---

## 3. Security Assessment

### ✅ Good Security Practices
1. ✅ `/api/` blocked - prevents API endpoint enumeration
2. ✅ `/admin/` blocked - protects admin interface
3. ✅ `/private/` blocked - hides sensitive content
4. ✅ `/_next/` blocked - prevents build artifact access
5. ✅ Aggressive bot blocking (AhrefsBot, SemrushBot, etc.)

### ⚠️ Security Gaps

#### Missing Blocks
```typescript
// Should add:
disallow: [
  '/api/',
  '/dashboard/',
  '/admin/',
  '/private/',
  '/_next/',
  '/login/',        // ⚠️ MISSING: Exposes login page to crawlers
  '/register/',     // ⚠️ MISSING: If exists
  '/.env',          // ⚠️ MISSING: Environment files
  '/.git',          // ⚠️ MISSING: Version control
  '/config/',       // ⚠️ MISSING: Configuration files
],
```

#### Exposure Risks
1. **Login Page Exposed:**
   - File: `/src/app/login/page.tsx`
   - Risk: Crawler can index login page
   - Impact: Unnecessary in search results, potential attack surface
   - Fix: Add `/login/` to disallow list

2. **Static Files:**
   - File: `/public/llms.txt`
   - Risk: Currently crawlable (intended?)
   - Impact: May expose AI integration details
   - Fix: Block if sensitive: `Disallow: /llms.txt`

3. **API Endpoints Listed in Grep:**
   - `/api/contact/route.ts`
   - `/api/auth/[...nextauth]/route.ts`
   - `/api/auth/register/route.ts`
   - `/api/elevenlabs/agents/route.ts`
   - `/api/stripe/checkout/route.ts`
   - `/api/stripe/webhooks/route.ts`
   - Status: ✅ Protected by `/api/` disallow

---

## 4. SEO Optimization Recommendations

### Priority 1: Fix Dashboard Conflict

**Option A: Remove from Sitemap (Recommended)**
```typescript
// sitemap.ts - REMOVE these lines (83-114)
// Dashboard routes should NOT be in public sitemap
// They require authentication and show maintenance
```

**Option B: Allow with Noindex (Alternative)**
```typescript
// dashboard/layout.tsx
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
```

### Priority 2: Add Missing Blocks

```typescript
// robots.ts - Enhanced rules
rules: [
  {
    userAgent: '*',
    allow: '/',
    disallow: [
      '/api/',
      '/dashboard/',
      '/_next/',
      '/admin/',
      '/private/',
      '/login/',          // 🆕 Add this
      '/*.json',          // 🔧 Fixed syntax
      '/*?utm_',          // 🔧 Fixed syntax
      '/config/',         // 🆕 Add if exists
      '/.env',            // 🆕 Security
    ],
  },
  {
    userAgent: 'Googlebot',
    allow: '/',
    disallow: [
      '/api/',
      '/dashboard/',
      '/_next/',
      '/admin/',
      '/login/',          // 🆕 Add this
    ],
    // Remove crawlDelay: 0 - not supported
  },
  // ... rest of config
],
```

### Priority 3: Remove crawlDelay

```typescript
// Remove this line (not supported by Google):
// crawlDelay: 0,
```

### Priority 4: Enhance Sitemap

```typescript
// sitemap.ts - Only include public routes
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,        // ✅ Keep
    ...policyRoutes,        // ✅ Keep
    // ...dashboardRoutes,  // ❌ Remove - authenticated routes
  ];
}
```

---

## 5. Best Practices Checklist

### ✅ Implemented
- [x] Sitemap URL present
- [x] Host directive included
- [x] User-agent specific rules (Googlebot, Googlebot-Image)
- [x] API routes protected
- [x] Admin routes blocked
- [x] Aggressive bot blocking
- [x] Next.js 15 dynamic generation

### ❌ Missing / Needs Fix
- [ ] Login page blocked
- [ ] Dashboard removed from sitemap
- [ ] Regex syntax fixed
- [ ] crawlDelay removed
- [ ] Maintenance status communicated
- [ ] Crawler testing performed

---

## 6. Maintenance Page Considerations

**Current Status:** Dashboard shows maintenance notice
**File:** `/src/app/dashboard/page.tsx`

### Should Crawlers Access Maintenance Pages?

**Recommendation: NO**

**Reasons:**
1. ✅ Already blocked by `/dashboard/` disallow
2. 🎯 No SEO value during maintenance
3. 🚫 Prevents "coming soon" indexing issues
4. 💡 Use HTTP 503 status + Retry-After header instead

**Better Implementation:**
```typescript
// dashboard/page.tsx or middleware
if (maintenanceMode) {
  return new Response('Under Maintenance', {
    status: 503,
    headers: {
      'Retry-After': '3600', // 1 hour
      'Content-Type': 'text/html',
    },
  });
}
```

---

## 7. Proposed Improved robots.ts

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.yieldo.pl';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/login/',          // 🆕 Block login page
          '/_next/',
          '/admin/',
          '/private/',
          '/*.json',          // 🔧 Fixed regex syntax
          '/*?utm_',          // 🔧 Fixed regex syntax
          '/.env*',           // 🆕 Environment files
          '/.git*',           // 🆕 Version control
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/login/',          // 🆕 Block login page
          '/_next/',
          '/admin/',
        ],
        // 🗑️ Removed crawlDelay (not supported)
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [
          '/private/',
          '/dashboard/',     // 🆕 No need to crawl dashboard images
        ],
      },
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'SEOkicks',        // 🆕 Additional aggressive crawler
          'DataForSeoBot',   // 🆕 Additional aggressive crawler
        ],
        disallow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    host: baseUrl,
  };
}
```

---

## 8. Implementation Priority

### 🔴 High Priority (Fix Immediately)
1. **Remove dashboard routes from sitemap** (Major SEO issue)
2. **Fix regex syntax** (`/*.json$` → `/*.json`)
3. **Add /login/ to disallow list** (Security + SEO)

### 🟡 Medium Priority (Next Sprint)
4. Remove `crawlDelay` directive
5. Add `.env*` and `.git*` blocks
6. Implement HTTP 503 for maintenance pages
7. Add more aggressive bots to blocklist

### 🟢 Low Priority (Future Enhancement)
8. Set up Google Search Console monitoring
9. Implement dynamic robots.txt based on environment
10. Add crawl rate limiting in Search Console
11. Create robots.txt testing suite

---

## 9. Testing Recommendations

### Manual Testing
```bash
# Test robots.txt rendering
curl https://www.yieldo.pl/robots.txt

# Validate syntax
curl https://www.yieldo.pl/robots.txt | grep -E "^(User-agent|Allow|Disallow|Sitemap|Host):"

# Check sitemap URLs
curl https://www.yieldo.pl/sitemap.xml | grep "<loc>"
```

### Automated Testing
```bash
# Google's robots.txt Tester (Search Console)
# https://search.google.com/search-console/robots-testing-tool

# Test specific URLs:
# - https://www.yieldo.pl/dashboard (should be blocked)
# - https://www.yieldo.pl/login (should be blocked after fix)
# - https://www.yieldo.pl/api/contact (should be blocked)
# - https://www.yieldo.pl/ (should be allowed)
```

---

## 10. Monitoring & Maintenance

### Monthly Checks
- [ ] Verify no new sensitive routes exposed
- [ ] Check Search Console for blocked URL warnings
- [ ] Review crawl stats and errors
- [ ] Update aggressive bot list

### After Deployment
- [ ] Submit sitemap to Google Search Console
- [ ] Test robots.txt in Search Console robots tester
- [ ] Monitor crawl rate and errors
- [ ] Verify dashboard not appearing in search results

---

## Summary of Issues

| Issue | Severity | Impact | Effort |
|-------|----------|--------|--------|
| Dashboard in sitemap but blocked | 🔴 High | SEO confusion | Low |
| Regex syntax errors | 🟡 Medium | Pattern not working | Low |
| Login page not blocked | 🟡 Medium | Unnecessary indexing | Low |
| crawlDelay directive | 🟢 Low | Ignored by Google | Low |
| Missing .env/.git blocks | 🟡 Medium | Security gap | Low |

**Total Issues:** 5
**Total Time to Fix:** ~30 minutes
**Expected SEO Impact:** Positive (reduced confusion, better crawl efficiency)

---

## Conclusion

The current robots.txt implementation is **functional but needs optimization**. The most critical issue is the sitemap/robots.txt conflict around dashboard routes. This should be fixed immediately to prevent Search Console warnings and wasted crawl budget.

The security posture is good, with appropriate blocking of sensitive routes, though adding `/login/` block would further improve it.

After implementing the recommended changes, the site will have a robust robots.txt configuration that properly guides search engines while protecting authenticated and sensitive areas.
