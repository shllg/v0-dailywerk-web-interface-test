'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
      <div className="flex flex-col h-full">
        <Header
          title="Tools"
          subtitle={`${availableTools.length} available`}
        />

        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tools..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
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
                  <Card key={tool.id} className="hover:bg-muted/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            'flex items-center justify-center w-12 h-12 rounded-lg shrink-0',
                            tool.isEnabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                          )}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{tool.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {categoryLabels[tool.category] || tool.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {tool.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {tool.usageCount || 0} uses
                            </span>
                            <div className="flex items-center gap-2">
                              {!tool.isEnabled && (
                                <Button variant="outline" size="sm">
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
              <div className="text-center py-12 text-muted-foreground">
                <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tools found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
