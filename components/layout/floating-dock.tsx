'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Brain, 
  FolderOpen, 
  Settings,
  Command,
  Sparkles
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/memory', label: 'Memory', icon: Brain },
  { href: '/vault', label: 'Vault', icon: FolderOpen },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface FloatingDockProps {
  onCommandPalette?: () => void;
}

export function FloatingDock({ onCommandPalette }: FloatingDockProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 hidden md:flex">
        {/* Dock container with glass effect */}
        <div className={cn(
          'flex items-center gap-1 px-2 py-2 rounded-2xl',
          'bg-black/40 backdrop-blur-2xl',
          'border border-white/10',
          'shadow-2xl shadow-black/40'
        )}>
          {/* Logo/Home */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/chat"
                className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200',
                  'bg-gradient-to-br from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30',
                  'border border-white/10',
                  'hover:scale-110 hover:-translate-y-0.5',
                  'group'
                )}
              >
                <Sparkles className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/90 border-white/10">
              DailyWerk
            </TooltipContent>
          </Tooltip>

          {/* Separator */}
          <div className="w-px h-8 bg-white/10 mx-1" />

          {/* Nav items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200',
                      'hover:bg-white/10 hover:scale-110 hover:-translate-y-0.5',
                      isActive && [
                        'bg-white/10',
                        'shadow-lg shadow-primary/20',
                      ]
                    )}
                  >
                    <Icon className={cn(
                      'w-5 h-5 transition-colors',
                      isActive ? 'text-primary' : 'text-white/60 hover:text-white'
                    )} />
                    {/* Active indicator dot */}
                    {isActive && (
                      <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-black/90 border-white/10">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Separator */}
          <div className="w-px h-8 bg-white/10 mx-1" />

          {/* Command palette trigger */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onCommandPalette}
                className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200',
                  'hover:bg-white/10 hover:scale-110 hover:-translate-y-0.5',
                  'text-white/60 hover:text-white'
                )}
              >
                <Command className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/90 border-white/10">
              <div className="flex items-center gap-2">
                <span>Command</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">K</kbd>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
