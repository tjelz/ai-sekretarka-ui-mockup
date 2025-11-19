"use client"

import { useEffect, useState } from "react"
import { AgentAnalytics } from "@/lib/agents/insights"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, HeadphonesIcon, Smile, Clock, PhoneIncoming } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

type AgentAnalyticsPanelProps = {
  analytics: AgentAnalytics
}

const AgentAnalyticsPanel = ({ analytics }: AgentAnalyticsPanelProps) => {
  // Prepare data for Recharts
  const chartData = analytics.weeklyTrend.map((value, index) => ({
    day: `Dzień ${index + 1}`,
    calls: value
  }))

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wszystkie Rozmowy</CardTitle>
            <HeadphonesIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% w stosunku do zeszłego tygodnia
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skuteczność</CardTitle>
            <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analytics.answeredRate * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              Odebranych połączeń
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Średni Czas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
                {Math.floor(analytics.avgDuration / 60)}m {analytics.avgDuration % 60}s
            </div>
            <p className="text-xs text-muted-foreground">
              Na jedną rozmowę
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zadowolenie</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analytics.sentimentScore * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              Pozytywnych opinii
            </p>
          </CardContent>
        </Card>
        </div>

      {/* Main Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Aktywność Agenta</CardTitle>
          <CardDescription>
            Liczba rozmów w ciągu ostatnich 7 dni
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="day"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar
                    dataKey="calls"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-gray-50/50 animate-pulse rounded-lg" />
            )}
          </div>
        </CardContent>
    </Card>
    </div>
  )
}

export default AgentAnalyticsPanel
