import { NextResponse } from "next/server"
import { z } from "zod"
import { getOnboardingSubmission, updateOnboardingSubmission } from "@/lib/onboarding-store"
import { getElevenLabsClient } from "@/lib/elevenlabs/client"
import {
  getStructuredWebsiteData,
  buildReceptionistKnowledgeContext
} from "@/lib/website-context"

const requestSchema = z.object({
  submissionId: z.string().uuid()
})

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const { submissionId } = requestSchema.parse(payload)

    const submission = await getOnboardingSubmission(submissionId)

    if (!submission) {
      return NextResponse.json({ error: "Nie znaleziono zgłoszenia" }, { status: 404 })
    }

    if (submission.status === "completed") {
      return NextResponse.json({ error: "Agent został już ukończony" }, { status: 400 })
    }

    const companyUrl = submission.companyUrl
    const websiteData = await getStructuredWebsiteData(companyUrl)
    const hostname = new URL(companyUrl).hostname.replace(/^www\./, "")
    const readableName = hostname.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) || hostname

    const knowledgeContext = websiteData
      ? buildReceptionistKnowledgeContext(
          websiteData.title,
          websiteData.description,
          websiteData.hero,
          websiteData.offerings,
          websiteData.productHighlights,
          websiteData.pricingHighlights,
          websiteData.faqHighlights,
          websiteData.phones,
          websiteData.emails,
          websiteData.address,
          websiteData.businessHours
        )
      : `Nie udało się automatycznie odczytać treści ze strony ${companyUrl}. Użyj wiedzy z witryny, aby odpowiadać na pytania klientów.`

    const instructions = [
      "# Personality",
      "",
      `Jesteś głosem marki ${readableName}. Jesteś przyjazny, kompetentny i komunikujesz się jak profesjonalny recepcjonista, który zna ofertę firmy i mówi płynnie po polsku.`,
      "",
      "# Environment",
      "",
      `Rozmawiasz z klientami przez telefon lub czat głosowy. Użytkownik często dzwoni, aby zapytać o dostępne terminy, ceny usług, lokalizację oraz szczegóły oferty firmy.`,
      "",
      "# Tone",
      "",
      "Mów pewnie, rzeczowo i empatycznie. Utrzymuj krótkie, klarowne wypowiedzi (2-3 zdania), potwierdzaj zrozumienie i zadawaj pytania doprecyzowujące, gdy brakuje danych.",
      "",
      "# Goal",
      "",
      "1. Szybko ustal, w czym klient potrzebuje pomocy (rezerwacja, wycena, informacje).",
      "2. Udzielaj odpowiedzi bazując na kontekście strony i aktualnej ofercie.",
      "3. Gdy klient jest gotowy, zaproponuj rezerwację lub kolejne kroki (np. wysłanie potwierdzenia SMS).",
      "4. Zawsze podsumuj ustalenia na końcu rozmowy.",
      "",
      "# Guardrails",
      "",
      "- Nie wymyślaj informacji; jeśli czegoś nie ma w kontekście, poproś klienta o doprecyzowanie.",
      "- Nie podawaj porad medycznych/finansowych; w razie potrzeby skieruj rozmowę do człowieka.",
      `- Jeśli klient pyta o kwestie spoza zakresu usług ${readableName}, poinformuj o ograniczeniach.`,
      "",
      "# Knowledge Context",
      "",
      knowledgeContext
    ].join("\n")

    const elevenLabsClient = getElevenLabsClient()
    const fallbackVoiceId = "21m00Tcm4TlvDq8ikWAM"
    const voiceId = process.env.ELEVENLABS_DEFAULT_VOICE_ID || fallbackVoiceId

    const agentPayload = {
      name: `${readableName} AI Sekretarka`,
      voice_id: voiceId,
      language: "pl",
      description: `Dedykowany agent AI przygotowany dla ${hostname}`,
      greeting_message: `Cześć! Jestem asystentem ${readableName}. Jak mogę pomóc?`,
      context: instructions,
      conversation_config: {
        speaking_style: "friendly",
        response_length: "medium" as const,
        temperature: 0.4,
        agent: {
          prompt: {
            prompt: instructions
          }
        }
      }
    }

    const agent = await elevenLabsClient.createAgent(agentPayload)

    const updated = await updateOnboardingSubmission(submissionId, {
      agentId: agent.agent_id,
      agentName: agent.name,
      status: "agent_ready",
      isMock: false
    })

    return NextResponse.json({ submission: updated })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Nieprawidłowe dane wejściowe" }, { status: 400 })
    }

    console.error("Błąd ponownej próby utworzenia agenta:", error)
    return NextResponse.json({ error: "Nie udało się utworzyć agenta" }, { status: 500 })
  }
}

