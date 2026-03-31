'use client';

import { useAgents } from '@/contexts/agent-context';
import { ChatHeader } from './chat-header';
import { MessageList } from './message-list';
import { ChatInput } from './chat-input';
import { EmptyState } from '@/components/shared/empty-state';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ChatContainer() {
  const { currentAgent, messages, isTyping, sendMessage } = useAgents();

  const agentMessages = currentAgent
    ? messages.filter((m) => m.agentId === currentAgent.id)
    : [];

  if (!currentAgent) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          icon={Bot}
          title="No Agent Selected"
          description="Select an agent from the sidebar or create a new one to start chatting."
          action={
            <Button asChild>
              <Link href="/agents/new">Create Agent</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader agent={currentAgent} />
      <MessageList
        messages={agentMessages}
        agentName={currentAgent.name}
        isTyping={isTyping}
      />
      <ChatInput onSend={sendMessage} agentName={currentAgent.name} />
    </div>
  );
}
