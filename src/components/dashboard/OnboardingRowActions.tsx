"use client"

import { useTransition, useState } from "react"
import { Button } from "@/components/ui/button"
import type { OnboardingSubmission } from "@/types/onboarding"
import { useRouter } from "next/navigation"

type OnboardingRowActionsProps = {
  submission: OnboardingSubmission
}

const OnboardingRowActions = ({ submission }: OnboardingRowActionsProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [localError, setLocalError] = useState<string | null>(null)

  const handleRetry = () => {
    startTransition(async () => {
      setLocalError(null)
      try {
        const response = await fetch("/api/onboarding/retry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ submissionId: submission.id })
        })

        if (!response.ok) {
          const data = await response.json().catch(() => ({}))
          throw new Error(data.error || "Nie udało się ponowić próby.")
        }

        router.refresh()
      } catch (error) {
        const message = error instanceof Error ? error.message : "Nie udało się ponowić próby."
        setLocalError(message)
      }
    })
  }

  if (submission.agentId) {
    return (
      <Button
        size="sm"
        variant="outline"
        className="text-[#007BFF] border-[#007BFF]"
        asChild
      >
        <a href={`/dashboard?agentId=${submission.agentId}&submissionId=${submission.id}`}>
          Otwórz
        </a>
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        size="sm"
        variant="outline"
        onClick={handleRetry}
        disabled={isPending}
        className="border-[#007BFF] text-[#007BFF]"
      >
        {isPending ? "Tworzenie..." : "Utwórz agenta ponownie"}
      </Button>
      {localError && (
        <p className="text-xs text-red-500">{localError}</p>
      )}
    </div>
  )
}

export default OnboardingRowActions

