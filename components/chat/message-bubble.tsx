'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { ToolCallChip } from './tool-call-chip';
import { ReasoningBlock } from './reasoning-block';
import { Check, Copy, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
  message: Message;
  agentName?: string;
  agentAvatar?: string;
}

export function MessageBubble({ message, agentName = 'Agent', agentAvatar }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const isThinking = message.status === 'thinking';
  const isStreaming = message.status === 'streaming';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // System messages
  if (message.role === 'system') {
    return (
      <div className="flex justify-center py-2">
        <div className="text-xs text-muted-foreground/70 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative flex gap-3 px-4 md:px-8 py-3 transition-all duration-300',
        isUser ? 'justify-end' : 'justify-start',
        'animate-in fade-in-0 slide-in-from-bottom-2 duration-300'
      )}
    >
      {/* Agent avatar */}
      {!isUser && (
        <div className="relative shrink-0 self-end">
          <div className={cn(
            'w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-medium',
            'bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10',
            'border border-white/10 backdrop-blur-sm',
            'shadow-lg shadow-primary/10',
            isThinking && 'animate-pulse'
          )}>
            {agentAvatar ? (
              <img src={agentAvatar} alt={agentName} className="w-full h-full rounded-2xl object-cover" />
            ) : (
              <Sparkles className="w-4 h-4 text-primary" />
            )}
          </div>
          {/* Status indicator */}
          <div className={cn(
            'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background',
            isThinking || isStreaming ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
          )} />
        </div>
      )}

      {/* Message content */}
      <div className={cn(
        'relative max-w-[85%] md:max-w-[65%] lg:max-w-[55%]',
        isUser && 'order-first'
      )}>
        {/* Agent name */}
        {!isUser && (
          <div className="text-[11px] text-muted-foreground/60 mb-1.5 ml-1 font-medium tracking-wide uppercase">
            {agentName}
          </div>
        )}

        {/* Reasoning block (collapsible) */}
        {message.reasoning && (
          <ReasoningBlock 
            content={message.reasoning} 
            className="mb-2"
          />
        )}

        {/* Tool calls */}
        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {message.toolCalls.map((tool) => (
              <ToolCallChip key={tool.id} toolCall={tool} />
            ))}
          </div>
        )}

        {/* Main bubble */}
        <div
          className={cn(
            'relative rounded-3xl px-5 py-3.5 transition-all duration-200',
            isUser ? [
              // User message: gradient pill with glow
              'bg-gradient-to-br from-primary via-primary to-accent/80',
              'text-white',
              'rounded-br-lg',
              'shadow-xl shadow-primary/30',
            ] : [
              // Agent message: glass morphism with ambient glow
              'bg-white/[0.03] backdrop-blur-xl',
              'border border-white/[0.08]',
              'rounded-tl-lg',
              'shadow-2xl shadow-black/20',
            ]
          )}
        >
          {/* Ambient glow for agent messages */}
          {!isUser && !isThinking && (
            <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl opacity-40" />
          )}

          {/* Thinking state with elegant animation */}
          {isThinking ? (
            <div className="flex items-center gap-3 py-1">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }} />
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }} />
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }} />
              </div>
              <span className="text-sm text-muted-foreground/70">Thinking...</span>
            </div>
          ) : (
            <>
              {/* Message content */}
              <div className={cn(
                'text-[15px] leading-relaxed',
                isUser ? 'text-white' : 'text-foreground/90'
              )}>
                <MessageContent content={message.content} />
              </div>

              {/* Streaming cursor */}
              {isStreaming && (
                <span className="inline-block w-0.5 h-5 ml-1 bg-primary rounded-full animate-pulse" />
              )}
            </>
          )}
        </div>

        {/* Timestamp and actions */}
        <div className={cn(
          'flex items-center gap-2 mt-2 px-2',
          'opacity-0 group-hover:opacity-100 transition-all duration-300',
          isUser ? 'justify-end' : 'justify-start'
        )}>
          <span className="text-[10px] text-muted-foreground/50 font-medium">
            {formatTime(message.timestamp || message.createdAt)}
          </span>
          
          {!isUser && !isThinking && (
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/5"
                onClick={handleCopy}
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/5"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  if (!content || typeof content !== 'string') {
    return null;
  }
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        // Headers
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-base font-semibold mt-3 first:mt-0">{line.slice(4)}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-lg font-semibold mt-4 first:mt-0">{line.slice(3)}</h2>;
        }
        
        // List items
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <div key={i} className="flex gap-3 items-start pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
              <span className="flex-1">{renderInlineFormatting(line.slice(2))}</span>
            </div>
          );
        }
        
        // Numbered lists
        const numberedMatch = line.match(/^(\d+)\.\s/);
        if (numberedMatch) {
          return (
            <div key={i} className="flex gap-3 items-start pl-1">
              <span className="text-primary/70 font-medium min-w-[1.25rem] text-right">{numberedMatch[1]}.</span>
              <span className="flex-1">{renderInlineFormatting(line.slice(numberedMatch[0].length))}</span>
            </div>
          );
        }
        
        // Empty lines
        if (line.trim() === '') {
          return <div key={i} className="h-1" />;
        }
        
        // Regular paragraphs
        return <p key={i} className="leading-relaxed">{renderInlineFormatting(line)}</p>;
      })}
    </div>
  );
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Split by bold markers and code
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded-md text-[0.9em] font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function formatTime(date: Date | undefined): string {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
