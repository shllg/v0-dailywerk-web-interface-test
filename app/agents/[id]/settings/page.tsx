'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAgents } from '@/contexts/agent-context';
import { Header } from '@/components/layout/header';
import { AgentForm } from '@/components/agents/agent-form';
import { agentTemplates, availableTools } from '@/lib/mock-data';
import { EmptyState } from '@/components/shared/empty-state';
import { Bot } from 'lucide-react';
import type { Agent } from '@/lib/types';

export default function AgentSettingsPage() {
  const router = useRouter();
  const params = useParams();
  const { agents, updateAgent } = useAgents();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const agentId = params.id as string;
  const agent = agents.find((a) => a.id === agentId);

  const handleSubmit = (agentData: Partial<Agent>) => {
    setIsSubmitting(true);
    updateAgent(agentId, agentData);
    router.push('/agents');
  };

  if (!agent) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Agent Settings" showBack />
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            icon={Bot}
            title="Agent not found"
            description="The agent you're looking for doesn't exist."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={`${agent.name} Settings`} showBack />

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto">
          <AgentForm
            agent={agent}
            templates={agentTemplates}
            tools={availableTools}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
