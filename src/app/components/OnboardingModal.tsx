"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, Globe2, Mail, Sparkles, X, CheckCircle2 } from "lucide-react"

type OnboardingModalProps = {
  isOpen: boolean
  onClose: () => void
}

type OnboardingStep = "company" | "email" | "success"

const normalizeWebsiteUrl = (rawUrl: string) => {
  if (!rawUrl.trim()) {
    throw new Error("Podaj adres strony internetowej")
  }

  const hasProtocol = /^https?:\/\//i.test(rawUrl)
  const candidateUrl = hasProtocol ? rawUrl.trim() : `https://${rawUrl.trim()}`
  try {
    const parsedUrl = new URL(candidateUrl)
    return parsedUrl.toString()
  } catch {
    throw new Error("Nieprawidłowy adres URL")
  }
}

const validateEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const router = useRouter()
  const [step, setStep] = useState<OnboardingStep>("company")
  const [companyUrl, setCompanyUrl] = useState("")
  const [email, setEmail] = useState("")
  const [agentId, setAgentId] = useState<string | null>(null)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [agentName, setAgentName] = useState<string | null>(null)
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const resetModalState = useCallback(() => {
    setStep("company")
    setCompanyUrl("")
    setEmail("")
    setAgentId(null)
    setSubmissionId(null)
    setAgentName(null)
    setDashboardUrl(null)
    setIsLoading(false)
    setStatusMessage("")
    setErrorMessage("")
  }, [])

  useEffect(() => {
    if (!isOpen) {
      resetModalState()
    }
  }, [isOpen, resetModalState])

  const handleCloseModal = () => {
    resetModalState()
    onClose()
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseModal()
    }
  }

  const handleModalKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation()
      handleCloseModal()
    }
  }

  const handleNavigateToDashboard = () => {
    if (dashboardUrl) {
      router.push(dashboardUrl)
      handleCloseModal()
      return
    }

    router.push("/dashboard")
    handleCloseModal()
  }

  const handleCompanySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading) {
      return
    }

    try {
      const normalizedUrl = normalizeWebsiteUrl(companyUrl)

      setIsLoading(true)
      setErrorMessage("")
      setStatusMessage("Tworzymy dedykowanego agenta AI...")

      const response = await fetch("/api/onboarding/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyUrl: normalizedUrl })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Nie udało się utworzyć agenta")
      }

      setCompanyUrl(normalizedUrl)
      setAgentId(data.agentId)
      setSubmissionId(data.submissionId)
      setAgentName(data.agentName)
      setStatusMessage("Agent został przygotowany. Poinformuj nas, dokąd wysłać dostęp.")
      setStep("email")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Coś poszło nie tak. Spróbuj ponownie."
      setErrorMessage(message)
      setStatusMessage("")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading) {
      return
    }

    if (!agentId || !submissionId) {
      setErrorMessage("Najpierw wygeneruj agenta, aby przejść dalej.")
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage("Podaj poprawny adres email.")
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage("")
      setStatusMessage("Finalizujemy konfigurację i otwieramy panel sterowania...")

      const response = await fetch("/api/onboarding/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, agentId, submissionId })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Nie udało się zapisać adresu email")
      }

      setDashboardUrl(data.dashboardUrl)
      setStatusMessage("Agent gotowy! Czeka już w Twoim panelu.")
      setStep("success")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Nie udało się zakończyć onboardingu."
      setErrorMessage(message)
      setStatusMessage("")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return null
  }

  const totalSteps = 3
  const currentStepIndex = step === "company" ? 1 : step === "email" ? 2 : 3

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      role="presentation"
      onClick={handleBackdropClick}
      onKeyDown={handleModalKeyDown}
      tabIndex={0}
      aria-label="Okno onboardingowe"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        className="relative w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl focus:outline-none"
      >
        <button
          type="button"
          onClick={handleCloseModal}
          className="absolute right-6 top-6 rounded-full border border-gray-200 bg-white/80 p-2 text-gray-500 transition hover:text-gray-800"
          aria-label="Zamknij onboarding"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex items-center gap-3 text-sm font-semibold text-gray-500">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#007BFF]">
            {currentStepIndex}
          </span>
          <p>Krok {currentStepIndex} z {totalSteps}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-[#007BFF]" />
            <h2 id="onboarding-title" className="text-2xl font-bold text-gray-900">
              Skonfiguruj AI Sekretarkę
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Wykorzystujemy zaawansowaną technologię AI, aby w kilka sekund przygotować agenta dopasowanego do Twojej firmy.
          </p>
        </div>

        {statusMessage && (
          <p className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700" aria-live="polite">
            {statusMessage}
          </p>
        )}

        {errorMessage && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600" aria-live="assertive">
            {errorMessage}
          </p>
        )}

        {step === "company" && (
          <form className="space-y-6" onSubmit={handleCompanySubmit} aria-busy={isLoading}>
            <label htmlFor="company-website" className="text-sm font-semibold text-gray-800">
              Adres strony internetowej
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
              <Globe2 className="h-5 w-5 text-gray-500" />
              <input
                id="company-website"
                type="text"
                value={companyUrl}
                onChange={(event) => setCompanyUrl(event.target.value)}
                placeholder="np. twojastrona.pl"
                className="w-full border-none bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                aria-describedby="company-help"
                aria-label="Podaj adres strony firmowej"
                required
              />
            </div>
            <p id="company-help" className="text-sm text-gray-500">
              Link pomoże nam przygotować kontekst rozmowy dla Twojego agenta.
            </p>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-[#007BFF] text-lg font-semibold text-white hover:bg-[#0056b3]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generujemy agenta...
                </>
              ) : (
                "Przygotuj agenta"
              )}
            </Button>
          </form>
        )}

        {step === "email" && (
          <form className="space-y-6" onSubmit={handleEmailSubmit} aria-busy={isLoading}>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              Agent gotowy: <span className="font-semibold">{agentName || agentId}</span>
            </div>
            <label htmlFor="contact-email" className="text-sm font-semibold text-gray-800">
              Email do wysłania dostępu
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="np. anna@twojafirma.pl"
                className="w-full border-none bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                aria-label="Podaj adres email"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-green-600 text-lg font-semibold text-white hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Kończymy konfigurację...
                </>
              ) : (
                "Przejdź do dashboardu"
              )}
            </Button>
          </form>
        )}

        {step === "success" && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-50 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">Agent gotowy do testów!</p>
              <p className="text-sm text-gray-600">
                Otwórz dashboard, aby wykonać pierwszy test i zarządzać agentem dla{" "}
                <span className="font-semibold text-gray-900">{agentName || "Twojej firmy"}</span>.
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleNavigateToDashboard}
              className="w-full bg-[#007BFF] text-lg font-semibold text-white hover:bg-[#0056b3]"
            >
              Przejdź do dashboardu
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingModal

