'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useAgents } from '@/contexts/agent-context';
import {
  MessageSquare,
  Bot,
  Wrench,
  Database,
  Zap,
  Share2,
  Settings,
  Plus,
  Search,
  FileText,
  Calendar,
} from 'lucide-react';

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { agents, setCurrentAgent } = useAgents();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/chat'))}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Open Chat</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/agents/new'))}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Agent</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/automations'))}
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>View Tasks & Reminders</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Agents">
          {agents.map((agent) => (
            <CommandItem
              key={agent.id}
              onSelect={() =>
                runCommand(() => {
                  setCurrentAgent(agent.id);
                  router.push('/chat');
                })
              }
            >
              <Bot className="mr-2 h-4 w-4" />
              <span>Chat with {agent.name}</span>
              {agent.isMain && (
                <span className="ml-auto text-xs text-muted-foreground">Main</span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/agents'))}
          >
            <Bot className="mr-2 h-4 w-4" />
            <span>Manage Agents</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/tools'))}
          >
            <Wrench className="mr-2 h-4 w-4" />
            <span>Browse Tools</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/knowledge'))}
          >
            <Database className="mr-2 h-4 w-4" />
            <span>Knowledge Vault</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/automations'))}
          >
            <Zap className="mr-2 h-4 w-4" />
            <span>Automations</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/gateways'))}
          >
            <Share2 className="mr-2 h-4 w-4" />
            <span>Gateways</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/settings'))}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Help">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/onboarding/tour'))}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Take a Tour</span>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Documentation</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
