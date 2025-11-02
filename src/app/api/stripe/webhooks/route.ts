/**
 * Stripe Webhooks API Route
 * Handles Stripe webhook events for subscription updates
 */

import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe/client';
import { Pool } from 'pg';
import Stripe from 'stripe';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Disable body parsing to get raw body for signature verification
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();
    const event = stripe.constructWebhookEvent(body, signature);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  await pool.query(
    `UPDATE users
     SET stripe_subscription_id = $1,
         subscription_status = 'active',
         updated_at = NOW()
     WHERE stripe_customer_id = $2`,
    [subscriptionId, customerId]
  );

  console.log(`Checkout completed for customer: ${customerId}`);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;

  await pool.query(
    `UPDATE users
     SET subscription_status = $1,
         subscription_period_end = to_timestamp($2),
         updated_at = NOW()
     WHERE stripe_customer_id = $3`,
    [status, subscription.current_period_end, customerId]
  );

  console.log(`Subscription updated for customer: ${customerId}, status: ${status}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  await pool.query(
    `UPDATE users
     SET subscription_status = 'canceled',
         stripe_subscription_id = NULL,
         updated_at = NOW()
     WHERE stripe_customer_id = $1`,
    [customerId]
  );

  console.log(`Subscription deleted for customer: ${customerId}`);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  await pool.query(
    `INSERT INTO invoices (
       user_id,
       invoice_id,
       amount,
       status,
       paid_at
     )
     SELECT id, $1, $2, 'paid', to_timestamp($3)
     FROM users
     WHERE stripe_customer_id = $4`,
    [invoice.id, invoice.amount_paid, invoice.status_transitions.paid_at, customerId]
  );

  console.log(`Payment succeeded for invoice: ${invoice.id}`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  await pool.query(
    `UPDATE users
     SET subscription_status = 'past_due',
         updated_at = NOW()
     WHERE stripe_customer_id = $1`,
    [customerId]
  );

  console.log(`Payment failed for invoice: ${invoice.id}`);
}
