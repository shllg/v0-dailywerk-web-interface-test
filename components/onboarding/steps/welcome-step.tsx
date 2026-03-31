'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bot, Zap, Shield, Sparkles } from 'lucide-react';

interface WelcomeStepProps {
  userName: string;
  onUserNameChange: (name: string) => void;
}

export function WelcomeStep({ userName, onUserNameChange }: WelcomeStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome to DailyWerk</h2>
        <p className="text-muted-foreground">
          Your personal multi-agent AI assistant system. Let&apos;s set things up in just a few steps.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FeatureCard
          icon={Bot}
          title="Multiple Agents"
          description="Create specialized agents for different tasks"
        />
        <FeatureCard
          icon={Zap}
          title="Automations"
          description="Set up crons, reminders, and todo lists"
        />
        <FeatureCard
          icon={Shield}
          title="Privacy First"
          description="Confidential agents with isolated contexts"
        />
        <FeatureCard
          icon={Sparkles}
          title="Connected"
          description="Use via web, Signal, Telegram, and more"
        />
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="userName">What should we call you?</Label>
        <Input
          id="userName"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => onUserNameChange(e.target.value)}
          className="max-w-sm"
        />
        <p className="text-sm text-muted-foreground">
          This helps personalize your experience
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Bot;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
