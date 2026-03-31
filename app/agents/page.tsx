'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAgents } from '@/contexts/agent-context';
import { Header } from '@/components/layout/header';
import { AgentCard } from '@/components/agents/agent-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bot, Plus, Search, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';
type FilterMode = 'all' | 'main' | 'confidential';

export default function AgentsPage() {
  const { agents } = useAgents();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [search, setSearch] = useState('');

  const filteredAgents = agents.filter((agent) => {
    // Search filter
    if (search && !agent.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    // Type filter
    if (filter === 'main' && !agent.isMain) return false;
    if (filter === 'confidential' && !agent.isConfidential) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Agents"
        subtitle={`${agents.length} agent${agents.length !== 1 ? 's' : ''}`}
        actions={
          <Button asChild size="sm">
            <Link href="/agents/new">
              <Plus className="h-4 w-4 mr-1" />
              New Agent
            </Link>
          </Button>
        }
      />

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={(v) => setFilter(v as FilterMode)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="main">Main Only</SelectItem>
                  <SelectItem value="confidential">Confidential</SelectItem>
                </SelectContent>
              </Select>
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(v) => v && setViewMode(v as ViewMode)}
                className="hidden sm:flex"
              >
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Agent List */}
          {filteredAgents.length === 0 ? (
            <EmptyState
              icon={Bot}
              title={search ? 'No agents found' : 'No agents yet'}
              description={
                search
                  ? 'Try a different search term'
                  : 'Create your first agent to get started'
              }
              action={
                !search && (
                  <Button asChild>
                    <Link href="/agents/new">
                      <Plus className="h-4 w-4 mr-1" />
                      Create Agent
                    </Link>
                  </Button>
                )
              }
              className="py-16"
            />
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
      </div>
    </div>
  );
}
