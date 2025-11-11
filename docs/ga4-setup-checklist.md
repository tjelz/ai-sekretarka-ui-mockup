# GA4 Setup Checklist

## ✅ Implementation Complete

All components have been successfully created and integrated.

---

## 📋 Next Steps to Enable GA4

### 1. Get Your GA4 Measurement ID

- [ ] Go to [Google Analytics](https://analytics.google.com)
- [ ] Navigate to **Admin** (gear icon, bottom left)
- [ ] Under **Property**, click **Data Streams**
- [ ] Click on your web stream (or create one if needed)
- [ ] Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Add Environment Variable

- [ ] Open `.env.local` in your project root (or create it)
- [ ] Add the following line:
  ```bash
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```
- [ ] Replace `G-XXXXXXXXXX` with your actual measurement ID
- [ ] Save the file

**Example `.env.local`:**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ
```

> 💡 **Tip**: See `.env.local.example` for reference

### 3. Restart Development Server

- [ ] Stop your Next.js dev server (Ctrl+C)
- [ ] Start it again: `npm run dev`
- [ ] This ensures the new environment variable is loaded

### 4. Test Locally (Optional but Recommended)

- [ ] Open your browser to `http://localhost:3000`
- [ ] Open browser DevTools Console (F12)
- [ ] Navigate between pages
- [ ] Look for `[GA4] Pageview tracked: /page-path` messages
- [ ] If you don't see them, temporarily enable debug mode (see below)

**Enable Debug Mode:**
```tsx
// src/app/layout.tsx
<GoogleAnalytics debug={true} />
```

### 5. Deploy to Production

- [ ] Commit your changes (if needed)
- [ ] Deploy to your hosting platform (Vercel, etc.)
- [ ] Ensure `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in production environment variables

**For Vercel:**
1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your measurement ID
4. Redeploy your project

### 6. Verify in Google Analytics

- [ ] Visit your deployed site
- [ ] Navigate to a few pages
- [ ] Go to Google Analytics → **Reports** → **Realtime**
- [ ] You should see your visit appear within seconds
- [ ] Click around and watch events populate

> ⏱️ **Note**: Real-time reports update immediately, but standard reports can take 24-48 hours to process data.

---

## 🎯 Optional Enhancements

### Add Cookie Consent Banner

Implement GDPR-compliant cookie consent:

```tsx
// src/components/CookieConsent.tsx
'use client';

import { updateConsent } from '@/components/analytics';
import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShow(true);
    else updateConsent(consent === 'granted');
  }, []);

  const accept = () => {
    updateConsent(true);
    localStorage.setItem('cookie-consent', 'granted');
    setShow(false);
  };

  const reject = () => {
    updateConsent(false);
    localStorage.setItem('cookie-consent', 'denied');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p>Używamy ciasteczek aby poprawić Twoje doświadczenie.</p>
        <div className="flex gap-2">
          <button onClick={accept} className="bg-blue-600 px-4 py-2 rounded">
            Akceptuję
          </button>
          <button onClick={reject} className="bg-gray-600 px-4 py-2 rounded">
            Odrzucam
          </button>
        </div>
      </div>
    </div>
  );
}
```

Then add to layout:
```tsx
// src/app/layout.tsx
import { CookieConsent } from '@/components/CookieConsent';

// In body:
<CookieConsent />
```

### Track Custom Events

Add event tracking to buttons and forms:

```tsx
import { event } from '@/components/analytics';

// Track button clicks
<button onClick={() => {
  event({
    action: 'click',
    category: 'engagement',
    label: 'contact_button'
  });
}}>
  Kontakt
</button>

// Track form submissions
const handleSubmit = (e) => {
  e.preventDefault();
  event({
    action: 'submit',
    category: 'form',
    label: 'newsletter_signup'
  });
};
```

### Track Conversions

Identify key conversion events:

```tsx
// When user completes signup
event({
  action: 'signup_complete',
  category: 'conversion',
  label: 'new_user',
  value: 1
});

// When user makes purchase
event({
  action: 'purchase',
  category: 'conversion',
  label: 'subscription',
  value: 49.99
});
```

---

## 📚 Documentation Reference

All documentation is in `src/components/analytics/`:

- **README.md** - Full feature documentation
- **INTEGRATION.md** - Quick start guide
- **example-usage.tsx** - Code examples
- **GoogleAnalytics.tsx** - Main component (with inline docs)

---

## 🐛 Troubleshooting

### Events Not Showing?

**Check measurement ID:**
- Must start with `G-`
- No spaces or extra characters
- Set in `.env.local` for local dev
- Set in hosting platform for production

**Check environment variable:**
```bash
# In terminal
echo $NEXT_PUBLIC_GA_MEASUREMENT_ID
```

**Enable debug mode:**
```tsx
<GoogleAnalytics debug={true} />
```

**Check Real-Time reports:**
- Standard reports have 24-48h delay
- Real-Time reports update instantly

### TypeScript Errors?

Make sure imports are correct:
```tsx
import { GoogleAnalytics, event } from '@/components/analytics';
```

### Build Errors?

Restart dev server after adding environment variables:
```bash
npm run dev
```

---

## ✨ What's Been Created

### Files Created (1,173 lines total)
- ✅ `src/components/analytics/GoogleAnalytics.tsx` - Main component (255 lines)
- ✅ `src/components/analytics/index.ts` - Exports (22 lines)
- ✅ `src/components/analytics/README.md` - Full docs (271 lines)
- ✅ `src/components/analytics/INTEGRATION.md` - Quick start (145 lines)
- ✅ `src/components/analytics/example-usage.tsx` - Examples (363 lines)
- ✅ `docs/ga4-implementation-summary.md` - Technical summary (117 lines)
- ✅ `.env.local.example` - Environment variable example

### Features Implemented
- ✅ Automatic pageview tracking
- ✅ Custom event tracking
- ✅ E-commerce tracking
- ✅ User properties
- ✅ GDPR consent management
- ✅ TypeScript support
- ✅ Debug mode
- ✅ Environment validation

### Layout Updated
- ✅ `src/app/layout.tsx` - Component already integrated

---

## 🚀 You're Ready!

Just add your measurement ID to `.env.local` and you're all set!

**Quick command:**
```bash
echo "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX" >> .env.local
```

(Replace `G-XXXXXXXXXX` with your actual ID)

Then restart: `npm run dev`

---

## 📊 Expected Results

After setup, you'll automatically track:
- ✅ Page views on every route change
- ✅ User sessions
- ✅ Traffic sources
- ✅ User demographics (if enabled in GA4)
- ✅ Device types
- ✅ Geographic location
- ✅ Custom events (when you add them)

All data appears in Google Analytics dashboard within seconds (Real-Time) or 24-48 hours (standard reports).

---

## 🎉 Success Criteria

You'll know it's working when:
1. No errors in browser console
2. Events appear in GA4 Real-Time reports
3. Pageviews increment as you navigate
4. No TypeScript compilation errors

---

## Need Help?

- Check `src/components/analytics/README.md` for detailed docs
- Review `src/components/analytics/example-usage.tsx` for examples
- Visit [Google Analytics Help](https://support.google.com/analytics)
- Check [Next.js Documentation](https://nextjs.org/docs)

---

**Last Updated**: 2025-11-11
**Implementation Version**: 1.0.0
**Next.js Version**: 15
**GA4 API Version**: Latest (gtag.js)
