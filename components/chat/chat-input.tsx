'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Paperclip, 
  Mic, 
  Send, 
  Brain,
  Square,
  Loader2,
  ArrowUp,
  Sparkles
} from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string, options?: { reasoning?: boolean }) => void;
  agentName: string;
  disabled?: boolean;
  isProcessing?: boolean;
  onStop?: () => void;
}

export function ChatInput({ 
  onSend, 
  agentName, 
  disabled,
  isProcessing,
  onStop 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [reasoningEnabled, setReasoningEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (trimmed && !disabled && !isProcessing) {
      onSend(trimmed, { reasoning: reasoningEnabled });
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual voice recording
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [message]);

  const canSend = message.trim() && !disabled && !isProcessing;

  return (
    <div className="relative px-4 pb-6 pt-2 md:px-8" data-tour="chat-input">
      {/* Ambient glow behind input */}
      <div className="absolute inset-x-8 bottom-8 h-32 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none blur-2xl" />
      
      <div className="relative max-w-3xl mx-auto">
        {/* Main input container - glass morphism */}
        <div className={cn(
          'relative rounded-3xl transition-all duration-300',
          'bg-white/[0.03] backdrop-blur-xl',
          'border border-white/[0.08]',
          'shadow-2xl shadow-black/20',
          isFocused && 'border-primary/30 shadow-primary/10',
          isProcessing && 'border-amber-500/30'
        )}>
          {/* Subtle gradient border on focus */}
          {isFocused && (
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 -z-10 blur-sm" />
          )}

          {/* Top row: toggles */}
          <div className="flex items-center gap-1 px-3 pt-2 pb-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setReasoningEnabled(!reasoningEnabled)}
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all',
                      reasoningEnabled 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-white/5'
                    )}
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span>Reasoning</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {reasoningEnabled ? 'Disable extended reasoning' : 'Enable extended reasoning'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Processing indicator */}
            {isProcessing && (
              <div className="flex items-center gap-2 ml-auto text-xs text-amber-400">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          {/* Main textarea */}
          <div className="relative px-4 py-2">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={`Message ${agentName}...`}
              disabled={disabled || isProcessing}
              className={cn(
                'w-full min-h-[24px] max-h-[160px] resize-none bg-transparent',
                'text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/40',
                'focus:outline-none',
                'disabled:opacity-50'
              )}
              rows={1}
            />
          </div>

          {/* Bottom row: actions */}
          <div className="flex items-center justify-between px-3 pb-3 pt-1">
            {/* Left actions */}
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-xl text-muted-foreground/50 hover:text-foreground hover:bg-white/5"
                    >
                      <Paperclip className="h-4 w-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Attach file</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleRecording}
                      className={cn(
                        'h-8 w-8 rounded-xl transition-all',
                        isRecording 
                          ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 animate-pulse'
                          : 'text-muted-foreground/50 hover:text-foreground hover:bg-white/5'
                      )}
                    >
                      {isRecording ? (
                        <div className="relative">
                          <Mic className="h-4 w-4" />
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                        </div>
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                      <span className="sr-only">Voice input</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isRecording ? 'Stop recording' : 'Voice input'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Right: Send/Stop button */}
            {isProcessing ? (
              <Button
                onClick={onStop}
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
              >
                <Square className="h-4 w-4 fill-current" />
                <span className="sr-only">Stop generating</span>
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canSend}
                size="icon"
                className={cn(
                  'h-9 w-9 rounded-xl transition-all duration-300',
                  canSend 
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105'
                    : 'bg-white/5 text-muted-foreground/30'
                )}
              >
                {canSend ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span className="sr-only">Send message</span>
              </Button>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-center text-muted-foreground/40 mt-3">
          {agentName} can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
