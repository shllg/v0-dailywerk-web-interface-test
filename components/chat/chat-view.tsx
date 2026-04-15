'use client';

import { useState, useRef, useEffect } from 'react';
import { useAgents } from '@/contexts/agent-context';
import { MessageBubble } from './message-bubble';
import { ChatInput } from './chat-input';
import { EmptyChat } from './empty-chat';
import { AgentSwitcher } from './agent-switcher';
import type { Message } from '@/lib/types';
import { sampleMessages, suggestedPrompts } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface ChatViewProps {
  agentId?: string;
}

export function ChatView({ agentId }: ChatViewProps) {
  const { agents, activeAgentId, setActiveAgentId } = useAgents();
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentAgentId = agentId || activeAgentId;
  const currentAgent = agents.find(a => a.id === currentAgentId) || agents[0];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSendMessage = async (content: string, options?: { reasoning?: boolean }) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      agentId: currentAgentId,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
      status: 'sent',
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI thinking
    setIsProcessing(true);

    // Simulate tool calls and response
    setTimeout(() => {
      const agentMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        agentId: currentAgentId,
        role: 'agent',
        content: generateMockResponse(content, currentAgent?.name || 'Agent'),
        timestamp: new Date(),
        status: 'sent',
        reasoning: options?.reasoning 
          ? `Let me think about this carefully. The user is asking about "${content.slice(0, 30)}...". I should consider multiple approaches and provide a thoughtful, helpful response that addresses their needs directly.`
          : undefined,
        toolCalls: content.toLowerCase().includes('search') || content.toLowerCase().includes('find')
          ? [
              { id: 'tc-1', name: 'web-search', status: 'completed', input: { query: content }, output: { results: 3 } },
            ]
          : content.toLowerCase().includes('calendar') || content.toLowerCase().includes('schedule')
          ? [
              { id: 'tc-2', name: 'calendar', status: 'completed', input: { action: 'check' }, output: { events: 2 } },
            ]
          : undefined,
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsProcessing(false);
    }, 2000);
  };

  const handleStopGeneration = () => {
    setIsProcessing(false);
  };

  const agentMessages = messages.filter(m => m.agentId === currentAgentId);
  const isEmpty = agentMessages.length === 0;

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      {/* Header with agent switcher */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/[0.05]">
        <AgentSwitcher 
          currentAgent={currentAgent}
          agents={agents}
          onSelect={(id) => setActiveAgentId(id)}
        />
        
        {/* Status indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
          <div className={cn(
            'w-2 h-2 rounded-full',
            isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
          )} />
          <span>{isProcessing ? 'Thinking...' : 'Ready'}</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden relative z-0">
        <div className="max-w-3xl mx-auto py-6 space-y-1">
          {isEmpty ? (
            <EmptyChat 
              agent={currentAgent}
              suggestedPrompts={suggestedPrompts}
              onSelectPrompt={(prompt) => handleSendMessage(prompt)}
            />
          ) : (
            <>
              {agentMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  agentName={currentAgent?.name || 'Agent'}
                />
              ))}
              
              {/* Thinking indicator */}
              {isProcessing && (
                <MessageBubble
                  message={{
                    id: 'thinking',
                    agentId: currentAgentId,
                    role: 'agent',
                    content: '',
                    timestamp: new Date(),
                    status: 'thinking',
                  }}
                  agentName={currentAgent?.name || 'Agent'}
                />
              )}
            </>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input area */}
      <div className="relative z-10">
        <ChatInput
          agentName={currentAgent?.name || 'Agent'}
          isProcessing={isProcessing}
          onSend={handleSendMessage}
          onStop={handleStopGeneration}
        />
      </div>
    </div>
  );
}

function generateMockResponse(input: string, agentName: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    return `Hello! Great to hear from you. I'm ${agentName}, ready to help with whatever you need today.`;
  }
  
  if (lowerInput.includes('search') || lowerInput.includes('find')) {
    return `I searched for information related to your query. Here's what I found:\n\n**Key Results:**\n\n1. **Most relevant** - Found comprehensive documentation on this topic\n2. **Related content** - Several recent articles discuss similar themes\n3. **Additional resources** - Community discussions offer practical insights\n\nWould you like me to dive deeper into any of these?`;
  }
  
  if (lowerInput.includes('calendar') || lowerInput.includes('schedule')) {
    return `I checked your calendar. Here's your schedule:\n\n**Today:**\n- 10:00 AM - Team standup\n- 2:30 PM - Product review meeting\n\n**Tomorrow:**\n- 9:00 AM - Coffee with Sarah\n\nWould you like me to add or modify any events?`;
  }
  
  return `I understand you're asking about "${input.slice(0, 50)}${input.length > 50 ? '...' : ''}". \n\nLet me help you with that. This is a thoughtful response that considers your question carefully. In a production environment, this would be powered by your AI backend and could include:\n\n- **Tool calls** to external services\n- **Memory recall** from past conversations\n- **Vault search** through your knowledge base\n\nIs there anything specific you'd like me to clarify?`;
}
