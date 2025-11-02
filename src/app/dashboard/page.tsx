/**
 * Dashboard Overview Page
 * Main dashboard with key metrics and recent activity
 */

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Phone, TrendingUp, Clock, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  // Mock data - replace with actual API calls
  const recentActivity = [
    {
      id: 1,
      agent: 'Sales Assistant',
      activity: 'Completed 3 calls',
      time: '5 minutes ago',
    },
    {
      id: 2,
      agent: 'Support Bot',
      activity: 'New conversation started',
      time: '12 minutes ago',
    },
    {
      id: 3,
      agent: 'Sales Assistant',
      activity: 'Updated configuration',
      time: '1 hour ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session.user.name || 'User'}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Here's what's happening with your AI agents today
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/dashboard/agents/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Agent
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/analytics">
            View Analytics
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/billing">
            Upgrade Plan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Agents"
          value="3"
          description="Running now"
          icon={Bot}
          trend={{ value: 50, isPositive: true }}
        />
        <StatsCard
          title="Total Calls Today"
          value="124"
          description="Across all agents"
          icon={Phone}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Success Rate"
          value="89%"
          description="Last 24 hours"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Avg Call Duration"
          value="3.2 min"
          description="This week"
          icon={Clock}
          trend={{ value: 8, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your AI agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{item.agent}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.activity}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/dashboard/analytics">View All Activity</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Your current plan usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Monthly Calls</span>
                  <span className="text-sm text-gray-500">756 / 1,000</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: '75.6%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">AI Agents</span>
                  <span className="text-sm text-gray-500">3 / 5</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: '60%' }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 mb-3">
                  You're on the <strong>Pro Plan</strong>
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/billing">Manage Subscription</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Guide (for new users) */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle>Get Started with AI Agents</CardTitle>
          <CardDescription>
            Follow these steps to set up your first AI voice assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Configure your ElevenLabs API key</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add your API credentials in Settings
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Create your first AI agent</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose a voice and customize the personality
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Test and deploy</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Try a test call and go live
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <Button asChild>
              <Link href="/dashboard/agents/new">Create First Agent</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
