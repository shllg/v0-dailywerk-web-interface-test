'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Mail, Calendar } from 'lucide-react';

const gateways = [
  {
    id: 'signal',
    name: 'Signal',
    description: 'Secure, private messaging',
    icon: MessageSquare,
    popular: true,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Fast, cloud-based messaging',
    icon: Send,
    popular: true,
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Connect your email accounts',
    icon: Mail,
    popular: false,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Sync with your calendar',
    icon: Calendar,
    popular: false,
  },
];

interface ConnectGatewayStepProps {
  selectedGateway: string | null;
  onGatewaySelect: (gatewayId: string | null) => void;
}

export function ConnectGatewayStep({
  selectedGateway,
  onGatewaySelect,
}: ConnectGatewayStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Connect a Gateway</h2>
        <p className="text-sm text-muted-foreground">
          Talk to your agents via your favorite messaging app. This is optional and you can set it up later.
        </p>
      </div>

      {/* Gateway Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {gateways.map((gateway) => {
          const Icon = gateway.icon;
          const isSelected = selectedGateway === gateway.id;
          return (
            <button
              key={gateway.id}
              onClick={() => onGatewaySelect(isSelected ? null : gateway.id)}
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg border text-left transition-all',
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
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm">{gateway.name}</h3>
                  {gateway.popular && (
                    <Badge variant="secondary" className="text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {gateway.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Skip note */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">No worries!</strong> You can always connect gateways later from the Gateways section. The web interface works great on its own.
        </p>
      </div>

      {selectedGateway && (
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm">
            Great choice! After setup, you&apos;ll be able to configure {gateways.find(g => g.id === selectedGateway)?.name} in the Gateways section.
          </p>
        </div>
      )}
    </div>
  );
}
