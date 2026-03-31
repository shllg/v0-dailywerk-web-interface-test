'use client';

import Link from 'next/link';
import type { Agent } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusIndicator } from '@/components/shared/status-indicator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from '@/components/layout/sidebar';
import { Menu, MoreVertical, Settings, Trash2, Shield, RefreshCw } from 'lucide-react';

interface ChatHeaderProps {
  agent: Agent;
}

export function ChatHeader({ agent }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 h-14 px-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Agent info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="bg-primary/20 text-primary font-medium">
            {agent.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold truncate">{agent.name}</h1>
            {agent.isMain && (
              <Badge variant="secondary" className="text-xs shrink-0">
                Main
              </Badge>
            )}
            {agent.isConfidential && (
              <Shield className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <StatusIndicator status={agent.status} size="sm" />
            <span className="text-xs text-muted-foreground truncate">
              {agent.description}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/agents/${agent.id}/settings`}>
              <Settings className="h-4 w-4 mr-2" />
              Agent Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear Chat
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Agent
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
