# GA4 Integration Guide

## Quick Start (3 steps)

### 1. Add Environment Variable

Create or update `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Get your measurement ID from [Google Analytics](https://analytics.google.com) → Admin → Data Streams → Web → Measurement ID

### 2. Add to Root Layout

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@/components/analytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
```

### 3. Done!

Pageviews are now tracked automatically. Deploy and verify in Google Analytics Real-Time reports.

---

## Track Custom Events

```tsx
'use client';

import { event } from '@/components/analytics';

export function MyButton() {
  const handleClick = () => {
    event({
      action: 'click',
      category: 'engagement',
      label: 'cta_button',
      value: 1
    });
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

---

## Common Use Cases

### Newsletter Signup
```tsx
event({
  action: 'signup',
  category: 'newsletter',
  label: 'footer_form'
});
```

### File Download
```tsx
event({
  action: 'download',
  category: 'file',
  label: 'whitepaper.pdf',
  file_extension: 'pdf'
});
```

### Outbound Link Click
```tsx
event({
  action: 'click',
  category: 'outbound',
  label: 'external_link',
  link_url: 'https://example.com'
});
```

### Video Interaction
```tsx
event({
  action: 'play',
  category: 'video',
  label: 'product_demo',
  video_duration: 120
});
```

---

## GDPR Compliance

See full example in `example-usage.tsx`, but here's the minimal version:

```tsx
import { updateConsent } from '@/components/analytics';

function CookieBanner() {
  const acceptCookies = () => {
    updateConsent(true);
    localStorage.setItem('cookie-consent', 'granted');
  };

  return (
    <div>
      <button onClick={acceptCookies}>Accept Cookies</button>
    </div>
  );
}
```

---

## Verify It's Working

1. **Local Testing**: Enable debug mode
   ```tsx
   <GoogleAnalytics debug={true} />
   ```
   Check browser console for tracking logs.

2. **Production Testing**:
   - Deploy your site
   - Visit Google Analytics → Reports → Realtime
   - Navigate your site and watch events appear

3. **Check Installation**:
   ```tsx
   import { isGAReady } from '@/components/analytics';

   if (isGAReady()) {
     console.log('GA4 is loaded!');
   }
   ```

---

## TypeScript Support

All functions are fully typed:

```tsx
import { GAEventParams } from '@/components/analytics';

const myEvent: GAEventParams = {
  action: 'click',
  category: 'button',
  label: 'hero_cta',
  value: 1,
  custom_param: 'any_value'
};
```

---

## Troubleshooting

**Events not showing?**
- Check measurement ID format (must start with `G-`)
- Verify environment variable is set
- Enable debug mode to see console logs
- Check Real-Time reports (standard reports have 24-48h delay)

**TypeScript errors?**
- Ensure all imports are from `@/components/analytics`
- Check that types are exported in `index.ts`

**Build errors?**
- Verify `'use client'` directive is present
- Check Next.js version is 15+

---

## Files Created

- `GoogleAnalytics.tsx` - Main component with all utilities
- `index.ts` - Exports for easy importing
- `README.md` - Full documentation
- `example-usage.tsx` - Real-world examples
- `INTEGRATION.md` - This quick start guide

---

## Need Help?

- See `README.md` for comprehensive documentation
- Check `example-usage.tsx` for code examples
- Visit [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
