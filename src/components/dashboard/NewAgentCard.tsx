import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import AgentQuickActions from "./AgentQuickActions"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type NewAgentCardProps = {
  agentId: string
  agentName?: string | null
  companyUrl?: string | null
  isMock?: boolean
}

const NewAgentCard = ({ agentId, agentName, companyUrl, isMock }: NewAgentCardProps) => {
  return (
    <Card className="border border-blue-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl text-gray-900">
          <span>{agentName || "Twój nowy agent"}</span>
          {isMock && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Tryb demo
            </span>
          )}
        </CardTitle>
        <CardDescription className="text-gray-600">
          Agent skonfigurowany z danymi: {companyUrl ? (
            <Link
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#007BFF]"
            >
              {companyUrl}
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : (
            "brak adresu strony"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Identyfikator agenta</p>
            <p className="text-base font-semibold text-gray-900 break-all">{agentId}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-base font-semibold text-green-600">Aktywny</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-800">Szybkie akcje</p>
          <AgentQuickActions agentId={agentId} />
        </div>
      </CardContent>
    </Card>
  )
}

export default NewAgentCard

