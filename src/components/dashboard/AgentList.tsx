/**
 * Agent List Component
 * Client component that handles agent interactions
 */

'use client';

import { AgentCard } from './AgentCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { Agent } from '@/lib/elevenlabs/client';

interface AgentListProps {
  agents: Agent[];
}

export function AgentList({ agents }: AgentListProps) {
  const handleEdit = (agent: Agent) => {
    console.log('Edit agent:', agent);
    // TODO: Navigate to edit page or open modal
  };

  const handleDelete = async (agentId: string) => {
    console.log('Delete agent:', agentId);
    // TODO: Show confirmation dialog and call API
  };

  const handleToggleStatus = async (agentId: string, active: boolean) => {
    console.log('Toggle agent:', agentId, active);
    // TODO: Call API to update agent status
  };

  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No agents yet. Create your first AI agent to get started.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/agents/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Agent
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard
          key={agent.agent_id}
          agent={agent}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      ))}
    </div>
  );
}
