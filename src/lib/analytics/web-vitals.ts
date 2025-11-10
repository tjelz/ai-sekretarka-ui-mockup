import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

interface MetricData {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

function sendToAnalytics(metric: MetricData) {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
    });
  }

  // Send to Vercel Analytics if available
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', metric.name, {
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    });
  }
}

/**
 * Report Core Web Vitals to analytics services
 * Call this function once in your root layout
 */
export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  // Cumulative Layout Shift
  onCLS(sendToAnalytics);

  // Interaction to Next Paint
  onINP(sendToAnalytics);

  // Largest Contentful Paint
  onLCP(sendToAnalytics);

  // First Contentful Paint
  onFCP(sendToAnalytics);

  // Time to First Byte
  onTTFB(sendToAnalytics);
}
