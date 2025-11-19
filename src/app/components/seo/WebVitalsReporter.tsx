'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/analytics/web-vitals';

/**
 * Client component that reports Core Web Vitals to analytics
 * Add this component to your root layout
 *
 * @example
 * import { WebVitalsReporter } from '@/components/seo/WebVitalsReporter';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <WebVitalsReporter />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 */
export function WebVitalsReporter() {
  useEffect(() => {
    reportWebVitals();
  }, []);

  return null;
}
