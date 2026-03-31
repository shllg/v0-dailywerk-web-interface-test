// DailyWerk Constants

export const APP_NAME = 'DailyWerk';
export const APP_DESCRIPTION = 'Your personal multi-agent AI assistant system';

export const ONBOARDING_STEPS = [
  { id: 'welcome', title: 'Welcome', description: 'Get started with DailyWerk' },
  { id: 'create-agent', title: 'Create Agent', description: 'Set up your main assistant' },
  { id: 'choose-tools', title: 'Choose Tools', description: 'Select tools for your agent' },
  { id: 'connect-gateway', title: 'Connect Gateway', description: 'Optional: Connect messaging' },
  { id: 'complete', title: 'Complete', description: 'Ready to start!' },
] as const;

export const TOOL_CATEGORIES = {
  communication: 'Communication',
  productivity: 'Productivity',
  knowledge: 'Knowledge',
  integration: 'Integration',
  system: 'System',
} as const;

export const GATEWAY_INFO = {
  signal: {
    name: 'Signal',
    description: 'Secure, private messaging',
    setupUrl: 'https://signal.org',
  },
  telegram: {
    name: 'Telegram',
    description: 'Fast, cloud-based messaging',
    setupUrl: 'https://telegram.org',
  },
  email: {
    name: 'Email',
    description: 'Connect your email accounts',
    setupUrl: null,
  },
  calendar: {
    name: 'Calendar',
    description: 'Sync with your calendar',
    setupUrl: null,
  },
  slack: {
    name: 'Slack',
    description: 'Team collaboration',
    setupUrl: 'https://slack.com',
  },
  discord: {
    name: 'Discord',
    description: 'Community and gaming chat',
    setupUrl: 'https://discord.com',
  },
} as const;

export const NAVIGATION_ITEMS = [
  { href: '/chat', label: 'Chat', icon: 'MessageSquare' },
  { href: '/agents', label: 'Agents', icon: 'Bot' },
  { href: '/tools', label: 'Tools', icon: 'Wrench' },
  { href: '/knowledge', label: 'Knowledge', icon: 'Database' },
  { href: '/automations', label: 'Automations', icon: 'Zap' },
  { href: '/gateways', label: 'Gateways', icon: 'Share2' },
  { href: '/settings', label: 'Settings', icon: 'Settings' },
] as const;

export const MOBILE_NAV_ITEMS = [
  { href: '/chat', label: 'Chat', icon: 'MessageSquare' },
  { href: '/agents', label: 'Agents', icon: 'Bot' },
  { href: '/automations', label: 'Tasks', icon: 'CheckSquare' },
  { href: '/settings', label: 'More', icon: 'Menu' },
] as const;

export const TOUR_STEPS = [
  {
    id: 'chat-input',
    target: '[data-tour="chat-input"]',
    title: 'Send Messages',
    content: 'Type your message here to chat with your agent. You can ask questions, give commands, or just have a conversation.',
  },
  {
    id: 'agent-selector',
    target: '[data-tour="agent-selector"]',
    title: 'Switch Agents',
    content: 'Click here to switch between your different agents. Each agent has its own personality and capabilities.',
  },
  {
    id: 'sidebar',
    target: '[data-tour="sidebar"]',
    title: 'Navigation',
    content: 'Use the sidebar to access all features: manage agents, tools, knowledge vault, automations, and settings.',
  },
  {
    id: 'command-palette',
    target: '[data-tour="command-palette"]',
    title: 'Quick Actions',
    content: 'Press Cmd+K (or Ctrl+K) anytime to open the command palette for quick access to any feature.',
  },
] as const;
