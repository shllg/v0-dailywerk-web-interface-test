'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState } from '@/components/shared/empty-state';
import { sampleAutomations } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Zap,
  Plus,
  Clock,
  Bell,
  CheckSquare,
  Calendar,
  MoreVertical,
  Play,
  Pause,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TabType = 'all' | 'cron' | 'reminder' | 'todo';

const typeConfig = {
  cron: { icon: Clock, label: 'Cron', color: 'text-blue-500' },
  reminder: { icon: Bell, label: 'Reminder', color: 'text-amber-500' },
  todo: { icon: CheckSquare, label: 'Todo', color: 'text-green-500' },
};

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [automations, setAutomations] = useState(sampleAutomations);

  const filteredAutomations = automations.filter((auto) => {
    if (activeTab === 'all') return true;
    return auto.type === activeTab;
  });

  const toggleTodo = (id: string) => {
    setAutomations((prev) =>
      prev.map((auto) =>
        auto.id === id && auto.type === 'todo'
          ? { ...auto, isCompleted: !auto.isCompleted }
          : auto
      )
    );
  };

  const toggleEnabled = (id: string) => {
    setAutomations((prev) =>
      prev.map((auto) =>
        auto.id === id ? { ...auto, isEnabled: !auto.isEnabled } : auto
      )
    );
  };

  const counts = {
    all: automations.length,
    cron: automations.filter((a) => a.type === 'cron').length,
    reminder: automations.filter((a) => a.type === 'reminder').length,
    todo: automations.filter((a) => a.type === 'todo').length,
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Automations"
          subtitle="Crons, reminders, and todos"
          actions={
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          }
        />

        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="gap-1">
                  All
                  <Badge variant="secondary" className="text-xs">
                    {counts.all}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="cron" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Crons
                </TabsTrigger>
                <TabsTrigger value="reminder" className="gap-1">
                  <Bell className="h-3 w-3" />
                  Reminders
                </TabsTrigger>
                <TabsTrigger value="todo" className="gap-1">
                  <CheckSquare className="h-3 w-3" />
                  Todos
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4 space-y-3">
                {filteredAutomations.length === 0 ? (
                  <EmptyState
                    icon={Zap}
                    title={`No ${activeTab === 'all' ? 'automations' : activeTab + 's'} yet`}
                    description="Create your first automation to get started"
                    action={
                      <Button>
                        <Plus className="h-4 w-4 mr-1" />
                        Create {activeTab === 'all' ? 'Automation' : typeConfig[activeTab as keyof typeof typeConfig]?.label}
                      </Button>
                    }
                    className="py-12"
                  />
                ) : (
                  filteredAutomations.map((auto) => {
                    const config = typeConfig[auto.type];
                    const Icon = config.icon;
                    const isTodo = auto.type === 'todo';
                    const isOverdue = auto.dueDate && new Date(auto.dueDate) < new Date() && !auto.isCompleted;

                    return (
                      <Card
                        key={auto.id}
                        className={cn(
                          'transition-all',
                          isTodo && auto.isCompleted && 'opacity-60'
                        )}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {isTodo ? (
                              <Checkbox
                                checked={auto.isCompleted}
                                onCheckedChange={() => toggleTodo(auto.id)}
                                className="mt-1"
                              />
                            ) : (
                              <div className={cn('p-2 rounded-lg bg-muted', config.color)}>
                                <Icon className="h-4 w-4" />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3
                                  className={cn(
                                    'font-medium',
                                    isTodo && auto.isCompleted && 'line-through text-muted-foreground'
                                  )}
                                >
                                  {auto.name}
                                </h3>
                                <Badge variant="outline" className="text-xs">
                                  {config.label}
                                </Badge>
                                {isOverdue && (
                                  <Badge variant="destructive" className="text-xs">
                                    Overdue
                                  </Badge>
                                )}
                              </div>
                              {auto.description && (
                                <p className="text-sm text-muted-foreground mb-2">
                                  {auto.description}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                {auto.schedule && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {auto.schedule}
                                  </span>
                                )}
                                {auto.dueDate && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(auto.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                                {auto.nextRun && (
                                  <span>Next: {new Date(auto.nextRun).toLocaleString()}</span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {!isTodo && (
                                <Switch
                                  checked={auto.isEnabled}
                                  onCheckedChange={() => toggleEnabled(auto.id)}
                                />
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {auto.type === 'cron' && (
                                    <DropdownMenuItem>
                                      <Play className="h-4 w-4 mr-2" />
                                      Run Now
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
