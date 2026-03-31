'use client';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import type { Tool } from '@/lib/types';
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

interface ChooseToolsStepProps {
  tools: Tool[];
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;
}

export function ChooseToolsStep({
  tools,
  selectedTools,
  onToolsChange,
}: ChooseToolsStepProps) {
  const toggleTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      onToolsChange(selectedTools.filter((id) => id !== toolId));
    } else {
      onToolsChange([...selectedTools, toolId]);
    }
  };

  // Group tools by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  const categoryLabels: Record<string, string> = {
    productivity: 'Productivity',
    knowledge: 'Knowledge',
    communication: 'Communication',
    integration: 'Integrations',
    system: 'System',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Choose Tools</h2>
        <p className="text-sm text-muted-foreground">
          Select the tools your main agent can use. You can change these anytime.
        </p>
      </div>

      <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
        {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
          <div key={category}>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
              {categoryLabels[category] || category}
            </Label>
            <div className="space-y-2">
              {categoryTools.map((tool) => {
                const Icon = iconMap[tool.icon] || Settings;
                const isSelected = selectedTools.includes(tool.id);
                return (
                  <div
                    key={tool.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleTool(tool.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleTool(tool.id);
                      }
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer',
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-border/80 hover:bg-muted/30'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center w-5 h-5 rounded border shrink-0',
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-input bg-background'
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <div
                      className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-md shrink-0',
                        isSelected ? 'bg-primary/20 text-primary' : 'bg-muted'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{tool.name}</span>
                        {!tool.isEnabled && (
                          <Badge variant="outline" className="text-xs">
                            Needs setup
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {selectedTools.length} tool{selectedTools.length !== 1 ? 's' : ''} selected
        </span>
      </div>
    </div>
  );
}
