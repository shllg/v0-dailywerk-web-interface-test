import type { Agent, AgentTemplate, Message, Tool, Gateway, KnowledgeFile, Automation, MemoryNode, Vault, SuggestedPrompt, VaultFile } from './types';

// Agent Templates
export const agentTemplates: AgentTemplate[] = [
  {
    id: 'general-assistant',
    name: 'General Assistant',
    description: 'A versatile AI assistant for everyday tasks, questions, and conversations.',
    icon: 'Sparkles',
    category: 'general',
    defaultPrompt: 'You are a helpful, friendly assistant. Answer questions clearly and help with tasks efficiently.',
    suggestedTools: ['web-search', 'calculator', 'reminders'],
  },
  {
    id: 'work-assistant',
    name: 'Work Assistant',
    description: 'Focused on productivity, scheduling, and professional communication.',
    icon: 'Briefcase',
    category: 'productivity',
    defaultPrompt: 'You are a professional assistant focused on work productivity. Help with scheduling, emails, and task management.',
    suggestedTools: ['calendar', 'email', 'todos', 'notes'],
  },
  {
    id: 'researcher',
    name: 'Researcher',
    description: 'Deep research and analysis with knowledge vault integration.',
    icon: 'Search',
    category: 'research',
    defaultPrompt: 'You are a thorough researcher. Analyze information carefully and provide well-sourced insights.',
    suggestedTools: ['web-search', 'knowledge-vault', 'notes', 'citations'],
  },
  {
    id: 'creative-writer',
    name: 'Creative Writer',
    description: 'Help with writing, editing, and creative content generation.',
    icon: 'Pen',
    category: 'creative',
    defaultPrompt: 'You are a creative writing assistant. Help with drafting, editing, and brainstorming creative content.',
    suggestedTools: ['notes', 'knowledge-vault', 'grammar-check'],
  },
  {
    id: 'coder',
    name: 'Code Helper',
    description: 'Programming assistance, debugging, and code review.',
    icon: 'Code',
    category: 'technical',
    defaultPrompt: 'You are a programming assistant. Help with code, debugging, and technical questions.',
    suggestedTools: ['code-runner', 'web-search', 'documentation'],
  },
  {
    id: 'personal-coach',
    name: 'Personal Coach',
    description: 'Goal tracking, motivation, and personal development.',
    icon: 'Target',
    category: 'personal',
    defaultPrompt: 'You are a supportive personal coach. Help with goal setting, motivation, and personal growth.',
    suggestedTools: ['reminders', 'todos', 'journal'],
  },
];

// Default Agents
export const defaultAgents: Agent[] = [
  {
    id: 'atlas',
    name: 'Atlas',
    avatar: undefined,
    description: 'Your main assistant that can help with everything and configure your DailyWerk system.',
    templateId: 'general-assistant',
    isMain: true,
    isConfidential: false,
    systemPrompt: 'You are Atlas, the main DailyWerk assistant. You help users with everyday tasks and can also help configure the DailyWerk system, manage other agents, and set up automations.',
    tools: ['web-search', 'calculator', 'reminders', 'todos', 'system-config'],
    knowledgePaths: [],
    createdAt: new Date('2024-01-01'),
    lastUsedAt: new Date(),
    status: 'online',
    color: '#a78bfa', // Violet
  },
  {
    id: 'aria',
    name: 'Aria',
    avatar: undefined,
    description: 'Research and analysis specialist with deep web search capabilities.',
    templateId: 'researcher',
    isMain: false,
    isConfidential: false,
    systemPrompt: 'You are Aria, a thorough researcher. Analyze information carefully and provide well-sourced insights.',
    tools: ['web-search', 'knowledge-vault', 'notes', 'citations'],
    knowledgePaths: ['/research'],
    createdAt: new Date('2024-02-01'),
    lastUsedAt: new Date(Date.now() - 86400000),
    status: 'online',
    color: '#60a5fa', // Blue
  },
  {
    id: 'vault-private',
    name: 'Keeper',
    avatar: undefined,
    description: 'Private confidential agent for sensitive information.',
    templateId: 'general-assistant',
    isMain: false,
    isConfidential: true,
    systemPrompt: 'You are Keeper, a confidential assistant. Handle sensitive information with care and never share with other agents.',
    tools: ['notes', 'knowledge-vault'],
    knowledgePaths: ['/private'],
    createdAt: new Date('2024-02-15'),
    lastUsedAt: new Date(Date.now() - 172800000),
    status: 'offline',
    color: '#f472b6', // Pink
  },
];

