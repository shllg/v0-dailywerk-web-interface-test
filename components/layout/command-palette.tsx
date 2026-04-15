'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAgents } from '@/contexts/agent-context';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  MessageSquare,
  Bot,
  Brain,
  FolderOpen,
  Settings,
  Plus,
  Sparkles,
  Search,
  Calendar,
  Mail,
  FileText,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const router = useRouter();
  const { agents, setActiveAgentId } = useAgents();

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, [setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/95 backdrop-blur-2xl shadow-2xl">
        {/* Header with glow */}
        <div className="relative px-1 pt-1">
          <div className="absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <CommandInput 
            placeholder="Ask anything or search..." 
            className={cn(
              'h-14 border-0 bg-transparent text-base',
              'placeholder:text-white/30',
              'focus:ring-0'
            )}
          />
        </div>

        <CommandList className="max-h-[60vh] overflow-y-auto p-2">
          <CommandEmpty className="py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <Search className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-white/40 text-sm">No results found</p>
            </div>
          </CommandEmpty>

          {/* Quick Actions */}
          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/chat'))}
              className="rounded-xl py-3"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-3">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <span className="font-medium">New Chat</span>
                <p className="text-xs text-white/40">Start a conversation</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20" />
            </CommandItem>

            <CommandItem
              onSelect={() => runCommand(() => router.push('/agents/new'))}
              className="rounded-xl py-3"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center mr-3">
                <Plus className="w-4 h-4 text-white/60" />
              </div>
              <div className="flex-1">
                <span className="font-medium">Create Agent</span>
                <p className="text-xs text-white/40">Add a new AI agent</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20" />
            </CommandItem>
          </CommandGroup>

          <CommandSeparator className="bg-white/5 my-2" />

          {/* Chat with Agents */}
          <CommandGroup heading="Chat with Agent">
            {agents.slice(0, 5).map((agent) => (
              <CommandItem
                key={agent.id}
                onSelect={() => runCommand(() => {
                  setActiveAgentId(agent.id);
                  router.push('/chat');
                })}
                className="rounded-xl py-2.5"
              >
                <div className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center mr-3',
                  'bg-gradient-to-br from-primary/20 to-accent/20'
                )}>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium">{agent.name}</span>
                  {agent.isMain && (
                    <span className="ml-2 text-[10px] text-primary/60 uppercase">Main</span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="bg-white/5 my-2" />

          {/* Navigation */}
          <CommandGroup heading="Navigate">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/memory'))}
              className="rounded-xl py-2.5"
            >
              <Brain className="w-4 h-4 mr-3 text-white/40" />
              <span>Memory</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/vault'))}
              className="rounded-xl py-2.5"
            >
              <FolderOpen className="w-4 h-4 mr-3 text-white/40" />
              <span>Vault</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/agents'))}
              className="rounded-xl py-2.5"
            >
              <Bot className="w-4 h-4 mr-3 text-white/40" />
              <span>Manage Agents</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/settings'))}
              className="rounded-xl py-2.5"
            >
              <Settings className="w-4 h-4 mr-3 text-white/40" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator className="bg-white/5 my-2" />

          {/* Tools */}
          <CommandGroup heading="Tools">
            <CommandItem className="rounded-xl py-2.5">
              <Search className="w-4 h-4 mr-3 text-white/40" />
              <span>Web Search</span>
            </CommandItem>
            <CommandItem className="rounded-xl py-2.5">
              <Calendar className="w-4 h-4 mr-3 text-white/40" />
              <span>Check Calendar</span>
            </CommandItem>
            <CommandItem className="rounded-xl py-2.5">
              <Mail className="w-4 h-4 mr-3 text-white/40" />
              <span>Read Emails</span>
            </CommandItem>
            <CommandItem className="rounded-xl py-2.5">
              <FileText className="w-4 h-4 mr-3 text-white/40" />
              <span>Create Note</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 text-[11px] text-white/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5">↵</kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5">↑↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5">esc</kbd>
              <span>Close</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>DailyWerk</span>
          </div>
        </div>
      </div>
    </CommandDialog>
  );
}
