'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Type definitions for Google Analytics
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export interface GAEventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export interface GoogleAnalyticsProps {
  measurementId?: string;
  debug?: boolean;
}

/**
 * Google Analytics 4 Component for Next.js 15 App Router
 *
 * Features:
 * - Automatic pageview tracking on route changes
 * - Type-safe event tracking utilities
 * - Environment variable configuration
 * - GDPR compliance ready (requires consent management)
 * - Next.js 15 Script optimization with afterInteractive strategy
 *
 * @param measurementId - GA4 Measurement ID (defaults to NEXT_PUBLIC_GA_MEASUREMENT_ID)
 * @param debug - Enable debug mode for development
 */
export function GoogleAnalytics({
  measurementId,
  debug = false
}: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get measurement ID from props or environment variable
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Track pageviews on route change
  useEffect(() => {
    if (!gaId) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Send pageview event
    pageview(url, gaId);

    if (debug) {
      console.log('[GA4] Pageview tracked:', url);
    }
  }, [pathname, searchParams, gaId, debug]);

  // Don't render if no measurement ID is provided
  if (!gaId) {
    if (debug || process.env.NODE_ENV === 'development') {
      console.warn('[GA4] No measurement ID provided. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in your environment variables.');
    }
    return null;
  }

  return (
    <>
      {/* Google Analytics gtag.js script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        id="google-analytics-script"
      />

      {/* Initialize Google Analytics */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              ${debug ? "debug_mode: true," : ""}
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Send a pageview event to Google Analytics
 *
 * @param url - The page URL to track
 * @param measurementId - Optional GA4 Measurement ID (uses environment variable if not provided)
 */
export const pageview = (url: string, measurementId?: string): void => {
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!gaId || typeof window.gtag === 'undefined') return;

  window.gtag('config', gaId, {
    page_path: url,
  });
};

/**
 * Send a custom event to Google Analytics
 *
 * @param params - Event parameters including action, category, label, and value
 *
 * @example
 * ```tsx
 * // Track a button click
 * event({
 *   action: 'click',
 *   category: 'engagement',
 *   label: 'signup_button',
 *   value: 1
 * });
 *
 * // Track a form submission
 * event({
 *   action: 'submit',
 *   category: 'form',
 *   label: 'contact_form',
 *   custom_param: 'additional_data'
 * });
 * ```
 */
export const event = ({ action, category, label, value, ...rest }: GAEventParams): void => {
  if (typeof window.gtag === 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[GA4] gtag is not defined. Make sure GoogleAnalytics component is mounted.');
    }
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  });
};

/**
 * Set user properties in Google Analytics
 *
 * @param properties - User properties to set
 *
 * @example
 * ```tsx
 * setUserProperties({
 *   user_id: '12345',
 *   user_role: 'premium',
 *   account_type: 'business'
 * });
 * ```
 */
export const setUserProperties = (properties: Record<string, unknown>): void => {
  if (typeof window.gtag === 'undefined') return;

  window.gtag('set', 'user_properties', properties);
};

/**
 * Track e-commerce events
 *
 * @param eventName - E-commerce event name (view_item, add_to_cart, purchase, etc.)
 * @param params - E-commerce event parameters
 *
 * @example
 * ```tsx
 * // Track product view
 * trackEcommerce('view_item', {
 *   currency: 'USD',
 *   value: 29.99,
 *   items: [{
 *     item_id: 'SKU_12345',
 *     item_name: 'Product Name',
 *     price: 29.99,
 *     quantity: 1
 *   }]
 * });
 *
 * // Track purchase
 * trackEcommerce('purchase', {
 *   transaction_id: 'T_12345',
 *   value: 99.99,
 *   currency: 'USD',
 *   items: [...]
 * });
 * ```
 */
export const trackEcommerce = (
  eventName: string,
  params: Record<string, unknown>
): void => {
  if (typeof window.gtag === 'undefined') return;

  window.gtag('event', eventName, params);
};

/**
 * Check if Google Analytics is loaded and ready
 *
 * @returns boolean indicating if GA is available
 */
export const isGAReady = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag !== 'undefined';
};

/**
 * GDPR Consent Management Helper
 *
 * Call this function to update consent settings based on user preferences
 *
 * @param granted - Whether analytics consent is granted
 *
 * @example
 * ```tsx
 * // User accepts cookies
 * updateConsent(true);
 *
 * // User rejects cookies
 * updateConsent(false);
 * ```
 */
export const updateConsent = (granted: boolean): void => {
  if (typeof window.gtag === 'undefined') return;

  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: granted ? 'granted' : 'denied',
  } as never);
};

export default GoogleAnalytics;
