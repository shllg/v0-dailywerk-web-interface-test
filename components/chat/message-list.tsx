'use client';

import { useEffect, useRef } from 'react';
import type { Message, Agent } from '@/lib/types';
import { MessageBubble } from './message-bubble';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  agent: Agent;
  isProcessing?: boolean;
}

export function MessageList({ messages, agent, isProcessing }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden">
      <div className="max-w-3xl mx-auto py-8 space-y-1">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            agentName={agent.name}
          />
        ))}
        
        {/* Thinking indicator as a message */}
        {isProcessing && (
          <MessageBubble
            message={{
              id: 'thinking',
              agentId: agent.id,
              role: 'agent',
              content: '',
              timestamp: new Date(),
              status: 'thinking',
            }}
            agentName={agent.name}
          />
        )}
        
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
