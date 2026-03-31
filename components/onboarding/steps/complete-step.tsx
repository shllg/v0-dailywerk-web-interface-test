'use client';

import { Check, Bot, Wrench, Share2 } from 'lucide-react';

interface CompleteStepProps {
  userName: string;
  agentName: string;
  toolCount: number;
  gatewayConnected: boolean;
}

export function CompleteStep({
  userName,
  agentName,
  toolCount,
  gatewayConnected,
}: CompleteStepProps) {
  const greeting = userName ? `Great job, ${userName}!` : 'Great job!';

  return (
    <div className="space-y-8 text-center">
      <div>
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{greeting}</h2>
        <p className="text-muted-foreground">
          Your DailyWerk is ready. Here&apos;s what we set up:
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-3 max-w-sm mx-auto">
        <SummaryItem
          icon={Bot}
          title="Main Agent"
          description={`${agentName} is ready to help you`}
        />
        <SummaryItem
          icon={Wrench}
          title="Tools Enabled"
          description={`${toolCount} tool${toolCount !== 1 ? 's' : ''} configured`}
        />
        <SummaryItem
          icon={Share2}
          title="Gateway"
          description={gatewayConnected ? 'Ready to configure' : 'Can be set up later'}
        />
      </div>

      {/* Next Steps */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border/50 max-w-sm mx-auto">
        <h3 className="font-medium mb-2">What&apos;s next?</h3>
        <p className="text-sm text-muted-foreground">
          Take a quick tour to learn the basics, or jump straight into chatting with {agentName}. You can always access the tour later from settings.
        </p>
      </div>
    </div>
  );
}

function SummaryItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Bot;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 text-left">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
