/**
 * Stripe Checkout API Route
 * Creates checkout sessions for subscription purchases
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getStripeClient, SUBSCRIPTION_TIERS } from '@/lib/stripe/client';
import { z } from 'zod';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const checkoutSchema = z.object({
  tier: z.enum(['BASIC', 'PRO', 'ENTERPRISE']),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

// POST /api/stripe/checkout - Create checkout session
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { tier, successUrl, cancelUrl } = checkoutSchema.parse(body);

    const priceId = SUBSCRIPTION_TIERS[tier].priceId;
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID not configured for this tier' },
        { status: 400 }
      );
    }

    // Get or create Stripe customer
    const userResult = await pool.query(
      'SELECT stripe_customer_id FROM users WHERE email = $1',
      [session.user.email]
    );

    let customerId = userResult.rows[0]?.stripe_customer_id;

    const stripe = getStripeClient();

    if (!customerId) {
      // Create new Stripe customer
      const customer = await stripe.createCustomer(
        session.user.email,
        session.user.name || undefined,
        { userId: session.user.id }
      );

      customerId = customer.id;

      // Save customer ID to database
      await pool.query(
        'UPDATE users SET stripe_customer_id = $1 WHERE email = $2',
        [customerId, session.user.email]
      );
    }

    // Create checkout session
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const checkoutSession = await stripe.createCheckoutSession({
      customerId,
      priceId,
      successUrl: successUrl || `${baseUrl}/dashboard/billing?success=true`,
      cancelUrl: cancelUrl || `${baseUrl}/dashboard/billing?canceled=true`,
      metadata: {
        userId: session.user.id,
        tier,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
