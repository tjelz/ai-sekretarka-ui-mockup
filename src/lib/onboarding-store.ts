import { randomUUID } from "crypto"
import {
  insertOnboardingSubmission,
  selectOnboardingSubmission,
  updateOnboardingSubmissionRow,
  toSubmission,
  type UpdateOnboardingSubmissionInput
} from "@/db/onboarding"
import type { OnboardingSubmission } from "@/types/onboarding"

export const createOnboardingSubmission = async (
  companyUrl: string
): Promise<OnboardingSubmission> => {
  const record = await insertOnboardingSubmission({
    id: randomUUID(),
    companyUrl,
    status: "pending"
  })

  return toSubmission(record)
}

export const getOnboardingSubmission = async (
  id: string
): Promise<OnboardingSubmission | null> => {
  if (!id) return null
  const record = await selectOnboardingSubmission(id)
  if (!record) {
    return null
  }

  return toSubmission(record)
}

export const updateOnboardingSubmission = async (
  id: string,
  updates: Partial<Omit<OnboardingSubmission, "id" | "createdAt">>
): Promise<OnboardingSubmission | null> => {
  const payload: UpdateOnboardingSubmissionInput = {}

  if (updates.email !== undefined) {
    payload.email = updates.email ?? null
  }
  if (updates.agentId !== undefined) {
    payload.agentId = updates.agentId ?? null
  }
  if (updates.agentName !== undefined) {
    payload.agentName = updates.agentName ?? null
  }
  if (updates.isMock !== undefined) {
    payload.isMock = updates.isMock ?? null
  }
  if (updates.status !== undefined) {
    payload.status = updates.status
  }

  const record = await updateOnboardingSubmissionRow(id, payload)

  if (!record) {
    return null
  }

  return toSubmission(record)
}

