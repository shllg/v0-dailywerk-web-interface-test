'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@/contexts/user-context';
import { useAgents } from '@/contexts/agent-context';
import { ChatView } from '@/components/chat/chat-view';

export default function AgentChatPage() {
  const router = useRouter();
  const params = useParams();
  const { preferences } = useUser();
  const { agents, setCurrentAgent } = useAgents();

  const agentId = params.agentId as string;

  useEffect(() => {
    if (!preferences.hasCompletedOnboarding) {
      router.replace('/onboarding');
      return;
    }

    // Set the current agent based on the URL
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      setCurrentAgent(agentId);
    } else {
      // Agent not found, redirect to main chat
      router.replace('/chat');
    }
  }, [preferences.hasCompletedOnboarding, agentId, agents, setCurrentAgent, router]);

  if (!preferences.hasCompletedOnboarding) {
    return null;
  }

  return <ChatView />;
}
