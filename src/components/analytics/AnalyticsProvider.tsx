'use client';

import { GoogleAnalyticsSuspense } from './GoogleAnalyticsSuspense';
import { CookieConsent } from './CookieConsent';

interface AnalyticsProviderProps {
  children?: React.ReactNode;
  showCookieConsent?: boolean;
  debug?: boolean;
}

/**
 * Analytics Provider Component
 *
 * Combines GoogleAnalytics (with Suspense) and CookieConsent into a single provider
 * for easy integration into your app.
 *
 * @example
 * ```tsx
 * // In your layout.tsx
 * import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <AnalyticsProvider showCookieConsent />
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function AnalyticsProvider({
  children,
  showCookieConsent = true,
  debug = false
}: AnalyticsProviderProps) {
  return (
    <>
      {children}
      <GoogleAnalyticsSuspense debug={debug} />
      {showCookieConsent && <CookieConsent />}
    </>
  );
}
