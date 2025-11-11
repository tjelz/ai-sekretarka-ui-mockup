# Google Analytics 4 - Complete Features Guide

## 🎯 All Features Are Now Active!

Every optional feature has been implemented and is ready to use. This guide shows you how to use each one.

---

## 🍪 1. GDPR Cookie Consent Banner

### What It Does
- Shows a compliant cookie consent banner on first visit
- Stores user preference in localStorage
- Integrates directly with GA4 consent API
- Fully accessible with keyboard navigation
- Available in Polish (customizable)

### How to Use

**Option A: Using AnalyticsProvider (Recommended)**
```tsx
// In your layout.tsx
import { AnalyticsProvider } from '@/components/analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <AnalyticsProvider showCookieConsent />
      </body>
    </html>
  );
}
```

**Option B: Using CookieConsent Directly**
```tsx
import { CookieConsent } from '@/components/analytics';

<CookieConsent
  position="bottom"
  onAccept={() => console.log('User accepted!')}
  onReject={() => console.log('User rejected!')}
/>
```

### Features
- ✅ Persistent storage of consent
- ✅ Automatic GA4 consent management
- ✅ Polish language support
- ✅ Privacy policy link
- ✅ Accept/Reject buttons
- ✅ Close button (treats as reject)
- ✅ Animated entry
- ✅ Mobile responsive

### Customization
```tsx
// Check consent status
import { useConsentStatus } from '@/components/analytics';

function MyComponent() {
  const status = useConsentStatus(); // 'pending' | 'accepted' | 'rejected'

  if (status === 'accepted') {
    // Load additional tracking scripts
  }
}

// Reset consent (for testing)
import { resetConsent } from '@/components/analytics';

resetConsent(); // Clears and reloads page
```

---

## 🎯 2. Event Tracking

### Basic Event Tracking

**Using the event() function:**
```tsx
import { event } from '@/components/analytics';

// Track button click
event({
  action: 'click',
  category: 'engagement',
  label: 'signup_button',
  value: 1
});

// Track form submission
event({
  action: 'submit',
  category: 'form',
  label: 'contact_form'
});

// Track video play
event({
  action: 'play',
  category: 'video',
  label: 'demo_video',
  video_duration: 120
});

// Track file download
event({
  action: 'download',
  category: 'file',
  label: 'pricing_pdf',
  file_type: 'pdf'
});
```

### Using React Hooks

**useButtonTracking Hook:**
```tsx
import { useButtonTracking } from '@/components/analytics';

function SignUpButton() {
  const trackClick = useButtonTracking('signup_button', 'cta');

  return (
    <button onClick={trackClick}>
      Sign Up
    </button>
  );
}

// With additional parameters
function CustomButton() {
  const trackClick = useButtonTracking('custom_button');

  const handleClick = () => {
    trackClick({
      section: 'hero',
      variant: 'primary'
    });
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

**useFormTracking Hook:**
```tsx
import { useFormTracking } from '@/components/analytics';

