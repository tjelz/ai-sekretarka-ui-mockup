import { AgentAnalytics } from "@/lib/agents/insights"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, HeadphonesIcon, Smile, Gauge } from "lucide-react"

type AgentAnalyticsPanelProps = {
  analytics: AgentAnalytics
}

const metricCards = [
  {
    key: "totalCalls",
    label: "Rozmowy w tym tygodniu",
    icon: HeadphonesIcon
  },
  {
    key: "answeredRate",
    label: "Skuteczność odebrań",
    icon: Gauge
  },
  {
    key: "avgDuration",
    label: "Średnia długość",
    icon: TrendingUp
  },
  {
    key: "sentimentScore",
    label: "Satysfakcja klientów",
    icon: Smile
  }
] as const

const formatMetric = (key: typeof metricCards[number]["key"], analytics: AgentAnalytics) => {
  if (key === "answeredRate") {
    return `${Math.round(analytics.answeredRate * 100)}%`
  }
  if (key === "avgDuration") {
    return `${Math.round(analytics.avgDuration / 60)}m ${analytics.avgDuration % 60}s`
  }
  if (key === "sentimentScore") {
    return `${Math.round(analytics.sentimentScore * 100)} / 100`
  }
  return analytics.totalCalls.toString()
}

const AgentAnalyticsPanel = ({ analytics }: AgentAnalyticsPanelProps) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Wyniki agenta
        </CardTitle>
        <p className="text-sm text-gray-500">Dane za ostatnie 7 dni</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icon className="h-4 w-4 text-[#007BFF]" />
                <span>{label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatMetric(key, analytics)}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#007BFF]" />
            <p className="text-sm font-semibold text-gray-800">Trend rozmów</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <div className="flex h-24 items-end gap-2">
              {analytics.weeklyTrend.map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 text-xs text-gray-500">
                  <div
                    className="w-full rounded-full bg-gradient-to-t from-[#007BFF] to-[#00C6FF]"
                    style={{ height: `${value}%` }}
                  />
                  <span>D{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AgentAnalyticsPanel

