'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { Agent, AgentTemplate, Tool } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
  Sparkles,
  Briefcase,
  Search,
  Pen,
  Code,
  Target,
  Shield,
  AlertTriangle,
} from 'lucide-react';

const iconMap: Record<string, typeof Sparkles> = {
  Sparkles,
  Briefcase,
  Search,
  Pen,
  Code,
  Target,
};

interface AgentFormProps {
  agent?: Agent;
  templates: AgentTemplate[];
  tools: Tool[];
  onSubmit: (data: Partial<Agent>) => void;
  isSubmitting?: boolean;
}

export function AgentForm({
  agent,
  templates,
  tools,
  onSubmit,
  isSubmitting,
}: AgentFormProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(agent?.templateId || '');
  const [name, setName] = useState(agent?.name || '');
  const [description, setDescription] = useState(agent?.description || '');
  const [systemPrompt, setSystemPrompt] = useState(agent?.systemPrompt || '');
  const [selectedTools, setSelectedTools] = useState<string[]>(agent?.tools || []);
  const [isConfidential, setIsConfidential] = useState(agent?.isConfidential || false);

  // When template changes, update defaults
  useEffect(() => {
    if (selectedTemplateId && !agent) {
      const template = templates.find((t) => t.id === selectedTemplateId);
      if (template) {
        if (!name) setName(template.name);
        if (!description) setDescription(template.description);
        if (!systemPrompt) setSystemPrompt(template.defaultPrompt);
        setSelectedTools(template.suggestedTools);
      }
    }
  }, [selectedTemplateId, templates, agent, name, description, systemPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      templateId: selectedTemplateId,
      systemPrompt,
      tools: selectedTools,
      isConfidential,
    });
  };

  const toggleTool = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="template" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        {/* Template Selection */}
        <TabsContent value="template" className="space-y-4 mt-4">
          <div>
            <Label className="text-base">Choose a Template</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Start with a template or create from scratch
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {templates.map((template) => {
                const Icon = iconMap[template.icon] || Sparkles;
                const isSelected = selectedTemplateId === template.id;
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplateId(template.id)}
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
        </TabsContent>

        {/* Details */}
        <TabsContent value="details" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Agent name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this agent do?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                id="systemPrompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Instructions for the agent..."
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                This defines the agent&apos;s personality and behavior
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10">
                  <Shield className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <Label htmlFor="confidential" className="text-base cursor-pointer">
                    Confidential Agent
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Isolate this agent from others for privacy
                  </p>
                </div>
              </div>
              <Switch
                id="confidential"
                checked={isConfidential}
                onCheckedChange={setIsConfidential}
              />
            </div>

            {isConfidential && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  This agent will not share context with other agents and will have isolated conversation history.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tools */}
        <TabsContent value="tools" className="space-y-4 mt-4">
          <div>
            <Label className="text-base">Select Tools</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Choose which tools this agent can use
            </p>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
                <div key={category}>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    {categoryLabels[category] || category}
                  </Label>
                  <div className="space-y-2">
                    {categoryTools.map((tool) => {
                      const isSelected = selectedTools.includes(tool.id);
                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => toggleTool(tool.id)}
                          className={cn(
                            'w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all',
                            isSelected
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-border/80 hover:bg-muted/30'
                          )}
                        >
                          <Checkbox checked={isSelected} className="shrink-0" />
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
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {selectedTools.length} tool{selectedTools.length !== 1 ? 's' : ''} selected
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={!name || isSubmitting}>
          {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
          {agent ? 'Save Changes' : 'Create Agent'}
        </Button>
      </div>
    </form>
  );
}
