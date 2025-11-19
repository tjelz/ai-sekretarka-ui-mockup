'use client';

import { Suspense } from 'react';
import { GoogleAnalytics, type GoogleAnalyticsProps } from './GoogleAnalytics';

/**
 * GoogleAnalytics wrapped in Suspense boundary
 *
 * This fixes the Next.js build error:
 * "useSearchParams() should be wrapped in a suspense boundary"
 *
 * Use this instead of GoogleAnalytics directly in layouts.
 */
function GoogleAnalyticsInner(props: GoogleAnalyticsProps) {
  return <GoogleAnalytics {...props} />;
}

export function GoogleAnalyticsSuspense(props: GoogleAnalyticsProps) {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner {...props} />
    </Suspense>
  );
}
