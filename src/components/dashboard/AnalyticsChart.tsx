/**
 * Analytics Chart Component
 * Displays conversation analytics using Recharts
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface AnalyticsChartProps {
  data: Array<{
    date: string;
    conversations: number;
    duration: number;
    successRate: number;
  }>;
  type?: 'line' | 'bar';
  title: string;
  description?: string;
}

export function AnalyticsChart({
  data,
  type = 'line',
  title,
  description,
}: AnalyticsChartProps) {
  const Chart = type === 'line' ? LineChart : BarChart;
  const DataComponent = type === 'line' ? Line : Bar;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <Chart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis
              dataKey="date"
              className="text-xs"
              stroke="currentColor"
            />
            <YAxis className="text-xs" stroke="currentColor" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <DataComponent
              type="monotone"
              dataKey="conversations"
              stroke="#3b82f6"
              fill="#3b82f6"
              name="Conversations"
            />
            <DataComponent
              type="monotone"
              dataKey="duration"
              stroke="#10b981"
              fill="#10b981"
              name="Avg Duration (min)"
            />
          </Chart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
