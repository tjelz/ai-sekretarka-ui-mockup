/**
 * Analytics Dashboard Page
 * Displays conversation metrics and analytics
 */

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Phone, Clock, TrendingUp, Users } from 'lucide-react';

// Mock data - replace with actual API calls
const mockData = [
  { date: 'Mon', conversations: 45, duration: 3.2, successRate: 85 },
  { date: 'Tue', conversations: 52, duration: 2.8, successRate: 88 },
  { date: 'Wed', conversations: 48, duration: 3.5, successRate: 82 },
  { date: 'Thu', conversations: 61, duration: 3.1, successRate: 90 },
  { date: 'Fri', conversations: 55, duration: 2.9, successRate: 87 },
  { date: 'Sat', conversations: 38, duration: 3.4, successRate: 83 },
  { date: 'Sun', conversations: 42, duration: 3.0, successRate: 86 },
];

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track your AI agents' performance and metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Conversations"
          value="1,234"
          description="This month"
          icon={Phone}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Avg Duration"
          value="3.2 min"
          description="Per conversation"
          icon={Clock}
          trend={{ value: 5.2, isPositive: false }}
        />
        <StatsCard
          title="Success Rate"
          value="86%"
          description="Completed calls"
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatsCard
          title="Active Agents"
          value="3"
          description="Running now"
          icon={Users}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AnalyticsChart
          data={mockData}
          type="line"
          title="Conversation Trends"
          description="Daily conversation volume over the past week"
        />
        <AnalyticsChart
          data={mockData}
          type="bar"
          title="Performance Metrics"
          description="Average call duration and volume"
        />
      </div>

      {/* Additional metrics can be added here */}
    </div>
  );
}
