'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAgents } from '@/contexts/agent-context';
import { AppShell } from '@/components/layout/app-shell';
import { AgentCard } from '@/components/agents/agent-card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bot, Plus, Search, LayoutGrid, List, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';
type FilterMode = 'all' | 'main' | 'confidential';

export default function AgentsPage() {
  const { agents } = useAgents();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [search, setSearch] = useState('');

  const filteredAgents = agents.filter((agent) => {
    if (search && !agent.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filter === 'main' && !agent.isMain) return false;
    if (filter === 'confidential' && !agent.isConfidential) return false;
    return true;
  });

  return (
    <AppShell>
      <ScrollArea className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">Agents</h1>
                <p className="text-sm text-white/40">{agents.length} agent{agents.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <Button asChild className="bg-primary/20 hover:bg-primary/30 text-primary">
              <Link href="/agents/new">
                <Plus className="h-4 w-4 mr-2" />
                New Agent
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search agents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  'w-full h-10 pl-10 pr-4 rounded-xl text-sm',
                  'bg-white/5 border border-white/10',
                  'placeholder:text-white/30',
                  'focus:outline-none focus:border-primary/30'
                )}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={(v) => setFilter(v as FilterMode)}>
                <SelectTrigger className="w-[140px] bg-white/5 border-white/10 rounded-xl">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="main">Main Only</SelectItem>
                  <SelectItem value="confidential">Confidential</SelectItem>
                </SelectContent>
              </Select>
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(v) => v && setViewMode(v as ViewMode)}
                className="hidden sm:flex bg-white/5 rounded-xl p-1"
              >
                <ToggleGroupItem value="grid" aria-label="Grid view" className="rounded-lg data-[state=on]:bg-white/10">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view" className="rounded-lg data-[state=on]:bg-white/10">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Agent List */}
          {filteredAgents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-lg font-medium text-white/60 mb-2">
                {search ? 'No agents found' : 'No agents yet'}
              </h3>
              <p className="text-sm text-white/30 mb-4">
                {search ? 'Try a different search term' : 'Create your first agent to get started'}
              </p>
              {!search && (
                <Button asChild className="bg-primary/20 hover:bg-primary/30 text-primary">
                  <Link href="/agents/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Agent
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div
              className={cn(
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                  : 'space-y-3'
              )}
            >
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </AppShell>
  );
}
