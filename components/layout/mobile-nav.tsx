'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MessageSquare, Brain, FolderOpen, Settings } from 'lucide-react';

const navItems = [
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/memory', label: 'Memory', icon: Brain },
  { href: '/vault', label: 'Vault', icon: FolderOpen },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 z-50 md:hidden',
      'bg-black/60 backdrop-blur-2xl',
      'border-t border-white/5'
    )}>
      <div className="flex items-center justify-around h-16 px-4 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl transition-all',
                isActive
                  ? 'text-primary'
                  : 'text-white/40 active:text-white/60'
              )}
            >
              <Icon className={cn(
                'w-5 h-5 transition-transform',
                isActive && 'scale-110'
              )} />
              <span className={cn(
                'text-[10px] font-medium',
                isActive ? 'text-primary' : 'text-white/40'
              )}>
                {item.label}
              </span>
              {/* Active indicator */}
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
