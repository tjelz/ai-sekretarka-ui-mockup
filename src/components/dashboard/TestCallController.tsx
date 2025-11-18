"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquarePlus, RotateCcw } from "lucide-react"

type ConversationEntry = {
  id: string
  role: "client" | "agent"
  text: string
}

type TestCallControllerProps = {
  agentId: string
}

const presetPrompts = [
  "Czy macie wolny termin na wtorek wieczorem?",
  "Jaka jest cena pakietu premium i co zawiera?",
  "Czy mogę przełożyć wizytę z piątku na niedzielę?"
]

const TestCallController = ({ agentId }: TestCallControllerProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>(presetPrompts[0])
  const [customMessage, setCustomMessage] = useState("")
  const [conversation, setConversation] = useState<ConversationEntry[]>([])
  const [isSending, setIsSending] = useState(false)

  const appendEntry = (entry: ConversationEntry) => {
    setConversation((prev) => [...prev, entry].slice(-10))
  }

  const simulateAgentResponse = (prompt: string) => {
    const responses = [
      "Sprawdzę kalendarz i za chwilę potwierdzę dostępne terminy.",
      "Pakiet premium obejmuje dodatkowe usługi concierge i priorytetowe zapisy.",
      "Nie ma problemu, przełożę wizytę i wyślę potwierdzenie SMS."
    ]
    const idx = prompt.length % responses.length
    appendEntry({
      id: `${Date.now()}-agent`,
      role: "agent",
      text: responses[idx]
    })
  }

  const handleSendPrompt = async () => {
    const message = customMessage.trim() || selectedPrompt
    if (!message) return

    setIsSending(true)
    appendEntry({
      id: `${Date.now()}-client`,
      role: "client",
      text: message
    })

    setCustomMessage("")

    setTimeout(() => {
      simulateAgentResponse(message)
      setIsSending(false)
    }, 1200)
  }

  const handleReset = () => {
    setConversation([])
    setSelectedPrompt(presetPrompts[0])
    setCustomMessage("")
  }

  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Testowe pytania
        </CardTitle>
        <p className="text-sm text-gray-500">Agent ID: {agentId}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
            <SelectTrigger className="w-full border-gray-200">
              <SelectValue placeholder="Wybierz pytanie" />
            </SelectTrigger>
            <SelectContent>
              {presetPrompts.map((prompt) => (
                <SelectItem key={prompt} value={prompt}>
                  {prompt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              type="button"
              className="flex-1 bg-[#007BFF] text-white hover:bg-[#0056b3]"
              onClick={handleSendPrompt}
              disabled={isSending}
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Wyślij
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="border-gray-200 text-gray-600"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Textarea
          placeholder="Lub wpisz własne pytanie..."
          value={customMessage}
          onChange={(event) => setCustomMessage(event.target.value)}
          className="min-h-[100px] border-gray-200 focus-visible:ring-[#007BFF]"
        />

        <ScrollArea className="h-60 rounded-2xl border border-gray-100 bg-gray-50 p-4">
          {conversation.length === 0 ? (
            <p className="text-sm text-gray-500">
              Wyślij pytanie lub wybierz preset, aby zobaczyć symulowaną odpowiedź agenta.
            </p>
          ) : (
            <div className="space-y-3">
              {conversation.map((entry) => (
                <div
                  key={entry.id}
                  className={`rounded-2xl px-3 py-2 text-sm ${
                    entry.role === "agent"
                      ? "bg-white text-gray-800 border border-gray-100"
                      : "bg-[#007BFF] text-white self-end"
                  }`}
                >
                  <p className="text-xs opacity-70 mb-1">
                    {entry.role === "agent" ? "Agent" : "Ty"}
                  </p>
                  {entry.text}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default TestCallController