// Available Tools
export const availableTools: Tool[] = [
  {
    id: 'web-search',
    name: 'Web Search',
    description: 'Search the web for information and answers.',
    icon: 'Globe',
    category: 'knowledge',
    isEnabled: true,
    usageCount: 156,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform mathematical calculations and conversions.',
    icon: 'Calculator',
    category: 'productivity',
    isEnabled: true,
    usageCount: 42,
  },
  {
    id: 'reminders',
    name: 'Reminders',
    description: 'Set and manage reminders for future events.',
    icon: 'Bell',
    category: 'productivity',
    isEnabled: true,
    usageCount: 89,
  },
  {
    id: 'todos',
    name: 'Todo Lists',
    description: 'Create and manage task lists.',
    icon: 'CheckSquare',
    category: 'productivity',
    isEnabled: true,
    usageCount: 234,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Access and manage calendar events.',
    icon: 'Calendar',
    category: 'integration',
    isEnabled: false,
    usageCount: 0,
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Read and send emails through connected accounts.',
    icon: 'Mail',
    category: 'communication',
    isEnabled: false,
    usageCount: 0,
  },
  {
    id: 'notes',
    name: 'Notes',
    description: 'Create and manage notes in your knowledge vault.',
    icon: 'FileText',
    category: 'knowledge',
    isEnabled: true,
    usageCount: 67,
  },
  {
    id: 'knowledge-vault',
    name: 'Knowledge Vault',
    description: 'Search and reference your personal knowledge base.',
    icon: 'Database',
    category: 'knowledge',
    isEnabled: true,
    usageCount: 123,
  },
  {
    id: 'code-runner',
    name: 'Code Runner',
    description: 'Execute code snippets in various languages.',
    icon: 'Terminal',
    category: 'productivity',
    isEnabled: true,
    usageCount: 45,
  },
  {
    id: 'system-config',
    name: 'System Config',
    description: 'Configure DailyWerk settings and manage agents.',
    icon: 'Settings',
    category: 'system',
    isEnabled: true,
    usageCount: 12,
  },
];

// Rich sample messages with tool calls and reasoning
export const sampleMessages: Message[] = [
  {
    id: '1',
    agentId: 'atlas',
    role: 'user',
    content: 'Hi there! What can you help me with today?',
    createdAt: new Date(Date.now() - 300000),
    status: 'sent',
  },
  {
    id: '2',
    agentId: 'atlas',
    role: 'agent',
    content: `Hello! I'm Atlas, your personal AI assistant. I'm here to help you with a wide range of tasks:

- **Everyday questions** - Ask me anything and I'll find the answer
- **Productivity** - Set reminders, manage todos, take notes
- **Research** - Search the web, analyze information
- **System setup** - Configure agents, connect gateways

What would you like to explore?`,
    createdAt: new Date(Date.now() - 290000),
    status: 'sent',
  },
  {
    id: '3',
    agentId: 'atlas',
    role: 'user',
    content: 'What are the latest developments in AI agents?',
    createdAt: new Date(Date.now() - 180000),
    status: 'sent',
  },
  {
    id: '4',
    agentId: 'atlas',
    role: 'agent',
    content: `Based on my research, here are the key developments in AI agents:

**Multi-Agent Systems**
The trend is moving toward specialized agents that collaborate. Instead of one monolithic AI, we're seeing systems where different agents handle different domains - research, coding, writing - and coordinate together.

**Tool Use & Function Calling**
Modern agents can now reliably use external tools - searching the web, executing code, managing calendars. This dramatically expands what they can actually accomplish.

**Memory & Persistence**
Long-term memory systems are becoming more sophisticated. Agents can now remember context across conversations and build up knowledge over time.

**Reasoning Capabilities**
Chain-of-thought and tree-of-thought approaches are making agents better at complex problem-solving by breaking down tasks into steps.

Would you like me to dive deeper into any of these areas?`,
    toolCalls: [
      {
        id: 'tc-1',
        name: 'Web Search',
        status: 'completed',
        input: { query: 'latest AI agent developments 2024' },
        output: 'Found 15 relevant articles',
        startedAt: new Date(Date.now() - 175000),
        completedAt: new Date(Date.now() - 172000),
      },
    ],
    reasoning: [
      {
        id: 'r-1',
        content: 'The user is asking about AI agents. I should search for recent developments and organize them into clear categories.',
        timestamp: new Date(Date.now() - 178000),
      },
      {
        id: 'r-2',
        content: 'Found several key themes: multi-agent systems, tool use, memory, and reasoning. I\'ll structure these clearly.',
        timestamp: new Date(Date.now() - 174000),
      },
    ],
    createdAt: new Date(Date.now() - 170000),
    status: 'sent',
  },
  {
    id: '5',
    agentId: 'atlas',
    role: 'user',
    content: 'Can you set a reminder to research this more tomorrow at 10am?',
    createdAt: new Date(Date.now() - 60000),
    status: 'sent',
  },
  {
    id: '6',
    agentId: 'atlas',
    role: 'agent',
    content: `Done! I've created a reminder for you:

**Research AI Agent Developments**
Tomorrow at 10:00 AM

I'll send you a notification 15 minutes before. Is there anything specific you'd like me to include in the reminder notes?`,
    toolCalls: [
      {
        id: 'tc-2',
        name: 'Reminders',
        status: 'completed',
        input: { title: 'Research AI Agent Developments', time: 'tomorrow 10am' },
        output: 'Reminder created successfully',
        startedAt: new Date(Date.now() - 58000),
        completedAt: new Date(Date.now() - 56000),
      },
    ],
    createdAt: new Date(Date.now() - 55000),
    status: 'sent',
  },
];

