export type AgentAnalytics = {
  totalCalls: number
  answeredRate: number
  avgDuration: number
  sentimentScore: number
  weeklyTrend: number[]
}

import { getElevenLabsClient } from '@/lib/elevenlabs/client'

export type AgentTranscript = {
  id: string
  caller: string
  summary: string
  sentiment: "positive" | "neutral" | "negative"
  durationSeconds: number
  createdAt: string
  highlights: string[]
}

interface ElevenLabsConversation {
  id?: string
  caller?: string
  summary?: string
  duration_seconds?: number
  created_at?: string
}

const baseNames = ["Anna", "Kasia", "Marek", "Piotr", "Ola", "Ewa", "Karol"]
const sampleSummaries = [
  "Klient pytał o wolne terminy w przyszłym tygodniu i poprosił o potwierdzenie SMS-em.",
  "Pytania o ceny pakietów premium – wyjaśniono różnice oraz zasady płatności.",
  "Klient zgłosił problem z rezerwacją i poprosił o szybkie oddzwonienie.",
  "Nowe zapytanie o dostępność wieczornych wizyt i możliwość rezerwacji online."
]
const sampleHighlights = [
  "Potwierdzono termin wizyty",
  "Wysłano SMS podsumowujący",
  "Zapytanie o ceny pakietów",
  "Klient wrócił po poprzedniej rozmowie",
  "Wysoka satysfakcja klienta"
]

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const getSeed = (agentId: string) => {
  return agentId
    .split("")
    .map((char) => char.charCodeAt(0))
    .reduce((acc, code) => acc + code, 0)
}

const buildTrend = (seed: number): number[] => {
  return Array.from({ length: 7 }).map((_, idx) => {
    const base = 60 + pseudoRandom(seed + idx) * 30
    return Math.round(base)
  })
}

export const getAgentAnalytics = async (agentId: string): Promise<AgentAnalytics> => {
  try {
    const elevenLabsClient = getElevenLabsClient()

    // Get metrics for the last 7 days
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)

    const metrics = await elevenLabsClient.getAgentMetrics(agentId, startDate, endDate)

    // Map ElevenLabs metrics to our analytics structure
    const totalCalls = metrics.total_conversations
    const answeredRate = metrics.success_rate || 0.85 // Default fallback
    const avgDuration = metrics.average_duration_seconds || 180 // Default fallback
    const sentimentScore = 0.75 // ElevenLabs doesn't provide sentiment directly, using default

    // Build weekly trend from available data (simplified for now)
    const weeklyTrend = Array.from({ length: 7 }).map(() => 60)

    return {
      totalCalls,
      answeredRate,
      avgDuration,
      sentimentScore,
      weeklyTrend
    }
  } catch (error) {
    console.warn('Failed to fetch real analytics data from ElevenLabs, falling back to mock data:', error)

    // Fallback to mock data if API fails
    const seed = getSeed(agentId)
    return {
      totalCalls: 120 + Math.round(pseudoRandom(seed) * 80),
      answeredRate: 0.7 + pseudoRandom(seed + 1) * 0.25,
      avgDuration: 180 + Math.round(pseudoRandom(seed + 2) * 120),
      sentimentScore: 0.5 + pseudoRandom(seed + 3) * 0.5,
      weeklyTrend: buildTrend(seed + 4)
    }
  }
}

export const getRecentTranscripts = async (
  agentId: string
): Promise<AgentTranscript[]> => {
  try {
    const elevenLabsClient = getElevenLabsClient()

    // Get recent conversation history
    const conversations = await elevenLabsClient.getConversationHistory(agentId, 4, 0)

    // Map ElevenLabs conversations to our transcript structure
    return (conversations as ElevenLabsConversation[]).map((conversation: ElevenLabsConversation, idx: number) => {
      // Extract caller info from conversation data
      const caller = conversation.caller || baseNames[idx % baseNames.length]
      const duration = conversation.duration_seconds || 90

      // Map sentiment (ElevenLabs may not provide this directly)
      const sentimentOptions: AgentTranscript["sentiment"][] = ["positive", "neutral", "negative"]
      const sentiment = sentimentOptions[idx % sentimentOptions.length]

      // Generate highlights (ElevenLabs may not provide these)
      const highlightStart = idx % sampleHighlights.length
      const highlights = [
        sampleHighlights[highlightStart],
        sampleHighlights[(highlightStart + 1) % sampleHighlights.length]
      ]

      return {
        id: conversation.id || `${agentId}-${idx}`,
        caller: caller,
        summary: conversation.summary || sampleSummaries[idx % sampleSummaries.length],
        sentiment,
        durationSeconds: duration,
        createdAt: conversation.created_at || new Date(Date.now() - idx * 3600 * 1000).toISOString(),
        highlights
      }
    })
  } catch (error) {
    console.warn('Failed to fetch real transcript data from ElevenLabs, falling back to mock data:', error)

    // Fallback to mock data if API fails
    const seed = getSeed(agentId)
    return Array.from({ length: 4 }).map((_, idx) => {
      const caller = baseNames[(idx + seed) % baseNames.length]
      const sentimentOptions: AgentTranscript["sentiment"][] = ["positive", "neutral", "negative"]
      const sentiment = sentimentOptions[(idx + seed) % sentimentOptions.length]

      const highlightStart = (idx + seed) % sampleHighlights.length
      const highlights = [
        sampleHighlights[highlightStart],
        sampleHighlights[(highlightStart + 2) % sampleHighlights.length]
      ]

      return {
        id: `${agentId}-${idx}`,
        caller: `${caller} (${600 + idx}-${200 + idx})`,
        summary: sampleSummaries[idx % sampleSummaries.length],
        sentiment,
        durationSeconds: 90 + Math.round(pseudoRandom(seed + idx) * 210),
        createdAt: new Date(Date.now() - idx * 3600 * 1000).toISOString(),
        highlights
      }
    })
  }
}

