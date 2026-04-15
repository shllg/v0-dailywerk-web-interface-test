'use client';

import { useState, type ReactNode } from 'react';
import { FloatingDock } from './floating-dock';
import { MobileNav } from './mobile-nav';
import { CommandPalette } from './command-palette';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-background">
      {/* Ambient background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-0 pb-24 md:pb-20">
        {children}
      </main>

      {/* Desktop Floating Dock */}
      <FloatingDock onCommandPalette={() => setCommandOpen(true)} />

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Global Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
