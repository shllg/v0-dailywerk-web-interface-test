'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Agent } from '@/lib/types';
import { useAgents } from '@/contexts/agent-context';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusIndicator } from '@/components/shared/status-indicator';
import {
  MessageSquare,
  Settings,
  Copy,
  Trash2,
  MoreVertical,
  Shield,
  Wrench,
} from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  viewMode: 'grid' | 'list';
}

export function AgentCard({ agent, viewMode }: AgentCardProps) {
  const router = useRouter();
  const { setCurrentAgent, deleteAgent } = useAgents();

  const handleChat = () => {
    setCurrentAgent(agent.id);
    router.push('/chat');
  };

  const handleDelete = () => {
    if (agent.isMain) {
      alert('Cannot delete the main agent');
      return;
    }
    if (confirm(`Are you sure you want to delete ${agent.name}?`)) {
      deleteAgent(agent.id);
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:bg-muted/30 transition-colors">
        <CardContent className="flex items-center gap-4 p-4">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary font-medium">
              {agent.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium truncate">{agent.name}</h3>
              {agent.isMain && <Badge variant="secondary">Main</Badge>}
              {agent.isConfidential && (
                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <StatusIndicator status={agent.status} size="sm" />
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {agent.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline" className="gap-1">
              <Wrench className="h-3 w-3" />
              {agent.tools.length}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleChat}>
              <MessageSquare className="h-4 w-4 mr-1" />
              Chat
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/agents/${agent.id}/settings`}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={handleDelete}
                  disabled={agent.isMain}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:bg-muted/30 transition-colors group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/20 text-primary text-lg font-medium">
              {agent.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/agents/${agent.id}/settings`}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleDelete}
                disabled={agent.isMain}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-medium truncate">{agent.name}</h3>
            {agent.isMain && (
              <Badge variant="secondary" className="text-xs">
                Main
              </Badge>
            )}
            {agent.isConfidential && (
              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <StatusIndicator status={agent.status} size="sm" showLabel />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {agent.description}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="gap-1">
            <Wrench className="h-3 w-3" />
            {agent.tools.length} tools
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button className="flex-1" onClick={handleChat}>
            <MessageSquare className="h-4 w-4 mr-1" />
            Chat
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/agents/${agent.id}/settings`}>
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
