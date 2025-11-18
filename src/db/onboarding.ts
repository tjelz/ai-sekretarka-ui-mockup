import { sql } from "@/db/client"
import type { OnboardingStatus, OnboardingSubmission } from "@/types/onboarding"

export type OnboardingSubmissionRow = {
  id: string
  company_url: string
  email: string | null
  agent_id: string | null
  agent_name: string | null
  is_mock: boolean | null
  status: string
  created_at: Date
  updated_at: Date
}

export type InsertOnboardingSubmissionInput = {
  id: string
  companyUrl: string
  status: string
  email?: string | null
  agentId?: string | null
  agentName?: string | null
  isMock?: boolean | null
}

export type UpdateOnboardingSubmissionInput = {
  email?: string | null
  agentId?: string | null
  agentName?: string | null
  isMock?: boolean | null
  status?: OnboardingStatus
}

export const insertOnboardingSubmission = async (payload: InsertOnboardingSubmissionInput) => {
  const { rows } = await sql<OnboardingSubmissionRow>`
    INSERT INTO onboarding_submissions (
      id,
      company_url,
      email,
      agent_id,
      agent_name,
      is_mock,
      status
    )
    VALUES (
      ${payload.id},
      ${payload.companyUrl},
      ${payload.email ?? null},
      ${payload.agentId ?? null},
      ${payload.agentName ?? null},
      ${payload.isMock ?? false},
      ${payload.status}
    )
    RETURNING *
  `
  return rows[0]
}

export const selectOnboardingSubmission = async (id: string) => {
  const { rows } = await sql<OnboardingSubmissionRow>`
    SELECT *
    FROM onboarding_submissions
    WHERE id = ${id}
    LIMIT 1
  `
  return rows[0] ?? null
}

export const updateOnboardingSubmissionRow = async (
  id: string,
  updates: UpdateOnboardingSubmissionInput
) => {
  const { rows } = await sql<OnboardingSubmissionRow>`
    UPDATE onboarding_submissions
    SET
      email = COALESCE(${updates.email ?? null}, email),
      agent_id = COALESCE(${updates.agentId ?? null}, agent_id),
      agent_name = COALESCE(${updates.agentName ?? null}, agent_name),
      is_mock = COALESCE(${updates.isMock ?? null}, is_mock),
      status = COALESCE(${updates.status ?? null}, status),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] ?? null
}

const mapRowToSubmission = (row: OnboardingSubmissionRow): OnboardingSubmission => ({
  id: row.id,
  companyUrl: row.company_url,
  email: row.email,
  agentId: row.agent_id,
  agentName: row.agent_name,
  isMock: row.is_mock,
  status: row.status as OnboardingStatus,
  createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : new Date(row.created_at).toISOString(),
  updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : new Date(row.updated_at).toISOString()
})

export const listOnboardingSubmissions = async ({
  status,
  limit = 50
}: {
  status?: OnboardingStatus
  limit?: number
} = {}): Promise<OnboardingSubmission[]> => {
  if (status) {
    const { rows } = await sql<OnboardingSubmissionRow>`
      SELECT *
      FROM onboarding_submissions
      WHERE status = ${status}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return rows.map(mapRowToSubmission)
  }

  const { rows } = await sql<OnboardingSubmissionRow>`
    SELECT *
    FROM onboarding_submissions
    ORDER BY created_at DESC
    LIMIT ${limit}
  `
  return rows.map(mapRowToSubmission)
}

export const toSubmission = mapRowToSubmission

