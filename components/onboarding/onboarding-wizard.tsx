'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  content: ReactNode;
}

interface OnboardingWizardProps {
  steps: Step[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingWizard({
  steps,
  currentStep,
  onNext,
  onBack,
  onComplete,
  onSkip,
}: OnboardingWizardProps) {
  // Clamp currentStep to valid range to prevent undefined access
  const safeCurrentStep = Math.min(Math.max(0, currentStep), steps.length - 1);
  const isFirstStep = safeCurrentStep === 0;
  const isLastStep = safeCurrentStep === steps.length - 1;
  const progress = ((safeCurrentStep + 1) / steps.length) * 100;

  return (
    <Card className="w-full max-w-2xl border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DailyWerk</h1>
              <p className="text-sm text-muted-foreground">Setup Wizard</p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{steps[safeCurrentStep].title}</span>
              <span className="text-muted-foreground">
                Step {safeCurrentStep + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors',
                  index < safeCurrentStep
                    ? 'bg-primary text-primary-foreground'
                    : index === safeCurrentStep
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {index < safeCurrentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          {steps[safeCurrentStep].content}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex items-center justify-between">
          <div>
            {!isFirstStep && (
              <Button variant="ghost" onClick={onBack}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isLastStep && (
              <Button variant="ghost" onClick={onSkip}>
                Skip Tour
              </Button>
            )}
            {isLastStep ? (
              <Button onClick={onComplete}>
                Start with Tour
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={onNext}>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
