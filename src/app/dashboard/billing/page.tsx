/**
 * Billing & Subscription Page
 * Manages subscription plans and payment methods
 */

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, CreditCard, Download } from 'lucide-react';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe/client';

export default async function BillingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  // Mock subscription data - replace with actual API calls
  const currentPlan = 'PRO';
  const usageData = {
    calls: { current: 756, limit: 1000 },
    agents: { current: 3, limit: 5 },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the {SUBSCRIPTION_TIERS[currentPlan as keyof typeof SUBSCRIPTION_TIERS].name} plan
              </CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Usage Stats */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Monthly Calls</span>
                <span className="text-sm text-gray-500">
                  {usageData.calls.current} / {usageData.calls.limit}
                </span>
              </div>
              <Progress
                value={(usageData.calls.current / usageData.calls.limit) * 100}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">AI Agents</span>
                <span className="text-sm text-gray-500">
                  {usageData.agents.current} / {usageData.agents.limit}
                </span>
              </div>
              <Progress
                value={(usageData.agents.current / usageData.agents.limit) * 100}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500">Next billing date</p>
              <p className="font-medium">December 1, 2025</p>
            </div>
            <Button variant="outline">Manage Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => (
            <Card
              key={key}
              className={
                currentPlan === key
                  ? 'border-2 border-blue-500'
                  : 'hover:shadow-lg transition-shadow'
              }
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={currentPlan === key ? 'secondary' : 'default'}
                  disabled={currentPlan === key}
                >
                  {currentPlan === key ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-8 w-8 text-gray-400" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2025</p>
              </div>
            </div>
            <Badge>Default</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">Invoice #{1000 + i}</p>
                  <p className="text-sm text-gray-500">
                    November {i}, 2025 - $99.00
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
