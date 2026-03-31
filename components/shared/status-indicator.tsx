'use client';

import { cn } from '@/lib/utils';

type Status = 'online' | 'offline' | 'busy' | 'pending' | 'connected' | 'disconnected';

interface StatusIndicatorProps {
  status: Status;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const statusConfig: Record<Status, { color: string; label: string }> = {
  online: { color: 'bg-green-500', label: 'Online' },
  offline: { color: 'bg-gray-400', label: 'Offline' },
  busy: { color: 'bg-yellow-500', label: 'Busy' },
  pending: { color: 'bg-yellow-500', label: 'Pending' },
  connected: { color: 'bg-green-500', label: 'Connected' },
  disconnected: { color: 'bg-gray-400', label: 'Disconnected' },
};

const sizeConfig = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
};

export function StatusIndicator({
  status,
  size = 'md',
  showLabel = false,
  className,
}: StatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span
        className={cn(
          'rounded-full',
          config.color,
          sizeConfig[size],
          (status === 'online' || status === 'connected') && 'animate-pulse'
        )}
      />
      {showLabel && (
        <span className="text-xs text-muted-foreground">{config.label}</span>
      )}
    </div>
  );
}
