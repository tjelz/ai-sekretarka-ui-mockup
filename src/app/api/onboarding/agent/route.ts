import { NextResponse } from "next/server"
import { z } from "zod"
import { getElevenLabsClient } from "@/lib/elevenlabs/client"
import { randomUUID } from "crypto"
import {
  createOnboardingSubmission,
  updateOnboardingSubmission,
  type OnboardingSubmission
} from "@/lib/onboarding-store"
import {
  getStructuredWebsiteData,
  buildReceptionistKnowledgeContext
} from "@/lib/website-context"

const requestSchema = z.object({
  companyUrl: z.string().min(1)
})

const ensureFullUrl = (rawUrl: string) => {
  const trimmed = rawUrl.trim()
  if (!trimmed) {
    throw new Error("Podaj adres strony internetowej")
  }
  const hasProtocol = /^https?:\/\//i.test(trimmed)
  const candidate = hasProtocol ? trimmed : `https://${trimmed}`
  try {
    return new URL(candidate)
  } catch {
    throw new Error("Nieprawidłowy adres URL")
  }
}

export async function POST(request: Request) {
  let submission: OnboardingSubmission | null = null
  try {
    const payload = await request.json()
    const { companyUrl } = requestSchema.parse(payload)

    let parsedUrl: URL
    try {
      parsedUrl = ensureFullUrl(companyUrl)
    } catch (urlError) {
      const message = urlError instanceof Error ? urlError.message : "Nieprawidłowy adres URL"
      return NextResponse.json({ error: message }, { status: 400 })
    }
    const normalizedUrl = parsedUrl.toString()
    const hostname = parsedUrl.hostname.replace(/^www\./, "")
    const readableName = hostname.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) || hostname

    submission = await createOnboardingSubmission(normalizedUrl)
    const submissionId = submission.id

    const elevenLabsClient = getElevenLabsClient()
    const fallbackVoiceId = "21m00Tcm4TlvDq8ikWAM"
    const voiceId = process.env.ELEVENLABS_DEFAULT_VOICE_ID || fallbackVoiceId

    const websiteData = await getStructuredWebsiteData(normalizedUrl)

    const buildStructuredPrompt = () => {
      // Build knowledge context from structured data
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
        : `Nie udało się automatycznie odczytać treści ze strony ${normalizedUrl}. Użyj wiedzy z witryny, aby odpowiadać na pytania klientów.`

      return [
        "# Personality",
        "",
        `Jesteś głosem marki ${readableName}. Jesteś przyjazny, kompetentny i komunikujesz się jak profesjonalny recepcjonista, który zna ofertę firmy i mówi płynnie po polsku.`,
        "",
        "Twoje cechy:",
        "- Przyjazny i pomocny",
        "- Kompetentny i rzetelny",
        "- Skupiony na potrzebach klienta",
        "- Zna ofertę firmy i potrafi odpowiedzieć na pytania",
        "",
        "# Environment",
        "",
        `Rozmawiasz z klientami przez telefon lub czat głosowy. Użytkownik często dzwoni, aby zapytać o:`,
        "- Dostępne terminy i rezerwacje",
        "- Ceny usług i pakiety",
        "- Lokalizację i dojazd",
        "- Szczegóły oferty firmy",
        "",
        "Masz dostęp do informacji o firmie, ale nie widzisz ekranu klienta ani kontekstu poza rozmową telefoniczną.",
        "",
        "# Tone",
        "",
        "Twój styl komunikacji:",
        "- Mów pewnie, rzeczowo i empatycznie",
        "- Utrzymuj krótkie, klarowne wypowiedzi (2-3 zdania)",
        "- Potwierdzaj zrozumienie krótkimi potwierdzeniami (\"Rozumiem\", \"Oczywiście\", \"Jasne\")",
        "- Zadawaj pytania doprecyzowujące, gdy brakuje danych",
        "- Używaj naturalnych przerw w mowie (oznaczonych przez \"...\") dla lepszej czytelności",
        "",
        "Formatowanie dla syntezy mowy:",
        "- Czytaj numery telefonów z przerwami między grupami cyfr",
        "- Wymawiaj adresy email litera po literze lub używaj \"at\" i \"kropka\"",
        "- Formatuj ceny w sposób naturalny dla mowy (np. \"dwieście dziewięćdziesiąt dziewięć złotych miesięcznie\")",
        "",
        "# Goal",
        "",
        "Twoje główne cele w rozmowie:",
        "",
        "1. **Szybkie rozpoznanie potrzeb**:",
        "   - Ustal, w czym klient potrzebuje pomocy (rezerwacja, wycena, informacje)",
        "   - Zidentyfikuj konkretną usługę lub produkt, o który pyta klient",
        "",
        "2. **Dostarczenie informacji**:",
        "   - Udzielaj odpowiedzi bazując na kontekście strony i aktualnej ofercie",
        "   - Podawaj dokładne informacje o cenach, terminach i dostępności",
        "   - Jeśli czegoś nie wiesz, szczerze to przyznaj i zaproponuj alternatywę",
        "",
        "3. **Proaktywne działanie**:",
        "   - Gdy klient jest gotowy, zaproponuj rezerwację lub kolejne kroki",
        "   - Zaproponuj wysłanie potwierdzenia SMS lub email",
        "   - Zapytaj, czy są jeszcze jakieś pytania",
        "",
        "4. **Podsumowanie**:",
        "   - Zawsze podsumuj ustalenia na końcu rozmowy",
        "   - Potwierdź szczegóły rezerwacji lub następne kroki",
        "",
        "# Guardrails",
        "",
        "Zasady i ograniczenia:",
        "",
        "- **Dokładność informacji**:",
        "  - Nie wymyślaj informacji; jeśli czegoś nie ma w kontekście, poproś klienta o doprecyzowanie",
        "  - Jeśli nie jesteś pewien, powiedz \"Sprawdzę to dla Pana/Pani\" i poproś o kontakt z działem obsługi",
        "",
        "- **Zakres kompetencji**:",
        "  - Nie podawaj porad medycznych, prawnych ani finansowych",
        "  - W razie potrzeby skieruj rozmowę do odpowiedniego specjalisty lub działu",
        "",
        "- **Granice usług**:",
        `  - Jeśli klient pyta o kwestie spoza zakresu usług ${readableName}, poinformuj o ograniczeniach`,
        "  - Zawsze bądź uprzejmy, nawet gdy nie możesz pomóc",
        "",
        "- **Poufność**:",
        "  - Nie udostępniaj danych osobowych innych klientów",
        "  - Szanuj prywatność i zgodę na przetwarzanie danych",
        "",
        "# Knowledge Context",
        "",
        knowledgeContext
      ].join("\n")
    }

    const structuredPrompt = buildStructuredPrompt()

    const agentPayload = {
      name: `${readableName} AI Sekretarka`,
      voice_id: voiceId,
      language: "pl",
      description: `Dedykowany agent AI przygotowany dla ${hostname}`,
      greeting_message: `Cześć! Jestem asystentem ${readableName}. Jak mogę pomóc?`,
      context: structuredPrompt,
      conversation_config: {
        speaking_style: "friendly",
        response_length: "medium" as const,
        temperature: 0.4,
        agent: {
          prompt: {
            prompt: structuredPrompt
          }
        }
      }
    }

    try {
      const agent = await elevenLabsClient.createAgent(agentPayload)
      await updateOnboardingSubmission(submissionId, {
        agentId: agent.agent_id,
        agentName: agent.name,
        status: "agent_ready",
        isMock: false
      })
      return NextResponse.json({
        submissionId,
        agentId: agent.agent_id,
        agentName: agent.name
      })
    } catch (error) {
      const shouldMock =
        error instanceof Error &&
        error.message.includes("405") &&
        process.env.NODE_ENV !== "production"

      if (!shouldMock) {
        throw error
      }

      console.warn("Falling back to mock ElevenLabs agent due to 405:", error)

      const mockAgentId = `mock-${randomUUID()}`
      await updateOnboardingSubmission(submissionId, {
        agentId: mockAgentId,
        agentName: agentPayload.name,
        status: "agent_ready",
        isMock: true
      })
      return NextResponse.json({
        submissionId,
        agentId: mockAgentId,
        agentName: agentPayload.name,
        isMock: true
      })
    }
  } catch (error) {
    if (submission) {
      await updateOnboardingSubmission(submission.id, { status: "failed" })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Nieprawidłowe dane wejściowe", details: error.errors }, { status: 400 })
    }

    console.error("Błąd tworzenia agenta ElevenLabs:", error)

    return NextResponse.json({ error: "Nie udało się połączyć z ElevenLabs. Spróbuj ponownie za chwilę." }, { status: 502 })
  }
}

