import type { OnboardingSubmission } from "@/lib/onboarding-store"

/**
 * Placeholder CRM hook.
 * Replace console log with actual HubSpot / Salesforce integration when ready.
 */
export const notifyOnboardingCompletion = async (
  submission: OnboardingSubmission
): Promise<void> => {
  console.info("[CRM] New onboarding submission completed", {
    submissionId: submission.id,
    companyUrl: submission.companyUrl,
    email: submission.email,
    agentId: submission.agentId,
    status: submission.status
  })
}

