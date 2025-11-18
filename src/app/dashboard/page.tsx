import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { MaintenancePage } from '@/components/dashboard/MaintenancePage';
import NewAgentCard from '@/components/dashboard/NewAgentCard';
import { getOnboardingSubmission } from '@/lib/onboarding-store';
import { getElevenLabsClient } from '@/lib/elevenlabs/client';
import AgentAnalyticsPanel from '@/components/dashboard/AgentAnalyticsPanel';
import TranscriptList from '@/components/dashboard/TranscriptList';
import LiveCallMonitor from '@/components/dashboard/LiveCallMonitor';
import TestCallController from '@/components/dashboard/TestCallController';
import AgentSettings from '@/components/dashboard/AgentSettings';
import { getAgentAnalytics, getRecentTranscripts } from '@/lib/agents/insights';

type DashboardPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const agentIdParam = searchParams?.agentId;
  const submissionIdParam = searchParams?.submissionId;
  const agentId = typeof agentIdParam === 'string' ? agentIdParam : undefined;
  const submissionId = typeof submissionIdParam === 'string' ? submissionIdParam : undefined;

  if (agentId && submissionId) {
    const submission = await getOnboardingSubmission(submissionId);
    let resolvedAgentName = submission?.agentName;
    let agentConfig = null;

    if (agentId && !submission?.isMock) {
      try {
        const elevenLabsClient = getElevenLabsClient();
        const agent = await elevenLabsClient.getAgent(agentId);
        resolvedAgentName = agent.name || resolvedAgentName;
        agentConfig = agent; // Store the full agent config
      } catch (error) {
        console.warn('Nie udało się pobrać szczegółów agenta z ElevenLabs:', error);
      }
    }

    const [analytics, transcripts] = await Promise.all([
      getAgentAnalytics(agentId),
      getRecentTranscripts(agentId)
    ]);

    return (
      <div className="space-y-6">
        <NewAgentCard
          agentId={agentId}
          agentName={resolvedAgentName}
          companyUrl={submission?.companyUrl}
          isMock={submission?.isMock}
        />

        {agentConfig && !submission?.isMock && (
          <AgentSettings
            agentId={agentId}
            initialName={agentConfig.name || ""}
            initialGreeting={agentConfig.greeting_message || ""}
            initialVoiceId={agentConfig.voice_id || ""}
            initialContext={agentConfig.context || ""}
            initialSpeakingStyle={agentConfig.conversation_config?.speaking_style || "friendly"}
            initialResponseLength={agentConfig.conversation_config?.response_length || "medium"}
            initialTemperature={agentConfig.conversation_config?.temperature || 0.4}
          />
        )}

        <AgentAnalyticsPanel analytics={analytics} />

        <div className="grid gap-6 lg:grid-cols-2">
          <LiveCallMonitor agentName={resolvedAgentName} />
          <TestCallController agentId={agentId} />
        </div>

        <TranscriptList transcripts={transcripts} />
      </div>
    );
  }

  return <MaintenancePage />;
}
