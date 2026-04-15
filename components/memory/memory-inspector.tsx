'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { MemoryNode } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  X,
  Save,
  Trash2,
  Clock,
  Link2,
  Shield,
  Globe,
  Sparkles,
} from 'lucide-react';

interface MemoryInspectorProps {
  node: MemoryNode | null;
  onClose: () => void;
  onUpdate: (node: MemoryNode) => void;
}

export function MemoryInspector({ node, onClose, onUpdate }: MemoryInspectorProps) {
  const [editedContent, setEditedContent] = useState(node?.content || '');
  const [importance, setImportance] = useState(node?.importance || 5);
  const [hasChanges, setHasChanges] = useState(false);

  // Update local state when node changes
  if (node && editedContent !== node.content && !hasChanges) {
    setEditedContent(node.content);
    setImportance(node.importance);
  }

  const handleSave = () => {
    if (node) {
      onUpdate({ ...node, content: editedContent, importance });
      setHasChanges(false);
    }
  };

  if (!node) {
    return (
      <div className={cn(
        'w-80 shrink-0 flex flex-col items-center justify-center',
        'bg-black/10 border-l border-white/5',
        'text-center p-6'
      )}>
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-white/20" />
        </div>
        <h3 className="font-medium text-white/60 mb-2">Select a Memory</h3>
        <p className="text-sm text-white/30">
          Click on a node in the graph to inspect and edit its details.
        </p>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    context: 'text-blue-400',
    preference: 'text-amber-400',
    fact: 'text-emerald-400',
    project: 'text-purple-400',
    task: 'text-rose-400',
  };

  return (
    <div className={cn(
      'w-80 shrink-0 flex flex-col',
      'bg-black/20 border-l border-white/5'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className={cn('text-xs font-medium uppercase tracking-wider', categoryColors[node.category])}>
            {node.category}
          </span>
          {node.scope === 'private' ? (
            <Shield className="w-3.5 h-3.5 text-amber-500/70" />
          ) : (
            <Globe className="w-3.5 h-3.5 text-emerald-500/70" />
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 text-white/40 hover:text-white">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">
          {/* Content */}
          <div>
            <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2 block">
              Memory Content
            </label>
            <Textarea
              value={editedContent}
              onChange={(e) => {
                setEditedContent(e.target.value);
                setHasChanges(true);
              }}
              className={cn(
                'min-h-[100px] bg-white/5 border-white/10 rounded-xl',
                'focus:border-primary/30 focus:ring-primary/20',
                'text-sm leading-relaxed'
              )}
            />
          </div>

          {/* Importance slider */}
          <div>
            <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2 block">
              Importance ({importance}/10)
            </label>
            <div className="relative">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full transition-all"
                  style={{ width: `${importance * 10}%` }}
                />
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={importance}
                onChange={(e) => {
                  setImportance(Number(e.target.value));
                  setHasChanges(true);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Confidence */}
          <div>
            <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2 block">
              Confidence ({Math.round(node.confidence * 100)}%)
            </label>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500/50 to-emerald-500 rounded-full"
                style={{ width: `${node.confidence * 100}%` }}
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="pt-2 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Updated
              </span>
              <span className="text-white/60">{formatDate(node.updatedAt)}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Source
              </span>
              <span className="text-white/60">{node.source}</span>
            </div>

            {node.agentId && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Agent Scope
                </span>
                <span className="text-white/60">{node.agentId}</span>
              </div>
            )}

            {node.connections && node.connections.length > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5" />
                  Connections
                </span>
                <span className="text-white/60">{node.connections.length} nodes</span>
              </div>
            )}
          </div>

          {/* ID */}
          <div className="pt-2 border-t border-white/5">
            <span className="text-[10px] font-mono text-white/20 break-all">
              {node.id}
            </span>
          </div>
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="w-full bg-primary/20 hover:bg-primary/30 text-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button
          variant="ghost"
          className="w-full text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Deactivate Memory
        </Button>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
