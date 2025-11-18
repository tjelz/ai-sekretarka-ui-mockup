import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { OnboardingSubmission, OnboardingStatus } from "@/types/onboarding"
import OnboardingRowActions from "./OnboardingRowActions"

type OnboardingTableProps = {
  submissions: OnboardingSubmission[]
  selectedStatus: "all" | OnboardingStatus
}

const statusFilters: { value: "all" | OnboardingStatus; label: string }[] = [
  { value: "all", label: "Wszystkie" },
  { value: "pending", label: "Oczekujące" },
  { value: "agent_ready", label: "Agent gotowy" },
  { value: "completed", label: "Zakończone" },
  { value: "failed", label: "Nieudane" }
]

const statusBadgeClass: Record<OnboardingStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  agent_ready: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700"
}

const statusLabel: Record<OnboardingStatus, string> = {
  pending: "Oczekuje",
  agent_ready: "Agent gotowy",
  completed: "Zakończone",
  failed: "Nieudane"
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("pl-PL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  })

const OnboardingTable = ({ submissions, selectedStatus }: OnboardingTableProps) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-900">Onboarding agentów</p>
          <p className="text-sm text-gray-500">
            {submissions.length > 0
              ? `Łącznie ${submissions.length} zgłoszeń`
              : "Brak zgłoszeń dla wybranego filtra"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <Link
              key={filter.value}
              href={
                filter.value === "all"
                  ? "/dashboard/agents"
                  : `/dashboard/agents?status=${filter.value}`
              }
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedStatus === filter.value
                  ? "bg-[#007BFF] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-500">
          Włącz onboarding z sekcji hero, aby zobaczyć pierwsze zgłoszenia klientów.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Firma
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Utworzono
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-sm text-gray-700">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {new URL(submission.companyUrl).hostname.replace(/^www\./, "")}
                      </span>
                      <span className="text-xs text-gray-500">
                        {submission.companyUrl}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {submission.agentName || "—"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {submission.agentId || "czeka na wygenerowanie"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {submission.email || <span className="text-gray-400">brak</span>}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`${statusBadgeClass[submission.status]} border-none`}>
                      {statusLabel[submission.status]}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(submission.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <OnboardingRowActions submission={submission} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default OnboardingTable

