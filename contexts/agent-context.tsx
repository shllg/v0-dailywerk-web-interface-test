'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Agent, Message } from '@/lib/types';
import { defaultAgents, sampleMessages } from '@/lib/mock-data';

interface AgentContextValue {
  agents: Agent[];
  currentAgent: Agent | null;
  messages: Message[];
  isTyping: boolean;
  setCurrentAgent: (agentId: string) => void;
  addAgent: (agent: Agent) => void;
  updateAgent: (agentId: string, updates: Partial<Agent>) => void;
  deleteAgent: (agentId: string) => void;
  sendMessage: (content: string) => void;
  clearMessages: (agentId: string) => void;
}

const AgentContext = createContext<AgentContextValue | undefined>(undefined);

const AGENTS_STORAGE_KEY = 'dailywerk_agents';
const MESSAGES_STORAGE_KEY = 'dailywerk_messages';

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [currentAgent, setCurrentAgentState] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedAgents = localStorage.getItem(AGENTS_STORAGE_KEY);
    const storedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
    
    if (storedAgents) {
      try {
        const parsed = JSON.parse(storedAgents);
        // Convert date strings back to Date objects
        const agentsWithDates = parsed.map((a: Agent) => ({
          ...a,
          createdAt: new Date(a.createdAt),
          lastUsedAt: new Date(a.lastUsedAt),
        }));
        setAgents(agentsWithDates);
      } catch {
        // Invalid data, use defaults
      }
    }

    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages);
        const messagesWithDates = parsed.map((m: Message) => ({
          ...m,
          createdAt: new Date(m.createdAt),
        }));
        setMessages(messagesWithDates);
      } catch {
        // Invalid data, use defaults
      }
    }

    setIsHydrated(true);
  }, []);

  // Set default current agent after hydration
  useEffect(() => {
    if (isHydrated && !currentAgent && agents.length > 0) {
      const mainAgent = agents.find((a) => a.isMain) || agents[0];
      setCurrentAgentState(mainAgent);
    }
  }, [isHydrated, currentAgent, agents]);

  // Save to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(agents));
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [agents, messages, isHydrated]);

  const setCurrentAgent = useCallback((agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      setCurrentAgentState(agent);
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId ? { ...a, lastUsedAt: new Date() } : a
        )
      );
    }
  }, [agents]);

  const addAgent = useCallback((agent: Agent) => {
    setAgents((prev) => [...prev, agent]);
  }, []);

  const updateAgent = useCallback((agentId: string, updates: Partial<Agent>) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, ...updates } : a))
    );
    if (currentAgent?.id === agentId) {
      setCurrentAgentState((prev) => (prev ? { ...prev, ...updates } : null));
    }
  }, [currentAgent]);

  const deleteAgent = useCallback((agentId: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== agentId));
    if (currentAgent?.id === agentId) {
      const remaining = agents.filter((a) => a.id !== agentId);
      setCurrentAgentState(remaining.find((a) => a.isMain) || remaining[0] || null);
    }
  }, [agents, currentAgent]);

  const sendMessage = useCallback((content: string) => {
    if (!currentAgent) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      agentId: currentAgent.id,
      role: 'user',
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        agentId: currentAgent.id,
        role: 'agent',
        content: generateMockResponse(content, currentAgent),
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  }, [currentAgent]);

  const clearMessages = useCallback((agentId: string) => {
    setMessages((prev) => prev.filter((m) => m.agentId !== agentId));
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <AgentContext.Provider
      value={{
        agents,
        currentAgent,
        messages,
        isTyping,
        setCurrentAgent,
        addAgent,
        updateAgent,
        deleteAgent,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
}

// Mock response generator
function generateMockResponse(userMessage: string, agent: Agent): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Hello! I'm ${agent.name}, your ${agent.isMain ? 'main ' : ''}assistant. How can I help you today?`;
  }
  
  if (lowerMessage.includes('help')) {
    return `I'd be happy to help! Here are some things I can do:\n\n- Answer questions\n- Set reminders and manage tasks\n- Search for information\n- Help with writing and editing\n\nWhat would you like to work on?`;
  }
  
  if (lowerMessage.includes('reminder') || lowerMessage.includes('remind')) {
    return `I've noted that reminder for you. I'll make sure to notify you at the right time.\n\nIs there anything else you'd like me to remember?`;
  }
  
  if (lowerMessage.includes('thank')) {
    return `You're welcome! Feel free to ask if you need anything else.`;
  }

  return `I understand you're asking about "${userMessage.slice(0, 50)}${userMessage.length > 50 ? '...' : ''}". Let me help you with that.\n\nIs there anything specific you'd like me to focus on?`;
}
