'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Brain, Plus, RefreshCw } from 'lucide-react';

interface MemoryFiltersProps {
  filters: {
    category: string;
    scope: string;
    minImportance: number;
  };
  onFiltersChange: (filters: MemoryFiltersProps['filters']) => void;
  nodeCount: number;
}

export function MemoryFilters({ filters, onFiltersChange, nodeCount }: MemoryFiltersProps) {
  return (
    <div className="shrink-0 px-4 py-3 border-b border-white/5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Title and count */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-semibold">Memory</h1>
          </div>
          <span className="text-sm text-white/40">
            {nodeCount} nodes
          </span>
        </div>

        {/* Right: Filters and actions */}
        <div className="flex items-center gap-2">
          {/* Category filter */}
          <Select
            value={filters.category}
            onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
          >
            <SelectTrigger className="w-32 h-8 bg-white/5 border-white/10 rounded-lg text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="context">Context</SelectItem>
              <SelectItem value="preference">Preference</SelectItem>
              <SelectItem value="fact">Fact</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="task">Task</SelectItem>
            </SelectContent>
          </Select>

          {/* Scope filter */}
          <Select
            value={filters.scope}
            onValueChange={(value) => onFiltersChange({ ...filters, scope: value })}
          >
            <SelectTrigger className="w-28 h-8 bg-white/5 border-white/10 rounded-lg text-xs">
              <SelectValue placeholder="Scope" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
              <SelectItem value="all">All Scopes</SelectItem>
              <SelectItem value="shared">Shared</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>

          {/* Importance filter */}
          <Select
            value={filters.minImportance.toString()}
            onValueChange={(value) => onFiltersChange({ ...filters, minImportance: Number(value) })}
          >
            <SelectTrigger className="w-32 h-8 bg-white/5 border-white/10 rounded-lg text-xs">
              <SelectValue placeholder="Importance" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
              <SelectItem value="0">Any Importance</SelectItem>
              <SelectItem value="3">3+ Importance</SelectItem>
              <SelectItem value="5">5+ Importance</SelectItem>
              <SelectItem value="7">7+ Importance</SelectItem>
            </SelectContent>
          </Select>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Actions */}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button size="sm" className="h-8 bg-primary/20 hover:bg-primary/30 text-primary">
            <Plus className="w-4 h-4 mr-1" />
            Add Memory
          </Button>
        </div>
      </div>
    </div>
  );
}