// Suggested prompts for empty chat state
export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: 'sp-1',
    text: 'What can you help me with?',
    icon: 'Sparkles',
  },
  {
    id: 'sp-2',
    text: 'Search the web for...',
    icon: 'Globe',
  },
  {
    id: 'sp-3',
    text: 'Set a reminder for...',
    icon: 'Bell',
  },
  {
    id: 'sp-4',
    text: 'Help me brainstorm...',
    icon: 'Lightbulb',
  },
];

// Gateways
export const sampleGateways: Gateway[] = [
  {
    id: 'signal-1',
    type: 'signal',
    name: 'Signal Messenger',
    status: 'disconnected',
    config: {},
  },
  {
    id: 'telegram-1',
    type: 'telegram',
    name: 'Telegram',
    status: 'connected',
    config: { botName: '@dailywerk_bot' },
    lastSync: new Date(Date.now() - 300000),
  },
  {
    id: 'email-1',
    type: 'email',
    name: 'Email',
    status: 'disconnected',
    config: {},
  },
  {
    id: 'calendar-1',
    type: 'calendar',
    name: 'Calendar',
    status: 'disconnected',
    config: {},
  },
];

// Vaults
export const sampleVaults: Vault[] = [
  {
    id: 'ops-vault',
    name: 'OpsVault',
    type: 'obsidian',
    path: '/vaults/ops',
    fileCount: 127,
    totalSize: 2456000,
    lastSync: new Date(Date.now() - 3600000),
    isConnected: true,
  },
  {
    id: 'personal-vault',
    name: 'Personal Notes',
    type: 'native',
    path: '/vaults/personal',
    fileCount: 45,
    totalSize: 890000,
    lastSync: undefined,
    isConnected: true,
  },
];

