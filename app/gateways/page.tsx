'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { StatusIndicator } from '@/components/shared/status-indicator';
import { sampleGateways } from '@/lib/mock-data';
import { GATEWAY_INFO } from '@/lib/constants';
import type { Gateway } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Share2,
  MessageSquare,
  Send,
  Mail,
  Calendar,
  Slack,
  MessageCircle,
  Settings,
  ExternalLink,
  Plus,
  RefreshCw,
} from 'lucide-react';

const iconMap: Record<string, typeof MessageSquare> = {
  signal: MessageSquare,
  telegram: Send,
  email: Mail,
  calendar: Calendar,
  slack: Slack,
  discord: MessageCircle,
};

export default function GatewaysPage() {
  const [gateways, setGateways] = useState(sampleGateways);

  const toggleGateway = (id: string) => {
    setGateways((prev) =>
      prev.map((gw) =>
        gw.id === id
          ? {
              ...gw,
              status: gw.status === 'connected' ? 'disconnected' : 'connected',
            }
          : gw
      )
    );
  };

  const connectedCount = gateways.filter((g) => g.status === 'connected').length;

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Gateways"
          subtitle={`${connectedCount} of ${gateways.length} connected`}
          actions={
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Gateway
            </Button>
          }
        />

        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Description */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Message Gateways
                </CardTitle>
                <CardDescription>
                  Connect your agents to messaging platforms so you can chat with them from anywhere.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Gateways List */}
            <div className="space-y-3">
              {gateways.map((gateway) => {
                const Icon = iconMap[gateway.type] || Share2;
                const info = GATEWAY_INFO[gateway.type as keyof typeof GATEWAY_INFO];
                const isConnected = gateway.status === 'connected';

                return (
                  <Card key={gateway.id} className="hover:bg-muted/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            'flex items-center justify-center w-12 h-12 rounded-lg shrink-0',
                            isConnected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                          )}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{gateway.name}</h3>
                            <StatusIndicator status={gateway.status} size="sm" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {info?.description || 'Connect to this service'}
                          </p>
                          {gateway.lastSync && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Last synced: {new Date(gateway.lastSync).toLocaleString()}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isConnected ? (
                            <>
                              <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4 mr-1" />
                                Configure
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleGateway(gateway.id)}
                              >
                                Disconnect
                              </Button>
                            </>
                          ) : (
                            <Button onClick={() => toggleGateway(gateway.id)}>
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Add More */}
            <Card className="border-dashed">
              <CardContent className="p-6">
                <div className="text-center">
                  <Share2 className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium mb-1">More Gateways Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We&apos;re working on adding more messaging platforms and integrations.
                  </p>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Request a Gateway
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
