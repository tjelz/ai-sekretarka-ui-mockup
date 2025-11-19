import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import NewAgentCard from '@/components/dashboard/NewAgentCard';
import { getOnboardingSubmission } from '@/lib/onboarding-store';
import { getElevenLabsClient } from '@/lib/elevenlabs/client';
import AgentAnalyticsPanel from '@/components/dashboard/AgentAnalyticsPanel';
import TranscriptList from '@/components/dashboard/TranscriptList';
import LiveCallMonitor from '@/components/dashboard/LiveCallMonitor';
import TestCallController from '@/components/dashboard/TestCallController';
import AgentSettings from '@/components/dashboard/AgentSettings';
import { getAgentAnalytics, getRecentTranscripts } from '@/lib/agents/insights';
import { Button } from '@/components/ui/button';
import { Plus, Bot } from 'lucide-react';
import Link from 'next/link';

type DashboardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DashboardPage(props: DashboardPageProps) {
  const searchParams = await props.searchParams;
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const agentIdParam = searchParams?.agentId;
  const submissionIdParam = searchParams?.submissionId;
  const agentId = typeof agentIdParam === 'string' ? agentIdParam : undefined;
  const submissionId = typeof submissionIdParam === 'string' ? submissionIdParam : undefined;

  // 1. Active Agent View
  if (agentId && submissionId) {
    const submission = await getOnboardingSubmission(submissionId);
    let resolvedAgentName = submission?.agentName;
    let agentConfig = null;

    if (agentId && !submission?.isMock) {
      try {
        const elevenLabsClient = getElevenLabsClient();
        const agent = await elevenLabsClient.getAgent(agentId);
        resolvedAgentName = agent.name || resolvedAgentName;
        agentConfig = agent;
      } catch (error) {
        console.warn('Nie udało się pobrać szczegółów agenta z ElevenLabs:', error);
      }
    }

    const [analytics, transcripts] = await Promise.all([
      getAgentAnalytics(agentId),
      getRecentTranscripts(agentId)
    ]);

    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {resolvedAgentName || "Twój Agent"}
                </h1>
                <p className="text-muted-foreground">
                    Zarządzaj ustawieniami i monitoruj rozmowy w czasie rzeczywistym.
                </p>
            </div>
            <div className="flex gap-3">
                <TestCallController agentId={agentId} />
                <Button asChild>
                    <Link href={`/dashboard/settings?agentId=${agentId}&submissionId=${submissionId}`}>
                        Konfiguracja
                    </Link>
                </Button>
            </div>
        </div>

        {/* KPI Cards */}
        <AgentAnalyticsPanel analytics={analytics} />

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column: Live Monitor & Settings */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            Monitor Połączeń
                        </h3>
                    </div>
                    <div className="p-6">
                         <LiveCallMonitor agentName={resolvedAgentName} />
                    </div>
                </div>

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
            </div>

            {/* Right Column: Recent Transcripts */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-border shadow-sm h-full flex flex-col">
                    <div className="p-6 border-b border-border">
                        <h3 className="text-lg font-semibold">Ostatnie Rozmowy</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[600px] p-4">
                        <TranscriptList transcripts={transcripts} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // 2. Empty State / Welcome View
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in-up">
        <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Bot className="h-12 w-12 text-primary" />
        </div>
        <div className="max-w-md space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Witaj w Yieldo</h1>
            <p className="text-muted-foreground text-lg">
                Nie masz jeszcze żadnych aktywnych agentów. Stwórz swojego pierwszego wirtualnego asystenta w 5 minut.
            </p>
        </div>
        <div className="flex gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                <Plus className="mr-2 h-5 w-5" />
                Stwórz Nowego Agenta
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Dokumentacja
            </Button>
        </div>
    </div>
  );
}