// Knowledge Files with proper hierarchy
export const sampleKnowledgeFiles: KnowledgeFile[] = [
  {
    path: '/daily',
    name: 'Daily Notes',
    type: 'folder',
    lastModified: new Date('2024-04-15'),
    isExpanded: true,
    children: [
      {
        path: '/daily/2024-04-15.md',
        name: '2024-04-15.md',
        type: 'file',
        lastModified: new Date('2024-04-15'),
        size: 1240,
      },
      {
        path: '/daily/2024-04-14.md',
        name: '2024-04-14.md',
        type: 'file',
        lastModified: new Date('2024-04-14'),
        size: 2048,
      },
      {
        path: '/daily/2024-04-13.md',
        name: '2024-04-13.md',
        type: 'file',
        lastModified: new Date('2024-04-13'),
        size: 1536,
      },
    ],
  },
  {
    path: '/research',
    name: 'Research',
    type: 'folder',
    lastModified: new Date('2024-04-12'),
    isExpanded: false,
    children: [
      {
        path: '/research/ai-agents',
        name: 'AI Agents',
        type: 'folder',
        lastModified: new Date('2024-04-12'),
        isExpanded: false,
        children: [
          {
            path: '/research/ai-agents/overview.md',
            name: 'overview.md',
            type: 'file',
            lastModified: new Date('2024-04-12'),
            size: 4096,
          },
          {
            path: '/research/ai-agents/competitors.md',
            name: 'competitors.md',
            type: 'file',
            lastModified: new Date('2024-04-10'),
            size: 3200,
          },
        ],
      },
      {
        path: '/research/market-analysis.md',
        name: 'market-analysis.md',
        type: 'file',
        lastModified: new Date('2024-04-08'),
        size: 5120,
      },
    ],
  },
  {
    path: '/projects',
    name: 'Projects',
    type: 'folder',
    lastModified: new Date('2024-04-11'),
    isExpanded: false,
    children: [
      {
        path: '/projects/dailywerk',
        name: 'DailyWerk',
        type: 'folder',
        lastModified: new Date('2024-04-11'),
        isExpanded: false,
        children: [
          {
            path: '/projects/dailywerk/roadmap.md',
            name: 'roadmap.md',
            type: 'file',
            lastModified: new Date('2024-04-11'),
            size: 2800,
          },
          {
            path: '/projects/dailywerk/features.md',
            name: 'features.md',
            type: 'file',
            lastModified: new Date('2024-04-09'),
            size: 1900,
          },
        ],
      },
    ],
  },
  {
    path: '/ideas',
    name: 'Ideas',
    type: 'folder',
    lastModified: new Date('2024-04-10'),
    isExpanded: false,
    children: [
      {
        path: '/ideas/app-concepts.md',
        name: 'app-concepts.md',
        type: 'file',
        lastModified: new Date('2024-04-10'),
        size: 1200,
      },
    ],
  },
];

// Memory Nodes for DAG visualization
export const sampleMemoryNodes: MemoryNode[] = [
  {
    id: 'mem-1',
    content: 'User prefers responses in German.',
    category: 'preference',
    scope: 'shared',
    importance: 9,
    confidence: 0.95,
    connections: [
      { targetId: 'mem-5', weight: 0.8, type: 'related' },
    ],
    source: 'extraction',
    createdAt: new Date('2024-04-14'),
    updatedAt: new Date('2024-04-15'),
    accessCount: 47,
    lastRecalled: new Date(Date.now() - 3600000),
  },
  {
    id: 'mem-2',
    content: 'DailyWerk competitor research task is open.',
    category: 'project',
    scope: 'shared',
    importance: 7,
    confidence: 0.78,
    connections: [
      { targetId: 'mem-3', weight: 0.9, type: 'related' },
      { targetId: 'mem-4', weight: 0.6, type: 'supports' },
    ],
    source: 'extraction',
    sessionId: 'sess-123',
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-15'),
    accessCount: 3,
  },
  {
    id: 'mem-3',
    content: 'Store research results in OpsVault.',
    category: 'instruction',
    scope: 'shared',
    importance: 6,
    confidence: 0.85,
    connections: [
      { targetId: 'mem-2', weight: 0.9, type: 'related' },
    ],
    source: 'extraction',
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-15'),
    accessCount: 2,
  },
  {
    id: 'mem-4',
    content: 'User is building a personal AI assistant system called DailyWerk.',
    category: 'context',
    scope: 'shared',
    importance: 10,
    confidence: 0.98,
    connections: [
      { targetId: 'mem-2', weight: 0.6, type: 'supports' },
      { targetId: 'mem-6', weight: 0.7, type: 'related' },
    ],
    source: 'extraction',
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-04-15'),
    accessCount: 23,
    lastRecalled: new Date(Date.now() - 7200000),
  },
  {
    id: 'mem-5',
    content: 'User is based in Germany, timezone Europe/Berlin.',
    category: 'context',
    scope: 'shared',
    importance: 8,
    confidence: 0.92,
    connections: [
      { targetId: 'mem-1', weight: 0.8, type: 'related' },
    ],
    source: 'extraction',
    createdAt: new Date('2024-04-12'),
    updatedAt: new Date('2024-04-12'),
    accessCount: 15,
  },
  {
    id: 'mem-6',
    content: 'DailyWerk is inspired by OpenClaw architecture.',
    category: 'fact',
    scope: 'shared',
    importance: 5,
    confidence: 0.90,
    connections: [
      { targetId: 'mem-4', weight: 0.7, type: 'related' },
    ],
    source: 'extraction',
    createdAt: new Date('2024-04-14'),
    updatedAt: new Date('2024-04-14'),
    accessCount: 4,
  },
  {
    id: 'mem-7',
    content: 'Financial planning details - confidential.',
    category: 'fact',
    scope: 'private',
    agentId: 'vault-private',
    importance: 8,
    confidence: 0.95,
    connections: [],
    source: 'manual',
    createdAt: new Date('2024-04-13'),
    updatedAt: new Date('2024-04-13'),
    accessCount: 1,
  },
];

