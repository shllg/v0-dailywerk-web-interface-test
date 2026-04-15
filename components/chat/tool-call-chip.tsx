'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ToolCall } from '@/lib/types';
import { 
  CheckCircle2, 
  Loader2, 
  XCircle, 
  ChevronDown,
  Search,
  FileText,
  Calendar,
  Mail,
  Database,
  Globe,
  Zap,
  Brain,
  Folder
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ToolCallChipProps {
  toolCall: ToolCall;
  className?: string;
}

const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  'web-search': Globe,
  'read-file': FileText,
  'write-file': FileText,
  'calendar': Calendar,
  'email': Mail,
  'database': Database,
  'memory': Brain,
  'vault': Folder,
  default: Zap,
};

export function ToolCallChip({ toolCall, className }: ToolCallChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = toolIcons[toolCall.name] || toolIcons.default;
  
  const statusColors = {
    pending: 'text-muted-foreground/60',
    running: 'text-amber-400',
    completed: 'text-emerald-400',
    failed: 'text-rose-400',
  };

  const StatusIcon = {
    pending: () => <div className="w-3 h-3 rounded-full border-2 border-current opacity-50" />,
    running: () => <Loader2 className="w-3 h-3 animate-spin" />,
    completed: () => <CheckCircle2 className="w-3 h-3" />,
    failed: () => <XCircle className="w-3 h-3" />,
  }[toolCall.status];

  const humanizedName = toolCall.name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium',
            'bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]',
            'transition-all duration-200 group',
            toolCall.status === 'running' && 'animate-pulse',
            className
          )}
        >
          {/* Tool icon */}
          <div className={cn(
            'w-5 h-5 rounded-lg flex items-center justify-center',
            'bg-gradient-to-br from-primary/20 to-accent/20'
          )}>
            <Icon className="w-3 h-3 text-primary" />
          </div>
          
          {/* Tool name */}
          <span className="text-foreground/80">{humanizedName}</span>
          
          {/* Status indicator */}
          <span className={cn('transition-colors', statusColors[toolCall.status])}>
            <StatusIcon />
          </span>
          
          {/* Expand indicator */}
          {(toolCall.input || toolCall.output) && (
            <ChevronDown className={cn(
              'w-3 h-3 text-muted-foreground/40 transition-transform duration-200',
              isOpen && 'rotate-180'
            )} />
          )}
        </button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-2 animate-in slide-in-from-top-1 duration-200">
        <div className="rounded-xl bg-black/20 border border-white/5 p-3 text-xs space-y-2">
          {toolCall.input && (
            <div>
              <div className="text-muted-foreground/50 uppercase tracking-wider text-[10px] mb-1">Input</div>
              <pre className="text-foreground/70 font-mono whitespace-pre-wrap break-all">
                {typeof toolCall.input === 'string' ? toolCall.input : JSON.stringify(toolCall.input, null, 2)}
              </pre>
            </div>
          )}
          {toolCall.output && (
            <div>
              <div className="text-muted-foreground/50 uppercase tracking-wider text-[10px] mb-1">Output</div>
              <pre className="text-foreground/70 font-mono whitespace-pre-wrap break-all max-h-32 overflow-y-auto">
                {typeof toolCall.output === 'string' ? toolCall.output : JSON.stringify(toolCall.output, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
