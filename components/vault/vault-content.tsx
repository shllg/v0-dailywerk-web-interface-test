'use client';

import { cn } from '@/lib/utils';
import type { VaultFile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileText,
  Edit3,
  ExternalLink,
  Clock,
  Tag,
  FolderOpen,
} from 'lucide-react';

interface VaultContentProps {
  file: VaultFile | null;
}

export function VaultContent({ file }: VaultContentProps) {
  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-8">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-white/80">Select a file</h3>
          <p className="text-sm text-white/40">
            Choose a file from the sidebar to view its contents. Your knowledge vault syncs with Obsidian.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* File header */}
      <div className="shrink-0 px-6 py-4 border-b border-white/5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-white/30 mb-1">
              <span>{file.path}</span>
            </div>
            <h1 className="text-xl font-semibold truncate">{file.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Updated {formatDate(file.updatedAt)}</span>
              </div>
              {file.tags && file.tags.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{file.tags.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Obsidian
            </Button>
            <Button size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* File content */}
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <article className="prose prose-invert prose-sm max-w-none">
            <MarkdownRenderer content={file.content || ''} />
          </article>
        </div>
      </ScrollArea>
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');

  return (
    <div className="space-y-4">
      {lines.map((line, i) => {
        // H1
        if (line.startsWith('# ')) {
          return <h1 key={i} className="text-2xl font-bold text-white mt-8 first:mt-0">{line.slice(2)}</h1>;
        }
        // H2
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-xl font-semibold text-white/90 mt-6">{line.slice(3)}</h2>;
        }
        // H3
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-lg font-medium text-white/80 mt-4">{line.slice(4)}</h3>;
        }
        // Bullet list
        if (line.startsWith('- ')) {
          return (
            <div key={i} className="flex gap-3 items-start text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
              <span>{renderInlineMarkdown(line.slice(2))}</span>
            </div>
          );
        }
        // Blockquote
        if (line.startsWith('> ')) {
          return (
            <blockquote key={i} className="border-l-2 border-primary/30 pl-4 text-white/60 italic">
              {line.slice(2)}
            </blockquote>
          );
        }
        // Empty line
        if (line.trim() === '') {
          return <div key={i} className="h-2" />;
        }
        // Paragraph
        return <p key={i} className="text-white/70 leading-relaxed">{renderInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

function renderInlineMarkdown(text: string): React.ReactNode {
  // Bold, italic, code, links
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[\[[^\]]+\]\])/g);
  
  return parts.map((part, i) => {
    // Bold
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-white/90">{part.slice(2, -2)}</strong>;
    }
    // Italic
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    // Code
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-primary/80">
          {part.slice(1, -1)}
        </code>
      );
    }
    // Wiki-style links [[link]]
    if (part.startsWith('[[') && part.endsWith(']]')) {
      return (
        <span key={i} className="text-primary hover:underline cursor-pointer">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  return new Date(date).toLocaleDateString();
}
