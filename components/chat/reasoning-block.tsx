'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Brain, ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ReasoningBlockProps {
  content: string;
  className?: string;
}

export function ReasoningBlock({ content, className }: ReasoningBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Count words for summary
  const wordCount = content.split(/\s+/).length;
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs',
            'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10',
            'border border-amber-500/20 hover:border-amber-500/30',
            'transition-all duration-200 group'
          )}
        >
          {/* Brain icon with glow */}
          <div className="relative">
            <Brain className="w-4 h-4 text-amber-500" />
            <div className="absolute inset-0 blur-md bg-amber-500/30" />
          </div>
          
          <span className="text-amber-200/80 font-medium">Reasoning</span>
          <span className="text-amber-200/40">({wordCount} words)</span>
          
          <ChevronRight className={cn(
            'w-3 h-3 text-amber-500/50 ml-auto transition-transform duration-200',
            isOpen && 'rotate-90'
          )} />
        </button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-2 animate-in slide-in-from-top-1 duration-200">
        <div className={cn(
          'rounded-xl p-4 text-sm leading-relaxed',
          'bg-gradient-to-br from-amber-500/5 to-orange-500/5',
          'border border-amber-500/10',
          'text-foreground/60 italic'
        )}>
          {/* Decorative quote mark */}
          <div className="text-4xl text-amber-500/20 font-serif leading-none mb-1">"</div>
          <div className="pl-4 -mt-4">
            {content}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