// Sample Automations
export const sampleAutomations: Automation[] = [
  {
    id: 'auto-1',
    type: 'cron',
    name: 'Daily Summary',
    description: 'Get a summary of your day every evening at 6pm.',
    agentId: 'atlas',
    schedule: '0 18 * * *',
    isEnabled: true,
    lastRun: new Date(Date.now() - 86400000),
    nextRun: new Date(Date.now() + 43200000),
  },
  {
    id: 'auto-2',
    type: 'reminder',
    name: 'Research AI Agents',
    description: 'Continue research on AI agent developments',
    agentId: 'atlas',
    dueDate: new Date(Date.now() + 43200000),
    isEnabled: true,
  },
  {
    id: 'auto-3',
    type: 'todo',
    name: 'Review project proposal',
    agentId: 'atlas',
    dueDate: new Date(Date.now() + 86400000),
    isCompleted: false,
    isEnabled: true,
  },
  {
    id: 'auto-4',
    type: 'todo',
    name: 'Send weekly report',
    agentId: 'atlas',
    dueDate: new Date(Date.now() - 86400000),
    isCompleted: true,
    isEnabled: true,
  },
];

// Sample markdown content for vault preview
export const sampleMarkdownContent = `# Daily Note - 2024-04-15

Today was a productive day working on the DailyWerk UI redesign.

## Completed
- Reviewed competitor analysis
- Started UI mockups for chat interface
- Met with design team

## Notes
The chat interface needs to feel more **magical** and less like a data tool. Key insights:

1. Messages should float, not be boxed
2. Tool calls should appear as inline chips
3. The input bar needs voice and reasoning toggles

## Tomorrow
- Continue with memory DAG visualization
- Test mobile responsiveness

---

> "The best interface is no interface" - Golden Krishna

\`\`\`typescript
// Example code block
const agent = await createAgent({
  name: 'Atlas',
  tools: ['web-search', 'reminders'],
});
\`\`\`
`;

// Re-export with alternative names for convenience
export const mockVaultFiles: VaultFile[] = [
  {
    id: 'vf-1',
    name: 'Daily Note - 2026-04-15.md',
    path: 'daily/2026/2026-04-15.md',
    type: 'file',
    content: sampleMarkdownContent,
    tags: ['daily', 'notes'],
    createdAt: new Date('2026-04-15'),
    updatedAt: new Date('2026-04-15'),
  },
  {
    id: 'vf-2',
    name: 'Daily Note - 2026-04-14.md',
    path: 'daily/2026/2026-04-14.md',
    type: 'file',
    content: '# Daily Note - 2026-04-14\n\nYesterday\'s notes...',
    tags: ['daily', 'notes'],
    createdAt: new Date('2026-04-14'),
    updatedAt: new Date('2026-04-14'),
  },
  {
    id: 'vf-3',
    name: 'Project Ideas.md',
    path: 'research/project-ideas.md',
    type: 'file',
    content: '# Project Ideas\n\n- DailyWerk improvements\n- New agent templates\n- Memory system enhancements',
    tags: ['ideas', 'projects'],
    createdAt: new Date('2026-04-10'),
    updatedAt: new Date('2026-04-14'),
  },
  {
    id: 'vf-4',
    name: 'Meeting Notes.md',
    path: 'work/meetings/meeting-notes.md',
    type: 'file',
    content: '# Meeting Notes\n\n## Sprint Planning\n\n- Discussed roadmap\n- Set priorities',
    tags: ['work', 'meetings'],
    createdAt: new Date('2026-04-12'),
    updatedAt: new Date('2026-04-12'),
  },
  {
    id: 'vf-5',
    name: 'Reading List.md',
    path: 'personal/reading-list.md',
    type: 'file',
    content: '# Reading List\n\n- [ ] The Pragmatic Programmer\n- [x] Designing Data-Intensive Applications\n- [ ] Clean Code',
    tags: ['personal', 'books'],
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-04-10'),
  },
];

export const mockMemoryNodes: MemoryNode[] = sampleMemoryNodes;
