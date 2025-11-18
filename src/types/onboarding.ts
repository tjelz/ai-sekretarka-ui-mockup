export type OnboardingStatus = "pending" | "agent_ready" | "completed" | "failed"

export type OnboardingSubmission = {
  id: string
  companyUrl: string
  email?: string | null
  agentId?: string | null
  agentName?: string | null
  isMock?: boolean | null
  status: OnboardingStatus
  createdAt: string
  updatedAt: string
}

