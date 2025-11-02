/**
 * Stripe Utility Functions
 * Helper functions for Stripe integration
 */

import { SUBSCRIPTION_TIERS, SubscriptionTier } from './client';

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100);
}

export function getSubscriptionTier(priceId: string): SubscriptionTier | null {
  for (const [tier, config] of Object.entries(SUBSCRIPTION_TIERS)) {
    if (config.priceId === priceId) {
      return tier as SubscriptionTier;
    }
  }
  return null;
}

export function getSubscriptionStatus(status: string): {
  label: string;
  color: string;
  description: string;
} {
  const statusMap: Record<string, { label: string; color: string; description: string }> = {
    active: {
      label: 'Active',
      color: 'green',
      description: 'Your subscription is active and all features are available.',
    },
    past_due: {
      label: 'Past Due',
      color: 'yellow',
      description: 'Payment failed. Please update your payment method.',
    },
    canceled: {
      label: 'Canceled',
      color: 'red',
      description: 'Your subscription has been canceled.',
    },
    unpaid: {
      label: 'Unpaid',
      color: 'red',
      description: 'Payment required. Please update your payment method.',
    },
    incomplete: {
      label: 'Incomplete',
      color: 'yellow',
      description: 'Subscription setup is incomplete.',
    },
    trialing: {
      label: 'Trial',
      color: 'blue',
      description: 'You are in a trial period.',
    },
  };

  return statusMap[status] || {
    label: 'Unknown',
    color: 'gray',
    description: 'Subscription status is unknown.',
  };
}

export function calculateUsagePercentage(current: number, limit: number): number {
  if (limit === 0) return 0;
  return Math.min((current / limit) * 100, 100);
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getNextBillingDate(periodEnd: number): string {
  const date = new Date(periodEnd * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
