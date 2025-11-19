# Google Analytics 4 for Next.js 15

Type-safe Google Analytics 4 implementation for Next.js 15 App Router with automatic pageview tracking and GDPR compliance support.

## Features

- ✅ **Next.js 15 App Router** compatible
- ✅ **Automatic pageview tracking** on route changes
- ✅ **Type-safe** TypeScript implementation
- ✅ **Optimized loading** with `afterInteractive` strategy
- ✅ **GDPR compliance** ready with consent management
- ✅ **Custom event tracking** utilities
- ✅ **E-commerce tracking** support
- ✅ **Environment variable** configuration

## Installation

### 1. Add to your root layout

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@/components/analytics';

export default function RootLayout({ children }) {
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

### 2. Set environment variable

Create or update `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual GA4 measurement ID from Google Analytics.

## Usage

### Automatic Pageview Tracking

Pageviews are tracked automatically when users navigate between pages. No additional code needed!

### Custom Event Tracking

Track user interactions and custom events:

```tsx
import { event } from '@/components/analytics';

// Button click
function handleClick() {
  event({
    action: 'click',
    category: 'engagement',
    label: 'signup_button',
    value: 1
  });
}

// Form submission
function handleSubmit() {
  event({
    action: 'submit',
    category: 'form',
    label: 'contact_form',
    email_domain: user.email.split('@')[1]
  });
}

// Video play
function handleVideoPlay() {
  event({
    action: 'play',
    category: 'video',
    label: videoTitle,
    video_duration: duration
  });
}
```

### E-commerce Tracking

Track e-commerce events like product views, add to cart, and purchases:

```tsx
import { trackEcommerce } from '@/components/analytics';

// Product view
trackEcommerce('view_item', {
  currency: 'USD',
  value: 29.99,
  items: [{
    item_id: 'SKU_12345',
    item_name: 'Premium Subscription',
    price: 29.99,
    quantity: 1,
    item_category: 'Subscriptions'
  }]
});

// Add to cart
trackEcommerce('add_to_cart', {
  currency: 'USD',
  value: 29.99,
  items: [...]
});

// Purchase
trackEcommerce('purchase', {
  transaction_id: 'T_12345',
  value: 99.99,
  currency: 'USD',
  tax: 10.00,
  shipping: 5.00,
  items: [...]
});
```

### User Properties

Set user properties for better segmentation:

```tsx
import { setUserProperties } from '@/components/analytics';

// After user logs in
setUserProperties({
  user_id: user.id,
  user_role: user.role,
  account_type: user.subscriptionType,
  signup_date: user.createdAt
});
```

### GDPR Consent Management

Implement cookie consent with GDPR compliance:

```tsx
import { updateConsent } from '@/components/analytics';

function CookieConsent() {
  const handleAccept = () => {
    updateConsent(true);
    // Store user preference
    localStorage.setItem('cookie-consent', 'granted');
  };

  const handleReject = () => {
    updateConsent(false);
    // Store user preference
    localStorage.setItem('cookie-consent', 'denied');
  };

  return (
    <div>
      <p>We use cookies to improve your experience.</p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
}
```

### Check if GA is Ready

Useful for conditional tracking or debugging:

```tsx
import { isGAReady } from '@/components/analytics';

if (isGAReady()) {
  // GA is loaded and ready
  event({ action: 'custom_event', category: 'test' });
}
```

## Debug Mode

Enable debug mode during development:

```tsx
<GoogleAnalytics debug={true} />
```

This will log pageview events to the console.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes | Your GA4 measurement ID (format: G-XXXXXXXXXX) |

## TypeScript Support

All functions are fully typed:

```tsx
import { GAEventParams } from '@/components/analytics';

const trackCustomEvent = (params: GAEventParams) => {
  event(params);
};
```

## Best Practices

1. **Always request consent** before tracking in EU regions (GDPR compliance)
2. **Avoid tracking PII** (Personally Identifiable Information) without proper consent
3. **Use meaningful event names** that describe user actions
4. **Test in development** using debug mode
5. **Verify tracking** in Google Analytics Real-Time reports

## Common Event Patterns

### Navigation Events
```tsx
event({
  action: 'click',
  category: 'navigation',
  label: 'header_menu_pricing'
});
```

### Download Events
```tsx
event({
  action: 'download',
  category: 'file',
  label: 'whitepaper_pdf',
  file_extension: 'pdf'
});
```

### Social Sharing
```tsx
event({
  action: 'share',
  category: 'social',
  label: 'facebook',
  content_type: 'article',
  content_id: articleId
});
```

### Search Events
```tsx
event({
  action: 'search',
  category: 'engagement',
  label: searchTerm,
  search_results_count: results.length
});
```

## Troubleshooting

### Events not showing in GA4

1. Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. Verify the measurement ID format (should start with G-)
3. Enable debug mode and check browser console
4. Check Google Analytics Real-Time reports (events may take 24-48h to appear in standard reports)

### Pageviews not tracking

1. Ensure `GoogleAnalytics` component is mounted in your root layout
2. Check that you're using Next.js App Router (not Pages Router)
3. Verify environment variable is accessible (must start with `NEXT_PUBLIC_`)

### TypeScript errors

1. Ensure you're importing from the correct path
2. Check that TypeScript version is compatible with Next.js 15
3. Run `npm install` to ensure all dependencies are installed

## Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Script Optimization](https://nextjs.org/docs/app/api-reference/components/script)
- [GDPR Compliance Guide](https://support.google.com/analytics/answer/9019185)

## License

This component is part of your Next.js application and follows your project's license.
