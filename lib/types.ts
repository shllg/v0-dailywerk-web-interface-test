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
  color?: string; // Agent accent color
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

// Tool call states during message generation
export interface ToolCall {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  input?: Record<string, unknown>;
  output?: string;
  startedAt?: Date;
  completedAt?: Date;
}

// Reasoning step for thinking/planning
export interface ReasoningStep {
  id: string;
  content: string;
  timestamp: Date;
}

export type MessageStatus = 'sending' | 'sent' | 'streaming' | 'error';

export interface Message {
  id: string;
  agentId: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  attachments?: Attachment[];
  toolCalls?: ToolCall[];
  reasoning?: ReasoningStep[];
  status?: MessageStatus;
  createdAt: Date;
  isStreaming?: boolean;
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'link' | 'voice';
  name: string;
  url: string;
  size?: number;
  duration?: number; // For voice attachments
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
  isExpanded?: boolean;
}

export interface Vault {
  id: string;
  name: string;
  type: 'obsidian' | 'native';
  path: string;
  fileCount: number;
  totalSize: number;
  lastSync?: Date;
  isConnected: boolean;
}

// Memory node for DAG visualization
export interface MemoryNode {
  id: string;
  content: string;
  category: 'project' | 'context' | 'preference' | 'fact' | 'instruction';
  scope: 'shared' | 'private';
  agentId?: string; // Only for private scope
  importance: number; // 1-10
  confidence: number; // 0-1
  connections: MemoryConnection[];
  source: 'extraction' | 'manual' | 'import';
  sessionId?: string;
  messageId?: string;
  createdAt: Date;
  updatedAt: Date;
  accessCount: number;
  lastRecalled?: Date;
}

export interface MemoryConnection {
  targetId: string;
  weight: number; // 0-1 connection strength
  type: 'related' | 'derived' | 'contradicts' | 'supports';
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
  showReasoning: boolean;
  enableVoiceInput: boolean;
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

// Chat input state
export interface ChatInputState {
  isRecording: boolean;
  isThinking: boolean; // AI is processing
  isToolRunning: boolean;
  currentToolName?: string;
  canSend: boolean;
}

// Suggested prompts for empty state
export interface SuggestedPrompt {
  id: string;
  text: string;
  icon?: string;
}