function ContactForm() {
  const { trackStart, trackSubmit, trackError } = useFormTracking('contact_form');

  const handleFocus = () => trackStart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm();
      trackSubmit();
    } catch (error) {
      trackError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onFocus={handleFocus} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**useAnalytics Hook (All-in-one):**
```tsx
import { useAnalytics } from '@/components/analytics';

function MyComponent() {
  const { ready, trackEvent } = useAnalytics();

  const handleAction = () => {
    trackEvent({
      action: 'custom_action',
      category: 'user_interaction',
      label: 'special_feature'
    });
  };

  return (
    <button onClick={handleAction} disabled={!ready}>
      {ready ? 'Track Event' : 'Loading...'}
    </button>
  );
}
```

---

## 🛒 3. E-commerce Tracking

### Product View Tracking

```tsx
import { trackEcommerce } from '@/components/analytics';

function ProductPage({ product }) {
  useEffect(() => {
    trackEcommerce('view_item', {
      currency: 'PLN',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1,
        item_category: product.category
      }]
    });
  }, [product]);

  return <div>Product Details</div>;
}
```

### Add to Cart Tracking

```tsx
import { useAnalytics } from '@/components/analytics';

function AddToCartButton({ product }) {
  const { trackAddToCart } = useAnalytics();

  const handleClick = () => {
    trackAddToCart(
      product.id,
      product.name,
      product.price,
      1, // quantity
      'PLN' // currency
    );

    // Your add to cart logic
    addToCart(product);
  };

  return (
    <button onClick={handleClick}>
      Add to Cart
    </button>
  );
}
```

### Purchase Tracking

```tsx
import { useAnalytics } from '@/components/analytics';

function CheckoutSuccess({ order }) {
  const { trackPurchase } = useAnalytics();

  useEffect(() => {
    trackPurchase(
      order.id,
      order.total,
      'PLN',
      order.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    );
  }, [order]);

  return <div>Thank you for your purchase!</div>;
}
```

### All E-commerce Events

```tsx
// View item
trackEcommerce('view_item', { items: [...] });

// Add to cart
trackEcommerce('add_to_cart', { items: [...] });

// Remove from cart
trackEcommerce('remove_from_cart', { items: [...] });

// Begin checkout
trackEcommerce('begin_checkout', { items: [...] });

// Add payment info
trackEcommerce('add_payment_info', { payment_type: 'credit_card', items: [...] });

// Purchase
trackEcommerce('purchase', {
  transaction_id: 'T_12345',
  value: 99.99,
  currency: 'PLN',
  tax: 23.00,
  shipping: 10.00,
  items: [...]
});

// Refund
trackEcommerce('refund', {
  transaction_id: 'T_12345',
  value: 99.99,
  currency: 'PLN'
});
```

---

## 👤 4. User Properties

### Setting User Properties

```tsx
import { setUserProperties } from '@/components/analytics';

// On user login
setUserProperties({
  user_id: '12345',
  user_role: 'premium',
  account_type: 'business',
  signup_date: '2025-01-15',
  plan: 'pro'
});

// Using the hook
import { useAnalytics } from '@/components/analytics';

function UserProfile({ user }) {
  const { setUser } = useAnalytics();

  useEffect(() => {
    setUser({
      user_id: user.id,
      user_role: user.role,
      subscription: user.subscription
    });
  }, [user]);

  return <div>Profile</div>;
}
```

### Dynamic Properties

```tsx
// Update properties based on user actions
function upgradeToPremium() {
  setUserProperties({
    account_type: 'premium',
    upgraded_at: new Date().toISOString()
  });
}

// Track user segments
function segmentUser(userId, traits) {
  setUserProperties({
    user_id: userId,
    segment: traits.segment,
    lifetime_value: traits.ltv,
    engagement_score: traits.score
  });
}
```

---

## 🔧 5. Debug Mode

### Enable Debug Mode

**Option 1: Component Prop**
```tsx
import { GoogleAnalytics } from '@/components/analytics';

<GoogleAnalytics debug={true} />
```

**Option 2: AnalyticsProvider**
```tsx
import { AnalyticsProvider } from '@/components/analytics';

<AnalyticsProvider debug={true} showCookieConsent />
```

### What Debug Mode Does
- ✅ Logs all pageviews to console
- ✅ Shows GA4 warnings when not configured
- ✅ Enables GA4's built-in debug_mode
- ✅ Helps troubleshoot tracking issues

### Console Output Example
```
[GA4] Pageview tracked: /dashboard
[GA4] No measurement ID provided. Set NEXT_PUBLIC_GA_MEASUREMENT_ID...
```

---

## 🧪 6. Interactive Testing Dashboard

### Access the Demo Page

Visit: **`http://localhost:3000/analytics-demo`**

### Features
- ✅ **Real-time GA status indicator** - See when GA4 is ready
- ✅ **Event tracking buttons** - Test all event types with one click
- ✅ **E-commerce simulator** - Test product views, cart, purchases
- ✅ **User properties panel** - Set and test user attributes
- ✅ **GDPR consent controls** - Grant/revoke consent on demand
- ✅ **Toast notifications** - Visual feedback for each action
- ✅ **Fully interactive** - All buttons actually work!

### How to Test
1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`
2. Run `npm run dev`
3. Open `http://localhost:3000/analytics-demo`
4. Open GA4 Realtime in another tab
5. Click buttons and watch events appear!

---

## 📱 7. Component Tracking

### Auto-track Component Views

```tsx
import { usePageView } from '@/components/analytics';

function DashboardWidget() {
  usePageView('DashboardWidget');

  return <div>Widget Content</div>;
}
```

### Track Component Interactions

```tsx
import { useEffect } from 'react';
import { event } from '@/components/analytics';

function InteractiveChart({ data }) {
  const trackInteraction = (type: string) => {
    event({
      action: type,
      category: 'chart',
      label: 'revenue_chart'
    });
  };

  return (
    <Chart
      data={data}
      onHover={() => trackInteraction('hover')}
      onClick={() => trackInteraction('click')}
      onZoom={() => trackInteraction('zoom')}
    />
  );
}
```

---

## 🎯 8. Real-World Examples

### Signup Flow Tracking

```tsx
import { event, setUserProperties } from '@/components/analytics';

function SignupFlow() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    event({
      action: 'view_step',
      category: 'signup',
      label: `step_${step}`,
      value: step
    });
  }, [step]);

  const handleComplete = async (userData) => {
    await createAccount(userData);

    // Track completion
    event({
      action: 'complete',
      category: 'signup',
      label: 'account_created'
    });

    // Set user properties
    setUserProperties({
      user_id: userData.id,
      account_type: userData.plan,
      signup_date: new Date().toISOString()
    });
  };

  return <div>Signup Form</div>;
}
```

### Pricing Calculator Tracking

```tsx
import { event } from '@/components/analytics';

function PricingCalculator() {
  const [inputs, setInputs] = useState({});

  const handleCalculate = (result) => {
    event({
      action: 'calculate',
      category: 'pricing',
      label: 'roi_calculator',
      value: result,
      input_employees: inputs.employees,
      input_calls: inputs.calls
    });
  };

  return <div>Calculator</div>;
}
```

### Video Player Tracking

```tsx
import { event } from '@/components/analytics';

function VideoPlayer({ videoId }) {
  const trackVideoEvent = (action, currentTime) => {
    event({
      action,
      category: 'video',
      label: videoId,
      value: Math.round(currentTime),
      video_current_time: currentTime
    });
  };

  return (
    <video
      onPlay={(e) => trackVideoEvent('play', e.currentTime)}
      onPause={(e) => trackVideoEvent('pause', e.currentTime)}
      onEnded={(e) => trackVideoEvent('complete', e.duration)}
      onSeeking={(e) => trackVideoEvent('seek', e.currentTime)}
    />
  );
}
```

---

## ✅ Feature Checklist

| Feature | Status | Component | Demo Available |
|---------|--------|-----------|----------------|
| **GDPR Consent Banner** | ✅ | CookieConsent | ✅ |
| **Event Tracking** | ✅ | event() | ✅ |
| **E-commerce Tracking** | ✅ | trackEcommerce() | ✅ |
| **User Properties** | ✅ | setUserProperties() | ✅ |
| **Debug Mode** | ✅ | debug prop | ✅ |
| **React Hooks** | ✅ | useAnalytics() | ✅ |
| **Form Tracking** | ✅ | useFormTracking() | ✅ |
| **Button Tracking** | ✅ | useButtonTracking() | ✅ |
| **Component Tracking** | ✅ | usePageView() | ✅ |
| **Auto Page Tracking** | ✅ | GoogleAnalytics | ✅ |
| **TypeScript Support** | ✅ | All components | ✅ |
| **Testing Dashboard** | ✅ | /analytics-demo | ✅ |

---

## 🚀 Quick Start

1. **Set Environment Variable**
   ```bash
   # .env.local
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **Add to Layout (Already Done!)**
   ```tsx
   import { AnalyticsProvider } from '@/components/analytics';

   <AnalyticsProvider showCookieConsent />
   ```

3. **Test It**
   - Visit: `http://localhost:3000/analytics-demo`
   - Click buttons to trigger events
   - Check GA4 Realtime reports

---

## 📞 Support

All features are documented in:
- This guide
- `src/components/analytics/README.md`
- `src/components/analytics/example-usage.tsx`

Every feature has working examples in the demo dashboard! 🎉
