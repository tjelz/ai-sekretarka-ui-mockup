/**
 * Stripe Client
 * Handles payment processing and subscription management
 */

import Stripe from 'stripe';
import { z } from 'zod';

// Environment validation
const stripeEnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1, 'Stripe secret key is required'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'Stripe webhook secret is required'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'Stripe publishable key is required'),
});

// Price definitions for subscription tiers
export const SUBSCRIPTION_TIERS = {
  SOLO: {
    name: 'Solo',
    priceId: process.env.STRIPE_SOLO_PRICE_ID,
    features: ['100 rozmów w cenie', '1,50 zł dodatkowa rozmowa', '24/7 obsługa połączeń', 'Integracja z kalendarzem', 'SMS potwierdzenia'],
    price: 299,
    calls: 100,
    extraCallPrice: 1.50,
    description: '1 osoba / działalność jednoosobowa',
  },
  EKIPA: {
    name: 'Ekipa',
    priceId: process.env.STRIPE_EKIPA_PRICE_ID,
    features: ['225 rozmów w cenie', '1,50 zł dodatkowa rozmowa', '24/7 obsługa połączeń', 'Integracja z kalendarzem', 'SMS potwierdzenia', 'Wsparcie priorytetowe'],
    price: 599,
    calls: 225,
    extraCallPrice: 1.50,
    description: '2–4 osoby w terenie',
  },
  FIRMA: {
    name: 'Firma',
    priceId: process.env.STRIPE_FIRMA_PRICE_ID,
    features: ['500 rozmów w cenie', '1,50 zł dodatkowa rozmowa', '24/7 obsługa połączeń', 'Integracja z kalendarzem', 'SMS potwierdzenia', 'Dedykowane wsparcie', 'Zaawansowane raportowanie'],
    price: 999,
    calls: 500,
    extraCallPrice: 1.50,
    description: 'większa firma / kilka ekip / stały ruch',
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export class StripeClient {
  private stripe: Stripe;

  constructor() {
    const env = stripeEnvSchema.parse({
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    });

    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia',
      typescript: true,
    });
  }

  // Customer Management
  async createCustomer(email: string, name?: string, metadata?: Record<string, string>) {
    return this.stripe.customers.create({
      email,
      name,
      metadata,
    });
  }

  async getCustomer(customerId: string) {
    return this.stripe.customers.retrieve(customerId);
  }

  async updateCustomer(customerId: string, params: Stripe.CustomerUpdateParams) {
    return this.stripe.customers.update(customerId, params);
  }

  // Checkout Sessions
  async createCheckoutSession(params: {
    customerId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }) {
    return this.stripe.checkout.sessions.create({
      customer: params.customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: params.priceId,
          quantity: 1,
        },
      ],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
      allow_promotion_codes: true,
    });
  }

  // Subscription Management
  async getSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.retrieve(subscriptionId);
  }

  async cancelSubscription(subscriptionId: string, immediately: boolean = false) {
    if (immediately) {
      return this.stripe.subscriptions.cancel(subscriptionId);
    }
    return this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  }

  async updateSubscription(subscriptionId: string, priceId: string) {
    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);

    return this.stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId,
        },
      ],
      proration_behavior: 'create_prorations',
    });
  }

  async resumeSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
  }

  // Usage-based Billing
  async reportUsage(subscriptionItemId: string, quantity: number, timestamp?: number) {
    return this.stripe.subscriptionItems.createUsageRecord(
      subscriptionItemId,
      {
        quantity,
        timestamp: timestamp || Math.floor(Date.now() / 1000),
        action: 'increment',
      }
    );
  }

  // Payment Methods
  async listPaymentMethods(customerId: string) {
    return this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
  }

  async detachPaymentMethod(paymentMethodId: string) {
    return this.stripe.paymentMethods.detach(paymentMethodId);
  }

  // Invoices
  async listInvoices(customerId: string, limit: number = 10) {
    return this.stripe.invoices.list({
      customer: customerId,
      limit,
    });
  }

  async getInvoice(invoiceId: string) {
    return this.stripe.invoices.retrieve(invoiceId);
  }

  // Billing Portal
  async createBillingPortalSession(customerId: string, returnUrl: string) {
    return this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
  }

  // Webhooks
  constructWebhookEvent(payload: string | Buffer, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }
}

// Singleton instance
let stripeClient: StripeClient | null = null;

export function getStripeClient(): StripeClient {
  if (!stripeClient) {
    stripeClient = new StripeClient();
  }
  return stripeClient;
}
