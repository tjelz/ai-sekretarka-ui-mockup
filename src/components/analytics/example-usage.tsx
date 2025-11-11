/**
 * Example Usage of Google Analytics 4 Component
 *
 * This file demonstrates how to integrate and use the GA4 component
 * in various scenarios within your Next.js 15 application.
 */

// ============================================================================
// 1. BASIC SETUP - Add to Root Layout
// ============================================================================

// app/layout.tsx
import { GoogleAnalytics } from '@/components/analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Add GoogleAnalytics component */}
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

// ============================================================================
// 2. CUSTOM EVENT TRACKING - Track User Interactions
// ============================================================================

'use client';

import { event } from '@/components/analytics';

// Button Click Tracking
export function SignupButton() {
  const handleClick = () => {
    // Track the button click
    event({
      action: 'click',
      category: 'engagement',
      label: 'hero_signup_button',
      value: 1
    });

    // Your signup logic here
  };

  return (
    <button onClick={handleClick}>
      Sign Up Now
    </button>
  );
}

// Form Submission Tracking
export function ContactForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission
    event({
      action: 'submit',
      category: 'form',
      label: 'contact_form',
      form_location: 'footer'
    });

    // Your form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Submit</button>
    </form>
  );
}

// Download Tracking
export function DownloadButton({ fileName }: { fileName: string }) {
  const handleDownload = () => {
    event({
      action: 'download',
      category: 'file',
      label: fileName,
      file_extension: fileName.split('.').pop()
    });
  };

  return (
    <a href={`/downloads/${fileName}`} onClick={handleDownload}>
      Download {fileName}
    </a>
  );
}

// ============================================================================
// 3. E-COMMERCE TRACKING
// ============================================================================

import { trackEcommerce } from '@/components/analytics';

// Product View Tracking
export function ProductPage({ product }: { product: any }) {
  useEffect(() => {
    trackEcommerce('view_item', {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1
      }]
    });
  }, [product]);

  return <div>{/* Product details */}</div>;
}

// Add to Cart Tracking
export function AddToCartButton({ product }: { product: any }) {
  const handleAddToCart = () => {
    trackEcommerce('add_to_cart', {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1
      }]
    });
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}

// Purchase Tracking
export function CheckoutSuccess({ order }: { order: any }) {
  useEffect(() => {
    trackEcommerce('purchase', {
      transaction_id: order.id,
      value: order.total,
      currency: 'USD',
      tax: order.tax,
      shipping: order.shipping,
      items: order.items.map((item: any) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });
  }, [order]);

  return <div>Thank you for your purchase!</div>;
}

// ============================================================================
// 4. USER PROPERTIES TRACKING
// ============================================================================

import { setUserProperties } from '@/components/analytics';

// Set User Properties After Login
export function LoginHandler() {
  const handleLogin = async (user: any) => {
    // Your login logic

    // Set user properties for analytics
    setUserProperties({
      user_id: user.id,
      user_role: user.role,
      account_type: user.subscriptionTier,
      signup_date: user.createdAt
    });
  };

  return <div>{/* Login form */}</div>;
}

// ============================================================================
// 5. GDPR CONSENT MANAGEMENT
// ============================================================================

import { updateConsent } from '@/components/analytics';
import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // Apply stored consent
      updateConsent(consent === 'granted');
    }
  }, []);

  const handleAccept = () => {
    updateConsent(true);
    localStorage.setItem('cookie-consent', 'granted');
    setShowBanner(false);
  };

  const handleReject = () => {
    updateConsent(false);
    localStorage.setItem('cookie-consent', 'denied');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <p>
          We use cookies to improve your experience. By using our site, you agree to our cookie policy.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. ADVANCED TRACKING PATTERNS
// ============================================================================

import { isGAReady } from '@/components/analytics';

// Video Play Tracking
export function VideoPlayer({ videoTitle, videoDuration }: any) {
  const handlePlay = () => {
    if (isGAReady()) {
      event({
        action: 'play',
        category: 'video',
        label: videoTitle,
        video_duration: videoDuration
      });
    }
  };

  const handleComplete = () => {
    if (isGAReady()) {
      event({
        action: 'complete',
        category: 'video',
        label: videoTitle,
        video_duration: videoDuration
      });
    }
  };

  return (
    <video
      onPlay={handlePlay}
      onEnded={handleComplete}
    >
      {/* Video source */}
    </video>
  );
}

// Search Tracking
export function SearchBar() {
  const handleSearch = (searchTerm: string, resultsCount: number) => {
    event({
      action: 'search',
      category: 'engagement',
      label: searchTerm,
      search_results_count: resultsCount
    });
  };

  return <div>{/* Search input */}</div>;
}

// Social Share Tracking
export function ShareButton({ platform, contentId }: any) {
  const handleShare = () => {
    event({
      action: 'share',
      category: 'social',
      label: platform,
      content_type: 'article',
      content_id: contentId
    });
  };

  return (
    <button onClick={handleShare}>
      Share on {platform}
    </button>
  );
}

// Scroll Depth Tracking
export function ScrollTracker() {
  useEffect(() => {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;

      if (scrolled > maxScroll) {
        maxScroll = scrolled;

        milestones.forEach(milestone => {
          if (scrolled >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            event({
              action: 'scroll',
              category: 'engagement',
              label: `${milestone}%`,
              value: milestone
            });
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}

// ============================================================================
// 7. DEBUG MODE FOR DEVELOPMENT
// ============================================================================

// app/layout.tsx (Development)
export function LayoutWithDebug({ children }: { children: React.ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <html lang="en">
      <body>
        {/* Enable debug mode in development */}
        <GoogleAnalytics debug={isDevelopment} />
        {children}
      </body>
    </html>
  );
}

// ============================================================================
// 8. CUSTOM MEASUREMENT ID (Multi-Environment)
// ============================================================================

// app/layout.tsx (Multi-environment)
export function LayoutWithEnvironment({ children }: { children: React.ReactNode }) {
  // Use different measurement IDs for different environments
  const measurementId = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    : process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_DEV;

  return (
    <html lang="en">
      <body>
        <GoogleAnalytics measurementId={measurementId} />
        {children}
      </body>
    </html>
  );
}
