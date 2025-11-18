/**
 * AI Agents Management Page
 * Lists and manages all AI voice agents
 */

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import OnboardingTable from '@/components/dashboard/OnboardingTable';
import { listOnboardingSubmissions } from '@/db/onboarding';
import type { OnboardingStatus } from '@/types/onboarding';

type AgentsPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const statusOptions = new Set<"all" | OnboardingStatus>([
  "all",
  "pending",
  "agent_ready",
  "completed",
  "failed"
]);

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const statusParam = searchParams?.status;
  const statusValue =
    typeof statusParam === 'string' && statusOptions.has(statusParam as any)
      ? (statusParam as "all" | OnboardingStatus)
      : "all";

  const submissions = await listOnboardingSubmissions({
    status: statusValue === "all" ? undefined : statusValue,
    limit: 100
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agenci głosowi</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitoruj zgłoszenia onboardingowe i szybciej uruchamiaj nowych agentów dla klientów.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/ai-sekretarka">
              Wyświetl stronę onboardingową
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">
              Przejdź do panelu agenta
            </Link>
          </Button>
        </div>
      </div>

      <OnboardingTable submissions={submissions} selectedStatus={statusValue} />
    </div>
  );
}
