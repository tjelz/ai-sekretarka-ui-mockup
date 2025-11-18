"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, PlayCircle, PauseCircle, Activity } from "lucide-react"

type AgentQuickActionsProps = {
  agentId: string
  audioPreviewUrl?: string
}

const AgentQuickActions = ({ agentId, audioPreviewUrl }: AgentQuickActionsProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isSamplePlaying, setIsSamplePlaying] = useState(false)
  const [isSimulatingCall, setIsSimulatingCall] = useState(false)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleToggleSample = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioPreviewUrl || "/audio-call-1.mp3")
      audioRef.current.onended = () => setIsSamplePlaying(false)
    }

    if (isSamplePlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsSamplePlaying(false)
      return
    }

    try {
      await audioRef.current.play()
      setIsSamplePlaying(true)
    } catch (error) {
      console.error("Nie udało się odtworzyć próbki audio", error)
      setIsSamplePlaying(false)
    }
  }

  const handleSimulateCall = () => {
    if (isSimulatingCall) {
      return
    }
    setIsSimulatingCall(true)
    setTimeout(() => {
      setIsSimulatingCall(false)
    }, 2500)
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button
        type="button"
        onClick={handleToggleSample}
        aria-label="Odtwórz przykładową odpowiedź agenta"
        className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
      >
        {isSamplePlaying ? (
          <>
            <PauseCircle className="h-5 w-5" />
            Zatrzymaj próbkę
          </>
        ) : (
          <>
            <PlayCircle className="h-5 w-5" />
            Odtwórz próbkę
          </>
        )}
      </Button>
      <Button
        type="button"
        onClick={handleSimulateCall}
        aria-label="Zasymuluj połączenie testowe z agentem"
        className="flex items-center justify-center gap-2 border border-gray-300 text-gray-900 hover:bg-gray-100"
        variant="outline"
        disabled={isSimulatingCall}
      >
        <Phone className="h-5 w-5" />
        {isSimulatingCall ? "Łączenie..." : "Zadzwoń testowo"}
      </Button>
      <div className="sm:col-span-2 rounded-2xl border border-green-100 bg-green-50 p-4 text-sm text-green-800 flex items-center gap-3">
        <Activity className="h-5 w-5" />
        <span>
          Agent <strong>{agentId}</strong> jest aktywny i gotowy do przyjmowania rozmów.
        </span>
      </div>
    </div>
  )
}

export default AgentQuickActions

