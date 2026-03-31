'use client';

import { useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import { MessageBubble } from './message-bubble';
import { TypingIndicator } from './typing-indicator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageListProps {
  messages: Message[];
  agentName: string;
  isTyping: boolean;
}

export function MessageList({ messages, agentName, isTyping }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h2 className="text-lg font-semibold mb-2">Start a conversation</h2>
          <p className="text-sm text-muted-foreground">
            Send a message to {agentName} and get started. You can ask questions,
            give commands, or just have a conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="max-w-3xl mx-auto p-4 space-y-4 pb-20 md:pb-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            agentName={agentName}
          />
        ))}
        {isTyping && <TypingIndicator agentName={agentName} />}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
