'use client';

import { cn } from '@/lib/utils';
import type { Agent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Sparkles, Lock, Plus, Settings } from 'lucide-react';
import Link from 'next/link';

interface AgentSwitcherProps {
  currentAgent: Agent;
  agents: Agent[];
  onSelect: (agentId: string) => void;
}

export function AgentSwitcher({ currentAgent, agents, onSelect }: AgentSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'flex items-center gap-3 px-3 py-2 h-auto rounded-2xl',
            'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]',
            'transition-all duration-200'
          )}
        >
          {/* Agent avatar */}
          <div className={cn(
            'w-8 h-8 rounded-xl flex items-center justify-center',
            'bg-gradient-to-br from-primary/20 to-accent/20',
            currentAgent.isMain && 'ring-2 ring-primary/30'
          )}>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          
          {/* Agent name and status */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-sm">{currentAgent.name}</span>
              {currentAgent.isConfidential && (
                <Lock className="w-3 h-3 text-amber-500" />
              )}
            </div>
            <span className="text-[10px] text-muted-foreground/50">
              {currentAgent.isMain ? 'Main Agent' : currentAgent.template || 'Custom'}
            </span>
          </div>
          
          <ChevronDown className="w-4 h-4 text-muted-foreground/50 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start" 
        className={cn(
          'w-64 p-2 rounded-2xl',
          'bg-card/95 backdrop-blur-xl border-white/10'
        )}
      >
        <DropdownMenuLabel className="text-[10px] text-muted-foreground/50 uppercase tracking-wider px-2 py-1">
          Switch Agent
        </DropdownMenuLabel>
        
        {agents.map((agent) => (
          <DropdownMenuItem
            key={agent.id}
            onClick={() => onSelect(agent.id)}
            className={cn(
              'flex items-center gap-3 px-2 py-2.5 rounded-xl cursor-pointer',
              'focus:bg-white/[0.05]',
              agent.id === currentAgent.id && 'bg-primary/10'
            )}
          >
            <div className={cn(
              'w-8 h-8 rounded-xl flex items-center justify-center',
              'bg-gradient-to-br from-primary/20 to-accent/20',
              agent.isMain && 'ring-2 ring-primary/30'
            )}>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-sm truncate">{agent.name}</span>
                {agent.isConfidential && (
                  <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                )}
              </div>
              <span className="text-[10px] text-muted-foreground/50">
                {agent.isMain ? 'Main Agent' : agent.template || 'Custom'}
              </span>
            </div>
            
            {agent.id === currentAgent.id && (
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="bg-white/5 my-2" />
        
        <DropdownMenuItem asChild>
          <Link
            href="/agents/new"
            className="flex items-center gap-3 px-2 py-2.5 rounded-xl cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/5 border border-dashed border-white/10">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-sm">Create new agent</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link
            href="/agents"
            className="flex items-center gap-3 px-2 py-2.5 rounded-xl cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/5">
              <Settings className="w-4 h-4" />
            </div>
            <span className="text-sm">Manage agents</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
