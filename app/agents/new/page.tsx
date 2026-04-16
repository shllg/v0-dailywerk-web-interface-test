'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAgents } from '@/contexts/agent-context';
import { PageHeader } from '@/components/shared/page-header';
import { AgentForm } from '@/components/agents/agent-form';
import { agentTemplates, availableTools } from '@/lib/mock-data';
import type { Agent } from '@/lib/types';

export default function NewAgentPage() {
  const router = useRouter();
  const { addAgent } = useAgents();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (agentData: Partial<Agent>) => {
    setIsSubmitting(true);

    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: agentData.name || 'New Agent',
      description: agentData.description || '',
      templateId: agentData.templateId,
      isMain: false,
      isConfidential: agentData.isConfidential || false,
      systemPrompt: agentData.systemPrompt || '',
      tools: agentData.tools || [],
      knowledgePaths: agentData.knowledgePaths || [],
      createdAt: new Date(),
      lastUsedAt: new Date(),
      status: 'online',
    };

    addAgent(newAgent);
    router.push('/agents');
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <PageHeader title="Create New Agent" showBack />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <AgentForm
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
