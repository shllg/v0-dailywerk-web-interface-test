'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { availableTools } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Globe,
  Calculator,
  Bell,
  CheckSquare,
  Calendar,
  Mail,
  FileText,
  Database,
  Terminal,
  Settings,
  Pencil,
  Quote,
  Book,
  BookOpen,
  Search,
  Wrench,
} from 'lucide-react';

const iconMap: Record<string, typeof Globe> = {
  Globe,
  Calculator,
  Bell,
  CheckSquare,
  Calendar,
  Mail,
  FileText,
  Database,
  Terminal,
  Settings,
  Pencil,
  Quote,
  Book,
  BookOpen,
};

const categoryLabels: Record<string, string> = {
  productivity: 'Productivity',
  knowledge: 'Knowledge',
  communication: 'Communication',
  integration: 'Integrations',
  system: 'System',
};

export default function ToolsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredTools = availableTools.filter((tool) => {
    if (search && !tool.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (categoryFilter !== 'all' && tool.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  const categories = [...new Set(availableTools.map((t) => t.category))];

  return (
    <AppShell>
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">Tools</h1>
                <p className="text-sm text-white/40">{availableTools.length} available</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search tools..."
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 rounded-xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {categoryLabels[cat] || cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTools.map((tool) => {
              const Icon = iconMap[tool.icon] || Wrench;
              return (
                <Card key={tool.id} className="bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'flex items-center justify-center w-12 h-12 rounded-xl shrink-0',
                          tool.isEnabled 
                            ? 'bg-gradient-to-br from-primary/20 to-accent/20 text-primary' 
                            : 'bg-white/5 text-white/40'
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white/90">{tool.name}</h3>
                          <Badge variant="secondary" className="text-[10px] bg-white/5 text-white/40">
                            {categoryLabels[tool.category] || tool.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/40 mb-3">
                          {tool.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/30">
                            {tool.usageCount || 0} uses
                          </span>
                          <div className="flex items-center gap-2">
                            {!tool.isEnabled && (
                              <Button variant="ghost" size="sm" className="text-xs text-primary">
                                Setup
                              </Button>
                            )}
                            <Switch checked={tool.isEnabled} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="h-12 w-12 mx-auto mb-4 text-white/10" />
              <p className="text-white/30">No tools found matching your criteria</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </AppShell>
  );
}
