'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AgentTemplate } from '@/lib/types';
import {
  Sparkles,
  Briefcase,
  Search,
  Pen,
  Code,
  Target,
} from 'lucide-react';

const iconMap: Record<string, typeof Sparkles> = {
  Sparkles,
  Briefcase,
  Search,
  Pen,
  Code,
  Target,
};

interface CreateAgentStepProps {
  templates: AgentTemplate[];
  selectedTemplateId: string;
  onTemplateSelect: (id: string) => void;
  agentName: string;
  onAgentNameChange: (name: string) => void;
}

export function CreateAgentStep({
  templates,
  selectedTemplateId,
  onTemplateSelect,
  agentName,
  onAgentNameChange,
}: CreateAgentStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Create Your Main Agent</h2>
        <p className="text-sm text-muted-foreground">
          Choose a template to get started. You can customize everything later.
        </p>
      </div>

      {/* Agent Name */}
      <div className="space-y-2">
        <Label htmlFor="agentName">Agent Name</Label>
        <Input
          id="agentName"
          placeholder="Give your agent a name"
          value={agentName}
          onChange={(e) => onAgentNameChange(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Templates Grid */}
      <div className="space-y-2">
        <Label>Choose a Template</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {templates.map((template) => {
            const Icon = iconMap[template.icon] || Sparkles;
            const isSelected = selectedTemplateId === template.id;
            return (
              <button
                key={template.id}
                onClick={() => onTemplateSelect(template.id)}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-lg border text-left transition-all',
                  isSelected
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                )}
              >
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-lg shrink-0',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-sm">{template.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
