'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { event, trackEcommerce, setUserProperties, isGAReady, updateConsent } from './GoogleAnalytics';
import { Badge } from '@/components/ui/badge';
import {
  MousePointerClick,
  ShoppingCart,
  User,
  Check,
  AlertCircle,
  Play,
  Download,
  Heart,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

/**
 * Interactive Analytics Demo Dashboard
 *
 * Demonstrates all GA4 features with working examples:
 * - Custom event tracking
 * - E-commerce tracking
 * - User properties
 * - GDPR consent management
 */
export function AnalyticsDemo() {
  const [gaStatus, setGaStatus] = useState(isGAReady());
  const [userId, setUserId] = useState('');
  const [productPrice, setProductPrice] = useState('99.99');

  // Check GA status periodically
  useState(() => {
    const interval = setInterval(() => {
      setGaStatus(isGAReady());
    }, 1000);
    return () => clearInterval(interval);
  });

  // Event tracking examples
  const trackButtonClick = (buttonName: string) => {
    event({
      action: 'click',
      category: 'engagement',
      label: buttonName,
      value: 1
    });
    toast.success(`Event tracked: ${buttonName}`);
  };

  const trackFormSubmit = () => {
    event({
      action: 'submit',
      category: 'form',
      label: 'demo_form',
      form_name: 'analytics_demo'
    });
    toast.success('Form submission tracked!');
  };

  const trackVideoPlay = () => {
    event({
      action: 'play',
      category: 'video',
      label: 'demo_video',
      video_duration: 120
    });
    toast.success('Video play tracked!');
  };

  const trackDownload = () => {
    event({
      action: 'download',
      category: 'file',
      label: 'analytics_guide_pdf',
      file_type: 'pdf'
    });
    toast.success('Download tracked!');
  };

  // E-commerce tracking examples
  const trackProductView = () => {
    trackEcommerce('view_item', {
      currency: 'PLN',
      value: parseFloat(productPrice),
      items: [{
        item_id: 'AI_SEKRETARKA_BASIC',
        item_name: 'AI Sekretarka - Plan Podstawowy',
        price: parseFloat(productPrice),
        quantity: 1,
        item_category: 'subscription'
      }]
    });
    toast.success('Product view tracked!');
  };

  const trackAddToCart = () => {
    trackEcommerce('add_to_cart', {
      currency: 'PLN',
      value: parseFloat(productPrice),
      items: [{
        item_id: 'AI_SEKRETARKA_BASIC',
        item_name: 'AI Sekretarka - Plan Podstawowy',
        price: parseFloat(productPrice),
        quantity: 1
      }]
    });
    toast.success('Add to cart tracked!');
  };

  const trackPurchase = () => {
    trackEcommerce('purchase', {
      transaction_id: `T_${Date.now()}`,
      value: parseFloat(productPrice),
      currency: 'PLN',
      tax: parseFloat(productPrice) * 0.23,
      items: [{
        item_id: 'AI_SEKRETARKA_BASIC',
        item_name: 'AI Sekretarka - Plan Podstawowy',
        price: parseFloat(productPrice),
        quantity: 1
      }]
    });
    toast.success('Purchase tracked!');
  };

  // User properties
  const setUserProps = () => {
    if (!userId) {
      toast.error('Please enter a user ID');
      return;
    }

    setUserProperties({
      user_id: userId,
      user_role: 'demo_user',
      account_type: 'test',
      signup_date: new Date().toISOString()
    });
    toast.success(`User properties set for ID: ${userId}`);
  };

  // GDPR consent
  const grantConsent = () => {
    updateConsent(true);
    toast.success('Analytics consent granted!');
  };

  const revokeConsent = () => {
    updateConsent(false);
    toast.warning('Analytics consent revoked!');
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Status Banner */}
      <Card className={gaStatus ? 'border-green-500' : 'border-yellow-500'}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {gaStatus ? (
                  <>
                    <Check className="h-5 w-5 text-green-500" />
                    Google Analytics Active
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    Google Analytics Loading...
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {gaStatus
                  ? 'All tracking features are operational. Try the demos below!'
                  : 'Waiting for GA4 to initialize. Make sure NEXT_PUBLIC_GA_MEASUREMENT_ID is set.'}
              </CardDescription>
            </div>
            <Badge variant={gaStatus ? 'default' : 'secondary'}>
              {gaStatus ? 'Ready' : 'Loading'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Event Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointerClick className="h-5 w-5" />
              Event Tracking
            </CardTitle>
            <CardDescription>
              Track custom user interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => trackButtonClick('signup_button')}
              className="w-full"
              disabled={!gaStatus}
            >
              Track Sign Up Click
            </Button>
            <Button
              onClick={() => trackButtonClick('contact_button')}
              variant="outline"
              className="w-full"
              disabled={!gaStatus}
            >
              Track Contact Click
            </Button>
            <Button
              onClick={trackFormSubmit}
              variant="secondary"
              className="w-full"
              disabled={!gaStatus}
            >
              Track Form Submit
            </Button>
            <div className="grid grid-cols-3 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={trackVideoPlay}
                disabled={!gaStatus}
              >
                <Play className="h-4 w-4 mr-1" />
                Video
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={trackDownload}
                disabled={!gaStatus}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => trackButtonClick('share_button')}
                disabled={!gaStatus}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* E-commerce Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              E-commerce Tracking
            </CardTitle>
            <CardDescription>
              Track product interactions and purchases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="price">Product Price (PLN)</Label>
              <Input
                id="price"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="99.99"
                step="0.01"
              />
            </div>
            <Button
              onClick={trackProductView}
              variant="outline"
              className="w-full"
              disabled={!gaStatus}
            >
              Track Product View
            </Button>
            <Button
              onClick={trackAddToCart}
              variant="secondary"
              className="w-full"
              disabled={!gaStatus}
            >
              Track Add to Cart
            </Button>
            <Button
              onClick={trackPurchase}
              className="w-full"
              disabled={!gaStatus}
            >
              Track Purchase
            </Button>
          </CardContent>
        </Card>

        {/* User Properties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Properties
            </CardTitle>
            <CardDescription>
              Set custom user attributes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="user_12345"
              />
            </div>
            <Button
              onClick={setUserProps}
              className="w-full"
              disabled={!gaStatus || !userId}
            >
              Set User Properties
            </Button>
            <p className="text-xs text-muted-foreground">
              Properties: user_id, user_role, account_type, signup_date
            </p>
          </CardContent>
        </Card>

        {/* GDPR Consent */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              GDPR Consent Management
            </CardTitle>
            <CardDescription>
              Control analytics data collection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={grantConsent}
              variant="default"
              className="w-full"
              disabled={!gaStatus}
            >
              Grant Consent
            </Button>
            <Button
              onClick={revokeConsent}
              variant="destructive"
              className="w-full"
              disabled={!gaStatus}
            >
              Revoke Consent
            </Button>
            <p className="text-xs text-muted-foreground">
              Controls analytics_storage and ad_storage permissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Test</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Make sure you have set <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> in your .env.local</li>
            <li>Open Google Analytics Realtime view in another tab</li>
            <li>Click the buttons above to trigger events</li>
            <li>Watch events appear in GA4 Realtime within seconds</li>
            <li>Open DevTools Network tab and filter for "collect" to see requests</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
