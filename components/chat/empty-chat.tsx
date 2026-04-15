'use client';

import { cn } from '@/lib/utils';
import type { Agent } from '@/lib/types';
import { Sparkles, ArrowRight, Brain, Calendar, FileText, Search } from 'lucide-react';

interface EmptyChatProps {
  agent: Agent;
  suggestedPrompts?: Array<{ text: string; icon?: string }>;
  onSelectPrompt: (prompt: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  calendar: Calendar,
  file: FileText,
  search: Search,
  default: Sparkles,
};

export function EmptyChat({ agent, suggestedPrompts = [], onSelectPrompt }: EmptyChatProps) {
  const defaultPrompts = [
    { text: 'What can you help me with?', icon: 'brain' },
    { text: 'Check my calendar for today', icon: 'calendar' },
    { text: 'Summarize my recent notes', icon: 'file' },
    { text: 'Search my knowledge vault', icon: 'search' },
  ];

  const prompts = suggestedPrompts.length > 0 ? suggestedPrompts : defaultPrompts;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      {/* Agent avatar with glow */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-3xl scale-150 opacity-30" />
        <div className={cn(
          'relative w-20 h-20 rounded-3xl flex items-center justify-center',
          'bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10',
          'border border-white/10 backdrop-blur-sm',
          'shadow-2xl shadow-primary/20'
        )}>
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Greeting */}
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2 text-balance">
        <span className="text-foreground">Hello!</span>
        <span className="text-muted-foreground/70"> How can I help you today?</span>
      </h1>
      
      <p className="text-sm text-muted-foreground/50 text-center max-w-md mb-10">
        I&apos;m {agent.name}, your personal AI assistant. Ask me anything or choose a suggestion below.
      </p>

      {/* Suggested prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {prompts.map((prompt, index) => {
          const Icon = iconMap[prompt.icon || 'default'] || iconMap.default;
          return (
            <button
              key={index}
              onClick={() => onSelectPrompt(prompt.text)}
              className={cn(
                'group flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300',
                'bg-white/[0.02] hover:bg-white/[0.05]',
                'border border-white/[0.05] hover:border-primary/20',
                'hover:shadow-lg hover:shadow-primary/5'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                'bg-gradient-to-br from-primary/10 to-accent/10',
                'group-hover:from-primary/20 group-hover:to-accent/20',
                'transition-all duration-300'
              )}>
                <Icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
              </div>
              <span className="flex-1 text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                {prompt.text}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/50 group-hover:translate-x-1 transition-all" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
