"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, PhoneCall, Pause, Play } from "lucide-react"

type LiveEvent = {
  id: string
  timestamp: string
  message: string
}

type LiveCallMonitorProps = {
  agentName?: string | null
}

const mockMessages = [
  "Odbieranie połączenia przychodzącego...",
  "Przedstawienie się klientowi i potwierdzenie danych.",
  "Klient pyta o dostępność terminu w przyszłym tygodniu.",
  "Agent proponuje dwa alternatywne terminy.",
  "Klient wybiera termin i potwierdza SMS.",
  "Agent kończy rozmowę i wysyła podsumowanie."
]

const LiveCallMonitor = ({ agentName }: LiveCallMonitorProps) => {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [events, setEvents] = useState<LiveEvent[]>([])
  const [status, setStatus] = useState<"idle" | "in_call" | "paused">("idle")

  useEffect(() => {
    if (!isMonitoring) {
      setStatus("idle")
      setEvents([])
      return
    }

    setStatus("in_call")
    let index = 0

    const interval = setInterval(() => {
      setEvents((prev) => [
        ...prev.slice(-7),
        {
          id: `${Date.now()}-${index}`,
          timestamp: new Date().toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" }),
          message: mockMessages[index % mockMessages.length]
        }
      ])
      index += 1
    }, 2500)

    return () => {
      clearInterval(interval)
    }
  }, [isMonitoring])

  const handleToggleMonitoring = () => {
    setIsMonitoring((prev) => !prev)
  }

  const statusLabel =
    status === "in_call" ? "Live" : status === "paused" ? "Wstrzymane" : "Offline"

  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Podgląd rozmów na żywo
        </CardTitle>
        <div className="flex items-center gap-3">
          <Badge
            className={`flex items-center gap-1 ${
              status === "in_call"
                ? "bg-green-100 text-green-700"
                : status === "paused"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            {statusLabel}
          </Badge>

          <Button
            type="button"
            size="sm"
            variant={isMonitoring ? "outline" : "default"}
            onClick={handleToggleMonitoring}
            className={isMonitoring ? "border-red-500 text-red-500 hover:bg-red-50" : ""}
          >
            {isMonitoring ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Zatrzymaj
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Live
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-900">
            {agentName || "Agent"} · Monitoring aktywności
          </p>
          <p className="text-xs text-gray-500">
            Status aktualizowany co kilka sekund. Wersja demo pokazuje przykładowy przebieg
            rozmowy.
          </p>
        </div>

        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3"
            >
              <div className="mt-1">
                <PhoneCall className="h-4 w-4 text-[#007BFF]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{event.timestamp}</p>
                <p className="text-sm text-gray-800">{event.message}</p>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center text-sm text-gray-500">
              Włącz monitoring, aby zobaczyć przebieg rozmów w czasie rzeczywistym.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default LiveCallMonitor

