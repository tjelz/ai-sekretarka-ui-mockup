"use client"

import { AgentTranscript } from "@/lib/agents/insights"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react"

type TranscriptListProps = {
  transcripts: AgentTranscript[]
}

const sentimentConfig: Record<AgentTranscript["sentiment"], { label: string; className: string }> = {
  positive: {
    label: "Pozytywny",
    className: "bg-green-100 text-green-700"
  },
  neutral: {
    label: "Neutralny",
    className: "bg-gray-100 text-gray-700"
  },
  negative: {
    label: "Negatywny",
    className: "bg-red-100 text-red-700"
  }
}

const TranscriptList = ({ transcripts }: TranscriptListProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleRow = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Ostatnie rozmowy
        </CardTitle>
        <p className="text-sm text-gray-500">Szybki podgląd transkryptów</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {transcripts.map((transcript) => {
          const isExpanded = expanded[transcript.id]
          const sentiment = sentimentConfig[transcript.sentiment]
          const durationMinutes = Math.floor(transcript.durationSeconds / 60)
          const durationSeconds = transcript.durationSeconds % 60

          return (
            <div
              key={transcript.id}
              className="rounded-2xl border border-gray-100 p-4 space-y-3"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{transcript.caller}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(transcript.createdAt).toLocaleString("pl-PL", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${sentiment.className} border-none`}>
                    {sentiment.label}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {durationMinutes}m {durationSeconds}s
                  </span>
                </div>
              </div>

              <p className={`text-sm text-gray-700 ${!isExpanded ? "line-clamp-2" : ""}`}>
                {transcript.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {transcript.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#007BFF]"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleRow(transcript.id)}
                  aria-label={isExpanded ? "Zwiń transkrypt" : "Rozwiń transkrypt"}
                  className="text-[#007BFF] hover:text-[#0056b3]"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="mr-1 h-4 w-4" />
                      Zwiń
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-1 h-4 w-4" />
                      Rozwiń
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-[#007BFF] text-[#007BFF] hover:bg-blue-50"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Otwórz w panelu
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TranscriptList

