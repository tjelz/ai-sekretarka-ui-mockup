import { NextResponse } from "next/server"
import { z } from "zod"
import {
  getOnboardingSubmission,
  updateOnboardingSubmission
} from "@/lib/onboarding-store"
import { notifyOnboardingCompletion } from "@/lib/crm"

const requestSchema = z.object({
  email: z.string().email(),
  agentId: z.string().min(1),
  submissionId: z.string().min(1)
})

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const { email, agentId, submissionId } = requestSchema.parse(payload)

    const submission = await getOnboardingSubmission(submissionId)

    if (!submission) {
      return NextResponse.json({ error: "Nie znaleziono zgłoszenia onboardingu" }, { status: 404 })
    }

    if (submission.agentId !== agentId) {
      return NextResponse.json(
        { error: "Agent nie odpowiada temu zgłoszeniu. Rozpocznij onboarding ponownie." },
        { status: 400 }
      )
    }

    const updatedSubmission = await updateOnboardingSubmission(submissionId, {
      email,
      status: "completed"
    })

    if (!updatedSubmission) {
      return NextResponse.json({ error: "Nie udało się zaktualizować zgłoszenia" }, { status: 500 })
    }

    await notifyOnboardingCompletion(updatedSubmission)

    const dashboardUrl = `/dashboard?agentId=${agentId}&submissionId=${submissionId}`

    return NextResponse.json({ success: true, dashboardUrl })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Nieprawidłowe dane wejściowe", details: error.errors }, { status: 400 })
    }

    console.error("Błąd zapisu email podczas onboardingu:", error)
    return NextResponse.json({ error: "Nie udało się zapisać danych" }, { status: 500 })
  }
}

