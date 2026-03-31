'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

const tourSteps = [
  {
    id: 'welcome',
    title: 'Welcome to DailyWerk!',
    content: 'Let me show you around. This quick tour will help you get started with the basics.',
    target: null,
    position: 'center' as const,
  },
  {
    id: 'chat-input',
    title: 'Send Messages',
    content: 'Type your message here to chat with your agent. You can ask questions, give commands, or just have a conversation.',
    target: '[data-tour="chat-input"]',
    position: 'top' as const,
  },
  {
    id: 'agent-selector',
    title: 'Switch Agents',
    content: 'Click on different agents in the sidebar to switch between them. Each agent has its own personality and capabilities.',
    target: '[data-tour="agent-selector"]',
    position: 'right' as const,
  },
  {
    id: 'sidebar',
    title: 'Navigation',
    content: 'Use the sidebar to access all features: manage agents, browse tools, explore your knowledge vault, set up automations, and configure settings.',
    target: '[data-tour="sidebar"]',
    position: 'right' as const,
  },
  {
    id: 'command-palette',
    title: 'Quick Actions',
    content: 'Press Cmd+K (or Ctrl+K on Windows) anytime to open the command palette for quick access to any feature.',
    target: '[data-tour="command-palette"]',
    position: 'bottom' as const,
  },
  {
    id: 'complete',
    title: 'You\'re all set!',
    content: 'That\'s the basics! Feel free to explore and customize your DailyWerk. Your main agent is ready to help.',
    target: null,
    position: 'center' as const,
  },
];

interface TourOverlayProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function TourOverlay({ onComplete, onSkip }: TourOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  const step = tourSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourSteps.length - 1;

  useEffect(() => {
    if (step.target) {
      const element = document.querySelector(step.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightRect(rect);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setHighlightRect(null);
      }
    } else {
      setHighlightRect(null);
    }
  }, [step.target]);

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const getTooltipPosition = () => {
    if (!highlightRect || step.position === 'center') {
      return {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const padding = 16;
    const tooltipWidth = 320;

    switch (step.position) {
      case 'top':
        return {
          position: 'fixed' as const,
          bottom: `${window.innerHeight - highlightRect.top + padding}px`,
          left: `${Math.max(padding, Math.min(highlightRect.left + highlightRect.width / 2 - tooltipWidth / 2, window.innerWidth - tooltipWidth - padding))}px`,
        };
      case 'bottom':
        return {
          position: 'fixed' as const,
          top: `${highlightRect.bottom + padding}px`,
          left: `${Math.max(padding, Math.min(highlightRect.left + highlightRect.width / 2 - tooltipWidth / 2, window.innerWidth - tooltipWidth - padding))}px`,
        };
      case 'right':
        return {
          position: 'fixed' as const,
          top: `${highlightRect.top}px`,
          left: `${highlightRect.right + padding}px`,
        };
      case 'left':
        return {
          position: 'fixed' as const,
          top: `${highlightRect.top}px`,
          right: `${window.innerWidth - highlightRect.left + padding}px`,
        };
      default:
        return {};
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Highlight cutout */}
      {highlightRect && (
        <div
          className="absolute border-2 border-primary rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.75)] transition-all duration-300"
          style={{
            top: highlightRect.top - 4,
            left: highlightRect.left - 4,
            width: highlightRect.width + 8,
            height: highlightRect.height + 8,
          }}
        />
      )}

      {/* Tooltip */}
      <Card
        className={cn(
          'w-80 border-border/50 bg-card shadow-xl z-10',
          step.position === 'center' && 'max-w-md'
        )}
        style={getTooltipPosition()}
      >
        <CardContent className="p-4">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={onSkip}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Content */}
          <div className="pr-6">
            <h3 className="font-semibold mb-1">{step.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{step.content}</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-1 mb-4">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-1 flex-1 rounded-full transition-colors',
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                )}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground"
            >
              Skip tour
            </Button>
            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <Button variant="outline" size="sm" onClick={handleBack}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              <Button size="sm" onClick={handleNext}>
                {isLastStep ? 'Get Started' : 'Next'}
                {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
