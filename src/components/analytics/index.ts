/**
 * Google Analytics 4 Module
 *
 * Complete analytics solution with:
 * - GoogleAnalytics: Main component with auto page tracking
 * - CookieConsent: GDPR-compliant cookie banner
 * - AnalyticsProvider: All-in-one provider component
 * - Event tracking utilities
 * - E-commerce tracking
 * - User properties management
 * - React hooks for easy integration
 */

// Core Components
export {
  GoogleAnalytics,
  event,
  pageview,
  setUserProperties,
  trackEcommerce,
  updateConsent,
  isGAReady,
} from './GoogleAnalytics';

export { GoogleAnalyticsSuspense } from './GoogleAnalyticsSuspense';
export { CookieConsent, useConsentStatus, resetConsent } from './CookieConsent';
export { AnalyticsProvider } from './AnalyticsProvider';
export { AnalyticsDemo } from './AnalyticsDemo';

// React Hooks
export {
  useAnalytics,
  usePageView,
  useFormTracking,
  useButtonTracking
} from './useAnalytics';

// Types
export type { GAEventParams } from './GoogleAnalytics';
