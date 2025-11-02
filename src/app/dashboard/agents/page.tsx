/**
 * AI Agents Management Page
 * Lists and manages all AI voice agents
 */

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AgentList } from '@/components/dashboard/AgentList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockAgents = [
  {
    agent_id: '1',
    name: 'Sales Assistant',
    voice_id: 'voice_1',
    description: 'Handles incoming sales inquiries and qualifies leads',
    greeting_message: 'Hello! How can I help you today?',
    language: 'English',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    agent_id: '2',
    name: 'Support Bot',
    voice_id: 'voice_2',
    description: 'Provides customer support and troubleshooting',
    greeting_message: 'Hi! I\'m here to help with any issues you might have.',
    language: 'English',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default async function AgentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Agents</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your AI voice assistants
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/agents/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Agent
          </Link>
        </Button>
      </div>

      <AgentList agents={mockAgents} />
    </div>
  );
}
