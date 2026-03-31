'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/user-context';
import { useAgents } from '@/contexts/agent-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  MessageSquare,
  Bot,
  Wrench,
  Database,
  Zap,
  Share2,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Plus,
  Sparkles,
  Shield,
  Command,
} from 'lucide-react';

const navItems = [
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/agents', label: 'Agents', icon: Bot },
  { href: '/tools', label: 'Tools', icon: Wrench },
  { href: '/knowledge', label: 'Knowledge', icon: Database },
  { href: '/automations', label: 'Automations', icon: Zap },
  { href: '/gateways', label: 'Gateways', icon: Share2 },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { preferences, updatePreferences } = useUser();
  const { agents, currentAgent, setCurrentAgent } = useAgents();
  const isCollapsed = preferences.sidebarCollapsed;

  const toggleCollapsed = () => {
    updatePreferences({ sidebarCollapsed: !isCollapsed });
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        data-tour="sidebar"
        className={cn(
          'flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300',
          isCollapsed ? 'w-16' : 'w-64',
          className
        )}
      >
        {/* Header */}
        <div className={cn(
          'flex items-center h-14 px-3 border-b border-sidebar-border',
          isCollapsed ? 'justify-center' : 'justify-between'
        )}>
          {!isCollapsed && (
            <Link href="/chat" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">DailyWerk</span>
            </Link>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCollapsed}
                className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                {isCollapsed ? (
                  <PanelLeft className="h-4 w-4" />
                ) : (
                  <PanelLeftClose className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Quick Actions */}
        <div className={cn('px-3 py-2', isCollapsed && 'px-2')}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start gap-2 bg-sidebar-accent/50 border-sidebar-border hover:bg-sidebar-accent',
                  isCollapsed && 'justify-center px-0'
                )}
                data-tour="command-palette"
              >
                <Command className="h-4 w-4" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">Quick actions</span>
                    <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      K
                    </kbd>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">Quick actions (Cmd+K)</TooltipContent>
            )}
          </Tooltip>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Agents Section */}
        <div className={cn('px-3 py-2', isCollapsed && 'px-2')}>
          {!isCollapsed && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Agents
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    asChild
                  >
                    <Link href="/agents/new">
                      <Plus className="h-3 w-3" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Create new agent</TooltipContent>
              </Tooltip>
            </div>
          )}
          <ScrollArea className="h-32">
            <div className="space-y-1" data-tour="agent-selector">
              {agents.map((agent) => (
                <Tooltip key={agent.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setCurrentAgent(agent.id)}
                      className={cn(
                        'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
                        'hover:bg-sidebar-accent',
                        currentAgent?.id === agent.id
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground',
                        isCollapsed && 'justify-center px-0'
                      )}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-primary/20 text-primary">
                          {agent.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left truncate">{agent.name}</span>
                          {agent.isMain && (
                            <Badge variant="secondary" className="text-xs px-1">
                              Main
                            </Badge>
                          )}
                          {agent.isConfidential && (
                            <Shield className="h-3 w-3 text-muted-foreground" />
                          )}
                        </>
                      )}
                    </button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      {agent.name}
                      {agent.isMain && ' (Main)'}
                      {agent.isConfidential && ' (Confidential)'}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-2">
          <nav className={cn('space-y-1', isCollapsed && 'px-0')}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        'hover:bg-sidebar-accent',
                        isActive
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground',
                        isCollapsed && 'justify-center px-0'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className={cn('px-3 py-2 border-t border-sidebar-border', isCollapsed && 'px-2')}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  'hover:bg-sidebar-accent text-sidebar-foreground',
                  pathname.startsWith('/settings') && 'bg-sidebar-accent',
                  isCollapsed && 'justify-center px-0'
                )}
              >
                <Settings className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>Settings</span>}
              </Link>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">Settings</TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
