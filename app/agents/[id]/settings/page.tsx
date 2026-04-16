'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAgents } from '@/contexts/agent-context';
import { AgentForm } from '@/components/agents/agent-form';
import { agentTemplates, availableTools } from '@/lib/mock-data';
import { ArrowLeft, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="flex flex-col h-full bg-background">
        <header className="flex items-center gap-4 p-4 border-b border-white/5">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Agent Settings</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <Bot className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Agent not found</h2>
          <p className="text-muted-foreground">The agent you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center gap-4 p-4 border-b border-white/5">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{agent.name} Settings</h1>
      </header>

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
