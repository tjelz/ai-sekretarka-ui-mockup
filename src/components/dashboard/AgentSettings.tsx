"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Settings, Save, RotateCcw } from "lucide-react"
import type { Voice } from "@/lib/elevenlabs/client"

type AgentSettingsProps = {
  agentId: string
  initialName?: string
  initialGreeting?: string
  initialVoiceId?: string
  initialContext?: string
  initialSpeakingStyle?: string
  initialResponseLength?: string
  initialTemperature?: number
  onSave?: () => void
}

type AgentConfig = {
  name: string
  greeting_message: string
  voice_id: string
  context: string
  conversation_config: {
    speaking_style: string
    response_length: "short" | "medium" | "long"
    temperature: number
  }
}

export const AgentSettings = ({
  agentId,
  initialName = "",
  initialGreeting = "",
  initialVoiceId = "",
  initialContext = "",
  initialSpeakingStyle = "friendly",
  initialResponseLength = "medium",
  initialTemperature = 0.4,
  onSave
}: AgentSettingsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [voices, setVoices] = useState<Voice[]>([])
  const [isLoadingVoices, setIsLoadingVoices] = useState(true)

  // Form state
  const [name, setName] = useState(initialName)
  const [greeting, setGreeting] = useState(initialGreeting)
  const [voiceId, setVoiceId] = useState(initialVoiceId)
  const [context, setContext] = useState(initialContext)
  const [speakingStyle, setSpeakingStyle] = useState(initialSpeakingStyle)
  const [responseLength, setResponseLength] = useState(initialResponseLength)
  const [temperature, setTemperature] = useState(initialTemperature)

  // Load available voices
  useEffect(() => {
    const loadVoices = async () => {
      try {
        const response = await fetch("/api/voices")
        if (response.ok) {
          const data = await response.json()
          setVoices(data.voices || [])
        }
      } catch (error) {
        console.error("Failed to load voices:", error)
      } finally {
        setIsLoadingVoices(false)
      }
    }

    loadVoices()
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const config: AgentConfig = {
        name,
        greeting_message: greeting,
        voice_id: voiceId,
        context,
        conversation_config: {
          speaking_style: speakingStyle,
          response_length: responseLength as "short" | "medium" | "long",
          temperature
        }
      }

      const response = await fetch(`/api/agents/${agentId}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config)
      })

      if (!response.ok) {
        throw new Error("Failed to update agent settings")
      }

      onSave?.()
    } catch (error) {
      console.error("Error saving agent settings:", error)
      // TODO: Show error message to user
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setName(initialName)
    setGreeting(initialGreeting)
    setVoiceId(initialVoiceId)
    setContext(initialContext)
    setSpeakingStyle(initialSpeakingStyle)
    setResponseLength(initialResponseLength)
    setTemperature(initialTemperature)
  }

  const selectedVoice = voices.find(v => v.voice_id === voiceId)

  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Ustawienia agenta
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-gray-200 text-gray-600"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#007BFF] text-white hover:bg-[#0056b3]"
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Zapisywanie..." : "Zapisz"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Nazwa agenta</Label>
              <Input
                id="agent-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nazwa Twojego agenta"
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-voice">Głos</Label>
              <Select value={voiceId} onValueChange={setVoiceId}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder={isLoadingVoices ? "Ładowanie głosów..." : "Wybierz głos"}>
                    {selectedVoice ? `${selectedVoice.name} (${selectedVoice.category})` : "Wybierz głos"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.voice_id} value={voice.voice_id}>
                      {voice.name} - {voice.category}
                      {voice.description && (
                        <span className="text-xs text-gray-500 ml-2">
                          {voice.description}
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedVoice?.preview_url && (
                <div className="text-xs text-gray-500">
                  <Badge variant="secondary" className="text-xs">
                    Podgląd dostępny
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="greeting">Powitanie</Label>
            <Textarea
              id="greeting"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="Cześć! Jestem asystentem Twojej firmy. Jak mogę pomóc?"
              className="min-h-[80px] border-gray-200"
            />
          </div>
        </div>

        {/* Conversation Style */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Styl rozmowy</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="speaking-style">Styl mówienia</Label>
              <Select value={speakingStyle} onValueChange={setSpeakingStyle}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Przyjazny</SelectItem>
                  <SelectItem value="professional">Profesjonalny</SelectItem>
                  <SelectItem value="casual">Niezobowiązujący</SelectItem>
                  <SelectItem value="formal">Formalny</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="response-length">Długość odpowiedzi</Label>
              <Select value={responseLength} onValueChange={setResponseLength}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Krótka</SelectItem>
                  <SelectItem value="medium">Średnia</SelectItem>
                  <SelectItem value="long">Długa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature">Kreatywność odpowiedzi: {temperature.toFixed(1)}</Label>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Konserwatywny</span>
              <span>Kreatywny</span>
            </div>
          </div>
        </div>

        {/* Knowledge Context */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Kontekst wiedzy</h3>
          <div className="space-y-2">
            <Label htmlFor="context">Instrukcje dla agenta</Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Opisz tutaj wiedzę i instrukcje dla agenta..."
              className="min-h-[120px] border-gray-200"
            />
            <p className="text-xs text-gray-500">
              Te instrukcje pomogą agentowi lepiej rozumieć Twoją firmę i jak odpowiadać na pytania klientów.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AgentSettings




