'use client';

import { useState, useRef, useEffect } from 'react';
import { useAgents } from '@/contexts/agent-context';
import { MessageBubble } from './message-bubble';
import { ChatInput } from './chat-input';
import { EmptyChat } from './empty-chat';
import { TypingIndicator } from './typing-indicator';
import { AgentPresence } from './agent-presence';
import type { Message, ChatInputState } from '@/lib/types';
import { sampleMessages, suggestedPrompts } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface ChatViewProps {
  agentId?: string;
}

export function ChatView({ agentId }: ChatViewProps) {
  const { agents, activeAgentId, setActiveAgentId } = useAgents();
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputState, setInputState] = useState<ChatInputState>({
    isRecording: false,
    isThinking: false,
    isToolRunning: false,
    canSend: true,
  });
  const [showReasoning, setShowReasoning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentAgentId = agentId || activeAgentId;
  const currentAgent = agents.find(a => a.id === currentAgentId) || agents[0];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!content.trim() && !attachments?.length) return;

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      agentId: currentAgentId,
      role: 'user',
      content: content.trim(),
      createdAt: new Date(),
      status: 'sent',
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI thinking
    setInputState(prev => ({ ...prev, isThinking: true, canSend: false }));

    // Simulate delay and response
    setTimeout(() => {
      const agentMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        agentId: currentAgentId,
        role: 'agent',
        content: `I understand you're asking about "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}". Let me help you with that.\n\nThis is a simulated response from ${currentAgent?.name || 'the agent'}. In the real implementation, this would be powered by your AI backend.`,
        createdAt: new Date(),
        status: 'sent',
      };
      setMessages(prev => [...prev, agentMessage]);
      setInputState(prev => ({ ...prev, isThinking: false, canSend: true }));
    }, 1500);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleStopGeneration = () => {
    setInputState(prev => ({ ...prev, isThinking: false, canSend: true }));
  };

  const handleVoiceToggle = () => {
    setInputState(prev => ({ ...prev, isRecording: !prev.isRecording }));
  };

  const agentMessages = messages.filter(m => m.agentId === currentAgentId);
  const isEmpty = agentMessages.length === 0;

  return (
    <div className="relative flex flex-col h-full bg-background overflow-hidden">
      {/* Ambient background gradient */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none opacity-50" />
      
      {/* Agent presence indicator */}
      <AgentPresence agent={currentAgent} />

      {/* Messages area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto scrollbar-hidden"
      >
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-1">
          {isEmpty ? (
            <EmptyChat 
              agent={currentAgent}
              suggestedPrompts={suggestedPrompts}
              onSelectPrompt={handleSuggestedPrompt}
            />
          ) : (
            <>
              {agentMessages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  agent={currentAgent}
                  showReasoning={showReasoning}
                  isLast={index === agentMessages.length - 1}
                />
              ))}
              
              {inputState.isThinking && (
                <TypingIndicator agent={currentAgent} />
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="relative z-10 p-4 pb-6">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            agent={currentAgent}
            inputState={inputState}
            showReasoning={showReasoning}
            onSendMessage={handleSendMessage}
            onStopGeneration={handleStopGeneration}
            onVoiceToggle={handleVoiceToggle}
            onReasoningToggle={() => setShowReasoning(!showReasoning)}
          />
        </div>
      </div>
    </div>
  );
}
