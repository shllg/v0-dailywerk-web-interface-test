// DailyWerk Types

export interface Agent {
  id: string;
  name: string;
  avatar?: string;
  description: string;
  templateId?: string;
  isMain: boolean;
  isConfidential: boolean;
  systemPrompt: string;
  tools: string[];
  knowledgePaths: string[];
  createdAt: Date;
  lastUsedAt: Date;
  status: 'online' | 'offline' | 'busy';
}

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  defaultPrompt: string;
  suggestedTools: string[];
}

export interface Message {
  id: string;
  agentId: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  attachments?: Attachment[];
  createdAt: Date;
  isStreaming?: boolean;
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'link';
  name: string;
  url: string;
  size?: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'communication' | 'productivity' | 'knowledge' | 'integration' | 'system';
  isEnabled: boolean;
  usageCount?: number;
}

export interface Gateway {
  id: string;
  type: 'signal' | 'telegram' | 'email' | 'calendar' | 'slack' | 'discord';
  name: string;
  status: 'connected' | 'disconnected' | 'pending';
  config: Record<string, unknown>;
  lastSync?: Date;
}

export interface KnowledgeFile {
  path: string;
  name: string;
  type: 'file' | 'folder';
  lastModified: Date;
  size?: number;
  children?: KnowledgeFile[];
}

export interface Automation {
  id: string;
  type: 'cron' | 'reminder' | 'todo';
  name: string;
  description?: string;
  agentId: string;
  schedule?: string; // cron expression for crons
  dueDate?: Date; // for reminders and todos
  isCompleted?: boolean; // for todos
  isEnabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
}

export interface UserPreferences {
  hasCompletedOnboarding: boolean;
  hasCompletedTour: boolean;
  theme: 'dark' | 'light' | 'system';
  defaultAgentId?: string;
  sidebarCollapsed: boolean;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  userName?: string;
  selectedTemplateId?: string;
  selectedTools: string[];
  gatewaySetup?: {
    type: Gateway['type'];
    configured: boolean;
  };
}
