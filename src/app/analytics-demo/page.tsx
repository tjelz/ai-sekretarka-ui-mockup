import { AnalyticsDemo } from '@/components/analytics/AnalyticsDemo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics Demo - Test Google Analytics Integration',
  description: 'Interactive demo for testing Google Analytics 4 event tracking, e-commerce, and GDPR features',
  robots: {
    index: false, // Don't index demo page
    follow: false
  }
};

export default function AnalyticsDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold">Google Analytics 4 Demo</h1>
          <p className="text-muted-foreground mt-2">
            Test all GA4 features including event tracking, e-commerce, user properties, and GDPR consent
          </p>
        </div>
      </div>
      <AnalyticsDemo />
    </div>
  );
}
